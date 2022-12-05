import React from 'react'
import './foundvalue.css'

export default function Foundvalue({number}) {
  return (
    <div className='bg-white rounded-xl drop-shadow-xl border-2 border-black mb-6'>
      <h3 className='font-black p-4'>{number} Pokemon found.</h3>
    </div>
  )
}
