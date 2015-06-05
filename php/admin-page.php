<?php

// Add a menu for our option page to admin Settings
add_action('admin_menu', 'vr_calendar_add_page');
function vr_calendar_add_page() {
	add_options_page( 
		'VR Calendar',				// page title
		'VR Calendar', 				// menu title
		'manage_options', 			// necessary capability
		'vr_calendar', 				// slug
		'vr_calendar_option_page' 	// draw function (below)
		);
}

// Draw the option page
function vr_calendar_option_page() {
	?>
	<div class="wrap">
		<h2>VR Calendar</h2>
		<form action="options.php" method="post">
			<?php settings_fields('vr_calendar_options'); ?>
			<?php do_settings_sections('vr_calendar'); ?>
			<input name="Submit" type="submit" value="Save Changes" />
		</form>
	</div>
	<?php
}

// Register and define the settings
add_action('admin_init', 'vr_calendar_admin_init');
function vr_calendar_admin_init(){
	// add data
	register_setting(
		'vr_calendar_options',			// group name
		'vr_calendar_options',			// get_option() name
		'vr_calendar_validate_options' 	// validate function (below)
	);
	// add display section
	add_settings_section(
		'vr_calendar_main',			// HTML id 
		'VR Calendar Settings',		// section title text
		'vr_calendar_section_text', // explanation text function (below)
		'vr_calendar'				// page to show on
	);
	// add form items
	add_settings_field(
		'vr_calendar_ical_feed',		// HTML id
		'Enter iCal feed URL here',		// info text
		'vr_calendar_setting_ical_feed', // draw function (below)
		'vr_calendar',					// page to show on
		'vr_calendar_main'				// page section HTML id
	);
	// add form items
	add_settings_field(
		'vr_calendar_end_day_available', // HTML id
		'Show end day as available',	// info text
		'vr_calendar_setting_end_day_available',	// draw function (below)
		'vr_calendar',					// page to show on
		'vr_calendar_main'				// page section HTML id
	);	
}

// Draw the section header
function vr_calendar_section_text() {
	echo '<p>Your availability calendar will display on any page or post where you include the <b>[vrcalendar]</b> shortcode. You can specify a size
	like <b>[vrcalendar size=large]</b> where size can be small, medium, or large.</p><p>Your calendar is driven from a master calendar iCal feed that
	you enter below. This can be from any calendar that supports iCal like HomeAway, VRBO, FlipKey, AirBnB, Google, Apple, Microsoft, Yahoo and others.
	You can override this default URL on any page or post by adding the shortcode option ical_url like <b>[vrcalendar ical_url="http://activevacationrentals.com/tracker/ical/ical3.php"]
	</b></p>
	<p>Some calendar iCal feeds send the end date as the depart day, others send the end date as the last unavailable night. For those that send the end date as the depart day,
	clicking the "Show end day as available" box will strip off the last day so that it shows as an available night.</p>
	';
}

// Display and fill the form field for ical feed
function vr_calendar_setting_ical_feed() {
	// get option 'ical_url' value from the database
	$options = get_option( 'vr_calendar_options' );
	$ical_url = $options['ical_url'];
	// echo the field
	echo "<input id='ical_feed' size=60 name='vr_calendar_options[ical_url]' type='text' value='$ical_url' />";
}

// Display and fill the form field for end day
function vr_calendar_setting_end_day_available() {
	// get option 'end_day_available' value from the database
	$options = get_option( 'vr_calendar_options' );
	$end_day_available = $options['end_day_available'];
	// echo the field
	if( $end_day_available )
	{
		echo "<input id='end_day_available' name='vr_calendar_options[end_day_available]' type='checkbox' CHECKED >";
	}
	else
	{
		echo "<input id='end_day_available' name='vr_calendar_options[end_day_available]' type='checkbox' >";	
	}
}

// Validate user input
function vr_calendar_validate_options( $input ) {

	$valid['ical_url'] = esc_url_raw( $input['ical_url'] );
	$valid['end_day_available'] = isset( $input['end_day_available'] );
	
	return $valid;
}

