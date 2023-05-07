import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

    const firebaseConfig = {
        apiKey: "AIzaSyDNplDWwmcJJCXEU3m1ovWWZeBOnpc6OVM",
        authDomain: "webproject-4abce.firebaseapp.com",
        databaseURL: "https://webproject-4abce-default-rtdb.firebaseio.com",
        projectId: "webproject-4abce",
        storageBucket: "webproject-4abce.appspot.com",
        messagingSenderId: "312509888119",
        appId: "1:312509888119:web:c46665a6887e5646c97872",
        measurementId: "G-6L6QEH3L9Q"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const dbref = ref(db)
    function start(){
      let cnt;
      get(child(dbref, "countTable")).then((snapshot)=>{
        if(snapshot.exists()){ 
            cnt = (snapshot.val().count);
            ++cnt;
            document.querySelector(".left").innerText = "User Count: " + cnt;
            set(ref(db, "countTable"), { count : cnt });
        }
      });
      
      // Default weather location
    }

    window.onload = start();
/*
json file upload..!!!!
*/

let weather = {
    "apiKey" : "e63d17378135520e5e84f435ac68b3ed", //apikey!!!
    fetchWeather : function (city) {
        if(city.includes(",")){
            fetch("https://api.openweathermap.org/data/2.5/weather?zip="+city+"&units=metric&appid="+this.apiKey).then((response)=>response.json())
        .then((data)=>this.displayWeather(data))
        .catch(err => alert("Try Again!!!!"));
                
            
        }else{
            fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apiKey).then((response)=>response.json())
            .then((data)=>this.displayWeather(data))
            .catch(err => alert("Try Again!!!!"));
        } 
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "kmph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.background = "url('https://source.unsplash.com/1600x900/?"+ name + "')";
    },
    search: function (){
        let a = document.getElementById('searchbox').value;
        let b = a.trim();
        this.fetchWeather(b);

    }
}

document.getElementById('btn').addEventListener('click', function(){
    weather.search();
});
document.getElementById('searchbox').addEventListener('keyup', function(e) {
    if(e.key == 'Enter') {weather.search();}
});

weather.fetchWeather("Chennai");