$(document).ready(function () {
    $(window).on('scroll', function () {
        $(".fade-in, .fade-in-left, .fade-in-right").each(function () {
            let position = $(this).offset().top;
            let scrollPos = $(window).scrollTop() + $(window).height() - 50;
            if (scrollPos > position) {
                $(this).css("opacity", "1");
                $(this).css("transform", "translateY(0)");
            }
        });
    });
});
