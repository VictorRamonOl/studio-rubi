import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Política de Privacidade | Studio Rubi Pilates e Fisioterapia",
  description:
    "Saiba como o Studio Rubi Pilates e Fisioterapia coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://rubistudiopilates.com.br/politica-privacidade",
  },
}

export default function PoliticaPrivacidade() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-8 text-sm text-stone-500 hover:text-stone-700 transition-colors"
        >
          ← Voltar ao site
        </Link>

        <h1 className="font-playfair text-3xl md:text-4xl text-stone-800 mb-2">
          Política de Privacidade
        </h1>
        <p className="text-sm text-stone-400 mb-10">
          Última atualização: 17 de abril de 2025
        </p>

        <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed space-y-8">

          <section>
            <h2 className="font-playfair text-xl text-stone-700 mb-3">1. Quem somos</h2>
            <p>
              Studio Rubi Pilates e Fisioterapia, com sede na Rua Carlos Lecor, nº 1005, Sala 02,
              Parque Dez de Novembro, Manaus – AM, CEP 69055-430. Responsável: Dra. Rúbia Torres.
              Contato: <a href="mailto:rubistudiopilates@gmail.com" className="underline">rubistudiopilates@gmail.com</a> |{" "}
              <a href="https://wa.me/5592992855658" className="underline">(92) 99285-5658</a>.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-stone-700 mb-3">2. Quais dados coletamos</h2>
            <p>Coletamos apenas os dados que você nos fornece voluntariamente:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Formulário de contato/agendamento:</strong> nome, e-mail, telefone e mensagem.</li>
              <li><strong>Navegação:</strong> dados anonimizados de uso do site via Google Analytics (páginas visitadas, tempo de sessão, origem do acesso).</li>
              <li><strong>Anúncios:</strong> conversões registradas pelo Google Ads para medir a eficácia das campanhas.</li>
            </ul>
            <p className="mt-3">
              Não coletamos dados sensíveis de saúde por meio deste site. Informações clínicas são
              coletadas somente presencialmente, dentro do sigilo profissional exigido pela legislação.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-stone-700 mb-3">3. Para que usamos seus dados</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Entrar em contato para confirmar agendamentos e responder dúvidas.</li>
              <li>Enviar informações sobre nossos serviços, se você solicitou.</li>
              <li>Melhorar a experiência do site com base em dados de navegação.</li>
              <li>Cumprir obrigações legais.</li>
            </ul>
            <p className="mt-3">
              Não vendemos, alugamos nem compartilhamos seus dados com terceiros para fins
              comerciais.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-stone-700 mb-3">4. Base legal (LGPD)</h2>
            <p>
              O tratamento dos seus dados é fundamentado no{" "}
              <strong>consentimento</strong> (Art. 7º, I da Lei 13.709/2018) dado ao preencher
              nosso formulário, e no <strong>legítimo interesse</strong> para fins analíticos
              anonimizados (Art. 7º, IX).
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-stone-700 mb-3">5. Cookies e ferramentas de terceiros</h2>
            <p>Utilizamos:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Google Analytics (GA4)</strong> — rastreamento de audiência anonimizado.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Política do Google
                </a>.
              </li>
              <li>
                <strong>Google Ads</strong> — mensuração de conversões de campanhas pagas.
              </li>
            </ul>
            <p className="mt-3">
              Você pode desativar cookies no seu navegador ou optar por não ser rastreado em{" "}
              <a
                href="https://myaccount.google.com/data-and-privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Minha Conta Google
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-stone-700 mb-3">6. Retenção dos dados</h2>
            <p>
              Dados de formulário são mantidos pelo tempo necessário para atender à sua solicitação
              e, no máximo, por 2 anos, salvo obrigação legal que exija período maior.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-stone-700 mb-3">7. Seus direitos</h2>
            <p>Conforme a LGPD, você pode a qualquer momento:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Confirmar a existência de tratamento dos seus dados.</li>
              <li>Acessar, corrigir ou solicitar a exclusão dos seus dados.</li>
              <li>Revogar o consentimento.</li>
              <li>Solicitar portabilidade dos dados.</li>
            </ul>
            <p className="mt-3">
              Para exercer esses direitos, envie um e-mail para{" "}
              <a href="mailto:rubistudiopilates@gmail.com" className="underline">
                rubistudiopilates@gmail.com
              </a>{" "}
              com o assunto <em>"Privacidade – LGPD"</em>. Responderemos em até 15 dias úteis.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-stone-700 mb-3">8. Segurança</h2>
            <p>
              Adotamos medidas técnicas e administrativas para proteger seus dados contra acesso
              não autorizado, perda ou divulgação indevida. O site utiliza HTTPS com certificado SSL.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-stone-700 mb-3">9. Alterações nesta política</h2>
            <p>
              Esta política pode ser atualizada periodicamente. A versão vigente estará sempre
              disponível nesta página com a data de revisão no topo.
            </p>
          </section>

          <section>
            <h2 className="font-playfair text-xl text-stone-700 mb-3">10. Contato</h2>
            <p>
              Studio Rubi Pilates e Fisioterapia<br />
              Rua Carlos Lecor, nº 1005, Sala 02 — Parque Dez, Manaus – AM<br />
              <a href="mailto:rubistudiopilates@gmail.com" className="underline">rubistudiopilates@gmail.com</a><br />
              <a href="https://wa.me/5592992855658" className="underline">(92) 99285-5658</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
