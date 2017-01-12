import React, { PropTypes } from 'react';

function dashify(str) {
  if (typeof str !== 'string') {
    throw new TypeError('dashify expects a string.');
  }
  str = str.replace(/([a-z])([A-Z])/g, '$1-$2');
  str = str.replace(/[ \t\W]/g, '-');
  str = str.replace(/^\W+/, '');
  return str.toLowerCase();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function listenerName(eventName){
  return `on${capitalize(eventName)}`;
}

export function plug(name, Chart){
  const className = dashify(name);

  let propTypes = {
    chartData: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    chartOptions: PropTypes.object
  };
  Chart.getCustomEvents().forEach(eventName => {
    propTypes[listenerName(eventName)] = PropTypes.func;
  });

  return React.createClass({
    displayName: name,
    propTypes: propTypes,
    componentDidMount(){
      const self = this;
      const chart = new Chart(this.refs.container, this.props.chartOptions);

      Chart.getCustomEvents().forEach(eventName => {
        chart.on(eventName+'.react', function(...args){
          const listener = self.props[listenerName(eventName)];
          if(listener){
            listener.apply(self, args);
          }
        })
      });

      if(this.props.chartData){
        chart.data(this.props.chartData);
      }

      this.chart = chart;
    },
    componentDidUpdate(){
      this.chart
        .options(this.props.Options)
        .data(this.props.chartData);
    },
    componentWillUnmount(){
      this.chart.autoResize(false);
      this.chart.on('.react', null);
    },
    render(){
      return (<div ref="container" className={className}></div>);
    }
  });
};