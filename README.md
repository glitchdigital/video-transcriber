# Computer Assisted Video/Audio Transcription 

This is a prototype web based tool for computer assisted transcription.

You can simply drag and drop a video or audio file to transcribe it.

Words the computer isn't sure about are highlighted for review and you can click to edit the text - which will also jump the video to the appropriate point and start playing it so you can check the transcription and amend it if you need to.

The goal is to make transcribing easier and faster.

[Read more about this prototype](https://medium.com/glitch-digital/preview-of-a-video-transcription-tool-452e043daef5).

![screenshot](https://raw.githubusercontent.com/glitchdigital/video-transcriber/master/screenshot.png)

If you do a lot of transcribing and work in journalism or the media and would like an instance setup and configured for you to try out, get in touch with <enquiries@glitch.digital>.

# Before you begin
Think of this free tool as a **first draft** transcription, which a human will need to review and clean up, though it should reduce total time. Before installing the video/audio transcriber on a local Mac (which requires several steps), try the audio-only limited-length web interface for a preview of the transcript quality: https://speech-to-text-demo.mybluemix.net/?

This audio-only web interface only accepts files in WAV (or FLAC or OPUS) formats.
- To convert video file to WAV audio format:
	- QuickTime Player > File > Save > Audio Only > .m4a
	- iTunes > Preferences > General > Input settings (choose WAV), then upload and select the .m4a file in iTunes, right-click > create WAV version

If you like what you see, and want to upload longer-length video and audio files, proceed with installation instructions below.

Strengths of local install: 
- upload audio or video, no length limitations (except 1000 minutes free under IBM api free trial)
- in web preview, clickable timestamps to review portions, but no way to copy and paste timestamps

Limits:
- weak on-screen editing
- slightly higher transcription quality using the audio-only limited-length web upload interface: https://speech-to-text-demo.mybluemix.net/?

## Install and Run on local Mac

Overview: To run locally on a Mac, we need to install HomeBrew package manager, which we will use to install Node.js and ffmpeg and their dependencies, and the downloaded version of the video-transcriber tool. We will use the Terminal tool to install all of these parts, then run the tool inside a browser window.

Required: sign up for an IBM Bluemix account (30 day free trial), select the Speech to Text API, and obtain username and password (up to 1000 minutes free). See more details at
- https://console.ng.bluemix.net/catalog/services/speech-to-text
- or
- https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/gs-credentials.shtml

Credit: Thanks to @ilyankou for these detailed directions

1) Install [HomeBrew](http://brew.sh/): open the Terminal application, copy and paste the command below, and press RETURN:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2) Use Homebrew to install [ffmpeg](http://www.renevolution.com/how-to-install-ffmpeg-on-mac-os-x/): copy and paste the following text into Terminal and press RETURN:
```
brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype --with-frei0r --with-libass --with-libvo-aacenc --with-libvorbis --with-libvpx --with-opencore-amr --with-openjpeg --with-opus --with-rtmpdump --with-schroedinger --with-speex --with-theora --with-tools
```

3) Use Homebrew to install [Node.js](http://blog.teamtreehouse.com/install-node-js-npm-mac) in the terminal:
```
brew install node
```
4) Download the latest version of transcriber from: https://github.com/glitchdigital/video-transcriber. Click the "download Zip" button, save it to a folder on your local Mac (such as Downloads) and unzip it.

5) In Terminal, navigate to the folder with unpacked video-transcriber-master and install it. For example, if you unpacked it in Downloads folder, do:
```
cd Downloads/video-transcriber-master/
```
Then from that location, in the Terminal, install it:
```
npm install
```
6) In the terminal, use npm to start the video transcriber, using your Watson Speech to Text API username and password [using your own credentials](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/gs-credentials.shtml), which should look something like this:
```
WATSON_SPEECH_TO_TEXT_API_USERNAME="abc123-4567-8910" WATSON_SPEECH_TO_TEXT_API_PASSWORD="abcdefghij" npm start 
```
7) Keep the terminal window open while running the tool.

8) Open a browser to [http://localhost:3000](http://localhost:3000). Drag and drop audio or video to transcribe.


# About glitch.digital

This protoype software is provided free of charge under and released under the MIT Licence by glitch.digital.

glitch.digital provides data journalism, digital storytelling and interactive journalism services as well as tools and datasets for journalists, newsrooms and the wider media industry.

See http://glitch.digital for more details.
