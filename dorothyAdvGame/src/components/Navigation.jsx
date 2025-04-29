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
                <p>Lives: {lionLives}</p>
            </div>
        </>
    )
}

export default Navigation;