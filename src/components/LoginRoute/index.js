import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {
    userId: '',
    pinInput: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserID = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pinInput: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitFrom = async event => {
    event.preventDefault()
    const {userId, pinInput} = this.state
    const userDetails = {userId, pinInput}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pinInput} = this.state
    const {showSubmitError, errorMsg} = this.state
    console.log(userId)
    return (
      <div className="login-container">
        <div className="login-card-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="website-login-image"
            />
          </div>
          <div className="login-inputs-container">
            <h1 className="welcome-heading">Welcome Back!</h1>
            <form onSubmit={this.submitFrom}>
              <div className="input-container">
                <label htmlFor="userIdInput" className="label-element">
                  User ID
                </label>
                <input
                  type="text"
                  id="userIdInput"
                  placeholder="Enter User ID"
                  className="input-element"
                  value={userId}
                  onChange={this.onChangeUserID}
                />
              </div>
              <div className="input-container">
                <label htmlFor="pinInput" className="label-element">
                  PIN
                </label>
                <input
                  type="password"
                  id="pinInput"
                  placeholder="Enter PIN"
                  className="input-element"
                  value={pinInput}
                  onChange={this.onChangePin}
                />
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
              {showSubmitError && <p className="error-message">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginRoute
