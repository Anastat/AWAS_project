# AWAS Project: vulnerable shop web app
By Giacomo Sartori, An Nguyen, Anastasiia Tikhonova

## Install it localy using Docker ( Linux, MacOS, Windows )
First of all we assume that you have docker and docker-compose installed.
If it's not your case, follow installation guide on https://docs.docker.com/compose/install/

Now clone or download this repo and run in the cloned folder
````
docker-compose up
````

You can now browse on localhost:3000 to see the application running.
Happy hacking!

To stop, open another terminal and use `docker-compose down` command.

Notes:
* first time `docker-compose up` may take some time because it has to download both node and postgres images
* for more info on what docker is and how it works refer to https://www.docker.com/what-docker

## Use it online
We provide an online hosted version of the app. See the related report to get the URL address.

## Using the app
Once you have start docker image, you can browse on http://localhost:3000 and you can reach the application.

You can always reset the database using the address http://localhost:3000/utility/reset
