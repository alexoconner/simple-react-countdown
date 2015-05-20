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
            timeLeft: 0
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

            this.setState({
                timeLeft: this.timeLeft
            });

            setTimeout(this.countdown.bind(this), 1000);
        }
    }

    render() {

        var timeLeft = this.state.timeLeft;

        var leftOverTime = {
            days: 0,
            hours: 0,
            mins: 0,
            secs: 0
        };

        if (timeLeft !== 0) {
            leftOverTime = {
                days: Math.floor( timeLeft / (1000*60*60*24) ),
                hours: Math.floor( (timeLeft / (1000*60*60)) % 24 ),
                mins: Math.floor( (timeLeft / (1000*60)) % 60 ),
                secs: Math.floor( (timeLeft / 1000 ) % 60 )
            };

            if ( this.props.showZero === true ) {
                leftOverTime.days = addZero( leftOverTime.days );
                leftOverTime.hours = addZero( leftOverTime.hours );
                leftOverTime.mins = addZero( leftOverTime.mins );
                leftOverTime.secs = addZero( leftOverTime.secs );
            }
        }

        return (
            <div>
                <span className="days">{ leftOverTime.days }</span>
                <span className="hours">{ leftOverTime.hours }</span>
                <span className="mins">{ leftOverTime.mins }</span>
                <span className="secs">{ leftOverTime.secs }</span>
            </div>
        );
    }
}

export default SimpleReactCountdown;
