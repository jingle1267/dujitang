dataArr = []
click_times = 0

//Writes text to field character by character
function showText(destination, message, speed, callback) {
    console.log('message', message);
    var i = 0;
    var interval = setInterval(function () {
        $(destination).append(message.charAt(i));
        i++;
        if (i > message.length) {
            clearInterval(interval);
            callback()
        }
    }, speed);
}

//Calls to the forismatic API for a random quote
function randomQuote() {
    if (dataArr.length !== 0 && click_times < 5) {
        // dataArr = response.data;
        click_times += 1;
        dataArrLen = dataArr.length;
        $("#random_quote").text("");
        $("#random_author").text("");
        txt_str = dataArr[Math.ceil(Math.random() * dataArrLen)];
        if (txt_str === undefined || txt_str === '')
            txt_str = '我最大的缺点，就是缺点钱。';
        showText("#random_quote", txt_str, 10, function () {
        })
    } else {
        //Using the Forsimatic API
        $.ajax({
            url: "./data/api&p=" + Math.ceil(Math.random() * 61),
            dataType: "json",
            type: "GET",
            //If succesful does function
            success: function (response) {
                //Clear previous random quote
                $("#random_quote").text("");
                $("#random_author").text("");

                //Checks if there is no author
                if (response.data === undefined) {
                    response.quoteAuthor = "unknown";
                }

                dataArr = response.data;
                click_times = 0;
                dataArrLen = dataArr.length;

                txt_str = dataArr[Math.ceil(Math.random() * dataArrLen)];
                console.log('txt_str', txt_str);
                if (txt_str === undefined || txt_str === '')
                    txt_str = '我最大的缺点，就是缺点钱。';
                showText("#random_quote", txt_str, 10, function () {
                    // showText("#random_author", '-' + response.quoteAuthor, 10, function () {
                    //     //Appending blinking div after author
                    // });
                })

            }
        });
    }

}

//Sets the blinking of the button
setInterval(function () {
    $("#quoteButton").css("color", function () {
        this.switch = !this.switch
        return this.switch ? "black" : "green"
    });
}, 400)

//Button repeats function
$("#quoteButton").click(function () {
    $("#quoteButton").attr('disabled', true);
    randomQuote();
    //Disables button press while quote is printing
    setTimeout(function () {
        $("#quoteButton").attr('disabled', false);
    }, 1000);

    //Scrolls to the quote
    $('html, body').animate({
        scrollTop: $("#random_quote").offset().top
    }, 1000);
});

//Provides initial quote
$('#quoteButton').trigger('click');