<?php
if (!$_POST['phone']) {
    $msg_box["err"] = 1;
    $msg_box["text"] = "Ошибка отправки сообщения! Переданы не все данные";
    die(json_encode($msg_box));
} else {
    include "class.phpmailer.php";

    $arFields = array(
        "<b>Имя</b>" => $_POST["name"],
        "<b>Номер телефона</b>" => $_POST["phone"],
        "<b>Email</b>" => $_POST["email"],
        "<b>Данные страницы: </b>" . $_POST["form"] . "<br>"
    );

    $text = "";
    foreach ($arFields as $nameField => $arField):
        $text .= $nameField . ": " . $arField . "<br/>";
    endforeach;

    $text .= "<br/>------------------------------------<br/>
                Сообщение отправлено автоматически. Пожалуйста, не отвечайте на него";

    $mail = new PHPMailer(true);
    try {

        $mail->SetFrom('info@' . $_SERVER['HTTP_HOST'], 'Site');
        $mail->Subject = "Тема";

        $mail->MsgHTML($text);

        $text = str_replace("<br/>", "\n", $text);
        $text = strip_tags($text);
        $mail->AltBody = $text;

        $mail->AddAddress('dmitriywhitex@ya.ru');

        // отправляем наше письмо
        if ($mail->Send()) {
            $msg_box["err"] = 0;
            $msg_box["text"] = "Спасибо! Ваша заявка успешно отправлена";
            die(json_encode($msg_box));
        }
    } catch (phpmailerException $e) {
        $msg_box["err"] = 1;
        $msg_box["text"] = "Ошибка отправки сообщения";
        die(json_encode($msg_box));
    } catch (Exception $e) {
        $msg_box["err"] = 1;
        $msg_box["text"] = "Ошибка отправки сообщения";
        die(json_encode($msg_box));
    }

}
