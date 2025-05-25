const express = require("express"); 
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT_NUMBER = 8080;
const server = require("http").Server(app);
const {Translate} = require("@google-cloud/translate").v2;
const client = new Translate();
const fs = require("fs");
const textToSpeech = require("@google-cloud/text-to-speech");
const speechClient = new textToSpeech.TextToSpeechClient();

const operations = require("./backend/models/operations");

/**
 * To use the 'dist' folder as a source for the client UI
 */
app.use(express.static(path.join(__dirname, "/dist/ema-angular")));

server.listen(PORT_NUMBER, () => {
    console.log(`Listening on port ${PORT_NUMBER}`);
});

app.use(express.json());
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static(path.join(__dirname, "/backend/images")));

const url = "mongodb://127.0.0.1:27017/event-category"; 

/**
 * API router for Category and Event
 */
// const categoryApiRouter = require(".backend/routes/category-api");
const eventApiRouter = require("./backend/routes/event-api");
const categoryApiRouter = require("./backend/routes/category-api");
const operationRouter = require("./backend/routes/operations");


/**
 * Connect to database and setup Operation collection 
 * @param {string} url to connect to databse server
 * @returns {string} to indicate success of connection
 */
async function connect(url) {
    await mongoose.connect(url);
    // checks if Operation document already exists
    let operation = await operations.findOne();
    if (!operation){
        const newOperation = new operations();
        await newOperation.save();
    }
    return "Connected Successfully";  
}

/**
 * Return success message if databse is successfully connected, otherwise display error message
 */
connect(url)
    .then(console.log)
    .catch((err) => console.log(err));

// Category endpoints
app.use("/api/v1/category/32693974", categoryApiRouter);

// Event endpoints
app.use("", eventApiRouter);

// Operation endpoints
app.use("", operationRouter);

// Translation backend

let translation={
    text: '', 
    language: '',
    translatedText:''
};
let isTextUpdated = false;

let audioCounter;

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    audioCounter = 0;
    console.log("new connection made from client with ID=" + socket.id);
    if (isTextUpdated){
        socket.emit("onTranslate", translation);
    }
    
    socket.on("translate", (data) => {
        const text = data.text;
        const language = data.languageCode;
        client.translate(text, language).then(([result]) => {
            data.translatedText = result;
            translation = data;
            isTextUpdated = true;
            io.sockets.emit("onTranslate", translation);
        })
        .catch(err => {
            console.error("Error during translation:", err);
        });
    });

    socket.on("textToSpeech", (data) => {
        try {
            const text = data.text;
            // Construct the request
            const request = {
                input: { text: text },
                // Select the language and SSML Voice Gender (optional)
                voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
                // Select the type of audio encoding
                audioConfig: { audioEncoding: "MP3" },
            };
            // Performs the Text-to-Speech request
            speechClient.synthesizeSpeech(request, (err, response) => {
                if (err) {
                    console.error("ERROR:", err);
                    return;
                }
            
                // Write the binary audio content to a local file
                fs.writeFile("./backend/images/output" + audioCounter + ".mp3", response.audioContent, "binary", err => {
                    if (err) {
                        console.error("ERROR:", err);
                        return;
                    }
                    else {
                        console.log("Audio content written to file: output" + audioCounter + ".mp3");
                        io.sockets.emit("onTextToSpeech");
                        audioCounter ++;
                    }
                });
            });
        } catch (err) {
            console.log("ERROR:", err);
        }

    })

  });
