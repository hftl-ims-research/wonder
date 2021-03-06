// wonder_conversation.js 
//----------------------- 


// ------------------------------- 
// Resource.js 
// ------------------------------- 

/**
 * @fileOverview WebRTC Framework to facilitate the development of Applications that seamless interoperate between each other
 * @author Paulo Chainho <paulo-g-chainho@ptinovacao.pt>
 * @author Steffen Druesedow <Steffen.Druesedow@telekom.de>
 * @author Miguel Seijo Simo <Miguel.Seijo@telekom.de>
 * @author Vasco Amaral <vasco-m-amaral@ptinovacao.pt>
 * @author Kay Haensge <Kay.Haensge@telekom.de>
 * @author Luis Oliveira <luis-f-oliveira@ptinovacao.pt>
 */


/**
 * @class
 * The Resource class represents the digital assets that are shared among participants in the conversation.
 * 
 * @param {ResourceConstraint} resourceConstraint - Constraints of the Resource. Object with the following syntax {type: ResourceType, constraints: codec or MediaStreamConstraints}
 * @param {Codec} [codec] - For data types only, Codec used.
 *
 */

function Resource( resourceConstraint, codec ) {

  this.constraint = resourceConstraint;      
  this.connections = new Array();
  this.owner;
    
  if(codec) 
  {
      this.codec = codec;
      this.constraint.constraints=codec;
  }
}


/**
 * Resource class
 */
/*function Resource() {
	this.id;                        // We add a resource ID to identify it.
	this.type;                      // type of resource.
    this.stream;                    // StreamTrack (http://dev.w3.org/2011/webrtc/editor/getusermedia.html#mediastreamtrack) for this communication.
    this.data;                      // dataChannel for communication.
    this.evtHandler;                // eventHandler.
    this.status;                    // status this resource.
    this.owner;                     // owner this resource/stream.
    //this.codecs;                  <- still no discuss
    var thisresource = this;
    // Question: how to handle the creation of PeerConnections and add local MediaStreams? do we need them stored at each Resource having Tracks from this stream??
    // TODO: add stream attribute and rename "stream" to "streamTrack"
 	
    /**
     * private method setStream
     *
     * @param stream..
     */
 /*   setStream = function(stream){
        thisresource.stream = stream;
    }

    /**
     * private method setData
     *
     * @param data
     */
/*    setData = function(data){
      thisresource.data = data;
    };

    /**
     * private method setStatus
     *
     * @param status ... sets the status attribute for a resource
     */
/*    this.setStatus = function(status){
      // TODO: ensure the transition in the state machine is allowed otherwise callback error
      switch(thisresource.status){
          case ResourceStatus.RECORDING:
              if(status != ResourceStatus.NOT_SHARED || status != ResourceStatus.ENDED || status != ResourceStatus.PLAYING){
                  console.log("error setStatus" + status);
                  break;
              }
              thisresource.status = status;
              break;
          case ResourceStatus.NOT_SHARED:
              if(status != ResourceStatus.SHARED || status != ResourceStatus.PLAYING || status != ResourceStatus.ENDED){
                  console.log("error setStatus" + status);
                  break;
              }
              thisresource.status = status;
              break;
          case ResourceStatus.PAUSED:
              if(status != ResourceStatus.STOPPED){
                  console.log("error setStatus" + status);
                  break;
              }
              thisresource.status = status
              break
          case ResourceStatus.PLAYING:
              if(status != ResourceStatus.PAUSED || status != ResourceStatus.STOPPED || status != ResourceStatus.SHARED || status != ResourceStatus.NOT_SHARED){
                  console.log("error setStatus" + status);
                  break;
              }
              thisresource.status = status;
              break;
          case ResourceStatus.SHARED:
              if(status != ResourceStatus.NOT_SHARED || status != ResourceStatus.RECORDING || status != ResourceStatus.PLAYING || status != ResourceStatus.ENDED){
                  console.log("error setStatus" + status);
                  break;
              }
              thisresource.status = status;
              break;
          case ResourceStatus.STOPPED:
              console.log("transition is not allowed");
              break;
          case ResourceStatus.ENDED:
              if(status != ResourceStatus.PLAYING){
                  console.log("error setStatus" + status);
                  break;
              }
              thisresource.status = status;
              break;
          case ResourceStatus.LIVE:
              if(status != ResourceStatus.SHARED || status != ResourceStatus.NOT_SHARED){
                  console.log("error setStatus" + status);
                  break;
              }
              thisresource.status = status;
              break;
          case ResourceStatus.NEW:
              if(status != ResourceStatus.LIVE){
                  console.log("error setStatus" + status);
                  break;
              }
              thisresource.status = status;
              break;
          default:
            thisresource.status = status;
            break;
      }
       
    }
};

/**
 * createStream
 * 
 * @param owner  : Participant ... owner of the stream
 * @param stream : MediaStream ... the stream
 * @param type   : ResourceType... type of resource
 */
/*Resource.prototype.createStream = function(owner,stream,type) {
    if(! stream || ! owner) return ;
    else{
        this.owner=owner;
        this.stream=stream;
        this.type = type;
        this.id = guid();
        this.setStatus(ResourceStatus.NEW);
    }

    // TODO  Where/how to assign the type,data,connection,evtHandler and status?

};


/**
 * getStatus
 * 
 * @returns ResourceStatus ... returns the resource status
 */
/*Resource.prototype.getStatus = function(){
    return this.status;
};


/**
 * destroy
 * 
 */
/*Resource.prototype.stop = function(){
// @pchainho TODO: only applicable for local Resources. 

    this.stream = null;
    //this.setStatus(ResourceStatus.ENDED); // @pchainho I guess this should only be done when "ended" event is fired. To study how to address Data Channel resources
	
	// TODO: depending on the type of the Resource it may imply the invocation of browser APIs eg for MediaStreamTracks call its operation stop()
};

/**
 * share
 * 
 * @param shared : Boolean ... establishes if the resource is shared or not
 * 
 */
/*Resource.prototype.share = function(shared){
// @pchainho TODO: only applicable for local Resources. For MediaStreamTracks call its operation stop()

    if(shared) this.setStatus( ResourceStatus.SHARED );
    else this.setStatus( ResourceStatus.NOT_SHARED);
	// TODO: depending on the type of the Resource it may imply the invocation of browser APIs
};

/**
 * record
 * 
 */
/*Resource.prototype.record = function(){
    // TODO Complete the function
};

/**
 * play
 * 
 * @param timing : Number ... the time to start playing
 * 
 */
/*Resource.prototype.play = function(timing){
    // this.status = ResourceStatus.PLAYING;
    // TODO What to do with the timing ? How to get it playing ?
};

/**
 * pause
 * 
 */
/*Resource.prototype.pause = function(){
    // this.status = ResourceStatus.PAUSED;
};

/**
 * create
 * 
 * @param owner : Participant ... specifies the owner of the resource
 * @param type  : ResourceType ... specifies the resource type
 * 
 */
/*Resource.prototype.create = function(owner, type){
    if(! owner || ! type)return ;
    else{
        this.owner=owner;
        this.type=type;
        this.id=guid();                  // unique uid for resource
        this.setStatus(ResourceStatus.NEW);
    }
    // TODO  Where/how to assign the stream,data,connection,evtHandler and status?
};  

/**
 * createData
 * 
 * @param owner : Participant ... specifies the owner of the resource
 * @param type  : ResourceType ... specifies the resource type
 * @param data  : DataChannel ... specifies the data channel
 * 
 */
/*Resource.prototype.createData = function(owner, type, data){

    if(! owner || ! type || ! data ) return ;
    else {
        this.owner=owner;
        this.type=type;
        this.data=data;
    }
    // TODO  Where/how to assign the stream,connection,evtHandler and status?
};

/**
 * EventHandler
 *
 * @param that
 */
/*stream.started = function(self){

}

/**
 * EventHandler
 *
 * @param that
 *//*
function mute(self){

}

/**
 * EventHandler
 *
 * @param that
 *//*
function unmute(self){

}

/**
 * EventHandler
 *
 * @param that
 *//*
function overconstrained(self){

}

/**
 * EventHandler
 *
 * @param that
 */
 /*
function ended(that){

}*/
// ------------------------------- 
// Participant.js 
// ------------------------------- 

/**
 * @fileOverview WebRTC Framework to facilitate the development of Applications that seamless interoperate between each other
 * @author Paulo Chainho <paulo-g-chainho@ptinovacao.pt>
 * @author Steffen Druesedow <Steffen.Druesedow@telekom.de>
 * @author Miguel Seijo Simo <Miguel.Seijo@telekom.de>
 * @author Vasco Amaral <vasco-m-amaral@ptinovacao.pt>
 * @author Kay Haensge <Kay.Haensge@telekom.de>
 * @author Luis Oliveira <luis-f-oliveira@ptinovacao.pt>
 */

/**
 * @class
 * The Participant class handles all operations needed to manage the participation of an 
 * Identity (User) in a conversation including the WebRTC PeerConnection functionalities. 
 * The Local Participant is associated with the Identity that is using the Browser while the 
 * Remote Participant is associated to remote Identities (users) involved in the conversation.
 * 
 */
