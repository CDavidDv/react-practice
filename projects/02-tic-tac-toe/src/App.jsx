import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'	
import { checkWinnerFrom } from './logic/board.js'
import { WinnerModal } from './components/Winner.jsx'
import { checkEndGame } from './logic/board.js'

function App() {
  const [board, setBoard]  = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)  

  

  const updateBoard = (index) => {
    if(board[index] || winner) return
    const newBoard = [...board] 
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  return (
    <>
      <main className='board'>
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Empezar de nuevo</button>
        <section className='game'>
            {board.map((square, index) => {
              return(
                <Square key={index} index={index} updateBoard={updateBoard}>
                    {square}
                </Square>
              )
            })}
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
      </main>
    </>
  )
}

export default App