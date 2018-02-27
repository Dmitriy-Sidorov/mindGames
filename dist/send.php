<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$form = $_POST['form'];

    function getEmail() {
        ob_start();
        include 'email.php';
        return ob_get_clean();
    }

//$to = getEmail();
$to = 'dmitriywhitex@ya.ru';

$subject = 'Заявка на мастер класс Игры разума';
$massege = '
Форма: '.htmlspecialchars($form).'<br>
Имя: '.htmlspecialchars($name).'<br>
Телефон: <a href="tel:'.$phone.'">'.htmlspecialchars($phone).'</a><br>
Email: <a href="tel:'.$email.'">'.htmlspecialchars($email).'</a><br>';

$headers = 'From: site.ru <mail@site.ru>\r\nContent-type: text/html; charset=UTF-8 \r\n';
mail($to, $subject, $massege, $headers);
header('Location: thanks.html');
exit();
