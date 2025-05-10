#!/bin/bash
set -e

if [[ -z "$TELEGRAM_API_ID" || -z "$TELEGRAM_API_HASH" ]]; then
  echo "Error: TELEGRAM_API_ID y TELEGRAM_API_HASH deben estar definidos."
  exit 1
fi

exec /usr/local/bin/telegram-bot-api \
  --local \
  --api-id="$TELEGRAM_API_ID" \
  --api-hash="$TELEGRAM_API_HASH"