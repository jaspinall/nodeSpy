import React from 'react';
import ReactDOM from 'react-dom';
const ES6 = require('es6-promise').polyfill();
const Fetch = require('isomorphic-fetch');

class NodeSpy extends React.Component {
  constructor() {
    super();
    this.state = {
      reqCache: [{ Method: 'GET', URL: '/sample', Body: { 'a': 'apple', 'b': 'banana' }, Cookies: { 'one': 'one' }, Params: { 'two': 'two' } },
      { Method: 'GET', URL: '/sample', Body: { 'c': 'cat', 'd': 'dog' }, Cookies: { 'three': 'three' }, Params: { 'four': 'four' } }
      ],
    }

    componentDidMount() => {
      fetch('/getCache', { credentials: 'include'})
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.setState({
            reqCache: JSON.parse(response)
          })
        })
    }
  }


  render() {
    return (
      <div>
        <div className='NodeSpy' />
        <Report reqCache={this.state.reqCache} />
        <History reqCache={this.state.reqCache} />
      </div>
    )
  }

}

const Report = ({ reqCache}) => {
  return (
    <div>
      <div className='Report' />
    </div>
  )
};

Report.propTypes = {
  'reqCache': React.PropTypes.array.isRequired
};

const ReportItem = ({ reqCache }) => {
  return (
    <div>
      <div className='ReportItem' />
    </div>
  );
};

ReportItem.propTypes = {
  'reqCache': React.PropTypes.array.isRequired
};

const History = ({ reqCache }) => {

  let historyArr = [];

  reqCache.forEach(req => {
    historyArr.push(<HistoryItem reqCache={req} />);
  });

  return (
    <div id='history'>
      {historyArr}
    </div>
  );
};

History.propTypes = {
  'reqCache': React.PropTypes.array.isRequired
};

const HistoryItem = ({ reqCache }) => {
  return (
    <div>
      <span className='HistoryItem' />
      <div>Method: {reqCache.Method}</div>
      <div>URL: {reqCache.URL}</div>
      <div>Body: {JSON.stringify(reqCache.Body)}</div>
      <div>Cookies: {JSON.stringify(reqCache.Body)}</div>
      <div>Params: {JSON.stringify(reqCache.Params)}</div>
    </div>
  );
};

HistoryItem.propTypes = {
  'reqCache': React.PropTypes.object.isRequired
};


ReactDOM.render(<NodeSpy />, document.getElementById('content'));
