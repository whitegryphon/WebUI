<?php
    /*
     * SEGS - Super Entity Game Server
     * http://www.segs.io/
     * Copyright (c) 2006 - 2019 SEGS Team (see AUTHORS.md)
     * This software is licensed under the terms of the 3-clause BSD License. See LICENSE.md for details.
     */

    session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


    //if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0){
    //    header("Location: https://" . $_SERVER['HTTP_HOST']);
    //}

    require_once '../../../config/config.php';
    require_once '../../../vendor/autoload.php';
	
	use Segs\MiscFunctions;
	use Segs\ReturnType;
	use Segs\DatabaseConnection;
	

    function commit_login($m_username, $m_password, &$m_result){
		$segsFunction = new MiscFunctions();
		global $dbhost, $dbuser, $dbpass, $accdb;
		$databaseConnection =  new DatabaseConnection($dbhost, $dbuser, $dbpass, $accdb);
		if($databaseConnection) {
			if($stmt = $databaseConnection->prepareStatement("SELECT passw, salt FROM accounts WHERE username = ?")){
				$stmt->bind_param('s', $m_username);
				if(!$stmt->execute()){
					$m_result->return_message = "User lookup failed. Please check your username and try again.";
					return $m_result;
				} else{
					$stmt->bind_result($passw, $salt);
					$stmt->fetch();
					$saltedpwd = $segsFunction->hashPassword($m_password, $salt);
					if(!strcasecmp($saltedpwd, $passw)){
						$m_result->return_message = "Signed in successfully!";
						$m_result->value = 0;
						$_SESSION['isAuthenticated'] = true;
						$_SESSION['username'] = $m_username;
					} else{
						$m_result->return_message = "Wrong credentials.";
					}
					$stmt->free_result();
				}
			}
			$databaseConnection->closeConnection();
		} else {
			$m_result->return_message = "Failed to connect to db.";
			return $m_result;
		}
        //$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $accdb);
        return $m_result;
    }

    $content = trim(file_get_contents("php://input"));//
    $decoded = json_decode($content, true);
    $result = new ReturnType();
    commit_login($decoded['username'], $decoded['password'], $result);

    echo json_encode($result);
