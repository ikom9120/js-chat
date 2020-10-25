function createComments() {
    $.ajax({
        url: '/backend/commentCreate.php',
        type: 'post',
        dataType: 'json',
        data: {
            name: $('#name').val(),
            comment: $('#comment').val(),
        },
        timeout: 5 * 1000,
        success: function (response) {
            $('#name').val('');
            $('#comment').val('');

            getComments();
        },
        error: function (response) {
            Swal.fire(
                'Ошибка отправки'
            );
        }
    });

}

function getComments() {
    $.ajax({
        url: '/backend/commentList.php',
        type: 'get',
        dataType: 'json',
        timeout: 5 * 1000,
        success: function (response) {
            $('#text').html('');
            for (let i = 0; i < response.length; i++) {
                $('#text').append('Имя: ' + response[i].name + '<br>Комментарий: ' + response[i].comment + '<br><br>');
            }
        },
        error: function (response) {
            Swal.fire(
                'Ошибка отправки'
            );
        }
    });

}

function isSecondsValidation() {
    //проверка на наличие данных
    if ($('#sec').val() === '') {
        return false;
    }

    // проверка на целое число
    if (/^\d+$/.test($('#sec').val()) !== true) {

        Swal.fire(
            'Ошибка.Допустим ввод только целого числа.'
        );
        $('#sec').val('');
        return false;
    }
    return true;
}

$(document).ready(function () {

    $('#send').on('click', function () {
        createComments();
        //  console.log($('#name').val());
    });

    getComments();

    let time;
    $('#status').on('click', function () {
        if ($('#status').text() === 'Автообновление OFF') {
            $('#status').text('Автообновление ON');
            time = setInterval(getComments, $('#sec').val() * 1000);
        } else {
            $('#status').text('Автообновление OFF');
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
    });

    $('#joy').on('click', function () {
        $('#comment').val($('#comment').val() + ' :joy:');
    });

    $('#wink').on('click', function () {
        $('#comment').val($('#comment').val() + ' :wink:');
    });

});
