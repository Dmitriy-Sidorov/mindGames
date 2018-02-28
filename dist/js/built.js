$(function () {

    "use strict";

    $.mask.definitions['~'] = "[+-]";
    $('.jq-phone').mask('+7 (999) 999-99-99');

    function msgSuccess(text) {
        swal({title: "", text: text, type: "success", confirmButtonText: "OK", confirmButtonColor: "#5db81e"});
    }

    function msgError(text) {
        swal({title: "", text: text, type: "error", confirmButtonText: "OK", confirmButtonColor: "#5db81e"});
    }

    $(".form").submit(function () {
        var th = $(this);
        var id = th.attr("id");

        $.ajax({
            type: 'POST',
            url: 'ajax/send.php',
            data: th.serialize(),
            cache: false,

            complete: function (data) {
                var str = $.parseJSON(data.responseText);
                if (str.err == 1) {
                    msgError(str.text);
                }
                else {
                    msgSuccess(str.text);
                    setTimeout(function () {
                        th.trigger("reset");
                        $.fancybox.close();
                    }, 1000);
                }
            }
        });
        return false;
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:45,
        responsiveClass:true,
        navText: ['<i class="fas fa-chevron-circle-left"></i>','<i class="fas fa-chevron-circle-right"></i>'],
        responsive:{
            0:{
                items:1,
                nav:false
            },
            576:{
                items:2,
                nav:false
            },
            768:{
                items:2,
                nav:true
            },
            992:{
                items:3,
                nav:true
            }
        }
    })
});
$('.learn__circle').circleProgress({
    size: "120",
    thickness: "10",
    animationStartValue: "1",
    startAngle: -0.505 * Math.PI,
    fill: {
        color: "#ffffff"
    }
});
$('#carousel-speakers').carousel({
    interval: 5000
});
$('#carousel-reviews').carousel({
    interval: 5000
});