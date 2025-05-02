import BusinessPage from '@/components/fragments/homepage/Business'
import Client from '@/components/fragments/homepage/Klien'
import Hero from '@/components/fragments/homepage/Hero'
import VisiMisi from '@/components/fragments/homepage/VisiMisi'
import TentangKami from '@/components/fragments/homepage/Tentang'
import React from 'react'
import Footer from '@/components/fragments/footer/footer'

function  HomePage() {
  return (
    <section>
      <Hero />
      <Client />
      <TentangKami/>
      <VisiMisi />
      <BusinessPage />
      <Footer />
    </section>
  )
}

export default  HomePage