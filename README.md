
# fission environment setup
use docker image mentioned in [https://github.com/malotian/fission-workflows](https://github.com/malotian/fission-workflows) and follwo instructions (as needed)

#  setup ingress for https support 
	
	curl -L https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml -o mandatory.yaml
	curl -L https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/service-l7.yaml -o service-l7.yaml
	curl -L https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/patch-configmap-l7.yaml -o patch-configmap-l7.yaml

Change line of the file `service-l7.yaml` replacing the dummy id with a valid one `"arn:aws:acm:us-west-2:XXXXXXXX:certificate/XXXXXX-XXXXXXX-XXXXXXX-XXXXXXXX"`

	kubectl apply -f mandatory.yaml
	kubectl apply -f service-l7.yaml
	kubectl apply -f patch-configmap-l7.yaml

# create nodejs environment
        fission env create --name nodeenv --image fission/node-env:latest --builder fission/node-builder:latest
# create zip file package
        zip package.zip main.js package.json
# create a package with the zip file
        fission pkg create --sourcearchive package.zip --env nodeenv
# create a function
        fission fn create --name fission-nodejs-cosmosdb-query --pkg [pkgname] --entrypoint main
# test the function
        fission fn test --name fission-nodejs-cosmosdb-query

# create a function
        fission fn create --name fission-nodejs-cosmosdb-query --pkg [pkgname] --entrypoint main
# test the function
        fission fn test --name fission-nodejs-cosmosdb-query

# create a route(ingress)
        fission route create --url /fission-nodejs-cosmosdb-query --function fission-nodejs-cosmosdb-query --method POST --createingress

# test a route(ingress)
	curl -vsk POST \  
	'[https://fission.lingkcore.com/fission-nodejs-cosmosdb-query?databaseId=Families&containerId=Families](https://slack-redir.net/link?url=https%3A%2F%2Ffission.lingkcore.com%2Ffission-nodejs-cosmosdb-query%3FdatabaseId%3DFamilies%26containerId%3DFamilies)' \  
	-H 'Content-Type: application/json' \  
	-H 'cosmosdb-endpoint: https://somethinghere-cosmosdb-account.documents.azure.com:443' \  
	-H 'cosmosdb-primary-key: somethinghere==' \  
	-d '{  
	"query": "SELECT * FROM c where c.id=@fid",  
	"parameters": [  
	    {  
	         "name": "@fid",  
	         "value": "AndersenFamily"  
	    }  
	]  
	}'
