    var qwerty=200;
    var opa=1;
    function startr(){
        navigator.getUserMedia = navigator.getUserMedia;
        if (navigator.getUserMedia) {
         navigator.getUserMedia({
             audio: true,
           },
           function(stream) {
             audioContext = new AudioContext();
             analyser = audioContext.createAnalyser();
             microphone = audioContext.createMediaStreamSource(stream);
             javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
   
             analyser.smoothingTimeConstant = 0.8;
             analyser.fftSize = 1024;
   
             microphone.connect(analyser);
             analyser.connect(javascriptNode);
             javascriptNode.connect(audioContext.destination);
      
             javascriptNode.onaudioprocess = function() {
                 var array = new Uint8Array(analyser.frequencyBinCount);
                 analyser.getByteFrequencyData(array);
                 var values = 0;
   
                 var length = array.length;
                 for (var i = 0; i < length; i++) {
                   values += (array[i]);
                 }
   
                 var average = values / length;

                var off= Math.round(average-30);
                if((qwerty-off/20)<=200 && qwerty-(off/20)>=20)
                {
                    qwerty-=off/20;
                }
                if(opa-(off/5000)>=0 && opa-(off/5000)<=1)
                {
                    opa-=off/5000;
                }
                document.getElementById('test').style.opacity=opa;
                document.getElementById('test').style.fontSize=qwerty+'px';
               }
           },
           function(err) {
             console.log("The following error occured: " + err.name)
           });
       } else {
         console.log("getUserMedia not supported");
        }
       }