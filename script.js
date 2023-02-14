//get the timeStamp using date function
let timeStamp = Date.now();

//stored the public and private key that generated from website
const privateKey = "a7e0cb303d6f062137427a3620fea77e6ead4638";
const publicKey = "edc994d7308ca47b1e9fd4f132d4435c";

//encrypting the key to generte the hash value using CryptoJS
let hash = CryptoJS.MD5(timeStamp + privateKey + publicKey).toString();

//constant url for api
const url = "https://gateway.marvel.com:443/v1/public/";

//window event listner
window.addEventListener("DOMContentLoaded", (event) => {
  getAllHeros();
});

//fetch all the super hero list
const getAllHeros = () => {
  fetch(`${url}characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`)
    .then((response) => response.json())
    .then((data) => {
      display(data);
    });
};

//  Get Canvas
let canvas = document.getElementById("canvas");

// This Function will display the Data on the Screen
function display(data) {
  var superHeroList = document.getElementById("superhero-list");
  superHeroList.innerHTML = "";
  var results = data.data.results;
  // Creating a For Loop because there will be n number of results for same query
  for (let result of results) {
    var templateCanvas = canvas.content.cloneNode(true);

    //  Get all the elemets from id and then changes its Inner HTMl
    templateCanvas
      .getElementById("img")
      .setAttribute(
        "src",
        `${result.thumbnail.path + "." + result.thumbnail.extension}`
      );
    templateCanvas.getElementById("name").innerHTML =
      "<b>Name: </b> " + result.name;
    templateCanvas.getElementById("id").innerHTML =
      "<b>Hero ID: </b> " + result.id;
    templateCanvas.getElementById("comic").innerHTML =
      "<b>Comic Available: </b>" + result.comics.available;
    templateCanvas.getElementById("series").innerHTML =
      "<b>Series Available: </b>" + result.series.available;
    templateCanvas.getElementById("stories").innerHTML =
      "<b>Stories Available: </b>" + result.stories.available;
    templateCanvas.getElementById("events").innerHTML =
      "<b>Events Available: </b>" + result.events.available;

    //  Set Event listenet for Learn  more button
    templateCanvas
      .getElementById("learn-more")
      .addEventListener("click", function () {
        localStorage.setItem("id", result.id);
        window.location.assign("./aboutSuperHero.html");
      });
    //  Set Event listenet for Fav  more button
    templateCanvas.getElementById("fav").addEventListener("click", function () {
      saveToFavorite(result.id);
    });
    superHeroList.appendChild(templateCanvas);
  }
}

// save fav hero id to local storage
function saveToFavorite(result) {
  let favorite = checkFavorite();
  // checking if the same if is present in the list or not
  const checkexisting = favorite.filter((el) => {
    return el.id === result;
  });
  let tempObj = {};
  tempObj.id = result;
  if (checkexisting.length === 0) favorite.push(tempObj);
  localStorage.setItem("favorite", JSON.stringify(favorite));
}

// Is fav data saved in Local Storage then get all of them from local storage
function checkFavorite() {
  let favorite = [];
  const isPresent = localStorage.getItem("favorite");
  if (isPresent) favorite = JSON.parse(isPresent);
  return favorite;
}

//perform the search functionality for hero as per input
const getInput = document.querySelector("#search-string");
const searchButton = document.querySelector("#search-form");

//this function will handle the user input once the user clear the search event
getInput.addEventListener("input", (e) => {
  if (getInput.value.length === 0) {
    getAllHeros();
  }
});

//call the on click button event
searchButton.addEventListener("click", searchHero);

//this function will fetch all the marvel character using upi with search string
function searchHero(e) {
  e.preventDefault();
  let searchValue = getInput.value;
  fetch(
    `${url}characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      display(data);
    });
}
