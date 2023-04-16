export function fetchCountries(name) {

    const BASE_URL = 'https://restcountries.com/v3.1/name/'
    const fields = 'fields=name,capital,population,flags,languages'

    return fetch(`${BASE_URL}${name}?${fields}`)
    .then(data => {

        if (!data.ok) {
            throw new Error(data.status)
          }
        
        return data.json()})

}