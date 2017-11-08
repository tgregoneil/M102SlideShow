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
    IdSlides: null,

    bookmarks: null,
    bookmarkLst: null,
    IdBookmark: null,
    IdBookmarkS: null,
    IdDelB: null,
    IdAddB: null,
    IdBookS: null,

    ctI: null,
    topicsI: null,
    topicRefs: null,
    topicRef: null,
    IdNav: null,
    IdPageCt: null,
    IdNavPN: null,
    topicToVideo: null,
    slideToVideo: null,
    hiddenSlide: null,
    IdVideoPlaying: null,
    //srvAws: '52.33.170.21'
    srvAws: '34.215.194.129'

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
_.initBookmarks = () => {

    _.bookmarkLst = [];
    _.bookmarksFromCookie ();

    var id = _.genId ();
    var addB = {span: 'add bookmark', id: id, class: 'bookmark'};
    _.IdAddB = '#' + id;

    var id = _.genId ();
    var delB = {span: 'del bookmark', id: id, class: 'bookmark'};
    _.IdDelB = '#' + id;

    var id = _.genId ();
    var bookS = {div: 0, id: id};
    _.IdBookS = '#' + id;

    _.IdBookmarkS = _.dpp ({div: [addB, delB, bookS], class: 'bookmarks novis', parent: _.IdBookmark});

    $(_.IdAddB + ',' + _.IdDelB)
    .hover (
        function () {
            $(this)
            .css ({color: 'red'});
        },
        function () {
            $(this)
            .css ({color: 'black'});
    });

    $(_.IdAddB)
    .click (function () {
        _.bookmarks [_.curVis] = 1;
        _.bookmarksToCookie ();
        _.bookmarksShow ();
    })

    $(_.IdDelB)
    .click (function () {
        delete _.bookmarks [_.curVis];
        _.bookmarksToCookie ();
        _.bookmarksShow ();
    })

}; // end _.initBookmarks


