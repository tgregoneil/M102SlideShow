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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NyYy9ub2RlX21vZHVsZXNfZ2xvYmFsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXgwLmpzIiwic2xpZGVTaG93LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLWpzb24yaHRtbC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby1rZXkvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tcG9waW5mby9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby11dGlsL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLXdzLWNsaWVudC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9rZXkxL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3R6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLy8gY21kckluaXQuanNcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIF8gPSB7XG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG5cbl8uaW5pdCA9ICgpID0+IHtcblxuICAgIHZhciBjID0gcmVxdWlyZSAoJy4vc2xpZGVTaG93LmpzJyk7XG4gICAgbmV3IGMgKCk7XG59O1xuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuKGZ1bmN0aW9uICgpIHtcblxuICAgICQoZG9jdW1lbnQpLnJlYWR5IChfLmluaXQpO1xuXG59KSAoKTtcblxuXG5cbnJldHVybiBQO1xuXG59KSAoKTtcblxuXG5cblxuXG4iLCIvLyBzbGlkZVNob3cuanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgXyA9IHtcblxuICAgIHdzOiByZXF1aXJlICgnZ28td3MtY2xpZW50JyksXG4gICAga2V5OiByZXF1aXJlICgnZ28ta2V5JyksXG4gICAgajJoOiByZXF1aXJlICgnZ28tanNvbjJodG1sJyksXG4gICAgcGk6IHJlcXVpcmUgKCdnby1wb3BpbmZvJyksXG4gICAga2V5MTogcmVxdWlyZSAoJ2tleTEnKSxcblxuICAgIGRwcDogbnVsbCxcbiAgICBjdXJWaXM6IG51bGwsXG4gICAgbWF4SW1hZ2VzOiBudWxsLFxuICAgIElkU2xpZGVzOiBudWxsLFxuXG4gICAgYm9va21hcmtzOiBudWxsLFxuICAgIGJvb2ttYXJrTHN0OiBudWxsLFxuICAgIElkQm9va21hcms6IG51bGwsXG4gICAgSWRCb29rbWFya1M6IG51bGwsXG4gICAgSWREZWxCOiBudWxsLFxuICAgIElkQWRkQjogbnVsbCxcbiAgICBJZEJvb2tTOiBudWxsLFxuXG4gICAgY3RJOiBudWxsLFxuICAgIHRvcGljc0k6IG51bGwsXG4gICAgdG9waWNSZWZzOiBudWxsLFxuICAgIHRvcGljUmVmOiBudWxsLFxuICAgIElkTmF2OiBudWxsLFxuICAgIElkUGFnZUN0OiBudWxsLFxuICAgIElkTmF2UE46IG51bGwsXG4gICAgdG9waWNUb1ZpZGVvOiBudWxsLFxuICAgIHNsaWRlVG9WaWRlbzogbnVsbCxcbiAgICBoaWRkZW5TbGlkZTogbnVsbCxcbiAgICBJZFZpZGVvUGxheWluZzogbnVsbCxcbiAgICBzcnZBd3M6ICc1Mi4zMy4xNzAuMjEnXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxuXy5pbml0ID0gKCkgPT4ge1xuXG4gICAgXy5kcHAgPSBfLmoyaC5kaXNwbGF5UGFnZTtcbiAgICBfLmdlbklkID0gXy5qMmguZ2VuSWQ7XG5cbiAgICBfLnBpID0gbmV3IF8ucGkgKF8uajJoKTtcblxuICAgIHZhciAgZ3QgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgIHZhciBpcFNyYyA9IGd0Lm1hdGNoICgvZ2l0aHViLykgPyBfLnNydkF3cyA6ICdsb2NhbGhvc3QnO1xuICAgIF8ud3MgPSBuZXcgXy53cyAoaXBTcmMsIDgwMDEsIFAuZG9BY3Rpb24pO1xuXG4gICAgbmV3IF8ua2V5ICgnYm9keScsIGZhbHNlLCBfLmtleUZpbHRlcik7XG59O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5pbml0Qm9va21hcmtzID0gKCkgPT4ge1xuXG4gICAgXy5ib29rbWFya0xzdCA9IFtdO1xuICAgIF8uYm9va21hcmtzRnJvbUNvb2tpZSAoKTtcblxuICAgIHZhciBpZCA9IF8uZ2VuSWQgKCk7XG4gICAgdmFyIGFkZEIgPSB7c3BhbjogJ2FkZCBib29rbWFyaycsIGlkOiBpZCwgY2xhc3M6ICdib29rbWFyayd9O1xuICAgIF8uSWRBZGRCID0gJyMnICsgaWQ7XG5cbiAgICB2YXIgaWQgPSBfLmdlbklkICgpO1xuICAgIHZhciBkZWxCID0ge3NwYW46ICdkZWwgYm9va21hcmsnLCBpZDogaWQsIGNsYXNzOiAnYm9va21hcmsnfTtcbiAgICBfLklkRGVsQiA9ICcjJyArIGlkO1xuXG4gICAgdmFyIGlkID0gXy5nZW5JZCAoKTtcbiAgICB2YXIgYm9va1MgPSB7ZGl2OiAwLCBpZDogaWR9O1xuICAgIF8uSWRCb29rUyA9ICcjJyArIGlkO1xuXG4gICAgXy5JZEJvb2ttYXJrUyA9IF8uZHBwICh7ZGl2OiBbYWRkQiwgZGVsQiwgYm9va1NdLCBjbGFzczogJ2Jvb2ttYXJrcyBub3ZpcycsIHBhcmVudDogXy5JZEJvb2ttYXJrfSk7XG5cbiAgICAkKF8uSWRBZGRCICsgJywnICsgXy5JZERlbEIpXG4gICAgLmhvdmVyIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAncmVkJ30pO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdibGFjayd9KTtcbiAgICB9KTtcblxuICAgICQoXy5JZEFkZEIpXG4gICAgLmNsaWNrIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF8uYm9va21hcmtzIFtfLmN1clZpc10gPSAxO1xuICAgICAgICBfLmJvb2ttYXJrc1RvQ29va2llICgpO1xuICAgICAgICBfLmJvb2ttYXJrc1Nob3cgKCk7XG4gICAgfSlcblxuICAgICQoXy5JZERlbEIpXG4gICAgLmNsaWNrIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlbGV0ZSBfLmJvb2ttYXJrcyBbXy5jdXJWaXNdO1xuICAgICAgICBfLmJvb2ttYXJrc1RvQ29va2llICgpO1xuICAgICAgICBfLmJvb2ttYXJrc1Nob3cgKCk7XG4gICAgfSlcblxufTsgLy8gZW5kIF8uaW5pdEJvb2ttYXJrc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmluaXRTdHlsZSA9ICgpID0+IHtcblxuICAgIHZhciBzdHlsZSA9IHtzdHlsZTpcbiAgICAgICAgXCJib2R5IHtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1sZWZ0OiAxNXB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5ib29rbWFyayB7XCIgK1xuICAgICAgICAgICAgXCJ3aGl0ZS1zcGFjZTogbm93cmFwO1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAxMnB4O1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luOiAwO1wiICtcbiAgICAgICAgICAgIFwicGFkZGluZzogMDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuYm9va21hcmtzIHtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6ICNFNUZGRjI7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXI6IDFweCBzb2xpZCAjQjNCM0ZGO1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyLXJhZGl1czogM3B4O1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IGFic29sdXRlO1wiICtcbiAgICAgICAgICAgIFwiei1pbmRleDogMTtcIiArXG4gICAgICAgICAgICBcInRvcDogMnB4O1wiICtcbiAgICAgICAgICAgIFwicmlnaHQ6IDJweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuYm9va21hcmtoZWFkZXIge1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zdHlsZTogaXRhbGljO1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IDIwMDtcIiArXG4gICAgICAgICAgICBcInRleHQtYWxpZ246IGNlbnRlcjtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuY2FwdGlvbiB7XCIgK1xuICAgICAgICAgICAgXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMjBweDsgXCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogYWJzb2x1dGU7IFwiICtcbiAgICAgICAgICAgIFwiYm90dG9tOiA1MHB4OyBcIiArXG4gICAgICAgICAgICBcInRleHQtYWxpZ246IGNlbnRlcjtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiICtcbiAgICAgICAgICAgIFwibWF4LXdpZHRoOiA1MDBweDtcIiArXG4gICAgICAgICAgICBcIndvcmQtYnJlYWs6IGJyZWFrLWFsbDtcIiArXG4gICAgICAgICAgICBcImxlZnQ6IDA7XCIgK1xuICAgICAgICAgICAgXCJyaWdodDogMDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMCBhdXRvO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5zeW1ib2x3cmFwIHtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiAxNnB4O1wiICtcbiAgICAgICAgICAgIFwiaGVpZ2h0OiAxNnB4O1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAxNXB4O1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXItcmFkaXVzOiA4cHg7XCIgK1xuICAgICAgICAgICAgXCJmbG9hdDogcmlnaHQ7XCIgK1xuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiAjMGUwO1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IHBvaW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IGhhbmQ7XCIgK1xuICAgICAgICAgICAgXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnN5bWJvbCB7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgK1xuICAgICAgICAgICAgXCJ0b3A6IC0xcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmhlYWRlciB7XCIgK1xuICAgICAgICAgICAgXCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLm0xMCB7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW46IDEwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnQ0MCB7XCIgK1xuICAgICAgICAgICAgXCJ0b3A6IC00MHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5wcmVsIHtcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiByZWxhdGl2ZTtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIudzcwMCB7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogNzAwcHg7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW46IDAgYXV0bztcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuaW1ndmlkZW8ge1wiICtcbiAgICAgICAgICAgIFwiaGVpZ2h0OiA1MDBweDtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiA3MDBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuaW1naG9tZXdvcmsge1wiICtcbiAgICAgICAgICAgIFwiaGVpZ2h0OiA4MDBweDtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiA3MDBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuY29scyB7XCIgK1xuICAgICAgICAgICAgXCJwYWRkaW5nLXJpZ2h0OiAwcHg7XCIgK1xuICAgICAgICAgICAgXCJwYWRkaW5nLWxlZnQ6IDEwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLm5vdmlzIHtcIiArXG4gICAgICAgICAgICBcImRpc3BsYXk6IG5vbmU7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLm5hdiB7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDMwcHg7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogOTAwO1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luLWxlZnQ6IDEwcHg7XCIgK1xuICAgICAgICAgICAgXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgK1xuICAgICAgICAgICAgXCJmbG9hdDogcmlnaHQ7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IHBvaW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IGhhbmQ7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLm5hdnBvcyB7XCIgK1xuICAgICAgICAgICAgXCJmbG9hdDogcmlnaHQ7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnZpZGVvIHtcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiICtcbiAgICAgICAgICAgIFwiY29sb3I6IGJsdWU7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tcmlnaHQ6IDMwcHg7XCIgK1xuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogcG9pbnRlcjtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogaGFuZDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIucmVmIHtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiBpbml0aWFsO1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAxMXB4O1wiICtcbiAgICAgICAgICAgIFwid29yZC1icmVhazogYnJlYWstYWxsO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi50b3BpY3Jvd3Mge1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbTogMjBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIucm93LnRvcGljcm93cyA+IGRpdiB7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXI6IDFweCBzb2xpZCAjY2NjO1wiICtcbiAgICAgICAgICAgIFwicGFkZGluZy1yaWdodDogMXB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5sb2NoZWFkZXIge1wiICtcbiAgICAgICAgICAgIFwiY29sb3I6IHJlZDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIud2VlayB7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgIFwifVwiLFxuICAgICAgICBwYXJlbnQ6ICdoZWFkJ307XG5cbiAgICAgICAgXy5kcHAgKHN0eWxlKTtcblxufTsgLy8gZW5kIF8uaW5pdFN0eWxlXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uYm9va21hcmtBZGQgPSAoc2xpZGUpID0+IHtcblxuICAgIHZhciBib29rbWFyayA9IF8uYm9va21hcmtMc3QgW3NsaWRlXS5yZXBsYWNlICgvLSguKilfLywgJyAgICAkMSAgICAnKTtcbiAgICB2YXIgSWQgPSBfLmRwcCAoe3ByZTogYm9va21hcmssIHBhcmVudDogXy5JZEJvb2tTLCBuYW1lOiBzbGlkZSwgY2xhc3M6ICdib29rbWFyayd9KVxuXG4gICAgJChJZClcbiAgICAuY2xpY2sgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG4gPSAkKHRoaXMpLmF0dHIgKCduYW1lJyk7XG4gICAgICAgIF8uc2V0TmV4dFZpcyAobiAtIF8uY3VyVmlzKTtcblxuICAgICAgICAkKF8uSWRCb29rbWFya1MpXG4gICAgICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG4gICAgfSlcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgIH0pO1xuXG5cbn07IC8vIGVuZCBfLmJvb2ttYXJrQWRkXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uYm9va21hcmtzU2hvdyA9ICgpID0+IHtcblxuICAgIGlmIChfLmJvb2ttYXJrcy5oYXNPd25Qcm9wZXJ0eSAoXy5jdXJWaXMpKSB7XG5cbiAgICAgICAgJChfLklkRGVsQilcbiAgICAgICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgICAgICAkKF8uSWRBZGRCKVxuICAgICAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICAkKF8uSWREZWxCKVxuICAgICAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgICAgICQoXy5JZEFkZEIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICB9IC8vIGVuZCBpZiAoXy5ib29rbWFya3MuaGFzT3duUHJvcGVydHkgKF8uY3VyVmlzKSlcblxuICAgICQoXy5JZEJvb2tTKVxuICAgIC5lbXB0eSAoKTtcblxuICAgIHZhciBzbGlkZXMgPSBPYmplY3Qua2V5cyAoXy5ib29rbWFya3MpLnNvcnQgKGZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgIH0pO1xuXG4gICAgaWYgKHNsaWRlcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgXy5kcHAgKHtkaXY6ICdXZWVrIFRvcGljIFNsaWRlTnVtJywgcGFyZW50OiBfLklkQm9va1MsIGNsYXNzOiAnYm9va21hcmsgYm9va21hcmtoZWFkZXInfSk7XG5cbiAgICB9IC8vIGVuZCBpZiAoc2xpZGVzLmxlbmd0aCA+IDApXG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgc2xpZGUgPSBzbGlkZXMgW2ldO1xuICAgICAgICBfLmJvb2ttYXJrQWRkIChzbGlkZSk7XG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlczsgaSsrKVxuXG4gICAgJChfLklkQm9va21hcmtTKVxuICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJylcbiAgICAgICAgLy8gYWN0dWFsbHkgc2hvdyB0aGUgYm9va21hcmtcblxuICAgIC5ob3ZlciAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBib29rbWFya3MgaW5pdGlhbGx5IHBvc2l0aW9uZWQgdW5kZXIgY3Vyc29yLCBzbyBub3RoaW5nIHRvIGRvIGZvciBob3Zlci1pblxuXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5hZGRDbGFzcyAoJ25vdmlzJylcbiAgICB9KVxuXG5cblxuXG59OyAvLyBlbmQgXy5ib29rbWFya3NTaG93XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uYm9va21hcmtzRnJvbUNvb2tpZSA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgYm9va21hcmtzU2ZpZWQgPSBkb2N1bWVudC5jb29raWUubWF0Y2ggKC9tMTAyYm9va21hcmtzPShbXjtdKykvKTtcblxuICAgIF8uYm9va21hcmtzID0gIWJvb2ttYXJrc1NmaWVkID8gIHt9IDogSlNPTi5wYXJzZSAoYm9va21hcmtzU2ZpZWQgWzFdKTtcblxufTsgLy8gZW5kIF8uYm9va21hcmtzRnJvbUNvb2tpZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmJvb2ttYXJrc1RvQ29va2llID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBjb29raWUgPSAnbTEwMmJvb2ttYXJrcz0nICsgSlNPTi5zdHJpbmdpZnkgKF8uYm9va21hcmtzKSArICc7IGV4cGlyZXM9VGh1LCAxIEphbiAyMDMwIDAwOjAwOjAwIFVUQzsgcGF0aD0vJztcbiAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWU7XG5cbn07IC8vIGVuZCBfLmJvb2ttYXJrczJDb29raWVcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kaXNwbGF5TmF2ID0gKCkgPT4ge1xuXG4gICAgdmFyIG5hdlNwYW5zID0gW3tzcGFuOiAnPicsIGlkOiAnbmF2cicsIGNsYXNzOiAnbmF2J30sXG4gICAge3NwYW46ICc8JywgaWQ6ICduYXZsJywgY2xhc3M6ICduYXYnfV07XG5cbiAgICBuYXZTcGFucy5wYXJlbnQgPSBfLklkTmF2UE47XG5cbiAgICBfLmRwcCAobmF2U3BhbnMpO1xuXG4gICAgJCgnI25hdmwsICNuYXZyJylcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgIH0pO1xuXG4gICAgJCgnI25hdmwnKVxuICAgIC5jbGljayAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF8uc2V0TmV4dFZpcyAoLTEpO1xuICAgIH0pO1xuXG4gICAgJCgnI25hdnInKVxuICAgIC5jbGljayAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF8uc2V0TmV4dFZpcyAoMSk7XG4gICAgfSk7XG5cblxufTsgLy8gZW5kIF8uZGlzcGxheU5hdlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmRpc3BsYXlQbmdGaWxlcyA9ICh2YWxzKSA9PiB7XG5cbiAgICBfLmN1clZpcyA9IDA7XG4gICAgXy5tYXhJbWFnZXMgPSB2YWxzLmxlbmd0aCAtIDE7XG4gICAgICAgIC8vIGxhc3QgdmFsIGluIHZhbHMgaXMgYW4gZW1wdHkgc3RyaW5nLCBzbyBkb24ndCBjb3VudCBpdFxuXG4gICAgdmFyIHdlZWtzID0ge307XG4gICAgdmFyIHRvcGljcztcblxuICAgIF8uY3RJID0gW107XG4gICAgXy50b3BpY3NJID0gW107XG4gICAgXy50b3BpY1JlZnMgPSBbXTtcbiAgICBfLnNsaWRlVG9WaWRlbyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfLm1heEltYWdlczsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHZhbCA9IHZhbHMgW2ldO1xuXG4gICAgICAgIHZhciBtYXRjaGVkID0gdmFsLm1hdGNoICgvLi4uKC4qKVxcLy4qPyhbYS16QS1aXS4qKS5wbmcvKTtcbiAgICAgICAgdmFyIGxvYyA9IG1hdGNoZWQgWzFdO1xuICAgICAgICB2YXIgY2FwdGlvbiA9IG1hdGNoZWQgWzJdO1xuXG4gICAgICAgIHZhciBpbWdDbGFzcyA9IGxvYy5tYXRjaCAoL0hvbWV3b3JrfEZpbmFsLykgPyAnaW1naG9tZXdvcmsnIDogJ2ltZ3ZpZGVvJztcblxuICAgICAgICB2YXIgZGl2T2IgPSB7ZGl2OiBbXG4gICAgICAgICAgICB7aW1nOiAwLCBzcmM6IHZhbCwgY2xhc3M6IGltZ0NsYXNzLCBhbHQ6ICdpbWFnZSBpcyBzdGlsbCB1cGxvYWRpbmcgLi4uIGp1c3QgYSBtaW51dGUgb3IgdHdvIGxvbmdlciBkZXBlbmRpbmcgb24geW91ciBuZXR3b3JrIGJhbmR3aWR0aCd9LFxuICAgICAgICAgICAge2JyOjB9LFxuICAgICAgICAgICAge3NwYW46ICcgICAgJyArIGxvYywgY2xhc3M6ICdsb2NoZWFkZXInfSxcbiAgICAgICAgICAgIHticjowfSxcbiAgICAgICAgICAgIHticjowfSxcbiAgICAgICAgICAgIHtzcGFuOiBjYXB0aW9uLCBjbGFzczogJ2NhcHRpb24nfVxuICAgICAgICBdLCBpZDogJ2onICsgaX07XG5cbiAgICAgICAgaWYgKGkgIT09IDApIHtcblxuICAgICAgICAgICAgZGl2T2IuY2xhc3MgPSAnbm92aXMnO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChpICE9PT0gMClcblxuICAgICAgICBkaXZPYi5wYXJlbnQgPSBfLklkU2xpZGVzO1xuICAgICAgICBfLmRwcCAoZGl2T2IpO1xuXG4gICAgICAgIG1hdGNoZWQgPSBsb2MubWF0Y2ggKC9XKFxcZCkoLio/KVxcLyguKikvKTtcblxuICAgICAgICB2YXIgd2lkID0gJ1cnICsgbWF0Y2hlZCBbMV07XG4gICAgICAgIHZhciB3ZWVrID0gd2lkICsgbWF0Y2hlZCBbMl07XG4gICAgICAgIHZhciB0b3BpYyA9IG1hdGNoZWQgWzNdO1xuXG4gICAgICAgIHZhciB2aWRlb1RvcGljID0gd2lkICsgJy0nICsgdG9waWM7XG4gICAgICAgIF8uc2xpZGVUb1ZpZGVvLnB1c2ggKF8udG9waWNUb1ZpZGVvIFt2aWRlb1RvcGljXSk7XG5cbiAgICAgICAgaWYgKCF3ZWVrcy5oYXNPd25Qcm9wZXJ0eSAod2VlaykpIHtcblxuICAgICAgICAgICAgXy5kaXNwbGF5UmVmICh3aWQsIHdlZWssIGksICd3ZWVrJyk7XG4gICAgICAgICAgICB3ZWVrcyBbd2Vla10gPSAxO1xuICAgICAgICAgICAgdG9waWNzID0ge307XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKCF3ZWVrcy5oYXNPd25Qcm9wZXJ0eSAod2VlaykpXG5cbiAgICAgICAgdmFyIHNsaWRlQ291bnQ7XG4gICAgICAgIGlmICghdG9waWNzLmhhc093blByb3BlcnR5ICh0b3BpYykpIHtcblxuICAgICAgICAgICAgdmFyIGRpc3BSZWYgPSBfLmRpc3BsYXlSZWYgKHdpZCwgdG9waWMsIGksICd0b3BpYycpO1xuICAgICAgICAgICAgXy50b3BpY1JlZnMucHVzaCAoZGlzcFJlZik7XG5cbiAgICAgICAgICAgIGlmICh0b3BpYyA9PT0gJzA1X1N0b3JhZ2VFbmdpbmVXaXJlZFRpZ2VyJykge1xuXG4gICAgICAgICAgICAgICAgXy5JZFNhbXBsZVRvcGljID0gZGlzcFJlZjtcblxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKHRvcGljID09PSAnMDFfV2VsY29tZVdlZWszJylcblxuICAgICAgICAgICAgdG9waWNzIFt0b3BpY10gPSAxO1xuXG4gICAgICAgICAgICBzbGlkZUNvdW50ID0gMTtcbiAgICAgICAgICAgIF8udG9waWNzSS5wdXNoIChzbGlkZUNvdW50KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBzbGlkZUNvdW50Kys7XG4gICAgICAgICAgICBfLnRvcGljc0kgW18udG9waWNzSS5sZW5ndGggLSAxXSA9IHNsaWRlQ291bnQ7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKCF0b3BpY3MuaGFzT3duUHJvcGVydHkgKHRvcGljKSlcblxuICAgICAgICB2YXIgYm9va21hcmtOYW1lID0gdmlkZW9Ub3BpYyArICdfJyArIHNsaWRlQ291bnQ7O1xuICAgICAgICBfLmJvb2ttYXJrTHN0LnB1c2ggKGJvb2ttYXJrTmFtZSk7XG5cbiAgICAgICAgXy5jdEkucHVzaCAoW3NsaWRlQ291bnQsIF8udG9waWNzSS5sZW5ndGggLSAxXSk7XG5cblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsczsgaSsrKVxuXG4gICAgXy5zZXROZXh0VmlzICgwKTtcblxufTsgLy8gZW5kIF8uZGlzcGxheVBuZ0ZpbGVzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZGlzcGxheVJlZiA9ICh3aWQsIHN0ciwgaSwgY2xhc3NOYW1lKSA9PiB7XG5cbiAgICB3aWQgPSAnIycgKyB3aWQ7XG4gICAgdmFyIHJlZiA9IF8uZ2VuSWQgKCk7XG4gICAgXy5kcHAgKHtkaXY6XG4gICAgICAgIHtkaXY6IHN0cixcbiAgICAgICAgIGlkOiByZWYsXG4gICAgICAgICBzbDogaSxcbiAgICAgICAgIHN0eWxlOiAnZGlzcGxheTppbmxpbmUtYmxvY2s7IGN1cnNvcjogcG9pbnRlcjsgY3Vyc29yOiBoYW5kOydcbiAgICAgfSwgcGFyZW50OiB3aWQsIGNsYXNzOiAncmVmIHc3MDAgJyArIGNsYXNzTmFtZX0pO1xuXG4gICAgcmVmID0gJyMnICsgcmVmO1xuICAgICQocmVmKVxuICAgIC5jbGljayAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbiA9ICQodGhpcykuYXR0ciAoJ3NsJyk7XG4gICAgICAgIF8uc2V0TmV4dFZpcyAobiAtIF8uY3VyVmlzKTtcbiAgICB9KVxuXG4gICAgJChyZWYpXG4gICAgLmhvdmVyIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAncmVkJ30pXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIElkID0gJyMnICsgZXZlbnQudGFyZ2V0LmlkO1xuXG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdibGFjayd9KVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIHJldHVybiByZWY7XG5cbn07IC8vIGVuZCBfLmRpc3BsYXlSZWZcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kb1NsaWRlU2hvdyA9ICh2YWxzKSA9PiB7XG5cbiAgICBfLmxheW91dCAoKTtcbiAgICBfLmRpc3BsYXlOYXYgKCk7XG4gICAgXy5kaXNwbGF5UG5nRmlsZXMgKHZhbHMpO1xuXG4gICAgJChfLklkVmlkZW8pXG4gICAgLmhvdmVyIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmF0dHIgKHtzdHlsZTogJ2NvbG9yOiByZWQ7J30pXG4gICAgfSxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmF0dHIgKHtzdHlsZTogJ2NvbG9yOiBibHVlJ30pXG4gICAgfSlcbiAgICAuY2xpY2sgKF8ucGxheVZpZGVvKTtcblxuICAgIF8ucGkuY3JlYXRlUG9wdXBEaXNwbGF5ICgnI25hdnInLFxuICAgICAgICAnQ2xpY2sgUHJldi9OZXh0IFNsaWRlXFxuICAgIC0tIG9yIC0tXFxuKGtleWJvYXJkIHNob3J0Y3V0cylcXG5MZWZ0L1JpZ2h0IEFycm93XFxuU3BhY2UvQmFja3NwYWNlJyk7XG4gICAgXy5waS5jcmVhdGVQb3B1cERpc3BsYXkgKF8uSWRTYW1wbGVUb3BpYyxcbiAgICAgICAgJ0NsaWNrIHRvIG5hdmlnYXRlIGRpcmVjdGx5XFxudG8gYmVnaW5uaW5nIG9mIHRvcGljJyk7XG4gICAgXy5waS5jcmVhdGVQb3B1cERpc3BsYXkgKF8uSWRDdXJTbGlkZSxcbiAgICAgICAgJ0N1cnJlbnQgc2xpZGUgSW4gdG9waWMvXFxuVG90YWwgc2xpZGVzIGluIHRvcGljJyk7XG4gICAgXy5waS5jcmVhdGVQb3B1cERpc3BsYXkgKF8uSWRWaWRlbyxcbiAgICAgICAgJ0NsaWNrIHRvIHN0YXJ0XFxucGxheWluZyBsZXNzb24gdmlkZW8nKTtcblxuICAgICQoXy5JZEhlbHApXG4gICAgLmhvdmVyIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmNzcyAoeydiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZmEwYTAnfSk7XG5cbiAgICAgICAgXy5waS5zaG93UG9wdXBzICgpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnIzBlMCd9KTtcblxuICAgICAgICBfLnBpLmhpZGVQb3B1cHMgKCk7XG4gICAgfSk7XG5cbiAgICAkKF8uSWRCb29rbWFyaylcbiAgICAuaG92ZXIgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnI2ZmYTBhMCd9KTtcbiAgICAgICAgXy5ib29rbWFya3NTaG93ICgpO1xuXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5jc3MgKHsnYmFja2dyb3VuZC1jb2xvcic6ICcjMGUwJ30pO1xuXG4gICAgfSk7XG5cbn07IC8vIGVuZCBfLmRvU2xpZGVTaG93XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmtleUZpbHRlciA9IChjaG9iKSA9PiB7XG4gICAgLy9jb25zb2xlLmxvZyAoJ2Nob2I6ICcgKyBKU09OLnN0cmluZ2lmeSAoY2hvYikgKyAnXFxuJyk7XG5cbiAgICB2YXIgY2ggPSBjaG9iLmNoO1xuICAgIGlmIChjaCA9PT0gJ1JpZ2h0JyB8fCBjaCA9PT0gJyAnKSB7XG5cbiAgICAgICAgXy5zZXROZXh0VmlzICgxKTtcblxuICAgIH0gZWxzZSBpZiAoY2ggPT09ICdMZWZ0JyB8fCBjaCA9PT0gJ0JhY2tzcGFjZScpIHtcblxuICAgICAgICBfLnNldE5leHRWaXMgKC0xKTtcblxuICAgIH0gLy8gZW5kIGlmIChjaG9iLmNoID09PSAnUmlnaHQnKVxuXG5cbn07IC8vIGVuZCBfLmtleUZpbHRlclxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmxheW91dCA9ICgpID0+IHtcblxuICAgIHZhciBJZENvbnRhaW5lciA9IF8uZHBwICh7ZGl2OiAwLCBjbGFzczogJ3c3MDAgbTEwJ30pO1xuXG4gICAgdmFyIGlkQm9va21hcmsgPSBfLmdlbklkICgpO1xuXG4gICAgdmFyIGlkSGVscCA9IF8uZ2VuSWQgKCk7XG4gICAgXy5kcHAgKHtkaXY6XG4gICAgICAgIHtoNDogW1xuICAgICAgICAgICAgJ1NsaWRlc2hvdyBNMTAyOiBNb25nb0RCIGZvciBEQkFzIChKYW4vRmViIDIwMTcpJyxcbiAgICAgICAgICAgIHtkaXY6IHtzcGFuOiAnPycsIGNsYXNzOiAnc3ltYm9sJ30sIGlkOiBpZEhlbHAsIGNsYXNzOiAnc3ltYm9sd3JhcCd9LFxuICAgICAgICAgICAge2Rpdjoge3NwYW46ICdCJywgY2xhc3M6ICdzeW1ib2wnfSwgaWQ6IGlkQm9va21hcmssIGNsYXNzOiAnc3ltYm9sd3JhcCcsIHN0eWxlOiAnbWFyZ2luLXJpZ2h0OiAxMHB4Oyd9XG4gICAgICAgIF0sIGNsYXNzOiAnaGVhZGVyJ30sXG4gICAgICAgIGNsYXNzOiAncm93IHc3MDAnLFxuICAgICAgICBwYXJlbnQ6IElkQ29udGFpbmVyfVxuICAgICk7XG5cbiAgICBfLklkQm9va21hcmsgPSAnIycgKyBpZEJvb2ttYXJrO1xuICAgIF8uaW5pdEJvb2ttYXJrcyAoKTtcblxuICAgIF8uSWRIZWxwID0gJyMnICsgaWRIZWxwO1xuXG4gICAgXy5JZFNsaWRlcyA9IF8uZHBwICh7ZGl2OiAwLCBuYW1lOiAnc2xpZGVzJywgY2xhc3M6ICdyb3cgdzcwMCBwcmVsJywgcGFyZW50OiBJZENvbnRhaW5lcn0pO1xuXG4gICAgdmFyIElkTmF2ID0gXy5kcHAgKHtkaXY6MCwgbmFtZTogJ25hdicsIGNsYXNzOiAncm93IHc3MDAgcHJlbCB0NDAnLCBwYXJlbnQ6IElkQ29udGFpbmVyfSk7XG5cbiAgICB2YXIgSWRWaWRlb0RpdiA9IF8uZHBwICh7ZGl2OjAsIGNsYXNzOiAnY29sLXNtLTcnLCBwYXJlbnQ6IElkTmF2fSk7XG4gICAgXy5JZFZpZGVvID0gXy5kcHAgKHtzcGFuOiAnVmlkZW8nLCBwYXJlbnQ6IElkVmlkZW9EaXYsIGNsYXNzOiAnbmF2cG9zIHZpZGVvJ30pO1xuXG4gICAgXy5JZFBhZ2VDdCA9IF8uZHBwICh7ZGl2OjAsIGNsYXNzOiAnY29sLXNtLTInLCBwYXJlbnQ6IElkTmF2fSk7XG5cbiAgICBfLklkTmF2UE4gPSBfLmRwcCAoe2RpdjowLCBjbGFzczogJ2NvbC1zbS0zJywgcGFyZW50OiBJZE5hdn0pO1xuXG4gICAgdmFyIElkVG9waWNSb3dzID0gXy5kcHAgKHtkaXY6MCwgbmFtZTogJ3RvcGljUm93cycsIHBhcmVudDogSWRDb250YWluZXIsIGNsYXNzOiAndzcwMCBwcmVsIHQ0MCd9KTtcblxuICAgIHZhciBJZFJvdzEgPSBfLmRwcCAoe2RpdjogMCwgbmFtZTogJ3RvcGljUm93czEnLCBjbGFzczogJ3JvdyB0b3BpY3Jvd3MnLCBwYXJlbnQ6IElkVG9waWNSb3dzfSlcbiAgICB2YXIgSWRSb3cyID0gXy5kcHAgKHtkaXY6IDAsIG5hbWU6ICd0b3BpY1Jvd3MyJywgY2xhc3M6ICdyb3cgdG9waWNyb3dzJywgcGFyZW50OiBJZFRvcGljUm93c30pXG5cbiAgICBfLm1ha2VDb2xzICgwLCBJZFJvdzEsIDQpO1xuICAgIF8ubWFrZUNvbHMgKDQsIElkUm93MiwgMyk7XG5cbn07IC8vIGVuZCBfLmxheW91dFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLm1ha2VDb2xzID0gKGJhc2VJZCwgSWRSb3csIG51bUNvbHMpID0+IHtcblxuICAgIHZhciBjb2xzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1Db2xzOyBpKyspIHtcblxuICAgICAgICB2YXIgaWQgPSAnVycgKyAoaSArIDEgKyBiYXNlSWQpO1xuICAgICAgICBjb2xzLnB1c2ggKHtkaXY6IDAsIGlkOiBpZCwgY2xhc3M6ICdjb2xzIGNvbC1zbS0zJywgcGFyZW50OiBJZFJvd30pO1xuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspXG5cbiAgICBfLmRwcCAoY29scyk7XG5cbn07IC8vIGVuZCBfLm1ha2VDb2xzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8ucGxheVZpZGVvID0gKCkgPT4ge1xuXG4gICAgXy5oaWRkZW5TbGlkZSA9ICcjaicgKyBfLmN1clZpcztcblxuICAgICQoXy5oaWRkZW5TbGlkZSArICc+IGltZycpXG4gICAgLmFkZENsYXNzICgnbm92aXMnKTtcblxuICAgICQoXy5oaWRkZW5TbGlkZSArICc+IC5jYXB0aW9uJylcbiAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJChfLklkVmlkZW8pXG4gICAgLnRleHQgKCdTbGlkZScpXG4gICAgLm9mZiAoJ2NsaWNrJylcbiAgICAuY2xpY2sgKF8ucmVzdG9yZVNsaWRlKTtcblxuICAgIHZhciBzcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJyArIF8uc2xpZGVUb1ZpZGVvIFtfLmN1clZpc10gKyAnP2F1dG9wbGF5PTEnO1xuICAgIF8uSWRWaWRlb1BsYXlpbmcgPSBfLmRwcCAoe2lmcmFtZTogMCwgc3JjOiBzcmMsIGNsYXNzOiAnaW1ndmlkZW8nLCBwYXJlbnQ6IF8uaGlkZGVuU2xpZGUsIHByZXBlbmQ6IDF9KTtcblxufTsgLy8gZW5kIF8ucGxheVZpZGVvXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8ucmVzdG9yZVNsaWRlID0gKCkgPT4ge1xuXG4gICAgJChfLklkVmlkZW9QbGF5aW5nKVxuICAgIC5yZW1vdmUgKCk7XG5cbiAgICAkKF8uaGlkZGVuU2xpZGUgKyAnPiBpbWcnKVxuICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKF8uaGlkZGVuU2xpZGUgKyAnPiAuY2FwdGlvbicpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgICQoXy5JZFZpZGVvKVxuICAgIC50ZXh0ICgnVmlkZW8nKVxuICAgIC5vZmYgKCdjbGljaycpXG4gICAgLmNsaWNrIChfLnBsYXlWaWRlbyk7XG5cbiAgICBfLmhpZGRlblNsaWRlID0gbnVsbDtcblxufTsgLy8gZW5kIF8ucmVzdG9yZVNsaWRlXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnNldE5leHRWaXMgPSAoZGVsdGEpID0+IHtcblxuICAgIGlmIChfLmhpZGRlblNsaWRlKSB7XG5cbiAgICAgICAgXy5yZXN0b3JlU2xpZGUgKCk7XG5cbiAgICB9IC8vIGVuZCBpZiAoXy5oaWRkZW5TbGlkZSlcblxuICAgIHZhciBtZGVsdGEgPSBkZWx0YSA+PSAwID8gZGVsdGEgOiBfLm1heEltYWdlcyArIGRlbHRhXG5cbiAgICB2YXIgbmV4dFZpcyA9IChfLmN1clZpcyArIG1kZWx0YSkgJSBfLm1heEltYWdlcztcblxuICAgIHZhciBJZFByZXYgPSAnI2onICsgXy5jdXJWaXM7XG4gICAgdmFyIElkTmV4dCA9ICcjaicgKyBuZXh0VmlzO1xuXG4gICAgJChJZFByZXYpXG4gICAgLmFkZENsYXNzICgnbm92aXMnKTtcblxuICAgICQoSWROZXh0KVxuICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICBfLmN1clZpcyA9IG5leHRWaXM7XG5cbiAgICB2YXIgY3RSZWYgPSBfLmN0SSBbbmV4dFZpc107XG5cbiAgICB2YXIgc2xpZGVJID0gY3RSZWYgWzBdO1xuICAgIHZhciB0b3BpY0lkeCA9IGN0UmVmIFsxXTtcbiAgICB2YXIgdG90YWxJblNlY3Rpb24gPSBfLnRvcGljc0kgW3RvcGljSWR4XTtcblxuICAgIF8uZHBwICh7ZW1wdHk6IF8uSWRQYWdlQ3R9KTtcbiAgICBfLklkQ3VyU2xpZGUgPSBfLmRwcCAoe3NwYW46ICdzbGlkZTogJyArIHNsaWRlSSArICcvJyArIHRvdGFsSW5TZWN0aW9uLFxuICAgICAgICBwYXJlbnQ6IF8uSWRQYWdlQ3QsXG4gICAgICAgIGNsYXNzOiAnbmF2cG9zJ30pO1xuXG4gICAgJChfLnRvcGljUmVmKVxuICAgIC5jc3MgKFxuICAgICAgICB7J2JhY2tncm91bmQtY29sb3InOiAnI2ZmZicsXG4gICAgICAgICdmb250LXdlaWdodCc6ICdub3JtYWwnfVxuICAgICk7XG5cbiAgICBfLnRvcGljUmVmID0gXy50b3BpY1JlZnMgW3RvcGljSWR4XTtcblxuICAgICQoXy50b3BpY1JlZilcbiAgICAuY3NzIChcbiAgICAgICAgeydiYWNrZ3JvdW5kLWNvbG9yJzogJyNkNmZmZDYnLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiAnYm9sZCd9XG4gICAgKTtcblxufTsgLy8gZW5kIF8uc2V0TmV4dFZpc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnRvcGljVG9WaWRlb0lkID0gKGFUYWdBKSA9PiB7XG5cbiAgICBfLnRvcGljVG9WaWRlbyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYVRhZ0EubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgYVRhZyA9IGFUYWdBIFtpXTtcbiAgICAgICAgdmFyIG0gPSBhVGFnLm1hdGNoICgvLip5b3V0dS5iZS4oW15cIl0rKVwiPihbXjxdKyk8Lyk7XG4gICAgICAgIGlmIChtKSB7XG5cbiAgICAgICAgICAgIHZhciB2aWRlb0lkID0gbSBbMV07XG4gICAgICAgICAgICB2YXIgdG9waWMgPSBtIFsyXTtcblxuICAgICAgICAgICAgXy50b3BpY1RvVmlkZW8gW3RvcGljXSA9IHZpZGVvSWQ7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKG0pXG5cblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgYVRhZ0E7IGkrKylcblxuXG59OyAvLyBlbmQgXy50b3BpY1RvVmlkZW9JZFxuXG5cblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZG9BY3Rpb24gPSAobXNnT2IpID0+IHtcbiAgICBjb25zb2xlLmxvZyAoJ21zZ09iOiAnICsgSlNPTi5zdHJpbmdpZnkgKG1zZ09iKSArICdcXG4nKTtcblxuICAgIHZhciBjbWQgPSBfLmtleTEgKG1zZ09iKTtcbiAgICB2YXIgdmFscyA9IG1zZ09iIFtjbWRdO1xuXG4gICAgc3dpdGNoIChjbWQpIHtcblxuICAgICAgICBjYXNlICdyZWFkeSc6XG5cbiAgICAgICAgICAgIF8uaW5pdFN0eWxlICgpO1xuICAgICAgICAgICAgXy53cy50b1NydnIgKHtnZXRWaWRlb0xpbmtzOjF9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3ZpZGVvTGlua3MnOlxuXG4gICAgICAgICAgICBfLnRvcGljVG9WaWRlb0lkICh2YWxzKTtcbiAgICAgICAgICAgIF8ud3MudG9TcnZyICh7Z2V0UG5nRmlsZXM6MX0pO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncG5nRmlsZXMnOlxuXG4gICAgICAgICAgICAkKCdib2R5JylcbiAgICAgICAgICAgIC5lbXB0eSAoKTtcblxuICAgICAgICAgICAgXy5kb1NsaWRlU2hvdyAodmFscyk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAvLyBlbmQgc3dpdGNoIChjbWQpXG5cblxuXG59OyAvLyBlbmQgUC5kb0FjdGlvblxuXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5fLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuXG5cblxuIiwiLy8gZ28tanNvbjJodG1sL2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuXG4gICAgaWQ6IDAsXG4gICAgcHJpbWl0aXZlVHlwZXNOb3ROdWxsOiB7J3N0cmluZyc6MSwgJ3VuZGVmaW5lZCc6MSwgJ251bWJlcic6MSwgJ2Jvb2xlYW4nOjEsICdzeW1ib2wnOiAxfSxcbiAgICAgICAgLy8gc2luY2UgdHlwZW9mIG51bGwgeWllbGRzICdvYmplY3QnLCBpdCdzIGhhbmRsZWQgc2VwYXJhdGVseVxuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZGlzcGxheVBhZ2VIID0gKHBhcmVudCwgZGlzcE9iKSA9PiB7XG4gICAgXG4gICAgaWYgKGRpc3BPYiA9PT0gMCkge1xuICAgICAgICAvLyBjYXNlIHdoZXJlIG5vIGNvbnRlbnQgaXMgZGVzaXJlZFxuICAgICAgICAvLyB0byBkaXNwbGF5IGFuIGFjdHVhbCB6ZXJvLCBtYWtlIGl0IGEgc3RyaW5nOiAgXCIwXCJcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IC8vIGVuZCBpZiAoZGlzcE9iID09PSAwKVxuICAgIFxuICAgIHZhciBkaXNwT2JUeXBlID0gdHlwZW9mIGRpc3BPYjtcbiAgICB2YXIgaXNQcmltaXRpdmUgPSBfLnByaW1pdGl2ZVR5cGVzTm90TnVsbC5oYXNPd25Qcm9wZXJ0eSAoZGlzcE9iVHlwZSkgfHwgZGlzcE9iID09PSBudWxsO1xuXG4gICAgaWYgKGlzUHJpbWl0aXZlKSB7XG5cbiAgICAgICAgSWQgPSBfLnRleHRNYWtlIChwYXJlbnQsIGRpc3BPYiwgJ2FwcGVuZCcpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBORSA9PiBOb3QgRW1wdHlcbiAgICAgICAgdmFyIGlzTkVBcnJheSA9IEFycmF5LmlzQXJyYXkgKGRpc3BPYikgJiYgZGlzcE9iLmxlbmd0aCA+IDA7XG4gICAgICAgIHZhciBpc05FT2JqZWN0ID0gIUFycmF5LmlzQXJyYXkoZGlzcE9iKSAmJiBkaXNwT2JUeXBlID09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKGRpc3BPYikubGVuZ3RoID4gMDtcbiAgICAgICAgXG4gICAgICAgIHZhciBJZCA9IG51bGw7XG4gICAgICAgICAgICAvLyBjYXBpdGFsIElkIHRvIGluZGljYXRlIGlkIHdpdGggJyMnIHByZWZpeGluZyBpdFxuICAgIFxuICAgICAgICBpZiAoaXNORU9iamVjdCkge1xuICAgIFxuICAgICAgICAgICAgaWYgKGRpc3BPYi5oYXNPd25Qcm9wZXJ0eSAoJ3JtJykpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IGRpc3BPYi5ybTtcbiAgICAgICAgICAgICAgICAkKHNlbGVjdG9yKVxuICAgICAgICAgICAgICAgIC5yZW1vdmUgKCk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzcE9iLmhhc093blByb3BlcnR5ICgnZW1wdHknKSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gZGlzcE9iLmVtcHR5O1xuICAgICAgICAgICAgICAgICQoc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgLmVtcHR5ICgpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3BPYi5oYXNPd25Qcm9wZXJ0eSAoJ2NvbnRlbnQnKSkge1xuXG4gICAgICAgICAgICAgICAgXy5kaXNwbGF5UGFnZUggKHBhcmVudCwgZGlzcE9iLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpc3BPYi5oYXNPd25Qcm9wZXJ0eSAoJ2F0dHInKSkge1xuXG4gICAgICAgICAgICAgICAgJChwYXJlbnQpXG4gICAgICAgICAgICAgICAgLmF0dHIgKGRpc3BPYi5hdHRyKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdwYXJlbnQnKSA/IGRpc3BPYi5wYXJlbnQgOiBwYXJlbnQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXR0cnMgPSB7fTtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudE5hbWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBjb250ZW50O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyAoZGlzcE9iKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0TG9jYXRpb24gPSAnYXBwZW5kJztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBreSA9IGtleXMgW2ldO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZ1R5cGUgPSBfLmdldFRhZ1R5cGUgKGt5KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZUluSGVhZCA9IHBhcmVudCA9PT0gJ2hlYWQnICYmIGt5ID09PSAnc3R5bGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3R5bGUgaW4gaGVhZCA9PiBodG1sIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0eWxlIG5vdCBpbiBoZWFkID0+IGF0dHJpYnV0ZSBvZiBkaXNwT2JcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFnTm90U3R5bGUgPSB0YWdUeXBlICE9PSAwICYmIGt5ICE9PSAnc3R5bGUnO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhZ05vdFN0eWxlIHx8IHN0eWxlSW5IZWFkKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudE5hbWUgPSBreTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBkaXNwT2IgW2VsZW1lbnROYW1lXTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoa3kpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhcmVudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nIC0tIFByZXZlbnRzICdwYXJlbnQnIGZyb20gYmVjb21pbmcgYW4gYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGVuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYmVmb3JlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhZnRlcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydExvY2F0aW9uID0ga3k7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IGRpc3BPYiBba3ldID09PSAxID8gcGFyZW50IDogZGlzcE9iIFtreV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBhbnkgb2YgcHJlcGVuZCwgLi4uIGFyZSBzcGVjaWZpZWQsIGFuZCB0aGUgdmFsdWUgaXMgb3RoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoYW4gYSAnMScsIG92ZXJyaWRlIHRoZSBwYXJlbnQgdmFsdWUgd2l0aCB0aGF0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzIFtreV0gPSBkaXNwT2IgW2t5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gLy8gZW5kIHN3aXRjaCAoa3kpXG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9IC8vIGVuZCBpZiAodGFnVHlwZSAhPT0gMClcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzOyBpKyspXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXJyb3IgY2FzZSAtLSBzZXQgYXMgdGV4dCBhbmQgZGlzcGxheSBlbnRpcmUgZGlzcE9iXG5cbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudE5hbWUgPSAndGV4dCc7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSAoZGlzcE9iKTtcblxuICAgICAgICAgICAgICAgIH0gLy8gZW5kIGlmICghZWxlbWVudE5hbWUpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnROYW1lID09PSAndGV4dCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBJZCA9IF8udGV4dE1ha2UgKHBhcmVudCwgY29udGVudCwgaW5zZXJ0TG9jYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBJZCA9IF8uZWxlbWVudE1ha2UgKGVsZW1lbnROYW1lLCBwYXJlbnQsIGluc2VydExvY2F0aW9uLCBhdHRycyk7XG5cbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBpZiAoZWxlbWVudE5hbWUgPT09ICd0ZXh0JylcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FzZSBmb3IgZWxlbWVudCBub3QgJ3RleHQnXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBfLmRpc3BsYXlQYWdlSCAoSWQsIGNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgfSAvLyBlbmQgaWYgKElkICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAoZGlzcE9iLmhhc093blByb3BlcnR5ICgncm0nKSlcbiAgICAgICAgICAgIFxuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKGlzTkVBcnJheSkge1xuICAgIFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwT2IubGVuZ3RoOyBpKyspIHtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuZWQgSWQgd2lsbCBiZSBmb3IgbGFzdCBpdGVtIGluIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZWZ1bCB0byBsYXRlciBhZGQgc2libGluZ3Mgd2l0aCAnYWZ0ZXInIGtleVxuICAgICAgICAgICAgICAgIElkID0gXy5kaXNwbGF5UGFnZUggKHBhcmVudCwgZGlzcE9iIFtpXSk7XG4gICAgXG4gICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BPYi5sZW5ndGg7IGkrKylcbiAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgIElkID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyBjYXNlIGZvciBkaXNwT2IgYXMgYW4gZW1wdHkgb2JqZWN0IG9yIGVtcHR5IGFycmF5XG4gICAgXG4gICAgICAgIH0gLy8gZW5kIGlmIChpc05FT2JqZWN0KVxuXG4gICAgfSAvLyBlbmQgaWYgKF8ucHJpbWl0aXZlVHlwZXNOb3ROdWxsLmhhc093blByb3BlcnR5IChkaXNwT2JUeXBlKSlcbiAgICBcbiAgICAgICAgXG4gICAgcmV0dXJuIElkO1xuXG59OyAvLyBlbmQgXy5kaXNwbGF5UGFnZUggXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmVsZW1lbnRNYWtlID0gKHRhZywgcGFyZW50T3JTaWJsLCBpbnNlcnRMb2NhdGlvbiwgYXR0cnMpID0+IHtcbiAgICBcbiAgICB2YXIgaWQ7XG4gICAgdmFyIGF0dHJLZXlzID0gT2JqZWN0LmtleXMgKGF0dHJzKTtcbiAgICB2YXIgaGFzQXR0cnMgPSBhdHRyS2V5cy5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGhhc0F0dHJzICYmIGF0dHJzLmhhc093blByb3BlcnR5ICgnaWQnKSkge1xuXG4gICAgICAgIGlkID0gYXR0cnMuaWQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlkID0gUC5nZW5JZCAoKTtcblxuICAgIH0gLy8gZW5kIGlmIChoYXNBdHRycylcbiAgICBcbiAgICB2YXIgSWQgPSAnIycgKyBpZDtcbiAgICBcbiAgICB2YXIgZGl2ZWwgPSAnPCcgKyB0YWcgKyAnIGlkPVwiJyArIGlkICsgJ1wiJztcblxuICAgIHZhciB0YWd0eXBlID0gXy5nZXRUYWdUeXBlICh0YWcpO1xuXG4gICAgaWYgKHRhZ3R5cGUgPT0gMSkge1xuXG4gICAgICAgIGRpdmVsICs9ICc+JztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgZGl2ZWwgKz0gJz48LycgKyB0YWcgKyAnPic7XG5cbiAgICB9IC8vIGVuZCBpZiAodGFndHlwZSA9PSAxKVxuXG4gICAgJChwYXJlbnRPclNpYmwpW2luc2VydExvY2F0aW9uXSAoZGl2ZWwpO1xuICAgIFxuICAgIGlmIChoYXNBdHRycykge1xuICAgICAgICBcbiAgICAgICAgJChJZClcbiAgICAgICAgLmF0dHIgKGF0dHJzKTtcblxuICAgIH0gLy8gZW5kIGlmIChoYXNBdHRycylcbiAgICBcbiAgICByZXR1cm4gSWQ7XG5cbn07IC8vIGVuZCBfLmVsZW1lbnRNYWtlXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmdldFRhZ1R5cGUgPSAodGFnKSA9PiB7XG5cbiAgICAgICAgLy8gMSA9PiB2b2lkIGVsZW1lbnRzLCAyID0+IGhhcyBjb250ZW50XG4gICAgdmFyIHRhZ3MgPSB7IGFyZWE6IDEsIGJhc2U6IDEsIGJyOiAxLCBjb2w6IDEsIGVtYmVkOiAxLCBocjogMSwgaW1nOiAxLCBpbnB1dDogMSwga2V5Z2VuOiAxLCBsaW5rOiAxLCBtZXRhOiAxLCBwYXJhbTogMSwgc291cmNlOiAxLCB0cmFjazogMSwgd2JyOiAxLCBhOiAyLCBhYmJyOiAyLCBhZGRyZXNzOiAyLCBhcnRpY2xlOiAyLCBhc2lkZTogMiwgYXVkaW86IDIsIGI6IDIsIGJkaTogMiwgYmRvOiAyLCBibG9ja3F1b3RlOiAyLCBib2R5OiAyLCBidXR0b246IDIsIGNhbnZhczogMiwgY2FwdGlvbjogMiwgY2l0ZTogMiwgY29kZTogMiwgY29sZ3JvdXA6IDIsIGRhdGFsaXN0OiAyLCBkZDogMiwgZGVsOiAyLCBkZXRhaWxzOiAyLCBkZm46IDIsIGRpYWxvZzogMiwgZGl2OiAyLCBkbDogMiwgZHQ6IDIsIGVtOiAyLCBmaWVsZHNldDogMiwgZmlnY2FwdGlvbjogMiwgZmlndXJlOiAyLCBmb290ZXI6IDIsIGZvcm06IDIsIGgxOiAyLCBoMjogMiwgaDM6IDIsIGg0OiAyLCBoNTogMiwgaDY6IDIsIGhlYWQ6IDIsIGhlYWRlcjogMiwgaGdyb3VwOiAyLCBodG1sOiAyLCBpOiAyLCBpZnJhbWU6IDIsIGluczogMiwga2JkOiAyLCBsYWJlbDogMiwgbGVnZW5kOiAyLCBsaTogMiwgbWFwOiAyLCBtYXJrOiAyLCBtZW51OiAyLCBtZXRlcjogMiwgbmF2OiAyLCBub3NjcmlwdDogMiwgb2JqZWN0OiAyLCBvbDogMiwgb3B0Z3JvdXA6IDIsIG9wdGlvbjogMiwgb3V0cHV0OiAyLCBwOiAyLCBwcmU6IDIsIHByb2dyZXNzOiAyLCBxOiAyLCBycDogMiwgcnQ6IDIsIHJ1Ynk6IDIsIHM6IDIsIHNhbXA6IDIsIHNjcmlwdDogMiwgc2VjdGlvbjogMiwgc2VsZWN0OiAyLCBzbWFsbDogMiwgc3BhbjogMiwgc3Ryb25nOiAyLCBzdHlsZTogMiwgc3ViOiAyLCBzdW1tYXJ5OiAyLCBzdXA6IDIsIHN2ZzogMiwgdGFibGU6IDIsIHRib2R5OiAyLCB0ZDogMiwgdGV4dGFyZWE6IDIsIHRmb290OiAyLCB0aDogMiwgdGhlYWQ6IDIsIHRpbWU6IDIsIHRpdGxlOiAyLCB0cjogMiwgdTogMiwgdWw6IDIsICd2YXInOiAyLCB2aWRlbzogMn07XG5cbiAgICB0YWdzLnRleHQgPSAxOyAgLy8gc3BlY2lhbCB0YWc6ICB1c2VzIF8ubWFrZVRleHQgKClcbiAgICBcbiAgICByZXR1cm4gdGFncy5oYXNPd25Qcm9wZXJ0eSh0YWcpID8gdGFncyBbdGFnXSA6IDA7XG5cbn07IC8vIGVuZCBfLmdldFRhZ1R5cGUgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8udGV4dE1ha2UgPSAocGFyZW50LCBwcmltaXRpdmUsIGxvY2F0aW9uKSA9PiB7XG4gICAgXG4gICAgaWYgKHR5cGVvZiBwcmltaXRpdmUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgc2luZ2xlcXVvdGUgPSAnJiN4MDAyNzsnO1xuICAgICAgICB2YXIgYmFja3NsYXNoID0gJyYjeDAwNWM7JztcbiAgICAgICAgdmFyIGRvdWJsZXF1b3RlID0gJyYjeDAwMjI7JztcbiAgICAgICAgdmFyIGx0ID0gJyZsdDsnO1xuICAgICAgICBcbiAgICAgICAgcHJpbWl0aXZlID0gcHJpbWl0aXZlLnJlcGxhY2UgKC8nL2csIHNpbmdsZXF1b3RlKTtcbiAgICAgICAgcHJpbWl0aXZlID0gcHJpbWl0aXZlLnJlcGxhY2UgKC9cIi9nLCBkb3VibGVxdW90ZSk7XG4gICAgICAgIHByaW1pdGl2ZSA9IHByaW1pdGl2ZS5yZXBsYWNlICgvXFxcXC9nLCBiYWNrc2xhc2gpO1xuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoLzwvZywgbHQpO1xuXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcHJpbWl0aXZlID09PSAnc3ltYm9sJykge1xuXG4gICAgICAgIHByaW1pdGl2ZSA9ICdzeW1ib2wnO1xuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHN0cmluZ2lmeSB3b3VsZCBwcm9kdWNlICd7fScgd2hpY2ggaXMgbGVzcyB1c2VmdWxcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcHJpbWl0aXZlID0gSlNPTi5zdHJpbmdpZnkgKHByaW1pdGl2ZSk7XG5cbiAgICB9IC8vIGVuZCBpZiAodHlwZW9mIHByaW1pdGl2ZSA9PT0gJ3N0cmluZycpXG4gICAgXG5cbiAgICAkKHBhcmVudCkgW2xvY2F0aW9uXSAocHJpbWl0aXZlKTtcblxuICAgIHJldHVybiBudWxsO1xuICAgICAgICAvLyB0ZXh0IG9icyBoYXZlIG5vIGlkJ3M6IG9ubHkgdGV4dCBpcyBhcHBlbmRlZCB3aXRoIG5vIHdheSB0byBhZGRyZXNzIGl0XG4gICAgICAgIC8vIGlmIGFkZHJlc3NpbmcgaXMgbmVjZXNzYXJ5LCB1c2Ugc3BhbiBpbnN0ZWFkIG9mIHRleHRcblxufTsgLy8gZW5kIF8udGV4dE1ha2UgXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kaXNwbGF5UGFnZSA9IChkaXNwT2IpID0+IHtcbiAgICBcbiAgICB2YXIgcGFyZW50ID0gZGlzcE9iLmhhc093blByb3BlcnR5ICgncGFyZW50JykgPyBkaXNwT2IucGFyZW50IDogJ2JvZHknO1xuICAgICAgICAvLyBpZiBwYXJlbnQgbm90IGZvdW5kLCBhcHBlbmQgdG8gYm9keVxuXG4gICAgdmFyIElkID0gXy5kaXNwbGF5UGFnZUggKHBhcmVudCwgZGlzcE9iKTtcblxuICAgIHJldHVybiBJZDtcblxufTsgLy8gZW5kIFAuZGlzcGxheVBhZ2UgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmdlbklkID0gKCkgPT4ge1xuXG4gICAgdmFyIGlkID0gJ2knICsgXy5pZCsrO1xuICAgIHJldHVybiBpZDtcblxufTsgLy8gZW5kIFAuZ2VuSWRcblxuXG4vLyBlbmQgUFVCTElDIHNlY3Rpb25cblxucmV0dXJuIFA7XG5cbn0oKSk7XG5cblxuXG4iLCIvLyBnby1rZXkvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoanFTZWxlY3RvciwgcmVwb3J0U2hpZnQsIGtleUhhbmRsZXIpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuXG4gICAganFTZWxlY3RvcjogJ2JvZHknLFxuICAgIHJlcG9ydFNoaWZ0OiBmYWxzZSxcbiAgICBrZXlIYW5kbGVyOiBjb25zb2xlLmxvZyxcblxuICAgIGtTaGlmdDogZmFsc2UsXG4gICAga0N0cmw6IGZhbHNlLFxuICAgIGtBbHQ6IGZhbHNlLFxuICAgIGtDbWQ6IGZhbHNlLFxuICAgIGtJZ25vcmU6IGZhbHNlLFxuICAgIHdoaWNoU2hpZnRLZXlzOiB7MTY6MSwgMTc6MSwgMTg6MSwgOTE6MSwgOTI6MSwgOTM6MSwgMjI0OjF9LFxuXG4gICAgICAgICAgICAvLyBub3QgcHJpbnRhYmxlIG9yIG5vbi1hc2NpaSBibG9ja1xuICAgIGN0cmxPck5vbkFzY2lpOiB7XG4gICAgICAgIDg6ICdCYWNrc3BhY2UnLFxuICAgICAgICA5OiAnVGFiJyxcbiAgICAgICAgMTM6ICdFbnRlcicsXG4gICAgICAgIDE2OiAnU2hpZnQnLFxuICAgICAgICAxNzogJ0N0cmwnLFxuICAgICAgICAxODogJ0FsdCcsXG4gICAgICAgIDE5OiAnUGF1c2UtYnJlYWsnLFxuICAgICAgICAyMDogJ0NhcHMtbG9jaycsXG4gICAgICAgIDI3OiAnRXNjJyxcbiAgICAgICAgMzI6ICcgJywgIC8vIFNwYWNlXG4gICAgICAgIDMzOiAnUGFnZVVwJyxcbiAgICAgICAgMzQ6ICdQYWdlRG93bicsXG4gICAgICAgIDM1OiAnRW5kJyxcbiAgICAgICAgMzY6ICdIb21lJyxcbiAgICAgICAgMzc6ICdMZWZ0JyxcbiAgICAgICAgMzg6ICdVcCcsXG4gICAgICAgIDM5OiAnUmlnaHQnLFxuICAgICAgICA0MDogJ0Rvd24nLFxuICAgICAgICA0NTogJ0luc2VydCcsXG4gICAgICAgIDQ2OiAnRGVsZXRlJyxcbiAgICAgICAgOTE6ICdXaW5kb3dzS2V5TGVmdCcsXG4gICAgICAgIDkyOiAnV2luZG93c0tleVJpZ2h0JyxcbiAgICAgICAgOTM6ICdXaW5kb3dzT3B0aW9uS2V5JyxcbiAgICAgICAgOTY6ICcwJywgIC8vIE51bXBhZFxuICAgICAgICA5NzogJzEnLCAgLy8gTnVtcGFkXG4gICAgICAgIDk4OiAnMicsICAvLyBOdW1wYWRcbiAgICAgICAgOTk6ICczJywgIC8vIE51bXBhZFxuICAgICAgICAxMDA6ICc0JywgIC8vIE51bXBhZFxuICAgICAgICAxMDE6ICc1JywgIC8vIE51bXBhZFxuICAgICAgICAxMDI6ICc2JywgIC8vIE51bXBhZFxuICAgICAgICAxMDM6ICc3JywgIC8vIE51bXBhZFxuICAgICAgICAxMDQ6ICc4JywgIC8vIE51bXBhZFxuICAgICAgICAxMDU6ICc5JywgIC8vIE51bXBhZFxuICAgICAgICAxMDY6ICcqJywgIC8vIE51bXBhZFxuICAgICAgICAxMDc6ICcrJywgIC8vIE51bXBhZFxuICAgICAgICAxMDk6ICctJywgIC8vIE51bXBhZFxuICAgICAgICAxMTA6ICcuJywgIC8vIE51bXBhZFxuICAgICAgICAxMTE6ICcvJywgIC8vIE51bXBhZFxuICAgICAgICAxMTI6ICdGMScsXG4gICAgICAgIDExMzogJ0YyJyxcbiAgICAgICAgMTE0OiAnRjMnLFxuICAgICAgICAxMTU6ICdGNCcsXG4gICAgICAgIDExNjogJ0Y1JyxcbiAgICAgICAgMTE3OiAnRjYnLFxuICAgICAgICAxMTg6ICdGNycsXG4gICAgICAgIDExOTogJ0Y4JyxcbiAgICAgICAgMTIwOiAnRjknLFxuICAgICAgICAxMjE6ICdGMTAnLFxuICAgICAgICAxMjI6ICdGMTEnLFxuICAgICAgICAxMjM6ICdGMTInLFxuICAgICAgICAxNDQ6ICdOdW1sb2NrJyxcbiAgICAgICAgMTQ1OiAnU2Nyb2xsLWxvY2snLFxuICAgICAgICAyMjQ6ICdNYWNDbWQnLFxuICAgIH0sXG4gICAgXG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBhc2NpaVVuU2hpZnRlZDoge1xuICAgICAgICA0ODogJzAnLFxuICAgICAgICA0OTogJzEnLFxuICAgICAgICA1MDogJzInLFxuICAgICAgICA1MTogJzMnLFxuICAgICAgICA1MjogJzQnLFxuICAgICAgICA1MzogJzUnLFxuICAgICAgICA1NDogJzYnLFxuICAgICAgICA1NTogJzcnLFxuICAgICAgICA1NjogJzgnLFxuICAgICAgICA1NzogJzknLFxuICAgICAgICA1OTogJzsnLFxuICAgICAgICA2MTogJz0nLFxuICAgICAgICA2NTogJ2EnLFxuICAgICAgICA2NjogJ2InLFxuICAgICAgICA2NzogJ2MnLFxuICAgICAgICA2ODogJ2QnLFxuICAgICAgICA2OTogJ2UnLFxuICAgICAgICA3MDogJ2YnLFxuICAgICAgICA3MTogJ2cnLFxuICAgICAgICA3MjogJ2gnLFxuICAgICAgICA3MzogJ2knLFxuICAgICAgICA3NDogJ2onLFxuICAgICAgICA3NTogJ2snLFxuICAgICAgICA3NjogJ2wnLFxuICAgICAgICA3NzogJ20nLFxuICAgICAgICA3ODogJ24nLFxuICAgICAgICA3OTogJ28nLFxuICAgICAgICA4MDogJ3AnLFxuICAgICAgICA4MTogJ3EnLFxuICAgICAgICA4MjogJ3InLFxuICAgICAgICA4MzogJ3MnLFxuICAgICAgICA4NDogJ3QnLFxuICAgICAgICA4NTogJ3UnLFxuICAgICAgICA4NjogJ3YnLFxuICAgICAgICA4NzogJ3cnLFxuICAgICAgICA4ODogJ3gnLFxuICAgICAgICA4OTogJ3knLFxuICAgICAgICA5MDogJ3onLFxuICAgICAgICAxNzM6ICctJyxcbiAgICAgICAgMTg4OiAnLCcsXG4gICAgICAgIDE5MDogJy4nLFxuICAgICAgICAxOTE6ICcvJyxcbiAgICAgICAgMTkyOiAnYCcsXG4gICAgICAgIDIxOTogJ1snLFxuICAgICAgICAyMjA6IFwiXFxcXFwiLFxuICAgICAgICAyMjE6ICddJyxcbiAgICAgICAgMjIyOiBcIidcIixcbiAgICAxODY6IFwiO1wiLCAgLy8gZGl0dG8gZm9yICc7J1xuICAgIDE4NzogXCI9XCIsICAvLyBhcHBhcmVudGx5LCBjaHJvbWUgdGhpbmtzIHdoaWNoIGlzIDE4NyBmb3IgJz0nLCBidXQgbm90IGZpcmVmb3hcbiAgICAxODk6IFwiLVwiLCAgLy8gZGl0dG8gZm9yICctJ1xuICAgIH0sXG4gICAgXG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBhc2NpaVNoaWZ0ZWQ6IHtcbiAgICAgICAgNDg6ICcpJyxcbiAgICAgICAgNDk6ICchJyxcbiAgICAgICAgNTA6ICdAJyxcbiAgICAgICAgNTE6ICcjJyxcbiAgICAgICAgNTI6ICckJyxcbiAgICAgICAgNTM6ICclJyxcbiAgICAgICAgNTQ6ICdeJyxcbiAgICAgICAgNTU6ICcmJyxcbiAgICAgICAgNTY6ICcqJyxcbiAgICAgICAgNTc6ICcoJyxcbiAgICAgICAgNTk6ICc6JyxcbiAgICAgICAgNjE6ICcrJyxcbiAgICAgICAgNjU6ICdBJyxcbiAgICAgICAgNjY6ICdCJyxcbiAgICAgICAgNjc6ICdDJyxcbiAgICAgICAgNjg6ICdEJyxcbiAgICAgICAgNjk6ICdFJyxcbiAgICAgICAgNzA6ICdGJyxcbiAgICAgICAgNzE6ICdHJyxcbiAgICAgICAgNzI6ICdIJyxcbiAgICAgICAgNzM6ICdJJyxcbiAgICAgICAgNzQ6ICdKJyxcbiAgICAgICAgNzU6ICdLJyxcbiAgICAgICAgNzY6ICdMJyxcbiAgICAgICAgNzc6ICdNJyxcbiAgICAgICAgNzg6ICdOJyxcbiAgICAgICAgNzk6ICdPJyxcbiAgICAgICAgODA6ICdQJyxcbiAgICAgICAgODE6ICdRJyxcbiAgICAgICAgODI6ICdSJyxcbiAgICAgICAgODM6ICdTJyxcbiAgICAgICAgODQ6ICdUJyxcbiAgICAgICAgODU6ICdVJyxcbiAgICAgICAgODY6ICdWJyxcbiAgICAgICAgODc6ICdXJyxcbiAgICAgICAgODg6ICdYJyxcbiAgICAgICAgODk6ICdZJyxcbiAgICAgICAgOTA6ICdaJyxcbiAgICAgICAgMTczOiAnXycsXG4gICAgICAgIDE4ODogJzwnLFxuICAgICAgICAxOTA6ICc+JyxcbiAgICAgICAgMTkxOiAnPycsXG4gICAgICAgIDE5MjogJ34nLFxuICAgICAgICAyMTk6ICd7JyxcbiAgICAgICAgMjIwOiAnfCcsXG4gICAgICAgIDIyMTogJ30nLFxuICAgICAgICAyMjI6ICdcIicsXG4gICAgMTg2OiBcIjpcIiwgIC8vIGRpdHRvIGZvciAnOidcbiAgICAxODc6IFwiK1wiLCAgLy8gZGl0dG8gZm9yICcrJ1xuICAgIDE4OTogXCJfXCIsICAvLyBkaXR0byBmb3IgJy0nXG4gICAgfSxcblxuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5pbml0ID0gKCkgPT4ge1xuICAgIFxuICAgIF8uanFTZWxlY3RvciA9IGpxU2VsZWN0b3IgPyBqcVNlbGVjdG9yIDogJ2JvZHknO1xuICAgIF8ucmVwb3J0U2hpZnQgPSByZXBvcnRTaGlmdCA/IHJlcG9ydFNoaWZ0IDogZmFsc2U7XG4gICAgXy5rZXlIYW5kbGVyID0ga2V5SGFuZGxlciA/IGtleUhhbmRsZXIgOiBfLmRlZmF1bHRIYW5kbGVyO1xuXG4gICAgUC5zZXRLZXlVcERvd24gKCk7XG5cbn07IC8vIGVuZCBfLmluaXRcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uY0tleURvd24gPSAoZXZlbnQsIHJlcG9ydFNoaWZ0LCBjYWxsYmFjaykgPT4ge1xuICAgIC8vIHJldHVybnMgY2ggb2JqZWN0IHJlZmxlY3Rpbmcgd2hpY2ggc2hpZnQga2V5cyB3ZXJlIHByZXNzZWQgZG93biwgY2ggYW5kIHdoaWNoIHZhbHVlc1xuICAgIC8vXG4gICAgLy8gcmVwb3J0U2hpZnQgdHJ1ZSA9PiB0cmlnZ2VyIGNhbGxiYWNrIGZvciBlYWNoIGtleWRvd24gZXZlbnQgb2YgYW55IGtleSwgXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpbmNsdWRpbmcgYW55IHNoaWZ0IGtleVxuICAgIC8vICAgICBmYWxzZSA9PiBzaGlmdCBrZXkgZXZlbnQgcmVwb3J0ZWQgb25seSB3aGVuIHRoZSBuZXh0IG5vbi1zaGlmdCBrZXlkb3duIGV2ZW50LlxuICAgIC8vICAgICAgICAgICAgICBTbywgY2FsbGJhY2sgaXMgb25seSB0cmlnZ2VyZWQgZm9yIG5vbi1zaGlmdCBrZXkgZXZlbnRzXG4gICAgXG4gICAgdmFyIHdoaWNoID0gZXZlbnQud2hpY2g7XG5cbiAgICAgICAgLy8gbmV2ZXIgaWdub3JlICdFc2MnIGtleSA9PSAyN1xuICAgIGlmIChfLmtJZ25vcmUgJiYgd2hpY2ggIT0gMjcpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IC8vIGVuZCBpZiAoa0lnbm9yZSlcbiAgICBcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbiAoKTtcblxuICAgIHZhciBpc0FTaGlmdEtleSA9IHRydWU7XG4gICAgc3dpdGNoICh3aGljaCkge1xuXG4gICAgICAgIGNhc2UgMTY6IFxuICAgICAgICAgICAgXy5rU2hpZnQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAxNzogXG4gICAgICAgICAgICBfLmtDdHJsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgXy5rQWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgOTE6IFxuICAgICAgICBjYXNlIDkyOiBcbiAgICAgICAgY2FzZSA5MzogXG4gICAgICAgIGNhc2UgMjI0OlxuICAgICAgICAgICAgXy5rQ21kID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpc0FTaGlmdEtleSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICB9ICAgXG5cbiAgICBpZiAoaXNBU2hpZnRLZXkgJiYgIXJlcG9ydFNoaWZ0KSB7XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSAvLyBlbmQgaWYgKGlzQVNoaWZ0S2V5ICYmICFyZXBvcnRTaGlmdClcbiAgICBcbiAgICB2YXIgdGhpc0NoID0gXy5nZXRLZXlEb3duQ29kZSAod2hpY2gpO1xuXG4gICAgdmFyIGNoT2IgPSAoe1xuICAgICAgICBzaGlmdDogXy5rU2hpZnQsXG4gICAgICAgIGN0cmw6IF8ua0N0cmwsXG4gICAgICAgIGFsdDogXy5rQWx0LFxuICAgICAgICBtYWNDbWQ6IF8ua0NtZCxcbiAgICAgICAgd2hpY2g6IHdoaWNoLFxuICAgICAgICBjaDogdGhpc0NoLFxuICAgIH0pO1xuXG4gICAgaWYgKHJlcG9ydFNoaWZ0KSB7XG5cbiAgICAgICAgY2hPYi5pc0FTaGlmdEtleSA9IGlzQVNoaWZ0S2V5OyAgXG4gICAgICAgICAgICAvLyB0cnVlIGlmIGFueSBvZjogc2hpZnQsIGN0cmwsIGFsdCwgb3IgbWFjQ21kIGFyZSB0cnVlXG4gICAgICAgICAgICAvLyBvbmx5IHJlbGV2YW50IGlmIHJlcG9ydFNoaWZ0IGlzIHRydWVcblxuICAgIH0gLy8gZW5kIGlmIChyZXBvcnRTaGlmdClcblxuICAgIGNhbGxiYWNrIChjaE9iKTtcblxufTsgLy8gZW5kIF8uY0tleURvd24gXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uY0tleVVwID0gKGV2ZW50KSA9PiB7XG4gICAgXG5cbiAgICBpZiAoXy5rSWdub3JlKSB7XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSAvLyBlbmQgaWYgKGtJZ25vcmUpXG4gICAgXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24gKCk7XG5cbiAgICB2YXIgd2hpY2ggPSBldmVudC53aGljaDtcblxuICAgIHN3aXRjaCAod2hpY2gpIHtcblxuICAgICAgICBjYXNlIDE2OiBcbiAgICAgICAgICAgIF8ua1NoaWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgY2FzZSAxNzogXG4gICAgICAgICAgICBfLmtDdHJsID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgY2FzZSAxODogXG4gICAgICAgICAgICBfLmtBbHQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBjYXNlIDkxOiBcbiAgICAgICAgY2FzZSA5MjogXG4gICAgICAgIGNhc2UgOTM6IFxuICAgICAgICBjYXNlIDIyNDogXG4gICAgICAgICAgICBfLmtDbWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVyblxuICAgIH0gICBcblxufTsgLy8gZW5kIF8uY0tleVVwIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kZWZhdWx0SGFuZGxlciA9IChjaE9iKSA9PiB7XG4gICAgXG4gICAgdmFyIGNoT2JTID0gSlNPTi5zdHJpbmdpZnkgKGNoT2IpO1xuICAgIGNvbnNvbGUubG9nICgna2V5Ll8uZGVmYXVsdEhhbmRsZXIuY2hPYjogJyArIGNoT2JTKTtcblxufTsgLy8gZW5kIF8uZGVmYXVsdEhhbmRsZXIgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5nZXRLZXlEb3duQ29kZSA9ICh3aGljaCkgPT4ge1xuICAgIFxuXG4gICAgdmFyIGNoO1xuXG4gICAgaWYgKF8uY3RybE9yTm9uQXNjaWkuaGFzT3duUHJvcGVydHkgKHdoaWNoKSkge1xuXG4gICAgICAgIGNoID0gXy5jdHJsT3JOb25Bc2NpaSBbd2hpY2hdO1xuXG4gICAgfSBlbHNlIGlmIChfLmtTaGlmdCAmJiBfLmFzY2lpU2hpZnRlZC5oYXNPd25Qcm9wZXJ0eSAod2hpY2gpKSB7XG5cbiAgICAgICAgY2ggPSBfLmFzY2lpU2hpZnRlZCBbd2hpY2hdO1xuXG4gICAgfSBlbHNlIGlmICghXy5rU2hpZnQgJiYgXy5hc2NpaVVuU2hpZnRlZC5oYXNPd25Qcm9wZXJ0eSAod2hpY2gpKSB7XG5cbiAgICAgICAgY2ggPSBfLmFzY2lpVW5TaGlmdGVkIFt3aGljaF07XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNoID0gbnVsbDtcblxuICAgIH0gLy8gZW5kIGlmIFxuICAgIFxuICAgIHJldHVybiBjaDtcblxufTsgLy8gZW5kIF8uZ2V0S2V5RG93bkNvZGUgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5pbml0S2V5RG93biA9IChqcVNlbGVjdG9yLCByZXBvcnRTaGlmdCwgY2FsbGJhY2spID0+IHtcbiAgICBcbiAgICAkKGpxU2VsZWN0b3IpXG4gICAgLm9mZigna2V5ZG93bicpXG4gICAgLmtleWRvd24gKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBfLmNLZXlEb3duIChldmVudCwgcmVwb3J0U2hpZnQsIGNhbGxiYWNrKTtcbiAgICB9KVxuXG59OyAvLyBlbmQgXy5pbml0S2V5RG93biBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5pbml0S2V5VXAgPSAoanFTZWxlY3RvcikgPT4ge1xuICAgIFxuICAgICQoanFTZWxlY3RvcilcbiAgICAub2ZmKCdrZXl1cCcpXG4gICAgLmtleXVwIChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgXy5jS2V5VXAgKGV2ZW50KVxuICAgIH0pXG5cbn07IC8vIGVuZCBfLmluaXRLZXlVcCBcblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnNldEtleVVwRG93biA9ICgpID0+IHtcbiAgICBcbiAgICBfLmluaXRLZXlVcCAoJ2JvZHknKTtcbiAgICBfLmluaXRLZXlEb3duICgnYm9keScsIF8ucmVwb3J0U2hpZnQsIF8ua2V5SGFuZGxlcik7XG5cbn07IC8vIGVuZCBQLnNldEtleUhhbmRsZXJcblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbl8uaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cbiIsIi8vIGdvLXBvcGluZm8vaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHApIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuICAgIGRwcDogZHAuZGlzcGxheVBhZ2UsXG4gICAgZ2VuSWQ6IGRwLmdlbklkLFxuICAgIGFycm93U2l6ZTogMTAsXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxuXy5pbml0ID0gKCkgPT4ge1xuXG4gICAgXy5zZXRQb3B1cFN0eWxlICgpO1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZ2V0UG9zRGltID0gKGpxKSA9PiB7XG4gICAgXG4gICAgdmFyIHJlcyA9IHt9O1xuXG4gICAgdmFyIG9mZnNldCA9ICQoanEpLm9mZnNldCAoKTtcbiAgICByZXMubGVmdCA9IG9mZnNldC5sZWZ0O1xuICAgIHJlcy50b3AgPSBvZmZzZXQudG9wO1xuXG4gICAgcmVzLndpZHRoID0gJChqcSkud2lkdGggKCk7XG4gICAgcmVzLmhlaWdodCA9ICQoanEpLmhlaWdodCAoKTtcblxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBfLmdldFBvc0RpbSBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uc2V0UG9wdXBTdHlsZSA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgYXMgPSBfLmFycm93U2l6ZTtcblxuICAgIHZhciBwb3B1cFN0eWxlID0ge3N0eWxlOiBcbiAgICAnLnBvcHVwIHsnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiByZWxhdGl2ZTsnICtcbiAgICAgICAgJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnICtcbiAgICAgICAgJ2JvcmRlcjogMXB4IHNvbGlkIGJsdWU7JyArXG4gICAgICAgICdib3JkZXItcmFkaXVzOiA0cHg7JyArXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yOiAjZWJmMmYyOycgK1xuICAgICAgICAnZm9udC1zaXplOiAxMnB4OycgK1xuICAgICd9JyArXG4gICAgJy5wb3B1cG5vdmlzIHsnICtcbiAgICAgICAgJ3Zpc2liaWxpdHk6IGhpZGRlbjsnICtcbiAgICAnfScgK1xuICAgICcuYXJyb3cgeycgK1xuICAgICAgICAncG9zaXRpb246IGFic29sdXRlOycgK1xuICAgICAgICAnZGlzcGxheTogaW5saW5lLWJsb2NrOycgK1xuICAgICAgICAnd2lkdGg6IDA7JyArXG4gICAgICAgICdoZWlnaHQ6IDA7JyArXG4gICAgICAgICdib3JkZXItc3R5bGU6IHNvbGlkOycgK1xuICAgICAgICAnYm94LXNpemluZzogYm9yZGVyLWJveDsnICtcbiAgICAnfScgK1xuICAgICcuYXJyb3dib3JkZXIgeycgK1xuICAgICAgICAnYm9yZGVyLXdpZHRoOiAnICsgKGFzIC0gMSkgKyAncHg7JyArXG4gICAgICAgICdib3JkZXItY29sb3I6IGJsdWUgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7JyArXG4gICAgICAgICdib3R0b206IC0nICsgKDIqYXMgLSAyKSArICdweDsnICtcbiAgICAnfScgK1xuICAgICcuYXJyb3dmaWxsZXIgeycgK1xuICAgICAgICAnYm9yZGVyLXdpZHRoOiAnKyAoYXMgLSAyKSArICdweDsnICtcbiAgICAgICAgJ2JvcmRlci1jb2xvcjogI2ViZjJmMiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDsnICtcbiAgICAgICAgJ2JvdHRvbTogLScgKyAoMiphcyAtIDQpICsgJ3B4OycgK1xuICAgICAgICAnei1pbmRleDogMTsnICtcbiAgICAnfSdcbiAgICAsIHBhcmVudDogJ2hlYWQnfTtcblxuICAgIF8uZHBwIChwb3B1cFN0eWxlKTtcblxufTsgLy8gZW5kIF8uc2V0UG9wdXBTdHlsZVxuXG5cblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmNyZWF0ZVBvcHVwRGlzcGxheSA9IChqcU9iLCBkaXNwc3RyLCBvcHRpb25zKSA9PiB7XG4gICAgXG4gICAganFPYiA9IHR5cGVvZiBqcU9iID09PSAnc3RyaW5nJyA/ICQoanFPYikgOiBqcU9iO1xuXG4gICAgZGlzcFN0cnMgPSBkaXNwc3RyLnNwbGl0ICgnXFxuJyk7XG5cbiAgICB2YXIgZGlzcEEgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BTdHJzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGRpc3BTdHIgPSBkaXNwU3RycyBbaV07XG4gICAgICAgIGlmIChpID4gMCkge1xuXG4gICAgICAgICAgICBkaXNwQS5wdXNoICh7YnI6MH0pO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChpID4gMClcbiAgICAgICAgXG4gICAgICAgIGRpc3BBLnB1c2ggKHtzcGFuOiBkaXNwU3RyLCBzdHlsZTogJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnfSk7XG5cblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcFN0cnM7IGkrKylcbiAgICBcbiAgICB2YXIgZGlzcE9iID0ge2RpdjogZGlzcEEsIHN0eWxlOiAnbWFyZ2luOiAycHg7J307XG4gICAgdmFyIHBvc0VsID0gXy5nZXRQb3NEaW0gKGpxT2IpO1xuXG4gICAgICAgIC8vIGZvcmNlcyBkaXYgd2lkdGggdG8gd2lkdGggb2YgY29udGVudFxuICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ1MDkwMy9ob3ctdG8tbWFrZS1kaXYtbm90LWxhcmdlci10aGFuLWl0cy1jb250ZW50c1xuXG4gICAgdmFyIGlkQWIgPSBfLmdlbklkICgpO1xuICAgIHZhciBpZEFmID0gXy5nZW5JZCAoKTtcblxuICAgIHZhciBkaXZBcnJvd0JvcmRlciA9IHtkaXY6IDAsIGlkOiBpZEFiLCBjbGFzczogJ2Fycm93IGFycm93Ym9yZGVyJ307XG4gICAgdmFyIGRpdkFycm93RmlsbGVyID0ge2RpdjogMCwgaWQ6IGlkQWYsIGNsYXNzOiAnYXJyb3cgYXJyb3dmaWxsZXInfTtcblxuICAgIGlkQWIgPSAnIycgKyBpZEFiO1xuICAgIGlkQWYgPSAnIycgKyBpZEFmO1xuXG4gICAgdmFyIHBvcE9iID0ge2RpdjogW2Rpc3BPYiwgZGl2QXJyb3dCb3JkZXIsIGRpdkFycm93RmlsbGVyXSwgY2xhc3M6ICdwb3B1cCd9XG4gICAgdmFyIElkUG9wT2IgPSBfLmRwcCAocG9wT2IpO1xuICAgIHZhciBwb3NQb3B1cCA9IF8uZ2V0UG9zRGltIChJZFBvcE9iKTtcblxuICAgIHZhciB0b3BETyA9IHBvc0VsLnRvcCAtIHBvc1BvcHVwLmhlaWdodCAtIF8uYXJyb3dTaXplO1xuICAgIHZhciBsZWZ0RE8gPSBwb3NFbC5sZWZ0ICsgcG9zRWwud2lkdGgvMiAtIHBvc1BvcHVwLndpZHRoLzI7XG5cbiAgICAkKElkUG9wT2IpXG4gICAgLm9mZnNldCAoe3RvcDogdG9wRE8sIGxlZnQ6IGxlZnRET30pO1xuXG4gICAgdmFyIHBvc0FiID0gXy5nZXRQb3NEaW0gKGlkQWIpO1xuICAgIHZhciBwb3NBZiA9IF8uZ2V0UG9zRGltIChpZEFmKTtcblxuICAgIHZhciBhcyA9IF8uYXJyb3dTaXplO1xuICAgICQoaWRBYilcbiAgICAub2Zmc2V0ICh7dG9wOiBwb3NBYi50b3AsIGxlZnQ6IGxlZnRETyArIHBvc1BvcHVwLndpZHRoLzIgLSBhcy8yIC0gMn0pO1xuXG4gICAgJChpZEFmKVxuICAgIC5vZmZzZXQgKHt0b3A6IHBvc0FmLnRvcCwgbGVmdDogbGVmdERPICsgcG9zUG9wdXAud2lkdGgvMiArIDEgLSBhcy8yIC0gMn0pO1xuXG4gICAgJChJZFBvcE9iKVxuICAgIC5hZGRDbGFzcyAoJ3BvcHVwbm92aXMnKTtcblxuICAgIHJldHVybiBJZFBvcE9iO1xufTsgLy8gZW5kIFAuY3JlYXRlUG9wdXBEaXNwbGF5IFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5oaWRlUG9wdXBzID0gKElkKSA9PiB7XG4gICAgXG4gICAgdmFyIHNlbCA9IElkID8gSWQgOiAnLnBvcHVwJztcblxuICAgICQoc2VsKVxuICAgIC5hZGRDbGFzcyAoJ3BvcHVwbm92aXMnKTtcblxuXG59OyAvLyBlbmQgUC5oaWRlUG9wdXBzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuc2hvd1BvcHVwcyA9IChJZCkgPT4ge1xuICAgIFxuICAgIHZhciBzZWwgPSBJZCA/IElkIDogJy5wb3B1cCc7XG5cbiAgICAkKHNlbClcbiAgICAucmVtb3ZlQ2xhc3MgKCdwb3B1cG5vdmlzJyk7XG5cblxufTsgLy8gZW5kIFAuc2hvd1BvcHVwc1xuXG5cblxuXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5fLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuXG5cblxuXG4iLCIvLyBnby11dGlsL2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgXyA9IHtcblxuICAgIGtleTE6IHJlcXVpcmUgKCdrZXkxJylcblxufTsgIC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZGRzRG9JdCA9IChvYiwgdG9Vbmljb2RlKSA9PiB7XG4gICAgLy8gb2IgaXMgYXJyYXkgPT4gcmV0dXJucyBzYW1lIG9iXG4gICAgLy8gb2IgaXMgb2JqZWN0ID0+IHJldHVybnMgbmV3IG9iXG4gICAgXG4gICAgdmFyIG5ld09iO1xuXG4gICAgaWYgKG9iICE9PSBudWxsICYmIHR5cGVvZiBvYiA9PT0gJ29iamVjdCcgJiYgIShvYi5oYXNPd25Qcm9wZXJ0eSAoJ19ic29udHlwZScpICYmIG9iLl9ic29udHlwZSA9PT0gJ09iamVjdElEJykpIHtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSAob2IpKSB7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2IubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIG9iIFtpXSA9IF8uZGRzRG9JdCAob2IgW2ldLCB0b1VuaWNvZGUpO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IG9iLmxlbmd0aDsgaSsrKVxuXG4gICAgICAgICAgICBuZXdPYiA9IG9iO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIG5ld09iID0ge307XG5cbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMgKG9iKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXMgW2ldO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IG9iW2tleV07XG4gICAgXG4gICAgICAgICAgICAgICAgdmFyIG5ld0tleTtcblxuICAgICAgICAgICAgICAgIGlmICh0b1VuaWNvZGUpIHtcblxuICAgICAgICAgICAgICAgICAgICBuZXdLZXkgPSBrZXkucmVwbGFjZSAoL1xcJC9nLCAnXFxcXHVGRjA0Jyk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0tleSA9IG5ld0tleS5yZXBsYWNlICgvXFwuL2csICdcXFxcdUZGMEUnKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3S2V5ID0ga2V5LnJlcGxhY2UgKC9cXFxcdUZGMDQvZywgJyQnKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3S2V5ID0gbmV3S2V5LnJlcGxhY2UgKC9cXFxcdUZGMEUvZywgJy4nKTtcblxuICAgICAgICAgICAgICAgIH0gLy8gZW5kIGlmICh0b1VuaWNvZGUpXG4gICAgXG4gICAgICAgICAgICAgICAgbmV3T2IgW25ld0tleV0gPSBfLmRkc0RvSXQgKHZhbCwgdG9Vbmljb2RlKTtcbiAgICBcblxuICAgICAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzOyBpKyspXG4gICAgICAgICAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSlcbiAgICAgICAgXG4gICAgICAgICAgICBcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIG5ld09iID0gb2I7XG5cbiAgICB9IC8vIGVuZCBpZiAob2IgPT09IG51bGwgfHwgdHlwZW9mIG9iICE9PSAnb2JqZWN0JylcblxuXG4gICAgcmV0dXJuIG5ld09iO1xuXG59OyAgLy8gZW5kIF8uZGRzRG9JdCBcblxuXG4gICAgLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kb2xsYXJEb3RTdWJVbmljb2RlID0gKG9iKSA9PiB7XG4gICAgXG4gICAgcmV0dXJuIF8uZGRzRG9JdCAob2IsIHRydWUpO1xuXG59OyAgLy8gZW5kIGRvbGxhckRvdFN1YlVuaWNvZGUgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZG9sbGFyRG90U3ViVW5pY29kZVJlc3RvcmUgPSAob2IpID0+IHtcbiAgICBcbiAgICByZXR1cm4gXy5kZHNEb0l0IChvYiwgZmFsc2UpO1xuXG59OyAgLy8gZW5kIGRvbGxhckRvdFN1YlVuaWNvZGVSZXN0b3JlXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAucENoZWNrID0gKHAsIHBEZWZhdWx0KSA9PiB7XG4gICAgLy8gZGl0Y2hlcyBhbnkgcGFyYW1ldGVycyBzdXBwbGllZCBpbiBwIHRoYXQgYXJlbid0IHByZXNlbnQgaW4gcERlZmF1bHRcbiAgICAvLyBpZiBhIHBhcmFtIGlzIG5lY2Vzc2FyeSB0byBhIHJvdXRpbmUsIHRoZW4gaXQgc2hvdWxkIGJlIGRlZmluZWQgaW4gcERlZmF1bHRcbiAgICBcbiAgICB2YXIgcmVzID0ge307XG5cbiAgICBwID0gUC5pc09iIChwKSA/IHAgOiB7fTtcbiAgICBcbiAgICBmb3IgKHZhciBrZXkgaW4gcERlZmF1bHQpIHtcblxuICAgICAgICByZXMgW2tleV0gPSBwLmhhc093blByb3BlcnR5IChrZXkpID8gcCBba2V5XSA6IHBEZWZhdWx0IFtrZXldO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLnBDaGVjayBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5pc09iID0gKG9iKSA9PiB7XG4gICAgLy8gcmV0dXJucyB0cnVlIGlmIG9iIGlzIGRlZmluZWQsIG5vdCBudWxsLCBub3QgYW4gQXJyYXkgYW5kIG9mIHR5cGUgb2JqZWN0XG4gICAgXG4gICAgdmFyIHJlcyA9IHR5cGVvZiBvYiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgIG9iICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICFBcnJheS5pc0FycmF5IChvYikgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIG9iID09PSAnb2JqZWN0JztcblxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLmlzT2IgXG5cblxuUC5rZXkxID0gXy5rZXkxO1xuXG4gICAgLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbnJldHVybiBQO1xuXG59KCkpO1xuXG5cblxuIiwiLy8gZ28td3MtY2xpZW50L2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlwLCBwb3J0LCBjbGllbnQsIG9wdGlvbnMpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuICAgIFxuICAgIGlwOiBpcCxcbiAgICBwb3J0OiBwb3J0LFxuICAgIHNlY3VyZUNvbm5lY3Rpb246IG51bGwsXG4gICAgdmVyYm9zZTogbnVsbCxcblxuICAgIHV0OiByZXF1aXJlICgnZ28tdXRpbCcpLFxuICAgIHBjaGVjazogbnVsbCxcbiAgICBrZXkxOiBudWxsLFxuXG4gICAgd3NTZXJ2ZXI6IG51bGxcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5pbml0ID0gKCkgPT4ge1xuXG4gICAgXy5wY2hlY2sgPSBfLnV0LnBDaGVjaztcbiAgICBfLmtleTEgPSBfLnV0LmtleTE7XG5cbiAgICB2YXIgcGFyYW1zID0gXy5wY2hlY2sgKG9wdGlvbnMsIHtzZWN1cmVDb25uZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgdmVyYm9zZTogZmFsc2V9KTtcblxuICAgIF8uc2VjdXJlQ29ubmVjdGlvbiA9IHBhcmFtcy5zZWN1cmVDb25uZWN0aW9uO1xuICAgIF8udmVyYm9zZSA9IHBhcmFtcy52ZXJib3NlO1xuXG4gICAgaWYgKF8udmVyYm9zZSkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nICgnd3NDbGllbnQgcGFyYW1zOiAnICsgSlNPTi5zdHJpbmdpZnkgKHBhcmFtcykgKyAnXFxuJyk7XG5cbiAgICB9IC8vIGVuZCBpZiAoXy52ZXJib3NlKVxuICAgIFxuICAgIF8udHN0Q21kcyA9ICB7cGluZzogXy50c3RDbWRQaW5nUmVzcH07XG4gICAgXy5jbGllbnQgPSBjbGllbnQgPyBjbGllbnQgOiBfLnJlcG9ydE1zZ09iO1xuXG4gICAgdmFyIHdzUHJlZml4ID0gXy5zZWN1cmVDb25uZWN0aW9uID8gJ3dzcycgOiAnd3MnO1xuICAgIHZhciB3c1VybCA9IHdzUHJlZml4ICsgJzovLycgKyBfLmlwICsgJzonICsgXy5wb3J0O1xuXG4gICAgXy53c1NlcnZlciA9IG5ldyBXZWJTb2NrZXQgKHdzVXJsKTtcblxuICAgIF8ud3NTZXJ2ZXIub25tZXNzYWdlID0gXy5mcm9tU3J2cjtcbiAgICBfLndzU2VydmVyLm9uY2xvc2UgPSBfLm1zZ0Nsb3NlO1xuICAgIF8ud3NTZXJ2ZXIub25lcnJvciA9IF8ubXNnRXJyb3I7XG5cbn07IC8vIGVuZCBfLmluaXQgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZG9DbWQgPSAodU1zZ09iKSA9PiB7XG5cbiAgICB2YXIgZnJvbVNydnIgPSBKU09OLnN0cmluZ2lmeSAodU1zZ09iKTtcblxuICAgIGlmIChfLnZlcmJvc2UpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nICgnICA9PT4gd3NDbGllbnQuZnJvbVNydnI6ICcgKyBmcm9tU3J2cik7XG5cbiAgICB9IC8vIGVuZCBpZiAoXy52ZXJib3NlKVxuICAgIFxuICAgIHVNc2dPYiA9IEFycmF5LmlzQXJyYXkgKHVNc2dPYikgPyB1TXNnT2IgOiBbdU1zZ09iXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdU1zZ09iLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIG1zZ09iID0gdU1zZ09iIFtpXTtcblxuICAgICAgICB2YXIgY21kID0gXy5rZXkxIChtc2dPYik7XG4gICAgXG4gICAgICAgIGlmIChfLnRzdENtZHMuaGFzT3duUHJvcGVydHkgKGNtZCkpIHtcbiAgICBcbiAgICAgICAgICAgIF8udHN0Q21kcyBbY21kXSAobXNnT2IgW2NtZF0pO1xuICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgXy5jbGllbnQgKG1zZ09iKTtcbiAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKF8udHN0Q21kcy5oYXNPd25Qcm9wZXJ0eSAoY21kKSlcbiAgICBcbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IHVNc2dPYi5sZW5ndGg7IGkrKylcblxufTsgLy8gZW5kIF8uZG9DbWQgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5kb1NlbmQgPSAobXNnKSA9PiB7XG5cbiAgICBpZiAoXy52ZXJib3NlKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2cgKCdfLmRvU2VuZC5tc2c6ICcgKyBtc2cgKyAnXFxuJyk7XG5cbiAgICB9IC8vIGVuZCBpZiAoXy52ZXJib3NlKVxuICAgIFxuICAgIF8ud3NTZXJ2ZXIuc2VuZCAobXNnKTtcblxufTsgLy8gZW5kIF8uZG9TZW5kIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmZyb21TcnZyID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgdmFyIG1zZyA9IGV2ZW50LmRhdGE7XG5cbiAgICBpZiAoXy52ZXJib3NlKSB7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyAoJ18uZnJvbVNydnIuZXZlbnQuZGF0YTogJyArIG1zZyk7XG5cbiAgICB9IC8vIGVuZCBpZiAoXy52ZXJib3NlKVxuICAgIFxuICAgIF8uZG9DbWQgKEpTT04ucGFyc2UgKG1zZykubSk7XG5cbn07IC8vIGVuZCBfLmZyb21TcnZyIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5tc2dDbG9zZSA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIGNvbnNvbGUubG9nICgnY2xvc2UgZXZlbnQ6ICcgKyBldmVudC5kYXRhKTtcblxufTsgLy8gZW5kIF8ubXNnQ2xvc2UgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8ubXNnRXJyb3IgPSAoZXZlbnQpID0+IHtcbiAgICBcbiAgICB2YXIgZXZlbnRNc2cgPSBldmVudC5kYXRhID8gJyBldmVudC5kYXRhOiAnICsgZXZlbnQuZGF0YSA6IFwiXCI7XG4gICAgXG4gICAgdmFyIGVyck1zZyA9ICd3c0NsaWVudCBtc2dFcnJvciAoU2VydmVyIGlzIERvd24/KScgKyBldmVudE1zZztcbiAgICBjb25zb2xlLmxvZyAoZXJyTXNnKTtcblxuICAgICQoJ2JvZHknKS5wcmVwZW5kIChlcnJNc2cpO1xuXG59OyAvLyBlbmQgXy5tc2dDbG9zZSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5yZXBvcnRNc2dPYiA9IChtc2dPYikgPT4ge1xuICAgIFxuICAgIGNvbnNvbGUubG9nICgnXy5yZXBvcnRNc2dPYi5tc2dPYjogJyArIG1zZ09iICsgJ1xcbicpO1xuXG59OyAvLyBlbmQgXy5yZXBvcnRNc2dPYiBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy50c3RDbWRQaW5nUmVzcCA9IChwaW5nTXNnKSA9PiB7XG4gICAgXG4gICAgY29uc29sZS5sb2cgKCdwaW5nOiAnICsgcGluZ01zZyk7XG4gICAgcmV0dXJuO1xuXG59OyAvLyBlbmQgXy50c3RDbWRQaW5nUmVzcCBcblxuXy5pbml0ICgpO1xuXG5cblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnAudG9TcnZyID0gKG1zZ09iKSA9PiB7XG4gICAgXG4gICAgdmFyIG1zZ09iUyA9IEpTT04uc3RyaW5naWZ5ICh7bTptc2dPYn0pO1xuXG4gICAgaWYgKF8udmVyYm9zZSkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nICgncC50b1NydnIubXNnT2JTIDogJyArIG1zZ09iUyArICdcXG4nKTtcblxuICAgIH0gLy8gZW5kIGlmIChfLnZlcmJvc2UpXG4gICAgXG4gICAgXy5kb1NlbmQgKG1zZ09iUyk7XG5cbn07IC8vIGVuZCBfLnRvU3J2ciBcblxuXG5yZXR1cm4gcDtcblxufTtcblxuXG5cbiIsIi8vIGtleTEuanNcblxuLy8ga2V5MSBleHRyYWN0cyB0aGUgc2luZ2xlIGtleSBmcm9tIGFuIG9iamVjdCBcbi8vIGNvbnRhaW5pbmcgb25seSBvbmUga2V5L3ZhbHVlIHBhaXJcbi8vIGFuZCByZXR1cm5zIHRoZSBzdHJpbmcgdmFsdWUgZm9yIHRoZSBrZXlcbi8vIGFueXRoaW5nIGVsc2UgcGFzc2VkIHRvIGtleTEgcmV0dXJucyBudWxsXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnZhciBrZXkxID0gKG9iKSA9PiB7XG5cbiAgICBrZXkgPSBudWxsO1xuXG4gICAgdmFyIHVuaXF1ZUtleUV4aXN0cyA9IHR5cGVvZiBvYiAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2IgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkob2IpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvYiA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMob2IpLmxlbmd0aCA9PT0gMTtcbiAgICBcbiAgICBpZiAodW5pcXVlS2V5RXhpc3RzKSB7XG4gICAgXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2IpO1xuICAgICAgICBrZXkgPSBrZXlzWzBdO1xuICAgIFxuICAgIH0gLy8gZW5kIGlmICh1bmlxdWVLZXlFeGlzdHMpXG4gICAgXG4gICAgcmV0dXJuIGtleTtcbiAgICBcbn07IC8vIGVuZCBrZXkxIFxuXG5yZXR1cm4ga2V5MTtcblxufSgpKTtcbiJdfQ==
