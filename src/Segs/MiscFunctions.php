<?php
/*
 * SEGS - Super Entity Game Server
 * http://www.segs.io/
 * Copyright (c) 2006 - 2018 SEGS Team (see Authors.md)
 * This software is licensed under the terms of the 3-clause BSD License. See LICENSE.md for details.
 */
    namespace Segs;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
 
    use Segs\DatabaseConnection;

    class RETURN_TYPE {
        public $return_message = array();
        public $value = "0";
    }

    class MiscFunctions {

        // // public function __construct()
        // // {
        // //     //die('Functions');
        // // }

        function generate_salt($length = 16) {
            $possible_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678';
            $rand_string = '';
            for($i = 0; $i < $length; ++$i) {
                $rand_string .= $possible_chars[random_int(0, strlen($possible_chars) - 1)];
            }
            return utf8_encode($rand_string);
        }

        function hash_pass($plaintext_pass, $salt) {
            $test = "Whut?";
            try {
                //$test = hash('sha256', $plaintext_pass . $salt, true);
                $test = hash('sha256', $plaintext_pass . $salt);
            } catch (Exception $e) {
                $test = "Whut??";
            }
            return $test;
        }

        public function CreateUser($username, $password)
        {   
            include '../../../config/config.php';
            $escapedUsername = escapeshellcmd($username);
            $escapedPassword = escapeshellcmd($password);
            $username = substr($escapedUsername, 0, strlen($escapedUsername));
            $password = substr($escapedPassword, 0, strlen($escapedPassword));
            $sample_salt = $this->generate_salt();
            $password = "Password";
            $return_value = new RETURN_TYPE();
            $hashed_pass_bytearr = $this->hash_pass($password, $sample_salt);
            $db_conn = new DatabaseConnection($dbhost, $dbuser, $dbpass, $accdb);

            //$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $accdb);
            //if ($mysqli->connect_errno)
            //{ 
            //    $return_value->message = "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
            //    $return_value->value = 1;
            //    $mysqli->close();
            //    return $return_value;
            //}
            if($stmt = $db_conn->PrepareStatement("INSERT INTO accounts(username, passw, salt) VALUES(?, ?, ?)")) {
                $stmt->bind_param('sss', $username, $hashed_pass_bytearr, $sample_salt);
                if(!$stmt->execute()) {
                    $return_value->message = "User creation failed! " . $mysqli->errno;
                    $return_value->value = 1;
                } else {
                    $return_value->return_message[] = "User '$username' was succesfully created!";
                    $return_value->value = 0;
                }
            // //     $mysqli->close();
                return $return_value;
            }
        }

        public function FetchChat()
        {
            include '../../../config/config.php';
            echo $dbhost;
            $mysqli = new mysqli($dbhost, $dbuser, $dbpass, $accdb);
            if ($mysqli->connect_errno)
            {
                echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
            }
            $mysqli->close();
        }

    }
?>
