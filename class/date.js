class DateHelper {
    getFormattedDate(unixTimestamp) {

        const date = new Date(unixTimestamp * 1000);

        const options = {weekday: 'long', month: 'long', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    };

    getFormattedTime() {
        const date = new Date();

        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);

        return `${hours}:${minutes}`;
    }

}

export {DateHelper};