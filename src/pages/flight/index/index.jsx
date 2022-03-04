import {useEffect, useState} from "react";
import {adsReq} from "../../../common/api";


const FlightIndex = () => {
  const [adList,setAdList] = useState([])
  const [isExchange,setIsExchange] = useState(false)

  useEffect(()=>{
    const getAds = () => {
      adsReq().then(res=>{
        const {result} = res
        setAdList({
          adList:result || []
        })
      })
    }
    return()=>{
      getAds()
    }
  },[adList])

  const handleTabClick = (id) => {
    console.log(id)
  }

  const chooseFlightCity = (type) => {
    dispatch()
  }

  return(
    <View className='flight-container'>

    </View>
  )
}

export default FlightIndex
