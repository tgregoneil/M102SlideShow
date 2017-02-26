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