//---------------------
_.initStyle = () => {

    var style = {style:
        "body {" +
            "margin-left: 15px;" +
        "}" +
        ".bookmark {" +
            "white-space: nowrap;" +
            "font-size: 12px;" +
            "margin: 0;" +
            "padding: 0;" +
        "}" +
        ".bookmarks {" +
            "background-color: #E5FFF2;" +
            "border: 1px solid #B3B3FF;" +
            "border-radius: 3px;" +
            "position: absolute;" +
            "z-index: 1;" +
            "top: 2px;" +
            "right: 2px;" +
        "}" +
        ".bookmarkheader {" +
            "font-style: italic;" +
            "font-weight: 200;" +
            "text-align: center;" +
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
        ".symbolwrap {" +
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
            "display: inline-block;" +
            "position: relative;" +
        "}" +
        ".symbol {" +
            "position: relative;" +
            "top: -1px;" +
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
_.bookmarkAdd = (slide) => {

    var bookmark = _.bookmarkLst [slide].replace (/-(.*)_/, '    $1    ');
    var Id = _.dpp ({pre: bookmark, parent: _.IdBookS, name: slide, class: 'bookmark'})

    $(Id)
    .click (function () {
        var n = $(this).attr ('name');
        _.setNextVis (n - _.curVis);

        $(_.IdBookmarkS)
        .addClass ('novis');
    })
    .hover (
        function () {
            $(this)
            .css ({color: 'red'});
        },
        function () {
            $(this)
            .css ({color: 'black'});
    });


}; // end _.bookmarkAdd


//---------------------
_.bookmarksShow = () => {

    if (_.bookmarks.hasOwnProperty (_.curVis)) {

        $(_.IdDelB)
        .removeClass ('novis');

        $(_.IdAddB)
        .addClass ('novis');

    } else {

        $(_.IdDelB)
        .addClass ('novis');

        $(_.IdAddB)
        .removeClass ('novis');

    } // end if (_.bookmarks.hasOwnProperty (_.curVis))

    $(_.IdBookS)
    .empty ();

    var slides = Object.keys (_.bookmarks).sort (function compareNumbers(a, b) {
        return a - b;
    });

    if (slides.length > 0) {

        _.dpp ({div: 'Week Topic SlideNum', parent: _.IdBookS, class: 'bookmark bookmarkheader'});

    } // end if (slides.length > 0)
    
    for (var i = 0; i < slides.length; i++) {

        var slide = slides [i];
        _.bookmarkAdd (slide);

    } // end for (var i = 0; i < slides; i++)

    $(_.IdBookmarkS)
    .removeClass ('novis')
        // actually show the bookmark

    .hover (function () {
        // bookmarks initially positioned under cursor, so nothing to do for hover-in

    }, function () {
        $(this)
        .addClass ('novis')
    })




}; // end _.bookmarksShow


//---------------------
_.bookmarksFromCookie = () => {
    
    var bookmarksSfied = document.cookie.match (/m102bookmarks=([^;]+)/);

    _.bookmarks = !bookmarksSfied ?  {} : JSON.parse (bookmarksSfied [1]);

}; // end _.bookmarksFromCookie


//---------------------
_.bookmarksToCookie = () => {
    
    var cookie = 'm102bookmarks=' + JSON.stringify (_.bookmarks) + '; expires=Thu, 1 Jan 2030 00:00:00 UTC; path=/';
    document.cookie = cookie;

}; // end _.bookmarks2Cookie


//---------------------
_.displayNav = () => {

    var navSpans = [{span: '>', id: 'navr', class: 'nav'},
    {span: '<', id: 'navl', class: 'nav'}];

    navSpans.parent = _.IdNavPN;

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

        divOb.parent = _.IdSlides;
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

                _.IdSampleTopic = dispRef;

            } // end if (topic === '01_WelcomeWeek3')

            topics [topic] = 1;

            slideCount = 1;
            _.topicsI.push (slideCount);

        } else {

            slideCount++;
            _.topicsI [_.topicsI.length - 1] = slideCount;

        } // end if (!topics.hasOwnProperty (topic))

        var bookmarkName = videoTopic + '_' + slideCount;;
        _.bookmarkLst.push (bookmarkName);

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
            var Id = '#' + event.target.id;

            $(this)
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

    $(_.IdVideo)
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
    _.pi.createPopupDisplay (_.IdSampleTopic,
        'Click to navigate directly\nto beginning of topic');
    _.pi.createPopupDisplay (_.IdCurSlide,
        'Current slide In topic/\nTotal slides in topic');
    _.pi.createPopupDisplay (_.IdVideo,
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

    $(_.IdBookmark)
    .hover (function () {
        $(this)
        .css ({'background-color': '#ffa0a0'});
        _.bookmarksShow ();

    }, function () {
        $(this)
        .css ({'background-color': '#0e0'});

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

    var IdContainer = _.dpp ({div: 0, class: 'w700 m10'});

    var idBookmark = _.genId ();

    var idHelp = _.genId ();
    _.dpp ({div:
        {h4: [
            'Slideshow M102: MongoDB for DBAs (Jan/Feb 2017)',
            {div: {span: '?', class: 'symbol'}, id: idHelp, class: 'symbolwrap'},
            {div: {span: 'B', class: 'symbol'}, id: idBookmark, class: 'symbolwrap', style: 'margin-right: 10px;'}
        ], class: 'header'},
        class: 'row w700',
        parent: IdContainer}
    );

    _.IdBookmark = '#' + idBookmark;
    _.initBookmarks ();

    _.IdHelp = '#' + idHelp;

    _.IdSlides = _.dpp ({div: 0, name: 'slides', class: 'row w700 prel', parent: IdContainer});

    var IdNav = _.dpp ({div:0, name: 'nav', class: 'row w700 prel t40', parent: IdContainer});

    var IdVideoDiv = _.dpp ({div:0, class: 'col-sm-7', parent: IdNav});
    _.IdVideo = _.dpp ({span: 'Video', parent: IdVideoDiv, class: 'navpos video'});

    _.IdPageCt = _.dpp ({div:0, class: 'col-sm-2', parent: IdNav});

    _.IdNavPN = _.dpp ({div:0, class: 'col-sm-3', parent: IdNav});

    var IdTopicRows = _.dpp ({div:0, name: 'topicRows', parent: IdContainer, class: 'w700 prel t40'});

    var IdRow1 = _.dpp ({div: 0, name: 'topicRows1', class: 'row topicrows', parent: IdTopicRows})
    var IdRow2 = _.dpp ({div: 0, name: 'topicRows2', class: 'row topicrows', parent: IdTopicRows})

    _.makeCols (0, IdRow1, 4);
    _.makeCols (4, IdRow2, 3);

}; // end _.layout


//---------------------
_.makeCols = (baseId, IdRow, numCols) => {

    var cols = [];
    for (var i = 0; i < numCols; i++) {

        var id = 'W' + (i + 1 + baseId);
        cols.push ({div: 0, id: id, class: 'cols col-sm-3', parent: IdRow});

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

    $(_.IdVideo)
    .text ('Slide')
    .off ('click')
    .click (_.restoreSlide);

    var src = 'https://www.youtube.com/embed/' + _.slideToVideo [_.curVis] + '?autoplay=1';
    _.IdVideoPlaying = _.dpp ({iframe: 0, src: src, class: 'imgvideo', parent: _.hiddenSlide, prepend: 1});

}; // end _.playVideo


//---------------------
_.restoreSlide = () => {

    $(_.IdVideoPlaying)
    .remove ();

    $(_.hiddenSlide + '> img')
    .removeClass ('novis');

    $(_.hiddenSlide + '> .caption')
    .removeClass ('novis');

    $(_.IdVideo)
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

    var IdPrev = '#j' + _.curVis;
    var IdNext = '#j' + nextVis;

    $(IdPrev)
    .addClass ('novis');

    $(IdNext)
    .removeClass ('novis');

    _.curVis = nextVis;

    var ctRef = _.ctI [nextVis];

    var slideI = ctRef [0];
    var topicIdx = ctRef [1];
    var totalInSection = _.topicsI [topicIdx];

    _.dpp ({empty: _.IdPageCt});
    _.IdCurSlide = _.dpp ({span: 'slide: ' + slideI + '/' + totalInSection,
        parent: _.IdPageCt,
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

module.exports = function (jqSelector, reportShift, keyDownHandler, reportUp, keyUpHandler) {

// PRIVATE Properties/Methods
var _ = {

    jqSelector: 'body',
    reportShift: false,
    keyDownHandler: null,
    reportUp: false,
    keyUpHandler: null,

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
    _.keyDownHandler = keyDownHandler ? keyDownHandler : _.defaultHandler;
    _.reportUp = reportUp ? reportUp : false;
    _.keyUpHandler = keyUpHandler ? keyUpHandler : _.defaultHandler;

    P.setKeyUpDown ();

}; // end _.init

//---------------------
_.cKeyDown = (event) => {
    // callback is _.keyDownHndler
    // returns ch object reflecting which shift keys were pressed down, ch and which values
    //
    // _.reportShift true => trigger callback for each keydown event of any key, 
    //                       including any shift key
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

    _.cKeyUpDownFinish (isAShiftKey, which, _.keyDownHandler);

}; // end _.cKeyDown 


//---------------------
_.cKeyUp = (event) => {
    // callback is _.keyDownHndler
    
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
            _.kShift = false;
            break;
        case 17: 
            _.kCtrl = false;
            break;
        case 18: 
            _.kAlt = false;
            break;
        case 91: 
        case 92: 
        case 93: 
        case 224: 
            _.kCmd = false;
            break;

        default:
            isAShiftKey = false;
            break;

    }   

    if (!_.reportUp) {

        return;

    } // end if (!reportUp)
    
    _.cKeyUpDownFinish (isAShiftKey, which, _.keyUpHandler);

}; // end _.cKeyUp 

//---------------------
_.cKeyUpDownFinish = (isAShiftKey, which, callback) => {
    
    if (isAShiftKey && !_.reportShift) {

        return;

    } // end if (isAShiftKey && !_.reportShift)
    
    var thisCh = _.getKeyCode (which);

    var chOb = ({
        shift: _.kShift,
        ctrl: _.kCtrl,
        alt: _.kAlt,
        macCmd: _.kCmd,
        which: which,
        ch: thisCh,
        isAShiftKey: isAShiftKey,
    });

    // console.log ('chOb: ' + JSON.stringify (chOb) + '\n');
    /*
    if (_.reportShift) {

        chOb.isAShiftKey = isAShiftKey;  
            // true if any of: shift, ctrl, alt, or macCmd are true
            // only relevant if _.reportShift is true

    } // end if (_.reportShift)
    */

    callback (chOb);

}; // end _.cKeyUpDownFinish 


//---------------------
_.defaultHandler = (chOb) => {
    
    var chObS = JSON.stringify (chOb);
    console.log ('key._.defaultHandler.chOb: ' + chObS);

}; // end _.defaultHandler 



//---------------------
_.getKeyCode = (which) => {
    

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

}; // end _.getKeyCode 



//---------------------
_.initKeyDown = (jqSelector) => {
    
    $(jqSelector)
    .off('keydown')
    .keydown (function (event) {
        //console.log (' ==> initKeyDown');
        _.cKeyDown (event);
    });

}; // end _.initKeyDown 


//---------------------
_.initKeyUp = (jqSelector) => {
    
    $(jqSelector)
    .off('keyup')
    .keyup (function (event) {
        //console.log (' ==> initKeyUp');
        _.cKeyUp (event);
    });

}; // end _.initKeyUp 



// PUBLIC Properties/Methods
var P = {};

//---------------------
P.setKeyUpDown = () => {
    
    _.initKeyUp ('body');
    _.initKeyDown ('body');

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
    
    var res;

    var doReplace = function (key) {
        var newKey;

        if (toUnicode) {

            newKey = key.replace (/\$/g, '\\uFF04');
            newKey = newKey.replace (/\./g, '\\uFF0E');

        } else {

            newKey = key.replace (/\\uFF04/g, '$');
            newKey = newKey.replace (/\\uFF0E/g, '.');

        } // end if (toUnicode)
        
        return newKey;
    };

    if (ob !== null && typeof ob === 'object' && !(ob.hasOwnProperty ('_bsontype') && ob._bsontype === 'ObjectID')) {

        var i;
        if (Array.isArray (ob)) {

            for (i = 0; i < ob.length; i++) {

                ob [i] = _.ddsDoIt (ob [i], toUnicode);

            } // end for (var i = 0; i < ob.length; i++)

            res = ob;

        } else {

            res = {};

            var keys = Object.keys (ob);
            for (i = 0; i < keys.length; i++) {

                var key = keys [i];

                var val = ob[key];
    
                var newKey = doReplace (key);
    
                res [newKey] = _.ddsDoIt (val, toUnicode);
    

            } // end for (var i = 0; i < keys; i++)
            
        } // end if (Array.isArray (ob))
        
    } else {

        res = ob;

    } // end if (ob === null || typeof ob !== 'object')


    return res;

};  // end _.ddsDoIt 


    // PUBLIC Properties/Methods
var P = {};


//---------------------
P.arToOb = (ar) => {
    
    var ob = {};
    
    if (Array.isArray (ar)) {

        for (var i = 0; i < ar.length; i++) {

            var name = ar [i];
            ob [name] = i;

        } // end for (var i = 0; i < ar.length; i++)

    } // end if (Array.isArray (ar))
    return ob;

}; // end P.arToOb 


//---------------------
P.cloneOb = (ob) => {
    // assumes no values that are function types
    
    return JSON.parse (JSON.stringify (ob));

}; // end P.cloneOb 


//---------------------
P.constStr = (ch, length) => {
    
    var res = new Array (length + 1).join (ch);
    return res;

}; // end constStr 


//---------------------
P.dollarDotSubUnicode = (ob) => {
    
    return _.ddsDoIt (ob, true);

};  // end dollarDotSubUnicode 


//---------------------
P.dollarDotSubUnicodeRestore = (ob) => {
    
    return _.ddsDoIt (ob, false);

};  // end dollarDotSubUnicodeRestore


//---------------------
P.dumpOb = (ob, depth) => {
    
    depth = depth ? depth : 0;

    var indentCur;
    var indentDelta;
    var keys = [];

    //---------------------
    var dumpObInit = () => {
        
        indentCur = 0;
        indentDelta = 4;
    
    }; // end dumpObInit
    

    //---------------------
    var decrIndent = () => {
        
        indentCur -= indentDelta;
    
    }; // end decrIndent
    
    //---------------------
    var incrIndent = () => {
        
        indentCur += indentDelta;
    
    }; // end incrIndent
    
    //---------------------
    var doIndent = () => {
        
        return " ".repeat (indentCur);
    
    }; // end doIndent
    
    //---------------------
    var topKey = () => {
    
        var res = "";
        var startI;

        if (keys.length <= depth) {

            startI = 0;

        } else {

            startI = keys.length - depth;

        } // end if (keys.length <= depth)
        
        
        for (var i = startI; i < keys.length; i++) {

            res += keys [i];
            res += i === keys.length - 1 ? "" : ".";

        } // end for (var i = 0; i < keys.length; i++)
        
        return res;

    }; // end topKey


    //---------------------
    var dumpKeyPair = (ob, key) => {
    
        var prefix = topKey ();

        var res = doIndent ();
        var val = ob [key];

        keys.push (key);
        res += prefix !== "" ? prefix + '.' : "";
        res += key + ': ';

        if (key === '_id' && P.isOb (val) && val.hasOwnProperty ('_bsontype') && val._bsontype === 'ObjectID') {

            res += 'ObjectId("' + val + '")';

        } else {

            res += dumpObH (val);

        } // end if (key === '_id' && P.isOb (val) && val.hasOwnProperty ('_bsontype') && val._bsontype === 'ObjectID')
        
        keys.pop ();

        res += "\n";

        return res;

    }; // end dumpKeyPair 

    

    //---------------------
    var dumpObH = (ob) => {
        
        var res;
        if (typeof ob === 'undefined') {
    
            res = 'undefined';
    
        } else if (ob === null) {
    
            res = 'null';
    
        } else if (typeof ob === 'boolean') {
    
            res = ob ? 'true' : 'false';
    
        } else if (typeof ob === 'number') {
    
            res = "" + ob;
    
        } else if (typeof ob === 'string') {
    
            if (!ob.match (/'/)) {
    
                res = "'" + ob + "'";
    
            } else if (!ob.match (/"/)) {
    
                res = '"' + ob + '"';
    
            } else {
    
                res = '"' + ob.replace (/"/, '\\"') + '"';
    
            } // end if (!ob.match (/'/))
            
        } else if (Array.isArray (ob)) {
    
            if (ob.length === 0) {
    
                res = '[]';
    
            } else {
    
                res = "[\n";
                incrIndent ();
    
                for (var i = 0; i < ob.length; i++) {
    
                    res += dumpKeyPair (ob, i);
    
                } // end for (var i = 0; i < ob.length; i++)
    
                decrIndent ();
    
                res += doIndent ();
                res += "]" ;
    
            } // end if (ob.length === 0)
    
        } else if (typeof ob === 'object') {
    
            var keys = Object.keys (ob).sort ();
    
            if (keys.length === 0) {

                res = "{}";

            } else {

                res = "{\n";
                incrIndent ();
    
                keys.forEach (function (key) {

                    res += dumpKeyPair (ob, key);
        
                });

                decrIndent ();
                res += doIndent ();
                res += "}";

            } // end if (keys.length === 0)
    
        } else {
    
            res = 'unknown: ' + typeof ob;
    
        } // end if (typeof ob === 'undefined')
        
        return res;
    
    }; // end dumpObH
    
    dumpObInit ();
    return dumpObH (ob);

}; // end P.dumpOb 



//---------------------
P.isEmpty = (item) => {
    
    var res = false;

    switch (typeof item) {

        case 'string':

            res = item.length === 0;
            break;

        case 'undefined':

            res = true;
            break;

        case 'object':

            if (P.isOb (item)) {

                var keys = Object.keys (item);
                res = keys.length === 0;

            } else if (item === null) {

                res = true;

            } else if (Array.isArray (item)) {

                res = item.length === 0;

            } else {

                res = null;  // case shouldn't happen, so set to null if it does

            } // end if (P.isOb (item))
            
            break;

        case 'boolean':

            res = !item;
            break;

        case 'number':

            res = number === 0;
            break;

    } // end switch (typeof item)
    

    return res;
}; // end P.isEmpty 


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
P.stripQJ = (jsonStr) => {
    
    var res = jsonStr.replace (/"([^"]+)"\s*:/g, "$1:");
    return res;

}; // end P.stripQJ 


//---------------------
P.traverseArray = (arr, fnEl) => {
    
    if (Array.isArray (arr)) {

        arr.forEach (function (el) {

            P.traverseArray (el, fnEl);

        });

    } else {

        if (P.isOb (arr)) {

            var val = P.val1 (arr);

            if (Array.isArray (val)) {

                P.traverseArray (val, fnEl);

            } else {

                fnEl (arr);

            } // end if (Array.isArray (val))
            

        } else {

            fnEl (arr);

        } // end if (P.isOb (arr))

    } // end if (Array.isArray (arr))
    

}; // end P.traverseArray 


//---------------------
P.val1 = (ob) => {
    
    var key1 = P.key1 (ob);
    var res = key1 ? ob [key1] : null;

    return res;

}; // end P.val1 



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
    minsec: require ('minsec').getMinSec,
    msgShorten0: require ('msgshorten'),
    msgShorten: null,
    pcheck: null,
    key1: null,

    wsServer: null

}; // end PRIVATE properties

//---------------------
_.init = () => {

    _.pcheck = _.ut.pCheck;
    _.key1 = _.ut.key1;

    var targetLength = 200;
    _.msgShorten = new _.msgShorten0 (targetLength);

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
    var fromSrvrShort = _.msgShorten.msgShorten (fromSrvr);

    if (_.verbose) {
        
        console.log ('  ==> wsClient.fromSrvr: ' + fromSrvrShort);

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
    
    var time = _.minsec ();
    var msg = event.data;
    var msgm = JSON.parse (msg);
    var msgOb = msgm.m;
    var msgObShort = _.msgShorten.msgShorten (msgOb);
        console.log ('<==== ' + time + ' wsClient.fromSrvr: ' + msgObShort + '\n');

    _.doCmd (msgOb);

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
    var time = _.minsec ();
    var msgObShort = _.msgShorten.msgShorten (msgOb);
    console.log ('\n\n====> ' + time + ' wsClient.toSrvr: ' + msgObShort + '\n');
    
    var msgObS = JSON.stringify ({m:msgOb});

    if (_.verbose) {

        console.log ('p.toSrvr.msgObS : ' + msgObS + '\n');

    } // end if (_.verbose)
    
    _.doSend (msgObS);

}; // end _.toSrvr 


return p;

};




},{"go-util":6,"minsec":9,"msgshorten":10}],8:[function(require,module,exports){
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
    
    } else if (Array.isArray (ob)) {

        var ob0 = ob [0];
        var uniqueArrayKeyExists = typeof ob0 !== 'undefined' &&
                                   ob0 !== null &&
                                   typeof ob0 !== 'object';

        if (uniqueArrayKeyExists) {
            
            key = ob0;

        } // end if (uniqueArrayKeyExists)


    } // end if (uniqueKeyExists)
    
    return key;
    
}; // end key1 

return key1;

}());

},{}],9:[function(require,module,exports){
// index.js => minsec

// get minutes:seconds.milliseconds


module.exports = (function () {

    // PRIVATE Properties/Methods
var _ = {
};  // end PRIVATE properties

_.init = () => {
};

    // PUBLIC Properties/Methods
var P = {};

//---------------------
P.getMinSec = () => {
    
    var dt = new Date();
    var stStr = dt.toJSON ();

    var matched = stStr.match (/.*?:(.*)Z/);

    var res = matched [1];
    return res;

}; // end P.getMinSec



    // end PUBLIC section

_.init ();

return P;

}());







},{}],10:[function(require,module,exports){
// index.js

module.exports = function (targetLength) {

    // PRIVATE Properties/Methods
var _ = {

    targetLength: targetLength ? targetLength : null,

};  // end PRIVATE properties

_.init = () => {
};

    // PUBLIC Properties/Methods
var P = {};

//---------------------
P.msgShorten = (msgOb) => {
    
    var msgObStr = JSON.stringify (msgOb);
    if (msgObStr.length > _.targetLength) {

        var halfLength = Math.ceil (_.targetLength / 2);

        var firstHalf = msgObStr.substr (0, halfLength);
        var secondHalf = msgObStr.substr (msgObStr.length - halfLength, halfLength)

        msgObStr = firstHalf + '  <==^^|^^==>  ' + secondHalf;

    } // end if (msgObStr.length > _.targetLength)
    

    return msgObStr;

}; // end P.msgShorten 


    // end PUBLIC section

_.init ();

return P;

};




},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NyYy9ub2RlX21vZHVsZXNfZ2xvYmFsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXgwLmpzIiwic2xpZGVTaG93LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLWpzb24yaHRtbC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby1rZXkvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tcG9waW5mby9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby11dGlsL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLXdzLWNsaWVudC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9rZXkxL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL21pbnNlYy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9tc2dzaG9ydGVuL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdnpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLy8gY21kckluaXQuanNcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIF8gPSB7XG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG5cbl8uaW5pdCA9ICgpID0+IHtcblxuICAgIHZhciBjID0gcmVxdWlyZSAoJy4vc2xpZGVTaG93LmpzJyk7XG4gICAgbmV3IGMgKCk7XG59O1xuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuKGZ1bmN0aW9uICgpIHtcblxuICAgICQoZG9jdW1lbnQpLnJlYWR5IChfLmluaXQpO1xuXG59KSAoKTtcblxuXG5cbnJldHVybiBQO1xuXG59KSAoKTtcblxuXG5cblxuXG4iLCIvLyBzbGlkZVNob3cuanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgXyA9IHtcblxuICAgIHdzOiByZXF1aXJlICgnZ28td3MtY2xpZW50JyksXG4gICAga2V5OiByZXF1aXJlICgnZ28ta2V5JyksXG4gICAgajJoOiByZXF1aXJlICgnZ28tanNvbjJodG1sJyksXG4gICAgcGk6IHJlcXVpcmUgKCdnby1wb3BpbmZvJyksXG4gICAga2V5MTogcmVxdWlyZSAoJ2tleTEnKSxcblxuICAgIGRwcDogbnVsbCxcbiAgICBjdXJWaXM6IG51bGwsXG4gICAgbWF4SW1hZ2VzOiBudWxsLFxuICAgIElkU2xpZGVzOiBudWxsLFxuXG4gICAgYm9va21hcmtzOiBudWxsLFxuICAgIGJvb2ttYXJrTHN0OiBudWxsLFxuICAgIElkQm9va21hcms6IG51bGwsXG4gICAgSWRCb29rbWFya1M6IG51bGwsXG4gICAgSWREZWxCOiBudWxsLFxuICAgIElkQWRkQjogbnVsbCxcbiAgICBJZEJvb2tTOiBudWxsLFxuXG4gICAgY3RJOiBudWxsLFxuICAgIHRvcGljc0k6IG51bGwsXG4gICAgdG9waWNSZWZzOiBudWxsLFxuICAgIHRvcGljUmVmOiBudWxsLFxuICAgIElkTmF2OiBudWxsLFxuICAgIElkUGFnZUN0OiBudWxsLFxuICAgIElkTmF2UE46IG51bGwsXG4gICAgdG9waWNUb1ZpZGVvOiBudWxsLFxuICAgIHNsaWRlVG9WaWRlbzogbnVsbCxcbiAgICBoaWRkZW5TbGlkZTogbnVsbCxcbiAgICBJZFZpZGVvUGxheWluZzogbnVsbCxcbiAgICAvL3NydkF3czogJzUyLjMzLjE3MC4yMSdcbiAgICBzcnZBd3M6ICczNC4yMTUuMTk0LjEyOSdcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG5fLmluaXQgPSAoKSA9PiB7XG5cbiAgICBfLmRwcCA9IF8uajJoLmRpc3BsYXlQYWdlO1xuICAgIF8uZ2VuSWQgPSBfLmoyaC5nZW5JZDtcblxuICAgIF8ucGkgPSBuZXcgXy5waSAoXy5qMmgpO1xuXG4gICAgdmFyICBndCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgdmFyIGlwU3JjID0gZ3QubWF0Y2ggKC9naXRodWIvKSA/IF8uc3J2QXdzIDogJ2xvY2FsaG9zdCc7XG4gICAgXy53cyA9IG5ldyBfLndzIChpcFNyYywgODAwMSwgUC5kb0FjdGlvbik7XG5cbiAgICBuZXcgXy5rZXkgKCdib2R5JywgZmFsc2UsIF8ua2V5RmlsdGVyKTtcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmluaXRCb29rbWFya3MgPSAoKSA9PiB7XG5cbiAgICBfLmJvb2ttYXJrTHN0ID0gW107XG4gICAgXy5ib29rbWFya3NGcm9tQ29va2llICgpO1xuXG4gICAgdmFyIGlkID0gXy5nZW5JZCAoKTtcbiAgICB2YXIgYWRkQiA9IHtzcGFuOiAnYWRkIGJvb2ttYXJrJywgaWQ6IGlkLCBjbGFzczogJ2Jvb2ttYXJrJ307XG4gICAgXy5JZEFkZEIgPSAnIycgKyBpZDtcblxuICAgIHZhciBpZCA9IF8uZ2VuSWQgKCk7XG4gICAgdmFyIGRlbEIgPSB7c3BhbjogJ2RlbCBib29rbWFyaycsIGlkOiBpZCwgY2xhc3M6ICdib29rbWFyayd9O1xuICAgIF8uSWREZWxCID0gJyMnICsgaWQ7XG5cbiAgICB2YXIgaWQgPSBfLmdlbklkICgpO1xuICAgIHZhciBib29rUyA9IHtkaXY6IDAsIGlkOiBpZH07XG4gICAgXy5JZEJvb2tTID0gJyMnICsgaWQ7XG5cbiAgICBfLklkQm9va21hcmtTID0gXy5kcHAgKHtkaXY6IFthZGRCLCBkZWxCLCBib29rU10sIGNsYXNzOiAnYm9va21hcmtzIG5vdmlzJywgcGFyZW50OiBfLklkQm9va21hcmt9KTtcblxuICAgICQoXy5JZEFkZEIgKyAnLCcgKyBfLklkRGVsQilcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgIH0pO1xuXG4gICAgJChfLklkQWRkQilcbiAgICAuY2xpY2sgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXy5ib29rbWFya3MgW18uY3VyVmlzXSA9IDE7XG4gICAgICAgIF8uYm9va21hcmtzVG9Db29raWUgKCk7XG4gICAgICAgIF8uYm9va21hcmtzU2hvdyAoKTtcbiAgICB9KVxuXG4gICAgJChfLklkRGVsQilcbiAgICAuY2xpY2sgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVsZXRlIF8uYm9va21hcmtzIFtfLmN1clZpc107XG4gICAgICAgIF8uYm9va21hcmtzVG9Db29raWUgKCk7XG4gICAgICAgIF8uYm9va21hcmtzU2hvdyAoKTtcbiAgICB9KVxuXG59OyAvLyBlbmQgXy5pbml0Qm9va21hcmtzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uaW5pdFN0eWxlID0gKCkgPT4ge1xuXG4gICAgdmFyIHN0eWxlID0ge3N0eWxlOlxuICAgICAgICBcImJvZHkge1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luLWxlZnQ6IDE1cHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmJvb2ttYXJrIHtcIiArXG4gICAgICAgICAgICBcIndoaXRlLXNwYWNlOiBub3dyYXA7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDEycHg7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW46IDA7XCIgK1xuICAgICAgICAgICAgXCJwYWRkaW5nOiAwO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5ib29rbWFya3Mge1wiICtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogI0U1RkZGMjtcIiArXG4gICAgICAgICAgICBcImJvcmRlcjogMXB4IHNvbGlkICNCM0IzRkY7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXItcmFkaXVzOiAzcHg7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogYWJzb2x1dGU7XCIgK1xuICAgICAgICAgICAgXCJ6LWluZGV4OiAxO1wiICtcbiAgICAgICAgICAgIFwidG9wOiAycHg7XCIgK1xuICAgICAgICAgICAgXCJyaWdodDogMnB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5ib29rbWFya2hlYWRlciB7XCIgK1xuICAgICAgICAgICAgXCJmb250LXN0eWxlOiBpdGFsaWM7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogMjAwO1wiICtcbiAgICAgICAgICAgIFwidGV4dC1hbGlnbjogY2VudGVyO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5jYXB0aW9uIHtcIiArXG4gICAgICAgICAgICBcImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAyMHB4OyBcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiBhYnNvbHV0ZTsgXCIgK1xuICAgICAgICAgICAgXCJib3R0b206IDUwcHg7IFwiICtcbiAgICAgICAgICAgIFwidGV4dC1hbGlnbjogY2VudGVyO1wiICtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XCIgK1xuICAgICAgICAgICAgXCJtYXgtd2lkdGg6IDUwMHB4O1wiICtcbiAgICAgICAgICAgIFwid29yZC1icmVhazogYnJlYWstYWxsO1wiICtcbiAgICAgICAgICAgIFwibGVmdDogMDtcIiArXG4gICAgICAgICAgICBcInJpZ2h0OiAwO1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luOiAwIGF1dG87XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnN5bWJvbHdyYXAge1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDE2cHg7XCIgK1xuICAgICAgICAgICAgXCJoZWlnaHQ6IDE2cHg7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDE1cHg7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXI6IDFweCBzb2xpZCBibGFjaztcIiArXG4gICAgICAgICAgICBcImJvcmRlci1yYWRpdXM6IDhweDtcIiArXG4gICAgICAgICAgICBcImZsb2F0OiByaWdodDtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6ICMwZTA7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogcG9pbnRlcjtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogaGFuZDtcIiArXG4gICAgICAgICAgICBcImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiByZWxhdGl2ZTtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuc3ltYm9sIHtcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiByZWxhdGl2ZTtcIiArXG4gICAgICAgICAgICBcInRvcDogLTFweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuaGVhZGVyIHtcIiArXG4gICAgICAgICAgICBcInRleHQtYWxpZ246IGNlbnRlcjtcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiByZWxhdGl2ZTtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubTEwIHtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMTBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIudDQwIHtcIiArXG4gICAgICAgICAgICBcInRvcDogLTQwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnByZWwge1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IHJlbGF0aXZlO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi53NzAwIHtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiA3MDBweDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMCBhdXRvO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5pbWd2aWRlbyB7XCIgK1xuICAgICAgICAgICAgXCJoZWlnaHQ6IDUwMHB4O1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDcwMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5pbWdob21ld29yayB7XCIgK1xuICAgICAgICAgICAgXCJoZWlnaHQ6IDgwMHB4O1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDcwMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5jb2xzIHtcIiArXG4gICAgICAgICAgICBcInBhZGRpbmctcmlnaHQ6IDBweDtcIiArXG4gICAgICAgICAgICBcInBhZGRpbmctbGVmdDogMTBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubm92aXMge1wiICtcbiAgICAgICAgICAgIFwiZGlzcGxheTogbm9uZTtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubmF2IHtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMzBweDtcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiA5MDA7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tbGVmdDogMTBweDtcIiArXG4gICAgICAgICAgICBcImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiArXG4gICAgICAgICAgICBcImZsb2F0OiByaWdodDtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogcG9pbnRlcjtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogaGFuZDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubmF2cG9zIHtcIiArXG4gICAgICAgICAgICBcImZsb2F0OiByaWdodDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIudmlkZW8ge1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCIgK1xuICAgICAgICAgICAgXCJjb2xvcjogYmx1ZTtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1yaWdodDogMzBweDtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBwb2ludGVyO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBoYW5kO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5yZWYge1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IGluaXRpYWw7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDExcHg7XCIgK1xuICAgICAgICAgICAgXCJ3b3JkLWJyZWFrOiBicmVhay1hbGw7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnRvcGljcm93cyB7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tOiAyMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5yb3cudG9waWNyb3dzID4gZGl2IHtcIiArXG4gICAgICAgICAgICBcImJvcmRlcjogMXB4IHNvbGlkICNjY2M7XCIgK1xuICAgICAgICAgICAgXCJwYWRkaW5nLXJpZ2h0OiAxcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmxvY2hlYWRlciB7XCIgK1xuICAgICAgICAgICAgXCJjb2xvcjogcmVkO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi53ZWVrIHtcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiICtcbiAgICAgICAgXCJ9XCIsXG4gICAgICAgIHBhcmVudDogJ2hlYWQnfTtcblxuICAgICAgICBfLmRwcCAoc3R5bGUpO1xuXG59OyAvLyBlbmQgXy5pbml0U3R5bGVcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5ib29rbWFya0FkZCA9IChzbGlkZSkgPT4ge1xuXG4gICAgdmFyIGJvb2ttYXJrID0gXy5ib29rbWFya0xzdCBbc2xpZGVdLnJlcGxhY2UgKC8tKC4qKV8vLCAnICAgICQxICAgICcpO1xuICAgIHZhciBJZCA9IF8uZHBwICh7cHJlOiBib29rbWFyaywgcGFyZW50OiBfLklkQm9va1MsIG5hbWU6IHNsaWRlLCBjbGFzczogJ2Jvb2ttYXJrJ30pXG5cbiAgICAkKElkKVxuICAgIC5jbGljayAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbiA9ICQodGhpcykuYXR0ciAoJ25hbWUnKTtcbiAgICAgICAgXy5zZXROZXh0VmlzIChuIC0gXy5jdXJWaXMpO1xuXG4gICAgICAgICQoXy5JZEJvb2ttYXJrUylcbiAgICAgICAgLmFkZENsYXNzICgnbm92aXMnKTtcbiAgICB9KVxuICAgIC5ob3ZlciAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ3JlZCd9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAnYmxhY2snfSk7XG4gICAgfSk7XG5cblxufTsgLy8gZW5kIF8uYm9va21hcmtBZGRcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5ib29rbWFya3NTaG93ID0gKCkgPT4ge1xuXG4gICAgaWYgKF8uYm9va21hcmtzLmhhc093blByb3BlcnR5IChfLmN1clZpcykpIHtcblxuICAgICAgICAkKF8uSWREZWxCKVxuICAgICAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgICAgICQoXy5JZEFkZEIpXG4gICAgICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgICQoXy5JZERlbEIpXG4gICAgICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAgICAgJChfLklkQWRkQilcbiAgICAgICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgIH0gLy8gZW5kIGlmIChfLmJvb2ttYXJrcy5oYXNPd25Qcm9wZXJ0eSAoXy5jdXJWaXMpKVxuXG4gICAgJChfLklkQm9va1MpXG4gICAgLmVtcHR5ICgpO1xuXG4gICAgdmFyIHNsaWRlcyA9IE9iamVjdC5rZXlzIChfLmJvb2ttYXJrcykuc29ydCAoZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgfSk7XG5cbiAgICBpZiAoc2xpZGVzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICBfLmRwcCAoe2RpdjogJ1dlZWsgVG9waWMgU2xpZGVOdW0nLCBwYXJlbnQ6IF8uSWRCb29rUywgY2xhc3M6ICdib29rbWFyayBib29rbWFya2hlYWRlcid9KTtcblxuICAgIH0gLy8gZW5kIGlmIChzbGlkZXMubGVuZ3RoID4gMClcbiAgICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBzbGlkZSA9IHNsaWRlcyBbaV07XG4gICAgICAgIF8uYm9va21hcmtBZGQgKHNsaWRlKTtcblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzOyBpKyspXG5cbiAgICAkKF8uSWRCb29rbWFya1MpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKVxuICAgICAgICAvLyBhY3R1YWxseSBzaG93IHRoZSBib29rbWFya1xuXG4gICAgLmhvdmVyIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGJvb2ttYXJrcyBpbml0aWFsbHkgcG9zaXRpb25lZCB1bmRlciBjdXJzb3IsIHNvIG5vdGhpbmcgdG8gZG8gZm9yIGhvdmVyLWluXG5cbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmFkZENsYXNzICgnbm92aXMnKVxuICAgIH0pXG5cblxuXG5cbn07IC8vIGVuZCBfLmJvb2ttYXJrc1Nob3dcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5ib29rbWFya3NGcm9tQ29va2llID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBib29rbWFya3NTZmllZCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaCAoL20xMDJib29rbWFya3M9KFteO10rKS8pO1xuXG4gICAgXy5ib29rbWFya3MgPSAhYm9va21hcmtzU2ZpZWQgPyAge30gOiBKU09OLnBhcnNlIChib29rbWFya3NTZmllZCBbMV0pO1xuXG59OyAvLyBlbmQgXy5ib29rbWFya3NGcm9tQ29va2llXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uYm9va21hcmtzVG9Db29raWUgPSAoKSA9PiB7XG4gICAgXG4gICAgdmFyIGNvb2tpZSA9ICdtMTAyYm9va21hcmtzPScgKyBKU09OLnN0cmluZ2lmeSAoXy5ib29rbWFya3MpICsgJzsgZXhwaXJlcz1UaHUsIDEgSmFuIDIwMzAgMDA6MDA6MDAgVVRDOyBwYXRoPS8nO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZTtcblxufTsgLy8gZW5kIF8uYm9va21hcmtzMkNvb2tpZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRpc3BsYXlOYXYgPSAoKSA9PiB7XG5cbiAgICB2YXIgbmF2U3BhbnMgPSBbe3NwYW46ICc+JywgaWQ6ICduYXZyJywgY2xhc3M6ICduYXYnfSxcbiAgICB7c3BhbjogJzwnLCBpZDogJ25hdmwnLCBjbGFzczogJ25hdid9XTtcblxuICAgIG5hdlNwYW5zLnBhcmVudCA9IF8uSWROYXZQTjtcblxuICAgIF8uZHBwIChuYXZTcGFucyk7XG5cbiAgICAkKCcjbmF2bCwgI25hdnInKVxuICAgIC5ob3ZlciAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ3JlZCd9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAnYmxhY2snfSk7XG4gICAgfSk7XG5cbiAgICAkKCcjbmF2bCcpXG4gICAgLmNsaWNrIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgXy5zZXROZXh0VmlzICgtMSk7XG4gICAgfSk7XG5cbiAgICAkKCcjbmF2cicpXG4gICAgLmNsaWNrIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgXy5zZXROZXh0VmlzICgxKTtcbiAgICB9KTtcblxuXG59OyAvLyBlbmQgXy5kaXNwbGF5TmF2XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZGlzcGxheVBuZ0ZpbGVzID0gKHZhbHMpID0+IHtcblxuICAgIF8uY3VyVmlzID0gMDtcbiAgICBfLm1heEltYWdlcyA9IHZhbHMubGVuZ3RoIC0gMTtcbiAgICAgICAgLy8gbGFzdCB2YWwgaW4gdmFscyBpcyBhbiBlbXB0eSBzdHJpbmcsIHNvIGRvbid0IGNvdW50IGl0XG5cbiAgICB2YXIgd2Vla3MgPSB7fTtcbiAgICB2YXIgdG9waWNzO1xuXG4gICAgXy5jdEkgPSBbXTtcbiAgICBfLnRvcGljc0kgPSBbXTtcbiAgICBfLnRvcGljUmVmcyA9IFtdO1xuICAgIF8uc2xpZGVUb1ZpZGVvID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IF8ubWF4SW1hZ2VzOyBpKyspIHtcblxuICAgICAgICB2YXIgdmFsID0gdmFscyBbaV07XG5cbiAgICAgICAgdmFyIG1hdGNoZWQgPSB2YWwubWF0Y2ggKC8uLi4oLiopXFwvLio/KFthLXpBLVpdLiopLnBuZy8pO1xuICAgICAgICB2YXIgbG9jID0gbWF0Y2hlZCBbMV07XG4gICAgICAgIHZhciBjYXB0aW9uID0gbWF0Y2hlZCBbMl07XG5cbiAgICAgICAgdmFyIGltZ0NsYXNzID0gbG9jLm1hdGNoICgvSG9tZXdvcmt8RmluYWwvKSA/ICdpbWdob21ld29yaycgOiAnaW1ndmlkZW8nO1xuXG4gICAgICAgIHZhciBkaXZPYiA9IHtkaXY6IFtcbiAgICAgICAgICAgIHtpbWc6IDAsIHNyYzogdmFsLCBjbGFzczogaW1nQ2xhc3MsIGFsdDogJ2ltYWdlIGlzIHN0aWxsIHVwbG9hZGluZyAuLi4ganVzdCBhIG1pbnV0ZSBvciB0d28gbG9uZ2VyIGRlcGVuZGluZyBvbiB5b3VyIG5ldHdvcmsgYmFuZHdpZHRoJ30sXG4gICAgICAgICAgICB7YnI6MH0sXG4gICAgICAgICAgICB7c3BhbjogJyAgICAnICsgbG9jLCBjbGFzczogJ2xvY2hlYWRlcid9LFxuICAgICAgICAgICAge2JyOjB9LFxuICAgICAgICAgICAge2JyOjB9LFxuICAgICAgICAgICAge3NwYW46IGNhcHRpb24sIGNsYXNzOiAnY2FwdGlvbid9XG4gICAgICAgIF0sIGlkOiAnaicgKyBpfTtcblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuXG4gICAgICAgICAgICBkaXZPYi5jbGFzcyA9ICdub3Zpcyc7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGkgIT09PSAwKVxuXG4gICAgICAgIGRpdk9iLnBhcmVudCA9IF8uSWRTbGlkZXM7XG4gICAgICAgIF8uZHBwIChkaXZPYik7XG5cbiAgICAgICAgbWF0Y2hlZCA9IGxvYy5tYXRjaCAoL1coXFxkKSguKj8pXFwvKC4qKS8pO1xuXG4gICAgICAgIHZhciB3aWQgPSAnVycgKyBtYXRjaGVkIFsxXTtcbiAgICAgICAgdmFyIHdlZWsgPSB3aWQgKyBtYXRjaGVkIFsyXTtcbiAgICAgICAgdmFyIHRvcGljID0gbWF0Y2hlZCBbM107XG5cbiAgICAgICAgdmFyIHZpZGVvVG9waWMgPSB3aWQgKyAnLScgKyB0b3BpYztcbiAgICAgICAgXy5zbGlkZVRvVmlkZW8ucHVzaCAoXy50b3BpY1RvVmlkZW8gW3ZpZGVvVG9waWNdKTtcblxuICAgICAgICBpZiAoIXdlZWtzLmhhc093blByb3BlcnR5ICh3ZWVrKSkge1xuXG4gICAgICAgICAgICBfLmRpc3BsYXlSZWYgKHdpZCwgd2VlaywgaSwgJ3dlZWsnKTtcbiAgICAgICAgICAgIHdlZWtzIFt3ZWVrXSA9IDE7XG4gICAgICAgICAgICB0b3BpY3MgPSB7fTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoIXdlZWtzLmhhc093blByb3BlcnR5ICh3ZWVrKSlcblxuICAgICAgICB2YXIgc2xpZGVDb3VudDtcbiAgICAgICAgaWYgKCF0b3BpY3MuaGFzT3duUHJvcGVydHkgKHRvcGljKSkge1xuXG4gICAgICAgICAgICB2YXIgZGlzcFJlZiA9IF8uZGlzcGxheVJlZiAod2lkLCB0b3BpYywgaSwgJ3RvcGljJyk7XG4gICAgICAgICAgICBfLnRvcGljUmVmcy5wdXNoIChkaXNwUmVmKTtcblxuICAgICAgICAgICAgaWYgKHRvcGljID09PSAnMDVfU3RvcmFnZUVuZ2luZVdpcmVkVGlnZXInKSB7XG5cbiAgICAgICAgICAgICAgICBfLklkU2FtcGxlVG9waWMgPSBkaXNwUmVmO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAodG9waWMgPT09ICcwMV9XZWxjb21lV2VlazMnKVxuXG4gICAgICAgICAgICB0b3BpY3MgW3RvcGljXSA9IDE7XG5cbiAgICAgICAgICAgIHNsaWRlQ291bnQgPSAxO1xuICAgICAgICAgICAgXy50b3BpY3NJLnB1c2ggKHNsaWRlQ291bnQpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHNsaWRlQ291bnQrKztcbiAgICAgICAgICAgIF8udG9waWNzSSBbXy50b3BpY3NJLmxlbmd0aCAtIDFdID0gc2xpZGVDb3VudDtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoIXRvcGljcy5oYXNPd25Qcm9wZXJ0eSAodG9waWMpKVxuXG4gICAgICAgIHZhciBib29rbWFya05hbWUgPSB2aWRlb1RvcGljICsgJ18nICsgc2xpZGVDb3VudDs7XG4gICAgICAgIF8uYm9va21hcmtMc3QucHVzaCAoYm9va21hcmtOYW1lKTtcblxuICAgICAgICBfLmN0SS5wdXNoIChbc2xpZGVDb3VudCwgXy50b3BpY3NJLmxlbmd0aCAtIDFdKTtcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWxzOyBpKyspXG5cbiAgICBfLnNldE5leHRWaXMgKDApO1xuXG59OyAvLyBlbmQgXy5kaXNwbGF5UG5nRmlsZXNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kaXNwbGF5UmVmID0gKHdpZCwgc3RyLCBpLCBjbGFzc05hbWUpID0+IHtcblxuICAgIHdpZCA9ICcjJyArIHdpZDtcbiAgICB2YXIgcmVmID0gXy5nZW5JZCAoKTtcbiAgICBfLmRwcCAoe2RpdjpcbiAgICAgICAge2Rpdjogc3RyLFxuICAgICAgICAgaWQ6IHJlZixcbiAgICAgICAgIHNsOiBpLFxuICAgICAgICAgc3R5bGU6ICdkaXNwbGF5OmlubGluZS1ibG9jazsgY3Vyc29yOiBwb2ludGVyOyBjdXJzb3I6IGhhbmQ7J1xuICAgICB9LCBwYXJlbnQ6IHdpZCwgY2xhc3M6ICdyZWYgdzcwMCAnICsgY2xhc3NOYW1lfSk7XG5cbiAgICByZWYgPSAnIycgKyByZWY7XG4gICAgJChyZWYpXG4gICAgLmNsaWNrIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuID0gJCh0aGlzKS5hdHRyICgnc2wnKTtcbiAgICAgICAgXy5zZXROZXh0VmlzIChuIC0gXy5jdXJWaXMpO1xuICAgIH0pXG5cbiAgICAkKHJlZilcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSlcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgSWQgPSAnIycgKyBldmVudC50YXJnZXQuaWQ7XG5cbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pXG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHJlZjtcblxufTsgLy8gZW5kIF8uZGlzcGxheVJlZlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRvU2xpZGVTaG93ID0gKHZhbHMpID0+IHtcblxuICAgIF8ubGF5b3V0ICgpO1xuICAgIF8uZGlzcGxheU5hdiAoKTtcbiAgICBfLmRpc3BsYXlQbmdGaWxlcyAodmFscyk7XG5cbiAgICAkKF8uSWRWaWRlbylcbiAgICAuaG92ZXIgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuYXR0ciAoe3N0eWxlOiAnY29sb3I6IHJlZDsnfSlcbiAgICB9LFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuYXR0ciAoe3N0eWxlOiAnY29sb3I6IGJsdWUnfSlcbiAgICB9KVxuICAgIC5jbGljayAoXy5wbGF5VmlkZW8pO1xuXG4gICAgXy5waS5jcmVhdGVQb3B1cERpc3BsYXkgKCcjbmF2cicsXG4gICAgICAgICdDbGljayBQcmV2L05leHQgU2xpZGVcXG4gICAgLS0gb3IgLS1cXG4oa2V5Ym9hcmQgc2hvcnRjdXRzKVxcbkxlZnQvUmlnaHQgQXJyb3dcXG5TcGFjZS9CYWNrc3BhY2UnKTtcbiAgICBfLnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAoXy5JZFNhbXBsZVRvcGljLFxuICAgICAgICAnQ2xpY2sgdG8gbmF2aWdhdGUgZGlyZWN0bHlcXG50byBiZWdpbm5pbmcgb2YgdG9waWMnKTtcbiAgICBfLnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAoXy5JZEN1clNsaWRlLFxuICAgICAgICAnQ3VycmVudCBzbGlkZSBJbiB0b3BpYy9cXG5Ub3RhbCBzbGlkZXMgaW4gdG9waWMnKTtcbiAgICBfLnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAoXy5JZFZpZGVvLFxuICAgICAgICAnQ2xpY2sgdG8gc3RhcnRcXG5wbGF5aW5nIGxlc3NvbiB2aWRlbycpO1xuXG4gICAgJChfLklkSGVscClcbiAgICAuaG92ZXIgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnI2ZmYTBhMCd9KTtcblxuICAgICAgICBfLnBpLnNob3dQb3B1cHMgKCk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5jc3MgKHsnYmFja2dyb3VuZC1jb2xvcic6ICcjMGUwJ30pO1xuXG4gICAgICAgIF8ucGkuaGlkZVBvcHVwcyAoKTtcbiAgICB9KTtcblxuICAgICQoXy5JZEJvb2ttYXJrKVxuICAgIC5ob3ZlciAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5jc3MgKHsnYmFja2dyb3VuZC1jb2xvcic6ICcjZmZhMGEwJ30pO1xuICAgICAgICBfLmJvb2ttYXJrc1Nob3cgKCk7XG5cbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmNzcyAoeydiYWNrZ3JvdW5kLWNvbG9yJzogJyMwZTAnfSk7XG5cbiAgICB9KTtcblxufTsgLy8gZW5kIF8uZG9TbGlkZVNob3dcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8ua2V5RmlsdGVyID0gKGNob2IpID0+IHtcbiAgICAvL2NvbnNvbGUubG9nICgnY2hvYjogJyArIEpTT04uc3RyaW5naWZ5IChjaG9iKSArICdcXG4nKTtcblxuICAgIHZhciBjaCA9IGNob2IuY2g7XG4gICAgaWYgKGNoID09PSAnUmlnaHQnIHx8IGNoID09PSAnICcpIHtcblxuICAgICAgICBfLnNldE5leHRWaXMgKDEpO1xuXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gJ0xlZnQnIHx8IGNoID09PSAnQmFja3NwYWNlJykge1xuXG4gICAgICAgIF8uc2V0TmV4dFZpcyAoLTEpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGNob2IuY2ggPT09ICdSaWdodCcpXG5cblxufTsgLy8gZW5kIF8ua2V5RmlsdGVyXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8ubGF5b3V0ID0gKCkgPT4ge1xuXG4gICAgdmFyIElkQ29udGFpbmVyID0gXy5kcHAgKHtkaXY6IDAsIGNsYXNzOiAndzcwMCBtMTAnfSk7XG5cbiAgICB2YXIgaWRCb29rbWFyayA9IF8uZ2VuSWQgKCk7XG5cbiAgICB2YXIgaWRIZWxwID0gXy5nZW5JZCAoKTtcbiAgICBfLmRwcCAoe2RpdjpcbiAgICAgICAge2g0OiBbXG4gICAgICAgICAgICAnU2xpZGVzaG93IE0xMDI6IE1vbmdvREIgZm9yIERCQXMgKEphbi9GZWIgMjAxNyknLFxuICAgICAgICAgICAge2Rpdjoge3NwYW46ICc/JywgY2xhc3M6ICdzeW1ib2wnfSwgaWQ6IGlkSGVscCwgY2xhc3M6ICdzeW1ib2x3cmFwJ30sXG4gICAgICAgICAgICB7ZGl2OiB7c3BhbjogJ0InLCBjbGFzczogJ3N5bWJvbCd9LCBpZDogaWRCb29rbWFyaywgY2xhc3M6ICdzeW1ib2x3cmFwJywgc3R5bGU6ICdtYXJnaW4tcmlnaHQ6IDEwcHg7J31cbiAgICAgICAgXSwgY2xhc3M6ICdoZWFkZXInfSxcbiAgICAgICAgY2xhc3M6ICdyb3cgdzcwMCcsXG4gICAgICAgIHBhcmVudDogSWRDb250YWluZXJ9XG4gICAgKTtcblxuICAgIF8uSWRCb29rbWFyayA9ICcjJyArIGlkQm9va21hcms7XG4gICAgXy5pbml0Qm9va21hcmtzICgpO1xuXG4gICAgXy5JZEhlbHAgPSAnIycgKyBpZEhlbHA7XG5cbiAgICBfLklkU2xpZGVzID0gXy5kcHAgKHtkaXY6IDAsIG5hbWU6ICdzbGlkZXMnLCBjbGFzczogJ3JvdyB3NzAwIHByZWwnLCBwYXJlbnQ6IElkQ29udGFpbmVyfSk7XG5cbiAgICB2YXIgSWROYXYgPSBfLmRwcCAoe2RpdjowLCBuYW1lOiAnbmF2JywgY2xhc3M6ICdyb3cgdzcwMCBwcmVsIHQ0MCcsIHBhcmVudDogSWRDb250YWluZXJ9KTtcblxuICAgIHZhciBJZFZpZGVvRGl2ID0gXy5kcHAgKHtkaXY6MCwgY2xhc3M6ICdjb2wtc20tNycsIHBhcmVudDogSWROYXZ9KTtcbiAgICBfLklkVmlkZW8gPSBfLmRwcCAoe3NwYW46ICdWaWRlbycsIHBhcmVudDogSWRWaWRlb0RpdiwgY2xhc3M6ICduYXZwb3MgdmlkZW8nfSk7XG5cbiAgICBfLklkUGFnZUN0ID0gXy5kcHAgKHtkaXY6MCwgY2xhc3M6ICdjb2wtc20tMicsIHBhcmVudDogSWROYXZ9KTtcblxuICAgIF8uSWROYXZQTiA9IF8uZHBwICh7ZGl2OjAsIGNsYXNzOiAnY29sLXNtLTMnLCBwYXJlbnQ6IElkTmF2fSk7XG5cbiAgICB2YXIgSWRUb3BpY1Jvd3MgPSBfLmRwcCAoe2RpdjowLCBuYW1lOiAndG9waWNSb3dzJywgcGFyZW50OiBJZENvbnRhaW5lciwgY2xhc3M6ICd3NzAwIHByZWwgdDQwJ30pO1xuXG4gICAgdmFyIElkUm93MSA9IF8uZHBwICh7ZGl2OiAwLCBuYW1lOiAndG9waWNSb3dzMScsIGNsYXNzOiAncm93IHRvcGljcm93cycsIHBhcmVudDogSWRUb3BpY1Jvd3N9KVxuICAgIHZhciBJZFJvdzIgPSBfLmRwcCAoe2RpdjogMCwgbmFtZTogJ3RvcGljUm93czInLCBjbGFzczogJ3JvdyB0b3BpY3Jvd3MnLCBwYXJlbnQ6IElkVG9waWNSb3dzfSlcblxuICAgIF8ubWFrZUNvbHMgKDAsIElkUm93MSwgNCk7XG4gICAgXy5tYWtlQ29scyAoNCwgSWRSb3cyLCAzKTtcblxufTsgLy8gZW5kIF8ubGF5b3V0XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8ubWFrZUNvbHMgPSAoYmFzZUlkLCBJZFJvdywgbnVtQ29scykgPT4ge1xuXG4gICAgdmFyIGNvbHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUNvbHM7IGkrKykge1xuXG4gICAgICAgIHZhciBpZCA9ICdXJyArIChpICsgMSArIGJhc2VJZCk7XG4gICAgICAgIGNvbHMucHVzaCAoe2RpdjogMCwgaWQ6IGlkLCBjbGFzczogJ2NvbHMgY29sLXNtLTMnLCBwYXJlbnQ6IElkUm93fSk7XG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKylcblxuICAgIF8uZHBwIChjb2xzKTtcblxufTsgLy8gZW5kIF8ubWFrZUNvbHNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5wbGF5VmlkZW8gPSAoKSA9PiB7XG5cbiAgICBfLmhpZGRlblNsaWRlID0gJyNqJyArIF8uY3VyVmlzO1xuXG4gICAgJChfLmhpZGRlblNsaWRlICsgJz4gaW1nJylcbiAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJChfLmhpZGRlblNsaWRlICsgJz4gLmNhcHRpb24nKVxuICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKF8uSWRWaWRlbylcbiAgICAudGV4dCAoJ1NsaWRlJylcbiAgICAub2ZmICgnY2xpY2snKVxuICAgIC5jbGljayAoXy5yZXN0b3JlU2xpZGUpO1xuXG4gICAgdmFyIHNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgXy5zbGlkZVRvVmlkZW8gW18uY3VyVmlzXSArICc/YXV0b3BsYXk9MSc7XG4gICAgXy5JZFZpZGVvUGxheWluZyA9IF8uZHBwICh7aWZyYW1lOiAwLCBzcmM6IHNyYywgY2xhc3M6ICdpbWd2aWRlbycsIHBhcmVudDogXy5oaWRkZW5TbGlkZSwgcHJlcGVuZDogMX0pO1xuXG59OyAvLyBlbmQgXy5wbGF5VmlkZW9cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5yZXN0b3JlU2xpZGUgPSAoKSA9PiB7XG5cbiAgICAkKF8uSWRWaWRlb1BsYXlpbmcpXG4gICAgLnJlbW92ZSAoKTtcblxuICAgICQoXy5oaWRkZW5TbGlkZSArICc+IGltZycpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgICQoXy5oaWRkZW5TbGlkZSArICc+IC5jYXB0aW9uJylcbiAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJChfLklkVmlkZW8pXG4gICAgLnRleHQgKCdWaWRlbycpXG4gICAgLm9mZiAoJ2NsaWNrJylcbiAgICAuY2xpY2sgKF8ucGxheVZpZGVvKTtcblxuICAgIF8uaGlkZGVuU2xpZGUgPSBudWxsO1xuXG59OyAvLyBlbmQgXy5yZXN0b3JlU2xpZGVcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uc2V0TmV4dFZpcyA9IChkZWx0YSkgPT4ge1xuXG4gICAgaWYgKF8uaGlkZGVuU2xpZGUpIHtcblxuICAgICAgICBfLnJlc3RvcmVTbGlkZSAoKTtcblxuICAgIH0gLy8gZW5kIGlmIChfLmhpZGRlblNsaWRlKVxuXG4gICAgdmFyIG1kZWx0YSA9IGRlbHRhID49IDAgPyBkZWx0YSA6IF8ubWF4SW1hZ2VzICsgZGVsdGFcblxuICAgIHZhciBuZXh0VmlzID0gKF8uY3VyVmlzICsgbWRlbHRhKSAlIF8ubWF4SW1hZ2VzO1xuXG4gICAgdmFyIElkUHJldiA9ICcjaicgKyBfLmN1clZpcztcbiAgICB2YXIgSWROZXh0ID0gJyNqJyArIG5leHRWaXM7XG5cbiAgICAkKElkUHJldilcbiAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJChJZE5leHQpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgIF8uY3VyVmlzID0gbmV4dFZpcztcblxuICAgIHZhciBjdFJlZiA9IF8uY3RJIFtuZXh0VmlzXTtcblxuICAgIHZhciBzbGlkZUkgPSBjdFJlZiBbMF07XG4gICAgdmFyIHRvcGljSWR4ID0gY3RSZWYgWzFdO1xuICAgIHZhciB0b3RhbEluU2VjdGlvbiA9IF8udG9waWNzSSBbdG9waWNJZHhdO1xuXG4gICAgXy5kcHAgKHtlbXB0eTogXy5JZFBhZ2VDdH0pO1xuICAgIF8uSWRDdXJTbGlkZSA9IF8uZHBwICh7c3BhbjogJ3NsaWRlOiAnICsgc2xpZGVJICsgJy8nICsgdG90YWxJblNlY3Rpb24sXG4gICAgICAgIHBhcmVudDogXy5JZFBhZ2VDdCxcbiAgICAgICAgY2xhc3M6ICduYXZwb3MnfSk7XG5cbiAgICAkKF8udG9waWNSZWYpXG4gICAgLmNzcyAoXG4gICAgICAgIHsnYmFja2dyb3VuZC1jb2xvcic6ICcjZmZmJyxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ25vcm1hbCd9XG4gICAgKTtcblxuICAgIF8udG9waWNSZWYgPSBfLnRvcGljUmVmcyBbdG9waWNJZHhdO1xuXG4gICAgJChfLnRvcGljUmVmKVxuICAgIC5jc3MgKFxuICAgICAgICB7J2JhY2tncm91bmQtY29sb3InOiAnI2Q2ZmZkNicsXG4gICAgICAgICdmb250LXdlaWdodCc6ICdib2xkJ31cbiAgICApO1xuXG59OyAvLyBlbmQgXy5zZXROZXh0VmlzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8udG9waWNUb1ZpZGVvSWQgPSAoYVRhZ0EpID0+IHtcblxuICAgIF8udG9waWNUb1ZpZGVvID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhVGFnQS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBhVGFnID0gYVRhZ0EgW2ldO1xuICAgICAgICB2YXIgbSA9IGFUYWcubWF0Y2ggKC8uKnlvdXR1LmJlLihbXlwiXSspXCI+KFtePF0rKTwvKTtcbiAgICAgICAgaWYgKG0pIHtcblxuICAgICAgICAgICAgdmFyIHZpZGVvSWQgPSBtIFsxXTtcbiAgICAgICAgICAgIHZhciB0b3BpYyA9IG0gWzJdO1xuXG4gICAgICAgICAgICBfLnRvcGljVG9WaWRlbyBbdG9waWNdID0gdmlkZW9JZDtcblxuICAgICAgICB9IC8vIGVuZCBpZiAobSlcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBhVGFnQTsgaSsrKVxuXG5cbn07IC8vIGVuZCBfLnRvcGljVG9WaWRlb0lkXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kb0FjdGlvbiA9IChtc2dPYikgPT4ge1xuICAgIGNvbnNvbGUubG9nICgnbXNnT2I6ICcgKyBKU09OLnN0cmluZ2lmeSAobXNnT2IpICsgJ1xcbicpO1xuXG4gICAgdmFyIGNtZCA9IF8ua2V5MSAobXNnT2IpO1xuICAgIHZhciB2YWxzID0gbXNnT2IgW2NtZF07XG5cbiAgICBzd2l0Y2ggKGNtZCkge1xuXG4gICAgICAgIGNhc2UgJ3JlYWR5JzpcblxuICAgICAgICAgICAgXy5pbml0U3R5bGUgKCk7XG4gICAgICAgICAgICBfLndzLnRvU3J2ciAoe2dldFZpZGVvTGlua3M6MX0pO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndmlkZW9MaW5rcyc6XG5cbiAgICAgICAgICAgIF8udG9waWNUb1ZpZGVvSWQgKHZhbHMpO1xuICAgICAgICAgICAgXy53cy50b1NydnIgKHtnZXRQbmdGaWxlczoxfSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdwbmdGaWxlcyc6XG5cbiAgICAgICAgICAgICQoJ2JvZHknKVxuICAgICAgICAgICAgLmVtcHR5ICgpO1xuXG4gICAgICAgICAgICBfLmRvU2xpZGVTaG93ICh2YWxzKTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICB9IC8vIGVuZCBzd2l0Y2ggKGNtZClcblxuXG5cbn07IC8vIGVuZCBQLmRvQWN0aW9uXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbl8uaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG4iLCIvLyBnby1qc29uMmh0bWwvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIF8gPSB7XG5cbiAgICBpZDogMCxcbiAgICBwcmltaXRpdmVUeXBlc05vdE51bGw6IHsnc3RyaW5nJzoxLCAndW5kZWZpbmVkJzoxLCAnbnVtYmVyJzoxLCAnYm9vbGVhbic6MSwgJ3N5bWJvbCc6IDF9LFxuICAgICAgICAvLyBzaW5jZSB0eXBlb2YgbnVsbCB5aWVsZHMgJ29iamVjdCcsIGl0J3MgaGFuZGxlZCBzZXBhcmF0ZWx5XG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kaXNwbGF5UGFnZUggPSAocGFyZW50LCBkaXNwT2IpID0+IHtcbiAgICBcbiAgICBpZiAoZGlzcE9iID09PSAwKSB7XG4gICAgICAgIC8vIGNhc2Ugd2hlcmUgbm8gY29udGVudCBpcyBkZXNpcmVkXG4gICAgICAgIC8vIHRvIGRpc3BsYXkgYW4gYWN0dWFsIHplcm8sIG1ha2UgaXQgYSBzdHJpbmc6ICBcIjBcIlxuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChkaXNwT2IgPT09IDApXG4gICAgXG4gICAgdmFyIGRpc3BPYlR5cGUgPSB0eXBlb2YgZGlzcE9iO1xuICAgIHZhciBpc1ByaW1pdGl2ZSA9IF8ucHJpbWl0aXZlVHlwZXNOb3ROdWxsLmhhc093blByb3BlcnR5IChkaXNwT2JUeXBlKSB8fCBkaXNwT2IgPT09IG51bGw7XG5cbiAgICBpZiAoaXNQcmltaXRpdmUpIHtcblxuICAgICAgICBJZCA9IF8udGV4dE1ha2UgKHBhcmVudCwgZGlzcE9iLCAnYXBwZW5kJyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIE5FID0+IE5vdCBFbXB0eVxuICAgICAgICB2YXIgaXNORUFycmF5ID0gQXJyYXkuaXNBcnJheSAoZGlzcE9iKSAmJiBkaXNwT2IubGVuZ3RoID4gMDtcbiAgICAgICAgdmFyIGlzTkVPYmplY3QgPSAhQXJyYXkuaXNBcnJheShkaXNwT2IpICYmIGRpc3BPYlR5cGUgPT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMoZGlzcE9iKS5sZW5ndGggPiAwO1xuICAgICAgICBcbiAgICAgICAgdmFyIElkID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGNhcGl0YWwgSWQgdG8gaW5kaWNhdGUgaWQgd2l0aCAnIycgcHJlZml4aW5nIGl0XG4gICAgXG4gICAgICAgIGlmIChpc05FT2JqZWN0KSB7XG4gICAgXG4gICAgICAgICAgICBpZiAoZGlzcE9iLmhhc093blByb3BlcnR5ICgncm0nKSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gZGlzcE9iLnJtO1xuICAgICAgICAgICAgICAgICQoc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgLnJlbW92ZSAoKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdlbXB0eScpKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBkaXNwT2IuZW1wdHk7XG4gICAgICAgICAgICAgICAgJChzZWxlY3RvcilcbiAgICAgICAgICAgICAgICAuZW1wdHkgKCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzcE9iLmhhc093blByb3BlcnR5ICgnY29udGVudCcpKSB7XG5cbiAgICAgICAgICAgICAgICBfLmRpc3BsYXlQYWdlSCAocGFyZW50LCBkaXNwT2IuY29udGVudCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzcE9iLmhhc093blByb3BlcnR5ICgnYXR0cicpKSB7XG5cbiAgICAgICAgICAgICAgICAkKHBhcmVudClcbiAgICAgICAgICAgICAgICAuYXR0ciAoZGlzcE9iLmF0dHIpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHBhcmVudCA9IGRpc3BPYi5oYXNPd25Qcm9wZXJ0eSAoJ3BhcmVudCcpID8gZGlzcE9iLnBhcmVudCA6IHBhcmVudDtcblxuICAgICAgICAgICAgICAgIHZhciBhdHRycyA9IHt9O1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50TmFtZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRlbnQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzIChkaXNwT2IpO1xuICAgICAgICAgICAgICAgIHZhciBpbnNlcnRMb2NhdGlvbiA9ICdhcHBlbmQnO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGt5ID0ga2V5cyBbaV07XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFnVHlwZSA9IF8uZ2V0VGFnVHlwZSAoa3kpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0eWxlSW5IZWFkID0gcGFyZW50ID09PSAnaGVhZCcgJiYga3kgPT09ICdzdHlsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdHlsZSBpbiBoZWFkID0+IGh0bWwgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3R5bGUgbm90IGluIGhlYWQgPT4gYXR0cmlidXRlIG9mIGRpc3BPYlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWdOb3RTdHlsZSA9IHRhZ1R5cGUgIT09IDAgJiYga3kgIT09ICdzdHlsZSc7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGFnTm90U3R5bGUgfHwgc3R5bGVJbkhlYWQpIHtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50TmFtZSA9IGt5O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IGRpc3BPYiBbZWxlbWVudE5hbWVdO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChreSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGFyZW50JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmcgLS0gUHJldmVudHMgJ3BhcmVudCcgZnJvbSBiZWNvbWluZyBhbiBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJlcGVuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdiZWZvcmUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FmdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0TG9jYXRpb24gPSBreTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gZGlzcE9iIFtreV0gPT09IDEgPyBwYXJlbnQgOiBkaXNwT2IgW2t5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFueSBvZiBwcmVwZW5kLCAuLi4gYXJlIHNwZWNpZmllZCwgYW5kIHRoZSB2YWx1ZSBpcyBvdGhlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhbiBhICcxJywgb3ZlcnJpZGUgdGhlIHBhcmVudCB2YWx1ZSB3aXRoIHRoYXQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnMgW2t5XSA9IGRpc3BPYiBba3ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSAvLyBlbmQgc3dpdGNoIChreSlcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gLy8gZW5kIGlmICh0YWdUeXBlICE9PSAwKVxuICAgICAgICBcbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGtleXM7IGkrKylcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBlcnJvciBjYXNlIC0tIHNldCBhcyB0ZXh0IGFuZCBkaXNwbGF5IGVudGlyZSBkaXNwT2JcblxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50TmFtZSA9ICd0ZXh0JztcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5IChkaXNwT2IpO1xuXG4gICAgICAgICAgICAgICAgfSAvLyBlbmQgaWYgKCFlbGVtZW50TmFtZSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudE5hbWUgPT09ICd0ZXh0Jykge1xuXG4gICAgICAgICAgICAgICAgICAgIElkID0gXy50ZXh0TWFrZSAocGFyZW50LCBjb250ZW50LCBpbnNlcnRMb2NhdGlvbik7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIElkID0gXy5lbGVtZW50TWFrZSAoZWxlbWVudE5hbWUsIHBhcmVudCwgaW5zZXJ0TG9jYXRpb24sIGF0dHJzKTtcblxuICAgICAgICAgICAgICAgIH0gLy8gZW5kIGlmIChlbGVtZW50TmFtZSA9PT0gJ3RleHQnKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChJZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXNlIGZvciBlbGVtZW50IG5vdCAndGV4dCdcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIF8uZGlzcGxheVBhZ2VIIChJZCwgY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBpZiAoSWQgIT09IG51bGwpXG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmIChkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdybScpKVxuICAgICAgICAgICAgXG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAoaXNORUFycmF5KSB7XG4gICAgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BPYi5sZW5ndGg7IGkrKykge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm5lZCBJZCB3aWxsIGJlIGZvciBsYXN0IGl0ZW0gaW4gYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlZnVsIHRvIGxhdGVyIGFkZCBzaWJsaW5ncyB3aXRoICdhZnRlcicga2V5XG4gICAgICAgICAgICAgICAgSWQgPSBfLmRpc3BsYXlQYWdlSCAocGFyZW50LCBkaXNwT2IgW2ldKTtcbiAgICBcbiAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcE9iLmxlbmd0aDsgaSsrKVxuICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgSWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgZm9yIGRpc3BPYiBhcyBhbiBlbXB0eSBvYmplY3Qgb3IgZW1wdHkgYXJyYXlcbiAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKGlzTkVPYmplY3QpXG5cbiAgICB9IC8vIGVuZCBpZiAoXy5wcmltaXRpdmVUeXBlc05vdE51bGwuaGFzT3duUHJvcGVydHkgKGRpc3BPYlR5cGUpKVxuICAgIFxuICAgICAgICBcbiAgICByZXR1cm4gSWQ7XG5cbn07IC8vIGVuZCBfLmRpc3BsYXlQYWdlSCBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZWxlbWVudE1ha2UgPSAodGFnLCBwYXJlbnRPclNpYmwsIGluc2VydExvY2F0aW9uLCBhdHRycykgPT4ge1xuICAgIFxuICAgIHZhciBpZDtcbiAgICB2YXIgYXR0cktleXMgPSBPYmplY3Qua2V5cyAoYXR0cnMpO1xuICAgIHZhciBoYXNBdHRycyA9IGF0dHJLZXlzLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoaGFzQXR0cnMgJiYgYXR0cnMuaGFzT3duUHJvcGVydHkgKCdpZCcpKSB7XG5cbiAgICAgICAgaWQgPSBhdHRycy5pZDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgaWQgPSBQLmdlbklkICgpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGhhc0F0dHJzKVxuICAgIFxuICAgIHZhciBJZCA9ICcjJyArIGlkO1xuICAgIFxuICAgIHZhciBkaXZlbCA9ICc8JyArIHRhZyArICcgaWQ9XCInICsgaWQgKyAnXCInO1xuXG4gICAgdmFyIHRhZ3R5cGUgPSBfLmdldFRhZ1R5cGUgKHRhZyk7XG5cbiAgICBpZiAodGFndHlwZSA9PSAxKSB7XG5cbiAgICAgICAgZGl2ZWwgKz0gJz4nO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBkaXZlbCArPSAnPjwvJyArIHRhZyArICc+JztcblxuICAgIH0gLy8gZW5kIGlmICh0YWd0eXBlID09IDEpXG5cbiAgICAkKHBhcmVudE9yU2libClbaW5zZXJ0TG9jYXRpb25dIChkaXZlbCk7XG4gICAgXG4gICAgaWYgKGhhc0F0dHJzKSB7XG4gICAgICAgIFxuICAgICAgICAkKElkKVxuICAgICAgICAuYXR0ciAoYXR0cnMpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGhhc0F0dHJzKVxuICAgIFxuICAgIHJldHVybiBJZDtcblxufTsgLy8gZW5kIF8uZWxlbWVudE1ha2VcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZ2V0VGFnVHlwZSA9ICh0YWcpID0+IHtcblxuICAgICAgICAvLyAxID0+IHZvaWQgZWxlbWVudHMsIDIgPT4gaGFzIGNvbnRlbnRcbiAgICB2YXIgdGFncyA9IHsgYXJlYTogMSwgYmFzZTogMSwgYnI6IDEsIGNvbDogMSwgZW1iZWQ6IDEsIGhyOiAxLCBpbWc6IDEsIGlucHV0OiAxLCBrZXlnZW46IDEsIGxpbms6IDEsIG1ldGE6IDEsIHBhcmFtOiAxLCBzb3VyY2U6IDEsIHRyYWNrOiAxLCB3YnI6IDEsIGE6IDIsIGFiYnI6IDIsIGFkZHJlc3M6IDIsIGFydGljbGU6IDIsIGFzaWRlOiAyLCBhdWRpbzogMiwgYjogMiwgYmRpOiAyLCBiZG86IDIsIGJsb2NrcXVvdGU6IDIsIGJvZHk6IDIsIGJ1dHRvbjogMiwgY2FudmFzOiAyLCBjYXB0aW9uOiAyLCBjaXRlOiAyLCBjb2RlOiAyLCBjb2xncm91cDogMiwgZGF0YWxpc3Q6IDIsIGRkOiAyLCBkZWw6IDIsIGRldGFpbHM6IDIsIGRmbjogMiwgZGlhbG9nOiAyLCBkaXY6IDIsIGRsOiAyLCBkdDogMiwgZW06IDIsIGZpZWxkc2V0OiAyLCBmaWdjYXB0aW9uOiAyLCBmaWd1cmU6IDIsIGZvb3RlcjogMiwgZm9ybTogMiwgaDE6IDIsIGgyOiAyLCBoMzogMiwgaDQ6IDIsIGg1OiAyLCBoNjogMiwgaGVhZDogMiwgaGVhZGVyOiAyLCBoZ3JvdXA6IDIsIGh0bWw6IDIsIGk6IDIsIGlmcmFtZTogMiwgaW5zOiAyLCBrYmQ6IDIsIGxhYmVsOiAyLCBsZWdlbmQ6IDIsIGxpOiAyLCBtYXA6IDIsIG1hcms6IDIsIG1lbnU6IDIsIG1ldGVyOiAyLCBuYXY6IDIsIG5vc2NyaXB0OiAyLCBvYmplY3Q6IDIsIG9sOiAyLCBvcHRncm91cDogMiwgb3B0aW9uOiAyLCBvdXRwdXQ6IDIsIHA6IDIsIHByZTogMiwgcHJvZ3Jlc3M6IDIsIHE6IDIsIHJwOiAyLCBydDogMiwgcnVieTogMiwgczogMiwgc2FtcDogMiwgc2NyaXB0OiAyLCBzZWN0aW9uOiAyLCBzZWxlY3Q6IDIsIHNtYWxsOiAyLCBzcGFuOiAyLCBzdHJvbmc6IDIsIHN0eWxlOiAyLCBzdWI6IDIsIHN1bW1hcnk6IDIsIHN1cDogMiwgc3ZnOiAyLCB0YWJsZTogMiwgdGJvZHk6IDIsIHRkOiAyLCB0ZXh0YXJlYTogMiwgdGZvb3Q6IDIsIHRoOiAyLCB0aGVhZDogMiwgdGltZTogMiwgdGl0bGU6IDIsIHRyOiAyLCB1OiAyLCB1bDogMiwgJ3Zhcic6IDIsIHZpZGVvOiAyfTtcblxuICAgIHRhZ3MudGV4dCA9IDE7ICAvLyBzcGVjaWFsIHRhZzogIHVzZXMgXy5tYWtlVGV4dCAoKVxuICAgIFxuICAgIHJldHVybiB0YWdzLmhhc093blByb3BlcnR5KHRhZykgPyB0YWdzIFt0YWddIDogMDtcblxufTsgLy8gZW5kIF8uZ2V0VGFnVHlwZSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy50ZXh0TWFrZSA9IChwYXJlbnQsIHByaW1pdGl2ZSwgbG9jYXRpb24pID0+IHtcbiAgICBcbiAgICBpZiAodHlwZW9mIHByaW1pdGl2ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBzaW5nbGVxdW90ZSA9ICcmI3gwMDI3Oyc7XG4gICAgICAgIHZhciBiYWNrc2xhc2ggPSAnJiN4MDA1YzsnO1xuICAgICAgICB2YXIgZG91YmxlcXVvdGUgPSAnJiN4MDAyMjsnO1xuICAgICAgICB2YXIgbHQgPSAnJmx0Oyc7XG4gICAgICAgIFxuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoLycvZywgc2luZ2xlcXVvdGUpO1xuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoL1wiL2csIGRvdWJsZXF1b3RlKTtcbiAgICAgICAgcHJpbWl0aXZlID0gcHJpbWl0aXZlLnJlcGxhY2UgKC9cXFxcL2csIGJhY2tzbGFzaCk7XG4gICAgICAgIHByaW1pdGl2ZSA9IHByaW1pdGl2ZS5yZXBsYWNlICgvPC9nLCBsdCk7XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcmltaXRpdmUgPT09ICdzeW1ib2wnKSB7XG5cbiAgICAgICAgcHJpbWl0aXZlID0gJ3N5bWJvbCc7XG4gICAgICAgICAgICAvLyBvdGhlcndpc2Ugc3RyaW5naWZ5IHdvdWxkIHByb2R1Y2UgJ3t9JyB3aGljaCBpcyBsZXNzIHVzZWZ1bFxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBwcmltaXRpdmUgPSBKU09OLnN0cmluZ2lmeSAocHJpbWl0aXZlKTtcblxuICAgIH0gLy8gZW5kIGlmICh0eXBlb2YgcHJpbWl0aXZlID09PSAnc3RyaW5nJylcbiAgICBcblxuICAgICQocGFyZW50KSBbbG9jYXRpb25dIChwcmltaXRpdmUpO1xuXG4gICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIHRleHQgb2JzIGhhdmUgbm8gaWQnczogb25seSB0ZXh0IGlzIGFwcGVuZGVkIHdpdGggbm8gd2F5IHRvIGFkZHJlc3MgaXRcbiAgICAgICAgLy8gaWYgYWRkcmVzc2luZyBpcyBuZWNlc3NhcnksIHVzZSBzcGFuIGluc3RlYWQgb2YgdGV4dFxuXG59OyAvLyBlbmQgXy50ZXh0TWFrZSBcblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmRpc3BsYXlQYWdlID0gKGRpc3BPYikgPT4ge1xuICAgIFxuICAgIHZhciBwYXJlbnQgPSBkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdwYXJlbnQnKSA/IGRpc3BPYi5wYXJlbnQgOiAnYm9keSc7XG4gICAgICAgIC8vIGlmIHBhcmVudCBub3QgZm91bmQsIGFwcGVuZCB0byBib2R5XG5cbiAgICB2YXIgSWQgPSBfLmRpc3BsYXlQYWdlSCAocGFyZW50LCBkaXNwT2IpO1xuXG4gICAgcmV0dXJuIElkO1xuXG59OyAvLyBlbmQgUC5kaXNwbGF5UGFnZSBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZ2VuSWQgPSAoKSA9PiB7XG5cbiAgICB2YXIgaWQgPSAnaScgKyBfLmlkKys7XG4gICAgcmV0dXJuIGlkO1xuXG59OyAvLyBlbmQgUC5nZW5JZFxuXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5yZXR1cm4gUDtcblxufSgpKTtcblxuXG5cbiIsIi8vIGdvLWtleS9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChqcVNlbGVjdG9yLCByZXBvcnRTaGlmdCwga2V5RG93bkhhbmRsZXIsIHJlcG9ydFVwLCBrZXlVcEhhbmRsZXIpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuXG4gICAganFTZWxlY3RvcjogJ2JvZHknLFxuICAgIHJlcG9ydFNoaWZ0OiBmYWxzZSxcbiAgICBrZXlEb3duSGFuZGxlcjogbnVsbCxcbiAgICByZXBvcnRVcDogZmFsc2UsXG4gICAga2V5VXBIYW5kbGVyOiBudWxsLFxuXG4gICAga1NoaWZ0OiBmYWxzZSxcbiAgICBrQ3RybDogZmFsc2UsXG4gICAga0FsdDogZmFsc2UsXG4gICAga0NtZDogZmFsc2UsXG4gICAga0lnbm9yZTogZmFsc2UsXG4gICAgd2hpY2hTaGlmdEtleXM6IHsxNjoxLCAxNzoxLCAxODoxLCA5MToxLCA5MjoxLCA5MzoxLCAyMjQ6MX0sXG5cbiAgICAgICAgICAgIC8vIG5vdCBwcmludGFibGUgb3Igbm9uLWFzY2lpIGJsb2NrXG4gICAgY3RybE9yTm9uQXNjaWk6IHtcbiAgICAgICAgODogJ0JhY2tzcGFjZScsXG4gICAgICAgIDk6ICdUYWInLFxuICAgICAgICAxMzogJ0VudGVyJyxcbiAgICAgICAgMTY6ICdTaGlmdCcsXG4gICAgICAgIDE3OiAnQ3RybCcsXG4gICAgICAgIDE4OiAnQWx0JyxcbiAgICAgICAgMTk6ICdQYXVzZS1icmVhaycsXG4gICAgICAgIDIwOiAnQ2Fwcy1sb2NrJyxcbiAgICAgICAgMjc6ICdFc2MnLFxuICAgICAgICAzMjogJyAnLCAgLy8gU3BhY2VcbiAgICAgICAgMzM6ICdQYWdlVXAnLFxuICAgICAgICAzNDogJ1BhZ2VEb3duJyxcbiAgICAgICAgMzU6ICdFbmQnLFxuICAgICAgICAzNjogJ0hvbWUnLFxuICAgICAgICAzNzogJ0xlZnQnLFxuICAgICAgICAzODogJ1VwJyxcbiAgICAgICAgMzk6ICdSaWdodCcsXG4gICAgICAgIDQwOiAnRG93bicsXG4gICAgICAgIDQ1OiAnSW5zZXJ0JyxcbiAgICAgICAgNDY6ICdEZWxldGUnLFxuICAgICAgICA5MTogJ1dpbmRvd3NLZXlMZWZ0JyxcbiAgICAgICAgOTI6ICdXaW5kb3dzS2V5UmlnaHQnLFxuICAgICAgICA5MzogJ1dpbmRvd3NPcHRpb25LZXknLFxuICAgICAgICA5NjogJzAnLCAgLy8gTnVtcGFkXG4gICAgICAgIDk3OiAnMScsICAvLyBOdW1wYWRcbiAgICAgICAgOTg6ICcyJywgIC8vIE51bXBhZFxuICAgICAgICA5OTogJzMnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMDogJzQnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMTogJzUnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMjogJzYnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMzogJzcnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNDogJzgnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNTogJzknLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNjogJyonLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNzogJysnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwOTogJy0nLCAgLy8gTnVtcGFkXG4gICAgICAgIDExMDogJy4nLCAgLy8gTnVtcGFkXG4gICAgICAgIDExMTogJy8nLCAgLy8gTnVtcGFkXG4gICAgICAgIDExMjogJ0YxJyxcbiAgICAgICAgMTEzOiAnRjInLFxuICAgICAgICAxMTQ6ICdGMycsXG4gICAgICAgIDExNTogJ0Y0JyxcbiAgICAgICAgMTE2OiAnRjUnLFxuICAgICAgICAxMTc6ICdGNicsXG4gICAgICAgIDExODogJ0Y3JyxcbiAgICAgICAgMTE5OiAnRjgnLFxuICAgICAgICAxMjA6ICdGOScsXG4gICAgICAgIDEyMTogJ0YxMCcsXG4gICAgICAgIDEyMjogJ0YxMScsXG4gICAgICAgIDEyMzogJ0YxMicsXG4gICAgICAgIDE0NDogJ051bWxvY2snLFxuICAgICAgICAxNDU6ICdTY3JvbGwtbG9jaycsXG4gICAgICAgIDIyNDogJ01hY0NtZCcsXG4gICAgfSxcbiAgICBcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGFzY2lpVW5TaGlmdGVkOiB7XG4gICAgICAgIDQ4OiAnMCcsXG4gICAgICAgIDQ5OiAnMScsXG4gICAgICAgIDUwOiAnMicsXG4gICAgICAgIDUxOiAnMycsXG4gICAgICAgIDUyOiAnNCcsXG4gICAgICAgIDUzOiAnNScsXG4gICAgICAgIDU0OiAnNicsXG4gICAgICAgIDU1OiAnNycsXG4gICAgICAgIDU2OiAnOCcsXG4gICAgICAgIDU3OiAnOScsXG4gICAgICAgIDU5OiAnOycsXG4gICAgICAgIDYxOiAnPScsXG4gICAgICAgIDY1OiAnYScsXG4gICAgICAgIDY2OiAnYicsXG4gICAgICAgIDY3OiAnYycsXG4gICAgICAgIDY4OiAnZCcsXG4gICAgICAgIDY5OiAnZScsXG4gICAgICAgIDcwOiAnZicsXG4gICAgICAgIDcxOiAnZycsXG4gICAgICAgIDcyOiAnaCcsXG4gICAgICAgIDczOiAnaScsXG4gICAgICAgIDc0OiAnaicsXG4gICAgICAgIDc1OiAnaycsXG4gICAgICAgIDc2OiAnbCcsXG4gICAgICAgIDc3OiAnbScsXG4gICAgICAgIDc4OiAnbicsXG4gICAgICAgIDc5OiAnbycsXG4gICAgICAgIDgwOiAncCcsXG4gICAgICAgIDgxOiAncScsXG4gICAgICAgIDgyOiAncicsXG4gICAgICAgIDgzOiAncycsXG4gICAgICAgIDg0OiAndCcsXG4gICAgICAgIDg1OiAndScsXG4gICAgICAgIDg2OiAndicsXG4gICAgICAgIDg3OiAndycsXG4gICAgICAgIDg4OiAneCcsXG4gICAgICAgIDg5OiAneScsXG4gICAgICAgIDkwOiAneicsXG4gICAgICAgIDE3MzogJy0nLFxuICAgICAgICAxODg6ICcsJyxcbiAgICAgICAgMTkwOiAnLicsXG4gICAgICAgIDE5MTogJy8nLFxuICAgICAgICAxOTI6ICdgJyxcbiAgICAgICAgMjE5OiAnWycsXG4gICAgICAgIDIyMDogXCJcXFxcXCIsXG4gICAgICAgIDIyMTogJ10nLFxuICAgICAgICAyMjI6IFwiJ1wiLFxuICAgIDE4NjogXCI7XCIsICAvLyBkaXR0byBmb3IgJzsnXG4gICAgMTg3OiBcIj1cIiwgIC8vIGFwcGFyZW50bHksIGNocm9tZSB0aGlua3Mgd2hpY2ggaXMgMTg3IGZvciAnPScsIGJ1dCBub3QgZmlyZWZveFxuICAgIDE4OTogXCItXCIsICAvLyBkaXR0byBmb3IgJy0nXG4gICAgfSxcbiAgICBcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGFzY2lpU2hpZnRlZDoge1xuICAgICAgICA0ODogJyknLFxuICAgICAgICA0OTogJyEnLFxuICAgICAgICA1MDogJ0AnLFxuICAgICAgICA1MTogJyMnLFxuICAgICAgICA1MjogJyQnLFxuICAgICAgICA1MzogJyUnLFxuICAgICAgICA1NDogJ14nLFxuICAgICAgICA1NTogJyYnLFxuICAgICAgICA1NjogJyonLFxuICAgICAgICA1NzogJygnLFxuICAgICAgICA1OTogJzonLFxuICAgICAgICA2MTogJysnLFxuICAgICAgICA2NTogJ0EnLFxuICAgICAgICA2NjogJ0InLFxuICAgICAgICA2NzogJ0MnLFxuICAgICAgICA2ODogJ0QnLFxuICAgICAgICA2OTogJ0UnLFxuICAgICAgICA3MDogJ0YnLFxuICAgICAgICA3MTogJ0cnLFxuICAgICAgICA3MjogJ0gnLFxuICAgICAgICA3MzogJ0knLFxuICAgICAgICA3NDogJ0onLFxuICAgICAgICA3NTogJ0snLFxuICAgICAgICA3NjogJ0wnLFxuICAgICAgICA3NzogJ00nLFxuICAgICAgICA3ODogJ04nLFxuICAgICAgICA3OTogJ08nLFxuICAgICAgICA4MDogJ1AnLFxuICAgICAgICA4MTogJ1EnLFxuICAgICAgICA4MjogJ1InLFxuICAgICAgICA4MzogJ1MnLFxuICAgICAgICA4NDogJ1QnLFxuICAgICAgICA4NTogJ1UnLFxuICAgICAgICA4NjogJ1YnLFxuICAgICAgICA4NzogJ1cnLFxuICAgICAgICA4ODogJ1gnLFxuICAgICAgICA4OTogJ1knLFxuICAgICAgICA5MDogJ1onLFxuICAgICAgICAxNzM6ICdfJyxcbiAgICAgICAgMTg4OiAnPCcsXG4gICAgICAgIDE5MDogJz4nLFxuICAgICAgICAxOTE6ICc/JyxcbiAgICAgICAgMTkyOiAnficsXG4gICAgICAgIDIxOTogJ3snLFxuICAgICAgICAyMjA6ICd8JyxcbiAgICAgICAgMjIxOiAnfScsXG4gICAgICAgIDIyMjogJ1wiJyxcbiAgICAxODY6IFwiOlwiLCAgLy8gZGl0dG8gZm9yICc6J1xuICAgIDE4NzogXCIrXCIsICAvLyBkaXR0byBmb3IgJysnXG4gICAgMTg5OiBcIl9cIiwgIC8vIGRpdHRvIGZvciAnLSdcbiAgICB9LFxuXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmluaXQgPSAoKSA9PiB7XG4gICAgXG4gICAgXy5qcVNlbGVjdG9yID0ganFTZWxlY3RvciA/IGpxU2VsZWN0b3IgOiAnYm9keSc7XG4gICAgXy5yZXBvcnRTaGlmdCA9IHJlcG9ydFNoaWZ0ID8gcmVwb3J0U2hpZnQgOiBmYWxzZTtcbiAgICBfLmtleURvd25IYW5kbGVyID0ga2V5RG93bkhhbmRsZXIgPyBrZXlEb3duSGFuZGxlciA6IF8uZGVmYXVsdEhhbmRsZXI7XG4gICAgXy5yZXBvcnRVcCA9IHJlcG9ydFVwID8gcmVwb3J0VXAgOiBmYWxzZTtcbiAgICBfLmtleVVwSGFuZGxlciA9IGtleVVwSGFuZGxlciA/IGtleVVwSGFuZGxlciA6IF8uZGVmYXVsdEhhbmRsZXI7XG5cbiAgICBQLnNldEtleVVwRG93biAoKTtcblxufTsgLy8gZW5kIF8uaW5pdFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5jS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgIC8vIGNhbGxiYWNrIGlzIF8ua2V5RG93bkhuZGxlclxuICAgIC8vIHJldHVybnMgY2ggb2JqZWN0IHJlZmxlY3Rpbmcgd2hpY2ggc2hpZnQga2V5cyB3ZXJlIHByZXNzZWQgZG93biwgY2ggYW5kIHdoaWNoIHZhbHVlc1xuICAgIC8vXG4gICAgLy8gXy5yZXBvcnRTaGlmdCB0cnVlID0+IHRyaWdnZXIgY2FsbGJhY2sgZm9yIGVhY2gga2V5ZG93biBldmVudCBvZiBhbnkga2V5LCBcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkaW5nIGFueSBzaGlmdCBrZXlcbiAgICAvLyAgICAgZmFsc2UgPT4gc2hpZnQga2V5IGV2ZW50IHJlcG9ydGVkIG9ubHkgd2hlbiB0aGUgbmV4dCBub24tc2hpZnQga2V5ZG93biBldmVudC5cbiAgICAvLyAgICAgICAgICAgICAgU28sIGNhbGxiYWNrIGlzIG9ubHkgdHJpZ2dlcmVkIGZvciBub24tc2hpZnQga2V5IGV2ZW50c1xuICAgIFxuICAgIHZhciB3aGljaCA9IGV2ZW50LndoaWNoO1xuXG4gICAgICAgIC8vIG5ldmVyIGlnbm9yZSAnRXNjJyBrZXkgPT0gMjdcbiAgICBpZiAoXy5rSWdub3JlICYmIHdoaWNoICE9IDI3KSB7XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSAvLyBlbmQgaWYgKGtJZ25vcmUpXG4gICAgXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24gKCk7XG5cbiAgICB2YXIgaXNBU2hpZnRLZXkgPSB0cnVlO1xuICAgIHN3aXRjaCAod2hpY2gpIHtcblxuICAgICAgICBjYXNlIDE2OiBcbiAgICAgICAgICAgIF8ua1NoaWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTc6IFxuICAgICAgICAgICAgXy5rQ3RybCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDE4OiBcbiAgICAgICAgICAgIF8ua0FsdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDkxOiBcbiAgICAgICAgY2FzZSA5MjogXG4gICAgICAgIGNhc2UgOTM6IFxuICAgICAgICBjYXNlIDIyNDpcbiAgICAgICAgICAgIF8ua0NtZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaXNBU2hpZnRLZXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAgIFxuXG4gICAgXy5jS2V5VXBEb3duRmluaXNoIChpc0FTaGlmdEtleSwgd2hpY2gsIF8ua2V5RG93bkhhbmRsZXIpO1xuXG59OyAvLyBlbmQgXy5jS2V5RG93biBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5jS2V5VXAgPSAoZXZlbnQpID0+IHtcbiAgICAvLyBjYWxsYmFjayBpcyBfLmtleURvd25IbmRsZXJcbiAgICBcbiAgICB2YXIgd2hpY2ggPSBldmVudC53aGljaDtcblxuICAgICAgICAvLyBuZXZlciBpZ25vcmUgJ0VzYycga2V5ID09IDI3XG4gICAgaWYgKF8ua0lnbm9yZSAmJiB3aGljaCAhPSAyNykge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChrSWdub3JlKVxuICAgIFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uICgpO1xuXG4gICAgdmFyIGlzQVNoaWZ0S2V5ID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKHdoaWNoKSB7XG5cbiAgICAgICAgY2FzZSAxNjogXG4gICAgICAgICAgICBfLmtTaGlmdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTc6IFxuICAgICAgICAgICAgXy5rQ3RybCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgXy5rQWx0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA5MTogXG4gICAgICAgIGNhc2UgOTI6IFxuICAgICAgICBjYXNlIDkzOiBcbiAgICAgICAgY2FzZSAyMjQ6IFxuICAgICAgICAgICAgXy5rQ21kID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaXNBU2hpZnRLZXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAgIFxuXG4gICAgaWYgKCFfLnJlcG9ydFVwKSB7XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSAvLyBlbmQgaWYgKCFyZXBvcnRVcClcbiAgICBcbiAgICBfLmNLZXlVcERvd25GaW5pc2ggKGlzQVNoaWZ0S2V5LCB3aGljaCwgXy5rZXlVcEhhbmRsZXIpO1xuXG59OyAvLyBlbmQgXy5jS2V5VXAgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmNLZXlVcERvd25GaW5pc2ggPSAoaXNBU2hpZnRLZXksIHdoaWNoLCBjYWxsYmFjaykgPT4ge1xuICAgIFxuICAgIGlmIChpc0FTaGlmdEtleSAmJiAhXy5yZXBvcnRTaGlmdCkge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChpc0FTaGlmdEtleSAmJiAhXy5yZXBvcnRTaGlmdClcbiAgICBcbiAgICB2YXIgdGhpc0NoID0gXy5nZXRLZXlDb2RlICh3aGljaCk7XG5cbiAgICB2YXIgY2hPYiA9ICh7XG4gICAgICAgIHNoaWZ0OiBfLmtTaGlmdCxcbiAgICAgICAgY3RybDogXy5rQ3RybCxcbiAgICAgICAgYWx0OiBfLmtBbHQsXG4gICAgICAgIG1hY0NtZDogXy5rQ21kLFxuICAgICAgICB3aGljaDogd2hpY2gsXG4gICAgICAgIGNoOiB0aGlzQ2gsXG4gICAgICAgIGlzQVNoaWZ0S2V5OiBpc0FTaGlmdEtleSxcbiAgICB9KTtcblxuICAgIC8vIGNvbnNvbGUubG9nICgnY2hPYjogJyArIEpTT04uc3RyaW5naWZ5IChjaE9iKSArICdcXG4nKTtcbiAgICAvKlxuICAgIGlmIChfLnJlcG9ydFNoaWZ0KSB7XG5cbiAgICAgICAgY2hPYi5pc0FTaGlmdEtleSA9IGlzQVNoaWZ0S2V5OyAgXG4gICAgICAgICAgICAvLyB0cnVlIGlmIGFueSBvZjogc2hpZnQsIGN0cmwsIGFsdCwgb3IgbWFjQ21kIGFyZSB0cnVlXG4gICAgICAgICAgICAvLyBvbmx5IHJlbGV2YW50IGlmIF8ucmVwb3J0U2hpZnQgaXMgdHJ1ZVxuXG4gICAgfSAvLyBlbmQgaWYgKF8ucmVwb3J0U2hpZnQpXG4gICAgKi9cblxuICAgIGNhbGxiYWNrIChjaE9iKTtcblxufTsgLy8gZW5kIF8uY0tleVVwRG93bkZpbmlzaCBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kZWZhdWx0SGFuZGxlciA9IChjaE9iKSA9PiB7XG4gICAgXG4gICAgdmFyIGNoT2JTID0gSlNPTi5zdHJpbmdpZnkgKGNoT2IpO1xuICAgIGNvbnNvbGUubG9nICgna2V5Ll8uZGVmYXVsdEhhbmRsZXIuY2hPYjogJyArIGNoT2JTKTtcblxufTsgLy8gZW5kIF8uZGVmYXVsdEhhbmRsZXIgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5nZXRLZXlDb2RlID0gKHdoaWNoKSA9PiB7XG4gICAgXG5cbiAgICB2YXIgY2g7XG5cbiAgICBpZiAoXy5jdHJsT3JOb25Bc2NpaS5oYXNPd25Qcm9wZXJ0eSAod2hpY2gpKSB7XG5cbiAgICAgICAgY2ggPSBfLmN0cmxPck5vbkFzY2lpIFt3aGljaF07XG5cbiAgICB9IGVsc2UgaWYgKF8ua1NoaWZ0ICYmIF8uYXNjaWlTaGlmdGVkLmhhc093blByb3BlcnR5ICh3aGljaCkpIHtcblxuICAgICAgICBjaCA9IF8uYXNjaWlTaGlmdGVkIFt3aGljaF07XG5cbiAgICB9IGVsc2UgaWYgKCFfLmtTaGlmdCAmJiBfLmFzY2lpVW5TaGlmdGVkLmhhc093blByb3BlcnR5ICh3aGljaCkpIHtcblxuICAgICAgICBjaCA9IF8uYXNjaWlVblNoaWZ0ZWQgW3doaWNoXTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY2ggPSBudWxsO1xuXG4gICAgfSAvLyBlbmQgaWYgXG5cbiAgICByZXR1cm4gY2g7XG5cbn07IC8vIGVuZCBfLmdldEtleUNvZGUgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5pbml0S2V5RG93biA9IChqcVNlbGVjdG9yKSA9PiB7XG4gICAgXG4gICAgJChqcVNlbGVjdG9yKVxuICAgIC5vZmYoJ2tleWRvd24nKVxuICAgIC5rZXlkb3duIChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJyA9PT4gaW5pdEtleURvd24nKTtcbiAgICAgICAgXy5jS2V5RG93biAoZXZlbnQpO1xuICAgIH0pO1xuXG59OyAvLyBlbmQgXy5pbml0S2V5RG93biBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5pbml0S2V5VXAgPSAoanFTZWxlY3RvcikgPT4ge1xuICAgIFxuICAgICQoanFTZWxlY3RvcilcbiAgICAub2ZmKCdrZXl1cCcpXG4gICAgLmtleXVwIChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJyA9PT4gaW5pdEtleVVwJyk7XG4gICAgICAgIF8uY0tleVVwIChldmVudCk7XG4gICAgfSk7XG5cbn07IC8vIGVuZCBfLmluaXRLZXlVcCBcblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnNldEtleVVwRG93biA9ICgpID0+IHtcbiAgICBcbiAgICBfLmluaXRLZXlVcCAoJ2JvZHknKTtcbiAgICBfLmluaXRLZXlEb3duICgnYm9keScpO1xuXG59OyAvLyBlbmQgUC5zZXRLZXlIYW5kbGVyXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5fLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuIiwiLy8gZ28tcG9waW5mby9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkcCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIF8gPSB7XG4gICAgZHBwOiBkcC5kaXNwbGF5UGFnZSxcbiAgICBnZW5JZDogZHAuZ2VuSWQsXG4gICAgYXJyb3dTaXplOiAxMCxcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG5fLmluaXQgPSAoKSA9PiB7XG5cbiAgICBfLnNldFBvcHVwU3R5bGUgKCk7XG59O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5nZXRQb3NEaW0gPSAoanEpID0+IHtcbiAgICBcbiAgICB2YXIgcmVzID0ge307XG5cbiAgICB2YXIgb2Zmc2V0ID0gJChqcSkub2Zmc2V0ICgpO1xuICAgIHJlcy5sZWZ0ID0gb2Zmc2V0LmxlZnQ7XG4gICAgcmVzLnRvcCA9IG9mZnNldC50b3A7XG5cbiAgICByZXMud2lkdGggPSAkKGpxKS53aWR0aCAoKTtcbiAgICByZXMuaGVpZ2h0ID0gJChqcSkuaGVpZ2h0ICgpO1xuXG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIF8uZ2V0UG9zRGltIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5zZXRQb3B1cFN0eWxlID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBhcyA9IF8uYXJyb3dTaXplO1xuXG4gICAgdmFyIHBvcHVwU3R5bGUgPSB7c3R5bGU6IFxuICAgICcucG9wdXAgeycgK1xuICAgICAgICAncG9zaXRpb246IHJlbGF0aXZlOycgK1xuICAgICAgICAnZGlzcGxheTogaW5saW5lLWJsb2NrOycgK1xuICAgICAgICAnYm9yZGVyOiAxcHggc29saWQgYmx1ZTsnICtcbiAgICAgICAgJ2JvcmRlci1yYWRpdXM6IDRweDsnICtcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3I6ICNlYmYyZjI7JyArXG4gICAgICAgICdmb250LXNpemU6IDEycHg7JyArXG4gICAgJ30nICtcbiAgICAnLnBvcHVwbm92aXMgeycgK1xuICAgICAgICAndmlzaWJpbGl0eTogaGlkZGVuOycgK1xuICAgICd9JyArXG4gICAgJy5hcnJvdyB7JyArXG4gICAgICAgICdwb3NpdGlvbjogYWJzb2x1dGU7JyArXG4gICAgICAgICdkaXNwbGF5OiBpbmxpbmUtYmxvY2s7JyArXG4gICAgICAgICd3aWR0aDogMDsnICtcbiAgICAgICAgJ2hlaWdodDogMDsnICtcbiAgICAgICAgJ2JvcmRlci1zdHlsZTogc29saWQ7JyArXG4gICAgICAgICdib3gtc2l6aW5nOiBib3JkZXItYm94OycgK1xuICAgICd9JyArXG4gICAgJy5hcnJvd2JvcmRlciB7JyArXG4gICAgICAgICdib3JkZXItd2lkdGg6ICcgKyAoYXMgLSAxKSArICdweDsnICtcbiAgICAgICAgJ2JvcmRlci1jb2xvcjogYmx1ZSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDsnICtcbiAgICAgICAgJ2JvdHRvbTogLScgKyAoMiphcyAtIDIpICsgJ3B4OycgK1xuICAgICd9JyArXG4gICAgJy5hcnJvd2ZpbGxlciB7JyArXG4gICAgICAgICdib3JkZXItd2lkdGg6ICcrIChhcyAtIDIpICsgJ3B4OycgK1xuICAgICAgICAnYm9yZGVyLWNvbG9yOiAjZWJmMmYyIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50OycgK1xuICAgICAgICAnYm90dG9tOiAtJyArICgyKmFzIC0gNCkgKyAncHg7JyArXG4gICAgICAgICd6LWluZGV4OiAxOycgK1xuICAgICd9J1xuICAgICwgcGFyZW50OiAnaGVhZCd9O1xuXG4gICAgXy5kcHAgKHBvcHVwU3R5bGUpO1xuXG59OyAvLyBlbmQgXy5zZXRQb3B1cFN0eWxlXG5cblxuXG5cblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuY3JlYXRlUG9wdXBEaXNwbGF5ID0gKGpxT2IsIGRpc3BzdHIsIG9wdGlvbnMpID0+IHtcbiAgICBcbiAgICBqcU9iID0gdHlwZW9mIGpxT2IgPT09ICdzdHJpbmcnID8gJChqcU9iKSA6IGpxT2I7XG5cbiAgICBkaXNwU3RycyA9IGRpc3BzdHIuc3BsaXQgKCdcXG4nKTtcblxuICAgIHZhciBkaXNwQSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcFN0cnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgZGlzcFN0ciA9IGRpc3BTdHJzIFtpXTtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG5cbiAgICAgICAgICAgIGRpc3BBLnB1c2ggKHticjowfSk7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGkgPiAwKVxuICAgICAgICBcbiAgICAgICAgZGlzcEEucHVzaCAoe3NwYW46IGRpc3BTdHIsIHN0eWxlOiAnZGlzcGxheTogaW5saW5lLWJsb2NrOyd9KTtcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwU3RyczsgaSsrKVxuICAgIFxuICAgIHZhciBkaXNwT2IgPSB7ZGl2OiBkaXNwQSwgc3R5bGU6ICdtYXJnaW46IDJweDsnfTtcbiAgICB2YXIgcG9zRWwgPSBfLmdldFBvc0RpbSAoanFPYik7XG5cbiAgICAgICAgLy8gZm9yY2VzIGRpdiB3aWR0aCB0byB3aWR0aCBvZiBjb250ZW50XG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDUwOTAzL2hvdy10by1tYWtlLWRpdi1ub3QtbGFyZ2VyLXRoYW4taXRzLWNvbnRlbnRzXG5cbiAgICB2YXIgaWRBYiA9IF8uZ2VuSWQgKCk7XG4gICAgdmFyIGlkQWYgPSBfLmdlbklkICgpO1xuXG4gICAgdmFyIGRpdkFycm93Qm9yZGVyID0ge2RpdjogMCwgaWQ6IGlkQWIsIGNsYXNzOiAnYXJyb3cgYXJyb3dib3JkZXInfTtcbiAgICB2YXIgZGl2QXJyb3dGaWxsZXIgPSB7ZGl2OiAwLCBpZDogaWRBZiwgY2xhc3M6ICdhcnJvdyBhcnJvd2ZpbGxlcid9O1xuXG4gICAgaWRBYiA9ICcjJyArIGlkQWI7XG4gICAgaWRBZiA9ICcjJyArIGlkQWY7XG5cbiAgICB2YXIgcG9wT2IgPSB7ZGl2OiBbZGlzcE9iLCBkaXZBcnJvd0JvcmRlciwgZGl2QXJyb3dGaWxsZXJdLCBjbGFzczogJ3BvcHVwJ31cbiAgICB2YXIgSWRQb3BPYiA9IF8uZHBwIChwb3BPYik7XG4gICAgdmFyIHBvc1BvcHVwID0gXy5nZXRQb3NEaW0gKElkUG9wT2IpO1xuXG4gICAgdmFyIHRvcERPID0gcG9zRWwudG9wIC0gcG9zUG9wdXAuaGVpZ2h0IC0gXy5hcnJvd1NpemU7XG4gICAgdmFyIGxlZnRETyA9IHBvc0VsLmxlZnQgKyBwb3NFbC53aWR0aC8yIC0gcG9zUG9wdXAud2lkdGgvMjtcblxuICAgICQoSWRQb3BPYilcbiAgICAub2Zmc2V0ICh7dG9wOiB0b3BETywgbGVmdDogbGVmdERPfSk7XG5cbiAgICB2YXIgcG9zQWIgPSBfLmdldFBvc0RpbSAoaWRBYik7XG4gICAgdmFyIHBvc0FmID0gXy5nZXRQb3NEaW0gKGlkQWYpO1xuXG4gICAgdmFyIGFzID0gXy5hcnJvd1NpemU7XG4gICAgJChpZEFiKVxuICAgIC5vZmZzZXQgKHt0b3A6IHBvc0FiLnRvcCwgbGVmdDogbGVmdERPICsgcG9zUG9wdXAud2lkdGgvMiAtIGFzLzIgLSAyfSk7XG5cbiAgICAkKGlkQWYpXG4gICAgLm9mZnNldCAoe3RvcDogcG9zQWYudG9wLCBsZWZ0OiBsZWZ0RE8gKyBwb3NQb3B1cC53aWR0aC8yICsgMSAtIGFzLzIgLSAyfSk7XG5cbiAgICAkKElkUG9wT2IpXG4gICAgLmFkZENsYXNzICgncG9wdXBub3ZpcycpO1xuXG4gICAgcmV0dXJuIElkUG9wT2I7XG59OyAvLyBlbmQgUC5jcmVhdGVQb3B1cERpc3BsYXkgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmhpZGVQb3B1cHMgPSAoSWQpID0+IHtcbiAgICBcbiAgICB2YXIgc2VsID0gSWQgPyBJZCA6ICcucG9wdXAnO1xuXG4gICAgJChzZWwpXG4gICAgLmFkZENsYXNzICgncG9wdXBub3ZpcycpO1xuXG5cbn07IC8vIGVuZCBQLmhpZGVQb3B1cHNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5zaG93UG9wdXBzID0gKElkKSA9PiB7XG4gICAgXG4gICAgdmFyIHNlbCA9IElkID8gSWQgOiAnLnBvcHVwJztcblxuICAgICQoc2VsKVxuICAgIC5yZW1vdmVDbGFzcyAoJ3BvcHVwbm92aXMnKTtcblxuXG59OyAvLyBlbmQgUC5zaG93UG9wdXBzXG5cblxuXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbl8uaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG5cbiIsIi8vIGdvLXV0aWwvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuXG4gICAga2V5MTogcmVxdWlyZSAoJ2tleTEnKVxuXG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kZHNEb0l0ID0gKG9iLCB0b1VuaWNvZGUpID0+IHtcbiAgICAvLyBvYiBpcyBhcnJheSA9PiByZXR1cm5zIHNhbWUgb2JcbiAgICAvLyBvYiBpcyBvYmplY3QgPT4gcmV0dXJucyBuZXcgb2JcbiAgICBcbiAgICB2YXIgcmVzO1xuXG4gICAgdmFyIGRvUmVwbGFjZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIG5ld0tleTtcblxuICAgICAgICBpZiAodG9Vbmljb2RlKSB7XG5cbiAgICAgICAgICAgIG5ld0tleSA9IGtleS5yZXBsYWNlICgvXFwkL2csICdcXFxcdUZGMDQnKTtcbiAgICAgICAgICAgIG5ld0tleSA9IG5ld0tleS5yZXBsYWNlICgvXFwuL2csICdcXFxcdUZGMEUnKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBuZXdLZXkgPSBrZXkucmVwbGFjZSAoL1xcXFx1RkYwNC9nLCAnJCcpO1xuICAgICAgICAgICAgbmV3S2V5ID0gbmV3S2V5LnJlcGxhY2UgKC9cXFxcdUZGMEUvZywgJy4nKTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAodG9Vbmljb2RlKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ld0tleTtcbiAgICB9O1xuXG4gICAgaWYgKG9iICE9PSBudWxsICYmIHR5cGVvZiBvYiA9PT0gJ29iamVjdCcgJiYgIShvYi5oYXNPd25Qcm9wZXJ0eSAoJ19ic29udHlwZScpICYmIG9iLl9ic29udHlwZSA9PT0gJ09iamVjdElEJykpIHtcblxuICAgICAgICB2YXIgaTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSkge1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2IubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIG9iIFtpXSA9IF8uZGRzRG9JdCAob2IgW2ldLCB0b1VuaWNvZGUpO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IG9iLmxlbmd0aDsgaSsrKVxuXG4gICAgICAgICAgICByZXMgPSBvYjtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXMgPSB7fTtcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyAob2IpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzIFtpXTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBvYltrZXldO1xuICAgIFxuICAgICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBkb1JlcGxhY2UgKGtleSk7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzIFtuZXdLZXldID0gXy5kZHNEb0l0ICh2YWwsIHRvVW5pY29kZSk7XG4gICAgXG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwga2V5czsgaSsrKVxuICAgICAgICAgICAgXG4gICAgICAgIH0gLy8gZW5kIGlmIChBcnJheS5pc0FycmF5IChvYikpXG4gICAgICAgIFxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmVzID0gb2I7XG5cbiAgICB9IC8vIGVuZCBpZiAob2IgPT09IG51bGwgfHwgdHlwZW9mIG9iICE9PSAnb2JqZWN0JylcblxuXG4gICAgcmV0dXJuIHJlcztcblxufTsgIC8vIGVuZCBfLmRkc0RvSXQgXG5cblxuICAgIC8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuYXJUb09iID0gKGFyKSA9PiB7XG4gICAgXG4gICAgdmFyIG9iID0ge307XG4gICAgXG4gICAgaWYgKEFycmF5LmlzQXJyYXkgKGFyKSkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXIubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgdmFyIG5hbWUgPSBhciBbaV07XG4gICAgICAgICAgICBvYiBbbmFtZV0gPSBpO1xuXG4gICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgYXIubGVuZ3RoOyBpKyspXG5cbiAgICB9IC8vIGVuZCBpZiAoQXJyYXkuaXNBcnJheSAoYXIpKVxuICAgIHJldHVybiBvYjtcblxufTsgLy8gZW5kIFAuYXJUb09iIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmNsb25lT2IgPSAob2IpID0+IHtcbiAgICAvLyBhc3N1bWVzIG5vIHZhbHVlcyB0aGF0IGFyZSBmdW5jdGlvbiB0eXBlc1xuICAgIFxuICAgIHJldHVybiBKU09OLnBhcnNlIChKU09OLnN0cmluZ2lmeSAob2IpKTtcblxufTsgLy8gZW5kIFAuY2xvbmVPYiBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5jb25zdFN0ciA9IChjaCwgbGVuZ3RoKSA9PiB7XG4gICAgXG4gICAgdmFyIHJlcyA9IG5ldyBBcnJheSAobGVuZ3RoICsgMSkuam9pbiAoY2gpO1xuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBjb25zdFN0ciBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kb2xsYXJEb3RTdWJVbmljb2RlID0gKG9iKSA9PiB7XG4gICAgXG4gICAgcmV0dXJuIF8uZGRzRG9JdCAob2IsIHRydWUpO1xuXG59OyAgLy8gZW5kIGRvbGxhckRvdFN1YlVuaWNvZGUgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZG9sbGFyRG90U3ViVW5pY29kZVJlc3RvcmUgPSAob2IpID0+IHtcbiAgICBcbiAgICByZXR1cm4gXy5kZHNEb0l0IChvYiwgZmFsc2UpO1xuXG59OyAgLy8gZW5kIGRvbGxhckRvdFN1YlVuaWNvZGVSZXN0b3JlXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZHVtcE9iID0gKG9iLCBkZXB0aCkgPT4ge1xuICAgIFxuICAgIGRlcHRoID0gZGVwdGggPyBkZXB0aCA6IDA7XG5cbiAgICB2YXIgaW5kZW50Q3VyO1xuICAgIHZhciBpbmRlbnREZWx0YTtcbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgZHVtcE9iSW5pdCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGluZGVudEN1ciA9IDA7XG4gICAgICAgIGluZGVudERlbHRhID0gNDtcbiAgICBcbiAgICB9OyAvLyBlbmQgZHVtcE9iSW5pdFxuICAgIFxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgZGVjckluZGVudCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGluZGVudEN1ciAtPSBpbmRlbnREZWx0YTtcbiAgICBcbiAgICB9OyAvLyBlbmQgZGVjckluZGVudFxuICAgIFxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIGluY3JJbmRlbnQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBpbmRlbnRDdXIgKz0gaW5kZW50RGVsdGE7XG4gICAgXG4gICAgfTsgLy8gZW5kIGluY3JJbmRlbnRcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBkb0luZGVudCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBcIiBcIi5yZXBlYXQgKGluZGVudEN1cik7XG4gICAgXG4gICAgfTsgLy8gZW5kIGRvSW5kZW50XG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgdG9wS2V5ID0gKCkgPT4ge1xuICAgIFxuICAgICAgICB2YXIgcmVzID0gXCJcIjtcbiAgICAgICAgdmFyIHN0YXJ0STtcblxuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPD0gZGVwdGgpIHtcblxuICAgICAgICAgICAgc3RhcnRJID0gMDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBzdGFydEkgPSBrZXlzLmxlbmd0aCAtIGRlcHRoO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChrZXlzLmxlbmd0aCA8PSBkZXB0aClcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRJOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICByZXMgKz0ga2V5cyBbaV07XG4gICAgICAgICAgICByZXMgKz0gaSA9PT0ga2V5cy5sZW5ndGggLSAxID8gXCJcIiA6IFwiLlwiO1xuXG4gICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXM7XG5cbiAgICB9OyAvLyBlbmQgdG9wS2V5XG5cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIGR1bXBLZXlQYWlyID0gKG9iLCBrZXkpID0+IHtcbiAgICBcbiAgICAgICAgdmFyIHByZWZpeCA9IHRvcEtleSAoKTtcblxuICAgICAgICB2YXIgcmVzID0gZG9JbmRlbnQgKCk7XG4gICAgICAgIHZhciB2YWwgPSBvYiBba2V5XTtcblxuICAgICAgICBrZXlzLnB1c2ggKGtleSk7XG4gICAgICAgIHJlcyArPSBwcmVmaXggIT09IFwiXCIgPyBwcmVmaXggKyAnLicgOiBcIlwiO1xuICAgICAgICByZXMgKz0ga2V5ICsgJzogJztcblxuICAgICAgICBpZiAoa2V5ID09PSAnX2lkJyAmJiBQLmlzT2IgKHZhbCkgJiYgdmFsLmhhc093blByb3BlcnR5ICgnX2Jzb250eXBlJykgJiYgdmFsLl9ic29udHlwZSA9PT0gJ09iamVjdElEJykge1xuXG4gICAgICAgICAgICByZXMgKz0gJ09iamVjdElkKFwiJyArIHZhbCArICdcIiknO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJlcyArPSBkdW1wT2JIICh2YWwpO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChrZXkgPT09ICdfaWQnICYmIFAuaXNPYiAodmFsKSAmJiB2YWwuaGFzT3duUHJvcGVydHkgKCdfYnNvbnR5cGUnKSAmJiB2YWwuX2Jzb250eXBlID09PSAnT2JqZWN0SUQnKVxuICAgICAgICBcbiAgICAgICAga2V5cy5wb3AgKCk7XG5cbiAgICAgICAgcmVzICs9IFwiXFxuXCI7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcblxuICAgIH07IC8vIGVuZCBkdW1wS2V5UGFpciBcblxuICAgIFxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgZHVtcE9iSCA9IChvYikgPT4ge1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgaWYgKHR5cGVvZiBvYiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9ICd1bmRlZmluZWQnO1xuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKG9iID09PSBudWxsKSB7XG4gICAgXG4gICAgICAgICAgICByZXMgPSAnbnVsbCc7XG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iID09PSAnYm9vbGVhbicpIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9IG9iID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2IgPT09ICdudW1iZXInKSB7XG4gICAgXG4gICAgICAgICAgICByZXMgPSBcIlwiICsgb2I7XG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iID09PSAnc3RyaW5nJykge1xuICAgIFxuICAgICAgICAgICAgaWYgKCFvYi5tYXRjaCAoLycvKSkge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9IFwiJ1wiICsgb2IgKyBcIidcIjtcbiAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9iLm1hdGNoICgvXCIvKSkge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9ICdcIicgKyBvYiArICdcIic7XG4gICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9ICdcIicgKyBvYi5yZXBsYWNlICgvXCIvLCAnXFxcXFwiJykgKyAnXCInO1xuICAgIFxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKCFvYi5tYXRjaCAoLycvKSlcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSkge1xuICAgIFxuICAgICAgICAgICAgaWYgKG9iLmxlbmd0aCA9PT0gMCkge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9ICdbXSc7XG4gICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9IFwiW1xcblwiO1xuICAgICAgICAgICAgICAgIGluY3JJbmRlbnQgKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYi5sZW5ndGg7IGkrKykge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gZHVtcEtleVBhaXIgKG9iLCBpKTtcbiAgICBcbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IG9iLmxlbmd0aDsgaSsrKVxuICAgIFxuICAgICAgICAgICAgICAgIGRlY3JJbmRlbnQgKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzICs9IGRvSW5kZW50ICgpO1xuICAgICAgICAgICAgICAgIHJlcyArPSBcIl1cIiA7XG4gICAgXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAob2IubGVuZ3RoID09PSAwKVxuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYiA9PT0gJ29iamVjdCcpIHtcbiAgICBcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMgKG9iKS5zb3J0ICgpO1xuICAgIFxuICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXMgPSBcInt9XCI7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXMgPSBcIntcXG5cIjtcbiAgICAgICAgICAgICAgICBpbmNySW5kZW50ICgpO1xuICAgIFxuICAgICAgICAgICAgICAgIGtleXMuZm9yRWFjaCAoZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPSBkdW1wS2V5UGFpciAob2IsIGtleSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZGVjckluZGVudCAoKTtcbiAgICAgICAgICAgICAgICByZXMgKz0gZG9JbmRlbnQgKCk7XG4gICAgICAgICAgICAgICAgcmVzICs9IFwifVwiO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAoa2V5cy5sZW5ndGggPT09IDApXG4gICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICByZXMgPSAndW5rbm93bjogJyArIHR5cGVvZiBvYjtcbiAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKHR5cGVvZiBvYiA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIFxuICAgIH07IC8vIGVuZCBkdW1wT2JIXG4gICAgXG4gICAgZHVtcE9iSW5pdCAoKTtcbiAgICByZXR1cm4gZHVtcE9iSCAob2IpO1xuXG59OyAvLyBlbmQgUC5kdW1wT2IgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5pc0VtcHR5ID0gKGl0ZW0pID0+IHtcbiAgICBcbiAgICB2YXIgcmVzID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiBpdGVtKSB7XG5cbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcblxuICAgICAgICAgICAgcmVzID0gaXRlbS5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd1bmRlZmluZWQnOlxuXG4gICAgICAgICAgICByZXMgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcblxuICAgICAgICAgICAgaWYgKFAuaXNPYiAoaXRlbSkpIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMgKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHJlcyA9IGtleXMubGVuZ3RoID09PSAwO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IHRydWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSAoaXRlbSkpIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IGl0ZW0ubGVuZ3RoID09PSAwO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmVzID0gbnVsbDsgIC8vIGNhc2Ugc2hvdWxkbid0IGhhcHBlbiwgc28gc2V0IHRvIG51bGwgaWYgaXQgZG9lc1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAoUC5pc09iIChpdGVtKSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG5cbiAgICAgICAgICAgIHJlcyA9ICFpdGVtO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcblxuICAgICAgICAgICAgcmVzID0gbnVtYmVyID09PSAwO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICB9IC8vIGVuZCBzd2l0Y2ggKHR5cGVvZiBpdGVtKVxuICAgIFxuXG4gICAgcmV0dXJuIHJlcztcbn07IC8vIGVuZCBQLmlzRW1wdHkgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuaXNPYiA9IChvYikgPT4ge1xuICAgIC8vIHJldHVybnMgdHJ1ZSBpZiBvYiBpcyBkZWZpbmVkLCBub3QgbnVsbCwgbm90IGFuIEFycmF5IGFuZCBvZiB0eXBlIG9iamVjdFxuICAgIFxuICAgIHZhciByZXMgPSB0eXBlb2Ygb2IgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICBvYiAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheSAob2IpICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBvYiA9PT0gJ29iamVjdCc7XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5pc09iIFxuXG5cblAua2V5MSA9IF8ua2V5MTtcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5wQ2hlY2sgPSAocCwgcERlZmF1bHQpID0+IHtcbiAgICAvLyBkaXRjaGVzIGFueSBwYXJhbWV0ZXJzIHN1cHBsaWVkIGluIHAgdGhhdCBhcmVuJ3QgcHJlc2VudCBpbiBwRGVmYXVsdFxuICAgIC8vIGlmIGEgcGFyYW0gaXMgbmVjZXNzYXJ5IHRvIGEgcm91dGluZSwgdGhlbiBpdCBzaG91bGQgYmUgZGVmaW5lZCBpbiBwRGVmYXVsdFxuICAgIFxuICAgIHZhciByZXMgPSB7fTtcblxuICAgIHAgPSBQLmlzT2IgKHApID8gcCA6IHt9O1xuICAgIFxuICAgIGZvciAodmFyIGtleSBpbiBwRGVmYXVsdCkge1xuXG4gICAgICAgIHJlcyBba2V5XSA9IHAuaGFzT3duUHJvcGVydHkgKGtleSkgPyBwIFtrZXldIDogcERlZmF1bHQgW2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIFAucENoZWNrIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnN0cmlwUUogPSAoanNvblN0cikgPT4ge1xuICAgIFxuICAgIHZhciByZXMgPSBqc29uU3RyLnJlcGxhY2UgKC9cIihbXlwiXSspXCJcXHMqOi9nLCBcIiQxOlwiKTtcbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5zdHJpcFFKIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnRyYXZlcnNlQXJyYXkgPSAoYXJyLCBmbkVsKSA9PiB7XG4gICAgXG4gICAgaWYgKEFycmF5LmlzQXJyYXkgKGFycikpIHtcblxuICAgICAgICBhcnIuZm9yRWFjaCAoZnVuY3Rpb24gKGVsKSB7XG5cbiAgICAgICAgICAgIFAudHJhdmVyc2VBcnJheSAoZWwsIGZuRWwpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBpZiAoUC5pc09iIChhcnIpKSB7XG5cbiAgICAgICAgICAgIHZhciB2YWwgPSBQLnZhbDEgKGFycik7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5ICh2YWwpKSB7XG5cbiAgICAgICAgICAgICAgICBQLnRyYXZlcnNlQXJyYXkgKHZhbCwgZm5FbCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBmbkVsIChhcnIpO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAoQXJyYXkuaXNBcnJheSAodmFsKSlcbiAgICAgICAgICAgIFxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGZuRWwgKGFycik7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKFAuaXNPYiAoYXJyKSlcblxuICAgIH0gLy8gZW5kIGlmIChBcnJheS5pc0FycmF5IChhcnIpKVxuICAgIFxuXG59OyAvLyBlbmQgUC50cmF2ZXJzZUFycmF5IFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnZhbDEgPSAob2IpID0+IHtcbiAgICBcbiAgICB2YXIga2V5MSA9IFAua2V5MSAob2IpO1xuICAgIHZhciByZXMgPSBrZXkxID8gb2IgW2tleTFdIDogbnVsbDtcblxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLnZhbDEgXG5cblxuXG4gICAgLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbnJldHVybiBQO1xuXG59KCkpO1xuXG5cblxuIiwiLy8gZ28td3MtY2xpZW50L2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlwLCBwb3J0LCBjbGllbnQsIG9wdGlvbnMpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuICAgIFxuICAgIGlwOiBpcCxcbiAgICBwb3J0OiBwb3J0LFxuICAgIHNlY3VyZUNvbm5lY3Rpb246IG51bGwsXG4gICAgdmVyYm9zZTogbnVsbCxcblxuICAgIHV0OiByZXF1aXJlICgnZ28tdXRpbCcpLFxuICAgIG1pbnNlYzogcmVxdWlyZSAoJ21pbnNlYycpLmdldE1pblNlYyxcbiAgICBtc2dTaG9ydGVuMDogcmVxdWlyZSAoJ21zZ3Nob3J0ZW4nKSxcbiAgICBtc2dTaG9ydGVuOiBudWxsLFxuICAgIHBjaGVjazogbnVsbCxcbiAgICBrZXkxOiBudWxsLFxuXG4gICAgd3NTZXJ2ZXI6IG51bGxcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5pbml0ID0gKCkgPT4ge1xuXG4gICAgXy5wY2hlY2sgPSBfLnV0LnBDaGVjaztcbiAgICBfLmtleTEgPSBfLnV0LmtleTE7XG5cbiAgICB2YXIgdGFyZ2V0TGVuZ3RoID0gMjAwO1xuICAgIF8ubXNnU2hvcnRlbiA9IG5ldyBfLm1zZ1Nob3J0ZW4wICh0YXJnZXRMZW5ndGgpO1xuXG4gICAgdmFyIHBhcmFtcyA9IF8ucGNoZWNrIChvcHRpb25zLCB7c2VjdXJlQ29ubmVjdGlvbjogZmFsc2UsXG4gICAgICAgIHZlcmJvc2U6IGZhbHNlfSk7XG5cbiAgICBfLnNlY3VyZUNvbm5lY3Rpb24gPSBwYXJhbXMuc2VjdXJlQ29ubmVjdGlvbjtcbiAgICBfLnZlcmJvc2UgPSBwYXJhbXMudmVyYm9zZTtcblxuICAgIGlmIChfLnZlcmJvc2UpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyAoJ3dzQ2xpZW50IHBhcmFtczogJyArIEpTT04uc3RyaW5naWZ5IChwYXJhbXMpICsgJ1xcbicpO1xuXG4gICAgfSAvLyBlbmQgaWYgKF8udmVyYm9zZSlcbiAgICBcbiAgICBfLnRzdENtZHMgPSAge3Bpbmc6IF8udHN0Q21kUGluZ1Jlc3B9O1xuICAgIF8uY2xpZW50ID0gY2xpZW50ID8gY2xpZW50IDogXy5yZXBvcnRNc2dPYjtcblxuICAgIHZhciB3c1ByZWZpeCA9IF8uc2VjdXJlQ29ubmVjdGlvbiA/ICd3c3MnIDogJ3dzJztcbiAgICB2YXIgd3NVcmwgPSB3c1ByZWZpeCArICc6Ly8nICsgXy5pcCArICc6JyArIF8ucG9ydDtcblxuICAgIF8ud3NTZXJ2ZXIgPSBuZXcgV2ViU29ja2V0ICh3c1VybCk7XG5cbiAgICBfLndzU2VydmVyLm9ubWVzc2FnZSA9IF8uZnJvbVNydnI7XG4gICAgXy53c1NlcnZlci5vbmNsb3NlID0gXy5tc2dDbG9zZTtcbiAgICBfLndzU2VydmVyLm9uZXJyb3IgPSBfLm1zZ0Vycm9yO1xuXG59OyAvLyBlbmQgXy5pbml0IFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRvQ21kID0gKHVNc2dPYikgPT4ge1xuXG4gICAgdmFyIGZyb21TcnZyID0gSlNPTi5zdHJpbmdpZnkgKHVNc2dPYik7XG4gICAgdmFyIGZyb21TcnZyU2hvcnQgPSBfLm1zZ1Nob3J0ZW4ubXNnU2hvcnRlbiAoZnJvbVNydnIpO1xuXG4gICAgaWYgKF8udmVyYm9zZSkge1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cgKCcgID09PiB3c0NsaWVudC5mcm9tU3J2cjogJyArIGZyb21TcnZyU2hvcnQpO1xuXG4gICAgfSAvLyBlbmQgaWYgKF8udmVyYm9zZSlcbiAgICBcbiAgICB1TXNnT2IgPSBBcnJheS5pc0FycmF5ICh1TXNnT2IpID8gdU1zZ09iIDogW3VNc2dPYl07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVNc2dPYi5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBtc2dPYiA9IHVNc2dPYiBbaV07XG5cbiAgICAgICAgdmFyIGNtZCA9IF8ua2V5MSAobXNnT2IpO1xuICAgIFxuICAgICAgICBpZiAoXy50c3RDbWRzLmhhc093blByb3BlcnR5IChjbWQpKSB7XG4gICAgXG4gICAgICAgICAgICBfLnRzdENtZHMgW2NtZF0gKG1zZ09iIFtjbWRdKTtcbiAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgIF8uY2xpZW50IChtc2dPYik7XG4gICAgXG4gICAgICAgIH0gLy8gZW5kIGlmIChfLnRzdENtZHMuaGFzT3duUHJvcGVydHkgKGNtZCkpXG4gICAgXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCB1TXNnT2IubGVuZ3RoOyBpKyspXG5cbn07IC8vIGVuZCBfLmRvQ21kIFxuXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZG9TZW5kID0gKG1zZykgPT4ge1xuXG4gICAgaWYgKF8udmVyYm9zZSkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nICgnXy5kb1NlbmQubXNnOiAnICsgbXNnICsgJ1xcbicpO1xuXG4gICAgfSAvLyBlbmQgaWYgKF8udmVyYm9zZSlcbiAgICBcbiAgICBfLndzU2VydmVyLnNlbmQgKG1zZyk7XG5cbn07IC8vIGVuZCBfLmRvU2VuZCBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5mcm9tU3J2ciA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIHZhciB0aW1lID0gXy5taW5zZWMgKCk7XG4gICAgdmFyIG1zZyA9IGV2ZW50LmRhdGE7XG4gICAgdmFyIG1zZ20gPSBKU09OLnBhcnNlIChtc2cpO1xuICAgIHZhciBtc2dPYiA9IG1zZ20ubTtcbiAgICB2YXIgbXNnT2JTaG9ydCA9IF8ubXNnU2hvcnRlbi5tc2dTaG9ydGVuIChtc2dPYik7XG4gICAgICAgIGNvbnNvbGUubG9nICgnPD09PT0gJyArIHRpbWUgKyAnIHdzQ2xpZW50LmZyb21TcnZyOiAnICsgbXNnT2JTaG9ydCArICdcXG4nKTtcblxuICAgIF8uZG9DbWQgKG1zZ09iKTtcblxufTsgLy8gZW5kIF8uZnJvbVNydnIgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLm1zZ0Nsb3NlID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY29uc29sZS5sb2cgKCdjbG9zZSBldmVudDogJyArIGV2ZW50LmRhdGEpO1xuXG59OyAvLyBlbmQgXy5tc2dDbG9zZSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5tc2dFcnJvciA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIHZhciBldmVudE1zZyA9IGV2ZW50LmRhdGEgPyAnIGV2ZW50LmRhdGE6ICcgKyBldmVudC5kYXRhIDogXCJcIjtcbiAgICBcbiAgICB2YXIgZXJyTXNnID0gJ3dzQ2xpZW50IG1zZ0Vycm9yIChTZXJ2ZXIgaXMgRG93bj8pJyArIGV2ZW50TXNnO1xuICAgIGNvbnNvbGUubG9nIChlcnJNc2cpO1xuXG4gICAgJCgnYm9keScpLnByZXBlbmQgKGVyck1zZyk7XG5cbn07IC8vIGVuZCBfLm1zZ0Nsb3NlIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnJlcG9ydE1zZ09iID0gKG1zZ09iKSA9PiB7XG4gICAgXG4gICAgY29uc29sZS5sb2cgKCdfLnJlcG9ydE1zZ09iLm1zZ09iOiAnICsgbXNnT2IgKyAnXFxuJyk7XG5cbn07IC8vIGVuZCBfLnJlcG9ydE1zZ09iIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnRzdENtZFBpbmdSZXNwID0gKHBpbmdNc2cpID0+IHtcbiAgICBcbiAgICBjb25zb2xlLmxvZyAoJ3Bpbmc6ICcgKyBwaW5nTXNnKTtcbiAgICByZXR1cm47XG5cbn07IC8vIGVuZCBfLnRzdENtZFBpbmdSZXNwIFxuXG5fLmluaXQgKCk7XG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgcCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxucC50b1NydnIgPSAobXNnT2IpID0+IHtcbiAgICB2YXIgdGltZSA9IF8ubWluc2VjICgpO1xuICAgIHZhciBtc2dPYlNob3J0ID0gXy5tc2dTaG9ydGVuLm1zZ1Nob3J0ZW4gKG1zZ09iKTtcbiAgICBjb25zb2xlLmxvZyAoJ1xcblxcbj09PT0+ICcgKyB0aW1lICsgJyB3c0NsaWVudC50b1NydnI6ICcgKyBtc2dPYlNob3J0ICsgJ1xcbicpO1xuICAgIFxuICAgIHZhciBtc2dPYlMgPSBKU09OLnN0cmluZ2lmeSAoe206bXNnT2J9KTtcblxuICAgIGlmIChfLnZlcmJvc2UpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyAoJ3AudG9TcnZyLm1zZ09iUyA6ICcgKyBtc2dPYlMgKyAnXFxuJyk7XG5cbiAgICB9IC8vIGVuZCBpZiAoXy52ZXJib3NlKVxuICAgIFxuICAgIF8uZG9TZW5kIChtc2dPYlMpO1xuXG59OyAvLyBlbmQgXy50b1NydnIgXG5cblxucmV0dXJuIHA7XG5cbn07XG5cblxuXG4iLCIvLyBrZXkxLmpzXG5cbi8vIGtleTEgZXh0cmFjdHMgdGhlIHNpbmdsZSBrZXkgZnJvbSBhbiBvYmplY3QgXG4vLyBjb250YWluaW5nIG9ubHkgb25lIGtleS92YWx1ZSBwYWlyXG4vLyBhbmQgcmV0dXJucyB0aGUgc3RyaW5nIHZhbHVlIGZvciB0aGUga2V5XG4vLyBhbnl0aGluZyBlbHNlIHBhc3NlZCB0byBrZXkxIHJldHVybnMgbnVsbFxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG52YXIga2V5MSA9IChvYikgPT4ge1xuXG4gICAga2V5ID0gbnVsbDtcblxuICAgIHZhciB1bmlxdWVLZXlFeGlzdHMgPSB0eXBlb2Ygb2IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9iICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KG9iKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2IgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iKS5sZW5ndGggPT09IDE7XG4gICAgXG4gICAgaWYgKHVuaXF1ZUtleUV4aXN0cykge1xuICAgIFxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iKTtcbiAgICAgICAga2V5ID0ga2V5c1swXTtcbiAgICBcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSkge1xuXG4gICAgICAgIHZhciBvYjAgPSBvYiBbMF07XG4gICAgICAgIHZhciB1bmlxdWVBcnJheUtleUV4aXN0cyA9IHR5cGVvZiBvYjAgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iMCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2IwICE9PSAnb2JqZWN0JztcblxuICAgICAgICBpZiAodW5pcXVlQXJyYXlLZXlFeGlzdHMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAga2V5ID0gb2IwO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmICh1bmlxdWVBcnJheUtleUV4aXN0cylcblxuXG4gICAgfSAvLyBlbmQgaWYgKHVuaXF1ZUtleUV4aXN0cylcbiAgICBcbiAgICByZXR1cm4ga2V5O1xuICAgIFxufTsgLy8gZW5kIGtleTEgXG5cbnJldHVybiBrZXkxO1xuXG59KCkpO1xuIiwiLy8gaW5kZXguanMgPT4gbWluc2VjXG5cbi8vIGdldCBtaW51dGVzOnNlY29uZHMubWlsbGlzZWNvbmRzXG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xufTsgIC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxuXy5pbml0ID0gKCkgPT4ge1xufTtcblxuICAgIC8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmdldE1pblNlYyA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgZHQgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBzdFN0ciA9IGR0LnRvSlNPTiAoKTtcblxuICAgIHZhciBtYXRjaGVkID0gc3RTdHIubWF0Y2ggKC8uKj86KC4qKVovKTtcblxuICAgIHZhciByZXMgPSBtYXRjaGVkIFsxXTtcbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5nZXRNaW5TZWNcblxuXG5cbiAgICAvLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuXy5pbml0ICgpO1xuXG5yZXR1cm4gUDtcblxufSgpKTtcblxuXG5cblxuXG5cbiIsIi8vIGluZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldExlbmd0aCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuXG4gICAgdGFyZ2V0TGVuZ3RoOiB0YXJnZXRMZW5ndGggPyB0YXJnZXRMZW5ndGggOiBudWxsLFxuXG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG5fLmluaXQgPSAoKSA9PiB7XG59O1xuXG4gICAgLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAubXNnU2hvcnRlbiA9IChtc2dPYikgPT4ge1xuICAgIFxuICAgIHZhciBtc2dPYlN0ciA9IEpTT04uc3RyaW5naWZ5IChtc2dPYik7XG4gICAgaWYgKG1zZ09iU3RyLmxlbmd0aCA+IF8udGFyZ2V0TGVuZ3RoKSB7XG5cbiAgICAgICAgdmFyIGhhbGZMZW5ndGggPSBNYXRoLmNlaWwgKF8udGFyZ2V0TGVuZ3RoIC8gMik7XG5cbiAgICAgICAgdmFyIGZpcnN0SGFsZiA9IG1zZ09iU3RyLnN1YnN0ciAoMCwgaGFsZkxlbmd0aCk7XG4gICAgICAgIHZhciBzZWNvbmRIYWxmID0gbXNnT2JTdHIuc3Vic3RyIChtc2dPYlN0ci5sZW5ndGggLSBoYWxmTGVuZ3RoLCBoYWxmTGVuZ3RoKVxuXG4gICAgICAgIG1zZ09iU3RyID0gZmlyc3RIYWxmICsgJyAgPD09Xl58Xl49PT4gICcgKyBzZWNvbmRIYWxmO1xuXG4gICAgfSAvLyBlbmQgaWYgKG1zZ09iU3RyLmxlbmd0aCA+IF8udGFyZ2V0TGVuZ3RoKVxuICAgIFxuXG4gICAgcmV0dXJuIG1zZ09iU3RyO1xuXG59OyAvLyBlbmQgUC5tc2dTaG9ydGVuIFxuXG5cbiAgICAvLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuXy5pbml0ICgpO1xuXG5yZXR1cm4gUDtcblxufTtcblxuXG5cbiJdfQ==
