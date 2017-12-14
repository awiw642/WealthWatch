import React from 'react';
import OneExpense from './oneExpense.jsx';
import RecExpense from './recExpense.jsx';
import Paper from 'material-ui/Paper';

const style = {
  paper: {
    height: 250,
    width: 500,
    textAlign: "center",
    marginLeft: 400
  },
  button: {
    marginLeft: 400
  }
}

class Expenses extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <div>
        <OneExpense currentEmail={this.props.currentEmail}/>
        <RecExpense currentEmail={this.props.currentEmail}/>
      </div>
    )
  }
}

export default Expenses;