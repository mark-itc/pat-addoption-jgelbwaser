import React from 'react'
import UiCard from '../ui/uiKit/componentsUi/UiCard/UiCard';
import UiCardMedia from '../ui/uiKit/componentsUi/UiCard/UiCardMedia';
import UiCardContent from '../ui/uiKit/componentsUi/UiCard/UiCardContent';
import UiCardActions from '../ui/uiKit/componentsUi/UiCard/UiCardContent';
import TextFontLogo from '../ui/myAppUi/TextFontLogo';
import { UiFlexRow } from '../ui/uiKit/layouts/UiFlex';
import TextFontAlt from '../ui/myAppUi/TextFontAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextFont from '../ui/myAppUi/TextFont';
import theme from '../../theme';
import styled from '@emotion/styled';

const StyledCard = styled(UiCard)(({theme})=>({
    width:'300px', 
    borderWidth:'2px',
    borderColor: theme.palette.main.light,
    '&:hover':{
        borderColor: theme.palette.secondary.light,
        backgroundColor: '#FFF0E5'
    }
}))

export default function PetCard({name, id, status, picture, liked}) {
  return (
    <StyledCard variant='outlined'>
        <UiCardMedia
                crossOrigin="anonymous"
                component="img"
                alt="green iguana"
                height="140"
                image={process.env.REACT_APP_API_PICS_URL + picture}
        />
        <UiCardContent>
            <UiFlexRow justifyContent='space-between' alignItems='center'>
            <UiFlexRow gap={1} alignItems='center'>
                
            <FavoriteBorderIcon color='primary' />
           <TextFontLogo color='main.dark' variant='h5' >{name}</TextFontLogo> 
            </UiFlexRow>
            <TextFontLogo color='main.main' variant='h6' >
            available
           </TextFontLogo>
            </UiFlexRow>
        </UiCardContent>
        {/* <UiCardActions>
           hi
        </UiCardActions> */}
    </StyledCard>
  )
}
