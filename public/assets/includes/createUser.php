<?php
    /*
    * SEGS - Super Entity Game Server
    * http://www.segs.io/
    * Copyright (c) 2006 - 2018 SEGS Team (see AUTHORS.md)
    * This software is licensed under the terms of the 3-clause BSD License. See LICENSE.md for details.
    */

    session_start();
    require_once '../../../config/config.php';

    use Segs\DatabaseConnection;

    $canContinue = true;
    /* Need to validate:
        username
            validate length
            validate availability
        password
            validate length
            validate complexity
            validate password1 and password2 match
    */

    class RETURN_VALUE
    {
        public $value = 0;
        public $return_message = "";
    }

    $user_message = new RETURN_VALUE();

    //Validate variables
    if(!empty($_POST['desired_username']))
    {
        $loginName = $_POST['desired_username'];
    }
    else
    {
        $canContinue = false;
        $user_message->value = 1;
        $user_message->return_message += "Username is empty.\n";
    }

    if(strlen($loginName) < $min_username_len)
    {
        // Too short, cannot continue
        $canContinue = false;
        $user_message->value = 1;
        $user_message->return_message += "\n";
    }

    if($canContinue && !empty($_POST['password1']))
    {
        $password1 = $_POST['password1'];
    }
    else
    {
        $canContinue = false;
        $user_message->value = 1;
        $user_message->return_message += "Password1 is empty.\n";
    }

    if($canContinue && !empty($_POST['password2']))
    {
        $password2 = $_POST['password2'];
    }
    else
    {
        $canContinue = false;
        $user_message->value = 1;
        $user_message->return_message += "Password2 is empty.\n";
    }

    // validate username availability
    if(!$canContinue || !isset($_SESSION['IsAvailable']) || $_SESSION['IsAvailable'] !== 'true')
    {
        $canContinue = false;
        $user_message->value = 1;
        $user_message->return_message += "Username is not available.\n";
    }

    // validate passwords match
    if(!$canContinue || $password1 !== $password2)
    {
        $canContinue = false;
        $user_message->value = 1;
        $user_message->return_message += "Passwords do not match\n";
    }

function addUser($loginName, $password, &$return_value)
{    
    $db_conn = new DatabaseConnection($dbhost, $dbuser, $dbpass, $accdb);
    //
    // if ($loginName == "" || $password == "") {
    //     $return_value->value = 1;
    //     $return_value->return_message = "Login name and password cannot be empty.";
    // } else {

    // if(!empty($_POST["username"]))
    //  {
    //     $username = $_POST["username"];
    //     $query = "SELECT * FROM accounts WHERE username='" . $username . "'";
    //     $user_count = $db_conn->getNumRows($query);
    //     if($user_count > 0) {
    //         $_SESSION['IsAvailable'] = 'false';
    //         $response = 'false';
    //     } else {
    //         $_SESSION['IsAvailable'] = 'true';
    //         $response = 'true';
    //     }
    // }
    // else
    // {
    //     $_SESSION['IsAvailable'] = 'false';
    //     $response = 'not_supplied';
    // }
    
    
    $return_value = create_user($loginName, $password);
    if(!$return_value->value)
    {
        $return_value->return_message = "Account for " . $loginName . " successfully created.<br>\n";
        $return_value->return_message .= "Welcome, hero!";
    }
    else
    {
        $return_value->return_message = "Something went wrong. Contact {$site_admin}, please.";
    }
    // }
}

if($canContinue)
{
    addUser($loginName,$password1,$user_message);
    echo json_encode($user_message);
}
else
{
    $usermsg->return_message += "You did not set everything.";
    echo json_encode($user_message);
}
//if(isset($_POST['user']) && isset($_POST['pass'])){
//    addUser($_POST['username'], $_POST['password'], $user_message);
//}
//else{
//    $usermsg->retmsg = "You did not set everything.";
//    echo json_encode($user_message);
//}


