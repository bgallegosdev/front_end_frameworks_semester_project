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
      Text: "You rolled a passing check! The Trees roots break beneath your strength. You live! You shout, 'I have no time for games you wicked Tree! I have a friend to save!'",
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
        {rightText: "Continue on your path...", next: 'sceneFourA'},
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

    passRollPoppy: {
      Img: {
        src: "/assets/pass_icon.svg",
        alt: "Green Check mark"
      },
      Text: "You rolled a passing check! You fight through the Wicked Witch's laughs, you burst through the field no problem! You hear the witch scream with rage. You survive!",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path!", next: 'sceneFiveD'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    failRollPoppy: {
      Img: {
        src: "/assets/failed_icon.svg",
        alt: "Red x mark"
      },
      Text: "You rolled a failed check! The magic and storm are too strong for you...You suddenly fall into the field into a fast sleep. You lose a life! Get to zero and you fail.",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path...", next: 'sceneSixA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    passRollTroll: {
      Img: {
        src: "/assets/pass_icon.svg",
        alt: "Green Check mark"
      },
      Text: "You rolled a passing check! You successfully overpower the cave troll! You push the troll over the bridge and into the river! You survive!",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path!", next: 'sceneSevenA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    failRollTroll: {
      Img: {
        src: "/assets/failed_icon.svg",
        alt: "Red x mark"
      },
      Text: "You rolled a failed check! You manage to outsmart the troll but the damage is done! You lose a life! Get to zero and you fail.",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path...", next: 'sceneSevenA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    passRollTrollSleep: {
      Img: {
        src: "/assets/pass_icon.svg",
        alt: "Green Check mark"
      },
      Text: "You rolled a passing check! You manage to sneak past the sleeping troll as he snores. Success! You survive!",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path!", next: 'sceneSevenA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    failRollTrollSleep: {
      Img: {
        src: "/assets/failed_icon.svg",
        alt: "Red x mark"
      },
      Text: "You rolled a failed check! You start walking past the troll and accidentally knock over the trolls wooden weapon on his head! You lose a life! Get to zero and you fail!",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path...", next: 'sceneSixE'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    passRollMimic: {
      Img: {
        src: "/assets/pass_icon.svg",
        alt: "Green Check mark"
      },
      Text: "You rolled a passing check! You run as fast as you can. The mimic slowly attempts to lunge and you but are faster! Success! You survive!",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path!", next: 'sceneSevenA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    failRollMimic: {
      Img: {
        src: "/assets/failed_icon.svg",
        alt: "Red x mark"
      },
      Text: "You rolled a failed check! You run as fast as you can. But as soon as you exit the tunnel, the mimic is able to bite at your ankle. You lose a life. Get to zero and you fail!",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path...", next: 'sceneSevenA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    passRollMonkey: {
      Img: {
        src: "/assets/pass_icon.svg",
        alt: "Green Check mark"
      },
      Text: "You rolled a passing check! You best the Flying Monkey guard as he tries to lunge at you with his spear. You dodge and you are able to knock him out. Success! You survive!",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path!", next: 'sceneNineA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    failRollMonkey: {
      Img: {
        src: "/assets/failed_icon.svg",
        alt: "Red x mark"
      },
      Text: "You rolled a failed check! The Flying Monkey guard is too fast! You barely manage to escape and trap him in the room, but the damage is done. You lose a life. Get to zero and you fail!",
      choices: [
        {leftText: null},
        {rightText: "Continue on your path...", next: 'sceneNineA'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    passRollWickedWitch: {
      Img: {
        src: "/assets/pass_icon.svg",
        alt: "Green Check mark"
      },
      Text: "You have worked so hard for this moment. The journey was long and dangerous. And you manged to best the Wicked Witch of the West!",
      choices: [
        {leftText: null},
        {rightText: "Success!", next: 'sceneTenC'},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    failRollWickedWitch: {
      Img: {
        src: "/assets/failed_icon.svg",
        alt: "Red x mark"
      },
      Text: "You rolled a failed check! You try hard to beat the Wicked Witch. But she is truly the strongest witch. She beats you with her broomstick on fire. You lose a life. Get to zero and you fail!",
      choices: [
        {leftText: null},
        {rightText: "You must try a different route or try fighting the witch again…", next: 'sceneNineB'},
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

    sceneFiveD: {
      Img: {
        src: "/assets/scene_five_d.jpg",
        alt: "Underground Tunnel"
      },
      Text: "You choose to go into the secret tunnel under the river. You follow the small path that bypasses the bridge troll!",
      choices: [
        {leftText: null},
        {rightText: 'Continue into the secret tunnel!', next: "sceneSixB"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneSixA: {
      Img: {
        src: "/assets/scene_six_a.jpg",
        alt: "Troll Figure"
      },
      Text: "You arrive at the front of the Bridge that connects to the castle over the river. And suddenly you see a very large Bridge Toll that will surely crush you...",
      choices: [
        {leftText: 'No fear! Confront the cave troll!', next: "sceneSixC"},
        {rightText: 'You decide that smarts is the way to go. You wait until midnight for the troll to fall asleep.', next: "sceneSixD"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneSixB: {
      Img: {
        src: "/assets/scene_six_b.jpg",
        alt: "Treasure Chest"
      },
      Text: "You walk further into the tunnel and you find a glowing chest! It is tattered and worn but the inside is glowing a gold light. As you approach, the tunnel shakes. Or was it the chest?",
      choices: [
        {leftText: 'Open the chest!', next: "sceneSixF"},
        {rightText: 'You don`t trust it…move on.', next: "sceneSevenA"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneSixC: {
      Img: {
        src: "/assets/scene_six_c.jpg",
        alt: "Battle Armor and Sword"
      },
      Text: "You approach the troll, needing to fight. The troll grunts and seems to laugh at you.",
      choices: [
        {leftText: null, next: "passRollTroll"},
        {rightText: null, next: "failRollTroll"},
        {rollText: "Attack the troll! You must roll to beat this troll and pass the bridge!"}
      ],
      displayLeftChange: 'none',
      displayRightChange: 'none',
      displayRollChange: ''
    },

    sceneSixD: {
      Img: {
        src: "/assets/scene_six_d.jpg",
        alt: "Moon in Forest"
      },
      Text: "You wait for the troll to sleep close to midnight. It works. But for how long? It appears it is resting…",
      choices: [
        {leftText: null, next: "passRollTrollSleep"},
        {rightText: null, next: "failRollTrollSleep"},
        {rollText: "You need to roll for passing the troll while sleeping. Don't wake him!"}
      ],
      displayLeftChange: 'none',
      displayRightChange: 'none',
      displayRollChange: ''
    },

    sceneSixE: {
      Img: {
        src: "/assets/scene_six_e.jpg",
        alt: "Red Moon"
      },
      Text: "You woke up the troll! The troll scoffs and picks up his wooden weapon. You must now confront the troll!",
      choices: [
        {leftText: null, next: "passRollTroll"},
        {rightText: null, next: "failRollTroll"},
        {rollText: "Attack the troll! You must roll to beat this troll and pass the bridge!"}
      ],
      displayLeftChange: 'none',
      displayRightChange: 'none',
      displayRollChange: ''
    },

    sceneSixF: {
      Img: {
        src: "/assets/scene_six_f.jpg",
        alt: "Sharp Cave"
      },
      Text: "You reach down and lift the unbuckled lock of the chest… You see hundreds of little sets of teeth and a tongue..IT IS A MIMIC! You were too greedy…",
      choices: [
        {leftText: null, next: "passRollMimic"},
        {rightText: null, next: "failRollMimic"},
        {rollText: "You must run from the mimic! Roll to run away from the mimic as fast as you can!"}
      ],
      displayLeftChange: 'none',
      displayRightChange: 'none',
      displayRollChange: ''
    },

    sceneSevenA: {
      Img: {
        src: "/assets/scene_seven_a.jpg",
        alt: "Dark Castle"
      },
      Text: "You have made it. Through trial and error, you have arrived at the Wicked Witch`s castle. ",
      choices: [
        {leftText: null},
        {rightText: 'Approach the doors.', next: "sceneSevenB"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneSevenB: {
      Img: {
        src: "/assets/scene_seven_b.jpg",
        alt: "Castle Doors"
      },
      Text: "The doors are large and dark, with dark letters of a language you do not understand…",
      choices: [
        {leftText: 'Burst through the doors. You need to make a statement.', next: "sceneSevenC"},
        {rightText: 'The doors have large round metal door knocker rings on them. You clang the rings against the door three times.', next: "sceneSevenD"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneSevenC: {
      Img: {
        src: "/assets/scene_seven_cd.jpg",
        alt: "Castle Steps"
      },
      Text: "You are brave. You burst through the doors with fists above your head. And…no one is there",
      choices: [
        {leftText: null},
        {rightText: 'Proceed into the Great Hall.', next: "sceneSevenE"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneSevenD: {
      Img: {
        src: "/assets/scene_seven_cd.jpg",
        alt: "Castle Steps"
      },
      Text: "You are certain the doors are locked. You keep clanging the metal rings until the doors swing open by the force. And…no one is there",
      choices: [
        {leftText: null},
        {rightText: 'Proceed into the Great Hall.', next: "sceneSevenE"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneSevenE: {
      Img: {
        src: "/assets/scene_seven_e.jpg",
        alt: "Castle Stairs"
      },
      Text: "Strange… the hall is clear. No chatter, no marching. Empty and full of silence.",
      choices: [
        {leftText: 'You see a staircase going up. You take it.', next: "sceneEightA"},
        {rightText: 'You see a staircase going down. You take it.', next: "sceneEightB"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneEightA: {
      Img: {
        src: "/assets/scene_eight_a.jpg",
        alt: "Castle Stairs"
      },
      Text: "As you travel up the stairs you see normal portaits of a family. Trinkets and artwork that would seem normal if not for the dark hallways and ominous air...",
      choices: [
        {leftText: 'Keep going up.', next: "sceneEightC"},
        {rightText: 'You`ve changed your mind. You want to try downstairs first.', next: "sceneEightG"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneEightB: {
      Img: {
        src: "/assets/scene_eight_b.jpg",
        alt: "Dungeon"
      },
      Text: "You begin to descend down beyond the castle floors into what seems to be a dungeon.",
      choices: [
        {leftText: null},
        {rightText: 'Keep going down.', next: "sceneEightG"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneEightC: {
      Img: {
        src: "/assets/scene_eight_c.jpg",
        alt: "Two Doors"
      },
      Text: "As you climb to the landing of the tower, you see two doors that look promising.",
      choices: [
        {leftText: 'Open the door on the left.', next: "sceneEightD"},
        {rightText: 'Open the door on the right.', next: "sceneEightE"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneEightD: {
      Img: {
        src: "/assets/scene_eight_d.jpg",
        alt: "Chains"
      },
      Text: "As you open the door on the left, you hear the faint cries of someone. It's a guard?!? The guard is chained up. He says, 'I turned against her. She is truly wicked…Dorothy doesn`t deserve this.'",
      choices: [
        {leftText: 'You decide to save the guard. You unshackle his chains.', next: "sceneEightF"},
        {rightText: 'This guard can`t be trusted. You leave him and go through the other door.', next: "sceneEightE"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneEightE: {
      Img: {
        src: "/assets/scene_eight_e.jpg",
        alt: "Spear"
      },
      Text: "You open the right door… IT IS A TRAP! There is a Flying Monkey soldier with a spear that turns to you and snarls.",
      choices: [
        {leftText: null, next: "passRollMonkey"},
        {rightText: null, next: "failRollMonkey"},
        {rollText: "You need to defeat this guard to move on!"}
      ],
      displayLeftChange: 'none',
      displayRightChange: 'none',
      displayRollChange: ''
    },

    sceneEightF: {
      Img: {
        src: "/assets/scene_eight_f.jpg",
        alt: "Broken Chains"
      },
      Text: "You released the shackled Guard. Guard: 'I cannot truly repay you for your kindness. I will help you stop her by guiding you to her'",
      choices: [
        {leftText: null},
        {rightText: 'Follow the saved guard.', next: "sceneNineA"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneEightG: {
      Img: {
        src: "/assets/scene_eight_g.jpg",
        alt: "Crystal Ball"
      },
      Text: "You end up in the dungeon jail cells. But again, you see no one. Not a single soldier or guard. The only thing in the room is a dark glass ball.",
      choices: [
        {leftText: 'You decide this path is not correct. Turn back upstairs.', next: "sceneEightC"},
        {rightText: 'The glass ball is interesting. You go near it and pick it up.', next: "sceneNineABall"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneNineA: {
      Img: {
        src: "/assets/scene_nine_a.jpg",
        alt: "Clouds over Tower"
      },
      Text: "You arrive at the top of the castle. This is where you hear them all. The flying guards are in the air. The hum of the chants. She is here.",
      choices: [
        {leftText: null},
        {rightText: 'Confront the Wicked Witch.', next: "sceneNineB"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneNineABall: {
      Img: {
        src: "/assets/scene_nine_a.jpg",
        alt: "Clouds over Tower"
      },
      Text: "The crystal ball bursts with energy, and you instantly arrive at the top of the castle. This is where you hear them all. The flying guards are in the air. The hum of the soldier chants. She is here.",
      choices: [
        {leftText: null},
        {rightText: 'Confront the Wicked Witch.', next: "sceneNineB"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneNineB: {
      Img: {
        src: "/assets/scene_nine_b.jpg",
        alt: "Witch Holding Pumpkin with Green Smoke"
      },
      Text: "You approach the witch and demand her return Dorothy unharmed…The witch cackles with amusement, 'I fear no one pretty. I am the Wicked Witch of the West. Your friend has something I want. And if she does not give it to me, well…you will see.'",
      choices: [
        {leftText: 'You decide that the best thing to do is reason with the witch. You don`t want to fight anymore…', next: "sceneNineC"},
        {rightText: 'You decide to take a chance and fight this witch. The witch must be defeated.', next: "sceneNineD"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneNineC: {
      Img: {
        src: "/assets/scene_nine_c.jpg",
        alt: "Hand with Long Nails in Smoke"
      },
      Text: "You plead with the witch and beg her to let Dorothy go. Even falling to your knees. The witch smirks, she seems pleased but still dangerous. Witch: 'You are a smart one, eh? Tell Dorothy to give me the slippers. Or she will die!'",
      choices: [
        {leftText: 'Tell Dorothy there is no need for fighting anymore. The only way to stay alive and leave is to give up her slippers.', next: "sceneNineE"},
        {rightText: 'You spot the only weapon you see, a bucket leaning against the castle stone. You grab it and threaten the witch.', next: "sceneNineF"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneNineD: {
      Img: {
        src: "/assets/scene_nine_d.jpg",
        alt: "Dagger with Red Cloth"
      },
      Text: "You choose to fight the witch and be done with this. You must win to save Dorothy!",
      choices: [
        {leftText: null, next: "passRollWitch"},
        {rightText: null, next: "failRollWitch"},
        {rollText: "The only way to win and save Dorothy is this fight! Roll!"}
      ],
      displayLeftChange: 'none',
      displayRightChange: 'none',
      displayRollChange: ''
    },

    sceneNineE: {
      Img: {
        src: "/assets/scene_zero.jpg",
        alt: "Ruby Slippers"
      },
      Text: "You turn to Dorothy, she is distraught with fear and dried tears on her face. You now plead with Dorothy to save us all and give up the slippers…",
      choices: [
        {leftText: null},
        {rightText: 'Dorothy seems hesitant. She stares into your eyes, she sees her friends fearful and tired…She rips the shoes off her feet and throws them to the witch…', next: "sceneTenA"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneNineF: {
      Img: {
        src: "/assets/scene_nine_f.jpg",
        alt: "Fire in Circles"
      },
      Text: "The witch sees the bucket, her eyes turn black… Witch: 'How dare you threaten me! I do not take threats from rats like you!' She lights her broom on fire and begins to approach you. You attempt to fence her back with the bucket and a few droplets of water land on her. She screams in pain as it melts her skin...",
      choices: [
        {leftText: 'Pour the bucket on the witch. End the Wicked Witch.', next: "sceneTenB"},
        {rightText: 'You threaten the witch more, sprinkling more water. But you tell her to leave and never come back.', next: "sceneTenC"},
        {rollText: null}
      ],
      displayLeftChange: '',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneTenA: {
      Img: {
        src: "/assets/scene_zero.jpg",
        alt: "Ruby Slippers"
      },
      Text: "Dorothy gives up her shoes. The Wicked Witch is cackling with pleasure and victory. Witch: 'Fools! No one can best me! Take your little friend, you are useless to me now!' The witch soars off in her broom…you've saved Dorothy…",
      choices: [
        {leftText: null},
        {rightText: 'End Game', next: "endCredits"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneTenB: {
      Img: {
        src: "/assets/scene_ten_b.jpg",
        alt: "Castle Sunset"
      },
      Text: "You bested the Wicked Witch of the West! You throw the bucket of water on the witch and she howls in pain. The screech echoes to her army, they disperse in fear. She melts into her robe and vanishes with a pop. You've saved Dorothy!",
      choices: [
        {leftText: null},
        {rightText: 'End Game', next: "endCredits"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    sceneTenC: {
      Img: {
        src: "/assets/scene_ten_c.jpg",
        alt: "Orange and Green Smoke"
      },
      Text: "You have the upper hand. You know her weakness. You threaten her one last time to leave Dorothy or suffer her end. The witch snarls with anger but her eyes show more fear…with a bang she bursts into air with her army around her and vanishes into the horizon...You've saved Dorothy!",
      choices: [
        {leftText: null},
        {rightText: 'End Game', next: "endCredits"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    endCredits: {
      Img: {
        src: "/assets/end_credits.jpg",
        alt: "Holding a Crown"
      },
      Text: "Congratulations! You've completed the game! You save Dorothy and lived to tell the tale. This game was developed by Ben Gallegos, a Web Development student at Collin College. This game was made using a React Framework and is for educational purposes only.",
      choices: [
        {leftText: 'Play Again?', next: "sceneZero"},
        {rightText: 'Game Credits', next: "siteCredits"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
    },

    siteCredits: {
      Img: {
        src: "/assets/site_credits.jpg",
        alt: "Journal with Writing"
      },
      Text: "Images were found on the platform Pexels.com and were noted as for Free to Use or Creative Commons purposes. I do not own any of the images in this game. *Game Story Content and Code was created by - Game Owner/Developer: Benjamin Gallegos",
      choices: [
        {leftText: null},
        {rightText: 'Play Again?', next: "sceneZero"},
        {rollText: null}
      ],
      displayLeftChange: 'none',
      displayRightChange: '',
      displayRollChange: 'none'
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
