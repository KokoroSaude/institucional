import { LegalPageLayout } from "../components/LegalPageLayout";

const CONTACT = "contato@kokorosaude.com.br";

export function ExclusaoDadosPage() {
  return (
    <LegalPageLayout title="Exclusão de dados do usuário" updatedAt="8 de junho de 2026">
      <p>
        Esta página descreve como solicitar a exclusão ou o encerramento do tratamento dos seus
        dados pessoais na plataforma Kokoro, em conformidade com a Lei Geral de Proteção de Dados
        (LGPD) e com os requisitos de aplicativos que integram serviços da Meta.
      </p>

      <h2>1. Pacientes atendidos via WhatsApp</h2>
      <p>Você pode interromper comunicações e solicitar exclusão das seguintes formas:</p>
      <ol>
        <li>
          <strong>Opt-out imediato:</strong> envie <strong>sair</strong>, <strong>parar</strong>,{" "}
          <strong>cancelar</strong> ou <strong>stop</strong> na conversa do WhatsApp com o número
          da farmácia/organização que utiliza a Kokoro. O envio de novas mensagens automáticas
          será interrompido.
        </li>
        <li>
          <strong>Exclusão completa:</strong> envie e-mail para{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a> com o assunto{" "}
          <em>“Exclusão de dados — paciente”</em>, informando o número de WhatsApp (com DDD) e,
          se souber, o nome da farmácia/organização.
        </li>
      </ol>

      <h2>2. Usuários do portal (equipe da organização parceira)</h2>
      <p>
        Solicite à administradora da sua organização a remoção do seu usuário no portal. Para
        exclusão definitiva na base da Kokoro, envie e-mail para{" "}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a> com o assunto{" "}
        <em>“Exclusão de dados — usuário portal”</em>, informando e-mail de login e nome da
        organização.
      </p>

      <h2>3. O que será excluído</h2>
      <p>Após validação da identidade, procederemos conforme o caso com:</p>
      <ul>
        <li>Dados cadastrais (nome, telefone, vínculo com organização).</li>
        <li>Histórico de mensagens e check-ins associados ao titular.</li>
        <li>Consentimentos e estados de conversa vinculados ao titular.</li>
        <li>Conta de usuário do portal, quando aplicável.</li>
      </ul>
      <p>
        Registros mínimos de auditoria ou obrigações legais podem ser mantidos pelo prazo exigido
        em lei, de forma anonimizada quando possível.
      </p>

      <h2>4. Prazo de atendimento</h2>
      <p>
        Responderemos solicitações em até <strong>15 dias úteis</strong>, podendo solicitar
        informações adicionais para confirmar que você é o titular dos dados.
      </p>

      <h2>5. Dados tratados pela Meta (WhatsApp)</h2>
      <p>
        Mensagens trafegam pela infraestrutura da Meta. A Kokoro controla os dados armazenados
        em sua plataforma; eventuais dados retidos pela Meta seguem as políticas e ferramentas da
        Meta.
      </p>

      <h2>6. Outros direitos (LGPD)</h2>
      <p>
        Além da exclusão, você pode solicitar acesso, correção ou portabilidade pelo mesmo canal:{" "}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>. Consulte também a{" "}
        <a href="/privacidade">Política de Privacidade</a>.
      </p>

      <h2>7. Contato</h2>
      <p>
        E-mail: <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
        <br />
        Site: <a href="https://www.kokorosaude.com.br">www.kokorosaude.com.br</a>
      </p>
    </LegalPageLayout>
  );
}

export default ExclusaoDadosPage;
