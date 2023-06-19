class Controller {
    api;
    view;

    constructor(api, view) {
        this.api = api;
        this.view = view;

    }

    async getCityWeather(cityName) {
        this.view.showLoader();
        this.view.show(await this.api.getCityWeather(cityName));
        this.view.hideLoader();
    }

    render() {
        this.getCityWeather("Dnipro");
    }
}

export {Controller};