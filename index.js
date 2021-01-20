var temp=document.getElementById('temp')
var locname=document.getElementById('locname')
var windspeed=document.getElementById('windspeed')
var mintemp=document.getElementById('mintemp')
var maxtemp=document.getElementById('maxtemp')
var tempstatus=document.getElementById('tempstatus')
var icon=document.getElementById('icon')





async function getdata(city){
    const data=await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=4b76290ce624452f949be23fa36d6262&pretty=1`)
    const result=await data.json();
    const lat=result.results[0].geometry.lat;
    const lon=result.results[0].geometry.lng;
    return( {
        latitude:lat,
        longitude:lon,
    })
    


}


async function fetchdata(){
    
    var input =document.getElementById('city').value;
    event.preventDefault()
    const data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=374abe7635cad005595d3765035c9d63` )
    const result=await data.json();
   
    
    temp.innerHTML=`Temperature ${parseInt(result.main.temp)} &deg C`
    locname.innerHTML=`Location : ${result.name} `
    tempstatus.innerHTML=`Weather :${result.weather[0].main}  `
    mintemp.innerHTML=`Min Temp ${result.main.temp_min} &deg C`
    maxtemp.innerHTML=`Max Temp ${result.main.temp_max} &deg C`
    windspeed.innerHTML=`Wind speed  ${result.wind.speed} m/sec`
    var status=result.weather[0].main;
    var iconimg=result.weather[0].icon;
    icon.innerHTML =`<img src="http://openweathermap.org/img/wn/${iconimg}@2x.png"></img>` ;
      

    const {latitude,longitude}= await getdata(input);



   const places=await fetch(`https://api.openweathermap.org/data/2.5/find?&lat=${latitude}&lon=${longitude}&cnt=25&units=metric&appid=374abe7635cad005595d3765035c9d63`)
   const placedata=await places.json();
   const placesdata =placedata.list;
   var tbody=document.getElementById('tablebody');
   tbody.innerHTML='';
   placesdata.map((value,index)=>{
      //  tbody.insertAdjacentHTML("beforeend",`<tr scope="row"><td>${value.name}</td><td>${value.main.temp} &deg C</td><td>${value.main.temp_min} &deg C</td><td>${value.main.temp_max} &deg C</td><td>${value.weather[0].main} </td><td>${value.main.feels_like} &deg C</td><td>${value.wind.speed} m/sec </td></tr>`);
       tbody.innerHTML+=`<tr scope="row"><td>${value.name}</td><td>${value.main.temp} &deg C</td><td>${value.main.temp_min} &deg C</td><td>${value.main.temp_max} &deg C</td><td>${value.weather[0].main} </td><td>${value.main.feels_like} &deg C</td><td>${value.wind.speed} m/sec </td></tr>`;
    })
    

     datatable= new simpleDatatables.DataTable("#cities",{
       exportable:{
         type:"json",
         download:true,

       }
     })
    
   






}


function print()
{

  var printoption=document.getElementById('printoption');
  alert( printoption.value)
  datatable.export({
    type: printoption.value,
    filename: "weatherdata",
    selection: datatable.currentPage
});

}
