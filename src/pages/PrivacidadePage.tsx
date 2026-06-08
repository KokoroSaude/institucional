import { LegalPageLayout } from "../components/LegalPageLayout";

const CONTACT = "contato@kokorosaude.com.br";

export function PrivacidadePage() {
  return (
    <LegalPageLayout title="Política de Privacidade" updatedAt="8 de junho de 2026">
      <p>
        Esta Política de Privacidade descreve como a <strong>Kokoro</strong> (“nós”, “nosso”)
        trata dados pessoais no site institucional, no portal de parceiros e na plataforma de
        adesão medicamentosa via WhatsApp operada em nome de farmácias e organizações de saúde
        (“Organizações parceiras”).
      </p>

      <h2>1. Quem somos</h2>
      <p>
        A Kokoro é uma solução de tecnologia para acompanhamento de adesão medicamentosa. O
        controlador dos dados pode ser a Organização parceira (farmácia/rede) em relação aos
        pacientes atendidos, com a Kokoro atuando como operadora de tratamento conforme contrato
        e instruções do parceiro. Dúvidas gerais:{" "}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
      </p>

      <h2>2. Dados que coletamos</h2>
      <ul>
        <li>
          <strong>Pacientes (WhatsApp):</strong> número de telefone, nome, informações de
          medicamento e rotina informadas na conversa, respostas de check-in, consentimentos e
          histórico de interações necessário à jornada de cuidado.
        </li>
        <li>
          <strong>Usuários do portal (parceiros):</strong> nome, e-mail, credenciais de acesso,
          organização vinculada e registros de uso administrativo.
        </li>
        <li>
          <strong>Site institucional:</strong> dados técnicos de navegação (logs, IP, cookies
          essenciais) quando aplicável.
        </li>
      </ul>
      <p>
        Minimizamos o tratamento: o conteúdo livre das mensagens dos pacientes não é utilizado
        para fins alheios à prestação do serviço, e logs operacionais evitam registrar texto
        clínico desnecessário.
      </p>

      <h2>3. Finalidades e bases legais (LGPD)</h2>
      <ul>
        <li>Prestação do serviço de adesão e comunicação via WhatsApp (execução de contrato e consentimento).</li>
        <li>Envio de lembretes, follow-up e mensagens de apoio autorizadas pelo paciente.</li>
        <li>Segurança, prevenção a fraudes e auditoria da plataforma (legítimo interesse e obrigação legal).</li>
        <li>Atendimento a solicitações de titulares e autoridades (obrigação legal).</li>
      </ul>

      <h2>4. Compartilhamento</h2>
      <p>Podemos compartilhar dados com:</p>
      <ul>
        <li>
          <strong>Meta / WhatsApp</strong> — para entrega de mensagens na Plataforma WhatsApp
          Business, conforme políticas da Meta.
        </li>
        <li>
          <strong>Provedores de infraestrutura</strong> (hospedagem, banco de dados, e-mail) sob
          contratos de confidencialidade e proteção de dados.
        </li>
        <li>
          <strong>Organização parceira</strong> — titular da relação com o paciente, com acesso
          aos dados necessários no portal.
        </li>
      </ul>
      <p>Não vendemos dados pessoais.</p>

      <h2>5. Retenção</h2>
      <p>
        Mantemos os dados pelo tempo necessário à prestação do serviço, cumprimento de obrigações
        legais e exercício regular de direitos. Após exclusão solicitada ou término do vínculo,
        aplicamos eliminação ou anonimização conforme política interna e contratos com parceiros.
      </p>

      <h2>6. Direitos do titular</h2>
      <p>
        Nos termos da LGPD, você pode solicitar confirmação de tratamento, acesso, correção,
        anonimização, portabilidade, eliminação, informação sobre compartilhamentos e revogação
        de consentimento, quando aplicável. Pacientes podem também encerrar comunicações enviando{" "}
        <strong>sair</strong>, <strong>parar</strong>, <strong>cancelar</strong> ou{" "}
        <strong>stop</strong> pelo WhatsApp.
      </p>
      <p>
        Solicitações: <a href={`mailto:${CONTACT}`}>{CONTACT}</a> ou página de{" "}
        <a href="/exclusao-de-dados">exclusão de dados</a>.
      </p>

      <h2>7. Segurança</h2>
      <p>
        Adotamos medidas técnicas e administrativas proporcionais ao risco, incluindo controle de
        acesso, criptografia em trânsito, segregação por organização e trilhas de auditoria.
      </p>

      <h2>8. Transferências internacionais</h2>
      <p>
        Alguns provedores (ex.: infraestrutura em nuvem ou Meta) podem processar dados fora do
        Brasil. Nesses casos, buscamos garantias contratuais e mecanismos compatíveis com a LGPD.
      </p>

      <h2>9. Alterações</h2>
      <p>
        Podemos atualizar esta política. A data da versão vigente consta no topo desta página.
        Mudanças relevantes serão comunicadas pelos canais adequados.
      </p>

      <h2>10. Contato</h2>
      <p>
        Encarregado / canal de privacidade: <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
      </p>
    </LegalPageLayout>
  );
}

export default PrivacidadePage;
