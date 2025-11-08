import ContentSection from '../components/content-section'
import { EnergyProfileForm } from './display-form'

export default function SettingsEnergyProfile() {
  return (
    <ContentSection
      title='Home Profile'
      desc="Your answers are used to personalize your experience and provide better recommendations for reducing your usage and saving money."
    >
      <EnergyProfileForm />
    </ContentSection>
  )
}
