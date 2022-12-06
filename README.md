The application allows a user to search for different Pokemon and filter those results by type. The user can then click on one of the results and get the stats of that Pokemon along with a sprite image. This application uses React, Tailwind CSS, the pokeAPI, framer-motion, axios, and font-awesome. It was developed for Coding For All's Web Developer Challenge.


1) What is the URL to your GitHub-Pages site?
The URL to the GitHub-Pages site is https://guamy540.github.io/pokedex/
You can find the source code at https://github.com/guamy540/pokedex/tree/main


2)What API did you use and why?
For this application I used the pokeAPI. I chose the pokeAPI because of my familiarity with the Pokemon franchise and because I had another project I was working on that also uses the pokeAPI. I knew that the pokeAPI allowed users to search and sort 1100+ Pokemon by various methods, so it was easy for me to imagine creating an app with this API that fulfilled the requirements of the Web Developer Challenge.


3)What are some other applications for your API other than searching? Name a few and describe how an app using it for that purpose might work.
The pokeAPI can be used for a variety of things other than searching. Currently, I'm working on a seperate app that randomly generates Pokemon teams for a client based on various user specifications. It can also be used to make trivia related games. Since the API includes Pokemon stats and movesets, it could be used to even create Pokemon battles.


4)Explain the considerations you needed to make for the website to be responsive & mobile-friendly.
I used tailwind CSS in order to style my website and the browser's inspect tools to test my site's appearance and functionality on different devices. For this app, I used the flex display in order to have it respond to changes in the height/width of the container/screen. For the results, I used a flex wrap so that the number of columns displayed would change to fit the screen. While I didn't need to use it for this application, I also use media queries when adjustments for specific screen sizes become necessary. 


5)How can you make your app accessible to people with disabilities such as blindness or colorblindness?
One of the things I keep in mind when designing websites is to have high contrast between text and background in order to make text easy to read for everybody. In addition, it is important to add alt descriptions to all images for text readers. I also use a tool called Wave (https://wave.webaim.org/) to help improve the accessibility of webpages. Wave is a tool that analyzes a web page and returns details of areas where it could be improved for accessibility.


6)If you could make further changes to your project to improve/expand the experience, what would they be and how would you go about implementing them?
One of the major appeals of Pokemon is the idea of 'gotta catch em all', or the concept of collecting as many Pokemon as possible. One additional feature I would like to add is the ability to track which Pokemon a client has caught. One way I would implement this is by adding a button that let's a user add that Pokemon to a 'collection' they can view on another page. That collection would be stored in an array by name and within the client's local storage. I would then add additional features to the app based on if a user had caught that Pokemon, such as changing the search result background colors to reflect if a Pokemon had been caught or not. Pokemon also have shiny forms, though they are difficult to catch. I might add another feature that allows the user to toggle between if the Pokemon displayed by the Pokedex entry is shown in its default or shiny form. This would be done by storing both the default image url and the shiny image url when making an API request, and having the source url change as a user toggles between 'default' and 'shiny'.