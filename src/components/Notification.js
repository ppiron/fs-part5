import React from 'react'
import PropTypes from 'prop-types'
const Notification = ({ message }) => {
  if (message === '') {
    return null
  } else {
    return (
      <div className={'notification'}>
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
}

export default Notification