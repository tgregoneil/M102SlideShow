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
    idNavPN: null,
    topicToVideo: null,
    slideToVideo: null,
    hiddenSlide: null,
    idVideoPlaying: null,
    srvAws: '52.33.170.21'

}; // end PRIVATE properties

_.init = () => {

    _.dpp = _.j2h.displayPage;
    _.genId = _.j2h.genId;

    _.pi = new _.pi (_.j2h);

    var  gt = window.location.href;

    var ipSrc = gt.match (/github/) ? _.srvAws : 'localhost';
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
            "cursor: pointer;" +
            "cursor: hand;" +
        "}" +
        ".header {" +
            "text-align: center;" +
            "position: relative;" +
        "}" +
        ".m10 {" +
            "margin: 10px;" +
        "}" +
        ".t40 {" +
            "top: -40px;" +
        "}" +
        ".prel {" +
            "position: relative;" +
        "}" +
        ".w700 {" +
            "width: 700px;" +
            "margin: 0 auto;" +
        "}" +
        ".imgvideo {" +
            "height: 500px;" +
            "width: 700px;" +
        "}" +
        ".imghomework {" +
            "height: 800px;" +
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
            "display: inline-block;" +
            "float: right;" +
            "cursor: pointer;" +
            "cursor: hand;" +
        "}" +
        ".navpos {" +
            "float: right;" +
        "}" +
        ".video {" +
            "font-weight: bold;" +
            "color: blue;" +
            "margin-right: 30px;" +
            "background-color: white;" +
            "cursor: pointer;" +
            "cursor: hand;" +
        "}" +
        ".ref {" +
            "width: initial;" +
            "font-size: 11px;" +
            "word-break: break-all;" +
        "}" +
        ".topicrows {" +
            "margin-bottom: 20px;" +
        "}" +
        ".row.topicrows > div {" +
            "border: 1px solid #ccc;" +
            "padding-right: 1px;" +
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
    _.slideToVideo = [];

    for (var i = 0; i < _.maxImages; i++) {

        var val = vals [i];

        var matched = val.match (/...(.*)\/.*?([a-zA-Z].*).png/);
        var loc = matched [1];
        var caption = matched [2];

        var imgClass = loc.match (/Homework|Final/) ? 'imghomework' : 'imgvideo';

        var divOb = {div: [
            {img: 0, src: val, class: imgClass, alt: 'image is still uploading ... just a minute or two longer depending on your network bandwidth'},
            {br:0},
            {span: '    ' + loc, class: 'locheader'},
            {br:0},
            {br:0},
            {span: caption, class: 'caption'}
        ], id: 'j' + i};

        if (i !== 0) {

            divOb.class = 'novis';

        } // end if (i !=== 0)

        divOb.parent = _.idSlides;
        _.dpp (divOb);

        matched = loc.match (/W(\d)(.*?)\/(.*)/);

        var wid = 'W' + matched [1];
        var week = wid + matched [2];
        var topic = matched [3];

        var videoTopic = wid + '-' + topic;
        _.slideToVideo.push (_.topicToVideo [videoTopic]);

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
         style: 'display:inline-block; cursor: pointer; cursor: hand;'
     }, parent: wid, class: 'ref w700 ' + className});

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

    $(_.idVideo)
    .hover (function () {
        $(this)
        .attr ({style: 'color: red;'})
    },
    function () {
        $(this)
        .attr ({style: 'color: blue'})
    })
    .click (_.playVideo);

    _.pi.createPopupDisplay ('#navr',
        'Click Prev/Next Slide\n    -- or --\n(keyboard shortcuts)\nLeft/Right Arrow\nSpace/Backspace');
    _.pi.createPopupDisplay (_.idSampleTopic,
        'Click to navigate directly\nto beginning of topic');
    _.pi.createPopupDisplay (_.idCurSlide,
        'Current slide In topic/\nTotal slides in topic');
    _.pi.createPopupDisplay (_.idVideo,
        'Click to start\nplaying lesson video');

    $(_.IdHelp)
    .hover (function () {
        $(this)
        .css ({'background-color': '#ffa0a0'});

        _.pi.showPopups ();
    }, function () {
        $(this)
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

    var idContainer = _.dpp ({div: 0, class: 'w700 m10'});

    var idHelp = _.genId ();
    _.dpp ({div:
        {h4: [
            'Slideshow M102: MongoDB for DBAs (Jan/Feb 2017)',
            {span: '?', id: idHelp, class: 'help'}
        ], class: 'header'},
        class: 'row w700',
        parent: idContainer}
    );

    _.IdHelp = '#' + idHelp;

    _.idSlides = _.dpp ({div: 0, name: 'slides', class: 'row w700 prel', parent: idContainer});

    var idNav = _.dpp ({div:0, name: 'nav', class: 'row w700 prel t40', parent: idContainer});

    var idVideoDiv = _.dpp ({div:0, class: 'col-sm-7', parent: idNav});
    _.idVideo = _.dpp ({span: 'Video', parent: idVideoDiv, class: 'navpos video'});

    _.idPageCt = _.dpp ({div:0, class: 'col-sm-2', parent: idNav});

    _.idNavPN = _.dpp ({div:0, class: 'col-sm-3', parent: idNav});

    var idTopicRows = _.dpp ({div:0, name: 'topicRows', parent: idContainer, class: 'w700 prel t40'});

    var idRow1 = _.dpp ({div: 0, name: 'topicRows1', class: 'row topicrows', parent: idTopicRows})
    var idRow2 = _.dpp ({div: 0, name: 'topicRows2', class: 'row topicrows', parent: idTopicRows})

    _.makeCols (0, idRow1, 4);
    _.makeCols (4, idRow2, 3);

}; // end _.layout


//---------------------
_.makeCols = (baseId, idRow, numCols) => {

    var cols = [];
    for (var i = 0; i < numCols; i++) {

        var id = 'W' + (i + 1 + baseId);
        //cols.push ({div:id + 'W1_Introductionsjsjsjsj', id: id, class: 'cols col-sm-3', parent: idRow});
        cols.push ({div: 0, id: id, class: 'cols col-sm-3', parent: idRow});

    } // end for (var i = 0; i < 4; i++)

    _.dpp (cols);

}; // end _.makeCols


//---------------------
_.playVideo = () => {

    _.hiddenSlide = '#j' + _.curVis;

    $(_.hiddenSlide + '> img')
    .addClass ('novis');

    $(_.hiddenSlide + '> .caption')
    .addClass ('novis');

    $(_.idVideo)
    .text ('Slide')
    .off ('click')
    .click (_.restoreSlide);

    var src = 'https://www.youtube.com/embed/' + _.slideToVideo [_.curVis] + '?autoplay=1';
    _.idVideoPlaying = _.dpp ({iframe: 0, src: src, class: 'imgvideo', parent: _.hiddenSlide, prepend: 1});

}; // end _.playVideo


//---------------------
_.restoreSlide = () => {

    $(_.idVideoPlaying)
    .remove ();

    $(_.hiddenSlide + '> img')
    .removeClass ('novis');

    $(_.hiddenSlide + '> .caption')
    .removeClass ('novis');

    $(_.idVideo)
    .text ('Video')
    .off ('click')
    .click (_.playVideo);

    _.hiddenSlide = null;

}; // end _.restoreSlide

//---------------------
_.setNextVis = (delta) => {

    if (_.hiddenSlide) {

        _.restoreSlide ();

    } // end if (_.hiddenSlide)

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
        class: 'navpos'});

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


