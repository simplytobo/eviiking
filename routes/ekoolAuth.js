const express = require("express");
const router = express.Router();

//const ekool = require('ekool');


//const { EKool } = require("/home/runner/eviiking/node_modules/ekool/lib/index");
const { EKool } = require("../ekool/ekoolApi.js");
router.get("/",(req,res)=>{
  res.sendfile("./public/loginEkool.html")
})


router.post('/login', (req, res) =>{

  let {email, password, accessToken} = req.body;
  refreshToken = "";
 
  (async function () {

    try {
      
      // Create new EKool instance 13711921718
      // It is possible to pass in authentication/refresh token if you have those
      const ekool = new EKool();
      if(email && password) await ekool.login(email, password);
      if(accessToken) await ekool.addTokens(accessToken,refreshToken);
      // Retreive person data. This is necessary for running other commands
      await ekool.getPersonData();
      let feed = await ekool.getFeedForStudent();
      //let feed2 = await ekool.getFeedForStudent("s");
      //let data = await ekool.getFe
      console.log(`Hello, ${ekool.personData.name1} ${ekool.personData.name2}!`);
      return res.status(200).json({success: true, personData: ekool.personData, feed: feed, ekool: ekool});
    } catch (err) {
      console.log(err.response.data);
      //console.log(JSON.stringify(req.body));
    
      if(err.response.data) {res.status(200).json({success: false, error: err.response.data })}
      else{
        return res.status(200).json({success: false, error2: err })}
    }
    
    
  })();

})
router.post('/feed', (req, res) =>{

    let {accessToken} = req.body;
    refreshToken = "";
    (async function () {
      try {
        
        const ekool = new EKool();
        ekool.addTokens(accessToken,refreshToken);
        await ekool.getPersonData();
        let feed = await ekool.getFeedForStudent();
       
        console.log("ekoolFeed requested");
        return res.status(200).json({success: true, personData: ekool.personData, feed:feed, ekool: ekool});
        
      }catch(err) {
        //console.log(JSON.stringify(req.body));
      
        if(err.response.data) {
          res.status(200).json({success: false, error: err.response.data })}
        else{
          console.log(err);
          return res.status(200).json({success: false, error2: err })
        }
      }
  })();
    
  
})
router.post('/gradeData', (req, res) =>{

    let {accessToken} = req.body;
    refreshToken = "";
    (async function () {
      try {
        
        const ekool = new EKool();
        ekool.addTokens(accessToken,refreshToken);
        await ekool.getPersonData();
        let gradeData = await ekool.getDilBehGradesForTypeId(1);
        console.log("ekoolFeed requested");
        return res.status(200).json({success: true, gradeData:gradeData});
        
      }catch(err) {
        console.log(err.response.data);
        //console.log(JSON.stringify(req.body));
      
        if(err.response.data) {
          res.status(200).json({success: false, error: err.response.data })}
        else{
          return res.status(200).json({success: false, error2: err })
        }
      }
  })();
    
  
})
router.post('/studentTasks', (req, res) =>{

    let {accessToken, start, end} = req.body;
    refreshToken = "";
    (async function () {
      try {
        const ekool = new EKool();
        ekool.addTokens(accessToken,refreshToken);
        await ekool.getPersonData();
        let tasks = await ekool.getTasksForStudent(start,end);
        console.log("studentTasks requested");
        return res.status(200).json({success: true, tasks:tasks});
        
      }catch(err) {
        console.log(err.response.data);
        //console.log(JSON.stringify(req.body));
        if(err.response.data) {
          res.status(200).json({success: false, error: err.response.data })}
        else{
          return res.status(200).json({success: false, error2: err })
        }
      }
  })();
    
  
})

module.exports = router
