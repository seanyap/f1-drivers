let driversUI = [];
let driverOrder = 0;

const main = document.getElementById("main");

function displayNext() {
  driversUI[driverOrder].style.zIndex = 0;
  driverOrder = driverOrder + 1 >= driversUI.length ? 0 : driverOrder + 1;
  driversUI[driverOrder].style.zIndex = 10;
}

function displayPrev() {
  driversUI[driverOrder].style.zIndex = 0;
  driverOrder = driverOrder - 1 <= 0 ? driversUI.length - 1 : driverOrder - 1;
  driversUI[driverOrder].style.zIndex = 10;
}

function parseURL4DriverName(url) {
  return url.split("/").pop();
}

function getDriverImageURL(url, callback) {
  const driverName = parseURL4DriverName(url);

  // pull in driver image from wikiepedia api
  fetch(
    "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=" +
      driverName
  )
    .then((res) => res.json())
    .then((data) => {
      pageKey = Object.keys(data.query.pages).pop();
      callback(data.query.pages[pageKey].original.source);
    });
}

// pull in drivers data using Ergast api
function getDriversData() {
  fetch("https://ergast.com/api/f1/current/drivers.json")
    .then((res) => res.json())
    .then((data) => {
      const drivers = data.MRData.DriverTable.Drivers;
      console.log(drivers);

      driversUI = drivers.map((driver) => {
        const card = document.createElement("div");
        card.setAttribute("id", "card");
        card.setAttribute("class", "center");

        const img = document.createElement("img");
        let imgURL;
        getDriverImageURL(driver.url, (url) => (imgURL = url));
        img.setAttribute("src", imgURL);

        const cardDesc = document.createElement("div");
        cardDesc.setAttribute("id", "card-desc");

        const title = document.createElement("h1");
        title.textContent = `${driver.givenName} ${driver.familyName}`;

        const dob = document.createElement("p");
        dob.textContent = driver.dateOfBirth;

        const nationality = document.createElement("p");
        nationality.textContent = driver.nationality;

        const number = document.createElement("p");
        number.textContent = `#${driver.permanentNumber}`;

        cardDesc.append(title, dob, nationality, number);
        card.appendChild(cardDesc);

        main.appendChild(card);
        return card;
      });

      // set first card to appear above all other card
      driversUI[driverOrder].style.zIndex = "10";
    })
    .catch((err) => console.log(err));
}

// main function call
getDriversData();
