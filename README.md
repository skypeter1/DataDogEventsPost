# DataDog Events Post Service

This is a service that takes Loggly's API Alert Endpoints
and post it as events to DataDog.

The project is built using Nodejs, Express and Mocha.

It has a simple endpoint http://localhost/datadog that receives the JSON objects sent by the Loggly's alert and parse it to send an event to DataDog


## Requirements

You may need to have make installed 

``` Bash
sudo apt-get install build-essential
```

Configure an alert endpoint and send the data using POST

https://www.loggly.com/docs/alert-endpoints/

**Optional**

You need to provide your own credentials in order to make it work

https://docs.datadoghq.com/account_management/api-app-keys/



## Instructions for Docker

First clone this repo.

At the root directory there is a Makefile

`make docker` - builds the docker container

`make docker-run` - builds the docker container and runs the service

`make docker-shell` - builds the docker container and runs a shell inside it

`make docker-test` - builds the container and runs your test suite inside it


## Local

To start the server go to the root directory

Install node modules.

``` Bash
npm install
```

Start the server in http://localhost

``` Bash
npm start
```
To run the tests

``` Bash
npm test
```

## Known Issues

For Nodejs if you are not a root user probably it wont give you accesss to port 80 if you are trying to run this locally *(outside the declared container)*

``` Bash
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep `readlink -f \`which node\``
```