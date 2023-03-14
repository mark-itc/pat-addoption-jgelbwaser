import  { useEffect } from 'react'
import UseApi from '../services/useApi';

export default function Init() {

  const {getPets} = UseApi()

  useEffect(() => {
    getPets();
    //On unmount
    return () => {
    };
  }, [getPets])


return (null)
}
