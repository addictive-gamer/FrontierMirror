# 🎥 FrontierMirror

> **Monitorización UVC profesional con Game Bar, streaming Twitch y HUD — todo en un solo archivo HTML.**

FrontierMirror es una PWA de una sola página para monitorizar cámaras UVC (Elgato, Magewell, etc.) en el navegador, con overlay de Game Bar estilo Xbox, mezclador de audio, grabación local y streaming a Twitch. Funciona **100% local** — sin instalación, sin servidor.

---

## ✨ Características

| Categoría | Funciones |
|---|---|
| 🎥 **Video** | Selección UVC, resolución/FPS configurables, filtros CSS, espejo, zoom |
| 🎚 **Audio** | Dos micrófonos, reducción de ruido, mezclador con VU-meter |
| 🎮 **Game Bar** | Overlay sobre cámara en fullscreen, Mac Dock animations, popup mezclador con dimmer |
| 📡 **Streaming** | Twitch RTMP, chat overlay, alertas |
| 🔴 **Grabación** | WebM local, replay buffer 30s, screenshots PNG |
| 📊 **HUD** | FPS, jitter, resolución, uptime |
| 🎨 **Temas** | Violet, Teal, Rose, Amber, Midnight |
| 📱 **PWA** | Instalable, offline cache |

---

## 🚀 Uso

```bash
git clone https://github.com/tu-usuario/frontiermirror.git
cd frontiermirror
# Opción 1: abrir directo en Chrome/Edge
open index.html

# Opción 2: servidor local (para PWA)
python3 -m http.server 8080
# → http://localhost:8080
```

> ⚠️ **Chrome/Edge recomendado.** Safari no soporta las APIs necesarias.

---

## 🎮 Game Bar

Aparece **solo en fullscreen** como overlay sobre la cámara. **No se captura en el stream** (es local del navegador).

| Tecla | Acción |
|---|---|
| Mover mouse | Mostrar Game Bar |
| `F` | Toggle fullscreen |
| `R` | Toggle grabación |
| `S` | Screenshot |
| `M` | Silenciar mic |
| `B` | Guardar replay buffer |

Al abrir un popup (ej. 🎚 Mezclador) la pantalla se oscurece y el Game Bar no se oculta hasta cerrar el popup.

---

## 📁 Estructura

```
frontiermirror/
├── index.html       ← App completa (single-file PWA)
├── manifest.json    ← PWA manifest
├── icon-192.svg     ← Icono 192×192
├── icon-512.svg     ← Icono 512×512
└── README.md
```

---

## 🔧 Twitch

1. Tab **Twitch** → ingresa tu **Stream Key**
2. Conecta el chat con tu usuario
3. Clic **Ir en Vivo** o botón 📡 del Game Bar

---

## 💻 Compatibilidad

| Navegador | Soporte |
|---|---|
| Chrome 90+ | ✅ Completo |
| Edge 90+ | ✅ Completo |
| Firefox 95+ | ⚠️ Parcial |
| Safari | ❌ No soportado |

---

## 🛠 Stack

Vanilla HTML/CSS/JS · WebRTC · Web Audio API · MediaRecorder · Service Worker · CSS glassmorphism

---

MIT License · Hecho con ♥ para streamers
