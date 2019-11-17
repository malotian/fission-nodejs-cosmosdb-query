#!/bin/bash
zip package.zip main.js package.json
pkgname=`fission pkg create --sourcearchive package.zip --env nodeenv | cut -f2 -d "'"`
echo $pkgname
fission env create --name nodeenv --image fission/node-env:latest --builder fission/node-builder:latest
fission fn delete --name fission-nodejs-cosmosdb-query
fission fn create --name fission-nodejs-cosmosdb-query --pkg $pkgname --entrypoint main
fission route create --url /fission-nodejs-cosmosdb-query --function fission-nodejs-cosmosdb-query --method POST --createingress

