
import React from 'react'
import UiAppBar from '../ui/uiKit/componentsUi/UiAppBar'
import UiToolbar from '../ui/uiKit/layouts/UiToolbar'
import NavBrand from './NavBrand'
import { UiFlexRow } from '../ui/uiKit/layouts/UiFlex'
import { NAV_LINKS_PER_STATUS, PERMISSION_LEVEL } from '../../config/config'
import NavButton from './NavButton' // eslint-disable-next-line
import PetsIcon from '@mui/icons-material/Pets'; // eslint-disable-next-line
import UiIconButton from '../ui/uiKit/componentsUi/UiIconButton' // eslint-disable-next-line
import HomeIcon from '@mui/icons-material/Home'; // eslint-disable-next-line
import FaceIcon from '@mui/icons-material/Face'; // eslint-disable-next-line
import TuneIcon from '@mui/icons-material/Tune';// eslint-disable-next-line
import SearchIcon from '@mui/icons-material/Search';
import NavIconButton from './NavIconButton'
import { UiHideFrom, UiShowFrom } from '../ui/uiKit/layouts/UiHide'
import UiAvatarFromName from '../ui/uiKit/componentsUi/UiAvatarFromName'
import { useDispatch, useSelector } from 'react-redux'
import { MODAL_OPTIONS, openLoginModal, openModal, openSignInModal, openUserModal } from '../../redux/reducers/modalSlice'
import { setLogoutState } from '../../redux/reducers/authSlice'
import UiText from '../ui/uiKit/componentsUi/UiText'

export default function NavBar() {

  
    const authState = useSelector(state => state.auth)
    const currentUser = authState.currentUser
    const permissionLevel = authState.permissionLevel;
    const navLinkArray = NAV_LINKS_PER_STATUS[permissionLevel]
    const fullName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '';
    const dispatch = useDispatch()



    const handleProfileClick = () => {
        dispatch(openModal(MODAL_OPTIONS.updateUser))
    }

    const handleLoginClick = () => {
        dispatch(openModal(MODAL_OPTIONS.login))
    }

    const handleSignInClick = () => {
        dispatch(openModal(MODAL_OPTIONS.signIn))
    }

    const handleLogoutClick = () => {
        dispatch(setLogoutState());
    }

    return (
        <UiAppBar position="sticky" color='dark'>
            <UiToolbar>
                <UiFlexRow justifyContent='space-between' sx={{ width: '100%' }}>

                    {/* LOGO AND ORG NAME  */}
                    <NavBrand />

                    {/* NAV LINKS  */}
                    <UiHideFrom from='sm'>
                        {/* mobile: */}
                        <UiFlexRow gap={1} sx={{ height: '100%' }} >
                            {navLinkArray.map((navLink, index) => {
                                const Icon = navLink.icon;
                                return <NavIconButton key={index}><Icon /></NavIconButton>
                            })}
                        </UiFlexRow>
                    </UiHideFrom>
                    <UiShowFrom from='sm' >
                         {/* desktop: */}
                        <UiFlexRow sx={{ height: '100%' }}>
                            {navLinkArray.map((navLink, index) => {
                                return <NavButton key={index}>{navLink.title}</NavButton>
                            })}

                        </UiFlexRow>


                    </UiShowFrom>

                    {/* USER INFO */}
                    <div>
                        <UiFlexRow sx={{ height: '100%', alignSelf: 'center' }} >

                            {permissionLevel > PERMISSION_LEVEL.guest ? (

                                //When loggedIn
                                <>
                                <UiFlexRow gap={1} onClick={handleProfileClick} >
                                    {fullName &&
                                        <UiFlexRow sx={{ alignItems: 'center' }}>
                                            <UiAvatarFromName mr={1}>{fullName}</UiAvatarFromName>
                                        </UiFlexRow>
                                    }
                                    <UiShowFrom from='sm' >
                                        <NavButton>Profile</NavButton>
                                    </UiShowFrom>
                                </UiFlexRow>
                                <NavButton onClick={handleLogoutClick}>Logout</NavButton>
                                </>
                            ) : (
                                //When loggedOut:
                                <>
                            <NavButton onClick={handleLoginClick}>Login</NavButton>
                            <UiShowFrom from='sm' >
                                <NavButton onClick={handleSignInClick}>Signin</NavButton>
                            </UiShowFrom>
                                </>

                            )}

                        </UiFlexRow>
                    </div>
                </UiFlexRow>
            </UiToolbar>
        </UiAppBar>
    )
}
