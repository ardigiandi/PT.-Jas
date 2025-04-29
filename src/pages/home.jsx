import BusinessPage from '@/components/fragments/homepage/Business'
import Business from '@/components/fragments/homepage/Business'
import Client from '@/components/fragments/homepage/Client'
import Hero from '@/components/fragments/homepage/Hero'
import ManagePage from '@/components/fragments/homepage/Manage'
import UnseenPage from '@/components/fragments/homepage/Unseen'
import React from 'react'

function  HomePage() {
  return (
    <section>
      <Hero />
      <Client />
      <ManagePage />
      <UnseenPage />
      <BusinessPage />
    </section>
  )
}

export default  HomePage