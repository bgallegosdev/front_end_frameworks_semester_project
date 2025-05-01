import './styleTextContainer.css';

function TextContainer({text}){
    return(
        <>
            <div className='w3-round textContainer'>
                <p className='storyText'>{text}</p>
            </div>
        </>
    )
} 

export default TextContainer;