let locations = [
    {
        index: 0,
        function: 'KingsLanding',
        name: 'kings-landing',
        house: 'stark',
        information: "King's Landing is the capital, and largest city, of the Six Kingdoms. Located on the east coast of Westeros in the Crownlands, just north of where the Blackwater Rush flows into Blackwater Bay and overlooking Blackwater Bay, King's Landing is the site of the Iron Throne and the Red Keep, the seat of the King of the Andals and the First Men.",
        learnMore: 'https://gameofthrones.fandom.com/wiki/King%27s_Landing',
        distanceToUser: 123,
        currentlyLocated: false,
        discovered: false,

    },
    {
        index: 1,
        function: 'Winterfell',
        name: 'winterfell',
        house: 'stark',
        information: "Winterfell is the capital of the Kingdom of the North and the seat and the ancestral home of the royal House Stark. It is a very large castle located at the center of the North, from where the head of House Stark rules over his or her people. A small godswood is enclosed within the walls.",
        learnMore: 'https://gameofthrones.fandom.com/wiki/Winterfell',
        currentlyLocated: false,
        discovered: false,
    }, 
    {
        index: 2,
        function: 'Eyrie',
        name: 'eyrie',
        house: 'find it out',
        information: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, voluptates nisi dolorem dicta voluptas maxime hic porro, aperiam laborum minima eaque laudantium error praesentium illum. Nam perferendis autem delectus ea!',
        learnMore: '#',
        currentlyLocated: false,
        discovered: false,
    }, 
    {
        index: 3,
        function: 'CastleBlack',
        name: 'castle-black',
        house: 'Night\'s Watch',
        information: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, voluptates nisi dolorem dicta voluptas maxime hic porro, aperiam laborum minima eaque laudantium error praesentium illum. Nam perferendis autem delectus ea!',
        learnMore: '#',
        currentlyLocated: false,
        discovered: false,        
    }, 
    {
        index: 4,
        function: 'IronIslands',
        name: 'iron-islands',
        house: 'Greyjoy',
        information: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, voluptates nisi dolorem dicta voluptas maxime hic porro, aperiam laborum minima eaque laudantium error praesentium illum. Nam perferendis autem delectus ea!',
        learnMore: '#',
        currentlyLocated: false,
        discovered: false, 
    }, 
    {
        index: 5,
        function: 'Twins',
        name: 'the-twins',
        house: 'find it out',
        information: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, voluptates nisi dolorem dicta voluptas maxime hic porro, aperiam laborum minima eaque laudantium error praesentium illum. Nam perferendis autem delectus ea!',
        learnMore: '#',
        currentlyLocated: false,
        discovered: false,         
    }, 
    {
        index: 6,
        function: 'CasterlyRock',
        name: 'casterly-rock',
        house: 'Lannister',
        information: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, voluptates nisi dolorem dicta voluptas maxime hic porro, aperiam laborum minima eaque laudantium error praesentium illum. Nam perferendis autem delectus ea!',
        learnMore: '#',
        currentlyLocated: false,
        discovered: false,         
    },
    {
        index: 7,
        function: 'Pentos',
        name: 'pentos',
        house: 'Targaryon',
        information: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis, voluptates nisi dolorem dicta voluptas maxime hic porro, aperiam laborum minima eaque laudantium error praesentium illum. Nam perferendis autem delectus ea!',
        learnMore: '#',
        currentlyLocated: false,
        discovered: false,         
    }

]

let distanceTravelled = 0;
let placesDiscovered = {};
let previouslyLocated = 0;
let openCards = 0;

/**
 * Pulls information from locations array using a given index number and pushes that to the HTML to be added to the page and styled by existing CSS. Only allows 1 card to be open at a time.
 */
function openInfo(i) {
    if (openCards >= 1) {
        return false;
    } else {
        let info = document.getElementById(locations[i].name);
        info.innerHTML = `
            <button id="${locations[i].name}-close" class="btn close hover" onclick="close${locations[i].function}()">X</button>
            <h2>${locations[i].name}</h2>
            <ul>
                <li>House: ${locations[i].house}</li>
                <li>Distance from ${locations[previouslyLocated].name}: ${calcDistance(i)} miles <h3>(as the crow flies)</h3></li>
                <li>Discovered: ${locations[i].discovered}</li>
            </ul>
            <p>${locations[i].information}</p>
            <a href="${locations[i].learnMore}" target='_blank' class="btn hover link">Learn more?</a>
            <button id="travel${[i]}-btn" class="btn travel hover" onclick="travelTo(${i})">Travel to?</button>
        </div>
        `
        info.style.visibility = 'visible';
        
        if (checksDiscoveredPlaces() === true) {
            for (let n = 0; n <= locations.length; n++) {
                if (locations[i].discovered === true) {
                    document.getElementsByClassName('link')[0].style.visibility = 'visible';
                }
            }
        }
        
        openCards++;
        return true;
    }
}

/**
 * Uses CSS px coordinates to calculated the real distance between two locators. Returns a number rounded to 0 decimal places.
 */
