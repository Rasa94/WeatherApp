let searchBox = document.getElementById("searchBox");
let searchInput = document.getElementById("searchInput");
let cityInfo = document.getElementById("city");
let dateInfo = document.getElementById("date");
let temperature = document.getElementById("temp");
let conditions = document.getElementById("cond");


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

let getData = (name) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}&units=metric`)
    .then(weather => {
        console.log(weather);
        return weather.json();
    })
    .then(weather => {
        let dateData = new Date();
        cityInfo.innerHTML = `${weather.name}, ${weather.sys.country}`;
        dateInfo.innerHTML = dateFormat(dateData); 
        temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
        conditions.innerHTML =  weather.weather[0].main;
    })
}

let setQuery = (e) => {
    if (e.keyCode == 13) {
        getData(searchInput.value)
    }
}

searchInput.addEventListener('keypress', setQuery)

