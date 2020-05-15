function bookingTable() {

    var $table = $('#fresh-table');
    $table.bootstrapTable({
        classes: 'table table-hover',
        toolbar: '.toolbar',

        search: false,
        showRefresh: false,
        showToggle: true,
        showColumns: false,
        pagination: true,
        striped: false,
        sortable: true,
        pageSize: 10,
        pageList: [10, 20, 50, 100],

        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return '';
        },
        formatRecordsPerPage: function (pageNumber) {
            return pageNumber + ' rows visible';
        }
    });

}