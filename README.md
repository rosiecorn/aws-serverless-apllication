# aws-serverless-apllication

Precondition:
   - nmp need to be installed
   - aws-sdk need to be installed
   - aws acount
   - IAM role with full permission on dynamodb
   - Javasript/NodeJs development enviroment: Visual Studio Code,... [Optional]
   
 Step 1. Install serverless
 
   cmd: npm install -g serverless
  
 Step 2: Create serverless project
 
   cmd: mkdir serverless-dynamo-basic-operations
   
 Step 3: Inital package.json
 
   cmd: npm init -y
   
 Step 4: Connect to aws and choose language/runtime for serverless application
 
   cmd: sls create -t aws-nodejs -n serverless-dynamo-basic-operations
   
 Step 5: Modify serverless.yml file
 
 Step 6: Implement Handler.js --> reference source code 
 
 Step 7: Implement databaseManager.js --> reference source code 
 
 Step 8: Install uuid library to generate unique id
 
   cmd: npm install uuid --save
   
 Step 9: Deploy serverless application to AWS
 
  cmd: sls deploy
  
   
