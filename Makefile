cnf ?= config.env
include $(cnf)
export $(shell sed 's/=.*//' $(cnf))

# .PHONY: all say_hello generate clean

all: docker docker-run docker-shell docker-test

docker:
		@echo "Build the container"
		docker build -t $(DOCKER-TAG)  --no-cache .
		# docker build .		

docker-run:
		@echo "Builds the docker container and runs the service"	

docker-shell: 
		@echo "Builds the docker container and runs a shell inside it"
		# docker exec -it $(DOCKER-CONTAINER) bash 

docker-test:
		@echo "Builds the container and runs your test suite inside it"					
	