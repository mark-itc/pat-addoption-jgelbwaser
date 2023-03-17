import React from 'react'
import UiBox from '../ui/uiKit/layouts/UiBox'
import TextFontLogo from '../ui/myAppUi/TextFontLogo'
import { UiShowFrom } from '../ui/uiKit/layouts/UiHide'
import { UiFlexRow } from '../ui/uiKit/layouts/UiFlex'



export default function NavBrand() {
  return (
    <UiFlexRow gap={1} >
    <UiBox sx={{
        height: '3.5rem',
        width: '3.5rem',
        backgroundImage: `url(./assets/logo.png)`,
        backgroundSize: '2.5rem 2.5rem',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }}>
    </UiBox>
    <UiShowFrom from='sm'>
        <TextFontLogo verticalCentered='true' variant='h5' >FUREVER</TextFontLogo>
    </UiShowFrom>
    </UiFlexRow>

  )
}
