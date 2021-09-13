
DOCKER_COMPOSE:=USER=$(shell id -u):$(shell id -g) docker-compose --file docker-compose.yml
DOCKER_COMPOSE_EXAMPLE:=${DOCKER_COMPOSE} --file docker-compose.example.server.yml --file docker-compose.example.client.yml
DOCKER_COMPOSE_TEST:=${DOCKER_COMPOSE} --file docker-compose.test.yml
DOCKER_COMPOSE_EXAMPLE_TEST:=${DOCKER_COMPOSE_EXAMPLE} --file docker-compose.test.yml

.PHONY: help
.DEFAULT_GOAL:=help
help:	## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-8s\033[0m %s\n", $$1, $$2 } END{print ""}' $(MAKEFILE_LIST)

run:
	${DOCKER_COMPOSE} up
run_example:
	${DOCKER_COMPOSE_EXAMPLE} up
run_example_server:
	${DOCKER_COMPOSE} --file docker-compose.example.server.yml up --build server
		## run --rm server /bin/sh
run_example_client:
	${DOCKER_COMPOSE} --file docker-compose.example.client.yml up

test:
	${DOCKER_COMPOSE_TEST} up
	${DOCKER_COMPOSE_TEST} down
test_server:
	${DOCKER_COMPOSE_TEST} up server_test
	${DOCKER_COMPOSE_TEST} down
test_client:
	# Temp disbaled
	#${DOCKER_COMPOSE_TEST} up client_test
	#${DOCKER_COMPOSE_TEST} down

test_example:
	${DOCKER_COMPOSE_EXAMPLE_TEST} up
	${DOCKER_COMPOSE_EXAMPLE_TEST} down
test_example_server:
	${DOCKER_COMPOSE_EXAMPLE_TEST} up --build server_test
	${DOCKER_COMPOSE_EXAMPLE_TEST} down
test_example_client:
	# Temp disabled
	#${DOCKER_COMPOSE_EXAMPLE_TEST} up --build client_test
	#${DOCKER_COMPOSE_EXAMPLE_TEST} down

cypress:
	${DOCKER_COMPOSE_EXAMPLE_TEST} up --build client_test
