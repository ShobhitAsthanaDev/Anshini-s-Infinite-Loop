$(document).ready(function() {
    var $slider = $("#slider");
    var slideLength = $("#slider > .slide").length - 1;
    var ctrl = false;

    // Initialize the audio player
    var audio = new Audio("https://anshini-s-infinite-loop.vercel.app/your-music-file.mp3"); // Replace with your correct URL
    audio.loop = true; // Enable looping
    audio.volume = 0.5; // Optional: Adjust volume (0.0 to 1.0)

    // Play/pause control
    $(".music-control").click(function() {
        if (audio.paused) {
            audio.play();
            $(this).text("Pause Music");
        } else {
            audio.pause();
            $(this).text("Play Music");
        }
    });

    // Handle keyboard shortcuts for slide navigation
    $(document).keydown(function(e) {
        if (e.keyCode == 17) {
            ctrl = true;
            $("#slider").removeClass("_3D");
            $(".key.ctrl").addClass("active");
        }
    }).keyup(function(e) {
        if (e.which == 17) {
            ctrl = false;
            $("#slider").addClass("_3D");
            $(".key.ctrl").removeClass("active");
        }
        if (e.which == 39 || e.which == 40) {
            nextSlide();
            return;
        }
        if (e.which == 37 || e.which == 38) {
            prevSlide();
            return;
        }
    });

    var is3D = false;
    $(".key").mousedown(function() {
        if ($(this).hasClass("ctrl")) {
            if ($(this).hasClass("active")) is3D = true;
            $("#slider").removeClass("_3D");
        }
        $(this).addClass("active");
    }).mouseup(function() {
        if ($(this).hasClass("down") || $(this).hasClass("right")) nextSlide();
        if ($(this).hasClass("up") || $(this).hasClass("left")) prevSlide();
        console.log(is3D);
        if ($(this).hasClass("ctrl active")) {
            if (is3D) {
                $(this).removeClass("active");
                $("#slider").addClass("_3D");
                is3D = false;
            }
        } else {
            $(this).removeClass("active");
        }
    });

    function nextSlide() {
        lastElem().addClass("active");
        $slider.addClass("transfomer");
        setTimeout(function() {
            var $slicedSlide = $('.slide').slice(slideLength);
            $slider.prepend($slicedSlide);
            $(document).find(".slide.active").removeClass("active");
            $slider.removeClass("transfomer");
        }, 300);
    }

    function prevSlide() {
        var $slicedSlide = $('.slide').slice(0, 1).addClass("active");
        $slider.append($slicedSlide);
        setTimeout(function() {
            lastElem().removeClass("active");
        }, 50);
    }

    function lastElem() {
        return $("#slider > .slide").last();
    }

    // Optionally, auto-play the music when the page loads
    audio.play();

});
