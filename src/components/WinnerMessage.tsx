
interface Props {
    resetGame: () => void
}

export const WinnerMessage = ({ resetGame }: Props) => {

    return (
        <div className="mensaje-ganaste">
            <span id="mensaje-win" className="btn-neon">
                <span id="span1"></span>
                <span id="span2"></span>
                <span id="span3"></span>
                <span id="span4"></span>
                Felicidades, Ganaste !
                <div className="div-btn">
                    <button className="btn-neon" onClick={resetGame} >
                        <span id="span1"></span>
                        <span id="span2"></span>
                        <span id="span3"></span>
                        <span id="span4"></span>
                        Volver a Jugar
                    </button>
                </div>
            </span>
        </div>
    )
}
