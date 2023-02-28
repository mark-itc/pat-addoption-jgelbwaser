import React from 'react'
import UiAppBar from './ui/uiKit/UiAppBar'
import UiToolbar from './ui/uiKit/layouts/UiToolbar'
import UiBox from './ui/uiKit/layouts/UiBox'
import UiTextFontLilitaOne from './ui/uiKit/UiTextFontLilitaOne'
import { UiShowFrom } from './ui/uiKit/layouts/UiHide'
import { UiFlexRow } from './ui/uiKit/layouts/UiFlex'


export default function navBar() {

    return (
        <UiAppBar position="sticky">
            <UiToolbar
                sx={{
                    display: 'flex', alignContent: 'center', justifyContent: 'space-between'
                }}>
                <UiFlexRow gap={1} >
                    <UiBox sx={{
                        height: '3.5rem',
                        width: '5rem',
                        backgroundImage: `url(./assets/logo.png)`,
                        backgroundSize: '75px 75px',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </UiBox>
                    <UiShowFrom from='sm'>
                        <UiTextFontLilitaOne verticalCentered='true' variant='h5' >FUREVER</UiTextFontLilitaOne>
                    </UiShowFrom>
                </UiFlexRow>


            </UiToolbar>
        </UiAppBar>
    )
}
