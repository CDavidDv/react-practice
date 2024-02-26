import React from 'react'
import './App.css'
import { Board } from './components/Board'

export function App(){
    return (
        <main className='grid place-content-center h-screen max-w-5xl mx-auto '>
            <h1 className='text-3xl uppercase font-bold text-center'>Chess</h1>
            <p className='text-lg text-wrap'>A simple chess game made with React (useState, useEffect, customHooks) </p>
                
            <Board />
            
        </main>
    )
}