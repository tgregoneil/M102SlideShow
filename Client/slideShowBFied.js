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
    srvAws: '34.219.171.86',

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

    var cmd = v.key1 (msgOb);
    var vals = msgOb [cmd];

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

        return Ids [Ids.length - 1];
        //return Ids;
        
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
    // if dispOb is an array, only the last Id is returned
    
    var parent = 'body';
        // if parent not found, append to body

    if (typeof dispOb === 'object' && dispOb.hasOwnProperty ('parent')) {

        parent = dispOb.parent;

    } // end if (typeof dispOb === 'object' && dispOb.hasOwnProperty ('parent'))
    
    var Id = f.displayObH (parent, dispOb);

    return Id;

}; // end P.displayOb 

//---------------------
P.displayObA = (dispObA) => {
    // this is the way displayOb should have been written in the first place, to always
    // return an array if Ids, if the argument is an array
    
    var Ids;
    if (Array.isArray (dispObA)) {

        var parent = dispObA.hasOwnProperty ('parent') ? dispObA.parent : 'body';

        Ids = [];
        for (var ix = 0; ix < dispObA.length; ix++) {

            Ids.push (f.displayObH (parent, dispObA [ix]));

        } // end for (var ix = 0; ix < dispObA.length; ix++)

    } else {

        Ids = P.displayOb (dispObA);

    } // end if (Array.isArray (dispObA))
    
    return Ids;

}; // end P.displayObA 


P.displayPage = P.displayOb;

//---------------------
P.genId = (ob) => {

    var id = 'i' + v.id++;

    if (ob) {

        ob.id = id;

    } // end if (ob)
    
    return id;

}; // end P.genId


//---------------------
P.genIds = (ob) => {
    
    var id = ob ? P.genId (ob) : P.genId ();
    var Id = '#' + id;

    return [id, Id];

}; // end P.genIds

//---------------------
P.IdGen = (ob) => {
    
    var Id = P.genIds (ob) [1];
    return Id;

}; // end P.IdGen 




// end PUBLIC section

f.init ();

