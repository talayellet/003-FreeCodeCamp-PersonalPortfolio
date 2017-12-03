$(document).ready(function() {
    // Declare event listener
    var fSetNavbarState = function(clickedLinkId) {
        $(clickedLinkId).click(function() {
            $(".navLink").removeClass("active");
            $(clickedLinkId).addClass("active");
        });
    }
    // Add event listeners
    fSetNavbarState("#portfolioNavLink");
    fSetNavbarState("#contactNavLink");
    fSetNavbarState("#aboutNavLink");
    fSetNavbarState("#socialMediaNavLink");
    fSetNavbarState("#homeNavLink");

    // Collapse mobile navbar on click nav links
    $(function() {
        $('.nav a').on('click', function(){
            if($('.navbar-toggle').css('display') !='none'){
                $(".navbar-toggle").trigger( "click" );
            }
        });
    });

    // Add tooltip to disabled form 'Submit' button
    $('[data-toggle="tooltip"]').tooltip();
});