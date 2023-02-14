//get the timeStamp using date function
let timeStamp = Date.now();

//stored the public and private key that generated from website
const privateKey = "a7e0cb303d6f062137427a3620fea77e6ead4638";

const publicKey = "edc994d7308ca47b1e9fd4f132d4435c";

//encrypting the key to generte the hash value using CryptoJS
let hash = CryptoJS.MD5(timeStamp + privateKey + publicKey).toString();

//constant url for api
const url = "https://gateway.marvel.com:443/v1/public/";

window.addEventListener("DOMContentLoaded", (event) => {
  getAllFavoriteHeros();
});
let noData = document.getElementById("no-data");
const getAllFavoriteHeros = () => {
  let favoriteHeroId = JSON.parse(localStorage.getItem("favorite"));
  if (favoriteHeroId.length > 0) {
    favoriteHeroId.map((id) => {
      fetch(
        `${url}characters/${id.id}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
      )
        .then((response) => response.json())
        .then((data) => {
          displayDetail(data);
        });
    });
  } else {
    noData.innerText = "No Hero added as Favorite";
  }
};
//  Get Canvas
var canvas = document.getElementById("canvas");

// This Function will display the Data on the Screen
function displayDetail(data) {
  let result = data.data.results[0];

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
  //  Set Event listenet for remove fav button
  templateCanvas.getElementById("fav").addEventListener("click", function () {
    removeFromFavorite(result.id);
  });
  // Now, Appending to the list
  document.getElementById("superhero-list").appendChild(templateCanvas);
}
// remove fav data to local storage
function removeFromFavorite(id) {
  let favorite = checkFavorite();
  // checking if the same if is present in the list or not
  const checkexisting = favorite.filter((item) => id !== item.id);
  localStorage.removeItem("favorite");
  localStorage.setItem("favorite", JSON.stringify(checkexisting));
  window.location.assign("./favoriteHero.html");
}
// Is fav data saved in Local Storage?
function checkFavorite() {
  let favorite = [];
  const isPresent = localStorage.getItem("favorite");
  if (isPresent) favorite = JSON.parse(isPresent);

  return favorite;
}
