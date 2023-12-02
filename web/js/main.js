/*
document.getElementById("left-arrow").addEventListener(
  "click",
  () => {
    eel.get_random_name();
  },
  false
);
*/
//document.getElementById("button-number").addEventListener("click", ()=>{eel.get_random_number()}, false);
//document.getElementById("button-date").addEventListener("click", ()=>{eel.get_date()}, false);
//document.getElementById("button-ip").addEventListener("click", ()=>{eel.get_ip()}, false);
setInterval(updateDateTime, 1000);

/*
var batteryInner = document.getElementsByClassName("batteryInner")[0];
var batteryPercentage = 5;
var active = true;

setInterval(function () {
  if (batteryPercentage <= 100) {
    batteryInner.style.width = batteryPercentage + "%";
    batteryPercentage = (batteryPercentage + 1) % 100;
    document.getElementsByClassName("pct")[0].innerHTML = batteryPercentage;
  }
}, 200);
*/

// Get the modal
var modal = document.getElementById("infoModal");



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function displayInfo() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 
/*
var intervalId = window.setInterval(function () {
  //console.log("async called");
  update_speed();
}, 100);

eel.expose(prompt_alerts);
function prompt_alerts(description) {
  alert(description);
}
*/

eel.expose(parse);
function parse(line) {
  //speed
  /*
  value = (Math.round(mph * 10) / 10).toFixed(1);
  if (value < 10.0) {
    value = "0" + String(value);
  }
  */

  //document.getElementById("speedometer").innerHTML = line.substring(6,10);
  document.getElementById("range").innerHTML = line.substring(26,29);
  document.getElementById("torque").innerHTML = line.substring(34,36);

  var batteryInner = document.getElementsByClassName("batteryInner")[0];
  let batteryPercentage = line.substring(17,19);
  batteryInner.style.width = batteryPercentage + "%";
  document.getElementsByClassName("pct")[0].innerHTML = batteryPercentage;



}



function updateDateTime() {
  // create a new `Date` object
  const currentDate = new Date();
  const timestamp = currentDate.toLocaleTimeString();

  // update the `textContent` property of the `span` element with the `id` of `datetime`
  document.getElementsByClassName('time')[0].textContent = timestamp.substring(0,timestamp.length);
}

// call the `updateDateTime` function every second



eel.expose(update_speed);
function update_speed(value) {
  //if (value < 1.5){
  //  value = 0;
  //}
  value = (Math.round(value * 10) / 10).toFixed(1);
  if (value < 10.0) {
    value = "0" + String(value);
  }

  document.getElementById("speedometer").innerHTML = value;
}

