cnf ?= config.env
include $(cnf)
export $(shell sed 's/=.*//' $(cnf))

# .PHONY: docker docker-run docker-shell docker-test clean

all: docker docker-run docker-shell docker-test

docker:
		@echo "Build the container"
		docker build -t $(DOCKER_REPO):$(DOCKER_TAG)  --no-cache .

docker-run:
		@echo "Builds the docker container and runs the service"	
		docker build -t $(DOCKER_REPO):$(DOCKER_TAG) --no-cache .
		docker run -i -t --rm -p 80:80 --name=$(MYAPP) $(DOCKER_REPO):$(DOCKER_TAG)
		# docker run -p 80:80 --name=$(MYAPP) -d $(DOCKER_REPO):$(DOCKER_TAG)

docker-shell: 
		@echo "Builds the docker container and runs a shell inside it"
		docker build -t $(DOCKER_REPO):$(DOCKER_TAG) --no-cache .
		docker run -it $(DOCKER_REPO):$(DOCKER_TAG) sh
		# docker exec -it $(MYAPP) sh 

docker-test:
		@echo "Builds the container and runs your test suite inside it"		
		docker build -t $(DOCKER_REPO):$(DOCKER_TAG) --no-cache .
		docker run -it $(DOCKER_REPO):$(DOCKER_TAG) npm test 		

clean:
		@echo Remove containers
		docker rm -f $(MYAPP)
	