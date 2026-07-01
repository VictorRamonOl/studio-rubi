import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

// Manaus = UTC-4 o ano todo (sem horário de verão). Fixamos o offset pra o
// horário não "escorregar" dependendo de onde o servidor roda (igual à ideia de
// "hora como texto" do seu script original).
const TZ_OFFSET = "-04:00";

// índice = getUTCDay(): 0=DOM ... 6=SAB
export const WEEKDAY_CODES = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"] as const;
export type WeekdayCode = (typeof WEEKDAY_CODES)[number];

function codeToIndex(code: string): number {
  return WEEKDAY_CODES.indexOf(code.toUpperCase() as WeekdayCode);
}

type PkgForGen = {
  id: string;
  client_id: string;
  professional_id: string | null;
  total_sessions: number;
  start_date: string; // YYYY-MM-DD
  due_date: string | null; // YYYY-MM-DD
  weekdays: string[] | null;
  session_time: string | null; // HH:MM
  duration_min: number;
  capacity: number;
  is_homecare: boolean;
};

function ymd(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * Gera as sessões recorrentes do pacote. Para em: nº de sessões do pacote OU
 * data de vencimento (o que vier primeiro). Pula slot que já está na capacidade.
 * Retorna { criadas, cheios } (cheios = slots pulados por lotação).
 */
export async function generateSessionsForPackage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any>,
  pkg: PkgForGen,
): Promise<{ criadas: number; cheios: number }> {
  if (!pkg.weekdays?.length || !pkg.session_time || !pkg.professional_id) {
    return { criadas: 0, cheios: 0 };
  }

  const targets = new Set(pkg.weekdays.map(codeToIndex).filter((i) => i >= 0));
  if (!targets.size) return { criadas: 0, cheios: 0 };

  const DAY = 86_400_000;
  const todayMs = Date.parse(ymd(Date.now()) + "T00:00:00Z");
  const startMs = Math.max(Date.parse(pkg.start_date + "T00:00:00Z"), todayMs);
  const dueMs = pkg.due_date ? Date.parse(pkg.due_date + "T00:00:00Z") : null;

  let criadas = 0;
  let cheios = 0;

  for (let i = 0; i < 366 && criadas < pkg.total_sessions; i++) {
    const ms = startMs + i * DAY;
    if (dueMs && ms > dueMs) break;

    const wd = new Date(ms).getUTCDay();
    if (!targets.has(wd)) continue;

    const scheduledAt = new Date(`${ymd(ms)}T${pkg.session_time}:00${TZ_OFFSET}`).toISOString();

    // capacidade: quantas sessões já ocupam esse profissional nesse horário
    const { count } = await supabase
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("professional_id", pkg.professional_id)
      .eq("scheduled_at", scheduledAt)
      .in("status", ["agendada", "confirmada", "realizada"]);

    if ((count ?? 0) >= pkg.capacity) {
      cheios++;
      continue;
    }

    const { error } = await supabase.from("sessions").insert({
      client_id: pkg.client_id,
      package_id: pkg.id,
      professional_id: pkg.professional_id,
      scheduled_at: scheduledAt,
      duration_min: pkg.duration_min,
      is_homecare: pkg.is_homecare,
      status: "agendada",
    });
    if (!error) criadas++;
  }

  return { criadas, cheios };
}

/**
 * Verifica se há vaga num horário específico (usado na remarcação).
 */
export async function hasVacancy(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any>,
  professionalId: string,
  scheduledAtIso: string,
  capacity: number,
): Promise<boolean> {
  const { count } = await supabase
    .from("sessions")
    .select("id", { count: "exact", head: true })
    .eq("professional_id", professionalId)
    .eq("scheduled_at", scheduledAtIso)
    .in("status", ["agendada", "confirmada", "realizada"]);
  return (count ?? 0) < capacity;
}
