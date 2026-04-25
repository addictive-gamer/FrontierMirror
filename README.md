# 🔮 FrontierMirror

> **Monitorización UVC profesional** · Streaming Twitch/YouTube/Kick · Grabación local · PWA instalable · Funciona offline

[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-blueviolet?style=flat-square&logo=github)](https://addictive-gamer.github.io/FrontierMirror/)
[![PWA](https://img.shields.io/badge/PWA-Instalable%20en%20Chrome-9146ff?style=flat-square)](https://addictive-gamer.github.io/FrontierMirror/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## ✨ Características

### 📹 Video
| Feature | Detalle |
|---|---|
| Captura UVC | Webcams, capturadoras HDMI, cualquier dispositivo `getUserMedia` |
| Resoluciones | 480p · 720p · 1080p · 4K @ hasta 60fps |
| Auto-detección | Selecciona automáticamente la primera cámara / capturadora UVC disponible |
| HUD en tiempo real | FPS · Jitter · Resolución · Uptime · Frames caídos · Bitrate estimado |
| HUD extendido | Dropped frames · Bitrate por segundo |
| Filtros CSS en vivo | Brillo · Contraste · Saturación · Tono · Opacidad · Espejo · Invertir · Escala de grises |
| Screenshot | Captura PNG descargada instantáneamente |

### 🎛️ Audio
| Feature | Detalle |
|---|---|
| **Capturadora RAW** | Audio directo: `VideoElement → GainNode → Speakers`, cero procesamiento |
| **Micrófono + NR** | Filtro de paso de banda 80–8 000 Hz + `noiseSuppression` / `echoCancellation` |
| **Monitor de audio** | Escucha en tiempo real con fade suave al activar/desactivar |
| **Segundo micrófono** | Micrófono dedicado al stream con NR independiente y monitor propio |
| **Mezclador OBS-style** | Barras VU segmentadas con peak-hold · Control 0–200% · Mute individual |
| **Game Bar mixer** | Mezclador flotante en fullscreen sin salir del stream |

### 📡 Streaming
| Feature | Detalle |
|---|---|
| Plataformas | Twitch · YouTube Live · Kick · RTMP personalizado |
| Bitrate de salida | 1–20 Mbps configurable |
| Resolución de salida | 480p / 720p / 1080p / igual que la fuente |
| FPS de salida | 24 / 30 / 60 fps |
| Retardo del stream | 0–60 segundos configurable |
| Escenas | Capturadora · Cámara + Mic · Capture + Chat · BRB / Pausa |
| Overlays | Chat de Twitch · HUD sobre stream · Marca de agua |
| Chat IRC | Conexión directa a Twitch IRC via WebSocket |
| TTS | Text-to-speech de mensajes de chat |
| Alertas | Follows · Subs · Raids con simulador integrado |
| Reconexión automática | Reinicia el stream si se corta la conexión |
| Grabación simultánea | Graba localmente mientras transmites |
| Modo bajo bitrate | Optimizado para conexiones lentas |

### 🎬 Grabación
| Feature | Detalle |
|---|---|
| Formatos | WebM/VP9 · WebM/H.264 · WebM/VP8 |
| Calidad de video | 1–50 Mbps configurable |
| Calidad de audio | 128 / 192 / 320 kbps |
| Replay Buffer | Buffer circular silencioso, guardá los últimos 10–120s con `B` |
| Audio seleccionable | Incluir/excluir micrófono y/o capturadora en la grabación |
| Estado en tiempo real | Duración · Tamaño estimado · Chunks grabados |

### 🖥️ Interfaz
| Feature | Detalle |
|---|---|
| **Game Bar (fullscreen)** | Barra flotante estilo Xbox — aparece al mover el mouse, se oculta a los 3s |
| **Auto-hide en fullscreen** | La sidebar desaparece al entrar en fullscreen y vuelve al salir |
| **Sidebar auto-hide** | La UI se oculta tras 3s de inactividad (configurable) |
| Temas | Violet · Teal · Rose · Amber · Midnight |
| Deep Dark | Fondo extra oscuro para OLED |
| Blur reducido | Para GPUs débiles |
| PWA instalable | App de escritorio desde Chrome/Edge |
| Offline | Funciona sin internet tras la primera carga |

### 📊 Telemetría
| Métrica | Fuente |
|---|---|
| FPS en tiempo real | `requestAnimationFrame` timestamps |
| Jitter de frame | Desviación estándar entre intervalos |
| FPS mín/máx | Acumulado durante la sesión |
| Frames caídos | `video.getVideoPlaybackQuality()` |
| Bitrate estimado | fps × resolución × factor de compresión |
| Memoria JS | `performance.memory` (Chrome) |
| Latencia de audio | `AudioContext.baseLatency + outputLatency` |
| Sample rate / estado | `AudioContext.sampleRate` |
| Almacenamiento | `navigator.storage.estimate()` |
| Uptime | Cronómetro desde el inicio del stream |

---

## 🚀 Instalación como PWA en Chrome

1. Abrí **[addictive-gamer.github.io/FrontierMirror](https://addictive-gamer.github.io/FrontierMirror/)** en **Chrome** o **Edge**
2. Esperá 5–10s a que el Service Worker se registre
3. Aparece el ícono **➕** en la barra de direcciones — o usá **⋮ → "Instalar FrontierMirror"**
4. La app queda en tu escritorio y funciona **sin internet**

> ⚠️ `manifest.json` y los SVGs de íconos deben estar en la raíz del repo junto a `index.html` para que Chrome habilite la instalación.

---

## 📁 Archivos del repositorio

```
FrontierMirror/
├── index.html      ← App completa (HTML + CSS + JS, un solo archivo)
├── manifest.json   ← Manifest PWA (requerido para instalación)
├── icon-192.svg    ← Ícono PWA 192×192
├── icon-512.svg    ← Ícono PWA 512×512 (maskable)
└── README.md
```

---

## ⌨️ Atajos de teclado

| Tecla | Acción |
|---|---|
| `R` | Iniciar / Parar grabación |
| `S` | Screenshot |
| `B` | Guardar últimos N segundos (replay buffer) |
| `F` | Pantalla completa |
| `M` | Silenciar / activar micrófono |
| `Tab` | Mostrar / ocultar sidebar |

---

## 🎮 Game Bar (Pantalla Completa)

Al entrar en fullscreen con `F`:
- La **sidebar desaparece** para no obstruir el video
- Al **mover el mouse** aparece el **Game Bar** en la parte inferior
- Tras **3s sin mover el mouse**, el Game Bar y el cursor se ocultan
- Contiene: cámara · grabación · replay · screenshot · mezclador · mute · stream · telemetría
- El **mezclador flotante** muestra barras VU con peak-hold y control de volumen en tiempo real

---

## 🎛️ Pipelines de audio

**Capturadora — RAW:**
```
VideoElement → GainNode (0–200%) → AnalyserNode (VU) → Speakers
```

**Micrófono — con Noise Reduction:**
```
getUserMedia (noiseSuppression ON)
  → HighPass 80Hz → LowPass 8kHz
  → AnalyserNode (VU) → GainNode → MonitorNode → Speakers
```

**Micrófono — sin Noise Reduction:**
```
getUserMedia (señal cruda)
  → AnalyserNode (VU) → GainNode → MonitorNode → Speakers
```

---

## 🌐 Compatibilidad

| Navegador | Video | Audio NR | PWA Install |
|---|---|---|---|
| Chrome 90+ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ |
| Firefox | ✅ | ⚠️ parcial | ❌ |
| Safari (iOS) | ⚠️ | ⚠️ | ⚠️ |

---

## 🔧 Stack técnico

- **Cero dependencias externas** — HTML + CSS + JS vanilla puro
- **Web APIs**: `getUserMedia` · `Web Audio API` · `MediaRecorder` · `Canvas 2D` · `WebSocket` · `Service Worker`
- **Service Worker**: Network-first con fallback a cache offline
- **Manifest PWA**: íconos SVG, display standalone, orientación landscape

---

## 📝 Nota sobre RTMP

Los navegadores no soportan RTMP nativo. El modo "En Vivo" usa `MediaRecorder` para capturar localmente. Para transmitir a Twitch/YouTube necesitás un proxy como OBS Studio (capturando la ventana del navegador), nginx-rtmp, o mediasoup.

---

*Hecho con 💜 para streamers que quieren control total sin software de escritorio.*
