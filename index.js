class API {
    apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

    getCityWeather(cityName) {
        const url = this.apiUrl + `?q=${cityName}&appid=f9b0d2c85504d61087b8001d2d0fa015`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.log(error));
    }
}

class View {

    show(cityWeather) {
        let icon;
        const weatherContainer = document.querySelector(".weather");
        weatherContainer.innerHTML = "";
        const currentWeather = cityWeather.list[0];
        switch (String(currentWeather.weather[0].id)) {
            case "500" :
                icon = "img/weather/rainyday-light.svg";
                break;
            case "800" :
                icon = "img/weather/sun-light.svg";
                break;
            case "801" :
                icon = "img/weather/mostly-cloudy-light.svg";
                break;
            case "802" :
                icon = "img/weather/cloud-light.svg";
                break;
            case "803" :
                icon = "img/weather/cloud-light.svg";
                break;
            case "804" :
                icon = "img/weather/mostly-cloudy-light.svg";
                break;

            default:
                icon = "img/weather/sunrise-light.svg"
        }

        let currentListEl = cityWeather.list[0].dt;
        let weatherDays = cityWeather.list.filter((el) => {
            const tempListEl = currentListEl + 86400;
            if (el.dt === tempListEl) {
                currentListEl = tempListEl;
                return el;
            }
        })
        weatherContainer.insertAdjacentHTML("beforeend", `
<div class="weather__el ">
    <div class="weather__today">
        <div class="weather__today-item">
            <img class="weather__icon" src = ${icon} alt="weather-icon">
        </div>
       
        <div class="weather__today-item weather__desc">
            <div class="weather__desc-date">${date.getFormattedDate(currentWeather.dt)}</div>
            <div class="weather__desc-temp">
            <div class="weather__desc-temp-degree">Real Feel ${temp.convertKelvinToCelsius(currentWeather.main.temp)}&deg;C/${temp.convertKelvinToFahrenheit(currentWeather.main.temp)}&deg;F</div>
            <div class="weather__desc-temp-humidity">Humidity ${currentWeather.main.humidity}%</div>
            <div class="weather__desc-time">${date.getFormattedTime()}</div>
            <div class="weather__desc-info"></div>
             </div>
        </div>
    </div>
    </div>
    <div class="weather__el">
     <div class="weather__week">${weatherDays ? this.createNextWeatherDay(weatherDays, icon) : ""}</div>
</div>
   
    `)
    }

    createNextWeatherDay(weatherDays, icon) {
        let el = "";

        weatherDays.forEach((item) => {
            el += `
                <div class="week_day">
                    <h2 class="week__day-date">${date.getFormattedDate(item.dt)}</h2>
                    <img class="week__day-icon" src="${icon}" alt="weather-icon">
                    <div class="week__day-weather">
                        <div class="week__day-weather-degree">Real Feel ${temp.convertKelvinToCelsius(item.main.temp)}&deg;C/${temp.convertKelvinToFahrenheit(item.main.temp)}&deg;F</div>
                    </div>
                    </div>
           `
        })
        return el;
    }
}

class DateHelper {
    getFormattedDate(unixTimestamp) {

        const date = new Date(unixTimestamp * 1000);

        const options = {weekday: 'long', month: 'long', day: 'numeric'};
        const formattedDate = date.toLocaleDateString('en-US', options);

        return formattedDate;
    };

    getFormattedTime() {
        const date = new Date();

        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);

        return `${hours}:${minutes}`;
    }

}

class Temperature {

    convertKelvinToCelsius(kelvin) {
        const celsius = kelvin - 273.15;
        return celsius.toFixed(0);
    }

    convertKelvinToFahrenheit(kelvin) {
        const fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
        return fahrenheit.toFixed(0);
    }
}


class Controller {
    api;
    view;

    constructor(api, view) {
        this.api = api;
        this.view = view;
    }

    async getCityWeather(cityName) {
        view.show(await api.getCityWeather(cityName));
    }

    render() {
        view.show(this.getCityWeather("Dnipro"));
    }
}


const api = new API();
const view = new View();
const controller = new Controller(api, view);
const date = new DateHelper();
const temp = new Temperature();


document.addEventListener("DOMContentLoaded", () => {
    controller.render();
})

document.querySelector(".form__btn-search").addEventListener("click", (e) => {
    e.preventDefault();
    const formInputCity = document.querySelector(".form__input-city");
    formInputCity.value !== "" ? controller.getCityWeather(formInputCity.value) : alert("Enter city");

})
