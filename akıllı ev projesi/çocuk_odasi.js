
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
let isCameraOn = false;
let cameraFeed = document.getElementById("cameraFeed");
let cameraToggleButton = document.getElementById("cameraToggleButton");

cameraToggleButton.addEventListener("click", () => {
    isCameraOn = !isCameraOn;

    if (isCameraOn) {
        startCamera();
        cameraToggleButton.textContent = "Kamera Kapat";
    } else {
        stopCamera();
        cameraToggleButton.textContent = "Kamera Aç";
    }
});

function startCamera() {
  
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            cameraFeed.srcObject = stream;
            cameraFeed.style.display = "block"; 
        })
        .catch((error) => {
            console.error("Kamera başlatma hatası:", error);
        });
}

function stopCamera() {
    if (cameraFeed.srcObject) {
      
        cameraFeed.srcObject.getTracks().forEach((track) => {
            track.stop();
        });
        cameraFeed.srcObject = null;
        cameraFeed.style.display = "none"; 
    }
}