function calcDistance(i) {
    let locator1 = document.getElementById(`${locations[i].name}-locator`); // Selected locator
    let locator2 = document.getElementById(`${locations[previouslyLocated].name}-locator`); // Last location travelled to

    let style1 = document.defaultView.getComputedStyle(locator1, null);
    let style2 = document.defaultView.getComputedStyle(locator2, null); // Allows the reading of CSS values

    let left1 = style1.left;
    let left2 = style2.left;
    let xDifference = Math.abs(parseInt(left1) - parseInt(left2));

    let top1 = style1.top;
    let top2 = style2.top;
    let yDifference = Math.abs(parseInt(top1) - parseInt(top2));
    // Finds the distance between top and left px distances of each locator and uses them to form a triangle with the hypotenuse being the straight line distance between previous and selected location.

    let actualDistance = parseInt(((Math.sqrt(Math.pow(xDifference, 2) + Math.pow(yDifference, 2))) * 2.794).toFixed(0)); // Pythagorean theorem finds hypotenuse length and multiplies by 'in world' distance of 1px in miles.

    return actualDistance;
}

/**
 * 'Sends' player to that location, fires functions to change style of info card, add distance travelled to total distance.
 */
function travelTo(i) {
    locations[i].currentlyLocated = true;
    checksCurrentlyLocated(i);
    addToDistance(i);
    setCurrentLocation(i);
    placesDiscovered[`${locations[i].name}`] = `true`;
    locations[i].discovered = true;
    previouslyLocated = locations[i].index;
}

/**
 * Checks through locations array for object with currentlyLocated = true and changes style to give a 'glow'.
 */
function checksCurrentlyLocated(i) {
    if (locations[i].currentlyLocated === true){
        document.getElementById(locations[i].name).style.boxShadow = '0 0 20px #D4AF37, inset 0 0 10px #000000';
    } else {
        document.getElementById(locations[i].name).style.boxShadow = null;
    }
}

/**
 * Closes open info card by removing HTML and changing visibility to hidden. Changes currently located to false.
 */
function closeInfo(i) {
    let close = document.getElementById(`${locations[i].name}-close`);
    let closeSecond = document.getElementById(`${locations[i].name}`);
    close.parentNode.innerHTML = null;
    closeSecond.style.visibility = 'hidden'; 

    locations[i].currentlyLocated = false;
    checksCurrentlyLocated(i);   
    checksDiscoveredPlaces();
    openCards--;
}

/**
 * Adds the calculated distance to the total distance travelled.
 */
function addToDistance(i) {
    distanceTravelled += calcDistance(i);
    document.getElementById('distance-travelled').innerText = `Distance travelled: ${distanceTravelled} miles`;
}

/**
 * Checks through locations array for currentlyLocated = true and sets the current location in the footer to that location name. 
 */
function setCurrentLocation(_i) {
    for (let i = 0; i < locations.length; i++) {
        if (locations[i].currentlyLocated === true) {
            document.getElementById('current-location').innerText = `Current location: ${locations[i].name}`;
        }
    }
}

/**
 * Checks the placesDiscovered object length and compares it against the locations array length. Once the two are the same, the end game congratulations in shown.
 */
function checksDiscoveredPlaces() {
    if (Object.keys(placesDiscovered).length == locations.length) {
        let complete = document.getElementById('complete');
        complete.style.visibility = 'visible';
        return true;
    }
}

/**
 * Allows the right button to scroll the page 400 pixels right.
 */
function scrollRight() {
    document.getElementsByTagName('html')[0].style.overflowX = 'unset';
    window.scrollBy(400, 0);
    document.getElementsByTagName('body')[0].style.overflowX = 'scroll';
}

/**
 * Allows the right button to scroll the page 400 pixels left.
 */
function scrollLeft() {
    document.getElementsByTagName('html')[0].style.overflowX = 'unset';
    window.scrollBy(-400, 0);
    document.getElementsByTagName('body')[0].style.overflowX = 'scroll';
}

// Open info section

function openKingsLandingInfo() {
    openInfo(0);
}

function closeKingsLanding() {
    closeInfo(0);
}

function openWinterfellInfo() {
    openInfo(1);
}

function closeWinterfell() {
    closeInfo(1);
}

function openEyrieInfo() {
    openInfo(2);
}

function closeEyrie() {
    closeInfo(2);
}

function openCastleBlackInfo() {
    openInfo(3);
}

function closeCastleBlack() {
    closeInfo(3);
}

function openIronIslandsInfo() {
    openInfo(4);
}

function closeIronIslands() {
    closeInfo(4);
}

function openTwinsInfo() {
    openInfo(5);
}

function closeTwins() {
    closeInfo(5);
}

function openCasterlyRockInfo() {
    openInfo(6);
}

function closeCasterlyRock() {
    closeInfo(6);
}

function openPentosInfo() {
    openInfo(7);
}

function closePentos() {
    closeInfo(7);
}

// Event Listener section

document.getElementById('kings-landing-locator').addEventListener('click', openKingsLandingInfo);

document.getElementById('winterfell-locator').addEventListener('click', openWinterfellInfo);

document.getElementById('eyrie-locator').addEventListener('click', openEyrieInfo);

document.getElementById('castle-black-locator').addEventListener('click', openCastleBlackInfo);

document.getElementById('iron-islands-locator').addEventListener('click', openIronIslandsInfo);

document.getElementById('the-twins-locator').addEventListener('click', openTwinsInfo);

document.getElementById('casterly-rock-locator').addEventListener('click', openCasterlyRockInfo);

document.getElementById('pentos-locator').addEventListener('click', openPentosInfo);

document.getElementById('right-scroll').addEventListener('click', scrollRight);

document.getElementById('left-scroll').addEventListener('click', scrollLeft);
