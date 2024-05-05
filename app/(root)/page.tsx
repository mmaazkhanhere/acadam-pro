import React from 'react'
import Hero from './_components/hero'
import FeatureGrid from './_components/feature-grid'
import AboutUsSection from './_components/about-us-section'
import JoinTeacher from './_components/join-teacher'

type Props = {}

const RootPage = (props: Props) => {
  return (
    <div className=''>
      <Hero />
      <FeatureGrid />
      <AboutUsSection />
      <JoinTeacher />
    </div>
  )
}

export default RootPage