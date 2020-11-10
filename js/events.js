$(document).ready(function () {

    $('#comment').val($.cookie('message'));

    $('#send').on('click', function () {
        createComments();
        //  console.log($('#name').val());
        $('#send').attr('disabled', true);

        goNanobar();

    });

    getComments();

    let time;
    $('#status').on('click', function () {
        if ($('#status').prop("checked") === true) {
            $('#status-auto').html('включено').css('color', 'green');
            time = setInterval(getComments, $('#sec').val() * 1000);
        } else {
            // console.log()
            $('#status-auto').html('отключено').css('color', 'red');
            clearInterval(time);
        }

    });
    $('#sec').keyup(function () {
        //console.log('12');
        if (isSecondsValidation() === false) {
            return;
        }

        //проверка числа на корректность
        if ($('#sec').val() >= 5) {
            clearInterval(time);
            time = setInterval(getComments, $('#sec').val() * 1000);
        } else {
            if ($('#sec').val() !== '') {
                Swal.fire(
                    'Ошибка.Частота обновления должна быть не менее 5 секунд.'
                );
            }
        }

        // console.log($('#sec').val()>1);
    });

    $('#grinning').on('click', function () {
        // console.log('1');
        $('#comment').val($('#comment').val() + ' :grinning:');
        /* let newVal=$('#comment').val()+' :grinning:';
         $('#comment').val(newVal); - аналогично примеру выше*/
        $('#comment').focus();
    });

    $('#joy').on('click', function () {
        $('#comment').val($('#comment').val() + ' :joy:');
        $('#comment').focus();
    });

    $('#wink').on('click', function () {
        $('#comment').val($('#comment').val() + ' :wink:');
        $('#comment').focus();
    });

    $('#comment').keyup(function () {

        //пишу комментарий в cookie
        saveCommentToCookie();

        if ($('#comment').val() !== '') {
            //console.log('1');
            $('#send').attr('disabled', false);
        } else {
            $('#send').attr('disabled', true);
        }
    });

});
