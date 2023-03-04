import React from 'react'
import UiButton from '../uiKit/componentsUi/UiButton'


export default function AppButton({sx, ...props}) {
  return (
    <UiButton {...props} sx={{ minWidth: '10rem', ...sx}}>
        {props.children}
    </UiButton>
  )
}

// export default function AppButton({sx, variant='contained', ...props}) {

//   const StyledUiButton = styled(UiButton)(({ theme }) => ({
//     minWidth: '10rem',
//     [theme.breakpoints.down('sm')]:{width: '100%'},
//     ...sx
// }));

//   return (
//     <StyledUiButton variant={variant}>
//         {props.children}
//     </StyledUiButton>
//   )
// }
