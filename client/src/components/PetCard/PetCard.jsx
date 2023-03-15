import React from 'react'
import UiCard from '../ui/uiKit/componentsUi/UiCard/UiCard';
import UiCardMedia from '../ui/uiKit/componentsUi/UiCard/UiCardMedia';
import UiCardContent from '../ui/uiKit/componentsUi/UiCard/UiCardContent';
import TextFontLogo from '../ui/myAppUi/TextFontLogo';
import { UiFlexRow } from '../ui/uiKit/layouts/UiFlex';
import styled from '@emotion/styled';
import { FILTER_OPTIONS } from '../../config/config';
import UiDiv from '../ui/uiKit/layouts/UiDiv';
import { useDispatch } from 'react-redux';
import { MODAL_OPTIONS, openModal } from '../../redux/reducers/appSlice';
import UseApi from '../../services/useApi';
import SaveHeartIcon from '../saveHeartIcon';

const StyledCard = styled(UiCard)(({theme})=>({
    width:'300px', 
    borderWidth:'2px',
    borderColor: theme.palette.main.light,
    '&:hover':{
        borderColor: theme.palette.secondary.light,
        backgroundColor: '#FFF0E5'
    }
}))


export default function PetCard({name, _id, status, picture, liked}) {
  
  const dispatch = useDispatch();
  const {setSelectedPetByID} = UseApi()
  

 const handleClick =  () => {
  dispatch(openModal(MODAL_OPTIONS.pet))
   setSelectedPetByID(_id)
 }

  return (
    <UiDiv onClick={handleClick}>
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
                
            <SaveHeartIcon petId={_id}/>
           <TextFontLogo color='main.dark' variant='h6' >{name}</TextFontLogo> 
            </UiFlexRow>
            <TextFontLogo color='main.main' variant='h6' >
            {FILTER_OPTIONS.status[status].toLowerCase() }
           </TextFontLogo>
            </UiFlexRow>
        </UiCardContent>
        {/* <UiCardActions>
           hi
        </UiCardActions> */}
    </StyledCard>
    </UiDiv>
  )
}
