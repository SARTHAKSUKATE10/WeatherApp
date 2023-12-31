let weather = {
    "apikey": "80fae52889fb39b7bb987d6b77eb14ca",

    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apikey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
 
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerHTML = description
        document.querySelector(".temp").innerHTML = temp + "°C"
        document.querySelector(".humidity").innerHTML = "Humidity :" + humidity + "%"
        document.querySelector(".wind").innerHTML = "Windspeed" + speed + "Km/h"
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')"
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-box").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-box").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Denver")