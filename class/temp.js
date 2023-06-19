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

export {Temperature};