function Participant() {
    
    this.identity = "";                         // Identity of the participant
    this.RTCPeerConnection = "";                // RTCPeerConnection for that participant
    this.status = "";                           // Status
    this.me = "";                               // Participant representing the user of the browser. 
    this.rtcEvtHandler = "";                    // Event handler for WebRTC events
    this.msgHandler = "";                       // Event handler for signalling events
    this.contextId = "";                        // Context ID of the conversation the participant belongs to.
    this.resources = new Array();               // Resources of the participant
    this.hosting;                               // Hosting participant of the conversation this participant belongs to.
    this.connectedIdentities = new Array();     // For multiparty, array of Identities of the connected peers.
    this.dataBroker;                            // DataBroker for WebRTC DataChannel.
    this.streamGetMedia = null;
    this.hasDataChannel = false;
    this.updatesIdentities = new Array();       // For update, multy peers.
    /*********************************
     *        PRIVATE METHODS        *
     * TODO: try to have them accessible from other Wonder classes eg Conversation and MessagingSub but not visible from the App */
    /*********************************/

    /**
    * @ignore
    */
    var thisParticipant = this;
    setStatus = function(status) {

        //verify if all of the previous status allows to the participant to pass to the next status
        //if it is possible just setStatus, else return a message error.
        // (@ pchainho) check if the transition is allowed by the state machine.

        switch (thisParticipant.status) {
            case ParticipantStatus.CREATED:
                if (status != ParticipantStatus.WAITING && status != ParticipantStatus.PENDING) {
                    return false;
                }
                else {
                    thisParticipant.status = status;
                    console.log(thisParticipant);
                    return true;

                }
                break;
            case ParticipantStatus.ACCEPTED:
                if (status != ParticipantStatus.PARTICIPATING && status != ParticipantStatus.FAILED) {
                    return false;
                }
                else {
                    thisParticipant.status = status;
                    console.log(thisParticipant);
                    return true;
                }
                break;
            case ParticipantStatus.PARTICIPATING:
                if (status != ParticipantStatus.PARTICIPATED && status != ParticipantStatus.NOT_PARTICIPATING) {
                    return false;
                }
                else {
                    thisParticipant.status = status;
                    console.log(thisParticipant);
                    return true;
                }
                break;
            case ParticipantStatus.PENDING:
                if (status != ParticipantStatus.ACCEPTED && status != ParticipantStatus.MISSED) {
                    return false;
                }
                else {
                    thisParticipant.status = status;
                    console.log(thisParticipant);
                    return true;
                }
                break;
            case ParticipantStatus.FAILED:
                thisParticipant.status = status;
                return true;
                break;
            case ParticipantStatus.MISSED:
                console.log("transition is not allowed");
                return true;
                break;
            case ParticipantStatus.PARTICIPATED:
                    thisParticipant.status = status;
                    console.log(thisParticipant);
                    return true;
                break;
            case ParticipantStatus.WAITING:
                if (status != ParticipantStatus.PARTICIPATING && status != ParticipantStatus.FAILED) {
                    return false;
                }
                else {
                    thisParticipant.status = status;
                    console.log(thisParticipant);
                    return true;
                }
                break;
            case ParticipantStatus.NOT_PARTICIPATING:
                    thisParticipant.status = status;
                    console.log(thisParticipant);
                    return true;

                break;
            default:
                thisParticipant.status = status;
                console.log(thisParticipant);
                return true;
                break;
        }
    };
}
;

/**
 * Creates the local participant and initializes its resources.
 * 
 * @param {Identity} identity - {@link Identity} of the participant
 * @param {ResourceConstraints[]} resourceConstraints - Array of constraints for the initial resources of the local participant. (CURRENT IMPLEMENTATION WILL TAKE THE FIRST ONE)
 * @param {onRTCEvt} rtcEvtHandler - Callback function that handles WebRTC Events.
 * @param {onMessage} msgHandler - Callback function that handles signaling Events.
 * @param {callback} callback - Callback function for success creation of the local participant.
 * @param {errorCallback} errorCallback - Callback function for errors in the creation of the local participant.
 *
 */

Participant.prototype.createMyself = function(identity, resourceConstraints, rtcEvtHandler, msgHandler, callback, errorCallback) {
    
    this.identity = identity;
    this.me = this;
    this.rtcEvtHandler = rtcEvtHandler;
    this.msgHandler = msgHandler;

    setStatus(ParticipantStatus.CREATED);   // @pchainho TODO: to catch errors   

    
    var doGetUserMedia = false;
    var doDataChannel = false;
    var conversationResource = false;
    var constraints = new Object();
    constraints.audio = false;
    constraints.video = false;
    
    
    // Create RTCPeerConnection 
    try {
        // Create an RTCPeerConnection via the polyfill (adapter.js).
        var pc = new RTCPeerConnection({'iceServers': new Array()});
        this.RTCPeerConnnection = pc;
        console.log('Created RTCPeerConnnection.');
    }
    catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message);
        alert('Cannot create RTCPeerConnection object; \
          WebRTC is not supported by this browser.');
        return;
    }

    this.setRTCPeerConnection(pc);
    
    
    
    
    // TODO: Solve the problem where for many resourceConstraints, we would have a loop with callbacks inside.
    // Process the constraints, ordering them by media ones and data ones (maybe in 2 arrays). Merge if necessary
    //resourceConstraints=resourceConstraints[0]; // <dirtyFix>
    var thatIdentity = this.identity;
    var thatResources = this.resources;
    var thatDataBroker = this.dataBroker;
    var that = this;
    var numbResource = 0;
    var flag = false;
    var dataBroker;
    var one = false;
    var getMedia = function(numbResource,recursiveCallback){
        if(resourceConstraints.length > numbResource){

            if (doGetUserMedia === true && resourceConstraints[numbResource].direction!="in" && (resourceConstraints[numbResource].type == "audioVideo" || resourceConstraints[numbResource].type == "audioMic" || resourceConstraints[numbResource].type == "screen")) {
                var thisParticipant = that;
                flag = true;
                // TODO: Merge the media constraints so there is only 1 getUserMedia call (or maybe 2 if screensharing)
                // Loop/cascade callback so all the media is added and resources created.
                getUserMedia(constraints, function (stream) {
                    var evt=new Object();
                    evt.stream=stream;
                    streamGetMedia = stream;
                    thisParticipant.rtcEvtHandler('onaddlocalstream',evt);
                    console.log(numbResource);

                    pc.addStream(stream);
                    var resource = new Resource(resourceConstraints[numbResource -1]);
                    resource.id=stream.id;
                    //resource.constraint = resourceConstraints[numbResource];
                    console.log( resourceConstraints[numbResource]);
                    resource.constraint.constraints = {id: stream.id};
                    resource.owner = that.identity;
                    resource.connections.push(pc);
                    thisParticipant.resources.push(resource);

                    callback();
                }, errorCallback);
               // return;
            }
            if (doDataChannel === true && resourceConstraints[numbResource].direction!="in" &&  (resourceConstraints[numbResource].type != "audioVideo" || resourceConstraints[numbResource].type == "audioMic"  || resourceConstraints[numbResource].type == "screen") ) {
                // Loop so all the codecs are created and initialized.
                var numb = numbResource;
                var sucess = callback;
                var creatResources = function(recursive,numb,sucess){
                    if(resourceConstraints.length>numb){
                        var codec = new Codec(resourceConstraints[numb].type);
                        //codec.id=resourceConstraints[numb].id;
                        console.log(codec);
                        if(resourceConstraints[numb].id) codec.id = resourceConstraints[numb].id;
                        var resource = new Resource(resourceConstraints[numb], codec);
                        console.log(resource);
                        resource.connections.push(pc);
                        resource.owner = thatIdentity;
                        thatResources.push(resource);
                        console.log(thatResources)
                        var evt = new Object();
                        evt.codec = codec;
                        that.onRTCEvt('onResourceParticipantAddedEvt', evt);

                        numb++;
                        recursive(recursive,numb,sucess);
                    }else{
                       // sucess()
                    }
                }
                creatResources(creatResources,numb,sucess);

            }
            numbResource++;
            recursiveCallback(numbResource,recursiveCallback);
        }else{
            if(flag != true ){
               callback();
            }
        }
    }
    var iteration=0;
    var creatConstraints = function(iteration, callbackRecursive){
        if(resourceConstraints.length>iteration){
            switch (resourceConstraints[iteration].type) {

                case ResourceType.AUDIO_MIC:
                    constraints.audio = true;
                    doGetUserMedia = true;
                    break;
                case ResourceType.VIDEO_CAM:
                    constraints.video = true;
                    doGetUserMedia = true;
                    break;
                case ResourceType.AUDIO_VIDEO:
                    constraints.video = true;
                    constraints.audio = true;
                    doGetUserMedia = true;
                    break;
                case ResourceType.SCREEN:
                    constraints.video =  {
                        mandatory: {
                            chromeMediaSource: 'screen',
                            maxWidth: 1280,
                            maxHeight: 720
                        },
                        optional: []
                    };
                    constraints.audio = false;
                    doGetUserMedia = true;
                    break;
                case ResourceType.FILE:
                    doDataChannel = true;
                    break;
                case ResourceType.CHAT:
                    doDataChannel = true;
                    break;
            }
            iteration++;
            callbackRecursive(iteration,callbackRecursive);
        }else{
            getMedia(numbResource,getMedia);
        }

    }

    creatConstraints(iteration,creatConstraints);
};


/**
 * Creates a remote participant
 * 
 * @param {Identity} identity - {@link Identity} of the participant
 * @param {Participant} myParticipant - {@link Participant} representing the local user of the application. 
 * @param {string} contextId - Identifier of the conversation this participant belongs to. 
 * @param {ResourceConstraints[]} resourceConstraints - Array of constraints for the initial resources of the remote participant (CURRENT IMPLEMENTATION WILL TAKE THE FIRST ONE).
 * @param {onRTCEvt} rtcEvtHandler - Callback function that handles WebRTC Events.
 * @param {onMessage} msgHandler - Callback function that handles signaling Events.
 * @param {RTCIceServer} iceServers - Configuration parameters for ICE servers. {@link http://www.w3.org/TR/webrtc/#widl-RTCConfiguration-iceServers}
 *
 */

