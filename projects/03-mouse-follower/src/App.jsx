import { useEffect, useState } from "react"

function App() {
  const [enable, setEnable] = useState(false)

  useEffect(() => {
    setEnable(true)
  }, [])


  return (
    <>
      <h3>Proyecto 3</h3>
      <button onClick={() => setEnable(!enable)}>{enable ?  'Desactivar' : 'Activar'} seguir puntero</button>
    </>
  )
}

export default App
