
// Enhanced Yatak Odası Control with LocalStorage, Animations, and Voice Integration
class YatakOdasiController {
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
        this.detectMotionButton = document.getElementById("detectMotionButton");
        this.currentTemperatureSpan = document.getElementById("currentTemperature");
        this.lightCard = document.getElementById("lightCard");
        this.doorCard = document.getElementById("doorCard");
        this.lightStatus = document.getElementById("lightStatus");
        this.doorStatus = document.getElementById("doorStatus");
    }

    bindEvents() {
        this.lightToggleButton.addEventListener("click", () => this.toggleLight());
        this.heatIncreaseButton.addEventListener("click", () => this.increaseTemperature());
        this.heatDecreaseButton.addEventListener("click", () => this.decreaseTemperature());
        this.detectMotionButton.addEventListener("click", () => this.toggleDoorLock());
        
        // Listen for voice commands from dashboard
        window.addEventListener('deviceToggle', (event) => {
            const { deviceId, state } = event.detail;
            if (deviceId === 'yatak-light') {
                this.setLightState(state);
            } else if (deviceId === 'yatak-door') {
                this.setDoorState(state);
            }
        });
    }

    // LocalStorage Management
    loadDeviceStates() {
        const defaultStates = {
            'yatak-light': false,
            'yatak-door': false
        };
        const saved = localStorage.getItem('deviceStates');
        return saved ? { ...defaultStates, ...JSON.parse(saved) } : defaultStates;
    }

    saveDeviceStates() {
        localStorage.setItem('deviceStates', JSON.stringify(this.deviceStates));
    }

    loadTemperatures() {
        const defaultTemps = { yatak: 21 };
        const saved = localStorage.getItem('temperatures');
        return saved ? { ...defaultTemps, ...JSON.parse(saved) } : defaultTemps;
    }

    saveTemperatures() {
        localStorage.setItem('temperatures', JSON.stringify(this.temperatures));
    }

    loadStates() {
        this.setLightState(this.deviceStates['yatak-light']);
        this.setDoorState(this.deviceStates['yatak-door']);
        this.updateTemperatureDisplay();
    }

    // Light Control with Animation
    toggleLight() {
        const newState = !this.deviceStates['yatak-light'];
        this.setLightState(newState);
    }

    setLightState(state) {
        this.deviceStates['yatak-light'] = state;
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

    // Door Lock Control with Animation
    toggleDoorLock() {
        const newState = !this.deviceStates['yatak-door'];
        this.setDoorState(newState);
    }

    setDoorState(state) {
        this.deviceStates['yatak-door'] = state;
        this.saveDeviceStates();
        
        if (state) {
            this.detectMotionButton.textContent = "Kilidi Aç";
            this.doorCard.classList.add("locked");
            this.doorCard.classList.remove("unlocked");
            this.doorStatus.textContent = "Kilitli";
            this.doorStatus.className = "device-status on";
        } else {
            this.detectMotionButton.textContent = "Kilitle";
            this.doorCard.classList.add("unlocked");
            this.doorCard.classList.remove("locked");
            this.doorStatus.textContent = "Açık";
            this.doorStatus.className = "device-status off";
        }
    }

    // Temperature Control
    increaseTemperature() {
        this.temperatures.yatak++;
        this.updateTemperatureDisplay();
        this.updateButtonStyles();
        this.saveTemperatures();
    }

    decreaseTemperature() {
        this.temperatures.yatak--;
        this.updateTemperatureDisplay();
        this.updateButtonStyles();
        this.saveTemperatures();
    }

    updateTemperatureDisplay() {
        this.currentTemperatureSpan.textContent = this.temperatures.yatak;
    }

    updateButtonStyles() {
        if (this.temperatures.yatak > 35) {
            this.heatIncreaseButton.style.backgroundColor = "var(--color-danger)";
        } else {
            this.heatIncreaseButton.style.backgroundColor = "";
        }

        if (this.temperatures.yatak < 15) {
            this.heatDecreaseButton.style.backgroundColor = "var(--color-primary)";
        } else {
            this.heatDecreaseButton.style.backgroundColor = "";
        }
    }

    // Voice Integration
    initVoiceIntegration() {
        console.log('Yatak Odası voice integration ready');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new YatakOdasiController();
});

