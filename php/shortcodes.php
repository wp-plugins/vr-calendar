<?php


// Register a new shortcode: [vrcalendar size="xxx"]
add_shortcode( 'vrcalendar', 'vr_calendar_shortcode' );

// The callback function that will replace [books]
function vr_calendar_shortcode( $attr ) {

	$options = get_option( 'vr_calendar_options' );
	$ical_url = $options['ical_url'];
	$show_end_day = 'false';
	if( isset( $options['end_day_available'] ) )
	{
		if( ! $options['end_day_available'] )
		{
			$show_end_day = 'true';
		}
	}
	
	
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

	// URL override?
    if( isset( $attr['ical_url'] ) ) {
 		$ical_url = $attr['ical_url'];
 	}
 	
 	// admin view?
 	if( current_user_can( 'edit_pages' ) ) {
		$admin_view = 'true';
	}
	else {
		$admin_view = 'false';
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
		availabilityCalendar.ownerView = $admin_view;
		availabilityCalendar.showEndDay = $show_end_day;

		var icalUrl = '$plugin_path/php/icalfwd.php';
		var icalLoader = new net.ContentLoader(icalUrl, avCaliCalLoaded, avCaliCalError,'POST','url=' + '$ical_url');

		</script>
		
		<form name='availabilityPopup'
		      id='availabilityPopup'
		      class=popup
		      style='display:none'
		      enctype='multipart/form-data'
		>
		<table border=0>
		 <tr>
		  <td>Name</td>
		  <td> <input type='text' readonly name='summary' size=30  > </td>
		 </tr>
		 <tr>
		  <td>Arrive</td>
		  <td> <input type='text' readonly name='arrive' size=30  > </td>
		 </tr>
		 <tr>
		  <td>Depart</td>
		  <td> <input type='text' readonly name='depart' size=30  > </td>
		 </tr>
		 <tr>
		  <td> <input class=button type='button' value='Ok' onClick='document.availabilityPopup.style.display=\"none\";'>
		 </tr>
		</table>
		</form>	
	  	";
}