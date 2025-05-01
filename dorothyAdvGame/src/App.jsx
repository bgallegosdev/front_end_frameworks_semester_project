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

    passRollTrap: {
      Img: {
        src: "/assets/pass_icon.svg",
        alt: "Green Check mark"
      },
      Text: "You rolled a passing check! You successfully use your agility to jump off the trap in time. You survive!",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path!", next: 'sceneFourA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    failRollTrap: {
      Img: {
        src: "/assets/failed_icon.svg",
        alt: "Red x mark"
      },
      Text: "You rolled a failed check! You attempt to step off the plate, but you aren't fast enough! Suddenly theres a loud whack and you launch forward. You lose a life, get to zero you fail.",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path...", next: 'sceneFourA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    passRollWitch: {
      Img: {
        src: "/assets/pass_icon.svg",
        alt: "Green Check mark"
      },
      Text: "You rolled a passing check! You've broken free from the witch's curse blasting the witch backwards with your spirit. You survive! You run away.",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path!", next: 'sceneFourA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    failRollWitch: {
      Img: {
        src: "/assets/failed_icon.svg",
        alt: "Red x mark"
      },
      Text: "You rolled a failed check! The witch laughs as her curse grows tighter around you. You feel the power toss you and land hard, you lose a life! Get to zero and you fail.",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path...", next: 'sceneFourA'},
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
        {rightText: "Right: You ignore the tree, walk past towards the open field", next: "sceneThreeC"},
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
        {leftText: "Left: You have no fear. *Ring the chimes*", next: "sceneThreeB"},
        {rightText: "Right: Something about this isn't right...move on further into the woods.", next: "sceneThreeC"},
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
        {rollText: "Roll for a save! You must fight to survive!"}
      ],
      displayLeftChange: 'none',
      displayRightChange: 'none',
      displayRollChange: ''
    },

    sceneThreeB: {
      Img: {
        src: "/assets/scene_three_b.jpg",
        alt: "Witch with Candle"
      },
      Text: "When you ring the chimes, a witch comes around the corner. Witch: 'Hello dear. Are you lost? I would gladly cast a spell on you to help you find your way?'",
      choices: [
        {leftText: 'Trust the witch. Let her cast her spell.', next: "sceneFourB"},
        {rightText: 'Run Away from the Witch. You will not trust her', next: "sceneFourC"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneThreeC: {
      Img: {
        src: "/assets/scene_three_c.jpg",
        alt: "Dark Forest Image"
      },
      Text: "As you go deeper into the woods, the foliage gets thicker and the ground becomes uneven. Suddenly, you step on something and hear a click…",
      choices: [
        {leftText: null, next: "passRollTrap"},
        {rightText: null, next: "failRollTrap"},
        {rollText: "You look down and it's a trap! You need to roll to jump and dodge the trap!"}
      ],
      displayLeftChange: 'none',
      displayRightChange: 'none',
      displayRollChange: ''
    },

    sceneFourA: {
      Img: {
        src: "/assets/scene_four_a.jpg",
        alt: "Dark Forest Path"
      },
      Text: "There are two roads again. What will you choose?",
      choices: [
        {leftText: 'Left Path: You think you see light in the distance.', next: "sceneFiveA"},
        {rightText: 'Right Path: You hear nothing. It is quiet.', next: "sceneFourD"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneFourB: {
      Img: {
        src: "/assets/scene_four_b.jpg",
        alt: "Sparkle with Butterflies"
      },
      Text: "You trust the witch. And… She's pleasant! She casts a luck charm on you and you will now be teleported farther.",
      choices: [
        {leftText: null},
        {rightText: 'You are teleported.', next: "sceneSixA"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneFourC: {
      Img: {
        src: "/assets/scene_four_c.jpg",
        alt: "Evil Witch with Wand"
      },
      Text: "You run past the witch but are stopped in your tracks! You feel a dark magic on you... you are turned around and see the witch's eyes turn evil…'YOU WOULD DISTRUST ME?!?'",
      choices: [
        {leftText: null, next: "passRollWitch"},
        {rightText: null, next: "failRollWitch"},
        {rollText: "Your must roll to save yourself from the Witch's grasp."}
      ],
      displayLeftChange: 'none',
      displayRightChange: 'none',
      displayRollChange: ''
    },

    sceneFourD: {
      Img: {
        src: "/assets/scene_four_d.jpg",
        alt: "Dark Pine Bush Foliage"
      },
      Text: "You go into the silent path, and all of sudden you hear a small 'GRRRRRRR!' come from one of the bushes.",
      choices: [
        {leftText: 'You run back and take the other path!', next: "sceneFiveA"},
        {rightText: 'You open the bushes, you have no fear!', next: "sceneFourE"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneFourE: {
      Img: {
        src: "/assets/scene_four_e.jpg",
        alt: "Yorkie Dog Photo"
      },
      Text: "Congratulations! You found a secret! You found… TOTO! Dorothy's dog recognizes you as a friend. He barks and confidently leads you.",
      choices: [
        {leftText: null},
        {rightText: 'Follow Toto!', next: "sceneFiveD"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneFiveA: {
      Img: {
        src: "/assets/scene_five_a.jpg",
        alt: "Field of Poppy Flowers"
      },
      Text: "You soon arrive to an open field of poppy flowers, you see a bridge right across the field.",
      choices: [
        {leftText: 'You jump off the path and run through the field  straight towards the bridge.', next: "sceneFiveC"},
        {rightText: 'You decide to follow the path, around the field.', next: "sceneFiveB"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneFiveB: {
      Img: {
        src: "/assets/scene_five_b.jpg",
        alt: "Bridge to Castle"
      },
      Text: "You go around the field, out of fear of the poppys. You are safe. Nothing happens. You find a break in the vast field, and see the bridge over a river that connects to the Castle.",
      choices: [
        {leftText: 'You don`t see any guards, you run for it.', next: "sceneSixA"},
        {rightText: 'You see a tunnel just below the river bank...it looks somewhat hidden and unknown. You take it.', next: "sceneFiveD"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneFiveC: {
      Img: {
        src: "/assets/scene_five_c.jpg",
        alt: "Storm Clouds with Lightning"
      },
      Text: "You run through the fields and you hear a sudden 'AHHAHAHA, you will not escape my pretties!' the air turns cold, a storm strikes, and you begin to feel sleepy…",
      choices: [
        {leftText: null, next: "passRollPoppy"},
        {rightText: null, next: "failRollPoppy"},
        {rollText: "You  must roll to save yourself from the Sleep spell!"}
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

  //Logic Assistance: Used CoPilot to help me with this logic
  //Explained in my own words: using rollCheck function to determine if the roll was above 5 and was a success. 
  //Explained in my own words: If rollCheck is passed as true, above 5, then the previous state stored in health is left alone and is a success
  //Explained in my own words: If rollCheck is passed as false, fails below a 5, then previous state is decremented to lose a life
  const rollCheck = (roll) => {
    setHealth((prevSavedHealth) => {
      if (!roll) {
        return prevSavedHealth - 1;
      }else{
        return prevSavedHealth;
      }
    });
  };

  //Function for random roll for encounters
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

          {/*Logic Assitance: I needed help with specifically the logic of onClick function, used Copilot to help me trouble shoot onClick code*/}
          {/*Explained in my own words: The code above on the onClick handler for the ChoiceButtons of left and right calls a function handlePathClick by passing the paths object's current path and the choices so the handler can set the next path on click */}
        </div>
      </div>
    </>
  )
}

export default App
