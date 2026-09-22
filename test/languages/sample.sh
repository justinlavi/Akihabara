#!/usr/bin/env bash
set -euo pipefail

readonly DEFAULT_COUNT=3
name=${1:-world}

greet() {
    local message="hello, ${1}"
    printf '%s\n' "$message"
}

for ((index = 0; index < DEFAULT_COUNT; index++)); do
    if [[ $name =~ ^[[:alnum:]_-]+$ ]]; then
        greet "$name"
    else
        printf 'invalid name: %q\n' "$name" >&2
        break
    fi
done

case ${APP_MODE:-development} in
    production) echo "release" ;;
    *) echo "preview" ;;
esac
