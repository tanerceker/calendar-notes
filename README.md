![Preview App](/public/preview.jpg)

# Takvim Not Uygulaması

Bu proje, etkinlik ve not takibi yapmak için kullanılan bir takvim not uygulamasıdır.

## Proje Hakkında

Günlük yaşamınızı organize etmenize yardımcı olmak için tasarlanmış bir web uygulamasıdır. Kullanıcılar notlar ekleyebilir, düzenleyebilir, silebilir ve takvim üzerinde görüntüleyebilir. Çoklu dil desteği (Türkçe ve İngilizce) ve karanlık/aydınlık tema seçenekleri sunar.

## Özellikler

- **Takvim Görünümleri**: Gün, Hafta ve Ay görünümleri arasında geçiş yapabilme
- **Not Yönetimi**: Notlar ekleme, düzenleme ve silme
- **Zaman Seçici**: Kullanıcı dostu saat ve dakika seçme arayüzü
- **Etiketler ve Renk Kodlama**: Notları kategorilere ayırma ve renklerle işaretleme
- **Çoklu Dil Desteği**: Türkçe ve İngilizce dil seçenekleri
- **Tema Değiştirme**: Karanlık ve aydınlık tema seçenekleri
- **Duyarlı Tasarım**: Mobil ve masaüstü cihazlara uyumlu arayüz

## Teknolojiler

Projede kullanılan başlıca teknolojiler:

- **React**: UI bileşenleri için JavaScript kütüphanesi
- **TypeScript**: Tür güvenliği için JavaScript üzerine kurulu bir dil
- **Vite**: Hızlı geliştirme ve derleme için modern bir araç
- **Tailwind CSS**: Hızlı UI geliştirme için kullanılan CSS framework'ü
- **shadcn/ui**: Modern ve özelleştirilebilir UI bileşenlerini kullanan kütüphane
- **React Query**: Sunucu durumu yönetimi için kullanılan kütüphane
- **React Router**: Sayfa yönlendirmesi için kullanılan kütüphane
- **date-fns**: Tarih işlemleri için kullanılan yardımcı kütüphane

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### Ön Koşullar

- Node.js (en güncel sürüm)
- npm veya yarn paket yöneticisi

### Adımlar

1. Repo'yu klonlayın:

```sh
git clone <repo-url>
cd calendar-notes
```

2. Bağımlılıkları yükleyin:

```sh
npm install
# veya
yarn install
```

3. Geliştirme sunucusunu başlatın:

```sh
npm run dev
# veya
yarn dev
```

4. Tarayıcınızda açın:

```
http://localhost:8080
```

## Proje Yapısı

```
src/
  ├── components/         # UI bileşenleri
  │   ├── layout/         # Sayfa düzeni bileşenleri
  │   └── ui/             # Yeniden kullanılabilir UI bileşenleri
  ├── context/            # React context tanımlamaları
  ├── hooks/              # Özel React hooks'ları
  ├── lib/                # Yardımcı fonksiyonlar ve araçlar
  ├── pages/              # Sayfa bileşenleri
  └── types/              # TypeScript tip tanımlamaları
```