Participant.prototype.createRemotePeer = function(identity, myParticipant, contextId, resourceConstraints, rtcEvtHandler, msgHandler, iceServers) {
    // # if we follow the state diagram, it will be needed to set the status to created 
    setStatus(ParticipantStatus.CREATED);
    this.identity = identity;
    this.me = myParticipant;
    this.rtcEvtHandler = rtcEvtHandler;
    this.msgHandler = msgHandler;
    this.contextId = contextId;
    var channel;
    var thisParticipant = this;
    var oneDataChannel = false;
    constraints = resourceConstraints;
    var ite = 0;
    var that = this;
    //media and Data
    var getMedia = function(ite,functionCallback,pc,oneDataChannel){
        if(constraints.length > ite){
            var type;
            if(that.me.getResources(constraints[ite])[0] == undefined){
                type == null;
            }
            else{
                type = that.me.getResources(constraints[ite])[0].constraint.type;
            }
            // create data channel and setup chat
            if(data && constraints[ite].direction!="in" && (type == "chat" || type == "file" )){
                console.log("Creating remote peer with local constraints: ",  constraints);

                if(oneDataChannel == false){
                    oneDataChannel = true;
                    channel = pc.createDataChannel("dataChannel");

                    //thisParticipant.setDataBroker(constraints.constraints.dataBroker);
                    thisParticipant.dataBroker.addDataChannel(channel, thisParticipant.identity);
                    hasDataChannel = true;
                    channel.onopen = function () {
                        thisParticipant.dataBroker.onDataChannelEvt();
                        //thisParticipant.onRTCEvt("onResourceParticipantAddedEvt", resourceData);
                    }

                    // setup chat on incoming data channel
                    pc.ondatachannel = function (evt) {
                        channel = evt.channel;
                    };
                    var resourceData;
                }
                resourceData = that.me.getResources(constraints[ite])[0];
                console.log("\n\n\n\n\n",resourceData)
                resourceData.connections.push(pc);
            }

            if(media && constraints[ite].direction!="in" && (constraints[ite].type =="audioVideo" || constraints[ite].type =="audioMic" || constraints[ite].type =="screen")){
                var resourceMedia = that.me.getResources(constraints[ite])[0];
                var stream = that.me.RTCPeerConnection.getStreamById(resourceMedia.constraint.constraints.id);
                pc.addStream(stream);
                resourceMedia.connections.push(pc);
            }

            if (constraints[ite].direction != "out") {
                if (media === true) {
                    var resource = new Resource(resourceConstraints);
                    resource.owner = that.identity;
                    resource.connections.push(pc);
                    thisParticipant.resources.push(resource);
                }
                if (data === true) {
                    var resource = new Resource(resourceConstraints);
                    //var codec = new Codec(resourceConstraints.type);
                    //resource.codec = codec;
                    resource.owner = that.identity;
                    resource.connections.push(pc);
                    thisParticipant.resources.push(resource);
                }
            }
            ite++;
            that.setRTCPeerConnection(pc);
            functionCallback(ite,functionCallback,pc,oneDataChannel);
        }else{
            // Create RTCPeerConnection

        }
    }


    // end Media and Data
    var media = false;
    var data = false;
    var iteration = 0;
    var creatResource = function(iteration,callbackFunction){
        if(constraints.length > iteration){
            switch (constraints[iteration].type) {
                case ResourceType.AUDIO_MIC:
                    media = true;
                    break;
                case ResourceType.VIDEO_CAM:
                    media = true;
                    break;
                case ResourceType.AUDIO_VIDEO:
                    media = true;
                    break;
                case ResourceType.SCREEN:
                    media = true;
                    break;
                case ResourceType.FILE:
                    data = true;
                    break;
                case ResourceType.CHAT:
                    data = true;
                    break;
            }
            iteration++;
            callbackFunction(iteration,callbackFunction);
        }else{
            try {
                // Create an RTCPeerConnection via the polyfill (adapter.js).
                var mediaConstraints = {optional: [{RtpDataChannels: true}]};
                if(!iceServers) iceServers = {'iceServers': new Array()};
                console.log('Creating RTCPeerConnnection with:\n' + '  config: \'' + JSON.stringify(iceServers) + '\';\n' + '  constraints: \'' + JSON.stringify(mediaConstraints) + '\'.');

                var pc = new RTCPeerConnection(iceServers, mediaConstraints);
                //thisParticipant.RTCPeerConnection = pc;


            }
            catch (e) {
                console.log('Failed to create PeerConnection, exception: ' + e.message);
                alert('Cannot create RTCPeerConnection object; \
          WebRTC is not supported by this browser.');
                return;
            }
            getMedia(ite,getMedia,pc,oneDataChannel);
        }
    }
    creatResource(iteration,creatResource);
}







/**@ignore
 * setRTCPeerConnection
 * 
 * @param RTCPeerConnection : PeerConnection ... sets the connection attribute for a participant
 */
Participant.prototype.setRTCPeerConnection = function(RTCPeerConnection) {
    var thisParticipant = this;
    this.RTCPeerConnection = RTCPeerConnection;

    /**
     * onsignalingstatechange
     *
     * It is called any time the readyState changes
     */
    this.RTCPeerConnection.onsignalingstatechange = function(evt) {
        thisParticipant.onRTCEvt("onsignalingstatechange", evt);
    };

    /**
     * oniceconnectionstatechange
     *
     *  It is called any time the iceConnectionState changes.
     */
    this.RTCPeerConnection.oniceconnectionstatechange = function(evt) {
        thisParticipant.onRTCEvt("oniceconnectionstatechange", evt);
    };

    /**
     * onaddstream
     *
     *   It is called any time a MediaStream is added by the remote peer
     */

    this.RTCPeerConnection.onaddstream = function(evt) {
        evt.participant = thisParticipant;
        thisParticipant.onRTCEvt("onaddstream", evt);
    };

    /**
     * onicecandidate 
     *
     */

    this.RTCPeerConnection.onicecandidate = function(evt) {
        thisParticipant.onRTCEvt("onicecandidate", evt);
    };

    /**
     * onnegotiationneeded
     *
     */

    this.RTCPeerConnection.onnegotiationneeded = function(evt) {
        thisParticipant.onRTCEvt("onnegotiationneeded", evt);
    };

    /**
     * ondatachannel
     *
     */

    this.RTCPeerConnection.ondatachannel = function(evt) {
        thisParticipant.onRTCEvt("ondatachannel", evt);
    };

    /**
     * onremovestream
     *
     *  It is called any time a MediaStream is removed by the remote peer. 
     */

    this.RTCPeerConnection.onremovestream = function(evt) {
        thisParticipant.onRTCEvt("onremovestream", evt);
    };


};


/**
 * getConnection
 * 
 * @returns PeerConnection ... gets the connection attribute for a participant
 * 
 */
Participant.prototype.getRTCPeerConnection = function() {
    return this.RTCPeerConnection;
};



/**
 * This callback type is called `onRTCEvt` and handles the WebRTC events from the RTCPeerConnection.
 *
 * @callback onRTCEvt
 * @param {event} event - Event from {@link http://www.w3.org/TR/webrtc/#event-summary} + 'onResourceParticipantAddedEvt' + 'onaddlocalstream'.
 * @param {evt} evt - Returned stream, candidate, etc. see {@link http://www.w3.org/TR/webrtc/#event-summary}
 */
Participant.prototype.onRTCEvt = function(event, evt) {
    // TODO To implement and pass the events up
    switch (event) {

        case 'onnegotiationneeded':
            this.rtcEvtHandler(event, evt);
            break;
        case 'onicecandidate':
            if (evt.candidate) {
                var message = new MessageFactory.createCandidateMessage("","","",evt.candidate.sdpMLineIndex,evt.candidate.sdpMid,evt.candidate.candidate,false);
            } else {
                var message = new MessageFactory.createCandidateMessage("","","","","",this.RTCPeerConnection.localDescription,true);
                console.log("End of Ice Candidates");
            }
            this.sendMessage(message.body,MessageType.CONNECTIVITY_CANDIDATE,"",function(){},function(){});
            this.rtcEvtHandler(event, evt);
            break;
        case 'onsignalingstatechange':
            this.rtcEvtHandler(event, evt);
            break;
        case 'onaddstream':
            console.log("stream added");
            this.rtcEvtHandler(event, evt);
            break;
        case 'onremovestream':
            this.rtcEvtHandler(event, evt);
            break;
        case 'oniceconnectionstatechange':
            this.rtcEvtHandler(event, evt);
            break;
        case 'ondatachannel':
            this.rtcEvtHandler(event, evt);
            break;
        default:
            this.rtcEvtHandler(event, evt);
            break;

    }
}

/**
 * This callback type is called `onRTCEvt` and handles the WebRTC events from the RTCPeerConnection.
 *
 * @callback onMessage
 * @param {Message} message - {@link Message} received
 */
