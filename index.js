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

// pull in drivers images from wikiepedia api
// image api "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=<driver-name>"

// pull in drivers data using Ergast api
fetch("https://ergast.com/api/f1/current/drivers.json")
  .then((res) => res.json())
  .then((data) => {
    const drivers = data.MRData.DriverTable.Drivers;
    console.log(drivers);
    driversUI = drivers.map((driver) => {
      const card = document.createElement("div");
      card.setAttribute("id", "card");
      card.setAttribute("class", "center");

      const title = document.createElement("h1");
      title.textContent = `${driver.givenName} ${driver.familyName}`;

      const dob = document.createElement("p");
      dob.textContent = driver.dateOfBirth;

      const nationality = document.createElement("p");
      nationality.textContent = driver.nationality;

      const number = document.createElement("p");
      number.textContent = driver.permanentNumber;

      card.append(title, dob, nationality, number);
      main.appendChild(card);
      return card;
    });

    // set first card to appear above all other card
    driversUI[driverOrder].style.zIndex = "10";
  })
  .catch((err) => console.log(err));
