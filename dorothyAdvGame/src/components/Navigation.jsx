import './styleNavigation.css'

function Navigation({lives}){

    return(
        <>
            <div className='w3-container navBar'>
                <h1>Saving Dorothy</h1>
                <p className='livesText'>Lives: {lives}</p>
            </div>
        </>
    )
}

export default Navigation;