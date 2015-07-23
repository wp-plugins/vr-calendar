=== Plugin Name ===
Contributors: duanestrong
Donate link: http://strongenging.com/vrwt/wordpress.php
Tags: calendar, vacation rental, ical
Requires at least: 3.0.1
Tested up to: 4.1
Stable tag: 1.2.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

An availability calendar for vacation rentals driven from any calendar that exports iCal (HomeAway, VRBO, Flipkey, AirBnB etc.). 

== Description ==

An availability calendar for vacation rentals driven via the iCal standard by any calendar that exports iCal format (HomeAway, VRBO, Flipkey, AirBnB, Google, Apple iCloud, and more). 
The availability calendar shows the next 15 months of availability. Shortcodes enable you to display your calendar on any page or post in three different sizes. Arrive and depart dates
from your master calendar are displayed as available and unavailable nights. The depart day is not counted as an unavailable night. Compatible with VRBO and HomeAway, reservations marked
TENTATIVE or HOLD will not be shown as unavailable.

== Installation ==

1. Upload the contents of the zip to the '/wp-content/plugins/' directory.
2. Navigate to the 'Add New' in the plugins dashboard
3. Search for 'vr-calendar'
4. Click 'Install Now'
5. Activate the plugin on the Plugin dashboard

== Screenshots ==
1. screenshot-1.png
2. screenshot-2.png
3. screenshot-3.png

== Frequently Asked Questions ==

= How do I use the plugin? =

After following the installation instructions, find the "VR Calendar" menu item on the left-hand Settings menu.  Enter the URL of your master calendar iCal feed. Display your calendar
using the [vrcalendar] shortcode.

Some calendar iCal feeds send the end date as the depart day, others send the end date as the last unavailable night. For those that send the end date as the depart day,
clicking the "Show end day as available" box will strip off the last day so that it shows as an available night.

The iCal URL setting can be overridden on a page or
post by using the shortcode option ical_url like [vrcalendar ical_url="http://activevacationrentals.com/tracker/ical/ical3.php"]. This is useful if you have multiple properties on a
single WordPress site. 

You can specify a size like [vrcalendar size=large] where size can be small, medium, or large.

If you are logged into your WordPress site and have permissions to edit pages, the owners view option is enabled. This highlights each arrive day and if clicked a pop-up details form
will appear with the reservation name, arrive and depart dates. Highlighted arrive dates show if there are back to back reservations in a block of reserved dates.

The formatting and colors can be modified by editing the css pages for the small, medium, or large options. Go to the Plugins menu of the dashboard, find Vacation Rental Calendar in the list,
click edit, and choose one of the css pages. Some knowledge of css syntax is required.

== Changelog ==

= 1.0.0 =
* Initial Release

= 1.1.0 =
* Added ical url override option and owners view

= 1.1.1 =
* Fixed owners view enable

= 1.2.0 =
* Added settings option to show end date as available. This was required to cope with changes made by 
HomeAway/VRBO where their iCal feed changed from arrive and depart days to unavailable nights.

= 1.2.1 =
* Fixed ical feeds from AirBnb since they started to redirect iCal URLs.

