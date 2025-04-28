import './styleNavigation.css'

function Navigation(){
    // Lives indicated by selection
    let lionLives = 4;
    let tinLives = 3;
    let scareLices = 2;

    return(
        <>
            <div className='w3-container navBar'>
                <h1>Saving Dorothy</h1>
                <p>Health Bar: {lionLives}</p>
                <button className='w3-button w3-white w3-text-black w3-round-large'>Reset Game</button>
            </div>
        </>
    )
}

export default Navigation;