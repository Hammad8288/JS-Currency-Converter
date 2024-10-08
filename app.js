const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.text = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
};

let updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = flagUrl;
};


const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = "1";
  }

  let URL = `${BASE_URL}/${fromSelect.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[fromSelect.value.toLowerCase()][toSelect.value.toLowerCase()];
  let convertedAmount = amtValue * rate;

  msg.innerText = `${amtValue} ${fromSelect.value} = ${convertedAmount} ${toSelect.value}`;
};



btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();

});

window.addEventListener("load", () => {
  updateExchangeRate();
});
