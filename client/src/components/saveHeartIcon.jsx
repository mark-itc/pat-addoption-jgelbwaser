import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux';
import UseApi from '../services/useApi';
import { MODAL_OPTIONS, openModal } from '../redux/reducers/appSlice';

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)(({ theme }) => ({
    color: theme.palette.secondary.main,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  }));

  const StyledFavoriteIcon = styled(FavoriteIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  }));


export default function SaveHeartIcon({petId, ...props}) {

    const currentUser = useSelector(state => state.user.currentUser)
    const isPetSaved = currentUser?.userSavedPets?.includes(petId)
    const dispatch = useDispatch();
    const {savePet, unSavePet} = UseApi()
    
 const handleClick = (e) => {
    e.stopPropagation();
   if(!currentUser) {
    return dispatch(openModal(MODAL_OPTIONS.login))
   }
   isPetSaved ? (
    unSavePet(petId)
   ) : (
    savePet(petId)
   )}

  return (
    isPetSaved ? (
        <StyledFavoriteIcon {...props} onClick={(e)=>handleClick(e)}/>
    ) : (
        <StyledFavoriteBorderIcon {...props} onClick={(e)=>handleClick(e)}/>
    ))
}
