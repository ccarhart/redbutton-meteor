if (Meteor.isClient) {
  
    var deviceready = false;
    var myMedia = null;
    var currentAction = 0;
    var mediaFileName = "mediaFile.wav";
    var action = null;

    Meteor.startup(function() {
    
    document.getElementById('microphoneID').addEventListener("click", startRecording, false);
    document.getElementById('playID').addEventListener("click", playSoundFile, false);
    document.getElementById('pauseID').addEventListener("click", pauseSoundFile, false);
    document.getElementById('stopID').addEventListener("click", stopSoundFile, false);
    

    function myLog(message){
        console.log(message);
        //alert(message);
    }


    function onStatusChange(newStatus) {
        myLog("onStatusChange - Action is: "+ currentAction + "  newStatus is: " + newStatus);
        if (currentAction == 'Record') {
            switch(newStatus) {
                case 2: // running
                    document.getElementById('microphoneID').src = "/images/micrecording.png";
                    document.getElementById('microphoneID').removeEventListener("click", startRecording, false);
                    document.getElementById('microphoneID').addEventListener("click", stopRecording, false);
                    document.getElementById('clickInstructionsID').innerHTML = 'Click microphone to stop recording';
                    document.getElementById('playDiv').className = "hide";
                    break;
                case 4: // stopped
                    document.getElementById('microphoneID').src = "/images/micready.png";
                    document.getElementById('microphoneID').removeEventListener("click", stopRecording, false);
                    document.getElementById('microphoneID').addEventListener("click", startRecording, false);
                    document.getElementById('clickInstructionsID').innerHTML = 'Click microphone to re-record </br> or Play - Pause - Stop' ;
                    document.getElementById('playDiv').className = "";
                    break;
            }
        }else if (currentAction == 'Play') {
            switch(newStatus) {
                

            }
        }
        
    } 


    // Record audio    
    //     
    function startRecording() {
        myLog("in startRecording...");
        if (myMedia)  {  // If we already have a Media object, release it to re-record, and jump to success
            myMedia.release();
            myLog("startRecording - old myMedia released");
        } 

        currentAction = 'Record';
        myMedia = new Media(mediaFileName, onSuccess, onError, onStatusChange);
        myLog("have myMedia and about to myMedia.startRecord");
        myMedia.startRecord();

    }

    // Stop recording
    function stopRecording() {
        myLog("stop Recording - ");
        currentAction = 'Record';
        if (myMedia)  {
            myMedia.stopRecord();
        }
    }

    // Play recording
    //  
    function playSoundFile() {
        myLog("playSoundFile");
        currentAction = 'Play';
        if (myMedia)  {
            myMedia.play();
        }
    }

    // Pause recording
    //  
    function pauseSoundFile() {
        currentAction = 'Play';
        myLog("pauseSoundFile - ");
        if (myMedia)  {
            myMedia.pause();
        }

    }

    // Stop recording
    //  
    function stopSoundFile() {
        currentAction = 'Play';
        myLog("stopSoundFile - ");
        if (myMedia)  {
            myMedia.stop();
        }

    }


    function onError(error) {
       myLog('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');

    }

    function onSuccess() {
        myLog('in onSuccess - does nothing')
    }
  })
    

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
