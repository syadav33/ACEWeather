let btn = document.querySelector("#btn");
btn.addEventListener('click', GetInfo);
document.getElementById('searchbox').addEventListener('keyup', function(e) {
    if(e.key == 'Enter') {GetInfo();}
});
function GetInfo(){
    let a =document.getElementById("searchbox").value;
    let newName = a.trim();
    if(newName.includes(",")){
        fetch("https://api.openweathermap.org/data/2.5/forecast?zip="+newName+"&units=metric&appid=e63d17378135520e5e84f435ac68b3ed")
        .then(response=> response.json())
        .then(data=>{
            for(let i=1;i<4;i++){
                document.getElementById("day"+(i)+"Min").innerHTML="Min : " +Number(data.list[i].main.temp_min).toFixed(1)+"°C";
            }
            for(let i=1;i<4;i++){
                document.getElementById("day"+(i)+"Max").innerHTML="Max : " +Number(data.list[i].main.temp_max).toFixed(1)+"°C";
            }

            for(let i=1;i<4;i++){
                document.getElementById("img" + (i)).src="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
            }
        })


        .catch(err => alert("Something went Wrong"))
    }
            
        
    else{
        fetch("https://api.openweathermap.org/data/2.5/forecast?q="+newName+"&units=metric&appid=e63d17378135520e5e84f435ac68b3ed")
        .then(response=> response.json())
        .then(data=>{
            for(let i=1;i<4;i++){
                document.getElementById("day"+(i)+"Min").innerHTML="Min : " +Number(data.list[i].main.temp_min).toFixed(1)+"°C";
            }
            for(let i=1;i<4;i++){
                document.getElementById("day"+(i)+"Max").innerHTML="Max : " +Number(data.list[i].main.temp_max).toFixed(1)+"°C";
            }

            for(let i=1;i<4;i++){
                document.getElementById("img" + (i)).src="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
            }
        })


        .catch(err => alert("Something went Wrong"))
        }
}

// function DefaultScreen(){
//     document.getElementById("searchbox").defaultValue = "London";
//     GetInfo("London");
// }
// window.onload = DefaultScreen();

const d= new Date();
const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];



function checkDay(day){
    if(day+d.getDay()>6){
        return day +d.getDay()-7;
    }
    else{
        return day +d.getDay();
    }
}

for(let i=0;i<3;i++){
    document.getElementById("day"+(i+1)).innerHTML=weekday[checkDay(i+1)];
    
}