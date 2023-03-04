import React from 'react'
import UiLink from '../uiKit/componentsUi/UiLink'

export default function TextLink({...props}) {
  return (
    <UiLink color='secondary' {...props} href='#'>
        {props.children}
    </UiLink>
  )
}
