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
    //srvAws: '34.215.194.129'
    srvAws: '52.39.59.96'

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1NyYy9ub2RlX21vZHVsZXNfZ2xvYmFsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXgwLmpzIiwic2xpZGVTaG93LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLWoyaC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby1rZXkvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tbXNnL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vU3JjL05vZGUuanMvbm9kZV9tb2R1bGVzL2dvLXBvcGluZm8vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvZ28tdXRpbC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9nby13cy1jbGllbnQvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMva2V5MS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uL1NyYy9Ob2RlLmpzL25vZGVfbW9kdWxlcy9taW5zZWMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi9TcmMvTm9kZS5qcy9ub2RlX21vZHVsZXMvbXNnc2hvcnRlbi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMXpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8vIGNtZHJJbml0LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciB2ID0ge1xufTsgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xudmFyIGY9e307XG5cbmYuaW5pdCA9ICgpID0+IHtcblxuICAgIHZhciBjID0gcmVxdWlyZSAoJy4vc2xpZGVTaG93LmpzJyk7XG4gICAgbmV3IGMgKCk7XG59OyAgLy8gZW5kIGYuaW5pdFxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuKGZ1bmN0aW9uICgpIHtcblxuICAgICQoZG9jdW1lbnQpLnJlYWR5IChmLmluaXQpO1xuXG59KSAoKTtcblxuXG5cbnJldHVybiBQO1xuXG59KSAoKTtcblxuXG5cblxuXG4iLCIvLyBzbGlkZVNob3cuanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgdiA9IHtcblxuICAgIHdzOiByZXF1aXJlICgnZ28td3MtY2xpZW50JyksXG4gICAga2V5OiByZXF1aXJlICgnZ28ta2V5JyksXG4gICAgajJoOiByZXF1aXJlICgnZ28tanNvbjJodG1sJyksXG4gICAgcGk6IHJlcXVpcmUgKCdnby1wb3BpbmZvJyksXG4gICAga2V5MTogcmVxdWlyZSAoJ2tleTEnKSxcblxuICAgIGRwcDogbnVsbCxcbiAgICBjdXJWaXM6IG51bGwsXG4gICAgbWF4SW1hZ2VzOiBudWxsLFxuICAgIElkU2xpZGVzOiBudWxsLFxuXG4gICAgYm9va21hcmtzOiBudWxsLFxuICAgIGJvb2ttYXJrTHN0OiBudWxsLFxuICAgIElkQm9va21hcms6IG51bGwsXG4gICAgSWRCb29rbWFya1M6IG51bGwsXG4gICAgSWREZWxCOiBudWxsLFxuICAgIElkQWRkQjogbnVsbCxcbiAgICBJZEJvb2tTOiBudWxsLFxuXG4gICAgY3RJOiBudWxsLFxuICAgIHRvcGljc0k6IG51bGwsXG4gICAgdG9waWNSZWZzOiBudWxsLFxuICAgIHRvcGljUmVmOiBudWxsLFxuICAgIElkTmF2OiBudWxsLFxuICAgIElkUGFnZUN0OiBudWxsLFxuICAgIElkTmF2UE46IG51bGwsXG4gICAgdG9waWNUb1ZpZGVvOiBudWxsLFxuICAgIHNsaWRlVG9WaWRlbzogbnVsbCxcbiAgICBoaWRkZW5TbGlkZTogbnVsbCxcbiAgICBJZFZpZGVvUGxheWluZzogbnVsbCxcbiAgICAvL3NydkF3czogJzUyLjMzLjE3MC4yMSdcbiAgICAvL3NydkF3czogJzM0LjIxNS4xOTQuMTI5J1xuICAgIHNydkF3czogJzUyLjM5LjU5Ljk2J1xuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG52YXIgZj17fTtcblxuZi5pbml0ID0gKCkgPT4ge1xuXG4gICAgdi5kcHAgPSB2LmoyaC5kaXNwbGF5UGFnZTtcbiAgICB2LmdlbklkID0gdi5qMmguZ2VuSWQ7XG5cbiAgICB2LnBpID0gbmV3IHYucGkgKHYuajJoKTtcblxuICAgIHZhciAgZ3QgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblxuICAgIHZhciBpcFNyYyA9IGd0Lm1hdGNoICgvZ2l0aHViLykgPyB2LnNydkF3cyA6ICdsb2NhbGhvc3QnO1xuICAgIC8vdmFyIGlwU3JjID0gdi5zcnZBd3M7XG4gICAgdi53cyA9IG5ldyB2LndzIChpcFNyYywgODAwMSwgUC5kb0FjdGlvbik7XG5cbiAgICBuZXcgdi5rZXkgKCdib2R5JywgZmFsc2UsIGYua2V5RmlsdGVyKTtcbn07ICAvLyBlbmQgZi5pbml0XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmluaXRCb29rbWFya3MgPSAoKSA9PiB7XG5cbiAgICB2LmJvb2ttYXJrTHN0ID0gW107XG4gICAgZi5ib29rbWFya3NGcm9tQ29va2llICgpO1xuXG4gICAgdmFyIGlkID0gdi5nZW5JZCAoKTtcbiAgICB2YXIgYWRkQiA9IHtzcGFuOiAnYWRkIGJvb2ttYXJrJywgaWQ6IGlkLCBjbGFzczogJ2Jvb2ttYXJrJ307XG4gICAgdi5JZEFkZEIgPSAnIycgKyBpZDtcblxuICAgIHZhciBpZCA9IHYuZ2VuSWQgKCk7XG4gICAgdmFyIGRlbEIgPSB7c3BhbjogJ2RlbCBib29rbWFyaycsIGlkOiBpZCwgY2xhc3M6ICdib29rbWFyayd9O1xuICAgIHYuSWREZWxCID0gJyMnICsgaWQ7XG5cbiAgICB2YXIgaWQgPSB2LmdlbklkICgpO1xuICAgIHZhciBib29rUyA9IHtkaXY6IDAsIGlkOiBpZH07XG4gICAgdi5JZEJvb2tTID0gJyMnICsgaWQ7XG5cbiAgICB2LklkQm9va21hcmtTID0gdi5kcHAgKHtkaXY6IFthZGRCLCBkZWxCLCBib29rU10sIGNsYXNzOiAnYm9va21hcmtzIG5vdmlzJywgcGFyZW50OiB2LklkQm9va21hcmt9KTtcblxuICAgICQodi5JZEFkZEIgKyAnLCcgKyB2LklkRGVsQilcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgIH0pO1xuXG4gICAgJCh2LklkQWRkQilcbiAgICAuY2xpY2sgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdi5ib29rbWFya3MgW3YuY3VyVmlzXSA9IDE7XG4gICAgICAgIGYuYm9va21hcmtzVG9Db29raWUgKCk7XG4gICAgICAgIGYuYm9va21hcmtzU2hvdyAoKTtcbiAgICB9KVxuXG4gICAgJCh2LklkRGVsQilcbiAgICAuY2xpY2sgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVsZXRlIHYuYm9va21hcmtzIFt2LmN1clZpc107XG4gICAgICAgIGYuYm9va21hcmtzVG9Db29raWUgKCk7XG4gICAgICAgIGYuYm9va21hcmtzU2hvdyAoKTtcbiAgICB9KVxuXG59OyAvLyBlbmQgZi5pbml0Qm9va21hcmtzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuaW5pdFN0eWxlID0gKCkgPT4ge1xuXG4gICAgdmFyIHN0eWxlID0ge3N0eWxlOlxuICAgICAgICBcImJvZHkge1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luLWxlZnQ6IDE1cHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmJvb2ttYXJrIHtcIiArXG4gICAgICAgICAgICBcIndoaXRlLXNwYWNlOiBub3dyYXA7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDEycHg7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW46IDA7XCIgK1xuICAgICAgICAgICAgXCJwYWRkaW5nOiAwO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5ib29rbWFya3Mge1wiICtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogI0U1RkZGMjtcIiArXG4gICAgICAgICAgICBcImJvcmRlcjogMXB4IHNvbGlkICNCM0IzRkY7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXItcmFkaXVzOiAzcHg7XCIgK1xuICAgICAgICAgICAgXCJwb3NpdGlvbjogYWJzb2x1dGU7XCIgK1xuICAgICAgICAgICAgXCJ6LWluZGV4OiAxO1wiICtcbiAgICAgICAgICAgIFwidG9wOiAycHg7XCIgK1xuICAgICAgICAgICAgXCJyaWdodDogMnB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5ib29rbWFya2hlYWRlciB7XCIgK1xuICAgICAgICAgICAgXCJmb250LXN0eWxlOiBpdGFsaWM7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogMjAwO1wiICtcbiAgICAgICAgICAgIFwidGV4dC1hbGlnbjogY2VudGVyO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5jYXB0aW9uIHtcIiArXG4gICAgICAgICAgICBcImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiICtcbiAgICAgICAgICAgIFwiZm9udC1zaXplOiAyMHB4OyBcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiBhYnNvbHV0ZTsgXCIgK1xuICAgICAgICAgICAgXCJib3R0b206IDUwcHg7IFwiICtcbiAgICAgICAgICAgIFwidGV4dC1hbGlnbjogY2VudGVyO1wiICtcbiAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XCIgK1xuICAgICAgICAgICAgXCJtYXgtd2lkdGg6IDUwMHB4O1wiICtcbiAgICAgICAgICAgIFwid29yZC1icmVhazogYnJlYWstYWxsO1wiICtcbiAgICAgICAgICAgIFwibGVmdDogMDtcIiArXG4gICAgICAgICAgICBcInJpZ2h0OiAwO1wiICtcbiAgICAgICAgICAgIFwibWFyZ2luOiAwIGF1dG87XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnN5bWJvbHdyYXAge1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDE2cHg7XCIgK1xuICAgICAgICAgICAgXCJoZWlnaHQ6IDE2cHg7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDE1cHg7XCIgK1xuICAgICAgICAgICAgXCJib3JkZXI6IDFweCBzb2xpZCBibGFjaztcIiArXG4gICAgICAgICAgICBcImJvcmRlci1yYWRpdXM6IDhweDtcIiArXG4gICAgICAgICAgICBcImZsb2F0OiByaWdodDtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6ICMwZTA7XCIgK1xuICAgICAgICAgICAgXCJmb250LXdlaWdodDogYm9sZDtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogcG9pbnRlcjtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogaGFuZDtcIiArXG4gICAgICAgICAgICBcImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiByZWxhdGl2ZTtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuc3ltYm9sIHtcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiByZWxhdGl2ZTtcIiArXG4gICAgICAgICAgICBcInRvcDogLTFweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIuaGVhZGVyIHtcIiArXG4gICAgICAgICAgICBcInRleHQtYWxpZ246IGNlbnRlcjtcIiArXG4gICAgICAgICAgICBcInBvc2l0aW9uOiByZWxhdGl2ZTtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubTEwIHtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMTBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIudDQwIHtcIiArXG4gICAgICAgICAgICBcInRvcDogLTQwcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnByZWwge1wiICtcbiAgICAgICAgICAgIFwicG9zaXRpb246IHJlbGF0aXZlO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi53NzAwIHtcIiArXG4gICAgICAgICAgICBcIndpZHRoOiA3MDBweDtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbjogMCBhdXRvO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5pbWd2aWRlbyB7XCIgK1xuICAgICAgICAgICAgXCJoZWlnaHQ6IDUwMHB4O1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDcwMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5pbWdob21ld29yayB7XCIgK1xuICAgICAgICAgICAgXCJoZWlnaHQ6IDgwMHB4O1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IDcwMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5jb2xzIHtcIiArXG4gICAgICAgICAgICBcInBhZGRpbmctcmlnaHQ6IDBweDtcIiArXG4gICAgICAgICAgICBcInBhZGRpbmctbGVmdDogMTBweDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubm92aXMge1wiICtcbiAgICAgICAgICAgIFwiZGlzcGxheTogbm9uZTtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubmF2IHtcIiArXG4gICAgICAgICAgICBcImZvbnQtc2l6ZTogMzBweDtcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiA5MDA7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tbGVmdDogMTBweDtcIiArXG4gICAgICAgICAgICBcImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiArXG4gICAgICAgICAgICBcImZsb2F0OiByaWdodDtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogcG9pbnRlcjtcIiArXG4gICAgICAgICAgICBcImN1cnNvcjogaGFuZDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIubmF2cG9zIHtcIiArXG4gICAgICAgICAgICBcImZsb2F0OiByaWdodDtcIiArXG4gICAgICAgIFwifVwiICtcbiAgICAgICAgXCIudmlkZW8ge1wiICtcbiAgICAgICAgICAgIFwiZm9udC13ZWlnaHQ6IGJvbGQ7XCIgK1xuICAgICAgICAgICAgXCJjb2xvcjogYmx1ZTtcIiArXG4gICAgICAgICAgICBcIm1hcmdpbi1yaWdodDogMzBweDtcIiArXG4gICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6IHdoaXRlO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBwb2ludGVyO1wiICtcbiAgICAgICAgICAgIFwiY3Vyc29yOiBoYW5kO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5yZWYge1wiICtcbiAgICAgICAgICAgIFwid2lkdGg6IGluaXRpYWw7XCIgK1xuICAgICAgICAgICAgXCJmb250LXNpemU6IDExcHg7XCIgK1xuICAgICAgICAgICAgXCJ3b3JkLWJyZWFrOiBicmVhay1hbGw7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLnRvcGljcm93cyB7XCIgK1xuICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tOiAyMHB4O1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi5yb3cudG9waWNyb3dzID4gZGl2IHtcIiArXG4gICAgICAgICAgICBcImJvcmRlcjogMXB4IHNvbGlkICNjY2M7XCIgK1xuICAgICAgICAgICAgXCJwYWRkaW5nLXJpZ2h0OiAxcHg7XCIgK1xuICAgICAgICBcIn1cIiArXG4gICAgICAgIFwiLmxvY2hlYWRlciB7XCIgK1xuICAgICAgICAgICAgXCJjb2xvcjogcmVkO1wiICtcbiAgICAgICAgXCJ9XCIgK1xuICAgICAgICBcIi53ZWVrIHtcIiArXG4gICAgICAgICAgICBcImZvbnQtd2VpZ2h0OiBib2xkO1wiICtcbiAgICAgICAgXCJ9XCIsXG4gICAgICAgIHBhcmVudDogJ2hlYWQnfTtcblxuICAgICAgICB2LmRwcCAoc3R5bGUpO1xuXG59OyAvLyBlbmQgZi5pbml0U3R5bGVcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5ib29rbWFya0FkZCA9IChzbGlkZSkgPT4ge1xuXG4gICAgdmFyIGJvb2ttYXJrID0gdi5ib29rbWFya0xzdCBbc2xpZGVdLnJlcGxhY2UgKC8tKC4qKV8vLCAnICAgICQxICAgICcpO1xuICAgIHZhciBJZCA9IHYuZHBwICh7cHJlOiBib29rbWFyaywgcGFyZW50OiB2LklkQm9va1MsIG5hbWU6IHNsaWRlLCBjbGFzczogJ2Jvb2ttYXJrJ30pXG5cbiAgICAkKElkKVxuICAgIC5jbGljayAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbiA9ICQodGhpcykuYXR0ciAoJ25hbWUnKTtcbiAgICAgICAgZi5zZXROZXh0VmlzIChuIC0gdi5jdXJWaXMpO1xuXG4gICAgICAgICQodi5JZEJvb2ttYXJrUylcbiAgICAgICAgLmFkZENsYXNzICgnbm92aXMnKTtcbiAgICB9KVxuICAgIC5ob3ZlciAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ3JlZCd9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAnYmxhY2snfSk7XG4gICAgfSk7XG5cblxufTsgLy8gZW5kIGYuYm9va21hcmtBZGRcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5ib29rbWFya3NTaG93ID0gKCkgPT4ge1xuXG4gICAgaWYgKHYuYm9va21hcmtzLmhhc093blByb3BlcnR5ICh2LmN1clZpcykpIHtcblxuICAgICAgICAkKHYuSWREZWxCKVxuICAgICAgICAucmVtb3ZlQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgICAgICQodi5JZEFkZEIpXG4gICAgICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgICQodi5JZERlbEIpXG4gICAgICAgIC5hZGRDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAgICAgJCh2LklkQWRkQilcbiAgICAgICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgIH0gLy8gZW5kIGlmICh2LmJvb2ttYXJrcy5oYXNPd25Qcm9wZXJ0eSAodi5jdXJWaXMpKVxuXG4gICAgJCh2LklkQm9va1MpXG4gICAgLmVtcHR5ICgpO1xuXG4gICAgdmFyIHNsaWRlcyA9IE9iamVjdC5rZXlzICh2LmJvb2ttYXJrcykuc29ydCAoZnVuY3Rpb24gY29tcGFyZU51bWJlcnMoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgfSk7XG5cbiAgICBpZiAoc2xpZGVzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICB2LmRwcCAoe2RpdjogJ1dlZWsgVG9waWMgU2xpZGVOdW0nLCBwYXJlbnQ6IHYuSWRCb29rUywgY2xhc3M6ICdib29rbWFyayBib29rbWFya2hlYWRlcid9KTtcblxuICAgIH0gLy8gZW5kIGlmIChzbGlkZXMubGVuZ3RoID4gMClcbiAgICBcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBzbGlkZSA9IHNsaWRlcyBbaV07XG4gICAgICAgIGYuYm9va21hcmtBZGQgKHNsaWRlKTtcblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzOyBpKyspXG5cbiAgICAkKHYuSWRCb29rbWFya1MpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKVxuICAgICAgICAvLyBhY3R1YWxseSBzaG93IHRoZSBib29rbWFya1xuXG4gICAgLmhvdmVyIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGJvb2ttYXJrcyBpbml0aWFsbHkgcG9zaXRpb25lZCB1bmRlciBjdXJzb3IsIHNvIG5vdGhpbmcgdG8gZG8gZm9yIGhvdmVyLWluXG5cbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmFkZENsYXNzICgnbm92aXMnKVxuICAgIH0pXG5cblxuXG5cbn07IC8vIGVuZCBmLmJvb2ttYXJrc1Nob3dcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5ib29rbWFya3NGcm9tQ29va2llID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBib29rbWFya3NTZmllZCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaCAoL20xMDJib29rbWFya3M9KFteO10rKS8pO1xuXG4gICAgdi5ib29rbWFya3MgPSAhYm9va21hcmtzU2ZpZWQgPyAge30gOiBKU09OLnBhcnNlIChib29rbWFya3NTZmllZCBbMV0pO1xuXG59OyAvLyBlbmQgZi5ib29rbWFya3NGcm9tQ29va2llXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuYm9va21hcmtzVG9Db29raWUgPSAoKSA9PiB7XG4gICAgXG4gICAgdmFyIGNvb2tpZSA9ICdtMTAyYm9va21hcmtzPScgKyBKU09OLnN0cmluZ2lmeSAodi5ib29rbWFya3MpICsgJzsgZXhwaXJlcz1UaHUsIDEgSmFuIDIwMzAgMDA6MDA6MDAgVVRDOyBwYXRoPS8nO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZTtcblxufTsgLy8gZW5kIGYuYm9va21hcmtzVG9Db29raWVcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kaXNwbGF5TmF2ID0gKCkgPT4ge1xuXG4gICAgdmFyIG5hdlNwYW5zID0gW3tzcGFuOiAnPicsIGlkOiAnbmF2cicsIGNsYXNzOiAnbmF2J30sXG4gICAge3NwYW46ICc8JywgaWQ6ICduYXZsJywgY2xhc3M6ICduYXYnfV07XG5cbiAgICBuYXZTcGFucy5wYXJlbnQgPSB2LklkTmF2UE47XG5cbiAgICB2LmRwcCAobmF2U3BhbnMpO1xuXG4gICAgJCgnI25hdmwsICNuYXZyJylcbiAgICAuaG92ZXIgKFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdyZWQnfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgIC5jc3MgKHtjb2xvcjogJ2JsYWNrJ30pO1xuICAgIH0pO1xuXG4gICAgJCgnI25hdmwnKVxuICAgIC5jbGljayAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGYuc2V0TmV4dFZpcyAoLTEpO1xuICAgIH0pO1xuXG4gICAgJCgnI25hdnInKVxuICAgIC5jbGljayAoXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGYuc2V0TmV4dFZpcyAoMSk7XG4gICAgfSk7XG5cblxufTsgLy8gZW5kIGYuZGlzcGxheU5hdlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRpc3BsYXlQbmdGaWxlcyA9ICh2YWxzKSA9PiB7XG5cbiAgICB2LmN1clZpcyA9IDA7XG4gICAgdi5tYXhJbWFnZXMgPSB2YWxzLmxlbmd0aCAtIDE7XG4gICAgICAgIC8vIGxhc3QgdmFsIGluIHZhbHMgaXMgYW4gZW1wdHkgc3RyaW5nLCBzbyBkb24ndCBjb3VudCBpdFxuXG4gICAgdmFyIHdlZWtzID0ge307XG4gICAgdmFyIHRvcGljcztcblxuICAgIHYuY3RJID0gW107XG4gICAgdi50b3BpY3NJID0gW107XG4gICAgdi50b3BpY1JlZnMgPSBbXTtcbiAgICB2LnNsaWRlVG9WaWRlbyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2Lm1heEltYWdlczsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHZhbCA9IHZhbHMgW2ldO1xuXG4gICAgICAgIHZhciBtYXRjaGVkID0gdmFsLm1hdGNoICgvLi4uKC4qKVxcLy4qPyhbYS16QS1aXS4qKS5wbmcvKTtcbiAgICAgICAgdmFyIGxvYyA9IG1hdGNoZWQgWzFdO1xuICAgICAgICB2YXIgY2FwdGlvbiA9IG1hdGNoZWQgWzJdO1xuXG4gICAgICAgIHZhciBpbWdDbGFzcyA9IGxvYy5tYXRjaCAoL0hvbWV3b3JrfEZpbmFsLykgPyAnaW1naG9tZXdvcmsnIDogJ2ltZ3ZpZGVvJztcblxuICAgICAgICB2YXIgZGl2T2IgPSB7ZGl2OiBbXG4gICAgICAgICAgICB7aW1nOiAwLCBzcmM6IHZhbCwgY2xhc3M6IGltZ0NsYXNzLCBhbHQ6ICdpbWFnZSBpcyBzdGlsbCB1cGxvYWRpbmcgLi4uIGp1c3QgYSBtaW51dGUgb3IgdHdvIGxvbmdlciBkZXBlbmRpbmcgb24geW91ciBuZXR3b3JrIGJhbmR3aWR0aCd9LFxuICAgICAgICAgICAge2JyOjB9LFxuICAgICAgICAgICAge3NwYW46ICcgICAgJyArIGxvYywgY2xhc3M6ICdsb2NoZWFkZXInfSxcbiAgICAgICAgICAgIHticjowfSxcbiAgICAgICAgICAgIHticjowfSxcbiAgICAgICAgICAgIHtzcGFuOiBjYXB0aW9uLCBjbGFzczogJ2NhcHRpb24nfVxuICAgICAgICBdLCBpZDogJ2onICsgaX07XG5cbiAgICAgICAgaWYgKGkgIT09IDApIHtcblxuICAgICAgICAgICAgZGl2T2IuY2xhc3MgPSAnbm92aXMnO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChpICE9PT0gMClcblxuICAgICAgICBkaXZPYi5wYXJlbnQgPSB2LklkU2xpZGVzO1xuICAgICAgICB2LmRwcCAoZGl2T2IpO1xuXG4gICAgICAgIG1hdGNoZWQgPSBsb2MubWF0Y2ggKC9XKFxcZCkoLio/KVxcLyguKikvKTtcblxuICAgICAgICB2YXIgd2lkID0gJ1cnICsgbWF0Y2hlZCBbMV07XG4gICAgICAgIHZhciB3ZWVrID0gd2lkICsgbWF0Y2hlZCBbMl07XG4gICAgICAgIHZhciB0b3BpYyA9IG1hdGNoZWQgWzNdO1xuXG4gICAgICAgIHZhciB2aWRlb1RvcGljID0gd2lkICsgJy0nICsgdG9waWM7XG4gICAgICAgIHYuc2xpZGVUb1ZpZGVvLnB1c2ggKHYudG9waWNUb1ZpZGVvIFt2aWRlb1RvcGljXSk7XG5cbiAgICAgICAgaWYgKCF3ZWVrcy5oYXNPd25Qcm9wZXJ0eSAod2VlaykpIHtcblxuICAgICAgICAgICAgZi5kaXNwbGF5UmVmICh3aWQsIHdlZWssIGksICd3ZWVrJyk7XG4gICAgICAgICAgICB3ZWVrcyBbd2Vla10gPSAxO1xuICAgICAgICAgICAgdG9waWNzID0ge307XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKCF3ZWVrcy5oYXNPd25Qcm9wZXJ0eSAod2VlaykpXG5cbiAgICAgICAgdmFyIHNsaWRlQ291bnQ7XG4gICAgICAgIGlmICghdG9waWNzLmhhc093blByb3BlcnR5ICh0b3BpYykpIHtcblxuICAgICAgICAgICAgdmFyIGRpc3BSZWYgPSBmLmRpc3BsYXlSZWYgKHdpZCwgdG9waWMsIGksICd0b3BpYycpO1xuICAgICAgICAgICAgdi50b3BpY1JlZnMucHVzaCAoZGlzcFJlZik7XG5cbiAgICAgICAgICAgIGlmICh0b3BpYyA9PT0gJzA1X1N0b3JhZ2VFbmdpbmVXaXJlZFRpZ2VyJykge1xuXG4gICAgICAgICAgICAgICAgdi5JZFNhbXBsZVRvcGljID0gZGlzcFJlZjtcblxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKHRvcGljID09PSAnMDFfV2VsY29tZVdlZWszJylcblxuICAgICAgICAgICAgdG9waWNzIFt0b3BpY10gPSAxO1xuXG4gICAgICAgICAgICBzbGlkZUNvdW50ID0gMTtcbiAgICAgICAgICAgIHYudG9waWNzSS5wdXNoIChzbGlkZUNvdW50KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBzbGlkZUNvdW50Kys7XG4gICAgICAgICAgICB2LnRvcGljc0kgW3YudG9waWNzSS5sZW5ndGggLSAxXSA9IHNsaWRlQ291bnQ7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKCF0b3BpY3MuaGFzT3duUHJvcGVydHkgKHRvcGljKSlcblxuICAgICAgICB2YXIgYm9va21hcmtOYW1lID0gdmlkZW9Ub3BpYyArICdfJyArIHNsaWRlQ291bnQ7O1xuICAgICAgICB2LmJvb2ttYXJrTHN0LnB1c2ggKGJvb2ttYXJrTmFtZSk7XG5cbiAgICAgICAgdi5jdEkucHVzaCAoW3NsaWRlQ291bnQsIHYudG9waWNzSS5sZW5ndGggLSAxXSk7XG5cblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsczsgaSsrKVxuXG4gICAgZi5zZXROZXh0VmlzICgwKTtcblxufTsgLy8gZW5kIGYuZGlzcGxheVBuZ0ZpbGVzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZGlzcGxheVJlZiA9ICh3aWQsIHN0ciwgaSwgY2xhc3NOYW1lKSA9PiB7XG5cbiAgICB3aWQgPSAnIycgKyB3aWQ7XG4gICAgdmFyIHJlZiA9IHYuZ2VuSWQgKCk7XG4gICAgdi5kcHAgKHtkaXY6XG4gICAgICAgIHtkaXY6IHN0cixcbiAgICAgICAgIGlkOiByZWYsXG4gICAgICAgICBzbDogaSxcbiAgICAgICAgIHN0eWxlOiAnZGlzcGxheTppbmxpbmUtYmxvY2s7IGN1cnNvcjogcG9pbnRlcjsgY3Vyc29yOiBoYW5kOydcbiAgICAgfSwgcGFyZW50OiB3aWQsIGNsYXNzOiAncmVmIHc3MDAgJyArIGNsYXNzTmFtZX0pO1xuXG4gICAgcmVmID0gJyMnICsgcmVmO1xuICAgICQocmVmKVxuICAgIC5jbGljayAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbiA9ICQodGhpcykuYXR0ciAoJ3NsJyk7XG4gICAgICAgIGYuc2V0TmV4dFZpcyAobiAtIHYuY3VyVmlzKTtcbiAgICB9KVxuXG4gICAgJChyZWYpXG4gICAgLmhvdmVyIChcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmNzcyAoe2NvbG9yOiAncmVkJ30pXG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIElkID0gJyMnICsgZXZlbnQudGFyZ2V0LmlkO1xuXG4gICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAuY3NzICh7Y29sb3I6ICdibGFjayd9KVxuICAgICAgICB9XG4gICAgKTtcblxuICAgIHJldHVybiByZWY7XG5cbn07IC8vIGVuZCBmLmRpc3BsYXlSZWZcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kb1NsaWRlU2hvdyA9ICh2YWxzKSA9PiB7XG5cbiAgICBmLmxheW91dCAoKTtcbiAgICBmLmRpc3BsYXlOYXYgKCk7XG4gICAgZi5kaXNwbGF5UG5nRmlsZXMgKHZhbHMpO1xuXG4gICAgJCh2LklkVmlkZW8pXG4gICAgLmhvdmVyIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmF0dHIgKHtzdHlsZTogJ2NvbG9yOiByZWQ7J30pXG4gICAgfSxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmF0dHIgKHtzdHlsZTogJ2NvbG9yOiBibHVlJ30pXG4gICAgfSlcbiAgICAuY2xpY2sgKGYucGxheVZpZGVvKTtcblxuICAgIHYucGkuY3JlYXRlUG9wdXBEaXNwbGF5ICgnI25hdnInLFxuICAgICAgICAnQ2xpY2sgUHJldi9OZXh0IFNsaWRlXFxuICAgIC0tIG9yIC0tXFxuKGtleWJvYXJkIHNob3J0Y3V0cylcXG5MZWZ0L1JpZ2h0IEFycm93XFxuU3BhY2UvQmFja3NwYWNlJyk7XG4gICAgdi5waS5jcmVhdGVQb3B1cERpc3BsYXkgKHYuSWRTYW1wbGVUb3BpYyxcbiAgICAgICAgJ0NsaWNrIHRvIG5hdmlnYXRlIGRpcmVjdGx5XFxudG8gYmVnaW5uaW5nIG9mIHRvcGljJyk7XG4gICAgdi5waS5jcmVhdGVQb3B1cERpc3BsYXkgKHYuSWRDdXJTbGlkZSxcbiAgICAgICAgJ0N1cnJlbnQgc2xpZGUgSW4gdG9waWMvXFxuVG90YWwgc2xpZGVzIGluIHRvcGljJyk7XG4gICAgdi5waS5jcmVhdGVQb3B1cERpc3BsYXkgKHYuSWRWaWRlbyxcbiAgICAgICAgJ0NsaWNrIHRvIHN0YXJ0XFxucGxheWluZyBsZXNzb24gdmlkZW8nKTtcblxuICAgICQodi5JZEhlbHApXG4gICAgLmhvdmVyIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgLmNzcyAoeydiYWNrZ3JvdW5kLWNvbG9yJzogJyNmZmEwYTAnfSk7XG5cbiAgICAgICAgdi5waS5zaG93UG9wdXBzICgpO1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnIzBlMCd9KTtcblxuICAgICAgICB2LnBpLmhpZGVQb3B1cHMgKCk7XG4gICAgfSk7XG5cbiAgICAkKHYuSWRCb29rbWFyaylcbiAgICAuaG92ZXIgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAuY3NzICh7J2JhY2tncm91bmQtY29sb3InOiAnI2ZmYTBhMCd9KTtcbiAgICAgICAgZi5ib29rbWFya3NTaG93ICgpO1xuXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5jc3MgKHsnYmFja2dyb3VuZC1jb2xvcic6ICcjMGUwJ30pO1xuXG4gICAgfSk7XG5cbn07IC8vIGVuZCBmLmRvU2xpZGVTaG93XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmtleUZpbHRlciA9IChjaG9iKSA9PiB7XG4gICAgLy9jb25zb2xlLmxvZyAoJ2Nob2I6ICcgKyBKU09OLnN0cmluZ2lmeSAoY2hvYikgKyAnXFxuJyk7XG5cbiAgICB2YXIgY2ggPSBjaG9iLmNoO1xuICAgIGlmIChjaCA9PT0gJ1JpZ2h0JyB8fCBjaCA9PT0gJyAnKSB7XG5cbiAgICAgICAgZi5zZXROZXh0VmlzICgxKTtcblxuICAgIH0gZWxzZSBpZiAoY2ggPT09ICdMZWZ0JyB8fCBjaCA9PT0gJ0JhY2tzcGFjZScpIHtcblxuICAgICAgICBmLnNldE5leHRWaXMgKC0xKTtcblxuICAgIH0gLy8gZW5kIGlmIChjaG9iLmNoID09PSAnUmlnaHQnKVxuXG5cbn07IC8vIGVuZCBmLmtleUZpbHRlclxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmxheW91dCA9ICgpID0+IHtcblxuICAgIHZhciBJZENvbnRhaW5lciA9IHYuZHBwICh7ZGl2OiAwLCBjbGFzczogJ3c3MDAgbTEwJ30pO1xuXG4gICAgdmFyIGlkQm9va21hcmsgPSB2LmdlbklkICgpO1xuXG4gICAgdmFyIGlkSGVscCA9IHYuZ2VuSWQgKCk7XG4gICAgdi5kcHAgKHtkaXY6XG4gICAgICAgIHtoNDogW1xuICAgICAgICAgICAgJ1NsaWRlc2hvdyBNMTAyOiBNb25nb0RCIGZvciBEQkFzIChKYW4vRmViIDIwMTcpJyxcbiAgICAgICAgICAgIHtkaXY6IHtzcGFuOiAnPycsIGNsYXNzOiAnc3ltYm9sJ30sIGlkOiBpZEhlbHAsIGNsYXNzOiAnc3ltYm9sd3JhcCd9LFxuICAgICAgICAgICAge2Rpdjoge3NwYW46ICdCJywgY2xhc3M6ICdzeW1ib2wnfSwgaWQ6IGlkQm9va21hcmssIGNsYXNzOiAnc3ltYm9sd3JhcCcsIHN0eWxlOiAnbWFyZ2luLXJpZ2h0OiAxMHB4Oyd9XG4gICAgICAgIF0sIGNsYXNzOiAnaGVhZGVyJ30sXG4gICAgICAgIGNsYXNzOiAncm93IHc3MDAnLFxuICAgICAgICBwYXJlbnQ6IElkQ29udGFpbmVyfVxuICAgICk7XG5cbiAgICB2LklkQm9va21hcmsgPSAnIycgKyBpZEJvb2ttYXJrO1xuICAgIGYuaW5pdEJvb2ttYXJrcyAoKTtcblxuICAgIHYuSWRIZWxwID0gJyMnICsgaWRIZWxwO1xuXG4gICAgdi5JZFNsaWRlcyA9IHYuZHBwICh7ZGl2OiAwLCBuYW1lOiAnc2xpZGVzJywgY2xhc3M6ICdyb3cgdzcwMCBwcmVsJywgcGFyZW50OiBJZENvbnRhaW5lcn0pO1xuXG4gICAgdmFyIElkTmF2ID0gdi5kcHAgKHtkaXY6MCwgbmFtZTogJ25hdicsIGNsYXNzOiAncm93IHc3MDAgcHJlbCB0NDAnLCBwYXJlbnQ6IElkQ29udGFpbmVyfSk7XG5cbiAgICB2YXIgSWRWaWRlb0RpdiA9IHYuZHBwICh7ZGl2OjAsIGNsYXNzOiAnY29sLXNtLTcnLCBwYXJlbnQ6IElkTmF2fSk7XG4gICAgdi5JZFZpZGVvID0gdi5kcHAgKHtzcGFuOiAnVmlkZW8nLCBwYXJlbnQ6IElkVmlkZW9EaXYsIGNsYXNzOiAnbmF2cG9zIHZpZGVvJ30pO1xuXG4gICAgdi5JZFBhZ2VDdCA9IHYuZHBwICh7ZGl2OjAsIGNsYXNzOiAnY29sLXNtLTInLCBwYXJlbnQ6IElkTmF2fSk7XG5cbiAgICB2LklkTmF2UE4gPSB2LmRwcCAoe2RpdjowLCBjbGFzczogJ2NvbC1zbS0zJywgcGFyZW50OiBJZE5hdn0pO1xuXG4gICAgdmFyIElkVG9waWNSb3dzID0gdi5kcHAgKHtkaXY6MCwgbmFtZTogJ3RvcGljUm93cycsIHBhcmVudDogSWRDb250YWluZXIsIGNsYXNzOiAndzcwMCBwcmVsIHQ0MCd9KTtcblxuICAgIHZhciBJZFJvdzEgPSB2LmRwcCAoe2RpdjogMCwgbmFtZTogJ3RvcGljUm93czEnLCBjbGFzczogJ3JvdyB0b3BpY3Jvd3MnLCBwYXJlbnQ6IElkVG9waWNSb3dzfSlcbiAgICB2YXIgSWRSb3cyID0gdi5kcHAgKHtkaXY6IDAsIG5hbWU6ICd0b3BpY1Jvd3MyJywgY2xhc3M6ICdyb3cgdG9waWNyb3dzJywgcGFyZW50OiBJZFRvcGljUm93c30pXG5cbiAgICBmLm1ha2VDb2xzICgwLCBJZFJvdzEsIDQpO1xuICAgIGYubWFrZUNvbHMgKDQsIElkUm93MiwgMyk7XG5cbn07IC8vIGVuZCBmLmxheW91dFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLm1ha2VDb2xzID0gKGJhc2VJZCwgSWRSb3csIG51bUNvbHMpID0+IHtcblxuICAgIHZhciBjb2xzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1Db2xzOyBpKyspIHtcblxuICAgICAgICB2YXIgaWQgPSAnVycgKyAoaSArIDEgKyBiYXNlSWQpO1xuICAgICAgICBjb2xzLnB1c2ggKHtkaXY6IDAsIGlkOiBpZCwgY2xhc3M6ICdjb2xzIGNvbC1zbS0zJywgcGFyZW50OiBJZFJvd30pO1xuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspXG5cbiAgICB2LmRwcCAoY29scyk7XG5cbn07IC8vIGVuZCBmLm1ha2VDb2xzXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYucGxheVZpZGVvID0gKCkgPT4ge1xuXG4gICAgdi5oaWRkZW5TbGlkZSA9ICcjaicgKyB2LmN1clZpcztcblxuICAgICQodi5oaWRkZW5TbGlkZSArICc+IGltZycpXG4gICAgLmFkZENsYXNzICgnbm92aXMnKTtcblxuICAgICQodi5oaWRkZW5TbGlkZSArICc+IC5jYXB0aW9uJylcbiAgICAuYWRkQ2xhc3MgKCdub3ZpcycpO1xuXG4gICAgJCh2LklkVmlkZW8pXG4gICAgLnRleHQgKCdTbGlkZScpXG4gICAgLm9mZiAoJ2NsaWNrJylcbiAgICAuY2xpY2sgKGYucmVzdG9yZVNsaWRlKTtcblxuICAgIHZhciBzcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJyArIHYuc2xpZGVUb1ZpZGVvIFt2LmN1clZpc10gKyAnP2F1dG9wbGF5PTEnO1xuICAgIHYuSWRWaWRlb1BsYXlpbmcgPSB2LmRwcCAoe2lmcmFtZTogMCwgc3JjOiBzcmMsIGNsYXNzOiAnaW1ndmlkZW8nLCBwYXJlbnQ6IHYuaGlkZGVuU2xpZGUsIHByZXBlbmQ6IDF9KTtcblxufTsgLy8gZW5kIGYucGxheVZpZGVvXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYucmVzdG9yZVNsaWRlID0gKCkgPT4ge1xuXG4gICAgJCh2LklkVmlkZW9QbGF5aW5nKVxuICAgIC5yZW1vdmUgKCk7XG5cbiAgICAkKHYuaGlkZGVuU2xpZGUgKyAnPiBpbWcnKVxuICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICAkKHYuaGlkZGVuU2xpZGUgKyAnPiAuY2FwdGlvbicpXG4gICAgLnJlbW92ZUNsYXNzICgnbm92aXMnKTtcblxuICAgICQodi5JZFZpZGVvKVxuICAgIC50ZXh0ICgnVmlkZW8nKVxuICAgIC5vZmYgKCdjbGljaycpXG4gICAgLmNsaWNrIChmLnBsYXlWaWRlbyk7XG5cbiAgICB2LmhpZGRlblNsaWRlID0gbnVsbDtcblxufTsgLy8gZW5kIGYucmVzdG9yZVNsaWRlXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnNldE5leHRWaXMgPSAoZGVsdGEpID0+IHtcblxuICAgIGlmICh2LmhpZGRlblNsaWRlKSB7XG5cbiAgICAgICAgZi5yZXN0b3JlU2xpZGUgKCk7XG5cbiAgICB9IC8vIGVuZCBpZiAodi5oaWRkZW5TbGlkZSlcblxuICAgIHZhciBtZGVsdGEgPSBkZWx0YSA+PSAwID8gZGVsdGEgOiB2Lm1heEltYWdlcyArIGRlbHRhXG5cbiAgICB2YXIgbmV4dFZpcyA9ICh2LmN1clZpcyArIG1kZWx0YSkgJSB2Lm1heEltYWdlcztcblxuICAgIHZhciBJZFByZXYgPSAnI2onICsgdi5jdXJWaXM7XG4gICAgdmFyIElkTmV4dCA9ICcjaicgKyBuZXh0VmlzO1xuXG4gICAgJChJZFByZXYpXG4gICAgLmFkZENsYXNzICgnbm92aXMnKTtcblxuICAgICQoSWROZXh0KVxuICAgIC5yZW1vdmVDbGFzcyAoJ25vdmlzJyk7XG5cbiAgICB2LmN1clZpcyA9IG5leHRWaXM7XG5cbiAgICB2YXIgY3RSZWYgPSB2LmN0SSBbbmV4dFZpc107XG5cbiAgICB2YXIgc2xpZGVJID0gY3RSZWYgWzBdO1xuICAgIHZhciB0b3BpY0lkeCA9IGN0UmVmIFsxXTtcbiAgICB2YXIgdG90YWxJblNlY3Rpb24gPSB2LnRvcGljc0kgW3RvcGljSWR4XTtcblxuICAgIHYuZHBwICh7ZW1wdHk6IHYuSWRQYWdlQ3R9KTtcbiAgICB2LklkQ3VyU2xpZGUgPSB2LmRwcCAoe3NwYW46ICdzbGlkZTogJyArIHNsaWRlSSArICcvJyArIHRvdGFsSW5TZWN0aW9uLFxuICAgICAgICBwYXJlbnQ6IHYuSWRQYWdlQ3QsXG4gICAgICAgIGNsYXNzOiAnbmF2cG9zJ30pO1xuXG4gICAgJCh2LnRvcGljUmVmKVxuICAgIC5jc3MgKFxuICAgICAgICB7J2JhY2tncm91bmQtY29sb3InOiAnI2ZmZicsXG4gICAgICAgICdmb250LXdlaWdodCc6ICdub3JtYWwnfVxuICAgICk7XG5cbiAgICB2LnRvcGljUmVmID0gdi50b3BpY1JlZnMgW3RvcGljSWR4XTtcblxuICAgICQodi50b3BpY1JlZilcbiAgICAuY3NzIChcbiAgICAgICAgeydiYWNrZ3JvdW5kLWNvbG9yJzogJyNkNmZmZDYnLFxuICAgICAgICAnZm9udC13ZWlnaHQnOiAnYm9sZCd9XG4gICAgKTtcblxufTsgLy8gZW5kIGYuc2V0TmV4dFZpc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnRvcGljVG9WaWRlb0lkID0gKGFUYWdBKSA9PiB7XG5cbiAgICB2LnRvcGljVG9WaWRlbyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYVRhZ0EubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgYVRhZyA9IGFUYWdBIFtpXTtcbiAgICAgICAgdmFyIG0gPSBhVGFnLm1hdGNoICgvLip5b3V0dS5iZS4oW15cIl0rKVwiPihbXjxdKyk8Lyk7XG4gICAgICAgIGlmIChtKSB7XG5cbiAgICAgICAgICAgIHZhciB2aWRlb0lkID0gbSBbMV07XG4gICAgICAgICAgICB2YXIgdG9waWMgPSBtIFsyXTtcblxuICAgICAgICAgICAgdi50b3BpY1RvVmlkZW8gW3RvcGljXSA9IHZpZGVvSWQ7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKG0pXG5cblxuICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgYVRhZ0E7IGkrKylcblxuXG59OyAvLyBlbmQgZi50b3BpY1RvVmlkZW9JZFxuXG5cblxuLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZG9BY3Rpb24gPSAobXNnT2IpID0+IHtcbiAgICBjb25zb2xlLmxvZyAoJ21zZ09iOiAnICsgSlNPTi5zdHJpbmdpZnkgKG1zZ09iKSArICdcXG4nKTtcblxuICAgIHZhciBjbWQgPSB2LmtleTEgKG1zZ09iKTtcbiAgICB2YXIgdmFscyA9IG1zZ09iIFtjbWRdO1xuXG4gICAgc3dpdGNoIChjbWQpIHtcblxuICAgICAgICBjYXNlICdyZWFkeSc6XG5cbiAgICAgICAgICAgIGYuaW5pdFN0eWxlICgpO1xuICAgICAgICAgICAgdi53cy50b1NydnIgKHtnZXRWaWRlb0xpbmtzOjF9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3ZpZGVvTGlua3MnOlxuXG4gICAgICAgICAgICBmLnRvcGljVG9WaWRlb0lkICh2YWxzKTtcbiAgICAgICAgICAgIHYud3MudG9TcnZyICh7Z2V0UG5nRmlsZXM6MX0pO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncG5nRmlsZXMnOlxuXG4gICAgICAgICAgICAkKCdib2R5JylcbiAgICAgICAgICAgIC5lbXB0eSAoKTtcblxuICAgICAgICAgICAgZi5kb1NsaWRlU2hvdyAodmFscyk7XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAvLyBlbmQgc3dpdGNoIChjbWQpXG5cblxuXG59OyAvLyBlbmQgUC5kb0FjdGlvblxuXG5cbi8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5mLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuXG5cblxuIiwiLy8gZ28tajJoL2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcblxuLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciB2ID0ge1xuXG4gICAgaWQ6IDAsXG4gICAgcHJpbWl0aXZlVHlwZXNOb3ROdWxsOiB7J3N0cmluZyc6MSwgJ251bWJlcic6MSwgJ2Jvb2xlYW4nOjEsICdzeW1ib2wnOiAxfSxcbiAgICAgICAgLy8gc2luY2UgdHlwZW9mIG51bGwgeWllbGRzICdvYmplY3QnLCBpdCdzIGhhbmRsZWQgc2VwYXJhdGVseVxuXG4gICAgbXNnVHlwZXM6IHtcblxuICAgICAgICBwcmltYXJ5OiB7XG4gICAgICAgICAgICAgICAgLy8gdm9pZCB0YWdzXG4gICAgICAgICAgICBhcmVhOiAwLCBiYXNlOiAwLCBicjogMCwgY29sOiAwLCBlbWJlZDogMCwgaHI6IDAsIGltZzogMCwgaW5wdXQ6IDAsIGtleWdlbjogMCwgbGluazogMCwgbWV0YTogMCwgcGFyYW06IDAsIHNvdXJjZTogMCwgdHJhY2s6IDAsIHdicjogMCwgXG5cbiAgICAgICAgICAgICAgICAvLyBub24tdm9pZCB0YWdzXG4gICAgICAgICAgICBhOiAxLCBhYmJyOiAxLCBhZGRyZXNzOiAxLCBhcnRpY2xlOiAxLCBhc2lkZTogMSwgYXVkaW86IDEsIGI6IDEsIGJkaTogMSwgYmRvOiAxLCBibG9ja3F1b3RlOiAxLCBib2R5OiAxLCBidXR0b246IDEsIGNhbnZhczogMSwgY2FwdGlvbjogMSwgY2l0ZTogMSwgY29kZTogMSwgY29sZ3JvdXA6IDEsIGRhdGFsaXN0OiAxLCBkZDogMSwgZGVsOiAxLCBkZXRhaWxzOiAxLCBkZm46IDEsIGRpYWxvZzogMSwgZGl2OiAxLCBkbDogMSwgZHQ6IDEsIGVtOiAxLCBmaWVsZHNldDogMSwgZmlnY2FwdGlvbjogMSwgZmlndXJlOiAxLCBmb290ZXI6IDEsIGZvcm06IDEsIGgxOiAxLCBoMjogMSwgaDM6IDEsIGg0OiAxLCBoNTogMSwgaDY6IDEsIGhlYWQ6IDEsIGhlYWRlcjogMSwgaGdyb3VwOiAxLCBodG1sOiAxLCBpOiAxLCBpZnJhbWU6IDEsIGluczogMSwga2JkOiAxLCBsYWJlbDogMSwgbGVnZW5kOiAxLCBsaTogMSwgbWFwOiAxLCBtYXJrOiAxLCBtZW51OiAxLCBtZXRlcjogMSwgbmF2OiAxLCBub3NjcmlwdDogMSwgb2JqZWN0OiAxLCBvbDogMSwgb3B0Z3JvdXA6IDEsIG9wdGlvbjogMSwgb3V0cHV0OiAxLCBwOiAxLCBwcmU6IDEsIHByb2dyZXNzOiAxLCBxOiAxLCBycDogMSwgcnQ6IDEsIHJ1Ynk6IDEsIHM6IDEsIHNhbXA6IDEsIHNjcmlwdDogMSwgc2VjdGlvbjogMSwgc2VsZWN0OiAxLCBzbWFsbDogMSwgc3BhbjogMSwgc3Ryb25nOiAxLCBzdHlsZTogMSwgc3ViOiAxLCBzdW1tYXJ5OiAxLCBzdXA6IDEsIHN2ZzogMSwgdGFibGU6IDEsIHRib2R5OiAxLCB0ZDogMSwgdGV4dGFyZWE6IDEsIHRmb290OiAxLCB0aDogMSwgdGhlYWQ6IDEsIHRpbWU6IDEsIHRpdGxlOiAxLCB0cjogMSwgdTogMSwgdWw6IDEsICd2YXInOiAxLCB2aWRlbzogMSxcbiAgICAgICAgfSxcblxuICAgICAgICBzZWNvbmRhcnk6IHtzdHlsZTogMX0sXG4gICAgICAgICAgICAvLyBlbGVtZW50cyB0aGF0IGNhbiBiZSBlaXRoZXIgYSBwcmltYXJ5IHRhZyBpdHNlbGYgb3IgYW4gYXR0cmlidXRlIG9mIGFub3RoZXIgcHJpbWFyeSB0YWdcbiAgICAgICAgICAgIC8vIGlmIGFueSBvdGhlciBwcmltYXJ5IHRhZ3MgaXMgcHJlc2VudCwgdGhlbiBzZWNvbmRhcnkgdGFncyBhcmUgdHJlYXRlZCBhc1xuICAgICAgICAgICAgLy8gYXR0cmlidXRlcyBvZiB0aGUgb3RoZXIgcHJpbWFyeSB0YWdcblxuICAgICAgICBtZXRhOiB7XG4gICAgICAgICAgICBlbXB0eTogMSwgcm06IDEsIFxuICAgICAgICAgICAgcHJlcGVuZDogMSwgYXBwZW5kOiAxLCBiZWZvcmU6IDEsIGFmdGVyOiAxLCBwYXJlbnQ6IDEsXG4gICAgICAgICAgICBhdHRyOiAxLCBjb250ZW50OiAxLCB0ZXh0OiAxLCBcbiAgICAgICAgfSxcblxuICAgIH0sXG5cbiAgICBtc2cwOiByZXF1aXJlICgnZ28tbXNnJyksXG4gICAgbXNnOiBudWxsLFxuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG52YXIgZj17fTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuaW5pdCA9ICgpID0+IHtcbiAgICBcbiAgICB2Lm1zZyA9IG5ldyB2Lm1zZzAgKHYubXNnVHlwZXMpO1xuXG59OyAvLyBlbmQgZi5pbml0XG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuYXR0ciA9IChzZWxlY3RvciwgYXR0cikgPT4ge1xuICAgIFxuICAgICQoc2VsZWN0b3IpXG4gICAgLmF0dHIgKGF0dHIpO1xuXG59OyAvLyBlbmQgZi5hdHRyIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmVtcHR5ID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgXG4gICAgJChzZWxlY3RvcilcbiAgICAuZW1wdHkgKClcbiAgICAub2ZmICgna2V5ZG93bicpO1xuXG59OyAvLyBlbmQgZi5lbXB0eSBcblxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnJtID0gKHNlbGVjdG9yKSA9PiB7XG5cbiAgICAkKHNlbGVjdG9yKVxuICAgIC5yZW1vdmUgKCk7XG5cbn07IC8vIGVuZCBmLnJtXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZGlzcGxheU9iSCA9IChwYXJlbnQsIGRpc3BPYikgPT4ge1xuICAgIFxuICAgICAgICAvLyAtLS0tICBkb0FycmF5IC0tLS1cbiAgICB2YXIgZG9BcnJheSA9IGZ1bmN0aW9uIChkaXNwT2IpIHtcblxuICAgICAgICB2YXIgSWRzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcE9iLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIElkcy5wdXNoIChmLmRpc3BsYXlPYkggKHBhcmVudCwgZGlzcE9iIFtpXSkpO1xuXG4gICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcE9iLmxlbmd0aDsgaSsrKVxuXG4gICAgICAgIC8vcmV0dXJuIElkcztcbiAgICAgICAgcmV0dXJuIElkcyBbSWRzLmxlbmd0aCAtIDFdO1xuICAgICAgICBcbiAgICB9OyAgLy8gZW5kIGRvQXJyYXkgXG5cbiAgICAgICAgLy8gLS0tLSAgZG9PYmplY3QgLS0tLVxuICAgIHZhciBkb09iamVjdCA9IGZ1bmN0aW9uIChkaXNwT2IpIHtcblxuICAgICAgICB2YXIgZGlzcE9iUGFyc2VkID0gdi5tc2cucGFyc2VNc2cgKGRpc3BPYik7XG5cbiAgICAgICAgdmFyIHByaW1hcnlLZXkgPSBkaXNwT2JQYXJzZWQucDtcblxuICAgICAgICB2YXIgbWV0YSA9IGRpc3BPYlBhcnNlZC5tO1xuXG4gICAgICAgIHZhciBkZWxLZXkgPSBudWxsO1xuICAgICAgICB2YXIgcmVsTG9jID0gJ2FwcGVuZCc7XG5cbiAgICAgICAgdmFyIGF0dHIgPSBudWxsO1xuICAgICAgICB2YXIgY29udGVudCA9IG51bGw7XG4gICAgICAgIHZhciB0ZXh0ID0gbnVsbDtcblxuICAgICAgICBpZiAobWV0YS5oYXNPd25Qcm9wZXJ0eSAoJ3BhcmVudCcpKSB7XG4gICAgICAgICAgICAvLyBlbnN1cmVzIHByb2Nlc3Npbmcgb2YgJ3BhcmVudCcgYmVmb3JlIHJlbWFpbmRlciBvZiBtZXRhIGtleXNcblxuICAgICAgICAgICAgcGFyZW50ID0gbWV0YS5wYXJlbnQ7XG4gICAgICAgICAgICBkZWxldGUgbWV0YS5wYXJlbnQ7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKG1ldGEuaGFzT3duUHJvcGVydHkgKCdwYXJlbnQnKSlcbiAgICAgICAgXG4gICAgICAgIHZhciBtZXRhS2V5cyA9IE9iamVjdC5rZXlzIChtZXRhKTtcbiAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbWV0YUtleXMubGVuZ3RoOyBpZHgrKykge1xuXG4gICAgICAgICAgICB2YXIga2V5ID0gbWV0YUtleXMgW2lkeF07XG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHknOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JtJzpcbiAgICAgICAgICAgICAgICAgICAgZGVsS2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBtZXRhIFtrZXldO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2F0dHInOlxuICAgICAgICAgICAgICAgICAgICBhdHRyID0gbWV0YS5hdHRyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gbWV0YS5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IG1ldGEudGV4dDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwcmVwZW5kJzpcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2JlZm9yZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYWZ0ZXInOlxuICAgICAgICAgICAgICAgICAgICByZWxMb2MgPSBrZXk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBtZXRhIFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG9QYXJlbnQgPSB2YWwgIT09IDEgJiYgdmFsICE9PSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBkb1BhcmVudCA/IHZhbCA6IHBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHZhbCBpcyBvdGhlciB0aGFuIDEgb3IgdHJ1ZSwgcmVsTG9jIG92ZXJyaWRlcyBib3RoIHBhcmVudCB2YWx1ZXMgcGFzc2VkIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW50byBkaXNwbGF5T2JIIGFuZCBkZWZpbmVkIGJ5IG9wdGlvbmFsIHBhcmVudCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIHN3aXRjaCAoa2V5KVxuICAgICAgICAgICAgXG5cbiAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbWV0YUtleXMubGVuZ3RoOyBpZHgrKylcbiAgICAgICAgXG5cbiAgICAgICAgSWQgPSBudWxsO1xuXG4gICAgICAgIGlmIChkZWxLZXkpIHtcblxuICAgICAgICAgICAgZiBbZGVsS2V5XSAocGFyZW50KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGF0dHIpIHtcblxuICAgICAgICAgICAgZi5hdHRyIChwYXJlbnQsIGF0dHIpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgLy8gcmVwbGFjZXMgZW50aXJlIGNvbnRlbnQgb2YgcGFyZW50IHdpdGggbmV3IGNvbnRlbnRcblxuICAgICAgICAgICAgJChwYXJlbnQpXG4gICAgICAgICAgICAuZW1wdHkgKCk7XG5cbiAgICAgICAgICAgIGYuZGlzcGxheU9iSCAocGFyZW50LCBjb250ZW50KTtcbiAgICAgICAgICAgICAgICAvLyB3aXRob3V0IGVtcHR5aW5nIGZpcnN0LCB3aWxsIHNpbXBseSBhcHBlbmQgY29udGVudCB0byBleGlzdGluZyBjb250ZW50XG5cbiAgICAgICAgfSBlbHNlIGlmICh0ZXh0KSB7XG5cbiAgICAgICAgICAgIElkID0gZi50ZXh0TWFrZSAocGFyZW50LCByZWxMb2MsIHRleHQpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIElkID0gZi5lbGVtZW50TWFrZSAocGFyZW50LCByZWxMb2MsIHByaW1hcnlLZXksIGRpc3BPYlBhcnNlZC5jLCBkaXNwT2JQYXJzZWQucyk7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGRlbEtleSlcblxuICAgICAgICByZXR1cm4gSWQ7XG4gICAgICAgIFxuICAgIH07ICAvLyBlbmQgZG9PYmplY3QgXG5cblxuXG4gICAgICAgLy8gLS0tLSBtYWluIC0tLS1cbiAgICB2YXIgSWQ7XG4gICAgdmFyIGRpc3BPYlR5cGUgPSB0eXBlb2YgZGlzcE9iO1xuXG4gICAgaWYgKGRpc3BPYlR5cGUgPT09ICd1bmRlZmluZWQnIHx8IGRpc3BPYiA9PT0gMCB8fCBkaXNwT2IgPT09IG51bGwpIHtcblxuICAgICAgICBJZCA9IG51bGw7XG5cbiAgICB9IGVsc2UgaWYgKHYucHJpbWl0aXZlVHlwZXNOb3ROdWxsLmhhc093blByb3BlcnR5IChkaXNwT2JUeXBlKSkge1xuXG4gICAgICAgIElkID0gZi50ZXh0TWFrZSAocGFyZW50LCAnYXBwZW5kJywgZGlzcE9iKTtcbiAgICAgICAgICAgIC8vIGlmIHRleHQgc2hvdWxkIGJlIHBsYWNlZCBhdCBvdGhlciB0aGFuICdhcHBlbmQnIGxvY2F0aW9uLCB0aGVuIHVzZVxuICAgICAgICAgICAgLy8gJ3RleHQnIHRhZyBhbmQgc3BlY2lmeSBwcmVwZW5kLCBhZnRlciBvciBiZWZvcmUgYXMgbmVlZGVkXG5cbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkgKGRpc3BPYikpIHtcblxuICAgICAgICBJZCA9IGRvQXJyYXkgKGRpc3BPYik7XG5cbiAgICB9IGVsc2UgaWYgKGRpc3BPYlR5cGUgPT0gJ29iamVjdCcpIHtcblxuICAgICAgICBJZCA9IGRvT2JqZWN0IChkaXNwT2IpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBJZCA9IG51bGw7XG5cbiAgICB9IC8vIGVuZCBpZiAodHlwZW9mIGRpc3BPYiA9PT0gJ3VuZGVmaW5lZCcgfHwgZGlzcE9iID09PSAwIHx8IGRpc3BPYiA9PT0gbnVsbClcbiAgICBcbiAgICByZXR1cm4gSWQ7XG5cbn07IC8vIGVuZCBmLmRpc3BsYXlPYkggXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmVsZW1lbnRNYWtlID0gKHBhcmVudE9yU2libElkLCByZWxMb2MsIGVsTmFtZSwgY29udGVudCwgYXR0cnMpID0+IHtcbiAgICBcbiAgICB2YXIgaWQ7XG4gICAgdmFyIGF0dHJLZXlzID0gT2JqZWN0LmtleXMgKGF0dHJzKTtcbiAgICB2YXIgaGFzQXR0cnMgPSBhdHRyS2V5cy5sZW5ndGggPiAwO1xuXG4gICAgaWYgKGhhc0F0dHJzICYmIGF0dHJzLmhhc093blByb3BlcnR5ICgnaWQnKSkge1xuXG4gICAgICAgIGlkID0gYXR0cnMuaWQ7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlkID0gUC5nZW5JZCAoKTtcblxuICAgIH0gLy8gZW5kIGlmIChoYXNBdHRycylcbiAgICBcbiAgICB2YXIgSWQgPSAnIycgKyBpZDtcbiAgICBcbiAgICBpZiAoZWxOYW1lID09PSAnc2NyaXB0JyAmJiBjb250ZW50ICE9PSAwKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzk0MTM3MzcvaG93LXRvLWFwcGVuZC1zY3JpcHQtc2NyaXB0LWluLWphdmFzY3JpcHRcbiAgICAgICAgLy8gaW5zcGlyZWQgYnkgU08gcXVlc3Rpb24sIGJ1dCBzZXR0aW5nIGlubmVySFRNTCBpc24ndCBzdXBwb3NlZCB0byB3b3JrXG4gICAgICAgIC8vIHRoZXJlZm9yZSwgc2V0IHNyYyBhdHRyaWJ1dGUgd2l0aCBwYXRoIHRvIGZpbGUsIGluc3RlYWQgb2YgXG4gICAgICAgIC8vIHNldHRpbmcgaW5uZXJIVE1MIHRvIGNvbnRlbnQgb2YgZmlsZVxuXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYxMDk5NS9jYW50LWFwcGVuZC1zY3JpcHQtZWxlbWVudFxuICAgICAgICAvLyBqUXVlcnkgd29uJ3QgYWRkIHNjcmlwdCBlbGVtZW50IGFzIGl0IGRvZXMgd2l0aCBhbnkgb3RoZXIgZWxlbWVudC4gIFRoZXJlZm9yZSwgbXVzdCBiZSBkb25lXG4gICAgICAgIC8vIHVzaW5nIG9ubHkgamF2YXNjcmlwdCBhcyBmb2xsb3dzOlxuICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcblxuICAgICAgICBzY3JpcHQuc3JjID0gY29udGVudDtcbiAgICAgICAgc2NyaXB0LmlkID0gYXR0cnMuaWQ7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7ICAgICBcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdmFyIGRpdmVsID0gJzwnICsgZWxOYW1lICsgJyBpZD1cIicgKyBpZCArICdcIic7XG4gICAgXG4gICAgICAgIGlmIChjb250ZW50KSB7XG4gICAgXG4gICAgICAgICAgICBkaXZlbCArPSAnPjwvJyArIGVsTmFtZSArICc+JztcbiAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICBcbiAgICAgICAgICAgIGRpdmVsICs9ICc+JztcbiAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKGNvbnRlbnQpXG4gICAgXG4gICAgICAgICQocGFyZW50T3JTaWJsSWQpW3JlbExvY10gKGRpdmVsKTtcblxuICAgIH0gLy8gZW5kIGlmIChlbE5hbWUgPT09ICdzY3JpcHQnKVxuICAgIFxuICAgIFxuICAgIGlmIChoYXNBdHRycykge1xuICAgICAgICBcbiAgICAgICAgJChJZClcbiAgICAgICAgLmF0dHIgKGF0dHJzKTtcblxuICAgIH0gLy8gZW5kIGlmIChoYXNBdHRycylcblxuICAgIGYuZGlzcGxheU9iSCAoSWQsIGNvbnRlbnQpO1xuICAgIFxuICAgIGlmIChlbE5hbWUgPT09ICdmb3JtJykge1xuXG4gICAgICAgICQocGFyZW50KVxuICAgICAgICAuZm9jdXMgKCk7XG5cbiAgICB9IC8vIGVuZCBpZiAoZWxOYW1lID09PSAnZm9ybScpXG4gICAgXG4gICAgcmV0dXJuIElkO1xuXG59OyAvLyBlbmQgZi5lbGVtZW50TWFrZVxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnRleHRNYWtlID0gKHBhcmVudCwgcmVsTG9jLCBwcmltaXRpdmUpID0+IHtcbiAgICBcbiAgICBpZiAodHlwZW9mIHByaW1pdGl2ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgXG4gICAgICAgIHZhciBzaW5nbGVxdW90ZSA9ICcmI3gwMDI3Oyc7XG4gICAgICAgIHZhciBiYWNrc2xhc2ggPSAnJiN4MDA1YzsnO1xuICAgICAgICB2YXIgZG91YmxlcXVvdGUgPSAnJiN4MDAyMjsnO1xuICAgICAgICB2YXIgbHQgPSAnJmx0Oyc7XG4gICAgICAgIFxuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoLycvZywgc2luZ2xlcXVvdGUpO1xuICAgICAgICBwcmltaXRpdmUgPSBwcmltaXRpdmUucmVwbGFjZSAoL1wiL2csIGRvdWJsZXF1b3RlKTtcbiAgICAgICAgcHJpbWl0aXZlID0gcHJpbWl0aXZlLnJlcGxhY2UgKC9cXFxcL2csIGJhY2tzbGFzaCk7XG4gICAgICAgIHByaW1pdGl2ZSA9IHByaW1pdGl2ZS5yZXBsYWNlICgvPC9nLCBsdCk7XG5cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcmltaXRpdmUgPT09ICdzeW1ib2wnKSB7XG5cbiAgICAgICAgcHJpbWl0aXZlID0gJ3N5bWJvbCc7XG4gICAgICAgICAgICAvLyBvdGhlcndpc2Ugc3RyaW5naWZ5IHdvdWxkIHByb2R1Y2UgJ3t9JyB3aGljaCBpcyBsZXNzIHVzZWZ1bFxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBwcmltaXRpdmUgPSBKU09OLnN0cmluZ2lmeSAocHJpbWl0aXZlKTtcblxuICAgIH0gLy8gZW5kIGlmICh0eXBlb2YgcHJpbWl0aXZlID09PSAnc3RyaW5nJylcbiAgICBcblxuICAgICQocGFyZW50KSBbcmVsTG9jXSAocHJpbWl0aXZlKTtcblxuICAgIHJldHVybiBudWxsO1xuICAgICAgICAvLyB0ZXh0IG9icyBoYXZlIG5vIGlkJ3M6IG9ubHkgdGV4dCBpcyBhcHBlbmRlZCB3aXRoIG5vIHdheSB0byBhZGRyZXNzIGl0XG4gICAgICAgIC8vIGlmIGFkZHJlc3NpbmcgaXMgbmVjZXNzYXJ5LCB1c2Ugc3BhbiBpbnN0ZWFkIG9mIHRleHRcblxufTsgLy8gZW5kIGYudGV4dE1ha2UgXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kaXNwbGF5T2IgPSAoZGlzcE9iKSA9PiB7XG4gICAgXG4gICAgdmFyIHBhcmVudCA9ICdib2R5JztcbiAgICAgICAgLy8gaWYgcGFyZW50IG5vdCBmb3VuZCwgYXBwZW5kIHRvIGJvZHlcblxuICAgIGlmICh0eXBlb2YgZGlzcE9iID09PSAnb2JqZWN0JyAmJiBkaXNwT2IuaGFzT3duUHJvcGVydHkgKCdwYXJlbnQnKSkge1xuXG4gICAgICAgIHBhcmVudCA9IGRpc3BPYi5wYXJlbnQ7XG5cbiAgICB9IC8vIGVuZCBpZiAodHlwZW9mIGRpc3BPYiA9PT0gJ29iamVjdCcgJiYgZGlzcE9iLmhhc093blByb3BlcnR5ICgncGFyZW50JykpXG4gICAgXG4gICAgdmFyIElkID0gZi5kaXNwbGF5T2JIIChwYXJlbnQsIGRpc3BPYik7XG5cbiAgICByZXR1cm4gSWQ7XG5cbn07IC8vIGVuZCBQLmRpc3BsYXlPYiBcblxuUC5kaXNwbGF5UGFnZSA9IFAuZGlzcGxheU9iO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5nZW5JZCA9ICgpID0+IHtcblxuICAgIHZhciBpZCA9ICdpJyArIHYuaWQrKztcbiAgICByZXR1cm4gaWQ7XG5cbn07IC8vIGVuZCBQLmdlbklkXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuZ2VuSWRzID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBpZCA9IFAuZ2VuSWQgKCk7XG4gICAgdmFyIElkID0gJyMnICsgaWQ7XG5cbiAgICByZXR1cm4gW2lkLCBJZF07XG5cbn07IC8vIGVuZCBQLmdlbklkc1xuXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbmYuaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn0oKSk7XG5cblxuXG4iLCIvLyBnby1rZXkvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoanFTZWxlY3RvciwgcmVwb3J0U2hpZnQsIGtleURvd25IYW5kbGVyLCByZXBvcnRVcCwga2V5VXBIYW5kbGVyKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgdiA9IHtcblxuICAgIGpxU2VsZWN0b3I6ICdib2R5JyxcbiAgICByZXBvcnRTaGlmdDogZmFsc2UsXG4gICAga2V5RG93bkhhbmRsZXI6IG51bGwsXG4gICAgcmVwb3J0VXA6IGZhbHNlLFxuICAgIGtleVVwSGFuZGxlcjogbnVsbCxcblxuICAgIGtTaGlmdDogZmFsc2UsXG4gICAga0N0cmw6IGZhbHNlLFxuICAgIGtBbHQ6IGZhbHNlLFxuICAgIGtDbWQ6IGZhbHNlLFxuICAgIGtJZ25vcmU6IGZhbHNlLFxuICAgIHdoaWNoU2hpZnRLZXlzOiB7MTY6MSwgMTc6MSwgMTg6MSwgOTE6MSwgOTI6MSwgOTM6MSwgMjI0OjF9LFxuXG4gICAgICAgICAgICAvLyBub3QgcHJpbnRhYmxlIG9yIG5vbi1hc2NpaSBibG9ja1xuICAgIGN0cmxPck5vbkFzY2lpOiB7XG4gICAgICAgIDg6ICdCYWNrc3BhY2UnLFxuICAgICAgICA5OiAnVGFiJyxcbiAgICAgICAgMTM6ICdFbnRlcicsXG4gICAgICAgIDE2OiAnU2hpZnQnLFxuICAgICAgICAxNzogJ0N0cmwnLFxuICAgICAgICAxODogJ0FsdCcsXG4gICAgICAgIDE5OiAnUGF1c2UtYnJlYWsnLFxuICAgICAgICAyMDogJ0NhcHMtbG9jaycsXG4gICAgICAgIDI3OiAnRXNjJyxcbiAgICAgICAgMzI6ICcgJywgIC8vIFNwYWNlXG4gICAgICAgIDMzOiAnUGFnZVVwJyxcbiAgICAgICAgMzQ6ICdQYWdlRG93bicsXG4gICAgICAgIDM1OiAnRW5kJyxcbiAgICAgICAgMzY6ICdIb21lJyxcbiAgICAgICAgMzc6ICdMZWZ0JyxcbiAgICAgICAgMzg6ICdVcCcsXG4gICAgICAgIDM5OiAnUmlnaHQnLFxuICAgICAgICA0MDogJ0Rvd24nLFxuICAgICAgICA0NTogJ0luc2VydCcsXG4gICAgICAgIDQ2OiAnRGVsZXRlJyxcbiAgICAgICAgOTE6ICdXaW5kb3dzS2V5TGVmdCcsXG4gICAgICAgIDkyOiAnV2luZG93c0tleVJpZ2h0JyxcbiAgICAgICAgOTM6ICdXaW5kb3dzT3B0aW9uS2V5JyxcbiAgICAgICAgOTY6ICcwJywgIC8vIE51bXBhZFxuICAgICAgICA5NzogJzEnLCAgLy8gTnVtcGFkXG4gICAgICAgIDk4OiAnMicsICAvLyBOdW1wYWRcbiAgICAgICAgOTk6ICczJywgIC8vIE51bXBhZFxuICAgICAgICAxMDA6ICc0JywgIC8vIE51bXBhZFxuICAgICAgICAxMDE6ICc1JywgIC8vIE51bXBhZFxuICAgICAgICAxMDI6ICc2JywgIC8vIE51bXBhZFxuICAgICAgICAxMDM6ICc3JywgIC8vIE51bXBhZFxuICAgICAgICAxMDQ6ICc4JywgIC8vIE51bXBhZFxuICAgICAgICAxMDU6ICc5JywgIC8vIE51bXBhZFxuICAgICAgICAxMDY6ICcqJywgIC8vIE51bXBhZFxuICAgICAgICAxMDc6ICcrJywgIC8vIE51bXBhZFxuICAgICAgICAxMDk6ICctJywgIC8vIE51bXBhZFxuICAgICAgICAxMTA6ICcuJywgIC8vIE51bXBhZFxuICAgICAgICAxMTE6ICcvJywgIC8vIE51bXBhZFxuICAgICAgICAxMTI6ICdGMScsXG4gICAgICAgIDExMzogJ0YyJyxcbiAgICAgICAgMTE0OiAnRjMnLFxuICAgICAgICAxMTU6ICdGNCcsXG4gICAgICAgIDExNjogJ0Y1JyxcbiAgICAgICAgMTE3OiAnRjYnLFxuICAgICAgICAxMTg6ICdGNycsXG4gICAgICAgIDExOTogJ0Y4JyxcbiAgICAgICAgMTIwOiAnRjknLFxuICAgICAgICAxMjE6ICdGMTAnLFxuICAgICAgICAxMjI6ICdGMTEnLFxuICAgICAgICAxMjM6ICdGMTInLFxuICAgICAgICAxNDQ6ICdOdW1sb2NrJyxcbiAgICAgICAgMTQ1OiAnU2Nyb2xsLWxvY2snLFxuICAgICAgICAyMjQ6ICdNYWNDbWQnLFxuICAgIH0sXG4gICAgXG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBhc2NpaVVuU2hpZnRlZDoge1xuICAgICAgICA0ODogJzAnLFxuICAgICAgICA0OTogJzEnLFxuICAgICAgICA1MDogJzInLFxuICAgICAgICA1MTogJzMnLFxuICAgICAgICA1MjogJzQnLFxuICAgICAgICA1MzogJzUnLFxuICAgICAgICA1NDogJzYnLFxuICAgICAgICA1NTogJzcnLFxuICAgICAgICA1NjogJzgnLFxuICAgICAgICA1NzogJzknLFxuICAgICAgICA1OTogJzsnLFxuICAgICAgICA2MTogJz0nLFxuICAgICAgICA2NTogJ2EnLFxuICAgICAgICA2NjogJ2InLFxuICAgICAgICA2NzogJ2MnLFxuICAgICAgICA2ODogJ2QnLFxuICAgICAgICA2OTogJ2UnLFxuICAgICAgICA3MDogJ2YnLFxuICAgICAgICA3MTogJ2cnLFxuICAgICAgICA3MjogJ2gnLFxuICAgICAgICA3MzogJ2knLFxuICAgICAgICA3NDogJ2onLFxuICAgICAgICA3NTogJ2snLFxuICAgICAgICA3NjogJ2wnLFxuICAgICAgICA3NzogJ20nLFxuICAgICAgICA3ODogJ24nLFxuICAgICAgICA3OTogJ28nLFxuICAgICAgICA4MDogJ3AnLFxuICAgICAgICA4MTogJ3EnLFxuICAgICAgICA4MjogJ3InLFxuICAgICAgICA4MzogJ3MnLFxuICAgICAgICA4NDogJ3QnLFxuICAgICAgICA4NTogJ3UnLFxuICAgICAgICA4NjogJ3YnLFxuICAgICAgICA4NzogJ3cnLFxuICAgICAgICA4ODogJ3gnLFxuICAgICAgICA4OTogJ3knLFxuICAgICAgICA5MDogJ3onLFxuICAgICAgICAxNzM6ICctJyxcbiAgICAgICAgMTg4OiAnLCcsXG4gICAgICAgIDE5MDogJy4nLFxuICAgICAgICAxOTE6ICcvJyxcbiAgICAgICAgMTkyOiAnYCcsXG4gICAgICAgIDIxOTogJ1snLFxuICAgICAgICAyMjA6IFwiXFxcXFwiLFxuICAgICAgICAyMjE6ICddJyxcbiAgICAgICAgMjIyOiBcIidcIixcbiAgICAxODY6IFwiO1wiLCAgLy8gZGl0dG8gZm9yICc7J1xuICAgIDE4NzogXCI9XCIsICAvLyBhcHBhcmVudGx5LCBjaHJvbWUgdGhpbmtzIHdoaWNoIGlzIDE4NyBmb3IgJz0nLCBidXQgbm90IGZpcmVmb3hcbiAgICAxODk6IFwiLVwiLCAgLy8gZGl0dG8gZm9yICctJ1xuICAgIH0sXG4gICAgXG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBhc2NpaVNoaWZ0ZWQ6IHtcbiAgICAgICAgNDg6ICcpJyxcbiAgICAgICAgNDk6ICchJyxcbiAgICAgICAgNTA6ICdAJyxcbiAgICAgICAgNTE6ICcjJyxcbiAgICAgICAgNTI6ICckJyxcbiAgICAgICAgNTM6ICclJyxcbiAgICAgICAgNTQ6ICdeJyxcbiAgICAgICAgNTU6ICcmJyxcbiAgICAgICAgNTY6ICcqJyxcbiAgICAgICAgNTc6ICcoJyxcbiAgICAgICAgNTk6ICc6JyxcbiAgICAgICAgNjE6ICcrJyxcbiAgICAgICAgNjU6ICdBJyxcbiAgICAgICAgNjY6ICdCJyxcbiAgICAgICAgNjc6ICdDJyxcbiAgICAgICAgNjg6ICdEJyxcbiAgICAgICAgNjk6ICdFJyxcbiAgICAgICAgNzA6ICdGJyxcbiAgICAgICAgNzE6ICdHJyxcbiAgICAgICAgNzI6ICdIJyxcbiAgICAgICAgNzM6ICdJJyxcbiAgICAgICAgNzQ6ICdKJyxcbiAgICAgICAgNzU6ICdLJyxcbiAgICAgICAgNzY6ICdMJyxcbiAgICAgICAgNzc6ICdNJyxcbiAgICAgICAgNzg6ICdOJyxcbiAgICAgICAgNzk6ICdPJyxcbiAgICAgICAgODA6ICdQJyxcbiAgICAgICAgODE6ICdRJyxcbiAgICAgICAgODI6ICdSJyxcbiAgICAgICAgODM6ICdTJyxcbiAgICAgICAgODQ6ICdUJyxcbiAgICAgICAgODU6ICdVJyxcbiAgICAgICAgODY6ICdWJyxcbiAgICAgICAgODc6ICdXJyxcbiAgICAgICAgODg6ICdYJyxcbiAgICAgICAgODk6ICdZJyxcbiAgICAgICAgOTA6ICdaJyxcbiAgICAgICAgMTczOiAnXycsXG4gICAgICAgIDE4ODogJzwnLFxuICAgICAgICAxOTA6ICc+JyxcbiAgICAgICAgMTkxOiAnPycsXG4gICAgICAgIDE5MjogJ34nLFxuICAgICAgICAyMTk6ICd7JyxcbiAgICAgICAgMjIwOiAnfCcsXG4gICAgICAgIDIyMTogJ30nLFxuICAgICAgICAyMjI6ICdcIicsXG4gICAgMTg2OiBcIjpcIiwgIC8vIGRpdHRvIGZvciAnOidcbiAgICAxODc6IFwiK1wiLCAgLy8gZGl0dG8gZm9yICcrJ1xuICAgIDE4OTogXCJfXCIsICAvLyBkaXR0byBmb3IgJy0nXG4gICAgfSxcblxuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG52YXIgZj17fTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmluaXQgPSAoKSA9PiB7XG4gICAgXG4gICAgdi5qcVNlbGVjdG9yID0ganFTZWxlY3RvciA/IGpxU2VsZWN0b3IgOiAnYm9keSc7XG4gICAgdi5yZXBvcnRTaGlmdCA9IHJlcG9ydFNoaWZ0ID8gcmVwb3J0U2hpZnQgOiBmYWxzZTtcbiAgICB2LmtleURvd25IYW5kbGVyID0ga2V5RG93bkhhbmRsZXIgPyBrZXlEb3duSGFuZGxlciA6IGYuZGVmYXVsdEhhbmRsZXI7XG4gICAgdi5yZXBvcnRVcCA9IHJlcG9ydFVwID8gcmVwb3J0VXAgOiBmYWxzZTtcbiAgICB2LmtleVVwSGFuZGxlciA9IGtleVVwSGFuZGxlciA/IGtleVVwSGFuZGxlciA6IGYuZGVmYXVsdEhhbmRsZXI7XG5cbiAgICAvL1Auc2V0S2V5T24gKHYuanFTZWxlY3Rvcik7XG4gICAgUC5zZXRLZXlPbiAoKTtcbiAgICBpZiAodHlwZW9mIF9tMCA9PT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICBfbTAgPSB7fTtcblxuICAgIH0gLy8gZW5kIGlmICh0eXBlb2YgX20wID09PSAndW5kZWZpbmVkJylcbiAgICBcbiAgICBcbiAgICBpZiAoIV9tMC5rZXlFdmVudHMpIHtcblxuICAgICAgICBfbTAua2V5RXZlbnRzID0ge307XG4gICAgICAgIC8qXG4gICAgICAgICAgICAvLyBvdmVycmlkZSBqcXVlcnkncyByZW1vdmUgZnVuY3Rpb24gdG8gdHVybiBvbiBhbGwga2V5IGhhbmRsZXJzIGFmdGVyIHJlbW92YWwgb2YgYSBmb3JtXG4gICAgICAgIHZhciBybU9yaWcgPSAkLmZuLnJlbW92ZTtcbiAgICAgICAgJC5mbi5yZW1vdmUgPSBmdW5jdGlvbiAoKXtcblxuICAgICAgICAgICAgJCh0aGlzKVxuICAgICAgICAgICAgLmhhcyAoJ2Zvcm0nKVxuICAgICAgICAgICAgLmVhY2ggKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBQLmFsbEtleXNPbiAoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBybU9yaWcuYXBwbHkgKHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgKi9cblxuICAgIH0gLy8gZW5kIGlmICghX20wLmtleUV2ZW50cylcblxuICAgIHZhciBrZXlFdmVudHMgPSBfbTAua2V5RXZlbnRzO1xuICAgIGtleUV2ZW50cyBbdi5qcVNlbGVjdG9yXSA9IHtvbjogUC5zZXRLZXlPbiwgb2ZmOiBQLnNldEtleU9mZn07XG4gICAgXG5cbn07IC8vIGVuZCBmLmluaXRcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuY0tleURvd24gPSAoZXZlbnQpID0+IHtcbiAgICAvLyBjYWxsYmFjayBpcyB2LmtleURvd25IbmRsZXJcbiAgICAvLyByZXR1cm5zIGNoIG9iamVjdCByZWZsZWN0aW5nIHdoaWNoIHNoaWZ0IGtleXMgd2VyZSBwcmVzc2VkIGRvd24sIGNoIGFuZCB3aGljaCB2YWx1ZXNcbiAgICAvL1xuICAgIC8vIHYucmVwb3J0U2hpZnQgdHJ1ZSA9PiB0cmlnZ2VyIGNhbGxiYWNrIGZvciBlYWNoIGtleWRvd24gZXZlbnQgb2YgYW55IGtleSwgXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGluZyBhbnkgc2hpZnQga2V5XG4gICAgLy8gICAgIGZhbHNlID0+IHNoaWZ0IGtleSBldmVudCByZXBvcnRlZCBvbmx5IHdoZW4gdGhlIG5leHQgbm9uLXNoaWZ0IGtleWRvd24gZXZlbnQuXG4gICAgLy8gICAgICAgICAgICAgIFNvLCBjYWxsYmFjayBpcyBvbmx5IHRyaWdnZXJlZCBmb3Igbm9uLXNoaWZ0IGtleSBldmVudHNcbiAgICBcbiAgICAvL2NvbnNvbGUubG9nICgnZ28ta2V5LmNLZXlEb3duIGpxU2VsZWN0b3I6ICcgKyB2LmpxU2VsZWN0b3IpO1xuXG4gICAgdmFyIHdoaWNoID0gZXZlbnQud2hpY2g7XG5cbiAgICAgICAgLy8gbmV2ZXIgaWdub3JlICdFc2MnIGtleSA9PSAyN1xuICAgIGlmICh2LmtJZ25vcmUgJiYgd2hpY2ggIT0gMjcpIHtcblxuICAgICAgICByZXR1cm47XG5cbiAgICB9IC8vIGVuZCBpZiAoa0lnbm9yZSlcbiAgICBcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbiAoKTtcblxuICAgIHZhciBpc0FTaGlmdEtleSA9IHRydWU7XG4gICAgc3dpdGNoICh3aGljaCkge1xuXG4gICAgICAgIGNhc2UgMTY6IFxuICAgICAgICAgICAgdi5rU2hpZnQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAxNzogXG4gICAgICAgICAgICB2LmtDdHJsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgdi5rQWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgOTE6IFxuICAgICAgICBjYXNlIDkyOiBcbiAgICAgICAgY2FzZSA5MzogXG4gICAgICAgIGNhc2UgMjI0OlxuICAgICAgICAgICAgdi5rQ21kID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpc0FTaGlmdEtleSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICB9ICAgXG5cbiAgICBmLmNLZXlVcERvd25GaW5pc2ggKGlzQVNoaWZ0S2V5LCB3aGljaCwgdi5rZXlEb3duSGFuZGxlcik7XG5cbiAgICBpZiAoIWlzQVNoaWZ0S2V5KSB7XG5cbiAgICAgICAgdi5rU2hpZnQgPSBmYWxzZTtcbiAgICAgICAgdi5rQ3RybCA9IGZhbHNlO1xuICAgICAgICB2LmtBbHQgPSBmYWxzZTtcbiAgICAgICAgdi5rQ21kID0gZmFsc2U7XG5cbiAgICB9IC8vIGVuZCBpZiAoIWlzQVNoaWZ0S2V5KVxuICAgIFxuXG59OyAvLyBlbmQgZi5jS2V5RG93biBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5jS2V5VXAgPSAoZXZlbnQpID0+IHtcbiAgICAvLyBjYWxsYmFjayBpcyB2LmtleURvd25IbmRsZXJcbiAgICBcbiAgICB2YXIgd2hpY2ggPSBldmVudC53aGljaDtcblxuICAgICAgICAvLyBuZXZlciBpZ25vcmUgJ0VzYycga2V5ID09IDI3XG4gICAgaWYgKHYua0lnbm9yZSAmJiB3aGljaCAhPSAyNykge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChrSWdub3JlKVxuICAgIFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uICgpO1xuXG4gICAgdmFyIGlzQVNoaWZ0S2V5ID0gdHJ1ZTtcbiAgICBzd2l0Y2ggKHdoaWNoKSB7XG5cbiAgICAgICAgY2FzZSAxNjogXG4gICAgICAgICAgICB2LmtTaGlmdCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTc6IFxuICAgICAgICAgICAgdi5rQ3RybCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTg6IFxuICAgICAgICAgICAgdi5rQWx0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA5MTogXG4gICAgICAgIGNhc2UgOTI6IFxuICAgICAgICBjYXNlIDkzOiBcbiAgICAgICAgY2FzZSAyMjQ6IFxuICAgICAgICAgICAgdi5rQ21kID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaXNBU2hpZnRLZXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgfSAgIFxuXG4gICAgaWYgKCF2LnJlcG9ydFVwKSB7XG5cbiAgICAgICAgcmV0dXJuO1xuXG4gICAgfSAvLyBlbmQgaWYgKCFyZXBvcnRVcClcbiAgICBcbiAgICBmLmNLZXlVcERvd25GaW5pc2ggKGlzQVNoaWZ0S2V5LCB3aGljaCwgdi5rZXlVcEhhbmRsZXIpO1xuXG59OyAvLyBlbmQgZi5jS2V5VXAgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmNLZXlVcERvd25GaW5pc2ggPSAoaXNBU2hpZnRLZXksIHdoaWNoLCBjYWxsYmFjaykgPT4ge1xuICAgIFxuICAgIGlmIChpc0FTaGlmdEtleSAmJiAhdi5yZXBvcnRTaGlmdCkge1xuXG4gICAgICAgIHJldHVybjtcblxuICAgIH0gLy8gZW5kIGlmIChpc0FTaGlmdEtleSAmJiAhdi5yZXBvcnRTaGlmdClcbiAgICBcbiAgICB2YXIgdGhpc0NoID0gZi5nZXRLZXlDb2RlICh3aGljaCk7XG5cbiAgICB2YXIgY2hPYiA9ICh7XG4gICAgICAgIHNoaWZ0OiB2LmtTaGlmdCxcbiAgICAgICAgY3RybDogdi5rQ3RybCxcbiAgICAgICAgYWx0OiB2LmtBbHQsXG4gICAgICAgIG1hY0NtZDogdi5rQ21kLFxuICAgICAgICB3aGljaDogd2hpY2gsXG4gICAgICAgIGNoOiB0aGlzQ2gsXG4gICAgICAgIGlzQVNoaWZ0S2V5OiBpc0FTaGlmdEtleSxcbiAgICB9KTtcblxuICAgIC8vIGNvbnNvbGUubG9nICgnY2hPYjogJyArIEpTT04uc3RyaW5naWZ5IChjaE9iKSArICdcXG4nKTtcbiAgICAvKlxuICAgIGlmICh2LnJlcG9ydFNoaWZ0KSB7XG5cbiAgICAgICAgY2hPYi5pc0FTaGlmdEtleSA9IGlzQVNoaWZ0S2V5OyAgXG4gICAgICAgICAgICAvLyB0cnVlIGlmIGFueSBvZjogc2hpZnQsIGN0cmwsIGFsdCwgb3IgbWFjQ21kIGFyZSB0cnVlXG4gICAgICAgICAgICAvLyBvbmx5IHJlbGV2YW50IGlmIHYucmVwb3J0U2hpZnQgaXMgdHJ1ZVxuXG4gICAgfSAvLyBlbmQgaWYgKHYucmVwb3J0U2hpZnQpXG4gICAgKi9cblxuICAgIGNhbGxiYWNrIChjaE9iKTtcblxufTsgLy8gZW5kIGYuY0tleVVwRG93bkZpbmlzaCBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kZWZhdWx0SGFuZGxlciA9IChjaE9iKSA9PiB7XG4gICAgXG4gICAgdmFyIGNoT2JTID0gSlNPTi5zdHJpbmdpZnkgKGNoT2IpO1xuICAgIGNvbnNvbGUubG9nICgnZ28ta2V5LmRlZmF1bHRIYW5kbGVyLmNoT2I6ICcgKyBjaE9iUyk7XG5cbn07IC8vIGVuZCBmLmRlZmF1bHRIYW5kbGVyIFxuXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZ2V0S2V5Q29kZSA9ICh3aGljaCkgPT4ge1xuICAgIFxuXG4gICAgdmFyIGNoO1xuXG4gICAgaWYgKHYuY3RybE9yTm9uQXNjaWkuaGFzT3duUHJvcGVydHkgKHdoaWNoKSkge1xuXG4gICAgICAgIGNoID0gdi5jdHJsT3JOb25Bc2NpaSBbd2hpY2hdO1xuXG4gICAgfSBlbHNlIGlmICh2LmtTaGlmdCAmJiB2LmFzY2lpU2hpZnRlZC5oYXNPd25Qcm9wZXJ0eSAod2hpY2gpKSB7XG5cbiAgICAgICAgY2ggPSB2LmFzY2lpU2hpZnRlZCBbd2hpY2hdO1xuXG4gICAgfSBlbHNlIGlmICghdi5rU2hpZnQgJiYgdi5hc2NpaVVuU2hpZnRlZC5oYXNPd25Qcm9wZXJ0eSAod2hpY2gpKSB7XG5cbiAgICAgICAgY2ggPSB2LmFzY2lpVW5TaGlmdGVkIFt3aGljaF07XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGNoID0gbnVsbDtcblxuICAgIH0gLy8gZW5kIGlmIFxuXG4gICAgcmV0dXJuIGNoO1xuXG59OyAvLyBlbmQgZi5nZXRLZXlDb2RlIFxuXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuaW5pdEtleURvd24gPSAoanFTZWxlY3RvcikgPT4ge1xuICAgIFxuICAgICQoanFTZWxlY3RvcilcbiAgICAub2ZmKCdrZXlkb3duJylcbiAgICAua2V5ZG93biAoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2cgKCcgPT0+IGluaXRLZXlEb3duJyk7XG4gICAgICAgIGYuY0tleURvd24gKGV2ZW50KTtcbiAgICB9KTtcblxufTsgLy8gZW5kIGYuaW5pdEtleURvd24gXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuaW5pdEtleVVwID0gKGpxU2VsZWN0b3IpID0+IHtcbiAgICBcbiAgICAkKGpxU2VsZWN0b3IpXG4gICAgLm9mZigna2V5dXAnKVxuICAgIC5rZXl1cCAoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2cgKCcgPT0+IGluaXRLZXlVcCcpO1xuICAgICAgICBmLmNLZXlVcCAoZXZlbnQpO1xuICAgIH0pO1xuXG59OyAvLyBlbmQgZi5pbml0S2V5VXAgXG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5hbGxLZXlzT2ZmID0gKCkgPT4ge1xuICAgIFxuICAgIHZhciBrZXlFdmVudHMgPSBfbTAua2V5RXZlbnRzO1xuICAgIHZhciBrZXlTZWxzID0gT2JqZWN0LmtleXMgKGtleUV2ZW50cyk7XG5cbiAgICBrZXlTZWxzLmZvckVhY2ggKGZ1bmN0aW9uIChlbCkge1xuXG4gICAgICAgIGtleUV2ZW50cyBbZWxdLm9mZiAoKTtcbiAgICB9KTtcblxufTsgLy8gZW5kIFAuYWxsS2V5c09mZlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmFsbEtleXNPbiA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIga2V5RXZlbnRzID0gX20wLmtleUV2ZW50cztcbiAgICB2YXIga2V5U2VscyA9IE9iamVjdC5rZXlzIChrZXlFdmVudHMpO1xuXG4gICAga2V5U2Vscy5mb3JFYWNoIChmdW5jdGlvbiAoZWwpIHtcblxuICAgICAgICBrZXlFdmVudHMgW2VsXS5vbiAoKTtcbiAgICB9KTtcblxufTsgLy8gZW5kIFAuYWxsS2V5c09uXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuc2V0S2V5T2ZmID0gKCkgPT4ge1xuICAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nICgnU0VUS0VZT0ZGIGdvLWtleS5zZXRLZXlPZmYgICAgIGpxU2VsZWN0b3IgPSAnICsgdi5qcVNlbGVjdG9yKTtcbiAgICAkKHYuanFTZWxlY3RvcilcbiAgICAub2ZmICgna2V5ZG93bicpXG4gICAgLm9mZiAoJ2tleXVwJyk7XG5cbn07IC8vIGVuZCBQLnNldEtleU9mZlxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vL1Auc2V0S2V5T24gPSAoanFTZWwpID0+IHtcblAuc2V0S2V5T24gPSAoKSA9PiB7XG4gICAgXG4gICAgICAgIC8vY29uc29sZS5sb2cgKCdTRVRLRVlPTiBnby1rZXkuc2V0S2V5T24gICBqcVNlbGVjdG9yID0gJyArIHYuanFTZWxlY3Rvcik7XG4gICAgLy9mLmluaXRLZXlVcCAoanFTZWwpO1xuICAgIC8vZi5pbml0S2V5RG93biAoanFTZWwpO1xuICAgIGYuaW5pdEtleVVwICh2LmpxU2VsZWN0b3IpO1xuICAgIGYuaW5pdEtleURvd24gKHYuanFTZWxlY3Rvcik7XG5cbn07IC8vIGVuZCBQLnNldEtleUhhbmRsZXJcblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbmYuaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG4iLCIvLyBnby1tc2cvaW5kZXguanNcbi8vIGdvLW1zZyBvYmplY3QgaGFzIGEgdW5pcXVlIHByaW1hcnkgbXNnIGFuZCB6ZXJvIG9yIG1vcmUgb3B0aW9uYWwgYXR0cmlidXRlc1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHAwKSB7XG5cbiAgICAvLyBQUklWQVRFIFByb3BlcnRpZXNcbnZhciB2ID0ge1xuXG4gICAgcHJpbWFyeTogbnVsbCxcbiAgICAgICAgLy8gcHJpbWFyeToge2NtZDogMX0gKGNvbnRhaW5zIG9wdGlvbmFsIGNvbnRlbnQpIG9yIHtjbWQ6IDB9IChubyBvcHRpb25hbCBjb250ZW50IGFsbG93ZWQpXG5cbiAgICBzZWNvbmRhcnk6IG51bGwsXG4gICAgICAgIC8vIGlmIGEgcHJpbWFyeSBtZXNzYWdlIGhhcyBhbiBvcHRpb25hbCBhdHRyaWJ1dGUgdGhhdCBjb25jaWRlbnRhbGx5IGlzIHRoZSBzYW1lIGFzXG4gICAgICAgIC8vIGFub3RoZXIgcHJpbWFyeSBtZXNzYWdlLCBpdCBzaG91bGQgYmUgaGF2ZSBhIGtleS92YWx1ZSBwYWlyIGluIHNlY29uZGFyeSB7YXR0cjogMX1cbiAgICAgICAgLy8gdG8gZW5zdXJlIHRoYXQgaXQgd2lsbCBiZSB0cmVhdGVkIGFzIGFuIGF0dHJpYnV0ZSBpbiBjYXNlIGEgcHJpbWFyeSBpcyBwcmVzZW50XG4gICAgICAgIC8vIFNlY29uZGFyeSBpcyBvbmx5IHRlc3RlZCBpZiB0aGVyZSBleGlzdHMgYSBwcmltYXJ5IGtleVxuXG4gICAgbWV0YTogbnVsbCxcbiAgICAgICAgLy8gbWV0YSBwYXJhbWV0ZXJzIGludGVuZGVkIGZvciBjdHJsIG9yIG90aGVyIHB1cnBvc2Ugb3V0c2lkZSBvZiBwcmltYXJ5IGFuZCBzZWNvbmRhcnkgbXNnXG4gICAgICAgIC8vIHBhcmFtZXRlciB1c2FnZVxuXG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xuXG4gICAgLy8gUFJJVkFURSBGdW5jdGlvbnNcbmYgPSB7fTtcblxuXG5mLmluaXQgPSAoKSA9PiB7XG5cbiAgICB2LnByaW1hcnkgPSBwMC5wcmltYXJ5O1xuICAgIHYuc2Vjb25kYXJ5ID0gcDAuaGFzT3duUHJvcGVydHkgKCdzZWNvbmRhcnknKSA/IHAwLnNlY29uZGFyeSA6IHt9O1xuICAgIHYubWV0YSA9IHAwLmhhc093blByb3BlcnR5ICgnbWV0YScpID8gcDAubWV0YSA6IHt9O1xufTtcblxuICAgIC8vIFBVQkxJQyBGdW5jdGlvbnNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnBhcnNlTXNnID0gKG1zZ09iKSA9PiB7XG4gICAgXG4gICAgdmFyIHJlcyA9IHt9O1xuICAgIHZhciBtc2dLZXlzID0gT2JqZWN0LmtleXMgKG1zZ09iKTtcblxuICAgIHZhciBwcmltYXJ5Q2FuZGlkYXRlc09iID0ge307XG4gICAgdmFyIGF0dHJzT2IgPSB7fTtcbiAgICB2YXIgbWV0YU9iID0ge307XG5cbiAgICB2YXIga2V5O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnS2V5cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIGtleSA9IG1zZ0tleXMgW2ldO1xuICAgICAgICBcbiAgICAgICAgaWYgKHYucHJpbWFyeS5oYXNPd25Qcm9wZXJ0eSAoa2V5KSkge1xuXG4gICAgICAgICAgICBwcmltYXJ5Q2FuZGlkYXRlc09iIFtrZXldID0gMTtcblxuICAgICAgICB9IGVsc2UgaWYgKHYubWV0YS5oYXNPd25Qcm9wZXJ0eSAoa2V5KSkge1xuXG4gICAgICAgICAgICBtZXRhT2IgW2tleV0gPSBtc2dPYiBba2V5XTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBhdHRyc09iIFtrZXldID0gbXNnT2IgW2tleV07XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKHYucHJpbWFyeS5oYXNPd25Qcm9wZXJ0eSAoa2V5KSlcbiAgICAgICAgXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBtc2dLZXlzLmxlbmd0aDsgaSsrKVxuXG4gICAgdmFyIHByaW1hcnlDYW5kaWRhdGVzQSA9IE9iamVjdC5rZXlzIChwcmltYXJ5Q2FuZGlkYXRlc09iKTtcblxuICAgIHZhciBwcmltYXJ5S2V5O1xuICAgIHZhciBjb250ZW50O1xuXG4gICAgaWYgKHByaW1hcnlDYW5kaWRhdGVzQS5sZW5ndGggPT09IDApIHtcblxuICAgICAgICBwcmltYXJ5S2V5ID0gbnVsbDtcblxuICAgIH0gZWxzZSBpZiAocHJpbWFyeUNhbmRpZGF0ZXNBLmxlbmd0aCA9PT0gMSkge1xuXG4gICAgICAgIHByaW1hcnlLZXkgPSBwcmltYXJ5Q2FuZGlkYXRlc0EgWzBdO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaGFuZGxlIHByaW1hcnkvc2Vjb25kYXJ5IGtleSByZXNvbHV0aW9uXG5cbiAgICAgICAgcHJpbWFyeUtleSA9IG51bGw7XG4gICAgICAgIGZvciAoa2V5IGluIHByaW1hcnlDYW5kaWRhdGVzT2IpIHtcblxuICAgICAgICAgICAgaWYgKHYuc2Vjb25kYXJ5Lmhhc093blByb3BlcnR5IChrZXkpKSB7XG5cbiAgICAgICAgICAgICAgICBhdHRyc09iIFtrZXldID0gbXNnT2IgW2tleV07XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJpbWFyeUtleSA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlLZXkgPSBrZXk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcy5lcnIgPSAnTXVsdGlwbGUgcHJpbWFyeSBrZXlzIGZvdW5kIG5vdCBpbiBzZWNvbmRhcnkgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkgKG1zZyk7XG5cbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBpZiAocHJpbWFyeUtleSA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKHYuc2Vjb25kYXJ5Lmhhc093blByb3BlcnR5IChrZXkpKVxuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH0gLy8gZW5kIGlmIChwcmltYXJ5Q2FuZGlkYXRlc0EubGVuZ3RoID09PSAwKVxuXG5cbiAgICBpZiAoIXJlcy5oYXNPd25Qcm9wZXJ0eSAoJ2VycicpKSB7XG5cbiAgICAgICAgcmVzLnAgPSBwcmltYXJ5S2V5O1xuICAgICAgICByZXMuYyA9IHByaW1hcnlLZXkgJiYgdi5wcmltYXJ5IFtwcmltYXJ5S2V5XSAhPT0gMCA/IG1zZ09iIFtwcmltYXJ5S2V5XSA6IG51bGw7XG4gICAgICAgICAgICAvLyBleGFtcGxlIHZvaWQgaHRtbCB0YWcgaGFzIHplcm8gY29udGVudCwgc28gY29udGVudCBpcyBmb3JjZWQgdG8gbnVsbFxuXG4gICAgICAgIHJlcy5zID0gYXR0cnNPYjtcbiAgICAgICAgcmVzLm0gPSBtZXRhT2I7XG5cbiAgICB9IC8vIGVuZCBpZiAoIXJlcy5oYXNPd25Qcm9wZXJ0eSAoJ2VycicpKVxuICAgIFxuICAgIFxuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLnBhcnNlTXNnIFxuXG5cblxuICAgIC8vIGVuZCBQVUJMSUMgRnVuY3Rpb25zXG5cbmYuaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG4iLCIvLyBnby1wb3BpbmZvL2luZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRwKSB7XG5cbi8vIFBSSVZBVEUgUHJvcGVydGllcy9NZXRob2RzXG52YXIgXyA9IHtcbiAgICBkcHA6IGRwLmRpc3BsYXlQYWdlLFxuICAgIGdlbklkOiBkcC5nZW5JZCxcbiAgICBhcnJvd1NpemU6IDEwLFxuXG59OyAvLyBlbmQgUFJJVkFURSBwcm9wZXJ0aWVzXG5cbl8uaW5pdCA9ICgpID0+IHtcblxuICAgIF8uc2V0UG9wdXBTdHlsZSAoKTtcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLmdldFBvc0RpbSA9IChqcSkgPT4ge1xuICAgIFxuICAgIHZhciByZXMgPSB7fTtcblxuICAgIHZhciBvZmZzZXQgPSAkKGpxKS5vZmZzZXQgKCk7XG4gICAgcmVzLmxlZnQgPSBvZmZzZXQubGVmdDtcbiAgICByZXMudG9wID0gb2Zmc2V0LnRvcDtcblxuICAgIHJlcy53aWR0aCA9ICQoanEpLndpZHRoICgpO1xuICAgIHJlcy5oZWlnaHQgPSAkKGpxKS5oZWlnaHQgKCk7XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgXy5nZXRQb3NEaW0gXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5fLnNldFBvcHVwU3R5bGUgPSAoKSA9PiB7XG4gICAgXG4gICAgdmFyIGFzID0gXy5hcnJvd1NpemU7XG5cbiAgICB2YXIgcG9wdXBTdHlsZSA9IFtcbiAgICAgICAge3JtOiAnI3N0eWxlcG9waW5mbyd9LFxuICAgICAgICB7c3R5bGU6ICcucG9wdXAgeycgK1xuICAgICAgICAncG9zaXRpb246IHJlbGF0aXZlOycgK1xuICAgICAgICAnZGlzcGxheTogaW5saW5lLWJsb2NrOycgK1xuICAgICAgICAnYm9yZGVyOiAxcHggc29saWQgYmx1ZTsnICtcbiAgICAgICAgJ2JvcmRlci1yYWRpdXM6IDRweDsnICtcbiAgICAgICAgJ2JhY2tncm91bmQtY29sb3I6ICNlYmYyZjI7JyArXG4gICAgICAgICdmb250LXNpemU6IDEycHg7JyArXG4gICAgJ30nICtcbiAgICAnLnBvcHVwd3JhcCB7JyArXG4gICAgICAgICdwb3NpdGlvbjogYWJzb2x1dGU7JyArXG4gICAgJ30nICtcbiAgICAnLnBvcHVwbm92aXMgeycgK1xuICAgICAgICAnZGlzcGxheTogbm9uZTsnICtcbiAgICAnfScgK1xuICAgICcuYXJyb3cgeycgK1xuICAgICAgICAncG9zaXRpb246IGFic29sdXRlOycgK1xuICAgICAgICAnZGlzcGxheTogaW5saW5lLWJsb2NrOycgK1xuICAgICAgICAnd2lkdGg6IDA7JyArXG4gICAgICAgICdoZWlnaHQ6IDA7JyArXG4gICAgICAgICdib3JkZXItc3R5bGU6IHNvbGlkOycgK1xuICAgICAgICAnYm94LXNpemluZzogYm9yZGVyLWJveDsnICtcbiAgICAnfScgK1xuICAgICcuYXJyb3dib3JkZXIgeycgK1xuICAgICAgICAnYm9yZGVyLXdpZHRoOiAnICsgKGFzIC0gMSkgKyAncHg7JyArXG4gICAgICAgICdib3JkZXItY29sb3I6IGJsdWUgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7JyArXG4gICAgICAgICdib3R0b206IC0nICsgKDIqYXMgLSAyKSArICdweDsnICtcbiAgICAnfScgK1xuICAgICcuYXJyb3dmaWxsZXIgeycgK1xuICAgICAgICAnYm9yZGVyLXdpZHRoOiAnKyAoYXMgLSAyKSArICdweDsnICtcbiAgICAgICAgJ2JvcmRlci1jb2xvcjogI2ViZjJmMiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDsnICtcbiAgICAgICAgJ2JvdHRvbTogLScgKyAoMiphcyAtIDQpICsgJ3B4OycgK1xuICAgICAgICAnei1pbmRleDogMTsnICtcbiAgICAnfScsIFxuICAgIGlkOiAnc3R5bGVwb3BpbmZvJywgcGFyZW50OiAnaGVhZCd9XG4gICAgXTtcblxuICAgIF8uZHBwIChwb3B1cFN0eWxlKTtcblxufTsgLy8gZW5kIF8uc2V0UG9wdXBTdHlsZVxuXG5cblxuXG5cbi8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmNyZWF0ZVBvcHVwRGlzcGxheSA9IChqcU9iSW4sIGRpc3BzdHIsIG9wdGlvbnMpID0+IHtcbiAgICBcbiAgICBqcU9iID0gdHlwZW9mIGpxT2JJbiA9PT0gJ3N0cmluZycgPyAkKGpxT2JJbikgOiBqcU9iSW47XG4gICAgSWRqcU9iID0gJyMnICsganFPYiBbMF0uaWQ7XG5cbiAgICBkaXNwU3RycyA9IGRpc3BzdHIuc3BsaXQgKCdcXG4nKTtcblxuICAgIHZhciBkaXNwQSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlzcFN0cnMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICB2YXIgZGlzcFN0ciA9IGRpc3BTdHJzIFtpXTtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG5cbiAgICAgICAgICAgIGRpc3BBLnB1c2ggKHticjowfSk7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGkgPiAwKVxuICAgICAgICBcbiAgICAgICAgZGlzcEEucHVzaCAoe3NwYW46IGRpc3BTdHIsIHN0eWxlOiAnZGlzcGxheTogaW5saW5lLWJsb2NrOyd9KTtcblxuXG4gICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwU3RyczsgaSsrKVxuICAgIFxuICAgIHZhciBkaXNwT2IgPSB7ZGl2OiBkaXNwQSwgc3R5bGU6ICdtYXJnaW46IDJweDsnfTtcbiAgICB2YXIgcG9zRWwgPSBfLmdldFBvc0RpbSAoanFPYik7XG5cbiAgICAgICAgLy8gZm9yY2VzIGRpdiB3aWR0aCB0byB3aWR0aCBvZiBjb250ZW50XG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDUwOTAzL2hvdy10by1tYWtlLWRpdi1ub3QtbGFyZ2VyLXRoYW4taXRzLWNvbnRlbnRzXG5cbiAgICB2YXIgaWRBYiA9IF8uZ2VuSWQgKCk7XG4gICAgdmFyIGlkQWYgPSBfLmdlbklkICgpO1xuXG4gICAgdmFyIGRpdkFycm93Qm9yZGVyID0ge2RpdjogMCwgaWQ6IGlkQWIsIGNsYXNzOiAnYXJyb3cgYXJyb3dib3JkZXInfTtcbiAgICB2YXIgZGl2QXJyb3dGaWxsZXIgPSB7ZGl2OiAwLCBpZDogaWRBZiwgY2xhc3M6ICdhcnJvdyBhcnJvd2ZpbGxlcid9O1xuXG4gICAgaWRBYiA9ICcjJyArIGlkQWI7XG4gICAgaWRBZiA9ICcjJyArIGlkQWY7XG5cbiAgICAvL3ZhciBwb3BPYiA9IHtkaXY6IFtkaXNwT2IsIGRpdkFycm93Qm9yZGVyLCBkaXZBcnJvd0ZpbGxlcl0sIGNsYXNzOiAncG9wdXAnLCBhZnRlcjogSWRqcU9ifTtcbiAgICB2YXIgcG9wT2JSZWwgPSB7ZGl2OiBbZGlzcE9iLCBkaXZBcnJvd0JvcmRlciwgZGl2QXJyb3dGaWxsZXJdLCBjbGFzczogJ3BvcHVwJ307XG4gICAgdmFyIHBvcE9iID0ge2RpdjogcG9wT2JSZWwsIGNsYXNzOiAncG9wdXB3cmFwJ307XG4gICAgdmFyIElkUG9wT2IgPSBfLmRwcCAocG9wT2IpO1xuICAgIHZhciBwb3NQb3B1cCA9IF8uZ2V0UG9zRGltIChJZFBvcE9iKTtcblxuICAgIHZhciB0b3BETyA9IHBvc0VsLnRvcCAtIHBvc1BvcHVwLmhlaWdodCAtIF8uYXJyb3dTaXplO1xuICAgIHZhciBsZWZ0RE8gPSBwb3NFbC5sZWZ0ICsgcG9zRWwud2lkdGgvMiAtIHBvc1BvcHVwLndpZHRoLzI7XG5cbiAgICAkKElkUG9wT2IpXG4gICAgLm9mZnNldCAoe3RvcDogdG9wRE8sIGxlZnQ6IGxlZnRET30pO1xuXG4gICAgdmFyIHBvc0FiID0gXy5nZXRQb3NEaW0gKGlkQWIpO1xuICAgIHZhciBwb3NBZiA9IF8uZ2V0UG9zRGltIChpZEFmKTtcblxuICAgIHZhciBhcyA9IF8uYXJyb3dTaXplO1xuICAgICQoaWRBYilcbiAgICAub2Zmc2V0ICh7dG9wOiBwb3NBYi50b3AsIGxlZnQ6IGxlZnRETyArIHBvc1BvcHVwLndpZHRoLzIgLSBhcy8yIC0gMn0pO1xuXG4gICAgJChpZEFmKVxuICAgIC5vZmZzZXQgKHt0b3A6IHBvc0FmLnRvcCwgbGVmdDogbGVmdERPICsgcG9zUG9wdXAud2lkdGgvMiArIDEgLSBhcy8yIC0gMn0pO1xuXG4gICAgJChJZFBvcE9iKVxuICAgIC5hZGRDbGFzcyAoJ3BvcHVwbm92aXMnKTtcblxuICAgIHJldHVybiBJZFBvcE9iO1xufTsgLy8gZW5kIFAuY3JlYXRlUG9wdXBEaXNwbGF5IFxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5oaWRlUG9wdXBzID0gKElkKSA9PiB7XG4gICAgXG4gICAgdmFyIHNlbCA9IElkID8gSWQgOiAnLnBvcHVwd3JhcCc7XG5cbiAgICAkKHNlbClcbiAgICAuYWRkQ2xhc3MgKCdwb3B1cG5vdmlzJyk7XG5cblxufTsgLy8gZW5kIFAuaGlkZVBvcHVwc1xuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnNob3dQb3B1cHMgPSAoSWQpID0+IHtcbiAgICBcbiAgICB2YXIgc2VsID0gSWQgPyBJZCA6ICcucG9wdXB3cmFwJztcblxuICAgICQoc2VsKVxuICAgIC5yZW1vdmVDbGFzcyAoJ3BvcHVwbm92aXMnKTtcblxuXG59OyAvLyBlbmQgUC5zaG93UG9wdXBzXG5cblxuXG5cblxuLy8gZW5kIFBVQkxJQyBzZWN0aW9uXG5cbl8uaW5pdCAoKTtcblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG5cbiIsIi8vIGdvLXV0aWwvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciB2ID0ge1xuXG4gICAga2V5MTogcmVxdWlyZSAoJ2tleTEnKVxuXG59OyAgLy8gZW5kIFBSSVZBVEUgcHJvcGVydGllc1xudmFyIGY9e307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLmRkc0RvSXQgPSAob2IsIHRvVW5pY29kZSkgPT4ge1xuICAgIC8vIG9iIGlzIGFycmF5ID0+IHJldHVybnMgc2FtZSBvYlxuICAgIC8vIG9iIGlzIG9iamVjdCA9PiByZXR1cm5zIG5ldyBvYlxuICAgIFxuICAgIHZhciByZXM7XG5cbiAgICB2YXIgZG9SZXBsYWNlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgbmV3S2V5O1xuXG4gICAgICAgIGlmICh0b1VuaWNvZGUpIHtcblxuICAgICAgICAgICAgbmV3S2V5ID0ga2V5LnJlcGxhY2UgKC9cXCQvZywgJ1xcXFx1RkYwNCcpO1xuICAgICAgICAgICAgbmV3S2V5ID0gbmV3S2V5LnJlcGxhY2UgKC9cXC4vZywgJ1xcXFx1RkYwRScpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIG5ld0tleSA9IGtleS5yZXBsYWNlICgvXFxcXHVGRjA0L2csICckJyk7XG4gICAgICAgICAgICBuZXdLZXkgPSBuZXdLZXkucmVwbGFjZSAoL1xcXFx1RkYwRS9nLCAnLicpO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmICh0b1VuaWNvZGUpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3S2V5O1xuICAgIH07XG5cbiAgICBpZiAob2IgIT09IG51bGwgJiYgdHlwZW9mIG9iID09PSAnb2JqZWN0JyAmJiAhKG9iLmhhc093blByb3BlcnR5ICgnX2Jzb250eXBlJykgJiYgb2IuX2Jzb250eXBlID09PSAnT2JqZWN0SUQnKSkge1xuXG4gICAgICAgIHZhciBpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSAob2IpKSB7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvYi5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgb2IgW2ldID0gZi5kZHNEb0l0IChvYiBbaV0sIHRvVW5pY29kZSk7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGZvciAodmFyIGkgPSAwOyBpIDwgb2IubGVuZ3RoOyBpKyspXG5cbiAgICAgICAgICAgIHJlcyA9IG9iO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJlcyA9IHt9O1xuXG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzIChvYik7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXMgW2ldO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IG9iW2tleV07XG4gICAgXG4gICAgICAgICAgICAgICAgdmFyIG5ld0tleSA9IGRvUmVwbGFjZSAoa2V5KTtcbiAgICBcbiAgICAgICAgICAgICAgICByZXMgW25ld0tleV0gPSBmLmRkc0RvSXQgKHZhbCwgdG9Vbmljb2RlKTtcbiAgICBcblxuICAgICAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzOyBpKyspXG4gICAgICAgICAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSlcbiAgICAgICAgXG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXMgPSBvYjtcblxuICAgIH0gLy8gZW5kIGlmIChvYiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2IgIT09ICdvYmplY3QnKVxuXG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAgLy8gZW5kIGYuZGRzRG9JdCBcblxuXG4gICAgLy8gUFVCTElDIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIFAgPSB7fTtcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5hclRvT2IgPSAoYXIpID0+IHtcbiAgICBcbiAgICB2YXIgb2IgPSB7fTtcbiAgICBcbiAgICBpZiAoQXJyYXkuaXNBcnJheSAoYXIpKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhci5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICB2YXIgbmFtZSA9IGFyIFtpXTtcbiAgICAgICAgICAgIG9iIFtuYW1lXSA9IGk7XG5cbiAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBhci5sZW5ndGg7IGkrKylcblxuICAgIH0gLy8gZW5kIGlmIChBcnJheS5pc0FycmF5IChhcikpXG4gICAgcmV0dXJuIG9iO1xuXG59OyAvLyBlbmQgUC5hclRvT2IgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuY2xvbmVPYiA9IChvYikgPT4ge1xuICAgIC8vIGFzc3VtZXMgbm8gdmFsdWVzIHRoYXQgYXJlIGZ1bmN0aW9uIHR5cGVzXG4gICAgXG4gICAgcmV0dXJuIEpTT04ucGFyc2UgKEpTT04uc3RyaW5naWZ5IChvYikpO1xuXG59OyAvLyBlbmQgUC5jbG9uZU9iIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmNvbnN0U3RyID0gKGNoLCBsZW5ndGgpID0+IHtcbiAgICBcbiAgICB2YXIgcmVzID0gbmV3IEFycmF5IChsZW5ndGggKyAxKS5qb2luIChjaCk7XG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIGNvbnN0U3RyIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmRvbGxhckRvdFN1YlVuaWNvZGUgPSAob2IpID0+IHtcbiAgICBcbiAgICByZXR1cm4gZi5kZHNEb0l0IChvYiwgdHJ1ZSk7XG5cbn07ICAvLyBlbmQgZG9sbGFyRG90U3ViVW5pY29kZSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kb2xsYXJEb3RTdWJVbmljb2RlUmVzdG9yZSA9IChvYikgPT4ge1xuICAgIFxuICAgIHJldHVybiBmLmRkc0RvSXQgKG9iLCBmYWxzZSk7XG5cbn07ICAvLyBlbmQgZG9sbGFyRG90U3ViVW5pY29kZVJlc3RvcmVcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5kdW1wT2IgPSAob2IsIGRlcHRoKSA9PiB7XG4gICAgXG4gICAgZGVwdGggPSBkZXB0aCA/IGRlcHRoIDogMDtcblxuICAgIHZhciBpbmRlbnRDdXI7XG4gICAgdmFyIGluZGVudERlbHRhO1xuICAgIHZhciBrZXlzID0gW107XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBkdW1wT2JJbml0ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgaW5kZW50Q3VyID0gMDtcbiAgICAgICAgaW5kZW50RGVsdGEgPSA0O1xuICAgIFxuICAgIH07IC8vIGVuZCBkdW1wT2JJbml0XG4gICAgXG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBkZWNySW5kZW50ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgaW5kZW50Q3VyIC09IGluZGVudERlbHRhO1xuICAgIFxuICAgIH07IC8vIGVuZCBkZWNySW5kZW50XG4gICAgXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgaW5jckluZGVudCA9ICgpID0+IHtcbiAgICAgICAgXG4gICAgICAgIGluZGVudEN1ciArPSBpbmRlbnREZWx0YTtcbiAgICBcbiAgICB9OyAvLyBlbmQgaW5jckluZGVudFxuICAgIFxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIGRvSW5kZW50ID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFwiIFwiLnJlcGVhdCAoaW5kZW50Q3VyKTtcbiAgICBcbiAgICB9OyAvLyBlbmQgZG9JbmRlbnRcbiAgICBcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciB0b3BLZXkgPSAoKSA9PiB7XG4gICAgXG4gICAgICAgIHZhciByZXMgPSBcIlwiO1xuICAgICAgICB2YXIgc3RhcnRJO1xuXG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA8PSBkZXB0aCkge1xuXG4gICAgICAgICAgICBzdGFydEkgPSAwO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHN0YXJ0SSA9IGtleXMubGVuZ3RoIC0gZGVwdGg7XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKGtleXMubGVuZ3RoIDw9IGRlcHRoKVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydEk7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHJlcyArPSBrZXlzIFtpXTtcbiAgICAgICAgICAgIHJlcyArPSBpID09PSBrZXlzLmxlbmd0aCAtIDEgPyBcIlwiIDogXCIuXCI7XG5cbiAgICAgICAgfSAvLyBlbmQgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlcztcblxuICAgIH07IC8vIGVuZCB0b3BLZXlcblxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgZHVtcEtleVBhaXIgPSAob2IsIGtleSwgbm9LZXkpID0+IHtcbiAgICBcbiAgICAgICAgdmFyIHByZWZpeCA9IHRvcEtleSAoKTtcblxuICAgICAgICB2YXIgcmVzID0gZG9JbmRlbnQgKCk7XG4gICAgICAgIHZhciB2YWwgPSBvYiBba2V5XTtcblxuICAgICAgICBrZXlzLnB1c2ggKGtleSk7XG4gICAgICAgIHJlcyArPSBwcmVmaXggIT09IFwiXCIgPyBwcmVmaXggKyAnLicgOiBcIlwiO1xuICAgICAgICByZXMgKz0gbm9LZXkgPyBcIlwiIDoga2V5ICsgJzogJztcblxuICAgICAgICBpZiAoa2V5ID09PSAnX2lkJyAmJiBQLmlzT2IgKHZhbCkgJiYgdmFsLmhhc093blByb3BlcnR5ICgnX2Jzb250eXBlJykgJiYgdmFsLl9ic29udHlwZSA9PT0gJ09iamVjdElEJykge1xuXG4gICAgICAgICAgICByZXMgKz0gJ09iamVjdElkKFwiJyArIHZhbCArICdcIiknO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHJlcyArPSBkdW1wT2JIICh2YWwpO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmIChrZXkgPT09ICdfaWQnICYmIFAuaXNPYiAodmFsKSAmJiB2YWwuaGFzT3duUHJvcGVydHkgKCdfYnNvbnR5cGUnKSAmJiB2YWwuX2Jzb250eXBlID09PSAnT2JqZWN0SUQnKVxuICAgICAgICBcbiAgICAgICAga2V5cy5wb3AgKCk7XG5cbiAgICAgICAgcmVzICs9IFwiXFxuXCI7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcblxuICAgIH07IC8vIGVuZCBkdW1wS2V5UGFpciBcblxuICAgIFxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgZHVtcE9iSCA9IChvYikgPT4ge1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgaWYgKHR5cGVvZiBvYiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9ICd1bmRlZmluZWQnO1xuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKG9iID09PSBudWxsKSB7XG4gICAgXG4gICAgICAgICAgICByZXMgPSAnbnVsbCc7XG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iID09PSAnYm9vbGVhbicpIHtcbiAgICBcbiAgICAgICAgICAgIHJlcyA9IG9iID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICBcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2IgPT09ICdudW1iZXInKSB7XG4gICAgXG4gICAgICAgICAgICByZXMgPSBcIlwiICsgb2I7XG4gICAgXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iID09PSAnc3RyaW5nJykge1xuICAgIFxuICAgICAgICAgICAgaWYgKCFvYi5tYXRjaCAoLycvKSkge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9IFwiJ1wiICsgb2IgKyBcIidcIjtcbiAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW9iLm1hdGNoICgvXCIvKSkge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9ICdcIicgKyBvYiArICdcIic7XG4gICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9ICdcIicgKyBvYi5yZXBsYWNlICgvXCIvLCAnXFxcXFwiJykgKyAnXCInO1xuICAgIFxuICAgICAgICAgICAgfSAvLyBlbmQgaWYgKCFvYi5tYXRjaCAoLycvKSlcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSkge1xuICAgIFxuICAgICAgICAgICAgaWYgKG9iLmxlbmd0aCA9PT0gMCkge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9ICdbXSc7XG4gICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgICAgIHJlcyA9IFwiW1xcblwiO1xuICAgICAgICAgICAgICAgIGluY3JJbmRlbnQgKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYi5sZW5ndGg7IGkrKykge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gZHVtcEtleVBhaXIgKG9iLCBpLCB0cnVlKTtcbiAgICBcbiAgICAgICAgICAgICAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IG9iLmxlbmd0aDsgaSsrKVxuICAgIFxuICAgICAgICAgICAgICAgIGRlY3JJbmRlbnQgKCk7XG4gICAgXG4gICAgICAgICAgICAgICAgcmVzICs9IGRvSW5kZW50ICgpO1xuICAgICAgICAgICAgICAgIHJlcyArPSBcIl1cIiA7XG4gICAgXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAob2IubGVuZ3RoID09PSAwKVxuICAgIFxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYiA9PT0gJ29iamVjdCcpIHtcbiAgICBcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMgKG9iKS5zb3J0ICgpO1xuICAgIFxuICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICByZXMgPSBcInt9XCI7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXMgPSBcIntcXG5cIjtcbiAgICAgICAgICAgICAgICBpbmNySW5kZW50ICgpO1xuICAgIFxuICAgICAgICAgICAgICAgIGtleXMuZm9yRWFjaCAoZnVuY3Rpb24gKGtleSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPSBkdW1wS2V5UGFpciAob2IsIGtleSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZGVjckluZGVudCAoKTtcbiAgICAgICAgICAgICAgICByZXMgKz0gZG9JbmRlbnQgKCk7XG4gICAgICAgICAgICAgICAgcmVzICs9IFwifVwiO1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAoa2V5cy5sZW5ndGggPT09IDApXG4gICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICByZXMgPSAndW5rbm93bjogJyArIHR5cGVvZiBvYjtcbiAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKHR5cGVvZiBvYiA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIFxuICAgIH07IC8vIGVuZCBkdW1wT2JIXG4gICAgXG4gICAgZHVtcE9iSW5pdCAoKTtcbiAgICByZXR1cm4gZHVtcE9iSCAob2IpO1xuXG59OyAvLyBlbmQgUC5kdW1wT2IgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5pc0VtcHR5ID0gKGl0ZW0pID0+IHtcbiAgICBcbiAgICB2YXIgcmVzID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKHR5cGVvZiBpdGVtKSB7XG5cbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcblxuICAgICAgICAgICAgcmVzID0gaXRlbS5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd1bmRlZmluZWQnOlxuXG4gICAgICAgICAgICByZXMgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcblxuICAgICAgICAgICAgaWYgKFAuaXNPYiAoaXRlbSkpIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMgKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHJlcyA9IGtleXMubGVuZ3RoID09PSAwO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IG51bGwpIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IHRydWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSAoaXRlbSkpIHtcblxuICAgICAgICAgICAgICAgIHJlcyA9IGl0ZW0ubGVuZ3RoID09PSAwO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmVzID0gbnVsbDsgIC8vIGNhc2Ugc2hvdWxkbid0IGhhcHBlbiwgc28gc2V0IHRvIG51bGwgaWYgaXQgZG9lc1xuXG4gICAgICAgICAgICB9IC8vIGVuZCBpZiAoUC5pc09iIChpdGVtKSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnYm9vbGVhbic6XG5cbiAgICAgICAgICAgIHJlcyA9ICFpdGVtO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcblxuICAgICAgICAgICAgcmVzID0gbnVtYmVyID09PSAwO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICB9IC8vIGVuZCBzd2l0Y2ggKHR5cGVvZiBpdGVtKVxuICAgIFxuXG4gICAgcmV0dXJuIHJlcztcbn07IC8vIGVuZCBQLmlzRW1wdHkgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuaXNPYiA9IChvYikgPT4ge1xuICAgIC8vIHJldHVybnMgdHJ1ZSBpZiBvYiBpcyBkZWZpbmVkLCBub3QgbnVsbCwgbm90IGFuIEFycmF5IGFuZCBvZiB0eXBlIG9iamVjdFxuICAgIFxuICAgIHZhciByZXMgPSB0eXBlb2Ygb2IgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICBvYiAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAhQXJyYXkuaXNBcnJheSAob2IpICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBvYiA9PT0gJ29iamVjdCc7XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5pc09iIFxuXG5cblAua2V5MSA9IHYua2V5MTtcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5wYXJzZVBhdGggPSAoYWJzUGF0aCkgPT4ge1xuICAgIFxuICAgIHZhciBkaXI7XG4gICAgdmFyIGZpbGU7XG5cbiAgICB2YXIgbWF0Y2hlZCA9IGFic1BhdGgubWF0Y2ggKC8oLipcXC8pKFteXFwvXSopLyk7XG4gICAgaWYgKG1hdGNoZWQpIHtcblxuICAgICAgICBkaXIgPSBtYXRjaGVkIFsxXTtcbiAgICAgICAgZmlsZSA9IG1hdGNoZWQgWzJdO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBkaXIgPSBcIlwiOyBcbiAgICAgICAgZmlsZSA9IGFic1BhdGg7XG5cbiAgICB9IC8vIGVuZCBpZiAobWF0Y2hlZClcbiAgICBcbiAgICByZXR1cm4ge2RpcjogZGlyLCBmaWxlOiBmaWxlfTtcblxufTsgLy8gZW5kIFAucGFyc2VQYXRoIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnBDaGVjayA9IChwLCBwRGVmYXVsdCkgPT4ge1xuICAgIC8vIGRpdGNoZXMgYW55IHBhcmFtZXRlcnMgc3VwcGxpZWQgaW4gcCB0aGF0IGFyZW4ndCBwcmVzZW50IGluIHBEZWZhdWx0XG4gICAgLy8gaWYgYSBwYXJhbSBpcyBuZWNlc3NhcnkgdG8gYSByb3V0aW5lLCB0aGVuIGl0IHNob3VsZCBiZSBkZWZpbmVkIGluIHBEZWZhdWx0XG4gICAgXG4gICAgdmFyIHJlcyA9IHt9O1xuXG4gICAgcCA9IFAuaXNPYiAocCkgPyBwIDoge307XG4gICAgXG4gICAgZm9yICh2YXIga2V5IGluIHBEZWZhdWx0KSB7XG5cbiAgICAgICAgcmVzIFtrZXldID0gcC5oYXNPd25Qcm9wZXJ0eSAoa2V5KSA/IHAgW2tleV0gOiBwRGVmYXVsdCBba2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5wQ2hlY2sgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAuc3RyaXBRSiA9IChqc29uU3RyKSA9PiB7XG4gICAgXG4gICAgdmFyIHJlcyA9IGpzb25TdHIucmVwbGFjZSAoL1wiKFteXCJdKylcIlxccyo6L2csIFwiJDE6XCIpO1xuICAgIHJldHVybiByZXM7XG5cbn07IC8vIGVuZCBQLnN0cmlwUUogXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAudHJhdmVyc2VBcnJheSA9IChhcnIsIGZuRWwpID0+IHtcbiAgICBcbiAgICBpZiAoQXJyYXkuaXNBcnJheSAoYXJyKSkge1xuXG4gICAgICAgIGFyci5mb3JFYWNoIChmdW5jdGlvbiAoZWwpIHtcblxuICAgICAgICAgICAgUC50cmF2ZXJzZUFycmF5IChlbCwgZm5FbCk7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlmIChQLmlzT2IgKGFycikpIHtcblxuICAgICAgICAgICAgdmFyIHZhbCA9IFAudmFsMSAoYXJyKTtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkgKHZhbCkpIHtcblxuICAgICAgICAgICAgICAgIFAudHJhdmVyc2VBcnJheSAodmFsLCBmbkVsKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGZuRWwgKGFycik7XG5cbiAgICAgICAgICAgIH0gLy8gZW5kIGlmIChBcnJheS5pc0FycmF5ICh2YWwpKVxuICAgICAgICAgICAgXG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgZm5FbCAoYXJyKTtcblxuICAgICAgICB9IC8vIGVuZCBpZiAoUC5pc09iIChhcnIpKVxuXG4gICAgfSAvLyBlbmQgaWYgKEFycmF5LmlzQXJyYXkgKGFycikpXG4gICAgXG5cbn07IC8vIGVuZCBQLnRyYXZlcnNlQXJyYXkgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblAudmFsMSA9IChvYikgPT4ge1xuICAgIFxuICAgIHZhciBrZXkxID0gUC5rZXkxIChvYik7XG4gICAgdmFyIHJlcyA9IGtleTEgPyBvYiBba2V5MV0gOiBudWxsO1xuXG4gICAgcmV0dXJuIHJlcztcblxufTsgLy8gZW5kIFAudmFsMSBcblxuXG5cbiAgICAvLyBlbmQgUFVCTElDIHNlY3Rpb25cblxucmV0dXJuIFA7XG5cbn0oKSk7XG5cblxuXG4iLCIvLyBnby13cy1jbGllbnQvaW5kZXguanNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXAsIHBvcnQsIGNsaWVudCwgb3B0aW9ucykge1xuXG4vLyBQUklWQVRFIFByb3BlcnRpZXMvTWV0aG9kc1xudmFyIHYgPSB7XG4gICAgXG4gICAgaXA6IGlwLFxuICAgIHBvcnQ6IHBvcnQsXG4gICAgc2VjdXJlQ29ubmVjdGlvbjogbnVsbCxcblxuICAgIHV0OiByZXF1aXJlICgnZ28tdXRpbCcpLFxuICAgIG1pbnNlYzogcmVxdWlyZSAoJ21pbnNlYycpLmdldE1pblNlYyxcbiAgICBtc2dTaG9ydGVuMDogcmVxdWlyZSAoJ21zZ3Nob3J0ZW4nKSxcbiAgICBtc2dTaDogbnVsbCxcbiAgICBwY2hlY2s6IG51bGwsXG4gICAga2V5MTogbnVsbCxcblxuICAgIHdzU2VydmVyOiBudWxsLFxuICAgIHdzVXJsT2I6IG51bGwsXG5cbn07IC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbnZhciBmPXt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5pbml0ID0gKCkgPT4ge1xuXG4gICAgdi5wY2hlY2sgPSB2LnV0LnBDaGVjaztcbiAgICB2LmtleTEgPSB2LnV0LmtleTE7XG5cbiAgICAvL3ZhciB0YXJnZXRMZW5ndGggPSA4MDAwMDtcbiAgICB2YXIgdGFyZ2V0TGVuZ3RoID0gMjAwO1xuICAgIHYubXNnU2ggPSBuZXcgdi5tc2dTaG9ydGVuMCAodGFyZ2V0TGVuZ3RoKTtcblxuICAgIHZhciBwYXJhbXMgPSB2LnBjaGVjayAob3B0aW9ucywge3NlY3VyZUNvbm5lY3Rpb246IGZhbHNlfSk7XG5cbiAgICB2LnNlY3VyZUNvbm5lY3Rpb24gPSBwYXJhbXMuc2VjdXJlQ29ubmVjdGlvbjtcblxuICAgICAgICAvL2NvbnNvbGUubG9nICgnd3NDbGllbnQgcGFyYW1zOiAnICsgSlNPTi5zdHJpbmdpZnkgKHBhcmFtcykgKyAnXFxuJyk7XG4gICAgXG4gICAgdi50c3RDbWRzID0gIHtwaW5nOiBmLnRzdENtZFBpbmdSZXNwfTtcbiAgICB2LmNsaWVudCA9IGNsaWVudCA/IGNsaWVudCA6IGYucmVwb3J0TXNnT2I7XG5cbiAgICB2YXIgd3NQcmVmaXggPSB2LnNlY3VyZUNvbm5lY3Rpb24gPyAnd3NzJyA6ICd3cyc7XG4gICAgdmFyIHdzVXJsID0gd3NQcmVmaXggKyAnOi8vJyArIHYuaXAgKyAnOicgKyB2LnBvcnQ7XG5cbiAgICB2LndzVXJsT2IgPSB7XG4gICAgICAgIHdzUHJlZml4OiB3c1ByZWZpeCxcbiAgICAgICAgaXA6IHYuaXAsXG4gICAgICAgIHBvcnQ6IHYucG9ydFxuICAgIH07XG5cbiAgICAvL3Yud3NTZXJ2ZXIgPSBuZXcgV2ViU29ja2V0ICh3c1VybCwgSlNPTi5zdHJpbmdpZnkgKHYud3NVcmxPYikpO1xuICAgIHYud3NTZXJ2ZXIgPSBuZXcgV2ViU29ja2V0ICh3c1VybCwgdi5pcCk7XG4gICAgICAgIC8vIHVzaW5nIHYuaXAgYXMgb3B0aW9uYWwgRE9NU3RyaW5nIHByb3RvY29sczogXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJTb2NrZXRcblxuICAgIHYud3NTZXJ2ZXIub25tZXNzYWdlID0gZi5mcm9tU3J2cjtcbiAgICB2LndzU2VydmVyLm9uY2xvc2UgPSBmLm1zZ0Nsb3NlO1xuICAgIHYud3NTZXJ2ZXIub25lcnJvciA9IGYubXNnRXJyb3I7XG5cbn07IC8vIGVuZCBmLmluaXQgXG5cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmYuZG9DbWQgPSAodU1zZ09iKSA9PiB7XG5cbiAgICAvKlxuICAgIHZhciBmcm9tU3J2ciA9IEpTT04uc3RyaW5naWZ5ICh1TXNnT2IpO1xuICAgIHZhciBmcm9tU3J2clNob3J0ID0gdi5tc2dTaG9ydGVuLm1zZ1Nob3J0ZW4gKGZyb21TcnZyKTtcbiAgICAqL1xuICAgIHZhciBmcm9tU3J2clNob3J0ID0gdi5tc2dTaC5tc2dTaG9ydGVuICh1TXNnT2IpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cgKCcgID09PiB3c0NsaWVudC5mcm9tU3J2cjogJyArIGZyb21TcnZyU2hvcnQpO1xuICAgIFxuICAgIHVNc2dPYiA9IEFycmF5LmlzQXJyYXkgKHVNc2dPYikgPyB1TXNnT2IgOiBbdU1zZ09iXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdU1zZ09iLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIG1zZ09iID0gdU1zZ09iIFtpXTtcblxuICAgICAgICB2YXIgY21kID0gdi5rZXkxIChtc2dPYik7XG4gICAgXG4gICAgICAgIGlmICh2LnRzdENtZHMuaGFzT3duUHJvcGVydHkgKGNtZCkpIHtcbiAgICBcbiAgICAgICAgICAgIHYudHN0Q21kcyBbY21kXSAobXNnT2IgW2NtZF0pO1xuICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgIFxuICAgICAgICAgICAgdi5jbGllbnQgKG1zZ09iKTtcbiAgICBcbiAgICAgICAgfSAvLyBlbmQgaWYgKHYudHN0Q21kcy5oYXNPd25Qcm9wZXJ0eSAoY21kKSlcbiAgICBcbiAgICB9IC8vIGVuZCBmb3IgKHZhciBpID0gMDsgaSA8IHVNc2dPYi5sZW5ndGg7IGkrKylcblxufTsgLy8gZW5kIGYuZG9DbWQgXG5cblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5kb1NlbmQgPSAobXNnKSA9PiB7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyAoJ2YuZG9TZW5kLm1zZzogJyArIG1zZyArICdcXG4nKTtcbiAgICBcbiAgICB2LndzU2VydmVyLnNlbmQgKG1zZyk7XG5cbn07IC8vIGVuZCBmLmRvU2VuZCBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5mcm9tU3J2ciA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIHZhciB0aW1lID0gdi5taW5zZWMgKCk7XG4gICAgdmFyIG1zZyA9IGV2ZW50LmRhdGE7XG4gICAgbXNnT2IgPSBKU09OLnBhcnNlIChtc2cpO1xuICAgIC8vdmFyIG1zZ20gPSBKU09OLnBhcnNlIChtc2cpO1xuICAgIC8vdmFyIG1zZ09iID0gbXNnbS5tO1xuICAgIHZhciBtc2dPYlNob3J0ID0gdi5tc2dTaC5tc2dTaG9ydGVuIChtc2dPYik7XG4gICAgICAgIGNvbnNvbGUubG9nICgnPD09PT0gJyArIHRpbWUgKyAnIHdzQ2xpZW50LmZyb21TcnZyOiAnICsgbXNnT2JTaG9ydCArICdcXG4nKTtcblxuICAgIGYuZG9DbWQgKG1zZ09iKTtcblxufTsgLy8gZW5kIGYuZnJvbVNydnIgXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLm1zZ0Nsb3NlID0gKGV2ZW50KSA9PiB7XG4gICAgXG4gICAgY29uc29sZS5sb2cgKCdjbG9zZSBldmVudDogJyArIGV2ZW50LmRhdGEpO1xuXG59OyAvLyBlbmQgZi5tc2dDbG9zZSBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZi5tc2dFcnJvciA9IChldmVudCkgPT4ge1xuICAgIFxuICAgIHZhciBldmVudE1zZyA9IGV2ZW50LmRhdGEgPyAnIGV2ZW50LmRhdGE6ICcgKyBldmVudC5kYXRhIDogXCJcIjtcbiAgICBcbiAgICB2YXIgZXJyTXNnID0gJ3dzQ2xpZW50IG1zZ0Vycm9yIChTZXJ2ZXIgaXMgRG93bj8pJyArIGV2ZW50TXNnO1xuICAgIGNvbnNvbGUubG9nIChlcnJNc2cpO1xuXG4gICAgJCgnYm9keScpLnByZXBlbmQgKGVyck1zZyk7XG5cbn07IC8vIGVuZCBmLm1zZ0Vycm9yIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnJlcG9ydE1zZ09iID0gKG1zZ09iKSA9PiB7XG4gICAgXG4gICAgY29uc29sZS5sb2cgKCdmLnJlcG9ydE1zZ09iLm1zZ09iOiAnICsgbXNnT2IgKyAnXFxuJyk7XG5cbn07IC8vIGVuZCBmLnJlcG9ydE1zZ09iIFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5mLnRzdENtZFBpbmdSZXNwID0gKHBpbmdNc2cpID0+IHtcbiAgICBcbiAgICBjb25zb2xlLmxvZyAoJ3Bpbmc6ICcgKyBwaW5nTXNnKTtcbiAgICByZXR1cm47XG5cbn07IC8vIGVuZCBmLnRzdENtZFBpbmdSZXNwIFxuXG5mLmluaXQgKCk7XG5cblxuXG4vLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5nZXRXc1VybCA9ICgpID0+IHtcbiAgICBcbiAgICByZXR1cm4gdi53c1VybE9iO1xuXG59OyAvLyBlbmQgUC5nZXRXc1VybFxuXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLnRvU3J2ciA9IChtc2dPYikgPT4ge1xuICAgIHZhciB0aW1lID0gdi5taW5zZWMgKCk7XG4gICAgdmFyIG1zZ09iU2hvcnQgPSB2Lm1zZ1NoLm1zZ1Nob3J0ZW4gKG1zZ09iKTtcbiAgICBjb25zb2xlLmxvZyAoJ1xcblxcbj09PT0+ICcgKyB0aW1lICsgJyB3c0NsaWVudC50b1NydnI6ICcgKyBtc2dPYlNob3J0ICsgJ1xcbicpO1xuICAgIFxuICAgIHZhciBtc2dPYlMgPSBKU09OLnN0cmluZ2lmeSAobXNnT2IpO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cgKCdwLnRvU3J2ci5tc2dPYlMgOiAnICsgbXNnT2JTICsgJ1xcbicpO1xuICAgIFxuICAgIGYuZG9TZW5kIChtc2dPYlMpO1xuXG59OyAvLyBlbmQgUC50b1NydnIgXG5cblxucmV0dXJuIFA7XG5cbn07XG5cblxuXG4iLCIvLyBrZXkxLmpzXG5cbi8vIGtleTEgZXh0cmFjdHMgdGhlIHNpbmdsZSBrZXkgZnJvbSBhbiBvYmplY3QgXG4vLyBjb250YWluaW5nIG9ubHkgb25lIGtleS92YWx1ZSBwYWlyXG4vLyBhbmQgcmV0dXJucyB0aGUgc3RyaW5nIHZhbHVlIGZvciB0aGUga2V5XG4vLyBhbnl0aGluZyBlbHNlIHBhc3NlZCB0byBrZXkxIHJldHVybnMgbnVsbFxuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG52YXIga2V5MSA9IChvYikgPT4ge1xuXG4gICAga2V5ID0gbnVsbDtcblxuICAgIHZhciB1bmlxdWVLZXlFeGlzdHMgPSB0eXBlb2Ygb2IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9iICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICFBcnJheS5pc0FycmF5KG9iKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2IgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iKS5sZW5ndGggPT09IDE7XG4gICAgXG4gICAgaWYgKHVuaXF1ZUtleUV4aXN0cykge1xuICAgIFxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iKTtcbiAgICAgICAga2V5ID0ga2V5c1swXTtcbiAgICBcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkgKG9iKSkge1xuXG4gICAgICAgIHZhciBvYjAgPSBvYiBbMF07XG4gICAgICAgIHZhciB1bmlxdWVBcnJheUtleUV4aXN0cyA9IHR5cGVvZiBvYjAgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iMCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2IwICE9PSAnb2JqZWN0JztcblxuICAgICAgICBpZiAodW5pcXVlQXJyYXlLZXlFeGlzdHMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAga2V5ID0gb2IwO1xuXG4gICAgICAgIH0gLy8gZW5kIGlmICh1bmlxdWVBcnJheUtleUV4aXN0cylcblxuXG4gICAgfSAvLyBlbmQgaWYgKHVuaXF1ZUtleUV4aXN0cylcbiAgICBcbiAgICByZXR1cm4ga2V5O1xuICAgIFxufTsgLy8gZW5kIGtleTEgXG5cbnJldHVybiBrZXkxO1xuXG59KCkpO1xuIiwiLy8gaW5kZXguanMgPT4gbWluc2VjXG5cbi8vIGdldCBtaW51dGVzOnNlY29uZHMubWlsbGlzZWNvbmRzXG5cblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciB2ID0ge1xufTsgIC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcblxudmFyIGY9e307XG5cbmYuaW5pdCA9ICgpID0+IHtcbn07IC8vIGVuZCBmLmluaXRcblxuICAgIC8vIFBVQkxJQyBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciBQID0ge307XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5QLmdldE1pblNlYyA9ICgpID0+IHtcbiAgICBcbiAgICB2YXIgZHQgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBzdFN0ciA9IGR0LnRvSlNPTiAoKTtcblxuICAgIHZhciBtYXRjaGVkID0gc3RTdHIubWF0Y2ggKC8uKj86KC4qKVovKTtcblxuICAgIHZhciByZXMgPSBtYXRjaGVkIFsxXTtcbiAgICByZXR1cm4gcmVzO1xuXG59OyAvLyBlbmQgUC5nZXRNaW5TZWNcblxuXG5cbiAgICAvLyBlbmQgUFVCTElDIHNlY3Rpb25cblxuZi5pbml0ICgpO1xuXG5yZXR1cm4gUDtcblxufSgpKTtcblxuXG5cblxuXG5cbiIsIi8vIGluZGV4LmpzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldExlbmd0aCkge1xuXG4gICAgLy8gUFJJVkFURSBQcm9wZXJ0aWVzL01ldGhvZHNcbnZhciB2ID0ge1xuXG4gICAgdGFyZ2V0TGVuZ3RoOiB0YXJnZXRMZW5ndGggPyB0YXJnZXRMZW5ndGggOiBudWxsLFxuICAgIGtleXNPbmx5OiBmYWxzZSxcblxufTsgIC8vIGVuZCBQUklWQVRFIHByb3BlcnRpZXNcbnZhciBmPXt9O1xuXG5mLmluaXQgPSAoKSA9PiB7XG59OyAvLyBlbmQgZi5pbml0XG5cbiAgICAvLyBQVUJMSUMgUHJvcGVydGllcy9NZXRob2RzXG52YXIgUCA9IHt9O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5tc2dTaG9ydGVuID0gKG1zZ09iKSA9PiB7XG4gICAgXG4gICAgdmFyIG1zZ09iU3RyID0gdHlwZW9mIG1zZ09iID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5IChtc2dPYikgOiBtc2dPYjtcbiAgICBcbiAgICBpZiAodi5rZXlzT25seSkge1xuXG4gICAgICAgIHZhciBtc2dPYlAgPSBKU09OLnBhcnNlIChtc2dPYlN0cik7XG4gICAgICAgIHZhciBtc2dBID0gQXJyYXkuaXNBcnJheSAobXNnT2JQKSA/IG1zZ09iUCA6IFttc2dPYlBdO1xuXG4gICAgICAgIHZhciBtc2dLZXlzQSA9IFtdO1xuXG4gICAgICAgIG1zZ0EuZm9yRWFjaCAoZnVuY3Rpb24gKG1zZykge1xuXG4gICAgICAgICAgICB2YXIgbXNnS2V5cyA9IE9iamVjdC5rZXlzIChtc2cpO1xuICAgICAgICAgICAgbXNnS2V5c0EucHVzaCAobXNnS2V5cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtc2dLZXlzQS5sZW5ndGggPT09IDEpIHtcblxuICAgICAgICAgICAgbXNnS2V5c0EgPSBtc2dLZXlzQSBbMF07XG5cbiAgICAgICAgfSAvLyBlbmQgaWYgKG1zZ0tleXNBLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgXG4gICAgICAgIG1zZ09iU3RyID0gSlNPTi5zdHJpbmdpZnkgKG1zZ0tleXNBKTtcblxuICAgIH0gLy8gZW5kIGlmICh2LmtleXNPbmx5KVxuICAgIFxuICAgIGlmIChtc2dPYlN0ci5sZW5ndGggPiB2LnRhcmdldExlbmd0aCkge1xuXG4gICAgICAgIHZhciBoYWxmTGVuZ3RoID0gTWF0aC5jZWlsICh2LnRhcmdldExlbmd0aCAvIDIpO1xuXG4gICAgICAgIHZhciBmaXJzdEhhbGYgPSBtc2dPYlN0ci5zdWJzdHIgKDAsIGhhbGZMZW5ndGgpO1xuICAgICAgICB2YXIgc2Vjb25kSGFsZiA9IG1zZ09iU3RyLnN1YnN0ciAobXNnT2JTdHIubGVuZ3RoIC0gaGFsZkxlbmd0aCwgaGFsZkxlbmd0aClcblxuICAgICAgICBtc2dPYlN0ciA9IGZpcnN0SGFsZiArICcgIDw9PV5efF5ePT0+ICAnICsgc2Vjb25kSGFsZjtcblxuICAgIH0gLy8gZW5kIGlmIChtc2dPYlN0ci5sZW5ndGggPiB2LnRhcmdldExlbmd0aClcbiAgICBcblxuICAgIHJldHVybiBtc2dPYlN0cjtcblxufTsgLy8gZW5kIFAubXNnU2hvcnRlbiBcblxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuUC5zZXRLZXlzT25seSA9IChrZXlzT25seSkgPT4ge1xuICAgIFxuICAgIHYua2V5c09ubHkgPSBrZXlzT25seTtcblxufTsgLy8gZW5kIFAuc2V0S2V5c09ubHkgXG5cblxuICAgIC8vIGVuZCBQVUJMSUMgc2VjdGlvblxuXG5mLmluaXQgKCk7XG5cbnJldHVybiBQO1xuXG59O1xuXG5cblxuIl19
