
import React from 'react'
import UseApi from '../../services/useApi'
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
import { MODAL_OPTIONS,  openModal } from '../../redux/reducers/appSlice'
import { Link } from 'react-router-dom'
import MyAppUiContainer from '../ui/myAppUi/MyAppUiContainer'


export default function NavBar() {


    const { permissionLevel} = useSelector(state => state.auth)
    const {currentUser} = useSelector(state => state.user)
    // const {currentUser, permissionLevel} = authState.currentUser
    // const permissionLevel = authState.permissionLevel;
    const navLinkArray = NAV_LINKS_PER_STATUS[permissionLevel]
    const fullName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '';
    const dispatch = useDispatch()
    const {logout} = UseApi()


    const handleAddPetClick = () => {
        dispatch(openModal(MODAL_OPTIONS.addPet))
    }

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
        logout();
    }

    return (
        <UiAppBar position="sticky" color='dark'>
            <UiToolbar>
            <MyAppUiContainer>
                <UiFlexRow justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <UiFlexRow  gap={1} alignItems='stretch'>
                    {/* LOGO AND ORG NAME  */}
                    <NavBrand />

                    {/* NAV LINKS  */}
                    <UiHideFrom from='sm'>
                        {/* mobile: */}
                        <UiFlexRow gap={1} sx={{ height: '100%' }} alignItems='center' >
                            {navLinkArray.map((navLink, index) => {
                                const Icon = navLink.icon;
                                return (
                                    <Link key={index} to={navLink.path} >
                                        <NavIconButton >
                                            <Icon />
                                        </NavIconButton>
                                    </Link>
                                )
                            })}
                        </UiFlexRow>
                    </UiHideFrom>
                    <UiShowFrom from='sm' >
                        {/* desktop: */}
                        <UiFlexRow sx={{ height: '100%' }}>
                            {navLinkArray.map((navLink, index) => {
                                return (
                                    <Link key={index} to={navLink.path} >
                                        <NavButton>
                                            {navLink.title}
                                        </NavButton>
                                    </Link>
                                )
                            })}

                        </UiFlexRow>


                    </UiShowFrom>
                    </UiFlexRow>
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
                                        <NavButton onClick={handleAddPetClick}>Add pet</NavButton>
                                    </UiShowFrom>
                                </>

                            )}

                        </UiFlexRow>
                    </div>
                </UiFlexRow>
                </MyAppUiContainer>
            </UiToolbar>
        </UiAppBar>
    )
}
