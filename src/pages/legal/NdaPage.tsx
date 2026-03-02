
import * as React from "react"
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate"
import { NdaHelperPanel } from "@/components/legal/LegalHelperPanels"

export default function NdaPage() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <LegalPageTemplate 
      title="Non-Disclosure Agreement" 
      lastUpdated="January 15, 2025"
      helperPanel={<NdaHelperPanel />}
      isLoading={isLoading}
    >
      <p className="lead">
        This Non-Disclosure Agreement ("Agreement") is entered into by and between the Disclosing Party and the Receiving Party for the purpose of preventing the unauthorized disclosure of Confidential Information.
      </p>

      <h2 id="definitions">1. Definitions</h2>
      <p>
        "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged. If Confidential Information is in written form, the Disclosing Party shall label or stamp the materials with the word "Confidential" or some similar warning.
      </p>

      <h2 id="obligations">2. Obligations of Receiving Party</h2>
      <p>
        The Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party. The Receiving Party shall carefully restrict access to Confidential Information to employees, contractors, and third parties as is reasonably required and shall require those persons to sign nondisclosure restrictions at least as protective as those in this Agreement.
      </p>

      <h2 id="time-periods">3. Time Periods</h2>
      <p>
        The nondisclosure provisions of this Agreement shall survive the termination of this Agreement and Receiving Party's duty to hold Confidential Information in confidence shall remain in effect until the Confidential Information no longer qualifies as a trade secret or until Disclosing Party sends Receiving Party written notice releasing Receiving Party from this Agreement, whichever occurs first.
      </p>

      <h2 id="relationships">4. Relationships</h2>
      <p>
        Nothing contained in this Agreement shall be deemed to constitute either party a partner, joint venturer or employee of the other party for any purpose.
      </p>

      <h2 id="severability">5. Severability</h2>
      <p>
        If a court finds any provision of this Agreement invalid or unenforceable, the remainder of this Agreement shall be interpreted so as best to effect the intent of the parties.
      </p>

      <h2 id="integration">6. Integration</h2>
      <p>
        This Agreement expresses the complete understanding of the parties with respect to the subject matter and supersedes all prior proposals, agreements, representations, and understandings.
      </p>
      
      <p className="text-sm text-slate-400 mt-8 italic">
        (Legal content to be inserted exactly as provided by Minexchange)
      </p>
    </LegalPageTemplate>
  )
}
