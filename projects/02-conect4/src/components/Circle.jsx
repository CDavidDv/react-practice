export function Circle({turn, winner}) {
      
    const newTurn = turn === 'Y' ? 'R' : 'Y';

    if (winner) {
        return (
            <div className={newTurn === 'Y' ? "size-14 rounded-full bg-yellow-300" : "size-14 rounded-full bg-red-500"}>
            </div>
        );
    }
    
    return (
        <div className={turn === 'Y' ? " size-10 rounded-full bg-yellow-300" : "size-10 rounded-full bg-red-500"}>
        </div>
    );
}
