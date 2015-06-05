/* Copyright (c) 2013 Strong Engineering LLC */

var availabilityCalendar = {

	ownerView: false,
	showEndDay: false,
	rootNodeId: "calendar",
	popupNodeId: "availabilityPopup",
	events:[],
	
	
	// fill the month table with column headings
	dayTitle: function (tableRowNode,day_name)
 	{
 		var tableDataNode = document.createElement("td");
		tableDataNode.className = "dayheader";
		tableRowNode.appendChild(tableDataNode);
		tableDataNode.appendChild(document.createTextNode(day_name));	
	},
	
	// fills the tableNode with dates, calls processNode on each date node
	fillDates: function ( tableNode, firstOfMonth, processNode )
	{
	
 		var start_day = firstOfMonth.getDay() + 1;   // starts with 0	
 		var month = firstOfMonth.getMonth();		
		var year = firstOfMonth.getFullYear();	
		
		var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		// handle leap years
		daysInMonth[1] = ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 !=0))) ? 29 : 28;

		
		// column headings
		tableRowNode = document.createElement("tr");
		tableRowNode.className = "monthrow";
		tableNode.appendChild(tableRowNode);
		availabilityCalendar.dayTitle(tableRowNode,"S");
		availabilityCalendar.dayTitle(tableRowNode,"M");
		availabilityCalendar.dayTitle(tableRowNode,"T");
		availabilityCalendar.dayTitle(tableRowNode,"W");
		availabilityCalendar.dayTitle(tableRowNode,"T");
		availabilityCalendar.dayTitle(tableRowNode,"F");
		availabilityCalendar.dayTitle(tableRowNode,"S");

		var rowcount = 0;
		var day = 1;

		if( start_day < 8 )
		{
			// add special first row		
			tableRowNode = document.createElement("tr");
			tableRowNode.className = "monthrow";
			tableNode.appendChild(tableRowNode);
			rowcount++;

		
			// pad cells before first day of month
			for( var i = 1; i < start_day; i++ )
			{
				tableDataNode = document.createElement("td");
				tableDataNode.className = "padday";
				tableRowNode.appendChild(tableDataNode);

			}

			// fill the first week of days
			for( var i = start_day; i < 8; i++ )
			{
				tableDataNode = document.createElement("td"); 
				tableRowNode.appendChild(tableDataNode);
				processNode( tableDataNode, day, month, year );
				tableDataNode.appendChild(document.createTextNode(day.toString()));	
				day++;
			}

		}
		
		// fill the remaining weeks
		while (day <= daysInMonth[month])
		{
			tableRowNode = document.createElement("tr");
			tableRowNode.className = "monthrow";
			tableNode.appendChild(tableRowNode);
			rowcount++;
						
			for( var i=1; i<=7 && day <= daysInMonth[month]; i++)
			{
				tableDataNode = document.createElement("td"); 
				tableRowNode.appendChild(tableDataNode);
				processNode( tableDataNode, day, month, year );
				tableDataNode.appendChild(document.createTextNode(day.toString()));	
				day++;
			}
			
		}
		
		// make all month tables same height
		while( rowcount < 6 )
		{
			tableRowNode = document.createElement("tr");
			tableRowNode.className = "monthrow";
			tableNode.appendChild(tableRowNode);
			tableDataNode = document.createElement("td"); 
			tableDataNode.className = "spaceday";
			tableRowNode.appendChild(tableDataNode);
			tableDataNode.appendChild(document.createTextNode(String.fromCharCode(160)));	
			rowcount++;
		}
		

	},
	
	// fills the rootNode with a table containing a month
	fillMonth: function (rootNode, firstOfMonth)
	{ 
		var month = firstOfMonth.getMonth();
		var year = firstOfMonth.getFullYear();	
		var MonthName = new Array("January","February","March","April","May","June","July","August","September","October","November", "December");
		
		// begin the new month table
 		var tableNode = document.createElement("table");
		tableNode.className = "month";
		rootNode.appendChild(tableNode);
		
		// create header rows
		
		// month year heading
		var tableRowNode = document.createElement("tr");
		tableRowNode.className = "monthrow";
		tableNode.appendChild(tableRowNode);
		var tableDataNode = document.createElement("td");
		tableDataNode.className = "monthheader";
		tableRowNode.appendChild(tableDataNode);
		tableDataNode.appendChild(document.createTextNode(MonthName[month] + "   " + year));	
		tableDataNode.setAttribute("colspan", "7" );

		this.fillDates( tableNode, firstOfMonth, this.setAvailability );


	},

	// display a 15 month calendar starting with the current month
	show: function ()
	{
		var firstOfMonth = new Date();
		firstOfMonth.setDate(1);
		var month = firstOfMonth.getMonth();
		var year = firstOfMonth.getFullYear();
		
 		
		var rootNode = document.getElementById(this.rootNodeId);
 		var tableNode = document.createElement("table");
 		tableNode.className = "vrcalendar";
		rootNode.appendChild(tableNode);
		
		// 5 rows of 3 columns for 15 month calendar
 		for( var r=0; r < 5; r++ )
 		{
			
			var tableRowNode = document.createElement("tr"); 
			tableRowNode.className = "vrcalendarrow";
			tableNode.appendChild(tableRowNode);
 		
 			for( var i=0; i < 3; i++ )
 			{
				var tableDataNode = document.createElement("td"); 
				tableDataNode.className = "vrcalendarcol";
				tableRowNode.appendChild(tableDataNode);
				this.fillMonth(tableDataNode, firstOfMonth);

				month++;

				if( month > 11 )
				{
					month = 0;
					year++;
					firstOfMonth.setFullYear(year);
				}
				
				firstOfMonth.setMonth(month);
			}
		}
		
	},
	
	// callback for fillDates 
	setAvailability: function ( node, day, month, year )
	{
		var calDate = new Date(year, month, day, 13); // make sure it is larger than the start day (parser sets to noon)
		for( var i=0; i < availabilityCalendar.events.length; i++ )
		{
			if( availabilityCalendar.events[i].dtstart <= calDate && calDate < availabilityCalendar.events[i].dtend )
			{
				node.className = "unavailablenight";

				// print extra bling in owners mode
				if( availabilityCalendar.ownerView  )
				{
					// on the first night
					if( availabilityCalendar.events[i].dtstart.getMonth() == month && availabilityCalendar.events[i].dtstart.getDate() == day && availabilityCalendar.events[i].dtstart.getFullYear() == year)
					{
						node.className = "unavailablefirstnight";
						// store details in the node
						node.acSummary = availabilityCalendar.events[i].summary;
						node.acArriveDate = availabilityCalendar.events[i].dtstart;
						node.acDepartDate = availabilityCalendar.events[i].dtend;
						node.onclick = function() {
							// update popup with node details "this" in here is the node's this
							var popupNode = document.getElementById(availabilityCalendar.popupNodeId);
							popupNode.summary.value = this.acSummary;
							popupNode.arrive.value = (this.acArriveDate.getMonth()+1) + "/" + this.acArriveDate.getDate() + "/" + this.acArriveDate.getFullYear();
							popupNode.depart.value = (this.acDepartDate.getMonth()+1) + "/" + this.acDepartDate.getDate() + "/" + this.acDepartDate.getFullYear();
							popupNode.style.display='';
						}; 
					}
									
				}
				return false;
			}
			
			
		}
		node.className = "availablenight";
		return true;
	},
	
}


