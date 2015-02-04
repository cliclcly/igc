// igc-tabs.js

$( function() {
    $('.igc-tabs li').click( function(event) {
        if ( !$(this).hasClass('selected')) {
            $('.igc-tabs li').removeClass('selected');
            $(this).addClass('selected');

            var page_id = $(this).attr('id');
            $('.igc-tabs-page').addClass('igc-tabs-gone');
            $('.igc-tabs-page#' + page_id).removeClass('igc-tabs-gone');
        }
    });
});
