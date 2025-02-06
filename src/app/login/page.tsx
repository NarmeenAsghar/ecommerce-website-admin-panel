"use client"
import React from 'react'
import LoginPage from '../components/LoginPage'

function page() {
  return (
    <div>
      <LoginPage onLoginSuccess={function (): void {
              throw new Error('Function not implemented.')
          } } />
    </div>
  )
}

export default page