// net.ContentLoader error callback
function avCaliCalError()
{
	window.alert("iCal load error");
}
 
// net.ContentLoader loaded callback, fills in availabilityCalendar.events from iCal data
function avCaliCalLoaded()
{
		//window.alert("iCal data= " + this.req.responseText);
 		
		var firstOfMonth = new Date();
		firstOfMonth.setDate(1);
		firstOfMonth.setHours(1);
		
		icalParser.parseIcal(this.req.responseText);

		
		for( var i=0; i < icalParser.ical.events.length; i++ )
		{

			// ignore hold events
			if( icalParser.ical.events[i].summary.search("HOLD") == 0 )
			{
				continue;
			}
			
			// VRBO BINs use this
			if( icalParser.ical.events[i].summary.search("TENTATIVE") == 0 )
			{
				continue;
			}
		
			
			// ignore events older than the first of this month to speed up drawing
			if( icalParser.ical.events[i].dtend > firstOfMonth )
			{
				if( !availabilityCalendar.showEndDay )
				{
					// subtract off the last day (we don't count end night as unavailable)
					icalParser.ical.events[i].dtend.setTime( icalParser.ical.events[i].dtend.valueOf() - (1000 * 60 * 60 * 24) ); 
				}
				
			 	availabilityCalendar.events[availabilityCalendar.events.length] = icalParser.ical.events[i];
			}
		}
		
		// add an event to make from the 1st to today unavailable
		var event = new Object();
		event.summary = "Days are in the past";
		event.dtstart = firstOfMonth;
		event.dtend = new Date();
		availabilityCalendar.events[availabilityCalendar.events.length] = event
		
		availabilityCalendar.show();
		
}
 	
