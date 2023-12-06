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

function MovingAverage(windowSize) {
  this.windowSize = windowSize;
  this.values = [];
  this.sum = 0;

  this.add = function (newValue) {
    this.values.push(newValue);
    this.sum += newValue;

    if (this.values.length > this.windowSize) {
      var removedValue = this.values.shift();
      this.sum -= removedValue;
    }

    return this.sum / this.values.length;
  };
}

torque_MA = new MovingAverage(25);

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
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
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

  // TODO: Range is now RPM
  document.getElementById("range").innerHTML = line.substring(19, 24);
  document.getElementById("torque").innerHTML = torque_MA
    .add(parseFloat(line.substring(4, 8)))
    .toFixed(2);

  var batteryInner = document.getElementsByClassName("batteryInner")[0];
  let batteryPercentage = parseInt(line.substring(12, 15));
  batteryInner.style.width = String(batteryPercentage).padStart(2, "0") + "%";
  document.getElementsByClassName("pct")[0].innerHTML = batteryPercentage;
}

function updateDateTime() {
  // create a new `Date` object
  const currentDate = new Date();
  const timestamp = currentDate.toLocaleTimeString();

  // update the `textContent` property of the `span` element with the `id` of `datetime`
  document.getElementsByClassName("time")[0].textContent = timestamp.substring(
    0,
    timestamp.length
  );
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