Participant.prototype.onMessage = function(message) {
    switch (message.type) {

        case MessageType.ACCEPTED:
            var mediaConstraints = message.body.constraints;
            var that = this;
            var exist = false;
            if(typeof message.body.connectionDescription !== 'undefined' && message.body.connectionDescription !== ""){

                console.log("Participant " + this.identity.rtcIdentity + " received accepted.");
            var description = new RTCSessionDescription(message.body.connectionDescription);
            this.RTCPeerConnection.setRemoteDescription(description,
                    onSetSessionDescriptionSuccess, onSetSessionDescriptionError);
                console.log("Remote Description set: ", this);  
                this.getResources(mediaConstraints)[0].constraint=mediaConstraints;

                console.log("this.me.indentity: " + this.me.identity.rtcIdentity);
                console.log("this.hosting.rtcIdentity " + this.hosting);
                if(this.me.identity.rtcIdentity == this.hosting.rtcIdentity){
                    //see if the hosting is equal to this.me
                    //send a accepted message with no SDP

                    this.me.connectedIdentities.push(message.from.rtcIdentity);
                    var answerBody = new Object();
                    answerBody.connected = this.me.connectedIdentities;
                    answerBody.from = message.from;
                    answerBody.to = "";
                    this.me.sendMessage(answerBody, MessageType.ACCEPTED, mediaConstraints);
                }
                setStatus(ParticipantStatus.PARTICIPATING);
            }else{
                if(message.body.connected.length != 0){
                    for(var i = 0; i < message.body.connected.length; i++){
                        //ignore the message if my rtcIdentity is in the this.connectedIdentities
                        if(message.body.connected[i] == that.me.identity.rtcIdentity){
                            exist = true;
                            break;
                        }
                    }
                    if(!exist){
                        //if not send a message to the all of candidates
                        that.sendMessage("", MessageType.INVITATION, mediaConstraints);
                    }
                }
            }          
            
            
            this.msgHandler(message);
            break;
        case MessageType.CONNECTIVITY_CANDIDATE:
            if (message.body.lastCandidate) {
                console.log("Participant " + this.identity.rtcIdentity + " reached End of Candidates.");
            }
            else
            {
                var candidate = new RTCIceCandidate({
                    sdpMLineIndex: message.body.label,
                    sdpMid: message.body.id,
                    candidate: message.body.candidateDescription
                });
                console.log("Participant " + this.identity.rtcIdentity + " added a candidate:", candidate);
                this.RTCPeerConnection.addIceCandidate(candidate);
            }
            break;
        case MessageType.NOT_ACCEPTED:
            //setStatus(ParticipantStatus.FAILED);
            this.status = ParticipantStatus.FAILED;
            this.leave(false);
            console.log("Participant received NOT_ACCEPTED");
            this.msgHandler(message);
            break;
        case MessageType.CANCEL:
            this.msgHandler(message);
            break;
        case MessageType.ADD_RESOURCE:
            this.msgHandler(message);
            break;
        case MessageType.UPDATE:
            this.msgHandler(message);
            
            break;
        case MessageType.UPDATED:
            var mediaConstraints = message.body.newConstraints;
            var that = this;
            var exist = false;
            if(typeof message.body.newConnectionDescription !== 'undefined' && message.body.newConnectionDescription !== ""){

                console.log("Participant " + this.identity.rtcIdentity + " received updated.");
                var description = new RTCSessionDescription(message.body.newConnectionDescription);
                this.RTCPeerConnection.setRemoteDescription(description,
                    onSetSessionDescriptionSuccess, onSetSessionDescriptionError);
                console.log("Remote Description set: ", description);
                this.getResources(mediaConstraints)[0].constraint=mediaConstraints;
                if(this.me.identity.rtcIdentity == this.hosting.rtcIdentity){
                    //see if the hosting is equal to this.me
                    //send a accepted message with no SDP
                    var updatesIdentit = new Array(); 
                    updatesIdentit.push(message.from.rtcIdentity);
                    that.me.updatedIdentities = updatesIdentit;
                    var answerBody = new Object();
                    answerBody.connected = that.me.updatedIdentities;
                    answerBody.from = message.from;
                    answerBody.to = "";
                    this.me.sendMessage(answerBody, MessageType.UPDATED, mediaConstraints);
                }
            }else{
                if(message.body.updated.length != 0){
                    for(var i = 0; i < message.body.updated.length; i++){
                        //ignore the message if my rtcIdentity is in the this.connectedIdentities
                        if(message.body.updated[i] == that.me.identity.rtcIdentity){
                            exist = true;
                            break;
                        }
                    }
                    if(!exist){
                        //if not send a message to the all of candidates
                        that.sendMessage("", MessageType.UPDATE, mediaConstraints);
                    }
                }
            } 
             
            this.msgHandler(message);
            break;
        case MessageType.REDIRECT:
            this.msgHandler(message);
            break;
        case MessageType.BYE:
            setStatus(ParticipantStatus.PARTICIPATED);
            this.leave(true);
            console.log("Participant received BYE");
            this.msgHandler(message);
            break;
        case MessageType.OFFER_ROLE:
            this.msgHandler(message);
            break;
        case MessageType.INVITATION:
            // IF GETS HERE IT IS NORMAL FOR THE MULTIPARTY
            var mediaConstraints = message.body.constraints;
            var description = new RTCSessionDescription(message.body.connectionDescription);
            this.RTCPeerConnection.setRemoteDescription(description, onSetSessionDescriptionSuccess, onSetSessionDescriptionError);
            
            this.sendMessage(answerBody, MessageType.ACCEPTED, mediaConstraints);
            //this.msgHandler(message);
            break;
        case MessageType.RESOURCE_REMOVED:
            this.msgHandler(message);
            break;
        case MessageType.SHARE_RESOURCE:
            this.msgHandler(message);
            break;
        default:
            // forward to application level
            this.msgHandler(message);
            break;
    }
}


/** @ignore */
Participant.prototype.connectStub = function(callback) {
    var thisParticipant = this;
    thisParticipant.identity.resolve(function(stub) {// @pchainho: why is this needed?
        stub.addListener(thisParticipant.onMessage.bind(thisParticipant), thisParticipant.identity.rtcIdentity, thisParticipant.contextId);
        stub.connect(thisParticipant.me.identity.rtcIdentity,thisParticipant.me.identity.credentials,callback);// @pchainho: we are using here the credentials of other users??
    });
}


/**
 *
 * The method will create the message and send it to the participant. 
 * 
 * @param {MessageBody} messageBody - The body of the message (depends on the MessageType)
 * @param {MessageType} messageType - The type of the message.
 * @param {ResourceConstraints} [constraints] - For the messages that imply information about the Resources, contraints about them. 
 * @param {callback} callback - Callback for successful sending.
 * @param {errorCallback} errorCallback - Error Callback
 *
 */
