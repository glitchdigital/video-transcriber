var SpeechToTextV1 = require('ibm-watson/speech-to-text/v1'),
// uncomment this to use IAM authentication
// { IamAuthenticator } = require('ibm-watson/auth'),
  exec = require("child_process").exec,
  execSync = require("child_process").execSync,
  fs = require('fs'),
  uuid = require('node-uuid'),
  crypto = require('crypto'),
  util = require("util"),
  express = require("express"),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  siofu = require("socketio-file-upload");

var pathToFfmpeg = process.env.FFMPEG || "ffmpeg";

// if (!process.env.WATSON_SPEECH_TO_TEXT_API_USERNAME || !process.env.WATSON_SPEECH_TO_TEXT_API_PASSWORD) {
//   console.error("WATSON_SPEECH_TO_TEXT_API_USERNAME and WATSON_SPEECH_TO_TEXT_API_PASSWORD environment variables must be set.");
//   process.exit();
// }

// remove this check if using IAM authentication
if (!process.env.IBM_CREDENTIALS_FILE) {
  console.error("IBM_CREDENTIALS_FILE environment variable must be set.");
  process.exit();
}

var speech_to_text = new SpeechToTextV1({
  "url": "https://stream.watsonplatform.net/speech-to-text/api",
  // uncomment below if using IAM authentication
  // "authenticator": new IamAuthenticator({ apikey: <IAM apikey> }),
  "version": 'v1'
});


/**
 * socket.io uploader
 */
app.use(siofu.router);

/**845
 * Configure Express
 */
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

/**
 * 500 Error Handler
 */
app.use(function (err, req, res, next) {
  // Handle 404s
  if (err.message
    && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
    return next();
  };
  console.error(err);
  if (err.stack) console.error(err.stack);
  res.status(500).json({ error: 500, message: err.message });
});

/**
 * 404 File Not Found Handler
 */
app.use(function (req, res, next) {
  res.status(404).json({ error: 400, message: "File not found", requestedUrl: req.originalUrl });
});

io.on("connection", function (socket) {
  var uploader = new siofu();
  uploader.dir = "/tmp";
  uploader.listen(socket);

  uploader.on("saved", function (event) {
    if (event.file.success) {
      // We rename the file and move it to the uploads direct with a name that
      // is both random (hard to guess) and safe (contains no escape chars).

      // Only allow file extentions with letters and numbers 
      var fileExtension = event.file.pathName.substring(event.file.pathName.lastIndexOf(".") + 1).replace(/[^a-zA-Z0-9]/g, '');

      // Assign new name, preserving existing file extension
      var newFileName = uuid.v4() + '.' + fileExtension;
      var pathToNewFile = __dirname + '/public/uploads/' + newFileName;

      fs.rename(event.file.pathName, pathToNewFile, function (err) {
        if (err) {
          socket.emit('file_error', { message: 'Error handling file after upload' });
          return console.error(err);
        }

        // Transcribe the file!
        transcribe(pathToNewFile, socket);

        // Fire back the path the *client* should use to play back the file
        socket.emit('file_ready', { pathToFile: '/uploads/' + newFileName });
      });
    }
  });
});

/**
 * Start listening
 */
app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

function transcribe(sourceFile, socket) {
  // First extract audio from the source file as WAV
  var audioFile = '/tmp/' + uuid.v4() + '.wav';
  exec(pathToFfmpeg + ' -i "' + sourceFile + '" "' + audioFile + '" -y', {
    timeout: 60000,
    encoding: "utf8",
    maxBuffer: 500 * 1024
  },
    function (err, stdout, stderr) {
      if (err) {
        socket.emit('file_error', { message: 'Error processing file after upload' });
        return console.error(err);
      }

      if (!fs.statSync(audioFile)) {
        socket.emit('file_error', { message: 'Error extracting audio' });
        return console.error("Could not open audio file at " + audioFile);
      }

      socket.emit('transcription_start', { transcription: '' });

      var recognizeStream = speech_to_text.recognizeUsingWebSocket({
        // 'objectMode' must be set to true for the other parameters to take
        // effect, otherwise, the websocket events will only return the 
        // final result as a string
        objectMode: true,
        contentType: 'audio/wav',
        interimResults: true,
        wordConfidence: true,
        maxAlternatives: 3,
        timestamps: true,
        inactivityTimeout: 600
      });

      fs.createReadStream(audioFile).pipe(recognizeStream);

      // recognizeStream.setEncoding('utf8');

      // Streams are processed in 'segments' (blocks of text at a time).
      // Translations of words in a segment are constantly evaluated while the
      // segment is being processed.
      // At the end of a segment a confidence value for each word is returned.
      var transcript = [];
      var segmentCount = 0;
      var wordCount = 0;

      ['data', 'error', 'close'].forEach(function (eventName) {
        recognizeStream.on(eventName, function (eventData) {

          if (eventName == "error")
            socket.emit('transcription_error', { error: eventData });

          // additional check so the below check does not get called when eventData
          // is null
          if (eventData) {
            if (eventData.results && eventData.results[0].alternatives) {
              var data = eventData.results[0].alternatives[0];

              // If there there is a 'timestamps' property then update the word list
              if (data.timestamps) {
                data.timestamps.forEach(function (word, index) {
                  transcript[wordCount + index] = {
                    word: word[0],
                    in: word[1],
                    out: word[2],
                    confidence: 0,
                    segment: segmentCount
                  };
                });
              }

              // If there is a 'word_confidence' property then it's summary at the  
              // end of a segment (and the final translation of this segment).
              if (data.word_confidence) {
                // Final translation of all words in the segment with confidence values
                data.word_confidence.forEach(function (word, index) {
                  transcript[wordCount + index].confidence = word[1];
                });

                // Bump the segment number
                segmentCount++;

                // wordCount is increased only at the end of every segement,
                // so that the next segment starts words from that point.
                wordCount += data.word_confidence.length;
              }

              socket.emit('transcription_progress', { transcription: transcript })
            }
          }
          if (eventName == "close") {
            socket.emit('transcription_complete', { transcription: transcript })
            // Remove temporary audio file
            if (fs.existsSync(audioFile)) {
              fs.unlinkSync(audioFile);
            }                        
          }
        });
      });

    });
};