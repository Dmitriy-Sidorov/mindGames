$(function () {

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