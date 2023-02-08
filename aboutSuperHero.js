// Get Items that are stored in Local Storage
var resultId = localStorage.getItem("id");
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
  aboutHero();
});
const aboutHero = () => {
  fetch(
    `${url}characters/${resultId}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayDetail(data);
    });
};
function displayDetail(response) {
  // According to all Id's i will get elemets and change its inner HTML by the Responses
  document
    .getElementById("img")
    .setAttribute(
      "src",
      `${
        response.data.results[0].thumbnail.path +
        "." +
        response.data.results[0].thumbnail.extension
      }`
    );
  document
    .getElementById("details")
    .setAttribute("href", `${response.data.results[0].urls[0].url}`);
  document
    .getElementById("wiki")
    .setAttribute("href", `${response.data.results[0].urls[1].url}`);
  document
    .getElementById("comiclink")
    .setAttribute("href", `${response.data.results[0].urls[2].url}`);
  document.getElementById("name").innerHTML =
    "<b>Name: </b> " + response.data.results[0].name;
  document.getElementById("id").innerHTML =
    "<b>Hero ID: </b> " + response.data.results[0].id;
  document.getElementById("desc").innerHTML =
    "<b>Description: </b> " + response.data.results[0].description;
  document.getElementById("comic").innerHTML =
    "<b>Comic Available: </b>" + response.data.results[0].comics.available;
  document.getElementById("series").innerHTML =
    "<b>Series Available: </b>" + response.data.results[0].series.available;
  document.getElementById("stories").innerHTML =
    "<b>Stories Available: </b>" + response.data.results[0].stories.available;
  document.getElementById("count").innerHTML =
    "<b>Count: </b>" + response.data.count;
  document.getElementById("modified").innerHTML =
    "<b>Modified: </b>" + response.data.results[0].modified;
  document.getElementById("status").innerHTML =
    "<b>Status: </b>" + response.status;
  document.getElementById("total").innerHTML =
    "<b>Total: </b>" + response.data.total;
  document.getElementById("limit").innerHTML =
    "<b>Limit: </b>" + response.data.limit;
  document.getElementById("offset").innerHTML =
    "<b>Offset: </b>" + response.data.offset;
  document.getElementById("code").innerHTML = "<b>Code: </b>" + response.code;
}
