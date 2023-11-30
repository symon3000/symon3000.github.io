$("#work-button, #play-button").click(function() {
    $("#main").animate({ top: '10%' }, 1000, 'swing');
});

$("#work-button").click(function() {
    $(this).removeClass('inactive').addClass('active'); // set work-button to active
    $("#play-button").removeClass('active').addClass('inactive'); // set play-button to inactive
    $("#play").fadeOut();
    $("#work").fadeIn();
    $("#x").fadeIn();
});

$("#play-button").click(function() {
    $(this).removeClass('inactive').addClass('active'); // set play-button to active
    $("#work-button").removeClass('active').addClass('inactive'); // set work-button to inactive
    $("#work").fadeOut();
    $("#play").fadeIn();
    $("#x").fadeIn();
});

$("#x").click(function() {
    $("#main").animate({ top: '50%' }, 1000, 'swing');
    $("#x, #work, #play").fadeOut();
    $("#work-button, #play-button").removeClass("inactive").addClass('active');
});

$("h1").click(function() {
    $("#main").animate({ top: '50%' }, 1000, 'swing');
    $("#x, #work, #play").fadeOut();
    $("#work-button, #play-button").removeClass('inactive').addClass('active');
})
