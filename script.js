//array to exchange data with local storage
var todos = [];

$(document).ready(() => {
    //local storage handling
    if (localStorage.getItem('todos') == null) {
        updateLocalStorage();
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        $.each(todos, (i, todo) => {
            $('#list').append('<li>' + todo + '</li>');
        });
    }

    function timer() {
        const startingMinutes = parseInt($('#time').val());
        if (startingMinutes === parseInt(startingMinutes, 10)) {
            $('#desc').html("<p>Don't waste your time!</p>")

            $('#timer').addClass('timer');

            // Set the date we're counting down to
            var current = new Date().getTime();
            var countDownDate = new Date(current + startingMinutes * 60000);

            // Update the count down every 1 second
            var x = setInterval(function () {

                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds

                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the element with id="demo"
                $("#timer").html(hours + "h " +
                    minutes + "m " + seconds + "s ");

                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("#timer").innerHTML = "EXPIRED";
                }
            }, 1000);

        }
    }

    function updateLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addToDo() {
        var todo = $('#todo').val();
        $('#todo').val("");
        if (todo) {
            $('#list').append('<li>' + todo + '</li>');
            todos.push(todo);
            updateLocalStorage();
            console.log(todos.length);
        }
    }
    //selectors and events
    $('#btn-time').click(timer);
    $('#time').keypress((e) => {
        if (e.which === 13) {
            timer();
        }
    });
    $('#btn-todo').click(addToDo);
    $('#todo').keypress((e) => {
        if (e.which === 13) {
            addToDo();
        }
    });
    $('body').on('click', 'li ', function () {
        var todo = $(this).text();
        const index = todos.indexOf(todo);
        if (index > -1) {
            todos.splice(index, 1);
        }
        updateLocalStorage();

        $(this).fadeOut(500, () => {

            $(this).remove();

        });

    });
});