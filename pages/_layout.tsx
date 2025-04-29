import React, { ReactNode } from 'react'
import Navbar from '../components/Navbar'

export default function Layout({children}:{children?: ReactNode}) {
  return (
      <div>
          <Navbar />
          {children}
      </div>
  )
}
