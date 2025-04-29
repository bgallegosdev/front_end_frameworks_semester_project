import "./styleChoiceButtons.css"

function ChoiceButtons({choiceText, onClick, className}) {
    return(
        <>
            <div className="choiceButtonContainer">
                <button className={`w3-round-xlarge ${className}`} onClick={onClick}>{choiceText}</button>
            </div>
        </>
    )
}

export default ChoiceButtons;