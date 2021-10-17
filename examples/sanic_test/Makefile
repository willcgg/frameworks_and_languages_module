DOCKER_IMAGE:=sanic_test

instsall_local:
	pip install falcon gunicorn
run_local:
	gunicorn sample:api


build:
	docker build --tag ${DOCKER_IMAGE} .
run:
	docker run --rm -it --publish 8000:8000 ${DOCKER_IMAGE}
