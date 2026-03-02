
import * as React from "react"
import { LegalPageTemplate } from "@/components/legal/LegalPageTemplate"

export default function PrivacyPolicyPage() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <LegalPageTemplate 
      title="Privacy Policy" 
      lastUpdated="October 24, 2024"
      isLoading={isLoading}
    >
      <p className="lead">
        This Privacy Policy describes how Minexchange ("we", "us", or "our") collects, uses, and discloses your personal information when you use our website and services.
      </p>

      <h2 id="info-we-collect">1. Information We Collect</h2>
      <p>
        We collect information that you provide directly to us, such as when you create an account, update your profile, list an asset, or communicate with us. This may include:
      </p>
      <ul>
        <li>Name, email address, and phone number</li>
        <li>Company information and professional title</li>
        <li>Transaction and listing details</li>
        <li>Payment information (processed by third-party providers)</li>
      </ul>

      <h2 id="how-we-use">2. How We Use Information</h2>
      <p>
        We use the information we collect to provide, maintain, and improve our services, including to:
      </p>
      <ul>
        <li>Facilitate transactions and connections between buyers, sellers, and agents</li>
        <li>Process payments and send notifications</li>
        <li>Verify identities and prevent fraud</li>
        <li>Analyze usage trends and improve user experience</li>
      </ul>

      <h2 id="data-retention">3. Data Retention</h2>
      <p>
        We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
      </p>

      <h2 id="third-party">4. Third-Party Services</h2>
      <p>
        We may share your information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
      </p>

      <h2 id="cookies">5. Cookies</h2>
      <p>
        We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
      </p>

      <h2 id="contact">6. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at privacy@minexchange.com.
      </p>
      
      <p className="text-sm text-slate-400 mt-8 italic">
        (Legal content to be inserted exactly as provided by Minexchange)
      </p>
    </LegalPageTemplate>
  )
}