var datePicker = {

	// default node id to fill
	rootNodeId: "datepicker",
	
	// default onClose 
	onClose: function() { window.alert( this.selectedDate );},
	
	// resulting date
	selectedDate: new Date(),

	monthName: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov", "Dec"],
	
	hide: function ()
	{
		var rootNode = document.getElementById( this.rootNodeId );
		
		// clear out any existing calendar data
		var tableNode = document.getElementById("pickertable");
		if( tableNode )
		{
			rootNode.removeChild(tableNode);
		}

	},
	
	// fills the rootNode with a table containing a date picker
	show: function ()
	{ 
	
		this.hide();
		
		var month;
		var rootNode = document.getElementById( this.rootNodeId );
				
		// begin the new month table
 		var tableNode = document.createElement("table");
 		tableNode.id = "pickertable";
		tableNode.className = "pickertable";
		rootNode.appendChild(tableNode);
		
		// create header rows
		var tableRowNode;
		var tableDataNode;
		var tableDivNode;
		
		// month headings
		month = 0;
		for( var i=0; i<2; i++)
		{
			tableRowNode = document.createElement("tr");
			tableNode.appendChild(tableRowNode);
			tableDataNode = document.createElement("td");
			tableRowNode.appendChild(tableDataNode);
			tableDataNode.setAttribute("colspan", "7" );
			tableDataNode.className = "pickerheader";

			for( var j=0; j<6; j++)
			{
				tableDivNode = document.createElement("span"); 
				tableDataNode.appendChild(tableDivNode);
				tableDivNode.appendChild(document.createTextNode(this.monthName[month]));
				if( month == this.selectedDate.getMonth() )
				{				
					tableDivNode.className = "pickerheaderselected";
				}
				else
				{
					tableDivNode.className = "pickerheader";				
				}
				tableDivNode.pickerMonth = month;
				tableDivNode.onclick = function() { datePicker.pickMonth( this.pickerMonth ); };
				month++;
			}

		}
		
		// year heading
		tableRowNode = document.createElement("tr");
		tableNode.appendChild(tableRowNode);
		tableDataNode = document.createElement("td");
		tableRowNode.appendChild(tableDataNode);
		tableDataNode.setAttribute("colspan", "7" );
		tableDataNode.className = "pickerheader";
							
		tableDivNode = document.createElement("span"); 
		tableDataNode.appendChild(tableDivNode);
		tableDivNode.appendChild(document.createTextNode("<< "));
		tableDivNode.className = "pickerheaderyear";
		tableDivNode.onclick = function() { datePicker.pickYear( -1 ); };	
			
		tableDivNode = document.createElement("span"); 
		tableDataNode.appendChild(tableDivNode);
		tableDivNode.appendChild(document.createTextNode(this.selectedDate.getFullYear()));
		tableDivNode.className = "pickerheader";
						
		tableDivNode = document.createElement("span"); 
		tableDataNode.appendChild(tableDivNode);
		tableDivNode.appendChild(document.createTextNode(" >>"));
		tableDivNode.className = "pickerheaderyear";
		tableDivNode.onclick = function() { datePicker.pickYear( +1 ); };
		
		// days
		var firstOfMonth = new Date( this.selectedDate );
		firstOfMonth.setDate(1);
		availabilityCalendar.fillDates( tableNode, firstOfMonth, this.setDatePicker );
		
		// close bar
		tableRowNode = document.createElement("tr");
		tableNode.appendChild(tableRowNode);		
		tableDataNode = document.createElement("td");
		tableRowNode.appendChild(tableDataNode); 
		tableDataNode.setAttribute("colspan", "7" );		
		tableDataNode.className = "pickerheader";
		tableDataNode.appendChild(document.createTextNode("close"));
		tableDataNode.onclick = function() { datePicker.close(); };
		
	},
	
	// callback for fillDates
	setDatePicker: function ( node, day, month, year )
	{

		node.pickerDay = day;
		node.onclick = function() { datePicker.pickDate( this.pickerDay ); };
		if( day == datePicker.selectedDate.getDate()  )
		{
			node.className = "pickerdateselected";
		}
		else
		{
			node.className = "pickerdate";
		}
	},
	
	pickDate: function ( day )
	{
		//window.alert("date " + day );
		this.selectedDate.setDate( day );
		this.close();
	},
	
	pickMonth: function ( month )
	{
		//window.alert("month " + month );
		this.selectedDate.setMonth( month );
		this.show();
	},
	
	pickYear: function( delta )
	{
		var year = this.selectedDate.getFullYear();
		//window.alert("year " + year );
		this.selectedDate.setFullYear( year + delta );
		this.show();
	},
	
	close: function()
	{
		this.hide();
		this.onClose();
	}
	
}

	

