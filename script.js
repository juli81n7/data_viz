const url = "https://kea-alt-del.dk/kata-distortion/";
const output = document.querySelector("h1");
const newUpdate = document.querySelector("p");
let previousNumber = 0;
const bar = document.querySelector(".innerbar");

newData();

async function newData() {
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);

  display(data);
}

setInterval(newData, 10000);

function display(newNumber) {
  const difference = newNumber.inQueue - previousNumber;
  console.log("nu1");
  newUpdate.textContent = "Opdateret " + newNumber.loggedAt;
  if (difference > 0) {
    console.log("nu2");
    let i = previousNumber;
    const interval = setInterval(() => {
      console.log("nu3");
      output.textContent = "Du er nummer " + i + " i køen";

      i++;
      if (i > newNumber.inQueue) {
        clearInterval(interval);
      }
    }, 50);
  } else if (difference < 0) {
    console.log("nu4");
    let i = previousNumber;
    const interval = setInterval(() => {
      console.log("nu5");
      output.textContent = "Du er nummer " + i + " i køen";
      i--;
      if (i < newNumber.inQueue) {
        clearInterval(interval);
      }
    }, 10);
  } else {
    // The numbers are the same, no need to count.
    console.log(newNumber.inQueue);
  }
  let newNumPercent = 100 - (newNumber.inQueue / 25) * 100;

  bar.style.setProperty("--newWidth", newNumPercent + "%");
  // Update the previous number.
  previousNumber = newNumber.inQueue;
}
