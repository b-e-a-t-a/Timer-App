import * as React from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

class Counter extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      running: false,
      from: {
        minutes: 0,
        seconds: 50,
      },
      to: {
        minutes: 0,
        seconds: 1,
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
        return `${pad0(from.minutes)}:${pad0(Math.floor(from.seconds))}`;
    }
    calculate() {
          this.state.from.seconds -= 1;
          if (this.state.from.seconds == 0) {
              this.state.from.minutes -= 1;
          }
          if (this.state.from.seconds < 0) {
              this.state.from.seconds += 60;
          }
            this.setState({
              from: {
                seconds: this.state.from.seconds,
                minutes: this.state.from.minutes
              }
          });
          if ((this.state.from.seconds === this.state.to.seconds) && (this.state.from.minutes ===this.state.to.minutes)) {
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
              minutes: 0,
              seconds: 50,
            }
        });
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

export default Counter;