# Computer Assisted Video/Audio Transcription 

This is a prototype web based tool for computer assisted transcription.

You can simply drag and drop a video or audio file to transcribe it.

Words the computer isn't sure about are highlighted for review and you can click to edit the text - which will also jump the video to the appropriate point and start playing it so you can check the transcription and amend it if you need to.

The goal is to make transcribing easier and faster.

[Read more about this prototype](https://medium.com/glitch-digital/preview-of-a-video-transcription-tool-452e043daef5).

![screenshot](https://raw.githubusercontent.com/glitchdigital/video-transcriber/master/screenshot.png)

If you do a lot of transcribing and work in journalism or the media and would like an instance setup and configured for you to try out, get in touch with <enquiries@glitch.digital>.

# Getting started (Expanded with thanks to Ilya)

Overview: To run locally on a Mac, we need to install HomeBrew package manager, which we will use to install Node.js and ffmpeg and their dependencies. 

Also, sign up for an IBM Bluemix account (30 day free trial), select the Speech to Text API, and obtain username and password.
- https://console.ng.bluemix.net/catalog/services/speech-to-text
- or
- https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/gs-credentials.shtml

## Installing (expanded)

1. Install HomeBrew: open the Terminal application, copy and paste the command below, and press RETURN:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. Install ffmpeg: copy and paste the following text into Terminal and press RETURN:
```
brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype --with-frei0r --with-libass --with-libvo-aacenc --with-libvorbis --with-libvpx --with-opencore-amr --with-openjpeg --with-opus --with-rtmpdump --with-schroedinger --with-speex --with-theora --with-tools
```

3. Install Node in the terminal:
```
brew install node
```

4. Download the latest version of transcriber from: https://github.com/glitchdigital/video-transcriber. Click the "download Zip" button, save it to a folder on your local Mac (such as Downloads) and unzip it.

5. In Terminal, navigate to the folder with unpacked video-transcriber-master. For example, if you unpacked it in Downloads folder, do:
```
cd Downloads/video-transcriber-master/
```

There, run:
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
