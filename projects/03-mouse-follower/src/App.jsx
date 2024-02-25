import { useEffect, useState } from "react"

function App() {
  const [enabled, setEnable] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    console.log('efect :', {enabled})

    const handleMove = (event) =>{
        const {clientX, clientY} = event
        console.log(clientX, clientY)
        setPosition({x: clientX, y: clientY})
    }

    if(enabled){
      window.addEventListener('pointermove', handleMove)
    }
    
    return () => {
      window.removeEventListener('pointermove', handleMove)
      console.log('cleanup')
    }
  }, [enabled])


  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}></div>
      <button onClick={() => setEnable(!enabled)}>{enabled ?  'Desactivar' : 'Activar'} seguir puntero</button>
    </>
  )
}

export default App
