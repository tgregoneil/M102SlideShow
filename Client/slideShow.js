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
            "word-break: break-word;" +
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
            "position: absolute;" +
            "right: 0;" +
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
        
        var matched = val.match (/..(.*)\/.*?([a-zA-Z].*).png/);
        var loc = matched [1];
        var caption = matched [2];

        var divOb = {div: [
            {img: 0, src: val},
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

            _.doSlideShow (vals);
            
            break;

    } // end switch (cmd)
    
    

}; // end P.doAction 


// end PUBLIC section

_.init ();

return P;

};



