DOCKER_IMAGE:=express_test


# http://localhost:3000/
# http://localhost:3000/users/
run_local: routes/users.js
	DEBUG=myapp:* npm start
routes/users.js: package.json
	npx express-generator -f
	npm install
package.json:
	npm init -y
	npm install express --save

build: routes/users.js
	docker build --tag ${DOCKER_IMAGE} .
run:
	docker run --rm -it --publish 3000:3000 ${DOCKER_IMAGE}
run_shell:
	docker run --rm -it --publish 3000:3000 --entrypoint /bin/sh ${DOCKER_IMAGE}

clean:
	rm -rf \
		node_modules \
		package-lock.json \
		bin \
		public \
		routes \
		views \
		package.json \
		app.js 