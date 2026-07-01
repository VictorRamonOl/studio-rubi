// Gera links wa.me com mensagem pronta. "Clique-e-envia": abre o WhatsApp da
// gestora já com o texto preenchido pro paciente — ela revisa e envia.

// Normaliza telefone pro formato do wa.me: 55 + DDD + número (só dígitos).
export function normalizePhoneBR(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let d = raw.replace(/\D/g, "");
  if (!d) return null;
  // remove zeros à esquerda e prefixo 0
  d = d.replace(/^0+/, "");
  // se já vem com 55 (12-13 dígitos), mantém; senão prepõe 55
  if (d.length <= 11) d = "55" + d;
  return d;
}

export function waLink(phone: string | null | undefined, message: string): string | null {
  const p = normalizePhoneBR(phone);
  if (!p) return null;
  return `https://wa.me/${p}?text=${encodeURIComponent(message)}`;
}

const studio = "Studio Rubi";

// Templates padrão (a gestora ainda pode editar o texto no próprio WhatsApp).
export const wppTemplates = {
  confirmacao: (nome: string, hora: string) =>
    `Oi ${nome}! 😊 Passando pra confirmar sua sessão de hoje às ${hora} no ${studio}. Posso confirmar?`,

  lembrete: (nome: string, dia: string, hora: string) =>
    `Oi ${nome}! 💪 Lembrete da sua sessão ${dia} às ${hora} no ${studio}. Te espero!`,

  renovacao: (nome: string, saldo: number, vence: string | null) =>
    `Oi ${nome}! 😊 Seu pacote está com ${saldo} sessão${saldo === 1 ? "" : "es"} restante${saldo === 1 ? "" : "s"}` +
    `${vence ? ` e vence em ${vence}` : ""}. Vamos renovar pra você não perder o ritmo?`,

  cobranca: (nome: string, valor: string | null, pix: string | null) =>
    `Oi ${nome}! Tudo bem? 🙏 Consta um pagamento pendente${valor ? ` de ${valor}` : ""} aqui no ${studio}.` +
    `${pix ? ` Pix: ${pix}.` : ""} Qualquer dúvida me chama!`,

  agradecimento: (nome: string) =>
    `Oi ${nome}! 🌟 Que alegria te ver evoluindo no ${studio}. Você está indo muito bem, continue assim! 💖`,

  acesso: (nome: string, url: string, email: string, senha: string) =>
    `Oi ${nome}! 🌟 Seu acesso ao portal do ${studio}:\n${url}/login\n\nE-mail: ${email}\nSenha: ${senha}\n\nRecomendo trocar a senha depois de entrar. 😊`,

  aniversario: (nome: string) =>
    `Feliz aniversário, ${nome}! 🎉🎂 Toda a equipe do ${studio} te deseja muita saúde e alegria. Conte com a gente pra cuidar de você! 💖`,

  reativacao: (nome: string) =>
    `Oi ${nome}! 😊 Sentimos sua falta no ${studio}! Que tal remarcar e voltar a cuidar de você? Tenho horários essa semana. 💪`,
};

export const brl = (v: number | null | undefined) =>
  v == null ? null : v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
