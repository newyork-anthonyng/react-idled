import { Component } from "react";
import PropTypes from "prop-types";

const eventsChanged = (yeoldevents, yonnewevents) =>
  yeoldevents.sort().toString() !== yonnewevents.sort().toString();

class Idle extends Component {
  static defaultProps = {
    defaultIdle: false,
    render: () => null,
    onChange: () => {},
    timeout: 1000,
    events: ["mousemove", "mousedown", "keydown", "touchstart", "scroll"]
  };

  state = {
    idle: this.props.defaultIdle
  };

  timeout = null;

  componentDidMount() {
    this.attachEvents();
    this.setTimeout();
  }

  componentWillUnmount() {
    this.removeEvents();
    clearTimeout(this.timeout);
  }

  componentDidUpdate(prevProps) {
    if (eventsChanged(prevProps.events, this.props.events)) {
      this.removeEvents(prevProps.events);
      this.attachEvents();
    }
  }

  attachEvents() {
    this.props.events.forEach(event => {
      window.addEventListener(event, this.handleEvent, true);
    });
  }

  removeEvents(events = this.props.events) {
    events.forEach(event => {
      window.removeEventListener(event, this.handleEvent, true);
    });
  }

  handleChange(idle) {
    this.props.onChange({ idle });
    this.setState({ idle });
  }

  handleEvent = () => {
    if (this.state.idle) {
      this.handleChange(false);
    }
    clearTimeout(this.timeout);
    this.setTimeout();
  };

  setTimeout() {
    this.timeout = setTimeout(() => {
      this.handleChange(true);
    }, this.props.timeout);
  }

  render() {
    return this.props.render(this.state);
  }
}

Idle.propTypes = {
  onChange: PropTypes.func,
  timeout: PropTypes.number,
  defaultIdle: PropTypes.bool,
  render: PropTypes.func,
  events: PropTypes.arrayOf(PropTypes.string)
};

export default Idle;