return P;

}());




},{"go-msg":5}],4:[function(require,module,exports){
// go-key/index.js

module.exports = function (jqSelector, reportShift, keyDownHandler, reportUp, keyUpHandler, allowPropagation) {

// PRIVATE Properties/Methods
const v = {

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
const A = {};
//---------------------
A.init = () => {
    
    v.jqSelector = jqSelector ? jqSelector : 'body';
    v.reportShift = reportShift ? reportShift : false;
    v.keyDownHandler = keyDownHandler ? keyDownHandler : f.defaultHandler;
    v.reportUp = reportUp ? reportUp : false;
    v.keyUpHandler = keyUpHandler ? keyUpHandler : f.defaultHandler;
    v.allowPropagation = allowPropagation;

    //P.setKeyOn (v.jqSelector);
    P.setKeyOn ();
    if (typeof _m0 === 'undefined') {

        _m0 = {};

    } // end if (typeof _m0 === 'undefined')
    
    
    if (!_m0.keyEvents) {

        _m0.keyEvents = {};
        /*
            // override jquery's remove function to turn on all key handlers after removal of a form
        const rmOrig = $.fn.remove;
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

    const keyEvents = _m0.keyEvents;
    keyEvents [v.jqSelector] = {on: P.setKeyOn, off: P.setKeyOff};
    

}; // end A.init

const cb = {};

//---------------------
cb.cKeyDown = (event) => {
    // callback is v.keyDownHndler
    // returns ch object reflecting which shift keys were pressed down, ch and which values
    //
    // v.reportShift true => trigger callback for each keydown event of any key, 
    //                       including any shift key
    //     false => shift key event reported only when the next non-shift keydown event.
    //              So, callback is only triggered for non-shift key events
    
    //console.log ('go-key.cKeyDown jqSelector: ' + v.jqSelector);

    const which = event.which;

        // never ignore 'Esc' key == 27
    if (v.kIgnore && which != 27) {

        return;

    } // end if (kIgnore)
    
    if (!allowPropagation) {

        event.preventDefault();
        event.stopPropagation ();

    } // end if (!allowPropagation)

    let isAShiftKey = true;
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

    /*
    if (!isAShiftKey) {

        v.kShift = false;
        v.kCtrl = false;
        v.kAlt = false;
        v.kCmd = false;

    } // end if (!isAShiftKey)
    */
    

}; // end cb.cKeyDown 


//---------------------
cb.cKeyUp = (event) => {
    // callback is v.keyDownHndler
    
    const which = event.which;

        // never ignore 'Esc' key == 27
    if (v.kIgnore && which != 27) {

        return;

    } // end if (kIgnore)
    
    event.preventDefault();
    event.stopPropagation ();

    let isAShiftKey = true;
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

}; // end cb.cKeyUp 

const f = {};
//---------------------
f.cKeyUpDownFinish = (isAShiftKey, which, callback) => {
    
    if (isAShiftKey && !v.reportShift) {

        return;

    } // end if (isAShiftKey && !v.reportShift)
    
    const thisCh = f.getKeyCode (which);

    const chOb = ({
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
    
    const chObS = JSON.stringify (chOb);
    console.log ('go-key.defaultHandler.chOb: ' + chObS);

}; // end f.defaultHandler 



//---------------------
f.getKeyCode = (which) => {
    

    let ch;

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
        cb.cKeyDown (event);
    });

}; // end f.initKeyDown 


//---------------------
f.initKeyUp = (jqSelector) => {
    
    $(jqSelector)
    .off('keyup')
    .keyup (function (event) {
        //console.log (' ==> initKeyUp');
        cb.cKeyUp (event);
    });

}; // end f.initKeyUp 



// PUBLIC Properties/Methods
const P = {};

//---------------------
P.allKeysOff = () => {
    
    const keyEvents = _m0.keyEvents;
    const keySels = Object.keys (keyEvents);

    keySels.forEach (function (el) {

        keyEvents [el].off ();
    });

}; // end P.allKeysOff


//---------------------
P.allKeysOn = () => {
    
    const keyEvents = _m0.keyEvents;
    const keySels = Object.keys (keyEvents);

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

A.init ();

return P;

};

},{}],5:[function(require,module,exports){
// go-msg/index.js
// go-msg object has a unique primary msg and zero or more optional attributes


module.exports = function (p0) {

const v = {

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

};  

const A = {};
//---------------------
A.init = () => {

    v.primary = p0.primary;
    v.secondary = p0.hasOwnProperty ('secondary') ? p0.secondary : {};
    v.meta = p0.hasOwnProperty ('meta') ? p0.meta : {};

}; // end A.init


const f = {};

//---------------------
f.parseMsg = (msgOb) => {
    
    const res = {};
    const msgKeys = Object.keys (msgOb);

    const primaryCandidatesOb = {};
    const attrsOb = {};
    const metaOb = {};

    let key;
    for (let i = 0; i < msgKeys.length; i++) {

        key = msgKeys [i];
        
        if (v.primary.hasOwnProperty (key)) {

            primaryCandidatesOb [key] = 1;

        } else if (v.meta.hasOwnProperty (key)) {

            metaOb [key] = msgOb [key];

        } else {

            attrsOb [key] = msgOb [key];

        } // end if (v.primary.hasOwnProperty (key))
        
    } // end for (let i = 0; i < msgKeys.length; i++)

    const primaryCandidatesA = Object.keys (primaryCandidatesOb);

    let primaryKey = null;

    if (primaryCandidatesA.length === 1) {

        primaryKey = primaryCandidatesA [0];

    } else {
        // handle primary/secondary key resolution

        for (key in primaryCandidatesOb) {

            if (v.secondary.hasOwnProperty (key)) {

                attrsOb [key] = msgOb [key];

            } else {

                if (primaryKey === null) {

                    primaryKey = key;

                } else {

                    res.err = 'Multiple primary keys found: ' + primaryKey + ',' + key + 'and possibly others. Original message\n'  + JSON.stringify (msg);

                } // end if (primaryKey === null)
                

            } // end if (v.secondary.hasOwnProperty (key))
            
        }

    } // end if (primaryCandidatesA.length === 0)

    if (primaryKey === null) {

        res.err = 'Either there was no primary key or all primary candidates are members of secondary: ' + JSON.stringify (primaryCandidatesA);

    } // end if (primaryKey === null)
    


    res.p = primaryKey;
    res.c = primaryKey && v.primary [primaryKey] !== 0 ? msgOb [primaryKey] : null;
        // example void html tag has zero content, so content is forced to null

    res.s = attrsOb;
    res.m = metaOb;

    return res;

}; // end f.parseMsg 



const P = {};

//---------------------
P.parseMsg = (msgOb) => {
    
    const res = f.parseMsg (msgOb);

    action = v.primary [res.p];
    if (typeof action === 'function') {

        action (res);

    } // end if (typeof action === 'function')
        

    return res;

}; // end P.parseMsg 


//---------------------
P.primaryKeyGet = (msgOb) => {
    
    const res = f.parseMsg (msgOb);
    return res.p;

}; // end P.primaryKeyGet 


A.init ();

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
    var dumpKeyPair = (ob, key, noKey) => {
    
        var prefix = topKey ();

        var res = doIndent ();
        var val = ob [key];

        keys.push (key);
        res += prefix !== "" ? prefix + '.' : "";
        res += noKey ? "" : key + ': ';

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
    
                    res += dumpKeyPair (ob, i, true);
    
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


//---------------------
P.k1A = (Ob) => {
    
    var k1 = Object.keys (Ob)[0];
    var v1 = Ob [k1];

    return [k1, v1];

}; // end P.k1A 


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

// PRIVATE Properties
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

}; 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlc19nbG9iYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleDAuanMiLCJzbGlkZVNob3cuanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tajJoL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLWtleS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby1tc2cvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tcG9waW5mby9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby11dGlsL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLXdzLWNsaWVudC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9rZXkxL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL21pbnNlYy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9tc2dzaG9ydGVuL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3h6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdGJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vLyBjbWRySW5pdC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgdiA9IHtcbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbnZhciBmPXt9O1xuXG5mLmluaXQgPSAoKSA9PiB7XG5cbiAgICB2YXIgYyA9IHJlcXVpcmUgKCcuL3NsaWRlU2hvdy5qcycpO1xuICAgIG5ldyBjICgpO1xufTsgIC8vIGVuZCBmLmluaXRcblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeSAoZi5pbml0KTtcblxufSkgKCk7XG5cblxuXG5yZXR1cm4gUDtcblxufSkgKCk7XG5cblxuXG5cblxuIiwiLy8gc2xpZGVTaG93LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG5cbiAgICB3czogcmVxdWlyZSAoJ2dvLXdzLWNsaWVudCcpLFxuICAgIGtleTogcmVxdWlyZSAoJ2dvLWtleScpLFxuICAgIGoyaDogcmVxdWlyZSAoJ2dvLWpzb24yaHRtbCcpLFxuICAgIHBpOiByZXF1aXJlICgnZ28tcG9waW5mbycpLFxuICAgIGtleTE6IHJlcXVpcmUgKCdrZXkxJyksXG5cbiAgICBkcHA6IG51bGwsXG4gICAgY3VyVmlzOiBudWxsLFxuICAgIG1heEltYWdlczogbnVsbCxcbiAgICBJZFNsaWRlczogbnVsbCxcblxuICAgIGJvb2ttYXJrczogbnVsbCxcbiAgICBib29rbWFya0xzdDogbnVsbCxcbiAgICBJZEJvb2ttYXJrOiBudWxsLFxuICAgIElkQm9va21hcmtTOiBudWxsLFxuICAgIElkRGVsQjogbnVsbCxcbiAgICBJZEFkZEI6IG51bGwsXG4gICAgSWRCb29rUzogbnVsbCxcblxuICAgIGN0STogbnVsbCxcbiAgICB0b3BpY3NJOiBudWxsLFxuICAgIHRvcGljUmVmczogbnVsbCxcbiAgICB0b3BpY1JlZjogbnVsbCxcbiAgICBJZE5hdjogbnVsbCxcbiAgICBJZFBhZ2VDdDogbnVsbCxcbiAgICBJZE5hdlBOOiBudWxsLFxuICAgIHRvcGljVG9WaWRlbzogbnVsbCxcbiAgICBzbGlkZVRvVmlkZW86IG51bGwsXG4gICAgaGlkZGVuU2xpZGU6IG51bGwsXG4gICAgSWRWaWRlb1BsYXlpbmc6IG51bGwsXG4gICAgc3J2QXdzOiAnMzQuMjE5LjE3MS44NicsXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbnZhciBmPXt9O1xuXG5mLmluaXQgPSAoKSA9PiB7XG5cbiAgICB2LmRwcCA9IHYuajJoLmRpc3BsYXlQYWdlO1xuICAgIHYuZ2VuSWQgPSB2LmoyaC5nZW5JZDtcblxuICAgIHYucGkgPSBuZXcgdi5waSAodi5qMmgpO1xuXG4gICAgdmFyICBndCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuXG4gICAgdmFyIGlwU3JjID0gZ3QubWF0Y2ggKC9naXRodWIvKSA/IHYuc3J2QXdzIDogJ2xvY2FsaG9zdCc7XG4gICAgLy92YXIgaXBTcmMgPSB2LnNydkF3cztcbiAgICB2LndzID0gbmV3IHYud3MgKGlwU3JjLCA4MDAxLCBQLmRvQWN0aW9uKTtcblxuICAgIG5ldyB2LmtleSAoJ2JvZHknLCBmYWxzZSwgZi5rZXlGaWx0ZXIpO1xufTsgIC8vIGVuZCBmLmluaXRcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuaW5pdEJvb2ttYXJrcyA9ICgpID0+IHtcblxuICAgIHYuYm9va21hcmtMc3QgPSBbXTtcbiAgICBmLmJvb2ttYXJrc0Zyb21Db29raWUgKCk7XG5cbiAgICB2YXIgaWQgPSB2LmdlbklkICgpO1xuICAgIHZhciBhZGRCID0ge3NwYW46ICdhZGQgYm9va21hcmsnLCBpZDogaWQsIGNsYXNzOiAnYm9va21hcmsnfTtcbiAgICB2LklkQWRkQiA9ICcjJyArIGlkO1xuXG4gICAgdmFyIGlkID0gdi5nZW5JZCAoKTtcbiAgICB2YXIgZGVsQiA9IHtzcGFuOiAnZGVsIGJvb2ttYXJrJywgaWQ6IGlkLCBjbGFzczogJ2Jvb2ttYXJrJ307XG4gICAgdi5JZERlbEIgPSAnIycgKyBpZDtcblxuICAgIHZhciBpZCA9IHYuZ2VuSWQgKCk7XG4gICAgdmFyIGJvb2tTID0ge2RpdjogMCwgaWQ6IGlkfTtcbiAgICB2LklkQm9va1MgPSAnIycgKyBpZDtcblxuICAgIHYuSWRCb29rbWFya1MgPSB2LmRwcCAoe2RpdjogW2FkZEIsIGRlbEIsIGJvb2tTXSwgY2xhc3M6ICdib29rbWFya3Mgbm92aXMnLCBwYXJlbnQ6IHYuSWRCb29rbWFya30pO1xuXG4gICAgJCh2LklkQWRkQiArICcsJyArIHYuSWREZWxCKVxuICAgIC5ob3ZlciAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ3JlZCd9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAnYmxhY2snfSk7XG4gICAgfSk7XG5cbiAgICAkKHYuSWRBZGRCKVxuICAgIC5jbGljayAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2LmJvb2ttYXJrcyBbdi5jdXJWaXNdID0gMTtcbiAgICAgICAgZi5ib29rbWFya3NUb0Nvb2tpZSAoKTtcbiAgICAgICAgZi5ib29rbWFya3NTaG93ICgpO1xuICAgIH0pXG5cbiAgICAkKHYuSWREZWxCKVxuICAgIC5jbGljayAoZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWxldGUgdi5ib29rbWFya3MgW3YuY3VyVmlzXTtcbiAgICAgICAgZi5ib29rbWFya3NUb0Nvb2tpZSAoKTtcbiAgICAgICAgZi5ib29rbWFya3NTaG93ICgpO1xuICAgIH0pXG5cbn07IC8vIGVuZCBmLmluaXRCb29rbWFya3NcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5pbml0U3R5bGUgPSAoKSA9PiB7XG5cbiAgICB2YXIgc3R5bGUgPSB7c3R5bGU6XG4gICAgICAgIFwiYm9keSB7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tbGVmdDogMTVweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuYm9va21hcmsge1wiICtcbiAgICAgICAgICAgIFwid2hpdGUtc3BhY2U6IG5vd3JhcDtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMTJweDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMDtcIiArXG4gICAgICAgICAgICBcInBhZGRpbmc6IDA7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmJvb2ttYXJrcyB7XCIgK1xuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiAjRTVGRkYyO1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyOiAxcHggc29saWQgI0IzQjNGRjtcIiArXG4gICAgICAgICAgICBcImJvcmRlci1yYWRpdXM6IDNweDtcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiBhYnNvbHV0ZTtcIiArXG4gICAgICAgICAgICBcInotaW5kZXg6IDE7XCIgK1xuICAgICAgICAgICAgXCJ0b3A6IDJweDtcIiArXG4gICAgICAgICAgICBcInJpZ2h0OiAycHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmJvb2ttYXJraGVhZGVyIHtcIiArXG4gICAgICAgICAgICBcImZvbnQtc3R5bGU6IGl0YWxpYztcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiAyMDA7XCIgK1xuICAgICAgICAgICAgXCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmNhcHRpb24ge1wiICtcbiAgICAgICAgICAgIFwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDIwcHg7IFwiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IGFic29sdXRlOyBcIiArXG4gICAgICAgICAgICBcImJvdHRvbTogNTBweDsgXCIgK1xuICAgICAgICAgICAgXCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcIiArXG4gICAgICAgICAgICBcIm1heC13aWR0aDogNTAwcHg7XCIgK1xuICAgICAgICAgICAgXCJ3b3JkLWJyZWFrOiBicmVhay1hbGw7XCIgK1xuICAgICAgICAgICAgXCJsZWZ0OiAwO1wiICtcbiAgICAgICAgICAgIFwicmlnaHQ6IDA7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW46IDAgYXV0bztcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuc3ltYm9sd3JhcCB7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogMTZweDtcIiArXG4gICAgICAgICAgICBcImhlaWdodDogMTZweDtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMTVweDtcIiArXG4gICAgICAgICAgICBcImJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyLXJhZGl1czogOHB4O1wiICtcbiAgICAgICAgICAgIFwiZmxvYXQ6IHJpZ2h0O1wiICtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogIzBlMDtcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBwb2ludGVyO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBoYW5kO1wiICtcbiAgICAgICAgICAgIFwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IHJlbGF0aXZlO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5zeW1ib2wge1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IHJlbGF0aXZlO1wiICtcbiAgICAgICAgICAgIFwidG9wOiAtMXB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5oZWFkZXIge1wiICtcbiAgICAgICAgICAgIFwidGV4dC1hbGlnbjogY2VudGVyO1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IHJlbGF0aXZlO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5tMTAge1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luOiAxMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi50NDAge1wiICtcbiAgICAgICAgICAgIFwidG9wOiAtNDBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIucHJlbCB7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnc3MDAge1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDcwMHB4O1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luOiAwIGF1dG87XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmltZ3ZpZGVvIHtcIiArXG4gICAgICAgICAgICBcImhlaWdodDogNTAwcHg7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogNzAwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmltZ2hvbWV3b3JrIHtcIiArXG4gICAgICAgICAgICBcImhlaWdodDogODAwcHg7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogNzAwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmNvbHMge1wiICtcbiAgICAgICAgICAgIFwicGFkZGluZy1yaWdodDogMHB4O1wiICtcbiAgICAgICAgICAgIFwicGFkZGluZy1sZWZ0OiAxMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5ub3ZpcyB7XCIgK1xuICAgICAgICAgICAgXCJkaXNwbGF5OiBub25lO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5uYXYge1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAzMHB4O1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IDkwMDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1sZWZ0OiAxMHB4O1wiICtcbiAgICAgICAgICAgIFwiZGlzcGxheTogaW5saW5lLWJsb2NrO1wiICtcbiAgICAgICAgICAgIFwiZmxvYXQ6IHJpZ2h0O1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBwb2ludGVyO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBoYW5kO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5uYXZwb3Mge1wiICtcbiAgICAgICAgICAgIFwiZmxvYXQ6IHJpZ2h0O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi52aWRlbyB7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgICAgICBcImNvbG9yOiBibHVlO1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luLXJpZ2h0OiAzMHB4O1wiICtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IHBvaW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IGhhbmQ7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnJlZiB7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogaW5pdGlhbDtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMTFweDtcIiArXG4gICAgICAgICAgICBcIndvcmQtYnJlYWs6IGJyZWFrLWFsbDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIudG9waWNyb3dzIHtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1ib3R0b206IDIwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnJvdy50b3BpY3Jvd3MgPiBkaXYge1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyOiAxcHggc29saWQgI2NjYztcIiArXG4gICAgICAgICAgICBcInBhZGRpbmctcmlnaHQ6IDFweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubG9jaGVhZGVyIHtcIiArXG4gICAgICAgICAgICBcImNvbG9yOiByZWQ7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLndlZWsge1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCIgK1xuICAgICAgICBcIn1cIixcbiAgICAgICAgcGFyZW50OiAnaGVhZCd9O1xuXG4gICAgICAgIHYuZHBwIChzdHlsZSk7XG5cbn07IC8vIGVuZCBmLmluaXRTdHlsZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmJvb2ttYXJrQWRkID0gKHNsaWRlKSA9PiB7XG5cbiAgICB2YXIgYm9va21hcmsgPSB2LmJvb2ttYXJrTHN0IFtzbGlkZV0ucmVwbGFjZSAoLy0oLiopXy8sICcgICAgJDEgICAgJyk7XG4gICAgdmFyIElkID0gdi5kcHAgKHtwcmU6IGJvb2ttYXJrLCBwYXJlbnQ6IHYuSWRCb29rUywgbmFtZTogc2xpZGUsIGNsYXNzOiAnYm9va21hcmsnfSlcblxuICAgICQoSWQpXG4gICAgLmNsaWNrIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuID0gJCh0aGlzKS5hdHRyICgnbmFtZScpO1xuICAgICAgICBmLnNldE5leHRWaXMgKG4gLSB2LmN1clZpcyk7XG5cbiAgICAgICAgJCh2LklkQm9va21hcmtTKVxuICAgICAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuICAgIH0pXG4gICAgLmhvdmVyIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAncmVkJ30pO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdibGFjayd9KTtcbiAgICB9KTtcblxuXG59OyAvLyBlbmQgZi5ib29rbWFya0FkZFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmJvb2ttYXJrc1Nob3cgPSAoKSA9PiB7XG5cbiAgICBpZiAodi5ib29rbWFya3MuaGFzT3duUHJvcGVydHkgKHYuY3VyVmlzKSkge1xuXG4gICAgICAgICQodi5JZERlbEIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAgICAgJCh2LklkQWRkQilcbiAgICAgICAgLmFkZENsYXNzICgnbm92aXMnKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgJCh2LklkRGVsQilcbiAgICAgICAgLmFkZENsYXNzICgnbm92aXMnKTtcblxuICAgICAgICAkKHYuSWRBZGRCKVxuICAgICAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgfSAvLyBlbmQgaWYgKHYuYm9va21hcmtzLmhhc093blByb3BlcnR5ICh2LmN1clZpcykpXG5cbiAgICAkKHYuSWRCb29rUylcbiAgICAuZW1wdHkgKCk7XG5cbiAgICB2YXIgc2xpZGVzID0gT2JqZWN0LmtleXMgKHYuYm9va21hcmtzKS5zb3J0IChmdW5jdGlvbiBjb21wYXJlTnVtYmVycyhhLCBiKSB7XG4gICAgICAgIHJldHVybiBhIC0gYjtcbiAgICB9KTtcblxuICAgIGlmIChzbGlkZXMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgIHYuZHBwICh7ZGl2OiAnV2VlayBUb3BpYyBTbGlkZU51bScsIHBhcmVudDogdi5JZEJvb2tTLCBjbGFzczogJ2Jvb2ttYXJrIGJvb2ttYXJraGVhZGVyJ30pO1xuXG4gICAgfSAvLyBlbmQgaWYgKHNsaWRlcy5sZW5ndGggPiAwKVxuICAgIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHNsaWRlID0gc2xpZGVzIFtpXTtcbiAgICAgICAgZi5ib29rbWFya0FkZCAoc2xpZGUpO1xuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXM7IGkrKylcblxuICAgICQodi5JZEJvb2ttYXJrUylcbiAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpXG4gICAgICAgIC8vIGFjdHVhbGx5IHNob3cgdGhlIGJvb2ttYXJrXG5cbiAgICAuaG92ZXIgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gYm9va21hcmtzIGluaXRpYWxseSBwb3NpdGlvbmVkIHVuZGVyIGN1cnNvciwgc28gbm90aGluZyB0byBkbyBmb3IgaG92ZXItaW5cblxuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuYWRkQ2xhc3MgKCdub3ZpcycpXG4gICAgfSlcblxuXG5cblxufTsgLy8gZW5kIGYuYm9va21hcmtzU2hvd1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmJvb2ttYXJrc0Zyb21Db29raWUgPSAoKSA9PiB7XG4gICAgXG4gICAgdmFyIGJvb2ttYXJrc1NmaWVkID0gZG9jdW1lbnQuY29va2llLm1hdGNoICgvbTEwMmJvb2ttYXJrcz0oW147XSspLyk7XG5cbiAgICB2LmJvb2ttYXJrcyA9ICFib29rbWFya3NTZmllZCA/ICB7fSA6IEpTT04ucGFyc2UgKGJvb2ttYXJrc1NmaWVkIFsxXSk7XG5cbn07IC8vIGVuZCBmLmJvb2ttYXJrc0Zyb21Db29raWVcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5ib29rbWFya3NUb0Nvb2tpZSA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgY29va2llID0gJ20xMDJib29rbWFya3M9JyArIEpTT04uc3RyaW5naWZ5ICh2LmJvb2ttYXJrcykgKyAnOyBleHBpcmVzPVRodSwgMSBKYW4gMjAzMCAwMDowMDowMCBVVEM7IHBhdGg9Lyc7XG4gICAgZG9jdW1lbnQuY29va2llID0gY29va2llO1xuXG59OyAvLyBlbmQgZi5ib29rbWFya3NUb0Nvb2tpZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRpc3BsYXlOYXYgPSAoKSA9PiB7XG5cbiAgICB2YXIgbmF2U3BhbnMgPSBbe3NwYW46ICc+JywgaWQ6ICduYXZyJywgY2xhc3M6ICduYXYnfSxcbiAgICB7c3BhbjogJzwnLCBpZDogJ25hdmwnLCBjbGFzczogJ25hdid9XTtcblxuICAgIG5hdlNwYW5zLnBhcmVudCA9IHYuSWROYXZQTjtcblxuICAgIHYuZHBwIChuYXZTcGFucyk7XG5cbiAgICAkKCcjbmF2bCwgI25hdnInKVxuICAgIC5ob3ZlciAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ3JlZCd9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAnYmxhY2snfSk7XG4gICAgfSk7XG5cbiAgICAkKCcjbmF2bCcpXG4gICAgLmNsaWNrIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZi5zZXROZXh0VmlzICgtMSk7XG4gICAgfSk7XG5cbiAgICAkKCcjbmF2cicpXG4gICAgLmNsaWNrIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZi5zZXROZXh0VmlzICgxKTtcbiAgICB9KTtcblxuXG59OyAvLyBlbmQgZi5kaXNwbGF5TmF2XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZGlzcGxheVBuZ0ZpbGVzID0gKHZhbHMpID0+IHtcblxuICAgIHYuY3VyVmlzID0gMDtcbiAgICB2Lm1heEltYWdlcyA9IHZhbHMubGVuZ3RoIC0gMTtcbiAgICAgICAgLy8gbGFzdCB2YWwgaW4gdmFscyBpcyBhbiBlbXB0eSBzdHJpbmcsIHNvIGRvbid0IGNvdW50IGl0XG5cbiAgICB2YXIgd2Vla3MgPSB7fTtcbiAgICB2YXIgdG9waWNzO1xuXG4gICAgdi5jdEkgPSBbXTtcbiAgICB2LnRvcGljc0kgPSBbXTtcbiAgICB2LnRvcGljUmVmcyA9IFtdO1xuICAgIHYuc2xpZGVUb1ZpZGVvID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHYubWF4SW1hZ2VzOyBpKyspIHtcblxuICAgICAgICB2YXIgdmFsID0gdmFscyBbaV07XG5cbiAgICAgICAgdmFyIG1hdGNoZWQgPSB2YWwubWF0Y2ggKC8uLi4oLiopXFwvLio/KFthLXpBLVpdLiopLnBuZy8pO1xuICAgICAgICB2YXIgbG9jID0gbWF0Y2hlZCBbMV07XG4gICAgICAgIHZhciBjYXB0aW9uID0gbWF0Y2hlZCBbMl07XG5cbiAgICAgICAgdmFyIGltZ0NsYXNzID0gbG9jLm1hdGNoICgvSG9tZXdvcmt8RmluYWwvKSA/ICdpbWdob21ld29yaycgOiAnaW1ndmlkZW8nO1xuXG4gICAgICAgIHZhciBkaXZPYiA9IHtkaXY6IFtcbiAgICAgICAgICAgIHtpbWc6IDAsIHNyYzogdmFsLCBjbGFzczogaW1nQ2xhc3MsIGFsdDogJ2ltYWdlIGlzIHN0aWxsIHVwbG9hZGluZyAuLi4ganVzdCBhIG1pbnV0ZSBvciB0d28gbG9uZ2VyIGRlcGVuZGluZyBvbiB5b3VyIG5ldHdvcmsgYmFuZHdpZHRoJ30sXG4gICAgICAgICAgICB7YnI6MH0sXG4gICAgICAgICAgICB7c3BhbjogJyAgICAnICsgbG9jLCBjbGFzczogJ2xvY2hlYWRlcid9LFxuICAgICAgICAgICAge2JyOjB9LFxuICAgICAgICAgICAge2JyOjB9LFxuICAgICAgICAgICAge3NwYW46IGNhcHRpb24sIGNsYXNzOiAnY2FwdGlvbid9XG4gICAgICAgIF0sIGlkOiAnaicgKyBpfTtcblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuXG4gICAgICAgICAgICBkaXZPYi5jbGFzcyA9ICdub3Zpcyc7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGkgIT09PSAwKVxuXG4gICAgICAgIGRpdk9iLnBhcmVudCA9IHYuSWRTbGlkZXM7XG4gICAgICAgIHYuZHBwIChkaXZPYik7XG5cbiAgICAgICAgbWF0Y2hlZCA9IGxvYy5tYXRjaCAoL1coXFxkKSguKj8pXFwvKC4qKS8pO1xuXG4gICAgICAgIHZhciB3aWQgPSAnVycgKyBtYXRjaGVkIFsxXTtcbiAgICAgICAgdmFyIHdlZWsgPSB3aWQgKyBtYXRjaGVkIFsyXTtcbiAgICAgICAgdmFyIHRvcGljID0gbWF0Y2hlZCBbM107XG5cbiAgICAgICAgdmFyIHZpZGVvVG9waWMgPSB3aWQgKyAnLScgKyB0b3BpYztcbiAgICAgICAgdi5zbGlkZVRvVmlkZW8ucHVzaCAodi50b3BpY1RvVmlkZW8gW3ZpZGVvVG9waWNdKTtcblxuICAgICAgICBpZiAoIXdlZWtzLmhhc093blByb3BlcnR5ICh3ZWVrKSkge1xuXG4gICAgICAgICAgICBmLmRpc3BsYXlSZWYgKHdpZCwgd2VlaywgaSwgJ3dlZWsnKTtcbiAgICAgICAgICAgIHdlZWtzIFt3ZWVrXSA9IDE7XG4gICAgICAgICAgICB0b3BpY3MgPSB7fTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoIXdlZWtzLmhhc093blByb3BlcnR5ICh3ZWVrKSlcblxuICAgICAgICB2YXIgc2xpZGVDb3VudDtcbiAgICAgICAgaWYgKCF0b3BpY3MuaGFzT3duUHJvcGVydHkgKHRvcGljKSkge1xuXG4gICAgICAgICAgICB2YXIgZGlzcFJlZiA9IGYuZGlzcGxheVJlZiAod2lkLCB0b3BpYywgaSwgJ3RvcGljJyk7XG4gICAgICAgICAgICB2LnRvcGljUmVmcy5wdXNoIChkaXNwUmVmKTtcblxuICAgICAgICAgICAgaWYgKHRvcGljID09PSAnMDVfU3RvcmFnZUVuZ2luZVdpcmVkVGlnZXInKSB7XG5cbiAgICAgICAgICAgICAgICB2LklkU2FtcGxlVG9waWMgPSBkaXNwUmVmO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAodG9waWMgPT09ICcwMV9XZWxjb21lV2VlazMnKVxuXG4gICAgICAgICAgICB0b3BpY3MgW3RvcGljXSA9IDE7XG5cbiAgICAgICAgICAgIHNsaWRlQ291bnQgPSAxO1xuICAgICAgICAgICAgdi50b3BpY3NJLnB1c2ggKHNsaWRlQ291bnQpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHNsaWRlQ291bnQrKztcbiAgICAgICAgICAgIHYudG9waWNzSSBbdi50b3BpY3NJLmxlbmd0aCAtIDFdID0gc2xpZGVDb3VudDtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoIXRvcGljcy5oYXNPd25Qcm9wZXJ0eSAodG9waWMpKVxuXG4gICAgICAgIHZhciBib29rbWFya05hbWUgPSB2aWRlb1RvcGljICsgJ18nICsgc2xpZGVDb3VudDs7XG4gICAgICAgIHYuYm9va21hcmtMc3QucHVzaCAoYm9va21hcmtOYW1lKTtcblxuICAgICAgICB2LmN0SS5wdXNoIChbc2xpZGVDb3VudCwgdi50b3BpY3NJLmxlbmd0aCAtIDFdKTtcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWxzOyBpKyspXG5cbiAgICBmLnNldE5leHRWaXMgKDApO1xuXG59OyAvLyBlbmQgZi5kaXNwbGF5UG5nRmlsZXNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kaXNwbGF5UmVmID0gKHdpZCwgc3RyLCBpLCBjbGFzc05hbWUpID0+IHtcblxuICAgIHdpZCA9ICcjJyArIHdpZDtcbiAgICB2YXIgcmVmID0gdi5nZW5JZCAoKTtcbiAgICB2LmRwcCAoe2RpdjpcbiAgICAgICAge2Rpdjogc3RyLFxuICAgICAgICAgaWQ6IHJlZixcbiAgICAgICAgIHNsOiBpLFxuICAgICAgICAgc3R5bGU6ICdkaXNwbGF5OmlubGluZS1ibG9jazsgY3Vyc29yOiBwb2ludGVyOyBjdXJzb3I6IGhhbmQ7J1xuICAgICB9LCBwYXJlbnQ6IHdpZCwgY2xhc3M6ICdyZWYgdzcwMCAnICsgY2xhc3NOYW1lfSk7XG5cbiAgICByZWYgPSAnIycgKyByZWY7XG4gICAgJChyZWYpXG4gICAgLmNsaWNrIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuID0gJCh0aGlzKS5hdHRyICgnc2wnKTtcbiAgICAgICAgZi5zZXROZXh0VmlzIChuIC0gdi5jdXJWaXMpO1xuICAgIH0pXG5cbiAgICAkKHJlZilcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSlcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgSWQgPSAnIycgKyBldmVudC50YXJnZXQuaWQ7XG5cbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pXG4gICAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHJlZjtcblxufTsgLy8gZW5kIGYuZGlzcGxheVJlZlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRvU2xpZGVTaG93ID0gKHZhbHMpID0+IHtcblxuICAgIGYubGF5b3V0ICgpO1xuICAgIGYuZGlzcGxheU5hdiAoKTtcbiAgICBmLmRpc3BsYXlQbmdGaWxlcyAodmFscyk7XG5cbiAgICAkKHYuSWRWaWRlbylcbiAgICAuaG92ZXIgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuYXR0ciAoe3N0eWxlOiAnY29sb3I6IHJlZDsnfSlcbiAgICB9LFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuYXR0ciAoe3N0eWxlOiAnY29sb3I6IGJsdWUnfSlcbiAgICB9KVxuICAgIC5jbGljayAoZi5wbGF5VmlkZW8pO1xuXG4gICAgdi5waS5jcmVhdGVQb3B1cERpc3BsYXkgKCcjbmF2cicsXG4gICAgICAgICdDbGljayBQcmV2L05leHQgU2xpZGVcXG4gICAgLS0gb3IgLS1cXG4oa2V5Ym9hcmQgc2hvcnRjdXRzKVxcbkxlZnQvUmlnaHQgQXJyb3dcXG5TcGFjZS9CYWNrc3BhY2UnKTtcbiAgICB2LnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAodi5JZFNhbXBsZVRvcGljLFxuICAgICAgICAnQ2xpY2sgdG8gbmF2aWdhdGUgZGlyZWN0bHlcXG50byBiZWdpbm5pbmcgb2YgdG9waWMnKTtcbiAgICB2LnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAodi5JZEN1clNsaWRlLFxuICAgICAgICAnQ3VycmVudCBzbGlkZSBJbiB0b3BpYy9cXG5Ub3RhbCBzbGlkZXMgaW4gdG9waWMnKTtcbiAgICB2LnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAodi5JZFZpZGVvLFxuICAgICAgICAnQ2xpY2sgdG8gc3RhcnRcXG5wbGF5aW5nIGxlc3NvbiB2aWRlbycpO1xuXG4gICAgJCh2LklkSGVscClcbiAgICAuaG92ZXIgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnI2ZmYTBhMCd9KTtcblxuICAgICAgICB2LnBpLnNob3dQb3B1cHMgKCk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5jc3MgKHsnYmFja2dyb3VuZC1jb2xvcic6ICcjMGUwJ30pO1xuXG4gICAgICAgIHYucGkuaGlkZVBvcHVwcyAoKTtcbiAgICB9KTtcblxuICAgICQodi5JZEJvb2ttYXJrKVxuICAgIC5ob3ZlciAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5jc3MgKHsnYmFja2dyb3VuZC1jb2xvcic6ICcjZmZhMGEwJ30pO1xuICAgICAgICBmLmJvb2ttYXJrc1Nob3cgKCk7XG5cbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmNzcyAoeydiYWNrZ3JvdW5kLWNvbG9yJzogJyMwZTAnfSk7XG5cbiAgICB9KTtcblxufTsgLy8gZW5kIGYuZG9TbGlkZVNob3dcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYua2V5RmlsdGVyID0gKGNob2IpID0+IHtcbiAgICAvL2NvbnNvbGUubG9nICgnY2hvYjogJyArIEpTT04uc3RyaW5naWZ5IChjaG9iKSArICdcXG4nKTtcblxuICAgIHZhciBjaCA9IGNob2IuY2g7XG4gICAgaWYgKGNoID09PSAnUmlnaHQnIHx8IGNoID09PSAnICcpIHtcblxuICAgICAgICBmLnNldE5leHRWaXMgKDEpO1xuXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gJ0xlZnQnIHx8IGNoID09PSAnQmFja3NwYWNlJykge1xuXG4gICAgICAgIGYuc2V0TmV4dFZpcyAoLTEpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGNob2IuY2ggPT09ICdSaWdodCcpXG5cblxufTsgLy8gZW5kIGYua2V5RmlsdGVyXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYubGF5b3V0ID0gKCkgPT4ge1xuXG4gICAgdmFyIElkQ29udGFpbmVyID0gdi5kcHAgKHtkaXY6IDAsIGNsYXNzOiAndzcwMCBtMTAnfSk7XG5cbiAgICB2YXIgaWRCb29rbWFyayA9IHYuZ2VuSWQgKCk7XG5cbiAgICB2YXIgaWRIZWxwID0gdi5nZW5JZCAoKTtcbiAgICB2LmRwcCAoe2RpdjpcbiAgICAgICAge2g0OiBbXG4gICAgICAgICAgICAnU2xpZGVzaG93IE0xMDI6IE1vbmdvREIgZm9yIERCQXMgKEphbi9GZWIgMjAxNyknLFxuICAgICAgICAgICAge2Rpdjoge3NwYW46ICc/JywgY2xhc3M6ICdzeW1ib2wnfSwgaWQ6IGlkSGVscCwgY2xhc3M6ICdzeW1ib2x3cmFwJ30sXG4gICAgICAgICAgICB7ZGl2OiB7c3BhbjogJ0InLCBjbGFzczogJ3N5bWJvbCd9LCBpZDogaWRCb29rbWFyaywgY2xhc3M6ICdzeW1ib2x3cmFwJywgc3R5bGU6ICdtYXJnaW4tcmlnaHQ6IDEwcHg7J31cbiAgICAgICAgXSwgY2xhc3M6ICdoZWFkZXInfSxcbiAgICAgICAgY2xhc3M6ICdyb3cgdzcwMCcsXG4gICAgICAgIHBhcmVudDogSWRDb250YWluZXJ9XG4gICAgKTtcblxuICAgIHYuSWRCb29rbWFyayA9ICcjJyArIGlkQm9va21hcms7XG4gICAgZi5pbml0Qm9va21hcmtzICgpO1xuXG4gICAgdi5JZEhlbHAgPSAnIycgKyBpZEhlbHA7XG5cbiAgICB2LklkU2xpZGVzID0gdi5kcHAgKHtkaXY6IDAsIG5hbWU6ICdzbGlkZXMnLCBjbGFzczogJ3JvdyB3NzAwIHByZWwnLCBwYXJlbnQ6IElkQ29udGFpbmVyfSk7XG5cbiAgICB2YXIgSWROYXYgPSB2LmRwcCAoe2RpdjowLCBuYW1lOiAnbmF2JywgY2xhc3M6ICdyb3cgdzcwMCBwcmVsIHQ0MCcsIHBhcmVudDogSWRDb250YWluZXJ9KTtcblxuICAgIHZhciBJZFZpZGVvRGl2ID0gdi5kcHAgKHtkaXY6MCwgY2xhc3M6ICdjb2wtc20tNycsIHBhcmVudDogSWROYXZ9KTtcbiAgICB2LklkVmlkZW8gPSB2LmRwcCAoe3NwYW46ICdWaWRlbycsIHBhcmVudDogSWRWaWRlb0RpdiwgY2xhc3M6ICduYXZwb3MgdmlkZW8nfSk7XG5cbiAgICB2LklkUGFnZUN0ID0gdi5kcHAgKHtkaXY6MCwgY2xhc3M6ICdjb2wtc20tMicsIHBhcmVudDogSWROYXZ9KTtcblxuICAgIHYuSWROYXZQTiA9IHYuZHBwICh7ZGl2OjAsIGNsYXNzOiAnY29sLXNtLTMnLCBwYXJlbnQ6IElkTmF2fSk7XG5cbiAgICB2YXIgSWRUb3BpY1Jvd3MgPSB2LmRwcCAoe2RpdjowLCBuYW1lOiAndG9waWNSb3dzJywgcGFyZW50OiBJZENvbnRhaW5lciwgY2xhc3M6ICd3NzAwIHByZWwgdDQwJ30pO1xuXG4gICAgdmFyIElkUm93MSA9IHYuZHBwICh7ZGl2OiAwLCBuYW1lOiAndG9waWNSb3dzMScsIGNsYXNzOiAncm93IHRvcGljcm93cycsIHBhcmVudDogSWRUb3BpY1Jvd3N9KVxuICAgIHZhciBJZFJvdzIgPSB2LmRwcCAoe2RpdjogMCwgbmFtZTogJ3RvcGljUm93czInLCBjbGFzczogJ3JvdyB0b3BpY3Jvd3MnLCBwYXJlbnQ6IElkVG9waWNSb3dzfSlcblxuICAgIGYubWFrZUNvbHMgKDAsIElkUm93MSwgNCk7XG4gICAgZi5tYWtlQ29scyAoNCwgSWRSb3cyLCAzKTtcblxufTsgLy8gZW5kIGYubGF5b3V0XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYubWFrZUNvbHMgPSAoYmFzZUlkLCBJZFJvdywgbnVtQ29scykgPT4ge1xuXG4gICAgdmFyIGNvbHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUNvbHM7IGkrKykge1xuXG4gICAgICAgIHZhciBpZCA9ICdXJyArIChpICsgMSArIGJhc2VJZCk7XG4gICAgICAgIGNvbHMucHVzaCAoe2RpdjogMCwgaWQ6IGlkLCBjbGFzczogJ2NvbHMgY29sLXNtLTMnLCBwYXJlbnQ6IElkUm93fSk7XG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKylcblxuICAgIHYuZHBwIChjb2xzKTtcblxufTsgLy8gZW5kIGYubWFrZUNvbHNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5wbGF5VmlkZW8gPSAoKSA9PiB7XG5cbiAgICB2LmhpZGRlblNsaWRlID0gJyNqJyArIHYuY3VyVmlzO1xuXG4gICAgJCh2LmhpZGRlblNsaWRlICsgJz4gaW1nJylcbiAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJCh2LmhpZGRlblNsaWRlICsgJz4gLmNhcHRpb24nKVxuICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKHYuSWRWaWRlbylcbiAgICAudGV4dCAoJ1NsaWRlJylcbiAgICAub2ZmICgnY2xpY2snKVxuICAgIC5jbGljayAoZi5yZXN0b3JlU2xpZGUpO1xuXG4gICAgdmFyIHNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nICsgdi5zbGlkZVRvVmlkZW8gW3YuY3VyVmlzXSArICc/YXV0b3BsYXk9MSc7XG4gICAgdi5JZFZpZGVvUGxheWluZyA9IHYuZHBwICh7aWZyYW1lOiAwLCBzcmM6IHNyYywgY2xhc3M6ICdpbWd2aWRlbycsIHBhcmVudDogdi5oaWRkZW5TbGlkZSwgcHJlcGVuZDogMX0pO1xuXG59OyAvLyBlbmQgZi5wbGF5VmlkZW9cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5yZXN0b3JlU2xpZGUgPSAoKSA9PiB7XG5cbiAgICAkKHYuSWRWaWRlb1BsYXlpbmcpXG4gICAgLnJlbW92ZSAoKTtcblxuICAgICQodi5oaWRkZW5TbGlkZSArICc+IGltZycpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgICQodi5oaWRkZW5TbGlkZSArICc+IC5jYXB0aW9uJylcbiAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJCh2LklkVmlkZW8pXG4gICAgLnRleHQgKCdWaWRlbycpXG4gICAgLm9mZiAoJ2NsaWNrJylcbiAgICAuY2xpY2sgKGYucGxheVZpZGVvKTtcblxuICAgIHYuaGlkZGVuU2xpZGUgPSBudWxsO1xuXG59OyAvLyBlbmQgZi5yZXN0b3JlU2xpZGVcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuc2V0TmV4dFZpcyA9IChkZWx0YSkgPT4ge1xuXG4gICAgaWYgKHYuaGlkZGVuU2xpZGUpIHtcblxuICAgICAgICBmLnJlc3RvcmVTbGlkZSAoKTtcblxuICAgIH0gLy8gZW5kIGlmICh2LmhpZGRlblNsaWRlKVxuXG4gICAgdmFyIG1kZWx0YSA9IGRlbHRhID49IDAgPyBkZWx0YSA6IHYubWF4SW1hZ2VzICsgZGVsdGFcblxuICAgIHZhciBuZXh0VmlzID0gKHYuY3VyVmlzICsgbWRlbHRhKSAlIHYubWF4SW1hZ2VzO1xuXG4gICAgdmFyIElkUHJldiA9ICcjaicgKyB2LmN1clZpcztcbiAgICB2YXIgSWROZXh0ID0gJyNqJyArIG5leHRWaXM7XG5cbiAgICAkKElkUHJldilcbiAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJChJZE5leHQpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgIHYuY3VyVmlzID0gbmV4dFZpcztcblxuICAgIHZhciBjdFJlZiA9IHYuY3RJIFtuZXh0VmlzXTtcblxuICAgIHZhciBzbGlkZUkgPSBjdFJlZiBbMF07XG4gICAgdmFyIHRvcGljSWR4ID0gY3RSZWYgWzFdO1xuICAgIHZhciB0b3RhbEluU2VjdGlvbiA9IHYudG9waWNzSSBbdG9waWNJZHhdO1xuXG4gICAgdi5kcHAgKHtlbXB0eTogdi5JZFBhZ2VDdH0pO1xuICAgIHYuSWRDdXJTbGlkZSA9IHYuZHBwICh7c3BhbjogJ3NsaWRlOiAnICsgc2xpZGVJICsgJy8nICsgdG90YWxJblNlY3Rpb24sXG4gICAgICAgIHBhcmVudDogdi5JZFBhZ2VDdCxcbiAgICAgICAgY2xhc3M6ICduYXZwb3MnfSk7XG5cbiAgICAkKHYudG9waWNSZWYpXG4gICAgLmNzcyAoXG4gICAgICAgIHsnYmFja2dyb3VuZC1jb2xvcic6ICcjZmZmJyxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ25vcm1hbCd9XG4gICAgKTtcblxuICAgIHYudG9waWNSZWYgPSB2LnRvcGljUmVmcyBbdG9waWNJZHhdO1xuXG4gICAgJCh2LnRvcGljUmVmKVxuICAgIC5jc3MgKFxuICAgICAgICB7J2JhY2tncm91bmQtY29sb3InOiAnI2Q2ZmZkNicsXG4gICAgICAgICdmb250LXdlaWdodCc6ICdib2xkJ31cbiAgICApO1xuXG59OyAvLyBlbmQgZi5zZXROZXh0VmlzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYudG9waWNUb1ZpZGVvSWQgPSAoYVRhZ0EpID0+IHtcblxuICAgIHYudG9waWNUb1ZpZGVvID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhVGFnQS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBhVGFnID0gYVRhZ0EgW2ldO1xuICAgICAgICB2YXIgbSA9IGFUYWcubWF0Y2ggKC8uKnlvdXR1LmJlLihbXlwiXSspXCI+KFtePF0rKTwvKTtcbiAgICAgICAgaWYgKG0pIHtcblxuICAgICAgICAgICAgdmFyIHZpZGVvSWQgPSBtIFsxXTtcbiAgICAgICAgICAgIHZhciB0b3BpYyA9IG0gWzJdO1xuXG4gICAgICAgICAgICB2LnRvcGljVG9WaWRlbyBbdG9waWNdID0gdmlkZW9JZDtcblxuICAgICAgICB9IC8vIGVuZCBpZiAobSlcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBhVGFnQTsgaSsrKVxuXG5cbn07IC8vIGVuZCBmLnRvcGljVG9WaWRlb0lkXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kb0FjdGlvbiA9IChtc2dPYikgPT4ge1xuICAgIGNvbnNvbGUubG9nICgnbXNnT2I6ICcgKyBKU09OLnN0cmluZ2lmeSAobXNnT2IpICsgJ1xcbicpO1xuXG4gICAgdmFyIGNtZCA9IHYua2V5MSAobXNnT2IpO1xuICAgIHZhciB2YWxzID0gbXNnT2IgW2NtZF07XG5cbiAgICBzd2l0Y2ggKGNtZCkge1xuXG4gICAgICAgIGNhc2UgJ3JlYWR5JzpcblxuICAgICAgICAgICAgZi5pbml0U3R5bGUgKCk7XG4gICAgICAgICAgICB2LndzLnRvU3J2ciAoe2dldFZpZGVvTGlua3M6MX0pO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndmlkZW9MaW5rcyc6XG5cbiAgICAgICAgICAgIGYudG9waWNUb1ZpZGVvSWQgKHZhbHMpO1xuICAgICAgICAgICAgdi53cy50b1NydnIgKHtnZXRQbmdGaWxlczoxfSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdwbmdGaWxlcyc6XG5cbiAgICAgICAgICAgICQoJ2JvZHknKVxuICAgICAgICAgICAgLmVtcHR5ICgpO1xuXG4gICAgICAgICAgICBmLmRvU2xpZGVTaG93ICh2YWxzKTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICB9IC8vIGVuZCBzd2l0Y2ggKGNtZClcblxuXG5cbn07IC8vIGVuZCBQLmRvQWN0aW9uXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbmYuaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG4iLCIvLyBnby1qMmgvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG5cbiAgICBpZDogMCxcbiAgICBwcmltaXRpdmVUeXBlc05vdE51bGw6IHsnc3RyaW5nJzoxLCAnbnVtYmVyJzoxLCAnYm9vbGVhbic6MSwgJ3N5bWJvbCc6IDF9LFxuICAgICAgICAvLyBzaW5jZSB0eXBlb2YgbnVsbCB5aWVsZHMgJ29iamVjdCcsIGl0J3MgaGFuZGxlZCBzZXBhcmF0ZWx5XG5cbiAgICBtc2dUeXBlczoge1xuXG4gICAgICAgIHByaW1hcnk6IHtcbiAgICAgICAgICAgICAgICAvLyB2b2lkIHRhZ3NcbiAgICAgICAgICAgIGFyZWE6IDAsIGJhc2U6IDAsIGJyOiAwLCBjb2w6IDAsIGVtYmVkOiAwLCBocjogMCwgaW1nOiAwLCBpbnB1dDogMCwga2V5Z2VuOiAwLCBsaW5rOiAwLCBtZXRhOiAwLCBwYXJhbTogMCwgc291cmNlOiAwLCB0cmFjazogMCwgd2JyOiAwLCBcblxuICAgICAgICAgICAgICAgIC8vIG5vbi12b2lkIHRhZ3NcbiAgICAgICAgICAgIGE6IDEsIGFiYnI6IDEsIGFkZHJlc3M6IDEsIGFydGljbGU6IDEsIGFzaWRlOiAxLCBhdWRpbzogMSwgYjogMSwgYmRpOiAxLCBiZG86IDEsIGJsb2NrcXVvdGU6IDEsIGJvZHk6IDEsIGJ1dHRvbjogMSwgY2FudmFzOiAxLCBjYXB0aW9uOiAxLCBjaXRlOiAxLCBjb2RlOiAxLCBjb2xncm91cDogMSwgZGF0YWxpc3Q6IDEsIGRkOiAxLCBkZWw6IDEsIGRldGFpbHM6IDEsIGRmbjogMSwgZGlhbG9nOiAxLCBkaXY6IDEsIGRsOiAxLCBkdDogMSwgZW06IDEsIGZpZWxkc2V0OiAxLCBmaWdjYXB0aW9uOiAxLCBmaWd1cmU6IDEsIGZvb3RlcjogMSwgZm9ybTogMSwgaDE6IDEsIGgyOiAxLCBoMzogMSwgaDQ6IDEsIGg1OiAxLCBoNjogMSwgaGVhZDogMSwgaGVhZGVyOiAxLCBoZ3JvdXA6IDEsIGh0bWw6IDEsIGk6IDEsIGlmcmFtZTogMSwgaW5zOiAxLCBrYmQ6IDEsIGxhYmVsOiAxLCBsZWdlbmQ6IDEsIGxpOiAxLCBtYXA6IDEsIG1hcms6IDEsIG1lbnU6IDEsIG1ldGVyOiAxLCBuYXY6IDEsIG5vc2NyaXB0OiAxLCBvYmplY3Q6IDEsIG9sOiAxLCBvcHRncm91cDogMSwgb3B0aW9uOiAxLCBvdXRwdXQ6IDEsIHA6IDEsIHByZTogMSwgcHJvZ3Jlc3M6IDEsIHE6IDEsIHJwOiAxLCBydDogMSwgcnVieTogMSwgczogMSwgc2FtcDogMSwgc2NyaXB0OiAxLCBzZWN0aW9uOiAxLCBzZWxlY3Q6IDEsIHNtYWxsOiAxLCBzcGFuOiAxLCBzdHJvbmc6IDEsIHN0eWxlOiAxLCBzdWI6IDEsIHN1bW1hcnk6IDEsIHN1cDogMSwgc3ZnOiAxLCB0YWJsZTogMSwgdGJvZHk6IDEsIHRkOiAxLCB0ZXh0YXJlYTogMSwgdGZvb3Q6IDEsIHRoOiAxLCB0aGVhZDogMSwgdGltZTogMSwgdGl0bGU6IDEsIHRyOiAxLCB1OiAxLCB1bDogMSwgJ3Zhcic6IDEsIHZpZGVvOiAxLFxuICAgICAgICB9LFxuXG4gICAgICAgIHNlY29uZGFyeToge3N0eWxlOiAxfSxcbiAgICAgICAgICAgIC8vIGVsZW1lbnRzIHRoYXQgY2FuIGJlIGVpdGhlciBhIHByaW1hcnkgdGFnIGl0c2VsZiBvciBhbiBhdHRyaWJ1dGUgb2YgYW5vdGhlciBwcmltYXJ5IHRhZ1xuICAgICAgICAgICAgLy8gaWYgYW55IG90aGVyIHByaW1hcnkgdGFncyBpcyBwcmVzZW50LCB0aGVuIHNlY29uZGFyeSB0YWdzIGFyZSB0cmVhdGVkIGFzXG4gICAgICAgICAgICAvLyBhdHRyaWJ1dGVzIG9mIHRoZSBvdGhlciBwcmltYXJ5IHRhZ1xuXG4gICAgICAgIG1ldGE6IHtcbiAgICAgICAgICAgIGVtcHR5OiAxLCBybTogMSwgXG4gICAgICAgICAgICBwcmVwZW5kOiAxLCBhcHBlbmQ6IDEsIGJlZm9yZTogMSwgYWZ0ZXI6IDEsIHBhcmVudDogMSxcbiAgICAgICAgICAgIGF0dHI6IDEsIGNvbnRlbnQ6IDEsIHRleHQ6IDEsIFxuICAgICAgICB9LFxuXG4gICAgfSxcblxuICAgIG1zZzA6IHJlcXVpcmUgKCdnby1tc2cnKSxcbiAgICBtc2c6IG51bGwsXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbnZhciBmPXt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5pbml0ID0gKCkgPT4ge1xuICAgIFxuICAgIHYubXNnID0gbmV3IHYubXNnMCAodi5tc2dUeXBlcyk7XG5cbn07IC8vIGVuZCBmLmluaXRcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5hdHRyID0gKHNlbGVjdG9yLCBhdHRyKSA9PiB7XG4gICAgXG4gICAgJChzZWxlY3RvcilcbiAgICAuYXR0ciAoYXR0cik7XG5cbn07IC8vIGVuZCBmLmF0dHIgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZW1wdHkgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBcbiAgICAkKHNlbGVjdG9yKVxuICAgIC5lbXB0eSAoKVxuICAgIC5vZmYgKCdrZXlkb3duJyk7XG5cbn07IC8vIGVuZCBmLmVtcHR5IFxuXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYucm0gPSAoc2VsZWN0b3IpID0+IHtcblxuICAgICQoc2VsZWN0b3IpXG4gICAgLnJlbW92ZSAoKTtcblxufTsgLy8gZW5kIGYucm1cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kaXNwbGF5T2JIID0gKHBhcmVudCwgZGlzcE9iKSA9PiB7XG4gICAgXG4gICAgICAgIC8vIC0tLS0gIGRvQXJyYXkgLS0tLVxuICAgIHZhciBkb0FycmF5ID0gZnVuY3Rpb24gKGRpc3BPYikge1xuXG4gICAgICAgIHZhciBJZHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwT2IubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgSWRzLnB1c2ggKGYuZGlzcGxheU9iSCAocGFyZW50LCBkaXNwT2IgW2ldKSk7XG5cbiAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwT2IubGVuZ3RoOyBpKyspXG5cbiAgICAgICAgcmV0dXJuIElkcyBbSWRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAvL3JldHVybiBJZHM7XG4gICAgICAgIFxuICAgIH07ICAvLyBlbmQgZG9BcnJheSBcblxuICAgICAgICAvLyAtLS0tICBkb09iamVjdCAtLS0tXG4gICAgdmFyIGRvT2JqZWN0ID0gZnVuY3Rpb24gKGRpc3BPYikge1xuXG4gICAgICAgIHZhciBkaXNwT2JQYXJzZWQgPSB2Lm1zZy5wYXJzZU1zZyAoZGlzcE9iKTtcblxuICAgICAgICB2YXIgcHJpbWFyeUtleSA9IGRpc3BPYlBhcnNlZC5wO1xuXG4gICAgICAgIHZhciBtZXRhID0gZGlzcE9iUGFyc2VkLm07XG5cbiAgICAgICAgdmFyIGRlbEtleSA9IG51bGw7XG4gICAgICAgIHZhciByZWxMb2MgPSAnYXBwZW5kJztcblxuICAgICAgICB2YXIgYXR0ciA9IG51bGw7XG4gICAgICAgIHZhciBjb250ZW50ID0gbnVsbDtcbiAgICAgICAgdmFyIHRleHQgPSBudWxsO1xuXG4gICAgICAgIGlmIChtZXRhLmhhc093blByb3BlcnR5ICgncGFyZW50JykpIHtcbiAgICAgICAgICAgIC8vIGVuc3VyZXMgcHJvY2Vzc2luZyBvZiAncGFyZW50JyBiZWZvcmUgcmVtYWluZGVyIG9mIG1ldGEga2V5c1xuXG4gICAgICAgICAgICBwYXJlbnQgPSBtZXRhLnBhcmVudDtcbiAgICAgICAgICAgIGRlbGV0ZSBtZXRhLnBhcmVudDtcblxuICAgICAgICB9IC8vIGVuZCBpZiAobWV0YS5oYXNPd25Qcm9wZXJ0eSAoJ3BhcmVudCcpKVxuICAgICAgICBcbiAgICAgICAgdmFyIG1ldGFLZXlzID0gT2JqZWN0LmtleXMgKG1ldGEpO1xuICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBtZXRhS2V5cy5sZW5ndGg7IGlkeCsrKSB7XG5cbiAgICAgICAgICAgIHZhciBrZXkgPSBtZXRhS2V5cyBbaWR4XTtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlbXB0eSc6XG4gICAgICAgICAgICAgICAgY2FzZSAncm0nOlxuICAgICAgICAgICAgICAgICAgICBkZWxLZXkgPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IG1ldGEgW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnYXR0cic6XG4gICAgICAgICAgICAgICAgICAgIGF0dHIgPSBtZXRhLmF0dHI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBtZXRhLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gbWV0YS50ZXh0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGVuZCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYmVmb3JlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdhZnRlcic6XG4gICAgICAgICAgICAgICAgICAgIHJlbExvYyA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IG1ldGEgW2tleV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBkb1BhcmVudCA9IHZhbCAhPT0gMSAmJiB2YWwgIT09IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IGRvUGFyZW50ID8gdmFsIDogcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdmFsIGlzIG90aGVyIHRoYW4gMSBvciB0cnVlLCByZWxMb2Mgb3ZlcnJpZGVzIGJvdGggcGFyZW50IHZhbHVlcyBwYXNzZWQgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRvIGRpc3BsYXlPYkggYW5kIGRlZmluZWQgYnkgb3B0aW9uYWwgcGFyZW50IGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgfSAvLyBlbmQgc3dpdGNoIChrZXkpXG4gICAgICAgICAgICBcblxuICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBtZXRhS2V5cy5sZW5ndGg7IGlkeCsrKVxuICAgICAgICBcblxuICAgICAgICBJZCA9IG51bGw7XG5cbiAgICAgICAgaWYgKGRlbEtleSkge1xuXG4gICAgICAgICAgICBmIFtkZWxLZXldIChwYXJlbnQpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoYXR0cikge1xuXG4gICAgICAgICAgICBmLmF0dHIgKHBhcmVudCwgYXR0cik7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZW50KSB7XG4gICAgICAgICAgICAvLyByZXBsYWNlcyBlbnRpcmUgY29udGVudCBvZiBwYXJlbnQgd2l0aCBuZXcgY29udGVudFxuXG4gICAgICAgICAgICAkKHBhcmVudClcbiAgICAgICAgICAgIC5lbXB0eSAoKTtcblxuICAgICAgICAgICAgZi5kaXNwbGF5T2JIIChwYXJlbnQsIGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIC8vIHdpdGhvdXQgZW1wdHlpbmcgZmlyc3QsIHdpbGwgc2ltcGx5IGFwcGVuZCBjb250ZW50IHRvIGV4aXN0aW5nIGNvbnRlbnRcblxuICAgICAgICB9IGVsc2UgaWYgKHRleHQpIHtcblxuICAgICAgICAgICAgSWQgPSBmLnRleHRNYWtlIChwYXJlbnQsIHJlbExvYywgdGV4dCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgSWQgPSBmLmVsZW1lbnRNYWtlIChwYXJlbnQsIHJlbExvYywgcHJpbWFyeUtleSwgZGlzcE9iUGFyc2VkLmMsIGRpc3BPYlBhcnNlZC5zKTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoZGVsS2V5KVxuXG4gICAgICAgIHJldHVybiBJZDtcbiAgICAgICAgXG4gICAgfTsgIC8vIGVuZCBkb09iamVjdCBcblxuXG5cbiAgICAgICAvLyAtLS0tIG1haW4gLS0tLVxuICAgIHZhciBJZDtcbiAgICB2YXIgZGlzcE9iVHlwZSA9IHR5cGVvZiBkaXNwT2I7XG5cbiAgICBpZiAoZGlzcE9iVHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgZGlzcE9iID09PSAwIHx8IGRpc3BPYiA9PT0gbnVsbCkge1xuXG4gICAgICAgIElkID0gbnVsbDtcblxuICAgIH0gZWxzZSBpZiAodi5wcmltaXRpdmVUeXBlc05vdE51bGwuaGFzT3duUHJvcGVydHkgKGRpc3BPYlR5cGUpKSB7XG5cbiAgICAgICAgSWQgPSBmLnRleHRNYWtlIChwYXJlbnQsICdhcHBlbmQnLCBkaXNwT2IpO1xuICAgICAgICAgICAgLy8gaWYgdGV4dCBzaG91bGQgYmUgcGxhY2VkIGF0IG90aGVyIHRoYW4gJ2FwcGVuZCcgbG9jYXRpb24sIHRoZW4gdXNlXG4gICAgICAgICAgICAvLyAndGV4dCcgdGFnIGFuZCBzcGVjaWZ5IHByZXBlbmQsIGFmdGVyIG9yIGJlZm9yZSBhcyBuZWVkZWRcblxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSAoZGlzcE9iKSkge1xuXG4gICAgICAgIElkID0gZG9BcnJheSAoZGlzcE9iKTtcblxuICAgIH0gZWxzZSBpZiAoZGlzcE9iVHlwZSA9PSAnb2JqZWN0Jykge1xuXG4gICAgICAgIElkID0gZG9PYmplY3QgKGRpc3BPYik7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIElkID0gbnVsbDtcblxuICAgIH0gLy8gZW5kIGlmICh0eXBlb2YgZGlzcE9iID09PSAndW5kZWZpbmVkJyB8fCBkaXNwT2IgPT09IDAgfHwgZGlzcE9iID09PSBudWxsKVxuICAgIFxuICAgIHJldHVybiBJZDtcblxufTsgLy8gZW5kIGYuZGlzcGxheU9iSCBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZWxlbWVudE1ha2UgPSAocGFyZW50T3JTaWJsSWQsIHJlbExvYywgZWxOYW1lLCBjb250ZW50LCBhdHRycykgPT4ge1xuICAgIFxuICAgIHZhciBpZDtcbiAgICB2YXIgYXR0cktleXMgPSBPYmplY3Qua2V5cyAoYXR0cnMpO1xuICAgIHZhciBoYXNBdHRycyA9IGF0dHJLZXlzLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoaGFzQXR0cnMgJiYgYXR0cnMuaGFzT3duUHJvcGVydHkgKCdpZCcpKSB7XG5cbiAgICAgICAgaWQgPSBhdHRycy5pZDtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgaWQgPSBQLmdlbklkICgpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGhhc0F0dHJzKVxuICAgIFxuICAgIHZhciBJZCA9ICcjJyArIGlkO1xuICAgIFxuICAgIGlmIChlbE5hbWUgPT09ICdzY3JpcHQnICYmIGNvbnRlbnQgIT09IDApIHtcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvOTQxMzczNy9ob3ctdG8tYXBwZW5kLXNjcmlwdC1zY3JpcHQtaW4tamF2YXNjcmlwdFxuICAgICAgICAvLyBpbnNwaXJlZCBieSBTTyBxdWVzdGlvbiwgYnV0IHNldHRpbmcgaW5uZXJIVE1MIGlzbid0IHN1cHBvc2VkIHRvIHdvcmtcbiAgICAgICAgLy8gdGhlcmVmb3JlLCBzZXQgc3JjIGF0dHJpYnV0ZSB3aXRoIHBhdGggdG8gZmlsZSwgaW5zdGVhZCBvZiBcbiAgICAgICAgLy8gc2V0dGluZyBpbm5lckhUTUwgdG8gY29udGVudCBvZiBmaWxlXG5cbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjEwOTk1L2NhbnQtYXBwZW5kLXNjcmlwdC1lbGVtZW50XG4gICAgICAgIC8vIGpRdWVyeSB3b24ndCBhZGQgc2NyaXB0IGVsZW1lbnQgYXMgaXQgZG9lcyB3aXRoIGFueSBvdGhlciBlbGVtZW50LiAgVGhlcmVmb3JlLCBtdXN0IGJlIGRvbmVcbiAgICAgICAgLy8gdXNpbmcgb25seSBqYXZhc2NyaXB0IGFzIGZvbGxvd3M6XG4gICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXG4gICAgICAgIHNjcmlwdC5zcmMgPSBjb250ZW50O1xuICAgICAgICBzY3JpcHQuaWQgPSBhdHRycy5pZDtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTsgICAgIFxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICB2YXIgZGl2ZWwgPSAnPCcgKyBlbE5hbWUgKyAnIGlkPVwiJyArIGlkICsgJ1wiJztcbiAgICBcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICBcbiAgICAgICAgICAgIGRpdmVsICs9ICc+PC8nICsgZWxOYW1lICsgJz4nO1xuICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgZGl2ZWwgKz0gJz4nO1xuICAgIFxuICAgICAgICB9IC8vIGVuZCBpZiAoY29udGVudClcbiAgICBcbiAgICAgICAgJChwYXJlbnRPclNpYmxJZClbcmVsTG9jXSAoZGl2ZWwpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGVsTmFtZSA9PT0gJ3NjcmlwdCcpXG4gICAgXG4gICAgXG4gICAgaWYgKGhhc0F0dHJzKSB7XG4gICAgICAgIFxuICAgICAgICAkKElkKVxuICAgICAgICAuYXR0ciAoYXR0cnMpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGhhc0F0dHJzKVxuXG4gICAgZi5kaXNwbGF5T2JIIChJZCwgY29udGVudCk7XG4gICAgXG4gICAgaWYgKGVsTmFtZSA9PT0gJ2Zvcm0nKSB7XG5cbiAgICAgICAgJChwYXJlbnQpXG4gICAgICAgIC5mb2N1cyAoKTtcblxuICAgIH0gLy8gZW5kIGlmIChlbE5hbWUgPT09ICdmb3JtJylcbiAgICBcbiAgICByZXR1cm4gSWQ7XG5cbn07IC8vIGVuZCBmLmVsZW1lbnRNYWtlXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYudGV4dE1ha2UgPSAocGFyZW50LCByZWxMb2MsIHByaW1pdGl2ZSkgPT4ge1xuICAgIFxuICAgIGlmICh0eXBlb2YgcHJpbWl0aXZlID09PSAnc3RyaW5nJykge1xuICAgICAgICBcbiAgICAgICAgdmFyIHNpbmdsZXF1b3RlID0gJyYjeDAwMjc7JztcbiAgICAgICAgdmFyIGJhY2tzbGFzaCA9ICcmI3gwMDVjOyc7XG4gICAgICAgIHZhciBkb3VibGVxdW90ZSA9ICcmI3gwMDIyOyc7XG4gICAgICAgIHZhciBsdCA9ICcmbHQ7JztcbiAgICAgICAgXG4gICAgICAgIHByaW1pdGl2ZSA9IHByaW1pdGl2ZS5yZXBsYWNlICgvJy9nLCBzaW5nbGVxdW90ZSk7XG4gICAgICAgIHByaW1pdGl2ZSA9IHByaW1pdGl2ZS5yZXBsYWNlICgvXCIvZywgZG91YmxlcXVvdGUpO1xuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoL1xcXFwvZywgYmFja3NsYXNoKTtcbiAgICAgICAgcHJpbWl0aXZlID0gcHJpbWl0aXZlLnJlcGxhY2UgKC88L2csIGx0KTtcblxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHByaW1pdGl2ZSA9PT0gJ3N5bWJvbCcpIHtcblxuICAgICAgICBwcmltaXRpdmUgPSAnc3ltYm9sJztcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBzdHJpbmdpZnkgd291bGQgcHJvZHVjZSAne30nIHdoaWNoIGlzIGxlc3MgdXNlZnVsXG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHByaW1pdGl2ZSA9IEpTT04uc3RyaW5naWZ5IChwcmltaXRpdmUpO1xuXG4gICAgfSAvLyBlbmQgaWYgKHR5cGVvZiBwcmltaXRpdmUgPT09ICdzdHJpbmcnKVxuICAgIFxuXG4gICAgJChwYXJlbnQpIFtyZWxMb2NdIChwcmltaXRpdmUpO1xuXG4gICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vIHRleHQgb2JzIGhhdmUgbm8gaWQnczogb25seSB0ZXh0IGlzIGFwcGVuZGVkIHdpdGggbm8gd2F5IHRvIGFkZHJlc3MgaXRcbiAgICAgICAgLy8gaWYgYWRkcmVzc2luZyBpcyBuZWNlc3NhcnksIHVzZSBzcGFuIGluc3RlYWQgb2YgdGV4dFxuXG59OyAvLyBlbmQgZi50ZXh0TWFrZSBcblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmRpc3BsYXlPYiA9IChkaXNwT2IpID0+IHtcbiAgICAvLyBpZiBkaXNwT2IgaXMgYW4gYXJyYXksIG9ubHkgdGhlIGxhc3QgSWQgaXMgcmV0dXJuZWRcbiAgICBcbiAgICB2YXIgcGFyZW50ID0gJ2JvZHknO1xuICAgICAgICAvLyBpZiBwYXJlbnQgbm90IGZvdW5kLCBhcHBlbmQgdG8gYm9keVxuXG4gICAgaWYgKHR5cGVvZiBkaXNwT2IgPT09ICdvYmplY3QnICYmIGRpc3BPYi5oYXNPd25Qcm9wZXJ0eSAoJ3BhcmVudCcpKSB7XG5cbiAgICAgICAgcGFyZW50ID0gZGlzcE9iLnBhcmVudDtcblxuICAgIH0gLy8gZW5kIGlmICh0eXBlb2YgZGlzcE9iID09PSAnb2JqZWN0JyAmJiBkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdwYXJlbnQnKSlcbiAgICBcbiAgICB2YXIgSWQgPSBmLmRpc3BsYXlPYkggKHBhcmVudCwgZGlzcE9iKTtcblxuICAgIHJldHVybiBJZDtcblxufTsgLy8gZW5kIFAuZGlzcGxheU9iIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kaXNwbGF5T2JBID0gKGRpc3BPYkEpID0+IHtcbiAgICAvLyB0aGlzIGlzIHRoZSB3YXkgZGlzcGxheU9iIHNob3VsZCBoYXZlIGJlZW4gd3JpdHRlbiBpbiB0aGUgZmlyc3QgcGxhY2UsIHRvIGFsd2F5c1xuICAgIC8vIHJldHVybiBhbiBhcnJheSBpZiBJZHMsIGlmIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheVxuICAgIFxuICAgIHZhciBJZHM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkgKGRpc3BPYkEpKSB7XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IGRpc3BPYkEuaGFzT3duUHJvcGVydHkgKCdwYXJlbnQnKSA/IGRpc3BPYkEucGFyZW50IDogJ2JvZHknO1xuXG4gICAgICAgIElkcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpeCA9IDA7IGl4IDwgZGlzcE9iQS5sZW5ndGg7IGl4KyspIHtcblxuICAgICAgICAgICAgSWRzLnB1c2ggKGYuZGlzcGxheU9iSCAocGFyZW50LCBkaXNwT2JBIFtpeF0pKTtcblxuICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpeCA9IDA7IGl4IDwgZGlzcE9iQS5sZW5ndGg7IGl4KyspXG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIElkcyA9IFAuZGlzcGxheU9iIChkaXNwT2JBKTtcblxuICAgIH0gLy8gZW5kIGlmIChBcnJheS5pc0FycmF5IChkaXNwT2JBKSlcbiAgICBcbiAgICByZXR1cm4gSWRzO1xuXG59OyAvLyBlbmQgUC5kaXNwbGF5T2JBIFxuXG5cblAuZGlzcGxheVBhZ2UgPSBQLmRpc3BsYXlPYjtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZ2VuSWQgPSAob2IpID0+IHtcblxuICAgIHZhciBpZCA9ICdpJyArIHYuaWQrKztcblxuICAgIGlmIChvYikge1xuXG4gICAgICAgIG9iLmlkID0gaWQ7XG5cbiAgICB9IC8vIGVuZCBpZiAob2IpXG4gICAgXG4gICAgcmV0dXJuIGlkO1xuXG59OyAvLyBlbmQgUC5nZW5JZFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmdlbklkcyA9IChvYikgPT4ge1xuICAgIFxuICAgIHZhciBpZCA9IG9iID8gUC5nZW5JZCAob2IpIDogUC5nZW5JZCAoKTtcbiAgICB2YXIgSWQgPSAnIycgKyBpZDtcblxuICAgIHJldHVybiBbaWQsIElkXTtcblxufTsgLy8gZW5kIFAuZ2VuSWRzXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLklkR2VuID0gKG9iKSA9PiB7XG4gICAgXG4gICAgdmFyIElkID0gUC5nZW5JZHMgKG9iKSBbMV07XG4gICAgcmV0dXJuIElkO1xuXG59OyAvLyBlbmQgUC5JZEdlbiBcblxuXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbmYuaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn0oKSk7XG5cblxuXG4iLCIvLyBnby1rZXkvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoanFTZWxlY3RvciwgcmVwb3J0U2hpZnQsIGtleURvd25IYW5kbGVyLCByZXBvcnRVcCwga2V5VXBIYW5kbGVyLCBhbGxvd1Byb3BhZ2F0aW9uKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG5jb25zdCB2ID0ge1xuXG4gICAganFTZWxlY3RvcjogJ2JvZHknLFxuICAgIHJlcG9ydFNoaWZ0OiBmYWxzZSxcbiAgICBrZXlEb3duSGFuZGxlcjogbnVsbCxcbiAgICByZXBvcnRVcDogZmFsc2UsXG4gICAga2V5VXBIYW5kbGVyOiBudWxsLFxuXG4gICAga1NoaWZ0OiBmYWxzZSxcbiAgICBrQ3RybDogZmFsc2UsXG4gICAga0FsdDogZmFsc2UsXG4gICAga0NtZDogZmFsc2UsXG4gICAga0lnbm9yZTogZmFsc2UsXG4gICAgd2hpY2hTaGlmdEtleXM6IHsxNjoxLCAxNzoxLCAxODoxLCA5MToxLCA5MjoxLCA5MzoxLCAyMjQ6MX0sXG5cbiAgICAgICAgICAgIC8vIG5vdCBwcmludGFibGUgb3Igbm9uLWFzY2lpIGJsb2NrXG4gICAgY3RybE9yTm9uQXNjaWk6IHtcbiAgICAgICAgODogJ0JhY2tzcGFjZScsXG4gICAgICAgIDk6ICdUYWInLFxuICAgICAgICAxMzogJ0VudGVyJyxcbiAgICAgICAgMTY6ICdTaGlmdCcsXG4gICAgICAgIDE3OiAnQ3RybCcsXG4gICAgICAgIDE4OiAnQWx0JyxcbiAgICAgICAgMTk6ICdQYXVzZS1icmVhaycsXG4gICAgICAgIDIwOiAnQ2Fwcy1sb2NrJyxcbiAgICAgICAgMjc6ICdFc2MnLFxuICAgICAgICAzMjogJyAnLCAgLy8gU3BhY2VcbiAgICAgICAgMzM6ICdQYWdlVXAnLFxuICAgICAgICAzNDogJ1BhZ2VEb3duJyxcbiAgICAgICAgMzU6ICdFbmQnLFxuICAgICAgICAzNjogJ0hvbWUnLFxuICAgICAgICAzNzogJ0xlZnQnLFxuICAgICAgICAzODogJ1VwJyxcbiAgICAgICAgMzk6ICdSaWdodCcsXG4gICAgICAgIDQwOiAnRG93bicsXG4gICAgICAgIDQ1OiAnSW5zZXJ0JyxcbiAgICAgICAgNDY6ICdEZWxldGUnLFxuICAgICAgICA5MTogJ1dpbmRvd3NLZXlMZWZ0JyxcbiAgICAgICAgOTI6ICdXaW5kb3dzS2V5UmlnaHQnLFxuICAgICAgICA5MzogJ1dpbmRvd3NPcHRpb25LZXknLFxuICAgICAgICA5NjogJzAnLCAgLy8gTnVtcGFkXG4gICAgICAgIDk3OiAnMScsICAvLyBOdW1wYWRcbiAgICAgICAgOTg6ICcyJywgIC8vIE51bXBhZFxuICAgICAgICA5OTogJzMnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMDogJzQnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMTogJzUnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMjogJzYnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwMzogJzcnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNDogJzgnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNTogJzknLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNjogJyonLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwNzogJysnLCAgLy8gTnVtcGFkXG4gICAgICAgIDEwOTogJy0nLCAgLy8gTnVtcGFkXG4gICAgICAgIDExMDogJy4nLCAgLy8gTnVtcGFkXG4gICAgICAgIDExMTogJy8nLCAgLy8gTnVtcGFkXG4gICAgICAgIDExMjogJ0YxJyxcbiAgICAgICAgMTEzOiAnRjInLFxuICAgICAgICAxMTQ6ICdGMycsXG4gICAgICAgIDExNTogJ0Y0JyxcbiAgICAgICAgMTE2OiAnRjUnLFxuICAgICAgICAxMTc6ICdGNicsXG4gICAgICAgIDExODogJ0Y3JyxcbiAgICAgICAgMTE5OiAnRjgnLFxuICAgICAgICAxMjA6ICdGOScsXG4gICAgICAgIDEyMTogJ0YxMCcsXG4gICAgICAgIDEyMjogJ0YxMScsXG4gICAgICAgIDEyMzogJ0YxMicsXG4gICAgICAgIDE0NDogJ051bWxvY2snLFxuICAgICAgICAxNDU6ICdTY3JvbGwtbG9jaycsXG4gICAgICAgIDIyNDogJ01hY0NtZCcsXG4gICAgfSxcbiAgICBcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGFzY2lpVW5TaGlmdGVkOiB7XG4gICAgICAgIDQ4OiAnMCcsXG4gICAgICAgIDQ5OiAnMScsXG4gICAgICAgIDUwOiAnMicsXG4gICAgICAgIDUxOiAnMycsXG4gICAgICAgIDUyOiAnNCcsXG4gICAgICAgIDUzOiAnNScsXG4gICAgICAgIDU0OiAnNicsXG4gICAgICAgIDU1OiAnNycsXG4gICAgICAgIDU2OiAnOCcsXG4gICAgICAgIDU3OiAnOScsXG4gICAgICAgIDU5OiAnOycsXG4gICAgICAgIDYxOiAnPScsXG4gICAgICAgIDY1OiAnYScsXG4gICAgICAgIDY2OiAnYicsXG4gICAgICAgIDY3OiAnYycsXG4gICAgICAgIDY4OiAnZCcsXG4gICAgICAgIDY5OiAnZScsXG4gICAgICAgIDcwOiAnZicsXG4gICAgICAgIDcxOiAnZycsXG4gICAgICAgIDcyOiAnaCcsXG4gICAgICAgIDczOiAnaScsXG4gICAgICAgIDc0OiAnaicsXG4gICAgICAgIDc1OiAnaycsXG4gICAgICAgIDc2OiAnbCcsXG4gICAgICAgIDc3OiAnbScsXG4gICAgICAgIDc4OiAnbicsXG4gICAgICAgIDc5OiAnbycsXG4gICAgICAgIDgwOiAncCcsXG4gICAgICAgIDgxOiAncScsXG4gICAgICAgIDgyOiAncicsXG4gICAgICAgIDgzOiAncycsXG4gICAgICAgIDg0OiAndCcsXG4gICAgICAgIDg1OiAndScsXG4gICAgICAgIDg2OiAndicsXG4gICAgICAgIDg3OiAndycsXG4gICAgICAgIDg4OiAneCcsXG4gICAgICAgIDg5OiAneScsXG4gICAgICAgIDkwOiAneicsXG4gICAgICAgIDE3MzogJy0nLFxuICAgICAgICAxODg6ICcsJyxcbiAgICAgICAgMTkwOiAnLicsXG4gICAgICAgIDE5MTogJy8nLFxuICAgICAgICAxOTI6ICdgJyxcbiAgICAgICAgMjE5OiAnWycsXG4gICAgICAgIDIyMDogXCJcXFxcXCIsXG4gICAgICAgIDIyMTogJ10nLFxuICAgICAgICAyMjI6IFwiJ1wiLFxuICAgIDE4NjogXCI7XCIsICAvLyBkaXR0byBmb3IgJzsnXG4gICAgMTg3OiBcIj1cIiwgIC8vIGFwcGFyZW50bHksIGNocm9tZSB0aGlua3Mgd2hpY2ggaXMgMTg3IGZvciAnPScsIGJ1dCBub3QgZmlyZWZveFxuICAgIDE4OTogXCItXCIsICAvLyBkaXR0byBmb3IgJy0nXG4gICAgfSxcbiAgICBcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGFzY2lpU2hpZnRlZDoge1xuICAgICAgICA0ODogJyknLFxuICAgICAgICA0OTogJyEnLFxuICAgICAgICA1MDogJ0AnLFxuICAgICAgICA1MTogJyMnLFxuICAgICAgICA1MjogJyQnLFxuICAgICAgICA1MzogJyUnLFxuICAgICAgICA1NDogJ14nLFxuICAgICAgICA1NTogJyYnLFxuICAgICAgICA1NjogJyonLFxuICAgICAgICA1NzogJygnLFxuICAgICAgICA1OTogJzonLFxuICAgICAgICA2MTogJysnLFxuICAgICAgICA2NTogJ0EnLFxuICAgICAgICA2NjogJ0InLFxuICAgICAgICA2NzogJ0MnLFxuICAgICAgICA2ODogJ0QnLFxuICAgICAgICA2OTogJ0UnLFxuICAgICAgICA3MDogJ0YnLFxuICAgICAgICA3MTogJ0cnLFxuICAgICAgICA3MjogJ0gnLFxuICAgICAgICA3MzogJ0knLFxuICAgICAgICA3NDogJ0onLFxuICAgICAgICA3NTogJ0snLFxuICAgICAgICA3NjogJ0wnLFxuICAgICAgICA3NzogJ00nLFxuICAgICAgICA3ODogJ04nLFxuICAgICAgICA3OTogJ08nLFxuICAgICAgICA4MDogJ1AnLFxuICAgICAgICA4MTogJ1EnLFxuICAgICAgICA4MjogJ1InLFxuICAgICAgICA4MzogJ1MnLFxuICAgICAgICA4NDogJ1QnLFxuICAgICAgICA4NTogJ1UnLFxuICAgICAgICA4NjogJ1YnLFxuICAgICAgICA4NzogJ1cnLFxuICAgICAgICA4ODogJ1gnLFxuICAgICAgICA4OTogJ1knLFxuICAgICAgICA5MDogJ1onLFxuICAgICAgICAxNzM6ICdfJyxcbiAgICAgICAgMTg4OiAnPCcsXG4gICAgICAgIDE5MDogJz4nLFxuICAgICAgICAxOTE6ICc/JyxcbiAgICAgICAgMTkyOiAnficsXG4gICAgICAgIDIxOTogJ3snLFxuICAgICAgICAyMjA6ICd8JyxcbiAgICAgICAgMjIxOiAnfScsXG4gICAgICAgIDIyMjogJ1wiJyxcbiAgICAxODY6IFwiOlwiLCAgLy8gZGl0dG8gZm9yICc6J1xuICAgIDE4NzogXCIrXCIsICAvLyBkaXR0byBmb3IgJysnXG4gICAgMTg5OiBcIl9cIiwgIC8vIGRpdHRvIGZvciAnLSdcbiAgICB9LFxuXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbmNvbnN0IEEgPSB7fTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5BLmluaXQgPSAoKSA9PiB7XG4gICAgXG4gICAgdi5qcVNlbGVjdG9yID0ganFTZWxlY3RvciA/IGpxU2VsZWN0b3IgOiAnYm9keSc7XG4gICAgdi5yZXBvcnRTaGlmdCA9IHJlcG9ydFNoaWZ0ID8gcmVwb3J0U2hpZnQgOiBmYWxzZTtcbiAgICB2LmtleURvd25IYW5kbGVyID0ga2V5RG93bkhhbmRsZXIgPyBrZXlEb3duSGFuZGxlciA6IGYuZGVmYXVsdEhhbmRsZXI7XG4gICAgdi5yZXBvcnRVcCA9IHJlcG9ydFVwID8gcmVwb3J0VXAgOiBmYWxzZTtcbiAgICB2LmtleVVwSGFuZGxlciA9IGtleVVwSGFuZGxlciA/IGtleVVwSGFuZGxlciA6IGYuZGVmYXVsdEhhbmRsZXI7XG4gICAgdi5hbGxvd1Byb3BhZ2F0aW9uID0gYWxsb3dQcm9wYWdhdGlvbjtcblxuICAgIC8vUC5zZXRLZXlPbiAodi5qcVNlbGVjdG9yKTtcbiAgICBQLnNldEtleU9uICgpO1xuICAgIGlmICh0eXBlb2YgX20wID09PSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgIF9tMCA9IHt9O1xuXG4gICAgfSAvLyBlbmQgaWYgKHR5cGVvZiBfbTAgPT09ICd1bmRlZmluZWQnKVxuICAgIFxuICAgIFxuICAgIGlmICghX20wLmtleUV2ZW50cykge1xuXG4gICAgICAgIF9tMC5rZXlFdmVudHMgPSB7fTtcbiAgICAgICAgLypcbiAgICAgICAgICAgIC8vIG92ZXJyaWRlIGpxdWVyeSdzIHJlbW92ZSBmdW5jdGlvbiB0byB0dXJuIG9uIGFsbCBrZXkgaGFuZGxlcnMgYWZ0ZXIgcmVtb3ZhbCBvZiBhIGZvcm1cbiAgICAgICAgY29uc3Qgcm1PcmlnID0gJC5mbi5yZW1vdmU7XG4gICAgICAgICQuZm4ucmVtb3ZlID0gZnVuY3Rpb24gKCl7XG5cbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5oYXMgKCdmb3JtJylcbiAgICAgICAgICAgIC5lYWNoIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgUC5hbGxLZXlzT24gKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm1PcmlnLmFwcGx5ICh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgICovXG5cbiAgICB9IC8vIGVuZCBpZiAoIV9tMC5rZXlFdmVudHMpXG5cbiAgICBjb25zdCBrZXlFdmVudHMgPSBfbTAua2V5RXZlbnRzO1xuICAgIGtleUV2ZW50cyBbdi5qcVNlbGVjdG9yXSA9IHtvbjogUC5zZXRLZXlPbiwgb2ZmOiBQLnNldEtleU9mZn07XG4gICAgXG5cbn07IC8vIGVuZCBBLmluaXRcblxuY29uc3QgY2IgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNiLmNLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY2FsbGJhY2sgaXMgdi5rZXlEb3duSG5kbGVyXG4gICAgLy8gcmV0dXJucyBjaCBvYmplY3QgcmVmbGVjdGluZyB3aGljaCBzaGlmdCBrZXlzIHdlcmUgcHJlc3NlZCBkb3duLCBjaCBhbmQgd2hpY2ggdmFsdWVzXG4gICAgLy9cbiAgICAvLyB2LnJlcG9ydFNoaWZ0IHRydWUgPT4gdHJpZ2dlciBjYWxsYmFjayBmb3IgZWFjaCBrZXlkb3duIGV2ZW50IG9mIGFueSBrZXksIFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRpbmcgYW55IHNoaWZ0IGtleVxuICAgIC8vICAgICBmYWxzZSA9PiBzaGlmdCBrZXkgZXZlbnQgcmVwb3J0ZWQgb25seSB3aGVuIHRoZSBuZXh0IG5vbi1zaGlmdCBrZXlkb3duIGV2ZW50LlxuICAgIC8vICAgICAgICAgICAgICBTbywgY2FsbGJhY2sgaXMgb25seSB0cmlnZ2VyZWQgZm9yIG5vbi1zaGlmdCBrZXkgZXZlbnRzXG4gICAgXG4gICAgLy9jb25zb2xlLmxvZyAoJ2dvLWtleS5jS2V5RG93biBqcVNlbGVjdG9yOiAnICsgdi5qcVNlbGVjdG9yKTtcblxuICAgIGNvbnN0IHdoaWNoID0gZXZlbnQud2hpY2g7XG5cbiAgICAgICAgLy8gbmV2ZXIgaWdub3JlICdFc2MnIGtleSA9PSAyN1xuICAgIGlmICh2LmtJZ25vcmUgJiYgd2hpY2ggIT0gMjcpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IC8vIGVuZCBpZiAoa0lnbm9yZSlcbiAgICBcbiAgICBpZiAoIWFsbG93UHJvcGFnYXRpb24pIHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24gKCk7XG5cbiAgICB9IC8vIGVuZCBpZiAoIWFsbG93UHJvcGFnYXRpb24pXG5cbiAgICBsZXQgaXNBU2hpZnRLZXkgPSB0cnVlO1xuICAgIHN3aXRjaCAod2hpY2gpIHtcblxuICAgICAgICBjYXNlIDE2OiBcbiAgICAgICAgICAgIHYua1NoaWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTc6IFxuICAgICAgICAgICAgdi5rQ3RybCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDE4OiBcbiAgICAgICAgICAgIHYua0FsdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDkxOiBcbiAgICAgICAgY2FzZSA5MjogXG4gICAgICAgIGNhc2UgOTM6IFxuICAgICAgICBjYXNlIDIyNDpcbiAgICAgICAgICAgIHYua0NtZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaXNBU2hpZnRLZXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAgIFxuXG4gICAgZi5jS2V5VXBEb3duRmluaXNoIChpc0FTaGlmdEtleSwgd2hpY2gsIHYua2V5RG93bkhhbmRsZXIpO1xuXG4gICAgLypcbiAgICBpZiAoIWlzQVNoaWZ0S2V5KSB7XG5cbiAgICAgICAgdi5rU2hpZnQgPSBmYWxzZTtcbiAgICAgICAgdi5rQ3RybCA9IGZhbHNlO1xuICAgICAgICB2LmtBbHQgPSBmYWxzZTtcbiAgICAgICAgdi5rQ21kID0gZmFsc2U7XG5cbiAgICB9IC8vIGVuZCBpZiAoIWlzQVNoaWZ0S2V5KVxuICAgICovXG4gICAgXG5cbn07IC8vIGVuZCBjYi5jS2V5RG93biBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuY2IuY0tleVVwID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY2FsbGJhY2sgaXMgdi5rZXlEb3duSG5kbGVyXG4gICAgXG4gICAgY29uc3Qgd2hpY2ggPSBldmVudC53aGljaDtcblxuICAgICAgICAvLyBuZXZlciBpZ25vcmUgJ0VzYycga2V5ID09IDI3XG4gICAgaWYgKHYua0lnbm9yZSAmJiB3aGljaCAhPSAyNykge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChrSWdub3JlKVxuICAgIFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uICgpO1xuXG4gICAgbGV0IGlzQVNoaWZ0S2V5ID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKHdoaWNoKSB7XG5cbiAgICAgICAgY2FzZSAxNjogXG4gICAgICAgICAgICB2LmtTaGlmdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTc6IFxuICAgICAgICAgICAgdi5rQ3RybCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgdi5rQWx0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA5MTogXG4gICAgICAgIGNhc2UgOTI6IFxuICAgICAgICBjYXNlIDkzOiBcbiAgICAgICAgY2FzZSAyMjQ6IFxuICAgICAgICAgICAgdi5rQ21kID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaXNBU2hpZnRLZXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAgIFxuXG4gICAgaWYgKCF2LnJlcG9ydFVwKSB7XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSAvLyBlbmQgaWYgKCFyZXBvcnRVcClcbiAgICBcbiAgICBmLmNLZXlVcERvd25GaW5pc2ggKGlzQVNoaWZ0S2V5LCB3aGljaCwgdi5rZXlVcEhhbmRsZXIpO1xuXG59OyAvLyBlbmQgY2IuY0tleVVwIFxuXG5jb25zdCBmID0ge307XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5jS2V5VXBEb3duRmluaXNoID0gKGlzQVNoaWZ0S2V5LCB3aGljaCwgY2FsbGJhY2spID0+IHtcbiAgICBcbiAgICBpZiAoaXNBU2hpZnRLZXkgJiYgIXYucmVwb3J0U2hpZnQpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IC8vIGVuZCBpZiAoaXNBU2hpZnRLZXkgJiYgIXYucmVwb3J0U2hpZnQpXG4gICAgXG4gICAgY29uc3QgdGhpc0NoID0gZi5nZXRLZXlDb2RlICh3aGljaCk7XG5cbiAgICBjb25zdCBjaE9iID0gKHtcbiAgICAgICAgc2hpZnQ6IHYua1NoaWZ0LFxuICAgICAgICBjdHJsOiB2LmtDdHJsLFxuICAgICAgICBhbHQ6IHYua0FsdCxcbiAgICAgICAgbWFjQ21kOiB2LmtDbWQsXG4gICAgICAgIHdoaWNoOiB3aGljaCxcbiAgICAgICAgY2g6IHRoaXNDaCxcbiAgICAgICAgaXNBU2hpZnRLZXk6IGlzQVNoaWZ0S2V5LFxuICAgIH0pO1xuXG4gICAgLy8gY29uc29sZS5sb2cgKCdjaE9iOiAnICsgSlNPTi5zdHJpbmdpZnkgKGNoT2IpICsgJ1xcbicpO1xuICAgIC8qXG4gICAgaWYgKHYucmVwb3J0U2hpZnQpIHtcblxuICAgICAgICBjaE9iLmlzQVNoaWZ0S2V5ID0gaXNBU2hpZnRLZXk7ICBcbiAgICAgICAgICAgIC8vIHRydWUgaWYgYW55IG9mOiBzaGlmdCwgY3RybCwgYWx0LCBvciBtYWNDbWQgYXJlIHRydWVcbiAgICAgICAgICAgIC8vIG9ubHkgcmVsZXZhbnQgaWYgdi5yZXBvcnRTaGlmdCBpcyB0cnVlXG5cbiAgICB9IC8vIGVuZCBpZiAodi5yZXBvcnRTaGlmdClcbiAgICAqL1xuXG4gICAgY2FsbGJhY2sgKGNoT2IpO1xuXG59OyAvLyBlbmQgZi5jS2V5VXBEb3duRmluaXNoIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRlZmF1bHRIYW5kbGVyID0gKGNoT2IpID0+IHtcbiAgICBcbiAgICBjb25zdCBjaE9iUyA9IEpTT04uc3RyaW5naWZ5IChjaE9iKTtcbiAgICBjb25zb2xlLmxvZyAoJ2dvLWtleS5kZWZhdWx0SGFuZGxlci5jaE9iOiAnICsgY2hPYlMpO1xuXG59OyAvLyBlbmQgZi5kZWZhdWx0SGFuZGxlciBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmdldEtleUNvZGUgPSAod2hpY2gpID0+IHtcbiAgICBcblxuICAgIGxldCBjaDtcblxuICAgIGlmICh2LmN0cmxPck5vbkFzY2lpLmhhc093blByb3BlcnR5ICh3aGljaCkpIHtcblxuICAgICAgICBjaCA9IHYuY3RybE9yTm9uQXNjaWkgW3doaWNoXTtcblxuICAgIH0gZWxzZSBpZiAodi5rU2hpZnQgJiYgdi5hc2NpaVNoaWZ0ZWQuaGFzT3duUHJvcGVydHkgKHdoaWNoKSkge1xuXG4gICAgICAgIGNoID0gdi5hc2NpaVNoaWZ0ZWQgW3doaWNoXTtcblxuICAgIH0gZWxzZSBpZiAoIXYua1NoaWZ0ICYmIHYuYXNjaWlVblNoaWZ0ZWQuaGFzT3duUHJvcGVydHkgKHdoaWNoKSkge1xuXG4gICAgICAgIGNoID0gdi5hc2NpaVVuU2hpZnRlZCBbd2hpY2hdO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBjaCA9IG51bGw7XG5cbiAgICB9IC8vIGVuZCBpZiBcblxuICAgIHJldHVybiBjaDtcblxufTsgLy8gZW5kIGYuZ2V0S2V5Q29kZSBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmluaXRLZXlEb3duID0gKGpxU2VsZWN0b3IpID0+IHtcbiAgICBcbiAgICAkKGpxU2VsZWN0b3IpXG4gICAgLm9mZigna2V5ZG93bicpXG4gICAgLmtleWRvd24gKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nICgnID09PiBpbml0S2V5RG93bicpO1xuICAgICAgICBjYi5jS2V5RG93biAoZXZlbnQpO1xuICAgIH0pO1xuXG59OyAvLyBlbmQgZi5pbml0S2V5RG93biBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5pbml0S2V5VXAgPSAoanFTZWxlY3RvcikgPT4ge1xuICAgIFxuICAgICQoanFTZWxlY3RvcilcbiAgICAub2ZmKCdrZXl1cCcpXG4gICAgLmtleXVwIChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJyA9PT4gaW5pdEtleVVwJyk7XG4gICAgICAgIGNiLmNLZXlVcCAoZXZlbnQpO1xuICAgIH0pO1xuXG59OyAvLyBlbmQgZi5pbml0S2V5VXAgXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG5jb25zdCBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmFsbEtleXNPZmYgPSAoKSA9PiB7XG4gICAgXG4gICAgY29uc3Qga2V5RXZlbnRzID0gX20wLmtleUV2ZW50cztcbiAgICBjb25zdCBrZXlTZWxzID0gT2JqZWN0LmtleXMgKGtleUV2ZW50cyk7XG5cbiAgICBrZXlTZWxzLmZvckVhY2ggKGZ1bmN0aW9uIChlbCkge1xuXG4gICAgICAgIGtleUV2ZW50cyBbZWxdLm9mZiAoKTtcbiAgICB9KTtcblxufTsgLy8gZW5kIFAuYWxsS2V5c09mZlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmFsbEtleXNPbiA9ICgpID0+IHtcbiAgICBcbiAgICBjb25zdCBrZXlFdmVudHMgPSBfbTAua2V5RXZlbnRzO1xuICAgIGNvbnN0IGtleVNlbHMgPSBPYmplY3Qua2V5cyAoa2V5RXZlbnRzKTtcblxuICAgIGtleVNlbHMuZm9yRWFjaCAoZnVuY3Rpb24gKGVsKSB7XG5cbiAgICAgICAga2V5RXZlbnRzIFtlbF0ub24gKCk7XG4gICAgfSk7XG5cbn07IC8vIGVuZCBQLmFsbEtleXNPblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnNldEtleU9mZiA9ICgpID0+IHtcbiAgICBcbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJ1NFVEtFWU9GRiBnby1rZXkuc2V0S2V5T2ZmICAgICBqcVNlbGVjdG9yID0gJyArIHYuanFTZWxlY3Rvcik7XG4gICAgJCh2LmpxU2VsZWN0b3IpXG4gICAgLm9mZiAoJ2tleWRvd24nKVxuICAgIC5vZmYgKCdrZXl1cCcpO1xuXG59OyAvLyBlbmQgUC5zZXRLZXlPZmZcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy9QLnNldEtleU9uID0gKGpxU2VsKSA9PiB7XG5QLnNldEtleU9uID0gKCkgPT4ge1xuICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nICgnU0VUS0VZT04gZ28ta2V5LnNldEtleU9uICAganFTZWxlY3RvciA9ICcgKyB2LmpxU2VsZWN0b3IpO1xuICAgIC8vZi5pbml0S2V5VXAgKGpxU2VsKTtcbiAgICAvL2YuaW5pdEtleURvd24gKGpxU2VsKTtcbiAgICBmLmluaXRLZXlVcCAodi5qcVNlbGVjdG9yKTtcbiAgICBmLmluaXRLZXlEb3duICh2LmpxU2VsZWN0b3IpO1xuXG59OyAvLyBlbmQgUC5zZXRLZXlIYW5kbGVyXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5BLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuIiwiLy8gZ28tbXNnL2luZGV4LmpzXG4vLyBnby1tc2cgb2JqZWN0IGhhcyBhIHVuaXF1ZSBwcmltYXJ5IG1zZyBhbmQgemVybyBvciBtb3JlIG9wdGlvbmFsIGF0dHJpYnV0ZXNcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwMCkge1xuXG5jb25zdCB2ID0ge1xuXG4gICAgcHJpbWFyeTogbnVsbCxcbiAgICAgICAgLy8gcHJpbWFyeToge2NtZDogMX0gKGNvbnRhaW5zIG9wdGlvbmFsIGNvbnRlbnQpIG9yIHtjbWQ6IDB9IChubyBvcHRpb25hbCBjb250ZW50IGFsbG93ZWQpXG5cbiAgICBzZWNvbmRhcnk6IG51bGwsXG4gICAgICAgIC8vIGlmIGEgcHJpbWFyeSBtZXNzYWdlIGhhcyBhbiBvcHRpb25hbCBhdHRyaWJ1dGUgdGhhdCBjb25jaWRlbnRhbGx5IGlzIHRoZSBzYW1lIGFzXG4gICAgICAgIC8vIGFub3RoZXIgcHJpbWFyeSBtZXNzYWdlLCBpdCBzaG91bGQgYmUgaGF2ZSBhIGtleS92YWx1ZSBwYWlyIGluIHNlY29uZGFyeSB7YXR0cjogMX1cbiAgICAgICAgLy8gdG8gZW5zdXJlIHRoYXQgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGFuIGF0dHJpYnV0ZSBpbiBjYXNlIGEgcHJpbWFyeSBpcyBwcmVzZW50XG4gICAgICAgIC8vIFNlY29uZGFyeSBpcyBvbmx5IHRlc3RlZCBpZiB0aGVyZSBleGlzdHMgYSBwcmltYXJ5IGtleVxuXG4gICAgbWV0YTogbnVsbCxcbiAgICAgICAgLy8gbWV0YSBwYXJhbWV0ZXJzIGludGVuZGVkIGZvciBjdHJsIG9yIG90aGVyIHB1cnBvc2Ugb3V0c2lkZSBvZiBwcmltYXJ5IGFuZCBzZWNvbmRhcnkgbXNnXG4gICAgICAgIC8vIHBhcmFtZXRlciB1c2FnZVxuXG59OyAgXG5cbmNvbnN0IEEgPSB7fTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5BLmluaXQgPSAoKSA9PiB7XG5cbiAgICB2LnByaW1hcnkgPSBwMC5wcmltYXJ5O1xuICAgIHYuc2Vjb25kYXJ5ID0gcDAuaGFzT3duUHJvcGVydHkgKCdzZWNvbmRhcnknKSA/IHAwLnNlY29uZGFyeSA6IHt9O1xuICAgIHYubWV0YSA9IHAwLmhhc093blByb3BlcnR5ICgnbWV0YScpID8gcDAubWV0YSA6IHt9O1xuXG59OyAvLyBlbmQgQS5pbml0XG5cblxuY29uc3QgZiA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5wYXJzZU1zZyA9IChtc2dPYikgPT4ge1xuICAgIFxuICAgIGNvbnN0IHJlcyA9IHt9O1xuICAgIGNvbnN0IG1zZ0tleXMgPSBPYmplY3Qua2V5cyAobXNnT2IpO1xuXG4gICAgY29uc3QgcHJpbWFyeUNhbmRpZGF0ZXNPYiA9IHt9O1xuICAgIGNvbnN0IGF0dHJzT2IgPSB7fTtcbiAgICBjb25zdCBtZXRhT2IgPSB7fTtcblxuICAgIGxldCBrZXk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtc2dLZXlzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAga2V5ID0gbXNnS2V5cyBbaV07XG4gICAgICAgIFxuICAgICAgICBpZiAodi5wcmltYXJ5Lmhhc093blByb3BlcnR5IChrZXkpKSB7XG5cbiAgICAgICAgICAgIHByaW1hcnlDYW5kaWRhdGVzT2IgW2tleV0gPSAxO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodi5tZXRhLmhhc093blByb3BlcnR5IChrZXkpKSB7XG5cbiAgICAgICAgICAgIG1ldGFPYiBba2V5XSA9IG1zZ09iIFtrZXldO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGF0dHJzT2IgW2tleV0gPSBtc2dPYiBba2V5XTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAodi5wcmltYXJ5Lmhhc093blByb3BlcnR5IChrZXkpKVxuICAgICAgICBcbiAgICB9IC8vIGVuZCBmb3IgKGxldCBpID0gMDsgaSA8IG1zZ0tleXMubGVuZ3RoOyBpKyspXG5cbiAgICBjb25zdCBwcmltYXJ5Q2FuZGlkYXRlc0EgPSBPYmplY3Qua2V5cyAocHJpbWFyeUNhbmRpZGF0ZXNPYik7XG5cbiAgICBsZXQgcHJpbWFyeUtleSA9IG51bGw7XG5cbiAgICBpZiAocHJpbWFyeUNhbmRpZGF0ZXNBLmxlbmd0aCA9PT0gMSkge1xuXG4gICAgICAgIHByaW1hcnlLZXkgPSBwcmltYXJ5Q2FuZGlkYXRlc0EgWzBdO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaGFuZGxlIHByaW1hcnkvc2Vjb25kYXJ5IGtleSByZXNvbHV0aW9uXG5cbiAgICAgICAgZm9yIChrZXkgaW4gcHJpbWFyeUNhbmRpZGF0ZXNPYikge1xuXG4gICAgICAgICAgICBpZiAodi5zZWNvbmRhcnkuaGFzT3duUHJvcGVydHkgKGtleSkpIHtcblxuICAgICAgICAgICAgICAgIGF0dHJzT2IgW2tleV0gPSBtc2dPYiBba2V5XTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmIChwcmltYXJ5S2V5ID09PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeUtleSA9IGtleTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzLmVyciA9ICdNdWx0aXBsZSBwcmltYXJ5IGtleXMgZm91bmQ6ICcgKyBwcmltYXJ5S2V5ICsgJywnICsga2V5ICsgJ2FuZCBwb3NzaWJseSBvdGhlcnMuIE9yaWdpbmFsIG1lc3NhZ2VcXG4nICArIEpTT04uc3RyaW5naWZ5IChtc2cpO1xuXG4gICAgICAgICAgICAgICAgfSAvLyBlbmQgaWYgKHByaW1hcnlLZXkgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmICh2LnNlY29uZGFyeS5oYXNPd25Qcm9wZXJ0eSAoa2V5KSlcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9IC8vIGVuZCBpZiAocHJpbWFyeUNhbmRpZGF0ZXNBLmxlbmd0aCA9PT0gMClcblxuICAgIGlmIChwcmltYXJ5S2V5ID09PSBudWxsKSB7XG5cbiAgICAgICAgcmVzLmVyciA9ICdFaXRoZXIgdGhlcmUgd2FzIG5vIHByaW1hcnkga2V5IG9yIGFsbCBwcmltYXJ5IGNhbmRpZGF0ZXMgYXJlIG1lbWJlcnMgb2Ygc2Vjb25kYXJ5OiAnICsgSlNPTi5zdHJpbmdpZnkgKHByaW1hcnlDYW5kaWRhdGVzQSk7XG5cbiAgICB9IC8vIGVuZCBpZiAocHJpbWFyeUtleSA9PT0gbnVsbClcbiAgICBcblxuXG4gICAgcmVzLnAgPSBwcmltYXJ5S2V5O1xuICAgIHJlcy5jID0gcHJpbWFyeUtleSAmJiB2LnByaW1hcnkgW3ByaW1hcnlLZXldICE9PSAwID8gbXNnT2IgW3ByaW1hcnlLZXldIDogbnVsbDtcbiAgICAgICAgLy8gZXhhbXBsZSB2b2lkIGh0bWwgdGFnIGhhcyB6ZXJvIGNvbnRlbnQsIHNvIGNvbnRlbnQgaXMgZm9yY2VkIHRvIG51bGxcblxuICAgIHJlcy5zID0gYXR0cnNPYjtcbiAgICByZXMubSA9IG1ldGFPYjtcblxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBmLnBhcnNlTXNnIFxuXG5cblxuY29uc3QgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5wYXJzZU1zZyA9IChtc2dPYikgPT4ge1xuICAgIFxuICAgIGNvbnN0IHJlcyA9IGYucGFyc2VNc2cgKG1zZ09iKTtcblxuICAgIGFjdGlvbiA9IHYucHJpbWFyeSBbcmVzLnBdO1xuICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG5cbiAgICAgICAgYWN0aW9uIChyZXMpO1xuXG4gICAgfSAvLyBlbmQgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpXG4gICAgICAgIFxuXG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIFAucGFyc2VNc2cgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAucHJpbWFyeUtleUdldCA9IChtc2dPYikgPT4ge1xuICAgIFxuICAgIGNvbnN0IHJlcyA9IGYucGFyc2VNc2cgKG1zZ09iKTtcbiAgICByZXR1cm4gcmVzLnA7XG5cbn07IC8vIGVuZCBQLnByaW1hcnlLZXlHZXQgXG5cblxuQS5pbml0ICgpO1xuXG5yZXR1cm4gUDtcblxufTtcblxuXG5cbiIsIi8vIGdvLXBvcGluZm8vaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHApIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBfID0ge1xuICAgIGRwcDogZHAuZGlzcGxheVBhZ2UsXG4gICAgZ2VuSWQ6IGRwLmdlbklkLFxuICAgIGFycm93U2l6ZTogMTAsXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxuXy5pbml0ID0gKCkgPT4ge1xuXG4gICAgXy5zZXRQb3B1cFN0eWxlICgpO1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uZ2V0UG9zRGltID0gKGpxKSA9PiB7XG4gICAgXG4gICAgdmFyIHJlcyA9IHt9O1xuXG4gICAgdmFyIG9mZnNldCA9ICQoanEpLm9mZnNldCAoKTtcbiAgICByZXMubGVmdCA9IG9mZnNldC5sZWZ0O1xuICAgIHJlcy50b3AgPSBvZmZzZXQudG9wO1xuXG4gICAgcmVzLndpZHRoID0gJChqcSkud2lkdGggKCk7XG4gICAgcmVzLmhlaWdodCA9ICQoanEpLmhlaWdodCAoKTtcblxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBfLmdldFBvc0RpbSBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbl8uc2V0UG9wdXBTdHlsZSA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgYXMgPSBfLmFycm93U2l6ZTtcblxuICAgIHZhciBwb3B1cFN0eWxlID0gW1xuICAgICAgICB7cm06ICcjc3R5bGVwb3BpbmZvJ30sXG4gICAgICAgIHtzdHlsZTogJy5wb3B1cCB7JyArXG4gICAgICAgICdwb3NpdGlvbjogcmVsYXRpdmU7JyArXG4gICAgICAgICdkaXNwbGF5OiBpbmxpbmUtYmxvY2s7JyArXG4gICAgICAgICdib3JkZXI6IDFweCBzb2xpZCBibHVlOycgK1xuICAgICAgICAnYm9yZGVyLXJhZGl1czogNHB4OycgK1xuICAgICAgICAnYmFja2dyb3VuZC1jb2xvcjogI2ViZjJmMjsnICtcbiAgICAgICAgJ2ZvbnQtc2l6ZTogMTJweDsnICtcbiAgICAnfScgK1xuICAgICcucG9wdXB3cmFwIHsnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsnICtcbiAgICAnfScgK1xuICAgICcucG9wdXBub3ZpcyB7JyArXG4gICAgICAgICdkaXNwbGF5OiBub25lOycgK1xuICAgICd9JyArXG4gICAgJy5hcnJvdyB7JyArXG4gICAgICAgICdwb3NpdGlvbjogYWJzb2x1dGU7JyArXG4gICAgICAgICdkaXNwbGF5OiBpbmxpbmUtYmxvY2s7JyArXG4gICAgICAgICd3aWR0aDogMDsnICtcbiAgICAgICAgJ2hlaWdodDogMDsnICtcbiAgICAgICAgJ2JvcmRlci1zdHlsZTogc29saWQ7JyArXG4gICAgICAgICdib3gtc2l6aW5nOiBib3JkZXItYm94OycgK1xuICAgICd9JyArXG4gICAgJy5hcnJvd2JvcmRlciB7JyArXG4gICAgICAgICdib3JkZXItd2lkdGg6ICcgKyAoYXMgLSAxKSArICdweDsnICtcbiAgICAgICAgJ2JvcmRlci1jb2xvcjogYmx1ZSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDsnICtcbiAgICAgICAgJ2JvdHRvbTogLScgKyAoMiphcyAtIDIpICsgJ3B4OycgK1xuICAgICd9JyArXG4gICAgJy5hcnJvd2ZpbGxlciB7JyArXG4gICAgICAgICdib3JkZXItd2lkdGg6ICcrIChhcyAtIDIpICsgJ3B4OycgK1xuICAgICAgICAnYm9yZGVyLWNvbG9yOiAjZWJmMmYyIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50OycgK1xuICAgICAgICAnYm90dG9tOiAtJyArICgyKmFzIC0gNCkgKyAncHg7JyArXG4gICAgICAgICd6LWluZGV4OiAxOycgK1xuICAgICd9JywgXG4gICAgaWQ6ICdzdHlsZXBvcGluZm8nLCBwYXJlbnQ6ICdoZWFkJ31cbiAgICBdO1xuXG4gICAgXy5kcHAgKHBvcHVwU3R5bGUpO1xuXG59OyAvLyBlbmQgXy5zZXRQb3B1cFN0eWxlXG5cblxuXG5cblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuY3JlYXRlUG9wdXBEaXNwbGF5ID0gKGpxT2JJbiwgZGlzcHN0ciwgb3B0aW9ucykgPT4ge1xuICAgIFxuICAgIGpxT2IgPSB0eXBlb2YganFPYkluID09PSAnc3RyaW5nJyA/ICQoanFPYkluKSA6IGpxT2JJbjtcbiAgICBJZGpxT2IgPSAnIycgKyBqcU9iIFswXS5pZDtcblxuICAgIGRpc3BTdHJzID0gZGlzcHN0ci5zcGxpdCAoJ1xcbicpO1xuXG4gICAgdmFyIGRpc3BBID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwU3Rycy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBkaXNwU3RyID0gZGlzcFN0cnMgW2ldO1xuICAgICAgICBpZiAoaSA+IDApIHtcblxuICAgICAgICAgICAgZGlzcEEucHVzaCAoe2JyOjB9KTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoaSA+IDApXG4gICAgICAgIFxuICAgICAgICBkaXNwQS5wdXNoICh7c3BhbjogZGlzcFN0ciwgc3R5bGU6ICdkaXNwbGF5OiBpbmxpbmUtYmxvY2s7J30pO1xuXG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BTdHJzOyBpKyspXG4gICAgXG4gICAgdmFyIGRpc3BPYiA9IHtkaXY6IGRpc3BBLCBzdHlsZTogJ21hcmdpbjogMnB4Oyd9O1xuICAgIHZhciBwb3NFbCA9IF8uZ2V0UG9zRGltIChqcU9iKTtcblxuICAgICAgICAvLyBmb3JjZXMgZGl2IHdpZHRoIHRvIHdpZHRoIG9mIGNvbnRlbnRcbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NTA5MDMvaG93LXRvLW1ha2UtZGl2LW5vdC1sYXJnZXItdGhhbi1pdHMtY29udGVudHNcblxuICAgIHZhciBpZEFiID0gXy5nZW5JZCAoKTtcbiAgICB2YXIgaWRBZiA9IF8uZ2VuSWQgKCk7XG5cbiAgICB2YXIgZGl2QXJyb3dCb3JkZXIgPSB7ZGl2OiAwLCBpZDogaWRBYiwgY2xhc3M6ICdhcnJvdyBhcnJvd2JvcmRlcid9O1xuICAgIHZhciBkaXZBcnJvd0ZpbGxlciA9IHtkaXY6IDAsIGlkOiBpZEFmLCBjbGFzczogJ2Fycm93IGFycm93ZmlsbGVyJ307XG5cbiAgICBpZEFiID0gJyMnICsgaWRBYjtcbiAgICBpZEFmID0gJyMnICsgaWRBZjtcblxuICAgIC8vdmFyIHBvcE9iID0ge2RpdjogW2Rpc3BPYiwgZGl2QXJyb3dCb3JkZXIsIGRpdkFycm93RmlsbGVyXSwgY2xhc3M6ICdwb3B1cCcsIGFmdGVyOiBJZGpxT2J9O1xuICAgIHZhciBwb3BPYlJlbCA9IHtkaXY6IFtkaXNwT2IsIGRpdkFycm93Qm9yZGVyLCBkaXZBcnJvd0ZpbGxlcl0sIGNsYXNzOiAncG9wdXAnfTtcbiAgICB2YXIgcG9wT2IgPSB7ZGl2OiBwb3BPYlJlbCwgY2xhc3M6ICdwb3B1cHdyYXAnfTtcbiAgICB2YXIgSWRQb3BPYiA9IF8uZHBwIChwb3BPYik7XG4gICAgdmFyIHBvc1BvcHVwID0gXy5nZXRQb3NEaW0gKElkUG9wT2IpO1xuXG4gICAgdmFyIHRvcERPID0gcG9zRWwudG9wIC0gcG9zUG9wdXAuaGVpZ2h0IC0gXy5hcnJvd1NpemU7XG4gICAgdmFyIGxlZnRETyA9IHBvc0VsLmxlZnQgKyBwb3NFbC53aWR0aC8yIC0gcG9zUG9wdXAud2lkdGgvMjtcblxuICAgICQoSWRQb3BPYilcbiAgICAub2Zmc2V0ICh7dG9wOiB0b3BETywgbGVmdDogbGVmdERPfSk7XG5cbiAgICB2YXIgcG9zQWIgPSBfLmdldFBvc0RpbSAoaWRBYik7XG4gICAgdmFyIHBvc0FmID0gXy5nZXRQb3NEaW0gKGlkQWYpO1xuXG4gICAgdmFyIGFzID0gXy5hcnJvd1NpemU7XG4gICAgJChpZEFiKVxuICAgIC5vZmZzZXQgKHt0b3A6IHBvc0FiLnRvcCwgbGVmdDogbGVmdERPICsgcG9zUG9wdXAud2lkdGgvMiAtIGFzLzIgLSAyfSk7XG5cbiAgICAkKGlkQWYpXG4gICAgLm9mZnNldCAoe3RvcDogcG9zQWYudG9wLCBsZWZ0OiBsZWZ0RE8gKyBwb3NQb3B1cC53aWR0aC8yICsgMSAtIGFzLzIgLSAyfSk7XG5cbiAgICAkKElkUG9wT2IpXG4gICAgLmFkZENsYXNzICgncG9wdXBub3ZpcycpO1xuXG4gICAgcmV0dXJuIElkUG9wT2I7XG59OyAvLyBlbmQgUC5jcmVhdGVQb3B1cERpc3BsYXkgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmhpZGVQb3B1cHMgPSAoSWQpID0+IHtcbiAgICBcbiAgICB2YXIgc2VsID0gSWQgPyBJZCA6ICcucG9wdXB3cmFwJztcblxuICAgICQoc2VsKVxuICAgIC5hZGRDbGFzcyAoJ3BvcHVwbm92aXMnKTtcblxuXG59OyAvLyBlbmQgUC5oaWRlUG9wdXBzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuc2hvd1BvcHVwcyA9IChJZCkgPT4ge1xuICAgIFxuICAgIHZhciBzZWwgPSBJZCA/IElkIDogJy5wb3B1cHdyYXAnO1xuXG4gICAgJChzZWwpXG4gICAgLnJlbW92ZUNsYXNzICgncG9wdXBub3ZpcycpO1xuXG5cbn07IC8vIGVuZCBQLnNob3dQb3B1cHNcblxuXG5cblxuXG4vLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuXy5pbml0ICgpO1xuXG5yZXR1cm4gUDtcblxufTtcblxuXG5cblxuIiwiLy8gZ28tdXRpbC9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG5cbiAgICBrZXkxOiByZXF1aXJlICgna2V5MScpXG5cbn07ICAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG52YXIgZj17fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZGRzRG9JdCA9IChvYiwgdG9Vbmljb2RlKSA9PiB7XG4gICAgLy8gb2IgaXMgYXJyYXkgPT4gcmV0dXJucyBzYW1lIG9iXG4gICAgLy8gb2IgaXMgb2JqZWN0ID0+IHJldHVybnMgbmV3IG9iXG4gICAgXG4gICAgdmFyIHJlcztcblxuICAgIHZhciBkb1JlcGxhY2UgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBuZXdLZXk7XG5cbiAgICAgICAgaWYgKHRvVW5pY29kZSkge1xuXG4gICAgICAgICAgICBuZXdLZXkgPSBrZXkucmVwbGFjZSAoL1xcJC9nLCAnXFxcXHVGRjA0Jyk7XG4gICAgICAgICAgICBuZXdLZXkgPSBuZXdLZXkucmVwbGFjZSAoL1xcLi9nLCAnXFxcXHVGRjBFJyk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbmV3S2V5ID0ga2V5LnJlcGxhY2UgKC9cXFxcdUZGMDQvZywgJyQnKTtcbiAgICAgICAgICAgIG5ld0tleSA9IG5ld0tleS5yZXBsYWNlICgvXFxcXHVGRjBFL2csICcuJyk7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKHRvVW5pY29kZSlcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXdLZXk7XG4gICAgfTtcblxuICAgIGlmIChvYiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2IgPT09ICdvYmplY3QnICYmICEob2IuaGFzT3duUHJvcGVydHkgKCdfYnNvbnR5cGUnKSAmJiBvYi5fYnNvbnR5cGUgPT09ICdPYmplY3RJRCcpKSB7XG5cbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5IChvYikpIHtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9iLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICBvYiBbaV0gPSBmLmRkc0RvSXQgKG9iIFtpXSwgdG9Vbmljb2RlKTtcblxuICAgICAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBvYi5sZW5ndGg7IGkrKylcblxuICAgICAgICAgICAgcmVzID0gb2I7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmVzID0ge307XG5cbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMgKG9iKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5cyBbaV07XG5cbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gb2Jba2V5XTtcbiAgICBcbiAgICAgICAgICAgICAgICB2YXIgbmV3S2V5ID0gZG9SZXBsYWNlIChrZXkpO1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyBbbmV3S2V5XSA9IGYuZGRzRG9JdCAodmFsLCB0b1VuaWNvZGUpO1xuICAgIFxuXG4gICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGtleXM7IGkrKylcbiAgICAgICAgICAgIFxuICAgICAgICB9IC8vIGVuZCBpZiAoQXJyYXkuaXNBcnJheSAob2IpKVxuICAgICAgICBcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJlcyA9IG9iO1xuXG4gICAgfSAvLyBlbmQgaWYgKG9iID09PSBudWxsIHx8IHR5cGVvZiBvYiAhPT0gJ29iamVjdCcpXG5cblxuICAgIHJldHVybiByZXM7XG5cbn07ICAvLyBlbmQgZi5kZHNEb0l0IFxuXG5cbiAgICAvLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmFyVG9PYiA9IChhcikgPT4ge1xuICAgIFxuICAgIHZhciBvYiA9IHt9O1xuICAgIFxuICAgIGlmIChBcnJheS5pc0FycmF5IChhcikpIHtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHZhciBuYW1lID0gYXIgW2ldO1xuICAgICAgICAgICAgb2IgW25hbWVdID0gaTtcblxuICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGFyLmxlbmd0aDsgaSsrKVxuXG4gICAgfSAvLyBlbmQgaWYgKEFycmF5LmlzQXJyYXkgKGFyKSlcbiAgICByZXR1cm4gb2I7XG5cbn07IC8vIGVuZCBQLmFyVG9PYiBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5jbG9uZU9iID0gKG9iKSA9PiB7XG4gICAgLy8gYXNzdW1lcyBubyB2YWx1ZXMgdGhhdCBhcmUgZnVuY3Rpb24gdHlwZXNcbiAgICBcbiAgICByZXR1cm4gSlNPTi5wYXJzZSAoSlNPTi5zdHJpbmdpZnkgKG9iKSk7XG5cbn07IC8vIGVuZCBQLmNsb25lT2IgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuY29uc3RTdHIgPSAoY2gsIGxlbmd0aCkgPT4ge1xuICAgIFxuICAgIHZhciByZXMgPSBuZXcgQXJyYXkgKGxlbmd0aCArIDEpLmpvaW4gKGNoKTtcbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgY29uc3RTdHIgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZG9sbGFyRG90U3ViVW5pY29kZSA9IChvYikgPT4ge1xuICAgIFxuICAgIHJldHVybiBmLmRkc0RvSXQgKG9iLCB0cnVlKTtcblxufTsgIC8vIGVuZCBkb2xsYXJEb3RTdWJVbmljb2RlIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmRvbGxhckRvdFN1YlVuaWNvZGVSZXN0b3JlID0gKG9iKSA9PiB7XG4gICAgXG4gICAgcmV0dXJuIGYuZGRzRG9JdCAob2IsIGZhbHNlKTtcblxufTsgIC8vIGVuZCBkb2xsYXJEb3RTdWJVbmljb2RlUmVzdG9yZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmR1bXBPYiA9IChvYiwgZGVwdGgpID0+IHtcbiAgICBcbiAgICBkZXB0aCA9IGRlcHRoID8gZGVwdGggOiAwO1xuXG4gICAgdmFyIGluZGVudEN1cjtcbiAgICB2YXIgaW5kZW50RGVsdGE7XG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIGR1bXBPYkluaXQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBpbmRlbnRDdXIgPSAwO1xuICAgICAgICBpbmRlbnREZWx0YSA9IDQ7XG4gICAgXG4gICAgfTsgLy8gZW5kIGR1bXBPYkluaXRcbiAgICBcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIGRlY3JJbmRlbnQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBpbmRlbnRDdXIgLT0gaW5kZW50RGVsdGE7XG4gICAgXG4gICAgfTsgLy8gZW5kIGRlY3JJbmRlbnRcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBpbmNySW5kZW50ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgaW5kZW50Q3VyICs9IGluZGVudERlbHRhO1xuICAgIFxuICAgIH07IC8vIGVuZCBpbmNySW5kZW50XG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgZG9JbmRlbnQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gXCIgXCIucmVwZWF0IChpbmRlbnRDdXIpO1xuICAgIFxuICAgIH07IC8vIGVuZCBkb0luZGVudFxuICAgIFxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIHRvcEtleSA9ICgpID0+IHtcbiAgICBcbiAgICAgICAgdmFyIHJlcyA9IFwiXCI7XG4gICAgICAgIHZhciBzdGFydEk7XG5cbiAgICAgICAgaWYgKGtleXMubGVuZ3RoIDw9IGRlcHRoKSB7XG5cbiAgICAgICAgICAgIHN0YXJ0SSA9IDA7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgc3RhcnRJID0ga2V5cy5sZW5ndGggLSBkZXB0aDtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoa2V5cy5sZW5ndGggPD0gZGVwdGgpXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0STsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgcmVzICs9IGtleXMgW2ldO1xuICAgICAgICAgICAgcmVzICs9IGkgPT09IGtleXMubGVuZ3RoIC0gMSA/IFwiXCIgOiBcIi5cIjtcblxuICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzO1xuXG4gICAgfTsgLy8gZW5kIHRvcEtleVxuXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBkdW1wS2V5UGFpciA9IChvYiwga2V5LCBub0tleSkgPT4ge1xuICAgIFxuICAgICAgICB2YXIgcHJlZml4ID0gdG9wS2V5ICgpO1xuXG4gICAgICAgIHZhciByZXMgPSBkb0luZGVudCAoKTtcbiAgICAgICAgdmFyIHZhbCA9IG9iIFtrZXldO1xuXG4gICAgICAgIGtleXMucHVzaCAoa2V5KTtcbiAgICAgICAgcmVzICs9IHByZWZpeCAhPT0gXCJcIiA/IHByZWZpeCArICcuJyA6IFwiXCI7XG4gICAgICAgIHJlcyArPSBub0tleSA/IFwiXCIgOiBrZXkgKyAnOiAnO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdfaWQnICYmIFAuaXNPYiAodmFsKSAmJiB2YWwuaGFzT3duUHJvcGVydHkgKCdfYnNvbnR5cGUnKSAmJiB2YWwuX2Jzb250eXBlID09PSAnT2JqZWN0SUQnKSB7XG5cbiAgICAgICAgICAgIHJlcyArPSAnT2JqZWN0SWQoXCInICsgdmFsICsgJ1wiKSc7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmVzICs9IGR1bXBPYkggKHZhbCk7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGtleSA9PT0gJ19pZCcgJiYgUC5pc09iICh2YWwpICYmIHZhbC5oYXNPd25Qcm9wZXJ0eSAoJ19ic29udHlwZScpICYmIHZhbC5fYnNvbnR5cGUgPT09ICdPYmplY3RJRCcpXG4gICAgICAgIFxuICAgICAgICBrZXlzLnBvcCAoKTtcblxuICAgICAgICByZXMgKz0gXCJcXG5cIjtcblxuICAgICAgICByZXR1cm4gcmVzO1xuXG4gICAgfTsgLy8gZW5kIGR1bXBLZXlQYWlyIFxuXG4gICAgXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBkdW1wT2JIID0gKG9iKSA9PiB7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmVzO1xuICAgICAgICBpZiAodHlwZW9mIG9iID09PSAndW5kZWZpbmVkJykge1xuICAgIFxuICAgICAgICAgICAgcmVzID0gJ3VuZGVmaW5lZCc7XG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAob2IgPT09IG51bGwpIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9ICdudWxsJztcbiAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2IgPT09ICdib29sZWFuJykge1xuICAgIFxuICAgICAgICAgICAgcmVzID0gb2IgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYiA9PT0gJ251bWJlcicpIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9IFwiXCIgKyBvYjtcbiAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2IgPT09ICdzdHJpbmcnKSB7XG4gICAgXG4gICAgICAgICAgICBpZiAoIW9iLm1hdGNoICgvJy8pKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzID0gXCInXCIgKyBvYiArIFwiJ1wiO1xuICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmICghb2IubWF0Y2ggKC9cIi8pKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzID0gJ1wiJyArIG9iICsgJ1wiJztcbiAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzID0gJ1wiJyArIG9iLnJlcGxhY2UgKC9cIi8sICdcXFxcXCInKSArICdcIic7XG4gICAgXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAoIW9iLm1hdGNoICgvJy8pKVxuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSAob2IpKSB7XG4gICAgXG4gICAgICAgICAgICBpZiAob2IubGVuZ3RoID09PSAwKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzID0gJ1tdJztcbiAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzID0gXCJbXFxuXCI7XG4gICAgICAgICAgICAgICAgaW5jckluZGVudCAoKTtcbiAgICBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iLmxlbmd0aDsgaSsrKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPSBkdW1wS2V5UGFpciAob2IsIGksIHRydWUpO1xuICAgIFxuICAgICAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgb2IubGVuZ3RoOyBpKyspXG4gICAgXG4gICAgICAgICAgICAgICAgZGVjckluZGVudCAoKTtcbiAgICBcbiAgICAgICAgICAgICAgICByZXMgKz0gZG9JbmRlbnQgKCk7XG4gICAgICAgICAgICAgICAgcmVzICs9IFwiXVwiIDtcbiAgICBcbiAgICAgICAgICAgIH0gLy8gZW5kIGlmIChvYi5sZW5ndGggPT09IDApXG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iID09PSAnb2JqZWN0Jykge1xuICAgIFxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyAob2IpLnNvcnQgKCk7XG4gICAgXG4gICAgICAgICAgICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IFwie31cIjtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IFwie1xcblwiO1xuICAgICAgICAgICAgICAgIGluY3JJbmRlbnQgKCk7XG4gICAgXG4gICAgICAgICAgICAgICAga2V5cy5mb3JFYWNoIChmdW5jdGlvbiAoa2V5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzICs9IGR1bXBLZXlQYWlyIChvYiwga2V5KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkZWNySW5kZW50ICgpO1xuICAgICAgICAgICAgICAgIHJlcyArPSBkb0luZGVudCAoKTtcbiAgICAgICAgICAgICAgICByZXMgKz0gXCJ9XCI7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmIChrZXlzLmxlbmd0aCA9PT0gMClcbiAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9ICd1bmtub3duOiAnICsgdHlwZW9mIG9iO1xuICAgIFxuICAgICAgICB9IC8vIGVuZCBpZiAodHlwZW9mIG9iID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgXG4gICAgfTsgLy8gZW5kIGR1bXBPYkhcbiAgICBcbiAgICBkdW1wT2JJbml0ICgpO1xuICAgIHJldHVybiBkdW1wT2JIIChvYik7XG5cbn07IC8vIGVuZCBQLmR1bXBPYiBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmlzRW1wdHkgPSAoaXRlbSkgPT4ge1xuICAgIFxuICAgIHZhciByZXMgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAodHlwZW9mIGl0ZW0pIHtcblxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuXG4gICAgICAgICAgICByZXMgPSBpdGVtLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG5cbiAgICAgICAgICAgIHJlcyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdvYmplY3QnOlxuXG4gICAgICAgICAgICBpZiAoUC5pc09iIChpdGVtKSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyAoaXRlbSk7XG4gICAgICAgICAgICAgICAgcmVzID0ga2V5cy5sZW5ndGggPT09IDA7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgcmVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5IChpdGVtKSkge1xuXG4gICAgICAgICAgICAgICAgcmVzID0gaXRlbS5sZW5ndGggPT09IDA7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXMgPSBudWxsOyAgLy8gY2FzZSBzaG91bGRuJ3QgaGFwcGVuLCBzbyBzZXQgdG8gbnVsbCBpZiBpdCBkb2VzXG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmIChQLmlzT2IgKGl0ZW0pKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdib29sZWFuJzpcblxuICAgICAgICAgICAgcmVzID0gIWl0ZW07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdudW1iZXInOlxuXG4gICAgICAgICAgICByZXMgPSBudW1iZXIgPT09IDA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgIH0gLy8gZW5kIHN3aXRjaCAodHlwZW9mIGl0ZW0pXG4gICAgXG5cbiAgICByZXR1cm4gcmVzO1xufTsgLy8gZW5kIFAuaXNFbXB0eSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5pc09iID0gKG9iKSA9PiB7XG4gICAgLy8gcmV0dXJucyB0cnVlIGlmIG9iIGlzIGRlZmluZWQsIG5vdCBudWxsLCBub3QgYW4gQXJyYXkgYW5kIG9mIHR5cGUgb2JqZWN0XG4gICAgXG4gICAgdmFyIHJlcyA9IHR5cGVvZiBvYiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgIG9iICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICFBcnJheS5pc0FycmF5IChvYikgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIG9iID09PSAnb2JqZWN0JztcblxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLmlzT2IgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuazFBID0gKE9iKSA9PiB7XG4gICAgXG4gICAgdmFyIGsxID0gT2JqZWN0LmtleXMgKE9iKVswXTtcbiAgICB2YXIgdjEgPSBPYiBbazFdO1xuXG4gICAgcmV0dXJuIFtrMSwgdjFdO1xuXG59OyAvLyBlbmQgUC5rMUEgXG5cblxuUC5rZXkxID0gdi5rZXkxO1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnBhcnNlUGF0aCA9IChhYnNQYXRoKSA9PiB7XG4gICAgXG4gICAgdmFyIGRpcjtcbiAgICB2YXIgZmlsZTtcblxuICAgIHZhciBtYXRjaGVkID0gYWJzUGF0aC5tYXRjaCAoLyguKlxcLykoW15cXC9dKikvKTtcbiAgICBpZiAobWF0Y2hlZCkge1xuXG4gICAgICAgIGRpciA9IG1hdGNoZWQgWzFdO1xuICAgICAgICBmaWxlID0gbWF0Y2hlZCBbMl07XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGRpciA9IFwiXCI7IFxuICAgICAgICBmaWxlID0gYWJzUGF0aDtcblxuICAgIH0gLy8gZW5kIGlmIChtYXRjaGVkKVxuICAgIFxuICAgIHJldHVybiB7ZGlyOiBkaXIsIGZpbGU6IGZpbGV9O1xuXG59OyAvLyBlbmQgUC5wYXJzZVBhdGggXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAucENoZWNrID0gKHAsIHBEZWZhdWx0KSA9PiB7XG4gICAgLy8gZGl0Y2hlcyBhbnkgcGFyYW1ldGVycyBzdXBwbGllZCBpbiBwIHRoYXQgYXJlbid0IHByZXNlbnQgaW4gcERlZmF1bHRcbiAgICAvLyBpZiBhIHBhcmFtIGlzIG5lY2Vzc2FyeSB0byBhIHJvdXRpbmUsIHRoZW4gaXQgc2hvdWxkIGJlIGRlZmluZWQgaW4gcERlZmF1bHRcbiAgICBcbiAgICB2YXIgcmVzID0ge307XG5cbiAgICBwID0gUC5pc09iIChwKSA/IHAgOiB7fTtcbiAgICBcbiAgICBmb3IgKHZhciBrZXkgaW4gcERlZmF1bHQpIHtcblxuICAgICAgICByZXMgW2tleV0gPSBwLmhhc093blByb3BlcnR5IChrZXkpID8gcCBba2V5XSA6IHBEZWZhdWx0IFtrZXldO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLnBDaGVjayBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5zdHJpcFFKID0gKGpzb25TdHIpID0+IHtcbiAgICBcbiAgICB2YXIgcmVzID0ganNvblN0ci5yZXBsYWNlICgvXCIoW15cIl0rKVwiXFxzKjovZywgXCIkMTpcIik7XG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIFAuc3RyaXBRSiBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC50cmF2ZXJzZUFycmF5ID0gKGFyciwgZm5FbCkgPT4ge1xuICAgIFxuICAgIGlmIChBcnJheS5pc0FycmF5IChhcnIpKSB7XG5cbiAgICAgICAgYXJyLmZvckVhY2ggKGZ1bmN0aW9uIChlbCkge1xuXG4gICAgICAgICAgICBQLnRyYXZlcnNlQXJyYXkgKGVsLCBmbkVsKTtcblxuICAgICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgaWYgKFAuaXNPYiAoYXJyKSkge1xuXG4gICAgICAgICAgICB2YXIgdmFsID0gUC52YWwxIChhcnIpO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSAodmFsKSkge1xuXG4gICAgICAgICAgICAgICAgUC50cmF2ZXJzZUFycmF5ICh2YWwsIGZuRWwpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgZm5FbCAoYXJyKTtcblxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKEFycmF5LmlzQXJyYXkgKHZhbCkpXG4gICAgICAgICAgICBcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBmbkVsIChhcnIpO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChQLmlzT2IgKGFycikpXG5cbiAgICB9IC8vIGVuZCBpZiAoQXJyYXkuaXNBcnJheSAoYXJyKSlcbiAgICBcblxufTsgLy8gZW5kIFAudHJhdmVyc2VBcnJheSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC52YWwxID0gKG9iKSA9PiB7XG4gICAgXG4gICAgdmFyIGtleTEgPSBQLmtleTEgKG9iKTtcbiAgICB2YXIgcmVzID0ga2V5MSA/IG9iIFtrZXkxXSA6IG51bGw7XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC52YWwxIFxuXG5cblxuICAgIC8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5yZXR1cm4gUDtcblxufSgpKTtcblxuXG5cbiIsIi8vIGdvLXdzLWNsaWVudC9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpcCwgcG9ydCwgY2xpZW50LCBvcHRpb25zKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllc1xudmFyIHYgPSB7XG4gICAgXG4gICAgaXA6IGlwLFxuICAgIHBvcnQ6IHBvcnQsXG4gICAgc2VjdXJlQ29ubmVjdGlvbjogbnVsbCxcblxuICAgIHV0OiByZXF1aXJlICgnZ28tdXRpbCcpLFxuICAgIG1pbnNlYzogcmVxdWlyZSAoJ21pbnNlYycpLmdldE1pblNlYyxcbiAgICBtc2dTaG9ydGVuMDogcmVxdWlyZSAoJ21zZ3Nob3J0ZW4nKSxcbiAgICBtc2dTaDogbnVsbCxcbiAgICBwY2hlY2s6IG51bGwsXG4gICAga2V5MTogbnVsbCxcblxuICAgIHdzU2VydmVyOiBudWxsLFxuICAgIHdzVXJsT2I6IG51bGwsXG5cbn07IFxudmFyIGY9e307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmluaXQgPSAoKSA9PiB7XG5cbiAgICB2LnBjaGVjayA9IHYudXQucENoZWNrO1xuICAgIHYua2V5MSA9IHYudXQua2V5MTtcblxuICAgIC8vdmFyIHRhcmdldExlbmd0aCA9IDgwMDAwO1xuICAgIHZhciB0YXJnZXRMZW5ndGggPSAyMDA7XG4gICAgdi5tc2dTaCA9IG5ldyB2Lm1zZ1Nob3J0ZW4wICh0YXJnZXRMZW5ndGgpO1xuXG4gICAgdmFyIHBhcmFtcyA9IHYucGNoZWNrIChvcHRpb25zLCB7c2VjdXJlQ29ubmVjdGlvbjogZmFsc2V9KTtcblxuICAgIHYuc2VjdXJlQ29ubmVjdGlvbiA9IHBhcmFtcy5zZWN1cmVDb25uZWN0aW9uO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cgKCd3c0NsaWVudCBwYXJhbXM6ICcgKyBKU09OLnN0cmluZ2lmeSAocGFyYW1zKSArICdcXG4nKTtcbiAgICBcbiAgICB2LnRzdENtZHMgPSAge3Bpbmc6IGYudHN0Q21kUGluZ1Jlc3B9O1xuICAgIHYuY2xpZW50ID0gY2xpZW50ID8gY2xpZW50IDogZi5yZXBvcnRNc2dPYjtcblxuICAgIHZhciB3c1ByZWZpeCA9IHYuc2VjdXJlQ29ubmVjdGlvbiA/ICd3c3MnIDogJ3dzJztcbiAgICB2YXIgd3NVcmwgPSB3c1ByZWZpeCArICc6Ly8nICsgdi5pcCArICc6JyArIHYucG9ydDtcblxuICAgIHYud3NVcmxPYiA9IHtcbiAgICAgICAgd3NQcmVmaXg6IHdzUHJlZml4LFxuICAgICAgICBpcDogdi5pcCxcbiAgICAgICAgcG9ydDogdi5wb3J0XG4gICAgfTtcblxuICAgIC8vdi53c1NlcnZlciA9IG5ldyBXZWJTb2NrZXQgKHdzVXJsLCBKU09OLnN0cmluZ2lmeSAodi53c1VybE9iKSk7XG4gICAgdi53c1NlcnZlciA9IG5ldyBXZWJTb2NrZXQgKHdzVXJsLCB2LmlwKTtcbiAgICAgICAgLy8gdXNpbmcgdi5pcCBhcyBvcHRpb25hbCBET01TdHJpbmcgcHJvdG9jb2xzOiBcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYlNvY2tldFxuXG4gICAgdi53c1NlcnZlci5vbm1lc3NhZ2UgPSBmLmZyb21TcnZyO1xuICAgIHYud3NTZXJ2ZXIub25jbG9zZSA9IGYubXNnQ2xvc2U7XG4gICAgdi53c1NlcnZlci5vbmVycm9yID0gZi5tc2dFcnJvcjtcblxufTsgLy8gZW5kIGYuaW5pdCBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kb0NtZCA9ICh1TXNnT2IpID0+IHtcblxuICAgIC8qXG4gICAgdmFyIGZyb21TcnZyID0gSlNPTi5zdHJpbmdpZnkgKHVNc2dPYik7XG4gICAgdmFyIGZyb21TcnZyU2hvcnQgPSB2Lm1zZ1Nob3J0ZW4ubXNnU2hvcnRlbiAoZnJvbVNydnIpO1xuICAgICovXG4gICAgdmFyIGZyb21TcnZyU2hvcnQgPSB2Lm1zZ1NoLm1zZ1Nob3J0ZW4gKHVNc2dPYik7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJyAgPT0+IHdzQ2xpZW50LmZyb21TcnZyOiAnICsgZnJvbVNydnJTaG9ydCk7XG4gICAgXG4gICAgdU1zZ09iID0gQXJyYXkuaXNBcnJheSAodU1zZ09iKSA/IHVNc2dPYiA6IFt1TXNnT2JdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1TXNnT2IubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgbXNnT2IgPSB1TXNnT2IgW2ldO1xuXG4gICAgICAgIHZhciBjbWQgPSB2LmtleTEgKG1zZ09iKTtcbiAgICBcbiAgICAgICAgaWYgKHYudHN0Q21kcy5oYXNPd25Qcm9wZXJ0eSAoY21kKSkge1xuICAgIFxuICAgICAgICAgICAgdi50c3RDbWRzIFtjbWRdIChtc2dPYiBbY21kXSk7XG4gICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICB2LmNsaWVudCAobXNnT2IpO1xuICAgIFxuICAgICAgICB9IC8vIGVuZCBpZiAodi50c3RDbWRzLmhhc093blByb3BlcnR5IChjbWQpKVxuICAgIFxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgdU1zZ09iLmxlbmd0aDsgaSsrKVxuXG59OyAvLyBlbmQgZi5kb0NtZCBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRvU2VuZCA9IChtc2cpID0+IHtcblxuICAgICAgICAvL2NvbnNvbGUubG9nICgnZi5kb1NlbmQubXNnOiAnICsgbXNnICsgJ1xcbicpO1xuICAgIFxuICAgIHYud3NTZXJ2ZXIuc2VuZCAobXNnKTtcblxufTsgLy8gZW5kIGYuZG9TZW5kIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmZyb21TcnZyID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgdmFyIHRpbWUgPSB2Lm1pbnNlYyAoKTtcbiAgICB2YXIgbXNnID0gZXZlbnQuZGF0YTtcbiAgICBtc2dPYiA9IEpTT04ucGFyc2UgKG1zZyk7XG4gICAgLy92YXIgbXNnbSA9IEpTT04ucGFyc2UgKG1zZyk7XG4gICAgLy92YXIgbXNnT2IgPSBtc2dtLm07XG4gICAgdmFyIG1zZ09iU2hvcnQgPSB2Lm1zZ1NoLm1zZ1Nob3J0ZW4gKG1zZ09iKTtcbiAgICAgICAgY29uc29sZS5sb2cgKCc8PT09PSAnICsgdGltZSArICcgd3NDbGllbnQuZnJvbVNydnI6ICcgKyBtc2dPYlNob3J0ICsgJ1xcbicpO1xuXG4gICAgZi5kb0NtZCAobXNnT2IpO1xuXG59OyAvLyBlbmQgZi5mcm9tU3J2ciBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYubXNnQ2xvc2UgPSAoZXZlbnQpID0+IHtcbiAgICBcbiAgICBjb25zb2xlLmxvZyAoJ2Nsb3NlIGV2ZW50OiAnICsgZXZlbnQuZGF0YSk7XG5cbn07IC8vIGVuZCBmLm1zZ0Nsb3NlIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLm1zZ0Vycm9yID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgdmFyIGV2ZW50TXNnID0gZXZlbnQuZGF0YSA/ICcgZXZlbnQuZGF0YTogJyArIGV2ZW50LmRhdGEgOiBcIlwiO1xuICAgIFxuICAgIHZhciBlcnJNc2cgPSAnd3NDbGllbnQgbXNnRXJyb3IgKFNlcnZlciBpcyBEb3duPyknICsgZXZlbnRNc2c7XG4gICAgY29uc29sZS5sb2cgKGVyck1zZyk7XG5cbiAgICAkKCdib2R5JykucHJlcGVuZCAoZXJyTXNnKTtcblxufTsgLy8gZW5kIGYubXNnRXJyb3IgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYucmVwb3J0TXNnT2IgPSAobXNnT2IpID0+IHtcbiAgICBcbiAgICBjb25zb2xlLmxvZyAoJ2YucmVwb3J0TXNnT2IubXNnT2I6ICcgKyBtc2dPYiArICdcXG4nKTtcblxufTsgLy8gZW5kIGYucmVwb3J0TXNnT2IgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYudHN0Q21kUGluZ1Jlc3AgPSAocGluZ01zZykgPT4ge1xuICAgIFxuICAgIGNvbnNvbGUubG9nICgncGluZzogJyArIHBpbmdNc2cpO1xuICAgIHJldHVybjtcblxufTsgLy8gZW5kIGYudHN0Q21kUGluZ1Jlc3AgXG5cbmYuaW5pdCAoKTtcblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmdldFdzVXJsID0gKCkgPT4ge1xuICAgIFxuICAgIHJldHVybiB2LndzVXJsT2I7XG5cbn07IC8vIGVuZCBQLmdldFdzVXJsXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAudG9TcnZyID0gKG1zZ09iKSA9PiB7XG4gICAgdmFyIHRpbWUgPSB2Lm1pbnNlYyAoKTtcbiAgICB2YXIgbXNnT2JTaG9ydCA9IHYubXNnU2gubXNnU2hvcnRlbiAobXNnT2IpO1xuICAgIGNvbnNvbGUubG9nICgnXFxuXFxuPT09PT4gJyArIHRpbWUgKyAnIHdzQ2xpZW50LnRvU3J2cjogJyArIG1zZ09iU2hvcnQgKyAnXFxuJyk7XG4gICAgXG4gICAgdmFyIG1zZ09iUyA9IEpTT04uc3RyaW5naWZ5IChtc2dPYik7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJ3AudG9TcnZyLm1zZ09iUyA6ICcgKyBtc2dPYlMgKyAnXFxuJyk7XG4gICAgXG4gICAgZi5kb1NlbmQgKG1zZ09iUyk7XG5cbn07IC8vIGVuZCBQLnRvU3J2ciBcblxuXG5yZXR1cm4gUDtcblxufTtcblxuXG5cbiIsIi8vIGtleTEuanNcblxuLy8ga2V5MSBleHRyYWN0cyB0aGUgc2luZ2xlIGtleSBmcm9tIGFuIG9iamVjdCBcbi8vIGNvbnRhaW5pbmcgb25seSBvbmUga2V5L3ZhbHVlIHBhaXJcbi8vIGFuZCByZXR1cm5zIHRoZSBzdHJpbmcgdmFsdWUgZm9yIHRoZSBrZXlcbi8vIGFueXRoaW5nIGVsc2UgcGFzc2VkIHRvIGtleTEgcmV0dXJucyBudWxsXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnZhciBrZXkxID0gKG9iKSA9PiB7XG5cbiAgICBrZXkgPSBudWxsO1xuXG4gICAgdmFyIHVuaXF1ZUtleUV4aXN0cyA9IHR5cGVvZiBvYiAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2IgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkob2IpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvYiA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMob2IpLmxlbmd0aCA9PT0gMTtcbiAgICBcbiAgICBpZiAodW5pcXVlS2V5RXhpc3RzKSB7XG4gICAgXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2IpO1xuICAgICAgICBrZXkgPSBrZXlzWzBdO1xuICAgIFxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSAob2IpKSB7XG5cbiAgICAgICAgdmFyIG9iMCA9IG9iIFswXTtcbiAgICAgICAgdmFyIHVuaXF1ZUFycmF5S2V5RXhpc3RzID0gdHlwZW9mIG9iMCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2IwICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvYjAgIT09ICdvYmplY3QnO1xuXG4gICAgICAgIGlmICh1bmlxdWVBcnJheUtleUV4aXN0cykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBrZXkgPSBvYjA7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKHVuaXF1ZUFycmF5S2V5RXhpc3RzKVxuXG5cbiAgICB9IC8vIGVuZCBpZiAodW5pcXVlS2V5RXhpc3RzKVxuICAgIFxuICAgIHJldHVybiBrZXk7XG4gICAgXG59OyAvLyBlbmQga2V5MSBcblxucmV0dXJuIGtleTE7XG5cbn0oKSk7XG4iLCIvLyBpbmRleC5qcyA9PiBtaW5zZWNcblxuLy8gZ2V0IG1pbnV0ZXM6c2Vjb25kcy5taWxsaXNlY29uZHNcblxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG52YXIgZj17fTtcblxuZi5pbml0ID0gKCkgPT4ge1xufTsgLy8gZW5kIGYuaW5pdFxuXG4gICAgLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZ2V0TWluU2VjID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBkdCA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHN0U3RyID0gZHQudG9KU09OICgpO1xuXG4gICAgdmFyIG1hdGNoZWQgPSBzdFN0ci5tYXRjaCAoLy4qPzooLiopWi8pO1xuXG4gICAgdmFyIHJlcyA9IG1hdGNoZWQgWzFdO1xuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLmdldE1pblNlY1xuXG5cblxuICAgIC8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5mLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59KCkpO1xuXG5cblxuXG5cblxuIiwiLy8gaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0TGVuZ3RoKSB7XG5cbiAgICAvLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG5cbiAgICB0YXJnZXRMZW5ndGg6IHRhcmdldExlbmd0aCA/IHRhcmdldExlbmd0aCA6IG51bGwsXG4gICAga2V5c09ubHk6IGZhbHNlLFxuXG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xudmFyIGY9e307XG5cbmYuaW5pdCA9ICgpID0+IHtcbn07IC8vIGVuZCBmLmluaXRcblxuICAgIC8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLm1zZ1Nob3J0ZW4gPSAobXNnT2IpID0+IHtcbiAgICBcbiAgICB2YXIgbXNnT2JTdHIgPSB0eXBlb2YgbXNnT2IgPT09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkgKG1zZ09iKSA6IG1zZ09iO1xuICAgIFxuICAgIGlmICh2LmtleXNPbmx5KSB7XG5cbiAgICAgICAgdmFyIG1zZ09iUCA9IEpTT04ucGFyc2UgKG1zZ09iU3RyKTtcbiAgICAgICAgdmFyIG1zZ0EgPSBBcnJheS5pc0FycmF5IChtc2dPYlApID8gbXNnT2JQIDogW21zZ09iUF07XG5cbiAgICAgICAgdmFyIG1zZ0tleXNBID0gW107XG5cbiAgICAgICAgbXNnQS5mb3JFYWNoIChmdW5jdGlvbiAobXNnKSB7XG5cbiAgICAgICAgICAgIHZhciBtc2dLZXlzID0gT2JqZWN0LmtleXMgKG1zZyk7XG4gICAgICAgICAgICBtc2dLZXlzQS5wdXNoIChtc2dLZXlzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1zZ0tleXNBLmxlbmd0aCA9PT0gMSkge1xuXG4gICAgICAgICAgICBtc2dLZXlzQSA9IG1zZ0tleXNBIFswXTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAobXNnS2V5c0EubGVuZ3RoID09PSAxKVxuICAgICAgICBcbiAgICAgICAgbXNnT2JTdHIgPSBKU09OLnN0cmluZ2lmeSAobXNnS2V5c0EpO1xuXG4gICAgfSAvLyBlbmQgaWYgKHYua2V5c09ubHkpXG4gICAgXG4gICAgaWYgKG1zZ09iU3RyLmxlbmd0aCA+IHYudGFyZ2V0TGVuZ3RoKSB7XG5cbiAgICAgICAgdmFyIGhhbGZMZW5ndGggPSBNYXRoLmNlaWwgKHYudGFyZ2V0TGVuZ3RoIC8gMik7XG5cbiAgICAgICAgdmFyIGZpcnN0SGFsZiA9IG1zZ09iU3RyLnN1YnN0ciAoMCwgaGFsZkxlbmd0aCk7XG4gICAgICAgIHZhciBzZWNvbmRIYWxmID0gbXNnT2JTdHIuc3Vic3RyIChtc2dPYlN0ci5sZW5ndGggLSBoYWxmTGVuZ3RoLCBoYWxmTGVuZ3RoKVxuXG4gICAgICAgIG1zZ09iU3RyID0gZmlyc3RIYWxmICsgJyAgPD09Xl58Xl49PT4gICcgKyBzZWNvbmRIYWxmO1xuXG4gICAgfSAvLyBlbmQgaWYgKG1zZ09iU3RyLmxlbmd0aCA+IHYudGFyZ2V0TGVuZ3RoKVxuICAgIFxuXG4gICAgcmV0dXJuIG1zZ09iU3RyO1xuXG59OyAvLyBlbmQgUC5tc2dTaG9ydGVuIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnNldEtleXNPbmx5ID0gKGtleXNPbmx5KSA9PiB7XG4gICAgXG4gICAgdi5rZXlzT25seSA9IGtleXNPbmx5O1xuXG59OyAvLyBlbmQgUC5zZXRLZXlzT25seSBcblxuXG4gICAgLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbmYuaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG4iXX0=
