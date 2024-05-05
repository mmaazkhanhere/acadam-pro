import React from 'react'
import Hero from './_components/hero'
import FeatureGrid from './_components/feature-grid'
import AboutUsSection from './_components/about-us-section'

type Props = {}

const RootPage = (props: Props) => {
  return (
    <div className=''>
      <Hero />
      <FeatureGrid />
      <AboutUsSection />
    </div>
  )
}

export default RootPage