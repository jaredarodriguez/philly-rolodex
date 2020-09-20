import config from "./env.js";

// DOM elements
const openSlide = document.getElementById("open-slide");
const closeSlide = document.getElementById("close-slide");

// Get Foursquare API Data

// Events
function openSlideMenu() {
  document.getElementById("side-menu").style.width = "250px";
  document.getElementById("country-container").style.marginLeft = "250px";
}

function closeSlideMenu() {
  document.getElementById("side-menu").style.width = "0";
  document.getElementById("country-container").style.marginLeft = "0";
}

// Event Listeners
openSlide.addEventListener("click", openSlideMenu);
closeSlide.addEventListener("click", closeSlideMenu);
