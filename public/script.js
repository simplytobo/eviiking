//const express = require('express');
/* const { EKool } = import("/home/runner/eviiking/node_modules/ekool/lib/index");
 console.log(Ekool); */


monday0 = document.getElementById("day-id0");
tuesday1 = document.getElementById("day-id1");
wednesday2 = document.getElementById("day-id2");
thursday3 = document.getElementById("day-id3");
friday4 = document.getElementById("day-id4");

email = document.getElementById("email");
password = document.getElementById("password");
logInEkool = document.getElementById("logInEkool");

const lessons = [

  {day: "monday",
   daysLessons:{
    lesson1:{
      lessonName:"Bioloogia",
      classroom: "105"},
    lesson2:{
      lessonName:"B-Võõrkeel",
      classroom: "const-B-class"},
    lesson3:{
      lessonName:"B-Võõrkeel",
      classroom: "const-B-class"},
    lesson4:{
      lessonName:"Ajalugu",
      classroom: "204"},
    lesson5:{
      lessonName:"Ajalugu",
      classroom: "204"},
    lesson6:{
      lessonName:"Matemaatika",
      classroom: "305"},
    lesson7:{
      lessonName:"Kirjandus",
      classroom: "102"},
    lesson8:{
      lessonName:"Kirjandus",
      classroom: "107"}
  }},
  {day: "tuesday",
   daysLessons:{
    lesson1:{
      lessonName:"Järeltööd",
      classroom: "409"},
    lesson2:{
      lessonName:"Kirjandus",
      classroom: "102"},
    lesson3:{
      lessonName:"Matemaatika",
      classroom: "305"},
    lesson4:{
      lessonName:"Digi/Loodus",
      classroom: "const-D-class"},
    lesson5:{
      lessonName:"Digi/Loodus",
      classroom: "const-D-class"},
    lesson6:{
      lessonName:"Ajalugu",
      classroom: "204"},
    lesson7:{
      lessonName:"Ajalugu",
      classroom: "204"},
  }},
  {day: "wednesday",
   daysLessons:{
    lesson1:{
      lessonName:"A-Võõrkeel",
      classroom: "211"},
    lesson2:{
      lessonName:"A-Võõrkeel",
      classroom: "211"},
    lesson3:{
      lessonName:"Matemaatika",
      classroom: "305"},
    lesson4:{
      lessonName:"Digi/Loodus",
      classroom: "const-CHOICE-class"},
    lesson5:{
      lessonName:"Digi/Loodus",
      classroom: "const-CHOICE-class"},
    lesson6:{
      lessonName:"Bioloogia",
      classroom: "103"},
    lesson7:{
      lessonName:"Ajalugu",
      classroom: "204"},
    lesson8:{
      lessonName:"Filosoofia",
      classroom: "102"}
  }},
  {day: "thursday",
   daysLessons:{
    lesson1:{
      lessonName:"Koor",
      classroom: "230"},
    lesson2:{
      lessonName:"Kirjandus",
      classroom: "102"},
    lesson3:{
      lessonName:"Matemaatika",
      classroom: "305"},
    lesson4:{
      lessonName:"Matemaatika",
      classroom: "305"},
    lesson5:{
      lessonName:"Bioloogia",
      classroom: "301"},
    lesson6:{
      lessonName:"Bioloogia",
      classroom: "301"},
    lesson7:{
      lessonName:"A-Võõrkeel",
      classroom: "211"},

  }},
  {day: "friday",
   daysLessons:{
    lesson1:{
      lessonName:"A-Võõrkeel",
      classroom: "const-A-class"},
    lesson2:{
      lessonName:"A-Võõrkeel",
      classroom: "const-A-class"},
    lesson3:{
      lessonName:"Matemaatika",
      classroom: "305"},
    lesson4:{
      lessonName:"Bioloogia",
      classroom: "105"},
    lesson5:{
      lessonName:"Kirjandus",
      classroom: "102"},
    lesson6:{
      lessonName:"C-Võõrkeel",
      classroom: "const-C-class"},
    lesson7:{
      lessonName:"C-Võõrkeel",
      classroom: "const-C-class"},

  }}
];

logInEkool.addEventListener('click', (e) => {
   console.log("btn clicked");
   logIn();
    
});



var rowsWrapper = document.getElementById("rowsWrapper");


const weekday = ["sunday", "monday","tuesday","wednesday","thursday","friday","saturday"];

var lessonduration = "00:00"

timeLoop();
setInterval(timeLoop, 5000);

