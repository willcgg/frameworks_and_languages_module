# https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/

run:
	# DISPLAY=$IP:0
	docker run -it --rm \
		-e DISPLAY \
		-v ${PWD}:/e2e \
		-w /e2e \
		--entrypoint cypress \
		cypress/included:8.3.0 \
			open \
			--project .
