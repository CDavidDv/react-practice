import PropTypes from "prop-types";


export function ResetGameButton({resetGame}) {
    return (
        <button onClick={resetGame} className="py-1 px-2 bg-blue-700 rounded-md hover:bg-blue-600">
            Reiniciar
        </button>
    );
}

ResetGameButton.propTypes = {
    resetGame: PropTypes.func.isRequired
};
