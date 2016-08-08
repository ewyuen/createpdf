//var $ = require('jquery');

var rawfile = "C:/Users/edward.yuen/Desktop/COS/0825_Caffeine_3-InputTest_0.raw";
var xmlfile = "C:/Users/edward.yuen/Desktop/COS/0825_Caffeine_3-InputTest_0.xml";
var encrawfile = encodeURI(rawfile);
var encxmlfile = encodeURI(xmlfile);
// console.log(encrawfile);
// console.log(encxmlfile);
var builder = "http://localhost:9020/api/fileProcess/reportData?rawFilePath=";
var builder = builder.concat(encrawfile);
var builder = builder.concat("&xmlFilePath=");
var builder = builder.concat(encxmlfile	);
// console.log(builder);
var builder = builder.concat("&thresholdIntensity=0");
//console.log(builder);


var jsdom = require("jsdom");

/*

jsdom.env("", ["http://code.jquery.com/jquery.min.js"], function(err, window) {
    var $ = window.$
    $.support.cors = true;
    $.ajax({url : 'https://api.github.com/orgs/foo/members'})
        .then(function(members) {
            for (var i in members) {
                $.ajax({url : 'https://api.github.com/users/' + members[i].login})
                    .then(function(member){
                        console.log(member.name)
                    });
            }
        });
});

*/

var createPdfUrl = "http://localhost:9000/api/compounds/print";
var reportOutputPath = 'C:/Users/edward.yuen/Desktop/COS';

jsdom.env("", 
["http://code.jquery.com/jquery.min.js"], function(err, window) {
    var $ = window.$
    var model = new Object();
    $.support.cors = true;
    $.ajax({
       type: "GET",
       url: builder
     }).done(function (res) {
       // console.log('res', res);


        model.CompoundName = 'compoundName';
        model.ReportData = JSON.stringify(res);
        model.PdfFilePath = reportOutputPath;

        console.log('model', model);

        var request =  $.ajax({
            type: "POST",
            url: createPdfUrl,
            data: JSON.stringify(model),
            contentType: "application/json"
        });


        request.done(function (res) {
            console.log('res', res);
        });

        request.fail(function( jqXHR, textStatus, errorThrown ) {
            console.log( "Request failed: " + textStatus );
            console.log( "Error: " + errorThrown);
        });

    });



});



