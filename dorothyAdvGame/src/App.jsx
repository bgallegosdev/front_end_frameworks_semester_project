import React, { useEffect, useState } from 'react'
import Navigation from './components/navigation'
import ImageContainer from './components/ImageContainer'
import TextContainer from './components/TextContainer'
import ChoiceButtons from './components/ChoiceButtons'
import './App.css'

function App() {
  //Variables for health
  let startingLives = 3;
  const gameOverHealth = 0;
  
  //useState to manage the game paths and health
  const [path, setPath] = useState('sceneZero');
  const [health, setHealth] = useState(startingLives);

  // paths are the scenes used for the adventure game
  const paths = {
    gameOver: {
      Img: {
        src: "/assets/game_over_img.jpg",
        alt: "Skull Image"
      },
      Text: "Your lives have reached zero! Game Over!",

      choices: [
        {leftText: "Start Over", next: "sceneZero"},
        {rightText: "Start Over", next: "sceneZero"}
      ]
    },

    reset: {
      choices: [
        {leftText: "Reset Game", next: "sceneZero"}
      ]
    },

    sceneZero: {
      Img: {
        src: "/assets/scene_zero.jpg",
        alt: "Ruby Slipper"
      },
      Text: "Goal: Dorothy has been stolen by the Wicked Witch of West and needs to be saved by her friends at the witch's castle! You will need to travel through The Haunted Forest and face perilous dangers in order to save their friend in time. Choose your choices wisely!",
      choices: [
        {leftText: "Left: START - 'I'm not afraid of anything!'", next: "sceneOne"},
        {rightText: "Right: START - '*Gulp* What could go wrong?'", next: "sceneOne"}
      ]
    },

    sceneOne: {
      Img: {
        src: "/assets/scene_one_img.jpg",
        alt: "Two Paths Image"
      },
      Text: "ATTENTION: DOROTHY IS MISSING. STOLEN BY THE WICKED WITCH. YOUR TASK IS TO FIND HER. CHOOSE YOUR PATH WISELY.",
      choices: [
        {leftText: "Left: You hear a distint small voice whispering.", next: "sceneTwoA"},
        {rightText: "Right: You hear soft chimes echoing.", next: "sceneTwoB"}
      ]
    },

    sceneTwoA: {
      Img: {
        src: "/assets/scene_two_a.jpg",
        alt: "Cartoon Talking Tree"
      },
      Text: "Tree: 'You! Shhhhhh...evil lurks on every corner here. If it's the castle you seek, tread carefully...my advice will guide you true.'",
      choices: [
        {leftText: "Left: You choose to listen to the tree.", next: "sceneThreeA"},
        {rightText: "Right: You ignore the tree, walk past towards the open field", next: "sceneThreeB"}
      ]
    },

    sceneTwoB: {
      Img: {
        src: "/assets/scene_two_b.jpg",
        alt: "Cartoon Wind Chimes"
      },
      Text: "You hear chimes twinkling a tune. It's calm and warm. There's a note on the tree: 'Help is near, ring the chimes for good fortune.'",
      choices: [
        {leftText: "Left: You have no fear. *Ring the chimes*", next: "sceneThreeC"},
        {rightText: "Right: Something about this isn't right...move on further into the woods.", next: "sceneThreeD"}
      ]
    }
  }

  // Funtions for operating events
  const handlePathClick = (choice) => {
    setPath(choice.next);
  }

  //using CoPilot to help me with this logic
  const rollCheck = (roll) => {
    setHealth((prevHealth) => {
      if (!roll) {
        return prevHealth - 1;
      } else if (roll) {
        return prevHealth + 1;
      }
      return prevHealth;
    });
  };

  //checking if health is ever zero then game over
  useEffect(() => {
    if(health === gameOverHealth){
      setPath('gameOver');
    }
  }, [health]);

  //checking if path is ever reset to sceneZero, reset health
  useEffect(() => {
    if(path === 'sceneZero'){
      setHealth(startingLives);
    }
  }, [path]);

  // Return items to index
  return (
    <>
      <div>
        <div>
          <Navigation lives={health} />
          <ChoiceButtons className='resetButton' choiceText={paths.reset.choices[0].leftText} 
            onClick={() => handlePathClick(paths.reset.choices[0])}/>
          {/* testing */}
          {/* <button onClick={() => rollCheck(true)}>Testing Roll Check (Gain Health)</button> */}
          {/* <button onClick={() => rollCheck(false)}>Testing Roll Check (Lose Health)</button> */}
        </div>
        <ImageContainer sceneImage={paths[path].Img} />
        <TextContainer text={paths[path].Text}/>
        <div className='choicesContainer'>
          <ChoiceButtons className='choiceButtons' choiceText={paths[path].choices[0].leftText} 
            onClick={() => handlePathClick(paths[path].choices[0])}/>
          <ChoiceButtons className='choiceButtons' choiceText={paths[path].choices[1].rightText}
            onClick={() => handlePathClick(paths[path].choices[1])}/>
        </div>
      </div>
    </>
  )
}

export default App
