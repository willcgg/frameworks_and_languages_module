DOCKER_IMAGE:=server_example

build:
	DOCKER_BUILDKIT=0 docker build --tag ${DOCKER_IMAGE} .

run:
	docker run -it --rm ${DOCKER_IMAGE}

run_local:
	python3 main.py

test_local:
	pytest
