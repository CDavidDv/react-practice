import React, { useState, useEffect } from 'react'

export function ShowJoke () {
  // Estado para almacenar el chiste
  const [joke, setJoke] = useState(null)

  // Función para cargar un chiste
  const fetchJoke = () => {
    fetch('https://v2.jokeapi.dev/joke/Programming?lang=es')
      .then(res => res.json())
      .then(data => {
        if (data.type === 'single') {
          setJoke(data.joke)
        } else {
          setJoke(`${data.setup} ... ${data.delivery}`)
        }
      })
      .catch(error => console.error('Error fetching joke:', error))
  }

  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <>
      <div className='w-full flex justify-center'>
        <button onClick={fetchJoke} className='bg-blue-600 w-fit text-white py-2 px-4 rounded-md'>
          Show Joke
        </button>
      </div>
      <div className='w-full justify-center flex mt-5 bg-white border-2'>
        <div className='p-4'>
          {joke && <label>{joke}</label>}
        </div>
      </div>
    </>
  )
}
