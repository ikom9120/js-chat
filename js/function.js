/**
 * Ф-ция отправляет запрос на backend для сохранения комментария
 */
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

/**
 * Ф-ция отправляет запрос для получения комментариев и вывода на страницу
 */
function getComments() {
    $.ajax({
        url: '/backend/commentList.php',
        type: 'get',
        dataType: 'json',
        timeout: 5 * 1000,
        success: function (response) {

            goNanobar();

            $('#text').html('');
            for (let i = 0; i < response.length; i++) {

                response[i].comment = parseSmiles(response[i].comment);

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

/**
 * Ф-ция проверяет корректность введенного числа
 *
 * @returns {boolean}
 */
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

/**
 * Ф-ция заменяет коды смайлов на картинки
 *
 * @param comment
 * @returns {*}
 */
function parseSmiles(comment) {
    comment = comment.replace(':grinning:',
        '<img src="img/grinning.png">');

    comment = comment.replace(':joy:',
        '<img src="img/joy.png">');

    comment = comment.replace(':wink:',
        '<img src="img/wink.png">');
    return comment;
}

/**
 * Ф-ция отображает лоадер
 */
function goNanobar() {
    let nanobar = new Nanobar({
        classname: 'my-class',
        id: 'my-id',
        target: document.getElementById('myDivId')
    });
    nanobar.go(100);
}