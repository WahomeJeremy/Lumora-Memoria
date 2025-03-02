$(document).ready(function() {
    $(window).on("scroll", function() {
        $("section").each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll + windowHeight > position) {
                $(this).removeClass("opacity-0").addClass("opacity-100");
            }
        });
    });

    // hero carousel
    let index = 0;
    function showSlide() {
        let slides = $(".carousel-item");
        slides.removeClass("opacity-100").addClass("opacity-0");
        slides.eq(index).removeClass("opacity-0").addClass("opacity-100");
        index = (index + 1) % slides.length;
    }
    showSlide();
    setInterval(showSlide, 3000);

    $("#menuToggle").click(function() {
        $("ul").toggleClass("hidden");
    });
});

$(document).ready(function() {
    $("#gallery-text").animate({
        opacity: 1,
        translateY: 0
    }, 1000);

    $("#gallery-images img").each(function(index) {
        $(this).delay(500 * index).animate({
            opacity: 1,
            translateY: 0
        }, 1000);
    });
});