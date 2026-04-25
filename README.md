# 🔮 FrontierMirror

**Monitorización UVC profesional con streaming Twitch integrado**

Una aplicación web de una sola página (PWA) para visualizar, ajustar y transmitir la señal de tu capturadora de video directamente desde el navegador — sin instalar nada, sin servidores, sin depender de internet para funcionar.

[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-blueviolet?style=flat-square&logo=github)](https://addictive-gamer.github.io/FrontierMirror/)
[![PWA](https://img.shields.io/badge/PWA-Instalable-9146ff?style=flat-square)](https://addictive-gamer.github.io/FrontierMirror/)

---

## ✨ Características

| Categoría | Funciones |
|-----------|-----------|
| 📹 **Video** | Captura UVC (webcams, capturadoras HDMI), resoluciones hasta 4K@30, HUD con FPS/jitter/uptime en tiempo real |
| 🎨 **Imagen** | Brillo, contraste, saturación, tono, opacidad, espejo, inversión, escala de grises — en tiempo real con CSS filters |
| 🎙 **Audio** | Pipeline RAW para la capturadora · Micrófono con Noise Reduction (filtro de paso de banda 80–8000 Hz + supresión nativa) · Monitor de audio en vivo · Mezclador con volumen independiente |
| 📡 **Twitch** | Stream RTMPS directo al servidor de Twitch, segundo micrófono dedicado al stream, overlay de chat, TTS de mensajes, alertas de follows/subs/raids |
| 🌈 **Temas** | Violet · Teal · Rose · Amber · Midnight |
| 💾 **PWA** | Instalable como app de escritorio, funciona completamente sin internet tras la primera carga |

---

## 🚀 Uso rápido

### Opción A — Directo en el navegador
1. Abrí **[addictive-gamer.github.io/FrontierMirror](https://addictive-gamer.github.io/FrontierMirror/)** en Chrome.
2. Permití acceso a cámara y micrófono cuando el navegador lo pida.
3. Presioná **Scan** en el panel lateral → seleccioná tu capturadora → **Iniciar**.

### Opción B — Instalar como app de Chrome (PWA)
1. Abrí la página en **Google Chrome** o **Edge**.
2. En la barra de direcciones aparece un ícono de instalación (➕ o 🖥), o usá el menú **⋮ → Instalar FrontierMirror**.
3. La app queda en tu escritorio y funciona sin internet.

### Opción C — Archivo local
1. Descargá `index.html` + `manifest.json` + los íconos SVG en la misma carpeta.
2. Abrí `index.html` en Chrome (la instalación PWA no funciona en modo `file://`, pero la app sí).

---

## 📁 Estructura del repositorio

```
FrontierMirror/
├── index.html      ← App completa (HTML + CSS + JS en un solo archivo)
├── manifest.json   ← Manifest PWA para instalación en Chrome/Edge
├── icon-192.svg    ← Ícono PWA 192×192
├── icon-512.svg    ← Ícono PWA 512×512
└── README.md
```

---

## 🎛️ Panel de Audio

### 🎥 Capturadora — RAW
El audio de la capturadora va **sin ningún procesamiento**:
```
VideoElement → GainNode (solo volumen) → Speakers
```
Cero filtros, cero latencia extra. Lo que entra, sale igual.

### 🎙 Micrófono — con Noise Reduction opcional
Cuando el toggle de **Reducción de ruido** está activo:
- El navegador activa `noiseSuppression`, `echoCancellation` y `autoGainControl` al nivel del hardware/OS.
- En el Web Audio API se aplica un **filtro de paso de banda** (highpass 80 Hz + lowpass 8 kHz) para eliminar hum eléctrico y ruido de alta frecuencia.

El toggle de **Monitorizar audio** te permite escucharte en tiempo real, independientemente del modo NR.

---

## 🖥️ Compatibilidad

| Navegador | Video | Audio | PWA Install |
|-----------|-------|-------|-------------|
| Chrome 90+ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ❌ |
| Safari (iOS) | ⚠️ limitado | ⚠️ | ⚠️ |

> La captura UVC (`getUserMedia`) requiere HTTPS o `localhost`. GitHub Pages lo sirve por HTTPS automáticamente.

---

## 🔧 Desarrollado con

- **Web APIs nativas**: `getUserMedia`, `Web Audio API`, `MediaRecorder`, `Canvas API`
- **Sin dependencias externas** — todo vanilla HTML/CSS/JS
- **Service Worker** para cache offline con estrategia Network-first

---

## 📄 Licencia

MIT — libre para usar, modificar y distribuir.
