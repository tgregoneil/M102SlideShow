#!/usr/bin/node
// slideShowSrv.js


module.exports = function () {

// PRIVATE Properties/Methods
var v = {

    fs: require ('fs'),
    ws: require ('go-ws-server'),
    key1: require ('key1'),
    toClient: null

}; // end PRIVATE properties
var f={};
//---------------------
f.init = () => {
    
    var options = {doEncryption: false,
        verbose: false,
        isSecure: false};

    v.ws = new v.ws (8001, f.action, options);

    v.toClient = v.ws.toClient;

    return;

}; // end f.init

//---------------------
f.action = (wsId, msgOb) => {
    console.log ('====]>  lrGofer.js.f.action.msgOb: ' + JSON.stringify (msgOb));
    console.log ('    wsId: ' + wsId);
    
    var cmd = v.key1 (msgOb);
        console.log ('cmd: ' + JSON.stringify (cmd) + '\n');

    switch (cmd) {

        case 'initConnection':

            var ready = {ready:1};
            v.toClient (wsId, ready);
            break;

        case 'getPngFiles':

            var pngFiles = v.fs.readFileSync ('./pngFiles','utf8');
            var pngFilesA = pngFiles.split ('\n');
            v.toClient (wsId, {pngFiles: pngFilesA});

            break;

        case 'getVideoLinks':

            var videoLinks = v.fs.readFileSync ('./videoLinks.html','utf8');
            var videoLinksA = videoLinks.split ('\n');
            v.toClient (wsId, {videoLinks: videoLinksA});

            break;

    } // end switch (cmd)
    

    //v.toClient (wsId, nextAction);

}; // end f.action 


f.init ();

}();



