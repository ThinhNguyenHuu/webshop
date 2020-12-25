function gotoUserReview() {
  window.setTimeout(
    function() {
        document.getElementById('product_tabs_description').classList.remove('in', 'active');
        document.getElementById('reviews_tabs').classList.add('in', 'active');
        document.getElementById('description_tabs_label').classList.remove('active');
        document.getElementById('reviews_tabs_label').classList.add('active');
        $('html, body').animate({
            scrollTop: $('#user-reviews').offset().top - 50
        }, 0);
    }, 200);
}

function gotoAddReviewBox() {
    window.setTimeout(
        function() {
            document.getElementById('product_tabs_description').classList.remove('in', 'active');
            document.getElementById('reviews_tabs').classList.add('in', 'active');
            document.getElementById('description_tabs_label').classList.remove('active');
            document.getElementById('reviews_tabs_label').classList.add('active');
            $('html, body').animate({
                scrollTop: $('#product-detail-tab').offset().top
            }, 0);
        }, 200);
}

if (location.hash === '#reviews_tabs') {
    gotoUserReview();
}