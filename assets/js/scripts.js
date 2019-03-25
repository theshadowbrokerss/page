$(document).ready(function () {

    "use strict";

    /*
     ----------------------------------------------------------------------
     Preloader
     ----------------------------------------------------------------------
     */
    $(window).on('load', function () {
        var $preloader = $('#page-preloader'),
            $spinner = $preloader.find('.spinner');
        $spinner.fadeOut();
        $preloader.delay(350).fadeOut('slow');
    });

    /*
     ----------------------------------------------------------------------
     Scroll to top
     ----------------------------------------------------------------------
     */
    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });
    //Click event to scroll to top
    $('.scroll-to-top').on('click', function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    /*
     ----------------------------------------------------------------------
     Full-page scroll
     ----------------------------------------------------------------------
     */
    $('#fullpage').fullpage({
            menu: '#menu',
            anchors: ['about-data', 'prising-data', 'portfolio-data', 'contact-data'],
            navigation: true,
            navigationPosition: 'right',
            showActiveTooltip: true,
            slidesNavigation: true,
            slidesNavPosition: 'bottom',
            responsiveWidth: (992)
        }
    );

    /*
     ----------------------------------------------------------------------
     Magnific Popup
     ----------------------------------------------------------------------
     */
    if ($("#container-portfolio").length) {
        $('#container-portfolio').mixItUp({load: {filter: '.design'}});
    } else if ($("#container-portfolio-page").length) {
        $('#container-portfolio-page').mixItUp();
    }

    /*
     ----------------------------------------------------------------------
     Prise tab
     ----------------------------------------------------------------------
     */
    $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });

    /*
     ----------------------------------------------------------------------
     Portfolio
     ----------------------------------------------------------------------
     */
    $('.popup-gallery').magnificPopup({
        delegate: ".popup-content",
        type: 'inline',
        midClick: true,
        gallery: {
            enabled: true, // set to true to enable gallery
            preload: [0, 2], // read about this option in next Lazy-loading section
            navigateByImgClick: true,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
            tPrev: 'Previous (Left arrow key)', // title for left button
            tNext: 'Next (Right arrow key)', // title for right button
            tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
        }

    });


    /*
     ----------------------------------------------------------------------
     Mobile-Menu
     ----------------------------------------------------------------------
     */

    var link = $(".menu-open"),
        popup = $("body"),
        close = $(".close");

    link.on("click", function (event) {
        event.preventDefault();
        popup.addClass("open");
    });
    close.on("click", function (event) {
        event.preventDefault();
        popup.removeClass("open");
    });

    if ($(".order-btn-wrap").length > 0) {
        var role = $(".order-btn-wrap"),
            profile = $(".profile-image"),
            close = $(".img-form-close");

        role.on("click", function (event) {
            event.preventDefault();
            profile.addClass("open-img");
        });
        close.on("click", function (event) {
            event.preventDefault();
            profile.removeClass("open-img");
        });
    }


    /*
     ----------------------------------------------------------------------
     Filters
     ----------------------------------------------------------------------
     */
    var arr = new Array();
    $(".filter").each(function () {
        arr = $(this).attr("data-filter").slice();
        $(this).children(".cat-count").text($(arr).length);
    });

    $(".all").children(".cat-count").text($('.mix').length);


    /*
     ----------------------------------------------------------------------
     Form
     ----------------------------------------------------------------------
     */
    var wrapper = $(".file_upload"),
        inp = wrapper.find("input"),
        btn = wrapper.find("button"),
        lbl = wrapper.find("div");

    btn.focus(function () {
        inp.focus()
    });

    // Crutches for the :focus style:
    inp.focus(function () {
        wrapper.addClass("focus");
    }).blur(function () {
        wrapper.removeClass("focus");
    });

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function () {
        var file_name;
        if (file_api && inp[0].files[0])
            file_name = inp[0].files[0].name;
        else
            file_name = inp.val().replace("C:\\fakepath\\", '');

        if (!file_name.length)
            return;

        if (lbl.is(":visible")) {
            lbl.text(file_name);

        } else
            btn.text(file_name);
    }).change();

    $(window).resize(function () {
        $(".file_upload input").triggerHandler("change");
    });


    /*
     ----------------------------------------------------------------------
     Forms
     ----------------------------------------------------------------------
     */

    /* Email validation */
    function valid_email_address(email) {
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
        return pattern.test(email);
    }

    /*
     ----------------------------------------------------------------------
     Contact form validation
     ----------------------------------------------------------------------
     */

    $("#submit-btn").on("click", function () {
        $("#user-status").val("yes");
    });

    $("#order-image-form").submit(function () {


        if (!valid_email_address($("#your-email").val()) || $("#your-orderid").val().length <= 6) {

            if (!valid_email_address($("#your-email").val())) {
                $("#your-email").addClass("error");
            }
            if ($("#your-orderid").val().length <= 6) {
                $("#your-orderid").addClass("error");
            }

        } else {

            var data_of_form = $(this).serialize();

            $.ajax({
                url: 'assets/php/mailtous.php',
                data: data_of_form,
                type: 'POST',
                success: function (data) {
                    if (data == "success") {
                        $("#your-email").val("");
                        $("#your-orderid").val("");
                        $("#your-sex").val("");
                        $("#your-race").val("");
                        $("#your-hair").val("");
                        $("#your-hair-color").val("");
                        $("#your-clothes").val("");
                        $("#your-clothes-color").val("");
                        $("#your-message").val("");
                        /*$("#your-photo").val("");*/
                        $("#your-background-color").val("");

                        $(".image-form .fill").text("Your order is accepted. Wait for reply to mail");
                        $(".image-form .fill").addClass('success');
                        setTimeout(
                            function () {
                                $(".image-form .fill").removeClass('success');
                                $(".image-form .fill").text("");
                            }, 5000
                        );
                    } else {
                        $(".image-form .fill").text("Error! Please, try again later.");
                        $(".image-form .fill").addClass('error');
                        setTimeout(
                            function () {
                                $(".image-form .fill").removeClass('error').fadeOut(500);
                                $(".image-form .fill").text("");
                            }, 5000
                        );
                    }
                },
                error: function () {
                    alert("te1");
                    $(".image-form .fill").text("Error! Please, try again later.");
                    $(".image-form .fill").addClass('error');
                    setTimeout(
                        function () {
                            $(".image-form .fill").removeClass('error');
                            $(".image-form .fill").text("");
                        }, 5000
                    );
                }
            });

        }

        return false;
    });

    $("#your-orderid, #your-email").on("click", function () {

        $(this).removeClass("error");

    });


    /*
     ----------------------------------------------------------------------
     Style switcher
     ----------------------------------------------------------------------
     */
    var img = $('#img-set');
    $('.new-img').on("click", function (el) {
        el.preventDefault();
        var data = $(this).attr("data-img");
        $.cookie("photo", data);
        $.cookie("photoClass", $(this).attr("data-class"));
        img.attr('src', 'assets/img/' + data);
    });

    if (!$(".chang-img .new-img").hasClass("active")) {
        var tok = $.cookie("colour-scheme");

        $('[ href = ' + tok + ']').addClass("active");
    }

    var photo_scheme = $.cookie("photo");
    if (photo_scheme != "" && photo_scheme != undefined) {
        img.attr('src', 'assets/img/' + photo_scheme);
    }

    if ($.cookie("photoClass") != "") {
        img.addClass($.cookie("photoClass"));
    }

    var style = ('#stylesheet-new');
    $('.new-colour').on("click", function (el) {
        el.preventDefault();
        var id = $(this).attr('href');

        $.cookie("colour-scheme", id);
        $(style).attr('href', 'assets/css/colour-scheme/' + id + '.css');
    });

    $('.new-bg').on("click", function (el) {
        el.preventDefault();
        var color = $(this).attr('data-bg');

        $.cookie("colour-bg", color);

        $(style).attr('data-bg', color);
        $(".about").css('background-color', color);
        $(".portfolio").css('background-color', color);
    });

    $('.style-open').on("click", function (el) {
        el.preventDefault();
        $('.style-switcher').toggleClass('style-off');
    });

    var colour_scheme = $.cookie("colour-scheme");
    var colour_bg = $.cookie("colour-bg");
    if (colour_scheme != "" && colour_scheme != undefined) {
        $(style).attr('href', 'assets/css/colour-scheme/' + colour_scheme + '.css');
        $(style).attr('data-color', colour_scheme);
    } else {
        $(style).attr('href', 'assets/css/colour-scheme/green-scheme.css');
        $(style).attr('data-color', 'green-scheme');
    }
    if (colour_bg != "" && colour_bg != undefined) {
        $(".about").css('background-color', colour_bg);
        $(".portfolio").css('background-color', colour_bg);
    }

    $(".change-color").on("click", ".new-colour", function () {
        $(".change-color .new-colour").removeClass("active");
        $(this).addClass("active");
    });

    $(".change-background").on("click", ".new-bg", function () {
        $(".change-background .new-bg").removeClass("active");
        $(this).addClass("active");
    });

    $(".chang-img").on("click", ".new-img", function () {
        if ($(this).hasClass("photo-radius")) {
            $("#img-set").removeClass("photo-radius");
            $("#img-set").addClass("photo-radius");
        } else {
            $("#img-set").removeClass("photo-radius");
        }
    });

});