let searchBox = document.getElementById("searchBox");
let searchInput = document.getElementById("searchInput");
let cityInfo = document.getElementById("city");
let dateInfo = document.getElementById("date");
let temperature = document.getElementById("temp");
let conditions = document.getElementById("cond");
let icon = document.getElementById("icon");
let future = document.getElementById("future");
let futureEl = document.querySelectorAll(".futureEl");




let key = "22df6733b2539ed71b9f619e1a7f16c3";

let dateFormat = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}

let weatherIcon = (el, time, location) => {
    if (el >= 200 && el <= 232) {
        location.innerHTML += `<img src="/icons/thunderstorm.png">`
    } else if (el >= 300 && el <= 321) {
        location.innerHTML += `<img src="/icons/drizzle.png">`;
        console.log('Drizzle');
    } else if (el >= 500 && el <= 531) {
        console.log('Rain');
        location.innerHTML += `<img src="/icons/rain.png">`;
    } else if (el >= 600 && el <= 622) {
        console.log('Snow');
        location.innerHTML += `<img src="/icons/snow.png">`;
    } else if (el >= 701 && el <= 781){
        console.log('Atmosphere');
        location.innerHTML += ``;
    } else if (el == 800) {
        console.log('Clear');
        time == "n" ? location.innerHTML += `<img src="/icons/clearNight.png">` : location.innerHTML += `<img src="/icons/clearDay.png">`;
    } else if (el >= 801 && el <= 804) {
        console.log('Clouds');
        time == "n"  ? location.innerHTML += `<img src="/icons/cloudNight.png">` : location.innerHTML += `<img src="/icons/cloudDay.png">`;
    }
}

let getData = (name) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${key}&units=metric`)
    .then(weather => {
        return weather.json();
    })
    .then(weather => {
        icon.innerHTML = "";
        futureEl.forEach(element => {
            element.innerHTML = "";
        });
        let dateData = new Date();
        console.log(weather.list[0].sys.pod)
        console.log(weather);
        cityInfo.innerHTML = `${weather.city.name}, ${weather.city.country}`;
        dateInfo.innerHTML = dateFormat(dateData); 
        temperature.innerHTML = `${Math.round(weather.list[0].main.temp)}°c`;
        conditions.innerHTML =  weather.list[0].weather[0].main;
        weatherIcon(weather.list[0].weather[0].id, weather.list[0].sys.pod, icon)
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
            console.log(futureTemp[i])
        });
    })
}

let setQuery = (e) => {
    if (e.keyCode == 13) {
        getData(searchInput.value)
    }
}

searchInput.addEventListener('keypress', setQuery)

