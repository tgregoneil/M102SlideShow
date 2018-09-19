(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// cmdrInit.js

module.exports = (function () {

// PRIVATE Properties/Methods
var v = {
}; // end PRIVATE properties
var f={};

f.init = () => {

    var c = require ('./slideShow.js');
    new c ();
};  // end f.init

// PUBLIC Properties/Methods
var P = {};

// end PUBLIC section

(function () {

    $(document).ready (f.init);

}) ();



return P;

}) ();






},{"./slideShow.js":2}],2:[function(require,module,exports){
// slideShow.js

module.exports = function () {

// PRIVATE Properties/Methods
var v = {

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
var f={};

f.init = () => {

    v.dpp = v.j2h.displayPage;
    v.genId = v.j2h.genId;

    v.pi = new v.pi (v.j2h);

    var  gt = window.location.href;

    var ipSrc = gt.match (/github/) ? v.srvAws : 'localhost';
    //var ipSrc = v.srvAws;
    v.ws = new v.ws (ipSrc, 8001, P.doAction);

    new v.key ('body', false, f.keyFilter);
};  // end f.init

//---------------------
f.initBookmarks = () => {

    v.bookmarkLst = [];
    f.bookmarksFromCookie ();

    var id = v.genId ();
    var addB = {span: 'add bookmark', id: id, class: 'bookmark'};
    v.IdAddB = '#' + id;

    var id = v.genId ();
    var delB = {span: 'del bookmark', id: id, class: 'bookmark'};
    v.IdDelB = '#' + id;

    var id = v.genId ();
    var bookS = {div: 0, id: id};
    v.IdBookS = '#' + id;

    v.IdBookmarkS = v.dpp ({div: [addB, delB, bookS], class: 'bookmarks novis', parent: v.IdBookmark});

    $(v.IdAddB + ',' + v.IdDelB)
    .hover (
        function () {
            $(this)
            .css ({color: 'red'});
        },
        function () {
            $(this)
            .css ({color: 'black'});
    });

    $(v.IdAddB)
    .click (function () {
        v.bookmarks [v.curVis] = 1;
        f.bookmarksToCookie ();
        f.bookmarksShow ();
    })

    $(v.IdDelB)
    .click (function () {
        delete v.bookmarks [v.curVis];
        f.bookmarksToCookie ();
        f.bookmarksShow ();
    })

}; // end f.initBookmarks


//---------------------
f.initStyle = () => {

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

        v.dpp (style);

}; // end f.initStyle


//---------------------
f.bookmarkAdd = (slide) => {

    var bookmark = v.bookmarkLst [slide].replace (/-(.*)_/, '    $1    ');
    var Id = v.dpp ({pre: bookmark, parent: v.IdBookS, name: slide, class: 'bookmark'})

    $(Id)
    .click (function () {
        var n = $(this).attr ('name');
        f.setNextVis (n - v.curVis);

        $(v.IdBookmarkS)
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


}; // end f.bookmarkAdd


//---------------------
f.bookmarksShow = () => {

    if (v.bookmarks.hasOwnProperty (v.curVis)) {

        $(v.IdDelB)
        .removeClass ('novis');

        $(v.IdAddB)
        .addClass ('novis');

    } else {

        $(v.IdDelB)
        .addClass ('novis');

        $(v.IdAddB)
        .removeClass ('novis');

    } // end if (v.bookmarks.hasOwnProperty (v.curVis))

    $(v.IdBookS)
    .empty ();

    var slides = Object.keys (v.bookmarks).sort (function compareNumbers(a, b) {
        return a - b;
    });

    if (slides.length > 0) {

        v.dpp ({div: 'Week Topic SlideNum', parent: v.IdBookS, class: 'bookmark bookmarkheader'});

    } // end if (slides.length > 0)
    
    for (var i = 0; i < slides.length; i++) {

        var slide = slides [i];
        f.bookmarkAdd (slide);

    } // end for (var i = 0; i < slides; i++)

    $(v.IdBookmarkS)
    .removeClass ('novis')
        // actually show the bookmark

    .hover (function () {
        // bookmarks initially positioned under cursor, so nothing to do for hover-in

    }, function () {
        $(this)
        .addClass ('novis')
    })




}; // end f.bookmarksShow


//---------------------
f.bookmarksFromCookie = () => {
    
    var bookmarksSfied = document.cookie.match (/m102bookmarks=([^;]+)/);

    v.bookmarks = !bookmarksSfied ?  {} : JSON.parse (bookmarksSfied [1]);

}; // end f.bookmarksFromCookie


//---------------------
f.bookmarksToCookie = () => {
    
    var cookie = 'm102bookmarks=' + JSON.stringify (v.bookmarks) + '; expires=Thu, 1 Jan 2030 00:00:00 UTC; path=/';
    document.cookie = cookie;

}; // end f.bookmarksToCookie


//---------------------
f.displayNav = () => {

    var navSpans = [{span: '>', id: 'navr', class: 'nav'},
    {span: '<', id: 'navl', class: 'nav'}];

    navSpans.parent = v.IdNavPN;

    v.dpp (navSpans);

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
            f.setNextVis (-1);
    });

    $('#navr')
    .click (
        function () {
            f.setNextVis (1);
    });


}; // end f.displayNav


//---------------------
f.displayPngFiles = (vals) => {

    v.curVis = 0;
    v.maxImages = vals.length - 1;
        // last val in vals is an empty string, so don't count it

    var weeks = {};
    var topics;

    v.ctI = [];
    v.topicsI = [];
    v.topicRefs = [];
    v.slideToVideo = [];

    for (var i = 0; i < v.maxImages; i++) {

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

        divOb.parent = v.IdSlides;
        v.dpp (divOb);

        matched = loc.match (/W(\d)(.*?)\/(.*)/);

        var wid = 'W' + matched [1];
        var week = wid + matched [2];
        var topic = matched [3];

        var videoTopic = wid + '-' + topic;
        v.slideToVideo.push (v.topicToVideo [videoTopic]);

        if (!weeks.hasOwnProperty (week)) {

            f.displayRef (wid, week, i, 'week');
            weeks [week] = 1;
            topics = {};

        } // end if (!weeks.hasOwnProperty (week))

        var slideCount;
        if (!topics.hasOwnProperty (topic)) {

            var dispRef = f.displayRef (wid, topic, i, 'topic');
            v.topicRefs.push (dispRef);

            if (topic === '05_StorageEngineWiredTiger') {

                v.IdSampleTopic = dispRef;

            } // end if (topic === '01_WelcomeWeek3')

            topics [topic] = 1;

            slideCount = 1;
            v.topicsI.push (slideCount);

        } else {

            slideCount++;
            v.topicsI [v.topicsI.length - 1] = slideCount;

        } // end if (!topics.hasOwnProperty (topic))

        var bookmarkName = videoTopic + '_' + slideCount;;
        v.bookmarkLst.push (bookmarkName);

        v.ctI.push ([slideCount, v.topicsI.length - 1]);


    } // end for (var i = 0; i < vals; i++)

    f.setNextVis (0);

}; // end f.displayPngFiles


//---------------------
f.displayRef = (wid, str, i, className) => {

    wid = '#' + wid;
    var ref = v.genId ();
    v.dpp ({div:
        {div: str,
         id: ref,
         sl: i,
         style: 'display:inline-block; cursor: pointer; cursor: hand;'
     }, parent: wid, class: 'ref w700 ' + className});

    ref = '#' + ref;
    $(ref)
    .click (function () {
        var n = $(this).attr ('sl');
        f.setNextVis (n - v.curVis);
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

}; // end f.displayRef


//---------------------
f.doSlideShow = (vals) => {

    f.layout ();
    f.displayNav ();
    f.displayPngFiles (vals);

    $(v.IdVideo)
    .hover (function () {
        $(this)
        .attr ({style: 'color: red;'})
    },
    function () {
        $(this)
        .attr ({style: 'color: blue'})
    })
    .click (f.playVideo);

    v.pi.createPopupDisplay ('#navr',
        'Click Prev/Next Slide\n    -- or --\n(keyboard shortcuts)\nLeft/Right Arrow\nSpace/Backspace');
    v.pi.createPopupDisplay (v.IdSampleTopic,
        'Click to navigate directly\nto beginning of topic');
    v.pi.createPopupDisplay (v.IdCurSlide,
        'Current slide In topic/\nTotal slides in topic');
    v.pi.createPopupDisplay (v.IdVideo,
        'Click to start\nplaying lesson video');

    $(v.IdHelp)
    .hover (function () {
        $(this)
        .css ({'background-color': '#ffa0a0'});

        v.pi.showPopups ();
    }, function () {
        $(this)
        .css ({'background-color': '#0e0'});

        v.pi.hidePopups ();
    });

    $(v.IdBookmark)
    .hover (function () {
        $(this)
        .css ({'background-color': '#ffa0a0'});
        f.bookmarksShow ();

    }, function () {
        $(this)
        .css ({'background-color': '#0e0'});

    });

}; // end f.doSlideShow

//---------------------
f.keyFilter = (chob) => {
    //console.log ('chob: ' + JSON.stringify (chob) + '\n');

    var ch = chob.ch;
    if (ch === 'Right' || ch === ' ') {

        f.setNextVis (1);

    } else if (ch === 'Left' || ch === 'Backspace') {

        f.setNextVis (-1);

    } // end if (chob.ch === 'Right')


}; // end f.keyFilter


//---------------------
f.layout = () => {

    var IdContainer = v.dpp ({div: 0, class: 'w700 m10'});

    var idBookmark = v.genId ();

    var idHelp = v.genId ();
    v.dpp ({div:
        {h4: [
            'Slideshow M102: MongoDB for DBAs (Jan/Feb 2017)',
            {div: {span: '?', class: 'symbol'}, id: idHelp, class: 'symbolwrap'},
            {div: {span: 'B', class: 'symbol'}, id: idBookmark, class: 'symbolwrap', style: 'margin-right: 10px;'}
        ], class: 'header'},
        class: 'row w700',
        parent: IdContainer}
    );

    v.IdBookmark = '#' + idBookmark;
    f.initBookmarks ();

    v.IdHelp = '#' + idHelp;

    v.IdSlides = v.dpp ({div: 0, name: 'slides', class: 'row w700 prel', parent: IdContainer});

    var IdNav = v.dpp ({div:0, name: 'nav', class: 'row w700 prel t40', parent: IdContainer});

    var IdVideoDiv = v.dpp ({div:0, class: 'col-sm-7', parent: IdNav});
    v.IdVideo = v.dpp ({span: 'Video', parent: IdVideoDiv, class: 'navpos video'});

    v.IdPageCt = v.dpp ({div:0, class: 'col-sm-2', parent: IdNav});

    v.IdNavPN = v.dpp ({div:0, class: 'col-sm-3', parent: IdNav});

    var IdTopicRows = v.dpp ({div:0, name: 'topicRows', parent: IdContainer, class: 'w700 prel t40'});

    var IdRow1 = v.dpp ({div: 0, name: 'topicRows1', class: 'row topicrows', parent: IdTopicRows})
    var IdRow2 = v.dpp ({div: 0, name: 'topicRows2', class: 'row topicrows', parent: IdTopicRows})

    f.makeCols (0, IdRow1, 4);
    f.makeCols (4, IdRow2, 3);

}; // end f.layout


//---------------------
f.makeCols = (baseId, IdRow, numCols) => {

    var cols = [];
    for (var i = 0; i < numCols; i++) {

        var id = 'W' + (i + 1 + baseId);
        cols.push ({div: 0, id: id, class: 'cols col-sm-3', parent: IdRow});

    } // end for (var i = 0; i < 4; i++)

    v.dpp (cols);

}; // end f.makeCols


//---------------------
f.playVideo = () => {

    v.hiddenSlide = '#j' + v.curVis;

    $(v.hiddenSlide + '> img')
    .addClass ('novis');

    $(v.hiddenSlide + '> .caption')
    .addClass ('novis');

    $(v.IdVideo)
    .text ('Slide')
    .off ('click')
    .click (f.restoreSlide);

    var src = 'https://www.youtube.com/embed/' + v.slideToVideo [v.curVis] + '?autoplay=1';
    v.IdVideoPlaying = v.dpp ({iframe: 0, src: src, class: 'imgvideo', parent: v.hiddenSlide, prepend: 1});

}; // end f.playVideo


//---------------------
f.restoreSlide = () => {

    $(v.IdVideoPlaying)
    .remove ();

    $(v.hiddenSlide + '> img')
    .removeClass ('novis');

    $(v.hiddenSlide + '> .caption')
    .removeClass ('novis');

    $(v.IdVideo)
    .text ('Video')
    .off ('click')
    .click (f.playVideo);

    v.hiddenSlide = null;

}; // end f.restoreSlide

//---------------------
f.setNextVis = (delta) => {

    if (v.hiddenSlide) {

        f.restoreSlide ();

    } // end if (v.hiddenSlide)

    var mdelta = delta >= 0 ? delta : v.maxImages + delta

    var nextVis = (v.curVis + mdelta) % v.maxImages;

    var IdPrev = '#j' + v.curVis;
    var IdNext = '#j' + nextVis;

    $(IdPrev)
    .addClass ('novis');

    $(IdNext)
    .removeClass ('novis');

    v.curVis = nextVis;

    var ctRef = v.ctI [nextVis];

    var slideI = ctRef [0];
    var topicIdx = ctRef [1];
    var totalInSection = v.topicsI [topicIdx];

    v.dpp ({empty: v.IdPageCt});
    v.IdCurSlide = v.dpp ({span: 'slide: ' + slideI + '/' + totalInSection,
        parent: v.IdPageCt,
        class: 'navpos'});

    $(v.topicRef)
    .css (
        {'background-color': '#fff',
        'font-weight': 'normal'}
    );

    v.topicRef = v.topicRefs [topicIdx];

    $(v.topicRef)
    .css (
        {'background-color': '#d6ffd6',
        'font-weight': 'bold'}
    );

}; // end f.setNextVis


//---------------------
f.topicToVideoId = (aTagA) => {

    v.topicToVideo = {};
    for (var i = 0; i < aTagA.length; i++) {

        var aTag = aTagA [i];
        var m = aTag.match (/.*youtu.be.([^"]+)">([^<]+)</);
        if (m) {

            var videoId = m [1];
            var topic = m [2];

            v.topicToVideo [topic] = videoId;

        } // end if (m)


    } // end for (var i = 0; i < aTagA; i++)


}; // end f.topicToVideoId



// PUBLIC Properties/Methods
var P = {};

//---------------------
P.doAction = (msgOb) => {
    console.log ('msgOb: ' + JSON.stringify (msgOb) + '\n');

    var cmd = v.key1 (msgOb.m);
    var vals = msgOb.m [cmd];

    switch (cmd) {

        case 'ready':

            f.initStyle ();
            v.ws.toSrvr ({getVideoLinks:1});
            break;

        case 'videoLinks':

            f.topicToVideoId (vals);
            v.ws.toSrvr ({getPngFiles:1});
            break;

        case 'pngFiles':

            $('body')
            .empty ();

            f.doSlideShow (vals);

            break;

    } // end switch (cmd)



}; // end P.doAction


// end PUBLIC section

f.init ();

return P;

};




},{"go-json2html":3,"go-key":4,"go-popinfo":6,"go-ws-client":8,"key1":9}],3:[function(require,module,exports){
// go-j2h/index.js

module.exports = (function () {

// PRIVATE Properties/Methods
var v = {

    id: 0,
    primitiveTypesNotNull: {'string':1, 'number':1, 'boolean':1, 'symbol': 1},
        // since typeof null yields 'object', it's handled separately

    msgTypes: {

        primary: {
                // void tags
            area: 0, base: 0, br: 0, col: 0, embed: 0, hr: 0, img: 0, input: 0, keygen: 0, link: 0, meta: 0, param: 0, source: 0, track: 0, wbr: 0, 

                // non-void tags
            a: 1, abbr: 1, address: 1, article: 1, aside: 1, audio: 1, b: 1, bdi: 1, bdo: 1, blockquote: 1, body: 1, button: 1, canvas: 1, caption: 1, cite: 1, code: 1, colgroup: 1, datalist: 1, dd: 1, del: 1, details: 1, dfn: 1, dialog: 1, div: 1, dl: 1, dt: 1, em: 1, fieldset: 1, figcaption: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, head: 1, header: 1, hgroup: 1, html: 1, i: 1, iframe: 1, ins: 1, kbd: 1, label: 1, legend: 1, li: 1, map: 1, mark: 1, menu: 1, meter: 1, nav: 1, noscript: 1, object: 1, ol: 1, optgroup: 1, option: 1, output: 1, p: 1, pre: 1, progress: 1, q: 1, rp: 1, rt: 1, ruby: 1, s: 1, samp: 1, script: 1, section: 1, select: 1, small: 1, span: 1, strong: 1, style: 1, sub: 1, summary: 1, sup: 1, svg: 1, table: 1, tbody: 1, td: 1, textarea: 1, tfoot: 1, th: 1, thead: 1, time: 1, title: 1, tr: 1, u: 1, ul: 1, 'var': 1, video: 1,
        },

        secondary: {style: 1},
            // elements that can be either a primary tag itself or an attribute of another primary tag
            // if any other primary tags is present, then secondary tags are treated as
            // attributes of the other primary tag

        meta: {
            empty: 1, rm: 1, 
            prepend: 1, append: 1, before: 1, after: 1, parent: 1,
            attr: 1, content: 1, text: 1, 
        },

    },

    msg0: require ('go-msg'),
    msg: null,

}; // end PRIVATE properties
var f={};

//---------------------
f.init = () => {
    
    v.msg = new v.msg0 (v.msgTypes);

}; // end f.init


//---------------------
f.attr = (selector, attr) => {
    
    $(selector)
    .attr (attr);

}; // end f.attr 


//---------------------
f.empty = (selector) => {
    
    $(selector)
    .empty ()
    .off ('keydown');

}; // end f.empty 



//---------------------
f.rm = (selector) => {

    $(selector)
    .remove ();

}; // end f.rm


//---------------------
f.displayObH = (parent, dispOb) => {
    
        // ----  doArray ----
    var doArray = function (dispOb) {

        var Ids = [];
        for (var i = 0; i < dispOb.length; i++) {

            Ids.push (f.displayObH (parent, dispOb [i]));

        } // end for (var i = 0; i < dispOb.length; i++)

        //return Ids;
        return Ids [Ids.length - 1];
        
    };  // end doArray 

        // ----  doObject ----
    var doObject = function (dispOb) {

        var dispObParsed = v.msg.parseMsg (dispOb);

        var primaryKey = dispObParsed.p;

        var meta = dispObParsed.m;

        var delKey = null;
        var relLoc = 'append';

        var attr = null;
        var content = null;
        var text = null;

        if (meta.hasOwnProperty ('parent')) {
            // ensures processing of 'parent' before remainder of meta keys

            parent = meta.parent;
            delete meta.parent;

        } // end if (meta.hasOwnProperty ('parent'))
        
        var metaKeys = Object.keys (meta);
        for (var idx = 0; idx < metaKeys.length; idx++) {

            var key = metaKeys [idx];
            switch (key) {

                case 'empty':
                case 'rm':
                    delKey = key;
                    parent = meta [key];
                    break;

                case 'attr':
                    attr = meta.attr;
                    break;

                case 'content':
                    content = meta.content;
                    break;
                case 'text':
                    text = meta.text;
                    break;

                case 'prepend':
                case 'append':
                case 'before':
                case 'after':
                    relLoc = key;
                    var val = meta [key];
                    var doParent = val !== 1 && val !== true;
                    parent = doParent ? val : parent;
                        // if val is other than 1 or true, relLoc overrides both parent values passed 
                        // into displayObH and defined by optional parent attribute
                    break;

            } // end switch (key)
            

        } // end for (var idx = 0; idx < metaKeys.length; idx++)
        

        Id = null;

        if (delKey) {

            f [delKey] (parent);

        } else if (attr) {

            f.attr (parent, attr);

        } else if (content) {
            // replaces entire content of parent with new content

            $(parent)
            .empty ();

            f.displayObH (parent, content);
                // without emptying first, will simply append content to existing content

        } else if (text) {

            Id = f.textMake (parent, relLoc, text);

        } else {

            Id = f.elementMake (parent, relLoc, primaryKey, dispObParsed.c, dispObParsed.s);

        } // end if (delKey)

        return Id;
        
    };  // end doObject 



       // ---- main ----
    var Id;
    var dispObType = typeof dispOb;

    if (dispObType === 'undefined' || dispOb === 0 || dispOb === null) {

        Id = null;

    } else if (v.primitiveTypesNotNull.hasOwnProperty (dispObType)) {

        Id = f.textMake (parent, 'append', dispOb);
            // if text should be placed at other than 'append' location, then use
            // 'text' tag and specify prepend, after or before as needed

    } else if (Array.isArray (dispOb)) {

        Id = doArray (dispOb);

    } else if (dispObType == 'object') {

        Id = doObject (dispOb);

    } else {

        Id = null;

    } // end if (typeof dispOb === 'undefined' || dispOb === 0 || dispOb === null)
    
    return Id;

}; // end f.displayObH 

//---------------------
f.elementMake = (parentOrSiblId, relLoc, elName, content, attrs) => {
    
    var id;
    var attrKeys = Object.keys (attrs);
    var hasAttrs = attrKeys.length > 0;

    if (hasAttrs && attrs.hasOwnProperty ('id')) {

        id = attrs.id;

    } else {

        id = P.genId ();

    } // end if (hasAttrs)
    
    var Id = '#' + id;
    
    if (elName === 'script' && content !== 0) {
        // https://stackoverflow.com/questions/9413737/how-to-append-script-script-in-javascript
        // inspired by SO question, but setting innerHTML isn't supposed to work
        // therefore, set src attribute with path to file, instead of 
        // setting innerHTML to content of file

        // https://stackoverflow.com/questions/610995/cant-append-script-element
        // jQuery won't add script element as it does with any other element.  Therefore, must be done
        // using only javascript as follows:
        var script = document.createElement("script");

        script.src = content;
        script.id = attrs.id;
        
        document.head.appendChild(script);     

    } else {

        var divel = '<' + elName + ' id="' + id + '"';
    
        if (content) {
    
            divel += '></' + elName + '>';
    
        } else {
    
            divel += '>';
    
        } // end if (content)
    
        $(parentOrSiblId)[relLoc] (divel);

    } // end if (elName === 'script')
    
    
    if (hasAttrs) {
        
        $(Id)
        .attr (attrs);

    } // end if (hasAttrs)

    f.displayObH (Id, content);
    
    if (elName === 'form') {

        $(parent)
        .focus ();

    } // end if (elName === 'form')
    
    return Id;

}; // end f.elementMake


//---------------------
f.textMake = (parent, relLoc, primitive) => {
    
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
    

    $(parent) [relLoc] (primitive);

    return null;
        // text obs have no id's: only text is appended with no way to address it
        // if addressing is necessary, use span instead of text

}; // end f.textMake 



// PUBLIC Properties/Methods
var P = {};

//---------------------
P.displayOb = (dispOb) => {
    
    var parent = 'body';
        // if parent not found, append to body

    if (typeof dispOb === 'object' && dispOb.hasOwnProperty ('parent')) {

        parent = dispOb.parent;

    } // end if (typeof dispOb === 'object' && dispOb.hasOwnProperty ('parent'))
    
    var Id = f.displayObH (parent, dispOb);

    return Id;

}; // end P.displayOb 

P.displayPage = P.displayOb;

//---------------------
P.genId = () => {

    var id = 'i' + v.id++;
    return id;

}; // end P.genId


//---------------------
P.genIds = () => {
    
    var id = P.genId ();
    var Id = '#' + id;

    return [id, Id];

}; // end P.genIds



// end PUBLIC section

f.init ();

return P;

}());




},{"go-msg":5}],4:[function(require,module,exports){
// go-key/index.js

module.exports = function (jqSelector, reportShift, keyDownHandler, reportUp, keyUpHandler) {

// PRIVATE Properties/Methods
var v = {

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
var f={};
//---------------------
f.init = () => {
    
    v.jqSelector = jqSelector ? jqSelector : 'body';
    v.reportShift = reportShift ? reportShift : false;
    v.keyDownHandler = keyDownHandler ? keyDownHandler : f.defaultHandler;
    v.reportUp = reportUp ? reportUp : false;
    v.keyUpHandler = keyUpHandler ? keyUpHandler : f.defaultHandler;

    //P.setKeyOn (v.jqSelector);
    P.setKeyOn ();
    if (typeof _m0 === 'undefined') {

        _m0 = {};

    } // end if (typeof _m0 === 'undefined')
    
    
    if (!_m0.keyEvents) {

        _m0.keyEvents = {};
        /*
            // override jquery's remove function to turn on all key handlers after removal of a form
        var rmOrig = $.fn.remove;
        $.fn.remove = function (){

            $(this)
            .has ('form')
            .each (function () {
                P.allKeysOn ();
            });

            rmOrig.apply (this, arguments);
        }
        */

    } // end if (!_m0.keyEvents)

    var keyEvents = _m0.keyEvents;
    keyEvents [v.jqSelector] = {on: P.setKeyOn, off: P.setKeyOff};
    

}; // end f.init

//---------------------
f.cKeyDown = (event) => {
    // callback is v.keyDownHndler
    // returns ch object reflecting which shift keys were pressed down, ch and which values
    //
    // v.reportShift true => trigger callback for each keydown event of any key, 
    //                       including any shift key
    //     false => shift key event reported only when the next non-shift keydown event.
    //              So, callback is only triggered for non-shift key events
    
    //console.log ('go-key.cKeyDown jqSelector: ' + v.jqSelector);

    var which = event.which;

        // never ignore 'Esc' key == 27
    if (v.kIgnore && which != 27) {

        return;

    } // end if (kIgnore)
    
    event.preventDefault();
    event.stopPropagation ();

    var isAShiftKey = true;
    switch (which) {

        case 16: 
            v.kShift = true;
            break;

        case 17: 
            v.kCtrl = true;
            break;

        case 18: 
            v.kAlt = true;
            break;

        case 91: 
        case 92: 
        case 93: 
        case 224:
            v.kCmd = true;
            break;

        default:
            isAShiftKey = false;
            break;

    }   

    f.cKeyUpDownFinish (isAShiftKey, which, v.keyDownHandler);

    if (!isAShiftKey) {

        v.kShift = false;
        v.kCtrl = false;
        v.kAlt = false;
        v.kCmd = false;

    } // end if (!isAShiftKey)
    

}; // end f.cKeyDown 


//---------------------
f.cKeyUp = (event) => {
    // callback is v.keyDownHndler
    
    var which = event.which;

        // never ignore 'Esc' key == 27
    if (v.kIgnore && which != 27) {

        return;

    } // end if (kIgnore)
    
    event.preventDefault();
    event.stopPropagation ();

    var isAShiftKey = true;
    switch (which) {

        case 16: 
            v.kShift = false;
            break;
        case 17: 
            v.kCtrl = false;
            break;
        case 18: 
            v.kAlt = false;
            break;
        case 91: 
        case 92: 
        case 93: 
        case 224: 
            v.kCmd = false;
            break;

        default:
            isAShiftKey = false;
            break;

    }   

    if (!v.reportUp) {

        return;

    } // end if (!reportUp)
    
    f.cKeyUpDownFinish (isAShiftKey, which, v.keyUpHandler);

}; // end f.cKeyUp 

//---------------------
f.cKeyUpDownFinish = (isAShiftKey, which, callback) => {
    
    if (isAShiftKey && !v.reportShift) {

        return;

    } // end if (isAShiftKey && !v.reportShift)
    
    var thisCh = f.getKeyCode (which);

    var chOb = ({
        shift: v.kShift,
        ctrl: v.kCtrl,
        alt: v.kAlt,
        macCmd: v.kCmd,
        which: which,
        ch: thisCh,
        isAShiftKey: isAShiftKey,
    });

    // console.log ('chOb: ' + JSON.stringify (chOb) + '\n');
    /*
    if (v.reportShift) {

        chOb.isAShiftKey = isAShiftKey;  
            // true if any of: shift, ctrl, alt, or macCmd are true
            // only relevant if v.reportShift is true

    } // end if (v.reportShift)
    */

    callback (chOb);

}; // end f.cKeyUpDownFinish 


//---------------------
f.defaultHandler = (chOb) => {
    
    var chObS = JSON.stringify (chOb);
    console.log ('go-key.defaultHandler.chOb: ' + chObS);

}; // end f.defaultHandler 



//---------------------
f.getKeyCode = (which) => {
    

    var ch;

    if (v.ctrlOrNonAscii.hasOwnProperty (which)) {

        ch = v.ctrlOrNonAscii [which];

    } else if (v.kShift && v.asciiShifted.hasOwnProperty (which)) {

        ch = v.asciiShifted [which];

    } else if (!v.kShift && v.asciiUnShifted.hasOwnProperty (which)) {

        ch = v.asciiUnShifted [which];

    } else {

        ch = null;

    } // end if 

    return ch;

}; // end f.getKeyCode 



//---------------------
f.initKeyDown = (jqSelector) => {
    
    $(jqSelector)
    .off('keydown')
    .keydown (function (event) {
        //console.log (' ==> initKeyDown');
        f.cKeyDown (event);
    });

}; // end f.initKeyDown 


//---------------------
f.initKeyUp = (jqSelector) => {
    
    $(jqSelector)
    .off('keyup')
    .keyup (function (event) {
        //console.log (' ==> initKeyUp');
        f.cKeyUp (event);
    });

}; // end f.initKeyUp 



// PUBLIC Properties/Methods
var P = {};

//---------------------
P.allKeysOff = () => {
    
    var keyEvents = _m0.keyEvents;
    var keySels = Object.keys (keyEvents);

    keySels.forEach (function (el) {

        keyEvents [el].off ();
    });

}; // end P.allKeysOff


//---------------------
P.allKeysOn = () => {
    
    var keyEvents = _m0.keyEvents;
    var keySels = Object.keys (keyEvents);

    keySels.forEach (function (el) {

        keyEvents [el].on ();
    });

}; // end P.allKeysOn


//---------------------
P.setKeyOff = () => {
    
        //console.log ('SETKEYOFF go-key.setKeyOff     jqSelector = ' + v.jqSelector);
    $(v.jqSelector)
    .off ('keydown')
    .off ('keyup');

}; // end P.setKeyOff


//---------------------
//P.setKeyOn = (jqSel) => {
P.setKeyOn = () => {
    
        //console.log ('SETKEYON go-key.setKeyOn   jqSelector = ' + v.jqSelector);
    //f.initKeyUp (jqSel);
    //f.initKeyDown (jqSel);
    f.initKeyUp (v.jqSelector);
    f.initKeyDown (v.jqSelector);

}; // end P.setKeyHandler

// end PUBLIC section

f.init ();

return P;

};

},{}],5:[function(require,module,exports){
// go-msg/index.js
// go-msg object has a unique primary msg and zero or more optional attributes


module.exports = function (p0) {

    // PRIVATE Properties
var v = {

    primary: null,
        // primary: {cmd: 1} (contains optional content) or {cmd: 0} (no optional content allowed)

    secondary: null,
        // if a primary message has an optional attribute that concidentally is the same as
        // another primary message, it should be have a key/value pair in secondary {attr: 1}
        // to ensure that it will be treated as an attribute in case a primary is present
        // Secondary is only tested if there exists a primary key

    meta: null,
        // meta parameters intended for ctrl or other purpose outside of primary and secondary msg
        // parameter usage

};  // end PRIVATE properties

    // PRIVATE Functions
f = {};


f.init = () => {

    v.primary = p0.primary;
    v.secondary = p0.hasOwnProperty ('secondary') ? p0.secondary : {};
    v.meta = p0.hasOwnProperty ('meta') ? p0.meta : {};
};

    // PUBLIC Functions
var P = {};

//---------------------
P.parseMsg = (msgOb) => {
    
    var res = {};
    var msgKeys = Object.keys (msgOb);

    var primaryCandidatesOb = {};
    var attrsOb = {};
    var metaOb = {};

    var key;
    for (var i = 0; i < msgKeys.length; i++) {

        key = msgKeys [i];
        
        if (v.primary.hasOwnProperty (key)) {

            primaryCandidatesOb [key] = 1;

        } else if (v.meta.hasOwnProperty (key)) {

            metaOb [key] = msgOb [key];

        } else {

            attrsOb [key] = msgOb [key];

        } // end if (v.primary.hasOwnProperty (key))
        
    } // end for (var i = 0; i < msgKeys.length; i++)

    var primaryCandidatesA = Object.keys (primaryCandidatesOb);

    var primaryKey;
    var content;

    if (primaryCandidatesA.length === 0) {

        primaryKey = null;

    } else if (primaryCandidatesA.length === 1) {

        primaryKey = primaryCandidatesA [0];

    } else {
        // handle primary/secondary key resolution

        primaryKey = null;
        for (key in primaryCandidatesOb) {

            if (v.secondary.hasOwnProperty (key)) {

                attrsOb [key] = msgOb [key];

            } else {

                if (primaryKey === null) {

                    primaryKey = key;

                } else {

                    res.err = 'Multiple primary keys found not in secondary object: ' + JSON.stringify (msg);

                } // end if (primaryKey === null)
                

            } // end if (v.secondary.hasOwnProperty (key))
            
        }

    } // end if (primaryCandidatesA.length === 0)


    if (!res.hasOwnProperty ('err')) {

        res.p = primaryKey;
        res.c = primaryKey && v.primary [primaryKey] !== 0 ? msgOb [primaryKey] : null;
            // example void html tag has zero content, so content is forced to null

        res.s = attrsOb;
        res.m = metaOb;

    } // end if (!res.hasOwnProperty ('err'))
    
    
    return res;

}; // end P.parseMsg 



    // end PUBLIC Functions

f.init ();

return P;

};




},{}],6:[function(require,module,exports){
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

    var popupStyle = [
        {rm: '#stylepopinfo'},
        {style: '.popup {' +
        'position: relative;' +
        'display: inline-block;' +
        'border: 1px solid blue;' +
        'border-radius: 4px;' +
        'background-color: #ebf2f2;' +
        'font-size: 12px;' +
    '}' +
    '.popupwrap {' +
        'position: absolute;' +
    '}' +
    '.popupnovis {' +
        'display: none;' +
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
    '}', 
    id: 'stylepopinfo', parent: 'head'}
    ];

    _.dpp (popupStyle);

}; // end _.setPopupStyle





// PUBLIC Properties/Methods
var P = {};

//---------------------
P.createPopupDisplay = (jqObIn, dispstr, options) => {
    
    jqOb = typeof jqObIn === 'string' ? $(jqObIn) : jqObIn;
    IdjqOb = '#' + jqOb [0].id;

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

    //var popOb = {div: [dispOb, divArrowBorder, divArrowFiller], class: 'popup', after: IdjqOb};
    var popObRel = {div: [dispOb, divArrowBorder, divArrowFiller], class: 'popup'};
    var popOb = {div: popObRel, class: 'popupwrap'};
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
    
    var sel = Id ? Id : '.popupwrap';

    $(sel)
    .addClass ('popupnovis');


}; // end P.hidePopups


//---------------------
P.showPopups = (Id) => {
    
    var sel = Id ? Id : '.popupwrap';

    $(sel)
    .removeClass ('popupnovis');


}; // end P.showPopups





// end PUBLIC section

_.init ();

return P;

};





},{}],7:[function(require,module,exports){
// go-util/index.js

module.exports = (function () {

    // PRIVATE Properties/Methods
var v = {

    key1: require ('key1')

};  // end PRIVATE properties
var f={};

//---------------------
f.ddsDoIt = (ob, toUnicode) => {
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

                ob [i] = f.ddsDoIt (ob [i], toUnicode);

            } // end for (var i = 0; i < ob.length; i++)

            res = ob;

        } else {

            res = {};

            var keys = Object.keys (ob);
            for (i = 0; i < keys.length; i++) {

                var key = keys [i];

                var val = ob[key];
    
                var newKey = doReplace (key);
    
                res [newKey] = f.ddsDoIt (val, toUnicode);
    

            } // end for (var i = 0; i < keys; i++)
            
        } // end if (Array.isArray (ob))
        
    } else {

        res = ob;

    } // end if (ob === null || typeof ob !== 'object')


    return res;

};  // end f.ddsDoIt 


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
    
    return f.ddsDoIt (ob, true);

};  // end dollarDotSubUnicode 


//---------------------
P.dollarDotSubUnicodeRestore = (ob) => {
    
    return f.ddsDoIt (ob, false);

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


P.key1 = v.key1;


//---------------------
P.parsePath = (absPath) => {
    
    var dir;
    var file;

    var matched = absPath.match (/(.*\/)([^\/]*)/);
    if (matched) {

        dir = matched [1];
        file = matched [2];

    } else {

        dir = ""; 
        file = absPath;

    } // end if (matched)
    
    return {dir: dir, file: file};

}; // end P.parsePath 


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




},{"key1":9}],8:[function(require,module,exports){
// go-ws-client/index.js

module.exports = function (ip, port, client, options) {

// PRIVATE Properties/Methods
var v = {
    
    ip: ip,
    port: port,
    secureConnection: null,

    ut: require ('go-util'),
    minsec: require ('minsec').getMinSec,
    msgShorten0: require ('msgshorten'),
    msgSh: null,
    pcheck: null,
    key1: null,

    wsServer: null,
    wsUrlOb: null,

}; // end PRIVATE properties
var f={};

//---------------------
f.init = () => {

    v.pcheck = v.ut.pCheck;
    v.key1 = v.ut.key1;

    //var targetLength = 80000;
    var targetLength = 200;
    v.msgSh = new v.msgShorten0 (targetLength);

    var params = v.pcheck (options, {secureConnection: false});

    v.secureConnection = params.secureConnection;

        //console.log ('wsClient params: ' + JSON.stringify (params) + '\n');
    
    v.tstCmds =  {ping: f.tstCmdPingResp};
    v.client = client ? client : f.reportMsgOb;

    var wsPrefix = v.secureConnection ? 'wss' : 'ws';
    var wsUrl = wsPrefix + '://' + v.ip + ':' + v.port;

    v.wsUrlOb = {
        wsPrefix: wsPrefix,
        ip: v.ip,
        port: v.port
    };

    //v.wsServer = new WebSocket (wsUrl, JSON.stringify (v.wsUrlOb));
    v.wsServer = new WebSocket (wsUrl, v.ip);
        // using v.ip as optional DOMString protocols: 
        // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

    v.wsServer.onmessage = f.fromSrvr;
    v.wsServer.onclose = f.msgClose;
    v.wsServer.onerror = f.msgError;

}; // end f.init 


//---------------------
f.doCmd = (uMsgOb) => {

    /*
    var fromSrvr = JSON.stringify (uMsgOb);
    var fromSrvrShort = v.msgShorten.msgShorten (fromSrvr);
    */
    var fromSrvrShort = v.msgSh.msgShorten (uMsgOb);

        //console.log ('  ==> wsClient.fromSrvr: ' + fromSrvrShort);
    
    uMsgOb = Array.isArray (uMsgOb) ? uMsgOb : [uMsgOb];

    for (var i = 0; i < uMsgOb.length; i++) {

        var msgOb = uMsgOb [i];

        var cmd = v.key1 (msgOb);
    
        if (v.tstCmds.hasOwnProperty (cmd)) {
    
            v.tstCmds [cmd] (msgOb [cmd]);
    
        } else {
    
            v.client (msgOb);
    
        } // end if (v.tstCmds.hasOwnProperty (cmd))
    
    } // end for (var i = 0; i < uMsgOb.length; i++)

}; // end f.doCmd 



//---------------------
f.doSend = (msg) => {

        //console.log ('f.doSend.msg: ' + msg + '\n');
    
    v.wsServer.send (msg);

}; // end f.doSend 


//---------------------
f.fromSrvr = (event) => {
    
    var time = v.minsec ();
    var msg = event.data;
    msgOb = JSON.parse (msg);
    //var msgm = JSON.parse (msg);
    //var msgOb = msgm.m;
    var msgObShort = v.msgSh.msgShorten (msgOb);
        console.log ('<==== ' + time + ' wsClient.fromSrvr: ' + msgObShort + '\n');

    f.doCmd (msgOb);

}; // end f.fromSrvr 

//---------------------
f.msgClose = (event) => {
    
    console.log ('close event: ' + event.data);

}; // end f.msgClose 


//---------------------
f.msgError = (event) => {
    
    var eventMsg = event.data ? ' event.data: ' + event.data : "";
    
    var errMsg = 'wsClient msgError (Server is Down?)' + eventMsg;
    console.log (errMsg);

    $('body').prepend (errMsg);

}; // end f.msgError 


//---------------------
f.reportMsgOb = (msgOb) => {
    
    console.log ('f.reportMsgOb.msgOb: ' + msgOb + '\n');

}; // end f.reportMsgOb 


//---------------------
f.tstCmdPingResp = (pingMsg) => {
    
    console.log ('ping: ' + pingMsg);
    return;

}; // end f.tstCmdPingResp 

f.init ();



// PUBLIC Properties/Methods
var P = {};

//---------------------
P.getWsUrl = () => {
    
    return v.wsUrlOb;

}; // end P.getWsUrl


//---------------------
P.toSrvr = (msgOb) => {
    var time = v.minsec ();
    var msgObShort = v.msgSh.msgShorten (msgOb);
    console.log ('\n\n====> ' + time + ' wsClient.toSrvr: ' + msgObShort + '\n');
    
    var msgObS = JSON.stringify (msgOb);

        //console.log ('p.toSrvr.msgObS : ' + msgObS + '\n');
    
    f.doSend (msgObS);

}; // end P.toSrvr 


return P;

};




},{"go-util":7,"minsec":10,"msgshorten":11}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
// index.js => minsec

// get minutes:seconds.milliseconds


module.exports = (function () {

    // PRIVATE Properties/Methods
var v = {
};  // end PRIVATE properties

var f={};

f.init = () => {
}; // end f.init

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

f.init ();

return P;

}());







},{}],11:[function(require,module,exports){
// index.js

module.exports = function (targetLength) {

    // PRIVATE Properties/Methods
var v = {

    targetLength: targetLength ? targetLength : null,
    keysOnly: false,

};  // end PRIVATE properties
var f={};

f.init = () => {
}; // end f.init

    // PUBLIC Properties/Methods
var P = {};

//---------------------
P.msgShorten = (msgOb) => {
    
    var msgObStr = typeof msgOb === 'object' ? JSON.stringify (msgOb) : msgOb;
    
    if (v.keysOnly) {

        var msgObP = JSON.parse (msgObStr);
        var msgA = Array.isArray (msgObP) ? msgObP : [msgObP];

        var msgKeysA = [];

        msgA.forEach (function (msg) {

            var msgKeys = Object.keys (msg);
            msgKeysA.push (msgKeys);
        });

        if (msgKeysA.length === 1) {

            msgKeysA = msgKeysA [0];

        } // end if (msgKeysA.length === 1)
        
        msgObStr = JSON.stringify (msgKeysA);

    } // end if (v.keysOnly)
    
    if (msgObStr.length > v.targetLength) {

        var halfLength = Math.ceil (v.targetLength / 2);

        var firstHalf = msgObStr.substr (0, halfLength);
        var secondHalf = msgObStr.substr (msgObStr.length - halfLength, halfLength)

        msgObStr = firstHalf + '  <==^^|^^==>  ' + secondHalf;

    } // end if (msgObStr.length > v.targetLength)
    

    return msgObStr;

}; // end P.msgShorten 


//---------------------
P.setKeysOnly = (keysOnly) => {
    
    v.keysOnly = keysOnly;

}; // end P.setKeysOnly 


    // end PUBLIC section

f.init ();

return P;

};




},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NyYy9ub2RlX21vZHVsZXNfZ2xvYmFsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXgwLmpzIiwic2xpZGVTaG93LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLWoyaC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby1rZXkvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tbXNnL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLXBvcGluZm8vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tdXRpbC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby13cy1jbGllbnQvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMva2V5MS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9taW5zZWMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvbXNnc2hvcnRlbi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3p6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDellBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcmdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vLyBjbWRySW5pdC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgdiA9IHtcbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbnZhciBmPXt9O1xuXG5mLmluaXQgPSAoKSA9PiB7XG5cbiAgICB2YXIgYyA9IHJlcXVpcmUgKCcuL3NsaWRlU2hvdy5qcycpO1xuICAgIG5ldyBjICgpO1xufTsgIC8vIGVuZCBmLmluaXRcblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeSAoZi5pbml0KTtcblxufSkgKCk7XG5cblxuXG5yZXR1cm4gUDtcblxufSkgKCk7XG5cblxuXG5cblxuIiwiLy8gc2xpZGVTaG93LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG5cbiAgICB3czogcmVxdWlyZSAoJ2dvLXdzLWNsaWVudCcpLFxuICAgIGtleTogcmVxdWlyZSAoJ2dvLWtleScpLFxuICAgIGoyaDogcmVxdWlyZSAoJ2dvLWpzb24yaHRtbCcpLFxuICAgIHBpOiByZXF1aXJlICgnZ28tcG9waW5mbycpLFxuICAgIGtleTE6IHJlcXVpcmUgKCdrZXkxJyksXG5cbiAgICBkcHA6IG51bGwsXG4gICAgY3VyVmlzOiBudWxsLFxuICAgIG1heEltYWdlczogbnVsbCxcbiAgICBJZFNsaWRlczogbnVsbCxcblxuICAgIGJvb2ttYXJrczogbnVsbCxcbiAgICBib29rbWFya0xzdDogbnVsbCxcbiAgICBJZEJvb2ttYXJrOiBudWxsLFxuICAgIElkQm9va21hcmtTOiBudWxsLFxuICAgIElkRGVsQjogbnVsbCxcbiAgICBJZEFkZEI6IG51bGwsXG4gICAgSWRCb29rUzogbnVsbCxcblxuICAgIGN0STogbnVsbCxcbiAgICB0b3BpY3NJOiBudWxsLFxuICAgIHRvcGljUmVmczogbnVsbCxcbiAgICB0b3BpY1JlZjogbnVsbCxcbiAgICBJZE5hdjogbnVsbCxcbiAgICBJZFBhZ2VDdDogbnVsbCxcbiAgICBJZE5hdlBOOiBudWxsLFxuICAgIHRvcGljVG9WaWRlbzogbnVsbCxcbiAgICBzbGlkZVRvVmlkZW86IG51bGwsXG4gICAgaGlkZGVuU2xpZGU6IG51bGwsXG4gICAgSWRWaWRlb1BsYXlpbmc6IG51bGwsXG4gICAgLy9zcnZBd3M6ICc1Mi4zMy4xNzAuMjEnXG4gICAgc3J2QXdzOiAnMzQuMjE1LjE5NC4xMjknXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbnZhciBmPXt9O1xuXG5mLmluaXQgPSAoKSA9PiB7XG5cbiAgICB2LmRwcCA9IHYuajJoLmRpc3BsYXlQYWdlO1xuICAgIHYuZ2VuSWQgPSB2LmoyaC5nZW5JZDtcblxuICAgIHYucGkgPSBuZXcgdi5waSAodi5qMmgpO1xuXG4gICAgdmFyICBndCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgdmFyIGlwU3JjID0gZ3QubWF0Y2ggKC9naXRodWIvKSA/IHYuc3J2QXdzIDogJ2xvY2FsaG9zdCc7XG4gICAgLy92YXIgaXBTcmMgPSB2LnNydkF3cztcbiAgICB2LndzID0gbmV3IHYud3MgKGlwU3JjLCA4MDAxLCBQLmRvQWN0aW9uKTtcblxuICAgIG5ldyB2LmtleSAoJ2JvZHknLCBmYWxzZSwgZi5rZXlGaWx0ZXIpO1xufTsgIC8vIGVuZCBmLmluaXRcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuaW5pdEJvb2ttYXJrcyA9ICgpID0+IHtcblxuICAgIHYuYm9va21hcmtMc3QgPSBbXTtcbiAgICBmLmJvb2ttYXJrc0Zyb21Db29raWUgKCk7XG5cbiAgICB2YXIgaWQgPSB2LmdlbklkICgpO1xuICAgIHZhciBhZGRCID0ge3NwYW46ICdhZGQgYm9va21hcmsnLCBpZDogaWQsIGNsYXNzOiAnYm9va21hcmsnfTtcbiAgICB2LklkQWRkQiA9ICcjJyArIGlkO1xuXG4gICAgdmFyIGlkID0gdi5nZW5JZCAoKTtcbiAgICB2YXIgZGVsQiA9IHtzcGFuOiAnZGVsIGJvb2ttYXJrJywgaWQ6IGlkLCBjbGFzczogJ2Jvb2ttYXJrJ307XG4gICAgdi5JZERlbEIgPSAnIycgKyBpZDtcblxuICAgIHZhciBpZCA9IHYuZ2VuSWQgKCk7XG4gICAgdmFyIGJvb2tTID0ge2RpdjogMCwgaWQ6IGlkfTtcbiAgICB2LklkQm9va1MgPSAnIycgKyBpZDtcblxuICAgIHYuSWRCb29rbWFya1MgPSB2LmRwcCAoe2RpdjogW2FkZEIsIGRlbEIsIGJvb2tTXSwgY2xhc3M6ICdib29rbWFya3Mgbm92aXMnLCBwYXJlbnQ6IHYuSWRCb29rbWFya30pO1xuXG4gICAgJCh2LklkQWRkQiArICcsJyArIHYuSWREZWxCKVxuICAgIC5ob3ZlciAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ3JlZCd9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAnYmxhY2snfSk7XG4gICAgfSk7XG5cbiAgICAkKHYuSWRBZGRCKVxuICAgIC5jbGljayAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2LmJvb2ttYXJrcyBbdi5jdXJWaXNdID0gMTtcbiAgICAgICAgZi5ib29rbWFya3NUb0Nvb2tpZSAoKTtcbiAgICAgICAgZi5ib29rbWFya3NTaG93ICgpO1xuICAgIH0pXG5cbiAgICAkKHYuSWREZWxCKVxuICAgIC5jbGljayAoZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWxldGUgdi5ib29rbWFya3MgW3YuY3VyVmlzXTtcbiAgICAgICAgZi5ib29rbWFya3NUb0Nvb2tpZSAoKTtcbiAgICAgICAgZi5ib29rbWFya3NTaG93ICgpO1xuICAgIH0pXG5cbn07IC8vIGVuZCBmLmluaXRCb29rbWFya3NcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5pbml0U3R5bGUgPSAoKSA9PiB7XG5cbiAgICB2YXIgc3R5bGUgPSB7c3R5bGU6XG4gICAgICAgIFwiYm9keSB7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tbGVmdDogMTVweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuYm9va21hcmsge1wiICtcbiAgICAgICAgICAgIFwid2hpdGUtc3BhY2U6IG5vd3JhcDtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMTJweDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMDtcIiArXG4gICAgICAgICAgICBcInBhZGRpbmc6IDA7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmJvb2ttYXJrcyB7XCIgK1xuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiAjRTVGRkYyO1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyOiAxcHggc29saWQgI0IzQjNGRjtcIiArXG4gICAgICAgICAgICBcImJvcmRlci1yYWRpdXM6IDNweDtcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiBhYnNvbHV0ZTtcIiArXG4gICAgICAgICAgICBcInotaW5kZXg6IDE7XCIgK1xuICAgICAgICAgICAgXCJ0b3A6IDJweDtcIiArXG4gICAgICAgICAgICBcInJpZ2h0OiAycHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmJvb2ttYXJraGVhZGVyIHtcIiArXG4gICAgICAgICAgICBcImZvbnQtc3R5bGU6IGl0YWxpYztcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiAyMDA7XCIgK1xuICAgICAgICAgICAgXCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmNhcHRpb24ge1wiICtcbiAgICAgICAgICAgIFwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDIwcHg7IFwiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IGFic29sdXRlOyBcIiArXG4gICAgICAgICAgICBcImJvdHRvbTogNTBweDsgXCIgK1xuICAgICAgICAgICAgXCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcIiArXG4gICAgICAgICAgICBcIm1heC13aWR0aDogNTAwcHg7XCIgK1xuICAgICAgICAgICAgXCJ3b3JkLWJyZWFrOiBicmVhay1hbGw7XCIgK1xuICAgICAgICAgICAgXCJsZWZ0OiAwO1wiICtcbiAgICAgICAgICAgIFwicmlnaHQ6IDA7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW46IDAgYXV0bztcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuc3ltYm9sd3JhcCB7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogMTZweDtcIiArXG4gICAgICAgICAgICBcImhlaWdodDogMTZweDtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMTVweDtcIiArXG4gICAgICAgICAgICBcImJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyLXJhZGl1czogOHB4O1wiICtcbiAgICAgICAgICAgIFwiZmxvYXQ6IHJpZ2h0O1wiICtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogIzBlMDtcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBwb2ludGVyO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBoYW5kO1wiICtcbiAgICAgICAgICAgIFwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IHJlbGF0aXZlO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5zeW1ib2wge1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IHJlbGF0aXZlO1wiICtcbiAgICAgICAgICAgIFwidG9wOiAtMXB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5oZWFkZXIge1wiICtcbiAgICAgICAgICAgIFwidGV4dC1hbGlnbjogY2VudGVyO1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IHJlbGF0aXZlO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5tMTAge1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luOiAxMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi50NDAge1wiICtcbiAgICAgICAgICAgIFwidG9wOiAtNDBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIucHJlbCB7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnc3MDAge1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDcwMHB4O1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luOiAwIGF1dG87XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmltZ3ZpZGVvIHtcIiArXG4gICAgICAgICAgICBcImhlaWdodDogNTAwcHg7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogNzAwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmltZ2hvbWV3b3JrIHtcIiArXG4gICAgICAgICAgICBcImhlaWdodDogODAwcHg7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogNzAwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmNvbHMge1wiICtcbiAgICAgICAgICAgIFwicGFkZGluZy1yaWdodDogMHB4O1wiICtcbiAgICAgICAgICAgIFwicGFkZGluZy1sZWZ0OiAxMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5ub3ZpcyB7XCIgK1xuICAgICAgICAgICAgXCJkaXNwbGF5OiBub25lO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5uYXYge1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAzMHB4O1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IDkwMDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1sZWZ0OiAxMHB4O1wiICtcbiAgICAgICAgICAgIFwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiICtcbiAgICAgICAgICAgIFwiZmxvYXQ6IHJpZ2h0O1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBwb2ludGVyO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBoYW5kO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5uYXZwb3Mge1wiICtcbiAgICAgICAgICAgIFwiZmxvYXQ6IHJpZ2h0O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi52aWRlbyB7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgICAgICBcImNvbG9yOiBibHVlO1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luLXJpZ2h0OiAzMHB4O1wiICtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IHBvaW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IGhhbmQ7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnJlZiB7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogaW5pdGlhbDtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMTFweDtcIiArXG4gICAgICAgICAgICBcIndvcmQtYnJlYWs6IGJyZWFrLWFsbDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIudG9waWNyb3dzIHtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1ib3R0b206IDIwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnJvdy50b3BpY3Jvd3MgPiBkaXYge1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyOiAxcHggc29saWQgI2NjYztcIiArXG4gICAgICAgICAgICBcInBhZGRpbmctcmlnaHQ6IDFweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubG9jaGVhZGVyIHtcIiArXG4gICAgICAgICAgICBcImNvbG9yOiByZWQ7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLndlZWsge1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCIgK1xuICAgICAgICBcIn1cIixcbiAgICAgICAgcGFyZW50OiAnaGVhZCd9O1xuXG4gICAgICAgIHYuZHBwIChzdHlsZSk7XG5cbn07IC8vIGVuZCBmLmluaXRTdHlsZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmJvb2ttYXJrQWRkID0gKHNsaWRlKSA9PiB7XG5cbiAgICB2YXIgYm9va21hcmsgPSB2LmJvb2ttYXJrTHN0IFtzbGlkZV0ucmVwbGFjZSAoLy0oLiopXy8sICcgICAgJDEgICAgJyk7XG4gICAgdmFyIElkID0gdi5kcHAgKHtwcmU6IGJvb2ttYXJrLCBwYXJlbnQ6IHYuSWRCb29rUywgbmFtZTogc2xpZGUsIGNsYXNzOiAnYm9va21hcmsnfSlcblxuICAgICQoSWQpXG4gICAgLmNsaWNrIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuID0gJCh0aGlzKS5hdHRyICgnbmFtZScpO1xuICAgICAgICBmLnNldE5leHRWaXMgKG4gLSB2LmN1clZpcyk7XG5cbiAgICAgICAgJCh2LklkQm9va21hcmtTKVxuICAgICAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuICAgIH0pXG4gICAgLmhvdmVyIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAncmVkJ30pO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdibGFjayd9KTtcbiAgICB9KTtcblxuXG59OyAvLyBlbmQgZi5ib29rbWFya0FkZFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmJvb2ttYXJrc1Nob3cgPSAoKSA9PiB7XG5cbiAgICBpZiAodi5ib29rbWFya3MuaGFzT3duUHJvcGVydHkgKHYuY3VyVmlzKSkge1xuXG4gICAgICAgICQodi5JZERlbEIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAgICAgJCh2LklkQWRkQilcbiAgICAgICAgLmFkZENsYXNzICgnbm92aXMnKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgJCh2LklkRGVsQilcbiAgICAgICAgLmFkZENsYXNzICgnbm92aXMnKTtcblxuICAgICAgICAkKHYuSWRBZGRCKVxuICAgICAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgfSAvLyBlbmQgaWYgKHYuYm9va21hcmtzLmhhc093blByb3BlcnR5ICh2LmN1clZpcykpXG5cbiAgICAkKHYuSWRCb29rUylcbiAgICAuZW1wdHkgKCk7XG5cbiAgICB2YXIgc2xpZGVzID0gT2JqZWN0LmtleXMgKHYuYm9va21hcmtzKS5zb3J0IChmdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIC0gYjtcbiAgICB9KTtcblxuICAgIGlmIChzbGlkZXMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIHYuZHBwICh7ZGl2OiAnV2VlayBUb3BpYyBTbGlkZU51bScsIHBhcmVudDogdi5JZEJvb2tTLCBjbGFzczogJ2Jvb2ttYXJrIGJvb2ttYXJraGVhZGVyJ30pO1xuXG4gICAgfSAvLyBlbmQgaWYgKHNsaWRlcy5sZW5ndGggPiAwKVxuICAgIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHNsaWRlID0gc2xpZGVzIFtpXTtcbiAgICAgICAgZi5ib29rbWFya0FkZCAoc2xpZGUpO1xuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXM7IGkrKylcblxuICAgICQodi5JZEJvb2ttYXJrUylcbiAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpXG4gICAgICAgIC8vIGFjdHVhbGx5IHNob3cgdGhlIGJvb2ttYXJrXG5cbiAgICAuaG92ZXIgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gYm9va21hcmtzIGluaXRpYWxseSBwb3NpdGlvbmVkIHVuZGVyIGN1cnNvciwgc28gbm90aGluZyB0byBkbyBmb3IgaG92ZXItaW5cblxuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuYWRkQ2xhc3MgKCdub3ZpcycpXG4gICAgfSlcblxuXG5cblxufTsgLy8gZW5kIGYuYm9va21hcmtzU2hvd1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmJvb2ttYXJrc0Zyb21Db29raWUgPSAoKSA9PiB7XG4gICAgXG4gICAgdmFyIGJvb2ttYXJrc1NmaWVkID0gZG9jdW1lbnQuY29va2llLm1hdGNoICgvbTEwMmJvb2ttYXJrcz0oW147XSspLyk7XG5cbiAgICB2LmJvb2ttYXJrcyA9ICFib29rbWFya3NTZmllZCA/ICB7fSA6IEpTT04ucGFyc2UgKGJvb2ttYXJrc1NmaWVkIFsxXSk7XG5cbn07IC8vIGVuZCBmLmJvb2ttYXJrc0Zyb21Db29raWVcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5ib29rbWFya3NUb0Nvb2tpZSA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgY29va2llID0gJ20xMDJib29rbWFya3M9JyArIEpTT04uc3RyaW5naWZ5ICh2LmJvb2ttYXJrcykgKyAnOyBleHBpcmVzPVRodSwgMSBKYW4gMjAzMCAwMDowMDowMCBVVEM7IHBhdGg9Lyc7XG4gICAgZG9jdW1lbnQuY29va2llID0gY29va2llO1xuXG59OyAvLyBlbmQgZi5ib29rbWFya3NUb0Nvb2tpZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRpc3BsYXlOYXYgPSAoKSA9PiB7XG5cbiAgICB2YXIgbmF2U3BhbnMgPSBbe3NwYW46ICc+JywgaWQ6ICduYXZyJywgY2xhc3M6ICduYXYnfSxcbiAgICB7c3BhbjogJzwnLCBpZDogJ25hdmwnLCBjbGFzczogJ25hdid9XTtcblxuICAgIG5hdlNwYW5zLnBhcmVudCA9IHYuSWROYXZQTjtcblxuICAgIHYuZHBwIChuYXZTcGFucyk7XG5cbiAgICAkKCcjbmF2bCwgI25hdnInKVxuICAgIC5ob3ZlciAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ3JlZCd9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAnYmxhY2snfSk7XG4gICAgfSk7XG5cbiAgICAkKCcjbmF2bCcpXG4gICAgLmNsaWNrIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZi5zZXROZXh0VmlzICgtMSk7XG4gICAgfSk7XG5cbiAgICAkKCcjbmF2cicpXG4gICAgLmNsaWNrIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZi5zZXROZXh0VmlzICgxKTtcbiAgICB9KTtcblxuXG59OyAvLyBlbmQgZi5kaXNwbGF5TmF2XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZGlzcGxheVBuZ0ZpbGVzID0gKHZhbHMpID0+IHtcblxuICAgIHYuY3VyVmlzID0gMDtcbiAgICB2Lm1heEltYWdlcyA9IHZhbHMubGVuZ3RoIC0gMTtcbiAgICAgICAgLy8gbGFzdCB2YWwgaW4gdmFscyBpcyBhbiBlbXB0eSBzdHJpbmcsIHNvIGRvbid0IGNvdW50IGl0XG5cbiAgICB2YXIgd2Vla3MgPSB7fTtcbiAgICB2YXIgdG9waWNzO1xuXG4gICAgdi5jdEkgPSBbXTtcbiAgICB2LnRvcGljc0kgPSBbXTtcbiAgICB2LnRvcGljUmVmcyA9IFtdO1xuICAgIHYuc2xpZGVUb1ZpZGVvID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHYubWF4SW1hZ2VzOyBpKyspIHtcblxuICAgICAgICB2YXIgdmFsID0gdmFscyBbaV07XG5cbiAgICAgICAgdmFyIG1hdGNoZWQgPSB2YWwubWF0Y2ggKC8uLi4oLiopXFwvLio/KFthLXpBLVpdLiopLnBuZy8pO1xuICAgICAgICB2YXIgbG9jID0gbWF0Y2hlZCBbMV07XG4gICAgICAgIHZhciBjYXB0aW9uID0gbWF0Y2hlZCBbMl07XG5cbiAgICAgICAgdmFyIGltZ0NsYXNzID0gbG9jLm1hdGNoICgvSG9tZXdvcmt8RmluYWwvKSA/ICdpbWdob21ld29yaycgOiAnaW1ndmlkZW8nO1xuXG4gICAgICAgIHZhciBkaXZPYiA9IHtkaXY6IFtcbiAgICAgICAgICAgIHtpbWc6IDAsIHNyYzogdmFsLCBjbGFzczogaW1nQ2xhc3MsIGFsdDogJ2ltYWdlIGlzIHN0aWxsIHVwbG9hZGluZyAuLi4ganVzdCBhIG1pbnV0ZSBvciB0d28gbG9uZ2VyIGRlcGVuZGluZyBvbiB5b3VyIG5ldHdvcmsgYmFuZHdpZHRoJ30sXG4gICAgICAgICAgICB7YnI6MH0sXG4gICAgICAgICAgICB7c3BhbjogJyAgICAnICsgbG9jLCBjbGFzczogJ2xvY2hlYWRlcid9LFxuICAgICAgICAgICAge2JyOjB9LFxuICAgICAgICAgICAge2JyOjB9LFxuICAgICAgICAgICAge3NwYW46IGNhcHRpb24sIGNsYXNzOiAnY2FwdGlvbid9XG4gICAgICAgIF0sIGlkOiAnaicgKyBpfTtcblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuXG4gICAgICAgICAgICBkaXZPYi5jbGFzcyA9ICdub3Zpcyc7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGkgIT09PSAwKVxuXG4gICAgICAgIGRpdk9iLnBhcmVudCA9IHYuSWRTbGlkZXM7XG4gICAgICAgIHYuZHBwIChkaXZPYik7XG5cbiAgICAgICAgbWF0Y2hlZCA9IGxvYy5tYXRjaCAoL1coXFxkKSguKj8pXFwvKC4qKS8pO1xuXG4gICAgICAgIHZhciB3aWQgPSAnVycgKyBtYXRjaGVkIFsxXTtcbiAgICAgICAgdmFyIHdlZWsgPSB3aWQgKyBtYXRjaGVkIFsyXTtcbiAgICAgICAgdmFyIHRvcGljID0gbWF0Y2hlZCBbM107XG5cbiAgICAgICAgdmFyIHZpZGVvVG9waWMgPSB3aWQgKyAnLScgKyB0b3BpYztcbiAgICAgICAgdi5zbGlkZVRvVmlkZW8ucHVzaCAodi50b3BpY1RvVmlkZW8gW3ZpZGVvVG9waWNdKTtcblxuICAgICAgICBpZiAoIXdlZWtzLmhhc093blByb3BlcnR5ICh3ZWVrKSkge1xuXG4gICAgICAgICAgICBmLmRpc3BsYXlSZWYgKHdpZCwgd2VlaywgaSwgJ3dlZWsnKTtcbiAgICAgICAgICAgIHdlZWtzIFt3ZWVrXSA9IDE7XG4gICAgICAgICAgICB0b3BpY3MgPSB7fTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoIXdlZWtzLmhhc093blByb3BlcnR5ICh3ZWVrKSlcblxuICAgICAgICB2YXIgc2xpZGVDb3VudDtcbiAgICAgICAgaWYgKCF0b3BpY3MuaGFzT3duUHJvcGVydHkgKHRvcGljKSkge1xuXG4gICAgICAgICAgICB2YXIgZGlzcFJlZiA9IGYuZGlzcGxheVJlZiAod2lkLCB0b3BpYywgaSwgJ3RvcGljJyk7XG4gICAgICAgICAgICB2LnRvcGljUmVmcy5wdXNoIChkaXNwUmVmKTtcblxuICAgICAgICAgICAgaWYgKHRvcGljID09PSAnMDVfU3RvcmFnZUVuZ2luZVdpcmVkVGlnZXInKSB7XG5cbiAgICAgICAgICAgICAgICB2LklkU2FtcGxlVG9waWMgPSBkaXNwUmVmO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAodG9waWMgPT09ICcwMV9XZWxjb21lV2VlazMnKVxuXG4gICAgICAgICAgICB0b3BpY3MgW3RvcGljXSA9IDE7XG5cbiAgICAgICAgICAgIHNsaWRlQ291bnQgPSAxO1xuICAgICAgICAgICAgdi50b3BpY3NJLnB1c2ggKHNsaWRlQ291bnQpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHNsaWRlQ291bnQrKztcbiAgICAgICAgICAgIHYudG9waWNzSSBbdi50b3BpY3NJLmxlbmd0aCAtIDFdID0gc2xpZGVDb3VudDtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoIXRvcGljcy5oYXNPd25Qcm9wZXJ0eSAodG9waWMpKVxuXG4gICAgICAgIHZhciBib29rbWFya05hbWUgPSB2aWRlb1RvcGljICsgJ18nICsgc2xpZGVDb3VudDs7XG4gICAgICAgIHYuYm9va21hcmtMc3QucHVzaCAoYm9va21hcmtOYW1lKTtcblxuICAgICAgICB2LmN0SS5wdXNoIChbc2xpZGVDb3VudCwgdi50b3BpY3NJLmxlbmd0aCAtIDFdKTtcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWxzOyBpKyspXG5cbiAgICBmLnNldE5leHRWaXMgKDApO1xuXG59OyAvLyBlbmQgZi5kaXNwbGF5UG5nRmlsZXNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kaXNwbGF5UmVmID0gKHdpZCwgc3RyLCBpLCBjbGFzc05hbWUpID0+IHtcblxuICAgIHdpZCA9ICcjJyArIHdpZDtcbiAgICB2YXIgcmVmID0gdi5nZW5JZCAoKTtcbiAgICB2LmRwcCAoe2RpdjpcbiAgICAgICAge2Rpdjogc3RyLFxuICAgICAgICAgaWQ6IHJlZixcbiAgICAgICAgIHNsOiBpLFxuICAgICAgICAgc3R5bGU6ICdkaXNwbGF5OmlubGluZS1ibG9jazsgY3Vyc29yOiBwb2ludGVyOyBjdXJzb3I6IGhhbmQ7J1xuICAgICB9LCBwYXJlbnQ6IHdpZCwgY2xhc3M6ICdyZWYgdzcwMCAnICsgY2xhc3NOYW1lfSk7XG5cbiAgICByZWYgPSAnIycgKyByZWY7XG4gICAgJChyZWYpXG4gICAgLmNsaWNrIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuID0gJCh0aGlzKS5hdHRyICgnc2wnKTtcbiAgICAgICAgZi5zZXROZXh0VmlzIChuIC0gdi5jdXJWaXMpO1xuICAgIH0pXG5cbiAgICAkKHJlZilcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSlcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgSWQgPSAnIycgKyBldmVudC50YXJnZXQuaWQ7XG5cbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pXG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHJlZjtcblxufTsgLy8gZW5kIGYuZGlzcGxheVJlZlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRvU2xpZGVTaG93ID0gKHZhbHMpID0+IHtcblxuICAgIGYubGF5b3V0ICgpO1xuICAgIGYuZGlzcGxheU5hdiAoKTtcbiAgICBmLmRpc3BsYXlQbmdGaWxlcyAodmFscyk7XG5cbiAgICAkKHYuSWRWaWRlbylcbiAgICAuaG92ZXIgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuYXR0ciAoe3N0eWxlOiAnY29sb3I6IHJlZDsnfSlcbiAgICB9LFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuYXR0ciAoe3N0eWxlOiAnY29sb3I6IGJsdWUnfSlcbiAgICB9KVxuICAgIC5jbGljayAoZi5wbGF5VmlkZW8pO1xuXG4gICAgdi5waS5jcmVhdGVQb3B1cERpc3BsYXkgKCcjbmF2cicsXG4gICAgICAgICdDbGljayBQcmV2L05leHQgU2xpZGVcXG4gICAgLS0gb3IgLS1cXG4oa2V5Ym9hcmQgc2hvcnRjdXRzKVxcbkxlZnQvUmlnaHQgQXJyb3dcXG5TcGFjZS9CYWNrc3BhY2UnKTtcbiAgICB2LnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAodi5JZFNhbXBsZVRvcGljLFxuICAgICAgICAnQ2xpY2sgdG8gbmF2aWdhdGUgZGlyZWN0bHlcXG50byBiZWdpbm5pbmcgb2YgdG9waWMnKTtcbiAgICB2LnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAodi5JZEN1clNsaWRlLFxuICAgICAgICAnQ3VycmVudCBzbGlkZSBJbiB0b3BpYy9cXG5Ub3RhbCBzbGlkZXMgaW4gdG9waWMnKTtcbiAgICB2LnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAodi5JZFZpZGVvLFxuICAgICAgICAnQ2xpY2sgdG8gc3RhcnRcXG5wbGF5aW5nIGxlc3NvbiB2aWRlbycpO1xuXG4gICAgJCh2LklkSGVscClcbiAgICAuaG92ZXIgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnI2ZmYTBhMCd9KTtcblxuICAgICAgICB2LnBpLnNob3dQb3B1cHMgKCk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5jc3MgKHsnYmFja2dyb3VuZC1jb2xvcic6ICcjMGUwJ30pO1xuXG4gICAgICAgIHYucGkuaGlkZVBvcHVwcyAoKTtcbiAgICB9KTtcblxuICAgICQodi5JZEJvb2ttYXJrKVxuICAgIC5ob3ZlciAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5jc3MgKHsnYmFja2dyb3VuZC1jb2xvcic6ICcjZmZhMGEwJ30pO1xuICAgICAgICBmLmJvb2ttYXJrc1Nob3cgKCk7XG5cbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmNzcyAoeydiYWNrZ3JvdW5kLWNvbG9yJzogJyMwZTAnfSk7XG5cbiAgICB9KTtcblxufTsgLy8gZW5kIGYuZG9TbGlkZVNob3dcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYua2V5RmlsdGVyID0gKGNob2IpID0+IHtcbiAgICAvL2NvbnNvbGUubG9nICgnY2hvYjogJyArIEpTT04uc3RyaW5naWZ5IChjaG9iKSArICdcXG4nKTtcblxuICAgIHZhciBjaCA9IGNob2IuY2g7XG4gICAgaWYgKGNoID09PSAnUmlnaHQnIHx8IGNoID09PSAnICcpIHtcblxuICAgICAgICBmLnNldE5leHRWaXMgKDEpO1xuXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gJ0xlZnQnIHx8IGNoID09PSAnQmFja3NwYWNlJykge1xuXG4gICAgICAgIGYuc2V0TmV4dFZpcyAoLTEpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGNob2IuY2ggPT09ICdSaWdodCcpXG5cblxufTsgLy8gZW5kIGYua2V5RmlsdGVyXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYubGF5b3V0ID0gKCkgPT4ge1xuXG4gICAgdmFyIElkQ29udGFpbmVyID0gdi5kcHAgKHtkaXY6IDAsIGNsYXNzOiAndzcwMCBtMTAnfSk7XG5cbiAgICB2YXIgaWRCb29rbWFyayA9IHYuZ2VuSWQgKCk7XG5cbiAgICB2YXIgaWRIZWxwID0gdi5nZW5JZCAoKTtcbiAgICB2LmRwcCAoe2RpdjpcbiAgICAgICAge2g0OiBbXG4gICAgICAgICAgICAnU2xpZGVzaG93IE0xMDI6IE1vbmdvREIgZm9yIERCQXMgKEphbi9GZWIgMjAxNyknLFxuICAgICAgICAgICAge2Rpdjoge3NwYW46ICc/JywgY2xhc3M6ICdzeW1ib2wnfSwgaWQ6IGlkSGVscCwgY2xhc3M6ICdzeW1ib2x3cmFwJ30sXG4gICAgICAgICAgICB7ZGl2OiB7c3BhbjogJ0InLCBjbGFzczogJ3N5bWJvbCd9LCBpZDogaWRCb29rbWFyaywgY2xhc3M6ICdzeW1ib2x3cmFwJywgc3R5bGU6ICdtYXJnaW4tcmlnaHQ6IDEwcHg7J31cbiAgICAgICAgXSwgY2xhc3M6ICdoZWFkZXInfSxcbiAgICAgICAgY2xhc3M6ICdyb3cgdzcwMCcsXG4gICAgICAgIHBhcmVudDogSWRDb250YWluZXJ9XG4gICAgKTtcblxuICAgIHYuSWRCb29rbWFyayA9ICcjJyArIGlkQm9va21hcms7XG4gICAgZi5pbml0Qm9va21hcmtzICgpO1xuXG4gICAgdi5JZEhlbHAgPSAnIycgKyBpZEhlbHA7XG5cbiAgICB2LklkU2xpZGVzID0gdi5kcHAgKHtkaXY6IDAsIG5hbWU6ICdzbGlkZXMnLCBjbGFzczogJ3JvdyB3NzAwIHByZWwnLCBwYXJlbnQ6IElkQ29udGFpbmVyfSk7XG5cbiAgICB2YXIgSWROYXYgPSB2LmRwcCAoe2RpdjowLCBuYW1lOiAnbmF2JywgY2xhc3M6ICdyb3cgdzcwMCBwcmVsIHQ0MCcsIHBhcmVudDogSWRDb250YWluZXJ9KTtcblxuICAgIHZhciBJZFZpZGVvRGl2ID0gdi5kcHAgKHtkaXY6MCwgY2xhc3M6ICdjb2wtc20tNycsIHBhcmVudDogSWROYXZ9KTtcbiAgICB2LklkVmlkZW8gPSB2LmRwcCAoe3NwYW46ICdWaWRlbycsIHBhcmVudDogSWRWaWRlb0RpdiwgY2xhc3M6ICduYXZwb3MgdmlkZW8nfSk7XG5cbiAgICB2LklkUGFnZUN0ID0gdi5kcHAgKHtkaXY6MCwgY2xhc3M6ICdjb2wtc20tMicsIHBhcmVudDogSWROYXZ9KTtcblxuICAgIHYuSWROYXZQTiA9IHYuZHBwICh7ZGl2OjAsIGNsYXNzOiAnY29sLXNtLTMnLCBwYXJlbnQ6IElkTmF2fSk7XG5cbiAgICB2YXIgSWRUb3BpY1Jvd3MgPSB2LmRwcCAoe2RpdjowLCBuYW1lOiAndG9waWNSb3dzJywgcGFyZW50OiBJZENvbnRhaW5lciwgY2xhc3M6ICd3NzAwIHByZWwgdDQwJ30pO1xuXG4gICAgdmFyIElkUm93MSA9IHYuZHBwICh7ZGl2OiAwLCBuYW1lOiAndG9waWNSb3dzMScsIGNsYXNzOiAncm93IHRvcGljcm93cycsIHBhcmVudDogSWRUb3BpY1Jvd3N9KVxuICAgIHZhciBJZFJvdzIgPSB2LmRwcCAoe2RpdjogMCwgbmFtZTogJ3RvcGljUm93czInLCBjbGFzczogJ3JvdyB0b3BpY3Jvd3MnLCBwYXJlbnQ6IElkVG9waWNSb3dzfSlcblxuICAgIGYubWFrZUNvbHMgKDAsIElkUm93MSwgNCk7XG4gICAgZi5tYWtlQ29scyAoNCwgSWRSb3cyLCAzKTtcblxufTsgLy8gZW5kIGYubGF5b3V0XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYubWFrZUNvbHMgPSAoYmFzZUlkLCBJZFJvdywgbnVtQ29scykgPT4ge1xuXG4gICAgdmFyIGNvbHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUNvbHM7IGkrKykge1xuXG4gICAgICAgIHZhciBpZCA9ICdXJyArIChpICsgMSArIGJhc2VJZCk7XG4gICAgICAgIGNvbHMucHVzaCAoe2RpdjogMCwgaWQ6IGlkLCBjbGFzczogJ2NvbHMgY29sLXNtLTMnLCBwYXJlbnQ6IElkUm93fSk7XG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKylcblxuICAgIHYuZHBwIChjb2xzKTtcblxufTsgLy8gZW5kIGYubWFrZUNvbHNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5wbGF5VmlkZW8gPSAoKSA9PiB7XG5cbiAgICB2LmhpZGRlblNsaWRlID0gJyNqJyArIHYuY3VyVmlzO1xuXG4gICAgJCh2LmhpZGRlblNsaWRlICsgJz4gaW1nJylcbiAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJCh2LmhpZGRlblNsaWRlICsgJz4gLmNhcHRpb24nKVxuICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKHYuSWRWaWRlbylcbiAgICAudGV4dCAoJ1NsaWRlJylcbiAgICAub2ZmICgnY2xpY2snKVxuICAgIC5jbGljayAoZi5yZXN0b3JlU2xpZGUpO1xuXG4gICAgdmFyIHNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdi5zbGlkZVRvVmlkZW8gW3YuY3VyVmlzXSArICc/YXV0b3BsYXk9MSc7XG4gICAgdi5JZFZpZGVvUGxheWluZyA9IHYuZHBwICh7aWZyYW1lOiAwLCBzcmM6IHNyYywgY2xhc3M6ICdpbWd2aWRlbycsIHBhcmVudDogdi5oaWRkZW5TbGlkZSwgcHJlcGVuZDogMX0pO1xuXG59OyAvLyBlbmQgZi5wbGF5VmlkZW9cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5yZXN0b3JlU2xpZGUgPSAoKSA9PiB7XG5cbiAgICAkKHYuSWRWaWRlb1BsYXlpbmcpXG4gICAgLnJlbW92ZSAoKTtcblxuICAgICQodi5oaWRkZW5TbGlkZSArICc+IGltZycpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgICQodi5oaWRkZW5TbGlkZSArICc+IC5jYXB0aW9uJylcbiAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJCh2LklkVmlkZW8pXG4gICAgLnRleHQgKCdWaWRlbycpXG4gICAgLm9mZiAoJ2NsaWNrJylcbiAgICAuY2xpY2sgKGYucGxheVZpZGVvKTtcblxuICAgIHYuaGlkZGVuU2xpZGUgPSBudWxsO1xuXG59OyAvLyBlbmQgZi5yZXN0b3JlU2xpZGVcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuc2V0TmV4dFZpcyA9IChkZWx0YSkgPT4ge1xuXG4gICAgaWYgKHYuaGlkZGVuU2xpZGUpIHtcblxuICAgICAgICBmLnJlc3RvcmVTbGlkZSAoKTtcblxuICAgIH0gLy8gZW5kIGlmICh2LmhpZGRlblNsaWRlKVxuXG4gICAgdmFyIG1kZWx0YSA9IGRlbHRhID49IDAgPyBkZWx0YSA6IHYubWF4SW1hZ2VzICsgZGVsdGFcblxuICAgIHZhciBuZXh0VmlzID0gKHYuY3VyVmlzICsgbWRlbHRhKSAlIHYubWF4SW1hZ2VzO1xuXG4gICAgdmFyIElkUHJldiA9ICcjaicgKyB2LmN1clZpcztcbiAgICB2YXIgSWROZXh0ID0gJyNqJyArIG5leHRWaXM7XG5cbiAgICAkKElkUHJldilcbiAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJChJZE5leHQpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgIHYuY3VyVmlzID0gbmV4dFZpcztcblxuICAgIHZhciBjdFJlZiA9IHYuY3RJIFtuZXh0VmlzXTtcblxuICAgIHZhciBzbGlkZUkgPSBjdFJlZiBbMF07XG4gICAgdmFyIHRvcGljSWR4ID0gY3RSZWYgWzFdO1xuICAgIHZhciB0b3RhbEluU2VjdGlvbiA9IHYudG9waWNzSSBbdG9waWNJZHhdO1xuXG4gICAgdi5kcHAgKHtlbXB0eTogdi5JZFBhZ2VDdH0pO1xuICAgIHYuSWRDdXJTbGlkZSA9IHYuZHBwICh7c3BhbjogJ3NsaWRlOiAnICsgc2xpZGVJICsgJy8nICsgdG90YWxJblNlY3Rpb24sXG4gICAgICAgIHBhcmVudDogdi5JZFBhZ2VDdCxcbiAgICAgICAgY2xhc3M6ICduYXZwb3MnfSk7XG5cbiAgICAkKHYudG9waWNSZWYpXG4gICAgLmNzcyAoXG4gICAgICAgIHsnYmFja2dyb3VuZC1jb2xvcic6ICcjZmZmJyxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ25vcm1hbCd9XG4gICAgKTtcblxuICAgIHYudG9waWNSZWYgPSB2LnRvcGljUmVmcyBbdG9waWNJZHhdO1xuXG4gICAgJCh2LnRvcGljUmVmKVxuICAgIC5jc3MgKFxuICAgICAgICB7J2JhY2tncm91bmQtY29sb3InOiAnI2Q2ZmZkNicsXG4gICAgICAgICdmb250LXdlaWdodCc6ICdib2xkJ31cbiAgICApO1xuXG59OyAvLyBlbmQgZi5zZXROZXh0VmlzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYudG9waWNUb1ZpZGVvSWQgPSAoYVRhZ0EpID0+IHtcblxuICAgIHYudG9waWNUb1ZpZGVvID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhVGFnQS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBhVGFnID0gYVRhZ0EgW2ldO1xuICAgICAgICB2YXIgbSA9IGFUYWcubWF0Y2ggKC8uKnlvdXR1LmJlLihbXlwiXSspXCI+KFtePF0rKTwvKTtcbiAgICAgICAgaWYgKG0pIHtcblxuICAgICAgICAgICAgdmFyIHZpZGVvSWQgPSBtIFsxXTtcbiAgICAgICAgICAgIHZhciB0b3BpYyA9IG0gWzJdO1xuXG4gICAgICAgICAgICB2LnRvcGljVG9WaWRlbyBbdG9waWNdID0gdmlkZW9JZDtcblxuICAgICAgICB9IC8vIGVuZCBpZiAobSlcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBhVGFnQTsgaSsrKVxuXG5cbn07IC8vIGVuZCBmLnRvcGljVG9WaWRlb0lkXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kb0FjdGlvbiA9IChtc2dPYikgPT4ge1xuICAgIGNvbnNvbGUubG9nICgnbXNnT2I6ICcgKyBKU09OLnN0cmluZ2lmeSAobXNnT2IpICsgJ1xcbicpO1xuXG4gICAgdmFyIGNtZCA9IHYua2V5MSAobXNnT2IubSk7XG4gICAgdmFyIHZhbHMgPSBtc2dPYi5tIFtjbWRdO1xuXG4gICAgc3dpdGNoIChjbWQpIHtcblxuICAgICAgICBjYXNlICdyZWFkeSc6XG5cbiAgICAgICAgICAgIGYuaW5pdFN0eWxlICgpO1xuICAgICAgICAgICAgdi53cy50b1NydnIgKHtnZXRWaWRlb0xpbmtzOjF9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3ZpZGVvTGlua3MnOlxuXG4gICAgICAgICAgICBmLnRvcGljVG9WaWRlb0lkICh2YWxzKTtcbiAgICAgICAgICAgIHYud3MudG9TcnZyICh7Z2V0UG5nRmlsZXM6MX0pO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncG5nRmlsZXMnOlxuXG4gICAgICAgICAgICAkKCdib2R5JylcbiAgICAgICAgICAgIC5lbXB0eSAoKTtcblxuICAgICAgICAgICAgZi5kb1NsaWRlU2hvdyAodmFscyk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAvLyBlbmQgc3dpdGNoIChjbWQpXG5cblxuXG59OyAvLyBlbmQgUC5kb0FjdGlvblxuXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5mLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuXG5cblxuIiwiLy8gZ28tajJoL2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciB2ID0ge1xuXG4gICAgaWQ6IDAsXG4gICAgcHJpbWl0aXZlVHlwZXNOb3ROdWxsOiB7J3N0cmluZyc6MSwgJ251bWJlcic6MSwgJ2Jvb2xlYW4nOjEsICdzeW1ib2wnOiAxfSxcbiAgICAgICAgLy8gc2luY2UgdHlwZW9mIG51bGwgeWllbGRzICdvYmplY3QnLCBpdCdzIGhhbmRsZWQgc2VwYXJhdGVseVxuXG4gICAgbXNnVHlwZXM6IHtcblxuICAgICAgICBwcmltYXJ5OiB7XG4gICAgICAgICAgICAgICAgLy8gdm9pZCB0YWdzXG4gICAgICAgICAgICBhcmVhOiAwLCBiYXNlOiAwLCBicjogMCwgY29sOiAwLCBlbWJlZDogMCwgaHI6IDAsIGltZzogMCwgaW5wdXQ6IDAsIGtleWdlbjogMCwgbGluazogMCwgbWV0YTogMCwgcGFyYW06IDAsIHNvdXJjZTogMCwgdHJhY2s6IDAsIHdicjogMCwgXG5cbiAgICAgICAgICAgICAgICAvLyBub24tdm9pZCB0YWdzXG4gICAgICAgICAgICBhOiAxLCBhYmJyOiAxLCBhZGRyZXNzOiAxLCBhcnRpY2xlOiAxLCBhc2lkZTogMSwgYXVkaW86IDEsIGI6IDEsIGJkaTogMSwgYmRvOiAxLCBibG9ja3F1b3RlOiAxLCBib2R5OiAxLCBidXR0b246IDEsIGNhbnZhczogMSwgY2FwdGlvbjogMSwgY2l0ZTogMSwgY29kZTogMSwgY29sZ3JvdXA6IDEsIGRhdGFsaXN0OiAxLCBkZDogMSwgZGVsOiAxLCBkZXRhaWxzOiAxLCBkZm46IDEsIGRpYWxvZzogMSwgZGl2OiAxLCBkbDogMSwgZHQ6IDEsIGVtOiAxLCBmaWVsZHNldDogMSwgZmlnY2FwdGlvbjogMSwgZmlndXJlOiAxLCBmb290ZXI6IDEsIGZvcm06IDEsIGgxOiAxLCBoMjogMSwgaDM6IDEsIGg0OiAxLCBoNTogMSwgaDY6IDEsIGhlYWQ6IDEsIGhlYWRlcjogMSwgaGdyb3VwOiAxLCBodG1sOiAxLCBpOiAxLCBpZnJhbWU6IDEsIGluczogMSwga2JkOiAxLCBsYWJlbDogMSwgbGVnZW5kOiAxLCBsaTogMSwgbWFwOiAxLCBtYXJrOiAxLCBtZW51OiAxLCBtZXRlcjogMSwgbmF2OiAxLCBub3NjcmlwdDogMSwgb2JqZWN0OiAxLCBvbDogMSwgb3B0Z3JvdXA6IDEsIG9wdGlvbjogMSwgb3V0cHV0OiAxLCBwOiAxLCBwcmU6IDEsIHByb2dyZXNzOiAxLCBxOiAxLCBycDogMSwgcnQ6IDEsIHJ1Ynk6IDEsIHM6IDEsIHNhbXA6IDEsIHNjcmlwdDogMSwgc2VjdGlvbjogMSwgc2VsZWN0OiAxLCBzbWFsbDogMSwgc3BhbjogMSwgc3Ryb25nOiAxLCBzdHlsZTogMSwgc3ViOiAxLCBzdW1tYXJ5OiAxLCBzdXA6IDEsIHN2ZzogMSwgdGFibGU6IDEsIHRib2R5OiAxLCB0ZDogMSwgdGV4dGFyZWE6IDEsIHRmb290OiAxLCB0aDogMSwgdGhlYWQ6IDEsIHRpbWU6IDEsIHRpdGxlOiAxLCB0cjogMSwgdTogMSwgdWw6IDEsICd2YXInOiAxLCB2aWRlbzogMSxcbiAgICAgICAgfSxcblxuICAgICAgICBzZWNvbmRhcnk6IHtzdHlsZTogMX0sXG4gICAgICAgICAgICAvLyBlbGVtZW50cyB0aGF0IGNhbiBiZSBlaXRoZXIgYSBwcmltYXJ5IHRhZyBpdHNlbGYgb3IgYW4gYXR0cmlidXRlIG9mIGFub3RoZXIgcHJpbWFyeSB0YWdcbiAgICAgICAgICAgIC8vIGlmIGFueSBvdGhlciBwcmltYXJ5IHRhZ3MgaXMgcHJlc2VudCwgdGhlbiBzZWNvbmRhcnkgdGFncyBhcmUgdHJlYXRlZCBhc1xuICAgICAgICAgICAgLy8gYXR0cmlidXRlcyBvZiB0aGUgb3RoZXIgcHJpbWFyeSB0YWdcblxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICBlbXB0eTogMSwgcm06IDEsIFxuICAgICAgICAgICAgcHJlcGVuZDogMSwgYXBwZW5kOiAxLCBiZWZvcmU6IDEsIGFmdGVyOiAxLCBwYXJlbnQ6IDEsXG4gICAgICAgICAgICBhdHRyOiAxLCBjb250ZW50OiAxLCB0ZXh0OiAxLCBcbiAgICAgICAgfSxcblxuICAgIH0sXG5cbiAgICBtc2cwOiByZXF1aXJlICgnZ28tbXNnJyksXG4gICAgbXNnOiBudWxsLFxuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG52YXIgZj17fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuaW5pdCA9ICgpID0+IHtcbiAgICBcbiAgICB2Lm1zZyA9IG5ldyB2Lm1zZzAgKHYubXNnVHlwZXMpO1xuXG59OyAvLyBlbmQgZi5pbml0XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuYXR0ciA9IChzZWxlY3RvciwgYXR0cikgPT4ge1xuICAgIFxuICAgICQoc2VsZWN0b3IpXG4gICAgLmF0dHIgKGF0dHIpO1xuXG59OyAvLyBlbmQgZi5hdHRyIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmVtcHR5ID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgXG4gICAgJChzZWxlY3RvcilcbiAgICAuZW1wdHkgKClcbiAgICAub2ZmICgna2V5ZG93bicpO1xuXG59OyAvLyBlbmQgZi5lbXB0eSBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnJtID0gKHNlbGVjdG9yKSA9PiB7XG5cbiAgICAkKHNlbGVjdG9yKVxuICAgIC5yZW1vdmUgKCk7XG5cbn07IC8vIGVuZCBmLnJtXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZGlzcGxheU9iSCA9IChwYXJlbnQsIGRpc3BPYikgPT4ge1xuICAgIFxuICAgICAgICAvLyAtLS0tICBkb0FycmF5IC0tLS1cbiAgICB2YXIgZG9BcnJheSA9IGZ1bmN0aW9uIChkaXNwT2IpIHtcblxuICAgICAgICB2YXIgSWRzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcE9iLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIElkcy5wdXNoIChmLmRpc3BsYXlPYkggKHBhcmVudCwgZGlzcE9iIFtpXSkpO1xuXG4gICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcE9iLmxlbmd0aDsgaSsrKVxuXG4gICAgICAgIC8vcmV0dXJuIElkcztcbiAgICAgICAgcmV0dXJuIElkcyBbSWRzLmxlbmd0aCAtIDFdO1xuICAgICAgICBcbiAgICB9OyAgLy8gZW5kIGRvQXJyYXkgXG5cbiAgICAgICAgLy8gLS0tLSAgZG9PYmplY3QgLS0tLVxuICAgIHZhciBkb09iamVjdCA9IGZ1bmN0aW9uIChkaXNwT2IpIHtcblxuICAgICAgICB2YXIgZGlzcE9iUGFyc2VkID0gdi5tc2cucGFyc2VNc2cgKGRpc3BPYik7XG5cbiAgICAgICAgdmFyIHByaW1hcnlLZXkgPSBkaXNwT2JQYXJzZWQucDtcblxuICAgICAgICB2YXIgbWV0YSA9IGRpc3BPYlBhcnNlZC5tO1xuXG4gICAgICAgIHZhciBkZWxLZXkgPSBudWxsO1xuICAgICAgICB2YXIgcmVsTG9jID0gJ2FwcGVuZCc7XG5cbiAgICAgICAgdmFyIGF0dHIgPSBudWxsO1xuICAgICAgICB2YXIgY29udGVudCA9IG51bGw7XG4gICAgICAgIHZhciB0ZXh0ID0gbnVsbDtcblxuICAgICAgICBpZiAobWV0YS5oYXNPd25Qcm9wZXJ0eSAoJ3BhcmVudCcpKSB7XG4gICAgICAgICAgICAvLyBlbnN1cmVzIHByb2Nlc3Npbmcgb2YgJ3BhcmVudCcgYmVmb3JlIHJlbWFpbmRlciBvZiBtZXRhIGtleXNcblxuICAgICAgICAgICAgcGFyZW50ID0gbWV0YS5wYXJlbnQ7XG4gICAgICAgICAgICBkZWxldGUgbWV0YS5wYXJlbnQ7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKG1ldGEuaGFzT3duUHJvcGVydHkgKCdwYXJlbnQnKSlcbiAgICAgICAgXG4gICAgICAgIHZhciBtZXRhS2V5cyA9IE9iamVjdC5rZXlzIChtZXRhKTtcbiAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbWV0YUtleXMubGVuZ3RoOyBpZHgrKykge1xuXG4gICAgICAgICAgICB2YXIga2V5ID0gbWV0YUtleXMgW2lkeF07XG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHknOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JtJzpcbiAgICAgICAgICAgICAgICAgICAgZGVsS2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBtZXRhIFtrZXldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2F0dHInOlxuICAgICAgICAgICAgICAgICAgICBhdHRyID0gbWV0YS5hdHRyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gbWV0YS5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IG1ldGEudGV4dDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwcmVwZW5kJzpcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2JlZm9yZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYWZ0ZXInOlxuICAgICAgICAgICAgICAgICAgICByZWxMb2MgPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBtZXRhIFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG9QYXJlbnQgPSB2YWwgIT09IDEgJiYgdmFsICE9PSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBkb1BhcmVudCA/IHZhbCA6IHBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHZhbCBpcyBvdGhlciB0aGFuIDEgb3IgdHJ1ZSwgcmVsTG9jIG92ZXJyaWRlcyBib3RoIHBhcmVudCB2YWx1ZXMgcGFzc2VkIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW50byBkaXNwbGF5T2JIIGFuZCBkZWZpbmVkIGJ5IG9wdGlvbmFsIHBhcmVudCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIHN3aXRjaCAoa2V5KVxuICAgICAgICAgICAgXG5cbiAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbWV0YUtleXMubGVuZ3RoOyBpZHgrKylcbiAgICAgICAgXG5cbiAgICAgICAgSWQgPSBudWxsO1xuXG4gICAgICAgIGlmIChkZWxLZXkpIHtcblxuICAgICAgICAgICAgZiBbZGVsS2V5XSAocGFyZW50KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGF0dHIpIHtcblxuICAgICAgICAgICAgZi5hdHRyIChwYXJlbnQsIGF0dHIpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgLy8gcmVwbGFjZXMgZW50aXJlIGNvbnRlbnQgb2YgcGFyZW50IHdpdGggbmV3IGNvbnRlbnRcblxuICAgICAgICAgICAgJChwYXJlbnQpXG4gICAgICAgICAgICAuZW1wdHkgKCk7XG5cbiAgICAgICAgICAgIGYuZGlzcGxheU9iSCAocGFyZW50LCBjb250ZW50KTtcbiAgICAgICAgICAgICAgICAvLyB3aXRob3V0IGVtcHR5aW5nIGZpcnN0LCB3aWxsIHNpbXBseSBhcHBlbmQgY29udGVudCB0byBleGlzdGluZyBjb250ZW50XG5cbiAgICAgICAgfSBlbHNlIGlmICh0ZXh0KSB7XG5cbiAgICAgICAgICAgIElkID0gZi50ZXh0TWFrZSAocGFyZW50LCByZWxMb2MsIHRleHQpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIElkID0gZi5lbGVtZW50TWFrZSAocGFyZW50LCByZWxMb2MsIHByaW1hcnlLZXksIGRpc3BPYlBhcnNlZC5jLCBkaXNwT2JQYXJzZWQucyk7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGRlbEtleSlcblxuICAgICAgICByZXR1cm4gSWQ7XG4gICAgICAgIFxuICAgIH07ICAvLyBlbmQgZG9PYmplY3QgXG5cblxuXG4gICAgICAgLy8gLS0tLSBtYWluIC0tLS1cbiAgICB2YXIgSWQ7XG4gICAgdmFyIGRpc3BPYlR5cGUgPSB0eXBlb2YgZGlzcE9iO1xuXG4gICAgaWYgKGRpc3BPYlR5cGUgPT09ICd1bmRlZmluZWQnIHx8IGRpc3BPYiA9PT0gMCB8fCBkaXNwT2IgPT09IG51bGwpIHtcblxuICAgICAgICBJZCA9IG51bGw7XG5cbiAgICB9IGVsc2UgaWYgKHYucHJpbWl0aXZlVHlwZXNOb3ROdWxsLmhhc093blByb3BlcnR5IChkaXNwT2JUeXBlKSkge1xuXG4gICAgICAgIElkID0gZi50ZXh0TWFrZSAocGFyZW50LCAnYXBwZW5kJywgZGlzcE9iKTtcbiAgICAgICAgICAgIC8vIGlmIHRleHQgc2hvdWxkIGJlIHBsYWNlZCBhdCBvdGhlciB0aGFuICdhcHBlbmQnIGxvY2F0aW9uLCB0aGVuIHVzZVxuICAgICAgICAgICAgLy8gJ3RleHQnIHRhZyBhbmQgc3BlY2lmeSBwcmVwZW5kLCBhZnRlciBvciBiZWZvcmUgYXMgbmVlZGVkXG5cbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkgKGRpc3BPYikpIHtcblxuICAgICAgICBJZCA9IGRvQXJyYXkgKGRpc3BPYik7XG5cbiAgICB9IGVsc2UgaWYgKGRpc3BPYlR5cGUgPT0gJ29iamVjdCcpIHtcblxuICAgICAgICBJZCA9IGRvT2JqZWN0IChkaXNwT2IpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBJZCA9IG51bGw7XG5cbiAgICB9IC8vIGVuZCBpZiAodHlwZW9mIGRpc3BPYiA9PT0gJ3VuZGVmaW5lZCcgfHwgZGlzcE9iID09PSAwIHx8IGRpc3BPYiA9PT0gbnVsbClcbiAgICBcbiAgICByZXR1cm4gSWQ7XG5cbn07IC8vIGVuZCBmLmRpc3BsYXlPYkggXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmVsZW1lbnRNYWtlID0gKHBhcmVudE9yU2libElkLCByZWxMb2MsIGVsTmFtZSwgY29udGVudCwgYXR0cnMpID0+IHtcbiAgICBcbiAgICB2YXIgaWQ7XG4gICAgdmFyIGF0dHJLZXlzID0gT2JqZWN0LmtleXMgKGF0dHJzKTtcbiAgICB2YXIgaGFzQXR0cnMgPSBhdHRyS2V5cy5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGhhc0F0dHJzICYmIGF0dHJzLmhhc093blByb3BlcnR5ICgnaWQnKSkge1xuXG4gICAgICAgIGlkID0gYXR0cnMuaWQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlkID0gUC5nZW5JZCAoKTtcblxuICAgIH0gLy8gZW5kIGlmIChoYXNBdHRycylcbiAgICBcbiAgICB2YXIgSWQgPSAnIycgKyBpZDtcbiAgICBcbiAgICBpZiAoZWxOYW1lID09PSAnc2NyaXB0JyAmJiBjb250ZW50ICE9PSAwKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzk0MTM3MzcvaG93LXRvLWFwcGVuZC1zY3JpcHQtc2NyaXB0LWluLWphdmFzY3JpcHRcbiAgICAgICAgLy8gaW5zcGlyZWQgYnkgU08gcXVlc3Rpb24sIGJ1dCBzZXR0aW5nIGlubmVySFRNTCBpc24ndCBzdXBwb3NlZCB0byB3b3JrXG4gICAgICAgIC8vIHRoZXJlZm9yZSwgc2V0IHNyYyBhdHRyaWJ1dGUgd2l0aCBwYXRoIHRvIGZpbGUsIGluc3RlYWQgb2YgXG4gICAgICAgIC8vIHNldHRpbmcgaW5uZXJIVE1MIHRvIGNvbnRlbnQgb2YgZmlsZVxuXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYxMDk5NS9jYW50LWFwcGVuZC1zY3JpcHQtZWxlbWVudFxuICAgICAgICAvLyBqUXVlcnkgd29uJ3QgYWRkIHNjcmlwdCBlbGVtZW50IGFzIGl0IGRvZXMgd2l0aCBhbnkgb3RoZXIgZWxlbWVudC4gIFRoZXJlZm9yZSwgbXVzdCBiZSBkb25lXG4gICAgICAgIC8vIHVzaW5nIG9ubHkgamF2YXNjcmlwdCBhcyBmb2xsb3dzOlxuICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcblxuICAgICAgICBzY3JpcHQuc3JjID0gY29udGVudDtcbiAgICAgICAgc2NyaXB0LmlkID0gYXR0cnMuaWQ7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7ICAgICBcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdmFyIGRpdmVsID0gJzwnICsgZWxOYW1lICsgJyBpZD1cIicgKyBpZCArICdcIic7XG4gICAgXG4gICAgICAgIGlmIChjb250ZW50KSB7XG4gICAgXG4gICAgICAgICAgICBkaXZlbCArPSAnPjwvJyArIGVsTmFtZSArICc+JztcbiAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgIGRpdmVsICs9ICc+JztcbiAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKGNvbnRlbnQpXG4gICAgXG4gICAgICAgICQocGFyZW50T3JTaWJsSWQpW3JlbExvY10gKGRpdmVsKTtcblxuICAgIH0gLy8gZW5kIGlmIChlbE5hbWUgPT09ICdzY3JpcHQnKVxuICAgIFxuICAgIFxuICAgIGlmIChoYXNBdHRycykge1xuICAgICAgICBcbiAgICAgICAgJChJZClcbiAgICAgICAgLmF0dHIgKGF0dHJzKTtcblxuICAgIH0gLy8gZW5kIGlmIChoYXNBdHRycylcblxuICAgIGYuZGlzcGxheU9iSCAoSWQsIGNvbnRlbnQpO1xuICAgIFxuICAgIGlmIChlbE5hbWUgPT09ICdmb3JtJykge1xuXG4gICAgICAgICQocGFyZW50KVxuICAgICAgICAuZm9jdXMgKCk7XG5cbiAgICB9IC8vIGVuZCBpZiAoZWxOYW1lID09PSAnZm9ybScpXG4gICAgXG4gICAgcmV0dXJuIElkO1xuXG59OyAvLyBlbmQgZi5lbGVtZW50TWFrZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnRleHRNYWtlID0gKHBhcmVudCwgcmVsTG9jLCBwcmltaXRpdmUpID0+IHtcbiAgICBcbiAgICBpZiAodHlwZW9mIHByaW1pdGl2ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBzaW5nbGVxdW90ZSA9ICcmI3gwMDI3Oyc7XG4gICAgICAgIHZhciBiYWNrc2xhc2ggPSAnJiN4MDA1YzsnO1xuICAgICAgICB2YXIgZG91YmxlcXVvdGUgPSAnJiN4MDAyMjsnO1xuICAgICAgICB2YXIgbHQgPSAnJmx0Oyc7XG4gICAgICAgIFxuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoLycvZywgc2luZ2xlcXVvdGUpO1xuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoL1wiL2csIGRvdWJsZXF1b3RlKTtcbiAgICAgICAgcHJpbWl0aXZlID0gcHJpbWl0aXZlLnJlcGxhY2UgKC9cXFxcL2csIGJhY2tzbGFzaCk7XG4gICAgICAgIHByaW1pdGl2ZSA9IHByaW1pdGl2ZS5yZXBsYWNlICgvPC9nLCBsdCk7XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcmltaXRpdmUgPT09ICdzeW1ib2wnKSB7XG5cbiAgICAgICAgcHJpbWl0aXZlID0gJ3N5bWJvbCc7XG4gICAgICAgICAgICAvLyBvdGhlcndpc2Ugc3RyaW5naWZ5IHdvdWxkIHByb2R1Y2UgJ3t9JyB3aGljaCBpcyBsZXNzIHVzZWZ1bFxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBwcmltaXRpdmUgPSBKU09OLnN0cmluZ2lmeSAocHJpbWl0aXZlKTtcblxuICAgIH0gLy8gZW5kIGlmICh0eXBlb2YgcHJpbWl0aXZlID09PSAnc3RyaW5nJylcbiAgICBcblxuICAgICQocGFyZW50KSBbcmVsTG9jXSAocHJpbWl0aXZlKTtcblxuICAgIHJldHVybiBudWxsO1xuICAgICAgICAvLyB0ZXh0IG9icyBoYXZlIG5vIGlkJ3M6IG9ubHkgdGV4dCBpcyBhcHBlbmRlZCB3aXRoIG5vIHdheSB0byBhZGRyZXNzIGl0XG4gICAgICAgIC8vIGlmIGFkZHJlc3NpbmcgaXMgbmVjZXNzYXJ5LCB1c2Ugc3BhbiBpbnN0ZWFkIG9mIHRleHRcblxufTsgLy8gZW5kIGYudGV4dE1ha2UgXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kaXNwbGF5T2IgPSAoZGlzcE9iKSA9PiB7XG4gICAgXG4gICAgdmFyIHBhcmVudCA9ICdib2R5JztcbiAgICAgICAgLy8gaWYgcGFyZW50IG5vdCBmb3VuZCwgYXBwZW5kIHRvIGJvZHlcblxuICAgIGlmICh0eXBlb2YgZGlzcE9iID09PSAnb2JqZWN0JyAmJiBkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdwYXJlbnQnKSkge1xuXG4gICAgICAgIHBhcmVudCA9IGRpc3BPYi5wYXJlbnQ7XG5cbiAgICB9IC8vIGVuZCBpZiAodHlwZW9mIGRpc3BPYiA9PT0gJ29iamVjdCcgJiYgZGlzcE9iLmhhc093blByb3BlcnR5ICgncGFyZW50JykpXG4gICAgXG4gICAgdmFyIElkID0gZi5kaXNwbGF5T2JIIChwYXJlbnQsIGRpc3BPYik7XG5cbiAgICByZXR1cm4gSWQ7XG5cbn07IC8vIGVuZCBQLmRpc3BsYXlPYiBcblxuUC5kaXNwbGF5UGFnZSA9IFAuZGlzcGxheU9iO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5nZW5JZCA9ICgpID0+IHtcblxuICAgIHZhciBpZCA9ICdpJyArIHYuaWQrKztcbiAgICByZXR1cm4gaWQ7XG5cbn07IC8vIGVuZCBQLmdlbklkXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZ2VuSWRzID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBpZCA9IFAuZ2VuSWQgKCk7XG4gICAgdmFyIElkID0gJyMnICsgaWQ7XG5cbiAgICByZXR1cm4gW2lkLCBJZF07XG5cbn07IC8vIGVuZCBQLmdlbklkc1xuXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbmYuaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn0oKSk7XG5cblxuXG4iLCIvLyBnby1rZXkvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoanFTZWxlY3RvciwgcmVwb3J0U2hpZnQsIGtleURvd25IYW5kbGVyLCByZXBvcnRVcCwga2V5VXBIYW5kbGVyKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgdiA9IHtcblxuICAgIGpxU2VsZWN0b3I6ICdib2R5JyxcbiAgICByZXBvcnRTaGlmdDogZmFsc2UsXG4gICAga2V5RG93bkhhbmRsZXI6IG51bGwsXG4gICAgcmVwb3J0VXA6IGZhbHNlLFxuICAgIGtleVVwSGFuZGxlcjogbnVsbCxcblxuICAgIGtTaGlmdDogZmFsc2UsXG4gICAga0N0cmw6IGZhbHNlLFxuICAgIGtBbHQ6IGZhbHNlLFxuICAgIGtDbWQ6IGZhbHNlLFxuICAgIGtJZ25vcmU6IGZhbHNlLFxuICAgIHdoaWNoU2hpZnRLZXlzOiB7MTY6MSwgMTc6MSwgMTg6MSwgOTE6MSwgOTI6MSwgOTM6MSwgMjI0OjF9LFxuXG4gICAgICAgICAgICAvLyBub3QgcHJpbnRhYmxlIG9yIG5vbi1hc2NpaSBibG9ja1xuICAgIGN0cmxPck5vbkFzY2lpOiB7XG4gICAgICAgIDg6ICdCYWNrc3BhY2UnLFxuICAgICAgICA5OiAnVGFiJyxcbiAgICAgICAgMTM6ICdFbnRlcicsXG4gICAgICAgIDE2OiAnU2hpZnQnLFxuICAgICAgICAxNzogJ0N0cmwnLFxuICAgICAgICAxODogJ0FsdCcsXG4gICAgICAgIDE5OiAnUGF1c2UtYnJlYWsnLFxuICAgICAgICAyMDogJ0NhcHMtbG9jaycsXG4gICAgICAgIDI3OiAnRXNjJyxcbiAgICAgICAgMzI6ICcgJywgIC8vIFNwYWNlXG4gICAgICAgIDMzOiAnUGFnZVVwJyxcbiAgICAgICAgMzQ6ICdQYWdlRG93bicsXG4gICAgICAgIDM1OiAnRW5kJyxcbiAgICAgICAgMzY6ICdIb21lJyxcbiAgICAgICAgMzc6ICdMZWZ0JyxcbiAgICAgICAgMzg6ICdVcCcsXG4gICAgICAgIDM5OiAnUmlnaHQnLFxuICAgICAgICA0MDogJ0Rvd24nLFxuICAgICAgICA0NTogJ0luc2VydCcsXG4gICAgICAgIDQ2OiAnRGVsZXRlJyxcbiAgICAgICAgOTE6ICdXaW5kb3dzS2V5TGVmdCcsXG4gICAgICAgIDkyOiAnV2luZG93c0tleVJpZ2h0JyxcbiAgICAgICAgOTM6ICdXaW5kb3dzT3B0aW9uS2V5JyxcbiAgICAgICAgOTY6ICcwJywgIC8vIE51bXBhZFxuICAgICAgICA5NzogJzEnLCAgLy8gTnVtcGFkXG4gICAgICAgIDk4OiAnMicsICAvLyBOdW1wYWRcbiAgICAgICAgOTk6ICczJywgIC8vIE51bXBhZFxuICAgICAgICAxMDA6ICc0JywgIC8vIE51bXBhZFxuICAgICAgICAxMDE6ICc1JywgIC8vIE51bXBhZFxuICAgICAgICAxMDI6ICc2JywgIC8vIE51bXBhZFxuICAgICAgICAxMDM6ICc3JywgIC8vIE51bXBhZFxuICAgICAgICAxMDQ6ICc4JywgIC8vIE51bXBhZFxuICAgICAgICAxMDU6ICc5JywgIC8vIE51bXBhZFxuICAgICAgICAxMDY6ICcqJywgIC8vIE51bXBhZFxuICAgICAgICAxMDc6ICcrJywgIC8vIE51bXBhZFxuICAgICAgICAxMDk6ICctJywgIC8vIE51bXBhZFxuICAgICAgICAxMTA6ICcuJywgIC8vIE51bXBhZFxuICAgICAgICAxMTE6ICcvJywgIC8vIE51bXBhZFxuICAgICAgICAxMTI6ICdGMScsXG4gICAgICAgIDExMzogJ0YyJyxcbiAgICAgICAgMTE0OiAnRjMnLFxuICAgICAgICAxMTU6ICdGNCcsXG4gICAgICAgIDExNjogJ0Y1JyxcbiAgICAgICAgMTE3OiAnRjYnLFxuICAgICAgICAxMTg6ICdGNycsXG4gICAgICAgIDExOTogJ0Y4JyxcbiAgICAgICAgMTIwOiAnRjknLFxuICAgICAgICAxMjE6ICdGMTAnLFxuICAgICAgICAxMjI6ICdGMTEnLFxuICAgICAgICAxMjM6ICdGMTInLFxuICAgICAgICAxNDQ6ICdOdW1sb2NrJyxcbiAgICAgICAgMTQ1OiAnU2Nyb2xsLWxvY2snLFxuICAgICAgICAyMjQ6ICdNYWNDbWQnLFxuICAgIH0sXG4gICAgXG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBhc2NpaVVuU2hpZnRlZDoge1xuICAgICAgICA0ODogJzAnLFxuICAgICAgICA0OTogJzEnLFxuICAgICAgICA1MDogJzInLFxuICAgICAgICA1MTogJzMnLFxuICAgICAgICA1MjogJzQnLFxuICAgICAgICA1MzogJzUnLFxuICAgICAgICA1NDogJzYnLFxuICAgICAgICA1NTogJzcnLFxuICAgICAgICA1NjogJzgnLFxuICAgICAgICA1NzogJzknLFxuICAgICAgICA1OTogJzsnLFxuICAgICAgICA2MTogJz0nLFxuICAgICAgICA2NTogJ2EnLFxuICAgICAgICA2NjogJ2InLFxuICAgICAgICA2NzogJ2MnLFxuICAgICAgICA2ODogJ2QnLFxuICAgICAgICA2OTogJ2UnLFxuICAgICAgICA3MDogJ2YnLFxuICAgICAgICA3MTogJ2cnLFxuICAgICAgICA3MjogJ2gnLFxuICAgICAgICA3MzogJ2knLFxuICAgICAgICA3NDogJ2onLFxuICAgICAgICA3NTogJ2snLFxuICAgICAgICA3NjogJ2wnLFxuICAgICAgICA3NzogJ20nLFxuICAgICAgICA3ODogJ24nLFxuICAgICAgICA3OTogJ28nLFxuICAgICAgICA4MDogJ3AnLFxuICAgICAgICA4MTogJ3EnLFxuICAgICAgICA4MjogJ3InLFxuICAgICAgICA4MzogJ3MnLFxuICAgICAgICA4NDogJ3QnLFxuICAgICAgICA4NTogJ3UnLFxuICAgICAgICA4NjogJ3YnLFxuICAgICAgICA4NzogJ3cnLFxuICAgICAgICA4ODogJ3gnLFxuICAgICAgICA4OTogJ3knLFxuICAgICAgICA5MDogJ3onLFxuICAgICAgICAxNzM6ICctJyxcbiAgICAgICAgMTg4OiAnLCcsXG4gICAgICAgIDE5MDogJy4nLFxuICAgICAgICAxOTE6ICcvJyxcbiAgICAgICAgMTkyOiAnYCcsXG4gICAgICAgIDIxOTogJ1snLFxuICAgICAgICAyMjA6IFwiXFxcXFwiLFxuICAgICAgICAyMjE6ICddJyxcbiAgICAgICAgMjIyOiBcIidcIixcbiAgICAxODY6IFwiO1wiLCAgLy8gZGl0dG8gZm9yICc7J1xuICAgIDE4NzogXCI9XCIsICAvLyBhcHBhcmVudGx5LCBjaHJvbWUgdGhpbmtzIHdoaWNoIGlzIDE4NyBmb3IgJz0nLCBidXQgbm90IGZpcmVmb3hcbiAgICAxODk6IFwiLVwiLCAgLy8gZGl0dG8gZm9yICctJ1xuICAgIH0sXG4gICAgXG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBhc2NpaVNoaWZ0ZWQ6IHtcbiAgICAgICAgNDg6ICcpJyxcbiAgICAgICAgNDk6ICchJyxcbiAgICAgICAgNTA6ICdAJyxcbiAgICAgICAgNTE6ICcjJyxcbiAgICAgICAgNTI6ICckJyxcbiAgICAgICAgNTM6ICclJyxcbiAgICAgICAgNTQ6ICdeJyxcbiAgICAgICAgNTU6ICcmJyxcbiAgICAgICAgNTY6ICcqJyxcbiAgICAgICAgNTc6ICcoJyxcbiAgICAgICAgNTk6ICc6JyxcbiAgICAgICAgNjE6ICcrJyxcbiAgICAgICAgNjU6ICdBJyxcbiAgICAgICAgNjY6ICdCJyxcbiAgICAgICAgNjc6ICdDJyxcbiAgICAgICAgNjg6ICdEJyxcbiAgICAgICAgNjk6ICdFJyxcbiAgICAgICAgNzA6ICdGJyxcbiAgICAgICAgNzE6ICdHJyxcbiAgICAgICAgNzI6ICdIJyxcbiAgICAgICAgNzM6ICdJJyxcbiAgICAgICAgNzQ6ICdKJyxcbiAgICAgICAgNzU6ICdLJyxcbiAgICAgICAgNzY6ICdMJyxcbiAgICAgICAgNzc6ICdNJyxcbiAgICAgICAgNzg6ICdOJyxcbiAgICAgICAgNzk6ICdPJyxcbiAgICAgICAgODA6ICdQJyxcbiAgICAgICAgODE6ICdRJyxcbiAgICAgICAgODI6ICdSJyxcbiAgICAgICAgODM6ICdTJyxcbiAgICAgICAgODQ6ICdUJyxcbiAgICAgICAgODU6ICdVJyxcbiAgICAgICAgODY6ICdWJyxcbiAgICAgICAgODc6ICdXJyxcbiAgICAgICAgODg6ICdYJyxcbiAgICAgICAgODk6ICdZJyxcbiAgICAgICAgOTA6ICdaJyxcbiAgICAgICAgMTczOiAnXycsXG4gICAgICAgIDE4ODogJzwnLFxuICAgICAgICAxOTA6ICc+JyxcbiAgICAgICAgMTkxOiAnPycsXG4gICAgICAgIDE5MjogJ34nLFxuICAgICAgICAyMTk6ICd7JyxcbiAgICAgICAgMjIwOiAnfCcsXG4gICAgICAgIDIyMTogJ30nLFxuICAgICAgICAyMjI6ICdcIicsXG4gICAgMTg2OiBcIjpcIiwgIC8vIGRpdHRvIGZvciAnOidcbiAgICAxODc6IFwiK1wiLCAgLy8gZGl0dG8gZm9yICcrJ1xuICAgIDE4OTogXCJfXCIsICAvLyBkaXR0byBmb3IgJy0nXG4gICAgfSxcblxuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG52YXIgZj17fTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmluaXQgPSAoKSA9PiB7XG4gICAgXG4gICAgdi5qcVNlbGVjdG9yID0ganFTZWxlY3RvciA/IGpxU2VsZWN0b3IgOiAnYm9keSc7XG4gICAgdi5yZXBvcnRTaGlmdCA9IHJlcG9ydFNoaWZ0ID8gcmVwb3J0U2hpZnQgOiBmYWxzZTtcbiAgICB2LmtleURvd25IYW5kbGVyID0ga2V5RG93bkhhbmRsZXIgPyBrZXlEb3duSGFuZGxlciA6IGYuZGVmYXVsdEhhbmRsZXI7XG4gICAgdi5yZXBvcnRVcCA9IHJlcG9ydFVwID8gcmVwb3J0VXAgOiBmYWxzZTtcbiAgICB2LmtleVVwSGFuZGxlciA9IGtleVVwSGFuZGxlciA/IGtleVVwSGFuZGxlciA6IGYuZGVmYXVsdEhhbmRsZXI7XG5cbiAgICAvL1Auc2V0S2V5T24gKHYuanFTZWxlY3Rvcik7XG4gICAgUC5zZXRLZXlPbiAoKTtcbiAgICBpZiAodHlwZW9mIF9tMCA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICBfbTAgPSB7fTtcblxuICAgIH0gLy8gZW5kIGlmICh0eXBlb2YgX20wID09PSAndW5kZWZpbmVkJylcbiAgICBcbiAgICBcbiAgICBpZiAoIV9tMC5rZXlFdmVudHMpIHtcblxuICAgICAgICBfbTAua2V5RXZlbnRzID0ge307XG4gICAgICAgIC8qXG4gICAgICAgICAgICAvLyBvdmVycmlkZSBqcXVlcnkncyByZW1vdmUgZnVuY3Rpb24gdG8gdHVybiBvbiBhbGwga2V5IGhhbmRsZXJzIGFmdGVyIHJlbW92YWwgb2YgYSBmb3JtXG4gICAgICAgIHZhciBybU9yaWcgPSAkLmZuLnJlbW92ZTtcbiAgICAgICAgJC5mbi5yZW1vdmUgPSBmdW5jdGlvbiAoKXtcblxuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmhhcyAoJ2Zvcm0nKVxuICAgICAgICAgICAgLmVhY2ggKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBQLmFsbEtleXNPbiAoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBybU9yaWcuYXBwbHkgKHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgKi9cblxuICAgIH0gLy8gZW5kIGlmICghX20wLmtleUV2ZW50cylcblxuICAgIHZhciBrZXlFdmVudHMgPSBfbTAua2V5RXZlbnRzO1xuICAgIGtleUV2ZW50cyBbdi5qcVNlbGVjdG9yXSA9IHtvbjogUC5zZXRLZXlPbiwgb2ZmOiBQLnNldEtleU9mZn07XG4gICAgXG5cbn07IC8vIGVuZCBmLmluaXRcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuY0tleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAvLyBjYWxsYmFjayBpcyB2LmtleURvd25IbmRsZXJcbiAgICAvLyByZXR1cm5zIGNoIG9iamVjdCByZWZsZWN0aW5nIHdoaWNoIHNoaWZ0IGtleXMgd2VyZSBwcmVzc2VkIGRvd24sIGNoIGFuZCB3aGljaCB2YWx1ZXNcbiAgICAvL1xuICAgIC8vIHYucmVwb3J0U2hpZnQgdHJ1ZSA9PiB0cmlnZ2VyIGNhbGxiYWNrIGZvciBlYWNoIGtleWRvd24gZXZlbnQgb2YgYW55IGtleSwgXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGluZyBhbnkgc2hpZnQga2V5XG4gICAgLy8gICAgIGZhbHNlID0+IHNoaWZ0IGtleSBldmVudCByZXBvcnRlZCBvbmx5IHdoZW4gdGhlIG5leHQgbm9uLXNoaWZ0IGtleWRvd24gZXZlbnQuXG4gICAgLy8gICAgICAgICAgICAgIFNvLCBjYWxsYmFjayBpcyBvbmx5IHRyaWdnZXJlZCBmb3Igbm9uLXNoaWZ0IGtleSBldmVudHNcbiAgICBcbiAgICAvL2NvbnNvbGUubG9nICgnZ28ta2V5LmNLZXlEb3duIGpxU2VsZWN0b3I6ICcgKyB2LmpxU2VsZWN0b3IpO1xuXG4gICAgdmFyIHdoaWNoID0gZXZlbnQud2hpY2g7XG5cbiAgICAgICAgLy8gbmV2ZXIgaWdub3JlICdFc2MnIGtleSA9PSAyN1xuICAgIGlmICh2LmtJZ25vcmUgJiYgd2hpY2ggIT0gMjcpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IC8vIGVuZCBpZiAoa0lnbm9yZSlcbiAgICBcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbiAoKTtcblxuICAgIHZhciBpc0FTaGlmdEtleSA9IHRydWU7XG4gICAgc3dpdGNoICh3aGljaCkge1xuXG4gICAgICAgIGNhc2UgMTY6IFxuICAgICAgICAgICAgdi5rU2hpZnQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAxNzogXG4gICAgICAgICAgICB2LmtDdHJsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgdi5rQWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgOTE6IFxuICAgICAgICBjYXNlIDkyOiBcbiAgICAgICAgY2FzZSA5MzogXG4gICAgICAgIGNhc2UgMjI0OlxuICAgICAgICAgICAgdi5rQ21kID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpc0FTaGlmdEtleSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICB9ICAgXG5cbiAgICBmLmNLZXlVcERvd25GaW5pc2ggKGlzQVNoaWZ0S2V5LCB3aGljaCwgdi5rZXlEb3duSGFuZGxlcik7XG5cbiAgICBpZiAoIWlzQVNoaWZ0S2V5KSB7XG5cbiAgICAgICAgdi5rU2hpZnQgPSBmYWxzZTtcbiAgICAgICAgdi5rQ3RybCA9IGZhbHNlO1xuICAgICAgICB2LmtBbHQgPSBmYWxzZTtcbiAgICAgICAgdi5rQ21kID0gZmFsc2U7XG5cbiAgICB9IC8vIGVuZCBpZiAoIWlzQVNoaWZ0S2V5KVxuICAgIFxuXG59OyAvLyBlbmQgZi5jS2V5RG93biBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5jS2V5VXAgPSAoZXZlbnQpID0+IHtcbiAgICAvLyBjYWxsYmFjayBpcyB2LmtleURvd25IbmRsZXJcbiAgICBcbiAgICB2YXIgd2hpY2ggPSBldmVudC53aGljaDtcblxuICAgICAgICAvLyBuZXZlciBpZ25vcmUgJ0VzYycga2V5ID09IDI3XG4gICAgaWYgKHYua0lnbm9yZSAmJiB3aGljaCAhPSAyNykge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChrSWdub3JlKVxuICAgIFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uICgpO1xuXG4gICAgdmFyIGlzQVNoaWZ0S2V5ID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKHdoaWNoKSB7XG5cbiAgICAgICAgY2FzZSAxNjogXG4gICAgICAgICAgICB2LmtTaGlmdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTc6IFxuICAgICAgICAgICAgdi5rQ3RybCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgdi5rQWx0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA5MTogXG4gICAgICAgIGNhc2UgOTI6IFxuICAgICAgICBjYXNlIDkzOiBcbiAgICAgICAgY2FzZSAyMjQ6IFxuICAgICAgICAgICAgdi5rQ21kID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaXNBU2hpZnRLZXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAgIFxuXG4gICAgaWYgKCF2LnJlcG9ydFVwKSB7XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSAvLyBlbmQgaWYgKCFyZXBvcnRVcClcbiAgICBcbiAgICBmLmNLZXlVcERvd25GaW5pc2ggKGlzQVNoaWZ0S2V5LCB3aGljaCwgdi5rZXlVcEhhbmRsZXIpO1xuXG59OyAvLyBlbmQgZi5jS2V5VXAgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmNLZXlVcERvd25GaW5pc2ggPSAoaXNBU2hpZnRLZXksIHdoaWNoLCBjYWxsYmFjaykgPT4ge1xuICAgIFxuICAgIGlmIChpc0FTaGlmdEtleSAmJiAhdi5yZXBvcnRTaGlmdCkge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChpc0FTaGlmdEtleSAmJiAhdi5yZXBvcnRTaGlmdClcbiAgICBcbiAgICB2YXIgdGhpc0NoID0gZi5nZXRLZXlDb2RlICh3aGljaCk7XG5cbiAgICB2YXIgY2hPYiA9ICh7XG4gICAgICAgIHNoaWZ0OiB2LmtTaGlmdCxcbiAgICAgICAgY3RybDogdi5rQ3RybCxcbiAgICAgICAgYWx0OiB2LmtBbHQsXG4gICAgICAgIG1hY0NtZDogdi5rQ21kLFxuICAgICAgICB3aGljaDogd2hpY2gsXG4gICAgICAgIGNoOiB0aGlzQ2gsXG4gICAgICAgIGlzQVNoaWZ0S2V5OiBpc0FTaGlmdEtleSxcbiAgICB9KTtcblxuICAgIC8vIGNvbnNvbGUubG9nICgnY2hPYjogJyArIEpTT04uc3RyaW5naWZ5IChjaE9iKSArICdcXG4nKTtcbiAgICAvKlxuICAgIGlmICh2LnJlcG9ydFNoaWZ0KSB7XG5cbiAgICAgICAgY2hPYi5pc0FTaGlmdEtleSA9IGlzQVNoaWZ0S2V5OyAgXG4gICAgICAgICAgICAvLyB0cnVlIGlmIGFueSBvZjogc2hpZnQsIGN0cmwsIGFsdCwgb3IgbWFjQ21kIGFyZSB0cnVlXG4gICAgICAgICAgICAvLyBvbmx5IHJlbGV2YW50IGlmIHYucmVwb3J0U2hpZnQgaXMgdHJ1ZVxuXG4gICAgfSAvLyBlbmQgaWYgKHYucmVwb3J0U2hpZnQpXG4gICAgKi9cblxuICAgIGNhbGxiYWNrIChjaE9iKTtcblxufTsgLy8gZW5kIGYuY0tleVVwRG93bkZpbmlzaCBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kZWZhdWx0SGFuZGxlciA9IChjaE9iKSA9PiB7XG4gICAgXG4gICAgdmFyIGNoT2JTID0gSlNPTi5zdHJpbmdpZnkgKGNoT2IpO1xuICAgIGNvbnNvbGUubG9nICgnZ28ta2V5LmRlZmF1bHRIYW5kbGVyLmNoT2I6ICcgKyBjaE9iUyk7XG5cbn07IC8vIGVuZCBmLmRlZmF1bHRIYW5kbGVyIFxuXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZ2V0S2V5Q29kZSA9ICh3aGljaCkgPT4ge1xuICAgIFxuXG4gICAgdmFyIGNoO1xuXG4gICAgaWYgKHYuY3RybE9yTm9uQXNjaWkuaGFzT3duUHJvcGVydHkgKHdoaWNoKSkge1xuXG4gICAgICAgIGNoID0gdi5jdHJsT3JOb25Bc2NpaSBbd2hpY2hdO1xuXG4gICAgfSBlbHNlIGlmICh2LmtTaGlmdCAmJiB2LmFzY2lpU2hpZnRlZC5oYXNPd25Qcm9wZXJ0eSAod2hpY2gpKSB7XG5cbiAgICAgICAgY2ggPSB2LmFzY2lpU2hpZnRlZCBbd2hpY2hdO1xuXG4gICAgfSBlbHNlIGlmICghdi5rU2hpZnQgJiYgdi5hc2NpaVVuU2hpZnRlZC5oYXNPd25Qcm9wZXJ0eSAod2hpY2gpKSB7XG5cbiAgICAgICAgY2ggPSB2LmFzY2lpVW5TaGlmdGVkIFt3aGljaF07XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNoID0gbnVsbDtcblxuICAgIH0gLy8gZW5kIGlmIFxuXG4gICAgcmV0dXJuIGNoO1xuXG59OyAvLyBlbmQgZi5nZXRLZXlDb2RlIFxuXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuaW5pdEtleURvd24gPSAoanFTZWxlY3RvcikgPT4ge1xuICAgIFxuICAgICQoanFTZWxlY3RvcilcbiAgICAub2ZmKCdrZXlkb3duJylcbiAgICAua2V5ZG93biAoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2cgKCcgPT0+IGluaXRLZXlEb3duJyk7XG4gICAgICAgIGYuY0tleURvd24gKGV2ZW50KTtcbiAgICB9KTtcblxufTsgLy8gZW5kIGYuaW5pdEtleURvd24gXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuaW5pdEtleVVwID0gKGpxU2VsZWN0b3IpID0+IHtcbiAgICBcbiAgICAkKGpxU2VsZWN0b3IpXG4gICAgLm9mZigna2V5dXAnKVxuICAgIC5rZXl1cCAoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2cgKCcgPT0+IGluaXRLZXlVcCcpO1xuICAgICAgICBmLmNLZXlVcCAoZXZlbnQpO1xuICAgIH0pO1xuXG59OyAvLyBlbmQgZi5pbml0S2V5VXAgXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5hbGxLZXlzT2ZmID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBrZXlFdmVudHMgPSBfbTAua2V5RXZlbnRzO1xuICAgIHZhciBrZXlTZWxzID0gT2JqZWN0LmtleXMgKGtleUV2ZW50cyk7XG5cbiAgICBrZXlTZWxzLmZvckVhY2ggKGZ1bmN0aW9uIChlbCkge1xuXG4gICAgICAgIGtleUV2ZW50cyBbZWxdLm9mZiAoKTtcbiAgICB9KTtcblxufTsgLy8gZW5kIFAuYWxsS2V5c09mZlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmFsbEtleXNPbiA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIga2V5RXZlbnRzID0gX20wLmtleUV2ZW50cztcbiAgICB2YXIga2V5U2VscyA9IE9iamVjdC5rZXlzIChrZXlFdmVudHMpO1xuXG4gICAga2V5U2Vscy5mb3JFYWNoIChmdW5jdGlvbiAoZWwpIHtcblxuICAgICAgICBrZXlFdmVudHMgW2VsXS5vbiAoKTtcbiAgICB9KTtcblxufTsgLy8gZW5kIFAuYWxsS2V5c09uXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuc2V0S2V5T2ZmID0gKCkgPT4ge1xuICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nICgnU0VUS0VZT0ZGIGdvLWtleS5zZXRLZXlPZmYgICAgIGpxU2VsZWN0b3IgPSAnICsgdi5qcVNlbGVjdG9yKTtcbiAgICAkKHYuanFTZWxlY3RvcilcbiAgICAub2ZmICgna2V5ZG93bicpXG4gICAgLm9mZiAoJ2tleXVwJyk7XG5cbn07IC8vIGVuZCBQLnNldEtleU9mZlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vL1Auc2V0S2V5T24gPSAoanFTZWwpID0+IHtcblAuc2V0S2V5T24gPSAoKSA9PiB7XG4gICAgXG4gICAgICAgIC8vY29uc29sZS5sb2cgKCdTRVRLRVlPTiBnby1rZXkuc2V0S2V5T24gICBqcVNlbGVjdG9yID0gJyArIHYuanFTZWxlY3Rvcik7XG4gICAgLy9mLmluaXRLZXlVcCAoanFTZWwpO1xuICAgIC8vZi5pbml0S2V5RG93biAoanFTZWwpO1xuICAgIGYuaW5pdEtleVVwICh2LmpxU2VsZWN0b3IpO1xuICAgIGYuaW5pdEtleURvd24gKHYuanFTZWxlY3Rvcik7XG5cbn07IC8vIGVuZCBQLnNldEtleUhhbmRsZXJcblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbmYuaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG4iLCIvLyBnby1tc2cvaW5kZXguanNcbi8vIGdvLW1zZyBvYmplY3QgaGFzIGEgdW5pcXVlIHByaW1hcnkgbXNnIGFuZCB6ZXJvIG9yIG1vcmUgb3B0aW9uYWwgYXR0cmlidXRlc1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHAwKSB7XG5cbiAgICAvLyBQUklWQVRFIFByb3BlcnRpZXNcbnZhciB2ID0ge1xuXG4gICAgcHJpbWFyeTogbnVsbCxcbiAgICAgICAgLy8gcHJpbWFyeToge2NtZDogMX0gKGNvbnRhaW5zIG9wdGlvbmFsIGNvbnRlbnQpIG9yIHtjbWQ6IDB9IChubyBvcHRpb25hbCBjb250ZW50IGFsbG93ZWQpXG5cbiAgICBzZWNvbmRhcnk6IG51bGwsXG4gICAgICAgIC8vIGlmIGEgcHJpbWFyeSBtZXNzYWdlIGhhcyBhbiBvcHRpb25hbCBhdHRyaWJ1dGUgdGhhdCBjb25jaWRlbnRhbGx5IGlzIHRoZSBzYW1lIGFzXG4gICAgICAgIC8vIGFub3RoZXIgcHJpbWFyeSBtZXNzYWdlLCBpdCBzaG91bGQgYmUgaGF2ZSBhIGtleS92YWx1ZSBwYWlyIGluIHNlY29uZGFyeSB7YXR0cjogMX1cbiAgICAgICAgLy8gdG8gZW5zdXJlIHRoYXQgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGFuIGF0dHJpYnV0ZSBpbiBjYXNlIGEgcHJpbWFyeSBpcyBwcmVzZW50XG4gICAgICAgIC8vIFNlY29uZGFyeSBpcyBvbmx5IHRlc3RlZCBpZiB0aGVyZSBleGlzdHMgYSBwcmltYXJ5IGtleVxuXG4gICAgbWV0YTogbnVsbCxcbiAgICAgICAgLy8gbWV0YSBwYXJhbWV0ZXJzIGludGVuZGVkIGZvciBjdHJsIG9yIG90aGVyIHB1cnBvc2Ugb3V0c2lkZSBvZiBwcmltYXJ5IGFuZCBzZWNvbmRhcnkgbXNnXG4gICAgICAgIC8vIHBhcmFtZXRlciB1c2FnZVxuXG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG4gICAgLy8gUFJJVkFURSBGdW5jdGlvbnNcbmYgPSB7fTtcblxuXG5mLmluaXQgPSAoKSA9PiB7XG5cbiAgICB2LnByaW1hcnkgPSBwMC5wcmltYXJ5O1xuICAgIHYuc2Vjb25kYXJ5ID0gcDAuaGFzT3duUHJvcGVydHkgKCdzZWNvbmRhcnknKSA/IHAwLnNlY29uZGFyeSA6IHt9O1xuICAgIHYubWV0YSA9IHAwLmhhc093blByb3BlcnR5ICgnbWV0YScpID8gcDAubWV0YSA6IHt9O1xufTtcblxuICAgIC8vIFBVQkxJQyBGdW5jdGlvbnNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnBhcnNlTXNnID0gKG1zZ09iKSA9PiB7XG4gICAgXG4gICAgdmFyIHJlcyA9IHt9O1xuICAgIHZhciBtc2dLZXlzID0gT2JqZWN0LmtleXMgKG1zZ09iKTtcblxuICAgIHZhciBwcmltYXJ5Q2FuZGlkYXRlc09iID0ge307XG4gICAgdmFyIGF0dHJzT2IgPSB7fTtcbiAgICB2YXIgbWV0YU9iID0ge307XG5cbiAgICB2YXIga2V5O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnS2V5cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGtleSA9IG1zZ0tleXMgW2ldO1xuICAgICAgICBcbiAgICAgICAgaWYgKHYucHJpbWFyeS5oYXNPd25Qcm9wZXJ0eSAoa2V5KSkge1xuXG4gICAgICAgICAgICBwcmltYXJ5Q2FuZGlkYXRlc09iIFtrZXldID0gMTtcblxuICAgICAgICB9IGVsc2UgaWYgKHYubWV0YS5oYXNPd25Qcm9wZXJ0eSAoa2V5KSkge1xuXG4gICAgICAgICAgICBtZXRhT2IgW2tleV0gPSBtc2dPYiBba2V5XTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBhdHRyc09iIFtrZXldID0gbXNnT2IgW2tleV07XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKHYucHJpbWFyeS5oYXNPd25Qcm9wZXJ0eSAoa2V5KSlcbiAgICAgICAgXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBtc2dLZXlzLmxlbmd0aDsgaSsrKVxuXG4gICAgdmFyIHByaW1hcnlDYW5kaWRhdGVzQSA9IE9iamVjdC5rZXlzIChwcmltYXJ5Q2FuZGlkYXRlc09iKTtcblxuICAgIHZhciBwcmltYXJ5S2V5O1xuICAgIHZhciBjb250ZW50O1xuXG4gICAgaWYgKHByaW1hcnlDYW5kaWRhdGVzQS5sZW5ndGggPT09IDApIHtcblxuICAgICAgICBwcmltYXJ5S2V5ID0gbnVsbDtcblxuICAgIH0gZWxzZSBpZiAocHJpbWFyeUNhbmRpZGF0ZXNBLmxlbmd0aCA9PT0gMSkge1xuXG4gICAgICAgIHByaW1hcnlLZXkgPSBwcmltYXJ5Q2FuZGlkYXRlc0EgWzBdO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaGFuZGxlIHByaW1hcnkvc2Vjb25kYXJ5IGtleSByZXNvbHV0aW9uXG5cbiAgICAgICAgcHJpbWFyeUtleSA9IG51bGw7XG4gICAgICAgIGZvciAoa2V5IGluIHByaW1hcnlDYW5kaWRhdGVzT2IpIHtcblxuICAgICAgICAgICAgaWYgKHYuc2Vjb25kYXJ5Lmhhc093blByb3BlcnR5IChrZXkpKSB7XG5cbiAgICAgICAgICAgICAgICBhdHRyc09iIFtrZXldID0gbXNnT2IgW2tleV07XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJpbWFyeUtleSA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlLZXkgPSBrZXk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcy5lcnIgPSAnTXVsdGlwbGUgcHJpbWFyeSBrZXlzIGZvdW5kIG5vdCBpbiBzZWNvbmRhcnkgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkgKG1zZyk7XG5cbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBpZiAocHJpbWFyeUtleSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKHYuc2Vjb25kYXJ5Lmhhc093blByb3BlcnR5IChrZXkpKVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH0gLy8gZW5kIGlmIChwcmltYXJ5Q2FuZGlkYXRlc0EubGVuZ3RoID09PSAwKVxuXG5cbiAgICBpZiAoIXJlcy5oYXNPd25Qcm9wZXJ0eSAoJ2VycicpKSB7XG5cbiAgICAgICAgcmVzLnAgPSBwcmltYXJ5S2V5O1xuICAgICAgICByZXMuYyA9IHByaW1hcnlLZXkgJiYgdi5wcmltYXJ5IFtwcmltYXJ5S2V5XSAhPT0gMCA/IG1zZ09iIFtwcmltYXJ5S2V5XSA6IG51bGw7XG4gICAgICAgICAgICAvLyBleGFtcGxlIHZvaWQgaHRtbCB0YWcgaGFzIHplcm8gY29udGVudCwgc28gY29udGVudCBpcyBmb3JjZWQgdG8gbnVsbFxuXG4gICAgICAgIHJlcy5zID0gYXR0cnNPYjtcbiAgICAgICAgcmVzLm0gPSBtZXRhT2I7XG5cbiAgICB9IC8vIGVuZCBpZiAoIXJlcy5oYXNPd25Qcm9wZXJ0eSAoJ2VycicpKVxuICAgIFxuICAgIFxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLnBhcnNlTXNnIFxuXG5cblxuICAgIC8vIGVuZCBQVUJMSUMgRnVuY3Rpb25zXG5cbmYuaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG4iLCIvLyBnby1wb3BpbmZvL2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRwKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgXyA9IHtcbiAgICBkcHA6IGRwLmRpc3BsYXlQYWdlLFxuICAgIGdlbklkOiBkcC5nZW5JZCxcbiAgICBhcnJvd1NpemU6IDEwLFxuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG5cbl8uaW5pdCA9ICgpID0+IHtcblxuICAgIF8uc2V0UG9wdXBTdHlsZSAoKTtcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmdldFBvc0RpbSA9IChqcSkgPT4ge1xuICAgIFxuICAgIHZhciByZXMgPSB7fTtcblxuICAgIHZhciBvZmZzZXQgPSAkKGpxKS5vZmZzZXQgKCk7XG4gICAgcmVzLmxlZnQgPSBvZmZzZXQubGVmdDtcbiAgICByZXMudG9wID0gb2Zmc2V0LnRvcDtcblxuICAgIHJlcy53aWR0aCA9ICQoanEpLndpZHRoICgpO1xuICAgIHJlcy5oZWlnaHQgPSAkKGpxKS5oZWlnaHQgKCk7XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgXy5nZXRQb3NEaW0gXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnNldFBvcHVwU3R5bGUgPSAoKSA9PiB7XG4gICAgXG4gICAgdmFyIGFzID0gXy5hcnJvd1NpemU7XG5cbiAgICB2YXIgcG9wdXBTdHlsZSA9IFtcbiAgICAgICAge3JtOiAnI3N0eWxlcG9waW5mbyd9LFxuICAgICAgICB7c3R5bGU6ICcucG9wdXAgeycgK1xuICAgICAgICAncG9zaXRpb246IHJlbGF0aXZlOycgK1xuICAgICAgICAnZGlzcGxheTogaW5saW5lLWJsb2NrOycgK1xuICAgICAgICAnYm9yZGVyOiAxcHggc29saWQgYmx1ZTsnICtcbiAgICAgICAgJ2JvcmRlci1yYWRpdXM6IDRweDsnICtcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3I6ICNlYmYyZjI7JyArXG4gICAgICAgICdmb250LXNpemU6IDEycHg7JyArXG4gICAgJ30nICtcbiAgICAnLnBvcHVwd3JhcCB7JyArXG4gICAgICAgICdwb3NpdGlvbjogYWJzb2x1dGU7JyArXG4gICAgJ30nICtcbiAgICAnLnBvcHVwbm92aXMgeycgK1xuICAgICAgICAnZGlzcGxheTogbm9uZTsnICtcbiAgICAnfScgK1xuICAgICcuYXJyb3cgeycgK1xuICAgICAgICAncG9zaXRpb246IGFic29sdXRlOycgK1xuICAgICAgICAnZGlzcGxheTogaW5saW5lLWJsb2NrOycgK1xuICAgICAgICAnd2lkdGg6IDA7JyArXG4gICAgICAgICdoZWlnaHQ6IDA7JyArXG4gICAgICAgICdib3JkZXItc3R5bGU6IHNvbGlkOycgK1xuICAgICAgICAnYm94LXNpemluZzogYm9yZGVyLWJveDsnICtcbiAgICAnfScgK1xuICAgICcuYXJyb3dib3JkZXIgeycgK1xuICAgICAgICAnYm9yZGVyLXdpZHRoOiAnICsgKGFzIC0gMSkgKyAncHg7JyArXG4gICAgICAgICdib3JkZXItY29sb3I6IGJsdWUgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7JyArXG4gICAgICAgICdib3R0b206IC0nICsgKDIqYXMgLSAyKSArICdweDsnICtcbiAgICAnfScgK1xuICAgICcuYXJyb3dmaWxsZXIgeycgK1xuICAgICAgICAnYm9yZGVyLXdpZHRoOiAnKyAoYXMgLSAyKSArICdweDsnICtcbiAgICAgICAgJ2JvcmRlci1jb2xvcjogI2ViZjJmMiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDsnICtcbiAgICAgICAgJ2JvdHRvbTogLScgKyAoMiphcyAtIDQpICsgJ3B4OycgK1xuICAgICAgICAnei1pbmRleDogMTsnICtcbiAgICAnfScsIFxuICAgIGlkOiAnc3R5bGVwb3BpbmZvJywgcGFyZW50OiAnaGVhZCd9XG4gICAgXTtcblxuICAgIF8uZHBwIChwb3B1cFN0eWxlKTtcblxufTsgLy8gZW5kIF8uc2V0UG9wdXBTdHlsZVxuXG5cblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmNyZWF0ZVBvcHVwRGlzcGxheSA9IChqcU9iSW4sIGRpc3BzdHIsIG9wdGlvbnMpID0+IHtcbiAgICBcbiAgICBqcU9iID0gdHlwZW9mIGpxT2JJbiA9PT0gJ3N0cmluZycgPyAkKGpxT2JJbikgOiBqcU9iSW47XG4gICAgSWRqcU9iID0gJyMnICsganFPYiBbMF0uaWQ7XG5cbiAgICBkaXNwU3RycyA9IGRpc3BzdHIuc3BsaXQgKCdcXG4nKTtcblxuICAgIHZhciBkaXNwQSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcFN0cnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgZGlzcFN0ciA9IGRpc3BTdHJzIFtpXTtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG5cbiAgICAgICAgICAgIGRpc3BBLnB1c2ggKHticjowfSk7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGkgPiAwKVxuICAgICAgICBcbiAgICAgICAgZGlzcEEucHVzaCAoe3NwYW46IGRpc3BTdHIsIHN0eWxlOiAnZGlzcGxheTogaW5saW5lLWJsb2NrOyd9KTtcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwU3RyczsgaSsrKVxuICAgIFxuICAgIHZhciBkaXNwT2IgPSB7ZGl2OiBkaXNwQSwgc3R5bGU6ICdtYXJnaW46IDJweDsnfTtcbiAgICB2YXIgcG9zRWwgPSBfLmdldFBvc0RpbSAoanFPYik7XG5cbiAgICAgICAgLy8gZm9yY2VzIGRpdiB3aWR0aCB0byB3aWR0aCBvZiBjb250ZW50XG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDUwOTAzL2hvdy10by1tYWtlLWRpdi1ub3QtbGFyZ2VyLXRoYW4taXRzLWNvbnRlbnRzXG5cbiAgICB2YXIgaWRBYiA9IF8uZ2VuSWQgKCk7XG4gICAgdmFyIGlkQWYgPSBfLmdlbklkICgpO1xuXG4gICAgdmFyIGRpdkFycm93Qm9yZGVyID0ge2RpdjogMCwgaWQ6IGlkQWIsIGNsYXNzOiAnYXJyb3cgYXJyb3dib3JkZXInfTtcbiAgICB2YXIgZGl2QXJyb3dGaWxsZXIgPSB7ZGl2OiAwLCBpZDogaWRBZiwgY2xhc3M6ICdhcnJvdyBhcnJvd2ZpbGxlcid9O1xuXG4gICAgaWRBYiA9ICcjJyArIGlkQWI7XG4gICAgaWRBZiA9ICcjJyArIGlkQWY7XG5cbiAgICAvL3ZhciBwb3BPYiA9IHtkaXY6IFtkaXNwT2IsIGRpdkFycm93Qm9yZGVyLCBkaXZBcnJvd0ZpbGxlcl0sIGNsYXNzOiAncG9wdXAnLCBhZnRlcjogSWRqcU9ifTtcbiAgICB2YXIgcG9wT2JSZWwgPSB7ZGl2OiBbZGlzcE9iLCBkaXZBcnJvd0JvcmRlciwgZGl2QXJyb3dGaWxsZXJdLCBjbGFzczogJ3BvcHVwJ307XG4gICAgdmFyIHBvcE9iID0ge2RpdjogcG9wT2JSZWwsIGNsYXNzOiAncG9wdXB3cmFwJ307XG4gICAgdmFyIElkUG9wT2IgPSBfLmRwcCAocG9wT2IpO1xuICAgIHZhciBwb3NQb3B1cCA9IF8uZ2V0UG9zRGltIChJZFBvcE9iKTtcblxuICAgIHZhciB0b3BETyA9IHBvc0VsLnRvcCAtIHBvc1BvcHVwLmhlaWdodCAtIF8uYXJyb3dTaXplO1xuICAgIHZhciBsZWZ0RE8gPSBwb3NFbC5sZWZ0ICsgcG9zRWwud2lkdGgvMiAtIHBvc1BvcHVwLndpZHRoLzI7XG5cbiAgICAkKElkUG9wT2IpXG4gICAgLm9mZnNldCAoe3RvcDogdG9wRE8sIGxlZnQ6IGxlZnRET30pO1xuXG4gICAgdmFyIHBvc0FiID0gXy5nZXRQb3NEaW0gKGlkQWIpO1xuICAgIHZhciBwb3NBZiA9IF8uZ2V0UG9zRGltIChpZEFmKTtcblxuICAgIHZhciBhcyA9IF8uYXJyb3dTaXplO1xuICAgICQoaWRBYilcbiAgICAub2Zmc2V0ICh7dG9wOiBwb3NBYi50b3AsIGxlZnQ6IGxlZnRETyArIHBvc1BvcHVwLndpZHRoLzIgLSBhcy8yIC0gMn0pO1xuXG4gICAgJChpZEFmKVxuICAgIC5vZmZzZXQgKHt0b3A6IHBvc0FmLnRvcCwgbGVmdDogbGVmdERPICsgcG9zUG9wdXAud2lkdGgvMiArIDEgLSBhcy8yIC0gMn0pO1xuXG4gICAgJChJZFBvcE9iKVxuICAgIC5hZGRDbGFzcyAoJ3BvcHVwbm92aXMnKTtcblxuICAgIHJldHVybiBJZFBvcE9iO1xufTsgLy8gZW5kIFAuY3JlYXRlUG9wdXBEaXNwbGF5IFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5oaWRlUG9wdXBzID0gKElkKSA9PiB7XG4gICAgXG4gICAgdmFyIHNlbCA9IElkID8gSWQgOiAnLnBvcHVwd3JhcCc7XG5cbiAgICAkKHNlbClcbiAgICAuYWRkQ2xhc3MgKCdwb3B1cG5vdmlzJyk7XG5cblxufTsgLy8gZW5kIFAuaGlkZVBvcHVwc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnNob3dQb3B1cHMgPSAoSWQpID0+IHtcbiAgICBcbiAgICB2YXIgc2VsID0gSWQgPyBJZCA6ICcucG9wdXB3cmFwJztcblxuICAgICQoc2VsKVxuICAgIC5yZW1vdmVDbGFzcyAoJ3BvcHVwbm92aXMnKTtcblxuXG59OyAvLyBlbmQgUC5zaG93UG9wdXBzXG5cblxuXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbl8uaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG5cbiIsIi8vIGdvLXV0aWwvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciB2ID0ge1xuXG4gICAga2V5MTogcmVxdWlyZSAoJ2tleTEnKVxuXG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xudmFyIGY9e307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRkc0RvSXQgPSAob2IsIHRvVW5pY29kZSkgPT4ge1xuICAgIC8vIG9iIGlzIGFycmF5ID0+IHJldHVybnMgc2FtZSBvYlxuICAgIC8vIG9iIGlzIG9iamVjdCA9PiByZXR1cm5zIG5ldyBvYlxuICAgIFxuICAgIHZhciByZXM7XG5cbiAgICB2YXIgZG9SZXBsYWNlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgbmV3S2V5O1xuXG4gICAgICAgIGlmICh0b1VuaWNvZGUpIHtcblxuICAgICAgICAgICAgbmV3S2V5ID0ga2V5LnJlcGxhY2UgKC9cXCQvZywgJ1xcXFx1RkYwNCcpO1xuICAgICAgICAgICAgbmV3S2V5ID0gbmV3S2V5LnJlcGxhY2UgKC9cXC4vZywgJ1xcXFx1RkYwRScpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIG5ld0tleSA9IGtleS5yZXBsYWNlICgvXFxcXHVGRjA0L2csICckJyk7XG4gICAgICAgICAgICBuZXdLZXkgPSBuZXdLZXkucmVwbGFjZSAoL1xcXFx1RkYwRS9nLCAnLicpO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmICh0b1VuaWNvZGUpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3S2V5O1xuICAgIH07XG5cbiAgICBpZiAob2IgIT09IG51bGwgJiYgdHlwZW9mIG9iID09PSAnb2JqZWN0JyAmJiAhKG9iLmhhc093blByb3BlcnR5ICgnX2Jzb250eXBlJykgJiYgb2IuX2Jzb250eXBlID09PSAnT2JqZWN0SUQnKSkge1xuXG4gICAgICAgIHZhciBpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSAob2IpKSB7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvYi5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgb2IgW2ldID0gZi5kZHNEb0l0IChvYiBbaV0sIHRvVW5pY29kZSk7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgb2IubGVuZ3RoOyBpKyspXG5cbiAgICAgICAgICAgIHJlcyA9IG9iO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJlcyA9IHt9O1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzIChvYik7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXMgW2ldO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IG9iW2tleV07XG4gICAgXG4gICAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IGRvUmVwbGFjZSAoa2V5KTtcbiAgICBcbiAgICAgICAgICAgICAgICByZXMgW25ld0tleV0gPSBmLmRkc0RvSXQgKHZhbCwgdG9Vbmljb2RlKTtcbiAgICBcblxuICAgICAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzOyBpKyspXG4gICAgICAgICAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSlcbiAgICAgICAgXG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXMgPSBvYjtcblxuICAgIH0gLy8gZW5kIGlmIChvYiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2IgIT09ICdvYmplY3QnKVxuXG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAgLy8gZW5kIGYuZGRzRG9JdCBcblxuXG4gICAgLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5hclRvT2IgPSAoYXIpID0+IHtcbiAgICBcbiAgICB2YXIgb2IgPSB7fTtcbiAgICBcbiAgICBpZiAoQXJyYXkuaXNBcnJheSAoYXIpKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhci5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICB2YXIgbmFtZSA9IGFyIFtpXTtcbiAgICAgICAgICAgIG9iIFtuYW1lXSA9IGk7XG5cbiAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBhci5sZW5ndGg7IGkrKylcblxuICAgIH0gLy8gZW5kIGlmIChBcnJheS5pc0FycmF5IChhcikpXG4gICAgcmV0dXJuIG9iO1xuXG59OyAvLyBlbmQgUC5hclRvT2IgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuY2xvbmVPYiA9IChvYikgPT4ge1xuICAgIC8vIGFzc3VtZXMgbm8gdmFsdWVzIHRoYXQgYXJlIGZ1bmN0aW9uIHR5cGVzXG4gICAgXG4gICAgcmV0dXJuIEpTT04ucGFyc2UgKEpTT04uc3RyaW5naWZ5IChvYikpO1xuXG59OyAvLyBlbmQgUC5jbG9uZU9iIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmNvbnN0U3RyID0gKGNoLCBsZW5ndGgpID0+IHtcbiAgICBcbiAgICB2YXIgcmVzID0gbmV3IEFycmF5IChsZW5ndGggKyAxKS5qb2luIChjaCk7XG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIGNvbnN0U3RyIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmRvbGxhckRvdFN1YlVuaWNvZGUgPSAob2IpID0+IHtcbiAgICBcbiAgICByZXR1cm4gZi5kZHNEb0l0IChvYiwgdHJ1ZSk7XG5cbn07ICAvLyBlbmQgZG9sbGFyRG90U3ViVW5pY29kZSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kb2xsYXJEb3RTdWJVbmljb2RlUmVzdG9yZSA9IChvYikgPT4ge1xuICAgIFxuICAgIHJldHVybiBmLmRkc0RvSXQgKG9iLCBmYWxzZSk7XG5cbn07ICAvLyBlbmQgZG9sbGFyRG90U3ViVW5pY29kZVJlc3RvcmVcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kdW1wT2IgPSAob2IsIGRlcHRoKSA9PiB7XG4gICAgXG4gICAgZGVwdGggPSBkZXB0aCA/IGRlcHRoIDogMDtcblxuICAgIHZhciBpbmRlbnRDdXI7XG4gICAgdmFyIGluZGVudERlbHRhO1xuICAgIHZhciBrZXlzID0gW107XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBkdW1wT2JJbml0ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgaW5kZW50Q3VyID0gMDtcbiAgICAgICAgaW5kZW50RGVsdGEgPSA0O1xuICAgIFxuICAgIH07IC8vIGVuZCBkdW1wT2JJbml0XG4gICAgXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBkZWNySW5kZW50ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgaW5kZW50Q3VyIC09IGluZGVudERlbHRhO1xuICAgIFxuICAgIH07IC8vIGVuZCBkZWNySW5kZW50XG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgaW5jckluZGVudCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGluZGVudEN1ciArPSBpbmRlbnREZWx0YTtcbiAgICBcbiAgICB9OyAvLyBlbmQgaW5jckluZGVudFxuICAgIFxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIGRvSW5kZW50ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFwiIFwiLnJlcGVhdCAoaW5kZW50Q3VyKTtcbiAgICBcbiAgICB9OyAvLyBlbmQgZG9JbmRlbnRcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciB0b3BLZXkgPSAoKSA9PiB7XG4gICAgXG4gICAgICAgIHZhciByZXMgPSBcIlwiO1xuICAgICAgICB2YXIgc3RhcnRJO1xuXG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA8PSBkZXB0aCkge1xuXG4gICAgICAgICAgICBzdGFydEkgPSAwO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHN0YXJ0SSA9IGtleXMubGVuZ3RoIC0gZGVwdGg7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGtleXMubGVuZ3RoIDw9IGRlcHRoKVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydEk7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHJlcyArPSBrZXlzIFtpXTtcbiAgICAgICAgICAgIHJlcyArPSBpID09PSBrZXlzLmxlbmd0aCAtIDEgPyBcIlwiIDogXCIuXCI7XG5cbiAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlcztcblxuICAgIH07IC8vIGVuZCB0b3BLZXlcblxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgZHVtcEtleVBhaXIgPSAob2IsIGtleSkgPT4ge1xuICAgIFxuICAgICAgICB2YXIgcHJlZml4ID0gdG9wS2V5ICgpO1xuXG4gICAgICAgIHZhciByZXMgPSBkb0luZGVudCAoKTtcbiAgICAgICAgdmFyIHZhbCA9IG9iIFtrZXldO1xuXG4gICAgICAgIGtleXMucHVzaCAoa2V5KTtcbiAgICAgICAgcmVzICs9IHByZWZpeCAhPT0gXCJcIiA/IHByZWZpeCArICcuJyA6IFwiXCI7XG4gICAgICAgIHJlcyArPSBrZXkgKyAnOiAnO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdfaWQnICYmIFAuaXNPYiAodmFsKSAmJiB2YWwuaGFzT3duUHJvcGVydHkgKCdfYnNvbnR5cGUnKSAmJiB2YWwuX2Jzb250eXBlID09PSAnT2JqZWN0SUQnKSB7XG5cbiAgICAgICAgICAgIHJlcyArPSAnT2JqZWN0SWQoXCInICsgdmFsICsgJ1wiKSc7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmVzICs9IGR1bXBPYkggKHZhbCk7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGtleSA9PT0gJ19pZCcgJiYgUC5pc09iICh2YWwpICYmIHZhbC5oYXNPd25Qcm9wZXJ0eSAoJ19ic29udHlwZScpICYmIHZhbC5fYnNvbnR5cGUgPT09ICdPYmplY3RJRCcpXG4gICAgICAgIFxuICAgICAgICBrZXlzLnBvcCAoKTtcblxuICAgICAgICByZXMgKz0gXCJcXG5cIjtcblxuICAgICAgICByZXR1cm4gcmVzO1xuXG4gICAgfTsgLy8gZW5kIGR1bXBLZXlQYWlyIFxuXG4gICAgXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBkdW1wT2JIID0gKG9iKSA9PiB7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmVzO1xuICAgICAgICBpZiAodHlwZW9mIG9iID09PSAndW5kZWZpbmVkJykge1xuICAgIFxuICAgICAgICAgICAgcmVzID0gJ3VuZGVmaW5lZCc7XG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAob2IgPT09IG51bGwpIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9ICdudWxsJztcbiAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2IgPT09ICdib29sZWFuJykge1xuICAgIFxuICAgICAgICAgICAgcmVzID0gb2IgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYiA9PT0gJ251bWJlcicpIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9IFwiXCIgKyBvYjtcbiAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2IgPT09ICdzdHJpbmcnKSB7XG4gICAgXG4gICAgICAgICAgICBpZiAoIW9iLm1hdGNoICgvJy8pKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzID0gXCInXCIgKyBvYiArIFwiJ1wiO1xuICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmICghb2IubWF0Y2ggKC9cIi8pKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzID0gJ1wiJyArIG9iICsgJ1wiJztcbiAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzID0gJ1wiJyArIG9iLnJlcGxhY2UgKC9cIi8sICdcXFxcXCInKSArICdcIic7XG4gICAgXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAoIW9iLm1hdGNoICgvJy8pKVxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSAob2IpKSB7XG4gICAgXG4gICAgICAgICAgICBpZiAob2IubGVuZ3RoID09PSAwKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzID0gJ1tdJztcbiAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzID0gXCJbXFxuXCI7XG4gICAgICAgICAgICAgICAgaW5jckluZGVudCAoKTtcbiAgICBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iLmxlbmd0aDsgaSsrKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPSBkdW1wS2V5UGFpciAob2IsIGkpO1xuICAgIFxuICAgICAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgb2IubGVuZ3RoOyBpKyspXG4gICAgXG4gICAgICAgICAgICAgICAgZGVjckluZGVudCAoKTtcbiAgICBcbiAgICAgICAgICAgICAgICByZXMgKz0gZG9JbmRlbnQgKCk7XG4gICAgICAgICAgICAgICAgcmVzICs9IFwiXVwiIDtcbiAgICBcbiAgICAgICAgICAgIH0gLy8gZW5kIGlmIChvYi5sZW5ndGggPT09IDApXG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iID09PSAnb2JqZWN0Jykge1xuICAgIFxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyAob2IpLnNvcnQgKCk7XG4gICAgXG4gICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IFwie31cIjtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IFwie1xcblwiO1xuICAgICAgICAgICAgICAgIGluY3JJbmRlbnQgKCk7XG4gICAgXG4gICAgICAgICAgICAgICAga2V5cy5mb3JFYWNoIChmdW5jdGlvbiAoa2V5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzICs9IGR1bXBLZXlQYWlyIChvYiwga2V5KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkZWNySW5kZW50ICgpO1xuICAgICAgICAgICAgICAgIHJlcyArPSBkb0luZGVudCAoKTtcbiAgICAgICAgICAgICAgICByZXMgKz0gXCJ9XCI7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmIChrZXlzLmxlbmd0aCA9PT0gMClcbiAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9ICd1bmtub3duOiAnICsgdHlwZW9mIG9iO1xuICAgIFxuICAgICAgICB9IC8vIGVuZCBpZiAodHlwZW9mIG9iID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgXG4gICAgfTsgLy8gZW5kIGR1bXBPYkhcbiAgICBcbiAgICBkdW1wT2JJbml0ICgpO1xuICAgIHJldHVybiBkdW1wT2JIIChvYik7XG5cbn07IC8vIGVuZCBQLmR1bXBPYiBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmlzRW1wdHkgPSAoaXRlbSkgPT4ge1xuICAgIFxuICAgIHZhciByZXMgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAodHlwZW9mIGl0ZW0pIHtcblxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuXG4gICAgICAgICAgICByZXMgPSBpdGVtLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG5cbiAgICAgICAgICAgIHJlcyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdvYmplY3QnOlxuXG4gICAgICAgICAgICBpZiAoUC5pc09iIChpdGVtKSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyAoaXRlbSk7XG4gICAgICAgICAgICAgICAgcmVzID0ga2V5cy5sZW5ndGggPT09IDA7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgcmVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5IChpdGVtKSkge1xuXG4gICAgICAgICAgICAgICAgcmVzID0gaXRlbS5sZW5ndGggPT09IDA7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXMgPSBudWxsOyAgLy8gY2FzZSBzaG91bGRuJ3QgaGFwcGVuLCBzbyBzZXQgdG8gbnVsbCBpZiBpdCBkb2VzXG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmIChQLmlzT2IgKGl0ZW0pKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdib29sZWFuJzpcblxuICAgICAgICAgICAgcmVzID0gIWl0ZW07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdudW1iZXInOlxuXG4gICAgICAgICAgICByZXMgPSBudW1iZXIgPT09IDA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgIH0gLy8gZW5kIHN3aXRjaCAodHlwZW9mIGl0ZW0pXG4gICAgXG5cbiAgICByZXR1cm4gcmVzO1xufTsgLy8gZW5kIFAuaXNFbXB0eSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5pc09iID0gKG9iKSA9PiB7XG4gICAgLy8gcmV0dXJucyB0cnVlIGlmIG9iIGlzIGRlZmluZWQsIG5vdCBudWxsLCBub3QgYW4gQXJyYXkgYW5kIG9mIHR5cGUgb2JqZWN0XG4gICAgXG4gICAgdmFyIHJlcyA9IHR5cGVvZiBvYiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgIG9iICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICFBcnJheS5pc0FycmF5IChvYikgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIG9iID09PSAnb2JqZWN0JztcblxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLmlzT2IgXG5cblxuUC5rZXkxID0gdi5rZXkxO1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnBhcnNlUGF0aCA9IChhYnNQYXRoKSA9PiB7XG4gICAgXG4gICAgdmFyIGRpcjtcbiAgICB2YXIgZmlsZTtcblxuICAgIHZhciBtYXRjaGVkID0gYWJzUGF0aC5tYXRjaCAoLyguKlxcLykoW15cXC9dKikvKTtcbiAgICBpZiAobWF0Y2hlZCkge1xuXG4gICAgICAgIGRpciA9IG1hdGNoZWQgWzFdO1xuICAgICAgICBmaWxlID0gbWF0Y2hlZCBbMl07XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGRpciA9IFwiXCI7IFxuICAgICAgICBmaWxlID0gYWJzUGF0aDtcblxuICAgIH0gLy8gZW5kIGlmIChtYXRjaGVkKVxuICAgIFxuICAgIHJldHVybiB7ZGlyOiBkaXIsIGZpbGU6IGZpbGV9O1xuXG59OyAvLyBlbmQgUC5wYXJzZVBhdGggXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAucENoZWNrID0gKHAsIHBEZWZhdWx0KSA9PiB7XG4gICAgLy8gZGl0Y2hlcyBhbnkgcGFyYW1ldGVycyBzdXBwbGllZCBpbiBwIHRoYXQgYXJlbid0IHByZXNlbnQgaW4gcERlZmF1bHRcbiAgICAvLyBpZiBhIHBhcmFtIGlzIG5lY2Vzc2FyeSB0byBhIHJvdXRpbmUsIHRoZW4gaXQgc2hvdWxkIGJlIGRlZmluZWQgaW4gcERlZmF1bHRcbiAgICBcbiAgICB2YXIgcmVzID0ge307XG5cbiAgICBwID0gUC5pc09iIChwKSA/IHAgOiB7fTtcbiAgICBcbiAgICBmb3IgKHZhciBrZXkgaW4gcERlZmF1bHQpIHtcblxuICAgICAgICByZXMgW2tleV0gPSBwLmhhc093blByb3BlcnR5IChrZXkpID8gcCBba2V5XSA6IHBEZWZhdWx0IFtrZXldO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLnBDaGVjayBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5zdHJpcFFKID0gKGpzb25TdHIpID0+IHtcbiAgICBcbiAgICB2YXIgcmVzID0ganNvblN0ci5yZXBsYWNlICgvXCIoW15cIl0rKVwiXFxzKjovZywgXCIkMTpcIik7XG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIFAuc3RyaXBRSiBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC50cmF2ZXJzZUFycmF5ID0gKGFyciwgZm5FbCkgPT4ge1xuICAgIFxuICAgIGlmIChBcnJheS5pc0FycmF5IChhcnIpKSB7XG5cbiAgICAgICAgYXJyLmZvckVhY2ggKGZ1bmN0aW9uIChlbCkge1xuXG4gICAgICAgICAgICBQLnRyYXZlcnNlQXJyYXkgKGVsLCBmbkVsKTtcblxuICAgICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgaWYgKFAuaXNPYiAoYXJyKSkge1xuXG4gICAgICAgICAgICB2YXIgdmFsID0gUC52YWwxIChhcnIpO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSAodmFsKSkge1xuXG4gICAgICAgICAgICAgICAgUC50cmF2ZXJzZUFycmF5ICh2YWwsIGZuRWwpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgZm5FbCAoYXJyKTtcblxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKEFycmF5LmlzQXJyYXkgKHZhbCkpXG4gICAgICAgICAgICBcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBmbkVsIChhcnIpO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChQLmlzT2IgKGFycikpXG5cbiAgICB9IC8vIGVuZCBpZiAoQXJyYXkuaXNBcnJheSAoYXJyKSlcbiAgICBcblxufTsgLy8gZW5kIFAudHJhdmVyc2VBcnJheSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC52YWwxID0gKG9iKSA9PiB7XG4gICAgXG4gICAgdmFyIGtleTEgPSBQLmtleTEgKG9iKTtcbiAgICB2YXIgcmVzID0ga2V5MSA/IG9iIFtrZXkxXSA6IG51bGw7XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC52YWwxIFxuXG5cblxuICAgIC8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5yZXR1cm4gUDtcblxufSgpKTtcblxuXG5cbiIsIi8vIGdvLXdzLWNsaWVudC9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpcCwgcG9ydCwgY2xpZW50LCBvcHRpb25zKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgdiA9IHtcbiAgICBcbiAgICBpcDogaXAsXG4gICAgcG9ydDogcG9ydCxcbiAgICBzZWN1cmVDb25uZWN0aW9uOiBudWxsLFxuXG4gICAgdXQ6IHJlcXVpcmUgKCdnby11dGlsJyksXG4gICAgbWluc2VjOiByZXF1aXJlICgnbWluc2VjJykuZ2V0TWluU2VjLFxuICAgIG1zZ1Nob3J0ZW4wOiByZXF1aXJlICgnbXNnc2hvcnRlbicpLFxuICAgIG1zZ1NoOiBudWxsLFxuICAgIHBjaGVjazogbnVsbCxcbiAgICBrZXkxOiBudWxsLFxuXG4gICAgd3NTZXJ2ZXI6IG51bGwsXG4gICAgd3NVcmxPYjogbnVsbCxcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xudmFyIGY9e307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmluaXQgPSAoKSA9PiB7XG5cbiAgICB2LnBjaGVjayA9IHYudXQucENoZWNrO1xuICAgIHYua2V5MSA9IHYudXQua2V5MTtcblxuICAgIC8vdmFyIHRhcmdldExlbmd0aCA9IDgwMDAwO1xuICAgIHZhciB0YXJnZXRMZW5ndGggPSAyMDA7XG4gICAgdi5tc2dTaCA9IG5ldyB2Lm1zZ1Nob3J0ZW4wICh0YXJnZXRMZW5ndGgpO1xuXG4gICAgdmFyIHBhcmFtcyA9IHYucGNoZWNrIChvcHRpb25zLCB7c2VjdXJlQ29ubmVjdGlvbjogZmFsc2V9KTtcblxuICAgIHYuc2VjdXJlQ29ubmVjdGlvbiA9IHBhcmFtcy5zZWN1cmVDb25uZWN0aW9uO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cgKCd3c0NsaWVudCBwYXJhbXM6ICcgKyBKU09OLnN0cmluZ2lmeSAocGFyYW1zKSArICdcXG4nKTtcbiAgICBcbiAgICB2LnRzdENtZHMgPSAge3Bpbmc6IGYudHN0Q21kUGluZ1Jlc3B9O1xuICAgIHYuY2xpZW50ID0gY2xpZW50ID8gY2xpZW50IDogZi5yZXBvcnRNc2dPYjtcblxuICAgIHZhciB3c1ByZWZpeCA9IHYuc2VjdXJlQ29ubmVjdGlvbiA/ICd3c3MnIDogJ3dzJztcbiAgICB2YXIgd3NVcmwgPSB3c1ByZWZpeCArICc6Ly8nICsgdi5pcCArICc6JyArIHYucG9ydDtcblxuICAgIHYud3NVcmxPYiA9IHtcbiAgICAgICAgd3NQcmVmaXg6IHdzUHJlZml4LFxuICAgICAgICBpcDogdi5pcCxcbiAgICAgICAgcG9ydDogdi5wb3J0XG4gICAgfTtcblxuICAgIC8vdi53c1NlcnZlciA9IG5ldyBXZWJTb2NrZXQgKHdzVXJsLCBKU09OLnN0cmluZ2lmeSAodi53c1VybE9iKSk7XG4gICAgdi53c1NlcnZlciA9IG5ldyBXZWJTb2NrZXQgKHdzVXJsLCB2LmlwKTtcbiAgICAgICAgLy8gdXNpbmcgdi5pcCBhcyBvcHRpb25hbCBET01TdHJpbmcgcHJvdG9jb2xzOiBcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYlNvY2tldFxuXG4gICAgdi53c1NlcnZlci5vbm1lc3NhZ2UgPSBmLmZyb21TcnZyO1xuICAgIHYud3NTZXJ2ZXIub25jbG9zZSA9IGYubXNnQ2xvc2U7XG4gICAgdi53c1NlcnZlci5vbmVycm9yID0gZi5tc2dFcnJvcjtcblxufTsgLy8gZW5kIGYuaW5pdCBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kb0NtZCA9ICh1TXNnT2IpID0+IHtcblxuICAgIC8qXG4gICAgdmFyIGZyb21TcnZyID0gSlNPTi5zdHJpbmdpZnkgKHVNc2dPYik7XG4gICAgdmFyIGZyb21TcnZyU2hvcnQgPSB2Lm1zZ1Nob3J0ZW4ubXNnU2hvcnRlbiAoZnJvbVNydnIpO1xuICAgICovXG4gICAgdmFyIGZyb21TcnZyU2hvcnQgPSB2Lm1zZ1NoLm1zZ1Nob3J0ZW4gKHVNc2dPYik7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJyAgPT0+IHdzQ2xpZW50LmZyb21TcnZyOiAnICsgZnJvbVNydnJTaG9ydCk7XG4gICAgXG4gICAgdU1zZ09iID0gQXJyYXkuaXNBcnJheSAodU1zZ09iKSA/IHVNc2dPYiA6IFt1TXNnT2JdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1TXNnT2IubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgbXNnT2IgPSB1TXNnT2IgW2ldO1xuXG4gICAgICAgIHZhciBjbWQgPSB2LmtleTEgKG1zZ09iKTtcbiAgICBcbiAgICAgICAgaWYgKHYudHN0Q21kcy5oYXNPd25Qcm9wZXJ0eSAoY21kKSkge1xuICAgIFxuICAgICAgICAgICAgdi50c3RDbWRzIFtjbWRdIChtc2dPYiBbY21kXSk7XG4gICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICB2LmNsaWVudCAobXNnT2IpO1xuICAgIFxuICAgICAgICB9IC8vIGVuZCBpZiAodi50c3RDbWRzLmhhc093blByb3BlcnR5IChjbWQpKVxuICAgIFxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgdU1zZ09iLmxlbmd0aDsgaSsrKVxuXG59OyAvLyBlbmQgZi5kb0NtZCBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRvU2VuZCA9IChtc2cpID0+IHtcblxuICAgICAgICAvL2NvbnNvbGUubG9nICgnZi5kb1NlbmQubXNnOiAnICsgbXNnICsgJ1xcbicpO1xuICAgIFxuICAgIHYud3NTZXJ2ZXIuc2VuZCAobXNnKTtcblxufTsgLy8gZW5kIGYuZG9TZW5kIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmZyb21TcnZyID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgdmFyIHRpbWUgPSB2Lm1pbnNlYyAoKTtcbiAgICB2YXIgbXNnID0gZXZlbnQuZGF0YTtcbiAgICBtc2dPYiA9IEpTT04ucGFyc2UgKG1zZyk7XG4gICAgLy92YXIgbXNnbSA9IEpTT04ucGFyc2UgKG1zZyk7XG4gICAgLy92YXIgbXNnT2IgPSBtc2dtLm07XG4gICAgdmFyIG1zZ09iU2hvcnQgPSB2Lm1zZ1NoLm1zZ1Nob3J0ZW4gKG1zZ09iKTtcbiAgICAgICAgY29uc29sZS5sb2cgKCc8PT09PSAnICsgdGltZSArICcgd3NDbGllbnQuZnJvbVNydnI6ICcgKyBtc2dPYlNob3J0ICsgJ1xcbicpO1xuXG4gICAgZi5kb0NtZCAobXNnT2IpO1xuXG59OyAvLyBlbmQgZi5mcm9tU3J2ciBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYubXNnQ2xvc2UgPSAoZXZlbnQpID0+IHtcbiAgICBcbiAgICBjb25zb2xlLmxvZyAoJ2Nsb3NlIGV2ZW50OiAnICsgZXZlbnQuZGF0YSk7XG5cbn07IC8vIGVuZCBmLm1zZ0Nsb3NlIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLm1zZ0Vycm9yID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgdmFyIGV2ZW50TXNnID0gZXZlbnQuZGF0YSA/ICcgZXZlbnQuZGF0YTogJyArIGV2ZW50LmRhdGEgOiBcIlwiO1xuICAgIFxuICAgIHZhciBlcnJNc2cgPSAnd3NDbGllbnQgbXNnRXJyb3IgKFNlcnZlciBpcyBEb3duPyknICsgZXZlbnRNc2c7XG4gICAgY29uc29sZS5sb2cgKGVyck1zZyk7XG5cbiAgICAkKCdib2R5JykucHJlcGVuZCAoZXJyTXNnKTtcblxufTsgLy8gZW5kIGYubXNnRXJyb3IgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYucmVwb3J0TXNnT2IgPSAobXNnT2IpID0+IHtcbiAgICBcbiAgICBjb25zb2xlLmxvZyAoJ2YucmVwb3J0TXNnT2IubXNnT2I6ICcgKyBtc2dPYiArICdcXG4nKTtcblxufTsgLy8gZW5kIGYucmVwb3J0TXNnT2IgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYudHN0Q21kUGluZ1Jlc3AgPSAocGluZ01zZykgPT4ge1xuICAgIFxuICAgIGNvbnNvbGUubG9nICgncGluZzogJyArIHBpbmdNc2cpO1xuICAgIHJldHVybjtcblxufTsgLy8gZW5kIGYudHN0Q21kUGluZ1Jlc3AgXG5cbmYuaW5pdCAoKTtcblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmdldFdzVXJsID0gKCkgPT4ge1xuICAgIFxuICAgIHJldHVybiB2LndzVXJsT2I7XG5cbn07IC8vIGVuZCBQLmdldFdzVXJsXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAudG9TcnZyID0gKG1zZ09iKSA9PiB7XG4gICAgdmFyIHRpbWUgPSB2Lm1pbnNlYyAoKTtcbiAgICB2YXIgbXNnT2JTaG9ydCA9IHYubXNnU2gubXNnU2hvcnRlbiAobXNnT2IpO1xuICAgIGNvbnNvbGUubG9nICgnXFxuXFxuPT09PT4gJyArIHRpbWUgKyAnIHdzQ2xpZW50LnRvU3J2cjogJyArIG1zZ09iU2hvcnQgKyAnXFxuJyk7XG4gICAgXG4gICAgdmFyIG1zZ09iUyA9IEpTT04uc3RyaW5naWZ5IChtc2dPYik7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJ3AudG9TcnZyLm1zZ09iUyA6ICcgKyBtc2dPYlMgKyAnXFxuJyk7XG4gICAgXG4gICAgZi5kb1NlbmQgKG1zZ09iUyk7XG5cbn07IC8vIGVuZCBQLnRvU3J2ciBcblxuXG5yZXR1cm4gUDtcblxufTtcblxuXG5cbiIsIi8vIGtleTEuanNcblxuLy8ga2V5MSBleHRyYWN0cyB0aGUgc2luZ2xlIGtleSBmcm9tIGFuIG9iamVjdCBcbi8vIGNvbnRhaW5pbmcgb25seSBvbmUga2V5L3ZhbHVlIHBhaXJcbi8vIGFuZCByZXR1cm5zIHRoZSBzdHJpbmcgdmFsdWUgZm9yIHRoZSBrZXlcbi8vIGFueXRoaW5nIGVsc2UgcGFzc2VkIHRvIGtleTEgcmV0dXJucyBudWxsXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnZhciBrZXkxID0gKG9iKSA9PiB7XG5cbiAgICBrZXkgPSBudWxsO1xuXG4gICAgdmFyIHVuaXF1ZUtleUV4aXN0cyA9IHR5cGVvZiBvYiAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2IgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkob2IpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvYiA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMob2IpLmxlbmd0aCA9PT0gMTtcbiAgICBcbiAgICBpZiAodW5pcXVlS2V5RXhpc3RzKSB7XG4gICAgXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2IpO1xuICAgICAgICBrZXkgPSBrZXlzWzBdO1xuICAgIFxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSAob2IpKSB7XG5cbiAgICAgICAgdmFyIG9iMCA9IG9iIFswXTtcbiAgICAgICAgdmFyIHVuaXF1ZUFycmF5S2V5RXhpc3RzID0gdHlwZW9mIG9iMCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2IwICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvYjAgIT09ICdvYmplY3QnO1xuXG4gICAgICAgIGlmICh1bmlxdWVBcnJheUtleUV4aXN0cykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBrZXkgPSBvYjA7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKHVuaXF1ZUFycmF5S2V5RXhpc3RzKVxuXG5cbiAgICB9IC8vIGVuZCBpZiAodW5pcXVlS2V5RXhpc3RzKVxuICAgIFxuICAgIHJldHVybiBrZXk7XG4gICAgXG59OyAvLyBlbmQga2V5MSBcblxucmV0dXJuIGtleTE7XG5cbn0oKSk7XG4iLCIvLyBpbmRleC5qcyA9PiBtaW5zZWNcblxuLy8gZ2V0IG1pbnV0ZXM6c2Vjb25kcy5taWxsaXNlY29uZHNcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG52YXIgZj17fTtcblxuZi5pbml0ID0gKCkgPT4ge1xufTsgLy8gZW5kIGYuaW5pdFxuXG4gICAgLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZ2V0TWluU2VjID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBkdCA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHN0U3RyID0gZHQudG9KU09OICgpO1xuXG4gICAgdmFyIG1hdGNoZWQgPSBzdFN0ci5tYXRjaCAoLy4qPzooLiopWi8pO1xuXG4gICAgdmFyIHJlcyA9IG1hdGNoZWQgWzFdO1xuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLmdldE1pblNlY1xuXG5cblxuICAgIC8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5mLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59KCkpO1xuXG5cblxuXG5cblxuIiwiLy8gaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0TGVuZ3RoKSB7XG5cbiAgICAvLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG5cbiAgICB0YXJnZXRMZW5ndGg6IHRhcmdldExlbmd0aCA/IHRhcmdldExlbmd0aCA6IG51bGwsXG4gICAga2V5c09ubHk6IGZhbHNlLFxuXG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xudmFyIGY9e307XG5cbmYuaW5pdCA9ICgpID0+IHtcbn07IC8vIGVuZCBmLmluaXRcblxuICAgIC8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLm1zZ1Nob3J0ZW4gPSAobXNnT2IpID0+IHtcbiAgICBcbiAgICB2YXIgbXNnT2JTdHIgPSB0eXBlb2YgbXNnT2IgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkgKG1zZ09iKSA6IG1zZ09iO1xuICAgIFxuICAgIGlmICh2LmtleXNPbmx5KSB7XG5cbiAgICAgICAgdmFyIG1zZ09iUCA9IEpTT04ucGFyc2UgKG1zZ09iU3RyKTtcbiAgICAgICAgdmFyIG1zZ0EgPSBBcnJheS5pc0FycmF5IChtc2dPYlApID8gbXNnT2JQIDogW21zZ09iUF07XG5cbiAgICAgICAgdmFyIG1zZ0tleXNBID0gW107XG5cbiAgICAgICAgbXNnQS5mb3JFYWNoIChmdW5jdGlvbiAobXNnKSB7XG5cbiAgICAgICAgICAgIHZhciBtc2dLZXlzID0gT2JqZWN0LmtleXMgKG1zZyk7XG4gICAgICAgICAgICBtc2dLZXlzQS5wdXNoIChtc2dLZXlzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1zZ0tleXNBLmxlbmd0aCA9PT0gMSkge1xuXG4gICAgICAgICAgICBtc2dLZXlzQSA9IG1zZ0tleXNBIFswXTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAobXNnS2V5c0EubGVuZ3RoID09PSAxKVxuICAgICAgICBcbiAgICAgICAgbXNnT2JTdHIgPSBKU09OLnN0cmluZ2lmeSAobXNnS2V5c0EpO1xuXG4gICAgfSAvLyBlbmQgaWYgKHYua2V5c09ubHkpXG4gICAgXG4gICAgaWYgKG1zZ09iU3RyLmxlbmd0aCA+IHYudGFyZ2V0TGVuZ3RoKSB7XG5cbiAgICAgICAgdmFyIGhhbGZMZW5ndGggPSBNYXRoLmNlaWwgKHYudGFyZ2V0TGVuZ3RoIC8gMik7XG5cbiAgICAgICAgdmFyIGZpcnN0SGFsZiA9IG1zZ09iU3RyLnN1YnN0ciAoMCwgaGFsZkxlbmd0aCk7XG4gICAgICAgIHZhciBzZWNvbmRIYWxmID0gbXNnT2JTdHIuc3Vic3RyIChtc2dPYlN0ci5sZW5ndGggLSBoYWxmTGVuZ3RoLCBoYWxmTGVuZ3RoKVxuXG4gICAgICAgIG1zZ09iU3RyID0gZmlyc3RIYWxmICsgJyAgPD09Xl58Xl49PT4gICcgKyBzZWNvbmRIYWxmO1xuXG4gICAgfSAvLyBlbmQgaWYgKG1zZ09iU3RyLmxlbmd0aCA+IHYudGFyZ2V0TGVuZ3RoKVxuICAgIFxuXG4gICAgcmV0dXJuIG1zZ09iU3RyO1xuXG59OyAvLyBlbmQgUC5tc2dTaG9ydGVuIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnNldEtleXNPbmx5ID0gKGtleXNPbmx5KSA9PiB7XG4gICAgXG4gICAgdi5rZXlzT25seSA9IGtleXNPbmx5O1xuXG59OyAvLyBlbmQgUC5zZXRLZXlzT25seSBcblxuXG4gICAgLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbmYuaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG4iXX0=
