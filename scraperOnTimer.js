const cheerio = require("cheerio");
const axios = require("axios");
const https = require("https");
const fs = require("fs");
const WordExtractor = require("word-extractor");
const extractor = new WordExtractor();
const schedule = require('node-schedule');
//Update Timetatable once a day at 20:00
schedule.scheduleJob('0 20 * * *', function(){
  scrape()
});
const {
  createClient
} = require('@supabase/supabase-js');
const serviceKey = ${{secrets.SERVICEKEY}};
const supabase = createClient(
  "https://tzayehrdabqfecpwtcpb.supabase.co",
  serviceKey
)

const letters = ["A", "B", "C", "D", "E", "F"];
let classNumber = 1;
let classLetter = 0;



async function scrape() {
  while (classNumber <= 12) {
    console.log("classNumber" + classNumber);
    console.log("classLetter" + classLetter);
    className = classNumber + letters[classLetter];
    console.log(className);

    try {
      // "https://tyhg.edu.ee/tunniplaan/index_"+className + ".htm"
      await axios.get("https://tyhg.edu.ee/tunniplaan/index_" + className + ".htm").then(function(response) {
        console.log(response.status);
        turnDataToJson(response, response.status);

      })

    } catch (res) {
      console.log("Error with axios");
      console.log(res.response.status);
      if (res.response.status == 404) {
        classNumber++;
        classLetter = 0;

      }
    }
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(3000);

  };
  console.log("Finished")
}

/* async function scrape() {

    try {
      // "https://tyhg.edu.ee/tunniplaan/index_"+className + ".htm"
      await axios.get("https://tyhg.edu.ee/tunniplaan/index_10A.htm")
        .then(function(response) {
        console.log(response.status);
        turnDataToJson(response, response.status);

      })

    } catch (res) {
      console.log("Error with axios");
      console.log(res);
    }

  
} */
// scrape();


