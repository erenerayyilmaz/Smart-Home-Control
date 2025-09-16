console.log("merhaba");
const lightToggleButton = document.getElementById("lightToggleButton");
const heatIncreaseButton = document.getElementById("heatIncreaseButton");
const heatDecreaseButton = document.getElementById("heatDecreaseButton");

const currentTemperatureSpan = document.getElementById("currentTemperature");


let isLightOn = false;


let currentTemperature = 20;


lightToggleButton.addEventListener("click", () => {
    isLightOn = !isLightOn;
    if (isLightOn) {
        lightToggleButton.classList.remove("off");
        lightToggleButton.classList.add("on");
        lightToggleButton.textContent = "Işığı Kapat";
    } else {
        lightToggleButton.classList.remove("on");
        lightToggleButton.classList.add("off");
        lightToggleButton.textContent = "Işığı Aç";
    }
});


heatIncreaseButton.addEventListener("click", () => {
    currentTemperature++;
    updateTemperatureDisplay();
    updateButtonStyles();
});


heatDecreaseButton.addEventListener("click", () => {
    currentTemperature--;
    updateTemperatureDisplay();
    updateButtonStyles();
});
function updateButtonStyles() {
    if (currentTemperature > 35) {
        heatIncreaseButton.style.backgroundColor = "red";
    } else {
        heatIncreaseButton.style.backgroundColor = "";
    }

    if (currentTemperature < 15) {
        heatDecreaseButton.style.backgroundColor = "blue";
    } else {
        heatDecreaseButton.style.backgroundColor = "";
    }
}


updateButtonStyles();


function updateTemperatureDisplay() {
    currentTemperatureSpan.textContent = currentTemperature;
}
let isWaterOn = false;


const waterToggleButton = document.getElementById("waterToggleButton");
const waterStatus = document.getElementById("waterStatus");


waterToggleButton.addEventListener("click", () => {
    isWaterOn = !isWaterOn;
    updateWaterStatus();
});



function updateWaterStatus() {
    if (isWaterOn) {
        waterStatus.textContent = "Su Vana Açık";
        waterToggleButton.textContent = "Su Vana Kapat";
        waterToggleButton.style.backgroundColor = "red";
    } else {
        waterStatus.textContent = "Su Vana Kapalı";
        waterToggleButton.textContent = "Su Vana Aç";
        waterToggleButton.style.backgroundColor = "green";
    }
}
