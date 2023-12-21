import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProgressBar.css';

const INITIAL_LOCATIONS = [{
  parkinglot_id: 0,
  name: 'No PKLot Error',
  current_capacity: 0,
  maximum_capacity: 100,
  priority: true,
}]

function ProgressBar({ locations = INITIAL_LOCATIONS }) {

  const available = locations.reduce((acc, cur) => acc + cur.current_capacity, 0);
  const capacity = locations.reduce((acc, cur) => acc + cur.maximum_capacity, 0);
  const occupied = capacity - available;
  const percentage = Math.round(occupied / capacity * 100);

  return (
    <div className="ProgressBar-Container-Outer">
      <div className="ProgressBar-Container">
        <ChangingProgressProvider values={[0, percentage]}>
          {() => (
            <CircularProgressbarWithChildren value={percentage} strokeWidth={2} counterClockwise>
              <div className='ProgressTitle'> {`${occupied} (${percentage}%)`} </div>
              <div className='ProgressSubTitle'> {`out of ${capacity} parking spots used`} </div>
            </CircularProgressbarWithChildren>
          )}
        </ChangingProgressProvider>
        {/* <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={2} counterClockwise />; */}
      </div>
    </div>
  );
}

// Not pretty sure what's going on here
class ChangingProgressProvider extends React.Component {
  static defaultProps = {
    interval: 1000
  };

  state = {
    valuesIndex: 0
  };

  componentDidMount() {
    setInterval(() => {
      if (this.state.valuesIndex === this.props.values.length - 1) {
        return;
      }
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) //  % this.props.values.length
      });
    }, this.props.interval);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ProgressBar;