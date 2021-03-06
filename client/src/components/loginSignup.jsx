import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
const Promise = require('bluebird');

const style = {
  paper: {
    height: '50%',
    margin: '0 auto',
    textAlign: 'center',
    width: '25%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'none',
    boxShadow: 'none',
  },
  headline: {
    fontSize: 16,
    fontWeight: 400,
    backgroundColor: '#102847',
  },
  tab: {
    backgroundColor: '#102847',
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#102847',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: '#fff',
  },
  input: {
    color: '#fff',
  },
  link: {
    marginLeft: '0',
    paddingLeft: '0',
  },
  button: {
    marginTop: '2em',
    backgroundColor: 'none',
  },
  smallText: {
    color: '#a8a4a7',
    fontSize: '0.7em',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#F06292',
    primary2Color: '#AB47BC',
  },
});

export default class LoginSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: '',
      loginPassword: '',
      loginWarning: '',
      signupEmail: '',
      signupName: '',
      signupPassword: '',
      signupImageUrl: '',
      signupWarning: '',
      style: {
        fullWidth: true,
        secondary: true,
      },
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.validateLoginForm = this.validateLoginForm.bind(this);
    this.validateSignupForm = this.validateSignupForm.bind(this);
  }

  componentDidMount() {
    return this.extractTokenEmail()
      .then((tokenEmail) => {
        const { token, email } = tokenEmail;
        this.props.setLoginState(token, email);
      })
      .then(() => {
        this.props.updateUser();
      });
  }

  extractTokenEmail(callback) {
    return new Promise((resolve, reject) => {
      if (this.props.location.search) {
        const params = this.props.location.search.split('?');
        const token = params[1];
        const email = params[2];
        resolve({ token, email });
      } 
    });
  }

  onInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onSignupSubmit(e) {
    e.preventDefault();
    if (this.validateSignupForm()) {
      axios
        .post('auth/signup', {
          email: this.state.signupEmail,
          name: this.state.signupName,
          password: this.state.signupPassword,
        })
        .then((response) => {
          this.props.getCurrentEmail(this.state.signupEmail);
          this.props.updateUser();
          if (response.status === 201) {
            this.props.setLoginState(response.data.token, response.data.email);
          }
        })
        .catch((error) => {
          this.setState({ signupWarning: error.response.data });
        });
    }
  }

  onLoginSubmit(e) {
    e.preventDefault();
    if (this.validateLoginForm()) {
      axios
        .post('auth/login', {
          email: this.state.loginEmail,
          password: this.state.loginPassword,
        })
        .then((response) => {
          this.props.getCurrentEmail(this.state.loginEmail);
          this.props.updateUser();

          if (response.status === 200) {
            this.props.setLoginState(response.data.token, response.data.email);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.setState({ loginWarning: 'Incorrect username or password' });
          }
        });
    }
  }

  googleLogin(e) {
    e.preventDefault();
    axios
      .get('auth/google/')
      .then((response) => {
        if (response.status === 200) {
          this.props.setLoginState(response.data.token, response.data.email);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState({ loginWarning: 'Incorrect username or password' });
        }
      });
  }

  validateLoginForm() {
    if (!this.state.loginEmail) {
      this.setState({ loginWarning: 'Please enter an email address' });
      return false;
    } else if (!this.state.loginPassword) {
      this.setState({ loginWarning: 'Please enter a password' });
      return false;
    }
    return true;
  }

  validateSignupForm() {
    if (!this.state.signupEmail) {
      this.setState({ signupWarning: 'Please enter an email address' });
      return false;
    } else if (!this.state.signupName) {
      this.setState({ signupWarning: 'Please enter a name' });
      return false;
    } else if (!this.state.signupPassword) {
      this.setState({ signupWarning: 'Please enter a password' });
      return false;
    }
    return true;
  }

  loginForm() {
    return (
      <div className="loginForm-edit">
        <form style={style.form}>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="text"
              value={this.state.loginEmail}
              onChange={this.onInputChange}
              id="loginEmail"
              floatingLabelText="Email Address"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
              errorText="We'll never share your email to anyone else."
              errorStyle={style.smallText}
              underlineStyle={style.smallText}
            />
          </div>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="password"
              value={this.state.loginPassword}
              onChange={this.onInputChange}
              id="loginPassword"
              floatingLabelText="Password"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
              errorText="  "
              errorStyle={style.smallText}
              underlineStyle={style.smallText}
            />
          </div>
        </form>
        <RaisedButton
          label="Login"
          type="submit"
          onClick={this.onLoginSubmit}
          fullWidth={this.state.style.fullWidth}
          secondary={this.state.style.secondary}
        />
        <a
          href="auth/google"
          title="Google+"
          onClick={this.googleAuth}
          className="btn btn-googleplus btn-lg"
          style={style.link}
        >
          <i className="fa fa-google-plus fa-fw" /> Sign in with Google
        </a>
        <br />
        <Link style={style.link} to={{ pathname: '/forgot' }}>
          Forgot password?
        </Link>
      </div>
    );
  }

  signupForm() {
    return (
      <div className="signupForm-edit">
        <form style={style.form}>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="text"
              value={this.state.signupName}
              onChange={this.onInputChange}
              id="signupName"
              floatingLabelText="Name"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
              errorText=""
              errorStyle={style.smallText}
              underlineStyle={style.smallText}
            />
          </div>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="text"
              value={this.state.signupEmail}
              onChange={this.onInputChange}
              id="signupEmail"
              floatingLabelText="Email"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
              errorText="This email account will be used for logging in."
              errorStyle={style.smallText}
              underlineStyle={style.smallText}
            />
          </div>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="password"
              value={this.state.signupPassword}
              onChange={this.onInputChange}
              id="signupPassword"
              floatingLabelText="Password"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
              errorText=" "
              errorStyle={style.smallText}
              underlineStyle={style.smallText}
            />
          </div>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="text"
              value={this.state.signupImageUrl}
              onChange={this.onInputChange}
              id="signupImageUrl"
              floatingLabelText="Profile Image URL"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
              errorText="A profile image will further personalize your account!"
              errorStyle={style.smallText}
              underlineStyle={style.smallText}
            />
          </div>
          <RaisedButton
            style={style.button}
            label="Sign Up"
            type="submit"
            onClick={this.onSignupSubmit}
            fullWidth={this.state.style.fullWidth}
            secondary={this.state.style.secondary}
          />
        </form>
      </div>
    );
  }

  render() {
    console.log(this.props.location);
    return (
      <div className="login-container">
        <Paper style={style.paper}>
          <Tabs tabItemContainerStyle={style.headline}>
            <Tab style={style.tab} label="Login">
              {this.loginForm()}
            </Tab>
            <Tab style={style.tab} label="Register">
              {this.signupForm()}
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}
