import {API} from "./class/api.js";
import {Controller} from "./class/controller.js";
import {View} from "./class/view.js";
import {DateHelper} from "./class/date.js";
import {Temperature} from "./class/temp.js";

const api = new API();
const date = new DateHelper();
const temp = new Temperature();
const view = new View(document.querySelector(".loader"), date, temp);
const controller = new Controller(api, view);

document.addEventListener("DOMContentLoaded", () => {
    controller.render();
})

document.querySelector(".form__btn-search").addEventListener("click", (e) => {
    e.preventDefault();
    const formInputCity = document.querySelector(".form__input-city");
    formInputCity.value !== "" ? controller.getCityWeather(formInputCity.value) : alert("Enter city");
    formInputCity.value = "";
})

