
run:
	docker-compose \
		--file docker-compose.yml \
		up

run_example:
	docker-compose \
		--file docker-compose.yml \
		--file docker-compose.example.yml \
		up --build

test:
	docker-compose \
		--file docker-compose.yml \
		--file docker-compose.test.yml \
		up

test_example:
	docker-compose \
		--file docker-compose.yml \
		--file docker-compose.example.yml \
		--file docker-compose.test.yml \
		up
