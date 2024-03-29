import HomeIcon from '@mui/icons-material/Home'; 
//import FaceIcon from '@mui/icons-material/Face';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from '@mui/icons-material/Pets';


export const PERMISSION_LEVEL = {
    guest: 0,
    user: 1,
    admin: 2
}

export const ROUTES_PATH = {
    home: '/',
    search: '/search',
    myPets: '/myPets',
    adminDashboard: '/admin'
}

export const NAV_LINKS = {
    home: { title: 'Home', path: ROUTES_PATH.home, icon: HomeIcon},
    search: { title: 'Search', path: ROUTES_PATH.search, icon: SearchIcon},
    myPets: { title: 'My Pets', path: ROUTES_PATH.myPets, icon: PetsIcon },
    dashboard: { title: 'Dashboard', path: ROUTES_PATH.myPets, icon: TuneIcon},
}

export const NAV_LINKS_PER_STATUS = {
    [PERMISSION_LEVEL.guest]: [
        NAV_LINKS.home,
        NAV_LINKS.search,
    ],
    [PERMISSION_LEVEL.user]: [
        NAV_LINKS.search,
        NAV_LINKS.myPets
    ],
    [PERMISSION_LEVEL.admin]: [
        NAV_LINKS.dashboard,
        NAV_LINKS.search,
    ],
}

export const PET_MAX_HEIGHT_IN_cm = 150
export const PET_MAX_WEIGHT_IN_gr = 20000
export const PET_MAX_WEIGHT_IN_Kg = parseFloat((PET_MAX_WEIGHT_IN_gr / 1000).toFixed(1))



export const FILTER_OPTIONS ={
    type: {
        1: 'cat',
        2: 'dog'
    },
    status:{
        0: 'All',
        1: 'Available',
        2: 'Fostered',
        3: 'Adopted'
    }
}

export const PET_STATUS = {
    all: 0,
    available: 1,
    fostered: 2,
    adopted: 3
}

export const PET_TYPES = {
    all: 0,
    cat: 1,
    dog: 2
}
    



