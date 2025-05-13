# 🤖 BOT BFA 

Este es un bot de Telegram desarrollado con [grammY](https://grammy.dev/), que corre contra una **instancia local de la Telegram Bot API** compilada manualmente desde [tdlib/telegram-bot-api](https://github.com/tdlib/telegram-bot-api).

## 🚀 Requisitos

- Docker
- Node.js (v18 o superior recomendado)
- Token válido de bot de Telegram
- Archivo `.env` con variables de entorno necesarias

## 📦 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/francomorontrabajo/Bot
cd Bot
```
### 2 Crear el bot desde BotFather

### 3. Crear el archivo .env dentro de /Bot
```bash 
NAME=BotName
USERNAME=BotUsername
LINK=https://t.me/BotUsername
API_TOKEN=123456:aBcDeF_gHiJkLmNoP-q
```

### 4. Obtener el API_ID y API_HASH desde https:my.telegram.org/auth

### 5. Ingresar las variables de entorno TELEGRAM_API_ID y TELEGRAM_API_HASH dentro de docker-compose.yml

### 6. Construir el contenedor con la imagen de la api local de telegram y el bot
```bash 
cd docker-compose up --build 
  -e TELEGRAM_API_ID=API_ID \
  -e TELEGRAM_API_HASH=API_HASH \
  local-telegram-server
```

## 📝 Notas
* El bot fue construido para conectarse exclusivamente a esa API local (no a la pública).