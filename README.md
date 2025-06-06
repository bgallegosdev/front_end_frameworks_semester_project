# front_end_frameworks_semester_project
Semester project for Front End Frameworks course at Collin College; Goal is to create a React project using React framework concepts for a text-based game.

This game focuses on what I've learned about the React framework through my studies. In this project you'll see how we can use state to manage the "paths" that the user can take. Every branch or choice leads to a new one. The paths are stored in a complex object that is not only used to help manage the next scene from the choices but also other data to pass down to child components using props.

A random aspect of the game is the combat or rolls the player must take to complete special encounters. This was done using JavaScript functions that worked with event handlers to change state like scenes or health.

In collaboration with the other React concepts, useEffect hook is used to help the game check for changes in state such as health reaching zero or when the reset button is clicked the health should be started back at 3 again.

<hr>

Figma Design:
    Figma - https://www.figma.com/design/cooS5g8f0JDkjCZcCLOC9t/Front_End_Frameworks_Semester_Project_Planning_Design?node-id=0-1&t=uQY944lr9D7c9fyU-1

Article References:
    Dev Log on React Text-Based Game - Using State and Paths/Scenes: https://medium.com/@dimterion/making-a-react-text-adventure-game-continuation-e863f7e6b1b3

Image Credits Used For Project:
    *All are from Pixels and labeled Free to Use
    Two Roads - Photo by James Wheeler: https://www.pexels.com/photo/photo-of-pathway-surrounded-by-fir-trees-1578750/
    Talking Tree Face - Image by Hans from Pixabay: https://pixabay.com/users/hans-2/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=167490
    Game Over: Skull - Photo by Mitja Juraja: https://www.pexels.com/photo/close-up-photo-of-skull-970517/
    Witch with Candle: Photo by cottonbro studio: https://www.pexels.com/photo/a-person-covering-the-lighted-candle-he-is-holding-5435272/
    Dark Forest: Photo by Anton Atanasov: https://www.pexels.com/photo/landscape-photo-of-forest-1655901/
    Witch with Cane: Photo by Fariborz MP: https://www.pexels.com/photo/man-in-black-leather-jacket-holding-brown-and-black-electric-guitar-11009468/
    Dark Pine Bush: Photo by Wyxina Tresse: https://www.pexels.com/photo/needles-of-thuja-14632625/
    Yorkie Dog Photo: Photo by Chen Te: https://www.pexels.com/photo/yorkshire-terrier-dog-outdoors-9949307/
    Field of Poppy Flowers: Photo by Elina Sazonova: https://www.pexels.com/photo/red-poppy-flower-field-1876620/
    Bridge to Castle: Photo by Julien Riedel: https://www.pexels.com/photo/stone-bridge-leading-to-the-medieval-eltz-castle-20027103/
    Storm Clouds: Photo by Ayu Shakya: https://www.pexels.com/photo/lightning-on-the-sky-1294229/
    Underground Tunnel Image: Photo by Oscar Sánchez: https://www.pexels.com/photo/dark-tunnel-underground-18928150/
    Troll Image: Photo by William Jacobs: https://www.pexels.com/photo/wooden-troll-sculpture-amidst-lush-forest-28498780/
    Treasure Chest: Photo by David Bartus: https://www.pexels.com/photo/light-inside-chest-box-366791/
    Moon Image: Photo by Tom Fisk: https://www.pexels.com/photo/low-angle-photography-of-full-moon-under-silhouette-of-tall-trees-1716158/
    Red Moon: Photo by Pedro Figueras: https://www.pexels.com/photo/red-moon-during-night-time-681467/
    Dark Cave Image: Photo by Peter de Vink: https://www.pexels.com/photo/lighted-cave-849385/
    Castle Courtyard: Photo by Fez Brook: https://www.pexels.com/photo/a-grayscale-of-a-stairs-in-a-castle-4452699/
    Dark Castle: Photo by Andreas Ebner: https://www.pexels.com/photo/castle-and-mountains-at-dawn-14694157/
    Castle Doors: Photo by Ammar Hameed: https://www.pexels.com/photo/ancient-derawar-fort-wooden-door-in-punjab-pakistan-31398648/
    Castle Stairs: Photo by Sonny Vermeer: https://www.pexels.com/photo/old-abandoned-monastery-somewhere-in-the-netherlands-20283201/
    Castle Stairs Black and White: Photo by C1 Superstar: https://www.pexels.com/photo/black-and-white-photo-of-a-staircase-inside-an-old-castle-20807756/
    Dungeon: Photo by Tanuj Matta: https://www.pexels.com/photo/hallway-inside-a-dungeon-13778249/
    Two Doors: Photo by konat umut budak: https://www.pexels.com/photo/decaying-wooden-doors-18833533/
    Chains: Photo by Bruno Scramgnon: https://www.pexels.com/photo/selective-focus-photography-of-brown-chains-596136/
    Spear: Photo by Alexander Mass: https://www.pexels.com/photo/halberd-in-grass-20101689/
    Broken Chains: Photo by Claudia Solari: https://www.pexels.com/photo/rusted-chain-hanging-against-a-weathered-wall-13157007/
    Crystal Ball: Photo by Ekaterina Belinskaya: https://www.pexels.com/photo/person-holding-clear-glass-ball-4922077/
    Clouds over Tower: Photo by Ludvig Hedenborg: https://www.pexels.com/photo/clouds-over-tower-13671692/
    Witch with Green Smoke: Photo by Ricardo Lima: https://www.pexels.com/photo/green-smoke-from-pumpkin-over-person-in-witch-costume-18578999/
    Long Nails: Photo by Feyza Yıldırım: https://www.pexels.com/photo/hand-shadow-of-a-person-on-glass-surface-14380503/
    Dagger: Photo by Maria Pop: https://www.pexels.com/photo/dagger-with-a-blade-wrapped-in-red-silk-18821902/
    Fire Circle: Photo by Maris Rhamdani: https://www.pexels.com/photo/person-performing-fire-dance-at-night-1552173/
    Castle Sunset: Photo by Johannes Plenio: https://www.pexels.com/photo/white-and-brown-concrete-building-1119972/
    Orange and Green Smoke: Photo by MART  PRODUCTION: https://www.pexels.com/photo/white-and-orange-smoke-illustration-7577886/
    Holding a Crown: Photo by Mike Bird: https://www.pexels.com/photo/boy-wearing-crown-statue-189528/
    Journal: Photo by Pixabay: https://www.pexels.com/photo/black-text-on-gray-background-261763/