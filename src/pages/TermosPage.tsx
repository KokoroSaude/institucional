import { LegalPageLayout } from "../components/LegalPageLayout";

const CONTACT = "contato@kokorosaude.com.br";

export function TermosPage() {
  return (
    <LegalPageLayout title="Termos de Serviço" updatedAt="8 de junho de 2026">
      <p>
        Estes Termos de Serviço (“Termos”) regem o uso da plataforma Kokoro, do portal de
        parceiros e dos serviços relacionados de adesão medicamentosa via WhatsApp. Ao utilizar
        nossos serviços, você concorda com estes Termos.
      </p>

      <h2>1. Definições</h2>
      <ul>
        <li>
          <strong>Plataforma:</strong> software, APIs, portal e integrações operadas pela Kokoro.
        </li>
        <li>
          <strong>Organização parceira:</strong> farmácia, rede ou entidade contratante que utiliza
          a plataforma para acompanhar pacientes.
        </li>
        <li>
          <strong>Usuário:</strong> pessoa autorizada pela Organização parceira a acessar o portal.
        </li>
        <li>
          <strong>Paciente:</strong> pessoa atendida via WhatsApp, após consentimento aplicável.
        </li>
      </ul>

      <h2>2. Natureza do serviço</h2>
      <p>
        A Kokoro é uma ferramenta de comunicação, lembretes e acompanhamento de adesão.{" "}
        <strong>Não substitui consulta médica, diagnóstico ou prescrição.</strong> Decisões
        clínicas permanecem sob responsabilidade de profissionais de saúde e da Organização
        parceira.
      </p>

      <h2>3. Cadastro e acesso</h2>
      <p>
        Usuários do portal devem fornecer informações verdadeiras e manter credenciais em sigilo.
        A Organização parceira é responsável pelos acessos concedidos à sua equipe.
      </p>

      <h2>4. Uso aceitável</h2>
      <p>É proibido:</p>
      <ul>
        <li>Utilizar a plataforma de forma ilegal, abusiva ou em desacordo com a LGPD.</li>
        <li>Enviar conteúdo não solicitado em massa (spam) ou violar políticas do WhatsApp/Meta.</li>
        <li>Tentar acessar dados de outra organização ou burlar controles de segurança.</li>
        <li>Engenharia reversa ou exploração não autorizada da API.</li>
      </ul>

      <h2>5. WhatsApp e terceiros</h2>
      <p>
        O envio de mensagens depende da Plataforma WhatsApp Business (Meta) e das regras de
        templates, janelas de atendimento e opt-in aplicáveis. A Organização parceira é
        responsável por configurar números, obter consentimentos e cumprir regulamentações do
        setor de saúde e comunicação.
      </p>

      <h2>6. Propriedade intelectual</h2>
      <p>
        A marca Kokoro, software, interfaces e documentação são protegidos. É concedida licença
        limitada, não exclusiva e revogável de uso conforme contrato com a Organização parceira.
      </p>

      <h2>7. Disponibilidade e suporte</h2>
      <p>
        Empregamos esforços razoáveis para manter a plataforma disponível. Manutenções e
        indisponibilidades de terceiros (Meta, provedores de nuvem) podem ocorrer. SLAs
        específicos, quando existirem, constam do contrato comercial.
      </p>

      <h2>8. Limitação de responsabilidade</h2>
      <p>
        Na extensão permitida pela lei, a Kokoro não se responsabiliza por danos indiretos,
        lucros cessantes ou decisões clínicas tomadas com base em informações da plataforma. A
        responsabilidade total, quando aplicável, limita-se aos termos do contrato entre Kokoro e
        a Organização parceira.
      </p>

      <h2>9. Privacidade</h2>
      <p>
        O tratamento de dados pessoais é descrito na nossa{" "}
        <a href="/privacidade">Política de Privacidade</a>. Titulares podem exercer direitos
        conforme a LGPD e a página de <a href="/exclusao-de-dados">exclusão de dados</a>.
      </p>

      <h2>10. Rescisão</h2>
      <p>
        Podemos suspender ou encerrar acessos em caso de violação destes Termos ou exigência
        legal. A Organização parceira pode solicitar encerramento conforme contrato.
      </p>

      <h2>11. Alterações</h2>
      <p>
        Podemos atualizar estes Termos. O uso continuado após publicação da nova versão constitui
        aceite, salvo disposição contratual em contrário.
      </p>

      <h2>12. Lei aplicável e foro</h2>
      <p>
        Aplica-se a legislação brasileira. Fica eleito o foro da comarca de São Paulo/SP, salvo
        disposição legal específica em contrário.
      </p>

      <h2>13. Contato</h2>
      <p>
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
      </p>
    </LegalPageLayout>
  );
}

export default TermosPage;