Participant.prototype.sendMessage = function(messageBody, messageType, constraints, callback, errorCallback) {
    // Sends the message
    console.log("constraints",messageBody);
    // @(pchainho) TODO: check if sender is not empty and if Participant is in the state "CREATED". otherwise fire error event
    if( messageBody == undefined){
        sdpConstraints = {'mandatory': {'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true }};
    }else{
        if(/^-?[\d.]+(?:e-?\d+)?$/.test(messageBody.peers)){ 
            sdpConstraints = {'mandatory': {'OfferToReceiveAudio': true, 'OfferToReceiveVideo': false }};
        }
        else{       
            sdpConstraints = {'mandatory': {'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true }};
        }
    }
    
    var message = new Message();
    var thisParticipant = this;
    console.log(this.resources)
    console.log(constraints)
    var i;
   /* for(i = 0;i<constraints.length;i++){
        if(constraints[i].type==ResourceType.CHAT || constraints[i].type==ResourceType.FILE)
        {
            var codec = new Codec(constraints[i].type, constraints[i].CodecLibUrl);
            codec.id = constraints[i].id;
            codec.description = constraints[i].description;
            codec.mime_type = constraints[i].mime_type;
            constraints[i] = codec;
        }
    }*/

    
    switch(messageType){
        case MessageType.INVITATION:
            console.log("MessageType.INVITATION: ", messageBody);
            console.log("constrains",constraints)
            // define new type of constraints because when isn't possible to send the DataBroker in message...
            var constraintsAux =new Array();
            var i;
            var iteration;

            for(iteration=0;iteration<constraints.length;iteration++){

                    console.log("entrei",constraints[iteration].type)
                    var aux = new Object()
                    if(constraints[iteration].constraints){
                        aux.id = constraints[iteration].constraints.id;
                    }else{
                        aux.id = constraints[iteration].id;
                    }
                    aux.type = constraints[iteration].type;
                    aux.direction =  constraints[iteration].direction;
                    constraintsAux.push(aux);
            }

                console.log("invite")
                if (!messageBody) message = MessageFactory.createInvitationMessage(this.me.identity, this.identity, this.contextId, constraintsAux);
                else message = MessageFactory.createInvitationMessage(this.me.identity, this.identity, this.contextId, constraintsAux, messageBody.conversationURL, messageBody.subject, messageBody.hosting, messageBody.agenda, messageBody.peers);
                setStatus(ParticipantStatus.PENDING); // TODO: OR WAITING?? Check for errors.

                this.RTCPeerConnection.createOffer(function (sessionDescription) {
                    thisParticipant.RTCPeerConnection.setLocalDescription(sessionDescription, function () {
                        console.log("Local description set: ", sessionDescription);
                        message.body.connectionDescription = thisParticipant.RTCPeerConnection.localDescription;

                        console.log("Sending message with constraints: ", constraints);

                        if (!thisParticipant.identity.messagingStub){
                            errorCallback("Messaging Stub not well initialized");
                            errorCallback;
                        }
                        else thisParticipant.identity.messagingStub.sendMessage(message);

                        if (callback)
                            callback();

                    }, function(error){errorCallback(error)});
                }, function(error){errorCallback(error)}, sdpConstraints);

            break;
        case MessageType.ACCEPTED:
                var constraintsAux =new Array();
                var i;
                for(i =0;i<constraints.length;i++){
                    var aux = new Object();
                    aux.id = constraints[i].id;
                    aux.type = constraints[i].type;
                    aux.direction =  constraints[i].direction;
                    constraintsAux.push(aux);
                }
                console.log(messageBody);
                console.log("this.me.identity.rtcIdentity: ", this.me.identity.rtcIdentity);
                console.log("this.hosting.rtcIdentity: ", this.hosting.rtcIdentity);
                //if(this.me.identity.rtcIdentity === thisParticipant.identity.rtcIdentity){
                if(this.me.identity.rtcIdentity === this.hosting.rtcIdentity){
                    //send a accepted message with no SDP inside
                    var message = new Object();
                    message = MessageFactory.createAnswerMessage(messageBody.from, "", thisParticipant.contextId, constraintsAux, "", messageBody.connected,messageBody.hosting);
                    message.body.from = messageBody.from.rtcIdentity;
                    thisParticipant.identity.messagingStub.sendMessage(message);

                }
                else{
            if(!messageBody) message = MessageFactory.createAnswerMessage(this.me.identity,this.identity,this.contextId, constraintsAux);
            else message = MessageFactory.createAnswerMessage(this.me.identity,this.identity,this.contextId, constraintsAux, messageBody.hosting);

            setStatus(ParticipantStatus.ACCEPTED);

            this.RTCPeerConnection.createAnswer(function (sessionDescription) {
                thisParticipant.RTCPeerConnection.setLocalDescription(sessionDescription, function () {
                    console.log("Local description set: ", sessionDescription);
                    message.body.connectionDescription = thisParticipant.RTCPeerConnection.localDescription;
                    
                    if (!thisParticipant.identity.messagingStub){
                        errorCallback("Messaging Stub not well initialized");
                        return;
                    }
                    else thisParticipant.identity.messagingStub.sendMessage(message);

                    if (callback)
                        callback();
                    
                }, function(error){errorCallback(error)});
                    }, function(error){
                        console.log("error: ", error);
                    }, sdpConstraints);
                }

            break;
        case MessageType.CONNECTIVITY_CANDIDATE:
            //console.log("Missing data for connectivity candidate", messageBody);
            if(messageBody.lastCandidate){
                if(errorCallback)
                    errorCallback("Missing data for connectivity candidate");
                // SD: bugfix, we also need context.id etc. in this message
                message = MessageFactory.createCandidateMessage( this.me.identity,this.identity,this.contextId,"",messageBody.id,messageBody.connectionDescription,true);
                thisParticipant.identity.messagingStub.sendMessage(message);
                return;
            }
            else message = MessageFactory.createCandidateMessage(this.me.identity,this.identity,this.contextId,messageBody.label,messageBody.id,messageBody.candidateDescription,messageBody.lastCandidate);
            
             if (!thisParticipant.identity.messagingStub){
                        errorCallback("Messaging Stub not well initialized");
                        return;
                    }
                    else thisParticipant.identity.messagingStub.sendMessage(message);
            break;
        case MessageType.BYE:
            message = new Message(this.me.identity,this.identity,"",MessageType.BYE,this.contextId); 
             if (!thisParticipant.identity.messagingStub){
                        errorCallback("Messaging Stub not well initialized");
                        return;
                    }
                    else 
                    {
                     thisParticipant.identity.messagingStub.sendMessage(message);
                     setStatus(ParticipantStatus.NOT_PARTICIPATING); // TODO: CHECK IF ITS THE CORRECT STATE
                    }
            console.log("Call terminated");
            break;
        case MessageType.UPDATE:
            console.log("UPDATE");

            console.log("MESSAGE: ", message);
            if (!messageBody)
            {
                message = MessageFactory.createUpdateMessage(this.me.identity,this.identity,this.contextId, constraints);
            }else{
                message = MessageFactory.createUpdateMessage(this.me.identity,this.identity,this.contextId, messageBody.newConstraints);
            }   
            console.log(message);

            this.RTCPeerConnection.createOffer(function (sessionDescription) {
                thisParticipant.RTCPeerConnection.setLocalDescription(sessionDescription, function () {
                    console.log("Local description set: ", sessionDescription);
                    message.body.newConnectionDescription = thisParticipant.RTCPeerConnection.localDescription;
                    if (!thisParticipant.identity.messagingStub){
                        errorCallback("Messaging Stub not well initialized");
                        return;
                    }
                    else thisParticipant.identity.messagingStub.sendMessage(message);

                }, function(error){errorCallback(error)});
            }, function(error){errorCallback(error)}, sdpConstraints);

        break;

        case MessageType.UPDATED:
            if(this.me.identity.rtcIdentity === this.hosting.rtcIdentity){
                    //send a accepted message with no SDP inside
                    var message = new Object();
                    message = MessageFactory.createUpdatedMessage(messageBody.from,"",this.contextId,constraints, this.updatedIdentities,this.hosting.rtcIdentity);
                    message.body.from = messageBody.from.rtcIdentity;
                    thisParticipant.identity.messagingStub.sendMessage(message);

            }else{
                if (!messageBody)
                {
                    
                    message = MessageFactory.createUpdatedMessage(this.me.identity, this.identity, this.contextId, messageBody.newConstraints);
                }else{ 
                    message = MessageFactory.createUpdatedMessage(this.me.identity,this.identity,this.contextId, messageBody.newConstraints,messageBody.hosting);
                }
                    console.log(message);

                //    console.log("VIDEO REMOTO: ", this.RTCPeerConnection.getRemoteStreams()[0].getVideoTracks());
                  //  console.log("AUDIO REMOTO: ", this.RTCPeerConnection.getRemoteStreams()[0].getAudioTracks());


                    this.RTCPeerConnection.createAnswer(function (sessionDescription) {
                        thisParticipant.RTCPeerConnection.setLocalDescription(sessionDescription, function () {
                            console.log("Local description set: ", sessionDescription);
                            message.body.newConnectionDescription = thisParticipant.RTCPeerConnection.localDescription;

                            if (!thisParticipant.identity.messagingStub){
                                errorCallback("Messaging Stub not well initialized");
                                return;
                            }
                            else thisParticipant.identity.messagingStub.sendMessage(message);

                            if (callback)
                                callback();

                        }, function(error){errorCallback(error)});
                    }, function(error){errorCallback(error)}, sdpConstraints);
                }
                    break;
        }
    console.log('Sending: ', message);
}

/**
 * 
 * The Participant leaves the Conversation removing all resources shared in the conversation. 
 * Participant status is changed accordingly.
 *
 * @param {boolean} sendMessage - If true a BYE message will be sent to the participant before removing it. If false the participant will be removed locally from the conversation without sending any message.
 * 
 */

Participant.prototype.leave = function(sendMessage) {
    setStatus(ParticipantStatus.PARTICIPATED);
    this.identity.messagingStub.removeListener("",this.identity.rtcIdentity,"");

    if(this.identity.rtcIdentity == this.me.identity.rtcIdentity){
        this.RTCPeerConnection.getLocalStreams().forEach(function(element, index, array){
            array[index].stop();
        });
        if(sendMessage==true){
            this.sendMessage("",MessageType.BYE,"","",function(){},function(){});  
            //this.identity.onLastMessagingListener();
        } 
    }
    else{
        if(sendMessage==true) this.sendMessage("",MessageType.BYE,"","",function(){},function(){});
        this.dataBroker.removeDataChannel(this.identity);
        if(this.RTCPeerConnection.signalingState && this.RTCPeerConnection.signalingState != "closed")
            this.RTCPeerConnection.close();
            
    }
}


/**
 * getStatus
 * 
 * @returns ParticipantStatus ... gets the status attribute for a participant
 * 
 */
Participant.prototype.getStatus = function() {
    return this.status;
}

/**@ignore
 * setConversation
 */

Participant.prototype.setConversation = function(conversation) {

    if (!conversation)
        return;
    else
        this.conversation = conversation;
}


/**
 * Adds a Resource to this participant including all the signaling and logical actions required.
 * 
 * @param {ResourceConstraints} resourceConstraints - Array of constraints for the initial resources of the remote participant (CURRENT IMPLEMENTATION WILL TAKE THE FIRST ONE).
 * @param {Message} [message] - In case an UPDATE message is received, it should be passed to this function as a parameter to process it and send the UPDATED.
 * @param {callback} callback - Callback function fired when the resource was added succesfully.
 * @param {errorCallback} errorCallback -  Callback function fired when an error happens.
 *
 */
Participant.prototype.addResource = function (resourceConstraints, message, callback, errorCallback) {
    
    var i;
    var getMedia = false;
    var idMedia;
    var dataChannel = false;
    var idChannel;

    var thisParticipant = this;
    for(i=0;i<this.resources.length;i++){
        if(this.resources[i].constraint.type =="audioVideo" || this.resources[i].constraint.type =="screen"){
            getMedia = true;
            idMedia = i;
        }
        if(this.resources[i].constraint.type =="chat" || this.resources[i].constraint.type =="file"){
            
            dataChannel = true;
        }
    }

    if (this == this.me) {
        // Create the resource and the media if the direction is not "in"

        var doGetUserMedia = false;
        var doDataChannel = false;
        var conversationResource = false;
        var constraints = new Object();
        constraints.audio = false;
        constraints.video = false;

        // make the conditions to update the stream if we had already Webcam or microphone
        var micAlready = (this.getResources("",ResourceType.AUDIO_MIC).length!=0);
        var camAlready = (this.getResources("",ResourceType.VIDEO_CAM).length!=0);
        var micCamAlready = (this.getResources("",ResourceType.AUDIO_VIDEO).length!=0);
        // TODO: CHECK FOR DATACHANNEL TYPES AND CONTROL THE CREATION OF A NEW DATACHANNEL, CREATING IT ONLY IF NECCESARY
        // TODO: Solve the problem where for many resourceConstraints, we would have a loop with callbacks inside.
        resourceConstraints = resourceConstraints[0]; // <dirtyFix>
        

        switch (resourceConstraints.type) {

        case ResourceType.AUDIO_MIC:
            if(!micAlready & !micCamAlready){
                constraints.audio = true;
                doGetUserMedia = true;
            }
            break;
        case ResourceType.VIDEO_CAM:
            if(!camAlready & !micCamAlready){
                constraints.video = true;
                doGetUserMedia = true;
            }
            break;
        case ResourceType.AUDIO_VIDEO:
            if(!camAlready) constraints.video = true;
            if(!micAlready) constraints.audio = true;
            if(!micCamAlready) doGetUserMedia = true;
            break;
        case ResourceType.SCREEN:
            constraints.audio = false;
            constraints.video = {
                mandatory: {
                        chromeMediaSource: 'screen',
                        maxWidth: 1280,
                        maxHeight: 720
                },
                optional: []
                };
            doGetUserMedia = true;
            break;
        case ResourceType.FILE:
            doDataChannel = true;
            break;
        case ResourceType.CHAT:
            doDataChannel = true;
            break;
        }


        console.log(constraints);

        if (doGetUserMedia === true && resourceConstraints.direction != "in") {
           
           
            if(!getMedia || resourceConstraints.type == "screen"){
                getUserMedia(constraints, function (stream) {
                    var evt = new Object();
                    evt.stream = stream;
                    streamGetMedia = stream;
                    
                    thisParticipant.rtcEvtHandler('onaddlocalstream', evt);

                    if(!micAlready & !camAlready){
                        thisParticipant.RTCPeerConnection.addStream(stream);
                        var resource = new Resource(resourceConstraints);
                        resource.id = stream.id;
                        resource.constraint.constraints= {id: stream.id};
                        resource.connections.push(thisParticipant.RTCPeerConnection);
                        thisParticipant.resources.push(resource);
                    }
                    else{
                        if(micAlready){
                            var resource = thisParticipant.me.getResources("",ResourceType.AUDIO_MIC)[0];
                            var stream2 = thisParticipant.RTCPeerConnection.getStreamById(resource.id);
                            stream2.addTrack(stream.getVideoTracks()[0]);
                        }
                        if(camAlready){
                            var resource = thisParticipant.me.getResources("",ResourceType.VIDEO_CAM)[0];
                            var stream2 = thisParticipant.RTCPeerConnection.getStreamById(resource.id);
                            stream2.addTrack(stream.getAudioTracks()[0]); 
                        }
                        resource.type=ResourceType.AUDIO_VIDEO;   
                        resource.constraint.type=ResourceType.AUDIO_VIDEO;
                    }

                    callback();
                }, errorCallback);
            }
            else{
                var evt = new Object();
                evt.stream = streamGetMedia;
                thisParticipant.rtcEvtHandler('onaddlocalstream', evt);
                    if(!micAlready & !camAlready){
                        thisParticipant.RTCPeerConnection.addStream(streamGetMedia);
                        var resource = this.resources[idMedia];
                        resource.constraint.constraints= {id: streamGetMedia.id};
                        resource.connections.push(thisParticipant.RTCPeerConnection);
                        thisParticipant.resources.push(resource);
                    }
                    else{
                        if(micAlready){
                            var resource = thisParticipant.me.getResources("",ResourceType.AUDIO_MIC)[0];
                            var stream2 = thisParticipant.RTCPeerConnection.getStreamById(resource.id);
                            stream2.addTrack(stream.getVideoTracks()[0]);
                        }
                        if(camAlready){
                            var resource = thisParticipant.me.getResources("",ResourceType.VIDEO_CAM)[0];
                            var stream2 = thisParticipant.RTCPeerConnection.getStreamById(resource.id);
                            stream2.addTrack(stream.getAudioTracks()[0]); 
                        }
                        resource.type=ResourceType.AUDIO_VIDEO;   
                        resource.constraint.type=ResourceType.AUDIO_VIDEO;
                    }

                    callback();
            }
            return;
        }
        if (doDataChannel === true && resourceConstraints.direction != "in") {
            console.log(thisParticipant);
            var codec = new Codec(resourceConstraints.type);

            var resource = new Resource(resourceConstraints, codec);
            if(resourceConstraints.id) codec.id = resourceConstraints.id;
            resource.connections.push(thisParticipant.RTCPeerConnection);
            resource.owner = this.identity;
            this.resources.push(resource);
            var evt = new Object();
            evt.codec = codec;
            this.onRTCEvt('onResourceParticipantAddedEvt', evt);
        }
        callback();
    } else {
        if (resourceConstraints.direction != "out") {
            if (doGetUserMedia === true) {
                var resource = new Resource(resourceConstraints);
                resource.id = resource.constraint.constraints.id;
                resource.owner = this.identity;
                resource.connections.push(pc);
                thisParticipant.resources.push(resource);
            }
            if (doDataChannel === true) {
                var resource = new Resource(resourceConstraints);
                //var codec = new Codec(resourceConstraints.type);
                //resource.codec = codec;
                resource.owner = this.identity;
                resource.connections.push(pc);
                thisParticipant.resources.push(resource);
            }
        }
        if (resourceConstraints.direction != "in") {
            // Get the resource from the me participant and add it to the peerConnection
            
            //TODO: IMPLEMENT AND CHECK!!!!!!!!!!!!!!
            var channel;
           // var thisParticipant = this;

            if (resourceConstraints.length > 0) {
                // TODO: Solve the problem where for many resourceConstraints, we would have a loop with callbacks inside.
                constraints = resourceConstraints[0]; // <dirtyFix>
                var media = false;
                var data = false;
                switch (constraints.type) {
                case ResourceType.SCREEN:
                    media = true;
                    break;     
                case ResourceType.AUDIO_MIC:
                    media = true;
                    break;
                case ResourceType.VIDEO_CAM:
                    media = true;
                    break;
                case ResourceType.AUDIO_VIDEO:
                    media = true;
                    break;
                case ResourceType.FILE:
                    data = true;
                    break;
                case ResourceType.CHAT:
                    data = true;
                    break;
                }
            }

            // needed to be implemented the resources types
            //wiuth the resources types see what do we want to have
            //if chat -> codec for chat | if filesharing -> codec for filesharing
            // create data channel and setup chat        
            if (data && constraints.direction != "in") {
                //if(thisParticipant.dataBroker.channels.length <= 1){
                    hasDataChannel = true;
                    channel = thisParticipant.RTCPeerConnection.createDataChannel("dataChannel"); // TODO: CREATE DATACHANNEL ONLY IF THERE IS NOT DATARESOURCE YET.
                    thisParticipant.setDataBroker(constraints.constraints.dataBroker);
                    thisParticipant.dataBroker.addDataChannel(channel,thisParticipant.identity);
                //}
                var resourceData = this.me.getResources(constraints)[0];

                resourceData.connections.push(thisParticipant.RTCPeerConnection);

                channel.onopen = function () {
                    thisParticipant.dataBroker.onDataChannelEvt();
                    //thisParticipant.onRTCEvt("onResourceParticipantAddedEvt", resourceData);
                }

                // setup chat on incoming data channel
               // pc = thisParticipant.RTCPeerConnnection;
                thisParticipant.me.RTCPeerConnnection.ondatachannel = function (evt) {
                    channel = evt.channel;
                };
                
            }
            if (media && constraints.direction != "in") {
                var resourceMedia = this.me.getResources(constraints);
                                
                //If it doesnt find the constraints means that the audio and video were merged into AudioVideo
                if(resourceMedia.length==0){
                    constraints.type=ResourceType.AUDIO_VIDEO;
                    resourceMedia = this.me.getResources(constraints)[0];
                }
                
                var stream = this.me.RTCPeerConnection.getStreamById(resourceMedia[0].id);
                thisParticipant.RTCPeerConnection.addStream(stream);
                resourceMedia[0].connections.push(thisParticipant.RTCPeerConnection);
            }
        }
        
        if (!message) {
            // setlocal description, send update
            var messageBody = new Object();
            messageBody.newConstraints=resourceConstraints;
            this.sendMessage(messageBody, MessageType.UPDATE, constraints, callback, errorCallback);
            
        } else {
            // set remotedescription, set localdescription send updated 
            console.log("ADD_RESOURCE <- Participant");
            console.log("message: ", message);
            if(message.body.newConnectionDescription == ""){

            }else{
                var description = new RTCSessionDescription(message.body.newConnectionDescription);
                this.RTCPeerConnection.setRemoteDescription(description,
                        onSetSessionDescriptionSuccess, onSetSessionDescriptionError);
                console.log("Remote Description set: ", description);
                console.log("Participant: ", this);
            }

            var messageBody = new Object();
            messageBody.newConstraints=resourceConstraints;
            messageBody.from = message.from;
            this.sendMessage(messageBody, MessageType.UPDATED, constraints, callback, errorCallback);
        }
        callback();
    }
}

/**
 * Searches and retrieves Resources.
 *
 * @param {ResourceConstraints} [resourceConstraints] - Searches the Resources by constraints.
 * @param {ResourceType} [resourceType] - Searches the Resources by type.
 * @param {string} id - Searches the Resources by ID.
 *
 */
Participant.prototype.getResources = function (resourceConstraints, resourceType, id) {
    
    var resources = new Array();
    
    if (resourceConstraints) {
        this.resources.forEach(function (element, index, array) {
            if (element.constraint.type == resourceConstraints.type && element.constraint.direction == resourceConstraints.direction) resources.push(array[index]);
        });
        return resources;
    }

    if (resourceType) {
        this.resources.forEach(function (element, index, array) {
            if (element.type === resourceType) resources.push(array[index]);
        });
        return resources;
    }
    if (id) {
        this.resources.forEach(function (element, index, array) {
            if (element.id === id) resources.push(array[index]);
        });
        return resources;
    }

    // If no filter, return all the resources.
    return this.resources;
}

/**@ignore
 * getStreams
 * 
 * @returns Stream [] ... gets the resources array attribute
 * 
 */
Participant.prototype.getStreams = function() {
    if (this.me.identity.rtcIdentity == this.identity.rtcIdentity)
        return this.RTCPeerConnection.getLocalStreams();
    else
        return this.RTCPeerConnection.getRemoteStreams();
}

/**
 * Sets the DataBroker to a Participant
 * @param {DataBroker} databroker - DataBroker to set.
 * 
 */
Participant.prototype.setDataBroker = function( databroker ) {
    this.dataBroker = databroker;
}

// ------------------------------- 
// Conversation.js 
// ------------------------------- 

/**
 * @fileOverview WebRTC Framework to facilitate the development of Applications that seamless interoperate between each other
 * @author Paulo Chainho <paulo-g-chainho@ptinovacao.pt>
 * @author Steffen Druesedow <Steffen.Druesedow@telekom.de>
 * @author Miguel Seijo Simo <Miguel.Seijo@telekom.de>
 * @author Vasco Amaral <vasco-m-amaral@ptinovacao.pt>
 * @author Kay Haensge <Kay.Haensge@telekom.de>
 * @author Luis Oliveira <luis-f-oliveira@ptinovacao.pt>
 */


/**
 * Conversation class
 * @class
 * @param participants list of {@link Participant} involved in the conversation 
 * @param id Unique Conversation identification
 * @param owner the {@link Participant} organizing the conversation 
 * @param hosting the {@link Identity} that is providing the signalling message server 
 * @param rtcEvtHandler Event handler implemented by the Application to receive and process RTC events triggered by WebRTC Media Engine
 * @param msgHandler {@link Message} handler implemented by the Application to receive and process Messages from the {@link MessagingStub}
 *
 */
function Conversation(myIdentity, rtcEvtHandler, msgHandler, iceServers, constraints) {
     /**
     * The list of {@link Participant} in the Conversation.
     * @private
     * @type Participant[]
     */
    this.participants = [];
    
     /**
     * Unique Conversation identification.
     * @private
     * @type string
     */
    this.id;
    
     /**
     * The {@link Participant} that manages the Conversation having additional features 
     * Eg, add and remove participants, mute/unmute/share resources, etc. 
     * It may change in the middle of the conversation by sending a "OfferRole" {@link Message}.
     * @private
     * @type Participant
     */
    this.owner;
    this.rtcEvtHandler = rtcEvtHandler;
    this.msgHandler = msgHandler;
    
    this.dataBroker = new DataBroker();
    
     /**
     * The {@link Identity} that is providing the conversation signalling messaging server.
     * @private
     * @type Identity
     */
    this.hosting;
    
     /**
     * ICE servers setup data.
     * @private
     * @type String
     */
    this.iceServers=iceServers;
    
    /*
     * TODO: 
     * - hosting could be empty, in this case the communication is purely P2P
     * - if hosting is NOT empty, then the Conversation has to add a listener to the MessagingStub
     *   of the hosting-identity
     * - if hosting is empty, then the participants are invoking addListener of 
     */
    this.resources = [];
    //this.status;
    //this.recording;
    //this.subject;
    //this.agenda = [];
    //this.startingTime;
    //this.duration;

    //this.eventHandler;
    this.myParticipant = new Participant();
    this.myParticipant.identity = myIdentity;
    thisConversation = this;
}



/**
 * A Conversation is opened for invited participants. 
 * Creates the remote participant, resolves and gets the stub, 
 * creates the peer connection, connects to the stub and sends invitation
 * 
 * @param {string[]} rtcIdentity list of users to be invited
 * @param {string} [invitation] body to be attached to INVITATION {@link MESSAGE}
 * @@callback callback to handle responses triggered by this operation
 */
Conversation.prototype.open = function (rtcIdentity, resourceConstraints, invitationBody, callback, errorCallback) {

    var that = this;

    this.myParticipant.createMyself(this.myParticipant.identity, resourceConstraints, this.onRTCEvt.bind(this), this.onMessage.bind(this), function () {

        that.id = "context-" + guid();
        that.owner = that.myParticipant;
        that.owner.contextId = that.id;

        that.myParticipant.contextId = that.id;
        if (that.myParticipant.hosting == null)
            that.myParticipant.hosting = that.myParticipant.identity;
        
        //define hosting
        if(invitationBody.hosting)
            that.hosting = invitationBody.hosting;

        var localParticipant = that.myParticipant;
        var localIDP = localParticipant.identity.idp;
        var toIdentity;
        //add a verification if rtcIdentity is already an identity or if is a rtcIdentity only
        //
        
        localIDP.createIdentities(rtcIdentity, function (identity) {
            console.log("rtcIdentity: ", identity);
            if (identity instanceof Array) {
                identity.forEach(function (element, index, array) {
                    var participant = new Participant();
                    console.log("owner: ", this.owner);
                    toIdentity = element
                       
                    participant.hosting = that.myParticipant.hosting;

                    console.log("Calling to Identity: ", toIdentity);

                    console.log("Created remote participant: ", participant);
                    /*var constraints = new Array();
                    that.resources.every(function (element, index, array) {
                        constraints.push(element.constraint);
                    });
                    that.myParticipant.resources.every(function (element, index, array) {
                        constraints.push(element.constraint);
                    });*/

                    participant.setDataBroker(that.dataBroker);
                    participant.createRemotePeer(toIdentity, localParticipant, that.id, resourceConstraints, that.onRTCEvt.bind(that), that.onMessage.bind(that), that.iceServers);
                    
                    if(that.hosting && that.hosting == that.myParticipant.identity.rtcIdentity){
                        participant.identity.messagingStub = that.myParticipant.identity.messagingStub;
                    }
                    
                    that.addParticipant(participant, invitationBody, resourceConstraints);
                    
                });
            }
        });





    }, errorCallback);
};

/**
 * Opens a conversation by accepting an incoming invitation.
 * Sends the message to the addressed participant (the one who sent the invitation)
 * Sets the Conversation status to OPENED.
 * @param {Message} invitation the invitation message received for the accepted conversation
 * @param {string} answer the answer to be sent with the accepted message
 * @param {string} [constraints] any constraint on how the invitation was accepted e.g. only audio but not video  
 * @callback callback the callback that handles events triggered by this function 
 */
Conversation.prototype.acceptInvitation = function(recvInvitation, answerBody, callback, errorCallback) {

    // Swap direction because we are receiving
    var direction = "in_out";
   /* if(recvInvitation.body.constraints[0].direction=="in") direction="out";
    if(recvInvitation.body.constraints[0].direction=="out") direction="in";
    recvInvitation.body.constraints[0].direction=direction;
     onsole.log("CONVERSATION..> acceptInvitation: ", recvInvitation);*/
    console.log("cenas\n\n\n",recvInvitation)
    if (!this.setStatus(ConversationStatus.OPENED)) {
        // TODO: ERROR, Status cant be changed
        return;
    }

    var that = this;
    var chatID = new Object();
    var id1;
    var videoID = new Object();
    var id2;
    var fileID = new Object();
    var id3;
    var iteration;
    var i;
    for(i=0;i<recvInvitation.body.constraints.length;i++){
        if(recvInvitation.body.constraints[i].type == "file"){
            id3 = recvInvitation.body.constraints[i].id;
            fileID.index = i;
        }else{
            if(recvInvitation.body.constraints[i].type == "chat"){
                id1 = recvInvitation.body.constraints[i].id;
                chatID.index = i;
            }else{
                if(recvInvitation.body.constraints[i].type == "audioVideo"){
                    id2 = recvInvitation.body.constraints[i].id;
                    videoID.index = i;
                }
            }
        }
    }
    this.myParticipant.createMyself(this.myParticipant.identity, recvInvitation.body.constraints, this.onRTCEvt.bind(this), this.onMessage.bind(this), function () {
        //TODO: THINK OF MULTIPARTY CASE, YOU RECEIVE A CALL BUT THE INVITE IS FOR MANY PEOPLE
        that.id = recvInvitation.contextId;
        //this.owner.contextId=this.id;
        that.myParticipant.contextId=that.id;

        //var participant = new Participant();
        //var localParticipant = this.owner;
        console.log("CONVERSATION > SS1: ", that.myParticipant.hosting);
        if(that.myParticipant.hosting == null){
            that.myParticipant.hosting = recvInvitation.from;
            console.log("CONVERSATION > SS: ", that.myParticipant.hosting);
            console.log("CONVERSATION > SS: ", recvInvitation.from);
        }


        var localParticipant = that.myParticipant;
        //console.log("CONSTRAINTS AFTER!!!!:" + recvInvitation.body.constraints[0].constraints.id);


        var localIDP = localParticipant.identity.idp;
        var toIdentity;

        var constraints = recvInvitation.body.constraints; // <dirtyFix>

        console.log("recvInvitation.body.constraints: ", recvInvitation.body.constraints);
        for(iteration=0;iteration<constraints.length;iteration++){
            if(constraints[iteration].type==ResourceType.CHAT || constraints[iteration].type==ResourceType.FILE){
                //beginof: create a codec with the data received
                var codec=new Codec(constraints[iteration].constraints.type,constraints[iteration].constraints.CodecLibUrl);
                console.log("constraints.type==ResourceType.CHAT: ", that.myParticipant.resources);
                that.myParticipant.resources[iteration].codec.id=constraints[iteration].constraints.id;
                var resource = new Resource(constraints[iteration], codec);
                resource.codec.setDataBroker(that.dataBroker);
                //endof: create a codec with the data received
            }
        }
        //constraints = new Array(constraints); // </dirtyFix>

        //Create an array to all peers that I want to connect
        //recvInvitation.body.peers[i] is defined when the clients are selected in the application
        var peers = new Array();
        peers.push(recvInvitation.from.rtcIdentity);
        console.log("recv: ", recvInvitation);
        for(var i = 0; i < recvInvitation.body.peers.length; i++){
            if(recvInvitation.body.peers[i] !== that.myParticipant.identity.rtcIdentity)
                peers.push(recvInvitation.body.peers[i]);
        }

        //now should be createIdentities because of multiparty
        localIDP.createIdentities(peers, function(identity){

            if(identity instanceof Array){
                console.log("Identity: ", identity);

                identity.forEach(function(element, index, array){
                        var participant = new Participant();

                        toIdentity = element;
                        that.hosting = recvInvitation.body.hosting;
                        console.log("THIS.HOSTING", recvInvitation.body.hosting);
                        if(typeof that.owner === 'undefined'){
                            that.owner = participant;
                        }
                        participant.hosting = that.owner;
                        if(that.hosting == recvInvitation.from.rtcIdentity){
                            console.log("THIS.HOSTING", that.hosting);
                            console.log("THIS.OWNER", that.owner);
                            toIdentity.messagingStub = recvInvitation.from.messagingStub;
                        }
                        else{
                            toIdentity.messagingStub = that.myParticipant.identity.messagingStub;
                        }


                        participant.setDataBroker(that.dataBroker);
                        if(chatID.id != null){
                            constraints[chatID.index].id = {id: id1};
                        }
                        if(videoID.id != null){
                            constraints[videoID.index].id = {id: id2};
                        }
                        if(fileID.id != null){
                            constraints[fileID.index].id = {id: id3};
                        }

                        participant.createRemotePeer(toIdentity, localParticipant, that.id, constraints,that.onRTCEvt.bind(that), that.onMessage.bind(that), that.iceServers);
                        that.participants.push(participant);
                        if(recvInvitation.from.rtcIdentity === toIdentity.rtcIdentity){
                            //Only do the RTCPeerConnection to the identity that is inviting
                            //for the other identities only creates the participants
                            console.log("ENTREI > acceptInvitation: ", recvInvitation);
                            var description = new RTCSessionDescription(recvInvitation.body.connectionDescription);
                            participant.RTCPeerConnection.setRemoteDescription(description, onSetSessionDescriptionSuccess, onSetSessionDescriptionError);
                        }
                        participant.connectStub(function() {
                            if(recvInvitation.from.rtcIdentity === toIdentity.rtcIdentity){
                                participant.sendMessage(answerBody, MessageType.ACCEPTED, constraints, callback, errorCallback);
                            }

                        });
                    },
                    function(error){
                        console.log(error);
                    });
            }
        });

    }, errorCallback);
};

/**
 * If to-field of the message is empty, then send message to all participants, send only to specified participants 
 * if to-field is filled.
 * (Message.to-field is a list of identities.) 
 * @param {MESSAGE} message the {@link Message} to be sent to the specified Identities or or ALL participants
 */
Conversation.prototype.sendMessage = function(message) {
    if (!message)
        return;

    /*
     *  TODO: 
     *  if this.hosting is set, then ALL Messages are send via the MessagingStub
     *  of the hosting identity.
     *  Only if this.hosting is NOT SET we iterate through the participants
     */

    if (this.hosting) {
        // seems that there is a special Identity assigned to "host" this conversation
        // in this case ALL Messages must be sent via the messagingStub of this identity
        // TODO: Check following ASSUMPTION: 
        // Only one message is sent to the Messaging stub of the hosting-identity. The MessagingServer is responsible 
        // to forward individual messages to all attached participants of this conversation.
        var p = this.getParticipant(this.hosting);
        if (p)
            p.sendMessage(message);
    }
    else {
        // send to all participants via their own messaging stubs, if to is not set or empty
        if (!message.to) {
            for (var p in this.participants)
                this.participants[p].sendMessage(message);
        }
        else {
            // send to all participants that we have for the given identities
            for (var i in message.to) {
                // check for participant matching this identity
                var p = this.getParticipant(message.to[i]);
                if (p)
                    p.sendMessage(message);
            }
        }
    }
};

/** @ignore
 * Set the status of this conversation. 
 * TODO: This method should be private and only be changed by internal state-changes 
 * @param status ConversationStatus ... the new status of the conversation
 */
Conversation.prototype.setStatus = function(status) {
    // DONE: implement the state machine checks here !!!
    // TODO: PAUSED AND STOPPED are not in the Enums !!!
    // TODO: Change the UML so returns true or false if the state change is not allowed.
    // (@Vasco) the previous state machine verifications it was not working in a correct way 
    // Changed verify below
    console.log("In setStatus");
    switch (this.status) {
        case ConversationStatus.CREATED:
            if (status != ConversationStatus.OPENED) {
                console.log("transition is not permited " + status + " actual state: " + this.status);
                return false;
            } else {
                this.status = status;
                return true;
            }
        case ConversationStatus.OPENED:
            if (status != ConversationStatus.ACTIVE && status != ConversationStatus.INACTIVE && status != ConversationStatus.FAILED && status != ConversationStatus.PLAYING && status != ConversationStatus.CLOSED) {
                console.log("transition is not permited " + status + " actual state: " + this.status);
                return false;
            } else {
                this.status = status;
                return true;
            }
        case ConversationStatus.INACTIVE:
            if (status != ConversationStatus.ACTIVE) {
                console.log("transition is not permited " + status + " actual state: " + this.status);
                return false;
            } else {
                this.status = status;
                return true;
            }
        case ConversationStatus.FAILED:
            console.log("transition is not permited");
            return false;
        case ConversationStatus.ACTIVE:
            if (status != ConversationStatus.INACTIVE && status != ConversationStatus.CLOSED && status != ConversationStatus.FAILED && status != ConversationStatus.RECORDING && status != ConversationStatus.PLAYING) {
                return false;
                console.log("transition is not permited " + status + " actual state: " + this.status);
            } else {
                this.status = status;
                return true;
            }
        case ConversationStatus.CLOSED:
            console.log("transition is not permited " + status + " actual state: " + this.status);
            return false;
        case ConversationStatus.RECORDING:
            if (status != ConversationStatus.FAILED && status != ConversationStatus.INACTIVE && status != ConversationStatus.CLOSED && status != ConversationStatus.PLAYING) {
                console.log("transition is not permited " + status + " actual state: " + this.status);
                return false;
            } else {
                this.status = status;
                return true;
            }
        case ConversationStatus.PLAYING:
            if (status != ConversationStatus.PAUSED && status != ConversationStatus.STOPPED && status != ConversationStatus.INACTIVE && status != ConversationStatus.ACTIVE) {
                console.log("transition is not permited " + status + " actual state: " + this.status);
                return false;
            } else {
                this.status = status;
                return true;
            }
        case ConversationStatus.PAUSED:
            if (status != ConversationStatus.PLAYING && status != ConversationStatus.STOPPED && status != ConversationStatus.INACTIVE && status != ConversationStatus.ACTIVE) {
                console.log("transition is not permited " + status + " actual state: " + this.status);
                return false;
            } else {
                this.status = status;
                return true;
            }
        case ConversationStatus.STOPPED:
            console.log("transition is not permited " + status + " actual state: " + this.status);
            return false;
        default:
            if (!this.status) {
                this.status = status;
                return true;
            }
            return false;
    }
};

/** 
 * Returns the status of this conversation
 */
Conversation.prototype.getStatus = function() {
    return(this.status);
};


/**
 * Close the conversation with the given message.
 * Sends this message to ALL participants and sets the conversation status to CLOSED
 * @param {Message} message the final message to be sent to ALL participants of this conversation
 * @return {boolean} True if successful, false if the participant is not the owner.
 */
Conversation.prototype.close = function() {
    if(this.owner==this.myParticipant)
    {
        this.participants.forEach(function(element,index,array){
            element.status=ParticipantStatus.PARTICIPATED;
            element.identity.messagingStub.removeListener("",element.identity.rtcIdentity,"");
            element.sendMessage("",MessageType.BYE,"","",function(){},function(){});
            if(element.RTCPeerConnection.signalingState && element.RTCPeerConnection.signalingState != "closed")
                element.RTCPeerConnection.close();
        });
        this.myParticipant.leave(false);
        this.setStatus(ConversationStatus.CLOSED);
        return true;
    }
    return false;
}


/**
 * Bye the conversation with the given message.
 * Sends this message to ALL participants and sets the conversation status to CLOSED
 * @param {Message} message the final message to be sent to ALL participants of this conversation
 */
Conversation.prototype.bye = function() {
    this.participants.forEach(function(element,index,array){
                                element.leave(true);
                                delete array[index];
    });
    this.myParticipant.leave(true);
    this.setStatus(ConversationStatus.CLOSED);
};


/**
 * Adds a participant to the conversation.
 * @param {Participant} participant the {@link Participant} to add to the conversation
 * @param {String} [invitation] the invitation to be attached to the {@link Message} body
 */
Conversation.prototype.addParticipant = function(participant, invitationBody, constraints, callback, callbackError) {
    this.participants.push(participant);    
    participant.connectStub(function() { // @pchainho: why do we need this?
        participant.sendMessage(invitationBody, MessageType.INVITATION, constraints, callback, callbackError)
    });
};

/*** Returns the participants of the conversation as an Array.
 * @returns {Participants[]}
 */
Conversation.prototype.getParticipants = function() {
    return(this.participants);
};


/**@ignore
 * Callback for events from the Participants (received via the MessagingStub)
 * @param message : Message
 */
Conversation.prototype.onMessage = function(message) {
    // TODO: implement eventHandling
    switch (message.type) {

        case MessageType.ACCEPTED:
            console.log("MESSAGEACCEPTEDCONVERSATION: ", message);
            // TODO: change state of the conversation and forward to app-layer
            break;
        case MessageType.CONNECTIVITY_CANDIDATE:

            // put candidate to PC
            break;
        case MessageType.NOT_ACCEPTED:
            this.participants.forEach(function(element, index, array){
                if(element.status==ParticipantStatus.PARTICIPATED){
                    array.splice(index, 1);
                }
            });
            if(this.participants.length==0) this.bye();
            break;
        case MessageType.CANCEL:
            break;
        case MessageType.ADD_RESOURCE:
            break;
        case MessageType.UPDATE:
            break;
        case MessageType.UPDATED:
            break;
        case MessageType.REDIRECT:
            break;
        case MessageType.BYE:
            if(this.owner.identity.rtcIdentity == message.from.rtcIdentity){
                this.participants.forEach(function (element, index, array) {
                    element.leave(false);
                    delete array[index];
                });
                this.myParticipant.leave(false);
                this.setStatus(ConversationStatus.CLOSED);
            }
            else {
                this.participants.forEach(function(element, index, array){
                    if(element.status==ParticipantStatus.PARTICIPATED){
                        array.splice(index, 1);
                    }
                });
                if(this.participants.length==0) this.bye();
            }
            
            break;
        case MessageType.OFFER_ROLE: // set new moderator of the conversatoin
            break;
        case MessageType.INVITATION:
            // IF RECEIVED, SOMETHING IS WRONG
           /*INVITATION
                Participant should only receive invitations in multiparty conversation. In this case it will be automatically accepted, the peerconnection is set and the Accepted message sent.*/

            break;
        case MessageType.RESOURCE_REMOVED:
            break;

        case MessageType.SHARE_RESOURCE:
            break;
        default:
            // forward to application level
            break;
    }
    this.msgHandler(message);
};

/** @ignore */
Conversation.prototype.onRTCEvt = function(event, evt) {
    // TODO To implement and pass the events up
    switch (event) {

        case 'onnegotiationneeded':
            this.rtcEvtHandler(event, evt);
            break;
        case 'onicecandidate':
            this.rtcEvtHandler(event, evt);
            break;
        case 'onsignalingstatechange':
            this.rtcEvtHandler(event, evt);
            break;
        case 'onaddstream':
            this.rtcEvtHandler(event, evt);
            break;
        case 'onaddlocalstream':
            this.rtcEvtHandler(event,evt);
            break;
        case 'onremovestream':
            this.rtcEvtHandler(event, evt);
            break;
        case 'oniceconnectionstatechange':
            this.rtcEvtHandler(event, evt);
            break;
        case 'ondatachannel':
            this.rtcEvtHandler(event, evt);
            break;
        default:
            this.rtcEvtHandler(event, evt);
            break;

    }
};

/**@ignore
 * Records a conversation.
 */
Conversation.prototype.record = function() {
    // TODO: to be re-fined and implemented
};

/**@ignore
 * Playback a (part of a) conversation.
 * @param timing : ??? ... time index information
 * @param resources : Resource[1..*] ... the resource to be played back
 */
Conversation.prototype.play = function(timing, resources) {
    // TODO: to be re-fined and implemented
};

/**@ignore
 * Pause playback of a conversation.
 */
Conversation.prototype.pause = function() {
    // TODO: to be re-fined and implemented
};


/**@ignore
 * Helper function to get the matching Particpant for a given Identity.
 * @param identity : Identity ... the identity to search for
 * @returns the Particpant of the current conversation that matches the given Identity
 */
Conversation.prototype.getParticipant = function(identity) {
    if (!identity)
        return;
    var match;
    for (var p in this.participants)
        if (this.participants[p].identity.rtcIdentity == identity.rtcIdentity)
            match = this.participants[p];
    return match;
};

/**
 * ConversationAddResource
 */
Conversation.prototype.addResource = function(resourceConstraints, message, onSuccessCallback, onErrorCallback) {

    //see what's in the resource (resourceConstraints)
    var thisConversation = this;
    // If it comes with a message, means we add a resource from an incoming petition to the corresponding participant.
    if(!message){
    var count=0;
    var internalSuccessCallback = function(){
            if(count<thisConversation.participants.length){ 
                count++;
                console.log("Adding the resource for the participant number: " + count);
                thisConversation.participants[count-1].addResource(resourceConstraints,"",internalSuccessCallback, onErrorCallback);
            }
            else{
                onSuccessCallback();
            }

    }
    
            thisConversation.myParticipant.addResource(resourceConstraints,"",internalSuccessCallback, onErrorCallback);
    }
    else{
        // Swap direction because we are receiving
        var direction = "in_out";
   
        thisConversation.myParticipant.addResource(resourceConstraints,"",function() {
            thisConversation.getParticipant(message.from).addResource(resourceConstraints,message,onSuccessCallback,onErrorCallback);
        }, onErrorCallback);


        
    }
 };
 
Conversation.reject = function(message){
    console.log("reject....-----",message)
    if(message.to instanceof Array)
        message.to[0].resolve(function(stub){stub.sendMessage(MessageFactory.createNotAccepted(message))});
    else
        message.to.resolve(function(stub){stub.sendMessage(MessageFactory.createNotAccepted(message))});
}