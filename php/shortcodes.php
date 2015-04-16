<?php


// Register a new shortcode: [vrcalendar size="xxx"]
add_shortcode( 'vrcalendar', 'vr_calendar_shortcode' );

// The callback function that will replace [books]
function vr_calendar_shortcode( $attr ) {

	//$ical_url = "http://admin.vrbo.com/icalendar/b79627776a1e4d5e976fa214e21d0a3b.ics";
	$options = get_option( 'vr_calendar_options' );
	$ical_url = $options['ical_url'];
	
	$plugin_path = plugins_url() . '/vr-calendar';
	
    switch( $attr['size'] ) {
        case 'small':
        	$cal_style = file_get_contents( plugin_dir_path( __FILE__ ) . '../css/availabilityCalendarSmall.css');
            break;
        case 'medium':
			$cal_style = file_get_contents( plugin_dir_path( __FILE__ ) . '../css/availabilityCalendarMedium.css');
            break;
        default:
        case 'large':
        	$cal_style = file_get_contents( plugin_dir_path( __FILE__ ) . '../css/availabilityCalendarLarge.css');
            break;
    }
	
    return "
    	<style> $cal_style </style>
 
     	<p> <span class=availablenight style='padding:10px'> Available Night </span> <span class=unavailablenight style='padding:10px'> Unavailable Night </span> </p>
  		<div id='calendar' class='vrcalendar'>
   			<!-- availabilityCalendar.show() fills this in -->
  		</div>
 
		<!-- calendar AJAX data parser/loader --> 
 		<script language='JavaScript' type='text/javascript' src='$plugin_path/js/ajaxnet.js'> </script>
 		<script language='JavaScript' type='text/javascript' src='$plugin_path/js/icalparse.js'> </script>  
  
 		<!-- availability calendar -->  
 		<script language='JavaScript' type='text/javascript' src='$plugin_path/js/availabilitycalendar.js'> </script>
 		<script language='JavaScript' type='text/javascript'>
 				
		availabilityCalendar.rootNodeId = 'calendar';
		availabilityCalendar.popupNodeId = 'availabilityPopup';

		var icalUrl = '$plugin_path/php/icalfwd.php';
		var icalLoader = new net.ContentLoader(icalUrl, avCaliCalLoaded, avCaliCalError,'POST','url=' + '$ical_url');

		</script>		
  	";
}