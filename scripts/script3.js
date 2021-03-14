
//default time incase API cannot retrieve user's ip or error with api
//removed decimals from day and week calculation and rounded up using  ceil to always round to largest integar
// let date = new Date();
// let currentHour = date.getHours();
// let currentMinute = ('0'+ date.getMinutes()).slice(-2);
// let yearTimeStart = new Date("January 01, 2021 0:00:00").getTime();
// let yearTimeEnd = new Date("January 01, 2022 0:00:00").getTime();
// let year = yearTimeEnd - yearTimeStart;
// let dayOfyYear = Math.ceil((date.getTime() - yearTimeStart) / (1000 * 60 * 60 * 24));
// let currentWeek = Math.ceil((date.getTime() - yearTimeStart) / (1000 * 60 * 60 * 168));
// let dayNumber = date.getDay() + 1;
// dayOfWeek.innerHTML = dayNames[date.getDay()] + " / " + dayNumber;

// Get current time
// let date;
// let currentHour;
// let currentMinute;
// let currentWeek;
// let dayOfYear;
// let currentDay;

//get elements to change displays/click btn
let headerContainer = document.getElementsByClassName("header-container");
let footerContainer = document.getElementsByClassName("footer-container");
let displayBtn = document.getElementById("btn-click");
let btnLabel = document.getElementsByClassName("btn-label");
let quoteText = document.getElementsByClassName("quote-content");
let quoteCaption = document.getElementsByClassName("quote-caption");
let refreshIcon = document.getElementsByClassName("refresh-icon");

//Time of day change
let greetingMsg = document.getElementsByClassName("time-greeting");
let backgroundImg = document.getElementsByClassName("main-container");
let dayIcon = document.getElementsByClassName("day-icon");
let nightIcon = document.getElementsByClassName("night-icon");

// Display clock time
let clock = document.getElementById("clock");
let timeZoneAbbrev = document.getElementsByClassName("time-zone");

//Display Location
let locationInfo = document.getElementsByClassName("time-location");

let footerInfo = document.getElementsByClassName("footer-info");
let timeZone = footerInfo[0];
let yearDay = footerInfo[1];
let dayOfWeek = footerInfo[2];
let weekOfYear = footerInfo[3];
let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// window.addEventListener("load", () => {
function getQuote() {
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      let quoteData = JSON.parse(this.responseText);
      quoteData.message;
      quoteData.author;
      quoteText[0].innerHTML = quoteData.message;
      quoteCaption[0].innerHTML = "- " + quoteData.author;
    }
});

  xhr.open("GET", "https://qvoca-bestquotes-v1.p.rapidapi.com/quote");
  xhr.setRequestHeader("x-rapidapi-key", "zay9onMX0RmshomUgdlGXWmSZRg1p14I8gsjsnHAZXtbx1kRjg");
  xhr.setRequestHeader("x-rapidapi-host", "qvoca-bestquotes-v1.p.rapidapi.com");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  
  quoteContainer[0].style.animation = "fade-in 2s";
  xhr.send();
}
// });
getQuote();


// Get user's time based on their public IP address by calling worldtimeapi.org API
let getUser = setInterval(function() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      success(JSON.parse(xhttp.responseText));
    }
  }
  xhttp.open('GET', 'https://worldtimeapi.org/api/ip');
  xhttp.send();

  function success(data){
    // console.log(data);
    let date = new Date (data.datetime);
    let currentHour = ('0'+ date.getHours()).slice(-2);
    let currentMinute = ('0'+ date.getMinutes()).slice(-2);
    let currentWeek = data.week_number;
    let dayOfYear = data.day_of_year;
    let currentDay = data.day_of_week;
  
  //Get user location based on public IP address  by calling freegeoip.org API
  () => {
    let ipAddress = data.client_ip;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === this.DONE) {
        // success(JSON.parse(xhttp.responseText));
        let locationData = JSON.parse(xhttp.responseText);
        locationInfo[0].innerHTML = locationData.city + ", " + locationData.country_code;
      }
    }
    xhttp.open('GET', 'https://freegeoip.app/json/' + ipAddress);
    xhttp.send();
  }
    //Display clock info
    clock.innerHTML = currentHour + ":" + currentMinute;
    timeZoneAbbrev[0].innerHTML = data.abbreviation;
  
    //Display footer info
    timeZone.innerHTML = data.timezone;
    yearDay.innerHTML = dayOfYear;
    weekOfYear.innerHTML = currentWeek;
    dayOfWeek.innerHTML = dayNames[date.getDay()] + " / " + currentDay;
  
    //Change time of day elements
    if (currentHour < 17 && currentHour >= 12){
      backgroundImg[0].style.background = "rgba(0, 0, 0, 0.5) url('./assets/bg-image-daytime.jpg') no-repeat";
      backgroundImg[0].style.backgroundSize =  "cover";
      greetingMsg[0].innerHTML = "Good Afternoon";
      dayIcon[0].style.display = "inline";
    } else if (currentHour < 12 && currentHour >= 5) {
      greetingMsg[0].innerHTML = "Good Morning";
      dayIcon[0].style.display = "inline";
      backgroundImg[0].style.background = "rgba(0, 0, 0, 0.5) url('./assets/bg-image-daytime.jpg') no-repeat";
      backgroundImg[0].style.backgroundSize =  "cover";
    } else if (currentHour < 5 && currentHour >= 0) {
      greetingMsg[0].innerHTML = "Good Morning";
      nightIcon[0].style.display = "inline";
      backgroundImg[0].style.background = "rgba(0, 0, 0, 0.5) url('./assets/bg-image-nighttime.jpg') no-repeat";
      backgroundImg[0].style.backgroundSize =  "cover";
    } else {
      greetingMsg[0].innerHTML = "Good Evening";
      nightIcon[0].style.display = "inline";
      backgroundImg[0].style.background = "rgba(0, 0, 0, 0.5) url('./assets/bg-image-nighttime.jpg') no-repeat";
      backgroundImg[0].style.backgroundSize =  "cover";
    }
  }
}, 1000);
  
getUser();

  //Display and hide elements when btn is clicked
  displayBtn.addEventListener("click", function (){
    let labelContent = btnLabel[0].textContent;
    if(labelContent === "More"){
        btnLabel[0].innerHTML = "Less";
        headerContainer[0].style.display = "none";
        footerContainer[0].style.display = "flex";
        console.log(labelContent);
    } else if (labelContent === "Less"){
        btnLabel[0].innerHTML = "More";
        footerContainer[0].style.display = "none";
        headerContainer[0].style.display = "flex";
        console.log(labelContent);
    } else {
      console.log("Error");
      }
    });
// });


//Refresh Quote
refreshIcon[0].addEventListener("click", function (){
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      success(JSON.parse(this.responseText));
      quoteData.message;
      quoteData.author;
      quoteText[0].innerHTML = quoteData.message;
      quoteCaption[0].innerHTML = "- " + quoteData.author;
    }
  });
  
  xhr.open("GET", "https://qvoca-bestquotes-v1.p.rapidapi.com/quote");
  xhr.setRequestHeader("x-rapidapi-key", "zay9onMX0RmshomUgdlGXWmSZRg1p14I8gsjsnHAZXtbx1kRjg");
  xhr.setRequestHeader("x-rapidapi-host", "qvoca-bestquotes-v1.p.rapidapi.com");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  
  xhr.send(quoteData);
  
  function success(quoteData){
    quoteData.message;
    quoteData.author;
    quoteText[0].innerHTML = quoteData.message;
    quoteCaption[0].innerHTML = "- " + quoteData.author;
  }
});