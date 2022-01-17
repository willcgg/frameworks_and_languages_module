# Getting Started with Freecycle app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## On linux systems

- Clone repository
- Open folder in terminal
- Cd into client folder and type 'npm run build', this will give you the build folder which contains all of the client code optimized and ready to deploy
- Once the build folder is present, cd into the server folder and type 'make build' then 'make run', you will be able to access the app on http:localhost:8000

Website should now be running on http://localhost:8000

## On Git pod

- Clone repo into new workspace using http:gitpod.io/#https://github.com/willcgg/frameworks_and_languages_module
- Edit requests in client side app.js folder on ALL fetch requests change all 'http:localhost:8000' to 'https://8000' followed by whatever the gitpod provided link is at the top of your browser e.g. 'https://8000-willcgg-frameworksandla-ik3tq7sj973.ws-eu27.gitpod.io' this is to ensure the client is requesting from the server correctly
- Cd into client folder and type 'npm run build', this will give you the build folder which contains all of the client code optimized and ready to deploy
- Once the build folder is present, cd into the server folder and type 'make build' then 'make run', you will be able to access the app on http:localhost:8000
## On windows systems

from https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows <br/>
'make' is a GNU command so the only way you can get it on Windows is installing a Windows version like the one provided by GNUWin32. Anyway, there are several options for getting that:

The most simple choice is using Chocolatey. First you need to install this package manager. Once installed you simlpy need to install make (you may need to run it in an elevated/admin command prompt) :

choco install make
Other recommended option is installing a Windows Subsystem for Linux (WSL/WSL2), so you'll have a Linux distribution of your choice embedded in Windows 10 where you'll be able to install make, gccand all the tools you need to build C programs.

- Once chocolatey has been installed via steps above, Clone repository
- Open folder in terminal
- Cd into client folder and type 'npm run build', this will give you the build folder which contains all of the client code optimized and ready to deploy
- Once the build folder is present, cd into the server folder and type 'make build' then 'make run', you will be able to access the app on http:localhost:8000

Website should now be running on http://localhost:8000

