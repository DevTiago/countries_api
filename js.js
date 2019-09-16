const countriesSelect = document.querySelector(".countries-select");
const content = document.querySelector(".content");
const countriesApiUrl = "https://restcountries.eu/rest/v2/all";
let countriesList = [];

fetch(countriesApiUrl)
  .then(res => res.json())
  .then(data => {
    countriesList = data;
    data.forEach(country => {
      const option = document.createElement("option");
      option.value = country.alpha2Code;
      option.innerText = country.name;
      countriesSelect.appendChild(option);
    });
  });

countriesSelect.addEventListener("change", e => {
  const countryCode = e.target.value;
  const selectedCountry = countriesList.find(c => c.alpha2Code === countryCode);
  if (selectedCountry) {
    const newContent = `
                <img src="${selectedCountry.flag}" class="card-container front" />
                <div class="card-container back">
                    <p><u>Capital:</u> ${selectedCountry.capital}</p>
                    <p><u>Population:</u> ${selectedCountry.population}</p>
                    <p><u>Domain:</u> ${selectedCountry.topLevelDomain}</p>
                </div>
            `;
    content.innerHTML = newContent;
  }
});
