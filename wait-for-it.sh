#!/usr/bin/env bash
# wait-for-it.sh - wait for a host:port to be available
# Accepts either "host port" or "host:port" as the first argument(s).

set -e

usage() {
  echo "Usage: $0 host:port|host port [timeout] -- command [args...]"
  exit 2
}

if [ "$#" -lt 1 ]; then
  usage
fi

# Parse host and port
if [[ "$1" == *":"* ]]; then
  HOST_PORT="$1"
  shift
else
  if [ -z "$2" ]; then
    usage
  fi
  HOST_PORT="$1:$2"
  shift 2
fi

TIMEOUT=30
if [[ "$1" =~ ^[0-9]+$ ]]; then
  TIMEOUT="$1"
  shift
fi

# If remaining args contain --, drop it and treat what follows as the command
if [ "$1" = "--" ]; then
  shift
fi

CMD=("$@")

HOST=${HOST_PORT%%:*}
PORT=${HOST_PORT##*:}

echo "Waiting for $HOST:$PORT (timeout=${TIMEOUT}s) ..."
start_ts=$(date +%s)
while :; do
  if nc -z "$HOST" "$PORT" 2>/dev/null; then
    echo "$HOST:$PORT is available"
    break
  fi
  sleep 1
  now_ts=$(date +%s)
  elapsed=$((now_ts - start_ts))
  if [ "$elapsed" -ge "$TIMEOUT" ]; then
    echo "Timeout waiting for $HOST:$PORT"
    exit 1
  fi
done

if [ ${#CMD[@]} -gt 0 ]; then
  echo "Running: ${CMD[*]}"
  exec "${CMD[@]}"
fi
