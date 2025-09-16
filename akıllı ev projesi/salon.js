
// Enhanced Salon Control with LocalStorage, Animations, and Voice Integration
class SalonController {
    constructor() {
        this.deviceStates = this.loadDeviceStates();
        this.temperatures = this.loadTemperatures();
        this.init();
    }

    init() {
        this.initElements();
        this.bindEvents();
        this.loadStates();
        this.initVoiceIntegration();
    }

    initElements() {
        this.lightToggleButton = document.getElementById("lightToggleButton");
        this.heatIncreaseButton = document.getElementById("heatIncreaseButton");
        this.heatDecreaseButton = document.getElementById("heatDecreaseButton");
        this.cameraToggleButton = document.getElementById("cameraToggleButton");
        this.currentTemperatureSpan = document.getElementById("currentTemperature");
        this.lightCard = document.getElementById("lightCard");
        this.fanCard = document.getElementById("fanCard");
        this.lightStatus = document.getElementById("lightStatus");
        this.fanStatus = document.getElementById("fanStatus");
        this.cameraFeed = document.getElementById("cameraFeed");
    }

    bindEvents() {
        this.lightToggleButton.addEventListener("click", () => this.toggleLight());
        this.heatIncreaseButton.addEventListener("click", () => this.increaseTemperature());
        this.heatDecreaseButton.addEventListener("click", () => this.decreaseTemperature());
        this.cameraToggleButton.addEventListener("click", () => this.toggleCamera());
        
        // Listen for voice commands from dashboard
        window.addEventListener('deviceToggle', (event) => {
            const { deviceId, state } = event.detail;
            if (deviceId === 'salon-light') {
                this.setLightState(state);
            } else if (deviceId === 'salon-fan') {
                this.setFanState(state);
            }
        });
    }

    // LocalStorage Management
    loadDeviceStates() {
        const defaultStates = {
            'salon-light': false,
            'salon-fan': false
        };
        const saved = localStorage.getItem('deviceStates');
        return saved ? { ...defaultStates, ...JSON.parse(saved) } : defaultStates;
    }

    saveDeviceStates() {
        localStorage.setItem('deviceStates', JSON.stringify(this.deviceStates));
    }

    loadTemperatures() {
        const defaultTemps = { salon: 22 };
        const saved = localStorage.getItem('temperatures');
        return saved ? { ...defaultTemps, ...JSON.parse(saved) } : defaultTemps;
    }

    saveTemperatures() {
        localStorage.setItem('temperatures', JSON.stringify(this.temperatures));
    }

    loadStates() {
        this.setLightState(this.deviceStates['salon-light']);
        this.setFanState(this.deviceStates['salon-fan']);
        this.updateTemperatureDisplay();
    }

    // Light Control with Animation
    toggleLight() {
        const newState = !this.deviceStates['salon-light'];
        this.setLightState(newState);
    }

    setLightState(state) {
        this.deviceStates['salon-light'] = state;
        this.saveDeviceStates();
        
        if (state) {
            this.lightToggleButton.classList.remove("off");
            this.lightToggleButton.classList.add("on");
            this.lightToggleButton.textContent = "Işığı Kapat";
            this.lightCard.classList.add("on");
            this.lightStatus.textContent = "Açık";
            this.lightStatus.className = "device-status on";
        } else {
            this.lightToggleButton.classList.remove("on");
            this.lightToggleButton.classList.add("off");
            this.lightToggleButton.textContent = "Işığı Aç";
            this.lightCard.classList.remove("on");
            this.lightStatus.textContent = "Kapalı";
            this.lightStatus.className = "device-status off";
        }
    }

    // Fan Control with Animation
    toggleFan() {
        const newState = !this.deviceStates['salon-fan'];
        this.setFanState(newState);
    }

    setFanState(state) {
        this.deviceStates['salon-fan'] = state;
        this.saveDeviceStates();
        
        if (state) {
            this.cameraToggleButton.textContent = "Klima Kapat";
            this.fanCard.classList.add("on");
            this.fanStatus.textContent = "Açık";
            this.fanStatus.className = "device-status on";
        } else {
            this.cameraToggleButton.textContent = "Klima Aç";
            this.fanCard.classList.remove("on");
            this.fanStatus.textContent = "Kapalı";
            this.fanStatus.className = "device-status off";
        }
    }

    // Temperature Control
    increaseTemperature() {
        this.temperatures.salon++;
        this.updateTemperatureDisplay();
        this.updateButtonStyles();
        this.saveTemperatures();
    }

    decreaseTemperature() {
        this.temperatures.salon--;
        this.updateTemperatureDisplay();
        this.updateButtonStyles();
        this.saveTemperatures();
    }

    updateTemperatureDisplay() {
        this.currentTemperatureSpan.textContent = this.temperatures.salon;
    }

    updateButtonStyles() {
        if (this.temperatures.salon > 35) {
            this.heatIncreaseButton.style.backgroundColor = "var(--color-danger)";
        } else {
            this.heatIncreaseButton.style.backgroundColor = "";
        }

        if (this.temperatures.salon < 15) {
            this.heatDecreaseButton.style.backgroundColor = "var(--color-primary)";
        } else {
            this.heatDecreaseButton.style.backgroundColor = "";
        }
    }

    // Camera Control (renamed from original camera functionality)
    toggleCamera() {
        this.toggleFan(); // Using camera button for fan control
    }

    // Voice Integration
    initVoiceIntegration() {
        // This will be called by the dashboard's voice recognition
        console.log('Salon voice integration ready');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SalonController();
});
