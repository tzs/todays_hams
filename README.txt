This is a little command line tool that checks the FCC website for new and
upgraded amateur radio callsigns. It requires PhantomJS, which is a nifty
headless full-featured web browser.

You can find out more about PhantomJS here: http://phantomjs.org.

To use, put the files latest.js and lib-latest.js together in some directory,
then run latest.js with PhantomJS.

Latest.js will direct PhantomJS to browse to the FCC license search page, and
then will fill in the form, asking to search for licenses with an effective
date of today or tomorrow (local time).

It will then get the search results (paging through them if there is more than
one page), and will save the results in file named "out". There will be one
line per license in the results, containing the callsign and the name of the
callsign owner, tab separated.

This will be sorted by name.

WARNING! If the FCC makes changes to the implementation of the license
search page or the results page, that could easily break this tool. If
that happens, I *may* try to fix this tool, but I may not. I wrote this
for my convenience, and will lose a lot of interest in this as soon as
my license comes through. :-)

If you would prefer some other sorting order, edit lib-latest.js, and find
these lines in the function fill_search_form():

    t = document.getElementsByName("ulsSortBy")[0];
    select_option(t, "Name");

Change "Name" in the select_option call to any other valid option from the
search page. To find the valid options, go to the page in your regular
browser, and then find the sort drop down and look to see the option names.
The search page is here:

    http://wireless2.fcc.gov/UlsApp/UlsSearch/searchAmateur.jsp

Note: case is significant! Match the case the FCC uses on the form!

Other search options you might want to change are the kind of date that is
searched for. It defaults to "Effective Date". If you do not yet have a
ham radio license, you might want to change this to "Grant Date". Then
you will only see new licenses. If you already have a license, and are
looking for your upgrade to come through, keep it at "Effective Date".

If you want to limit results to particular license classes, find this
commented out code in lib-latest.js, and enable it, and change the
options to the ones you want. The selection box for this allows
multiple selection, so you can look for more than one type of
license.

    // Enable this code if you want to limit to specific
    // license types
    //t = document.getElementsByName("operatorCode")[0];
    //select_option(t, "Amateur Extra");
    //select_option(t, "General");