//---------------------
_.topicToVideoId = (aTagA) => {

    _.topicToVideo = {};
    for (var i = 0; i < aTagA.length; i++) {

        var aTag = aTagA [i];
        var m = aTag.match (/.*youtu.be.([^"]+)">([^<]+)</);
        if (m) {

            var videoId = m [1];
            var topic = m [2];

            _.topicToVideo [topic] = videoId;

        } // end if (m)


    } // end for (var i = 0; i < aTagA; i++)


}; // end _.topicToVideoId



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
            _.ws.toSrvr ({getVideoLinks:1});
            break;

        case 'videoLinks':

            _.topicToVideoId (vals);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NyYy9ub2RlX21vZHVsZXNfZ2xvYmFsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXgwLmpzIiwic2xpZGVTaG93LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLWpzb24yaHRtbC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby1rZXkvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tcG9waW5mby9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby11dGlsL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLXdzLWNsaWVudC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9rZXkxL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeG1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vLyBjbWRySW5pdC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgXyA9IHtcbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxuXy5pbml0ID0gKCkgPT4ge1xuXG4gICAgdmFyIGMgPSByZXF1aXJlICgnLi9zbGlkZVNob3cuanMnKTtcbiAgICBuZXcgYyAoKTtcbn07XG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG4oZnVuY3Rpb24gKCkge1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkgKF8uaW5pdCk7XG5cbn0pICgpO1xuXG5cblxucmV0dXJuIFA7XG5cbn0pICgpO1xuXG5cblxuXG5cbiIsIi8vIHNsaWRlU2hvdy5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuXG4gICAgd3M6IHJlcXVpcmUgKCdnby13cy1jbGllbnQnKSxcbiAgICBrZXk6IHJlcXVpcmUgKCdnby1rZXknKSxcbiAgICBqMmg6IHJlcXVpcmUgKCdnby1qc29uMmh0bWwnKSxcbiAgICBwaTogcmVxdWlyZSAoJ2dvLXBvcGluZm8nKSxcbiAgICBrZXkxOiByZXF1aXJlICgna2V5MScpLFxuXG4gICAgZHBwOiBudWxsLFxuICAgIGN1clZpczogbnVsbCxcbiAgICBtYXhJbWFnZXM6IG51bGwsXG4gICAgaWRTbGlkZXM6IG51bGwsXG5cbiAgICBjdEk6IG51bGwsXG4gICAgdG9waWNzSTogbnVsbCxcbiAgICB0b3BpY1JlZnM6IG51bGwsXG4gICAgdG9waWNSZWY6IG51bGwsXG4gICAgaWROYXY6IG51bGwsXG4gICAgaWRQYWdlQ3Q6IG51bGwsXG4gICAgaWROYXZQTjogbnVsbCxcbiAgICB0b3BpY1RvVmlkZW86IG51bGwsXG4gICAgc2xpZGVUb1ZpZGVvOiBudWxsLFxuICAgIGhpZGRlblNsaWRlOiBudWxsLFxuICAgIGlkVmlkZW9QbGF5aW5nOiBudWxsLFxuICAgIHNydkF3czogJzUyLjMzLjE3MC4yMSdcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG5fLmluaXQgPSAoKSA9PiB7XG5cbiAgICBfLmRwcCA9IF8uajJoLmRpc3BsYXlQYWdlO1xuICAgIF8uZ2VuSWQgPSBfLmoyaC5nZW5JZDtcblxuICAgIF8ucGkgPSBuZXcgXy5waSAoXy5qMmgpO1xuXG4gICAgdmFyICBndCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgdmFyIGlwU3JjID0gZ3QubWF0Y2ggKC9naXRodWIvKSA/IF8uc3J2QXdzIDogJ2xvY2FsaG9zdCc7XG4gICAgXy53cyA9IG5ldyBfLndzIChpcFNyYywgODAwMSwgUC5kb0FjdGlvbik7XG5cbiAgICBuZXcgXy5rZXkgKCdib2R5JywgZmFsc2UsIF8ua2V5RmlsdGVyKTtcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmluaXRTdHlsZSA9ICgpID0+IHtcblxuICAgIHZhciBzdHlsZSA9IHtzdHlsZTpcbiAgICAgICAgXCJib2R5IHtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1sZWZ0OiAxNXB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5jYXB0aW9uIHtcIiArXG4gICAgICAgICAgICBcImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAyMHB4OyBcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiBhYnNvbHV0ZTsgXCIgK1xuICAgICAgICAgICAgXCJib3R0b206IDUwcHg7IFwiICtcbiAgICAgICAgICAgIFwidGV4dC1hbGlnbjogY2VudGVyO1wiICtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XCIgK1xuICAgICAgICAgICAgXCJtYXgtd2lkdGg6IDUwMHB4O1wiICtcbiAgICAgICAgICAgIFwid29yZC1icmVhazogYnJlYWstYWxsO1wiICtcbiAgICAgICAgICAgIFwibGVmdDogMDtcIiArXG4gICAgICAgICAgICBcInJpZ2h0OiAwO1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luOiAwIGF1dG87XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmhlbHAge1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDE2cHg7XCIgK1xuICAgICAgICAgICAgXCJoZWlnaHQ6IDE2cHg7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDE1cHg7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXI6IDFweCBzb2xpZCBibGFjaztcIiArXG4gICAgICAgICAgICBcImJvcmRlci1yYWRpdXM6IDhweDtcIiArXG4gICAgICAgICAgICBcImZsb2F0OiByaWdodDtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6ICMwZTA7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogcG9pbnRlcjtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogaGFuZDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuaGVhZGVyIHtcIiArXG4gICAgICAgICAgICBcInRleHQtYWxpZ246IGNlbnRlcjtcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiByZWxhdGl2ZTtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubTEwIHtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMTBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIudDQwIHtcIiArXG4gICAgICAgICAgICBcInRvcDogLTQwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnByZWwge1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IHJlbGF0aXZlO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi53NzAwIHtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiA3MDBweDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMCBhdXRvO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5pbWd2aWRlbyB7XCIgK1xuICAgICAgICAgICAgXCJoZWlnaHQ6IDUwMHB4O1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDcwMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5pbWdob21ld29yayB7XCIgK1xuICAgICAgICAgICAgXCJoZWlnaHQ6IDgwMHB4O1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDcwMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5jb2xzIHtcIiArXG4gICAgICAgICAgICBcInBhZGRpbmctcmlnaHQ6IDBweDtcIiArXG4gICAgICAgICAgICBcInBhZGRpbmctbGVmdDogMTBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubm92aXMge1wiICtcbiAgICAgICAgICAgIFwiZGlzcGxheTogbm9uZTtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubmF2IHtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMzBweDtcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiA5MDA7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tbGVmdDogMTBweDtcIiArXG4gICAgICAgICAgICBcImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiArXG4gICAgICAgICAgICBcImZsb2F0OiByaWdodDtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogcG9pbnRlcjtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogaGFuZDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubmF2cG9zIHtcIiArXG4gICAgICAgICAgICBcImZsb2F0OiByaWdodDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIudmlkZW8ge1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCIgK1xuICAgICAgICAgICAgXCJjb2xvcjogYmx1ZTtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1yaWdodDogMzBweDtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBwb2ludGVyO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBoYW5kO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5yZWYge1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IGluaXRpYWw7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDExcHg7XCIgK1xuICAgICAgICAgICAgXCJ3b3JkLWJyZWFrOiBicmVhay1hbGw7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnRvcGljcm93cyB7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tOiAyMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5yb3cudG9waWNyb3dzID4gZGl2IHtcIiArXG4gICAgICAgICAgICBcImJvcmRlcjogMXB4IHNvbGlkICNjY2M7XCIgK1xuICAgICAgICAgICAgXCJwYWRkaW5nLXJpZ2h0OiAxcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmxvY2hlYWRlciB7XCIgK1xuICAgICAgICAgICAgXCJjb2xvcjogcmVkO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi53ZWVrIHtcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiICtcbiAgICAgICAgXCJ9XCIsXG4gICAgICAgIHBhcmVudDogJ2hlYWQnfTtcblxuICAgICAgICBfLmRwcCAoc3R5bGUpO1xuXG59OyAvLyBlbmQgXy5pbml0U3R5bGVcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kaXNwbGF5TmF2ID0gKCkgPT4ge1xuXG4gICAgdmFyIG5hdlNwYW5zID0gW3tzcGFuOiAnPicsIGlkOiAnbmF2cicsIGNsYXNzOiAnbmF2J30sXG4gICAge3NwYW46ICc8JywgaWQ6ICduYXZsJywgY2xhc3M6ICduYXYnfV07XG5cbiAgICBuYXZTcGFucy5wYXJlbnQgPSBfLmlkTmF2UE47XG5cbiAgICBfLmRwcCAobmF2U3BhbnMpO1xuXG4gICAgJCgnI25hdmwsICNuYXZyJylcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgIH0pO1xuXG4gICAgJCgnI25hdmwnKVxuICAgIC5jbGljayAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF8uc2V0TmV4dFZpcyAoLTEpO1xuICAgIH0pO1xuXG4gICAgJCgnI25hdnInKVxuICAgIC5jbGljayAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF8uc2V0TmV4dFZpcyAoMSk7XG4gICAgfSk7XG5cblxufTsgLy8gZW5kIF8uZGlzcGxheU5hdlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRpc3BsYXlQbmdGaWxlcyA9ICh2YWxzKSA9PiB7XG5cbiAgICBfLmN1clZpcyA9IDA7XG4gICAgXy5tYXhJbWFnZXMgPSB2YWxzLmxlbmd0aCAtIDE7XG4gICAgICAgIC8vIGxhc3QgdmFsIGluIHZhbHMgaXMgYW4gZW1wdHkgc3RyaW5nLCBzbyBkb24ndCBjb3VudCBpdFxuXG4gICAgdmFyIHdlZWtzID0ge307XG4gICAgdmFyIHRvcGljcztcblxuICAgIF8uY3RJID0gW107XG4gICAgXy50b3BpY3NJID0gW107XG4gICAgXy50b3BpY1JlZnMgPSBbXTtcbiAgICBfLnNsaWRlVG9WaWRlbyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfLm1heEltYWdlczsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHZhbCA9IHZhbHMgW2ldO1xuXG4gICAgICAgIHZhciBtYXRjaGVkID0gdmFsLm1hdGNoICgvLi4uKC4qKVxcLy4qPyhbYS16QS1aXS4qKS5wbmcvKTtcbiAgICAgICAgdmFyIGxvYyA9IG1hdGNoZWQgWzFdO1xuICAgICAgICB2YXIgY2FwdGlvbiA9IG1hdGNoZWQgWzJdO1xuXG4gICAgICAgIHZhciBpbWdDbGFzcyA9IGxvYy5tYXRjaCAoL0hvbWV3b3JrfEZpbmFsLykgPyAnaW1naG9tZXdvcmsnIDogJ2ltZ3ZpZGVvJztcblxuICAgICAgICB2YXIgZGl2T2IgPSB7ZGl2OiBbXG4gICAgICAgICAgICB7aW1nOiAwLCBzcmM6IHZhbCwgY2xhc3M6IGltZ0NsYXNzLCBhbHQ6ICdpbWFnZSBpcyBzdGlsbCB1cGxvYWRpbmcgLi4uIGp1c3QgYSBtaW51dGUgb3IgdHdvIGxvbmdlciBkZXBlbmRpbmcgb24geW91ciBuZXR3b3JrIGJhbmR3aWR0aCd9LFxuICAgICAgICAgICAge2JyOjB9LFxuICAgICAgICAgICAge3NwYW46ICcgICAgJyArIGxvYywgY2xhc3M6ICdsb2NoZWFkZXInfSxcbiAgICAgICAgICAgIHticjowfSxcbiAgICAgICAgICAgIHticjowfSxcbiAgICAgICAgICAgIHtzcGFuOiBjYXB0aW9uLCBjbGFzczogJ2NhcHRpb24nfVxuICAgICAgICBdLCBpZDogJ2onICsgaX07XG5cbiAgICAgICAgaWYgKGkgIT09IDApIHtcblxuICAgICAgICAgICAgZGl2T2IuY2xhc3MgPSAnbm92aXMnO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChpICE9PT0gMClcblxuICAgICAgICBkaXZPYi5wYXJlbnQgPSBfLmlkU2xpZGVzO1xuICAgICAgICBfLmRwcCAoZGl2T2IpO1xuXG4gICAgICAgIG1hdGNoZWQgPSBsb2MubWF0Y2ggKC9XKFxcZCkoLio/KVxcLyguKikvKTtcblxuICAgICAgICB2YXIgd2lkID0gJ1cnICsgbWF0Y2hlZCBbMV07XG4gICAgICAgIHZhciB3ZWVrID0gd2lkICsgbWF0Y2hlZCBbMl07XG4gICAgICAgIHZhciB0b3BpYyA9IG1hdGNoZWQgWzNdO1xuXG4gICAgICAgIHZhciB2aWRlb1RvcGljID0gd2lkICsgJy0nICsgdG9waWM7XG4gICAgICAgIF8uc2xpZGVUb1ZpZGVvLnB1c2ggKF8udG9waWNUb1ZpZGVvIFt2aWRlb1RvcGljXSk7XG5cbiAgICAgICAgaWYgKCF3ZWVrcy5oYXNPd25Qcm9wZXJ0eSAod2VlaykpIHtcblxuICAgICAgICAgICAgXy5kaXNwbGF5UmVmICh3aWQsIHdlZWssIGksICd3ZWVrJyk7XG4gICAgICAgICAgICB3ZWVrcyBbd2Vla10gPSAxO1xuICAgICAgICAgICAgdG9waWNzID0ge307XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKCF3ZWVrcy5oYXNPd25Qcm9wZXJ0eSAod2VlaykpXG5cbiAgICAgICAgdmFyIHNsaWRlQ291bnQ7XG4gICAgICAgIGlmICghdG9waWNzLmhhc093blByb3BlcnR5ICh0b3BpYykpIHtcblxuICAgICAgICAgICAgdmFyIGRpc3BSZWYgPSBfLmRpc3BsYXlSZWYgKHdpZCwgdG9waWMsIGksICd0b3BpYycpO1xuICAgICAgICAgICAgXy50b3BpY1JlZnMucHVzaCAoZGlzcFJlZik7XG5cbiAgICAgICAgICAgIGlmICh0b3BpYyA9PT0gJzA1X1N0b3JhZ2VFbmdpbmVXaXJlZFRpZ2VyJykge1xuXG4gICAgICAgICAgICAgICAgXy5pZFNhbXBsZVRvcGljID0gZGlzcFJlZjtcblxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKHRvcGljID09PSAnMDFfV2VsY29tZVdlZWszJylcblxuICAgICAgICAgICAgdG9waWNzIFt0b3BpY10gPSAxO1xuXG4gICAgICAgICAgICBzbGlkZUNvdW50ID0gMTtcbiAgICAgICAgICAgIF8udG9waWNzSS5wdXNoIChzbGlkZUNvdW50KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBzbGlkZUNvdW50Kys7XG4gICAgICAgICAgICBfLnRvcGljc0kgW18udG9waWNzSS5sZW5ndGggLSAxXSA9IHNsaWRlQ291bnQ7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKCF0b3BpY3MuaGFzT3duUHJvcGVydHkgKHRvcGljKSlcblxuICAgICAgICBfLmN0SS5wdXNoIChbc2xpZGVDb3VudCwgXy50b3BpY3NJLmxlbmd0aCAtIDFdKTtcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWxzOyBpKyspXG5cbiAgICBfLnNldE5leHRWaXMgKDApO1xuXG59OyAvLyBlbmQgXy5kaXNwbGF5UG5nRmlsZXNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kaXNwbGF5UmVmID0gKHdpZCwgc3RyLCBpLCBjbGFzc05hbWUpID0+IHtcblxuICAgIHdpZCA9ICcjJyArIHdpZDtcbiAgICB2YXIgcmVmID0gXy5nZW5JZCAoKTtcbiAgICBfLmRwcCAoe2RpdjpcbiAgICAgICAge2Rpdjogc3RyLFxuICAgICAgICAgaWQ6IHJlZixcbiAgICAgICAgIHNsOiBpLFxuICAgICAgICAgc3R5bGU6ICdkaXNwbGF5OmlubGluZS1ibG9jazsgY3Vyc29yOiBwb2ludGVyOyBjdXJzb3I6IGhhbmQ7J1xuICAgICB9LCBwYXJlbnQ6IHdpZCwgY2xhc3M6ICdyZWYgdzcwMCAnICsgY2xhc3NOYW1lfSk7XG5cbiAgICByZWYgPSAnIycgKyByZWY7XG4gICAgJChyZWYpXG4gICAgLmNsaWNrIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuID0gJCh0aGlzKS5hdHRyICgnc2wnKTtcbiAgICAgICAgXy5zZXROZXh0VmlzIChuIC0gXy5jdXJWaXMpO1xuICAgIH0pXG5cbiAgICAkKHJlZilcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSlcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaWQgPSAnIycgKyBldmVudC50YXJnZXQuaWQ7XG4gICAgICAgICAgICAvL3ZhciBjb2xvciA9IF8udG9waWNSZWYgPT09IGlkID8gJ2dyZWVuJyA6ICdibGFjayc7XG5cbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC8vLmNzcyAoe2NvbG9yOiBjb2xvcn0pXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdibGFjayd9KVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIHJldHVybiByZWY7XG5cbn07IC8vIGVuZCBfLmRpc3BsYXlSZWZcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kb1NsaWRlU2hvdyA9ICh2YWxzKSA9PiB7XG5cbiAgICBfLmxheW91dCAoKTtcbiAgICBfLmRpc3BsYXlOYXYgKCk7XG4gICAgXy5kaXNwbGF5UG5nRmlsZXMgKHZhbHMpO1xuXG4gICAgJChfLmlkVmlkZW8pXG4gICAgLmhvdmVyIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmF0dHIgKHtzdHlsZTogJ2NvbG9yOiByZWQ7J30pXG4gICAgfSxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmF0dHIgKHtzdHlsZTogJ2NvbG9yOiBibHVlJ30pXG4gICAgfSlcbiAgICAuY2xpY2sgKF8ucGxheVZpZGVvKTtcblxuICAgIF8ucGkuY3JlYXRlUG9wdXBEaXNwbGF5ICgnI25hdnInLFxuICAgICAgICAnQ2xpY2sgUHJldi9OZXh0IFNsaWRlXFxuICAgIC0tIG9yIC0tXFxuKGtleWJvYXJkIHNob3J0Y3V0cylcXG5MZWZ0L1JpZ2h0IEFycm93XFxuU3BhY2UvQmFja3NwYWNlJyk7XG4gICAgXy5waS5jcmVhdGVQb3B1cERpc3BsYXkgKF8uaWRTYW1wbGVUb3BpYyxcbiAgICAgICAgJ0NsaWNrIHRvIG5hdmlnYXRlIGRpcmVjdGx5XFxudG8gYmVnaW5uaW5nIG9mIHRvcGljJyk7XG4gICAgXy5waS5jcmVhdGVQb3B1cERpc3BsYXkgKF8uaWRDdXJTbGlkZSxcbiAgICAgICAgJ0N1cnJlbnQgc2xpZGUgSW4gdG9waWMvXFxuVG90YWwgc2xpZGVzIGluIHRvcGljJyk7XG4gICAgXy5waS5jcmVhdGVQb3B1cERpc3BsYXkgKF8uaWRWaWRlbyxcbiAgICAgICAgJ0NsaWNrIHRvIHN0YXJ0XFxucGxheWluZyBsZXNzb24gdmlkZW8nKTtcblxuICAgICQoXy5JZEhlbHApXG4gICAgLmhvdmVyIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmNzcyAoeydiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZmEwYTAnfSk7XG5cbiAgICAgICAgXy5waS5zaG93UG9wdXBzICgpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnIzBlMCd9KTtcblxuICAgICAgICBfLnBpLmhpZGVQb3B1cHMgKCk7XG4gICAgfSk7XG5cbn07IC8vIGVuZCBfLmRvU2xpZGVTaG93XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmtleUZpbHRlciA9IChjaG9iKSA9PiB7XG4gICAgLy9jb25zb2xlLmxvZyAoJ2Nob2I6ICcgKyBKU09OLnN0cmluZ2lmeSAoY2hvYikgKyAnXFxuJyk7XG5cbiAgICB2YXIgY2ggPSBjaG9iLmNoO1xuICAgIGlmIChjaCA9PT0gJ1JpZ2h0JyB8fCBjaCA9PT0gJyAnKSB7XG5cbiAgICAgICAgXy5zZXROZXh0VmlzICgxKTtcblxuICAgIH0gZWxzZSBpZiAoY2ggPT09ICdMZWZ0JyB8fCBjaCA9PT0gJ0JhY2tzcGFjZScpIHtcblxuICAgICAgICBfLnNldE5leHRWaXMgKC0xKTtcblxuICAgIH0gLy8gZW5kIGlmIChjaG9iLmNoID09PSAnUmlnaHQnKVxuXG5cbn07IC8vIGVuZCBfLmtleUZpbHRlclxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmxheW91dCA9ICgpID0+IHtcblxuICAgIHZhciBpZENvbnRhaW5lciA9IF8uZHBwICh7ZGl2OiAwLCBjbGFzczogJ3c3MDAgbTEwJ30pO1xuXG4gICAgdmFyIGlkSGVscCA9IF8uZ2VuSWQgKCk7XG4gICAgXy5kcHAgKHtkaXY6XG4gICAgICAgIHtoNDogW1xuICAgICAgICAgICAgJ1NsaWRlc2hvdyBNMTAyOiBNb25nb0RCIGZvciBEQkFzIChKYW4vRmViIDIwMTcpJyxcbiAgICAgICAgICAgIHtzcGFuOiAnPycsIGlkOiBpZEhlbHAsIGNsYXNzOiAnaGVscCd9XG4gICAgICAgIF0sIGNsYXNzOiAnaGVhZGVyJ30sXG4gICAgICAgIGNsYXNzOiAncm93IHc3MDAnLFxuICAgICAgICBwYXJlbnQ6IGlkQ29udGFpbmVyfVxuICAgICk7XG5cbiAgICBfLklkSGVscCA9ICcjJyArIGlkSGVscDtcblxuICAgIF8uaWRTbGlkZXMgPSBfLmRwcCAoe2RpdjogMCwgbmFtZTogJ3NsaWRlcycsIGNsYXNzOiAncm93IHc3MDAgcHJlbCcsIHBhcmVudDogaWRDb250YWluZXJ9KTtcblxuICAgIHZhciBpZE5hdiA9IF8uZHBwICh7ZGl2OjAsIG5hbWU6ICduYXYnLCBjbGFzczogJ3JvdyB3NzAwIHByZWwgdDQwJywgcGFyZW50OiBpZENvbnRhaW5lcn0pO1xuXG4gICAgdmFyIGlkVmlkZW9EaXYgPSBfLmRwcCAoe2RpdjowLCBjbGFzczogJ2NvbC1zbS03JywgcGFyZW50OiBpZE5hdn0pO1xuICAgIF8uaWRWaWRlbyA9IF8uZHBwICh7c3BhbjogJ1ZpZGVvJywgcGFyZW50OiBpZFZpZGVvRGl2LCBjbGFzczogJ25hdnBvcyB2aWRlbyd9KTtcblxuICAgIF8uaWRQYWdlQ3QgPSBfLmRwcCAoe2RpdjowLCBjbGFzczogJ2NvbC1zbS0yJywgcGFyZW50OiBpZE5hdn0pO1xuXG4gICAgXy5pZE5hdlBOID0gXy5kcHAgKHtkaXY6MCwgY2xhc3M6ICdjb2wtc20tMycsIHBhcmVudDogaWROYXZ9KTtcblxuICAgIHZhciBpZFRvcGljUm93cyA9IF8uZHBwICh7ZGl2OjAsIG5hbWU6ICd0b3BpY1Jvd3MnLCBwYXJlbnQ6IGlkQ29udGFpbmVyLCBjbGFzczogJ3c3MDAgcHJlbCB0NDAnfSk7XG5cbiAgICB2YXIgaWRSb3cxID0gXy5kcHAgKHtkaXY6IDAsIG5hbWU6ICd0b3BpY1Jvd3MxJywgY2xhc3M6ICdyb3cgdG9waWNyb3dzJywgcGFyZW50OiBpZFRvcGljUm93c30pXG4gICAgdmFyIGlkUm93MiA9IF8uZHBwICh7ZGl2OiAwLCBuYW1lOiAndG9waWNSb3dzMicsIGNsYXNzOiAncm93IHRvcGljcm93cycsIHBhcmVudDogaWRUb3BpY1Jvd3N9KVxuXG4gICAgXy5tYWtlQ29scyAoMCwgaWRSb3cxLCA0KTtcbiAgICBfLm1ha2VDb2xzICg0LCBpZFJvdzIsIDMpO1xuXG59OyAvLyBlbmQgXy5sYXlvdXRcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5tYWtlQ29scyA9IChiYXNlSWQsIGlkUm93LCBudW1Db2xzKSA9PiB7XG5cbiAgICB2YXIgY29scyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQ29sczsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGlkID0gJ1cnICsgKGkgKyAxICsgYmFzZUlkKTtcbiAgICAgICAgLy9jb2xzLnB1c2ggKHtkaXY6aWQgKyAnVzFfSW50cm9kdWN0aW9uc2pzanNqc2onLCBpZDogaWQsIGNsYXNzOiAnY29scyBjb2wtc20tMycsIHBhcmVudDogaWRSb3d9KTtcbiAgICAgICAgY29scy5wdXNoICh7ZGl2OiAwLCBpZDogaWQsIGNsYXNzOiAnY29scyBjb2wtc20tMycsIHBhcmVudDogaWRSb3d9KTtcblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKVxuXG4gICAgXy5kcHAgKGNvbHMpO1xuXG59OyAvLyBlbmQgXy5tYWtlQ29sc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnBsYXlWaWRlbyA9ICgpID0+IHtcblxuICAgIF8uaGlkZGVuU2xpZGUgPSAnI2onICsgXy5jdXJWaXM7XG5cbiAgICAkKF8uaGlkZGVuU2xpZGUgKyAnPiBpbWcnKVxuICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKF8uaGlkZGVuU2xpZGUgKyAnPiAuY2FwdGlvbicpXG4gICAgLmFkZENsYXNzICgnbm92aXMnKTtcblxuICAgICQoXy5pZFZpZGVvKVxuICAgIC50ZXh0ICgnU2xpZGUnKVxuICAgIC5vZmYgKCdjbGljaycpXG4gICAgLmNsaWNrIChfLnJlc3RvcmVTbGlkZSk7XG5cbiAgICB2YXIgc3JjID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyBfLnNsaWRlVG9WaWRlbyBbXy5jdXJWaXNdICsgJz9hdXRvcGxheT0xJztcbiAgICBfLmlkVmlkZW9QbGF5aW5nID0gXy5kcHAgKHtpZnJhbWU6IDAsIHNyYzogc3JjLCBjbGFzczogJ2ltZ3ZpZGVvJywgcGFyZW50OiBfLmhpZGRlblNsaWRlLCBwcmVwZW5kOiAxfSk7XG5cbn07IC8vIGVuZCBfLnBsYXlWaWRlb1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnJlc3RvcmVTbGlkZSA9ICgpID0+IHtcblxuICAgICQoXy5pZFZpZGVvUGxheWluZylcbiAgICAucmVtb3ZlICgpO1xuXG4gICAgJChfLmhpZGRlblNsaWRlICsgJz4gaW1nJylcbiAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJChfLmhpZGRlblNsaWRlICsgJz4gLmNhcHRpb24nKVxuICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKF8uaWRWaWRlbylcbiAgICAudGV4dCAoJ1ZpZGVvJylcbiAgICAub2ZmICgnY2xpY2snKVxuICAgIC5jbGljayAoXy5wbGF5VmlkZW8pO1xuXG4gICAgXy5oaWRkZW5TbGlkZSA9IG51bGw7XG5cbn07IC8vIGVuZCBfLnJlc3RvcmVTbGlkZVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5zZXROZXh0VmlzID0gKGRlbHRhKSA9PiB7XG5cbiAgICBpZiAoXy5oaWRkZW5TbGlkZSkge1xuXG4gICAgICAgIF8ucmVzdG9yZVNsaWRlICgpO1xuXG4gICAgfSAvLyBlbmQgaWYgKF8uaGlkZGVuU2xpZGUpXG5cbiAgICB2YXIgbWRlbHRhID0gZGVsdGEgPj0gMCA/IGRlbHRhIDogXy5tYXhJbWFnZXMgKyBkZWx0YVxuXG4gICAgdmFyIG5leHRWaXMgPSAoXy5jdXJWaXMgKyBtZGVsdGEpICUgXy5tYXhJbWFnZXM7XG5cbiAgICB2YXIgaWRQcmV2ID0gJyNqJyArIF8uY3VyVmlzO1xuICAgIHZhciBpZE5leHQgPSAnI2onICsgbmV4dFZpcztcblxuICAgICQoaWRQcmV2KVxuICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKGlkTmV4dClcbiAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgXy5jdXJWaXMgPSBuZXh0VmlzO1xuXG4gICAgdmFyIGN0UmVmID0gXy5jdEkgW25leHRWaXNdO1xuXG4gICAgdmFyIHNsaWRlSSA9IGN0UmVmIFswXTtcbiAgICB2YXIgdG9waWNJZHggPSBjdFJlZiBbMV07XG4gICAgdmFyIHRvdGFsSW5TZWN0aW9uID0gXy50b3BpY3NJIFt0b3BpY0lkeF07XG5cbiAgICBfLmRwcCAoe2VtcHR5OiBfLmlkUGFnZUN0fSk7XG4gICAgXy5pZEN1clNsaWRlID0gXy5kcHAgKHtzcGFuOiAnc2xpZGU6ICcgKyBzbGlkZUkgKyAnLycgKyB0b3RhbEluU2VjdGlvbixcbiAgICAgICAgcGFyZW50OiBfLmlkUGFnZUN0LFxuICAgICAgICBjbGFzczogJ25hdnBvcyd9KTtcblxuICAgICQoXy50b3BpY1JlZilcbiAgICAuY3NzIChcbiAgICAgICAgeydiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZmYnLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiAnbm9ybWFsJ31cbiAgICApO1xuXG4gICAgXy50b3BpY1JlZiA9IF8udG9waWNSZWZzIFt0b3BpY0lkeF07XG5cbiAgICAkKF8udG9waWNSZWYpXG4gICAgLmNzcyAoXG4gICAgICAgIHsnYmFja2dyb3VuZC1jb2xvcic6ICcjZDZmZmQ2JyxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ2JvbGQnfVxuICAgICk7XG5cbn07IC8vIGVuZCBfLnNldE5leHRWaXNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy50b3BpY1RvVmlkZW9JZCA9IChhVGFnQSkgPT4ge1xuXG4gICAgXy50b3BpY1RvVmlkZW8gPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFUYWdBLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGFUYWcgPSBhVGFnQSBbaV07XG4gICAgICAgIHZhciBtID0gYVRhZy5tYXRjaCAoLy4qeW91dHUuYmUuKFteXCJdKylcIj4oW148XSspPC8pO1xuICAgICAgICBpZiAobSkge1xuXG4gICAgICAgICAgICB2YXIgdmlkZW9JZCA9IG0gWzFdO1xuICAgICAgICAgICAgdmFyIHRvcGljID0gbSBbMl07XG5cbiAgICAgICAgICAgIF8udG9waWNUb1ZpZGVvIFt0b3BpY10gPSB2aWRlb0lkO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChtKVxuXG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGFUYWdBOyBpKyspXG5cblxufTsgLy8gZW5kIF8udG9waWNUb1ZpZGVvSWRcblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmRvQWN0aW9uID0gKG1zZ09iKSA9PiB7XG4gICAgY29uc29sZS5sb2cgKCdtc2dPYjogJyArIEpTT04uc3RyaW5naWZ5IChtc2dPYikgKyAnXFxuJyk7XG5cbiAgICB2YXIgY21kID0gXy5rZXkxIChtc2dPYik7XG4gICAgdmFyIHZhbHMgPSBtc2dPYiBbY21kXTtcblxuICAgIHN3aXRjaCAoY21kKSB7XG5cbiAgICAgICAgY2FzZSAncmVhZHknOlxuXG4gICAgICAgICAgICBfLmluaXRTdHlsZSAoKTtcbiAgICAgICAgICAgIF8ud3MudG9TcnZyICh7Z2V0VmlkZW9MaW5rczoxfSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd2aWRlb0xpbmtzJzpcblxuICAgICAgICAgICAgXy50b3BpY1RvVmlkZW9JZCAodmFscyk7XG4gICAgICAgICAgICBfLndzLnRvU3J2ciAoe2dldFBuZ0ZpbGVzOjF9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3BuZ0ZpbGVzJzpcblxuICAgICAgICAgICAgJCgnYm9keScpXG4gICAgICAgICAgICAuZW1wdHkgKCk7XG5cbiAgICAgICAgICAgIF8uZG9TbGlkZVNob3cgKHZhbHMpO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgIH0gLy8gZW5kIHN3aXRjaCAoY21kKVxuXG5cblxufTsgLy8gZW5kIFAuZG9BY3Rpb25cblxuXG4vLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuXy5pbml0ICgpO1xuXG5yZXR1cm4gUDtcblxufTtcblxuXG5cbiIsIi8vIGdvLWpzb24yaHRtbC9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgXyA9IHtcblxuICAgIGlkOiAwLFxuICAgIHByaW1pdGl2ZVR5cGVzTm90TnVsbDogeydzdHJpbmcnOjEsICd1bmRlZmluZWQnOjEsICdudW1iZXInOjEsICdib29sZWFuJzoxLCAnc3ltYm9sJzogMX0sXG4gICAgICAgIC8vIHNpbmNlIHR5cGVvZiBudWxsIHlpZWxkcyAnb2JqZWN0JywgaXQncyBoYW5kbGVkIHNlcGFyYXRlbHlcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRpc3BsYXlQYWdlSCA9IChwYXJlbnQsIGRpc3BPYikgPT4ge1xuICAgIFxuICAgIGlmIChkaXNwT2IgPT09IDApIHtcbiAgICAgICAgLy8gY2FzZSB3aGVyZSBubyBjb250ZW50IGlzIGRlc2lyZWRcbiAgICAgICAgLy8gdG8gZGlzcGxheSBhbiBhY3R1YWwgemVybywgbWFrZSBpdCBhIHN0cmluZzogIFwiMFwiXG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSAvLyBlbmQgaWYgKGRpc3BPYiA9PT0gMClcbiAgICBcbiAgICB2YXIgZGlzcE9iVHlwZSA9IHR5cGVvZiBkaXNwT2I7XG4gICAgdmFyIGlzUHJpbWl0aXZlID0gXy5wcmltaXRpdmVUeXBlc05vdE51bGwuaGFzT3duUHJvcGVydHkgKGRpc3BPYlR5cGUpIHx8IGRpc3BPYiA9PT0gbnVsbDtcblxuICAgIGlmIChpc1ByaW1pdGl2ZSkge1xuXG4gICAgICAgIElkID0gXy50ZXh0TWFrZSAocGFyZW50LCBkaXNwT2IsICdhcHBlbmQnKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gTkUgPT4gTm90IEVtcHR5XG4gICAgICAgIHZhciBpc05FQXJyYXkgPSBBcnJheS5pc0FycmF5IChkaXNwT2IpICYmIGRpc3BPYi5sZW5ndGggPiAwO1xuICAgICAgICB2YXIgaXNORU9iamVjdCA9ICFBcnJheS5pc0FycmF5KGRpc3BPYikgJiYgZGlzcE9iVHlwZSA9PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyhkaXNwT2IpLmxlbmd0aCA+IDA7XG4gICAgICAgIFxuICAgICAgICB2YXIgSWQgPSBudWxsO1xuICAgICAgICAgICAgLy8gY2FwaXRhbCBJZCB0byBpbmRpY2F0ZSBpZCB3aXRoICcjJyBwcmVmaXhpbmcgaXRcbiAgICBcbiAgICAgICAgaWYgKGlzTkVPYmplY3QpIHtcbiAgICBcbiAgICAgICAgICAgIGlmIChkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdybScpKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBkaXNwT2Iucm07XG4gICAgICAgICAgICAgICAgJChzZWxlY3RvcilcbiAgICAgICAgICAgICAgICAucmVtb3ZlICgpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3BPYi5oYXNPd25Qcm9wZXJ0eSAoJ2VtcHR5JykpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IGRpc3BPYi5lbXB0eTtcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgIC5lbXB0eSAoKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdjb250ZW50JykpIHtcblxuICAgICAgICAgICAgICAgIF8uZGlzcGxheVBhZ2VIIChwYXJlbnQsIGRpc3BPYi5jb250ZW50KTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdhdHRyJykpIHtcblxuICAgICAgICAgICAgICAgICQocGFyZW50KVxuICAgICAgICAgICAgICAgIC5hdHRyIChkaXNwT2IuYXR0cik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gZGlzcE9iLmhhc093blByb3BlcnR5ICgncGFyZW50JykgPyBkaXNwT2IucGFyZW50IDogcGFyZW50O1xuXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJzID0ge307XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnROYW1lID0gbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMgKGRpc3BPYik7XG4gICAgICAgICAgICAgICAgdmFyIGluc2VydExvY2F0aW9uID0gJ2FwcGVuZCc7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIga3kgPSBrZXlzIFtpXTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdUeXBlID0gXy5nZXRUYWdUeXBlIChreSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgc3R5bGVJbkhlYWQgPSBwYXJlbnQgPT09ICdoZWFkJyAmJiBreSA9PT0gJ3N0eWxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0eWxlIGluIGhlYWQgPT4gaHRtbCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdHlsZSBub3QgaW4gaGVhZCA9PiBhdHRyaWJ1dGUgb2YgZGlzcE9iXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ05vdFN0eWxlID0gdGFnVHlwZSAhPT0gMCAmJiBreSAhPT0gJ3N0eWxlJztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdOb3RTdHlsZSB8fCBzdHlsZUluSGVhZCkge1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnROYW1lID0ga3k7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gZGlzcE9iIFtlbGVtZW50TmFtZV07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGt5KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYXJlbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZyAtLSBQcmV2ZW50cyAncGFyZW50JyBmcm9tIGJlY29taW5nIGFuIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwcmVwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2JlZm9yZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWZ0ZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRMb2NhdGlvbiA9IGt5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBkaXNwT2IgW2t5XSA9PT0gMSA/IHBhcmVudCA6IGRpc3BPYiBba3ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgYW55IG9mIHByZXBlbmQsIC4uLiBhcmUgc3BlY2lmaWVkLCBhbmQgdGhlIHZhbHVlIGlzIG90aGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGFuIGEgJzEnLCBvdmVycmlkZSB0aGUgcGFyZW50IHZhbHVlIHdpdGggdGhhdCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRycyBba3ldID0gZGlzcE9iIFtreV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9IC8vIGVuZCBzd2l0Y2ggKGt5KVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSAvLyBlbmQgaWYgKHRhZ1R5cGUgIT09IDApXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwga2V5czsgaSsrKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIGNhc2UgLS0gc2V0IGFzIHRleHQgYW5kIGRpc3BsYXkgZW50aXJlIGRpc3BPYlxuXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnROYW1lID0gJ3RleHQnO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gSlNPTi5zdHJpbmdpZnkgKGRpc3BPYik7XG5cbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBpZiAoIWVsZW1lbnROYW1lKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50TmFtZSA9PT0gJ3RleHQnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgSWQgPSBfLnRleHRNYWtlIChwYXJlbnQsIGNvbnRlbnQsIGluc2VydExvY2F0aW9uKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgSWQgPSBfLmVsZW1lbnRNYWtlIChlbGVtZW50TmFtZSwgcGFyZW50LCBpbnNlcnRMb2NhdGlvbiwgYXR0cnMpO1xuXG4gICAgICAgICAgICAgICAgfSAvLyBlbmQgaWYgKGVsZW1lbnROYW1lID09PSAndGV4dCcpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKElkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhc2UgZm9yIGVsZW1lbnQgbm90ICd0ZXh0J1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXy5kaXNwbGF5UGFnZUggKElkLCBjb250ZW50KTtcblxuICAgICAgICAgICAgICAgIH0gLy8gZW5kIGlmIChJZCAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKGRpc3BPYi5oYXNPd25Qcm9wZXJ0eSAoJ3JtJykpXG4gICAgICAgICAgICBcbiAgICBcbiAgICAgICAgfSBlbHNlIGlmIChpc05FQXJyYXkpIHtcbiAgICBcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcE9iLmxlbmd0aDsgaSsrKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHVybmVkIElkIHdpbGwgYmUgZm9yIGxhc3QgaXRlbSBpbiBhcnJheVxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VmdWwgdG8gbGF0ZXIgYWRkIHNpYmxpbmdzIHdpdGggJ2FmdGVyJyBrZXlcbiAgICAgICAgICAgICAgICBJZCA9IF8uZGlzcGxheVBhZ2VIIChwYXJlbnQsIGRpc3BPYiBbaV0pO1xuICAgIFxuICAgICAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwT2IubGVuZ3RoOyBpKyspXG4gICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICBJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gY2FzZSBmb3IgZGlzcE9iIGFzIGFuIGVtcHR5IG9iamVjdCBvciBlbXB0eSBhcnJheVxuICAgIFxuICAgICAgICB9IC8vIGVuZCBpZiAoaXNORU9iamVjdClcblxuICAgIH0gLy8gZW5kIGlmIChfLnByaW1pdGl2ZVR5cGVzTm90TnVsbC5oYXNPd25Qcm9wZXJ0eSAoZGlzcE9iVHlwZSkpXG4gICAgXG4gICAgICAgIFxuICAgIHJldHVybiBJZDtcblxufTsgLy8gZW5kIF8uZGlzcGxheVBhZ2VIIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5lbGVtZW50TWFrZSA9ICh0YWcsIHBhcmVudE9yU2libCwgaW5zZXJ0TG9jYXRpb24sIGF0dHJzKSA9PiB7XG4gICAgXG4gICAgdmFyIGlkO1xuICAgIHZhciBhdHRyS2V5cyA9IE9iamVjdC5rZXlzIChhdHRycyk7XG4gICAgdmFyIGhhc0F0dHJzID0gYXR0cktleXMubGVuZ3RoID4gMDtcblxuICAgIGlmIChoYXNBdHRycyAmJiBhdHRycy5oYXNPd25Qcm9wZXJ0eSAoJ2lkJykpIHtcblxuICAgICAgICBpZCA9IGF0dHJzLmlkO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBpZCA9IFAuZ2VuSWQgKCk7XG5cbiAgICB9IC8vIGVuZCBpZiAoaGFzQXR0cnMpXG4gICAgXG4gICAgdmFyIElkID0gJyMnICsgaWQ7XG4gICAgXG4gICAgdmFyIGRpdmVsID0gJzwnICsgdGFnICsgJyBpZD1cIicgKyBpZCArICdcIic7XG5cbiAgICB2YXIgdGFndHlwZSA9IF8uZ2V0VGFnVHlwZSAodGFnKTtcblxuICAgIGlmICh0YWd0eXBlID09IDEpIHtcblxuICAgICAgICBkaXZlbCArPSAnPic7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGRpdmVsICs9ICc+PC8nICsgdGFnICsgJz4nO1xuXG4gICAgfSAvLyBlbmQgaWYgKHRhZ3R5cGUgPT0gMSlcblxuICAgICQocGFyZW50T3JTaWJsKVtpbnNlcnRMb2NhdGlvbl0gKGRpdmVsKTtcbiAgICBcbiAgICBpZiAoaGFzQXR0cnMpIHtcbiAgICAgICAgXG4gICAgICAgICQoSWQpXG4gICAgICAgIC5hdHRyIChhdHRycyk7XG5cbiAgICB9IC8vIGVuZCBpZiAoaGFzQXR0cnMpXG4gICAgXG4gICAgcmV0dXJuIElkO1xuXG59OyAvLyBlbmQgXy5lbGVtZW50TWFrZVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5nZXRUYWdUeXBlID0gKHRhZykgPT4ge1xuXG4gICAgICAgIC8vIDEgPT4gdm9pZCBlbGVtZW50cywgMiA9PiBoYXMgY29udGVudFxuICAgIHZhciB0YWdzID0geyBhcmVhOiAxLCBiYXNlOiAxLCBicjogMSwgY29sOiAxLCBlbWJlZDogMSwgaHI6IDEsIGltZzogMSwgaW5wdXQ6IDEsIGtleWdlbjogMSwgbGluazogMSwgbWV0YTogMSwgcGFyYW06IDEsIHNvdXJjZTogMSwgdHJhY2s6IDEsIHdicjogMSwgYTogMiwgYWJicjogMiwgYWRkcmVzczogMiwgYXJ0aWNsZTogMiwgYXNpZGU6IDIsIGF1ZGlvOiAyLCBiOiAyLCBiZGk6IDIsIGJkbzogMiwgYmxvY2txdW90ZTogMiwgYm9keTogMiwgYnV0dG9uOiAyLCBjYW52YXM6IDIsIGNhcHRpb246IDIsIGNpdGU6IDIsIGNvZGU6IDIsIGNvbGdyb3VwOiAyLCBkYXRhbGlzdDogMiwgZGQ6IDIsIGRlbDogMiwgZGV0YWlsczogMiwgZGZuOiAyLCBkaWFsb2c6IDIsIGRpdjogMiwgZGw6IDIsIGR0OiAyLCBlbTogMiwgZmllbGRzZXQ6IDIsIGZpZ2NhcHRpb246IDIsIGZpZ3VyZTogMiwgZm9vdGVyOiAyLCBmb3JtOiAyLCBoMTogMiwgaDI6IDIsIGgzOiAyLCBoNDogMiwgaDU6IDIsIGg2OiAyLCBoZWFkOiAyLCBoZWFkZXI6IDIsIGhncm91cDogMiwgaHRtbDogMiwgaTogMiwgaWZyYW1lOiAyLCBpbnM6IDIsIGtiZDogMiwgbGFiZWw6IDIsIGxlZ2VuZDogMiwgbGk6IDIsIG1hcDogMiwgbWFyazogMiwgbWVudTogMiwgbWV0ZXI6IDIsIG5hdjogMiwgbm9zY3JpcHQ6IDIsIG9iamVjdDogMiwgb2w6IDIsIG9wdGdyb3VwOiAyLCBvcHRpb246IDIsIG91dHB1dDogMiwgcDogMiwgcHJlOiAyLCBwcm9ncmVzczogMiwgcTogMiwgcnA6IDIsIHJ0OiAyLCBydWJ5OiAyLCBzOiAyLCBzYW1wOiAyLCBzY3JpcHQ6IDIsIHNlY3Rpb246IDIsIHNlbGVjdDogMiwgc21hbGw6IDIsIHNwYW46IDIsIHN0cm9uZzogMiwgc3R5bGU6IDIsIHN1YjogMiwgc3VtbWFyeTogMiwgc3VwOiAyLCBzdmc6IDIsIHRhYmxlOiAyLCB0Ym9keTogMiwgdGQ6IDIsIHRleHRhcmVhOiAyLCB0Zm9vdDogMiwgdGg6IDIsIHRoZWFkOiAyLCB0aW1lOiAyLCB0aXRsZTogMiwgdHI6IDIsIHU6IDIsIHVsOiAyLCAndmFyJzogMiwgdmlkZW86IDJ9O1xuXG4gICAgdGFncy50ZXh0ID0gMTsgIC8vIHNwZWNpYWwgdGFnOiAgdXNlcyBfLm1ha2VUZXh0ICgpXG4gICAgXG4gICAgcmV0dXJuIHRhZ3MuaGFzT3duUHJvcGVydHkodGFnKSA/IHRhZ3MgW3RhZ10gOiAwO1xuXG59OyAvLyBlbmQgXy5nZXRUYWdUeXBlIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnRleHRNYWtlID0gKHBhcmVudCwgcHJpbWl0aXZlLCBsb2NhdGlvbikgPT4ge1xuICAgIFxuICAgIGlmICh0eXBlb2YgcHJpbWl0aXZlID09PSAnc3RyaW5nJykge1xuICAgICAgICBcbiAgICAgICAgdmFyIHNpbmdsZXF1b3RlID0gJyYjeDAwMjc7JztcbiAgICAgICAgdmFyIGJhY2tzbGFzaCA9ICcmI3gwMDVjOyc7XG4gICAgICAgIHZhciBkb3VibGVxdW90ZSA9ICcmI3gwMDIyOyc7XG4gICAgICAgIHZhciBsdCA9ICcmbHQ7JztcbiAgICAgICAgXG4gICAgICAgIHByaW1pdGl2ZSA9IHByaW1pdGl2ZS5yZXBsYWNlICgvJy9nLCBzaW5nbGVxdW90ZSk7XG4gICAgICAgIHByaW1pdGl2ZSA9IHByaW1pdGl2ZS5yZXBsYWNlICgvXCIvZywgZG91YmxlcXVvdGUpO1xuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoL1xcXFwvZywgYmFja3NsYXNoKTtcbiAgICAgICAgcHJpbWl0aXZlID0gcHJpbWl0aXZlLnJlcGxhY2UgKC88L2csIGx0KTtcblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHByaW1pdGl2ZSA9PT0gJ3N5bWJvbCcpIHtcblxuICAgICAgICBwcmltaXRpdmUgPSAnc3ltYm9sJztcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBzdHJpbmdpZnkgd291bGQgcHJvZHVjZSAne30nIHdoaWNoIGlzIGxlc3MgdXNlZnVsXG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHByaW1pdGl2ZSA9IEpTT04uc3RyaW5naWZ5IChwcmltaXRpdmUpO1xuXG4gICAgfSAvLyBlbmQgaWYgKHR5cGVvZiBwcmltaXRpdmUgPT09ICdzdHJpbmcnKVxuICAgIFxuXG4gICAgJChwYXJlbnQpIFtsb2NhdGlvbl0gKHByaW1pdGl2ZSk7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gdGV4dCBvYnMgaGF2ZSBubyBpZCdzOiBvbmx5IHRleHQgaXMgYXBwZW5kZWQgd2l0aCBubyB3YXkgdG8gYWRkcmVzcyBpdFxuICAgICAgICAvLyBpZiBhZGRyZXNzaW5nIGlzIG5lY2Vzc2FyeSwgdXNlIHNwYW4gaW5zdGVhZCBvZiB0ZXh0XG5cbn07IC8vIGVuZCBfLnRleHRNYWtlIFxuXG5cblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZGlzcGxheVBhZ2UgPSAoZGlzcE9iKSA9PiB7XG4gICAgXG4gICAgdmFyIHBhcmVudCA9IGRpc3BPYi5oYXNPd25Qcm9wZXJ0eSAoJ3BhcmVudCcpID8gZGlzcE9iLnBhcmVudCA6ICdib2R5JztcbiAgICAgICAgLy8gaWYgcGFyZW50IG5vdCBmb3VuZCwgYXBwZW5kIHRvIGJvZHlcblxuICAgIHZhciBJZCA9IF8uZGlzcGxheVBhZ2VIIChwYXJlbnQsIGRpc3BPYik7XG5cbiAgICByZXR1cm4gSWQ7XG5cbn07IC8vIGVuZCBQLmRpc3BsYXlQYWdlIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5nZW5JZCA9ICgpID0+IHtcblxuICAgIHZhciBpZCA9ICdpJyArIF8uaWQrKztcbiAgICByZXR1cm4gaWQ7XG5cbn07IC8vIGVuZCBQLmdlbklkXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbnJldHVybiBQO1xuXG59KCkpO1xuXG5cblxuIiwiLy8gZ28ta2V5L2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGpxU2VsZWN0b3IsIHJlcG9ydFNoaWZ0LCBrZXlIYW5kbGVyKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgXyA9IHtcblxuICAgIGpxU2VsZWN0b3I6ICdib2R5JyxcbiAgICByZXBvcnRTaGlmdDogZmFsc2UsXG4gICAga2V5SGFuZGxlcjogY29uc29sZS5sb2csXG5cbiAgICBrU2hpZnQ6IGZhbHNlLFxuICAgIGtDdHJsOiBmYWxzZSxcbiAgICBrQWx0OiBmYWxzZSxcbiAgICBrQ21kOiBmYWxzZSxcbiAgICBrSWdub3JlOiBmYWxzZSxcbiAgICB3aGljaFNoaWZ0S2V5czogezE2OjEsIDE3OjEsIDE4OjEsIDkxOjEsIDkyOjEsIDkzOjEsIDIyNDoxfSxcblxuICAgICAgICAgICAgLy8gbm90IHByaW50YWJsZSBvciBub24tYXNjaWkgYmxvY2tcbiAgICBjdHJsT3JOb25Bc2NpaToge1xuICAgICAgICA4OiAnQmFja3NwYWNlJyxcbiAgICAgICAgOTogJ1RhYicsXG4gICAgICAgIDEzOiAnRW50ZXInLFxuICAgICAgICAxNjogJ1NoaWZ0JyxcbiAgICAgICAgMTc6ICdDdHJsJyxcbiAgICAgICAgMTg6ICdBbHQnLFxuICAgICAgICAxOTogJ1BhdXNlLWJyZWFrJyxcbiAgICAgICAgMjA6ICdDYXBzLWxvY2snLFxuICAgICAgICAyNzogJ0VzYycsXG4gICAgICAgIDMyOiAnICcsICAvLyBTcGFjZVxuICAgICAgICAzMzogJ1BhZ2VVcCcsXG4gICAgICAgIDM0OiAnUGFnZURvd24nLFxuICAgICAgICAzNTogJ0VuZCcsXG4gICAgICAgIDM2OiAnSG9tZScsXG4gICAgICAgIDM3OiAnTGVmdCcsXG4gICAgICAgIDM4OiAnVXAnLFxuICAgICAgICAzOTogJ1JpZ2h0JyxcbiAgICAgICAgNDA6ICdEb3duJyxcbiAgICAgICAgNDU6ICdJbnNlcnQnLFxuICAgICAgICA0NjogJ0RlbGV0ZScsXG4gICAgICAgIDkxOiAnV2luZG93c0tleUxlZnQnLFxuICAgICAgICA5MjogJ1dpbmRvd3NLZXlSaWdodCcsXG4gICAgICAgIDkzOiAnV2luZG93c09wdGlvbktleScsXG4gICAgICAgIDk2OiAnMCcsICAvLyBOdW1wYWRcbiAgICAgICAgOTc6ICcxJywgIC8vIE51bXBhZFxuICAgICAgICA5ODogJzInLCAgLy8gTnVtcGFkXG4gICAgICAgIDk5OiAnMycsICAvLyBOdW1wYWRcbiAgICAgICAgMTAwOiAnNCcsICAvLyBOdW1wYWRcbiAgICAgICAgMTAxOiAnNScsICAvLyBOdW1wYWRcbiAgICAgICAgMTAyOiAnNicsICAvLyBOdW1wYWRcbiAgICAgICAgMTAzOiAnNycsICAvLyBOdW1wYWRcbiAgICAgICAgMTA0OiAnOCcsICAvLyBOdW1wYWRcbiAgICAgICAgMTA1OiAnOScsICAvLyBOdW1wYWRcbiAgICAgICAgMTA2OiAnKicsICAvLyBOdW1wYWRcbiAgICAgICAgMTA3OiAnKycsICAvLyBOdW1wYWRcbiAgICAgICAgMTA5OiAnLScsICAvLyBOdW1wYWRcbiAgICAgICAgMTEwOiAnLicsICAvLyBOdW1wYWRcbiAgICAgICAgMTExOiAnLycsICAvLyBOdW1wYWRcbiAgICAgICAgMTEyOiAnRjEnLFxuICAgICAgICAxMTM6ICdGMicsXG4gICAgICAgIDExNDogJ0YzJyxcbiAgICAgICAgMTE1OiAnRjQnLFxuICAgICAgICAxMTY6ICdGNScsXG4gICAgICAgIDExNzogJ0Y2JyxcbiAgICAgICAgMTE4OiAnRjcnLFxuICAgICAgICAxMTk6ICdGOCcsXG4gICAgICAgIDEyMDogJ0Y5JyxcbiAgICAgICAgMTIxOiAnRjEwJyxcbiAgICAgICAgMTIyOiAnRjExJyxcbiAgICAgICAgMTIzOiAnRjEyJyxcbiAgICAgICAgMTQ0OiAnTnVtbG9jaycsXG4gICAgICAgIDE0NTogJ1Njcm9sbC1sb2NrJyxcbiAgICAgICAgMjI0OiAnTWFjQ21kJyxcbiAgICB9LFxuICAgIFxuICAgIFxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgYXNjaWlVblNoaWZ0ZWQ6IHtcbiAgICAgICAgNDg6ICcwJyxcbiAgICAgICAgNDk6ICcxJyxcbiAgICAgICAgNTA6ICcyJyxcbiAgICAgICAgNTE6ICczJyxcbiAgICAgICAgNTI6ICc0JyxcbiAgICAgICAgNTM6ICc1JyxcbiAgICAgICAgNTQ6ICc2JyxcbiAgICAgICAgNTU6ICc3JyxcbiAgICAgICAgNTY6ICc4JyxcbiAgICAgICAgNTc6ICc5JyxcbiAgICAgICAgNTk6ICc7JyxcbiAgICAgICAgNjE6ICc9JyxcbiAgICAgICAgNjU6ICdhJyxcbiAgICAgICAgNjY6ICdiJyxcbiAgICAgICAgNjc6ICdjJyxcbiAgICAgICAgNjg6ICdkJyxcbiAgICAgICAgNjk6ICdlJyxcbiAgICAgICAgNzA6ICdmJyxcbiAgICAgICAgNzE6ICdnJyxcbiAgICAgICAgNzI6ICdoJyxcbiAgICAgICAgNzM6ICdpJyxcbiAgICAgICAgNzQ6ICdqJyxcbiAgICAgICAgNzU6ICdrJyxcbiAgICAgICAgNzY6ICdsJyxcbiAgICAgICAgNzc6ICdtJyxcbiAgICAgICAgNzg6ICduJyxcbiAgICAgICAgNzk6ICdvJyxcbiAgICAgICAgODA6ICdwJyxcbiAgICAgICAgODE6ICdxJyxcbiAgICAgICAgODI6ICdyJyxcbiAgICAgICAgODM6ICdzJyxcbiAgICAgICAgODQ6ICd0JyxcbiAgICAgICAgODU6ICd1JyxcbiAgICAgICAgODY6ICd2JyxcbiAgICAgICAgODc6ICd3JyxcbiAgICAgICAgODg6ICd4JyxcbiAgICAgICAgODk6ICd5JyxcbiAgICAgICAgOTA6ICd6JyxcbiAgICAgICAgMTczOiAnLScsXG4gICAgICAgIDE4ODogJywnLFxuICAgICAgICAxOTA6ICcuJyxcbiAgICAgICAgMTkxOiAnLycsXG4gICAgICAgIDE5MjogJ2AnLFxuICAgICAgICAyMTk6ICdbJyxcbiAgICAgICAgMjIwOiBcIlxcXFxcIixcbiAgICAgICAgMjIxOiAnXScsXG4gICAgICAgIDIyMjogXCInXCIsXG4gICAgMTg2OiBcIjtcIiwgIC8vIGRpdHRvIGZvciAnOydcbiAgICAxODc6IFwiPVwiLCAgLy8gYXBwYXJlbnRseSwgY2hyb21lIHRoaW5rcyB3aGljaCBpcyAxODcgZm9yICc9JywgYnV0IG5vdCBmaXJlZm94XG4gICAgMTg5OiBcIi1cIiwgIC8vIGRpdHRvIGZvciAnLSdcbiAgICB9LFxuICAgIFxuICAgIFxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgYXNjaWlTaGlmdGVkOiB7XG4gICAgICAgIDQ4OiAnKScsXG4gICAgICAgIDQ5OiAnIScsXG4gICAgICAgIDUwOiAnQCcsXG4gICAgICAgIDUxOiAnIycsXG4gICAgICAgIDUyOiAnJCcsXG4gICAgICAgIDUzOiAnJScsXG4gICAgICAgIDU0OiAnXicsXG4gICAgICAgIDU1OiAnJicsXG4gICAgICAgIDU2OiAnKicsXG4gICAgICAgIDU3OiAnKCcsXG4gICAgICAgIDU5OiAnOicsXG4gICAgICAgIDYxOiAnKycsXG4gICAgICAgIDY1OiAnQScsXG4gICAgICAgIDY2OiAnQicsXG4gICAgICAgIDY3OiAnQycsXG4gICAgICAgIDY4OiAnRCcsXG4gICAgICAgIDY5OiAnRScsXG4gICAgICAgIDcwOiAnRicsXG4gICAgICAgIDcxOiAnRycsXG4gICAgICAgIDcyOiAnSCcsXG4gICAgICAgIDczOiAnSScsXG4gICAgICAgIDc0OiAnSicsXG4gICAgICAgIDc1OiAnSycsXG4gICAgICAgIDc2OiAnTCcsXG4gICAgICAgIDc3OiAnTScsXG4gICAgICAgIDc4OiAnTicsXG4gICAgICAgIDc5OiAnTycsXG4gICAgICAgIDgwOiAnUCcsXG4gICAgICAgIDgxOiAnUScsXG4gICAgICAgIDgyOiAnUicsXG4gICAgICAgIDgzOiAnUycsXG4gICAgICAgIDg0OiAnVCcsXG4gICAgICAgIDg1OiAnVScsXG4gICAgICAgIDg2OiAnVicsXG4gICAgICAgIDg3OiAnVycsXG4gICAgICAgIDg4OiAnWCcsXG4gICAgICAgIDg5OiAnWScsXG4gICAgICAgIDkwOiAnWicsXG4gICAgICAgIDE3MzogJ18nLFxuICAgICAgICAxODg6ICc8JyxcbiAgICAgICAgMTkwOiAnPicsXG4gICAgICAgIDE5MTogJz8nLFxuICAgICAgICAxOTI6ICd+JyxcbiAgICAgICAgMjE5OiAneycsXG4gICAgICAgIDIyMDogJ3wnLFxuICAgICAgICAyMjE6ICd9JyxcbiAgICAgICAgMjIyOiAnXCInLFxuICAgIDE4NjogXCI6XCIsICAvLyBkaXR0byBmb3IgJzonXG4gICAgMTg3OiBcIitcIiwgIC8vIGRpdHRvIGZvciAnKydcbiAgICAxODk6IFwiX1wiLCAgLy8gZGl0dG8gZm9yICctJ1xuICAgIH0sXG5cblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uaW5pdCA9ICgpID0+IHtcbiAgICBcbiAgICBfLmpxU2VsZWN0b3IgPSBqcVNlbGVjdG9yID8ganFTZWxlY3RvciA6ICdib2R5JztcbiAgICBfLnJlcG9ydFNoaWZ0ID0gcmVwb3J0U2hpZnQgPyByZXBvcnRTaGlmdCA6IGZhbHNlO1xuICAgIF8ua2V5SGFuZGxlciA9IGtleUhhbmRsZXIgPyBrZXlIYW5kbGVyIDogXy5kZWZhdWx0SGFuZGxlcjtcblxuICAgIFAuc2V0S2V5VXBEb3duICgpO1xuXG59OyAvLyBlbmQgXy5pbml0XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmNLZXlEb3duID0gKGV2ZW50LCByZXBvcnRTaGlmdCwgY2FsbGJhY2spID0+IHtcbiAgICAvLyByZXR1cm5zIGNoIG9iamVjdCByZWZsZWN0aW5nIHdoaWNoIHNoaWZ0IGtleXMgd2VyZSBwcmVzc2VkIGRvd24sIGNoIGFuZCB3aGljaCB2YWx1ZXNcbiAgICAvL1xuICAgIC8vIHJlcG9ydFNoaWZ0IHRydWUgPT4gdHJpZ2dlciBjYWxsYmFjayBmb3IgZWFjaCBrZXlkb3duIGV2ZW50IG9mIGFueSBrZXksIFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgaW5jbHVkaW5nIGFueSBzaGlmdCBrZXlcbiAgICAvLyAgICAgZmFsc2UgPT4gc2hpZnQga2V5IGV2ZW50IHJlcG9ydGVkIG9ubHkgd2hlbiB0aGUgbmV4dCBub24tc2hpZnQga2V5ZG93biBldmVudC5cbiAgICAvLyAgICAgICAgICAgICAgU28sIGNhbGxiYWNrIGlzIG9ubHkgdHJpZ2dlcmVkIGZvciBub24tc2hpZnQga2V5IGV2ZW50c1xuICAgIFxuICAgIHZhciB3aGljaCA9IGV2ZW50LndoaWNoO1xuXG4gICAgICAgIC8vIG5ldmVyIGlnbm9yZSAnRXNjJyBrZXkgPT0gMjdcbiAgICBpZiAoXy5rSWdub3JlICYmIHdoaWNoICE9IDI3KSB7XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSAvLyBlbmQgaWYgKGtJZ25vcmUpXG4gICAgXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24gKCk7XG5cbiAgICB2YXIgaXNBU2hpZnRLZXkgPSB0cnVlO1xuICAgIHN3aXRjaCAod2hpY2gpIHtcblxuICAgICAgICBjYXNlIDE2OiBcbiAgICAgICAgICAgIF8ua1NoaWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTc6IFxuICAgICAgICAgICAgXy5rQ3RybCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDE4OiBcbiAgICAgICAgICAgIF8ua0FsdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDkxOiBcbiAgICAgICAgY2FzZSA5MjogXG4gICAgICAgIGNhc2UgOTM6IFxuICAgICAgICBjYXNlIDIyNDpcbiAgICAgICAgICAgIF8ua0NtZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaXNBU2hpZnRLZXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAgIFxuXG4gICAgaWYgKGlzQVNoaWZ0S2V5ICYmICFyZXBvcnRTaGlmdCkge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChpc0FTaGlmdEtleSAmJiAhcmVwb3J0U2hpZnQpXG4gICAgXG4gICAgdmFyIHRoaXNDaCA9IF8uZ2V0S2V5RG93bkNvZGUgKHdoaWNoKTtcblxuICAgIHZhciBjaE9iID0gKHtcbiAgICAgICAgc2hpZnQ6IF8ua1NoaWZ0LFxuICAgICAgICBjdHJsOiBfLmtDdHJsLFxuICAgICAgICBhbHQ6IF8ua0FsdCxcbiAgICAgICAgbWFjQ21kOiBfLmtDbWQsXG4gICAgICAgIHdoaWNoOiB3aGljaCxcbiAgICAgICAgY2g6IHRoaXNDaCxcbiAgICB9KTtcblxuICAgIGlmIChyZXBvcnRTaGlmdCkge1xuXG4gICAgICAgIGNoT2IuaXNBU2hpZnRLZXkgPSBpc0FTaGlmdEtleTsgIFxuICAgICAgICAgICAgLy8gdHJ1ZSBpZiBhbnkgb2Y6IHNoaWZ0LCBjdHJsLCBhbHQsIG9yIG1hY0NtZCBhcmUgdHJ1ZVxuICAgICAgICAgICAgLy8gb25seSByZWxldmFudCBpZiByZXBvcnRTaGlmdCBpcyB0cnVlXG5cbiAgICB9IC8vIGVuZCBpZiAocmVwb3J0U2hpZnQpXG5cbiAgICBjYWxsYmFjayAoY2hPYik7XG5cbn07IC8vIGVuZCBfLmNLZXlEb3duIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmNLZXlVcCA9IChldmVudCkgPT4ge1xuICAgIFxuXG4gICAgaWYgKF8ua0lnbm9yZSkge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChrSWdub3JlKVxuICAgIFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uICgpO1xuXG4gICAgdmFyIHdoaWNoID0gZXZlbnQud2hpY2g7XG5cbiAgICBzd2l0Y2ggKHdoaWNoKSB7XG5cbiAgICAgICAgY2FzZSAxNjogXG4gICAgICAgICAgICBfLmtTaGlmdCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGNhc2UgMTc6IFxuICAgICAgICAgICAgXy5rQ3RybCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgXy5rQWx0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgY2FzZSA5MTogXG4gICAgICAgIGNhc2UgOTI6IFxuICAgICAgICBjYXNlIDkzOiBcbiAgICAgICAgY2FzZSAyMjQ6IFxuICAgICAgICAgICAgXy5rQ21kID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm5cbiAgICB9ICAgXG5cbn07IC8vIGVuZCBfLmNLZXlVcCBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZGVmYXVsdEhhbmRsZXIgPSAoY2hPYikgPT4ge1xuICAgIFxuICAgIHZhciBjaE9iUyA9IEpTT04uc3RyaW5naWZ5IChjaE9iKTtcbiAgICBjb25zb2xlLmxvZyAoJ2tleS5fLmRlZmF1bHRIYW5kbGVyLmNoT2I6ICcgKyBjaE9iUyk7XG5cbn07IC8vIGVuZCBfLmRlZmF1bHRIYW5kbGVyIFxuXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZ2V0S2V5RG93bkNvZGUgPSAod2hpY2gpID0+IHtcbiAgICBcblxuICAgIHZhciBjaDtcblxuICAgIGlmIChfLmN0cmxPck5vbkFzY2lpLmhhc093blByb3BlcnR5ICh3aGljaCkpIHtcblxuICAgICAgICBjaCA9IF8uY3RybE9yTm9uQXNjaWkgW3doaWNoXTtcblxuICAgIH0gZWxzZSBpZiAoXy5rU2hpZnQgJiYgXy5hc2NpaVNoaWZ0ZWQuaGFzT3duUHJvcGVydHkgKHdoaWNoKSkge1xuXG4gICAgICAgIGNoID0gXy5hc2NpaVNoaWZ0ZWQgW3doaWNoXTtcblxuICAgIH0gZWxzZSBpZiAoIV8ua1NoaWZ0ICYmIF8uYXNjaWlVblNoaWZ0ZWQuaGFzT3duUHJvcGVydHkgKHdoaWNoKSkge1xuXG4gICAgICAgIGNoID0gXy5hc2NpaVVuU2hpZnRlZCBbd2hpY2hdO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBjaCA9IG51bGw7XG5cbiAgICB9IC8vIGVuZCBpZiBcbiAgICBcbiAgICByZXR1cm4gY2g7XG5cbn07IC8vIGVuZCBfLmdldEtleURvd25Db2RlIFxuXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uaW5pdEtleURvd24gPSAoanFTZWxlY3RvciwgcmVwb3J0U2hpZnQsIGNhbGxiYWNrKSA9PiB7XG4gICAgXG4gICAgJChqcVNlbGVjdG9yKVxuICAgIC5vZmYoJ2tleWRvd24nKVxuICAgIC5rZXlkb3duIChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgXy5jS2V5RG93biAoZXZlbnQsIHJlcG9ydFNoaWZ0LCBjYWxsYmFjayk7XG4gICAgfSlcblxufTsgLy8gZW5kIF8uaW5pdEtleURvd24gXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uaW5pdEtleVVwID0gKGpxU2VsZWN0b3IpID0+IHtcbiAgICBcbiAgICAkKGpxU2VsZWN0b3IpXG4gICAgLm9mZigna2V5dXAnKVxuICAgIC5rZXl1cCAoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIF8uY0tleVVwIChldmVudClcbiAgICB9KVxuXG59OyAvLyBlbmQgXy5pbml0S2V5VXAgXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5zZXRLZXlVcERvd24gPSAoKSA9PiB7XG4gICAgXG4gICAgXy5pbml0S2V5VXAgKCdib2R5Jyk7XG4gICAgXy5pbml0S2V5RG93biAoJ2JvZHknLCBfLnJlcG9ydFNoaWZ0LCBfLmtleUhhbmRsZXIpO1xuXG59OyAvLyBlbmQgUC5zZXRLZXlIYW5kbGVyXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5fLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuXG4iLCIvLyBnby1wb3BpbmZvL2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRwKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgXyA9IHtcbiAgICBkcHA6IGRwLmRpc3BsYXlQYWdlLFxuICAgIGdlbklkOiBkcC5nZW5JZCxcbiAgICBhcnJvd1NpemU6IDEwLFxuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG5cbl8uaW5pdCA9ICgpID0+IHtcblxuICAgIF8uc2V0UG9wdXBTdHlsZSAoKTtcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmdldFBvc0RpbSA9IChqcSkgPT4ge1xuICAgIFxuICAgIHZhciByZXMgPSB7fTtcblxuICAgIHZhciBvZmZzZXQgPSAkKGpxKS5vZmZzZXQgKCk7XG4gICAgcmVzLmxlZnQgPSBvZmZzZXQubGVmdDtcbiAgICByZXMudG9wID0gb2Zmc2V0LnRvcDtcblxuICAgIHJlcy53aWR0aCA9ICQoanEpLndpZHRoICgpO1xuICAgIHJlcy5oZWlnaHQgPSAkKGpxKS5oZWlnaHQgKCk7XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgXy5nZXRQb3NEaW0gXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnNldFBvcHVwU3R5bGUgPSAoKSA9PiB7XG4gICAgXG4gICAgdmFyIGFzID0gXy5hcnJvd1NpemU7XG5cbiAgICB2YXIgcG9wdXBTdHlsZSA9IHtzdHlsZTogXG4gICAgJy5wb3B1cCB7JyArXG4gICAgICAgICdwb3NpdGlvbjogcmVsYXRpdmU7JyArXG4gICAgICAgICdkaXNwbGF5OiBpbmxpbmUtYmxvY2s7JyArXG4gICAgICAgICdib3JkZXI6IDFweCBzb2xpZCBibHVlOycgK1xuICAgICAgICAnYm9yZGVyLXJhZGl1czogNHB4OycgK1xuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcjogI2ViZjJmMjsnICtcbiAgICAgICAgJ2ZvbnQtc2l6ZTogMTJweDsnICtcbiAgICAnfScgK1xuICAgICcucG9wdXBub3ZpcyB7JyArXG4gICAgICAgICd2aXNpYmlsaXR5OiBoaWRkZW47JyArXG4gICAgJ30nICtcbiAgICAnLmFycm93IHsnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsnICtcbiAgICAgICAgJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnICtcbiAgICAgICAgJ3dpZHRoOiAwOycgK1xuICAgICAgICAnaGVpZ2h0OiAwOycgK1xuICAgICAgICAnYm9yZGVyLXN0eWxlOiBzb2xpZDsnICtcbiAgICAgICAgJ2JveC1zaXppbmc6IGJvcmRlci1ib3g7JyArXG4gICAgJ30nICtcbiAgICAnLmFycm93Ym9yZGVyIHsnICtcbiAgICAgICAgJ2JvcmRlci13aWR0aDogJyArIChhcyAtIDEpICsgJ3B4OycgK1xuICAgICAgICAnYm9yZGVyLWNvbG9yOiBibHVlIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50OycgK1xuICAgICAgICAnYm90dG9tOiAtJyArICgyKmFzIC0gMikgKyAncHg7JyArXG4gICAgJ30nICtcbiAgICAnLmFycm93ZmlsbGVyIHsnICtcbiAgICAgICAgJ2JvcmRlci13aWR0aDogJysgKGFzIC0gMikgKyAncHg7JyArXG4gICAgICAgICdib3JkZXItY29sb3I6ICNlYmYyZjIgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7JyArXG4gICAgICAgICdib3R0b206IC0nICsgKDIqYXMgLSA0KSArICdweDsnICtcbiAgICAgICAgJ3otaW5kZXg6IDE7JyArXG4gICAgJ30nXG4gICAgLCBwYXJlbnQ6ICdoZWFkJ307XG5cbiAgICBfLmRwcCAocG9wdXBTdHlsZSk7XG5cbn07IC8vIGVuZCBfLnNldFBvcHVwU3R5bGVcblxuXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5jcmVhdGVQb3B1cERpc3BsYXkgPSAoanFPYiwgZGlzcHN0ciwgb3B0aW9ucykgPT4ge1xuICAgIFxuICAgIGpxT2IgPSB0eXBlb2YganFPYiA9PT0gJ3N0cmluZycgPyAkKGpxT2IpIDoganFPYjtcblxuICAgIGRpc3BTdHJzID0gZGlzcHN0ci5zcGxpdCAoJ1xcbicpO1xuXG4gICAgdmFyIGRpc3BBID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwU3Rycy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBkaXNwU3RyID0gZGlzcFN0cnMgW2ldO1xuICAgICAgICBpZiAoaSA+IDApIHtcblxuICAgICAgICAgICAgZGlzcEEucHVzaCAoe2JyOjB9KTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoaSA+IDApXG4gICAgICAgIFxuICAgICAgICBkaXNwQS5wdXNoICh7c3BhbjogZGlzcFN0ciwgc3R5bGU6ICdkaXNwbGF5OiBpbmxpbmUtYmxvY2s7J30pO1xuXG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BTdHJzOyBpKyspXG4gICAgXG4gICAgdmFyIGRpc3BPYiA9IHtkaXY6IGRpc3BBLCBzdHlsZTogJ21hcmdpbjogMnB4Oyd9O1xuICAgIHZhciBwb3NFbCA9IF8uZ2V0UG9zRGltIChqcU9iKTtcblxuICAgICAgICAvLyBmb3JjZXMgZGl2IHdpZHRoIHRvIHdpZHRoIG9mIGNvbnRlbnRcbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTA5MDMvaG93LXRvLW1ha2UtZGl2LW5vdC1sYXJnZXItdGhhbi1pdHMtY29udGVudHNcblxuICAgIHZhciBpZEFiID0gXy5nZW5JZCAoKTtcbiAgICB2YXIgaWRBZiA9IF8uZ2VuSWQgKCk7XG5cbiAgICB2YXIgZGl2QXJyb3dCb3JkZXIgPSB7ZGl2OiAwLCBpZDogaWRBYiwgY2xhc3M6ICdhcnJvdyBhcnJvd2JvcmRlcid9O1xuICAgIHZhciBkaXZBcnJvd0ZpbGxlciA9IHtkaXY6IDAsIGlkOiBpZEFmLCBjbGFzczogJ2Fycm93IGFycm93ZmlsbGVyJ307XG5cbiAgICBpZEFiID0gJyMnICsgaWRBYjtcbiAgICBpZEFmID0gJyMnICsgaWRBZjtcblxuICAgIHZhciBwb3BPYiA9IHtkaXY6IFtkaXNwT2IsIGRpdkFycm93Qm9yZGVyLCBkaXZBcnJvd0ZpbGxlcl0sIGNsYXNzOiAncG9wdXAnfVxuICAgIHZhciBJZFBvcE9iID0gXy5kcHAgKHBvcE9iKTtcbiAgICB2YXIgcG9zUG9wdXAgPSBfLmdldFBvc0RpbSAoSWRQb3BPYik7XG5cbiAgICB2YXIgdG9wRE8gPSBwb3NFbC50b3AgLSBwb3NQb3B1cC5oZWlnaHQgLSBfLmFycm93U2l6ZTtcbiAgICB2YXIgbGVmdERPID0gcG9zRWwubGVmdCArIHBvc0VsLndpZHRoLzIgLSBwb3NQb3B1cC53aWR0aC8yO1xuXG4gICAgJChJZFBvcE9iKVxuICAgIC5vZmZzZXQgKHt0b3A6IHRvcERPLCBsZWZ0OiBsZWZ0RE99KTtcblxuICAgIHZhciBwb3NBYiA9IF8uZ2V0UG9zRGltIChpZEFiKTtcbiAgICB2YXIgcG9zQWYgPSBfLmdldFBvc0RpbSAoaWRBZik7XG5cbiAgICB2YXIgYXMgPSBfLmFycm93U2l6ZTtcbiAgICAkKGlkQWIpXG4gICAgLm9mZnNldCAoe3RvcDogcG9zQWIudG9wLCBsZWZ0OiBsZWZ0RE8gKyBwb3NQb3B1cC53aWR0aC8yIC0gYXMvMiAtIDJ9KTtcblxuICAgICQoaWRBZilcbiAgICAub2Zmc2V0ICh7dG9wOiBwb3NBZi50b3AsIGxlZnQ6IGxlZnRETyArIHBvc1BvcHVwLndpZHRoLzIgKyAxIC0gYXMvMiAtIDJ9KTtcblxuICAgICQoSWRQb3BPYilcbiAgICAuYWRkQ2xhc3MgKCdwb3B1cG5vdmlzJyk7XG5cbiAgICByZXR1cm4gSWRQb3BPYjtcbn07IC8vIGVuZCBQLmNyZWF0ZVBvcHVwRGlzcGxheSBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuaGlkZVBvcHVwcyA9IChJZCkgPT4ge1xuICAgIFxuICAgIHZhciBzZWwgPSBJZCA/IElkIDogJy5wb3B1cCc7XG5cbiAgICAkKHNlbClcbiAgICAuYWRkQ2xhc3MgKCdwb3B1cG5vdmlzJyk7XG5cblxufTsgLy8gZW5kIFAuaGlkZVBvcHVwc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnNob3dQb3B1cHMgPSAoSWQpID0+IHtcbiAgICBcbiAgICB2YXIgc2VsID0gSWQgPyBJZCA6ICcucG9wdXAnO1xuXG4gICAgJChzZWwpXG4gICAgLnJlbW92ZUNsYXNzICgncG9wdXBub3ZpcycpO1xuXG5cbn07IC8vIGVuZCBQLnNob3dQb3B1cHNcblxuXG5cblxuXG4vLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuXy5pbml0ICgpO1xuXG5yZXR1cm4gUDtcblxufTtcblxuXG5cblxuIiwiLy8gZ28tdXRpbC9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIF8gPSB7XG5cbiAgICBrZXkxOiByZXF1aXJlICgna2V5MScpXG5cbn07ICAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRkc0RvSXQgPSAob2IsIHRvVW5pY29kZSkgPT4ge1xuICAgIC8vIG9iIGlzIGFycmF5ID0+IHJldHVybnMgc2FtZSBvYlxuICAgIC8vIG9iIGlzIG9iamVjdCA9PiByZXR1cm5zIG5ldyBvYlxuICAgIFxuICAgIHZhciBuZXdPYjtcblxuICAgIGlmIChvYiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2IgPT09ICdvYmplY3QnICYmICEob2IuaGFzT3duUHJvcGVydHkgKCdfYnNvbnR5cGUnKSAmJiBvYi5fYnNvbnR5cGUgPT09ICdPYmplY3RJRCcpKSB7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSkge1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBvYiBbaV0gPSBfLmRkc0RvSXQgKG9iIFtpXSwgdG9Vbmljb2RlKTtcblxuICAgICAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBvYi5sZW5ndGg7IGkrKylcblxuICAgICAgICAgICAgbmV3T2IgPSBvYjtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBuZXdPYiA9IHt9O1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzIChvYik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzIFtpXTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBvYltrZXldO1xuICAgIFxuICAgICAgICAgICAgICAgIHZhciBuZXdLZXk7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9Vbmljb2RlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3S2V5ID0ga2V5LnJlcGxhY2UgKC9cXCQvZywgJ1xcXFx1RkYwNCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXdLZXkgPSBuZXdLZXkucmVwbGFjZSAoL1xcLi9nLCAnXFxcXHVGRjBFJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIG5ld0tleSA9IGtleS5yZXBsYWNlICgvXFxcXHVGRjA0L2csICckJyk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0tleSA9IG5ld0tleS5yZXBsYWNlICgvXFxcXHVGRjBFL2csICcuJyk7XG5cbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBpZiAodG9Vbmljb2RlKVxuICAgIFxuICAgICAgICAgICAgICAgIG5ld09iIFtuZXdLZXldID0gXy5kZHNEb0l0ICh2YWwsIHRvVW5pY29kZSk7XG4gICAgXG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwga2V5czsgaSsrKVxuICAgICAgICAgICAgXG4gICAgICAgIH0gLy8gZW5kIGlmIChBcnJheS5pc0FycmF5IChvYikpXG4gICAgICAgIFxuICAgICAgICAgICAgXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBuZXdPYiA9IG9iO1xuXG4gICAgfSAvLyBlbmQgaWYgKG9iID09PSBudWxsIHx8IHR5cGVvZiBvYiAhPT0gJ29iamVjdCcpXG5cblxuICAgIHJldHVybiBuZXdPYjtcblxufTsgIC8vIGVuZCBfLmRkc0RvSXQgXG5cblxuICAgIC8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZG9sbGFyRG90U3ViVW5pY29kZSA9IChvYikgPT4ge1xuICAgIFxuICAgIHJldHVybiBfLmRkc0RvSXQgKG9iLCB0cnVlKTtcblxufTsgIC8vIGVuZCBkb2xsYXJEb3RTdWJVbmljb2RlIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmRvbGxhckRvdFN1YlVuaWNvZGVSZXN0b3JlID0gKG9iKSA9PiB7XG4gICAgXG4gICAgcmV0dXJuIF8uZGRzRG9JdCAob2IsIGZhbHNlKTtcblxufTsgIC8vIGVuZCBkb2xsYXJEb3RTdWJVbmljb2RlUmVzdG9yZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnBDaGVjayA9IChwLCBwRGVmYXVsdCkgPT4ge1xuICAgIC8vIGRpdGNoZXMgYW55IHBhcmFtZXRlcnMgc3VwcGxpZWQgaW4gcCB0aGF0IGFyZW4ndCBwcmVzZW50IGluIHBEZWZhdWx0XG4gICAgLy8gaWYgYSBwYXJhbSBpcyBuZWNlc3NhcnkgdG8gYSByb3V0aW5lLCB0aGVuIGl0IHNob3VsZCBiZSBkZWZpbmVkIGluIHBEZWZhdWx0XG4gICAgXG4gICAgdmFyIHJlcyA9IHt9O1xuXG4gICAgcCA9IFAuaXNPYiAocCkgPyBwIDoge307XG4gICAgXG4gICAgZm9yICh2YXIga2V5IGluIHBEZWZhdWx0KSB7XG5cbiAgICAgICAgcmVzIFtrZXldID0gcC5oYXNPd25Qcm9wZXJ0eSAoa2V5KSA/IHAgW2tleV0gOiBwRGVmYXVsdCBba2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5wQ2hlY2sgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuaXNPYiA9IChvYikgPT4ge1xuICAgIC8vIHJldHVybnMgdHJ1ZSBpZiBvYiBpcyBkZWZpbmVkLCBub3QgbnVsbCwgbm90IGFuIEFycmF5IGFuZCBvZiB0eXBlIG9iamVjdFxuICAgIFxuICAgIHZhciByZXMgPSB0eXBlb2Ygb2IgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICBvYiAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheSAob2IpICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBvYiA9PT0gJ29iamVjdCc7XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5pc09iIFxuXG5cblAua2V5MSA9IF8ua2V5MTtcblxuICAgIC8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5yZXR1cm4gUDtcblxufSgpKTtcblxuXG5cbiIsIi8vIGdvLXdzLWNsaWVudC9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpcCwgcG9ydCwgY2xpZW50LCBvcHRpb25zKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgXyA9IHtcbiAgICBcbiAgICBpcDogaXAsXG4gICAgcG9ydDogcG9ydCxcbiAgICBzZWN1cmVDb25uZWN0aW9uOiBudWxsLFxuICAgIHZlcmJvc2U6IG51bGwsXG5cbiAgICB1dDogcmVxdWlyZSAoJ2dvLXV0aWwnKSxcbiAgICBwY2hlY2s6IG51bGwsXG4gICAga2V5MTogbnVsbCxcblxuICAgIHdzU2VydmVyOiBudWxsXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uaW5pdCA9ICgpID0+IHtcblxuICAgIF8ucGNoZWNrID0gXy51dC5wQ2hlY2s7XG4gICAgXy5rZXkxID0gXy51dC5rZXkxO1xuXG4gICAgdmFyIHBhcmFtcyA9IF8ucGNoZWNrIChvcHRpb25zLCB7c2VjdXJlQ29ubmVjdGlvbjogZmFsc2UsXG4gICAgICAgIHZlcmJvc2U6IGZhbHNlfSk7XG5cbiAgICBfLnNlY3VyZUNvbm5lY3Rpb24gPSBwYXJhbXMuc2VjdXJlQ29ubmVjdGlvbjtcbiAgICBfLnZlcmJvc2UgPSBwYXJhbXMudmVyYm9zZTtcblxuICAgIGlmIChfLnZlcmJvc2UpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyAoJ3dzQ2xpZW50IHBhcmFtczogJyArIEpTT04uc3RyaW5naWZ5IChwYXJhbXMpICsgJ1xcbicpO1xuXG4gICAgfSAvLyBlbmQgaWYgKF8udmVyYm9zZSlcbiAgICBcbiAgICBfLnRzdENtZHMgPSAge3Bpbmc6IF8udHN0Q21kUGluZ1Jlc3B9O1xuICAgIF8uY2xpZW50ID0gY2xpZW50ID8gY2xpZW50IDogXy5yZXBvcnRNc2dPYjtcblxuICAgIHZhciB3c1ByZWZpeCA9IF8uc2VjdXJlQ29ubmVjdGlvbiA/ICd3c3MnIDogJ3dzJztcbiAgICB2YXIgd3NVcmwgPSB3c1ByZWZpeCArICc6Ly8nICsgXy5pcCArICc6JyArIF8ucG9ydDtcblxuICAgIF8ud3NTZXJ2ZXIgPSBuZXcgV2ViU29ja2V0ICh3c1VybCk7XG5cbiAgICBfLndzU2VydmVyLm9ubWVzc2FnZSA9IF8uZnJvbVNydnI7XG4gICAgXy53c1NlcnZlci5vbmNsb3NlID0gXy5tc2dDbG9zZTtcbiAgICBfLndzU2VydmVyLm9uZXJyb3IgPSBfLm1zZ0Vycm9yO1xuXG59OyAvLyBlbmQgXy5pbml0IFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRvQ21kID0gKHVNc2dPYikgPT4ge1xuXG4gICAgdmFyIGZyb21TcnZyID0gSlNPTi5zdHJpbmdpZnkgKHVNc2dPYik7XG5cbiAgICBpZiAoXy52ZXJib3NlKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyAoJyAgPT0+IHdzQ2xpZW50LmZyb21TcnZyOiAnICsgZnJvbVNydnIpO1xuXG4gICAgfSAvLyBlbmQgaWYgKF8udmVyYm9zZSlcbiAgICBcbiAgICB1TXNnT2IgPSBBcnJheS5pc0FycmF5ICh1TXNnT2IpID8gdU1zZ09iIDogW3VNc2dPYl07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVNc2dPYi5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBtc2dPYiA9IHVNc2dPYiBbaV07XG5cbiAgICAgICAgdmFyIGNtZCA9IF8ua2V5MSAobXNnT2IpO1xuICAgIFxuICAgICAgICBpZiAoXy50c3RDbWRzLmhhc093blByb3BlcnR5IChjbWQpKSB7XG4gICAgXG4gICAgICAgICAgICBfLnRzdENtZHMgW2NtZF0gKG1zZ09iIFtjbWRdKTtcbiAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgIF8uY2xpZW50IChtc2dPYik7XG4gICAgXG4gICAgICAgIH0gLy8gZW5kIGlmIChfLnRzdENtZHMuaGFzT3duUHJvcGVydHkgKGNtZCkpXG4gICAgXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCB1TXNnT2IubGVuZ3RoOyBpKyspXG5cbn07IC8vIGVuZCBfLmRvQ21kIFxuXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZG9TZW5kID0gKG1zZykgPT4ge1xuXG4gICAgaWYgKF8udmVyYm9zZSkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nICgnXy5kb1NlbmQubXNnOiAnICsgbXNnICsgJ1xcbicpO1xuXG4gICAgfSAvLyBlbmQgaWYgKF8udmVyYm9zZSlcbiAgICBcbiAgICBfLndzU2VydmVyLnNlbmQgKG1zZyk7XG5cbn07IC8vIGVuZCBfLmRvU2VuZCBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5mcm9tU3J2ciA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIHZhciBtc2cgPSBldmVudC5kYXRhO1xuXG4gICAgaWYgKF8udmVyYm9zZSkge1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cgKCdfLmZyb21TcnZyLmV2ZW50LmRhdGE6ICcgKyBtc2cpO1xuXG4gICAgfSAvLyBlbmQgaWYgKF8udmVyYm9zZSlcbiAgICBcbiAgICBfLmRvQ21kIChKU09OLnBhcnNlIChtc2cpLm0pO1xuXG59OyAvLyBlbmQgXy5mcm9tU3J2ciBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8ubXNnQ2xvc2UgPSAoZXZlbnQpID0+IHtcbiAgICBcbiAgICBjb25zb2xlLmxvZyAoJ2Nsb3NlIGV2ZW50OiAnICsgZXZlbnQuZGF0YSk7XG5cbn07IC8vIGVuZCBfLm1zZ0Nsb3NlIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLm1zZ0Vycm9yID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgdmFyIGV2ZW50TXNnID0gZXZlbnQuZGF0YSA/ICcgZXZlbnQuZGF0YTogJyArIGV2ZW50LmRhdGEgOiBcIlwiO1xuICAgIFxuICAgIHZhciBlcnJNc2cgPSAnd3NDbGllbnQgbXNnRXJyb3IgKFNlcnZlciBpcyBEb3duPyknICsgZXZlbnRNc2c7XG4gICAgY29uc29sZS5sb2cgKGVyck1zZyk7XG5cbiAgICAkKCdib2R5JykucHJlcGVuZCAoZXJyTXNnKTtcblxufTsgLy8gZW5kIF8ubXNnQ2xvc2UgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8ucmVwb3J0TXNnT2IgPSAobXNnT2IpID0+IHtcbiAgICBcbiAgICBjb25zb2xlLmxvZyAoJ18ucmVwb3J0TXNnT2IubXNnT2I6ICcgKyBtc2dPYiArICdcXG4nKTtcblxufTsgLy8gZW5kIF8ucmVwb3J0TXNnT2IgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8udHN0Q21kUGluZ1Jlc3AgPSAocGluZ01zZykgPT4ge1xuICAgIFxuICAgIGNvbnNvbGUubG9nICgncGluZzogJyArIHBpbmdNc2cpO1xuICAgIHJldHVybjtcblxufTsgLy8gZW5kIF8udHN0Q21kUGluZ1Jlc3AgXG5cbl8uaW5pdCAoKTtcblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBwID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5wLnRvU3J2ciA9IChtc2dPYikgPT4ge1xuICAgIFxuICAgIHZhciBtc2dPYlMgPSBKU09OLnN0cmluZ2lmeSAoe206bXNnT2J9KTtcblxuICAgIGlmIChfLnZlcmJvc2UpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyAoJ3AudG9TcnZyLm1zZ09iUyA6ICcgKyBtc2dPYlMgKyAnXFxuJyk7XG5cbiAgICB9IC8vIGVuZCBpZiAoXy52ZXJib3NlKVxuICAgIFxuICAgIF8uZG9TZW5kIChtc2dPYlMpO1xuXG59OyAvLyBlbmQgXy50b1NydnIgXG5cblxucmV0dXJuIHA7XG5cbn07XG5cblxuXG4iLCIvLyBrZXkxLmpzXG5cbi8vIGtleTEgZXh0cmFjdHMgdGhlIHNpbmdsZSBrZXkgZnJvbSBhbiBvYmplY3QgXG4vLyBjb250YWluaW5nIG9ubHkgb25lIGtleS92YWx1ZSBwYWlyXG4vLyBhbmQgcmV0dXJucyB0aGUgc3RyaW5nIHZhbHVlIGZvciB0aGUga2V5XG4vLyBhbnl0aGluZyBlbHNlIHBhc3NlZCB0byBrZXkxIHJldHVybnMgbnVsbFxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG52YXIga2V5MSA9IChvYikgPT4ge1xuXG4gICAga2V5ID0gbnVsbDtcblxuICAgIHZhciB1bmlxdWVLZXlFeGlzdHMgPSB0eXBlb2Ygb2IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9iICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KG9iKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2IgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iKS5sZW5ndGggPT09IDE7XG4gICAgXG4gICAgaWYgKHVuaXF1ZUtleUV4aXN0cykge1xuICAgIFxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iKTtcbiAgICAgICAga2V5ID0ga2V5c1swXTtcbiAgICBcbiAgICB9IC8vIGVuZCBpZiAodW5pcXVlS2V5RXhpc3RzKVxuICAgIFxuICAgIHJldHVybiBrZXk7XG4gICAgXG59OyAvLyBlbmQga2V5MSBcblxucmV0dXJuIGtleTE7XG5cbn0oKSk7XG4iXX0=
