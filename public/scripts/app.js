let searchBox = document.getElementById("searchBox");
let searchInput = document.getElementById("searchInput");
let cityInfo = document.getElementById("city");
let dateInfo = document.getElementById("date");
let temperature = document.getElementById("temp");
let conditions = document.getElementById("cond");
let icon = document.getElementById("icon");
let futureForecastGroup = document.getElementById("futureForecastGroup");
let futureEl = document.querySelectorAll(".futureEl");
let futureDate = document.querySelectorAll(".futureDate");


let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let key = "22df6733b2539ed71b9f619e1a7f16c3";

let dateFormat = d => {
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    dateInfo.innerHTML =  `${day} ${date} ${month} ${year}`
}

let futureDateFormat = d => {
    let day = d.getDay();
    futureDate.forEach(element => {
        day == 6 ? day = 0 : day += 1;
        element.innerHTML = days[day];
    })
}

let weatherIcon = (el, time, location) => {
    if (el >= 200 && el <= 232) {
        location.innerHTML += `<img src="./icons/thunderstorm.png">`
    } else if (el >= 300 && el <= 321) {
        // Drizzle
        location.innerHTML += `<img src="./icons/drizzle.png">`;
    } else if (el >= 500 && el <= 531) {
        // Rain
        location.innerHTML += `<img src="./icons/rain.png">`;
    } else if (el >= 600 && el <= 622) {
        // Snow
        location.innerHTML += `<img src="./icons/snow.png">`;
    } else if (el >= 701 && el <= 781){
        // Atmosphere
        location.innerHTML += ``;
    } else if (el == 800) {
        // Clear
        time == "n" ? location.innerHTML += `<img src="./icons/clearNight.png">` : location.innerHTML += `<img src="./icons/clearDay.png">`;
    } else if (el >= 801 && el <= 804) {
        // Clouds
        time == "n"  ? location.innerHTML += `<img src="./icons/cloudNight.png">` : location.innerHTML += `<img src="./icons/cloudDay.png">`;
    }
}

let getData = (name) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${key}&units=metric`)
    .then(weather => {
        return weather.json();
    })
    .then(weather => {
        // Clear page
        icon.innerHTML = "";
        futureEl.forEach(element => {
            element.innerHTML = "";
        });

        let dateData = new Date();

        // Render info
            // Today's temp
        cityInfo.innerHTML = `${weather.city.name}, ${weather.city.country}`;
        dateFormat(dateData); 
        futureDateFormat(dateData);
        temperature.innerHTML = `${Math.round(weather.list[0].main.temp)}°c`;
        conditions.innerHTML =  weather.list[0].weather[0].main;
        weatherIcon(weather.list[0].weather[0].id, weather.list[0].sys.pod, icon)

            // Temperature for the next 4 days
        let list = weather.list
        let futureTemp = [];
        let futureId = [];

        list.forEach((element, i) => {
            let el = element.dt_txt;
            let filter = el.slice(10, 13)
            if(filter == 15 && i > 7) {
                futureTemp.push(element.main.temp)
                futureId.push(element.weather[0].id)
            }

        });
        
        futureEl.forEach((element, i) => {
            weatherIcon(futureId[i], 15, element)
            element.innerHTML += `<h2>${Math.round(futureTemp[i])}°c</h2>`;
        });
    })
}

let setQuery = (e) => {
    if (e.keyCode == 13) {
        getData(searchInput.value)
    }
}
searchInput.addEventListener('keypress', setQuery)

