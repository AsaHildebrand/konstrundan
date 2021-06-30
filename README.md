Final project @ Technigo Bootcamp

# Konstrundan

Konstrundan is a game that lets you discover public artworks in your city (for now in Karlstad and Uppsala). You will have to visit the artworks to look for clues to enter into the app to show that you have been there. 

## App structure

### Login/register page
To enter the app you will have to login. These are the only pages you can access without being logged in.

### Choose city page/Byta stad
This is the first page you will come to when you log in. Here you can choose in which city you want to play. You can't access the map without choosing a city first.

### City map/Karta
Here is an Open street map city map showing the selected city. The artworks are shown as markers on the map. When you click on a marker you will enter the corresponding artwork page.

### Artwork page
This page shows some information about the artwork and a clue for a letter which you should enter into a form. When you enter the letter you will get instant feedback whether it was correct or not.

### Profile page/Min sida
Here you can see which artworks you have completed.

## Frontend
We have built the frontend with **React Hooks** with **Redux**. To create the map we have used **Pigeon Maps**, a map engine for React. For the routing we used **React Router** and for the styling we used **Styled components**. The data about the artworks and the users is exchanged through our own API endpoints.

## Backend
In the backend we have a **RESTful API** built with **Node.js** and **Express**. The data is stored in a **database** built with **MongoDB** and **Mongoose**. We have collected and prepared the datasets ourselves using **WPS Office** and then **EasyDataTransform** to convert the data to json format. The artwork coordinates are collected at the actual site of the artworks using **Google Maps**.

### MongoDB Collections
#### artworkkarlstads
The artwork data for the Karlstad artworks

#### artworkuppsalas
The artwork data for the Uppsala artworks

#### resolvedartworkkarlstads
This collection is created with references to the artworkkarlstads and users collections. It lists the artworks that each user has resolved in Karlstad.

#### resolvedartworkuppsalas
This collection is created with references to the artworkuppsalas and users collections. It lists the artworks that each user has resolved in Uppsala.

#### users
The user infomation needed to sign in is stored in this collection.

### Endpoints

* GET /artworks/Karlstad - endpoint to show all artworks in Karlstad

* GET /artworks/Uppsala - endpoint to show all artworks in Uppsala

* GET /artworks/Karlstad/:id - endpoint to get an artwork in Karlstad based on id

* GET /artworks/Uppsala/:id - endpoint to get an artwork in Uppsala based on id

* GET /resolved-artworks/Karlstad/:id - endpoint to get all resolved artworks in Karlstad based on user id

* GET /resolved-artworks/Uppsala/:id - endpoint to get all resolved artworks in Uppsala based on user id

* POST /users - endpoint to register a new user with username and password

* POST /sessions - endpoint to sign in with existing username and password

## Process

We started by making a sketch of the app's structure with the different pages and what components they should consist of. We also planned the navbar and how the user should access the different pages. For this we used Jamboard. To plan our team work we also created a Trello board.

Since we wanted to collect our own data and create our own API we had to visit all the artworks to get the coordinates and the information we needed. Once we had done that we compiled our data and created our own database.

After that we began to work with the backend to create the schemas, models and endpoints we needed for this project. When we had set up the basics in the backend we started to create components that we knew we were going to need.

For the styling we used Styled components. We wanted a classic cultural look. The color scheme is inspired from old books and old paper.

Most of the time we were pair-programming and occasionally we have been working in different branches in Git.

## Cross-Browser Compatibility

We checked that the app is working in:
* Chrome
* Edge
* Safari
* Firefox

## Live

Frontend: https://konstrundan.netlify.app/

Backend: https://konstrundan.herokuapp.com/

