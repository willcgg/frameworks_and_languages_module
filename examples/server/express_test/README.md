Basic Express.js Demo App
=========================

* `npm init`
* `npm install express --save`
* https://expressjs.com/en/starter/hello-world.html
    * ```javascript
        const express = require('express')
        const app = express()
        const port = 3000

        app.get('/', (req, res) => {
        res.send('Hello World!')
        })

        app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
        })
        ```
        * save as `app.js`
    * `node app.js`
* `npx express-generator`
* `DEBUG=myapp:* npm start`
* http://localhost:3000/
* http://localhost:3000/users/
* See .dockerignore .gitignore - never commit these for npm projects
* See Dockerfile, Makefile
    * make build
    * make run
* Attempt a JSON response
    * https://expressjs.com/en/4x/api.html#res.json
