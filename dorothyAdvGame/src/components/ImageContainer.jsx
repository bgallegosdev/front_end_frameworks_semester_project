import './styleImageContainer.css';

function ImageContainer({sceneImage}){
    return(
        <>
            <div className='imgContainer'>
                <img className='w3-image w3-round-xlarge' src={sceneImage.src} alt={sceneImage.alt} />
            </div>
        </>
    )
}

export default ImageContainer;