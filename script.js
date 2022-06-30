// select Element for weather
const infoDiv = document.querySelector('.info');
const addressTag = infoDiv.querySelector('#address');
const tempTag = infoDiv.querySelector('#temp');
const iconTag = infoDiv.querySelector('.status-wraper img');
const descriptionTag = infoDiv.querySelector('.status-wraper #status');
const humidityTag = infoDiv.querySelector('#humidity');
const windTag = infoDiv.querySelector('#wind');

// select Elemnet for search
const searchBtn = document.querySelector('.search-area .search');
const searchInput = document.querySelector('.search-area input');

let weather = {
    apiKey: '', //put your openweathermap api key;
    getWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apiKey)
        .then((response)=>response.json())
        .then((data)=>this.showData(data))
    },
    showData: function(data){
        let name = data.name;
        let icon = data.weather[0].icon;
        let description = data.weather[0].description;
        let temp = data.main.temp;
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
 
        addressTag.innerHTML = "Weather in "+ name;
        tempTag.innerHTML =  temp + " °C";
        iconTag.setAttribute("src", "http://openweathermap.org/img/w/"+icon+".png");
        descriptionTag.innerHTML = description;
        humidityTag.innerHTML = "Humidity - " + humidity + "%";
        windTag.innerHTML = "Wind - " + wind + " km/h";

        document.body.style.backgroundImage = `url(https://source.unsplash.com/random/1920x1080/?${name},random)`
    },
    search: function(){
        this.getWeather(searchInput.value)
    }
}

// search by clicking icon
searchBtn.addEventListener('click', ()=>{
    weather.search()
    console.log("this is running")
})

// search by pressing Enter
searchInput.addEventListener('keyup', (e)=>{
    if(e.key == 'Enter'){
        weather.search()
        console.log("this is running")
    }
})

// show data by current location
weather.getWeather(geoplugin_city())