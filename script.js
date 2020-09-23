import config from "./env.js";

// DOM elements
const venueContainer = document.getElementById("venue-container");
const openSlide = document.getElementById("open-slide");
const closeSlide = document.getElementById("close-slide");
const category = document.querySelectorAll('.category');

// Get Foursquare API Data
async function displayList(category) {
    const apiURL = `https://api.foursquare.com/v2/venues/search?ll=${config.LOCATION}&categoryId=${category}&client_id=${config.CLIENT_ID}&client_secret=${config.CLIENT_SECRET}&v=20200920`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const list = data.response.venues;
        console.log(list);
    
    // Clear previous data 
    while (venueContainer.children.length > 0) {
        venueContainer.removeChild(venueContainer.children[0]);
    }
    
    list.forEach(function(venue) {
        // Create wrapper for venue data
        const wrapperDiv = document.createElement("div");
        wrapperDiv.id = 'wrapper-div';
        // Create name, address, site 
        var nameDiv = document.createElement("h1");
        var addressDiv = document.createElement("div");
        var linkDiv = document.createElement("a");
        var linkText = document.createTextNode("get delivery");
        // Reduce font size depending on restaurant name length
        venue.name.length > 20 ? nameDiv.classList.add('long-title') : nameDiv.classList.remove('long-title');
            nameDiv.append(document.createTextNode(`${venue.name}`))
            addressDiv.append(document.createTextNode(`${venue.location.formattedAddress[0]}`));
        if (venue.delivery) {
            linkDiv.append(linkText);
            linkDiv.title = "get delivery";
            linkDiv.href = venue.delivery.url;
            linkDiv.target = "_blank";
        }
        // Append Name, Address, and Link
        wrapperDiv.append(nameDiv);
        wrapperDiv.append(addressDiv);
        wrapperDiv.append(linkDiv);
        // Append wrapper to container div
        venueContainer.appendChild(wrapperDiv);
    })
    } catch (error) {
        console.log(error);
    }
}

// Events
function openSlideMenu() {
  document.getElementById("side-menu").style.width = "250px";
  document.getElementById("venue-container").style.marginLeft = "250px";
}

function closeSlideMenu() {
  document.getElementById("side-menu").style.width = "0";
  document.getElementById("venue-container").style.marginLeft = "0";
}

function categoryOnClick(evt) {
    let category = evt.target.dataset.code;
    displayList(category);
}

// Event Listeners
openSlide.addEventListener("click", openSlideMenu);
closeSlide.addEventListener("click", closeSlideMenu);
category.forEach((e) => e.addEventListener('click', categoryOnClick))