import type { ClientStatus } from "@/features/clients/schema";
import type { SessionStatus } from "@/features/sessions/schema";

const MAP: Record<ClientStatus, { label: string; cls: string }> = {
  ativo: { label: "Ativo", cls: "bg-green-100 text-green-800" },
  inativo: { label: "Inativo", cls: "bg-gray-100 text-gray-700" },
  sumido: { label: "Sumido", cls: "bg-amber-100 text-amber-800" },
  arquivado: { label: "Arquivado", cls: "bg-slate-200 text-slate-700" },
};

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  const s = MAP[status] ?? MAP.ativo;
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${s.cls}`}>
      {s.label}
    </span>
  );
}

const SESSION_MAP: Record<SessionStatus, { label: string; cls: string }> = {
  agendada: { label: "Agendada", cls: "bg-blue-100 text-blue-800" },
  confirmada: { label: "Confirmada", cls: "bg-indigo-100 text-indigo-800" },
  realizada: { label: "Realizada", cls: "bg-green-100 text-green-800" },
  falta: { label: "Falta", cls: "bg-red-100 text-red-800" },
  remarcada: { label: "Remarcada", cls: "bg-amber-100 text-amber-800" },
  cancelada: { label: "Cancelada", cls: "bg-gray-100 text-gray-600" },
};

export function SessionStatusBadge({ status }: { status: SessionStatus }) {
  const s = SESSION_MAP[status] ?? SESSION_MAP.agendada;
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${s.cls}`}>
      {s.label}
    </span>
  );
}
