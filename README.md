# create nodejs environment
        fission env create --name nodeenv --image fission/node-env:latest --builder fission/node-builder:latest
# create zip file package
        zip package.zip main.js package.json
# create a package with the zip file
        fission pkg create --sourcearchive package.zip --env nodeenv
# create a function
        fission fn create --name fission-nodejs-cosmosdb-query--pkg [pkgname] --entrypoint main
# test the function
        fission fn test --name fission-nodejs-cosmosdb-query

