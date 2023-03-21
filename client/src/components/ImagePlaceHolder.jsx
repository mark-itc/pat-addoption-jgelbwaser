import React from 'react'
import UiBox from './ui/uiKit/layouts/UiBox'

export default function ImagePlaceHolder({height = 'auto', alt="picture place holder"}) {
    return (
        <UiBox
            sx={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0',
                height: height, width: '100%', backgroundColor: '#EFD6C5', cursor: 'pointer',
                '&:hover': { backgroundColor: '#F9BF98' }

            }}>
                <img src="./assets/logo-outline.png" alt={alt} style={{
                    width: 'auto', height: '80%',
                    objectFit: 'contain'
                }}
                />
        </UiBox>
    )
}
