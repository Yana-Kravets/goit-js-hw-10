import './css/styles.css';
// import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import { countryCardMarkup, countriesListMarkup } from './js/markupCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// debounce????????

const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

// refs.searchInput.addEventListener('input', onInputSearch);
// // debounce????????

// function onInputSearch(e) {
//     e.preventDefault();

    
//     const name = refs.searchInput.value.trim();
//     console.log(name);
//     if (name === '') {
//       clearData();
//     return;
//   }

//   fetchCountries(name)
//     .then(getCountries)
//     .catch(error => {
//     clearData();
//     Notify.failure('Oops, there is no country with that name');
//     })
// }

refs.searchInput.addEventListener(
  'input', (e => {
      const trimmedValue = refs.searchInput.value.trim();
         clearData();   
    if (trimmedValue !== '') {
        fetchCountries(trimmedValue).then(foundData => {      

        if (foundData.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (foundData.length === 0) {
          Notify.failure('Oops, there is no country with that name');
        } else if (foundData.length >= 2 && foundData.length <= 10) {
         
          renderCountryList(foundData);
        } else if (foundData.length === 1) {
    
          renderOneCountry(foundData);
        }
      });
    }
  })
);


// function getCountries(data) {
//     if (data.length === 1) {
//         // clearData();
//         // countryCardMarkup(data);
//         const cardMarkup = data.map(country => countryCardMarkup(country));
//       refs.countryInfo.innerHTML = cardMarkup.join('');
//       return cardMarkup;
//         // refs.countryList.innerHTML = '';
//     } else if (data.length >= 10) {
//         clearData();
//         Notify.info('Too many matches found. Please enter a more specific name.');
//     } else {
//         // clearData();
//         // countriesListMarkup(data);
//         const listMarkup = data.map(country =>
//           countriesListMarkup(country)
//         );
//       refs.countryList.innerHTML = listMarkup.join('');
//       return countryList;
//         // refs.countryInfo.innerHTML = '';
//     }
// }

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
      const markup = countries
        .map(country => {
          return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
            country.name.official
          }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
        })
        .join('');
      countryList.innerHTML = markup;
}

function clearData() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
