import React from 'react'
const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === '') {
    return null
  } else {
    return (
      <div className={`notification error`}>
        {errorMessage}
      </div>
    )
  }
}

export default ErrorNotification