(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// cmdrInit.js

module.exports = (function () {

// PRIVATE Properties/Methods
var _ = {
}; // end PRIVATE properties

_.init = () => {
    
    var c = require ('./slideShow.js');
    new c ();
};

// PUBLIC Properties/Methods
var P = {};

// end PUBLIC section

(function () {

    $(document).ready (_.init);

}) ();



return P;

}) ();






},{"./slideShow.js":2}],2:[function(require,module,exports){
// slideShow.js

module.exports = function () {

// PRIVATE Properties/Methods
var _ = {

    ws: require ('go-ws-client'),
    key: require ('go-key'),
    j2h: require ('go-json2html'),
    pi: require ('go-popinfo'),
    key1: require ('key1'),

    dpp: null,
    curVis: null,
    maxImages: null,
    idSlides: null,

    ctI: null,
    topicsI: null,
    topicRefs: null,
    topicRef: null,
    idNav: null,
    idPageCt: null,
    idNavPN:null,
    srvAws: '52.33.170.21'

}; // end PRIVATE properties

_.init = () => {

    _.dpp = _.j2h.displayPage;
    _.genId = _.j2h.genId;

    _.pi = new _.pi (_.j2h);

    var  gt = window.location.href;

    //var ipSrc = gt.match (/(file)|(localhost)/) ? '0.0.0.0' : _.srvAws;
    var ipSrc = _.srvAws;
    _.ws = new _.ws (ipSrc, 8001, P.doAction);

    new _.key ('body', false, _.keyFilter);
};

//---------------------
_.initStyle = () => {
    
    var style = {style:
        "body {" +
            "margin-left: 15px;" +
        "}" +
        ".caption {" +
            "display: inline-block;" +
            "font-weight: bold;" +
            "font-size: 20px; " +
            "position: absolute; " +
            "bottom: 50px; " +
            "text-align: center;" +
            "background-color: white;" +
            "max-width: 500px;" +
            "word-break: break-all;" +
            "left: 0;" +
            "right: 0;" +
            "margin: 0 auto;" +
        "}" +
        ".help {" +
            "width: 16px;" +
            "height: 16px;" +
            "font-size: 15px;" +
            "border: 1px solid black;" +
            "border-radius: 8px;" +
            "float: right;" +
            "background-color: #0e0;" +
            "font-weight: bold;" +
        "}" +
        ".header {" +
            "text-align: center;" +
            "position: relative;" +
        "}" +
        ".div700 {" +
            "position: relative;" +
            "width: 700px;" +
        "}" +
        "img {" +
            "height: 500px;" +
            "width: 700px;" +
        "}" +
        ".cols {" +
            "padding-right: 0px;" +
            "padding-left: 10px;" +
        "}" +
        ".novis {" +
            "display: none;" +
        "}" +
        ".nav {" +
            "font-size: 30px;" +
            "font-weight: 900;" +
            "margin-left: 10px;" + 
            "position: relative;" +
            "float: right;" +
            "top: -40px;" +
        "}" +
        ".pagect {" +
            "top: -40px;" +
            "position: relative;" +
            "float: right;" +
        "}" +
        ".ref {" +
            "width: initial;" +
            "font-size: 11px;" +
            "word-break: break-all;" +
        "}" +
        ".topicrows {" +
            "margin-bottom: 20px;" +
        "}" +
        ".locheader {" +
            "color: red;" +
        "}" +
        ".week {" +
            "font-weight: bold;" +
        "}",
        parent: 'head'};

        _.dpp (style);
      
}; // end _.initStyle


//---------------------
_.displayNav = () => {
    
    var navSpans = [{span: '>', id: 'navr', class: 'nav'}, 
    {span: '<', id: 'navl', class: 'nav'}];

    navSpans.parent = _.idNavPN;

    _.dpp (navSpans);

    $('#navl, #navr')
    .hover (
        function () {
            $(this)
            .css ({color: 'red'});
        },
        function () {
            $(this)
            .css ({color: 'black'});
    });

    $('#navl')
    .click (
        function () {
            _.setNextVis (-1);
    });

    $('#navr')
    .click (
        function () {
            _.setNextVis (1);
    });


}; // end _.displayNav


//---------------------
_.displayPngFiles = (vals) => {
    
    _.curVis = 0;
    _.maxImages = vals.length - 1;
        // last val in vals is an empty string, so don't count it

    var weeks = {};
    var topics;

    _.ctI = [];
    _.topicsI = [];
    _.topicRefs = [];

    for (var i = 0; i < _.maxImages; i++) {

        var val = vals [i];
        
        var matched = val.match (/...(.*)\/.*?([a-zA-Z].*).png/);
        var loc = matched [1];
        var caption = matched [2];

        var divOb = {div: [
            {img: 0, src: val, alt: 'image is still uploading ... just a minute or two longer depending on your network bandwidth'},
            {br:0},
            {span: '    ' + loc, class: 'locheader'},
            {br:0},
            {br:0},
            {span: caption, class: 'caption'}
        ], id: 'j' + i, class: 'div700'};

        if (i !== 0) {

            divOb.class = 'novis';

        } // end if (i !=== 0)

        divOb.parent = _.idSlides;
        _.dpp (divOb);

        matched = loc.match (/W(\d)(.*?)\/(.*)/);

        var wid = 'W' + matched [1];
        var week = wid + matched [2];
        var topic = matched [3];

        if (!weeks.hasOwnProperty (week)) {

            _.displayRef (wid, week, i, 'week');
            weeks [week] = 1;
            topics = {};

        } // end if (!weeks.hasOwnProperty (week))

        var slideCount;
        if (!topics.hasOwnProperty (topic)) {

            var dispRef = _.displayRef (wid, topic, i, 'topic');
            _.topicRefs.push (dispRef);

            if (topic === '05_StorageEngineWiredTiger') {

                _.idSampleTopic = dispRef;

            } // end if (topic === '01_WelcomeWeek3')
        
            topics [topic] = 1;

            slideCount = 1;
            _.topicsI.push (slideCount);

        } else {

            slideCount++;
            _.topicsI [_.topicsI.length - 1] = slideCount;

        } // end if (!topics.hasOwnProperty (topic))
        
        _.ctI.push ([slideCount, _.topicsI.length - 1]);
        

    } // end for (var i = 0; i < vals; i++)

    _.setNextVis (0);

}; // end _.displayPngFiles 


//---------------------
_.displayRef = (wid, str, i, className) => {
    
    wid = '#' + wid;
    var ref = _.genId ();
    _.dpp ({div: 
        {div: str, 
         id: ref, 
         sl: i, 
         style: 'display:inline-block;'
     }, parent: wid, class: 'ref div700 ' + className});

    ref = '#' + ref;
    $(ref)
    .click (function () {
        var n = $(this).attr ('sl');
        _.setNextVis (n - _.curVis);
    })

    $(ref)
    .hover (
        function () {
            $(this)
            .css ({color: 'red'})
        },
        function (event) {
            var id = '#' + event.target.id;
            //var color = _.topicRef === id ? 'green' : 'black';

            $(this)
            //.css ({color: color})
            .css ({color: 'black'})
        }
    );

    return ref;

}; // end _.displayRef 


//---------------------
_.doSlideShow = (vals) => {

    _.layout ();
    _.displayNav ();
    _.displayPngFiles (vals);
    _.pi.createPopupDisplay ('#navr', 
        'Click Prev/Next Slide\n    -- or --\n(keyboard shortcuts)\nLeft/Right Arrow\nSpace/Backspace');
    _.pi.createPopupDisplay (_.idSampleTopic, 
        'Click to navigate directly\nto beginning of topic');
    _.pi.createPopupDisplay (_.idCurSlide, 
        'Current slide In topic/\nTotal slides in topic');

    $(_.IdHelp)
    .hover (function () {
        $(_.IdHelp)
        .css ({'background-color': '#ffa0a0'});

        _.pi.showPopups ();
    }, function () {
        $(_.IdHelp)
        .css ({'background-color': '#0e0'});

        _.pi.hidePopups ();
    });

}; // end _.doSlideShow 

//---------------------
_.keyFilter = (chob) => {
    //console.log ('chob: ' + JSON.stringify (chob) + '\n');

    var ch = chob.ch;
    if (ch === 'Right' || ch === ' ') {

        _.setNextVis (1);

    } else if (ch === 'Left' || ch === 'Backspace') {

        _.setNextVis (-1);

    } // end if (chob.ch === 'Right')


}; // end _.keyFilter 


//---------------------
_.layout = () => {

    var idContainer = _.dpp ({div: 0, class: 'container', style: 'width: auto; margin: 10px;', class: 'div700'});

    var idHelp = _.genId ();
    _.dpp ({div: 
        {h4: [
            'Slideshow M102: MongoDB for DBAs (Jan/Feb 2017)',
            {span: '?', id: idHelp, class: 'help'}
        ], class: 'header'}, 
        class: 'row div700', 
        parent: idContainer}
    );

    _.IdHelp = '#' + idHelp;

    _.idSlides = _.dpp ({div: 0, name: 'slides', class: 'row div700', parent: idContainer});

    var idNav = _.dpp ({div:0, name: 'nav', class: 'row div700', parent: idContainer});

    var idPgCtDiv = _.dpp ({div:0, class: 'col-sm-10', parent: idNav});

    _.idPageCt = _.dpp ({span: 0, parent: idPgCtDiv, class: 'pagect'});
    _.idNavPN = _.dpp ({div:0, class: 'col-sm-2', parent: idNav});
    
    var idTopicRows = _.dpp ({div:0, name: 'topicRows', parent: idContainer, style: 'top: -40px;', class: 'div700'});

    var idRow1 = _.dpp ({div: 0, name: 'topicRows1', class: 'row topicrows', parent: idTopicRows})
    var idRow2 = _.dpp ({div: 0, name: 'topicRows2', class: 'row topicrows', parent: idTopicRows})

    _.makeCols (0, idRow1);
    _.makeCols (4, idRow2);

}; // end _.layout


//---------------------
_.makeCols = (baseId, idRow) => {
    
    var cols = [];
    for (var i = 0; i < 4; i++) {

        var id = 'W' + (i + 1 + baseId);
        //cols.push ({div:id + 'W1_Introductionsjsjsjsj', id: id, class: 'cols col-sm-3', parent: idRow});
        cols.push ({div: 0, id: id, class: 'cols col-sm-3', parent: idRow});

    } // end for (var i = 0; i < 4; i++)

    _.dpp (cols);

}; // end _.makeCols 



//---------------------
_.setNextVis = (delta) => {

    var mdelta = delta >= 0 ? delta : _.maxImages + delta

    var nextVis = (_.curVis + mdelta) % _.maxImages;
    
    var idPrev = '#j' + _.curVis;
    var idNext = '#j' + nextVis;

    $(idPrev)
    .addClass ('novis');

    $(idNext)
    .removeClass ('novis');

    _.curVis = nextVis;

    var ctRef = _.ctI [nextVis];

    var slideI = ctRef [0];
    var topicIdx = ctRef [1];
    var totalInSection = _.topicsI [topicIdx];

    _.dpp ({empty: _.idPageCt});
    _.idCurSlide = _.dpp ({span: 'slide: ' + slideI + '/' + totalInSection, 
        parent: _.idPageCt,
        style: 'float: right;'});

    $(_.topicRef)
    .css (
        {'background-color': '#fff',
        'font-weight': 'normal'}
    );

    _.topicRef = _.topicRefs [topicIdx];

    $(_.topicRef)
    .css (
        {'background-color': '#d6ffd6',
        'font-weight': 'bold'}
    );

}; // end _.setNextVis 



// PUBLIC Properties/Methods
var P = {};

//---------------------
P.doAction = (msgOb) => {
    console.log ('msgOb: ' + JSON.stringify (msgOb) + '\n');
    
    var cmd = _.key1 (msgOb);
    var vals = msgOb [cmd];

    switch (cmd) {

        case 'ready':

            _.initStyle ();
            _.ws.toSrvr ({getPngFiles:1});
            break;

        case 'pngFiles':

            $('body')
            .empty ();

            _.doSlideShow (vals);
            
            break;

    } // end switch (cmd)
    
    

}; // end P.doAction 


// end PUBLIC section

_.init ();

return P;

};




},{"go-json2html":3,"go-key":4,"go-popinfo":5,"go-ws-client":7,"key1":8}],3:[function(require,module,exports){
// go-json2html/index.js

module.exports = (function () {

// PRIVATE Properties/Methods
var _ = {

    id: 0,
    primitiveTypesNotNull: {'string':1, 'undefined':1, 'number':1, 'boolean':1, 'symbol': 1},
        // since typeof null yields 'object', it's handled separately

}; // end PRIVATE properties


//---------------------
_.displayPageH = (parent, dispOb) => {
    
    if (dispOb === 0) {
        // case where no content is desired
        // to display an actual zero, make it a string:  "0"

        return;

    } // end if (dispOb === 0)
    
    var dispObType = typeof dispOb;
    var isPrimitive = _.primitiveTypesNotNull.hasOwnProperty (dispObType) || dispOb === null;

    if (isPrimitive) {

        Id = _.textMake (parent, dispOb, 'append');

    } else {
        
            // NE => Not Empty
        var isNEArray = Array.isArray (dispOb) && dispOb.length > 0;
        var isNEObject = !Array.isArray(dispOb) && dispObType == 'object' && Object.keys(dispOb).length > 0;
        
        var Id = null;
            // capital Id to indicate id with '#' prefixing it
    
        if (isNEObject) {
    
            if (dispOb.hasOwnProperty ('rm')) {

                var selector = dispOb.rm;
                $(selector)
                .remove ();

            } else if (dispOb.hasOwnProperty ('empty')) {

                var selector = dispOb.empty;
                $(selector)
                .empty ();

            } else if (dispOb.hasOwnProperty ('content')) {

                _.displayPageH (parent, dispOb.content);

            } else if (dispOb.hasOwnProperty ('attr')) {

                $(parent)
                .attr (dispOb.attr);

            } else {
                
                parent = dispOb.hasOwnProperty ('parent') ? dispOb.parent : parent;

                var attrs = {};
                var elementName = null;
                var content;
            
                var keys = Object.keys (dispOb);
                var insertLocation = 'append';
                for (var i = 0; i < keys.length; i++) {
        
                    var ky = keys [i];
        
                    var tagType = _.getTagType (ky);
        
                    var styleInHead = parent === 'head' && ky === 'style';
                        // style in head => html element
                        // style not in head => attribute of dispOb
                        
                    var tagNotStyle = tagType !== 0 && ky !== 'style';
        
                    if (tagNotStyle || styleInHead) {
        
                        elementName = ky;
                        content = dispOb [elementName];
        
                    } else {
                        
                        switch (ky) {
            
                            case 'parent':
                                    // do nothing -- Prevents 'parent' from becoming an attribute
                                break;
                            case 'prepend':
                            case 'append':
                            case 'before':
                            case 'after':
                                insertLocation = ky;
                                parent = dispOb [ky] === 1 ? parent : dispOb [ky];
                                    // if any of prepend, ... are specified, and the value is other
                                    // than a '1', override the parent value with that value
                                break;
            
                            default:
                                
                                attrs [ky] = dispOb [ky];
                                break;
            
                        } // end switch (ky)
        
                    } // end if (tagType !== 0)
        
                } // end for (var i = 0; i < keys; i++)
                
        
                if (!elementName) {
                    // error case -- set as text and display entire dispOb

                    elementName = 'text';
                    content = JSON.stringify (dispOb);

                } // end if (!elementName)
                
                if (elementName === 'text') {

                    Id = _.textMake (parent, content, insertLocation);

                } else {

                    Id = _.elementMake (elementName, parent, insertLocation, attrs);

                } // end if (elementName === 'text')
                
                
                if (Id !== null) {
                    // case for element not 'text'
                    
                    _.displayPageH (Id, content);

                } // end if (Id !== null)
                

            } // end if (dispOb.hasOwnProperty ('rm'))
            
    
        } else if (isNEArray) {
    
            for (var i = 0; i < dispOb.length; i++) {
    
                    // returned Id will be for last item in array
                    // useful to later add siblings with 'after' key
                Id = _.displayPageH (parent, dispOb [i]);
    
            } // end for (var i = 0; i < dispOb.length; i++)
    
        } else {
    
            Id = null;
                // case for dispOb as an empty object or empty array
    
        } // end if (isNEObject)

    } // end if (_.primitiveTypesNotNull.hasOwnProperty (dispObType))
    
        
    return Id;

}; // end _.displayPageH 

//---------------------
_.elementMake = (tag, parentOrSibl, insertLocation, attrs) => {
    
    var id;
    var attrKeys = Object.keys (attrs);
    var hasAttrs = attrKeys.length > 0;

    if (hasAttrs && attrs.hasOwnProperty ('id')) {

        id = attrs.id;

    } else {

        id = P.genId ();

    } // end if (hasAttrs)
    
    var Id = '#' + id;
    
    var divel = '<' + tag + ' id="' + id + '"';

    var tagtype = _.getTagType (tag);

    if (tagtype == 1) {

        divel += '>';

    } else {

        divel += '></' + tag + '>';

    } // end if (tagtype == 1)

    $(parentOrSibl)[insertLocation] (divel);
    
    if (hasAttrs) {
        
        $(Id)
        .attr (attrs);

    } // end if (hasAttrs)
    
    return Id;

}; // end _.elementMake

//---------------------
_.getTagType = (tag) => {

        // 1 => void elements, 2 => has content
    var tags = { area: 1, base: 1, br: 1, col: 1, embed: 1, hr: 1, img: 1, input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1, a: 2, abbr: 2, address: 2, article: 2, aside: 2, audio: 2, b: 2, bdi: 2, bdo: 2, blockquote: 2, body: 2, button: 2, canvas: 2, caption: 2, cite: 2, code: 2, colgroup: 2, datalist: 2, dd: 2, del: 2, details: 2, dfn: 2, dialog: 2, div: 2, dl: 2, dt: 2, em: 2, fieldset: 2, figcaption: 2, figure: 2, footer: 2, form: 2, h1: 2, h2: 2, h3: 2, h4: 2, h5: 2, h6: 2, head: 2, header: 2, hgroup: 2, html: 2, i: 2, iframe: 2, ins: 2, kbd: 2, label: 2, legend: 2, li: 2, map: 2, mark: 2, menu: 2, meter: 2, nav: 2, noscript: 2, object: 2, ol: 2, optgroup: 2, option: 2, output: 2, p: 2, pre: 2, progress: 2, q: 2, rp: 2, rt: 2, ruby: 2, s: 2, samp: 2, script: 2, section: 2, select: 2, small: 2, span: 2, strong: 2, style: 2, sub: 2, summary: 2, sup: 2, svg: 2, table: 2, tbody: 2, td: 2, textarea: 2, tfoot: 2, th: 2, thead: 2, time: 2, title: 2, tr: 2, u: 2, ul: 2, 'var': 2, video: 2};

    tags.text = 1;  // special tag:  uses _.makeText ()
    
    return tags.hasOwnProperty(tag) ? tags [tag] : 0;

}; // end _.getTagType 


//---------------------
_.textMake = (parent, primitive, location) => {
    
    if (typeof primitive === 'string') {
        
        var singlequote = '&#x0027;';
        var backslash = '&#x005c;';
        var doublequote = '&#x0022;';
        var lt = '&lt;';
        
        primitive = primitive.replace (/'/g, singlequote);
        primitive = primitive.replace (/"/g, doublequote);
        primitive = primitive.replace (/\\/g, backslash);
        primitive = primitive.replace (/</g, lt);

    } else if (typeof primitive === 'symbol') {

        primitive = 'symbol';
            // otherwise stringify would produce '{}' which is less useful

    } else {

        primitive = JSON.stringify (primitive);

    } // end if (typeof primitive === 'string')
    

    $(parent) [location] (primitive);

    return null;
        // text obs have no id's: only text is appended with no way to address it
        // if addressing is necessary, use span instead of text

}; // end _.textMake 



// PUBLIC Properties/Methods
var P = {};

//---------------------
P.displayPage = (dispOb) => {
    
    var parent = dispOb.hasOwnProperty ('parent') ? dispOb.parent : 'body';
        // if parent not found, append to body

    var Id = _.displayPageH (parent, dispOb);

    return Id;

}; // end P.displayPage 

//---------------------
P.genId = () => {

    var id = 'i' + _.id++;
    return id;

}; // end P.genId


// end PUBLIC section

return P;

}());




},{}],4:[function(require,module,exports){
// go-key/index.js

module.exports = function (jqSelector, reportShift, keyHandler) {

// PRIVATE Properties/Methods
var _ = {

    jqSelector: 'body',
    reportShift: false,
    keyHandler: console.log,

    kShift: false,
    kCtrl: false,
    kAlt: false,
    kCmd: false,
    kIgnore: false,
    whichShiftKeys: {16:1, 17:1, 18:1, 91:1, 92:1, 93:1, 224:1},

            // not printable or non-ascii block
    ctrlOrNonAscii: {
        8: 'Backspace',
        9: 'Tab',
        13: 'Enter',
        16: 'Shift',
        17: 'Ctrl',
        18: 'Alt',
        19: 'Pause-break',
        20: 'Caps-lock',
        27: 'Esc',
        32: ' ',  // Space
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'Left',
        38: 'Up',
        39: 'Right',
        40: 'Down',
        45: 'Insert',
        46: 'Delete',
        91: 'WindowsKeyLeft',
        92: 'WindowsKeyRight',
        93: 'WindowsOptionKey',
        96: '0',  // Numpad
        97: '1',  // Numpad
        98: '2',  // Numpad
        99: '3',  // Numpad
        100: '4',  // Numpad
        101: '5',  // Numpad
        102: '6',  // Numpad
        103: '7',  // Numpad
        104: '8',  // Numpad
        105: '9',  // Numpad
        106: '*',  // Numpad
        107: '+',  // Numpad
        109: '-',  // Numpad
        110: '.',  // Numpad
        111: '/',  // Numpad
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'Numlock',
        145: 'Scroll-lock',
        224: 'MacCmd',
    },
    
    
    //---------------------
    asciiUnShifted: {
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        59: ';',
        61: '=',
        65: 'a',
        66: 'b',
        67: 'c',
        68: 'd',
        69: 'e',
        70: 'f',
        71: 'g',
        72: 'h',
        73: 'i',
        74: 'j',
        75: 'k',
        76: 'l',
        77: 'm',
        78: 'n',
        79: 'o',
        80: 'p',
        81: 'q',
        82: 'r',
        83: 's',
        84: 't',
        85: 'u',
        86: 'v',
        87: 'w',
        88: 'x',
        89: 'y',
        90: 'z',
        173: '-',
        188: ',',
        190: '.',
        191: '/',
        192: '`',
        219: '[',
        220: "\\",
        221: ']',
        222: "'",
    186: ";",  // ditto for ';'
    187: "=",  // apparently, chrome thinks which is 187 for '=', but not firefox
    189: "-",  // ditto for '-'
    },
    
    
    //---------------------
    asciiShifted: {
        48: ')',
        49: '!',
        50: '@',
        51: '#',
        52: '$',
        53: '%',
        54: '^',
        55: '&',
        56: '*',
        57: '(',
        59: ':',
        61: '+',
        65: 'A',
        66: 'B',
        67: 'C',
        68: 'D',
        69: 'E',
        70: 'F',
        71: 'G',
        72: 'H',
        73: 'I',
        74: 'J',
        75: 'K',
        76: 'L',
        77: 'M',
        78: 'N',
        79: 'O',
        80: 'P',
        81: 'Q',
        82: 'R',
        83: 'S',
        84: 'T',
        85: 'U',
        86: 'V',
        87: 'W',
        88: 'X',
        89: 'Y',
        90: 'Z',
        173: '_',
        188: '<',
        190: '>',
        191: '?',
        192: '~',
        219: '{',
        220: '|',
        221: '}',
        222: '"',
    186: ":",  // ditto for ':'
    187: "+",  // ditto for '+'
    189: "_",  // ditto for '-'
    },


}; // end PRIVATE properties
//---------------------
_.init = () => {
    
    _.jqSelector = jqSelector ? jqSelector : 'body';
    _.reportShift = reportShift ? reportShift : false;
    _.keyHandler = keyHandler ? keyHandler : _.defaultHandler;

    P.setKeyUpDown ();

}; // end _.init

//---------------------
_.cKeyDown = (event, reportShift, callback) => {
    // returns ch object reflecting which shift keys were pressed down, ch and which values
    //
    // reportShift true => trigger callback for each keydown event of any key, 
    //                     including any shift key
    //     false => shift key event reported only when the next non-shift keydown event.
    //              So, callback is only triggered for non-shift key events
    
    var which = event.which;

        // never ignore 'Esc' key == 27
    if (_.kIgnore && which != 27) {

        return;

    } // end if (kIgnore)
    
    event.preventDefault();
    event.stopPropagation ();

    var isAShiftKey = true;
    switch (which) {

        case 16: 
            _.kShift = true;
            break;

        case 17: 
            _.kCtrl = true;
            break;

        case 18: 
            _.kAlt = true;
            break;

        case 91: 
        case 92: 
        case 93: 
        case 224:
            _.kCmd = true;
            break;

        default:
            isAShiftKey = false;
            break;

    }   

    if (isAShiftKey && !reportShift) {

        return;

    } // end if (isAShiftKey && !reportShift)
    
    var thisCh = _.getKeyDownCode (which);

    var chOb = ({
        shift: _.kShift,
        ctrl: _.kCtrl,
        alt: _.kAlt,
        macCmd: _.kCmd,
        which: which,
        ch: thisCh,
    });

    if (reportShift) {

        chOb.isAShiftKey = isAShiftKey;  
            // true if any of: shift, ctrl, alt, or macCmd are true
            // only relevant if reportShift is true

    } // end if (reportShift)

    callback (chOb);

}; // end _.cKeyDown 


//---------------------
_.cKeyUp = (event) => {
    

    if (_.kIgnore) {

        return;

    } // end if (kIgnore)
    
    event.preventDefault();
    event.stopPropagation ();

    var which = event.which;

    switch (which) {

        case 16: 
            _.kShift = false;
            return
        case 17: 
            _.kCtrl = false;
            return
        case 18: 
            _.kAlt = false;
            return
        case 91: 
        case 92: 
        case 93: 
        case 224: 
            _.kCmd = false;
            return
    }   

}; // end _.cKeyUp 

//---------------------
_.defaultHandler = (chOb) => {
    
    var chObS = JSON.stringify (chOb);
    console.log ('key._.defaultHandler.chOb: ' + chObS);

}; // end _.defaultHandler 



//---------------------
_.getKeyDownCode = (which) => {
    

    var ch;

    if (_.ctrlOrNonAscii.hasOwnProperty (which)) {

        ch = _.ctrlOrNonAscii [which];

    } else if (_.kShift && _.asciiShifted.hasOwnProperty (which)) {

        ch = _.asciiShifted [which];

    } else if (!_.kShift && _.asciiUnShifted.hasOwnProperty (which)) {

        ch = _.asciiUnShifted [which];

    } else {

        ch = null;

    } // end if 
    
    return ch;

}; // end _.getKeyDownCode 



//---------------------
_.initKeyDown = (jqSelector, reportShift, callback) => {
    
    $(jqSelector)
    .off('keydown')
    .keydown (function (event) {
        _.cKeyDown (event, reportShift, callback);
    })

}; // end _.initKeyDown 


//---------------------
_.initKeyUp = (jqSelector) => {
    
    $(jqSelector)
    .off('keyup')
    .keyup (function (event) {
        _.cKeyUp (event)
    })

}; // end _.initKeyUp 



// PUBLIC Properties/Methods
var P = {};

//---------------------
P.setKeyUpDown = () => {
    
    _.initKeyUp ('body');
    _.initKeyDown ('body', _.reportShift, _.keyHandler);

}; // end P.setKeyHandler

// end PUBLIC section

_.init ();

return P;

};


},{}],5:[function(require,module,exports){
// go-popinfo/index.js

module.exports = function (dp) {

// PRIVATE Properties/Methods
var _ = {
    dpp: dp.displayPage,
    genId: dp.genId,
    arrowSize: 10,

}; // end PRIVATE properties

_.init = () => {

    _.setPopupStyle ();
};

//---------------------
_.getPosDim = (jq) => {
    
    var res = {};

    var offset = $(jq).offset ();
    res.left = offset.left;
    res.top = offset.top;

    res.width = $(jq).width ();
    res.height = $(jq).height ();

    return res;

}; // end _.getPosDim 

//---------------------
_.setPopupStyle = () => {
    
    var as = _.arrowSize;

    var popupStyle = {style: 
    '.popup {' +
        'position: relative;' +
        'display: inline-block;' +
        'border: 1px solid blue;' +
        'border-radius: 4px;' +
        'background-color: #ebf2f2;' +
        'font-size: 12px;' +
    '}' +
    '.popupnovis {' +
        'visibility: hidden;' +
    '}' +
    '.arrow {' +
        'position: absolute;' +
        'display: inline-block;' +
        'width: 0;' +
        'height: 0;' +
        'border-style: solid;' +
        'box-sizing: border-box;' +
    '}' +
    '.arrowborder {' +
        'border-width: ' + (as - 1) + 'px;' +
        'border-color: blue transparent transparent transparent;' +
        'bottom: -' + (2*as - 2) + 'px;' +
    '}' +
    '.arrowfiller {' +
        'border-width: '+ (as - 2) + 'px;' +
        'border-color: #ebf2f2 transparent transparent transparent;' +
        'bottom: -' + (2*as - 4) + 'px;' +
        'z-index: 1;' +
    '}'
    , parent: 'head'};

    _.dpp (popupStyle);

}; // end _.setPopupStyle





// PUBLIC Properties/Methods
var P = {};

//---------------------
P.createPopupDisplay = (jqOb, dispstr, options) => {
    
    jqOb = typeof jqOb === 'string' ? $(jqOb) : jqOb;

    dispStrs = dispstr.split ('\n');

    var dispA = [];
    for (var i = 0; i < dispStrs.length; i++) {

        var dispStr = dispStrs [i];
        if (i > 0) {

            dispA.push ({br:0});

        } // end if (i > 0)
        
        dispA.push ({span: dispStr, style: 'display: inline-block;'});


    } // end for (var i = 0; i < dispStrs; i++)
    
    var dispOb = {div: dispA, style: 'margin: 2px;'};
    var posEl = _.getPosDim (jqOb);

        // forces div width to width of content
        // http://stackoverflow.com/questions/450903/how-to-make-div-not-larger-than-its-contents

    var idAb = _.genId ();
    var idAf = _.genId ();

    var divArrowBorder = {div: 0, id: idAb, class: 'arrow arrowborder'};
    var divArrowFiller = {div: 0, id: idAf, class: 'arrow arrowfiller'};

    idAb = '#' + idAb;
    idAf = '#' + idAf;

    var popOb = {div: [dispOb, divArrowBorder, divArrowFiller], class: 'popup'}
    var IdPopOb = _.dpp (popOb);
    var posPopup = _.getPosDim (IdPopOb);

    var topDO = posEl.top - posPopup.height - _.arrowSize;
    var leftDO = posEl.left + posEl.width/2 - posPopup.width/2;

    $(IdPopOb)
    .offset ({top: topDO, left: leftDO});

    var posAb = _.getPosDim (idAb);
    var posAf = _.getPosDim (idAf);

    var as = _.arrowSize;
    $(idAb)
    .offset ({top: posAb.top, left: leftDO + posPopup.width/2 - as/2 - 2});

    $(idAf)
    .offset ({top: posAf.top, left: leftDO + posPopup.width/2 + 1 - as/2 - 2});

    $(IdPopOb)
    .addClass ('popupnovis');

    return IdPopOb;
}; // end P.createPopupDisplay 

//---------------------
P.hidePopups = (Id) => {
    
    var sel = Id ? Id : '.popup';

    $(sel)
    .addClass ('popupnovis');


}; // end P.hidePopups


//---------------------
P.showPopups = (Id) => {
    
    var sel = Id ? Id : '.popup';

    $(sel)
    .removeClass ('popupnovis');


}; // end P.showPopups





// end PUBLIC section

_.init ();

return P;

};





},{}],6:[function(require,module,exports){
// go-util/index.js

module.exports = (function () {

    // PRIVATE Properties/Methods
var _ = {

    key1: require ('key1')

};  // end PRIVATE properties

//---------------------
_.ddsDoIt = (ob, toUnicode) => {
    // ob is array => returns same ob
    // ob is object => returns new ob
    
    var newOb;

    if (ob !== null && typeof ob === 'object' && !(ob.hasOwnProperty ('_bsontype') && ob._bsontype === 'ObjectID')) {

        if (Array.isArray (ob)) {

            for (var i = 0; i < ob.length; i++) {

                ob [i] = _.ddsDoIt (ob [i], toUnicode);

            } // end for (var i = 0; i < ob.length; i++)

            newOb = ob;

        } else {

            newOb = {};

            var keys = Object.keys (ob);
            for (var i = 0; i < keys.length; i++) {

                var key = keys [i];

                var val = ob[key];
    
                var newKey;

                if (toUnicode) {

                    newKey = key.replace (/\$/g, '\\uFF04');
                    newKey = newKey.replace (/\./g, '\\uFF0E');

                } else {

                    newKey = key.replace (/\\uFF04/g, '$');
                    newKey = newKey.replace (/\\uFF0E/g, '.');

                } // end if (toUnicode)
    
                newOb [newKey] = _.ddsDoIt (val, toUnicode);
    

            } // end for (var i = 0; i < keys; i++)
            
        } // end if (Array.isArray (ob))
        
            
    } else {

        newOb = ob;

    } // end if (ob === null || typeof ob !== 'object')


    return newOb;

};  // end _.ddsDoIt 


    // PUBLIC Properties/Methods
var P = {};


//---------------------
P.dollarDotSubUnicode = (ob) => {
    
    return _.ddsDoIt (ob, true);

};  // end dollarDotSubUnicode 


//---------------------
P.dollarDotSubUnicodeRestore = (ob) => {
    
    return _.ddsDoIt (ob, false);

};  // end dollarDotSubUnicodeRestore


//---------------------
P.pCheck = (p, pDefault) => {
    // ditches any parameters supplied in p that aren't present in pDefault
    // if a param is necessary to a routine, then it should be defined in pDefault
    
    var res = {};

    p = P.isOb (p) ? p : {};
    
    for (var key in pDefault) {

        res [key] = p.hasOwnProperty (key) ? p [key] : pDefault [key];
    }

    return res;

}; // end P.pCheck 


//---------------------
P.isOb = (ob) => {
    // returns true if ob is defined, not null, not an Array and of type object
    
    var res = typeof ob !== undefined &&
              ob !== null &&
              !Array.isArray (ob) &&
              typeof ob === 'object';

    return res;

}; // end P.isOb 


P.key1 = _.key1;

    // end PUBLIC section

return P;

}());




},{"key1":8}],7:[function(require,module,exports){
// go-ws-client/index.js

module.exports = function (ip, port, client, options) {

// PRIVATE Properties/Methods
var _ = {
    
    ip: ip,
    port: port,
    secureConnection: null,
    verbose: null,

    ut: require ('go-util'),
    pcheck: null,
    key1: null,

    wsServer: null

}; // end PRIVATE properties

//---------------------
_.init = () => {

    _.pcheck = _.ut.pCheck;
    _.key1 = _.ut.key1;

    var params = _.pcheck (options, {secureConnection: false,
        verbose: false});

    _.secureConnection = params.secureConnection;
    _.verbose = params.verbose;

    if (_.verbose) {

        console.log ('wsClient params: ' + JSON.stringify (params) + '\n');

    } // end if (_.verbose)
    
    _.tstCmds =  {ping: _.tstCmdPingResp};
    _.client = client ? client : _.reportMsgOb;

    var wsPrefix = _.secureConnection ? 'wss' : 'ws';
    var wsUrl = wsPrefix + '://' + _.ip + ':' + _.port;

    _.wsServer = new WebSocket (wsUrl);

    _.wsServer.onmessage = _.fromSrvr;
    _.wsServer.onclose = _.msgClose;
    _.wsServer.onerror = _.msgError;

}; // end _.init 


//---------------------
_.doCmd = (uMsgOb) => {

    var fromSrvr = JSON.stringify (uMsgOb);

    if (_.verbose) {
        
        console.log ('  ==> wsClient.fromSrvr: ' + fromSrvr);

    } // end if (_.verbose)
    
    uMsgOb = Array.isArray (uMsgOb) ? uMsgOb : [uMsgOb];

    for (var i = 0; i < uMsgOb.length; i++) {

        var msgOb = uMsgOb [i];

        var cmd = _.key1 (msgOb);
    
        if (_.tstCmds.hasOwnProperty (cmd)) {
    
            _.tstCmds [cmd] (msgOb [cmd]);
    
        } else {
    
            _.client (msgOb);
    
        } // end if (_.tstCmds.hasOwnProperty (cmd))
    
    } // end for (var i = 0; i < uMsgOb.length; i++)

}; // end _.doCmd 



//---------------------
_.doSend = (msg) => {

    if (_.verbose) {

        console.log ('_.doSend.msg: ' + msg + '\n');

    } // end if (_.verbose)
    
    _.wsServer.send (msg);

}; // end _.doSend 


//---------------------
_.fromSrvr = (event) => {
    
    var msg = event.data;

    if (_.verbose) {
        
        console.log ('_.fromSrvr.event.data: ' + msg);

    } // end if (_.verbose)
    
    _.doCmd (JSON.parse (msg).m);

}; // end _.fromSrvr 

//---------------------
_.msgClose = (event) => {
    
    console.log ('close event: ' + event.data);

}; // end _.msgClose 


//---------------------
_.msgError = (event) => {
    
    var eventMsg = event.data ? ' event.data: ' + event.data : "";
    
    var errMsg = 'wsClient msgError (Server is Down?)' + eventMsg;
    console.log (errMsg);

    $('body').prepend (errMsg);

}; // end _.msgClose 


//---------------------
_.reportMsgOb = (msgOb) => {
    
    console.log ('_.reportMsgOb.msgOb: ' + msgOb + '\n');

}; // end _.reportMsgOb 


//---------------------
_.tstCmdPingResp = (pingMsg) => {
    
    console.log ('ping: ' + pingMsg);
    return;

}; // end _.tstCmdPingResp 

_.init ();



// PUBLIC Properties/Methods
var p = {};

//---------------------
p.toSrvr = (msgOb) => {
    
    var msgObS = JSON.stringify ({m:msgOb});

    if (_.verbose) {

        console.log ('p.toSrvr.msgObS : ' + msgObS + '\n');

    } // end if (_.verbose)
    
    _.doSend (msgObS);

}; // end _.toSrvr 


return p;

};




},{"go-util":6}],8:[function(require,module,exports){
// key1.js

// key1 extracts the single key from an object 
// containing only one key/value pair
// and returns the string value for the key
// anything else passed to key1 returns null

module.exports = (function () {

//---------------------
var key1 = (ob) => {

    key = null;

    var uniqueKeyExists = typeof ob !== 'undefined' &&
                          ob !== null &&
                          !Array.isArray(ob) &&
                          typeof ob === 'object' &&
                          Object.keys(ob).length === 1;
    
    if (uniqueKeyExists) {
    
        var keys = Object.keys(ob);
        key = keys[0];
    
    } // end if (uniqueKeyExists)
    
    return key;
    
}; // end key1 

return key1;

}());

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NyYy9ub2RlX21vZHVsZXNfZ2xvYmFsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXgwLmpzIiwic2xpZGVTaG93LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLWpzb24yaHRtbC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby1rZXkvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tcG9waW5mby9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby11dGlsL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLXdzLWNsaWVudC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9rZXkxL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8vIGNtZHJJbml0LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG5fLmluaXQgPSAoKSA9PiB7XG4gICAgXG4gICAgdmFyIGMgPSByZXF1aXJlICgnLi9zbGlkZVNob3cuanMnKTtcbiAgICBuZXcgYyAoKTtcbn07XG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG4oZnVuY3Rpb24gKCkge1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkgKF8uaW5pdCk7XG5cbn0pICgpO1xuXG5cblxucmV0dXJuIFA7XG5cbn0pICgpO1xuXG5cblxuXG5cbiIsIi8vIHNsaWRlU2hvdy5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuXG4gICAgd3M6IHJlcXVpcmUgKCdnby13cy1jbGllbnQnKSxcbiAgICBrZXk6IHJlcXVpcmUgKCdnby1rZXknKSxcbiAgICBqMmg6IHJlcXVpcmUgKCdnby1qc29uMmh0bWwnKSxcbiAgICBwaTogcmVxdWlyZSAoJ2dvLXBvcGluZm8nKSxcbiAgICBrZXkxOiByZXF1aXJlICgna2V5MScpLFxuXG4gICAgZHBwOiBudWxsLFxuICAgIGN1clZpczogbnVsbCxcbiAgICBtYXhJbWFnZXM6IG51bGwsXG4gICAgaWRTbGlkZXM6IG51bGwsXG5cbiAgICBjdEk6IG51bGwsXG4gICAgdG9waWNzSTogbnVsbCxcbiAgICB0b3BpY1JlZnM6IG51bGwsXG4gICAgdG9waWNSZWY6IG51bGwsXG4gICAgaWROYXY6IG51bGwsXG4gICAgaWRQYWdlQ3Q6IG51bGwsXG4gICAgaWROYXZQTjpudWxsLFxuICAgIHNydkF3czogJzUyLjMzLjE3MC4yMSdcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG5fLmluaXQgPSAoKSA9PiB7XG5cbiAgICBfLmRwcCA9IF8uajJoLmRpc3BsYXlQYWdlO1xuICAgIF8uZ2VuSWQgPSBfLmoyaC5nZW5JZDtcblxuICAgIF8ucGkgPSBuZXcgXy5waSAoXy5qMmgpO1xuXG4gICAgdmFyICBndCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgLy92YXIgaXBTcmMgPSBndC5tYXRjaCAoLyhmaWxlKXwobG9jYWxob3N0KS8pID8gJzAuMC4wLjAnIDogXy5zcnZBd3M7XG4gICAgdmFyIGlwU3JjID0gXy5zcnZBd3M7XG4gICAgXy53cyA9IG5ldyBfLndzIChpcFNyYywgODAwMSwgUC5kb0FjdGlvbik7XG5cbiAgICBuZXcgXy5rZXkgKCdib2R5JywgZmFsc2UsIF8ua2V5RmlsdGVyKTtcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmluaXRTdHlsZSA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgc3R5bGUgPSB7c3R5bGU6XG4gICAgICAgIFwiYm9keSB7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tbGVmdDogMTVweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuY2FwdGlvbiB7XCIgK1xuICAgICAgICAgICAgXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMjBweDsgXCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogYWJzb2x1dGU7IFwiICtcbiAgICAgICAgICAgIFwiYm90dG9tOiA1MHB4OyBcIiArXG4gICAgICAgICAgICBcInRleHQtYWxpZ246IGNlbnRlcjtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiICtcbiAgICAgICAgICAgIFwibWF4LXdpZHRoOiA1MDBweDtcIiArXG4gICAgICAgICAgICBcIndvcmQtYnJlYWs6IGJyZWFrLWFsbDtcIiArXG4gICAgICAgICAgICBcImxlZnQ6IDA7XCIgK1xuICAgICAgICAgICAgXCJyaWdodDogMDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMCBhdXRvO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5oZWxwIHtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiAxNnB4O1wiICtcbiAgICAgICAgICAgIFwiaGVpZ2h0OiAxNnB4O1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAxNXB4O1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXItcmFkaXVzOiA4cHg7XCIgK1xuICAgICAgICAgICAgXCJmbG9hdDogcmlnaHQ7XCIgK1xuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiAjMGUwO1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmhlYWRlciB7XCIgK1xuICAgICAgICAgICAgXCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmRpdjcwMCB7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogNzAwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiaW1nIHtcIiArXG4gICAgICAgICAgICBcImhlaWdodDogNTAwcHg7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogNzAwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmNvbHMge1wiICtcbiAgICAgICAgICAgIFwicGFkZGluZy1yaWdodDogMHB4O1wiICtcbiAgICAgICAgICAgIFwicGFkZGluZy1sZWZ0OiAxMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5ub3ZpcyB7XCIgK1xuICAgICAgICAgICAgXCJkaXNwbGF5OiBub25lO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5uYXYge1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAzMHB4O1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IDkwMDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1sZWZ0OiAxMHB4O1wiICsgXG4gICAgICAgICAgICBcInBvc2l0aW9uOiByZWxhdGl2ZTtcIiArXG4gICAgICAgICAgICBcImZsb2F0OiByaWdodDtcIiArXG4gICAgICAgICAgICBcInRvcDogLTQwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnBhZ2VjdCB7XCIgK1xuICAgICAgICAgICAgXCJ0b3A6IC00MHB4O1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IHJlbGF0aXZlO1wiICtcbiAgICAgICAgICAgIFwiZmxvYXQ6IHJpZ2h0O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5yZWYge1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IGluaXRpYWw7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDExcHg7XCIgK1xuICAgICAgICAgICAgXCJ3b3JkLWJyZWFrOiBicmVhay1hbGw7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnRvcGljcm93cyB7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tOiAyMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5sb2NoZWFkZXIge1wiICtcbiAgICAgICAgICAgIFwiY29sb3I6IHJlZDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIud2VlayB7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgIFwifVwiLFxuICAgICAgICBwYXJlbnQ6ICdoZWFkJ307XG5cbiAgICAgICAgXy5kcHAgKHN0eWxlKTtcbiAgICAgIFxufTsgLy8gZW5kIF8uaW5pdFN0eWxlXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZGlzcGxheU5hdiA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgbmF2U3BhbnMgPSBbe3NwYW46ICc+JywgaWQ6ICduYXZyJywgY2xhc3M6ICduYXYnfSwgXG4gICAge3NwYW46ICc8JywgaWQ6ICduYXZsJywgY2xhc3M6ICduYXYnfV07XG5cbiAgICBuYXZTcGFucy5wYXJlbnQgPSBfLmlkTmF2UE47XG5cbiAgICBfLmRwcCAobmF2U3BhbnMpO1xuXG4gICAgJCgnI25hdmwsICNuYXZyJylcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgIH0pO1xuXG4gICAgJCgnI25hdmwnKVxuICAgIC5jbGljayAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF8uc2V0TmV4dFZpcyAoLTEpO1xuICAgIH0pO1xuXG4gICAgJCgnI25hdnInKVxuICAgIC5jbGljayAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF8uc2V0TmV4dFZpcyAoMSk7XG4gICAgfSk7XG5cblxufTsgLy8gZW5kIF8uZGlzcGxheU5hdlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRpc3BsYXlQbmdGaWxlcyA9ICh2YWxzKSA9PiB7XG4gICAgXG4gICAgXy5jdXJWaXMgPSAwO1xuICAgIF8ubWF4SW1hZ2VzID0gdmFscy5sZW5ndGggLSAxO1xuICAgICAgICAvLyBsYXN0IHZhbCBpbiB2YWxzIGlzIGFuIGVtcHR5IHN0cmluZywgc28gZG9uJ3QgY291bnQgaXRcblxuICAgIHZhciB3ZWVrcyA9IHt9O1xuICAgIHZhciB0b3BpY3M7XG5cbiAgICBfLmN0SSA9IFtdO1xuICAgIF8udG9waWNzSSA9IFtdO1xuICAgIF8udG9waWNSZWZzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF8ubWF4SW1hZ2VzOyBpKyspIHtcblxuICAgICAgICB2YXIgdmFsID0gdmFscyBbaV07XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2hlZCA9IHZhbC5tYXRjaCAoLy4uLiguKilcXC8uKj8oW2EtekEtWl0uKikucG5nLyk7XG4gICAgICAgIHZhciBsb2MgPSBtYXRjaGVkIFsxXTtcbiAgICAgICAgdmFyIGNhcHRpb24gPSBtYXRjaGVkIFsyXTtcblxuICAgICAgICB2YXIgZGl2T2IgPSB7ZGl2OiBbXG4gICAgICAgICAgICB7aW1nOiAwLCBzcmM6IHZhbCwgYWx0OiAnaW1hZ2UgaXMgc3RpbGwgdXBsb2FkaW5nIC4uLiBqdXN0IGEgbWludXRlIG9yIHR3byBsb25nZXIgZGVwZW5kaW5nIG9uIHlvdXIgbmV0d29yayBiYW5kd2lkdGgnfSxcbiAgICAgICAgICAgIHticjowfSxcbiAgICAgICAgICAgIHtzcGFuOiAnICAgICcgKyBsb2MsIGNsYXNzOiAnbG9jaGVhZGVyJ30sXG4gICAgICAgICAgICB7YnI6MH0sXG4gICAgICAgICAgICB7YnI6MH0sXG4gICAgICAgICAgICB7c3BhbjogY2FwdGlvbiwgY2xhc3M6ICdjYXB0aW9uJ31cbiAgICAgICAgXSwgaWQ6ICdqJyArIGksIGNsYXNzOiAnZGl2NzAwJ307XG5cbiAgICAgICAgaWYgKGkgIT09IDApIHtcblxuICAgICAgICAgICAgZGl2T2IuY2xhc3MgPSAnbm92aXMnO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChpICE9PT0gMClcblxuICAgICAgICBkaXZPYi5wYXJlbnQgPSBfLmlkU2xpZGVzO1xuICAgICAgICBfLmRwcCAoZGl2T2IpO1xuXG4gICAgICAgIG1hdGNoZWQgPSBsb2MubWF0Y2ggKC9XKFxcZCkoLio/KVxcLyguKikvKTtcblxuICAgICAgICB2YXIgd2lkID0gJ1cnICsgbWF0Y2hlZCBbMV07XG4gICAgICAgIHZhciB3ZWVrID0gd2lkICsgbWF0Y2hlZCBbMl07XG4gICAgICAgIHZhciB0b3BpYyA9IG1hdGNoZWQgWzNdO1xuXG4gICAgICAgIGlmICghd2Vla3MuaGFzT3duUHJvcGVydHkgKHdlZWspKSB7XG5cbiAgICAgICAgICAgIF8uZGlzcGxheVJlZiAod2lkLCB3ZWVrLCBpLCAnd2VlaycpO1xuICAgICAgICAgICAgd2Vla3MgW3dlZWtdID0gMTtcbiAgICAgICAgICAgIHRvcGljcyA9IHt9O1xuXG4gICAgICAgIH0gLy8gZW5kIGlmICghd2Vla3MuaGFzT3duUHJvcGVydHkgKHdlZWspKVxuXG4gICAgICAgIHZhciBzbGlkZUNvdW50O1xuICAgICAgICBpZiAoIXRvcGljcy5oYXNPd25Qcm9wZXJ0eSAodG9waWMpKSB7XG5cbiAgICAgICAgICAgIHZhciBkaXNwUmVmID0gXy5kaXNwbGF5UmVmICh3aWQsIHRvcGljLCBpLCAndG9waWMnKTtcbiAgICAgICAgICAgIF8udG9waWNSZWZzLnB1c2ggKGRpc3BSZWYpO1xuXG4gICAgICAgICAgICBpZiAodG9waWMgPT09ICcwNV9TdG9yYWdlRW5naW5lV2lyZWRUaWdlcicpIHtcblxuICAgICAgICAgICAgICAgIF8uaWRTYW1wbGVUb3BpYyA9IGRpc3BSZWY7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmICh0b3BpYyA9PT0gJzAxX1dlbGNvbWVXZWVrMycpXG4gICAgICAgIFxuICAgICAgICAgICAgdG9waWNzIFt0b3BpY10gPSAxO1xuXG4gICAgICAgICAgICBzbGlkZUNvdW50ID0gMTtcbiAgICAgICAgICAgIF8udG9waWNzSS5wdXNoIChzbGlkZUNvdW50KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBzbGlkZUNvdW50Kys7XG4gICAgICAgICAgICBfLnRvcGljc0kgW18udG9waWNzSS5sZW5ndGggLSAxXSA9IHNsaWRlQ291bnQ7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKCF0b3BpY3MuaGFzT3duUHJvcGVydHkgKHRvcGljKSlcbiAgICAgICAgXG4gICAgICAgIF8uY3RJLnB1c2ggKFtzbGlkZUNvdW50LCBfLnRvcGljc0kubGVuZ3RoIC0gMV0pO1xuICAgICAgICBcblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsczsgaSsrKVxuXG4gICAgXy5zZXROZXh0VmlzICgwKTtcblxufTsgLy8gZW5kIF8uZGlzcGxheVBuZ0ZpbGVzIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRpc3BsYXlSZWYgPSAod2lkLCBzdHIsIGksIGNsYXNzTmFtZSkgPT4ge1xuICAgIFxuICAgIHdpZCA9ICcjJyArIHdpZDtcbiAgICB2YXIgcmVmID0gXy5nZW5JZCAoKTtcbiAgICBfLmRwcCAoe2RpdjogXG4gICAgICAgIHtkaXY6IHN0ciwgXG4gICAgICAgICBpZDogcmVmLCBcbiAgICAgICAgIHNsOiBpLCBcbiAgICAgICAgIHN0eWxlOiAnZGlzcGxheTppbmxpbmUtYmxvY2s7J1xuICAgICB9LCBwYXJlbnQ6IHdpZCwgY2xhc3M6ICdyZWYgZGl2NzAwICcgKyBjbGFzc05hbWV9KTtcblxuICAgIHJlZiA9ICcjJyArIHJlZjtcbiAgICAkKHJlZilcbiAgICAuY2xpY2sgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG4gPSAkKHRoaXMpLmF0dHIgKCdzbCcpO1xuICAgICAgICBfLnNldE5leHRWaXMgKG4gLSBfLmN1clZpcyk7XG4gICAgfSlcblxuICAgICQocmVmKVxuICAgIC5ob3ZlciAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ3JlZCd9KVxuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBpZCA9ICcjJyArIGV2ZW50LnRhcmdldC5pZDtcbiAgICAgICAgICAgIC8vdmFyIGNvbG9yID0gXy50b3BpY1JlZiA9PT0gaWQgPyAnZ3JlZW4nIDogJ2JsYWNrJztcblxuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLy8uY3NzICh7Y29sb3I6IGNvbG9yfSlcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pXG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHJlZjtcblxufTsgLy8gZW5kIF8uZGlzcGxheVJlZiBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kb1NsaWRlU2hvdyA9ICh2YWxzKSA9PiB7XG5cbiAgICBfLmxheW91dCAoKTtcbiAgICBfLmRpc3BsYXlOYXYgKCk7XG4gICAgXy5kaXNwbGF5UG5nRmlsZXMgKHZhbHMpO1xuICAgIF8ucGkuY3JlYXRlUG9wdXBEaXNwbGF5ICgnI25hdnInLCBcbiAgICAgICAgJ0NsaWNrIFByZXYvTmV4dCBTbGlkZVxcbiAgICAtLSBvciAtLVxcbihrZXlib2FyZCBzaG9ydGN1dHMpXFxuTGVmdC9SaWdodCBBcnJvd1xcblNwYWNlL0JhY2tzcGFjZScpO1xuICAgIF8ucGkuY3JlYXRlUG9wdXBEaXNwbGF5IChfLmlkU2FtcGxlVG9waWMsIFxuICAgICAgICAnQ2xpY2sgdG8gbmF2aWdhdGUgZGlyZWN0bHlcXG50byBiZWdpbm5pbmcgb2YgdG9waWMnKTtcbiAgICBfLnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAoXy5pZEN1clNsaWRlLCBcbiAgICAgICAgJ0N1cnJlbnQgc2xpZGUgSW4gdG9waWMvXFxuVG90YWwgc2xpZGVzIGluIHRvcGljJyk7XG5cbiAgICAkKF8uSWRIZWxwKVxuICAgIC5ob3ZlciAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKF8uSWRIZWxwKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnI2ZmYTBhMCd9KTtcblxuICAgICAgICBfLnBpLnNob3dQb3B1cHMgKCk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKF8uSWRIZWxwKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnIzBlMCd9KTtcblxuICAgICAgICBfLnBpLmhpZGVQb3B1cHMgKCk7XG4gICAgfSk7XG5cbn07IC8vIGVuZCBfLmRvU2xpZGVTaG93IFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5rZXlGaWx0ZXIgPSAoY2hvYikgPT4ge1xuICAgIC8vY29uc29sZS5sb2cgKCdjaG9iOiAnICsgSlNPTi5zdHJpbmdpZnkgKGNob2IpICsgJ1xcbicpO1xuXG4gICAgdmFyIGNoID0gY2hvYi5jaDtcbiAgICBpZiAoY2ggPT09ICdSaWdodCcgfHwgY2ggPT09ICcgJykge1xuXG4gICAgICAgIF8uc2V0TmV4dFZpcyAoMSk7XG5cbiAgICB9IGVsc2UgaWYgKGNoID09PSAnTGVmdCcgfHwgY2ggPT09ICdCYWNrc3BhY2UnKSB7XG5cbiAgICAgICAgXy5zZXROZXh0VmlzICgtMSk7XG5cbiAgICB9IC8vIGVuZCBpZiAoY2hvYi5jaCA9PT0gJ1JpZ2h0JylcblxuXG59OyAvLyBlbmQgXy5rZXlGaWx0ZXIgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8ubGF5b3V0ID0gKCkgPT4ge1xuXG4gICAgdmFyIGlkQ29udGFpbmVyID0gXy5kcHAgKHtkaXY6IDAsIGNsYXNzOiAnY29udGFpbmVyJywgc3R5bGU6ICd3aWR0aDogYXV0bzsgbWFyZ2luOiAxMHB4OycsIGNsYXNzOiAnZGl2NzAwJ30pO1xuXG4gICAgdmFyIGlkSGVscCA9IF8uZ2VuSWQgKCk7XG4gICAgXy5kcHAgKHtkaXY6IFxuICAgICAgICB7aDQ6IFtcbiAgICAgICAgICAgICdTbGlkZXNob3cgTTEwMjogTW9uZ29EQiBmb3IgREJBcyAoSmFuL0ZlYiAyMDE3KScsXG4gICAgICAgICAgICB7c3BhbjogJz8nLCBpZDogaWRIZWxwLCBjbGFzczogJ2hlbHAnfVxuICAgICAgICBdLCBjbGFzczogJ2hlYWRlcid9LCBcbiAgICAgICAgY2xhc3M6ICdyb3cgZGl2NzAwJywgXG4gICAgICAgIHBhcmVudDogaWRDb250YWluZXJ9XG4gICAgKTtcblxuICAgIF8uSWRIZWxwID0gJyMnICsgaWRIZWxwO1xuXG4gICAgXy5pZFNsaWRlcyA9IF8uZHBwICh7ZGl2OiAwLCBuYW1lOiAnc2xpZGVzJywgY2xhc3M6ICdyb3cgZGl2NzAwJywgcGFyZW50OiBpZENvbnRhaW5lcn0pO1xuXG4gICAgdmFyIGlkTmF2ID0gXy5kcHAgKHtkaXY6MCwgbmFtZTogJ25hdicsIGNsYXNzOiAncm93IGRpdjcwMCcsIHBhcmVudDogaWRDb250YWluZXJ9KTtcblxuICAgIHZhciBpZFBnQ3REaXYgPSBfLmRwcCAoe2RpdjowLCBjbGFzczogJ2NvbC1zbS0xMCcsIHBhcmVudDogaWROYXZ9KTtcblxuICAgIF8uaWRQYWdlQ3QgPSBfLmRwcCAoe3NwYW46IDAsIHBhcmVudDogaWRQZ0N0RGl2LCBjbGFzczogJ3BhZ2VjdCd9KTtcbiAgICBfLmlkTmF2UE4gPSBfLmRwcCAoe2RpdjowLCBjbGFzczogJ2NvbC1zbS0yJywgcGFyZW50OiBpZE5hdn0pO1xuICAgIFxuICAgIHZhciBpZFRvcGljUm93cyA9IF8uZHBwICh7ZGl2OjAsIG5hbWU6ICd0b3BpY1Jvd3MnLCBwYXJlbnQ6IGlkQ29udGFpbmVyLCBzdHlsZTogJ3RvcDogLTQwcHg7JywgY2xhc3M6ICdkaXY3MDAnfSk7XG5cbiAgICB2YXIgaWRSb3cxID0gXy5kcHAgKHtkaXY6IDAsIG5hbWU6ICd0b3BpY1Jvd3MxJywgY2xhc3M6ICdyb3cgdG9waWNyb3dzJywgcGFyZW50OiBpZFRvcGljUm93c30pXG4gICAgdmFyIGlkUm93MiA9IF8uZHBwICh7ZGl2OiAwLCBuYW1lOiAndG9waWNSb3dzMicsIGNsYXNzOiAncm93IHRvcGljcm93cycsIHBhcmVudDogaWRUb3BpY1Jvd3N9KVxuXG4gICAgXy5tYWtlQ29scyAoMCwgaWRSb3cxKTtcbiAgICBfLm1ha2VDb2xzICg0LCBpZFJvdzIpO1xuXG59OyAvLyBlbmQgXy5sYXlvdXRcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5tYWtlQ29scyA9IChiYXNlSWQsIGlkUm93KSA9PiB7XG4gICAgXG4gICAgdmFyIGNvbHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuXG4gICAgICAgIHZhciBpZCA9ICdXJyArIChpICsgMSArIGJhc2VJZCk7XG4gICAgICAgIC8vY29scy5wdXNoICh7ZGl2OmlkICsgJ1cxX0ludHJvZHVjdGlvbnNqc2pzanNqJywgaWQ6IGlkLCBjbGFzczogJ2NvbHMgY29sLXNtLTMnLCBwYXJlbnQ6IGlkUm93fSk7XG4gICAgICAgIGNvbHMucHVzaCAoe2RpdjogMCwgaWQ6IGlkLCBjbGFzczogJ2NvbHMgY29sLXNtLTMnLCBwYXJlbnQ6IGlkUm93fSk7XG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKylcblxuICAgIF8uZHBwIChjb2xzKTtcblxufTsgLy8gZW5kIF8ubWFrZUNvbHMgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5zZXROZXh0VmlzID0gKGRlbHRhKSA9PiB7XG5cbiAgICB2YXIgbWRlbHRhID0gZGVsdGEgPj0gMCA/IGRlbHRhIDogXy5tYXhJbWFnZXMgKyBkZWx0YVxuXG4gICAgdmFyIG5leHRWaXMgPSAoXy5jdXJWaXMgKyBtZGVsdGEpICUgXy5tYXhJbWFnZXM7XG4gICAgXG4gICAgdmFyIGlkUHJldiA9ICcjaicgKyBfLmN1clZpcztcbiAgICB2YXIgaWROZXh0ID0gJyNqJyArIG5leHRWaXM7XG5cbiAgICAkKGlkUHJldilcbiAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJChpZE5leHQpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgIF8uY3VyVmlzID0gbmV4dFZpcztcblxuICAgIHZhciBjdFJlZiA9IF8uY3RJIFtuZXh0VmlzXTtcblxuICAgIHZhciBzbGlkZUkgPSBjdFJlZiBbMF07XG4gICAgdmFyIHRvcGljSWR4ID0gY3RSZWYgWzFdO1xuICAgIHZhciB0b3RhbEluU2VjdGlvbiA9IF8udG9waWNzSSBbdG9waWNJZHhdO1xuXG4gICAgXy5kcHAgKHtlbXB0eTogXy5pZFBhZ2VDdH0pO1xuICAgIF8uaWRDdXJTbGlkZSA9IF8uZHBwICh7c3BhbjogJ3NsaWRlOiAnICsgc2xpZGVJICsgJy8nICsgdG90YWxJblNlY3Rpb24sIFxuICAgICAgICBwYXJlbnQ6IF8uaWRQYWdlQ3QsXG4gICAgICAgIHN0eWxlOiAnZmxvYXQ6IHJpZ2h0Oyd9KTtcblxuICAgICQoXy50b3BpY1JlZilcbiAgICAuY3NzIChcbiAgICAgICAgeydiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZmYnLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiAnbm9ybWFsJ31cbiAgICApO1xuXG4gICAgXy50b3BpY1JlZiA9IF8udG9waWNSZWZzIFt0b3BpY0lkeF07XG5cbiAgICAkKF8udG9waWNSZWYpXG4gICAgLmNzcyAoXG4gICAgICAgIHsnYmFja2dyb3VuZC1jb2xvcic6ICcjZDZmZmQ2JyxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ2JvbGQnfVxuICAgICk7XG5cbn07IC8vIGVuZCBfLnNldE5leHRWaXMgXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kb0FjdGlvbiA9IChtc2dPYikgPT4ge1xuICAgIGNvbnNvbGUubG9nICgnbXNnT2I6ICcgKyBKU09OLnN0cmluZ2lmeSAobXNnT2IpICsgJ1xcbicpO1xuICAgIFxuICAgIHZhciBjbWQgPSBfLmtleTEgKG1zZ09iKTtcbiAgICB2YXIgdmFscyA9IG1zZ09iIFtjbWRdO1xuXG4gICAgc3dpdGNoIChjbWQpIHtcblxuICAgICAgICBjYXNlICdyZWFkeSc6XG5cbiAgICAgICAgICAgIF8uaW5pdFN0eWxlICgpO1xuICAgICAgICAgICAgXy53cy50b1NydnIgKHtnZXRQbmdGaWxlczoxfSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdwbmdGaWxlcyc6XG5cbiAgICAgICAgICAgICQoJ2JvZHknKVxuICAgICAgICAgICAgLmVtcHR5ICgpO1xuXG4gICAgICAgICAgICBfLmRvU2xpZGVTaG93ICh2YWxzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICB9IC8vIGVuZCBzd2l0Y2ggKGNtZClcbiAgICBcbiAgICBcblxufTsgLy8gZW5kIFAuZG9BY3Rpb24gXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbl8uaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG4iLCIvLyBnby1qc29uMmh0bWwvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIF8gPSB7XG5cbiAgICBpZDogMCxcbiAgICBwcmltaXRpdmVUeXBlc05vdE51bGw6IHsnc3RyaW5nJzoxLCAndW5kZWZpbmVkJzoxLCAnbnVtYmVyJzoxLCAnYm9vbGVhbic6MSwgJ3N5bWJvbCc6IDF9LFxuICAgICAgICAvLyBzaW5jZSB0eXBlb2YgbnVsbCB5aWVsZHMgJ29iamVjdCcsIGl0J3MgaGFuZGxlZCBzZXBhcmF0ZWx5XG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kaXNwbGF5UGFnZUggPSAocGFyZW50LCBkaXNwT2IpID0+IHtcbiAgICBcbiAgICBpZiAoZGlzcE9iID09PSAwKSB7XG4gICAgICAgIC8vIGNhc2Ugd2hlcmUgbm8gY29udGVudCBpcyBkZXNpcmVkXG4gICAgICAgIC8vIHRvIGRpc3BsYXkgYW4gYWN0dWFsIHplcm8sIG1ha2UgaXQgYSBzdHJpbmc6ICBcIjBcIlxuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChkaXNwT2IgPT09IDApXG4gICAgXG4gICAgdmFyIGRpc3BPYlR5cGUgPSB0eXBlb2YgZGlzcE9iO1xuICAgIHZhciBpc1ByaW1pdGl2ZSA9IF8ucHJpbWl0aXZlVHlwZXNOb3ROdWxsLmhhc093blByb3BlcnR5IChkaXNwT2JUeXBlKSB8fCBkaXNwT2IgPT09IG51bGw7XG5cbiAgICBpZiAoaXNQcmltaXRpdmUpIHtcblxuICAgICAgICBJZCA9IF8udGV4dE1ha2UgKHBhcmVudCwgZGlzcE9iLCAnYXBwZW5kJyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIE5FID0+IE5vdCBFbXB0eVxuICAgICAgICB2YXIgaXNORUFycmF5ID0gQXJyYXkuaXNBcnJheSAoZGlzcE9iKSAmJiBkaXNwT2IubGVuZ3RoID4gMDtcbiAgICAgICAgdmFyIGlzTkVPYmplY3QgPSAhQXJyYXkuaXNBcnJheShkaXNwT2IpICYmIGRpc3BPYlR5cGUgPT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMoZGlzcE9iKS5sZW5ndGggPiAwO1xuICAgICAgICBcbiAgICAgICAgdmFyIElkID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGNhcGl0YWwgSWQgdG8gaW5kaWNhdGUgaWQgd2l0aCAnIycgcHJlZml4aW5nIGl0XG4gICAgXG4gICAgICAgIGlmIChpc05FT2JqZWN0KSB7XG4gICAgXG4gICAgICAgICAgICBpZiAoZGlzcE9iLmhhc093blByb3BlcnR5ICgncm0nKSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gZGlzcE9iLnJtO1xuICAgICAgICAgICAgICAgICQoc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgLnJlbW92ZSAoKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdlbXB0eScpKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBkaXNwT2IuZW1wdHk7XG4gICAgICAgICAgICAgICAgJChzZWxlY3RvcilcbiAgICAgICAgICAgICAgICAuZW1wdHkgKCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzcE9iLmhhc093blByb3BlcnR5ICgnY29udGVudCcpKSB7XG5cbiAgICAgICAgICAgICAgICBfLmRpc3BsYXlQYWdlSCAocGFyZW50LCBkaXNwT2IuY29udGVudCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzcE9iLmhhc093blByb3BlcnR5ICgnYXR0cicpKSB7XG5cbiAgICAgICAgICAgICAgICAkKHBhcmVudClcbiAgICAgICAgICAgICAgICAuYXR0ciAoZGlzcE9iLmF0dHIpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBhcmVudCA9IGRpc3BPYi5oYXNPd25Qcm9wZXJ0eSAoJ3BhcmVudCcpID8gZGlzcE9iLnBhcmVudCA6IHBhcmVudDtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRycyA9IHt9O1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50TmFtZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzIChkaXNwT2IpO1xuICAgICAgICAgICAgICAgIHZhciBpbnNlcnRMb2NhdGlvbiA9ICdhcHBlbmQnO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGt5ID0ga2V5cyBbaV07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFnVHlwZSA9IF8uZ2V0VGFnVHlwZSAoa3kpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlSW5IZWFkID0gcGFyZW50ID09PSAnaGVhZCcgJiYga3kgPT09ICdzdHlsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdHlsZSBpbiBoZWFkID0+IGh0bWwgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3R5bGUgbm90IGluIGhlYWQgPT4gYXR0cmlidXRlIG9mIGRpc3BPYlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdOb3RTdHlsZSA9IHRhZ1R5cGUgIT09IDAgJiYga3kgIT09ICdzdHlsZSc7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGFnTm90U3R5bGUgfHwgc3R5bGVJbkhlYWQpIHtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50TmFtZSA9IGt5O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IGRpc3BPYiBbZWxlbWVudE5hbWVdO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChreSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFyZW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgLS0gUHJldmVudHMgJ3BhcmVudCcgZnJvbSBiZWNvbWluZyBhbiBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJlcGVuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdiZWZvcmUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FmdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0TG9jYXRpb24gPSBreTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gZGlzcE9iIFtreV0gPT09IDEgPyBwYXJlbnQgOiBkaXNwT2IgW2t5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFueSBvZiBwcmVwZW5kLCAuLi4gYXJlIHNwZWNpZmllZCwgYW5kIHRoZSB2YWx1ZSBpcyBvdGhlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhbiBhICcxJywgb3ZlcnJpZGUgdGhlIHBhcmVudCB2YWx1ZSB3aXRoIHRoYXQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnMgW2t5XSA9IGRpc3BPYiBba3ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSAvLyBlbmQgc3dpdGNoIChreSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gLy8gZW5kIGlmICh0YWdUeXBlICE9PSAwKVxuICAgICAgICBcbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGtleXM7IGkrKylcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBjYXNlIC0tIHNldCBhcyB0ZXh0IGFuZCBkaXNwbGF5IGVudGlyZSBkaXNwT2JcblxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50TmFtZSA9ICd0ZXh0JztcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5IChkaXNwT2IpO1xuXG4gICAgICAgICAgICAgICAgfSAvLyBlbmQgaWYgKCFlbGVtZW50TmFtZSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudE5hbWUgPT09ICd0ZXh0Jykge1xuXG4gICAgICAgICAgICAgICAgICAgIElkID0gXy50ZXh0TWFrZSAocGFyZW50LCBjb250ZW50LCBpbnNlcnRMb2NhdGlvbik7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIElkID0gXy5lbGVtZW50TWFrZSAoZWxlbWVudE5hbWUsIHBhcmVudCwgaW5zZXJ0TG9jYXRpb24sIGF0dHJzKTtcblxuICAgICAgICAgICAgICAgIH0gLy8gZW5kIGlmIChlbGVtZW50TmFtZSA9PT0gJ3RleHQnKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXNlIGZvciBlbGVtZW50IG5vdCAndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIF8uZGlzcGxheVBhZ2VIIChJZCwgY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBpZiAoSWQgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmIChkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdybScpKVxuICAgICAgICAgICAgXG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAoaXNORUFycmF5KSB7XG4gICAgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BPYi5sZW5ndGg7IGkrKykge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm5lZCBJZCB3aWxsIGJlIGZvciBsYXN0IGl0ZW0gaW4gYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlZnVsIHRvIGxhdGVyIGFkZCBzaWJsaW5ncyB3aXRoICdhZnRlcicga2V5XG4gICAgICAgICAgICAgICAgSWQgPSBfLmRpc3BsYXlQYWdlSCAocGFyZW50LCBkaXNwT2IgW2ldKTtcbiAgICBcbiAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcE9iLmxlbmd0aDsgaSsrKVxuICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgSWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgZm9yIGRpc3BPYiBhcyBhbiBlbXB0eSBvYmplY3Qgb3IgZW1wdHkgYXJyYXlcbiAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKGlzTkVPYmplY3QpXG5cbiAgICB9IC8vIGVuZCBpZiAoXy5wcmltaXRpdmVUeXBlc05vdE51bGwuaGFzT3duUHJvcGVydHkgKGRpc3BPYlR5cGUpKVxuICAgIFxuICAgICAgICBcbiAgICByZXR1cm4gSWQ7XG5cbn07IC8vIGVuZCBfLmRpc3BsYXlQYWdlSCBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZWxlbWVudE1ha2UgPSAodGFnLCBwYXJlbnRPclNpYmwsIGluc2VydExvY2F0aW9uLCBhdHRycykgPT4ge1xuICAgIFxuICAgIHZhciBpZDtcbiAgICB2YXIgYXR0cktleXMgPSBPYmplY3Qua2V5cyAoYXR0cnMpO1xuICAgIHZhciBoYXNBdHRycyA9IGF0dHJLZXlzLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoaGFzQXR0cnMgJiYgYXR0cnMuaGFzT3duUHJvcGVydHkgKCdpZCcpKSB7XG5cbiAgICAgICAgaWQgPSBhdHRycy5pZDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgaWQgPSBQLmdlbklkICgpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGhhc0F0dHJzKVxuICAgIFxuICAgIHZhciBJZCA9ICcjJyArIGlkO1xuICAgIFxuICAgIHZhciBkaXZlbCA9ICc8JyArIHRhZyArICcgaWQ9XCInICsgaWQgKyAnXCInO1xuXG4gICAgdmFyIHRhZ3R5cGUgPSBfLmdldFRhZ1R5cGUgKHRhZyk7XG5cbiAgICBpZiAodGFndHlwZSA9PSAxKSB7XG5cbiAgICAgICAgZGl2ZWwgKz0gJz4nO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBkaXZlbCArPSAnPjwvJyArIHRhZyArICc+JztcblxuICAgIH0gLy8gZW5kIGlmICh0YWd0eXBlID09IDEpXG5cbiAgICAkKHBhcmVudE9yU2libClbaW5zZXJ0TG9jYXRpb25dIChkaXZlbCk7XG4gICAgXG4gICAgaWYgKGhhc0F0dHJzKSB7XG4gICAgICAgIFxuICAgICAgICAkKElkKVxuICAgICAgICAuYXR0ciAoYXR0cnMpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGhhc0F0dHJzKVxuICAgIFxuICAgIHJldHVybiBJZDtcblxufTsgLy8gZW5kIF8uZWxlbWVudE1ha2VcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZ2V0VGFnVHlwZSA9ICh0YWcpID0+IHtcblxuICAgICAgICAvLyAxID0+IHZvaWQgZWxlbWVudHMsIDIgPT4gaGFzIGNvbnRlbnRcbiAgICB2YXIgdGFncyA9IHsgYXJlYTogMSwgYmFzZTogMSwgYnI6IDEsIGNvbDogMSwgZW1iZWQ6IDEsIGhyOiAxLCBpbWc6IDEsIGlucHV0OiAxLCBrZXlnZW46IDEsIGxpbms6IDEsIG1ldGE6IDEsIHBhcmFtOiAxLCBzb3VyY2U6IDEsIHRyYWNrOiAxLCB3YnI6IDEsIGE6IDIsIGFiYnI6IDIsIGFkZHJlc3M6IDIsIGFydGljbGU6IDIsIGFzaWRlOiAyLCBhdWRpbzogMiwgYjogMiwgYmRpOiAyLCBiZG86IDIsIGJsb2NrcXVvdGU6IDIsIGJvZHk6IDIsIGJ1dHRvbjogMiwgY2FudmFzOiAyLCBjYXB0aW9uOiAyLCBjaXRlOiAyLCBjb2RlOiAyLCBjb2xncm91cDogMiwgZGF0YWxpc3Q6IDIsIGRkOiAyLCBkZWw6IDIsIGRldGFpbHM6IDIsIGRmbjogMiwgZGlhbG9nOiAyLCBkaXY6IDIsIGRsOiAyLCBkdDogMiwgZW06IDIsIGZpZWxkc2V0OiAyLCBmaWdjYXB0aW9uOiAyLCBmaWd1cmU6IDIsIGZvb3RlcjogMiwgZm9ybTogMiwgaDE6IDIsIGgyOiAyLCBoMzogMiwgaDQ6IDIsIGg1OiAyLCBoNjogMiwgaGVhZDogMiwgaGVhZGVyOiAyLCBoZ3JvdXA6IDIsIGh0bWw6IDIsIGk6IDIsIGlmcmFtZTogMiwgaW5zOiAyLCBrYmQ6IDIsIGxhYmVsOiAyLCBsZWdlbmQ6IDIsIGxpOiAyLCBtYXA6IDIsIG1hcms6IDIsIG1lbnU6IDIsIG1ldGVyOiAyLCBuYXY6IDIsIG5vc2NyaXB0OiAyLCBvYmplY3Q6IDIsIG9sOiAyLCBvcHRncm91cDogMiwgb3B0aW9uOiAyLCBvdXRwdXQ6IDIsIHA6IDIsIHByZTogMiwgcHJvZ3Jlc3M6IDIsIHE6IDIsIHJwOiAyLCBydDogMiwgcnVieTogMiwgczogMiwgc2FtcDogMiwgc2NyaXB0OiAyLCBzZWN0aW9uOiAyLCBzZWxlY3Q6IDIsIHNtYWxsOiAyLCBzcGFuOiAyLCBzdHJvbmc6IDIsIHN0eWxlOiAyLCBzdWI6IDIsIHN1bW1hcnk6IDIsIHN1cDogMiwgc3ZnOiAyLCB0YWJsZTogMiwgdGJvZHk6IDIsIHRkOiAyLCB0ZXh0YXJlYTogMiwgdGZvb3Q6IDIsIHRoOiAyLCB0aGVhZDogMiwgdGltZTogMiwgdGl0bGU6IDIsIHRyOiAyLCB1OiAyLCB1bDogMiwgJ3Zhcic6IDIsIHZpZGVvOiAyfTtcblxuICAgIHRhZ3MudGV4dCA9IDE7ICAvLyBzcGVjaWFsIHRhZzogIHVzZXMgXy5tYWtlVGV4dCAoKVxuICAgIFxuICAgIHJldHVybiB0YWdzLmhhc093blByb3BlcnR5KHRhZykgPyB0YWdzIFt0YWddIDogMDtcblxufTsgLy8gZW5kIF8uZ2V0VGFnVHlwZSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy50ZXh0TWFrZSA9IChwYXJlbnQsIHByaW1pdGl2ZSwgbG9jYXRpb24pID0+IHtcbiAgICBcbiAgICBpZiAodHlwZW9mIHByaW1pdGl2ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBzaW5nbGVxdW90ZSA9ICcmI3gwMDI3Oyc7XG4gICAgICAgIHZhciBiYWNrc2xhc2ggPSAnJiN4MDA1YzsnO1xuICAgICAgICB2YXIgZG91YmxlcXVvdGUgPSAnJiN4MDAyMjsnO1xuICAgICAgICB2YXIgbHQgPSAnJmx0Oyc7XG4gICAgICAgIFxuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoLycvZywgc2luZ2xlcXVvdGUpO1xuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoL1wiL2csIGRvdWJsZXF1b3RlKTtcbiAgICAgICAgcHJpbWl0aXZlID0gcHJpbWl0aXZlLnJlcGxhY2UgKC9cXFxcL2csIGJhY2tzbGFzaCk7XG4gICAgICAgIHByaW1pdGl2ZSA9IHByaW1pdGl2ZS5yZXBsYWNlICgvPC9nLCBsdCk7XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcmltaXRpdmUgPT09ICdzeW1ib2wnKSB7XG5cbiAgICAgICAgcHJpbWl0aXZlID0gJ3N5bWJvbCc7XG4gICAgICAgICAgICAvLyBvdGhlcndpc2Ugc3RyaW5naWZ5IHdvdWxkIHByb2R1Y2UgJ3t9JyB3aGljaCBpcyBsZXNzIHVzZWZ1bFxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBwcmltaXRpdmUgPSBKU09OLnN0cmluZ2lmeSAocHJpbWl0aXZlKTtcblxuICAgIH0gLy8gZW5kIGlmICh0eXBlb2YgcHJpbWl0aXZlID09PSAnc3RyaW5nJylcbiAgICBcblxuICAgICQocGFyZW50KSBbbG9jYXRpb25dIChwcmltaXRpdmUpO1xuXG4gICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIHRleHQgb2JzIGhhdmUgbm8gaWQnczogb25seSB0ZXh0IGlzIGFwcGVuZGVkIHdpdGggbm8gd2F5IHRvIGFkZHJlc3MgaXRcbiAgICAgICAgLy8gaWYgYWRkcmVzc2luZyBpcyBuZWNlc3NhcnksIHVzZSBzcGFuIGluc3RlYWQgb2YgdGV4dFxuXG59OyAvLyBlbmQgXy50ZXh0TWFrZSBcblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmRpc3BsYXlQYWdlID0gKGRpc3BPYikgPT4ge1xuICAgIFxuICAgIHZhciBwYXJlbnQgPSBkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdwYXJlbnQnKSA/IGRpc3BPYi5wYXJlbnQgOiAnYm9keSc7XG4gICAgICAgIC8vIGlmIHBhcmVudCBub3QgZm91bmQsIGFwcGVuZCB0byBib2R5XG5cbiAgICB2YXIgSWQgPSBfLmRpc3BsYXlQYWdlSCAocGFyZW50LCBkaXNwT2IpO1xuXG4gICAgcmV0dXJuIElkO1xuXG59OyAvLyBlbmQgUC5kaXNwbGF5UGFnZSBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZ2VuSWQgPSAoKSA9PiB7XG5cbiAgICB2YXIgaWQgPSAnaScgKyBfLmlkKys7XG4gICAgcmV0dXJuIGlkO1xuXG59OyAvLyBlbmQgUC5nZW5JZFxuXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5yZXR1cm4gUDtcblxufSgpKTtcblxuXG5cbiIsIi8vIGdvLWtleS9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChqcVNlbGVjdG9yLCByZXBvcnRTaGlmdCwga2V5SGFuZGxlcikge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIF8gPSB7XG5cbiAgICBqcVNlbGVjdG9yOiAnYm9keScsXG4gICAgcmVwb3J0U2hpZnQ6IGZhbHNlLFxuICAgIGtleUhhbmRsZXI6IGNvbnNvbGUubG9nLFxuXG4gICAga1NoaWZ0OiBmYWxzZSxcbiAgICBrQ3RybDogZmFsc2UsXG4gICAga0FsdDogZmFsc2UsXG4gICAga0NtZDogZmFsc2UsXG4gICAga0lnbm9yZTogZmFsc2UsXG4gICAgd2hpY2hTaGlmdEtleXM6IHsxNjoxLCAxNzoxLCAxODoxLCA5MToxLCA5MjoxLCA5MzoxLCAyMjQ6MX0sXG5cbiAgICAgICAgICAgIC8vIG5vdCBwcmludGFibGUgb3Igbm9uLWFzY2lpIGJsb2NrXG4gICAgY3RybE9yTm9uQXNjaWk6IHtcbiAgICAgICAgODogJ0JhY2tzcGFjZScsXG4gICAgICAgIDk6ICdUYWInLFxuICAgICAgICAxMzogJ0VudGVyJyxcbiAgICAgICAgMTY6ICdTaGlmdCcsXG4gICAgICAgIDE3OiAnQ3RybCcsXG4gICAgICAgIDE4OiAnQWx0JyxcbiAgICAgICAgMTk6ICdQYXVzZS1icmVhaycsXG4gICAgICAgIDIwOiAnQ2Fwcy1sb2NrJyxcbiAgICAgICAgMjc6ICdFc2MnLFxuICAgICAgICAzMjogJyAnLCAgLy8gU3BhY2VcbiAgICAgICAgMzM6ICdQYWdlVXAnLFxuICAgICAgICAzNDogJ1BhZ2VEb3duJyxcbiAgICAgICAgMzU6ICdFbmQnLFxuICAgICAgICAzNjogJ0hvbWUnLFxuICAgICAgICAzNzogJ0xlZnQnLFxuICAgICAgICAzODogJ1VwJyxcbiAgICAgICAgMzk6ICdSaWdodCcsXG4gICAgICAgIDQwOiAnRG93bicsXG4gICAgICAgIDQ1OiAnSW5zZXJ0JyxcbiAgICAgICAgNDY6ICdEZWxldGUnLFxuICAgICAgICA5MTogJ1dpbmRvd3NLZXlMZWZ0JyxcbiAgICAgICAgOTI6ICdXaW5kb3dzS2V5UmlnaHQnLFxuICAgICAgICA5MzogJ1dpbmRvd3NPcHRpb25LZXknLFxuICAgICAgICA5NjogJzAnLCAgLy8gTnVtcGFkXG4gICAgICAgIDk3OiAnMScsICAvLyBOdW1wYWRcbiAgICAgICAgOTg6ICcyJywgIC8vIE51bXBhZFxuICAgICAgICA5OTogJzMnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMDogJzQnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMTogJzUnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMjogJzYnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMzogJzcnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNDogJzgnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNTogJzknLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNjogJyonLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNzogJysnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwOTogJy0nLCAgLy8gTnVtcGFkXG4gICAgICAgIDExMDogJy4nLCAgLy8gTnVtcGFkXG4gICAgICAgIDExMTogJy8nLCAgLy8gTnVtcGFkXG4gICAgICAgIDExMjogJ0YxJyxcbiAgICAgICAgMTEzOiAnRjInLFxuICAgICAgICAxMTQ6ICdGMycsXG4gICAgICAgIDExNTogJ0Y0JyxcbiAgICAgICAgMTE2OiAnRjUnLFxuICAgICAgICAxMTc6ICdGNicsXG4gICAgICAgIDExODogJ0Y3JyxcbiAgICAgICAgMTE5OiAnRjgnLFxuICAgICAgICAxMjA6ICdGOScsXG4gICAgICAgIDEyMTogJ0YxMCcsXG4gICAgICAgIDEyMjogJ0YxMScsXG4gICAgICAgIDEyMzogJ0YxMicsXG4gICAgICAgIDE0NDogJ051bWxvY2snLFxuICAgICAgICAxNDU6ICdTY3JvbGwtbG9jaycsXG4gICAgICAgIDIyNDogJ01hY0NtZCcsXG4gICAgfSxcbiAgICBcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGFzY2lpVW5TaGlmdGVkOiB7XG4gICAgICAgIDQ4OiAnMCcsXG4gICAgICAgIDQ5OiAnMScsXG4gICAgICAgIDUwOiAnMicsXG4gICAgICAgIDUxOiAnMycsXG4gICAgICAgIDUyOiAnNCcsXG4gICAgICAgIDUzOiAnNScsXG4gICAgICAgIDU0OiAnNicsXG4gICAgICAgIDU1OiAnNycsXG4gICAgICAgIDU2OiAnOCcsXG4gICAgICAgIDU3OiAnOScsXG4gICAgICAgIDU5OiAnOycsXG4gICAgICAgIDYxOiAnPScsXG4gICAgICAgIDY1OiAnYScsXG4gICAgICAgIDY2OiAnYicsXG4gICAgICAgIDY3OiAnYycsXG4gICAgICAgIDY4OiAnZCcsXG4gICAgICAgIDY5OiAnZScsXG4gICAgICAgIDcwOiAnZicsXG4gICAgICAgIDcxOiAnZycsXG4gICAgICAgIDcyOiAnaCcsXG4gICAgICAgIDczOiAnaScsXG4gICAgICAgIDc0OiAnaicsXG4gICAgICAgIDc1OiAnaycsXG4gICAgICAgIDc2OiAnbCcsXG4gICAgICAgIDc3OiAnbScsXG4gICAgICAgIDc4OiAnbicsXG4gICAgICAgIDc5OiAnbycsXG4gICAgICAgIDgwOiAncCcsXG4gICAgICAgIDgxOiAncScsXG4gICAgICAgIDgyOiAncicsXG4gICAgICAgIDgzOiAncycsXG4gICAgICAgIDg0OiAndCcsXG4gICAgICAgIDg1OiAndScsXG4gICAgICAgIDg2OiAndicsXG4gICAgICAgIDg3OiAndycsXG4gICAgICAgIDg4OiAneCcsXG4gICAgICAgIDg5OiAneScsXG4gICAgICAgIDkwOiAneicsXG4gICAgICAgIDE3MzogJy0nLFxuICAgICAgICAxODg6ICcsJyxcbiAgICAgICAgMTkwOiAnLicsXG4gICAgICAgIDE5MTogJy8nLFxuICAgICAgICAxOTI6ICdgJyxcbiAgICAgICAgMjE5OiAnWycsXG4gICAgICAgIDIyMDogXCJcXFxcXCIsXG4gICAgICAgIDIyMTogJ10nLFxuICAgICAgICAyMjI6IFwiJ1wiLFxuICAgIDE4NjogXCI7XCIsICAvLyBkaXR0byBmb3IgJzsnXG4gICAgMTg3OiBcIj1cIiwgIC8vIGFwcGFyZW50bHksIGNocm9tZSB0aGlua3Mgd2hpY2ggaXMgMTg3IGZvciAnPScsIGJ1dCBub3QgZmlyZWZveFxuICAgIDE4OTogXCItXCIsICAvLyBkaXR0byBmb3IgJy0nXG4gICAgfSxcbiAgICBcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGFzY2lpU2hpZnRlZDoge1xuICAgICAgICA0ODogJyknLFxuICAgICAgICA0OTogJyEnLFxuICAgICAgICA1MDogJ0AnLFxuICAgICAgICA1MTogJyMnLFxuICAgICAgICA1MjogJyQnLFxuICAgICAgICA1MzogJyUnLFxuICAgICAgICA1NDogJ14nLFxuICAgICAgICA1NTogJyYnLFxuICAgICAgICA1NjogJyonLFxuICAgICAgICA1NzogJygnLFxuICAgICAgICA1OTogJzonLFxuICAgICAgICA2MTogJysnLFxuICAgICAgICA2NTogJ0EnLFxuICAgICAgICA2NjogJ0InLFxuICAgICAgICA2NzogJ0MnLFxuICAgICAgICA2ODogJ0QnLFxuICAgICAgICA2OTogJ0UnLFxuICAgICAgICA3MDogJ0YnLFxuICAgICAgICA3MTogJ0cnLFxuICAgICAgICA3MjogJ0gnLFxuICAgICAgICA3MzogJ0knLFxuICAgICAgICA3NDogJ0onLFxuICAgICAgICA3NTogJ0snLFxuICAgICAgICA3NjogJ0wnLFxuICAgICAgICA3NzogJ00nLFxuICAgICAgICA3ODogJ04nLFxuICAgICAgICA3OTogJ08nLFxuICAgICAgICA4MDogJ1AnLFxuICAgICAgICA4MTogJ1EnLFxuICAgICAgICA4MjogJ1InLFxuICAgICAgICA4MzogJ1MnLFxuICAgICAgICA4NDogJ1QnLFxuICAgICAgICA4NTogJ1UnLFxuICAgICAgICA4NjogJ1YnLFxuICAgICAgICA4NzogJ1cnLFxuICAgICAgICA4ODogJ1gnLFxuICAgICAgICA4OTogJ1knLFxuICAgICAgICA5MDogJ1onLFxuICAgICAgICAxNzM6ICdfJyxcbiAgICAgICAgMTg4OiAnPCcsXG4gICAgICAgIDE5MDogJz4nLFxuICAgICAgICAxOTE6ICc/JyxcbiAgICAgICAgMTkyOiAnficsXG4gICAgICAgIDIxOTogJ3snLFxuICAgICAgICAyMjA6ICd8JyxcbiAgICAgICAgMjIxOiAnfScsXG4gICAgICAgIDIyMjogJ1wiJyxcbiAgICAxODY6IFwiOlwiLCAgLy8gZGl0dG8gZm9yICc6J1xuICAgIDE4NzogXCIrXCIsICAvLyBkaXR0byBmb3IgJysnXG4gICAgMTg5OiBcIl9cIiwgIC8vIGRpdHRvIGZvciAnLSdcbiAgICB9LFxuXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmluaXQgPSAoKSA9PiB7XG4gICAgXG4gICAgXy5qcVNlbGVjdG9yID0ganFTZWxlY3RvciA/IGpxU2VsZWN0b3IgOiAnYm9keSc7XG4gICAgXy5yZXBvcnRTaGlmdCA9IHJlcG9ydFNoaWZ0ID8gcmVwb3J0U2hpZnQgOiBmYWxzZTtcbiAgICBfLmtleUhhbmRsZXIgPSBrZXlIYW5kbGVyID8ga2V5SGFuZGxlciA6IF8uZGVmYXVsdEhhbmRsZXI7XG5cbiAgICBQLnNldEtleVVwRG93biAoKTtcblxufTsgLy8gZW5kIF8uaW5pdFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5jS2V5RG93biA9IChldmVudCwgcmVwb3J0U2hpZnQsIGNhbGxiYWNrKSA9PiB7XG4gICAgLy8gcmV0dXJucyBjaCBvYmplY3QgcmVmbGVjdGluZyB3aGljaCBzaGlmdCBrZXlzIHdlcmUgcHJlc3NlZCBkb3duLCBjaCBhbmQgd2hpY2ggdmFsdWVzXG4gICAgLy9cbiAgICAvLyByZXBvcnRTaGlmdCB0cnVlID0+IHRyaWdnZXIgY2FsbGJhY2sgZm9yIGVhY2gga2V5ZG93biBldmVudCBvZiBhbnkga2V5LCBcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGluZyBhbnkgc2hpZnQga2V5XG4gICAgLy8gICAgIGZhbHNlID0+IHNoaWZ0IGtleSBldmVudCByZXBvcnRlZCBvbmx5IHdoZW4gdGhlIG5leHQgbm9uLXNoaWZ0IGtleWRvd24gZXZlbnQuXG4gICAgLy8gICAgICAgICAgICAgIFNvLCBjYWxsYmFjayBpcyBvbmx5IHRyaWdnZXJlZCBmb3Igbm9uLXNoaWZ0IGtleSBldmVudHNcbiAgICBcbiAgICB2YXIgd2hpY2ggPSBldmVudC53aGljaDtcblxuICAgICAgICAvLyBuZXZlciBpZ25vcmUgJ0VzYycga2V5ID09IDI3XG4gICAgaWYgKF8ua0lnbm9yZSAmJiB3aGljaCAhPSAyNykge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChrSWdub3JlKVxuICAgIFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uICgpO1xuXG4gICAgdmFyIGlzQVNoaWZ0S2V5ID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKHdoaWNoKSB7XG5cbiAgICAgICAgY2FzZSAxNjogXG4gICAgICAgICAgICBfLmtTaGlmdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDE3OiBcbiAgICAgICAgICAgIF8ua0N0cmwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAxODogXG4gICAgICAgICAgICBfLmtBbHQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSA5MTogXG4gICAgICAgIGNhc2UgOTI6IFxuICAgICAgICBjYXNlIDkzOiBcbiAgICAgICAgY2FzZSAyMjQ6XG4gICAgICAgICAgICBfLmtDbWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGlzQVNoaWZ0S2V5ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcblxuICAgIH0gICBcblxuICAgIGlmIChpc0FTaGlmdEtleSAmJiAhcmVwb3J0U2hpZnQpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IC8vIGVuZCBpZiAoaXNBU2hpZnRLZXkgJiYgIXJlcG9ydFNoaWZ0KVxuICAgIFxuICAgIHZhciB0aGlzQ2ggPSBfLmdldEtleURvd25Db2RlICh3aGljaCk7XG5cbiAgICB2YXIgY2hPYiA9ICh7XG4gICAgICAgIHNoaWZ0OiBfLmtTaGlmdCxcbiAgICAgICAgY3RybDogXy5rQ3RybCxcbiAgICAgICAgYWx0OiBfLmtBbHQsXG4gICAgICAgIG1hY0NtZDogXy5rQ21kLFxuICAgICAgICB3aGljaDogd2hpY2gsXG4gICAgICAgIGNoOiB0aGlzQ2gsXG4gICAgfSk7XG5cbiAgICBpZiAocmVwb3J0U2hpZnQpIHtcblxuICAgICAgICBjaE9iLmlzQVNoaWZ0S2V5ID0gaXNBU2hpZnRLZXk7ICBcbiAgICAgICAgICAgIC8vIHRydWUgaWYgYW55IG9mOiBzaGlmdCwgY3RybCwgYWx0LCBvciBtYWNDbWQgYXJlIHRydWVcbiAgICAgICAgICAgIC8vIG9ubHkgcmVsZXZhbnQgaWYgcmVwb3J0U2hpZnQgaXMgdHJ1ZVxuXG4gICAgfSAvLyBlbmQgaWYgKHJlcG9ydFNoaWZ0KVxuXG4gICAgY2FsbGJhY2sgKGNoT2IpO1xuXG59OyAvLyBlbmQgXy5jS2V5RG93biBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5jS2V5VXAgPSAoZXZlbnQpID0+IHtcbiAgICBcblxuICAgIGlmIChfLmtJZ25vcmUpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IC8vIGVuZCBpZiAoa0lnbm9yZSlcbiAgICBcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbiAoKTtcblxuICAgIHZhciB3aGljaCA9IGV2ZW50LndoaWNoO1xuXG4gICAgc3dpdGNoICh3aGljaCkge1xuXG4gICAgICAgIGNhc2UgMTY6IFxuICAgICAgICAgICAgXy5rU2hpZnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBjYXNlIDE3OiBcbiAgICAgICAgICAgIF8ua0N0cmwgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBjYXNlIDE4OiBcbiAgICAgICAgICAgIF8ua0FsdCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGNhc2UgOTE6IFxuICAgICAgICBjYXNlIDkyOiBcbiAgICAgICAgY2FzZSA5MzogXG4gICAgICAgIGNhc2UgMjI0OiBcbiAgICAgICAgICAgIF8ua0NtZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgfSAgIFxuXG59OyAvLyBlbmQgXy5jS2V5VXAgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRlZmF1bHRIYW5kbGVyID0gKGNoT2IpID0+IHtcbiAgICBcbiAgICB2YXIgY2hPYlMgPSBKU09OLnN0cmluZ2lmeSAoY2hPYik7XG4gICAgY29uc29sZS5sb2cgKCdrZXkuXy5kZWZhdWx0SGFuZGxlci5jaE9iOiAnICsgY2hPYlMpO1xuXG59OyAvLyBlbmQgXy5kZWZhdWx0SGFuZGxlciBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmdldEtleURvd25Db2RlID0gKHdoaWNoKSA9PiB7XG4gICAgXG5cbiAgICB2YXIgY2g7XG5cbiAgICBpZiAoXy5jdHJsT3JOb25Bc2NpaS5oYXNPd25Qcm9wZXJ0eSAod2hpY2gpKSB7XG5cbiAgICAgICAgY2ggPSBfLmN0cmxPck5vbkFzY2lpIFt3aGljaF07XG5cbiAgICB9IGVsc2UgaWYgKF8ua1NoaWZ0ICYmIF8uYXNjaWlTaGlmdGVkLmhhc093blByb3BlcnR5ICh3aGljaCkpIHtcblxuICAgICAgICBjaCA9IF8uYXNjaWlTaGlmdGVkIFt3aGljaF07XG5cbiAgICB9IGVsc2UgaWYgKCFfLmtTaGlmdCAmJiBfLmFzY2lpVW5TaGlmdGVkLmhhc093blByb3BlcnR5ICh3aGljaCkpIHtcblxuICAgICAgICBjaCA9IF8uYXNjaWlVblNoaWZ0ZWQgW3doaWNoXTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY2ggPSBudWxsO1xuXG4gICAgfSAvLyBlbmQgaWYgXG4gICAgXG4gICAgcmV0dXJuIGNoO1xuXG59OyAvLyBlbmQgXy5nZXRLZXlEb3duQ29kZSBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmluaXRLZXlEb3duID0gKGpxU2VsZWN0b3IsIHJlcG9ydFNoaWZ0LCBjYWxsYmFjaykgPT4ge1xuICAgIFxuICAgICQoanFTZWxlY3RvcilcbiAgICAub2ZmKCdrZXlkb3duJylcbiAgICAua2V5ZG93biAoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF8uY0tleURvd24gKGV2ZW50LCByZXBvcnRTaGlmdCwgY2FsbGJhY2spO1xuICAgIH0pXG5cbn07IC8vIGVuZCBfLmluaXRLZXlEb3duIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmluaXRLZXlVcCA9IChqcVNlbGVjdG9yKSA9PiB7XG4gICAgXG4gICAgJChqcVNlbGVjdG9yKVxuICAgIC5vZmYoJ2tleXVwJylcbiAgICAua2V5dXAgKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBfLmNLZXlVcCAoZXZlbnQpXG4gICAgfSlcblxufTsgLy8gZW5kIF8uaW5pdEtleVVwIFxuXG5cblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuc2V0S2V5VXBEb3duID0gKCkgPT4ge1xuICAgIFxuICAgIF8uaW5pdEtleVVwICgnYm9keScpO1xuICAgIF8uaW5pdEtleURvd24gKCdib2R5JywgXy5yZXBvcnRTaGlmdCwgXy5rZXlIYW5kbGVyKTtcblxufTsgLy8gZW5kIFAuc2V0S2V5SGFuZGxlclxuXG4vLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuXy5pbml0ICgpO1xuXG5yZXR1cm4gUDtcblxufTtcblxuIiwiLy8gZ28tcG9waW5mby9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkcCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIF8gPSB7XG4gICAgZHBwOiBkcC5kaXNwbGF5UGFnZSxcbiAgICBnZW5JZDogZHAuZ2VuSWQsXG4gICAgYXJyb3dTaXplOiAxMCxcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG5fLmluaXQgPSAoKSA9PiB7XG5cbiAgICBfLnNldFBvcHVwU3R5bGUgKCk7XG59O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5nZXRQb3NEaW0gPSAoanEpID0+IHtcbiAgICBcbiAgICB2YXIgcmVzID0ge307XG5cbiAgICB2YXIgb2Zmc2V0ID0gJChqcSkub2Zmc2V0ICgpO1xuICAgIHJlcy5sZWZ0ID0gb2Zmc2V0LmxlZnQ7XG4gICAgcmVzLnRvcCA9IG9mZnNldC50b3A7XG5cbiAgICByZXMud2lkdGggPSAkKGpxKS53aWR0aCAoKTtcbiAgICByZXMuaGVpZ2h0ID0gJChqcSkuaGVpZ2h0ICgpO1xuXG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIF8uZ2V0UG9zRGltIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5zZXRQb3B1cFN0eWxlID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBhcyA9IF8uYXJyb3dTaXplO1xuXG4gICAgdmFyIHBvcHVwU3R5bGUgPSB7c3R5bGU6IFxuICAgICcucG9wdXAgeycgK1xuICAgICAgICAncG9zaXRpb246IHJlbGF0aXZlOycgK1xuICAgICAgICAnZGlzcGxheTogaW5saW5lLWJsb2NrOycgK1xuICAgICAgICAnYm9yZGVyOiAxcHggc29saWQgYmx1ZTsnICtcbiAgICAgICAgJ2JvcmRlci1yYWRpdXM6IDRweDsnICtcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3I6ICNlYmYyZjI7JyArXG4gICAgICAgICdmb250LXNpemU6IDEycHg7JyArXG4gICAgJ30nICtcbiAgICAnLnBvcHVwbm92aXMgeycgK1xuICAgICAgICAndmlzaWJpbGl0eTogaGlkZGVuOycgK1xuICAgICd9JyArXG4gICAgJy5hcnJvdyB7JyArXG4gICAgICAgICdwb3NpdGlvbjogYWJzb2x1dGU7JyArXG4gICAgICAgICdkaXNwbGF5OiBpbmxpbmUtYmxvY2s7JyArXG4gICAgICAgICd3aWR0aDogMDsnICtcbiAgICAgICAgJ2hlaWdodDogMDsnICtcbiAgICAgICAgJ2JvcmRlci1zdHlsZTogc29saWQ7JyArXG4gICAgICAgICdib3gtc2l6aW5nOiBib3JkZXItYm94OycgK1xuICAgICd9JyArXG4gICAgJy5hcnJvd2JvcmRlciB7JyArXG4gICAgICAgICdib3JkZXItd2lkdGg6ICcgKyAoYXMgLSAxKSArICdweDsnICtcbiAgICAgICAgJ2JvcmRlci1jb2xvcjogYmx1ZSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDsnICtcbiAgICAgICAgJ2JvdHRvbTogLScgKyAoMiphcyAtIDIpICsgJ3B4OycgK1xuICAgICd9JyArXG4gICAgJy5hcnJvd2ZpbGxlciB7JyArXG4gICAgICAgICdib3JkZXItd2lkdGg6ICcrIChhcyAtIDIpICsgJ3B4OycgK1xuICAgICAgICAnYm9yZGVyLWNvbG9yOiAjZWJmMmYyIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50OycgK1xuICAgICAgICAnYm90dG9tOiAtJyArICgyKmFzIC0gNCkgKyAncHg7JyArXG4gICAgICAgICd6LWluZGV4OiAxOycgK1xuICAgICd9J1xuICAgICwgcGFyZW50OiAnaGVhZCd9O1xuXG4gICAgXy5kcHAgKHBvcHVwU3R5bGUpO1xuXG59OyAvLyBlbmQgXy5zZXRQb3B1cFN0eWxlXG5cblxuXG5cblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuY3JlYXRlUG9wdXBEaXNwbGF5ID0gKGpxT2IsIGRpc3BzdHIsIG9wdGlvbnMpID0+IHtcbiAgICBcbiAgICBqcU9iID0gdHlwZW9mIGpxT2IgPT09ICdzdHJpbmcnID8gJChqcU9iKSA6IGpxT2I7XG5cbiAgICBkaXNwU3RycyA9IGRpc3BzdHIuc3BsaXQgKCdcXG4nKTtcblxuICAgIHZhciBkaXNwQSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcFN0cnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgZGlzcFN0ciA9IGRpc3BTdHJzIFtpXTtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG5cbiAgICAgICAgICAgIGRpc3BBLnB1c2ggKHticjowfSk7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGkgPiAwKVxuICAgICAgICBcbiAgICAgICAgZGlzcEEucHVzaCAoe3NwYW46IGRpc3BTdHIsIHN0eWxlOiAnZGlzcGxheTogaW5saW5lLWJsb2NrOyd9KTtcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwU3RyczsgaSsrKVxuICAgIFxuICAgIHZhciBkaXNwT2IgPSB7ZGl2OiBkaXNwQSwgc3R5bGU6ICdtYXJnaW46IDJweDsnfTtcbiAgICB2YXIgcG9zRWwgPSBfLmdldFBvc0RpbSAoanFPYik7XG5cbiAgICAgICAgLy8gZm9yY2VzIGRpdiB3aWR0aCB0byB3aWR0aCBvZiBjb250ZW50XG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDUwOTAzL2hvdy10by1tYWtlLWRpdi1ub3QtbGFyZ2VyLXRoYW4taXRzLWNvbnRlbnRzXG5cbiAgICB2YXIgaWRBYiA9IF8uZ2VuSWQgKCk7XG4gICAgdmFyIGlkQWYgPSBfLmdlbklkICgpO1xuXG4gICAgdmFyIGRpdkFycm93Qm9yZGVyID0ge2RpdjogMCwgaWQ6IGlkQWIsIGNsYXNzOiAnYXJyb3cgYXJyb3dib3JkZXInfTtcbiAgICB2YXIgZGl2QXJyb3dGaWxsZXIgPSB7ZGl2OiAwLCBpZDogaWRBZiwgY2xhc3M6ICdhcnJvdyBhcnJvd2ZpbGxlcid9O1xuXG4gICAgaWRBYiA9ICcjJyArIGlkQWI7XG4gICAgaWRBZiA9ICcjJyArIGlkQWY7XG5cbiAgICB2YXIgcG9wT2IgPSB7ZGl2OiBbZGlzcE9iLCBkaXZBcnJvd0JvcmRlciwgZGl2QXJyb3dGaWxsZXJdLCBjbGFzczogJ3BvcHVwJ31cbiAgICB2YXIgSWRQb3BPYiA9IF8uZHBwIChwb3BPYik7XG4gICAgdmFyIHBvc1BvcHVwID0gXy5nZXRQb3NEaW0gKElkUG9wT2IpO1xuXG4gICAgdmFyIHRvcERPID0gcG9zRWwudG9wIC0gcG9zUG9wdXAuaGVpZ2h0IC0gXy5hcnJvd1NpemU7XG4gICAgdmFyIGxlZnRETyA9IHBvc0VsLmxlZnQgKyBwb3NFbC53aWR0aC8yIC0gcG9zUG9wdXAud2lkdGgvMjtcblxuICAgICQoSWRQb3BPYilcbiAgICAub2Zmc2V0ICh7dG9wOiB0b3BETywgbGVmdDogbGVmdERPfSk7XG5cbiAgICB2YXIgcG9zQWIgPSBfLmdldFBvc0RpbSAoaWRBYik7XG4gICAgdmFyIHBvc0FmID0gXy5nZXRQb3NEaW0gKGlkQWYpO1xuXG4gICAgdmFyIGFzID0gXy5hcnJvd1NpemU7XG4gICAgJChpZEFiKVxuICAgIC5vZmZzZXQgKHt0b3A6IHBvc0FiLnRvcCwgbGVmdDogbGVmdERPICsgcG9zUG9wdXAud2lkdGgvMiAtIGFzLzIgLSAyfSk7XG5cbiAgICAkKGlkQWYpXG4gICAgLm9mZnNldCAoe3RvcDogcG9zQWYudG9wLCBsZWZ0OiBsZWZ0RE8gKyBwb3NQb3B1cC53aWR0aC8yICsgMSAtIGFzLzIgLSAyfSk7XG5cbiAgICAkKElkUG9wT2IpXG4gICAgLmFkZENsYXNzICgncG9wdXBub3ZpcycpO1xuXG4gICAgcmV0dXJuIElkUG9wT2I7XG59OyAvLyBlbmQgUC5jcmVhdGVQb3B1cERpc3BsYXkgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmhpZGVQb3B1cHMgPSAoSWQpID0+IHtcbiAgICBcbiAgICB2YXIgc2VsID0gSWQgPyBJZCA6ICcucG9wdXAnO1xuXG4gICAgJChzZWwpXG4gICAgLmFkZENsYXNzICgncG9wdXBub3ZpcycpO1xuXG5cbn07IC8vIGVuZCBQLmhpZGVQb3B1cHNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5zaG93UG9wdXBzID0gKElkKSA9PiB7XG4gICAgXG4gICAgdmFyIHNlbCA9IElkID8gSWQgOiAnLnBvcHVwJztcblxuICAgICQoc2VsKVxuICAgIC5yZW1vdmVDbGFzcyAoJ3BvcHVwbm92aXMnKTtcblxuXG59OyAvLyBlbmQgUC5zaG93UG9wdXBzXG5cblxuXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbl8uaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG5cbiIsIi8vIGdvLXV0aWwvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuXG4gICAga2V5MTogcmVxdWlyZSAoJ2tleTEnKVxuXG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kZHNEb0l0ID0gKG9iLCB0b1VuaWNvZGUpID0+IHtcbiAgICAvLyBvYiBpcyBhcnJheSA9PiByZXR1cm5zIHNhbWUgb2JcbiAgICAvLyBvYiBpcyBvYmplY3QgPT4gcmV0dXJucyBuZXcgb2JcbiAgICBcbiAgICB2YXIgbmV3T2I7XG5cbiAgICBpZiAob2IgIT09IG51bGwgJiYgdHlwZW9mIG9iID09PSAnb2JqZWN0JyAmJiAhKG9iLmhhc093blByb3BlcnR5ICgnX2Jzb250eXBlJykgJiYgb2IuX2Jzb250eXBlID09PSAnT2JqZWN0SUQnKSkge1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5IChvYikpIHtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYi5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgb2IgW2ldID0gXy5kZHNEb0l0IChvYiBbaV0sIHRvVW5pY29kZSk7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgb2IubGVuZ3RoOyBpKyspXG5cbiAgICAgICAgICAgIG5ld09iID0gb2I7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbmV3T2IgPSB7fTtcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyAob2IpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5cyBbaV07XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gb2Jba2V5XTtcbiAgICBcbiAgICAgICAgICAgICAgICB2YXIgbmV3S2V5O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRvVW5pY29kZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIG5ld0tleSA9IGtleS5yZXBsYWNlICgvXFwkL2csICdcXFxcdUZGMDQnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3S2V5ID0gbmV3S2V5LnJlcGxhY2UgKC9cXC4vZywgJ1xcXFx1RkYwRScpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBuZXdLZXkgPSBrZXkucmVwbGFjZSAoL1xcXFx1RkYwNC9nLCAnJCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXdLZXkgPSBuZXdLZXkucmVwbGFjZSAoL1xcXFx1RkYwRS9nLCAnLicpO1xuXG4gICAgICAgICAgICAgICAgfSAvLyBlbmQgaWYgKHRvVW5pY29kZSlcbiAgICBcbiAgICAgICAgICAgICAgICBuZXdPYiBbbmV3S2V5XSA9IF8uZGRzRG9JdCAodmFsLCB0b1VuaWNvZGUpO1xuICAgIFxuXG4gICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGtleXM7IGkrKylcbiAgICAgICAgICAgIFxuICAgICAgICB9IC8vIGVuZCBpZiAoQXJyYXkuaXNBcnJheSAob2IpKVxuICAgICAgICBcbiAgICAgICAgICAgIFxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgbmV3T2IgPSBvYjtcblxuICAgIH0gLy8gZW5kIGlmIChvYiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2IgIT09ICdvYmplY3QnKVxuXG5cbiAgICByZXR1cm4gbmV3T2I7XG5cbn07ICAvLyBlbmQgXy5kZHNEb0l0IFxuXG5cbiAgICAvLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmRvbGxhckRvdFN1YlVuaWNvZGUgPSAob2IpID0+IHtcbiAgICBcbiAgICByZXR1cm4gXy5kZHNEb0l0IChvYiwgdHJ1ZSk7XG5cbn07ICAvLyBlbmQgZG9sbGFyRG90U3ViVW5pY29kZSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kb2xsYXJEb3RTdWJVbmljb2RlUmVzdG9yZSA9IChvYikgPT4ge1xuICAgIFxuICAgIHJldHVybiBfLmRkc0RvSXQgKG9iLCBmYWxzZSk7XG5cbn07ICAvLyBlbmQgZG9sbGFyRG90U3ViVW5pY29kZVJlc3RvcmVcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5wQ2hlY2sgPSAocCwgcERlZmF1bHQpID0+IHtcbiAgICAvLyBkaXRjaGVzIGFueSBwYXJhbWV0ZXJzIHN1cHBsaWVkIGluIHAgdGhhdCBhcmVuJ3QgcHJlc2VudCBpbiBwRGVmYXVsdFxuICAgIC8vIGlmIGEgcGFyYW0gaXMgbmVjZXNzYXJ5IHRvIGEgcm91dGluZSwgdGhlbiBpdCBzaG91bGQgYmUgZGVmaW5lZCBpbiBwRGVmYXVsdFxuICAgIFxuICAgIHZhciByZXMgPSB7fTtcblxuICAgIHAgPSBQLmlzT2IgKHApID8gcCA6IHt9O1xuICAgIFxuICAgIGZvciAodmFyIGtleSBpbiBwRGVmYXVsdCkge1xuXG4gICAgICAgIHJlcyBba2V5XSA9IHAuaGFzT3duUHJvcGVydHkgKGtleSkgPyBwIFtrZXldIDogcERlZmF1bHQgW2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIFAucENoZWNrIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmlzT2IgPSAob2IpID0+IHtcbiAgICAvLyByZXR1cm5zIHRydWUgaWYgb2IgaXMgZGVmaW5lZCwgbm90IG51bGwsIG5vdCBhbiBBcnJheSBhbmQgb2YgdHlwZSBvYmplY3RcbiAgICBcbiAgICB2YXIgcmVzID0gdHlwZW9mIG9iICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgb2IgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkgKG9iKSAmJlxuICAgICAgICAgICAgICB0eXBlb2Ygb2IgPT09ICdvYmplY3QnO1xuXG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIFAuaXNPYiBcblxuXG5QLmtleTEgPSBfLmtleTE7XG5cbiAgICAvLyBlbmQgUFVCTElDIHNlY3Rpb25cblxucmV0dXJuIFA7XG5cbn0oKSk7XG5cblxuXG4iLCIvLyBnby13cy1jbGllbnQvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXAsIHBvcnQsIGNsaWVudCwgb3B0aW9ucykge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIF8gPSB7XG4gICAgXG4gICAgaXA6IGlwLFxuICAgIHBvcnQ6IHBvcnQsXG4gICAgc2VjdXJlQ29ubmVjdGlvbjogbnVsbCxcbiAgICB2ZXJib3NlOiBudWxsLFxuXG4gICAgdXQ6IHJlcXVpcmUgKCdnby11dGlsJyksXG4gICAgcGNoZWNrOiBudWxsLFxuICAgIGtleTE6IG51bGwsXG5cbiAgICB3c1NlcnZlcjogbnVsbFxuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmluaXQgPSAoKSA9PiB7XG5cbiAgICBfLnBjaGVjayA9IF8udXQucENoZWNrO1xuICAgIF8ua2V5MSA9IF8udXQua2V5MTtcblxuICAgIHZhciBwYXJhbXMgPSBfLnBjaGVjayAob3B0aW9ucywge3NlY3VyZUNvbm5lY3Rpb246IGZhbHNlLFxuICAgICAgICB2ZXJib3NlOiBmYWxzZX0pO1xuXG4gICAgXy5zZWN1cmVDb25uZWN0aW9uID0gcGFyYW1zLnNlY3VyZUNvbm5lY3Rpb247XG4gICAgXy52ZXJib3NlID0gcGFyYW1zLnZlcmJvc2U7XG5cbiAgICBpZiAoXy52ZXJib3NlKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2cgKCd3c0NsaWVudCBwYXJhbXM6ICcgKyBKU09OLnN0cmluZ2lmeSAocGFyYW1zKSArICdcXG4nKTtcblxuICAgIH0gLy8gZW5kIGlmIChfLnZlcmJvc2UpXG4gICAgXG4gICAgXy50c3RDbWRzID0gIHtwaW5nOiBfLnRzdENtZFBpbmdSZXNwfTtcbiAgICBfLmNsaWVudCA9IGNsaWVudCA/IGNsaWVudCA6IF8ucmVwb3J0TXNnT2I7XG5cbiAgICB2YXIgd3NQcmVmaXggPSBfLnNlY3VyZUNvbm5lY3Rpb24gPyAnd3NzJyA6ICd3cyc7XG4gICAgdmFyIHdzVXJsID0gd3NQcmVmaXggKyAnOi8vJyArIF8uaXAgKyAnOicgKyBfLnBvcnQ7XG5cbiAgICBfLndzU2VydmVyID0gbmV3IFdlYlNvY2tldCAod3NVcmwpO1xuXG4gICAgXy53c1NlcnZlci5vbm1lc3NhZ2UgPSBfLmZyb21TcnZyO1xuICAgIF8ud3NTZXJ2ZXIub25jbG9zZSA9IF8ubXNnQ2xvc2U7XG4gICAgXy53c1NlcnZlci5vbmVycm9yID0gXy5tc2dFcnJvcjtcblxufTsgLy8gZW5kIF8uaW5pdCBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kb0NtZCA9ICh1TXNnT2IpID0+IHtcblxuICAgIHZhciBmcm9tU3J2ciA9IEpTT04uc3RyaW5naWZ5ICh1TXNnT2IpO1xuXG4gICAgaWYgKF8udmVyYm9zZSkge1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cgKCcgID09PiB3c0NsaWVudC5mcm9tU3J2cjogJyArIGZyb21TcnZyKTtcblxuICAgIH0gLy8gZW5kIGlmIChfLnZlcmJvc2UpXG4gICAgXG4gICAgdU1zZ09iID0gQXJyYXkuaXNBcnJheSAodU1zZ09iKSA/IHVNc2dPYiA6IFt1TXNnT2JdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1TXNnT2IubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgbXNnT2IgPSB1TXNnT2IgW2ldO1xuXG4gICAgICAgIHZhciBjbWQgPSBfLmtleTEgKG1zZ09iKTtcbiAgICBcbiAgICAgICAgaWYgKF8udHN0Q21kcy5oYXNPd25Qcm9wZXJ0eSAoY21kKSkge1xuICAgIFxuICAgICAgICAgICAgXy50c3RDbWRzIFtjbWRdIChtc2dPYiBbY21kXSk7XG4gICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICBfLmNsaWVudCAobXNnT2IpO1xuICAgIFxuICAgICAgICB9IC8vIGVuZCBpZiAoXy50c3RDbWRzLmhhc093blByb3BlcnR5IChjbWQpKVxuICAgIFxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgdU1zZ09iLmxlbmd0aDsgaSsrKVxuXG59OyAvLyBlbmQgXy5kb0NtZCBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRvU2VuZCA9IChtc2cpID0+IHtcblxuICAgIGlmIChfLnZlcmJvc2UpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyAoJ18uZG9TZW5kLm1zZzogJyArIG1zZyArICdcXG4nKTtcblxuICAgIH0gLy8gZW5kIGlmIChfLnZlcmJvc2UpXG4gICAgXG4gICAgXy53c1NlcnZlci5zZW5kIChtc2cpO1xuXG59OyAvLyBlbmQgXy5kb1NlbmQgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZnJvbVNydnIgPSAoZXZlbnQpID0+IHtcbiAgICBcbiAgICB2YXIgbXNnID0gZXZlbnQuZGF0YTtcblxuICAgIGlmIChfLnZlcmJvc2UpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nICgnXy5mcm9tU3J2ci5ldmVudC5kYXRhOiAnICsgbXNnKTtcblxuICAgIH0gLy8gZW5kIGlmIChfLnZlcmJvc2UpXG4gICAgXG4gICAgXy5kb0NtZCAoSlNPTi5wYXJzZSAobXNnKS5tKTtcblxufTsgLy8gZW5kIF8uZnJvbVNydnIgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLm1zZ0Nsb3NlID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY29uc29sZS5sb2cgKCdjbG9zZSBldmVudDogJyArIGV2ZW50LmRhdGEpO1xuXG59OyAvLyBlbmQgXy5tc2dDbG9zZSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5tc2dFcnJvciA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIHZhciBldmVudE1zZyA9IGV2ZW50LmRhdGEgPyAnIGV2ZW50LmRhdGE6ICcgKyBldmVudC5kYXRhIDogXCJcIjtcbiAgICBcbiAgICB2YXIgZXJyTXNnID0gJ3dzQ2xpZW50IG1zZ0Vycm9yIChTZXJ2ZXIgaXMgRG93bj8pJyArIGV2ZW50TXNnO1xuICAgIGNvbnNvbGUubG9nIChlcnJNc2cpO1xuXG4gICAgJCgnYm9keScpLnByZXBlbmQgKGVyck1zZyk7XG5cbn07IC8vIGVuZCBfLm1zZ0Nsb3NlIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnJlcG9ydE1zZ09iID0gKG1zZ09iKSA9PiB7XG4gICAgXG4gICAgY29uc29sZS5sb2cgKCdfLnJlcG9ydE1zZ09iLm1zZ09iOiAnICsgbXNnT2IgKyAnXFxuJyk7XG5cbn07IC8vIGVuZCBfLnJlcG9ydE1zZ09iIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnRzdENtZFBpbmdSZXNwID0gKHBpbmdNc2cpID0+IHtcbiAgICBcbiAgICBjb25zb2xlLmxvZyAoJ3Bpbmc6ICcgKyBwaW5nTXNnKTtcbiAgICByZXR1cm47XG5cbn07IC8vIGVuZCBfLnRzdENtZFBpbmdSZXNwIFxuXG5fLmluaXQgKCk7XG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgcCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxucC50b1NydnIgPSAobXNnT2IpID0+IHtcbiAgICBcbiAgICB2YXIgbXNnT2JTID0gSlNPTi5zdHJpbmdpZnkgKHttOm1zZ09ifSk7XG5cbiAgICBpZiAoXy52ZXJib3NlKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2cgKCdwLnRvU3J2ci5tc2dPYlMgOiAnICsgbXNnT2JTICsgJ1xcbicpO1xuXG4gICAgfSAvLyBlbmQgaWYgKF8udmVyYm9zZSlcbiAgICBcbiAgICBfLmRvU2VuZCAobXNnT2JTKTtcblxufTsgLy8gZW5kIF8udG9TcnZyIFxuXG5cbnJldHVybiBwO1xuXG59O1xuXG5cblxuIiwiLy8ga2V5MS5qc1xuXG4vLyBrZXkxIGV4dHJhY3RzIHRoZSBzaW5nbGUga2V5IGZyb20gYW4gb2JqZWN0IFxuLy8gY29udGFpbmluZyBvbmx5IG9uZSBrZXkvdmFsdWUgcGFpclxuLy8gYW5kIHJldHVybnMgdGhlIHN0cmluZyB2YWx1ZSBmb3IgdGhlIGtleVxuLy8gYW55dGhpbmcgZWxzZSBwYXNzZWQgdG8ga2V5MSByZXR1cm5zIG51bGxcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxudmFyIGtleTEgPSAob2IpID0+IHtcblxuICAgIGtleSA9IG51bGw7XG5cbiAgICB2YXIgdW5pcXVlS2V5RXhpc3RzID0gdHlwZW9mIG9iICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvYiAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheShvYikgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG9iID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhvYikubGVuZ3RoID09PSAxO1xuICAgIFxuICAgIGlmICh1bmlxdWVLZXlFeGlzdHMpIHtcbiAgICBcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYik7XG4gICAgICAgIGtleSA9IGtleXNbMF07XG4gICAgXG4gICAgfSAvLyBlbmQgaWYgKHVuaXF1ZUtleUV4aXN0cylcbiAgICBcbiAgICByZXR1cm4ga2V5O1xuICAgIFxufTsgLy8gZW5kIGtleTEgXG5cbnJldHVybiBrZXkxO1xuXG59KCkpO1xuIl19
