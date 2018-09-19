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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NyYy9ub2RlX21vZHVsZXNfZ2xvYmFsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXgwLmpzIiwic2xpZGVTaG93LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLWoyaC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby1rZXkvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tbXNnL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLXBvcGluZm8vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tdXRpbC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby13cy1jbGllbnQvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMva2V5MS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9taW5zZWMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvbXNnc2hvcnRlbi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4ekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5ZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuLy8gY21kckluaXQuanNcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG52YXIgZj17fTtcblxuZi5pbml0ID0gKCkgPT4ge1xuXG4gICAgdmFyIGMgPSByZXF1aXJlICgnLi9zbGlkZVNob3cuanMnKTtcbiAgICBuZXcgYyAoKTtcbn07ICAvLyBlbmQgZi5pbml0XG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG4oZnVuY3Rpb24gKCkge1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkgKGYuaW5pdCk7XG5cbn0pICgpO1xuXG5cblxucmV0dXJuIFA7XG5cbn0pICgpO1xuXG5cblxuXG5cbiIsIi8vIHNsaWRlU2hvdy5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciB2ID0ge1xuXG4gICAgd3M6IHJlcXVpcmUgKCdnby13cy1jbGllbnQnKSxcbiAgICBrZXk6IHJlcXVpcmUgKCdnby1rZXknKSxcbiAgICBqMmg6IHJlcXVpcmUgKCdnby1qc29uMmh0bWwnKSxcbiAgICBwaTogcmVxdWlyZSAoJ2dvLXBvcGluZm8nKSxcbiAgICBrZXkxOiByZXF1aXJlICgna2V5MScpLFxuXG4gICAgZHBwOiBudWxsLFxuICAgIGN1clZpczogbnVsbCxcbiAgICBtYXhJbWFnZXM6IG51bGwsXG4gICAgSWRTbGlkZXM6IG51bGwsXG5cbiAgICBib29rbWFya3M6IG51bGwsXG4gICAgYm9va21hcmtMc3Q6IG51bGwsXG4gICAgSWRCb29rbWFyazogbnVsbCxcbiAgICBJZEJvb2ttYXJrUzogbnVsbCxcbiAgICBJZERlbEI6IG51bGwsXG4gICAgSWRBZGRCOiBudWxsLFxuICAgIElkQm9va1M6IG51bGwsXG5cbiAgICBjdEk6IG51bGwsXG4gICAgdG9waWNzSTogbnVsbCxcbiAgICB0b3BpY1JlZnM6IG51bGwsXG4gICAgdG9waWNSZWY6IG51bGwsXG4gICAgSWROYXY6IG51bGwsXG4gICAgSWRQYWdlQ3Q6IG51bGwsXG4gICAgSWROYXZQTjogbnVsbCxcbiAgICB0b3BpY1RvVmlkZW86IG51bGwsXG4gICAgc2xpZGVUb1ZpZGVvOiBudWxsLFxuICAgIGhpZGRlblNsaWRlOiBudWxsLFxuICAgIElkVmlkZW9QbGF5aW5nOiBudWxsLFxuICAgIC8vc3J2QXdzOiAnNTIuMzMuMTcwLjIxJ1xuICAgIHNydkF3czogJzM0LjIxNS4xOTQuMTI5J1xuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG52YXIgZj17fTtcblxuZi5pbml0ID0gKCkgPT4ge1xuXG4gICAgdi5kcHAgPSB2LmoyaC5kaXNwbGF5UGFnZTtcbiAgICB2LmdlbklkID0gdi5qMmguZ2VuSWQ7XG5cbiAgICB2LnBpID0gbmV3IHYucGkgKHYuajJoKTtcblxuICAgIHZhciAgZ3QgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgIHZhciBpcFNyYyA9IGd0Lm1hdGNoICgvZ2l0aHViLykgPyB2LnNydkF3cyA6ICdsb2NhbGhvc3QnO1xuICAgIHYud3MgPSBuZXcgdi53cyAoaXBTcmMsIDgwMDEsIFAuZG9BY3Rpb24pO1xuXG4gICAgbmV3IHYua2V5ICgnYm9keScsIGZhbHNlLCBmLmtleUZpbHRlcik7XG59OyAgLy8gZW5kIGYuaW5pdFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5pbml0Qm9va21hcmtzID0gKCkgPT4ge1xuXG4gICAgdi5ib29rbWFya0xzdCA9IFtdO1xuICAgIGYuYm9va21hcmtzRnJvbUNvb2tpZSAoKTtcblxuICAgIHZhciBpZCA9IHYuZ2VuSWQgKCk7XG4gICAgdmFyIGFkZEIgPSB7c3BhbjogJ2FkZCBib29rbWFyaycsIGlkOiBpZCwgY2xhc3M6ICdib29rbWFyayd9O1xuICAgIHYuSWRBZGRCID0gJyMnICsgaWQ7XG5cbiAgICB2YXIgaWQgPSB2LmdlbklkICgpO1xuICAgIHZhciBkZWxCID0ge3NwYW46ICdkZWwgYm9va21hcmsnLCBpZDogaWQsIGNsYXNzOiAnYm9va21hcmsnfTtcbiAgICB2LklkRGVsQiA9ICcjJyArIGlkO1xuXG4gICAgdmFyIGlkID0gdi5nZW5JZCAoKTtcbiAgICB2YXIgYm9va1MgPSB7ZGl2OiAwLCBpZDogaWR9O1xuICAgIHYuSWRCb29rUyA9ICcjJyArIGlkO1xuXG4gICAgdi5JZEJvb2ttYXJrUyA9IHYuZHBwICh7ZGl2OiBbYWRkQiwgZGVsQiwgYm9va1NdLCBjbGFzczogJ2Jvb2ttYXJrcyBub3ZpcycsIHBhcmVudDogdi5JZEJvb2ttYXJrfSk7XG5cbiAgICAkKHYuSWRBZGRCICsgJywnICsgdi5JZERlbEIpXG4gICAgLmhvdmVyIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAncmVkJ30pO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdibGFjayd9KTtcbiAgICB9KTtcblxuICAgICQodi5JZEFkZEIpXG4gICAgLmNsaWNrIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHYuYm9va21hcmtzIFt2LmN1clZpc10gPSAxO1xuICAgICAgICBmLmJvb2ttYXJrc1RvQ29va2llICgpO1xuICAgICAgICBmLmJvb2ttYXJrc1Nob3cgKCk7XG4gICAgfSlcblxuICAgICQodi5JZERlbEIpXG4gICAgLmNsaWNrIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlbGV0ZSB2LmJvb2ttYXJrcyBbdi5jdXJWaXNdO1xuICAgICAgICBmLmJvb2ttYXJrc1RvQ29va2llICgpO1xuICAgICAgICBmLmJvb2ttYXJrc1Nob3cgKCk7XG4gICAgfSlcblxufTsgLy8gZW5kIGYuaW5pdEJvb2ttYXJrc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmluaXRTdHlsZSA9ICgpID0+IHtcblxuICAgIHZhciBzdHlsZSA9IHtzdHlsZTpcbiAgICAgICAgXCJib2R5IHtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1sZWZ0OiAxNXB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5ib29rbWFyayB7XCIgK1xuICAgICAgICAgICAgXCJ3aGl0ZS1zcGFjZTogbm93cmFwO1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAxMnB4O1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luOiAwO1wiICtcbiAgICAgICAgICAgIFwicGFkZGluZzogMDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuYm9va21hcmtzIHtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6ICNFNUZGRjI7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXI6IDFweCBzb2xpZCAjQjNCM0ZGO1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyLXJhZGl1czogM3B4O1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IGFic29sdXRlO1wiICtcbiAgICAgICAgICAgIFwiei1pbmRleDogMTtcIiArXG4gICAgICAgICAgICBcInRvcDogMnB4O1wiICtcbiAgICAgICAgICAgIFwicmlnaHQ6IDJweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuYm9va21hcmtoZWFkZXIge1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zdHlsZTogaXRhbGljO1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IDIwMDtcIiArXG4gICAgICAgICAgICBcInRleHQtYWxpZ246IGNlbnRlcjtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuY2FwdGlvbiB7XCIgK1xuICAgICAgICAgICAgXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMjBweDsgXCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogYWJzb2x1dGU7IFwiICtcbiAgICAgICAgICAgIFwiYm90dG9tOiA1MHB4OyBcIiArXG4gICAgICAgICAgICBcInRleHQtYWxpZ246IGNlbnRlcjtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiICtcbiAgICAgICAgICAgIFwibWF4LXdpZHRoOiA1MDBweDtcIiArXG4gICAgICAgICAgICBcIndvcmQtYnJlYWs6IGJyZWFrLWFsbDtcIiArXG4gICAgICAgICAgICBcImxlZnQ6IDA7XCIgK1xuICAgICAgICAgICAgXCJyaWdodDogMDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMCBhdXRvO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5zeW1ib2x3cmFwIHtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiAxNnB4O1wiICtcbiAgICAgICAgICAgIFwiaGVpZ2h0OiAxNnB4O1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAxNXB4O1wiICtcbiAgICAgICAgICAgIFwiYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXItcmFkaXVzOiA4cHg7XCIgK1xuICAgICAgICAgICAgXCJmbG9hdDogcmlnaHQ7XCIgK1xuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiAjMGUwO1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IHBvaW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IGhhbmQ7XCIgK1xuICAgICAgICAgICAgXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnN5bWJvbCB7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgK1xuICAgICAgICAgICAgXCJ0b3A6IC0xcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmhlYWRlciB7XCIgK1xuICAgICAgICAgICAgXCJ0ZXh0LWFsaWduOiBjZW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogcmVsYXRpdmU7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLm0xMCB7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW46IDEwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnQ0MCB7XCIgK1xuICAgICAgICAgICAgXCJ0b3A6IC00MHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5wcmVsIHtcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiByZWxhdGl2ZTtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIudzcwMCB7XCIgK1xuICAgICAgICAgICAgXCJ3aWR0aDogNzAwcHg7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW46IDAgYXV0bztcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuaW1ndmlkZW8ge1wiICtcbiAgICAgICAgICAgIFwiaGVpZ2h0OiA1MDBweDtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiA3MDBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuaW1naG9tZXdvcmsge1wiICtcbiAgICAgICAgICAgIFwiaGVpZ2h0OiA4MDBweDtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiA3MDBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuY29scyB7XCIgK1xuICAgICAgICAgICAgXCJwYWRkaW5nLXJpZ2h0OiAwcHg7XCIgK1xuICAgICAgICAgICAgXCJwYWRkaW5nLWxlZnQ6IDEwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLm5vdmlzIHtcIiArXG4gICAgICAgICAgICBcImRpc3BsYXk6IG5vbmU7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLm5hdiB7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDMwcHg7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogOTAwO1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luLWxlZnQ6IDEwcHg7XCIgK1xuICAgICAgICAgICAgXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgK1xuICAgICAgICAgICAgXCJmbG9hdDogcmlnaHQ7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IHBvaW50ZXI7XCIgK1xuICAgICAgICAgICAgXCJjdXJzb3I6IGhhbmQ7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLm5hdnBvcyB7XCIgK1xuICAgICAgICAgICAgXCJmbG9hdDogcmlnaHQ7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnZpZGVvIHtcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiICtcbiAgICAgICAgICAgIFwiY29sb3I6IGJsdWU7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tcmlnaHQ6IDMwcHg7XCIgK1xuICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogcG9pbnRlcjtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogaGFuZDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIucmVmIHtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiBpbml0aWFsO1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAxMXB4O1wiICtcbiAgICAgICAgICAgIFwid29yZC1icmVhazogYnJlYWstYWxsO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi50b3BpY3Jvd3Mge1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbTogMjBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIucm93LnRvcGljcm93cyA+IGRpdiB7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXI6IDFweCBzb2xpZCAjY2NjO1wiICtcbiAgICAgICAgICAgIFwicGFkZGluZy1yaWdodDogMXB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5sb2NoZWFkZXIge1wiICtcbiAgICAgICAgICAgIFwiY29sb3I6IHJlZDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIud2VlayB7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgIFwifVwiLFxuICAgICAgICBwYXJlbnQ6ICdoZWFkJ307XG5cbiAgICAgICAgdi5kcHAgKHN0eWxlKTtcblxufTsgLy8gZW5kIGYuaW5pdFN0eWxlXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuYm9va21hcmtBZGQgPSAoc2xpZGUpID0+IHtcblxuICAgIHZhciBib29rbWFyayA9IHYuYm9va21hcmtMc3QgW3NsaWRlXS5yZXBsYWNlICgvLSguKilfLywgJyAgICAkMSAgICAnKTtcbiAgICB2YXIgSWQgPSB2LmRwcCAoe3ByZTogYm9va21hcmssIHBhcmVudDogdi5JZEJvb2tTLCBuYW1lOiBzbGlkZSwgY2xhc3M6ICdib29rbWFyayd9KVxuXG4gICAgJChJZClcbiAgICAuY2xpY2sgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG4gPSAkKHRoaXMpLmF0dHIgKCduYW1lJyk7XG4gICAgICAgIGYuc2V0TmV4dFZpcyAobiAtIHYuY3VyVmlzKTtcblxuICAgICAgICAkKHYuSWRCb29rbWFya1MpXG4gICAgICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG4gICAgfSlcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgIH0pO1xuXG5cbn07IC8vIGVuZCBmLmJvb2ttYXJrQWRkXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuYm9va21hcmtzU2hvdyA9ICgpID0+IHtcblxuICAgIGlmICh2LmJvb2ttYXJrcy5oYXNPd25Qcm9wZXJ0eSAodi5jdXJWaXMpKSB7XG5cbiAgICAgICAgJCh2LklkRGVsQilcbiAgICAgICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgICAgICAkKHYuSWRBZGRCKVxuICAgICAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICAkKHYuSWREZWxCKVxuICAgICAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgICAgICQodi5JZEFkZEIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICB9IC8vIGVuZCBpZiAodi5ib29rbWFya3MuaGFzT3duUHJvcGVydHkgKHYuY3VyVmlzKSlcblxuICAgICQodi5JZEJvb2tTKVxuICAgIC5lbXB0eSAoKTtcblxuICAgIHZhciBzbGlkZXMgPSBPYmplY3Qua2V5cyAodi5ib29rbWFya3MpLnNvcnQgKGZ1bmN0aW9uIGNvbXBhcmVOdW1iZXJzKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgIH0pO1xuXG4gICAgaWYgKHNsaWRlcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgdi5kcHAgKHtkaXY6ICdXZWVrIFRvcGljIFNsaWRlTnVtJywgcGFyZW50OiB2LklkQm9va1MsIGNsYXNzOiAnYm9va21hcmsgYm9va21hcmtoZWFkZXInfSk7XG5cbiAgICB9IC8vIGVuZCBpZiAoc2xpZGVzLmxlbmd0aCA+IDApXG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgc2xpZGUgPSBzbGlkZXMgW2ldO1xuICAgICAgICBmLmJvb2ttYXJrQWRkIChzbGlkZSk7XG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlczsgaSsrKVxuXG4gICAgJCh2LklkQm9va21hcmtTKVxuICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJylcbiAgICAgICAgLy8gYWN0dWFsbHkgc2hvdyB0aGUgYm9va21hcmtcblxuICAgIC5ob3ZlciAoZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBib29rbWFya3MgaW5pdGlhbGx5IHBvc2l0aW9uZWQgdW5kZXIgY3Vyc29yLCBzbyBub3RoaW5nIHRvIGRvIGZvciBob3Zlci1pblxuXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5hZGRDbGFzcyAoJ25vdmlzJylcbiAgICB9KVxuXG5cblxuXG59OyAvLyBlbmQgZi5ib29rbWFya3NTaG93XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuYm9va21hcmtzRnJvbUNvb2tpZSA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgYm9va21hcmtzU2ZpZWQgPSBkb2N1bWVudC5jb29raWUubWF0Y2ggKC9tMTAyYm9va21hcmtzPShbXjtdKykvKTtcblxuICAgIHYuYm9va21hcmtzID0gIWJvb2ttYXJrc1NmaWVkID8gIHt9IDogSlNPTi5wYXJzZSAoYm9va21hcmtzU2ZpZWQgWzFdKTtcblxufTsgLy8gZW5kIGYuYm9va21hcmtzRnJvbUNvb2tpZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmJvb2ttYXJrc1RvQ29va2llID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBjb29raWUgPSAnbTEwMmJvb2ttYXJrcz0nICsgSlNPTi5zdHJpbmdpZnkgKHYuYm9va21hcmtzKSArICc7IGV4cGlyZXM9VGh1LCAxIEphbiAyMDMwIDAwOjAwOjAwIFVUQzsgcGF0aD0vJztcbiAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWU7XG5cbn07IC8vIGVuZCBmLmJvb2ttYXJrc1RvQ29va2llXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZGlzcGxheU5hdiA9ICgpID0+IHtcblxuICAgIHZhciBuYXZTcGFucyA9IFt7c3BhbjogJz4nLCBpZDogJ25hdnInLCBjbGFzczogJ25hdid9LFxuICAgIHtzcGFuOiAnPCcsIGlkOiAnbmF2bCcsIGNsYXNzOiAnbmF2J31dO1xuXG4gICAgbmF2U3BhbnMucGFyZW50ID0gdi5JZE5hdlBOO1xuXG4gICAgdi5kcHAgKG5hdlNwYW5zKTtcblxuICAgICQoJyNuYXZsLCAjbmF2cicpXG4gICAgLmhvdmVyIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAncmVkJ30pO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdibGFjayd9KTtcbiAgICB9KTtcblxuICAgICQoJyNuYXZsJylcbiAgICAuY2xpY2sgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmLnNldE5leHRWaXMgKC0xKTtcbiAgICB9KTtcblxuICAgICQoJyNuYXZyJylcbiAgICAuY2xpY2sgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmLnNldE5leHRWaXMgKDEpO1xuICAgIH0pO1xuXG5cbn07IC8vIGVuZCBmLmRpc3BsYXlOYXZcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kaXNwbGF5UG5nRmlsZXMgPSAodmFscykgPT4ge1xuXG4gICAgdi5jdXJWaXMgPSAwO1xuICAgIHYubWF4SW1hZ2VzID0gdmFscy5sZW5ndGggLSAxO1xuICAgICAgICAvLyBsYXN0IHZhbCBpbiB2YWxzIGlzIGFuIGVtcHR5IHN0cmluZywgc28gZG9uJ3QgY291bnQgaXRcblxuICAgIHZhciB3ZWVrcyA9IHt9O1xuICAgIHZhciB0b3BpY3M7XG5cbiAgICB2LmN0SSA9IFtdO1xuICAgIHYudG9waWNzSSA9IFtdO1xuICAgIHYudG9waWNSZWZzID0gW107XG4gICAgdi5zbGlkZVRvVmlkZW8gPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdi5tYXhJbWFnZXM7IGkrKykge1xuXG4gICAgICAgIHZhciB2YWwgPSB2YWxzIFtpXTtcblxuICAgICAgICB2YXIgbWF0Y2hlZCA9IHZhbC5tYXRjaCAoLy4uLiguKilcXC8uKj8oW2EtekEtWl0uKikucG5nLyk7XG4gICAgICAgIHZhciBsb2MgPSBtYXRjaGVkIFsxXTtcbiAgICAgICAgdmFyIGNhcHRpb24gPSBtYXRjaGVkIFsyXTtcblxuICAgICAgICB2YXIgaW1nQ2xhc3MgPSBsb2MubWF0Y2ggKC9Ib21ld29ya3xGaW5hbC8pID8gJ2ltZ2hvbWV3b3JrJyA6ICdpbWd2aWRlbyc7XG5cbiAgICAgICAgdmFyIGRpdk9iID0ge2RpdjogW1xuICAgICAgICAgICAge2ltZzogMCwgc3JjOiB2YWwsIGNsYXNzOiBpbWdDbGFzcywgYWx0OiAnaW1hZ2UgaXMgc3RpbGwgdXBsb2FkaW5nIC4uLiBqdXN0IGEgbWludXRlIG9yIHR3byBsb25nZXIgZGVwZW5kaW5nIG9uIHlvdXIgbmV0d29yayBiYW5kd2lkdGgnfSxcbiAgICAgICAgICAgIHticjowfSxcbiAgICAgICAgICAgIHtzcGFuOiAnICAgICcgKyBsb2MsIGNsYXNzOiAnbG9jaGVhZGVyJ30sXG4gICAgICAgICAgICB7YnI6MH0sXG4gICAgICAgICAgICB7YnI6MH0sXG4gICAgICAgICAgICB7c3BhbjogY2FwdGlvbiwgY2xhc3M6ICdjYXB0aW9uJ31cbiAgICAgICAgXSwgaWQ6ICdqJyArIGl9O1xuXG4gICAgICAgIGlmIChpICE9PSAwKSB7XG5cbiAgICAgICAgICAgIGRpdk9iLmNsYXNzID0gJ25vdmlzJztcblxuICAgICAgICB9IC8vIGVuZCBpZiAoaSAhPT09IDApXG5cbiAgICAgICAgZGl2T2IucGFyZW50ID0gdi5JZFNsaWRlcztcbiAgICAgICAgdi5kcHAgKGRpdk9iKTtcblxuICAgICAgICBtYXRjaGVkID0gbG9jLm1hdGNoICgvVyhcXGQpKC4qPylcXC8oLiopLyk7XG5cbiAgICAgICAgdmFyIHdpZCA9ICdXJyArIG1hdGNoZWQgWzFdO1xuICAgICAgICB2YXIgd2VlayA9IHdpZCArIG1hdGNoZWQgWzJdO1xuICAgICAgICB2YXIgdG9waWMgPSBtYXRjaGVkIFszXTtcblxuICAgICAgICB2YXIgdmlkZW9Ub3BpYyA9IHdpZCArICctJyArIHRvcGljO1xuICAgICAgICB2LnNsaWRlVG9WaWRlby5wdXNoICh2LnRvcGljVG9WaWRlbyBbdmlkZW9Ub3BpY10pO1xuXG4gICAgICAgIGlmICghd2Vla3MuaGFzT3duUHJvcGVydHkgKHdlZWspKSB7XG5cbiAgICAgICAgICAgIGYuZGlzcGxheVJlZiAod2lkLCB3ZWVrLCBpLCAnd2VlaycpO1xuICAgICAgICAgICAgd2Vla3MgW3dlZWtdID0gMTtcbiAgICAgICAgICAgIHRvcGljcyA9IHt9O1xuXG4gICAgICAgIH0gLy8gZW5kIGlmICghd2Vla3MuaGFzT3duUHJvcGVydHkgKHdlZWspKVxuXG4gICAgICAgIHZhciBzbGlkZUNvdW50O1xuICAgICAgICBpZiAoIXRvcGljcy5oYXNPd25Qcm9wZXJ0eSAodG9waWMpKSB7XG5cbiAgICAgICAgICAgIHZhciBkaXNwUmVmID0gZi5kaXNwbGF5UmVmICh3aWQsIHRvcGljLCBpLCAndG9waWMnKTtcbiAgICAgICAgICAgIHYudG9waWNSZWZzLnB1c2ggKGRpc3BSZWYpO1xuXG4gICAgICAgICAgICBpZiAodG9waWMgPT09ICcwNV9TdG9yYWdlRW5naW5lV2lyZWRUaWdlcicpIHtcblxuICAgICAgICAgICAgICAgIHYuSWRTYW1wbGVUb3BpYyA9IGRpc3BSZWY7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmICh0b3BpYyA9PT0gJzAxX1dlbGNvbWVXZWVrMycpXG5cbiAgICAgICAgICAgIHRvcGljcyBbdG9waWNdID0gMTtcblxuICAgICAgICAgICAgc2xpZGVDb3VudCA9IDE7XG4gICAgICAgICAgICB2LnRvcGljc0kucHVzaCAoc2xpZGVDb3VudCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgc2xpZGVDb3VudCsrO1xuICAgICAgICAgICAgdi50b3BpY3NJIFt2LnRvcGljc0kubGVuZ3RoIC0gMV0gPSBzbGlkZUNvdW50O1xuXG4gICAgICAgIH0gLy8gZW5kIGlmICghdG9waWNzLmhhc093blByb3BlcnR5ICh0b3BpYykpXG5cbiAgICAgICAgdmFyIGJvb2ttYXJrTmFtZSA9IHZpZGVvVG9waWMgKyAnXycgKyBzbGlkZUNvdW50OztcbiAgICAgICAgdi5ib29rbWFya0xzdC5wdXNoIChib29rbWFya05hbWUpO1xuXG4gICAgICAgIHYuY3RJLnB1c2ggKFtzbGlkZUNvdW50LCB2LnRvcGljc0kubGVuZ3RoIC0gMV0pO1xuXG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHM7IGkrKylcblxuICAgIGYuc2V0TmV4dFZpcyAoMCk7XG5cbn07IC8vIGVuZCBmLmRpc3BsYXlQbmdGaWxlc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRpc3BsYXlSZWYgPSAod2lkLCBzdHIsIGksIGNsYXNzTmFtZSkgPT4ge1xuXG4gICAgd2lkID0gJyMnICsgd2lkO1xuICAgIHZhciByZWYgPSB2LmdlbklkICgpO1xuICAgIHYuZHBwICh7ZGl2OlxuICAgICAgICB7ZGl2OiBzdHIsXG4gICAgICAgICBpZDogcmVmLFxuICAgICAgICAgc2w6IGksXG4gICAgICAgICBzdHlsZTogJ2Rpc3BsYXk6aW5saW5lLWJsb2NrOyBjdXJzb3I6IHBvaW50ZXI7IGN1cnNvcjogaGFuZDsnXG4gICAgIH0sIHBhcmVudDogd2lkLCBjbGFzczogJ3JlZiB3NzAwICcgKyBjbGFzc05hbWV9KTtcblxuICAgIHJlZiA9ICcjJyArIHJlZjtcbiAgICAkKHJlZilcbiAgICAuY2xpY2sgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG4gPSAkKHRoaXMpLmF0dHIgKCdzbCcpO1xuICAgICAgICBmLnNldE5leHRWaXMgKG4gLSB2LmN1clZpcyk7XG4gICAgfSlcblxuICAgICQocmVmKVxuICAgIC5ob3ZlciAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ3JlZCd9KVxuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBJZCA9ICcjJyArIGV2ZW50LnRhcmdldC5pZDtcblxuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAnYmxhY2snfSlcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVmO1xuXG59OyAvLyBlbmQgZi5kaXNwbGF5UmVmXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZG9TbGlkZVNob3cgPSAodmFscykgPT4ge1xuXG4gICAgZi5sYXlvdXQgKCk7XG4gICAgZi5kaXNwbGF5TmF2ICgpO1xuICAgIGYuZGlzcGxheVBuZ0ZpbGVzICh2YWxzKTtcblxuICAgICQodi5JZFZpZGVvKVxuICAgIC5ob3ZlciAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5hdHRyICh7c3R5bGU6ICdjb2xvcjogcmVkOyd9KVxuICAgIH0sXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5hdHRyICh7c3R5bGU6ICdjb2xvcjogYmx1ZSd9KVxuICAgIH0pXG4gICAgLmNsaWNrIChmLnBsYXlWaWRlbyk7XG5cbiAgICB2LnBpLmNyZWF0ZVBvcHVwRGlzcGxheSAoJyNuYXZyJyxcbiAgICAgICAgJ0NsaWNrIFByZXYvTmV4dCBTbGlkZVxcbiAgICAtLSBvciAtLVxcbihrZXlib2FyZCBzaG9ydGN1dHMpXFxuTGVmdC9SaWdodCBBcnJvd1xcblNwYWNlL0JhY2tzcGFjZScpO1xuICAgIHYucGkuY3JlYXRlUG9wdXBEaXNwbGF5ICh2LklkU2FtcGxlVG9waWMsXG4gICAgICAgICdDbGljayB0byBuYXZpZ2F0ZSBkaXJlY3RseVxcbnRvIGJlZ2lubmluZyBvZiB0b3BpYycpO1xuICAgIHYucGkuY3JlYXRlUG9wdXBEaXNwbGF5ICh2LklkQ3VyU2xpZGUsXG4gICAgICAgICdDdXJyZW50IHNsaWRlIEluIHRvcGljL1xcblRvdGFsIHNsaWRlcyBpbiB0b3BpYycpO1xuICAgIHYucGkuY3JlYXRlUG9wdXBEaXNwbGF5ICh2LklkVmlkZW8sXG4gICAgICAgICdDbGljayB0byBzdGFydFxcbnBsYXlpbmcgbGVzc29uIHZpZGVvJyk7XG5cbiAgICAkKHYuSWRIZWxwKVxuICAgIC5ob3ZlciAoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5jc3MgKHsnYmFja2dyb3VuZC1jb2xvcic6ICcjZmZhMGEwJ30pO1xuXG4gICAgICAgIHYucGkuc2hvd1BvcHVwcyAoKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmNzcyAoeydiYWNrZ3JvdW5kLWNvbG9yJzogJyMwZTAnfSk7XG5cbiAgICAgICAgdi5waS5oaWRlUG9wdXBzICgpO1xuICAgIH0pO1xuXG4gICAgJCh2LklkQm9va21hcmspXG4gICAgLmhvdmVyIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmNzcyAoeydiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZmEwYTAnfSk7XG4gICAgICAgIGYuYm9va21hcmtzU2hvdyAoKTtcblxuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnIzBlMCd9KTtcblxuICAgIH0pO1xuXG59OyAvLyBlbmQgZi5kb1NsaWRlU2hvd1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5rZXlGaWx0ZXIgPSAoY2hvYikgPT4ge1xuICAgIC8vY29uc29sZS5sb2cgKCdjaG9iOiAnICsgSlNPTi5zdHJpbmdpZnkgKGNob2IpICsgJ1xcbicpO1xuXG4gICAgdmFyIGNoID0gY2hvYi5jaDtcbiAgICBpZiAoY2ggPT09ICdSaWdodCcgfHwgY2ggPT09ICcgJykge1xuXG4gICAgICAgIGYuc2V0TmV4dFZpcyAoMSk7XG5cbiAgICB9IGVsc2UgaWYgKGNoID09PSAnTGVmdCcgfHwgY2ggPT09ICdCYWNrc3BhY2UnKSB7XG5cbiAgICAgICAgZi5zZXROZXh0VmlzICgtMSk7XG5cbiAgICB9IC8vIGVuZCBpZiAoY2hvYi5jaCA9PT0gJ1JpZ2h0JylcblxuXG59OyAvLyBlbmQgZi5rZXlGaWx0ZXJcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5sYXlvdXQgPSAoKSA9PiB7XG5cbiAgICB2YXIgSWRDb250YWluZXIgPSB2LmRwcCAoe2RpdjogMCwgY2xhc3M6ICd3NzAwIG0xMCd9KTtcblxuICAgIHZhciBpZEJvb2ttYXJrID0gdi5nZW5JZCAoKTtcblxuICAgIHZhciBpZEhlbHAgPSB2LmdlbklkICgpO1xuICAgIHYuZHBwICh7ZGl2OlxuICAgICAgICB7aDQ6IFtcbiAgICAgICAgICAgICdTbGlkZXNob3cgTTEwMjogTW9uZ29EQiBmb3IgREJBcyAoSmFuL0ZlYiAyMDE3KScsXG4gICAgICAgICAgICB7ZGl2OiB7c3BhbjogJz8nLCBjbGFzczogJ3N5bWJvbCd9LCBpZDogaWRIZWxwLCBjbGFzczogJ3N5bWJvbHdyYXAnfSxcbiAgICAgICAgICAgIHtkaXY6IHtzcGFuOiAnQicsIGNsYXNzOiAnc3ltYm9sJ30sIGlkOiBpZEJvb2ttYXJrLCBjbGFzczogJ3N5bWJvbHdyYXAnLCBzdHlsZTogJ21hcmdpbi1yaWdodDogMTBweDsnfVxuICAgICAgICBdLCBjbGFzczogJ2hlYWRlcid9LFxuICAgICAgICBjbGFzczogJ3JvdyB3NzAwJyxcbiAgICAgICAgcGFyZW50OiBJZENvbnRhaW5lcn1cbiAgICApO1xuXG4gICAgdi5JZEJvb2ttYXJrID0gJyMnICsgaWRCb29rbWFyaztcbiAgICBmLmluaXRCb29rbWFya3MgKCk7XG5cbiAgICB2LklkSGVscCA9ICcjJyArIGlkSGVscDtcblxuICAgIHYuSWRTbGlkZXMgPSB2LmRwcCAoe2RpdjogMCwgbmFtZTogJ3NsaWRlcycsIGNsYXNzOiAncm93IHc3MDAgcHJlbCcsIHBhcmVudDogSWRDb250YWluZXJ9KTtcblxuICAgIHZhciBJZE5hdiA9IHYuZHBwICh7ZGl2OjAsIG5hbWU6ICduYXYnLCBjbGFzczogJ3JvdyB3NzAwIHByZWwgdDQwJywgcGFyZW50OiBJZENvbnRhaW5lcn0pO1xuXG4gICAgdmFyIElkVmlkZW9EaXYgPSB2LmRwcCAoe2RpdjowLCBjbGFzczogJ2NvbC1zbS03JywgcGFyZW50OiBJZE5hdn0pO1xuICAgIHYuSWRWaWRlbyA9IHYuZHBwICh7c3BhbjogJ1ZpZGVvJywgcGFyZW50OiBJZFZpZGVvRGl2LCBjbGFzczogJ25hdnBvcyB2aWRlbyd9KTtcblxuICAgIHYuSWRQYWdlQ3QgPSB2LmRwcCAoe2RpdjowLCBjbGFzczogJ2NvbC1zbS0yJywgcGFyZW50OiBJZE5hdn0pO1xuXG4gICAgdi5JZE5hdlBOID0gdi5kcHAgKHtkaXY6MCwgY2xhc3M6ICdjb2wtc20tMycsIHBhcmVudDogSWROYXZ9KTtcblxuICAgIHZhciBJZFRvcGljUm93cyA9IHYuZHBwICh7ZGl2OjAsIG5hbWU6ICd0b3BpY1Jvd3MnLCBwYXJlbnQ6IElkQ29udGFpbmVyLCBjbGFzczogJ3c3MDAgcHJlbCB0NDAnfSk7XG5cbiAgICB2YXIgSWRSb3cxID0gdi5kcHAgKHtkaXY6IDAsIG5hbWU6ICd0b3BpY1Jvd3MxJywgY2xhc3M6ICdyb3cgdG9waWNyb3dzJywgcGFyZW50OiBJZFRvcGljUm93c30pXG4gICAgdmFyIElkUm93MiA9IHYuZHBwICh7ZGl2OiAwLCBuYW1lOiAndG9waWNSb3dzMicsIGNsYXNzOiAncm93IHRvcGljcm93cycsIHBhcmVudDogSWRUb3BpY1Jvd3N9KVxuXG4gICAgZi5tYWtlQ29scyAoMCwgSWRSb3cxLCA0KTtcbiAgICBmLm1ha2VDb2xzICg0LCBJZFJvdzIsIDMpO1xuXG59OyAvLyBlbmQgZi5sYXlvdXRcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5tYWtlQ29scyA9IChiYXNlSWQsIElkUm93LCBudW1Db2xzKSA9PiB7XG5cbiAgICB2YXIgY29scyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQ29sczsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGlkID0gJ1cnICsgKGkgKyAxICsgYmFzZUlkKTtcbiAgICAgICAgY29scy5wdXNoICh7ZGl2OiAwLCBpZDogaWQsIGNsYXNzOiAnY29scyBjb2wtc20tMycsIHBhcmVudDogSWRSb3d9KTtcblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKVxuXG4gICAgdi5kcHAgKGNvbHMpO1xuXG59OyAvLyBlbmQgZi5tYWtlQ29sc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnBsYXlWaWRlbyA9ICgpID0+IHtcblxuICAgIHYuaGlkZGVuU2xpZGUgPSAnI2onICsgdi5jdXJWaXM7XG5cbiAgICAkKHYuaGlkZGVuU2xpZGUgKyAnPiBpbWcnKVxuICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKHYuaGlkZGVuU2xpZGUgKyAnPiAuY2FwdGlvbicpXG4gICAgLmFkZENsYXNzICgnbm92aXMnKTtcblxuICAgICQodi5JZFZpZGVvKVxuICAgIC50ZXh0ICgnU2xpZGUnKVxuICAgIC5vZmYgKCdjbGljaycpXG4gICAgLmNsaWNrIChmLnJlc3RvcmVTbGlkZSk7XG5cbiAgICB2YXIgc3JjID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycgKyB2LnNsaWRlVG9WaWRlbyBbdi5jdXJWaXNdICsgJz9hdXRvcGxheT0xJztcbiAgICB2LklkVmlkZW9QbGF5aW5nID0gdi5kcHAgKHtpZnJhbWU6IDAsIHNyYzogc3JjLCBjbGFzczogJ2ltZ3ZpZGVvJywgcGFyZW50OiB2LmhpZGRlblNsaWRlLCBwcmVwZW5kOiAxfSk7XG5cbn07IC8vIGVuZCBmLnBsYXlWaWRlb1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnJlc3RvcmVTbGlkZSA9ICgpID0+IHtcblxuICAgICQodi5JZFZpZGVvUGxheWluZylcbiAgICAucmVtb3ZlICgpO1xuXG4gICAgJCh2LmhpZGRlblNsaWRlICsgJz4gaW1nJylcbiAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJCh2LmhpZGRlblNsaWRlICsgJz4gLmNhcHRpb24nKVxuICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKHYuSWRWaWRlbylcbiAgICAudGV4dCAoJ1ZpZGVvJylcbiAgICAub2ZmICgnY2xpY2snKVxuICAgIC5jbGljayAoZi5wbGF5VmlkZW8pO1xuXG4gICAgdi5oaWRkZW5TbGlkZSA9IG51bGw7XG5cbn07IC8vIGVuZCBmLnJlc3RvcmVTbGlkZVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5zZXROZXh0VmlzID0gKGRlbHRhKSA9PiB7XG5cbiAgICBpZiAodi5oaWRkZW5TbGlkZSkge1xuXG4gICAgICAgIGYucmVzdG9yZVNsaWRlICgpO1xuXG4gICAgfSAvLyBlbmQgaWYgKHYuaGlkZGVuU2xpZGUpXG5cbiAgICB2YXIgbWRlbHRhID0gZGVsdGEgPj0gMCA/IGRlbHRhIDogdi5tYXhJbWFnZXMgKyBkZWx0YVxuXG4gICAgdmFyIG5leHRWaXMgPSAodi5jdXJWaXMgKyBtZGVsdGEpICUgdi5tYXhJbWFnZXM7XG5cbiAgICB2YXIgSWRQcmV2ID0gJyNqJyArIHYuY3VyVmlzO1xuICAgIHZhciBJZE5leHQgPSAnI2onICsgbmV4dFZpcztcblxuICAgICQoSWRQcmV2KVxuICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKElkTmV4dClcbiAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgdi5jdXJWaXMgPSBuZXh0VmlzO1xuXG4gICAgdmFyIGN0UmVmID0gdi5jdEkgW25leHRWaXNdO1xuXG4gICAgdmFyIHNsaWRlSSA9IGN0UmVmIFswXTtcbiAgICB2YXIgdG9waWNJZHggPSBjdFJlZiBbMV07XG4gICAgdmFyIHRvdGFsSW5TZWN0aW9uID0gdi50b3BpY3NJIFt0b3BpY0lkeF07XG5cbiAgICB2LmRwcCAoe2VtcHR5OiB2LklkUGFnZUN0fSk7XG4gICAgdi5JZEN1clNsaWRlID0gdi5kcHAgKHtzcGFuOiAnc2xpZGU6ICcgKyBzbGlkZUkgKyAnLycgKyB0b3RhbEluU2VjdGlvbixcbiAgICAgICAgcGFyZW50OiB2LklkUGFnZUN0LFxuICAgICAgICBjbGFzczogJ25hdnBvcyd9KTtcblxuICAgICQodi50b3BpY1JlZilcbiAgICAuY3NzIChcbiAgICAgICAgeydiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZmYnLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiAnbm9ybWFsJ31cbiAgICApO1xuXG4gICAgdi50b3BpY1JlZiA9IHYudG9waWNSZWZzIFt0b3BpY0lkeF07XG5cbiAgICAkKHYudG9waWNSZWYpXG4gICAgLmNzcyAoXG4gICAgICAgIHsnYmFja2dyb3VuZC1jb2xvcic6ICcjZDZmZmQ2JyxcbiAgICAgICAgJ2ZvbnQtd2VpZ2h0JzogJ2JvbGQnfVxuICAgICk7XG5cbn07IC8vIGVuZCBmLnNldE5leHRWaXNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi50b3BpY1RvVmlkZW9JZCA9IChhVGFnQSkgPT4ge1xuXG4gICAgdi50b3BpY1RvVmlkZW8gPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFUYWdBLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGFUYWcgPSBhVGFnQSBbaV07XG4gICAgICAgIHZhciBtID0gYVRhZy5tYXRjaCAoLy4qeW91dHUuYmUuKFteXCJdKylcIj4oW148XSspPC8pO1xuICAgICAgICBpZiAobSkge1xuXG4gICAgICAgICAgICB2YXIgdmlkZW9JZCA9IG0gWzFdO1xuICAgICAgICAgICAgdmFyIHRvcGljID0gbSBbMl07XG5cbiAgICAgICAgICAgIHYudG9waWNUb1ZpZGVvIFt0b3BpY10gPSB2aWRlb0lkO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChtKVxuXG5cbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGFUYWdBOyBpKyspXG5cblxufTsgLy8gZW5kIGYudG9waWNUb1ZpZGVvSWRcblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmRvQWN0aW9uID0gKG1zZ09iKSA9PiB7XG4gICAgY29uc29sZS5sb2cgKCdtc2dPYjogJyArIEpTT04uc3RyaW5naWZ5IChtc2dPYikgKyAnXFxuJyk7XG5cbiAgICB2YXIgY21kID0gdi5rZXkxIChtc2dPYik7XG4gICAgdmFyIHZhbHMgPSBtc2dPYiBbY21kXTtcblxuICAgIHN3aXRjaCAoY21kKSB7XG5cbiAgICAgICAgY2FzZSAncmVhZHknOlxuXG4gICAgICAgICAgICBmLmluaXRTdHlsZSAoKTtcbiAgICAgICAgICAgIHYud3MudG9TcnZyICh7Z2V0VmlkZW9MaW5rczoxfSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd2aWRlb0xpbmtzJzpcblxuICAgICAgICAgICAgZi50b3BpY1RvVmlkZW9JZCAodmFscyk7XG4gICAgICAgICAgICB2LndzLnRvU3J2ciAoe2dldFBuZ0ZpbGVzOjF9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3BuZ0ZpbGVzJzpcblxuICAgICAgICAgICAgJCgnYm9keScpXG4gICAgICAgICAgICAuZW1wdHkgKCk7XG5cbiAgICAgICAgICAgIGYuZG9TbGlkZVNob3cgKHZhbHMpO1xuXG4gICAgICAgICAgICBicmVhaztcblxuICAgIH0gLy8gZW5kIHN3aXRjaCAoY21kKVxuXG5cblxufTsgLy8gZW5kIFAuZG9BY3Rpb25cblxuXG4vLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuZi5pbml0ICgpO1xuXG5yZXR1cm4gUDtcblxufTtcblxuXG5cbiIsIi8vIGdvLWoyaC9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgdiA9IHtcblxuICAgIGlkOiAwLFxuICAgIHByaW1pdGl2ZVR5cGVzTm90TnVsbDogeydzdHJpbmcnOjEsICdudW1iZXInOjEsICdib29sZWFuJzoxLCAnc3ltYm9sJzogMX0sXG4gICAgICAgIC8vIHNpbmNlIHR5cGVvZiBudWxsIHlpZWxkcyAnb2JqZWN0JywgaXQncyBoYW5kbGVkIHNlcGFyYXRlbHlcblxuICAgIG1zZ1R5cGVzOiB7XG5cbiAgICAgICAgcHJpbWFyeToge1xuICAgICAgICAgICAgICAgIC8vIHZvaWQgdGFnc1xuICAgICAgICAgICAgYXJlYTogMCwgYmFzZTogMCwgYnI6IDAsIGNvbDogMCwgZW1iZWQ6IDAsIGhyOiAwLCBpbWc6IDAsIGlucHV0OiAwLCBrZXlnZW46IDAsIGxpbms6IDAsIG1ldGE6IDAsIHBhcmFtOiAwLCBzb3VyY2U6IDAsIHRyYWNrOiAwLCB3YnI6IDAsIFxuXG4gICAgICAgICAgICAgICAgLy8gbm9uLXZvaWQgdGFnc1xuICAgICAgICAgICAgYTogMSwgYWJicjogMSwgYWRkcmVzczogMSwgYXJ0aWNsZTogMSwgYXNpZGU6IDEsIGF1ZGlvOiAxLCBiOiAxLCBiZGk6IDEsIGJkbzogMSwgYmxvY2txdW90ZTogMSwgYm9keTogMSwgYnV0dG9uOiAxLCBjYW52YXM6IDEsIGNhcHRpb246IDEsIGNpdGU6IDEsIGNvZGU6IDEsIGNvbGdyb3VwOiAxLCBkYXRhbGlzdDogMSwgZGQ6IDEsIGRlbDogMSwgZGV0YWlsczogMSwgZGZuOiAxLCBkaWFsb2c6IDEsIGRpdjogMSwgZGw6IDEsIGR0OiAxLCBlbTogMSwgZmllbGRzZXQ6IDEsIGZpZ2NhcHRpb246IDEsIGZpZ3VyZTogMSwgZm9vdGVyOiAxLCBmb3JtOiAxLCBoMTogMSwgaDI6IDEsIGgzOiAxLCBoNDogMSwgaDU6IDEsIGg2OiAxLCBoZWFkOiAxLCBoZWFkZXI6IDEsIGhncm91cDogMSwgaHRtbDogMSwgaTogMSwgaWZyYW1lOiAxLCBpbnM6IDEsIGtiZDogMSwgbGFiZWw6IDEsIGxlZ2VuZDogMSwgbGk6IDEsIG1hcDogMSwgbWFyazogMSwgbWVudTogMSwgbWV0ZXI6IDEsIG5hdjogMSwgbm9zY3JpcHQ6IDEsIG9iamVjdDogMSwgb2w6IDEsIG9wdGdyb3VwOiAxLCBvcHRpb246IDEsIG91dHB1dDogMSwgcDogMSwgcHJlOiAxLCBwcm9ncmVzczogMSwgcTogMSwgcnA6IDEsIHJ0OiAxLCBydWJ5OiAxLCBzOiAxLCBzYW1wOiAxLCBzY3JpcHQ6IDEsIHNlY3Rpb246IDEsIHNlbGVjdDogMSwgc21hbGw6IDEsIHNwYW46IDEsIHN0cm9uZzogMSwgc3R5bGU6IDEsIHN1YjogMSwgc3VtbWFyeTogMSwgc3VwOiAxLCBzdmc6IDEsIHRhYmxlOiAxLCB0Ym9keTogMSwgdGQ6IDEsIHRleHRhcmVhOiAxLCB0Zm9vdDogMSwgdGg6IDEsIHRoZWFkOiAxLCB0aW1lOiAxLCB0aXRsZTogMSwgdHI6IDEsIHU6IDEsIHVsOiAxLCAndmFyJzogMSwgdmlkZW86IDEsXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2Vjb25kYXJ5OiB7c3R5bGU6IDF9LFxuICAgICAgICAgICAgLy8gZWxlbWVudHMgdGhhdCBjYW4gYmUgZWl0aGVyIGEgcHJpbWFyeSB0YWcgaXRzZWxmIG9yIGFuIGF0dHJpYnV0ZSBvZiBhbm90aGVyIHByaW1hcnkgdGFnXG4gICAgICAgICAgICAvLyBpZiBhbnkgb3RoZXIgcHJpbWFyeSB0YWdzIGlzIHByZXNlbnQsIHRoZW4gc2Vjb25kYXJ5IHRhZ3MgYXJlIHRyZWF0ZWQgYXNcbiAgICAgICAgICAgIC8vIGF0dHJpYnV0ZXMgb2YgdGhlIG90aGVyIHByaW1hcnkgdGFnXG5cbiAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgZW1wdHk6IDEsIHJtOiAxLCBcbiAgICAgICAgICAgIHByZXBlbmQ6IDEsIGFwcGVuZDogMSwgYmVmb3JlOiAxLCBhZnRlcjogMSwgcGFyZW50OiAxLFxuICAgICAgICAgICAgYXR0cjogMSwgY29udGVudDogMSwgdGV4dDogMSwgXG4gICAgICAgIH0sXG5cbiAgICB9LFxuXG4gICAgbXNnMDogcmVxdWlyZSAoJ2dvLW1zZycpLFxuICAgIG1zZzogbnVsbCxcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xudmFyIGY9e307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmluaXQgPSAoKSA9PiB7XG4gICAgXG4gICAgdi5tc2cgPSBuZXcgdi5tc2cwICh2Lm1zZ1R5cGVzKTtcblxufTsgLy8gZW5kIGYuaW5pdFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmF0dHIgPSAoc2VsZWN0b3IsIGF0dHIpID0+IHtcbiAgICBcbiAgICAkKHNlbGVjdG9yKVxuICAgIC5hdHRyIChhdHRyKTtcblxufTsgLy8gZW5kIGYuYXR0ciBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5lbXB0eSA9IChzZWxlY3RvcikgPT4ge1xuICAgIFxuICAgICQoc2VsZWN0b3IpXG4gICAgLmVtcHR5ICgpXG4gICAgLm9mZiAoJ2tleWRvd24nKTtcblxufTsgLy8gZW5kIGYuZW1wdHkgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5ybSA9IChzZWxlY3RvcikgPT4ge1xuXG4gICAgJChzZWxlY3RvcilcbiAgICAucmVtb3ZlICgpO1xuXG59OyAvLyBlbmQgZi5ybVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRpc3BsYXlPYkggPSAocGFyZW50LCBkaXNwT2IpID0+IHtcbiAgICBcbiAgICAgICAgLy8gLS0tLSAgZG9BcnJheSAtLS0tXG4gICAgdmFyIGRvQXJyYXkgPSBmdW5jdGlvbiAoZGlzcE9iKSB7XG5cbiAgICAgICAgdmFyIElkcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BPYi5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBJZHMucHVzaCAoZi5kaXNwbGF5T2JIIChwYXJlbnQsIGRpc3BPYiBbaV0pKTtcblxuICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BPYi5sZW5ndGg7IGkrKylcblxuICAgICAgICAvL3JldHVybiBJZHM7XG4gICAgICAgIHJldHVybiBJZHMgW0lkcy5sZW5ndGggLSAxXTtcbiAgICAgICAgXG4gICAgfTsgIC8vIGVuZCBkb0FycmF5IFxuXG4gICAgICAgIC8vIC0tLS0gIGRvT2JqZWN0IC0tLS1cbiAgICB2YXIgZG9PYmplY3QgPSBmdW5jdGlvbiAoZGlzcE9iKSB7XG5cbiAgICAgICAgdmFyIGRpc3BPYlBhcnNlZCA9IHYubXNnLnBhcnNlTXNnIChkaXNwT2IpO1xuXG4gICAgICAgIHZhciBwcmltYXJ5S2V5ID0gZGlzcE9iUGFyc2VkLnA7XG5cbiAgICAgICAgdmFyIG1ldGEgPSBkaXNwT2JQYXJzZWQubTtcblxuICAgICAgICB2YXIgZGVsS2V5ID0gbnVsbDtcbiAgICAgICAgdmFyIHJlbExvYyA9ICdhcHBlbmQnO1xuXG4gICAgICAgIHZhciBhdHRyID0gbnVsbDtcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBudWxsO1xuICAgICAgICB2YXIgdGV4dCA9IG51bGw7XG5cbiAgICAgICAgaWYgKG1ldGEuaGFzT3duUHJvcGVydHkgKCdwYXJlbnQnKSkge1xuICAgICAgICAgICAgLy8gZW5zdXJlcyBwcm9jZXNzaW5nIG9mICdwYXJlbnQnIGJlZm9yZSByZW1haW5kZXIgb2YgbWV0YSBrZXlzXG5cbiAgICAgICAgICAgIHBhcmVudCA9IG1ldGEucGFyZW50O1xuICAgICAgICAgICAgZGVsZXRlIG1ldGEucGFyZW50O1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChtZXRhLmhhc093blByb3BlcnR5ICgncGFyZW50JykpXG4gICAgICAgIFxuICAgICAgICB2YXIgbWV0YUtleXMgPSBPYmplY3Qua2V5cyAobWV0YSk7XG4gICAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IG1ldGFLZXlzLmxlbmd0aDsgaWR4KyspIHtcblxuICAgICAgICAgICAgdmFyIGtleSA9IG1ldGFLZXlzIFtpZHhdO1xuICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5JzpcbiAgICAgICAgICAgICAgICBjYXNlICdybSc6XG4gICAgICAgICAgICAgICAgICAgIGRlbEtleSA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gbWV0YSBba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdhdHRyJzpcbiAgICAgICAgICAgICAgICAgICAgYXR0ciA9IG1ldGEuYXR0cjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IG1ldGEuY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBtZXRhLnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncHJlcGVuZCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICBjYXNlICdiZWZvcmUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2FmdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgcmVsTG9jID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gbWV0YSBba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvUGFyZW50ID0gdmFsICE9PSAxICYmIHZhbCAhPT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gZG9QYXJlbnQgPyB2YWwgOiBwYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB2YWwgaXMgb3RoZXIgdGhhbiAxIG9yIHRydWUsIHJlbExvYyBvdmVycmlkZXMgYm90aCBwYXJlbnQgdmFsdWVzIHBhc3NlZCBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGludG8gZGlzcGxheU9iSCBhbmQgZGVmaW5lZCBieSBvcHRpb25hbCBwYXJlbnQgYXR0cmlidXRlXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBzd2l0Y2ggKGtleSlcbiAgICAgICAgICAgIFxuXG4gICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IG1ldGFLZXlzLmxlbmd0aDsgaWR4KyspXG4gICAgICAgIFxuXG4gICAgICAgIElkID0gbnVsbDtcblxuICAgICAgICBpZiAoZGVsS2V5KSB7XG5cbiAgICAgICAgICAgIGYgW2RlbEtleV0gKHBhcmVudCk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChhdHRyKSB7XG5cbiAgICAgICAgICAgIGYuYXR0ciAocGFyZW50LCBhdHRyKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIC8vIHJlcGxhY2VzIGVudGlyZSBjb250ZW50IG9mIHBhcmVudCB3aXRoIG5ldyBjb250ZW50XG5cbiAgICAgICAgICAgICQocGFyZW50KVxuICAgICAgICAgICAgLmVtcHR5ICgpO1xuXG4gICAgICAgICAgICBmLmRpc3BsYXlPYkggKHBhcmVudCwgY29udGVudCk7XG4gICAgICAgICAgICAgICAgLy8gd2l0aG91dCBlbXB0eWluZyBmaXJzdCwgd2lsbCBzaW1wbHkgYXBwZW5kIGNvbnRlbnQgdG8gZXhpc3RpbmcgY29udGVudFxuXG4gICAgICAgIH0gZWxzZSBpZiAodGV4dCkge1xuXG4gICAgICAgICAgICBJZCA9IGYudGV4dE1ha2UgKHBhcmVudCwgcmVsTG9jLCB0ZXh0KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBJZCA9IGYuZWxlbWVudE1ha2UgKHBhcmVudCwgcmVsTG9jLCBwcmltYXJ5S2V5LCBkaXNwT2JQYXJzZWQuYywgZGlzcE9iUGFyc2VkLnMpO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChkZWxLZXkpXG5cbiAgICAgICAgcmV0dXJuIElkO1xuICAgICAgICBcbiAgICB9OyAgLy8gZW5kIGRvT2JqZWN0IFxuXG5cblxuICAgICAgIC8vIC0tLS0gbWFpbiAtLS0tXG4gICAgdmFyIElkO1xuICAgIHZhciBkaXNwT2JUeXBlID0gdHlwZW9mIGRpc3BPYjtcblxuICAgIGlmIChkaXNwT2JUeXBlID09PSAndW5kZWZpbmVkJyB8fCBkaXNwT2IgPT09IDAgfHwgZGlzcE9iID09PSBudWxsKSB7XG5cbiAgICAgICAgSWQgPSBudWxsO1xuXG4gICAgfSBlbHNlIGlmICh2LnByaW1pdGl2ZVR5cGVzTm90TnVsbC5oYXNPd25Qcm9wZXJ0eSAoZGlzcE9iVHlwZSkpIHtcblxuICAgICAgICBJZCA9IGYudGV4dE1ha2UgKHBhcmVudCwgJ2FwcGVuZCcsIGRpc3BPYik7XG4gICAgICAgICAgICAvLyBpZiB0ZXh0IHNob3VsZCBiZSBwbGFjZWQgYXQgb3RoZXIgdGhhbiAnYXBwZW5kJyBsb2NhdGlvbiwgdGhlbiB1c2VcbiAgICAgICAgICAgIC8vICd0ZXh0JyB0YWcgYW5kIHNwZWNpZnkgcHJlcGVuZCwgYWZ0ZXIgb3IgYmVmb3JlIGFzIG5lZWRlZFxuXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5IChkaXNwT2IpKSB7XG5cbiAgICAgICAgSWQgPSBkb0FycmF5IChkaXNwT2IpO1xuXG4gICAgfSBlbHNlIGlmIChkaXNwT2JUeXBlID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgSWQgPSBkb09iamVjdCAoZGlzcE9iKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgSWQgPSBudWxsO1xuXG4gICAgfSAvLyBlbmQgaWYgKHR5cGVvZiBkaXNwT2IgPT09ICd1bmRlZmluZWQnIHx8IGRpc3BPYiA9PT0gMCB8fCBkaXNwT2IgPT09IG51bGwpXG4gICAgXG4gICAgcmV0dXJuIElkO1xuXG59OyAvLyBlbmQgZi5kaXNwbGF5T2JIIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5lbGVtZW50TWFrZSA9IChwYXJlbnRPclNpYmxJZCwgcmVsTG9jLCBlbE5hbWUsIGNvbnRlbnQsIGF0dHJzKSA9PiB7XG4gICAgXG4gICAgdmFyIGlkO1xuICAgIHZhciBhdHRyS2V5cyA9IE9iamVjdC5rZXlzIChhdHRycyk7XG4gICAgdmFyIGhhc0F0dHJzID0gYXR0cktleXMubGVuZ3RoID4gMDtcblxuICAgIGlmIChoYXNBdHRycyAmJiBhdHRycy5oYXNPd25Qcm9wZXJ0eSAoJ2lkJykpIHtcblxuICAgICAgICBpZCA9IGF0dHJzLmlkO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBpZCA9IFAuZ2VuSWQgKCk7XG5cbiAgICB9IC8vIGVuZCBpZiAoaGFzQXR0cnMpXG4gICAgXG4gICAgdmFyIElkID0gJyMnICsgaWQ7XG4gICAgXG4gICAgaWYgKGVsTmFtZSA9PT0gJ3NjcmlwdCcgJiYgY29udGVudCAhPT0gMCkge1xuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85NDEzNzM3L2hvdy10by1hcHBlbmQtc2NyaXB0LXNjcmlwdC1pbi1qYXZhc2NyaXB0XG4gICAgICAgIC8vIGluc3BpcmVkIGJ5IFNPIHF1ZXN0aW9uLCBidXQgc2V0dGluZyBpbm5lckhUTUwgaXNuJ3Qgc3VwcG9zZWQgdG8gd29ya1xuICAgICAgICAvLyB0aGVyZWZvcmUsIHNldCBzcmMgYXR0cmlidXRlIHdpdGggcGF0aCB0byBmaWxlLCBpbnN0ZWFkIG9mIFxuICAgICAgICAvLyBzZXR0aW5nIGlubmVySFRNTCB0byBjb250ZW50IG9mIGZpbGVcblxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MTA5OTUvY2FudC1hcHBlbmQtc2NyaXB0LWVsZW1lbnRcbiAgICAgICAgLy8galF1ZXJ5IHdvbid0IGFkZCBzY3JpcHQgZWxlbWVudCBhcyBpdCBkb2VzIHdpdGggYW55IG90aGVyIGVsZW1lbnQuICBUaGVyZWZvcmUsIG11c3QgYmUgZG9uZVxuICAgICAgICAvLyB1c2luZyBvbmx5IGphdmFzY3JpcHQgYXMgZm9sbG93czpcbiAgICAgICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG5cbiAgICAgICAgc2NyaXB0LnNyYyA9IGNvbnRlbnQ7XG4gICAgICAgIHNjcmlwdC5pZCA9IGF0dHJzLmlkO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOyAgICAgXG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHZhciBkaXZlbCA9ICc8JyArIGVsTmFtZSArICcgaWQ9XCInICsgaWQgKyAnXCInO1xuICAgIFxuICAgICAgICBpZiAoY29udGVudCkge1xuICAgIFxuICAgICAgICAgICAgZGl2ZWwgKz0gJz48LycgKyBlbE5hbWUgKyAnPic7XG4gICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICBkaXZlbCArPSAnPic7XG4gICAgXG4gICAgICAgIH0gLy8gZW5kIGlmIChjb250ZW50KVxuICAgIFxuICAgICAgICAkKHBhcmVudE9yU2libElkKVtyZWxMb2NdIChkaXZlbCk7XG5cbiAgICB9IC8vIGVuZCBpZiAoZWxOYW1lID09PSAnc2NyaXB0JylcbiAgICBcbiAgICBcbiAgICBpZiAoaGFzQXR0cnMpIHtcbiAgICAgICAgXG4gICAgICAgICQoSWQpXG4gICAgICAgIC5hdHRyIChhdHRycyk7XG5cbiAgICB9IC8vIGVuZCBpZiAoaGFzQXR0cnMpXG5cbiAgICBmLmRpc3BsYXlPYkggKElkLCBjb250ZW50KTtcbiAgICBcbiAgICBpZiAoZWxOYW1lID09PSAnZm9ybScpIHtcblxuICAgICAgICAkKHBhcmVudClcbiAgICAgICAgLmZvY3VzICgpO1xuXG4gICAgfSAvLyBlbmQgaWYgKGVsTmFtZSA9PT0gJ2Zvcm0nKVxuICAgIFxuICAgIHJldHVybiBJZDtcblxufTsgLy8gZW5kIGYuZWxlbWVudE1ha2VcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi50ZXh0TWFrZSA9IChwYXJlbnQsIHJlbExvYywgcHJpbWl0aXZlKSA9PiB7XG4gICAgXG4gICAgaWYgKHR5cGVvZiBwcmltaXRpdmUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgc2luZ2xlcXVvdGUgPSAnJiN4MDAyNzsnO1xuICAgICAgICB2YXIgYmFja3NsYXNoID0gJyYjeDAwNWM7JztcbiAgICAgICAgdmFyIGRvdWJsZXF1b3RlID0gJyYjeDAwMjI7JztcbiAgICAgICAgdmFyIGx0ID0gJyZsdDsnO1xuICAgICAgICBcbiAgICAgICAgcHJpbWl0aXZlID0gcHJpbWl0aXZlLnJlcGxhY2UgKC8nL2csIHNpbmdsZXF1b3RlKTtcbiAgICAgICAgcHJpbWl0aXZlID0gcHJpbWl0aXZlLnJlcGxhY2UgKC9cIi9nLCBkb3VibGVxdW90ZSk7XG4gICAgICAgIHByaW1pdGl2ZSA9IHByaW1pdGl2ZS5yZXBsYWNlICgvXFxcXC9nLCBiYWNrc2xhc2gpO1xuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoLzwvZywgbHQpO1xuXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcHJpbWl0aXZlID09PSAnc3ltYm9sJykge1xuXG4gICAgICAgIHByaW1pdGl2ZSA9ICdzeW1ib2wnO1xuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHN0cmluZ2lmeSB3b3VsZCBwcm9kdWNlICd7fScgd2hpY2ggaXMgbGVzcyB1c2VmdWxcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcHJpbWl0aXZlID0gSlNPTi5zdHJpbmdpZnkgKHByaW1pdGl2ZSk7XG5cbiAgICB9IC8vIGVuZCBpZiAodHlwZW9mIHByaW1pdGl2ZSA9PT0gJ3N0cmluZycpXG4gICAgXG5cbiAgICAkKHBhcmVudCkgW3JlbExvY10gKHByaW1pdGl2ZSk7XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gdGV4dCBvYnMgaGF2ZSBubyBpZCdzOiBvbmx5IHRleHQgaXMgYXBwZW5kZWQgd2l0aCBubyB3YXkgdG8gYWRkcmVzcyBpdFxuICAgICAgICAvLyBpZiBhZGRyZXNzaW5nIGlzIG5lY2Vzc2FyeSwgdXNlIHNwYW4gaW5zdGVhZCBvZiB0ZXh0XG5cbn07IC8vIGVuZCBmLnRleHRNYWtlIFxuXG5cblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZGlzcGxheU9iID0gKGRpc3BPYikgPT4ge1xuICAgIFxuICAgIHZhciBwYXJlbnQgPSAnYm9keSc7XG4gICAgICAgIC8vIGlmIHBhcmVudCBub3QgZm91bmQsIGFwcGVuZCB0byBib2R5XG5cbiAgICBpZiAodHlwZW9mIGRpc3BPYiA9PT0gJ29iamVjdCcgJiYgZGlzcE9iLmhhc093blByb3BlcnR5ICgncGFyZW50JykpIHtcblxuICAgICAgICBwYXJlbnQgPSBkaXNwT2IucGFyZW50O1xuXG4gICAgfSAvLyBlbmQgaWYgKHR5cGVvZiBkaXNwT2IgPT09ICdvYmplY3QnICYmIGRpc3BPYi5oYXNPd25Qcm9wZXJ0eSAoJ3BhcmVudCcpKVxuICAgIFxuICAgIHZhciBJZCA9IGYuZGlzcGxheU9iSCAocGFyZW50LCBkaXNwT2IpO1xuXG4gICAgcmV0dXJuIElkO1xuXG59OyAvLyBlbmQgUC5kaXNwbGF5T2IgXG5cblAuZGlzcGxheVBhZ2UgPSBQLmRpc3BsYXlPYjtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZ2VuSWQgPSAoKSA9PiB7XG5cbiAgICB2YXIgaWQgPSAnaScgKyB2LmlkKys7XG4gICAgcmV0dXJuIGlkO1xuXG59OyAvLyBlbmQgUC5nZW5JZFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmdlbklkcyA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgaWQgPSBQLmdlbklkICgpO1xuICAgIHZhciBJZCA9ICcjJyArIGlkO1xuXG4gICAgcmV0dXJuIFtpZCwgSWRdO1xuXG59OyAvLyBlbmQgUC5nZW5JZHNcblxuXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5mLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59KCkpO1xuXG5cblxuIiwiLy8gZ28ta2V5L2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGpxU2VsZWN0b3IsIHJlcG9ydFNoaWZ0LCBrZXlEb3duSGFuZGxlciwgcmVwb3J0VXAsIGtleVVwSGFuZGxlcikge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG5cbiAgICBqcVNlbGVjdG9yOiAnYm9keScsXG4gICAgcmVwb3J0U2hpZnQ6IGZhbHNlLFxuICAgIGtleURvd25IYW5kbGVyOiBudWxsLFxuICAgIHJlcG9ydFVwOiBmYWxzZSxcbiAgICBrZXlVcEhhbmRsZXI6IG51bGwsXG5cbiAgICBrU2hpZnQ6IGZhbHNlLFxuICAgIGtDdHJsOiBmYWxzZSxcbiAgICBrQWx0OiBmYWxzZSxcbiAgICBrQ21kOiBmYWxzZSxcbiAgICBrSWdub3JlOiBmYWxzZSxcbiAgICB3aGljaFNoaWZ0S2V5czogezE2OjEsIDE3OjEsIDE4OjEsIDkxOjEsIDkyOjEsIDkzOjEsIDIyNDoxfSxcblxuICAgICAgICAgICAgLy8gbm90IHByaW50YWJsZSBvciBub24tYXNjaWkgYmxvY2tcbiAgICBjdHJsT3JOb25Bc2NpaToge1xuICAgICAgICA4OiAnQmFja3NwYWNlJyxcbiAgICAgICAgOTogJ1RhYicsXG4gICAgICAgIDEzOiAnRW50ZXInLFxuICAgICAgICAxNjogJ1NoaWZ0JyxcbiAgICAgICAgMTc6ICdDdHJsJyxcbiAgICAgICAgMTg6ICdBbHQnLFxuICAgICAgICAxOTogJ1BhdXNlLWJyZWFrJyxcbiAgICAgICAgMjA6ICdDYXBzLWxvY2snLFxuICAgICAgICAyNzogJ0VzYycsXG4gICAgICAgIDMyOiAnICcsICAvLyBTcGFjZVxuICAgICAgICAzMzogJ1BhZ2VVcCcsXG4gICAgICAgIDM0OiAnUGFnZURvd24nLFxuICAgICAgICAzNTogJ0VuZCcsXG4gICAgICAgIDM2OiAnSG9tZScsXG4gICAgICAgIDM3OiAnTGVmdCcsXG4gICAgICAgIDM4OiAnVXAnLFxuICAgICAgICAzOTogJ1JpZ2h0JyxcbiAgICAgICAgNDA6ICdEb3duJyxcbiAgICAgICAgNDU6ICdJbnNlcnQnLFxuICAgICAgICA0NjogJ0RlbGV0ZScsXG4gICAgICAgIDkxOiAnV2luZG93c0tleUxlZnQnLFxuICAgICAgICA5MjogJ1dpbmRvd3NLZXlSaWdodCcsXG4gICAgICAgIDkzOiAnV2luZG93c09wdGlvbktleScsXG4gICAgICAgIDk2OiAnMCcsICAvLyBOdW1wYWRcbiAgICAgICAgOTc6ICcxJywgIC8vIE51bXBhZFxuICAgICAgICA5ODogJzInLCAgLy8gTnVtcGFkXG4gICAgICAgIDk5OiAnMycsICAvLyBOdW1wYWRcbiAgICAgICAgMTAwOiAnNCcsICAvLyBOdW1wYWRcbiAgICAgICAgMTAxOiAnNScsICAvLyBOdW1wYWRcbiAgICAgICAgMTAyOiAnNicsICAvLyBOdW1wYWRcbiAgICAgICAgMTAzOiAnNycsICAvLyBOdW1wYWRcbiAgICAgICAgMTA0OiAnOCcsICAvLyBOdW1wYWRcbiAgICAgICAgMTA1OiAnOScsICAvLyBOdW1wYWRcbiAgICAgICAgMTA2OiAnKicsICAvLyBOdW1wYWRcbiAgICAgICAgMTA3OiAnKycsICAvLyBOdW1wYWRcbiAgICAgICAgMTA5OiAnLScsICAvLyBOdW1wYWRcbiAgICAgICAgMTEwOiAnLicsICAvLyBOdW1wYWRcbiAgICAgICAgMTExOiAnLycsICAvLyBOdW1wYWRcbiAgICAgICAgMTEyOiAnRjEnLFxuICAgICAgICAxMTM6ICdGMicsXG4gICAgICAgIDExNDogJ0YzJyxcbiAgICAgICAgMTE1OiAnRjQnLFxuICAgICAgICAxMTY6ICdGNScsXG4gICAgICAgIDExNzogJ0Y2JyxcbiAgICAgICAgMTE4OiAnRjcnLFxuICAgICAgICAxMTk6ICdGOCcsXG4gICAgICAgIDEyMDogJ0Y5JyxcbiAgICAgICAgMTIxOiAnRjEwJyxcbiAgICAgICAgMTIyOiAnRjExJyxcbiAgICAgICAgMTIzOiAnRjEyJyxcbiAgICAgICAgMTQ0OiAnTnVtbG9jaycsXG4gICAgICAgIDE0NTogJ1Njcm9sbC1sb2NrJyxcbiAgICAgICAgMjI0OiAnTWFjQ21kJyxcbiAgICB9LFxuICAgIFxuICAgIFxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgYXNjaWlVblNoaWZ0ZWQ6IHtcbiAgICAgICAgNDg6ICcwJyxcbiAgICAgICAgNDk6ICcxJyxcbiAgICAgICAgNTA6ICcyJyxcbiAgICAgICAgNTE6ICczJyxcbiAgICAgICAgNTI6ICc0JyxcbiAgICAgICAgNTM6ICc1JyxcbiAgICAgICAgNTQ6ICc2JyxcbiAgICAgICAgNTU6ICc3JyxcbiAgICAgICAgNTY6ICc4JyxcbiAgICAgICAgNTc6ICc5JyxcbiAgICAgICAgNTk6ICc7JyxcbiAgICAgICAgNjE6ICc9JyxcbiAgICAgICAgNjU6ICdhJyxcbiAgICAgICAgNjY6ICdiJyxcbiAgICAgICAgNjc6ICdjJyxcbiAgICAgICAgNjg6ICdkJyxcbiAgICAgICAgNjk6ICdlJyxcbiAgICAgICAgNzA6ICdmJyxcbiAgICAgICAgNzE6ICdnJyxcbiAgICAgICAgNzI6ICdoJyxcbiAgICAgICAgNzM6ICdpJyxcbiAgICAgICAgNzQ6ICdqJyxcbiAgICAgICAgNzU6ICdrJyxcbiAgICAgICAgNzY6ICdsJyxcbiAgICAgICAgNzc6ICdtJyxcbiAgICAgICAgNzg6ICduJyxcbiAgICAgICAgNzk6ICdvJyxcbiAgICAgICAgODA6ICdwJyxcbiAgICAgICAgODE6ICdxJyxcbiAgICAgICAgODI6ICdyJyxcbiAgICAgICAgODM6ICdzJyxcbiAgICAgICAgODQ6ICd0JyxcbiAgICAgICAgODU6ICd1JyxcbiAgICAgICAgODY6ICd2JyxcbiAgICAgICAgODc6ICd3JyxcbiAgICAgICAgODg6ICd4JyxcbiAgICAgICAgODk6ICd5JyxcbiAgICAgICAgOTA6ICd6JyxcbiAgICAgICAgMTczOiAnLScsXG4gICAgICAgIDE4ODogJywnLFxuICAgICAgICAxOTA6ICcuJyxcbiAgICAgICAgMTkxOiAnLycsXG4gICAgICAgIDE5MjogJ2AnLFxuICAgICAgICAyMTk6ICdbJyxcbiAgICAgICAgMjIwOiBcIlxcXFxcIixcbiAgICAgICAgMjIxOiAnXScsXG4gICAgICAgIDIyMjogXCInXCIsXG4gICAgMTg2OiBcIjtcIiwgIC8vIGRpdHRvIGZvciAnOydcbiAgICAxODc6IFwiPVwiLCAgLy8gYXBwYXJlbnRseSwgY2hyb21lIHRoaW5rcyB3aGljaCBpcyAxODcgZm9yICc9JywgYnV0IG5vdCBmaXJlZm94XG4gICAgMTg5OiBcIi1cIiwgIC8vIGRpdHRvIGZvciAnLSdcbiAgICB9LFxuICAgIFxuICAgIFxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgYXNjaWlTaGlmdGVkOiB7XG4gICAgICAgIDQ4OiAnKScsXG4gICAgICAgIDQ5OiAnIScsXG4gICAgICAgIDUwOiAnQCcsXG4gICAgICAgIDUxOiAnIycsXG4gICAgICAgIDUyOiAnJCcsXG4gICAgICAgIDUzOiAnJScsXG4gICAgICAgIDU0OiAnXicsXG4gICAgICAgIDU1OiAnJicsXG4gICAgICAgIDU2OiAnKicsXG4gICAgICAgIDU3OiAnKCcsXG4gICAgICAgIDU5OiAnOicsXG4gICAgICAgIDYxOiAnKycsXG4gICAgICAgIDY1OiAnQScsXG4gICAgICAgIDY2OiAnQicsXG4gICAgICAgIDY3OiAnQycsXG4gICAgICAgIDY4OiAnRCcsXG4gICAgICAgIDY5OiAnRScsXG4gICAgICAgIDcwOiAnRicsXG4gICAgICAgIDcxOiAnRycsXG4gICAgICAgIDcyOiAnSCcsXG4gICAgICAgIDczOiAnSScsXG4gICAgICAgIDc0OiAnSicsXG4gICAgICAgIDc1OiAnSycsXG4gICAgICAgIDc2OiAnTCcsXG4gICAgICAgIDc3OiAnTScsXG4gICAgICAgIDc4OiAnTicsXG4gICAgICAgIDc5OiAnTycsXG4gICAgICAgIDgwOiAnUCcsXG4gICAgICAgIDgxOiAnUScsXG4gICAgICAgIDgyOiAnUicsXG4gICAgICAgIDgzOiAnUycsXG4gICAgICAgIDg0OiAnVCcsXG4gICAgICAgIDg1OiAnVScsXG4gICAgICAgIDg2OiAnVicsXG4gICAgICAgIDg3OiAnVycsXG4gICAgICAgIDg4OiAnWCcsXG4gICAgICAgIDg5OiAnWScsXG4gICAgICAgIDkwOiAnWicsXG4gICAgICAgIDE3MzogJ18nLFxuICAgICAgICAxODg6ICc8JyxcbiAgICAgICAgMTkwOiAnPicsXG4gICAgICAgIDE5MTogJz8nLFxuICAgICAgICAxOTI6ICd+JyxcbiAgICAgICAgMjE5OiAneycsXG4gICAgICAgIDIyMDogJ3wnLFxuICAgICAgICAyMjE6ICd9JyxcbiAgICAgICAgMjIyOiAnXCInLFxuICAgIDE4NjogXCI6XCIsICAvLyBkaXR0byBmb3IgJzonXG4gICAgMTg3OiBcIitcIiwgIC8vIGRpdHRvIGZvciAnKydcbiAgICAxODk6IFwiX1wiLCAgLy8gZGl0dG8gZm9yICctJ1xuICAgIH0sXG5cblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xudmFyIGY9e307XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5pbml0ID0gKCkgPT4ge1xuICAgIFxuICAgIHYuanFTZWxlY3RvciA9IGpxU2VsZWN0b3IgPyBqcVNlbGVjdG9yIDogJ2JvZHknO1xuICAgIHYucmVwb3J0U2hpZnQgPSByZXBvcnRTaGlmdCA/IHJlcG9ydFNoaWZ0IDogZmFsc2U7XG4gICAgdi5rZXlEb3duSGFuZGxlciA9IGtleURvd25IYW5kbGVyID8ga2V5RG93bkhhbmRsZXIgOiBmLmRlZmF1bHRIYW5kbGVyO1xuICAgIHYucmVwb3J0VXAgPSByZXBvcnRVcCA/IHJlcG9ydFVwIDogZmFsc2U7XG4gICAgdi5rZXlVcEhhbmRsZXIgPSBrZXlVcEhhbmRsZXIgPyBrZXlVcEhhbmRsZXIgOiBmLmRlZmF1bHRIYW5kbGVyO1xuXG4gICAgLy9QLnNldEtleU9uICh2LmpxU2VsZWN0b3IpO1xuICAgIFAuc2V0S2V5T24gKCk7XG4gICAgaWYgKCFfbTAua2V5RXZlbnRzKSB7XG5cbiAgICAgICAgX20wLmtleUV2ZW50cyA9IHt9O1xuICAgICAgICAvKlxuICAgICAgICAgICAgLy8gb3ZlcnJpZGUganF1ZXJ5J3MgcmVtb3ZlIGZ1bmN0aW9uIHRvIHR1cm4gb24gYWxsIGtleSBoYW5kbGVycyBhZnRlciByZW1vdmFsIG9mIGEgZm9ybVxuICAgICAgICB2YXIgcm1PcmlnID0gJC5mbi5yZW1vdmU7XG4gICAgICAgICQuZm4ucmVtb3ZlID0gZnVuY3Rpb24gKCl7XG5cbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5oYXMgKCdmb3JtJylcbiAgICAgICAgICAgIC5lYWNoIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgUC5hbGxLZXlzT24gKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcm1PcmlnLmFwcGx5ICh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgICovXG5cbiAgICB9IC8vIGVuZCBpZiAoIV9tMC5rZXlFdmVudHMpXG5cbiAgICB2YXIga2V5RXZlbnRzID0gX20wLmtleUV2ZW50cztcbiAgICBrZXlFdmVudHMgW3YuanFTZWxlY3Rvcl0gPSB7b246IFAuc2V0S2V5T24sIG9mZjogUC5zZXRLZXlPZmZ9O1xuICAgIFxuXG59OyAvLyBlbmQgZi5pbml0XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmNLZXlEb3duID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY2FsbGJhY2sgaXMgdi5rZXlEb3duSG5kbGVyXG4gICAgLy8gcmV0dXJucyBjaCBvYmplY3QgcmVmbGVjdGluZyB3aGljaCBzaGlmdCBrZXlzIHdlcmUgcHJlc3NlZCBkb3duLCBjaCBhbmQgd2hpY2ggdmFsdWVzXG4gICAgLy9cbiAgICAvLyB2LnJlcG9ydFNoaWZ0IHRydWUgPT4gdHJpZ2dlciBjYWxsYmFjayBmb3IgZWFjaCBrZXlkb3duIGV2ZW50IG9mIGFueSBrZXksIFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRpbmcgYW55IHNoaWZ0IGtleVxuICAgIC8vICAgICBmYWxzZSA9PiBzaGlmdCBrZXkgZXZlbnQgcmVwb3J0ZWQgb25seSB3aGVuIHRoZSBuZXh0IG5vbi1zaGlmdCBrZXlkb3duIGV2ZW50LlxuICAgIC8vICAgICAgICAgICAgICBTbywgY2FsbGJhY2sgaXMgb25seSB0cmlnZ2VyZWQgZm9yIG5vbi1zaGlmdCBrZXkgZXZlbnRzXG4gICAgXG4gICAgLy9jb25zb2xlLmxvZyAoJ2dvLWtleS5jS2V5RG93biBqcVNlbGVjdG9yOiAnICsgdi5qcVNlbGVjdG9yKTtcblxuICAgIHZhciB3aGljaCA9IGV2ZW50LndoaWNoO1xuXG4gICAgICAgIC8vIG5ldmVyIGlnbm9yZSAnRXNjJyBrZXkgPT0gMjdcbiAgICBpZiAodi5rSWdub3JlICYmIHdoaWNoICE9IDI3KSB7XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSAvLyBlbmQgaWYgKGtJZ25vcmUpXG4gICAgXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24gKCk7XG5cbiAgICB2YXIgaXNBU2hpZnRLZXkgPSB0cnVlO1xuICAgIHN3aXRjaCAod2hpY2gpIHtcblxuICAgICAgICBjYXNlIDE2OiBcbiAgICAgICAgICAgIHYua1NoaWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTc6IFxuICAgICAgICAgICAgdi5rQ3RybCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDE4OiBcbiAgICAgICAgICAgIHYua0FsdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDkxOiBcbiAgICAgICAgY2FzZSA5MjogXG4gICAgICAgIGNhc2UgOTM6IFxuICAgICAgICBjYXNlIDIyNDpcbiAgICAgICAgICAgIHYua0NtZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaXNBU2hpZnRLZXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAgIFxuXG4gICAgZi5jS2V5VXBEb3duRmluaXNoIChpc0FTaGlmdEtleSwgd2hpY2gsIHYua2V5RG93bkhhbmRsZXIpO1xuXG4gICAgaWYgKCFpc0FTaGlmdEtleSkge1xuXG4gICAgICAgIHYua1NoaWZ0ID0gZmFsc2U7XG4gICAgICAgIHYua0N0cmwgPSBmYWxzZTtcbiAgICAgICAgdi5rQWx0ID0gZmFsc2U7XG4gICAgICAgIHYua0NtZCA9IGZhbHNlO1xuXG4gICAgfSAvLyBlbmQgaWYgKCFpc0FTaGlmdEtleSlcbiAgICBcblxufTsgLy8gZW5kIGYuY0tleURvd24gXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuY0tleVVwID0gKGV2ZW50KSA9PiB7XG4gICAgLy8gY2FsbGJhY2sgaXMgdi5rZXlEb3duSG5kbGVyXG4gICAgXG4gICAgdmFyIHdoaWNoID0gZXZlbnQud2hpY2g7XG5cbiAgICAgICAgLy8gbmV2ZXIgaWdub3JlICdFc2MnIGtleSA9PSAyN1xuICAgIGlmICh2LmtJZ25vcmUgJiYgd2hpY2ggIT0gMjcpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IC8vIGVuZCBpZiAoa0lnbm9yZSlcbiAgICBcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbiAoKTtcblxuICAgIHZhciBpc0FTaGlmdEtleSA9IHRydWU7XG4gICAgc3dpdGNoICh3aGljaCkge1xuXG4gICAgICAgIGNhc2UgMTY6IFxuICAgICAgICAgICAgdi5rU2hpZnQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE3OiBcbiAgICAgICAgICAgIHYua0N0cmwgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE4OiBcbiAgICAgICAgICAgIHYua0FsdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgOTE6IFxuICAgICAgICBjYXNlIDkyOiBcbiAgICAgICAgY2FzZSA5MzogXG4gICAgICAgIGNhc2UgMjI0OiBcbiAgICAgICAgICAgIHYua0NtZCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGlzQVNoaWZ0S2V5ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcblxuICAgIH0gICBcblxuICAgIGlmICghdi5yZXBvcnRVcCkge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmICghcmVwb3J0VXApXG4gICAgXG4gICAgZi5jS2V5VXBEb3duRmluaXNoIChpc0FTaGlmdEtleSwgd2hpY2gsIHYua2V5VXBIYW5kbGVyKTtcblxufTsgLy8gZW5kIGYuY0tleVVwIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5jS2V5VXBEb3duRmluaXNoID0gKGlzQVNoaWZ0S2V5LCB3aGljaCwgY2FsbGJhY2spID0+IHtcbiAgICBcbiAgICBpZiAoaXNBU2hpZnRLZXkgJiYgIXYucmVwb3J0U2hpZnQpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IC8vIGVuZCBpZiAoaXNBU2hpZnRLZXkgJiYgIXYucmVwb3J0U2hpZnQpXG4gICAgXG4gICAgdmFyIHRoaXNDaCA9IGYuZ2V0S2V5Q29kZSAod2hpY2gpO1xuXG4gICAgdmFyIGNoT2IgPSAoe1xuICAgICAgICBzaGlmdDogdi5rU2hpZnQsXG4gICAgICAgIGN0cmw6IHYua0N0cmwsXG4gICAgICAgIGFsdDogdi5rQWx0LFxuICAgICAgICBtYWNDbWQ6IHYua0NtZCxcbiAgICAgICAgd2hpY2g6IHdoaWNoLFxuICAgICAgICBjaDogdGhpc0NoLFxuICAgICAgICBpc0FTaGlmdEtleTogaXNBU2hpZnRLZXksXG4gICAgfSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyAoJ2NoT2I6ICcgKyBKU09OLnN0cmluZ2lmeSAoY2hPYikgKyAnXFxuJyk7XG4gICAgLypcbiAgICBpZiAodi5yZXBvcnRTaGlmdCkge1xuXG4gICAgICAgIGNoT2IuaXNBU2hpZnRLZXkgPSBpc0FTaGlmdEtleTsgIFxuICAgICAgICAgICAgLy8gdHJ1ZSBpZiBhbnkgb2Y6IHNoaWZ0LCBjdHJsLCBhbHQsIG9yIG1hY0NtZCBhcmUgdHJ1ZVxuICAgICAgICAgICAgLy8gb25seSByZWxldmFudCBpZiB2LnJlcG9ydFNoaWZ0IGlzIHRydWVcblxuICAgIH0gLy8gZW5kIGlmICh2LnJlcG9ydFNoaWZ0KVxuICAgICovXG5cbiAgICBjYWxsYmFjayAoY2hPYik7XG5cbn07IC8vIGVuZCBmLmNLZXlVcERvd25GaW5pc2ggXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZGVmYXVsdEhhbmRsZXIgPSAoY2hPYikgPT4ge1xuICAgIFxuICAgIHZhciBjaE9iUyA9IEpTT04uc3RyaW5naWZ5IChjaE9iKTtcbiAgICBjb25zb2xlLmxvZyAoJ2dvLWtleS5kZWZhdWx0SGFuZGxlci5jaE9iOiAnICsgY2hPYlMpO1xuXG59OyAvLyBlbmQgZi5kZWZhdWx0SGFuZGxlciBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmdldEtleUNvZGUgPSAod2hpY2gpID0+IHtcbiAgICBcblxuICAgIHZhciBjaDtcblxuICAgIGlmICh2LmN0cmxPck5vbkFzY2lpLmhhc093blByb3BlcnR5ICh3aGljaCkpIHtcblxuICAgICAgICBjaCA9IHYuY3RybE9yTm9uQXNjaWkgW3doaWNoXTtcblxuICAgIH0gZWxzZSBpZiAodi5rU2hpZnQgJiYgdi5hc2NpaVNoaWZ0ZWQuaGFzT3duUHJvcGVydHkgKHdoaWNoKSkge1xuXG4gICAgICAgIGNoID0gdi5hc2NpaVNoaWZ0ZWQgW3doaWNoXTtcblxuICAgIH0gZWxzZSBpZiAoIXYua1NoaWZ0ICYmIHYuYXNjaWlVblNoaWZ0ZWQuaGFzT3duUHJvcGVydHkgKHdoaWNoKSkge1xuXG4gICAgICAgIGNoID0gdi5hc2NpaVVuU2hpZnRlZCBbd2hpY2hdO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBjaCA9IG51bGw7XG5cbiAgICB9IC8vIGVuZCBpZiBcblxuICAgIHJldHVybiBjaDtcblxufTsgLy8gZW5kIGYuZ2V0S2V5Q29kZSBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmluaXRLZXlEb3duID0gKGpxU2VsZWN0b3IpID0+IHtcbiAgICBcbiAgICAkKGpxU2VsZWN0b3IpXG4gICAgLm9mZigna2V5ZG93bicpXG4gICAgLmtleWRvd24gKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nICgnID09PiBpbml0S2V5RG93bicpO1xuICAgICAgICBmLmNLZXlEb3duIChldmVudCk7XG4gICAgfSk7XG5cbn07IC8vIGVuZCBmLmluaXRLZXlEb3duIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmluaXRLZXlVcCA9IChqcVNlbGVjdG9yKSA9PiB7XG4gICAgXG4gICAgJChqcVNlbGVjdG9yKVxuICAgIC5vZmYoJ2tleXVwJylcbiAgICAua2V5dXAgKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nICgnID09PiBpbml0S2V5VXAnKTtcbiAgICAgICAgZi5jS2V5VXAgKGV2ZW50KTtcbiAgICB9KTtcblxufTsgLy8gZW5kIGYuaW5pdEtleVVwIFxuXG5cblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuYWxsS2V5c09mZiA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIga2V5RXZlbnRzID0gX20wLmtleUV2ZW50cztcbiAgICB2YXIga2V5U2VscyA9IE9iamVjdC5rZXlzIChrZXlFdmVudHMpO1xuXG4gICAga2V5U2Vscy5mb3JFYWNoIChmdW5jdGlvbiAoZWwpIHtcblxuICAgICAgICBrZXlFdmVudHMgW2VsXS5vZmYgKCk7XG4gICAgfSk7XG5cbn07IC8vIGVuZCBQLmFsbEtleXNPZmZcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5hbGxLZXlzT24gPSAoKSA9PiB7XG4gICAgXG4gICAgdmFyIGtleUV2ZW50cyA9IF9tMC5rZXlFdmVudHM7XG4gICAgdmFyIGtleVNlbHMgPSBPYmplY3Qua2V5cyAoa2V5RXZlbnRzKTtcblxuICAgIGtleVNlbHMuZm9yRWFjaCAoZnVuY3Rpb24gKGVsKSB7XG5cbiAgICAgICAga2V5RXZlbnRzIFtlbF0ub24gKCk7XG4gICAgfSk7XG5cbn07IC8vIGVuZCBQLmFsbEtleXNPblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnNldEtleU9mZiA9ICgpID0+IHtcbiAgICBcbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJ1NFVEtFWU9GRiBnby1rZXkuc2V0S2V5T2ZmICAgICBqcVNlbGVjdG9yID0gJyArIHYuanFTZWxlY3Rvcik7XG4gICAgJCh2LmpxU2VsZWN0b3IpXG4gICAgLm9mZiAoJ2tleWRvd24nKVxuICAgIC5vZmYgKCdrZXl1cCcpO1xuXG59OyAvLyBlbmQgUC5zZXRLZXlPZmZcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy9QLnNldEtleU9uID0gKGpxU2VsKSA9PiB7XG5QLnNldEtleU9uID0gKCkgPT4ge1xuICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nICgnU0VUS0VZT04gZ28ta2V5LnNldEtleU9uICAganFTZWxlY3RvciA9ICcgKyB2LmpxU2VsZWN0b3IpO1xuICAgIC8vZi5pbml0S2V5VXAgKGpxU2VsKTtcbiAgICAvL2YuaW5pdEtleURvd24gKGpxU2VsKTtcbiAgICBmLmluaXRLZXlVcCAodi5qcVNlbGVjdG9yKTtcbiAgICBmLmluaXRLZXlEb3duICh2LmpxU2VsZWN0b3IpO1xuXG59OyAvLyBlbmQgUC5zZXRLZXlIYW5kbGVyXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5mLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuIiwiLy8gZ28tbXNnL2luZGV4LmpzXG4vLyBnby1tc2cgb2JqZWN0IGhhcyBhIHVuaXF1ZSBwcmltYXJ5IG1zZyBhbmQgemVybyBvciBtb3JlIG9wdGlvbmFsIGF0dHJpYnV0ZXNcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwMCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzXG52YXIgdiA9IHtcblxuICAgIHByaW1hcnk6IG51bGwsXG4gICAgICAgIC8vIHByaW1hcnk6IHtjbWQ6IDF9IChjb250YWlucyBvcHRpb25hbCBjb250ZW50KSBvciB7Y21kOiAwfSAobm8gb3B0aW9uYWwgY29udGVudCBhbGxvd2VkKVxuXG4gICAgc2Vjb25kYXJ5OiBudWxsLFxuICAgICAgICAvLyBpZiBhIHByaW1hcnkgbWVzc2FnZSBoYXMgYW4gb3B0aW9uYWwgYXR0cmlidXRlIHRoYXQgY29uY2lkZW50YWxseSBpcyB0aGUgc2FtZSBhc1xuICAgICAgICAvLyBhbm90aGVyIHByaW1hcnkgbWVzc2FnZSwgaXQgc2hvdWxkIGJlIGhhdmUgYSBrZXkvdmFsdWUgcGFpciBpbiBzZWNvbmRhcnkge2F0dHI6IDF9XG4gICAgICAgIC8vIHRvIGVuc3VyZSB0aGF0IGl0IHdpbGwgYmUgdHJlYXRlZCBhcyBhbiBhdHRyaWJ1dGUgaW4gY2FzZSBhIHByaW1hcnkgaXMgcHJlc2VudFxuICAgICAgICAvLyBTZWNvbmRhcnkgaXMgb25seSB0ZXN0ZWQgaWYgdGhlcmUgZXhpc3RzIGEgcHJpbWFyeSBrZXlcblxuICAgIG1ldGE6IG51bGwsXG4gICAgICAgIC8vIG1ldGEgcGFyYW1ldGVycyBpbnRlbmRlZCBmb3IgY3RybCBvciBvdGhlciBwdXJwb3NlIG91dHNpZGUgb2YgcHJpbWFyeSBhbmQgc2Vjb25kYXJ5IG1zZ1xuICAgICAgICAvLyBwYXJhbWV0ZXIgdXNhZ2VcblxufTsgIC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxuICAgIC8vIFBSSVZBVEUgRnVuY3Rpb25zXG5mID0ge307XG5cblxuZi5pbml0ID0gKCkgPT4ge1xuXG4gICAgdi5wcmltYXJ5ID0gcDAucHJpbWFyeTtcbiAgICB2LnNlY29uZGFyeSA9IHAwLmhhc093blByb3BlcnR5ICgnc2Vjb25kYXJ5JykgPyBwMC5zZWNvbmRhcnkgOiB7fTtcbiAgICB2Lm1ldGEgPSBwMC5oYXNPd25Qcm9wZXJ0eSAoJ21ldGEnKSA/IHAwLm1ldGEgOiB7fTtcbn07XG5cbiAgICAvLyBQVUJMSUMgRnVuY3Rpb25zXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5wYXJzZU1zZyA9IChtc2dPYikgPT4ge1xuICAgIFxuICAgIHZhciByZXMgPSB7fTtcbiAgICB2YXIgbXNnS2V5cyA9IE9iamVjdC5rZXlzIChtc2dPYik7XG5cbiAgICB2YXIgcHJpbWFyeUNhbmRpZGF0ZXNPYiA9IHt9O1xuICAgIHZhciBhdHRyc09iID0ge307XG4gICAgdmFyIG1ldGFPYiA9IHt9O1xuXG4gICAgdmFyIGtleTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZ0tleXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBrZXkgPSBtc2dLZXlzIFtpXTtcbiAgICAgICAgXG4gICAgICAgIGlmICh2LnByaW1hcnkuaGFzT3duUHJvcGVydHkgKGtleSkpIHtcblxuICAgICAgICAgICAgcHJpbWFyeUNhbmRpZGF0ZXNPYiBba2V5XSA9IDE7XG5cbiAgICAgICAgfSBlbHNlIGlmICh2Lm1ldGEuaGFzT3duUHJvcGVydHkgKGtleSkpIHtcblxuICAgICAgICAgICAgbWV0YU9iIFtrZXldID0gbXNnT2IgW2tleV07XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgYXR0cnNPYiBba2V5XSA9IG1zZ09iIFtrZXldO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmICh2LnByaW1hcnkuaGFzT3duUHJvcGVydHkgKGtleSkpXG4gICAgICAgIFxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnS2V5cy5sZW5ndGg7IGkrKylcblxuICAgIHZhciBwcmltYXJ5Q2FuZGlkYXRlc0EgPSBPYmplY3Qua2V5cyAocHJpbWFyeUNhbmRpZGF0ZXNPYik7XG5cbiAgICB2YXIgcHJpbWFyeUtleTtcbiAgICB2YXIgY29udGVudDtcblxuICAgIGlmIChwcmltYXJ5Q2FuZGlkYXRlc0EubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgcHJpbWFyeUtleSA9IG51bGw7XG5cbiAgICB9IGVsc2UgaWYgKHByaW1hcnlDYW5kaWRhdGVzQS5sZW5ndGggPT09IDEpIHtcblxuICAgICAgICBwcmltYXJ5S2V5ID0gcHJpbWFyeUNhbmRpZGF0ZXNBIFswXTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGhhbmRsZSBwcmltYXJ5L3NlY29uZGFyeSBrZXkgcmVzb2x1dGlvblxuXG4gICAgICAgIHByaW1hcnlLZXkgPSBudWxsO1xuICAgICAgICBmb3IgKGtleSBpbiBwcmltYXJ5Q2FuZGlkYXRlc09iKSB7XG5cbiAgICAgICAgICAgIGlmICh2LnNlY29uZGFyeS5oYXNPd25Qcm9wZXJ0eSAoa2V5KSkge1xuXG4gICAgICAgICAgICAgICAgYXR0cnNPYiBba2V5XSA9IG1zZ09iIFtrZXldO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKHByaW1hcnlLZXkgPT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5S2V5ID0ga2V5O1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICByZXMuZXJyID0gJ011bHRpcGxlIHByaW1hcnkga2V5cyBmb3VuZCBub3QgaW4gc2Vjb25kYXJ5IG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5IChtc2cpO1xuXG4gICAgICAgICAgICAgICAgfSAvLyBlbmQgaWYgKHByaW1hcnlLZXkgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmICh2LnNlY29uZGFyeS5oYXNPd25Qcm9wZXJ0eSAoa2V5KSlcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9IC8vIGVuZCBpZiAocHJpbWFyeUNhbmRpZGF0ZXNBLmxlbmd0aCA9PT0gMClcblxuXG4gICAgaWYgKCFyZXMuaGFzT3duUHJvcGVydHkgKCdlcnInKSkge1xuXG4gICAgICAgIHJlcy5wID0gcHJpbWFyeUtleTtcbiAgICAgICAgcmVzLmMgPSBwcmltYXJ5S2V5ICYmIHYucHJpbWFyeSBbcHJpbWFyeUtleV0gIT09IDAgPyBtc2dPYiBbcHJpbWFyeUtleV0gOiBudWxsO1xuICAgICAgICAgICAgLy8gZXhhbXBsZSB2b2lkIGh0bWwgdGFnIGhhcyB6ZXJvIGNvbnRlbnQsIHNvIGNvbnRlbnQgaXMgZm9yY2VkIHRvIG51bGxcblxuICAgICAgICByZXMucyA9IGF0dHJzT2I7XG4gICAgICAgIHJlcy5tID0gbWV0YU9iO1xuXG4gICAgfSAvLyBlbmQgaWYgKCFyZXMuaGFzT3duUHJvcGVydHkgKCdlcnInKSlcbiAgICBcbiAgICBcbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5wYXJzZU1zZyBcblxuXG5cbiAgICAvLyBlbmQgUFVCTElDIEZ1bmN0aW9uc1xuXG5mLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuXG5cblxuIiwiLy8gZ28tcG9waW5mby9pbmRleC5qc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkcCkge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIF8gPSB7XG4gICAgZHBwOiBkcC5kaXNwbGF5UGFnZSxcbiAgICBnZW5JZDogZHAuZ2VuSWQsXG4gICAgYXJyb3dTaXplOiAxMCxcblxufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG5fLmluaXQgPSAoKSA9PiB7XG5cbiAgICBfLnNldFBvcHVwU3R5bGUgKCk7XG59O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5nZXRQb3NEaW0gPSAoanEpID0+IHtcbiAgICBcbiAgICB2YXIgcmVzID0ge307XG5cbiAgICB2YXIgb2Zmc2V0ID0gJChqcSkub2Zmc2V0ICgpO1xuICAgIHJlcy5sZWZ0ID0gb2Zmc2V0LmxlZnQ7XG4gICAgcmVzLnRvcCA9IG9mZnNldC50b3A7XG5cbiAgICByZXMud2lkdGggPSAkKGpxKS53aWR0aCAoKTtcbiAgICByZXMuaGVpZ2h0ID0gJChqcSkuaGVpZ2h0ICgpO1xuXG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIF8uZ2V0UG9zRGltIFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXy5zZXRQb3B1cFN0eWxlID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBhcyA9IF8uYXJyb3dTaXplO1xuXG4gICAgdmFyIHBvcHVwU3R5bGUgPSBbXG4gICAgICAgIHtybTogJyNzdHlsZXBvcGluZm8nfSxcbiAgICAgICAge3N0eWxlOiAnLnBvcHVwIHsnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiByZWxhdGl2ZTsnICtcbiAgICAgICAgJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnICtcbiAgICAgICAgJ2JvcmRlcjogMXB4IHNvbGlkIGJsdWU7JyArXG4gICAgICAgICdib3JkZXItcmFkaXVzOiA0cHg7JyArXG4gICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yOiAjZWJmMmYyOycgK1xuICAgICAgICAnZm9udC1zaXplOiAxMnB4OycgK1xuICAgICd9JyArXG4gICAgJy5wb3B1cHdyYXAgeycgK1xuICAgICAgICAncG9zaXRpb246IGFic29sdXRlOycgK1xuICAgICd9JyArXG4gICAgJy5wb3B1cG5vdmlzIHsnICtcbiAgICAgICAgJ2Rpc3BsYXk6IG5vbmU7JyArXG4gICAgJ30nICtcbiAgICAnLmFycm93IHsnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsnICtcbiAgICAgICAgJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnICtcbiAgICAgICAgJ3dpZHRoOiAwOycgK1xuICAgICAgICAnaGVpZ2h0OiAwOycgK1xuICAgICAgICAnYm9yZGVyLXN0eWxlOiBzb2xpZDsnICtcbiAgICAgICAgJ2JveC1zaXppbmc6IGJvcmRlci1ib3g7JyArXG4gICAgJ30nICtcbiAgICAnLmFycm93Ym9yZGVyIHsnICtcbiAgICAgICAgJ2JvcmRlci13aWR0aDogJyArIChhcyAtIDEpICsgJ3B4OycgK1xuICAgICAgICAnYm9yZGVyLWNvbG9yOiBibHVlIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50OycgK1xuICAgICAgICAnYm90dG9tOiAtJyArICgyKmFzIC0gMikgKyAncHg7JyArXG4gICAgJ30nICtcbiAgICAnLmFycm93ZmlsbGVyIHsnICtcbiAgICAgICAgJ2JvcmRlci13aWR0aDogJysgKGFzIC0gMikgKyAncHg7JyArXG4gICAgICAgICdib3JkZXItY29sb3I6ICNlYmYyZjIgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7JyArXG4gICAgICAgICdib3R0b206IC0nICsgKDIqYXMgLSA0KSArICdweDsnICtcbiAgICAgICAgJ3otaW5kZXg6IDE7JyArXG4gICAgJ30nLCBcbiAgICBpZDogJ3N0eWxlcG9waW5mbycsIHBhcmVudDogJ2hlYWQnfVxuICAgIF07XG5cbiAgICBfLmRwcCAocG9wdXBTdHlsZSk7XG5cbn07IC8vIGVuZCBfLnNldFBvcHVwU3R5bGVcblxuXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5jcmVhdGVQb3B1cERpc3BsYXkgPSAoanFPYkluLCBkaXNwc3RyLCBvcHRpb25zKSA9PiB7XG4gICAgXG4gICAganFPYiA9IHR5cGVvZiBqcU9iSW4gPT09ICdzdHJpbmcnID8gJChqcU9iSW4pIDoganFPYkluO1xuICAgIElkanFPYiA9ICcjJyArIGpxT2IgWzBdLmlkO1xuXG4gICAgZGlzcFN0cnMgPSBkaXNwc3RyLnNwbGl0ICgnXFxuJyk7XG5cbiAgICB2YXIgZGlzcEEgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BTdHJzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIGRpc3BTdHIgPSBkaXNwU3RycyBbaV07XG4gICAgICAgIGlmIChpID4gMCkge1xuXG4gICAgICAgICAgICBkaXNwQS5wdXNoICh7YnI6MH0pO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChpID4gMClcbiAgICAgICAgXG4gICAgICAgIGRpc3BBLnB1c2ggKHtzcGFuOiBkaXNwU3RyLCBzdHlsZTogJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnfSk7XG5cblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcFN0cnM7IGkrKylcbiAgICBcbiAgICB2YXIgZGlzcE9iID0ge2RpdjogZGlzcEEsIHN0eWxlOiAnbWFyZ2luOiAycHg7J307XG4gICAgdmFyIHBvc0VsID0gXy5nZXRQb3NEaW0gKGpxT2IpO1xuXG4gICAgICAgIC8vIGZvcmNlcyBkaXYgd2lkdGggdG8gd2lkdGggb2YgY29udGVudFxuICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ1MDkwMy9ob3ctdG8tbWFrZS1kaXYtbm90LWxhcmdlci10aGFuLWl0cy1jb250ZW50c1xuXG4gICAgdmFyIGlkQWIgPSBfLmdlbklkICgpO1xuICAgIHZhciBpZEFmID0gXy5nZW5JZCAoKTtcblxuICAgIHZhciBkaXZBcnJvd0JvcmRlciA9IHtkaXY6IDAsIGlkOiBpZEFiLCBjbGFzczogJ2Fycm93IGFycm93Ym9yZGVyJ307XG4gICAgdmFyIGRpdkFycm93RmlsbGVyID0ge2RpdjogMCwgaWQ6IGlkQWYsIGNsYXNzOiAnYXJyb3cgYXJyb3dmaWxsZXInfTtcblxuICAgIGlkQWIgPSAnIycgKyBpZEFiO1xuICAgIGlkQWYgPSAnIycgKyBpZEFmO1xuXG4gICAgLy92YXIgcG9wT2IgPSB7ZGl2OiBbZGlzcE9iLCBkaXZBcnJvd0JvcmRlciwgZGl2QXJyb3dGaWxsZXJdLCBjbGFzczogJ3BvcHVwJywgYWZ0ZXI6IElkanFPYn07XG4gICAgdmFyIHBvcE9iUmVsID0ge2RpdjogW2Rpc3BPYiwgZGl2QXJyb3dCb3JkZXIsIGRpdkFycm93RmlsbGVyXSwgY2xhc3M6ICdwb3B1cCd9O1xuICAgIHZhciBwb3BPYiA9IHtkaXY6IHBvcE9iUmVsLCBjbGFzczogJ3BvcHVwd3JhcCd9O1xuICAgIHZhciBJZFBvcE9iID0gXy5kcHAgKHBvcE9iKTtcbiAgICB2YXIgcG9zUG9wdXAgPSBfLmdldFBvc0RpbSAoSWRQb3BPYik7XG5cbiAgICB2YXIgdG9wRE8gPSBwb3NFbC50b3AgLSBwb3NQb3B1cC5oZWlnaHQgLSBfLmFycm93U2l6ZTtcbiAgICB2YXIgbGVmdERPID0gcG9zRWwubGVmdCArIHBvc0VsLndpZHRoLzIgLSBwb3NQb3B1cC53aWR0aC8yO1xuXG4gICAgJChJZFBvcE9iKVxuICAgIC5vZmZzZXQgKHt0b3A6IHRvcERPLCBsZWZ0OiBsZWZ0RE99KTtcblxuICAgIHZhciBwb3NBYiA9IF8uZ2V0UG9zRGltIChpZEFiKTtcbiAgICB2YXIgcG9zQWYgPSBfLmdldFBvc0RpbSAoaWRBZik7XG5cbiAgICB2YXIgYXMgPSBfLmFycm93U2l6ZTtcbiAgICAkKGlkQWIpXG4gICAgLm9mZnNldCAoe3RvcDogcG9zQWIudG9wLCBsZWZ0OiBsZWZ0RE8gKyBwb3NQb3B1cC53aWR0aC8yIC0gYXMvMiAtIDJ9KTtcblxuICAgICQoaWRBZilcbiAgICAub2Zmc2V0ICh7dG9wOiBwb3NBZi50b3AsIGxlZnQ6IGxlZnRETyArIHBvc1BvcHVwLndpZHRoLzIgKyAxIC0gYXMvMiAtIDJ9KTtcblxuICAgICQoSWRQb3BPYilcbiAgICAuYWRkQ2xhc3MgKCdwb3B1cG5vdmlzJyk7XG5cbiAgICByZXR1cm4gSWRQb3BPYjtcbn07IC8vIGVuZCBQLmNyZWF0ZVBvcHVwRGlzcGxheSBcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuaGlkZVBvcHVwcyA9IChJZCkgPT4ge1xuICAgIFxuICAgIHZhciBzZWwgPSBJZCA/IElkIDogJy5wb3B1cHdyYXAnO1xuXG4gICAgJChzZWwpXG4gICAgLmFkZENsYXNzICgncG9wdXBub3ZpcycpO1xuXG5cbn07IC8vIGVuZCBQLmhpZGVQb3B1cHNcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5zaG93UG9wdXBzID0gKElkKSA9PiB7XG4gICAgXG4gICAgdmFyIHNlbCA9IElkID8gSWQgOiAnLnBvcHVwd3JhcCc7XG5cbiAgICAkKHNlbClcbiAgICAucmVtb3ZlQ2xhc3MgKCdwb3B1cG5vdmlzJyk7XG5cblxufTsgLy8gZW5kIFAuc2hvd1BvcHVwc1xuXG5cblxuXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5fLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuXG5cblxuXG4iLCIvLyBnby11dGlsL2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgdiA9IHtcblxuICAgIGtleTE6IHJlcXVpcmUgKCdrZXkxJylcblxufTsgIC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbnZhciBmPXt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kZHNEb0l0ID0gKG9iLCB0b1VuaWNvZGUpID0+IHtcbiAgICAvLyBvYiBpcyBhcnJheSA9PiByZXR1cm5zIHNhbWUgb2JcbiAgICAvLyBvYiBpcyBvYmplY3QgPT4gcmV0dXJucyBuZXcgb2JcbiAgICBcbiAgICB2YXIgcmVzO1xuXG4gICAgdmFyIGRvUmVwbGFjZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIG5ld0tleTtcblxuICAgICAgICBpZiAodG9Vbmljb2RlKSB7XG5cbiAgICAgICAgICAgIG5ld0tleSA9IGtleS5yZXBsYWNlICgvXFwkL2csICdcXFxcdUZGMDQnKTtcbiAgICAgICAgICAgIG5ld0tleSA9IG5ld0tleS5yZXBsYWNlICgvXFwuL2csICdcXFxcdUZGMEUnKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBuZXdLZXkgPSBrZXkucmVwbGFjZSAoL1xcXFx1RkYwNC9nLCAnJCcpO1xuICAgICAgICAgICAgbmV3S2V5ID0gbmV3S2V5LnJlcGxhY2UgKC9cXFxcdUZGMEUvZywgJy4nKTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAodG9Vbmljb2RlKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ld0tleTtcbiAgICB9O1xuXG4gICAgaWYgKG9iICE9PSBudWxsICYmIHR5cGVvZiBvYiA9PT0gJ29iamVjdCcgJiYgIShvYi5oYXNPd25Qcm9wZXJ0eSAoJ19ic29udHlwZScpICYmIG9iLl9ic29udHlwZSA9PT0gJ09iamVjdElEJykpIHtcblxuICAgICAgICB2YXIgaTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSkge1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2IubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIG9iIFtpXSA9IGYuZGRzRG9JdCAob2IgW2ldLCB0b1VuaWNvZGUpO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IG9iLmxlbmd0aDsgaSsrKVxuXG4gICAgICAgICAgICByZXMgPSBvYjtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXMgPSB7fTtcblxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyAob2IpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzIFtpXTtcblxuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBvYltrZXldO1xuICAgIFxuICAgICAgICAgICAgICAgIHZhciBuZXdLZXkgPSBkb1JlcGxhY2UgKGtleSk7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzIFtuZXdLZXldID0gZi5kZHNEb0l0ICh2YWwsIHRvVW5pY29kZSk7XG4gICAgXG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwga2V5czsgaSsrKVxuICAgICAgICAgICAgXG4gICAgICAgIH0gLy8gZW5kIGlmIChBcnJheS5pc0FycmF5IChvYikpXG4gICAgICAgIFxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmVzID0gb2I7XG5cbiAgICB9IC8vIGVuZCBpZiAob2IgPT09IG51bGwgfHwgdHlwZW9mIG9iICE9PSAnb2JqZWN0JylcblxuXG4gICAgcmV0dXJuIHJlcztcblxufTsgIC8vIGVuZCBmLmRkc0RvSXQgXG5cblxuICAgIC8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuYXJUb09iID0gKGFyKSA9PiB7XG4gICAgXG4gICAgdmFyIG9iID0ge307XG4gICAgXG4gICAgaWYgKEFycmF5LmlzQXJyYXkgKGFyKSkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXIubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgdmFyIG5hbWUgPSBhciBbaV07XG4gICAgICAgICAgICBvYiBbbmFtZV0gPSBpO1xuXG4gICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgYXIubGVuZ3RoOyBpKyspXG5cbiAgICB9IC8vIGVuZCBpZiAoQXJyYXkuaXNBcnJheSAoYXIpKVxuICAgIHJldHVybiBvYjtcblxufTsgLy8gZW5kIFAuYXJUb09iIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmNsb25lT2IgPSAob2IpID0+IHtcbiAgICAvLyBhc3N1bWVzIG5vIHZhbHVlcyB0aGF0IGFyZSBmdW5jdGlvbiB0eXBlc1xuICAgIFxuICAgIHJldHVybiBKU09OLnBhcnNlIChKU09OLnN0cmluZ2lmeSAob2IpKTtcblxufTsgLy8gZW5kIFAuY2xvbmVPYiBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5jb25zdFN0ciA9IChjaCwgbGVuZ3RoKSA9PiB7XG4gICAgXG4gICAgdmFyIHJlcyA9IG5ldyBBcnJheSAobGVuZ3RoICsgMSkuam9pbiAoY2gpO1xuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBjb25zdFN0ciBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kb2xsYXJEb3RTdWJVbmljb2RlID0gKG9iKSA9PiB7XG4gICAgXG4gICAgcmV0dXJuIGYuZGRzRG9JdCAob2IsIHRydWUpO1xuXG59OyAgLy8gZW5kIGRvbGxhckRvdFN1YlVuaWNvZGUgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZG9sbGFyRG90U3ViVW5pY29kZVJlc3RvcmUgPSAob2IpID0+IHtcbiAgICBcbiAgICByZXR1cm4gZi5kZHNEb0l0IChvYiwgZmFsc2UpO1xuXG59OyAgLy8gZW5kIGRvbGxhckRvdFN1YlVuaWNvZGVSZXN0b3JlXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZHVtcE9iID0gKG9iLCBkZXB0aCkgPT4ge1xuICAgIFxuICAgIGRlcHRoID0gZGVwdGggPyBkZXB0aCA6IDA7XG5cbiAgICB2YXIgaW5kZW50Q3VyO1xuICAgIHZhciBpbmRlbnREZWx0YTtcbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgZHVtcE9iSW5pdCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGluZGVudEN1ciA9IDA7XG4gICAgICAgIGluZGVudERlbHRhID0gNDtcbiAgICBcbiAgICB9OyAvLyBlbmQgZHVtcE9iSW5pdFxuICAgIFxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgZGVjckluZGVudCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGluZGVudEN1ciAtPSBpbmRlbnREZWx0YTtcbiAgICBcbiAgICB9OyAvLyBlbmQgZGVjckluZGVudFxuICAgIFxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIGluY3JJbmRlbnQgPSAoKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBpbmRlbnRDdXIgKz0gaW5kZW50RGVsdGE7XG4gICAgXG4gICAgfTsgLy8gZW5kIGluY3JJbmRlbnRcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBkb0luZGVudCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBcIiBcIi5yZXBlYXQgKGluZGVudEN1cik7XG4gICAgXG4gICAgfTsgLy8gZW5kIGRvSW5kZW50XG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgdG9wS2V5ID0gKCkgPT4ge1xuICAgIFxuICAgICAgICB2YXIgcmVzID0gXCJcIjtcbiAgICAgICAgdmFyIHN0YXJ0STtcblxuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPD0gZGVwdGgpIHtcblxuICAgICAgICAgICAgc3RhcnRJID0gMDtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBzdGFydEkgPSBrZXlzLmxlbmd0aCAtIGRlcHRoO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChrZXlzLmxlbmd0aCA8PSBkZXB0aClcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRJOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICByZXMgKz0ga2V5cyBbaV07XG4gICAgICAgICAgICByZXMgKz0gaSA9PT0ga2V5cy5sZW5ndGggLSAxID8gXCJcIiA6IFwiLlwiO1xuXG4gICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXM7XG5cbiAgICB9OyAvLyBlbmQgdG9wS2V5XG5cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIGR1bXBLZXlQYWlyID0gKG9iLCBrZXkpID0+IHtcbiAgICBcbiAgICAgICAgdmFyIHByZWZpeCA9IHRvcEtleSAoKTtcblxuICAgICAgICB2YXIgcmVzID0gZG9JbmRlbnQgKCk7XG4gICAgICAgIHZhciB2YWwgPSBvYiBba2V5XTtcblxuICAgICAgICBrZXlzLnB1c2ggKGtleSk7XG4gICAgICAgIHJlcyArPSBwcmVmaXggIT09IFwiXCIgPyBwcmVmaXggKyAnLicgOiBcIlwiO1xuICAgICAgICByZXMgKz0ga2V5ICsgJzogJztcblxuICAgICAgICBpZiAoa2V5ID09PSAnX2lkJyAmJiBQLmlzT2IgKHZhbCkgJiYgdmFsLmhhc093blByb3BlcnR5ICgnX2Jzb250eXBlJykgJiYgdmFsLl9ic29udHlwZSA9PT0gJ09iamVjdElEJykge1xuXG4gICAgICAgICAgICByZXMgKz0gJ09iamVjdElkKFwiJyArIHZhbCArICdcIiknO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJlcyArPSBkdW1wT2JIICh2YWwpO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChrZXkgPT09ICdfaWQnICYmIFAuaXNPYiAodmFsKSAmJiB2YWwuaGFzT3duUHJvcGVydHkgKCdfYnNvbnR5cGUnKSAmJiB2YWwuX2Jzb250eXBlID09PSAnT2JqZWN0SUQnKVxuICAgICAgICBcbiAgICAgICAga2V5cy5wb3AgKCk7XG5cbiAgICAgICAgcmVzICs9IFwiXFxuXCI7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcblxuICAgIH07IC8vIGVuZCBkdW1wS2V5UGFpciBcblxuICAgIFxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgZHVtcE9iSCA9IChvYikgPT4ge1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgaWYgKHR5cGVvZiBvYiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9ICd1bmRlZmluZWQnO1xuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKG9iID09PSBudWxsKSB7XG4gICAgXG4gICAgICAgICAgICByZXMgPSAnbnVsbCc7XG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iID09PSAnYm9vbGVhbicpIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9IG9iID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2IgPT09ICdudW1iZXInKSB7XG4gICAgXG4gICAgICAgICAgICByZXMgPSBcIlwiICsgb2I7XG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iID09PSAnc3RyaW5nJykge1xuICAgIFxuICAgICAgICAgICAgaWYgKCFvYi5tYXRjaCAoLycvKSkge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9IFwiJ1wiICsgb2IgKyBcIidcIjtcbiAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9iLm1hdGNoICgvXCIvKSkge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9ICdcIicgKyBvYiArICdcIic7XG4gICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9ICdcIicgKyBvYi5yZXBsYWNlICgvXCIvLCAnXFxcXFwiJykgKyAnXCInO1xuICAgIFxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKCFvYi5tYXRjaCAoLycvKSlcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSkge1xuICAgIFxuICAgICAgICAgICAgaWYgKG9iLmxlbmd0aCA9PT0gMCkge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9ICdbXSc7XG4gICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9IFwiW1xcblwiO1xuICAgICAgICAgICAgICAgIGluY3JJbmRlbnQgKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYi5sZW5ndGg7IGkrKykge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gZHVtcEtleVBhaXIgKG9iLCBpKTtcbiAgICBcbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IG9iLmxlbmd0aDsgaSsrKVxuICAgIFxuICAgICAgICAgICAgICAgIGRlY3JJbmRlbnQgKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzICs9IGRvSW5kZW50ICgpO1xuICAgICAgICAgICAgICAgIHJlcyArPSBcIl1cIiA7XG4gICAgXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAob2IubGVuZ3RoID09PSAwKVxuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYiA9PT0gJ29iamVjdCcpIHtcbiAgICBcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMgKG9iKS5zb3J0ICgpO1xuICAgIFxuICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXMgPSBcInt9XCI7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXMgPSBcIntcXG5cIjtcbiAgICAgICAgICAgICAgICBpbmNySW5kZW50ICgpO1xuICAgIFxuICAgICAgICAgICAgICAgIGtleXMuZm9yRWFjaCAoZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPSBkdW1wS2V5UGFpciAob2IsIGtleSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZGVjckluZGVudCAoKTtcbiAgICAgICAgICAgICAgICByZXMgKz0gZG9JbmRlbnQgKCk7XG4gICAgICAgICAgICAgICAgcmVzICs9IFwifVwiO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAoa2V5cy5sZW5ndGggPT09IDApXG4gICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICByZXMgPSAndW5rbm93bjogJyArIHR5cGVvZiBvYjtcbiAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKHR5cGVvZiBvYiA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIFxuICAgIH07IC8vIGVuZCBkdW1wT2JIXG4gICAgXG4gICAgZHVtcE9iSW5pdCAoKTtcbiAgICByZXR1cm4gZHVtcE9iSCAob2IpO1xuXG59OyAvLyBlbmQgUC5kdW1wT2IgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5pc0VtcHR5ID0gKGl0ZW0pID0+IHtcbiAgICBcbiAgICB2YXIgcmVzID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiBpdGVtKSB7XG5cbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcblxuICAgICAgICAgICAgcmVzID0gaXRlbS5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd1bmRlZmluZWQnOlxuXG4gICAgICAgICAgICByZXMgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcblxuICAgICAgICAgICAgaWYgKFAuaXNPYiAoaXRlbSkpIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMgKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHJlcyA9IGtleXMubGVuZ3RoID09PSAwO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IHRydWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSAoaXRlbSkpIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IGl0ZW0ubGVuZ3RoID09PSAwO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmVzID0gbnVsbDsgIC8vIGNhc2Ugc2hvdWxkbid0IGhhcHBlbiwgc28gc2V0IHRvIG51bGwgaWYgaXQgZG9lc1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAoUC5pc09iIChpdGVtKSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG5cbiAgICAgICAgICAgIHJlcyA9ICFpdGVtO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcblxuICAgICAgICAgICAgcmVzID0gbnVtYmVyID09PSAwO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICB9IC8vIGVuZCBzd2l0Y2ggKHR5cGVvZiBpdGVtKVxuICAgIFxuXG4gICAgcmV0dXJuIHJlcztcbn07IC8vIGVuZCBQLmlzRW1wdHkgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuaXNPYiA9IChvYikgPT4ge1xuICAgIC8vIHJldHVybnMgdHJ1ZSBpZiBvYiBpcyBkZWZpbmVkLCBub3QgbnVsbCwgbm90IGFuIEFycmF5IGFuZCBvZiB0eXBlIG9iamVjdFxuICAgIFxuICAgIHZhciByZXMgPSB0eXBlb2Ygb2IgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICBvYiAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheSAob2IpICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBvYiA9PT0gJ29iamVjdCc7XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5pc09iIFxuXG5cblAua2V5MSA9IHYua2V5MTtcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5wYXJzZVBhdGggPSAoYWJzUGF0aCkgPT4ge1xuICAgIFxuICAgIHZhciBkaXI7XG4gICAgdmFyIGZpbGU7XG5cbiAgICB2YXIgbWF0Y2hlZCA9IGFic1BhdGgubWF0Y2ggKC8oLipcXC8pKFteXFwvXSopLyk7XG4gICAgaWYgKG1hdGNoZWQpIHtcblxuICAgICAgICBkaXIgPSBtYXRjaGVkIFsxXTtcbiAgICAgICAgZmlsZSA9IG1hdGNoZWQgWzJdO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBkaXIgPSBcIlwiOyBcbiAgICAgICAgZmlsZSA9IGFic1BhdGg7XG5cbiAgICB9IC8vIGVuZCBpZiAobWF0Y2hlZClcbiAgICBcbiAgICByZXR1cm4ge2RpcjogZGlyLCBmaWxlOiBmaWxlfTtcblxufTsgLy8gZW5kIFAucGFyc2VQYXRoIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnBDaGVjayA9IChwLCBwRGVmYXVsdCkgPT4ge1xuICAgIC8vIGRpdGNoZXMgYW55IHBhcmFtZXRlcnMgc3VwcGxpZWQgaW4gcCB0aGF0IGFyZW4ndCBwcmVzZW50IGluIHBEZWZhdWx0XG4gICAgLy8gaWYgYSBwYXJhbSBpcyBuZWNlc3NhcnkgdG8gYSByb3V0aW5lLCB0aGVuIGl0IHNob3VsZCBiZSBkZWZpbmVkIGluIHBEZWZhdWx0XG4gICAgXG4gICAgdmFyIHJlcyA9IHt9O1xuXG4gICAgcCA9IFAuaXNPYiAocCkgPyBwIDoge307XG4gICAgXG4gICAgZm9yICh2YXIga2V5IGluIHBEZWZhdWx0KSB7XG5cbiAgICAgICAgcmVzIFtrZXldID0gcC5oYXNPd25Qcm9wZXJ0eSAoa2V5KSA/IHAgW2tleV0gOiBwRGVmYXVsdCBba2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5wQ2hlY2sgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuc3RyaXBRSiA9IChqc29uU3RyKSA9PiB7XG4gICAgXG4gICAgdmFyIHJlcyA9IGpzb25TdHIucmVwbGFjZSAoL1wiKFteXCJdKylcIlxccyo6L2csIFwiJDE6XCIpO1xuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLnN0cmlwUUogXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAudHJhdmVyc2VBcnJheSA9IChhcnIsIGZuRWwpID0+IHtcbiAgICBcbiAgICBpZiAoQXJyYXkuaXNBcnJheSAoYXJyKSkge1xuXG4gICAgICAgIGFyci5mb3JFYWNoIChmdW5jdGlvbiAoZWwpIHtcblxuICAgICAgICAgICAgUC50cmF2ZXJzZUFycmF5IChlbCwgZm5FbCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlmIChQLmlzT2IgKGFycikpIHtcblxuICAgICAgICAgICAgdmFyIHZhbCA9IFAudmFsMSAoYXJyKTtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkgKHZhbCkpIHtcblxuICAgICAgICAgICAgICAgIFAudHJhdmVyc2VBcnJheSAodmFsLCBmbkVsKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGZuRWwgKGFycik7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmIChBcnJheS5pc0FycmF5ICh2YWwpKVxuICAgICAgICAgICAgXG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgZm5FbCAoYXJyKTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoUC5pc09iIChhcnIpKVxuXG4gICAgfSAvLyBlbmQgaWYgKEFycmF5LmlzQXJyYXkgKGFycikpXG4gICAgXG5cbn07IC8vIGVuZCBQLnRyYXZlcnNlQXJyYXkgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAudmFsMSA9IChvYikgPT4ge1xuICAgIFxuICAgIHZhciBrZXkxID0gUC5rZXkxIChvYik7XG4gICAgdmFyIHJlcyA9IGtleTEgPyBvYiBba2V5MV0gOiBudWxsO1xuXG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIFAudmFsMSBcblxuXG5cbiAgICAvLyBlbmQgUFVCTElDIHNlY3Rpb25cblxucmV0dXJuIFA7XG5cbn0oKSk7XG5cblxuXG4iLCIvLyBnby13cy1jbGllbnQvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXAsIHBvcnQsIGNsaWVudCwgb3B0aW9ucykge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG4gICAgXG4gICAgaXA6IGlwLFxuICAgIHBvcnQ6IHBvcnQsXG4gICAgc2VjdXJlQ29ubmVjdGlvbjogbnVsbCxcblxuICAgIHV0OiByZXF1aXJlICgnZ28tdXRpbCcpLFxuICAgIG1pbnNlYzogcmVxdWlyZSAoJ21pbnNlYycpLmdldE1pblNlYyxcbiAgICBtc2dTaG9ydGVuMDogcmVxdWlyZSAoJ21zZ3Nob3J0ZW4nKSxcbiAgICBtc2dTaDogbnVsbCxcbiAgICBwY2hlY2s6IG51bGwsXG4gICAga2V5MTogbnVsbCxcblxuICAgIHdzU2VydmVyOiBudWxsLFxuICAgIHdzVXJsT2I6IG51bGwsXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbnZhciBmPXt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5pbml0ID0gKCkgPT4ge1xuXG4gICAgdi5wY2hlY2sgPSB2LnV0LnBDaGVjaztcbiAgICB2LmtleTEgPSB2LnV0LmtleTE7XG5cbiAgICAvL3ZhciB0YXJnZXRMZW5ndGggPSA4MDAwMDtcbiAgICB2YXIgdGFyZ2V0TGVuZ3RoID0gMjAwO1xuICAgIHYubXNnU2ggPSBuZXcgdi5tc2dTaG9ydGVuMCAodGFyZ2V0TGVuZ3RoKTtcblxuICAgIHZhciBwYXJhbXMgPSB2LnBjaGVjayAob3B0aW9ucywge3NlY3VyZUNvbm5lY3Rpb246IGZhbHNlfSk7XG5cbiAgICB2LnNlY3VyZUNvbm5lY3Rpb24gPSBwYXJhbXMuc2VjdXJlQ29ubmVjdGlvbjtcblxuICAgICAgICAvL2NvbnNvbGUubG9nICgnd3NDbGllbnQgcGFyYW1zOiAnICsgSlNPTi5zdHJpbmdpZnkgKHBhcmFtcykgKyAnXFxuJyk7XG4gICAgXG4gICAgdi50c3RDbWRzID0gIHtwaW5nOiBmLnRzdENtZFBpbmdSZXNwfTtcbiAgICB2LmNsaWVudCA9IGNsaWVudCA/IGNsaWVudCA6IGYucmVwb3J0TXNnT2I7XG5cbiAgICB2YXIgd3NQcmVmaXggPSB2LnNlY3VyZUNvbm5lY3Rpb24gPyAnd3NzJyA6ICd3cyc7XG4gICAgdmFyIHdzVXJsID0gd3NQcmVmaXggKyAnOi8vJyArIHYuaXAgKyAnOicgKyB2LnBvcnQ7XG5cbiAgICB2LndzVXJsT2IgPSB7XG4gICAgICAgIHdzUHJlZml4OiB3c1ByZWZpeCxcbiAgICAgICAgaXA6IHYuaXAsXG4gICAgICAgIHBvcnQ6IHYucG9ydFxuICAgIH07XG5cbiAgICAvL3Yud3NTZXJ2ZXIgPSBuZXcgV2ViU29ja2V0ICh3c1VybCwgSlNPTi5zdHJpbmdpZnkgKHYud3NVcmxPYikpO1xuICAgIHYud3NTZXJ2ZXIgPSBuZXcgV2ViU29ja2V0ICh3c1VybCwgdi5pcCk7XG4gICAgICAgIC8vIHVzaW5nIHYuaXAgYXMgb3B0aW9uYWwgRE9NU3RyaW5nIHByb3RvY29sczogXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJTb2NrZXRcblxuICAgIHYud3NTZXJ2ZXIub25tZXNzYWdlID0gZi5mcm9tU3J2cjtcbiAgICB2LndzU2VydmVyLm9uY2xvc2UgPSBmLm1zZ0Nsb3NlO1xuICAgIHYud3NTZXJ2ZXIub25lcnJvciA9IGYubXNnRXJyb3I7XG5cbn07IC8vIGVuZCBmLmluaXQgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZG9DbWQgPSAodU1zZ09iKSA9PiB7XG5cbiAgICAvKlxuICAgIHZhciBmcm9tU3J2ciA9IEpTT04uc3RyaW5naWZ5ICh1TXNnT2IpO1xuICAgIHZhciBmcm9tU3J2clNob3J0ID0gdi5tc2dTaG9ydGVuLm1zZ1Nob3J0ZW4gKGZyb21TcnZyKTtcbiAgICAqL1xuICAgIHZhciBmcm9tU3J2clNob3J0ID0gdi5tc2dTaC5tc2dTaG9ydGVuICh1TXNnT2IpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cgKCcgID09PiB3c0NsaWVudC5mcm9tU3J2cjogJyArIGZyb21TcnZyU2hvcnQpO1xuICAgIFxuICAgIHVNc2dPYiA9IEFycmF5LmlzQXJyYXkgKHVNc2dPYikgPyB1TXNnT2IgOiBbdU1zZ09iXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdU1zZ09iLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIG1zZ09iID0gdU1zZ09iIFtpXTtcblxuICAgICAgICB2YXIgY21kID0gdi5rZXkxIChtc2dPYik7XG4gICAgXG4gICAgICAgIGlmICh2LnRzdENtZHMuaGFzT3duUHJvcGVydHkgKGNtZCkpIHtcbiAgICBcbiAgICAgICAgICAgIHYudHN0Q21kcyBbY21kXSAobXNnT2IgW2NtZF0pO1xuICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgdi5jbGllbnQgKG1zZ09iKTtcbiAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKHYudHN0Q21kcy5oYXNPd25Qcm9wZXJ0eSAoY21kKSlcbiAgICBcbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IHVNc2dPYi5sZW5ndGg7IGkrKylcblxufTsgLy8gZW5kIGYuZG9DbWQgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kb1NlbmQgPSAobXNnKSA9PiB7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJ2YuZG9TZW5kLm1zZzogJyArIG1zZyArICdcXG4nKTtcbiAgICBcbiAgICB2LndzU2VydmVyLnNlbmQgKG1zZyk7XG5cbn07IC8vIGVuZCBmLmRvU2VuZCBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5mcm9tU3J2ciA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIHZhciB0aW1lID0gdi5taW5zZWMgKCk7XG4gICAgdmFyIG1zZyA9IGV2ZW50LmRhdGE7XG4gICAgbXNnT2IgPSBKU09OLnBhcnNlIChtc2cpO1xuICAgIC8vdmFyIG1zZ20gPSBKU09OLnBhcnNlIChtc2cpO1xuICAgIC8vdmFyIG1zZ09iID0gbXNnbS5tO1xuICAgIHZhciBtc2dPYlNob3J0ID0gdi5tc2dTaC5tc2dTaG9ydGVuIChtc2dPYik7XG4gICAgICAgIGNvbnNvbGUubG9nICgnPD09PT0gJyArIHRpbWUgKyAnIHdzQ2xpZW50LmZyb21TcnZyOiAnICsgbXNnT2JTaG9ydCArICdcXG4nKTtcblxuICAgIGYuZG9DbWQgKG1zZ09iKTtcblxufTsgLy8gZW5kIGYuZnJvbVNydnIgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLm1zZ0Nsb3NlID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY29uc29sZS5sb2cgKCdjbG9zZSBldmVudDogJyArIGV2ZW50LmRhdGEpO1xuXG59OyAvLyBlbmQgZi5tc2dDbG9zZSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5tc2dFcnJvciA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIHZhciBldmVudE1zZyA9IGV2ZW50LmRhdGEgPyAnIGV2ZW50LmRhdGE6ICcgKyBldmVudC5kYXRhIDogXCJcIjtcbiAgICBcbiAgICB2YXIgZXJyTXNnID0gJ3dzQ2xpZW50IG1zZ0Vycm9yIChTZXJ2ZXIgaXMgRG93bj8pJyArIGV2ZW50TXNnO1xuICAgIGNvbnNvbGUubG9nIChlcnJNc2cpO1xuXG4gICAgJCgnYm9keScpLnByZXBlbmQgKGVyck1zZyk7XG5cbn07IC8vIGVuZCBmLm1zZ0Vycm9yIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnJlcG9ydE1zZ09iID0gKG1zZ09iKSA9PiB7XG4gICAgXG4gICAgY29uc29sZS5sb2cgKCdmLnJlcG9ydE1zZ09iLm1zZ09iOiAnICsgbXNnT2IgKyAnXFxuJyk7XG5cbn07IC8vIGVuZCBmLnJlcG9ydE1zZ09iIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnRzdENtZFBpbmdSZXNwID0gKHBpbmdNc2cpID0+IHtcbiAgICBcbiAgICBjb25zb2xlLmxvZyAoJ3Bpbmc6ICcgKyBwaW5nTXNnKTtcbiAgICByZXR1cm47XG5cbn07IC8vIGVuZCBmLnRzdENtZFBpbmdSZXNwIFxuXG5mLmluaXQgKCk7XG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5nZXRXc1VybCA9ICgpID0+IHtcbiAgICBcbiAgICByZXR1cm4gdi53c1VybE9iO1xuXG59OyAvLyBlbmQgUC5nZXRXc1VybFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnRvU3J2ciA9IChtc2dPYikgPT4ge1xuICAgIHZhciB0aW1lID0gdi5taW5zZWMgKCk7XG4gICAgdmFyIG1zZ09iU2hvcnQgPSB2Lm1zZ1NoLm1zZ1Nob3J0ZW4gKG1zZ09iKTtcbiAgICBjb25zb2xlLmxvZyAoJ1xcblxcbj09PT0+ICcgKyB0aW1lICsgJyB3c0NsaWVudC50b1NydnI6ICcgKyBtc2dPYlNob3J0ICsgJ1xcbicpO1xuICAgIFxuICAgIHZhciBtc2dPYlMgPSBKU09OLnN0cmluZ2lmeSAobXNnT2IpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cgKCdwLnRvU3J2ci5tc2dPYlMgOiAnICsgbXNnT2JTICsgJ1xcbicpO1xuICAgIFxuICAgIGYuZG9TZW5kIChtc2dPYlMpO1xuXG59OyAvLyBlbmQgUC50b1NydnIgXG5cblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG4iLCIvLyBrZXkxLmpzXG5cbi8vIGtleTEgZXh0cmFjdHMgdGhlIHNpbmdsZSBrZXkgZnJvbSBhbiBvYmplY3QgXG4vLyBjb250YWluaW5nIG9ubHkgb25lIGtleS92YWx1ZSBwYWlyXG4vLyBhbmQgcmV0dXJucyB0aGUgc3RyaW5nIHZhbHVlIGZvciB0aGUga2V5XG4vLyBhbnl0aGluZyBlbHNlIHBhc3NlZCB0byBrZXkxIHJldHVybnMgbnVsbFxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG52YXIga2V5MSA9IChvYikgPT4ge1xuXG4gICAga2V5ID0gbnVsbDtcblxuICAgIHZhciB1bmlxdWVLZXlFeGlzdHMgPSB0eXBlb2Ygb2IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9iICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KG9iKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2IgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iKS5sZW5ndGggPT09IDE7XG4gICAgXG4gICAgaWYgKHVuaXF1ZUtleUV4aXN0cykge1xuICAgIFxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iKTtcbiAgICAgICAga2V5ID0ga2V5c1swXTtcbiAgICBcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSkge1xuXG4gICAgICAgIHZhciBvYjAgPSBvYiBbMF07XG4gICAgICAgIHZhciB1bmlxdWVBcnJheUtleUV4aXN0cyA9IHR5cGVvZiBvYjAgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iMCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2IwICE9PSAnb2JqZWN0JztcblxuICAgICAgICBpZiAodW5pcXVlQXJyYXlLZXlFeGlzdHMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAga2V5ID0gb2IwO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmICh1bmlxdWVBcnJheUtleUV4aXN0cylcblxuXG4gICAgfSAvLyBlbmQgaWYgKHVuaXF1ZUtleUV4aXN0cylcbiAgICBcbiAgICByZXR1cm4ga2V5O1xuICAgIFxufTsgLy8gZW5kIGtleTEgXG5cbnJldHVybiBrZXkxO1xuXG59KCkpO1xuIiwiLy8gaW5kZXguanMgPT4gbWluc2VjXG5cbi8vIGdldCBtaW51dGVzOnNlY29uZHMubWlsbGlzZWNvbmRzXG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciB2ID0ge1xufTsgIC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxudmFyIGY9e307XG5cbmYuaW5pdCA9ICgpID0+IHtcbn07IC8vIGVuZCBmLmluaXRcblxuICAgIC8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmdldE1pblNlYyA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgZHQgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBzdFN0ciA9IGR0LnRvSlNPTiAoKTtcblxuICAgIHZhciBtYXRjaGVkID0gc3RTdHIubWF0Y2ggKC8uKj86KC4qKVovKTtcblxuICAgIHZhciByZXMgPSBtYXRjaGVkIFsxXTtcbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5nZXRNaW5TZWNcblxuXG5cbiAgICAvLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuZi5pbml0ICgpO1xuXG5yZXR1cm4gUDtcblxufSgpKTtcblxuXG5cblxuXG5cbiIsIi8vIGluZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldExlbmd0aCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciB2ID0ge1xuXG4gICAgdGFyZ2V0TGVuZ3RoOiB0YXJnZXRMZW5ndGggPyB0YXJnZXRMZW5ndGggOiBudWxsLFxuICAgIGtleXNPbmx5OiBmYWxzZSxcblxufTsgIC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbnZhciBmPXt9O1xuXG5mLmluaXQgPSAoKSA9PiB7XG59OyAvLyBlbmQgZi5pbml0XG5cbiAgICAvLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5tc2dTaG9ydGVuID0gKG1zZ09iKSA9PiB7XG4gICAgXG4gICAgdmFyIG1zZ09iU3RyID0gdHlwZW9mIG1zZ09iID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5IChtc2dPYikgOiBtc2dPYjtcbiAgICBcbiAgICBpZiAodi5rZXlzT25seSkge1xuXG4gICAgICAgIHZhciBtc2dPYlAgPSBKU09OLnBhcnNlIChtc2dPYlN0cik7XG4gICAgICAgIHZhciBtc2dBID0gQXJyYXkuaXNBcnJheSAobXNnT2JQKSA/IG1zZ09iUCA6IFttc2dPYlBdO1xuXG4gICAgICAgIHZhciBtc2dLZXlzQSA9IFtdO1xuXG4gICAgICAgIG1zZ0EuZm9yRWFjaCAoZnVuY3Rpb24gKG1zZykge1xuXG4gICAgICAgICAgICB2YXIgbXNnS2V5cyA9IE9iamVjdC5rZXlzIChtc2cpO1xuICAgICAgICAgICAgbXNnS2V5c0EucHVzaCAobXNnS2V5cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtc2dLZXlzQS5sZW5ndGggPT09IDEpIHtcblxuICAgICAgICAgICAgbXNnS2V5c0EgPSBtc2dLZXlzQSBbMF07XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKG1zZ0tleXNBLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgXG4gICAgICAgIG1zZ09iU3RyID0gSlNPTi5zdHJpbmdpZnkgKG1zZ0tleXNBKTtcblxuICAgIH0gLy8gZW5kIGlmICh2LmtleXNPbmx5KVxuICAgIFxuICAgIGlmIChtc2dPYlN0ci5sZW5ndGggPiB2LnRhcmdldExlbmd0aCkge1xuXG4gICAgICAgIHZhciBoYWxmTGVuZ3RoID0gTWF0aC5jZWlsICh2LnRhcmdldExlbmd0aCAvIDIpO1xuXG4gICAgICAgIHZhciBmaXJzdEhhbGYgPSBtc2dPYlN0ci5zdWJzdHIgKDAsIGhhbGZMZW5ndGgpO1xuICAgICAgICB2YXIgc2Vjb25kSGFsZiA9IG1zZ09iU3RyLnN1YnN0ciAobXNnT2JTdHIubGVuZ3RoIC0gaGFsZkxlbmd0aCwgaGFsZkxlbmd0aClcblxuICAgICAgICBtc2dPYlN0ciA9IGZpcnN0SGFsZiArICcgIDw9PV5efF5ePT0+ICAnICsgc2Vjb25kSGFsZjtcblxuICAgIH0gLy8gZW5kIGlmIChtc2dPYlN0ci5sZW5ndGggPiB2LnRhcmdldExlbmd0aClcbiAgICBcblxuICAgIHJldHVybiBtc2dPYlN0cjtcblxufTsgLy8gZW5kIFAubXNnU2hvcnRlbiBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5zZXRLZXlzT25seSA9IChrZXlzT25seSkgPT4ge1xuICAgIFxuICAgIHYua2V5c09ubHkgPSBrZXlzT25seTtcblxufTsgLy8gZW5kIFAuc2V0S2V5c09ubHkgXG5cblxuICAgIC8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5mLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuXG5cblxuIl19
