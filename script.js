document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "f198702be8aa5c4486885719563673ef"; // Replace with your OpenWeatherMap API key
    const searchBtn = document.querySelector(".search-btn");
    const cityInput = document.querySelector(".city-input");
    const weatherDisplay = document.querySelector(".weather-info");
    const locationBtn = document.querySelector(".location-btn");

    const map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    let marker = L.marker([20, 0]).addTo(map).bindPopup("Click on the map to get weather");

    window.togglePopularCities = function () {
        const cityList = document.getElementById('popularCities');
        cityList.style.display = cityList.style.display === "block" ? "none" : "block";
    };

    window.selectCity = function (city) {
        cityInput.value = city;
        document.getElementById('popularCities').style.display = "none";
    };

    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) fetchWeatherByCity(city);
    });

    locationBtn.addEventListener("click", () => {
        navigator.geolocation?.getCurrentPosition(({ coords }) => {
            fetchWeatherByLocation(coords.latitude, coords.longitude);
        }, () => alert("Enable location services."));
    });

    function fetchWeatherByCity(city) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
        fetchWeather(url);
    }

    function fetchWeatherByLocation(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        fetchWeather(url);
    }

    function fetchWeather(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (!data || data.cod !== "200") {
                    weatherDisplay.style.display = "none";
                    document.querySelector(".search-city").style.display = "none";
                    document.querySelector(".not-found").style.display = "block";
                    return;
                }
                updateUI(data);
            })
            .catch(err => console.error(err));
    }

    function updateUI(data) {
        document.querySelector(".search-city").style.display = "none";
        document.querySelector(".not-found").style.display = "none";
        weatherDisplay.style.display = "block";

        const city = data.city.name;
        const first = data.list[0];

        document.querySelector(".country-txt").innerText = city;
        document.querySelector(".temp-txt").innerText = `${first.main.temp} °C`;
        document.querySelector(".condition-txt").innerText = first.weather[0].description;
        document.querySelector(".humidity-value-txt").innerText = `${first.main.humidity}%`;
        document.querySelector(".wind-value-txt").innerText = `${first.wind.speed} M/s`;

        const lat = data.city.coord.lat;
        const lon = data.city.coord.lon;
        map.setView([lat, lon], 10);
        // marker.setLatLng([lat, lon])
        //       .bindPopup(`Weather in ${city}`)
        //       .openPopup();
        marker.setLatLng([lat, lon])
      .bindPopup(`
        <b>${city}</b><br>
        ${first.weather[0].description}<br>
        Temp: ${first.main.temp} °C<br>
        Humidity: ${first.main.humidity}%<br>
        Wind: ${first.wind.speed} m/s
      `)
      .openPopup();


        // Forecast hours
        const hourly = document.querySelector(".forecast-hours-container");
        hourly.innerHTML = "";
        data.list.slice(0, 5).forEach(hour => {
            hourly.innerHTML += `
                <div class="forecast-hour">
                    <h5 class="forecast-hour-date">${formatTime(hour.dt_txt)}</h5>
                    <img src="images/${getIcon(hour.weather[0].description)}" style="width: 40px;">
                    <h5 class="forecast-hour-temp">${hour.main.temp} °C</h5>
                </div>`;
        });

        // Forecast days
        const daily = document.querySelector(".forecast-items-container");
        daily.innerHTML = "";
        for (let i = 0; i < data.list.length; i += 8) {
            const day = data.list[i];
            daily.innerHTML += `
                <div class="forecast-item">
                    <h5 class="forecast-item-date">${formatDate(day.dt_txt)}</h5>
                    <img src="images/${getIcon(day.weather[0].description)}" style="width: 40px;">
                    <h5 class="forecast-item-temp">${day.main.temp} °C</h5>
                </div>`;
        }
    }

    function getIcon(desc) {
        const d = desc.toLowerCase();
        if (d.includes("clear")) return "clear.svg";
        if (d.includes("rain")) return "rain.svg";
        if (d.includes("cloud")) return "clouds.svg";
        if (d.includes("snow")) return "snow.svg";
        if (d.includes("mist") || d.includes("fog") || d.includes("haze")) return "atmosphere.svg";
        return "clouds.svg";
    }

    function formatTime(dt) {
        const date = new Date(dt);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    function formatDate(dt) {
        const date = new Date(dt);
        return date.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
    }

//     map.on("click", function (e) {
//         const { lat, lng } = e.latlng;
//         fetchWeatherByLocation(lat, lng);
//     }
// );
map.on("click", async function (e) {
    const { lat, lng } = e.latlng;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.list && data.list.length > 0) {
            const weather = data.list[0];
            marker.setLatLng([lat, lng])
                  .bindPopup(`
                    <b>${data.city.name}</b><br>
                    ${weather.weather[0].description}<br>
                    Temp: ${weather.main.temp} °C<br>
                    Humidity: ${weather.main.humidity}%<br>
                    Wind: ${weather.wind.speed} m/s
                  `)
                  .openPopup();
            updateUI(data);
        } else {
            alert("Weather not found.");
        }
    } catch (err) {
        console.error(err);
        alert("Failed to fetch weather.");
    }
});

});
