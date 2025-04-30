import "./styleChoiceButtons.css"

function ChoiceButtons({choiceText, onClick, className, changeStyle}) {
    return(
        <>
            <div className="choiceButtonContainer">
                <button style={{display: changeStyle}} className={`w3-round-xlarge ${className}`} onClick={onClick}>{choiceText}</button>
            </div>
        </>
    )
}

export default ChoiceButtons;