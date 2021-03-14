//get elements to change displays/click btn
let headerContainer = document.getElementsByClassName("header-container");
let footerContainer = document.getElementsByClassName("footer-container");
let displayBtn = document.getElementById("btn-click");
let btnLabel = document.getElementsByClassName("btn-label");
let quoteText = document.getElementsByClassName("quote-content");
let quoteCaption = document.getElementsByClassName("quote-caption");
let refreshIcon = document.getElementsByClassName("refresh-icon");

let quoteContainer = document.getElementsByClassName("quote-container");

//Time of day change
let greetingContainer = document.getElementsByClassName("time-greeting-container");
let greetingMsg = document.getElementsByClassName("time-greeting");
let backgroundImg = document.getElementsByClassName("main-container");
let dayIcon = document.getElementsByClassName("day-icon");
let nightIcon = document.getElementsByClassName("night-icon");

// Display clock time
let clock = document.getElementById("clock");
let timeZoneAbbrev = document.getElementsByClassName("time-zone");

//Display Location
let locationInfo = document.getElementsByClassName("time-location");

let footerContent = document.getElementsByClassName("footer-content");
let footerInfo = document.getElementsByClassName("footer-info");
let timeZone = footerInfo[0];
let yearDay = footerInfo[1];
let dayOfWeek = footerInfo[2];
let weekOfYear = footerInfo[3];
let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// default time incase API cannot retrieve user's ip or error with api
// removed decimals from day and week calculation and rounded up using  ceil to always round to largest integar
let date = new Date();
let currentHour = ('0' + date.getHours()).slice(-2);
let currentMinute = ('0'+ date.getMinutes()).slice(-2);
let yearTimeStart = new Date("January 01, 2021 0:00:00").getTime();
let yearTimeEnd = new Date("January 01, 2022 0:00:00").getTime();
let year = yearTimeEnd - yearTimeStart;
let dayOfYear = Math.ceil((date.getTime() - yearTimeStart) / (1000 * 60 * 60 * 24));
let currentWeek = Math.ceil((date.getTime() - yearTimeStart) / (1000 * 60 * 60 * 168));
let currentDay = date.getDay() + 1;

function checkTime(currentHour) {
  if (currentHour < 17 && currentHour >= 12){
    // backgroundImg[0].style.animation="fade-in";
    backgroundImg[0].style.background = "rgba(0, 0, 0, 0.5) url('./assets/bg-image-daytime.jpg') no-repeat";
    backgroundImg[0].style.backgroundSize =  "cover";
    greetingMsg[0].innerHTML = "Good Afternoon";
    dayIcon[0].style.display = "inline";
    nightIcon[0].style.display = "none";
    (function(){
      // backgroundImg[0].style.animation="fade-in";
      // clock.style.animation = "fade-in";
      // timeZoneAbbrev[0].style.animation = "fade-in";
      // greetingContainer[0].style.animation = "fade-in";
      // quoteContainer[0].style.animation = "fade-in";
    }());

  } else if (currentHour < 12 && currentHour >= 5) {
    // backgroundImg[0].style.animation="fade-in 1s";
    greetingMsg[0].innerHTML = "Good Morning";
    dayIcon[0].style.display = "inline";
    nightIcon[0].style.display = "none";
    backgroundImg[0].style.background = "rgba(0, 0, 0, 0.5) url('./assets/bg-image-daytime.jpg') no-repeat";
    backgroundImg[0].style.backgroundSize =  "cover";
    (function(){
      console.log(currentHour);
      // backgroundImg[0].style.animation="fade-in";
      // clock.style.animation = "fade-in";
      // timeZoneAbbrev[0].style.animation = "fade-in";
      // greetingContainer[0].style.animation = "fade-in";
      // quoteContainer[0].style.animation = "fade-in";
    }());
  } else if (currentHour < 5 && currentHour >= 0) {
    greetingMsg[0].innerHTML = "Good Morning";
    nightIcon[0].style.display = "inline";
    dayIcon[0].style.display = "none";
    backgroundImg[0].style.background = "rgba(0, 0, 0, 0.5) url('./assets/bg-image-nighttime.jpg') no-repeat";
    backgroundImg[0].style.backgroundSize =  "cover";
    (function(){
      // backgroundImg[0].style.animation="fade-in";
      // clock.style.animation = "fade-in";
      // timeZoneAbbrev[0].style.animation = "fade-in";
      // greetingContainer[0].style.animation = "fade-in";
      // quoteContainer[0].style.animation = "fade-in";
    }());
  } else {
    // backgroundImg[0].style.animation="fade-in";
    greetingMsg[0].innerHTML = "Good Evening";
    nightIcon[0].style.display = "inline";
    dayIcon[0].style.display = "none";
    backgroundImg[0].style.background = "rgba(0, 0, 0, 0.5) url('./assets/bg-image-nighttime.jpg') no-repeat";
    backgroundImg[0].style.backgroundSize =  "cover";
    (function(){
      // backgroundImg[0].style.animation="fade-in";
      // clock.style.animation = "fade-in";
      // timeZoneAbbrev[0].style.animation = "fade-in";
      // greetingContainer[0].style.animation = "fade-in";
      // quoteContainer[0].style.animation = "fade-in";
    }());
  }  
}
checkTime();

