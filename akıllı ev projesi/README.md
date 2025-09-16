# Akıllı Ev Kontrol Merkezi

Modern, duyarlı arayüzlü profesyonel bir front‑end akıllı ev kontrol projesi. Odalara göre ışık, sıcaklık, su/ doğalgaz, klima ve güvenlik kontrollerini tek merkezden yönetmenizi sağlar. Portföyünüzde ön plana çıkmanız için sade, şık, karanlık mod destekli ve sesli komut özellikli bir tasarımla geliştirildi.

## ✨ Özellikler

### 🎨 Modern UI/UX
- **Dark/Light Mode**: Otomatik tema algılama ve kalıcı tercih saklama
- **Tam Responsive**: Mobil, tablet ve masaüstü için optimize edilmiş tasarım
- **Smooth Animations**: Cihaz açma/kapama ve geçişlerde akıcı animasyonlar
- **Modern Design System**: Tutarlı renk paleti, tipografi ve bileşenler

### 📊 Dashboard & Analytics
- **Enerji Kullanım Grafikleri**: Chart.js ile günlük/haftalık enerji tüketimi
- **Real-time Gauge**: Anlık enerji kullanım göstergesi
- **Cihaz Durumu**: Tüm cihazların açık/kapalı durumu özeti
- **Sıcaklık İzleme**: Ortalama ve maksimum sıcaklık takibi

### 💾 LocalStorage Integration
- **Cihaz Durumu Saklama**: Tüm cihazların açık/kapalı durumu kalıcı olarak saklanır
- **Sıcaklık Ayarları**: Oda sıcaklıkları sayfa yenilendikten sonra korunur
- **Tema Tercihi**: Dark/Light mode seçimi hatırlanır

### 🎤 Voice Control
- **Web Speech API**: Türkçe sesli komut desteği
- **Desteklenen Komutlar**:
  - "Işığı aç/kapat"
  - "Fanı aç/kapat" 
  - "Klimayı aç/kapat"
  - "Kapıyı kilitle/aç"
  - "Suyu aç/kapat"

### 🏠 Multiple Rooms
- **6 Farklı Oda**: Yatak Odası, Oturma Odası, Çocuk Odası, Salon, Mutfak, Banyo
- **Oda Özel Kontroller**: Her odanın kendine özel cihazları ve kontrolleri
- **Merkezi Dashboard**: Tüm odaların durumunu tek yerden görüntüleme

### 🎭 Device Animations
- **Işık Animasyonu**: Açık ışıklar parlak sarı glow efekti ile yanar
- **Fan Rotasyonu**: Klima/fan açıkken döner animasyon
- **Kapı Kilidi**: Kilitli/açık duruma göre renk değişimi (kırmızı/yeşil)
- **Buton Efektleri**: Tıklama animasyonları ve hover efektleri

### 🤖 Smart Assistant
- **AI-like Recommendations**: Akıllı öneriler sistemi
- **Otomatik Uyarılar**:
  - Sıcaklık 28°C üzerinde → Klima açma önerisi
  - Sıcaklık 18°C altında → Isıtıcı açma önerisi  
  - Yüksek enerji kullanımı → Tasarruf önerisi
  - Çok fazla açık cihaz → Kapatma önerisi
- **Real-time Updates**: 30 saniyede bir güncellenen öneriler

## 🛠 Teknolojiler
- **Frontend**: HTML5, CSS3 (Custom Properties), Vanilla JavaScript
- **Charts**: Chart.js (CDN)
- **Voice**: Web Speech API
- **Storage**: LocalStorage API
- **Design**: Modern CSS Grid, Flexbox, CSS Animations

## 📁 Proje Yapısı
```
.
├── akilli_ev.html          # Ana merkez (odalar kart görünümü)
├── dashboard.html           # Dashboard ve analytics
├── styles.css               # Global tasarım sistemi ve bileşenler
├── akilli_ev.js            # Tema toggle ve global fonksiyonlar
├── dashboard.js             # Dashboard, Chart.js, Smart Assistant
├── [oda].html/.css/.js      # Oda sayfaları ve kontrolleri
└── README.md               # Proje dokümantasyonu
```

## 🚀 Kurulum ve Çalıştırma

### Yerel Sunucu ile (Önerilen)
```bash
# Python ile
python -m http.server 5500

# Node.js ile
npx serve .

# VSCode Live Server extension
```

Sonra `http://localhost:5500/akilli_ev.html` adresini açın.

### Doğrudan Açma
`akilli_ev.html` dosyasını tarayıcıda açabilirsiniz, ancak sesli komutlar için HTTPS gerekebilir.

## 🎯 Kullanım

### Ana Sayfa
- Oda kartlarına tıklayarak oda kontrollerine gidin
- Dashboard butonuna tıklayarak analytics sayfasına gidin
- Sağ üstteki tema butonu ile dark/light mode değiştirin

### Dashboard
- Enerji kullanım grafiklerini görüntüleyin
- Anlık enerji göstergesini takip edin
- Smart Assistant önerilerini okuyun
- Sağ alt köşedeki mikrofon butonu ile sesli komut verin

### Oda Kontrolleri
- Cihaz kartlarına tıklayarak açın/kapatın
- Sıcaklık +/- butonları ile ayarlayın
- Durum göstergelerini takip edin
- Sesli komutlar dashboard'dan çalışır

## 🎤 Sesli Komutlar
Dashboard'daki mikrofon butonuna tıklayın ve şu komutları söyleyin:
- "Işığı aç" / "Işığı kapat"
- "Fanı aç" / "Fanı kapat" 
- "Klimayı aç" / "Klimayı kapat"
- "Kapıyı kilitle" / "Kapıyı aç"
- "Suyu aç" / "Suyu kapat"

## 📱 Responsive Design
- **Mobile**: 320px+ (tek sütun, dokunmatik optimizasyon)
- **Tablet**: 768px+ (iki sütun grid)
- **Desktop**: 1024px+ (tam grid layout)

## 🌙 Dark Mode
- Otomatik sistem tercihi algılama
- Manuel toggle ile değiştirme
- LocalStorage ile tercih saklama
- Smooth geçiş animasyonları

## 🔧 Geliştirme Notları
- Tüm cihaz durumları LocalStorage'da saklanır
- Chart.js CDN üzerinden yüklenir
- Web Speech API modern tarayıcılarda desteklenir
- CSS Custom Properties ile tema sistemi
- Modern ES6+ JavaScript sınıfları kullanılır

## 📸 Ekran Görüntüleri
Projeyi GitHub'a yüklerken şu ekran görüntülerini ekleyebilirsiniz:
- Ana sayfa (light/dark mode)
- Dashboard analytics
- Oda kontrol sayfası
- Mobil responsive görünüm

## 🚀 Deployment
Bu proje statik dosyalardan oluştuğu için herhangi bir hosting servisine yüklenebilir:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## 📄 Lisans
Bu repo eğitim/portföy amaçlıdır. İstediğiniz gibi çatallayıp geliştirebilirsiniz.

## 🤝 Katkıda Bulunma
1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun