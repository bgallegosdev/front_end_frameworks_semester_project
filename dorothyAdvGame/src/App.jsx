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
    //Game Over Result
    gameOver: {
      Img: {
        src: "/assets/game_over_img.jpg",
        alt: "Skull Image"
      },
      Text: "Your lives have reached zero! Game Over!",

      choices: [
        {leftText: "Start Over", next: "sceneZero"},
        {rightText: null},
        {rollText: null},
      ],

      displayLeftChange: '',
      displayRightChange: 'none',
      displayRollChange: "none"
    },

    //Reset Button Result
    reset: {
      choices: [
        {leftText: "Reset Game", next: "sceneZero"}
      ],

      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: "none"
    },

    //PASS OR FAIL PATHS FOR ENCOUNTERS
    passRollTree: {
      Img: {
        src: "/assets/pass_icon.svg",
        alt: "Green Check mark"
      },
      Text: "You rolled a passing check! The Trees roots break beneath your strength. You live! You shout, 'I have no times for games you wicked Tree! I have a friend to save!'",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path!", next: 'sceneFourA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    failRollTree: {
      Img: {
        src: "/assets/failed_icon.svg",
        alt: "Red x mark"
      },
      Text: "You rolled a failed check! The Trees roots grow tight on your ankles and you trip down the hill. You hear the Tree laugh horridyly as you fall... You lost a life! Get to zero and you lose...",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path...", next: 'sceneFourB'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    //Starting Paths
    sceneZero: {
      Img: {
        src: "/assets/scene_zero.jpg",
        alt: "Ruby Slipper"
      },
      Text: "Goal: Dorothy has been stolen by the Wicked Witch of West and needs to be saved by her friends at the witch's castle! You will need to travel through The Haunted Forest and face perilous dangers in order to save their friend in time. Choose your choices wisely!",
      choices: [
        {leftText: null},
        {rightText: "START GAME", next: "sceneOne"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: "none"
    },

    sceneOne: {
      Img: {
        src: "/assets/scene_one_img.jpg",
        alt: "Two Paths Image"
      },
      Text: "ATTENTION: DOROTHY IS MISSING. STOLEN BY THE WICKED WITCH. YOUR TASK IS TO FIND HER. CHOOSE YOUR PATH WISELY.",
      choices: [
        {leftText: "Left: You hear a distint small voice whispering.", next: "sceneTwoA"},
        {rightText: "Right: You hear soft chimes echoing.", next: "sceneTwoB"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: "none"
    },

    sceneTwoA: {
      Img: {
        src: "/assets/scene_two_a.jpg",
        alt: "Cartoon Talking Tree"
      },
      Text: "Tree: 'You! Shhhhhh...evil lurks on every corner here. If it's the castle you seek, tread carefully...my advice will guide you true.'",
      choices: [
        {leftText: "Left: You choose to listen to the tree.", next: "sceneThreeA"},
        {rightText: "Right: You ignore the tree, walk past towards the open field", next: "sceneThreeB"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: "none"
    },

    sceneTwoB: {
      Img: {
        src: "/assets/scene_two_b.jpg",
        alt: "Cartoon Wind Chimes"
      },
      Text: "You hear chimes twinkling a tune. It's calm and warm. There's a note on the tree: 'Help is near, ring the chimes for good fortune.'",
      choices: [
        {leftText: "Left: You have no fear. *Ring the chimes*", next: "sceneThreeC"},
        {rightText: "Right: Something about this isn't right...move on further into the woods.", next: "sceneThreeD"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: "none"
    },

    sceneThreeA: {
      Img: {
        src: "/assets/scene_two_a.jpg",
        alt: "Cartoon Talking Tree"
      },
      Text: "Tree: 'HAHAHA... YOU FOOL!!' The Tree's roots begin to wrap around you and you need to roll to save your life!",
      choices: [
        {leftText: null, next: "passRollTree"},
        {rightText: null, next: "failRollTree"},
        {rollText: "Roll for a save! You must get a 5 to 10 to survive!"}
      ],
      displayLeftChange: 'none',
      displayRightChange: 'none',
      displayRollChange: ''
    },
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
      }else{
        return prevHealth;
      }
    });
  };

  //Function for random roll
  const randomRoll = () => {
    let ranRoll = Math.floor(Math.random() * 10);
    console.log("Random Roll: " + ranRoll);
    randomRollCheck(ranRoll);
  }

  //Checking if randomRoll results in lives taken or passed roll
  const randomRollCheck = (ranRoll) =>{
    if(ranRoll >= 5){
      rollCheck(true);
      handlePathClick(paths[path].choices[0]);
    }else{
      rollCheck(false);
      handlePathClick(paths[path].choices[1]);
    }
  }

  //checking if health is ever zero then game over
  useEffect(() => {
    if(health === gameOverHealth){
      console.log("Game Over Triggered");
      setPath('gameOver');
    }
  }, [health]);

  //checking if path is ever reset to sceneZero, reset health
  useEffect(() => {
    if(path === 'sceneZero'){
      console.log("Health Reset");
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
          {/* <button onClick={() => rollCheck(true)}>Testing Roll Check-Gain</button> */}
          {/* <button onClick={() => rollCheck(false)}>Testing Roll Check-Lose</button> */}
          {/* <button onClick={() => randomRoll()}>Testing Roll Check</button> */}
        </div>

        <ImageContainer sceneImage={paths[path].Img} />
        <TextContainer text={paths[path].Text}/>

        <div className='choicesContainer'>
          {/* Left Choice Button */}
          <ChoiceButtons changeStyle={paths[path].displayLeftChange} className='choiceButtons' choiceText={paths[path].choices[0].leftText} 
            onClick={() => handlePathClick(paths[path].choices[0])}/>
          {/* Right Choice Button */}
          <ChoiceButtons changeStyle={paths[path].displayRightChange} className='choiceButtons' choiceText={paths[path].choices[1].rightText}
            onClick={() => handlePathClick(paths[path].choices[1])}/>
          {/* Roll Button - Displays When A Roll is Needed */}
          <ChoiceButtons changeStyle={paths[path].displayRollChange} className='choiceButtons' choiceText={paths[path].choices[2].rollText}
            onClick={() => randomRoll()}/>
        </div>
      </div>
    </>
  )
}

export default App
