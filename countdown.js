/**
 * Simple React Countdown (C) Alexander Skrabl
 * Email: alexander@skrabl.de
 */

import React from 'react';

class SimpleReactCountdown extends React.Component {
    constructor( props ) {
        super( props );

        this.getCountDown();

        this.state = {
            hide: false,
            days: '00',
            hours: '00',
            mins: '00',
            secs: '00'
        }
    }

    getCountDown() {
        var currTime = Date.now();
        var startDate = Date.parse(this.props.startDate);
        var endDate = Date.parse(this.props.endDate);
        var difference;

        if ( startDate < endDate ) {
            difference = endDate - startDate;
        }
        else {
            throw new Error('Start date has to be smaller than end date.');
        }



        console.log(startDate, endDate, difference, currTime);
    }

    render() {
        return (
            <div>
                <span className="days">{ this.state.days }</span>
                <span className="hours">{ this.state.hours }</span>
                <span className="mins">{ this.state.mins }</span>
                <span className="secs">{ this.state.secs }</span>
            </div>
        );
    }
}

export default SimpleReactCountdown;
