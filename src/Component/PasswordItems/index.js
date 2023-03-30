import './index.css'

const PasswordItems = props => {
  const {passwordDetails} = props
  const {id, website, username, password, isChecked} = passwordDetails
  const firstLetter = website[0]

  const onDeletePassword = () => {
    const {onDelete} = props
    onDelete(id)
  }
  console.log(isChecked)

  return (
    <li className="password-view-container">
      <div className="website-details">
        <p className="first-letter">{firstLetter}</p>
        <div>
          <p>{website}</p>
          <p>{username}</p>
          {isChecked ? (
            <p>{password}</p>
          ) : (
            <div>
              <img
                className="stars"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
              />
            </div>
          )}
        </div>
      </div>
      <div className="delete-btn-container">
        <button type="button" className="delete-btn" data-testid="delete">
          <img
            className="delete-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            onClick={onDeletePassword}
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItems
