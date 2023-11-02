document.getElementById("left-arrow").addEventListener("click", ()=>{eel.get_random_name()}, false);
//document.getElementById("button-number").addEventListener("click", ()=>{eel.get_random_number()}, false);
//document.getElementById("button-date").addEventListener("click", ()=>{eel.get_date()}, false);
//document.getElementById("button-ip").addEventListener("click", ()=>{eel.get_ip()}, false);


var batteryInner = document.getElementsByClassName('batteryInner')[0];
var batteryPercentage = 5;
var active = true;

setInterval(function(){
  if(batteryPercentage <= 100){
    batteryInner.style.width = batteryPercentage + '%';
    batteryPercentage = (batteryPercentage + 1) % 100 ;
    document.getElementsByClassName("pct")[0].innerHTML = batteryPercentage;

  }
  var element = document.getElementById("left-arrow");
  active = !active;
  active ? element.classList.remove("active") : element.classList.add("active");

}, 200)


var intervalId = window.setInterval(function(){
  console.log("async called");
 update_speed();
}, 100);
 

eel.expose(prompt_alerts);
function prompt_alerts(description) {
  alert(description);
}

async function update_speed() {
  let value = await eel.get_random_number()();
  value = (Math.round(value * 10) / 10).toFixed(1);
  if(value<10.0){
    value = "0"+String(value);
  }
 
  document.getElementById("speedometer").innerHTML = value;
}