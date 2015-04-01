function click_item(item)
{
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    item.dispatchEvent(e);
    return 0;
}

function fill_search_form()
{
    var t;

    var day = new Date();
    var y = day.getFullYear();
    var m = day.getMonth() + 1;
    var d = day.getDate();
    var fromDate = m + "/" + d + "/" + y;
    day.setDate(d+1);
    y = day.getFullYear();
    m = day.getMonth() + 1;
    d = day.getDate();
    var toDate = m + "/" + d + "/" + y;

    t = document.getElementsByName("ulsDateType")[0];
    select_option(t, "Effective Date");

    // Enable this code if you want to limit to specific
    // license types
    //t = document.getElementsByName("operatorCode")[0];
    //select_option(t, "Amateur Extra");
    //select_option(t, "General");

    t = document.getElementsByName("fiRowsPerPage")[0];
    select_option(t, "100");

    t = document.getElementsByName("ulsSortBy")[0];
    select_option(t, "Name");

    t = document.getElementById("fromDate");
    t.value = fromDate;
    t = document.getElementById("toDate");
    t.value = toDate;
}

function submit_search_form()
{
    var i;
    var inputs = document.getElementsByTagName("input");
    for (i = 0; i < inputs.length; ++i)
    {
        if (inputs[i].getAttribute("alt") == "Search")
        {
            click_item(inputs[i]);
            return;
        }
    }
}

function select_option(sel, option_name)
{
    var i;
    var options = sel.getElementsByTagName("option");

    for (i = 0; i < options.length; ++i)
        if (options[i].innerText == option_name)
            options[i].selected = 1;
}

function process_results()
{
    var i, j;
    var tables = document.getElementsByTagName("table");

    window.tzs_results = new Array();
    window.tzs_next = 0;

    for (i = 0; i < tables.length; ++i)
    {
        if (tables[i].getAttribute("summary") == "License search results")
        {
            var rows = tables[i].getElementsByTagName("tr");
            for (j = 1; j < rows.length - 1; ++j)
            {
                var cols = rows[j].getElementsByTagName("td");
                var call = cols[1].innerText;
                var who = cols[2].innerText;
                window.tzs_results.push(call + "\t" + who);
            }
        }
    }
    return window.tzs_results.length;
}

function get_next()
{
    if (window.tzs_next < window.tzs_results.length)
    {
        return window.tzs_results[window.tzs_next++];
    }
    else
    {
        return "";
    }
}

function press_next()
{
    var i;
    var links = document.getElementsByTagName("a");
    for (i = 0; i < links.length; ++i)
    {
        if (links[i].getAttribute("title") == "Next page of results")
        {
            click_item(links[i]);
            return 1;
        }
    }
    return 0;
}
