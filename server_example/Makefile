DOCKER_IMAGE:=server_example

run_local:
	python3 main.py

test_local:
	pytest

build:
	# This runs all the tests on build as part of a multistage build layer
	DOCKER_BUILDKIT=0 docker build --tag ${DOCKER_IMAGE} .

run:
	docker run -it --rm ${DOCKER_IMAGE}
