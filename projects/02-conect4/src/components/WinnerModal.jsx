import { Circle } from './Circle'


export function WinnerModal({winner, resetGame, turn}){
    return (
        <>
        {winner >= 0 ? (<section className='winner absolute h-screen w-screen grid place-content-center bg-black/80 top-0 left-0 z-50'>
            <div className='text flex flex-col text-center bg-gray-900 rounded-xl p-20'>
              <h2 className="text-3xl font-bold py-2">
                {
                  winner === 0 ? 'Empate' : 'Ganó:'
                }
              </h2>
    
              <header className='win place-content-center grid'>  
                  {winner && <Circle winner={winner} turn={turn} />}
              </header>
        
              <footer>
                  <button onClick={resetGame} className="bg-blue-700 rounded-md py-2 px-3 mt-3 hover:bg-blue-600">Empezar de nuevo</button>
              </footer>

            </div>              
          </section>) : null 
          }</>
    ) 
}
