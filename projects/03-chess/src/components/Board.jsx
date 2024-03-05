import { useState, useEffect } from 'react';

export function Board() {

    const whiteChessmen = {
        PAWN :'./w-pawn.svg',
        ROOK : './w-rook.svg',
        KNIGHT : './w-knight.svg',
        BISHOP : './w-bshop.svg',
        QUEEN : './w-queen.svg',
        KING :'./w-king.svg',
    }

    const blackChessmen = {
        PAWN : './b-pawn.svg',
        ROOK : './b-rook.svg', 
        KNIGHT : './b-knight.svg', 
        BISHOP : './b-bshop.svg', 
        QUEEN : './b-queen.svg', 
        KING: 'b-king.svg'
    }
    
    const[position, setPosition] = useState({x: 0, y: 0})

    const [turn, setTurn] = useState('WHITE')

    const handleSetTurn = () =>{
        const newTurn = turn === 'WHITE' ? 'BLACK' : 'WHITE'
        setTurn(newTurn)
    }

    const [board, setBoard] = useState(() => {
        const board = Array(8).fill().map(() => Array(8).fill(null));
        //estado inicial de la tabla de ajedrez
        for (let i = 0; i < 8; i++) {
            
            board[7][0] = whiteChessmen.ROOK;
            board[7][1] = whiteChessmen.KNIGHT
            board[7][2] = whiteChessmen.BISHOP
            board[7][3] = whiteChessmen.QUEEN
            board[7][4] = whiteChessmen.KING
            board[7][5] = whiteChessmen.BISHOP
            board[7][6] = whiteChessmen.KNIGHT
            board[7][7] = whiteChessmen.ROOK;
            
            board[6][i] = whiteChessmen.PAWN; 
            board[1][i] = blackChessmen.PAWN;
            
            board[0][0] = blackChessmen.ROOK;
            board[0][1] = blackChessmen.KNIGHT
            board[0][2] = blackChessmen.BISHOP
            board[0][3] = blackChessmen.QUEEN
            board[0][4] = blackChessmen.KING
            board[0][5] = blackChessmen.BISHOP
            board[0][6] = blackChessmen.KNIGHT
            board[0][7] = blackChessmen.ROOK;
        }
         
        return board
    });

    const [selectedPiece, setSelectedPiece] = useState(null)

    const handleSetSelectedPiece= ({cell, x, y}) => {
        setSelectedPiece({cell, x, y})
        setPosition({x, y})    
    }

    function findPieceWhite(symbol) {
        for (const piece in whiteChessmen) {
            if (whiteChessmen[piece] === symbol) {
                return piece;
            }
        }
        return null; 
    }

    function findPieceBlack(symbol) {
        for (const piece in blackChessmen) {
            if (blackChessmen[piece] === symbol) {
                return piece;
            }
        }
        return null;
    }
    
    useEffect(() => {
        
        if(selectedPiece && selectedPiece.cell != null){
            
            if (turn === 'WHITE' && findPieceWhite(selectedPiece.cell)) {
                console.log('white piece');
                console.log(findPieceWhite(selectedPiece.cell));
            } else if(turn === 'BLACK' && findPieceBlack(selectedPiece.cell)){
                console.log('black piece');
                console.log(findPieceBlack(selectedPiece.cell));
            }
        }
    },[selectedPiece])

    return (
        <div className='w-fit mx-auto border-[10px] border-slate-500 m-3 bg-white'>
            {   
                board.map((column, x) => (
                    <div key={x} className="grid grid-cols-8  ">
                        {column.map((cell, y) => (
                            
                            <div onClick={() => handleSetSelectedPiece({cell, x, y })}
                                className={ (x+y)% 2 === 0 ? 
                                    'size-[50px] bg-white  border-slate-300 flex justify-center items-center' : 
                                    'size-[50px] bg-gray-400 border-slate-300 flex justify-center items-center'}
                                key={`${x},${y}`}>
                                
                                {cell && <img className='size-8/12 cursor-pointer  drop-shadow-2xl' src={cell} alt={cell} />}
                            </div> 
                            
                        ))}
                    </div>
                ))
                
            }
        </div>
    );
}
