#!/usr/bin/node
// slideShowSrv.js


module.exports = function () {

// PRIVATE Properties/Methods
var _ = {

    fs: require ('fs'),
    ws: require ('go-ws-server'),
    key1: require ('key1'),
    toClient: null

}; // end PRIVATE properties
//---------------------
_.init = () => {
    
    var options = {doEncryption: false,
        verbose: false,
        isSecure: false};

    _.ws = new _.ws (8001, _.action, options);

    _.toClient = _.ws.toClient;

    return;

}; // end _.init

//---------------------
_.action = (wsId, msgOb) => {
    console.log ('====]>  lrGofer.js._.action.msgOb: ' + JSON.stringify (msgOb));
    console.log ('    wsId: ' + wsId);
    
    var cmd = _.key1 (msgOb);
        console.log ('cmd: ' + JSON.stringify (cmd) + '\n');

    switch (cmd) {

        case 'initConnection':

            var ready = {ready:1};
            _.toClient (wsId, ready);
            break;

        case 'getPngFiles':

            var pngFiles = _.fs.readFileSync ('./pngFiles','utf8');
            var pngFilesA = pngFiles.split ('\n');
            _.toClient (wsId, {pngFiles: pngFilesA});

            break;

    } // end switch (cmd)
    

    //_.toClient (wsId, nextAction);

}; // end _.action 


_.init ();

}();



