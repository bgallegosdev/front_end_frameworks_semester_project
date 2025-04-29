import "./styleChoiceButtons.css"

function ChoiceButtons({choiceText, onClick}) {
    return(
        <>
            <div className="choiceButtonContainer">
                <button className="w3-round-xlarge choiceButtons" onClick={onClick}>{choiceText}</button>
            </div>
        </>
    )
}

export default ChoiceButtons;