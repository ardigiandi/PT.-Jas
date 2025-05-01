import BusinessPage from '@/components/fragments/homepage/Business'
import Client from '@/components/fragments/homepage/Client'
import Hero from '@/components/fragments/homepage/Hero'
import VisiMisi from '@/components/fragments/homepage/VisiMisi'
import TentangKami from '@/components/fragments/homepage/Tentang'
import React from 'react'

function  HomePage() {
  return (
    <section>
      <Hero />
      <Client />
      <TentangKami/>
      <VisiMisi />
      <BusinessPage />
    </section>
  )
}

export default  HomePage