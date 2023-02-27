import  Typography from '@mui/material/Typography'
import React from 'react'

export default function UiText(props) {
  return (
    <Typography {...props}>
        {props.children}
    </Typography>
  )
}
