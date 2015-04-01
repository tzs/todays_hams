var system = require('system');
var page = require('webpage').create();
var fs = require('fs');
var of = fs.open("out", "w");
var timer0 = null;
var finished = 0;
var callsign_count = 0;

// if the page generates any console messages, dump them to our console
page.onConsoleMessage = function (msg) {
    console.log('page: ' + msg);
};


function wait_for_data()
{
    if (finished)
    {
        console.log("Total callsigns found: " + callsign_count);
        clearInterval(timer0);
        of.close();
        phantom.exit(0);
    }
    else
    {
        console.log("waiting for search results...");
    }
}

function results_load_complete(status)
{
    var num_callsigns;

    if (status == "success")
    {
        page.injectJs("lib-latest.js");
        num_callsigns = page.evaluate(call_process_results);
        callsign_count += num_callsigns;
        while (num_callsigns-- > 0)
        {
            var data = page.evaluate(call_get_next);
            of.writeLine(data);
        }
        finished = ! page.evaluate(call_press_next);
    }
    else
    {
        console.log("page load failed: " + status);
        of.close();
        phantom.exit(-1);
    }
}

page.open('http://wireless2.fcc.gov/UlsApp/UlsSearch/searchAmateur.jsp', function () {
    page.injectJs("lib-latest.js");
    page.onLoadFinished = results_load_complete;
    page.evaluate(call_fill_search_form);
    //Enable the page.render if you want to view the search page to make
    //sure it was filled out correctly
    //page.render("debug.png");
    page.evaluate(call_submit_search_form);
    timer0 = setInterval(wait_for_data,1000);
});

function call_fill_search_form()
{
    return fill_search_form();
}

function call_submit_search_form()
{
    return submit_search_form();
}

function call_process_results()
{
    return process_results();
}

function call_press_next()
{
    return press_next();
}

function call_get_next()
{
    return get_next();
}
