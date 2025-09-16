
// Enhanced Mutfak Control with LocalStorage, Animations, and Voice Integration
class MutfakController {
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
        this.waterToggleButton = document.getElementById("waterToggleButton");
        this.gasToggleButton = document.getElementById("gasToggleButton");
        this.currentTemperatureSpan = document.getElementById("currentTemperature");
        this.lightCard = document.getElementById("lightCard");
        this.waterCard = document.getElementById("waterCard");
        this.gasCard = document.getElementById("gasCard");
        this.lightStatus = document.getElementById("lightStatus");
        this.waterStatus = document.getElementById("waterStatus");
        this.gasStatus = document.getElementById("gasStatus");
    }

    bindEvents() {
        this.lightToggleButton.addEventListener("click", () => this.toggleLight());
        this.heatIncreaseButton.addEventListener("click", () => this.increaseTemperature());
        this.heatDecreaseButton.addEventListener("click", () => this.decreaseTemperature());
        this.waterToggleButton.addEventListener("click", () => this.toggleWater());
        this.gasToggleButton.addEventListener("click", () => this.toggleGas());
        
        // Listen for voice commands from dashboard
        window.addEventListener('deviceToggle', (event) => {
            const { deviceId, state } = event.detail;
            if (deviceId === 'mutfak-light') {
                this.setLightState(state);
            } else if (deviceId === 'mutfak-water') {
                this.setWaterState(state);
            } else if (deviceId === 'mutfak-gas') {
                this.setGasState(state);
            }
        });
    }

    // LocalStorage Management
    loadDeviceStates() {
        const defaultStates = {
            'mutfak-light': false,
            'mutfak-water': false,
            'mutfak-gas': false
        };
        const saved = localStorage.getItem('deviceStates');
        return saved ? { ...defaultStates, ...JSON.parse(saved) } : defaultStates;
    }

    saveDeviceStates() {
        localStorage.setItem('deviceStates', JSON.stringify(this.deviceStates));
    }

    loadTemperatures() {
        const defaultTemps = { mutfak: 24 };
        const saved = localStorage.getItem('temperatures');
        return saved ? { ...defaultTemps, ...JSON.parse(saved) } : defaultTemps;
    }

    saveTemperatures() {
        localStorage.setItem('temperatures', JSON.stringify(this.temperatures));
    }

    loadStates() {
        this.setLightState(this.deviceStates['mutfak-light']);
        this.setWaterState(this.deviceStates['mutfak-water']);
        this.setGasState(this.deviceStates['mutfak-gas']);
        this.updateTemperatureDisplay();
    }

    // Light Control with Animation
    toggleLight() {
        const newState = !this.deviceStates['mutfak-light'];
        this.setLightState(newState);
    }

    setLightState(state) {
        this.deviceStates['mutfak-light'] = state;
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

    // Water Control
    toggleWater() {
        const newState = !this.deviceStates['mutfak-water'];
        this.setWaterState(newState);
    }

    setWaterState(state) {
        this.deviceStates['mutfak-water'] = state;
        this.saveDeviceStates();
        
        if (state) {
            this.waterToggleButton.textContent = "Su Kapat";
            this.waterToggleButton.style.backgroundColor = "var(--color-danger)";
            this.waterStatus.textContent = "Açık";
            this.waterStatus.className = "device-status on";
        } else {
            this.waterToggleButton.textContent = "Su Aç";
            this.waterToggleButton.style.backgroundColor = "var(--color-accent)";
            this.waterStatus.textContent = "Kapalı";
            this.waterStatus.className = "device-status off";
        }
    }

    // Gas Control
    toggleGas() {
        const newState = !this.deviceStates['mutfak-gas'];
        this.setGasState(newState);
    }

    setGasState(state) {
        this.deviceStates['mutfak-gas'] = state;
        this.saveDeviceStates();
        
        if (state) {
            this.gasToggleButton.textContent = "Gaz Kapat";
            this.gasToggleButton.style.backgroundColor = "var(--color-danger)";
            this.gasStatus.textContent = "Açık";
            this.gasStatus.className = "device-status on";
        } else {
            this.gasToggleButton.textContent = "Gaz Aç";
            this.gasToggleButton.style.backgroundColor = "var(--color-accent)";
            this.gasStatus.textContent = "Kapalı";
            this.gasStatus.className = "device-status off";
        }
    }

    // Temperature Control
    increaseTemperature() {
        this.temperatures.mutfak++;
        this.updateTemperatureDisplay();
        this.updateButtonStyles();
        this.saveTemperatures();
    }

    decreaseTemperature() {
        this.temperatures.mutfak--;
        this.updateTemperatureDisplay();
        this.updateButtonStyles();
        this.saveTemperatures();
    }

    updateTemperatureDisplay() {
        this.currentTemperatureSpan.textContent = this.temperatures.mutfak;
    }

    updateButtonStyles() {
        if (this.temperatures.mutfak > 35) {
            this.heatIncreaseButton.style.backgroundColor = "var(--color-danger)";
        } else {
            this.heatIncreaseButton.style.backgroundColor = "";
        }

        if (this.temperatures.mutfak < 15) {
            this.heatDecreaseButton.style.backgroundColor = "var(--color-primary)";
        } else {
            this.heatDecreaseButton.style.backgroundColor = "";
        }
    }

    // Voice Integration
    initVoiceIntegration() {
        console.log('Mutfak voice integration ready');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MutfakController();
});

