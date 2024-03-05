import React from 'react'
import './App.css'
import { Board } from './components/Board'

export function App(){
    return (
        <main className='grid place-content-center h-screen max-w-5xl mx-auto text-slate-200'>
            <h1 className='text-3xl uppercase font-bold text-center'>Chess</h1>
            <p className='text text-wrap pb-3'>A simple chess game made with React (useState, useEffect, customHooks) </p>
            
            <Board />
            
        </main>
    )
}