import React from 'react'

export default function Loading({message}) {
  return (
    <>
    {message == "Loading..."?
    <div className='flex text-center align-center p-4 bg-red-500 rounded-lg'>
      <h2 className='text-white'>{message}</h2>
    </div> : 
    null}
    </>
  )
}
