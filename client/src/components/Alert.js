import React from 'react'

export default function Alert(props) {
    
  return (
       props.alert && <div className='alert alert-light' role="alert">
             {props.alert.msg}
</div>
  )
}