function turnDataToJson(data, responseStatus) {
  if (responseStatus == 200) {

    classLetter++;
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data.data);

    const listItems = $("table tbody tr td  ");


    const timetableObject = {
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {}
    };
    // Use .each method to loop through the li we selected

    let isInRow = false;
    let isInLessonBox = false;
    let hasGonePastFriday = false;
    let pastcolspan6 = false

    let lessonCounter = 0;
    lessonOptionsCounter = 1;
    let rowCounter = 1;
    var lesson = {};
    listItems.each((x, el) => {
      
      let text = $(el).children("font").text().replace(/(\r\n|\n|\r)/gm, "");
      
      if (hasGonePastFriday) {
        
        if (isInRow && isInLessonBox && text) {

          if ($(el).children("font")) {

            if (lessonCounter % 3 == 0) {
              lessonOptionsCounter++;
            }
            if (lessonCounter == 0) {
              lessonOptionsCounter = 1;
            }

            if ((lessonCounter - 2) % 3 == 0) {
              lesson["classNum" + lessonOptionsCounter] = text;
            }
            if ((lessonCounter - 1) % 3 == 0) {
              lesson["teacher" + lessonOptionsCounter] = text;
            }
            if ((lessonCounter) % 3 == 0) {
              lesson["className" + lessonOptionsCounter] = text;
            }
            
              
            
          }
          lessonCounter++;
        }
        //check for empty fields
        if( $(el).attr('nowrap') === undefined){
         
          for (let day = 1; day < 6; day++) {
 
            if (timetableObject[day][rowCounter] === undefined &&
               lesson.colspan != "6") {
          
              lesson.className1 ="Vaba tund"
              lesson.teacher1 = ""
              lesson.classNum1 = ""
            timetableObject[day][rowCounter] = lesson; 
              if (lesson.rowspan == "4") {
                  timetableObject[day][rowCounter + 1] = lesson;
              }
              if (lesson.rowspan == "6") {
                timetableObject[day][rowCounter + 1] = lesson;
                timetableObject[day][rowCounter + 2] = lesson;
              }
              if (lesson.rowspan == "8") {
                timetableObject[day][rowCounter + 1] = lesson;
                timetableObject[day][rowCounter + 2] = lesson;
                timetableObject[day][rowCounter + 3] = lesson;
              }
              break
            }
             
          }
        
        
        }
        else if ($(el).attr('rowspan') && isInRow) {

          isInLessonBox = true;

          try {

            for (let day = 1; day < 6; day++) {

  
              if (timetableObject[day][rowCounter] === undefined && lesson.teacher1)               {
             //console.log(lesson)

                if(lesson.colspan == 6){
                  if(pastcolspan6 == false){
                    pastcolspan6 = true
                    timetableObject[day][rowCounter] = lesson;  
                  }else{
                    day = day-1
                    let lesson2 ={}
                    lesson2.className2 = timetableObject[day][rowCounter].className1;
                    lesson2.teacher2 = timetableObject[day][rowCounter].teacher1;
                    lesson2.classNum2 = timetableObject[day][rowCounter].classNum1;
                    let les = Object.assign(lesson,lesson2)
                    timetableObject[day][rowCounter] = les;  
                    pastcolspan6 = false;
                  }
                  
                }else{
                  timetableObject[day][rowCounter] = lesson;  
                }
                if (lesson.rowspan == "4") {
                  timetableObject[day][rowCounter + 1] = lesson;
                }
                if (lesson.rowspan == "6") {
                  timetableObject[day][rowCounter + 1] = lesson;
                  timetableObject[day][rowCounter + 2] = lesson;
                }
                if (lesson.rowspan == "8") {
                  timetableObject[day][rowCounter + 1] = lesson;
                  timetableObject[day][rowCounter + 2] = lesson;
                  timetableObject[day][rowCounter + 3] = lesson;
                }
                break
              }
               
            }

          } catch (e) {

          }
          dayCounter++;
          lessonCounter = 0
          lesson = {};

          lesson.rowspan = $(el).attr('rowspan')
          lesson.colspan = $(el).attr('colspan')

        }


        if (text.length == 1 && !isNaN(text)) {
          isInRow = true
          rowCounter = parseInt(text);

          dayCounter = 0;

        }
      }
      if (text == "Reede") {
        hasGonePastFriday = true;

      }


    });

    delete timetableObject[0];
    //console.log(timetableObject);
    insertToSupa(timetableObject, className);

    //return res.json(JSON.stringify(timetableObject));


  } else {
    console.log("elseblockResponse" + responseStatus);
    if (responseStatus == 404) {
      classNumber++;
      classLetter = 0;

    }
  }
}

async function insertToSupa(timetable, classname) {
  const currentTime = new Date().toISOString();

  const {data,error
  } = await supabase
    .from('tugTimetables')
    .update({
      classname: classname,
      timetable: timetable,
      lastUpdated: currentTime
    })
    .eq("classname", classname)

  if (error) console.log("updateError" + error);
  if (!data) {
    const {
      error: insertError
    } = await supabase
      .from('tugTimetables')
      .insert({
        classname: classname,
        timetable: timetable,
        lastUpdated: currentTime
      })
    if (insertError) console.log("insertError" + insertError);
  }

}
async function scrapeDocx() {
  /*  let text = await reader.getText("https://www.tyhg.edu.ee/wp/wp-content/uploads/2022/01/14-18.02-Koolilouna-menuu.docx"); */
  const url = "https://www.tyhg.edu.ee/wp/wp-content/uploads/2022/01/14-18.02-Koolilouna-menuu.docx"
  https.get(url, function(res) {

    const filestream = fs.createWriteStream("file.docx")

    filestream.on("finish", function() {
      filestream.close();
      const extracted = extractor.extract("/file.docx");
      extracted.then(function(doc) {
        console.log(doc.getBody());
      });
    })

  })

}
module.exports = {
  scrape,
  scrapeDocx
}
