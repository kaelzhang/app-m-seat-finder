#!/bin/bash

test_cli(){
    type $1 &> /dev/null
    return $?
}

test_cli npm || {
    echo "node not found, please install node first, visit: http://nodejs.org"
    open "http://nodejs.org"
    exit 1
}

test_cli cortex || {
    sudo npm install -g cortex
}

# sudo npm install grunt-cortex-neuron-build -g

# clear old config
# cortex config --unset-all

# set registry to cortex.dp
cortex config registry http://registry.cortex.dp/

cortex build

cortex server &> /dev/null || echo "cortex server already started"
anywhere 9987 && echo "server started at localhost:9987"

open "http://localhost:9987/index.html"