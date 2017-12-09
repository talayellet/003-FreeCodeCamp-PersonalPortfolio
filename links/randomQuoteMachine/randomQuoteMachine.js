fLoadQuote = function () {
    $.ajax({
        cache: false,
        url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
        dataType: "json",
        success: function(a) {
            $("#quote-div").html("<i class='fa fa-quote-left' aria-hidden='true'></i> "
                + a[0].content + "<br>"
                + "<p style='font-size: 18px; text-align: right; display: block;'>— "
                + a[0].title + "</p>")
        }
    });
}

fGetRandomColor = function () {
    var letters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++) {
        color+=letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

$(document).ready(function() {
    fLoadQuote();
    $("#new-quote-btn").on('click', fLoadQuote);
    $("#new-quote-btn").on("click", function () {
        var color = fGetRandomColor();
        $(".random-color").css("background-color", color);
    })
});