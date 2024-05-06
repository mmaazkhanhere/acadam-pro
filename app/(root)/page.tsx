import React from 'react'
import Hero from './_components/hero'
import FeatureGrid from './_components/feature-grid'
import AboutUsSection from './_components/about-us-section'
import JoinTeacher from './_components/join-teacher'
import BlogSection from './_components/blog-section'

type Props = {}

const RootPage = (props: Props) => {
  return (
    <div className=''>
      <Hero />
      <FeatureGrid />
      <AboutUsSection />
      <JoinTeacher />
      <BlogSection />
    </div>
  )
}

export default RootPage