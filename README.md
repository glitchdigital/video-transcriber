# Computer Assisted Video/Audio Transcription 

**This is a prototype web based tool for computer assisted transcription.**

Once setup, you can simply drag and drop a video or audio file to start transcribing it.

Words the computer isn't sure about are highlighted for review and you can click to edit the text - which will also jump the video to the appropriate point and start playing it so you can review the transcription and correct mistakes in the auto-transcription.

With current Speech to Text technology you won't get a perfect transcription - the quality will vary a lot depending on the invididual speaker and the qualty of the source (broadcast quality audio recorded in a studio works well, interviews in bustling noisy venue not so much). The goal is to make transcribing easier and faster - and a lot of that comes down to getting the editor interface right.

Note: This is a **prototype** intended to gague interest and provide a base for further developement. It works reliably but you'll need to do some work to set it up and the functionality of the text editing is somewhat limited. If there is sufficent interest a hosted version might be made available in future.

[Read more about this prototype on Medium](https://medium.com/glitch-digital/preview-of-a-video-transcription-tool-452e043daef5).

![screenshot](https://raw.githubusercontent.com/glitchdigital/video-transcriber/master/screenshot.png)

If you do a lot of transcribing and work in journalism or the media and would like an instance setup and configured for you to try out or if are interested in bespoke news or media software development, get in touch with <enquiries@glitch.digital>.

## Getting started

### Registering for an IBM Cloud Account

To setup this application you'll need to sign up for an [IBM Cloud](https://cloud.ibm.com) account, navigate to **Catalog** and select the **Speech to Text API** to create the service and obtain a credentials file for the API.

There are multiple pricing plans to choose from, and for the free **"Lite"** plan, the first 500 minutes of audio every month is free to transcribe.

### Installing dependancies

A UNIX based OS is required (e.g. Mac OS X, Linux, BSD, etc), you can't currently run the server on Microsoft Windows.

You will also need **Node.js** and **FFmpeg** installed. 

e.g. To install with the [HomeBrew package manager](http://brew.sh/) on Mac OS X:

```
brew install node ffmpeg
```

Install Node.js dependences in the usual way:

```
npm install
```

## Starting the server

When running `npm start` to run the application you'll also need to pass in path to the credentials file: `ibm-credentials.env` you got for the IBM Watson Speech to Text API by using the environment variable **IBM_CREDENTIALS_FILE** . 

Quoting from the [npm page for ibm-watson](https://www.npmjs.com/package/ibm-watson) : You can get this file by clicking the **Download** button for the credentials in the **Manage** tab of your service instance.

e.g.

```
IBM_CREDENTIALS_FILE="path/to/file/ibm-credentials.env" npm start 
```

Once the server is running you should be able to open a browser to [http://localhost:3000](http://localhost:3000) and upload a video or audio file to transcribe it.

# Credits

This protoype software is provided free of charge under and released under the MIT Licence by glitch.digital.

Thanks to [ilyankou](https://github.com/ilyankou) and [Jack Dougherty](https://github.com/jackdougherty) for improved installation instructions.

glitch.digital provides data journalism, digital storytelling and interactive journalism services as well as tools and datasets for journalists, newsrooms and the wider media industry.

See http://glitch.digital for more details.
