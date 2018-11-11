REPORTER_IMAGE_NAME ?= "caloriosa/reporter-dev"
REPORTER_CONTAINER_NAME ?= "caloriosa-reporter"
API_URL ?= "http://localhost:8080"
USE_PROXY ?= "1"
COMMAND ?= yarn dev

prepare:
	docker build -t $(REPORTER_IMAGE_NAME) .
	docker run --rm -ti -v "$(shell pwd):/app" -u $(shell id -u):$(shell id -g) caloriosa/reporter-dev yarn
run:
	docker run --rm --name $(REPORTER_CONTAINER_NAME) -ti -v "$(shell pwd):/app" -u $(shell id -u):$(shell id -g) -p 3000:3000 --net=host -e MAP_API_KEY=$(MAP_API_KEY) -e API_URL=$(API_URL) -e USE_PROXY=$(USE_PROXY) $(ARGS) $(REPORTER_IMAGE_NAME) $(COMMAND)
shell:
	docker exec -ti $(REPORTER_CONTAINER_NAME) /bin/sh
clean:
	docker run --rm -ti -v "$(shell pwd):/app" -u $(shell id -u):$(shell id -g) $(REPORTER_IMAGE_NAME) rm -rf node_modules .nuxt
