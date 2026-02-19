import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Features />
      <CTASection />
      <Footer />
    </div>
  )
}
