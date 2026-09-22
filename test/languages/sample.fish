#!/usr/bin/env fish

set --local default_count 3
set --query argv[1]; and set --local name $argv[1]; or set --local name world

function greet --description 'Print a greeting' --argument-names target
    set --local message "hello, $target"
    printf '%s\n' $message
end

for index in (seq $default_count)
    if string match --quiet --regex '^[[:alnum:]_-]+$' $name
        greet $name
    else
        echo "invalid name: $name" >&2
        break
    end
end

switch "$APP_MODE"
    case production
        echo release
    case '*'
        echo preview
end
