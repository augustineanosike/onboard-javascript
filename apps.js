var $tbody;
$(document).ready(function () {
    //Simulate Ajax call here to get customer data
    getCustomerData();
    getAllRecords();
    getRecordsCount();
    //to select the rows of the column
    $('.tbody').on('clicked.rs.row', function (evt) {
        // Now it's safe to check what row was selected
        var rows = $(this).select;
    });
    // Pagination started 
    //number of records per page
    var pageSize = 25;
    // reset current page counter on load
    var x = 1;
    var x10 = x.toString().trim();
    $("#hdnActivePage").val(x10);
    // calculate number of pages
    var numberOfPages = $('tbody tr').length / pageSize;
    // action on 'next' click Button
    $("a.next").on('click', function () {
        // show only the necessary rows based upon activePage and Pagesize
        $("tbody tr:nth-child(-n+" + (($("#hdnActivePage").val() * pageSize) + pageSize) + ")").show();
        $("tbody tr:nth-child(-n+" + $("#hdnActivePage").val() * pageSize + ")").hide();
        var currentPage = Number($("#hdnActivePage").val());
        var newpage;
        newpage = currentPage;
        var x4;
        x4 = newpage + 1;
        var x8 = x4.toString().trim();
        $("#hdnActivePage").val(x8);
        // check if previous page button is necessary (not on first page)
        if ($("#hdnActivePage").val() != 1) {
            $("a.previous").show();
            $("span").show();
        }
        // check if next page button is necessary (not on last page)
        if ($("#hdnActivePage").val() === numberOfPages) {
            $("a.next").hide();
            $("span").hide();
        }
    });
    // action on 'previous' click Button
    $("a.previous").on('click', function () {
        var currentPage = Number($("#hdnActivePage").val() - 1);
        var presult = "" + currentPage.toString().trim();
        $("#hdnActivePage").val(presult);
        // first hide all rows
        $("tbody tr").hide();
        // and only turn on visibility on necessary rows
        $("tbody tr:nth-child(-n+" + ($("#hdnActivePage").val() * pageSize) + ")").show();
        $("tbody tr:nth-child(-n+" + (($("#hdnActivePage").val() * pageSize) - pageSize) + ")").hide();
        // check if previous button is necessary (not on first page)
        if ($("#hdnActivePage").val() === 1) {
            $("a.previous").hide();
            $("span").hide();
        }
        // check if next button is necessary (not on last page)
        if ($("#hdnActivePage").val() < numberOfPages) {
            $("a.next").hide();
            $("span").show();
        }
        if ($("#hdnActivePage").val() === 1) {
            $("span").hide();
        }
    });
});
function getCustomerData() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/columns",
        success: function (data1) {
            var table = '<table id="tableheader" border="1px" cellspacing="5px" style="width:100%;"><thead class="thead" width="150px">';
            $.each(data1, function (key, value) {
                table += '<th width="150px">' + value + '</th>';
            });
            table += '</thead>';
            $('#tableheader').append(table);
        }
    });
}
function getAllRecords() {
    $.ajax({
        url: '/records?from=0&to=10000',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var table = '<table id="tBody" cellspacing="5px" border="1px">';
            $.each(data, function (key, valueData) {
                table += '<tr>';
                $.each(valueData, function (key, value) {
                    table += '<td width="165px" >' + value + '</td>';
                });
                table += '</tr>';
            });
            table += '</table>';
            $('#tBody').append(table);
        },
        error: function (msg) {
            alert(" Error occured  \n" + JSON.stringify(msg));
        }
    });
}
function getRecordsCount() {
    $.ajax({
        url: '/recordCount',
        type: 'GET',
        dataType: 'json',
        success: function (data2) {
            $('#div2').append('Total Records : ' + data2);
        },
        error: function (msg) {
            alert(" Error occured  \n" + JSON.stringify(msg));
        }
    });
}
function getPagination() {
}
//# sourceMappingURL=apps.js.map