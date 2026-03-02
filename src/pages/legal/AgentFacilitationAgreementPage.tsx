
import * as React from "react"
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate"
import { AgentFacilitationHelperPanel } from "@/components/legal/LegalHelperPanels"

export default function AgentFacilitationAgreementPage() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <LegalPageTemplate 
      title="Agent Facilitation Agreement" 
      lastUpdated="March 01, 2025"
      helperPanel={<AgentFacilitationHelperPanel />}
      isLoading={isLoading}
    >
      <p className="lead">
        This Agent Facilitation Agreement ("Agreement") outlines the terms under which an authorized Agent ("Agent") may use the Minexchange platform to represent clients and facilitate transactions.
      </p>

      <h2 id="agent-obligations">1. Agent Obligations</h2>
      <p>
        Agent represents and warrants that they have the legal authority to act on behalf of their clients. Agent agrees to provide accurate and complete information regarding any listings or requirements posted on the platform.
      </p>

      <h2 id="commission-sharing">2. Commission Sharing</h2>
      <p>
        Agent acknowledges that commissions may be shared with Minexchange or other cooperating agents as per the specific deal terms agreed upon prior to the introduction of a counterparty.
      </p>

      <h2 id="exclusivity">3. Exclusivity</h2>
      <p>
        Unless otherwise agreed in writing, listings posted by Agent on the platform are non-exclusive, but Agent grants Minexchange the right to market such listings to its registered user base.
      </p>

      <h2 id="conduct">4. Code of Conduct</h2>
      <p>
        Agent agrees to adhere to the highest professional standards and comply with all applicable laws and regulations regarding real estate and asset transactions.
      </p>

      <h2 id="indemnification">5. Indemnification</h2>
      <p>
        Agent agrees to indemnify and hold harmless Minexchange from any claims, damages, or expenses arising out of Agent's breach of this Agreement or negligence.
      </p>

      <h2 id="dispute-resolution">6. Dispute Resolution</h2>
      <p>
        Any disputes arising under this Agreement shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
      </p>
      
      <p className="text-sm text-slate-400 mt-8 italic">
        (Legal content to be inserted exactly as provided by Minexchange)
      </p>
    </LegalPageTemplate>
  )
}
