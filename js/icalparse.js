/* iCal parsing object */

var icalParser={
	ical:{
		version:'',
		prodid:'',
		events:[]
	},
	
	parseIcal: function(icsString){
		this.ical.version=this.getValue('VERSION',icsString);
		this.ical.prodid=this.getValue('PRODID',icsString);
		this.ical.events.length = 0;
		var reg=/BEGIN:VEVENT(\r?\n[^B].*)+/g;
		var matches=icsString.match(reg);
		if(matches){
			for(i=0;i<matches.length;i++){
				this.parseVevent(matches[i]);
			}
		}
	},

	parseVevent: function(veventString){
		var event = new Object();
		var eventDate;
		event.summary = this.getValue('SUMMARY',veventString);
		eventDate = this.getValue('DTSTART',veventString);
		event.dtstart = new Date( eventDate.slice(0,4), eventDate.slice(4,6) - 1, eventDate.slice(6,8),0); 
		eventDate = this.getValue('DTEND',veventString);
		event.dtend = new Date( eventDate.slice(0,4), eventDate.slice(4,6) - 1, eventDate.slice(6,8), 0);
					 	
		if( eventDate.slice(9,11) > 0 )
		{
			// round any hours up to next day
			event.dtend.setTime( event.dtend.valueOf() + (1000 * 60 * 60 * 24) );
			//window.alert("iCal DTEND = " + eventDate + " hours= " + eventDate.slice(9,11) + "event =" + event.dtend.toUTCString() );
			
		}
		this.ical.events[this.ical.events.length]=event;
	},
	
	getValue: function(propName,txt){
		var reg=new RegExp('('+propName+').*:([^\n]*)','g');
		var matches=reg.exec(txt);
		if(matches){ 
			return RegExp.$2;
		}else{
			return null;
		}
	}
}

