const drivers = 0;

const card = document.getElementById("card");

function displayNext() {
  console.log("next");
}

function displayPrev() {
  console.log("prev");
}

fetch(
  "https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=Lewis_Hamilton"
)
  .then((res) => res.json())
  .then((data) => (drivers = data["DriverTable"]["Drivers"]))
  .catch((err) => console.log(err));
