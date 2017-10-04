var count = 0;
var last_div;
function openTab(evt, tr, chartId, tableClick) {
    if(tableClick == undefined) { tableClick = true; }
    last_div = chartId;
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tabcontent_info = document.getElementsByClassName("tabcontent_info");
    for(i=0; i<tabcontent_info.length; i++){
	tabcontent_info[i].style.color = "black";
        tabcontent_info[i].style.fontWeight = "400";
        tabcontent_info[i].style.backgroundColor = "white";
    }

    document.getElementById(tr).style.display = "block";
    if(tableClick) {
      document.getElementById(tr + "_info").style.color = "rgb(70, 121, 178)";
      document.getElementById(tr + "_info").style.fontWeight = "700";
      document.getElementById(tr + "_info").style.backgroundColor = "#8CA0A6";
    }
}

document.getElementById("chart0_click").click();

$(function() {
    $('a').tooltip({placement: 'right'});
});
