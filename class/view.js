class View {

    loader;
    date;
    temp;

    constructor(loader, date, temp) {
        this.loader = loader;
        this.date = date;
        this.temp = temp;
    }

    show(cityWeather) {

        const body = document.querySelector(".body");
        const formLabelCity = document.querySelector(".form__label-city");
        const weatherContainer = document.querySelector(".weather");
        const currentWeather = cityWeather.list[0];
        let icon;

        body.style.display = "inline-block";
        formLabelCity.innerHTML = cityWeather.city.name;
        weatherContainer.innerHTML = "";

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
            <div class="weather__desc-date">${this.date.getFormattedDate(currentWeather.dt)}</div>
            <div class="weather__desc-temp">
            <div class="weather__desc-temp-degree">Real Feel ${this.temp.convertKelvinToCelsius(currentWeather.main.temp)}&deg;C/${this.temp.convertKelvinToFahrenheit(currentWeather.main.temp)}&deg;F</div>
            <div class="weather__desc-temp-humidity">Humidity ${currentWeather.main.humidity}%</div>
            <div class="weather__desc-time">${this.date.getFormattedTime()}</div>
            <div class="weather__desc-info"></div>
             </div>
        </div>
    </div>
    </div>
    <div class="weather__el">
     <div class="weather__week">${weatherDays ? this.createNextWeatherDay(weatherDays, icon) : ""}</div>
</div>`)
    }

    createNextWeatherDay(weatherDays, icon) {
        let el = "";

        weatherDays.forEach((item) => {
            el += `
                <div class="week__day">
                    <h2 class="week__day-date">${this.date.getFormattedDate(item.dt)}</h2>
                    <img class="week__day-icon" src="${icon}" alt="weather-icon">
                    <div class="week__day-weather">
                        <div class="week__day-weather-degree">Real Feel ${this.temp.convertKelvinToCelsius(item.main.temp)}&deg;C/${this.temp.convertKelvinToFahrenheit(item.main.temp)}&deg;F</div>
                    </div>
                    </div>
           `
        })
        return el;
    }

    showLoader() {
        this.loader.classList.add("active");
    }

    hideLoader() {
        this.loader.classList.remove("active");
    }

}

export {View};