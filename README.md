# create nodejs environment
	fission env create --name nodeenv --image fission/node-env:latest --builder fission/node-builder:latest
# create zip file package
	zip pacakge.zip main.js package.json
# create a package with the zip file
	fission pkg create --sourcearchive pacakge.zip --env nodeenv
# create a function
	fission fn create --name hello --pkg [pkgname] --entrypoint "hello"
# test the function
	fission fn test --name hello
