import React from 'react'
import './main.css'
import { ShowJoke } from './components/ShowJoke'

export function App () {
  return (
    <main className='grid place-content-center h-screen bg-slate-200 mx-auto text-slate-700'>
      <h1 className='text-3xl  uppercase font-bold text-center'>Random joke</h1>
      <p className='text-xl text-wrap pb-3 text-center'>Mini project made with React (useState, useEffect, customHooks) </p>
      <p className='text font-semibold text-wrap pb-3 text-center'>Press the button to show you new joke</p>
      <ShowJoke />
    </main>
  )
}