function timeLoop(){ 


  const d = new Date();
  let day = weekday[d.getDay()];
  let dayNum = d.getDay();

  //console.log(day);

  var today = new Date();
 
  var currentTime =  today.getHours() + ":" + today.getMinutes();
  console.log("currentTime = "+currentTime);

  if(dayNum >= 1 && dayNum <= 5){
    if (currentTime >= "00:00"  && currentTime <= "08:00") {
      console.log("Järgmine tund 1 "); 
      dayLesson(dayNum, 1);
      lessonduration = "08:00-8:45"      
    }

    if (currentTime >= "8:01" && currentTime <= "8:55") {
      console.log("Järgmine tund 2");
      dayLesson(dayNum, 2);
      lessonduration = "08:55-9:40"
    } 

    if (currentTime >= "8:56" && currentTime <= "9:50") {
      console.log("Järgmine tund 3");
      dayLesson(dayNum, 3);
      lessonduration = "09:50-10:35"
    } 

    if (currentTime >= "09:51" && currentTime <= "10:45") {
      console.log("Järgmine tund 4");
      dayLesson(dayNum, 4);
      lessonduration = "10:45-11:30"
    } 

    if (currentTime >= "10:46" && currentTime <= "11:45") {

      console.log("Järgmine tund 5");
      dayLesson(dayNum, 5);
      lessonduration = "11:45-12:30"

    }

    if (currentTime >= "11:46" && currentTime <= "13:05") {

      console.log("Söögivahetund / Järgmine tund 6");
      dayLesson(dayNum, 6);
      lessonduration = "13:05-13:50"

    } 

    if (currentTime >= "13:06" && currentTime <= "14:00") {
      console.log("Järgmine tund 7");
        dayLesson(dayNum, 7);
        lessonduration = "14:00-14:45"
    } 

    if (currentTime >= "14:01" && currentTime <= "14:55") {
      console.log("Järgmine tund 8");
          dayLesson(dayNum, 8);
          lessonduration = "14:55-15:40"
    }

    if (currentTime >= "14:56" && currentTime <= "15:50") {
      console.log("Järgmine tund 9");
        dayLesson(dayNum, 9);
        lessonduration = "15:50-16:35"
    }

    if (currentTime >= "15:51" && currentTime <= "23:59") {
      console.log("Tee oma kodutöid");
      
      if(dayNum == 5){
        lessonduration = "8:00-8:55";
        dayLesson(1, 1);
      };
      
      lessonduration = "8:00-8:55";
      dayLesson(dayNum + 1, 1);

    }
  //"gugä, baithone, dot prodäk, dis vot we did iär, demprichör "
  }

  else if(dayNum == 6 || dayNum == 0){
    console.log("On Monday");
    dayLesson(1, 1);
  }
}

insertTimeTable();

function insertTimeTable(){
  
  //rowsWrapper.innerHTML = "";
  

  for(let i = 0; i < lessons.length; i++){
    var columnWrapper = document.createElement("div");
    columnWrapper.classList.add("column-Wrapper");
    columnWrapper.id = "day-id" + i;

    var columnHeader = document.createElement("div");
    columnHeader.classList.add("column-Item");
    columnHeader.classList.add("column-Header");
    columnHeader.innerHTML = lessons[i].day;
    columnWrapper.appendChild(columnHeader);

    rowsWrapper.appendChild
    
    for(let a = 1; a < Object.keys(lessons[i].daysLessons).length+1; a++){
       
      var columnItem = document.createElement("div");
      columnItem.classList.add("column-Item");

      //columnItem.innerHTML = ` ${lessons[i].daysLessons[""]}`;
      columnItem.innerHTML = lessons[i].daysLessons["lesson" + a]["lessonName"];
      columnWrapper.appendChild(columnItem);
     
    }
  	rowsWrapper.appendChild(columnWrapper);
   
  }

  var columnWrapper = document.createElement("div");
  
}

function dayLesson(dayNum, lessonNum){
  if(lessons[dayNum-1] != null){
    
    var lesson = lessons[dayNum -1].daysLessons["lesson"+ lessonNum]["lessonName"];
    console.log("Järgmine tund on " + lesson);

    var classroom = lessons[dayNum -1].daysLessons["lesson"+ lessonNum]["classroom"]

    document.getElementById("next-lesson-p-id").innerHTML = lesson;
    document.getElementById("next-lesson-duration-p-id").innerHTML = lessonduration;
    document.getElementById("next-lesson-classroom-p-id").innerHTML = classroom;
    

  }
  else{
    console.log(dayNum, lessonNum);
  }

}
console.log("dayNum");



async function logIn() {

  try {
    
    // Create new EKool instance
    // It is possible to pass in authentication/refresh token if you have those
    const ekool = new EKool(
      await EKool.login(email.value,password.value)
    );
    // Retreive person data. This is necessary for running other commands
    await ekool.getPersonData();
    console.log("Hello, ${ekool.personData.name1} ${ekool.personData.name2}!");
  } catch (err) {
    console.error(err);
  }
}


