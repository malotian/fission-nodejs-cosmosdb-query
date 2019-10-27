#!/bin/bash
zip package.zip main.js package.json
pkgname=`fission pkg create --sourcearchive package.zip --env nodeenv | cut -f2 -d "'"`
echo $pkgname
fission fn delete --name fission-nodejs-cosmosdb-query
fission fn create --name fission-nodejs-cosmosdb-query --pkg $pkgname --entrypoint main

