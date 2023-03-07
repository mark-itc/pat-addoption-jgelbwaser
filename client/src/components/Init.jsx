import  { useEffect } from 'react'
import UseApi from '../services/useApi';

export default function Init() {

  const {getPets} = UseApi()

  useEffect(() => {
    getPets();
    console.log('Init Mounted');
    //On unmount
    return () => {
        console.log('Init UnMounted');
    };
  }, [getPets])


return (null)
}
