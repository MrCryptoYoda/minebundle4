
import * as React from "react"
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate"
import { FacilitationHelperPanel } from "@/components/legal/LegalHelperPanels"

export default function FacilitationAgreementPage() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <LegalPageTemplate 
      title="Facilitation Agreement" 
      lastUpdated="February 10, 2025"
      helperPanel={<FacilitationHelperPanel />}
      isLoading={isLoading}
    >
      <p className="lead">
        This Facilitation Agreement ("Agreement") sets forth the terms and conditions under which Minexchange ("Facilitator") agrees to provide facilitation services to the User ("Client").
      </p>

      <h2 id="services">1. Services Provided</h2>
      <p>
        Facilitator agrees to provide the following services: connecting Client with potential counterparties, providing access to the platform's data room features, and assisting with the coordination of due diligence processes.
      </p>

      <h2 id="fees">2. Fees and Commissions</h2>
      <p>
        In consideration for the services provided, Client agrees to pay Facilitator the fees as outlined in the separate Fee Schedule or specific deal term sheet. All fees are due upon the successful closing of a transaction unless otherwise agreed.
      </p>

      <h2 id="term">3. Term and Termination</h2>
      <p>
        This Agreement shall commence on the Effective Date and continue until terminated by either party with thirty (30) days written notice.
      </p>

      <h2 id="confidentiality">4. Confidentiality</h2>
      <p>
        Both parties agree to keep confidential all non-public information provided by the other party in connection with the services, in accordance with the platform's Non-Disclosure Agreement.
      </p>

      <h2 id="limitation-liability">5. Limitation of Liability</h2>
      <p>
        Facilitator shall not be liable for any indirect, special, consequential, or punitive damages arising out of or relating to this Agreement or the services provided hereunder.
      </p>

      <h2 id="governing-law">6. Governing Law</h2>
      <p>
        This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which Minexchange is incorporated.
      </p>
      
      <p className="text-sm text-slate-400 mt-8 italic">
        (Legal content to be inserted exactly as provided by Minexchange)
      </p>
    </LegalPageTemplate>
  )
}
