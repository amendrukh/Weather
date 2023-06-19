class API {
    apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

    getCityWeather(cityName) {
        const url = this.apiUrl + `?q=${cityName}&appid=f9b0d2c85504d61087b8001d2d0fa015`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.log(error));
    }
}

export {API};