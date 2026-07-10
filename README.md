# 🎥 FrontierMirror

> **Monitorización UVC profesional con Game Bar, streaming Twitch, overlays y HUD — todo en un solo archivo HTML.**

FrontierMirror es una PWA de una sola página para monitorizar cámaras UVC / capturadoras (Elgato, Magewell, etc.) en el navegador, con overlay de Game Bar estilo Xbox, mezclador de audio, grabación local, overlays Built-In/Streamlabs editables y streaming a Twitch con autenticación persistente. Funciona **100% local** — sin instalación, sin servidor, sin build step.

---

## ✨ Características (v2.2.0)

| Categoría | Funciones |
|---|---|
| 🎥 **Video** | **Select Capture Card (obligatoria)**, resolución/FPS configurables, filtros CSS, espejo, zoom |
| 📷 **Cámara opcional** | **Select Camera (opcional)** como facecam PiP con **Green Screen (chroma key en tiempo real)** |
| 🎚 **Audio** | **Select Microphone** (noise suppression ON por defecto), **Select Capture Card Audio Output** (dedicado, noise suppression OFF por defecto, latencia mínima), segundo micrófono, mezclador con VU-meter |
| 🖼 **Overlays** | Tab dedicada con **Overlay Edit Mode** (arrastrar/redimensionar), overlays **Built-In** (chat/alertas generados por la webpage) y **Streamlabs** (iframe sandboxed, bloqueado solo a `streamlabs.com`) |
| 🎮 **Game Bar** | Overlay sobre cámara en fullscreen, Mac Dock animations, popup mezclador con dimmer |
| 📡 **Streaming** | Captura local + chat/alertas de Twitch, **OAuth con cookies** (autenticación una sola vez), chat con envío de mensajes |
| 🔴 **Grabación** | WebM local (códec auto-detectado), replay buffer 30s, screenshots PNG |
| 📊 **HUD** | FPS, jitter, resolución, uptime |
| 🎨 **Temas** | Violet, Teal, Rose, Amber, Midnight, **Cyber** (neón con shimmer) |
| 💾 **Perfiles** | Multi-perfil JSON (crear/renombrar/borrar), **exportar e importar** — nunca guardan tokens ni cookies |
| 📱 **Mobile** | Bloqueado a propósito: muestra "Only works on desktop" |
| 📱 **PWA** | Instalable, offline cache |

---

## 🚀 Uso

```bash
git clone https://github.com/addictive-gamer/FrontierMirror.git
cd FrontierMirror
# Opción 1: abrir directo en Chrome/Edge
open index.html

# Opción 2: servidor local (para PWA)
python3 -m http.server 8080
# → http://localhost:8080
```

Este repo se despliega automáticamente a **GitHub Pages** vía `.github/workflows/static.yml` en cada push a `main`. También podés subir `index.html` tal cual a Cloudflare Pages/Workers si preferís — es un solo archivo estático, sin build step.

> ⚠️ **Chrome/Edge recomendado.** Safari no soporta las APIs necesarias. Solo funciona en escritorio (mobile muestra aviso).

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

## 🖼 Overlays

1. Tab **Overlays** → activá **Overlay Edit Mode** para poder arrastrar/redimensionar cualquier bloque.
2. **Built-In**: chat y alertas generados por la propia webpage (sin dependencias externas).
3. **Streamlabs**: pegá la URL del widget (`https://streamlabs.com/widgets/...`) — solo se aceptan URLs de ese dominio, se cargan en un `<iframe>` con `sandbox`.
4. Desactivá el modo edición para volver a transmisión normal (los overlays quedan click-through).

---

## 📷 Dispositivos

- **Select Capture Card** — obligatoria. Sin esto, "Iniciar" queda bloqueado.
- **Select Camera** — opcional, para facecam con Green Screen.
- **Select Microphone** — micrófono principal, noise suppression activada por defecto.
- **Select Capture Card Audio Output** — audio embebido de la capturadora (HDMI), independiente del micrófono, con latencia mínima y noise suppression desactivada por defecto.

---

## 📁 Estructura

```
FrontierMirror/
├── index.html       ← App completa (single-file PWA)
├── manifest.json    ← PWA manifest
├── icon-192.svg     ← Icono 192×192
├── icon-512.svg     ← Icono 512×512
└── README.md
```

---

## 🔧 Twitch

1. Tab **Twitch** → sección **Cuenta de Twitch**: pegá tu Client ID (app registrada en [dev.twitch.tv](https://dev.twitch.tv)) y tocá **Conectar con Twitch**.
2. Autenticate una sola vez — la sesión queda guardada en una cookie local (no se exporta en los perfiles JSON).
3. Ingresá tu **Stream Key**, tu canal se autocompleta con tu usuario de Twitch.
4. Clic **Ir en Vivo** o botón 📡 del Game Bar. El chat conectado permite leer y **enviar mensajes** (Enter para mandar).

---

## 💾 Perfiles

Guardá distintas configuraciones (temas, overlays, dispositivos, preferencias) como perfiles JSON separados desde el tab **Config**. Podés exportarlos/importarlos como archivo. **Nunca** incluyen tokens de Twitch, stream keys ni cookies — esos viven aparte, solo en el navegador.

---

## 💻 Compatibilidad

| Navegador | Soporte |
|---|---|
| Chrome 90+ | ✅ Completo |
| Edge 90+ | ✅ Completo |
| Firefox 95+ | ⚠️ Parcial |
| Safari | ❌ No soportado |
| Mobile (cualquier navegador) | 🚫 Bloqueado a propósito |

---

## 🛠 Stack

Vanilla HTML/CSS/JS · WebRTC · Web Audio API (chroma key vía Canvas) · MediaRecorder · Twitch OAuth (Implicit Grant) · Service Worker · CSS glassmorphism

---

MIT License · Hecho con ♥ para streamers

