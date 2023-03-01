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

export const ROUTES_URLS = {
    home: '/',
    search: '/search',
    myPets: '/myPets',
    adminDashboard: '/admin'
}

export const NAV_LINKS = {
    home: { title: 'Home', url: ROUTES_URLS.home, icon: HomeIcon},
    search: { title: 'Search', url: ROUTES_URLS.search, icon: SearchIcon},
    myPets: { title: 'My Pets', url: ROUTES_URLS.myPets, icon: PetsIcon },
    dashboard: { title: 'Dashboard', url: ROUTES_URLS.myPets, icon: TuneIcon},
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


    



