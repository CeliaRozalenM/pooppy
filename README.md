# Pooppy 🐶💩

A participatory mobile APP made with **Ionic, MongoDB and Express** where you can search for the nearest poop-bag dispensers in the city of Madrid.

🏅 Codenotch Bootcamp team final project. Developed in 2 weeks.

![Pooppy](/image.png "Pooppy")

## Needs

- As a pet owner, find bins near me which contains poo bags.

## Goals

- Save time ⌚ to the pet owner so he or she can have a nice walk.
- Create a participatory pet community where users can help each other 🤲.
- Provide information to the city hall 🏢 so it can refill with more bags in the most frequented areas.

![Wireframes](/notebook.png "Wireframes")

## Current Features

- A map with all the existing bins and its bag stock availability.
- You can select a bin in the map and change its status from "There are no bags again 😡", to: "I'm safe, my dog can poo all over the park 💩".
- Add a bin to favorites and see all your favorite bags in an editable list. 
- Designed with ❤️ using Figma.
- Geolocation with [API Google Maps](https://developers.google.com/maps/documentation/?hl=es)
- Real data taken from [Madrid's city hall website](https://datos.madrid.es/portal/site/egob/menuitem.c05c1f754a33a9fbe4b2e4b284f1a5a0/?vgnextoid=fc4d8755e0bc9510VgnVCM2000001f4a900aRCRD&vgnextchannel=374512b9ace9f310VgnVCM100000171f5a0aRCRD&vgnextfmt=default)

## Future Upgrades

- Geolocate also dog parks and fountains.
- Optimize charging time by only showing the nearest bins in the map and load the rest when you move the map to a different area.
- Add a menu where the user can change his profile photo and preferences.

## Setup

> Make sure you have globally installed: **Node**, **NPM**, **Ionic CLI** and **MongoDB**. And if you want to automatically restart your server: **Nodemon**

1. Clone repository or download
2. **Import** the mongo **database** *pooppyDB.json*
3. Start the **MongoDB server**. Easily done in windows by opening in your pc the directory *C:\Program Files\MongoDB\Server\[version]\bin* [Your mongodb installed location] and executing the file *mongod*. The default port for mongod is 27017
4. Install **NPM** packages `npm i` in *APP* and *API* directories
5. In the directory *APP* run `ionic serve` for a **ionic** dev server
6. Resize your browser window to get a mobile device resolution
7. In the directory *API* run `node main.js` to **connect to the database** or `nodemon main.js` if you want to restart your server when your code changes
8. Access with the mail: test@test.com and password: test
9. Enjoy 😊

## Authors
- [Apuluska](https://github.com/Apuluska)
- [Barby Marquina](https://github.com/barbymarquina)
- Me 🙋‍♀️ 
