<?php

/* Copyright (c) 2014 Strong Engineering LLC */

//set correct content-type-header
header('Content-type: text/calendar; charset=utf-8');
//header('Content-Disposition: inline; filename=calendar.ics'); Google does not like this

if( $_SERVER['REQUEST_METHOD'] == 'GET'  )
{
	if( isset( $_GET['url'] ) )
	{
		$url = $_GET['url'];
		readfile( $url );
	}
	
}

if( $_SERVER['REQUEST_METHOD'] == 'POST'  )
{
	if( isset( $_POST['url'] ) )
	{
		$url = $_POST['url'];
		readfile( $url );
	}
	
}

?>