/* from https://stackoverflow.com/questions/46046201/how-do-i-create-a-parallax-effect-without-using-a-background-image/46158996 */
$(document).ready(function() {
    var onScroll = function() {
        var scrollTop = $(this).scrollTop();
        $('.parallax-div').each(function(index, elem) {
            var $elem = $(elem);
            var $img_elem = $elem.find('img');
            if ($img_elem.hasClass('parallax-1')) {
                $img_elem.css('top', (0-(scrollTop - $elem.offset().top))*.2);

            } else if ($img_elem.hasClass('parallax-2')) {
                $img_elem.css('top', (0-(scrollTop - $elem.offset().top))*.4);

            } else if ($img_elem.hasClass('parallax-3')) {
                $img_elem.css('top', (0-(scrollTop - $elem.offset().top))*.65);
            }
        });
    };
    onScroll.apply(window);
    $(window).on('scroll', onScroll);
});