const form = document.querySelector("#country-form");
const input = document.querySelector("#country-input");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");
const countryInfo = document.querySelector("#country-info");

async function getCountry(country) {
  loading.style.display = "block";
  errorMessage.style.display = "none";
  countryInfo.textContent = "";

  try {
    const url = `https://countries.dev/name/${encodeURIComponent(country)}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Country not found");
    }

    const data = await res.json();

    const countryData = data[0];

    const name = document.createElement("h2");

    name.textContent = countryData.name;

    const flag = document.createElement("img");

    flag.src = countryData.flags?.png || countryData.flag;
    flag.alt = `${countryData.name} flag`;

    const capital = document.createElement("p");

    capital.textContent = `Capital: ${countryData.capital}`;

    const population = document.createElement("p");

    population.textContent = `Population: ${countryData.population.toLocaleString()}`;

    const region = document.createElement("p");

    region.textContent = `Region: ${countryData.region}`;

    const currency = document.createElement("p");

    const currencies = countryData.currencies || [];

    const currencyNames = currencies.map((currency) => {
      return `${currency.name} (${currency.code})`;
    });

    currency.textContent = `Currency: ${currencyNames.join(", ")}`;

    const card = document.createElement("div");

    card.classList.add("country-card");

    card.append(flag, name, capital, population, region, currency);

    countryInfo.append(card);
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const country = input.value.trim();

  if (country) {
    getCountry(country);
  }
});

getCountry("Ethiopia");
