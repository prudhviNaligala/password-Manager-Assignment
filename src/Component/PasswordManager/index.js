import {Component} from 'react'

import {v4 as unique} from 'uuid'

import PasswordItems from '../PasswordItems/index'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordManagerList: [],
    website: '',
    username: '',
    password: '',
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPasswordList = {
      id: unique(),
      website,
      username,
      password,
      isChecked: false,
    }
    this.setState(prevState => ({
      passwordManagerList: [...prevState.passwordManagerList, newPasswordList],
      website: '',
      username: '',
      password: '',
      searchInput: '',
    }))
    console.log(website, username, password)
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  onDelete = id => {
    const {passwordManagerList} = this.state
    this.setState({
      passwordManagerList: passwordManagerList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    })
  }

  onRenderForm = () => (
    <form className="from-container" onSubmit={this.onSubmitForm}>
      <div className="input-container">
        <label htmlFor="website">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
          />
        </label>
        <input
          id="website"
          className="input"
          type="text"
          placeholder="Enter Website"
          onChange={this.onChangeWebsite}
        />
      </div>
      <div className="input-container">
        <label htmlFor="username">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
          />
        </label>
        <input
          id="username"
          className="input"
          type="text"
          placeholder="Enter Username"
          onChange={this.onChangeUsername}
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
          />
        </label>
        <input
          id="password"
          className="input"
          type="password"
          placeholder="Enter Password"
          onChange={this.onChangePassword}
        />
      </div>
      <div className="btn-container">
        <button type="submit">Add</button>
      </div>
    </form>
  )

  onChangeCheckbox = () => {
    this.setState(prevState => ({
      passwordManagerList: prevState.passwordManagerList.map(eachItem => ({
        ...eachItem,
        isChecked: !eachItem.isChecked,
      })),
    }))
  }

  displayImage = () => (
    <div className="no-password-container">
      <img
        className="no-password"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
        alt="no passwords"
      />
      <p className="no-password-heading">No Passwords</p>
    </div>
  )

  filteredPasswords = () => {
    const {passwordManagerList, searchInput} = this.state
    const filteredList = passwordManagerList.filter(eachList =>
      eachList.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredList
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {passwordManagerList} = this.state
    const filterPasswords = this.filteredPasswords()
    return (
      <div className="app-container">
        <div className="container">
          <div>
            <img
              className="logo-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
            />
            <div className="add-password-container">
              <div className="new-password-container">
                <h1 className="add-new-password-heading">Add New Password</h1>
                {this.onRenderForm()}
              </div>
              <div className="password-manager-image-container">
                <img
                  className="password-image"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                  alt="password manager"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="our-password-container">
          <div className="nav-bar">
            <div className="length">
              <h1 className="your-password-heading">Your Passwords</h1>
              <p className="number-of-passwords">{filterPasswords.length}</p>
            </div>
            <div className="search-input-container">
              <img
                className="search-image"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                className="search-input"
                type="search"
                placeholder="search"
                onChange={this.onChangeSearch}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              id="checkbox"
              type="checkbox"
              onChange={this.onChangeCheckbox}
            />
            <label htmlFor="checkbox">Show passwords</label>
          </div>
          {passwordManagerList.length === 0 ? (
            this.displayImage()
          ) : (
            <div className="all-passwords">
              <ul className="un-order">
                {filterPasswords.map(eachPassword => (
                  <PasswordItems
                    passwordDetails={eachPassword}
                    key={eachPassword.id}
                    onDelete={this.onDelete}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
