// Dashboard functionality with Chart.js, LocalStorage, and Smart Assistant
class SmartHomeDashboard {
    constructor() {
        this.energyChart = null;
        this.currentEnergyUsage = 0;
        this.maxEnergyUsage = 100;
        this.deviceStates = this.loadDeviceStates();
        this.temperatures = this.loadTemperatures();
        this.assistantMessages = [
            "Enerji kullanımınız normal seviyede. 🌟",
            "Sıcaklık 28°C'nin üzerinde. Klima açmanızı öneriyorum. ❄️",
            "Bu hafta enerji kullanımınız yüksek. Bazı cihazları kapatmayı düşünün. ⚡",
            "Tüm cihazlarınız optimum seviyede çalışıyor. 👍",
            "Gece saatlerinde enerji tasarrufu için ışıkları kapatın. 🌙",
            "Hava sıcaklığı düşük. Isıtıcıyı açmanızı öneriyorum. 🔥"
        ];
        
        this.init();
    }

    init() {
        this.initEnergyChart();
        this.updateEnergyGauge();
        this.updateDeviceOverview();
        this.updateTemperatureOverview();
        this.initVoiceControl();
        this.startSmartAssistant();
        this.startRealTimeUpdates();
    }

    // Chart.js Energy Usage Chart
    initEnergyChart() {
        const ctx = document.getElementById('energyChart').getContext('2d');
        const data = this.generateEnergyData();
        
        this.energyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Enerji Kullanımı (kWh)',
                    data: data.values,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(148, 163, 184, 0.2)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(148, 163, 184, 0.2)'
                        }
                    }
                }
            }
        });
    }

    generateEnergyData() {
        const labels = [];
        const values = [];
        const now = new Date();
        
        // Generate last 7 days data
        for (let i = 6; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('tr-TR', { weekday: 'short' }));
            
            // Generate realistic energy usage data
            const baseUsage = 15 + Math.random() * 10;
            const variation = (Math.random() - 0.5) * 5;
            values.push(Math.max(0, baseUsage + variation));
        }
        
        return { labels, values };
    }

    // Energy Gauge with CSS Custom Properties
    updateEnergyGauge() {
        const gauge = document.getElementById('energyGauge');
        const valueElement = document.getElementById('energyValue');
        const usageElement = document.getElementById('currentUsage');
        
        // Simulate real-time energy usage
        this.currentEnergyUsage = Math.random() * this.maxEnergyUsage;
        const percentage = (this.currentEnergyUsage / this.maxEnergyUsage) * 100;
        const angle = (percentage / 100) * 360;
        
        gauge.style.setProperty('--gauge-angle', `${angle}deg`);
        valueElement.textContent = `${Math.round(percentage)}%`;
        usageElement.textContent = `${this.currentEnergyUsage.toFixed(1)} kWh`;
        
        // Change color based on usage
        if (percentage > 80) {
            gauge.style.background = `conic-gradient(#ef4444 0deg, #ef4444 ${angle}deg, rgba(148, 163, 184, 0.2) ${angle}deg)`;
        } else if (percentage > 60) {
            gauge.style.background = `conic-gradient(#f59e0b 0deg, #f59e0b ${angle}deg, rgba(148, 163, 184, 0.2) ${angle}deg)`;
        } else {
            gauge.style.background = `conic-gradient(var(--color-primary) 0deg, var(--color-primary) ${angle}deg, rgba(148, 163, 184, 0.2) ${angle}deg)`;
        }
    }

    // Device States with LocalStorage
    loadDeviceStates() {
        const defaultStates = {
            'salon-light': false,
            'salon-fan': false,
            'mutfak-light': false,
            'mutfak-water': false,
            'mutfak-gas': false,
            'banyo-light': false,
            'banyo-water': false,
            'yatak-light': false,
            'yatak-door': false,
            'oturma-light': false,
            'oturma-fan': false,
            'cocuk-light': false,
            'cocuk-fan': false
        };
        
        const saved = localStorage.getItem('deviceStates');
        return saved ? { ...defaultStates, ...JSON.parse(saved) } : defaultStates;
    }

    saveDeviceStates() {
        localStorage.setItem('deviceStates', JSON.stringify(this.deviceStates));
    }

    loadTemperatures() {
        const defaultTemps = {
            salon: 22,
            mutfak: 24,
            banyo: 23,
            yatak: 21,
            oturma: 22,
            cocuk: 23
        };
        
        const saved = localStorage.getItem('temperatures');
        return saved ? { ...defaultTemps, ...JSON.parse(saved) } : defaultTemps;
    }

    saveTemperatures() {
        localStorage.setItem('temperatures', JSON.stringify(this.temperatures));
    }

    updateDeviceOverview() {
        const onDevices = Object.values(this.deviceStates).filter(state => state).length;
        const offDevices = Object.values(this.deviceStates).filter(state => !state).length;
        
        document.getElementById('deviceOverview').innerHTML = `
            <div class="device-status on">🟢 ${onDevices} Cihaz Açık</div>
            <div class="device-status off">⚫ ${offDevices} Cihaz Kapalı</div>
        `;
    }

    updateTemperatureOverview() {
        const temps = Object.values(this.temperatures);
        const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
        const maxTemp = Math.max(...temps);
        
        document.getElementById('avgTemp').textContent = `${avgTemp.toFixed(1)}°C`;
        document.getElementById('maxTemp').textContent = `${maxTemp}°C`;
    }

    // Voice Control with Web Speech API
    initVoiceControl() {
        const voiceBtn = document.getElementById('voiceBtn');
        let recognition = null;
        
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'tr-TR';
            
            recognition.onstart = () => {
                voiceBtn.classList.add('listening');
                voiceBtn.textContent = '🔴';
            };
            
            recognition.onend = () => {
                voiceBtn.classList.remove('listening');
                voiceBtn.textContent = '🎤';
            };
            
            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
            };
            
            recognition.onerror = (event) => {
                console.error('Voice recognition error:', event.error);
                voiceBtn.classList.remove('listening');
                voiceBtn.textContent = '🎤';
            };
        }
        
        voiceBtn.addEventListener('click', () => {
            if (recognition) {
                recognition.start();
            } else {
                alert('Sesli komutlar bu tarayıcıda desteklenmiyor.');
            }
        });
    }

    processVoiceCommand(command) {
        const commands = {
            'ışığı aç': () => this.toggleDevice('salon-light', true),
            'ışığı kapat': () => this.toggleDevice('salon-light', false),
            'fanı aç': () => this.toggleDevice('salon-fan', true),
            'fanı kapat': () => this.toggleDevice('salon-fan', false),
            'klimayı aç': () => this.toggleDevice('salon-fan', true),
            'klimayı kapat': () => this.toggleDevice('salon-fan', false),
            'kapıyı kilitle': () => this.toggleDevice('yatak-door', true),
            'kapıyı aç': () => this.toggleDevice('yatak-door', false),
            'suyu aç': () => this.toggleDevice('mutfak-water', true),
            'suyu kapat': () => this.toggleDevice('mutfak-water', false)
        };
        
        for (const [key, action] of Object.entries(commands)) {
            if (command.includes(key)) {
                action();
                this.showVoiceFeedback(`Komut uygulandı: ${key}`);
                break;
            }
        }
    }

    toggleDevice(deviceId, state) {
        this.deviceStates[deviceId] = state;
        this.saveDeviceStates();
        this.updateDeviceOverview();
        
        // Trigger device animation
        this.animateDevice(deviceId, state);
    }

    animateDevice(deviceId, state) {
        // This would trigger animations on the actual device pages
        const event = new CustomEvent('deviceToggle', {
            detail: { deviceId, state }
        });
        window.dispatchEvent(event);
    }

    showVoiceFeedback(message) {
        const assistantMessage = document.getElementById('assistantMessage');
        assistantMessage.innerHTML = `<p style="margin: 0;">${message}</p>`;
        assistantMessage.classList.add('fade-in');
        
        setTimeout(() => {
            assistantMessage.classList.remove('fade-in');
        }, 300);
    }

    // Smart Assistant with AI-like behavior
    startSmartAssistant() {
        setInterval(() => {
            this.generateSmartRecommendation();
        }, 30000); // Check every 30 seconds
    }

    generateSmartRecommendation() {
        const avgTemp = Object.values(this.temperatures).reduce((sum, temp) => sum + temp, 0) / Object.values(this.temperatures).length;
        const energyUsage = this.currentEnergyUsage;
        const onDevices = Object.values(this.deviceStates).filter(state => state).length;
        
        let recommendation = '';
        
        if (avgTemp > 28) {
            recommendation = 'Sıcaklık 28°C\'nin üzerinde. Klima açmanızı öneriyorum. ❄️';
        } else if (avgTemp < 18) {
            recommendation = 'Hava sıcaklığı düşük. Isıtıcıyı açmanızı öneriyorum. 🔥';
        } else if (energyUsage > 80) {
            recommendation = 'Enerji kullanımınız yüksek. Bazı cihazları kapatmayı düşünün. ⚡';
        } else if (onDevices > 10) {
            recommendation = 'Çok fazla cihaz açık. Enerji tasarrufu için bazılarını kapatın. 💡';
        } else {
            recommendation = 'Eviniz optimum seviyede çalışıyor. Harika! 🌟';
        }
        
        this.updateAssistantMessage(recommendation);
    }

    updateAssistantMessage(message) {
        const assistantMessage = document.getElementById('assistantMessage');
        assistantMessage.innerHTML = `<p style="margin: 0;">${message}</p>`;
        assistantMessage.classList.add('slide-up');
        
        setTimeout(() => {
            assistantMessage.classList.remove('slide-up');
        }, 300);
    }

    // Real-time updates
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateEnergyGauge();
            this.updateTemperatureOverview();
        }, 5000); // Update every 5 seconds
        
        // Simulate temperature changes
        setInterval(() => {
            Object.keys(this.temperatures).forEach(room => {
                const change = (Math.random() - 0.5) * 0.5;
                this.temperatures[room] = Math.max(15, Math.min(35, this.temperatures[room] + change));
            });
            this.saveTemperatures();
        }, 10000); // Change every 10 seconds
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SmartHomeDashboard();
});
