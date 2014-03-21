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

npm install

test_cli cortex || {
    echo "To install cortex, we need super"
    sudo npm install -g cortex
}

# sudo npm install grunt-cortex-neuron-build -g

# clear old config
# cortex config --unset-all

# set registry to cortex.dp
cortex config registry http://registry.cortex.dp/

cortex build

cortex server || echo "cortex server already started" &

node server/app &

open "http://localhost:9987/?page=order&usertoken=12312312312313"
# open "http://localhost:9987/?page=admin"
