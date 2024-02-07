import { useState } from "react";
import  confetti  from 'canvas-confetti';
import { Circle } from "./Circle";
import { Cell } from "./Cell";
import { WinnerModal } from "./WinnerModal";
import { WINNER_COMBOS } from "./constants";
import { ResetGameButton } from "./ResetGameButton";


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
                const ganador = WINNER_COMBOS.find(
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
            <h1 className='text-4xl font-bold text-slate-100 my-8 text-center '>Connect 4</h1>
            <span className="flex gap-1 place-content-center py-3 font-semibold  "> Turno  de  <Circle turn={turn}  /> 
                <ResetGameButton resetGame={resetGame} />
            </span>
            <section className="grid grid-cols-7 bg-blue-500 border-[8px] border-t-0 border-solid border-x-blue-500 border-b-blue-500">
                {board.map((column, x) => (
                    <div key={x} onClick={() => handleChangeBoard(x)} className=" bg-blue-700 h-full w-full flex flex-col-reverse p-2 gap-2">
                        {column.map((cell, y) => (
                            <Cell cell={cell} x={x} y={y} key={`${x},${y}`} />
                        ))}
                    </div>
                ))}
            </section>
            <WinnerModal winner={winner} resetGame={resetGame} turn={turn} />
        </div>
    );
}