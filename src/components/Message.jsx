import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

export default Message




// import React from 'react'
// import { Alert } from 'react-bootstrap'

// const Message = ({ variant, children }) => {
//   return <Alert variant={variant}>{children}</Alert>
// }

// Message.defaultProps = {
//   variant: 'info',
// }

// export default Message
