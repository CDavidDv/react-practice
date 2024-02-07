
export function Cell({ cell, x, y }) {
    
    return(
        <div key={`${x},${y}`}  className="w-12 relative  h-12 bg-slate-100/85 grid place-content-center  rounded-full p-3 cursor-pointer">
            {cell === 'Y' ? <div className="h-full w-full absolute rounded-full bg-yellow-300"></div> : null }
            {cell === 'R' ? <div className="h-full w-full absolute rounded-full bg-red-500"></div> : null }
            
        </div>
    )
}


