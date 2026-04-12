export const WHATSAPP_NUMBER = "5592992855658"
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Vim pelo site e gostaria de agendar uma consulta de avaliação."
)
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

export const CONTACT = {
  phone: "(92) 99285-5658",
  email: "rubistudiopilates@gmail.com",
  instagram: "@rubistudiopilates",
  instagramUrl: "https://www.instagram.com/rubistudiopilates",
  facebook: "@rubistudiopilates",
  facebookUrl: "https://facebook.com/rubistudiopilates",
  address: "Rua Carlos Lecor, nº 1005, Sala 02",
  neighborhood: "Parque Dez de Novembro",
  city: "Manaus - AM",
  cep: "69055-430",
}

export const HOURS = [
  { days: "Segunda a Sexta", time: "7h às 19h" },
  { days: "Sábado", time: "8h às 12h" },
]

export const STATS = [
  { value: "+1.600", label: "Atendimentos realizados" },
  { value: "12 anos", label: "De experiência clínica" },
  { value: "3 pessoas", label: "Máximo por horário" },
  { value: "5 serviços", label: "Especializados" },
]
