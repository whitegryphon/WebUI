<?php
    /*
    * SEGS - Super Entity Game Server
    * http://www.segs.io/
    * Copyright (c) 2006 - 2019 SEGS Team (see AUTHORS.md)
    * This software is licensed under the terms of the 3-clause BSD License. See LICENSE.md for details.
    */
 
	// Site Settings
    $site_title             = "SEGS";
    $site_name              = "SEGS";
    $site_url               = "https://segs.io";
    $site_logo              = "https://github.com/Segs/Segs/raw/develop/docs/segs-medallion-med.png";
    $site_admin             = "webmaster@example.com";

	/*
		Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"
        Tip 2: you can also add an image using data-image tag
        		
		Site color also changes zone switcher card color. Added "dark" and "gold".
	*/
	$site_color             = "gold";
	$site_navbar_title      = "SEGS WebUI";


    // Database Settings
	$dbhost                 = "localhost";
	$dbuser                 = "segsadmin";
	$dbpass                 = "segs123";
	$accdb                  = "segs";
	$chardb                 = "segs_game";

    // User Account Settings;
    $min_username_len       = 6;
    $min_password_len       = 6;
    $complex_password       = true;
    $login_users_on_create  = false;
    
	// WebSocket connection
    $ws_target              = "ws://localhost/";
    $ws_port                = 6001;
    $ws_use_ssl             = false;

    // Date and Time
    $timezone               = "UTC";    
