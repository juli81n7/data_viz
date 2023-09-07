const url = "https://kea-alt-del.dk/kata-distortion/";
const output = document.querySelector("h1");

newData();

async function newData() {
  const respons = await fetch(url, {
    method: "GET",
  });
  const data = await respons.json();
  console.log(data);

  display(data);
}

setInterval(newData, 5000);

function display(data) {
  output.textContent = "Du er nummer " + data.inQueue + " i køen";
}
