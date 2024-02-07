import { useState } from "react";
import  confetti  from 'canvas-confetti';

export function Tablero() {
    
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        if(boardFromStorage) return JSON.parse(boardFromStorage)
        return  Array(7).fill().map(() => Array(6).fill(null));
    });

    const [turn, setTurn] = useState(() =>{
        
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?? 'Y'
    }
    );

    const [winner, setWinner] = useState(() => {
            const winnerFromStorage = window.localStorage.getItem('winner')
            return winnerFromStorage ?? -1 
        }
    );

    const handleSetWinner = (winner) => {
        setWinner(winner)
        window.localStorage.setItem('winner', winner)
    
    }

    const handleSetTurn = (turn) => {
        const newTurn = turn === 'Y' ? 'R' : 'Y'
        setTurn(newTurn)
        window.localStorage.setItem('turn', newTurn)
    }

    const combosGanadores = [
        [[0,0],[0,1],[0,2],[0,3]],
        [[0,1],[0,2],[0,3],[0,4]],
        [[0,2],[0,3],[0,4],[0,5]],
        [[1,0],[1,1],[1,2],[1,3]],
        [[1,1],[1,2],[1,3],[1,4]],
        [[1,2],[1,3],[1,4],[1,5]],
        [[2,0],[2,1],[2,2],[2,3]],
        [[2,1],[2,2],[2,3],[2,4]],
        [[2,2],[2,3],[2,4],[2,5]],
        [[3,0],[3,1],[3,2],[3,3]],
        [[3,1],[3,2],[3,3],[3,4]],
        [[3,2],[3,3],[3,4],[3,5]],
        [[4,0],[4,1],[4,2],[4,3]],
        [[4,1],[4,2],[4,3],[4,4]],
        [[4,2],[4,3],[4,4],[4,5]],
        [[5,0],[5,1],[5,2],[5,3]],
        [[5,1],[5,2],[5,3],[5,4]],
        [[5,2],[5,3],[5,4],[5,5]],
        [[6,0],[6,1],[6,2],[6,3]],
        [[6,1],[6,2],[6,3],[6,4]],
        [[6,2],[6,3],[6,4],[6,5]],
        [[0,0],[1,0],[2,0],[3,0]],
        [[1,0],[2,0],[3,0],[4,0]],
        [[2,0],[3,0],[4,0],[5,0]],
        [[3,0],[4,0],[5,0],[6,0]],
        [[0,1],[1,1],[2,1],[3,1]],
        [[1,1],[2,1],[3,1],[4,1]],
        [[2,1],[3,1],[4,1],[5,1]],
        [[3,1],[4,1],[5,1],[6,1]],
        [[0,2],[1,2],[2,2],[3,2]],
        [[1,2],[2,2],[3,2],[4,2]],
        [[2,2],[3,2],[4,2],[5,2]],
        [[3,2],[4,2],[5,2],[6,2]],
        [[0,3],[1,3],[2,3],[3,3]],
        [[1,3],[2,3],[3,3],[4,3]],
        [[2,3],[3,3],[4,3],[5,3]],
        [[3,3],[4,3],[5,3],[6,3]],
        [[0,4],[1,4],[2,4],[3,4]],
        [[1,4],[2,4],[3,4],[4,4]], 
        [[2,4],[3,4],[4,4],[5,4]],
        [[3,4],[4,4],[5,4],[6,4]],
        [[0,5],[1,5],[2,5],[3,5]],
        [[1,5],[2,5],[3,5],[4,5]],
        [[2,5],[3,5],[4,5],[5,5]],
        [[3,5],[4,5],[5,5],[6,5]],
        [[0,0],[1,1],[2,2],[3,3]],
        [[1,1],[2,2],[3,3],[4,4]],
        [[2,2],[3,3],[4,4],[5,5]],
        [[0,1],[1,2],[2,3],[3,4]],
        [[1,2],[2,3],[3,4],[4,5]],
        [[0,2],[1,3],[2,4],[3,5]],
        [[1,0],[2,1],[3,2],[4,3]],
        [[2,1],[3,2],[4,3],[5,4]],
        [[3,2],[4,3],[5,4],[6,5]],
        [[2,0],[3,1],[4,2],[5,3]],
        [[3,1],[4,2],[5,3],[6,4]],
        [[3,0],[4,1],[5,2],[6,3]],
        [[0,3],[1,2],[2,1],[3,0]],
        [[0,4],[1,3],[2,2],[3,1]],
        [[1,3],[2,2],[3,1],[4,0]],
        [[0,5],[1,4],[2,3],[3,2]],
        [[1,4],[2,3],[3,2],[4,1]],
        [[2,3],[3,2],[4,1],[5,0]],
        [[1,5],[2,4],[3,3],[4,2]],
        [[2,4],[3,3],[4,2],[5,1]],
        [[3,3],[4,2],[5,1],[6,0]],
        [[2,5],[3,4],[4,3],[5,2]],
        [[3,4],[4,3],[5,2],[6,1]],
        [[3,5],[4,4],[5,3],[6,2]],
    ]

    const resetGame = () => {
        setBoard(Array(7).fill().map(() => Array(6).fill(null)));
        setTurn('Y');
        handleSetWinner(-1)
        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
        
    }

    const handleChangeBoard = (x) => {

        if(winner === 1) return
        
        const newBoard = board.map(row => [...row]);

        if (newBoard[x].every(cell => cell !== null))  return

        for (let i = 0; i <= board[0].length ; i++) {
            
            if (newBoard[x][i] === null) {
                newBoard[x][i] = turn;
                
                const jugador = newBoard[x][i];
                const ganador = combosGanadores.find(
                    combo => combo.every(
                        cell => newBoard[cell[0]][cell[1]] === jugador));

                if (ganador) {
                    handleSetWinner(1);
                    confetti();
                }

                break;
            }
        }

        
        
        setBoard(newBoard);
        handleSetTurn(turn)

        if (newBoard.every(row => row.every(cell => cell !== null))){
            handleSetWinner(0);
            return;
        }
        
        
        window.localStorage.setItem('board', JSON.stringify(newBoard))
    }

    return (
        <div className="tablero">
            {winner >= 0 ? (<section className='winner absolute h-screen w-screen grid place-content-center bg-black/80 top-0 left-0 z-50'>
            <div className='text flex flex-col text-center bg-gray-900 rounded-xl p-20'>
              <h2>
                {
                  winner === 0 ? 'Empate' : 'Ganó:'
                }
              </h2>
    
              <header className='win place-content-center grid'>  
                  {winner && <>{turn === 'Y' ? <div className="h-14 w-14 rounded-full bg-red-500"></div> : <div className="bg-yellow-300 h-14 w-14 rounded-full"></div> }</>}
              </header>
        
              <footer>
                  <button onClick={resetGame} className="bg-blue-700 rounded-md py-2 px-3 mt-3 hover:bg-blue-600">Empezar de nuevo</button>
              </footer>

            </div>              
          </section>) : null }
            
            <h1 className='text-4xl font-bold text-slate-100 my-8 text-center '>Connect 4</h1>
            <span className="flex gap-1 place-content-center py-3 font-semibold  "> Turno  de {turn === 'Y' ? (<div className="p-1 bg-white"><div className="h-6 w-6 rounded-full bg-yellow-300"></div></div>) : <div className="bg-red-500 h-5 w-5 rounded-full"></div> } 
                <button onClick={resetGame} className="py-1 px-2 bg-blue-700 rounded-md hover:bg-blue-600">Reiniciar</button>
            </span>
            <section className="grid grid-cols-7 bg-blue-500 border-[8px] border-t-0 border-solid border-x-blue-500 border-b-blue-500">
                {board.map((column, x) => (
                    <div key={x} onClick={() => handleChangeBoard(x)} className=" bg-blue-700 h-full w-full flex flex-col-reverse p-2 gap-2">
                        {column.map((cell, y) => (
                            <div key={`${x},${y}`}  className="w-12 relative  h-12 bg-slate-100/85 grid place-content-center  rounded-full p-3 cursor-pointer">
                                {cell === 'Y' ? <div className="h-full w-full absolute rounded-full bg-yellow-300"></div> : null }
                                {cell === 'R' ? <div className="h-full w-full absolute rounded-full bg-red-500"></div> : null }
                                
                            </div>
                        ))}
                    </div>
                ))}
            </section>
        </div>
    );
}