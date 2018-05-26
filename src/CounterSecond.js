import * as React from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

class CounterSecond extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      running: false,
      from: {
        days: 0,
        hours: 0,
        minutes: 1,
        seconds: 2,
      },
      to: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    };
    this.reset = this.reset.bind(this)
  } 
    componentDidMount() {
        if (!this.running) {
          (this.running = true), (this.watch = setInterval(() => this.step(), 1000));
        }
    }
    step() {
        if (!this.running) return;
        this.calculate();
    }
    format(from) {
        return `${pad0(from.days)} DAYS ${pad0(from.hours)} HRS ${pad0(from.minutes)} MINS ${pad0(Math.floor(from.seconds))} SECS TO START`;
    }
    calculate() {
          this.state.from.seconds -= 1;
          if (this.state.from.seconds < 0 && this.state.from.minutes === 0 && this.state.from.hours === 0 && this.state.from.days >= 1) {
              this.state.from.seconds += 60;
              this.state.from.minutes += 59;
              this.state.from.hours += 23;
              this.state.from.days -= 1;         
         }//ok
         if (this.state.from.seconds < 0 && this.state.from.minutes > 0 && this.state.from.hours === 0 && this.state.from.days >= 1) {
              this.state.from.seconds += 60;
              this.state.from.minutes -= 1;
              this.state.from.hours == 0;         
         }//ok
         if (this.state.from.seconds < 0 && this.state.from.minutes > 0 && this.state.from.hours > 0 && this.state.from.days >= 1) {
              this.state.from.seconds += 60;
              this.state.from.minutes -= 1;         
         }//ok
          if (this.state.from.seconds < 0 && this.state.from.minutes === 0 && this.state.from.hours > 0 && this.state.from.days >= 1) {
              this.state.from.seconds += 60;
              this.state.from.minutes += 59;
               this.state.from.hours -= 1;        
         }//ok
          if (this.state.from.seconds < 0 && this.state.from.minutes === 0 && this.state.from.hours > 0 && this.state.from.days === 0) {
              this.state.from.seconds += 60;
              this.state.from.minutes += 59;
              this.state.from.hours -= 1;
         }//ok
         if (this.state.from.seconds < 0 && this.state.from.minutes > 0 && this.state.from.hours > 0 && this.state.from.days === 0) {
              this.state.from.seconds += 60;
              this.state.from.minutes -= 1;
              this.state.from.hours -= 1;
          }//ok

          if (this.state.from.seconds < 0 && this.state.from.minutes > 0 && this.state.from.hours === 0 && this.state.from.days === 0) {
              this.state.from.minutes -= 1;
              this.state.from.seconds += 60;
          }//ok

            this.setState({
              from: {
                seconds: this.state.from.seconds,
                minutes: this.state.from.minutes,
                hours: this.state.from.hours,
                days: this.state.from.days
              }
          });
          if ((this.state.from.seconds === this.state.to.seconds) && (this.state.from.minutes ===this.state.to.minutes) && (this.state.from.hours === this.state.to.hours) && (this.state.from.days === this.state.to.days)) {
            this.stop();
            this.onSuccess();
          }
    }
    onSuccess() {
      console.log("hello user, it's me - your timer");
    }
    reset() {
        this.setState({
            from: {
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 50,
            }
        });
    }
    stop() {
      this.running = false;
      clearInterval(this.watch);
    }

  render() {
      return (
        <div>
          <div className="stopwatch" onClick={() => this.reset()}>{this.format(this.state.from) }</div>
          <button className='reset' onClick={() => this.reset()}>Reset from</button>
        </div>
      );
  }
}

  function pad0(value) {
  let result = value.toString();
      if (result.length < 2) {
          result = '0' + result;
      }
      return result;
}

export default CounterSecond;