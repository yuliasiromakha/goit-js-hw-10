import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.getElementById('search-box'),
    infoList: document.querySelector('.country-list'),  
    infoSpace: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInputFill, DEBOUNCE_DELAY));

function onInputFill(e) {

    const inputValue = e.target.value.trim();

    if (!inputValue) { 
        return; 
      }

    fetchCountries(inputValue).then(data => {

        if (data.length >= 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }

        if (data.length === 1) {
            const createdMarkup = createMaxMarkup(data[0]);
            refs.infoSpace.innerHTML = createdMarkup;
            refs.infoList.innerHTML = '';
        } else if (data.length > 1 && data.length < 10) {
            const createdMarkup = data.reduce((acc, article) => acc + createMinMarkup(article), '');
            refs.infoList.innerHTML = createdMarkup;
            refs.infoSpace.innerHTML = '';
        } 
        else {
            refs.infoList.innerHTML = '';
            refs.infoSpace.innerHTML = '';
        }
    })
    .catch(error => {
        if (error.message === '404') {
            Notiflix.Notify.failure("Oops, there is no country with that name");
        }
        console.log(error);
    });

}

function createMinMarkup({ name, flags }) {
    return `<li class='markup-items'>
                <img src =${flags.svg} alt='flags of ${name.official}' width=45 height=30/>
                <p class='markup-paragraph' >${name.official}</p>
            </li>`
}

function createMaxMarkup({ name, capital, population, flags, languages }) {

    const languagesList = Object.values(languages);

return `
<ul class='ul__list' > 
<div class='div'>
    <li>
        <img src =${flags.svg} alt='flags of ${name.official}' width=45 height=30/>
    </li>
    <li>
        <h2 class='h2'>${name.official}</h2>
    </li>
</div>
</ul>
<ul>
    <li>Capital: ${capital}</li>
    <li>Population: ${population}</li>
    <li>Languages: ${languagesList}</li>
</ul>
`;
}