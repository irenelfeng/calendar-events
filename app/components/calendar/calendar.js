import React from 'react';
import moment from 'moment';
import { range, takeWhile, last } from 'lodash';
//import EventView from 'event';

export default class Calendar extends React.Component {

  constructor() {
    super();
  }


  createDateObjects(date, weekOffset = 0) {
    const startOfMonth = date.startOf('month');

    let diff = startOfMonth.weekday() - weekOffset;
    if (diff < 0) diff += 7;

    const prevMonthDays = range(0, diff).map(n => ({
      day: startOfMonth.clone().subtract(diff - n, 'days'),
      classNames: 'prevMonth'
    }));

    const currentMonthDays = range(1, date.daysInMonth() + 1).map(index => ({
      day: moment([date.year(), date.month(), index])
    }));

    const daysAdded = prevMonthDays.length + currentMonthDays.length - 1;
    const nextMonthDays = takeWhile(range(1, 7), n => (daysAdded + n) % 7 !== 0).map((n) => ({
      day: last(currentMonthDays).day.clone().add(n, 'days'),
      classNames: 'nextMonth'
    }));

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }

  renderDay(day){
    return day.format('D');
  }

  render() {
    return (
      <div className='Calendar'>
        <div className='Calendar-header'>
          <button onClick={this.props.onPrevMonth}>&laquo;</button>
          <div className='Calendar-header-currentDate'>{this.props.date.format('MMMM YYYY')}</div>
          <button onClick={this.props.onNextMonth}>&raquo;</button>
        </div>
        <div className='Calendar-grid' >
          {this.createDateObjects(this.props.date, this.props.weekOffset).map((day, i) =>
            <div
              key={`day-${i}`}
              onClick={this.props.onPickDate.bind(this, null, day.day)}
              className={`Calendar-grid-item ${day.classNames || ''}`}
            >
              <span> {this.renderDay(day.day)} </span>
              {this.props.events.filter(e => 
                (e.date.getMonth() == day.day._d.getMonth() && e.date.getFullYear() == day.day._d.getFullYear() && e.date.getDate() == day.day._d.getDate())
                ).map((Event) => 
                <div className='Event' onClick={this.props.onPickDate.bind(this, Event, day.day)} key={Event.title} >{Event.title}</div>
                )}
            </div>
          )}
        </div>
      </div>
    );
  }
}