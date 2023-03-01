import React from 'react'
import UiButton from '../ui/uiKit/componentsUi/UiButton'
import theme from '../../theme'

export default function NavButton({ sx={}, ...props}) {
  return (
    <UiButton {...props} 
    color="white"  
    sx={{
      height: '100%',
      textTransform: 'uppercase',
      padding: '0 20px',
      [theme.breakpoints.up('sm')]: {padding: '0 30px'},
       ...sx
    }} 
      variant='text'
      >
        {props.children}
    </UiButton>
  )
}
