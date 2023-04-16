import Notiflix from 'notiflix';
export function fetchCountries(name) {

    const BASE_URL = 'https://restcountries.com/v3.1/name/'
    const fields = 'fields=name,capital,population,flags,languages'

    const result = fetch(`${BASE_URL}${name}?${fields}`)
    .then(data => {
        
        if (!data.ok) {
            throw new Error("No data")
          }
        
        return data.json()})
    .catch(onError())

    return result;
}

function onError() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
    return
}