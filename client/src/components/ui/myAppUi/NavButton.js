import React from 'react'
import UiButton from '../uiKit/UiButton'


export default function NavButton({ ...props}) {
  return (
    <UiButton {...props} variant='text'>
        {props.children}
    </UiButton>
  )
}
