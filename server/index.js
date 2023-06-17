require('dotenv').config()
const fs = require("fs")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { Configuration, OpenAIApi } = require("openai");
const { writeDb, createDb, getCurrentDateTime, getSimilarTextFromDb, clearJsonFile, readDb } = require("./dbFunctions")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Express API 
const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(cors());


app.post("/api/oauth", async (req, res) => {
  const { data } = req.body
    try {
      if(req.method === "POST") {

        createDb(data.email);
        writeDb(data)
          return res.json({
            status: "Success"
          });
      }
      
      res.json({
        status: "success"
      })
    
    } catch (error) {
        console.log(error)
        res.json({
          error: error
        })
      }

});

app.post("/api/clearCache", async (req, res) => {
  const { data } = req.body;
  try {
    if (req.method === "POST" && data?.request === "delete") {
      const fileContent = fs.readFileSync(data?.file, "utf8");
      const parsedContent = JSON.parse(fileContent);
      
      if (Array.isArray(parsedContent) && parsedContent.length === 0) {
        res.json({
          status: "File already cleared",
        });
        return;
      }
      
      clearJsonFile(data?.file);
      res.json({
        status: "success",
      });
    }

  } catch (error) {
    console.log(error);
  }
});

app.post("/completions", async (req, res) => {
  const token = req?.headers?.authorization.split(' ')[1];
  const { temperature, ab } = req.body;

  if (!token || token !== process.env.API_KEY && !temperature || temperature !== 0.717828233 && !ab || ab !== 0.115) {
    throw Error;
  } else {
    try {
      const { lastThreeInteractions, inputToEmbedd, input, dbName} = req.body

      // embed the input
      const inputEmbeddingResponse = await openai.createEmbedding({       
        model: "text-embedding-ada-002",
        input: inputToEmbedd
      });
      const inputEmbedding = inputEmbeddingResponse.data.data[0].embedding;
      
      const context = getSimilarTextFromDb(inputEmbedding, `${dbName}.json`) // This function returns the four most similars interactions between the Student and the Teacher

      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[
          {role: "user", content: ` As a triage nurse, your task is to provide the patient with a differential diagnosis based on their symptoms. Please ask the patient open-ended questions related to their symptoms and use their responses to guide your questioning towards identifying potential causes. 

          Please ensure that you are aware of the user's response as you proceed through each question. Start by asking them about the nature and severity of their symptoms, including any associated symptoms they may be experiencing. Next, inquire about any relevant medical history or personal factors that could contribute to their condition.
          
          As you continue to gather information from the patient, consider asking about any triggers, worsening factors, or relieving factors for their symptoms. Additionally, find out if they have tried any treatments or interventions so far and whether these were effective or not.
          
          Finally, please encourage patients to share any concerns or questions they may have so that you can address them and provide additional information as needed.
          
          Remember that while providing a differential diagnosis is important, it is essential to consult with a healthcare professional for an accurate evaluation, diagnosis, and treatment plan.
          
          If appropriate based on the differential diagnosis reached during this process, feel free to suggest specific diagnostic tests or imaging studies that may be helpful in confirming a diagnosis. Additionally, if relevant musculoskeletal issues such as sprains are identified during the assessment process, suggesting physical therapy or chiropractic consultation services would also be appropriate..\n${context}\n${lastThreeInteractions}\nStudent:${input}\nTeacher:`}
        ],
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0.6,
        stop: [ 'Teacher: ', 'Student: ' ],
      });

      const outputToEmbedd = `\nTeacher: ${response.data.choices[0].message.content}`;
      
      // embed output
      const outputEmbeddingResponse = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: outputToEmbedd
      });
      const outputEmbedding = outputEmbeddingResponse.data.data[0].embedding;
      
      const objToDb = {
        input: {
          text: inputToEmbedd,
          embedding: inputEmbedding,
          from: "user",
        },
        output: {
          text: outputToEmbedd,
          embedding: outputEmbedding,
          from: "Ai Doctor"
        },
        time: getCurrentDateTime(),
      }
      
      writeDb(objToDb, `${dbName}.json`)
        
      res.json({
        completionText: response.data.choices[0].message.content,
        status: "success"
      })
    
    } catch (error) {
      console.log(error);
      writeDb(error, `error.json`)
        let e;
        if(error?.response?.status === 400) {
            e = 1;
        } else {
            e = 0;
        }
        res.json({
            error: e,
            errorMessage: error
        })
    }

  }
});



app.listen(port, () => {
    console.log(`app ready`)
});
