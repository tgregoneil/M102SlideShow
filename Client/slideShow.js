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



