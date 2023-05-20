let apiKey = `5055851c551a42edbe54f0fa02eb1474`;
let uppercontainer = document.getElementById("uppercontainer");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  alert("Geolocation is not supported by this browser.");
}


async function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${apiKey}`
  let response = await fetch(url);
  let data = await response.json();
  if(data.length!==0){
    let name = data.results[0].timezone.name;
    let std = data.results[0].timezone.offset_STD;
    let stdsec = data.results[0].timezone.offset_STD_seconds;
    let dst = data.results[0].timezone.offset_DST;
    let dstsec = data.results[0].timezone.offset_DST_seconds;
    let country = data.results[0].country;
    let city = data.results[0].city;
    uppercontainer.innerHTML =`<div>Name Of Time Zone : ${name}</div>
                                <div class="lonspan"><span>Lat : ${lat}</span><span>Long : ${long}</span></div>
                                <div>Offset STD : ${std}</div>
                                <div>Offset STD Seconds : ${stdsec}</div>
                                <div>Offset DST : ${dst}</div
                                <div>Offset DST Seconds : ${dstsec}</div>
                                <div>Country : ${country}</div>
                                <div>City : ${city}</div>`;
  }
  else {
    alert("No location found");
  }
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.")
      break;
  }
}

let input = document.getElementById("input");
let result = document.getElementById("result");
let error = document.querySelector(".error");
let resultcontainer = document.querySelector(".resultcontainer")

async function getByAddress(){
  if(input.value){
    if(error.style.display==="block"){
      error.style.display = "none";
    }
    let address = input.value;
    let url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`
    let response = await fetch(url);
    let data = await response.json();
    if(data.features.length !== 0){
      result.innerHTML="";
      resultcontainer.style.display = "block"
        let name = data.features[0].properties.timezone.name;
        let lat = data.features[0].properties.lat;
        let long = data.features[0].properties.lon;
        let std = data.features[0].properties.timezone.offset_STD;
        let stdsec = data.features[0].properties.timezone.offset_STD_seconds;
        let dst = data.features[0].properties.timezone.offset_DST;
        let dstsec = data.features[0].properties.timezone.offset_DST_seconds;
        let country = data.features[0].country;
        let city = data.features[0].city;
        result.innerHTML = `<div>Name Of Time Zone : ${name}</div>
                                    <div class="lonspan"><span>Lat : ${lat}</span><span>Long : ${long}</span></div>
                                    <div>Offset STD : ${std}</div>
                                    <div>Offset STD Seconds : ${stdsec}</div>
                                    <div>Offset DST : ${dst}</div
                                    <div>Offset DST Seconds : ${dstsec}</div>
                                    <div>Country : ${country}</div>
                                    <div>City : ${city}</div>`;
    }
    else{
      error.style.display = "block";
      resultcontainer.style.display = "none"
    }
  }
  else{
    if(resultcontainer.style.display==="block"){
      resultcontainer.style.display = "none";
    }
    error.style.display = "block";
  }
}
  