//Display clock info
clock.innerHTML = currentHour + ":" + currentMinute;

//Display footer info
yearDay.innerHTML = dayOfYear;
weekOfYear.innerHTML = currentWeek;
dayOfWeek.innerHTML = dayNames[date.getDay()] + " / " + currentDay;

//Display and hide elements when btn is clicked
displayBtn.addEventListener("click", function (){
  let labelContent = btnLabel[0].textContent;
  if(labelContent === "More"){
      btnLabel[0].innerHTML = "Less";
      headerContainer[0].style.display = "none";
      footerContainer[0].style.display = "flex";
  } else if (labelContent === "Less"){
      btnLabel[0].innerHTML = "More";
      footerContainer[0].style.display = "none";
      headerContainer[0].style.display = "flex";
  } else {
    console.log("Error");
    }
});

// let getUser = setInterval(function() {
(function(){
  let updateData = setInterval(function() {
    getUser();
  }, 1000);
}());

function getUser(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(xhttp.responseText);
      getLocation(data);
      success(data);
      // console.log(data);
    }
  }
  xhttp.open('GET', 'https://worldtimeapi.org/api/ip');
  xhttp.send();
}

function success(data) {
  let userDate = data.datetime.replace(/[-/a-z/:/./]/gi, ', ').substring(0, 24);
  currentHour = userDate.substring(14, 16);
  currentMinute = userDate.substring(18, 20);
  // console.log(currentHour);
  // console.log(currentMinute);
  currentWeek = data.week_number;
  dayOfYear = data.day_of_year;
  currentDay = data.day_of_week + 1;

  //Display clock info
  clock.innerHTML = currentHour + ":" + currentMinute;
  timeZoneAbbrev[0].innerHTML = data.abbreviation;
  clock.style.animation = "fade-in 2s";
  quoteContainer[0].style.animation = "fade-in 2s";
  timeZoneAbbrev[0].style.animation = "fade-in 2s";
  greetingContainer[0].style.animation = "fade-in 2s";
  // backgroundImg[0].style.animation="fade-in 1s";
          
  //Display footer info
  timeZone.innerHTML = data.timezone;
  yearDay.innerHTML = dayOfYear;
  weekOfYear.innerHTML = currentWeek;
  dayOfWeek.innerHTML = dayNames[date.getDay()] + " / " + currentDay;
  locationInfo[0].style.animation = "fade-in 2s";
  footerContent[0].style.animation = "fade-in 2s";

  checkTime(currentHour);
}

  //get user location
  function getLocation(data){
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
  };

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
    
    quoteContainer[0].style.animation = "fade-in 4s";
    xhr.send();
  }
  // getQuote();