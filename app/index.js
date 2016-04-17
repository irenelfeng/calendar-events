import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';


class Main extends React.Component { 
	constructor() {
		super();
		console.log("sdfs")
		BigCalendar.momentLocalizer(moment);
		this.myEventsList = [ {
    	'title': 'All Day Event',
    	'allDay': true,
    	'start': new Date(2016, 4, 2),
    	'end': new Date(2016, 4, 2)
  		}];
	}

	makeEvent(slotInfo){
		console.log("ljoih");
		alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}`
          )
	}


	render() {
		return (
			<div>
			<BigCalendar selectable
				defaultView='week'
				events={this.myEventsList}
				startAccessor='startDate'
				endAccessor='endDate' 
				onSelectSlot={(slotInfo) => alert( "anything?"
          )}/>

		</div>
		); //need semicolon
	}
} 


ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);