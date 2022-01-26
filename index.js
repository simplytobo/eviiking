const express = require('express');
const app =  express();
const ekool = require('ekool');

const { EKool } = require("/home/runner/eviiking/node_modules/ekool/lib/index");

app.use(express.static('public'));


app.get('/', function(request, response) {
  response.sendFile('index.html');
});

app.listen();





console.log(process.env['email']);
console.log(process.env['password']);
// Wrap in async function
(async function () {

  try {
    
    // Create new EKool instance
    // It is possible to pass in authentication/refresh token if you have those
    const ekool = new EKool(
      await EKool.login(process.env['email'], process.env['password'])
    );
    // Retreive person data. This is necessary for running other commands
    await ekool.getPersonData();
    console.log(`Hello, ${ekool.personData.name1} ${ekool.personData.name2}!`);
  } catch (err) {
    console.error(err);
  }
})();


