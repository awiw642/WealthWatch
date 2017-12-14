import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  paper: {
    height: '50%',
    length: '50%',
    margin: '0 auto',
    textAlign: 'center',
    width: '70%',
    backgroundColor: '#DCEDC8',
  },
};

class InputBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: '',
      budgetInput: true,
      currency: null,
    };
    this.budgetToggle = this.budgetToggle.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
  }

  onInputChange(e) {
    // e.preventDefault();
    this.setState({
      budget: e.target.value,
    });
  }

  onCurrencyChange(e) {
    // e.preventDefault();
    this.setState({
      currency: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.props.currentEmail,
      budget: this.state.budget,
      currency: this.state.currency,
    };
    axios.post('updateBalance', data).then((response) => {
      this.setState({
        budget: '',
        currency: null,
      });
      console.log('updating budget successful');
    });
  }

  bootstrapBar() {
    return (
      <div>
        <div className="form-group">
          <h1 className="header">Balance</h1>
          <label htmlFor="inputBudget">Enter balance</label>
          <input
            type="number"
            onChange={this.onInputChange}
            className="form-control"
            id="inputBudget"
            placeholder="Enter Balance"
          />
          <small id="budgetHelp" className="form-text text-muted">
            We won't share your income to anyone else.
          </small>
          <br />
          <br />
          <label htmlFor="inputCurrency">Select currency</label>
          <select onChange={this.onCurrencyChange} className="form-control" id="inputCurrency">
            <option value="">Select Currency</option>
            <option value="USD">U.S. Dollar</option>
            <option value="AUD">Australian Dollar</option>
            <option value="BRL">Brazilian Real</option>
            <option value="CAD">Canadian Dollar</option>
            <option value="CZK">Czech Koruna</option>
            <option value="DKK">Danish Krone</option>
            <option value="EUR">Euro</option>
            <option value="HKD">Hong Kong Dollar</option>
            <option value="HUF">Hungarian Forint </option>
            <option value="ILS">Israeli New Sheqel</option>
            <option value="JPY">Japanese Yen</option>
            <option value="MYR">Malaysian Ringgit</option>
            <option value="MXN">Mexican Peso</option>
            <option value="NOK">Norwegian Krone</option>
            <option value="NZD">New Zealand Dollar</option>
            <option value="PHP">Philippine Peso</option>
            <option value="PLN">Polish Zloty</option>
            <option value="GBP">Pound Sterling</option>
            <option value="SGD">Singapore Dollar</option>
            <option value="SEK">Swedish Krona</option>
            <option value="CHF">Swiss Franc</option>
            <option value="TWD">Taiwan New Dollar</option>
            <option value="THB">Thai Baht</option>
            <option value="TRY">Turkish Lira</option>
          </select>
          <a
            href="#widget"
            onClick={this.onSubmit}
            style={{ margin: '1vh' }}
            type="submit"
            className="btn btn-responsive btn-primary"
          >
            Submit
          </a>
        </div>
      </div>
    );
  }

  searchBar() {
    if (this.state.budgetInput) {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            Input Balance:{' '}
            <input
              type="text"
              placeholder="Enter budget amount"
              value={this.state.budget}
              onChange={this.onInputChange}
              name="balance"
            />
            <br />
            <select onChange={this.onCurrencyChange} id="currency" name="currency_code">
              <option value="">Select Currency</option>
              <option value="USD">U.S. Dollar</option>
              <option value="AUD">Australian Dollar</option>
              <option value="BRL">Brazilian Real</option>
              <option value="CAD">Canadian Dollar</option>
              <option value="CZK">Czech Koruna</option>
              <option value="DKK">Danish Krone</option>
              <option value="EUR">Euro</option>
              <option value="HKD">Hong Kong Dollar</option>
              <option value="HUF">Hungarian Forint </option>
              <option value="ILS">Israeli New Sheqel</option>
              <option value="JPY">Japanese Yen</option>
              <option value="MYR">Malaysian Ringgit</option>
              <option value="MXN">Mexican Peso</option>
              <option value="NOK">Norwegian Krone</option>
              <option value="NZD">New Zealand Dollar</option>
              <option value="PHP">Philippine Peso</option>
              <option value="PLN">Polish Zloty</option>
              <option value="GBP">Pound Sterling</option>
              <option value="SGD">Singapore Dollar</option>
              <option value="SEK">Swedish Krona</option>
              <option value="CHF">Swiss Franc</option>
              <option value="TWD">Taiwan New Dollar</option>
              <option value="THB">Thai Baht</option>
              <option value="TRY">Turkish Lira</option>
            </select>
            <input value="Submit" type="submit" />
          </form>
        </div>
      );
    }
  }

  budgetToggle() {
    this.setState({ budgetInput: !this.state.budgetInput });
  }

  render() {
    return (
      <div>
        <Paper style={{ paddingTop: '7px', width: '77%', marginLeft: '11.5%', marginRight: '11.5%' }}>
          {this.bootstrapBar()}
        </Paper>
      </div>
    );
  }
}

{
  /*<button type="button" onClick={this.budgetToggle} className="btn">Balance</button>*/
}

export default InputBalance;
