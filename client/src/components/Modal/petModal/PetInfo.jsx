import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  closeModal } from '../../../redux/reducers/appSlice'
import AppButton from '../../ui/myAppUi/AppButton'
import TextFontLogo from '../../ui/myAppUi/TextFontLogo'
import TextFontAlt from '../../ui/myAppUi/TextFontAlt'
import TextFont from '../../ui/myAppUi/TextFont'
import TextLink from '../../ui/myAppUi/TextLink'
import { UiAlertCollapse } from '../../ui/uiKit/componentsUi/UiAlert'
import UiBox from '../../ui/uiKit/layouts/UiBox'
import { UiFlexCol, UiFlexColToRowFrom, UiFlexRow } from '../../ui/uiKit/layouts/UiFlex'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import styled from '@emotion/styled'
import { FILTER_OPTIONS } from '../../../config/config'
import UiDiv from '../../ui/uiKit/layouts/UiDiv'
import ImageContainedBlurBG from '../../ui/uiKit/componentsUi/ImageContainedBlurBG'
import PetInfoListItem from './PetInfoListItem'
import UsePet from '../../../hooks/UsePet'
import SaveHeartIcon from '../../../components/saveHeartIcon'
import { setSelectedPet } from '../../../redux/reducers/petSlice'

export default function PetInfo() {

   const { error, loading } = useSelector(state => state.app)
  const pet = useSelector(state => state.pet.selectedPet)
  const {ctaTxt, buttonLeftData, buttonRightData } = UsePet();

   const dispatch = useDispatch();
  const showAlert = error ? true : false

  const handleLeftButtonClick = () => {
    buttonLeftData.action()
  }

  const handleRightButtonClick = () => {
    buttonRightData.action()
  }

  const handleClose = () => {
    dispatch(closeModal())
    dispatch(setSelectedPet())
  }


  return (
    <UiBox sx={{ width: '500px', maxWidth: '95vw' }}>
      <UiFlexCol alignContent='center'>
        {loading || !pet ? (
          <UiDiv style={{ height: '200px', backgroundColor: 'secondary.light' }}></UiDiv>
        ) : (
          < ImageContainedBlurBG
            image={process.env.REACT_APP_API_PICS_URL + pet?.picture}
            crossOrigin="anonymous"
            height='200px'
          />
        )}

        <UiBox px={5} py={3}>
          <UiFlexCol align-items='center'>
            {loading || !pet ? (null
            ) : (<>
              <UiFlexRow justifyContent='space-between'>
                <UiFlexRow gap={1} alignItems='center'>
                  <SaveHeartIcon petId={pet._id}/>
                  <TextFontLogo color='main.dark' variant='h6' >{pet.name}</TextFontLogo>
                </UiFlexRow>
                <TextFontLogo color='main.main' variant='h6' >
                  {FILTER_OPTIONS.status[pet.status].toLowerCase()}
                </TextFontLogo>
              </UiFlexRow>

              {pet.bio ? <TextFont mt={2} variant="body1" color="main.main" sx={{ fontStyle: 'italic' }} >{pet.bio}</TextFont> : null}

              <UiBox mt={3}>
                <UiFlexRow gap={1} justifyContent='space-between' >
                  <PetInfoListItem keyName='Breed' value={pet.breed} />
                  <PetInfoListItem keyName='Type' value={FILTER_OPTIONS.type[pet.type]} />
                </UiFlexRow>
                <UiFlexRow gap={1} justifyContent='space-between' >
                  <PetInfoListItem keyName='Height' value={pet.height} units='cm' />
                  <PetInfoListItem keyName='Weight' value={pet.weight / 1000} units='kg' />
                </UiFlexRow>
                <UiFlexRow gap={1} justifyContent='space-between' >
                  <PetInfoListItem keyName='Color' value={pet.color} />
                  <PetInfoListItem keyName='Hypoallergenic' value={pet.hypoallergenic ? 'Yes' : 'No'} />
                </UiFlexRow>
                <PetInfoListItem keyName='Diet Restrictions' value={pet.DietaryRestrictions} />
              </UiBox>

            </>)}
            {/* Error */}
            <UiBox mt={3}>
              <UiAlertCollapse show={showAlert} >{error}</UiAlertCollapse>
              {loading ? <TextFontAlt bold textAlign='center' variant='h4' color='primary'>Loading ...</TextFontAlt> : null}
            </UiBox>
            {/* Actions */}
            <TextFontAlt variant='h4' bold color='secondary.main' mb={2} sx={{ textAlign: 'center' }}>
              {ctaTxt}
            </TextFontAlt>
            <UiFlexColToRowFrom gap={2} w100 justifyContent='center' >
              <AppButton type="submit" variant="contained" onClick={handleLeftButtonClick} disabled={loading}>
                {buttonLeftData?.txt}
              </AppButton>
              <AppButton variant="contained" color="secondary" onClick={handleRightButtonClick} disabled={loading}>
                {buttonRightData?.txt}
              </AppButton>
            </UiFlexColToRowFrom>
            <UiBox mt={2}>
              <UiFlexRow justifyContent='center' >
                <TextLink href="#" variant="body2" onClick={handleClose}>
                  CLOSE
                </TextLink>
              </UiFlexRow>
            </UiBox>
          </UiFlexCol>
        </UiBox>
      </UiFlexCol>
    </UiBox>

  )
}
