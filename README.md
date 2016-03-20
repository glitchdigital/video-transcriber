# Computer Assisted Video/Audio Transcription 

This is a prototype web based tool for computer assisted transcription.

You can simply drag and drop a video or audio file to transcribe it.

Words the computer isn't sure about are highlighted for review and you can click to edit the text - which will also jump the video to the appropriate point and start playing it so you can check the transcription and amend it if you need to.

The goal is to make transcribing video and audio files easier and faster.

![screenshot](https://raw.githubusercontent.com/glitchdigital/video-transcriber/master/screenshot.png)

If you do a lot of transcribing and work in journalism or the media and would like an instance setup and configured for you to try out, get in touch with <enquiries@glitch.digital>.

# Getting started

You will need node.js and ffmpeg installed to run this software. 

You will also need to sign up for an IBM Bluemix account and get an Username and Password for the Speech To Text API:

https://console.ng.bluemix.net/catalog/services/speech-to-text

## Installing

To install required libraries, use npm install:

    npm install

## Running

You will need to specify your USERNAME and PASSWORD for the Watson Speech To Text API as environment variables when calling `npm start`.

e.g. That should look something like this:

    WATSON_SPEECH_TO_TEXT_API_USERNAME="19c7e913-ea42-3244-bcc2-7a118ee6f41c1" WATSON_SPEECH_TO_TEXT_API_PASSWORD="Kfm82jS2n51V" npm start

You will also need to have `ffmpeg` installed. If it is already in your path you don't need to do anything, but if if you need to specify it's location you can specify where to find it with the `FFMEPG` environment variable.

    FFMPEG="/usr/local/bin/ffmpeg"

# About glitch.digital

This protoype software is provided free of charge under and released under the MIT Licence by glitch.digital.

glitch.digital provides data journalism, digital storytelling and interactive journalism services as well as tools and datasets for journalists, newsrooms and the wider media industry.

See http://glitch.digital for more details.
