/* const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const router = express.Router();
const { createClient } = require('@supabase/supabase-js') ;
<<<<<<< HEAD
=======
const supabaseSecret =  process.env['serviceKey'];
>>>>>>> origin/main
const supabase = createClient(
  "https://tzayehrdabqfecpwtcpb.supabase.co",
  
)







router.get('/klass/:className', (req, res) => {
  async function scrape(){
    const {className} = req.params;
    className.toUpperCase();
    try {
      // Fetch HTML of the page we want to scrape
      const { data } = await axios.get("https://tyhg.edu.ee/tunniplaan/index_"+className.toUpperCase()+".htm");
      
      // Load HTML we fetched in the previous line
      const $ = cheerio.load(data);
      
      const listItems = $("table tbody tr td  ");
      // Stores data for all countries
      const timetable = [];
      const timetableObject = {0:{},1:{}, 2:{}, 3:{},4:{},5:{}};
      // Use .each method to loop through the li we selected

      let isInRow = false;
      let isInLessonBox = false;
      let hasGonePastFriday = false;

 
      let lessonCounter = 0;
      lessonOptionsCounter = 1;
      let rowCounter = 1;
      var lesson = {};
      listItems.each((x, el) => {

        let text = $(el).children("font").text().replace(/(\r\n|\n|\r)/gm, "");


        if(hasGonePastFriday){
          

          

          if(isInRow && isInLessonBox && text){
            
            if($(el).children("font")){


              
              if(lessonCounter % 3 == 0){
                lessonOptionsCounter++;
              }
              if(lessonCounter == 0){
                lessonOptionsCounter = 1;
              }
            

              if((lessonCounter-2) % 3 == 0){
                lesson["classNum" + lessonOptionsCounter] = text;
              }
              if((lessonCounter-1) % 3 == 0){
                lesson["teacher" + lessonOptionsCounter] = text;
              }
              if((lessonCounter) % 3 == 0){
                lesson["className" + lessonOptionsCounter] = text;
              }
                     
  

              
              
              
      
    
              
            }
            lessonCounter++;
       
            }


            if($(el).attr('rowspan') && isInRow){
              isInLessonBox = true;

              try{
                
                for(let day = 0; day < 6; day++){
                  
                  
                  if(timetableObject[day][rowCounter] === undefined){

                    timetableObject[day][rowCounter] = lesson;
                    if(lesson.rowspan == "4"){
                      timetableObject[day][rowCounter + 1] = lesson;
                    }
                    if(lesson.rowspan == "6"){
                      timetableObject[day][rowCounter + 2] = lesson;
                    }

                    break
                  }
                }
               
              }catch(e){
              
              }
              dayCounter++;
              lessonCounter = 0
              lesson = {};

              lesson.rowspan = $(el).attr('rowspan')
            
            }


            if(text.length == 1 && !isNaN(text)){
              isInRow = true
              rowCounter = parseInt(text);
       
              dayCounter = 0;
       
            }
          }
          if(text == "Reede"){
            hasGonePastFriday = true; 
          } 
        });

        delete timetableObject[0];
        console.log(timetableObject);
        insertToSupa(timetableObject, className);
     
        //return res.json(JSON.stringify(timetableObject));
        return res.end("Api not avaliable!");

    

    } catch (err) {
      console.error(err);
      return res.end("error");
    }
    
  }

  scrape();
});

async function insertToSupa(timetable, classname){
  const { data, error } = await supabase
  .from('tugTimetables')
  .update({ classname: classname, timetable: timetable})
  .eq("classname", classname )

  if (error) console.log("error" + error);
  if (!data){
     const {error: insertError } = await supabase
    .from('tugTimetables')
    .insert({ classname: classname, timetable: timetable})
    if (insertError) console.log("insertError" + insertError);
  }

}



module.exports = router; */

