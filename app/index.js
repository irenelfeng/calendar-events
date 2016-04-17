import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import $ from 'jquery'
import Calendar from './components/calendar';
import Modal from 'react-modal';

class Main extends React.Component { 
	constructor() {
		super();
		this.smallerCustomStyles = {
			content : {
			position                   : 'absolute',
			top                        : '20%',
			left                       : '35%',
			right                      : '40%',
			bottom                     : '40%',
			borderRadius               : '10px',
			outline                    : 'none',
				}
		};
		this.myEventsList = [ {
    	'title': 'All Day Event',
    	'description': 'Longer Description',
    	'date': new Date(2016, 3, 2),
  		}];
  		this.state = {
    		date: moment(),
    		adding: false,
    		removing: false,
    		Event: null,
    		dateToAdd: null
  		}
	}

	makeEvent(Event, date){
    	this.setState({Event:Event, dateToAdd: date, adding:true});
	}

	closeModal(){
    	this.setState({adding:false});
    	this.setState({removing:false});
  	}

  	saveEvent(){
  		var saving = { title: $("#modal-title").val(), 
  					description: $("#modal-description").val(),
  					date: this.state.dateToAdd._d };
  		if(this.state.Event == null){
  			// if new event
  			this.myEventsList.push(saving);
  		}else{
  			// if editing
  			var edited = this.myEventsList.filter(e => e.title == this.state.Event.title)[0];
  			for (var key in edited) {
          		edited[key] = saving[key];
        	}
  		}
  		this.closeModal();
  	}

  	deleteEvent(){
  		var e = this.myEventsList.filter(e => e.title == this.state.Event.title)[0];
  		if(e){
  			this.myEventsList.splice(this.myEventsList.indexOf(e), 1);
  		}
  		this.closeModal();
  	}


	render() {
		if(this.state.adding)
      		var adding = (<Modal isOpen={this.state.adding} onRequestClose={this.closeModal.bind(this)} style={this.smallerCustomStyles}>
      			<div className="event-view">
      				<h4>Event for {this.state.dateToAdd.format('MM-DD')}</h4>
      					<div className="form-group">
      						<div className="form-aligned-col1">Title:</div> <input className="form-aligned-col2" id="modal-title" defaultValue={this.state.Event ? this.state.Event.title : ""}/> 
      					</div>
      					<div className="form-group">
      						<div className="form-aligned-col1">Description:</div> <textarea className="form-aligned-col2" id="modal-description" defaultValue={this.state.Event ? this.state.Event.description: ""}/>
      					</div>
  				<div className="event-buttons">
          			<div className="event-cancel" onClick={this.closeModal.bind(this)}> Cancel </div>
          			<div className="event-done" onClick={this.saveEvent.bind(this)}> Done </div>
          			{this.state.Event ? <div className="event-done" onClick={this.deleteEvent.bind(this)}> Delete </div> : null}
        		</div>
      			</div>
       		</Modal>);
		return (
			<div>
			<Calendar
		        onNextMonth={() => this.setState({ date: this.state.date.clone().add(1, 'months') }) }
		        onPrevMonth={() => this.setState({ date: this.state.date.clone().subtract(1, 'months') }) }
		        date={this.state.date}
		        events={this.myEventsList}
		        onPickDate={this.makeEvent.bind(this)} />
                {adding}

		</div>
		); 
	}
} 


ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);