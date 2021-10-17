DOCKER_IMAGE:=falcon_test


instsall_local:
	pip install falcon gunicorn
run_local:
	gunicorn sample:api

build:
	docker build --tag ${DOCKER_IMAGE} .
run:
	docker run --rm -it --publish 8000:8000 ${DOCKER_IMAGE}
run_shell:
	docker run --rm -it --publish 8000:8000 --entrypoint /bin/sh ${DOCKER_IMAGE}
