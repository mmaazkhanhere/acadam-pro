import React from 'react'
import Hero from './_components/hero'
import FeatureGrid from './_components/feature-grid'

type Props = {}

const RootPage = (props: Props) => {
  return (
    <div className=''>
      <Hero />
      <FeatureGrid />
    </div>
  )
}

export default RootPage