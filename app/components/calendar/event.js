import React from 'react';
import $ from 'jquery';

export default class EventView extends React.Component {
  constructor() {
    super();
  }

  saveEvent() {
    if (Event != '')
      this.props.addEvent(Event);
  }

  deleteEvent() {
    this.props.deleteEvent(this.props.Event);
  }

   render() {
    var pos = $(this.props.parent).offset();

    var main1, main2 = '';

    // if new event
    if (this.props.Event == '' || this.props.Event == null) {
      main1 = (
        <div className="Event-form">
        	<text placeholder="Write Event Title" />
          <textarea placeholder="Write description" />
        </div>
      );

      main2 = (
        <div className="buttons">
          <div className="cancel" onClick={this.props.cancelEvent}> Cancel </div>
          <div className="done" onClick={this.saveEvent.bind(this)}> Done </div>
        </div>
      );

      return (
        <div className="view" style={{top: pos.top, left: pos.left}}>
          {main1} {main2}
        </div>);

    } else {
    	// editing the event
      main1 = (
        <div className="Event-form">
        	<text initialValue={Event.title} />
        	<textarea initialValue={Event.description} />
        </div>
      );

      main2 = (
        <div className="delete" onClick={this.deleteEvent.bind(this)}>
          x
        </div>
      );

      var Event = (
        <div className="view" style={{top: pos.top, left: pos.left}}>
          {main1}
          <div className="buttons">
            {main2} <div className="cancel" onClick={this.props.cancelEvent}> OK </div>
          </div>
        </div>
      );

      return (
        <div>{Event}</div>
      );
    }
	}
}