/**
 * Simple React Countdown (C) Alexander Skrabl
 * Email: alexander@skrabl.de
 */

import React from 'react';

class SimpleReactCountdown extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            hide: false,
            days: '00',
            hours: '00',
            mins: '00',
            secs: '00'
        };

        this.currTime = new Date().getTime();
        this.startDate = Date.parse(this.props.startDate);
        this.endDate = Date.parse(this.props.endDate);
    }

    componentWillMount() {
        this.countdownInit();
    }

    componentWillUnmount() {
        clearTimeout(this.countdown);
    }

    addZero(val) {
        if (val.toString().length === 1) {
            val = '0' + val;
        }
        return val;
    }

    countdownInit() {

        if ( this.startDate > this.endDate ) {
            this.setState({
                hide: true
            });
            throw new Error('Start date has to be smaller than end date.');
        }

        if ( this.currTime > this.endDate && this.props.hideWhenFinished === true ) {
            this.setState({
                hide: true
            });
        }
        else {
            this.countdown();
        }

    }

    countdown() {

        this.currTime = new Date().getTime();
        this.timeLeft = this.endDate - this.currTime;

        if ( this.currTime < this.endDate ) {

            var leftOverTime = {
                days: Math.floor( this.timeLeft / (1000*60*60*24) ),
                hours: Math.floor( (this.timeLeft / (1000*60*60)) % 24 ),
                mins: Math.floor( (this.timeLeft / (1000*60)) % 60 ),
                secs: Math.floor( (this.timeLeft / 1000 ) % 60 )
            };

            if ( this.props.showZero === true ) {
                leftOverTime.days = this.addZero( leftOverTime.days );
                leftOverTime.hours = this.addZero( leftOverTime.hours );
                leftOverTime.mins = this.addZero( leftOverTime.mins );
                leftOverTime.secs = this.addZero( leftOverTime.secs );
            }

            this.setState({
                days: leftOverTime.days,
                hours: leftOverTime.hours,
                mins: leftOverTime.mins,
                secs: leftOverTime.secs
            });

            setTimeout(this.countdown.bind(this), 1000);
        }
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
