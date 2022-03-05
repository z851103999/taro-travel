import { useEffect, useState } from "react";
import { adsReq } from "../../../common/api";
import {
  SwiperItem,
  View,
  Text,
  Button,
  Swiper,
  Image,
} from "@tarojs/components";
import Tab from "../../../components/Tab/index";
import Taro from "@tarojs/taro";
import { sleep } from "../../../common/utils";
import dayjs from "dayjs";
import tools from "../../../common/tools";
import NoExploit from "../../../components/NoExploit/index";
import { connect } from "react-redux";

import "./index.scss";
/**
 * 航班索引
 * @param {*} param0
 * @returns
 */
const FlightIndex = (props) => {
  const [adList, setAdList] = useState([]);
  const [isExchange, setIsExchange] = useState(false);

  const {
    dptCityName,
    dptCityId,
    arrCityId,
    arrCityName,
    dptAirportName,
    arrAirportName,
    dptDate,
    dispatch
  } = props
  /**
   * 航班选项卡
   */

  const FLIGHT_TABS = [
    {
      label: "单程",
      id: 0,
    },
    {
      label: "多程",
      id: 1,
    },
    {
      label: "往返",
      id: 2,
    },
  ];

  useEffect(() => {
    const getAds = () => {
      adsReq().then((res) => {
        const { result } = res;
        setAdList({
          adList: result || [],
        });
      });
    };
    return () => {
      getAds();
    };
  }, [adList]);

  useEffect(() => {
    const getLocationInfo = () => {
      Taro.getLocation({
        type: "gcj02",
      })
        .then((res) => {
          const { latitude, longitude } = res;
          getCity({ latitude, longitude });
        })
        .catch(() => {
          tools.showToast("位置获取失败。。");
        });
    };
    const getCity = ({ latitude, longitude }) => {
      Taro.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?key=JKLBZ-WN3K4-HFSU6-DB5UU-2FGCS-CLB4J&localtion=${latitude},${longitude}`,
      });
    };
    return () => {
      getLocationInfo();
    };
  });

  const handleTabClick = (id) => {
    console.log(id);
  };
  /**
   * 选择航班城市
   * @param type
   */
  const chooseFlightCity = (type) => {
    dispatch({
      type: "flightIndex/updateState",
      payload: {
        cityType: type,
      },
    });
    Taro.navigateTo({
      url: "/pages/airportList/airportList",
    });
  };
  /**
   * 交换城市
   */
  const exchangeCity = async () => {
    // dispatch
    const exchangeObj = {
      dptCityName: arrCityName,
      dptCityId: arrCityId,
      arrCityName: dptCityName,
      arrCityId: dptCityId,
      dptAirportName: arrAirportName,
      arrAirportName: dptAirportName,
    };
    setIsExchange({
      isExchange: true,
    });
    dispatch({
      type: "flightIndex/updateState",
      payload: exchangeObj,
    });
    await sleep(500);
    setIsExchange({
      isExchange: true,
    });
    dispatch({
      type: "flightIndex/updateState",
      payload: exchangeObj,
    });
  };
  /**
   * 选择航班日期
   */
  const chooseFlightDate = () => {
    Taro.navigateTo({
      url: "/pages/calendar/calendar",
    });
  };
  /**
   * 链接到列表上
   */
  const onLinkToList = () => {
    tools.navigateTo({
      url: "/pages/flight/list/list",
      data: {
        arrCityName,
        arrCityId,
        arrAirportName,
        dptCityId,
        dptCityName,
        dptAirportName,
        dptDate,
      },
    });
  };

  return (
    <View className='flight-container'>
      <View className='flight-top'>
        <Tab
          tabList={FLIGHT_TABS}
          onTabClick={handleTabClick}
          className='flight-index-tab'
        >
          <SwiperItem>
            <View className='item station'>
              <View
                className={`cell from ${isExchange ? "slide" : ""}`}
                onClick={() => chooseFlightCity("depart")}
              >
                {dptCityName}
              </View>
              {/*交换城市*/}
              <Text
                onCLick={exchangeCity}
                className={`icon-zhihuan iconfont ${
                  isExchange ? "active" : ""
                }`}
              ></Text>
              <View
                className={`cell to ${isExchange ? "slide" : ""}`}
                onClick={() => chooseFlightCity("arrive")}
              >
                {arrCityName}
              </View>
            </View>
            <View className='item data' onClick={chooseFlightDate}>
              {dayjs(dptDate).format("M月M日")}
            </View>
            <Button className='search-btn' onClick={onLinkToList}>
              搜一下
            </Button>
          </SwiperItem>
          {/* 往返 */}
          <SwiperItem>
            <NoExploit className='no-data' />
          </SwiperItem>
          {/* 多程 */}
          <SwiperItem>
            <NoExploit className='no-data' />
          </SwiperItem>
        </Tab>
      </View>
      <View className='alipay-swiper' style={{ margin: "15px" }}>
        <Swiper className='adv-banner' autoplay circular interval={3000}>
          {adList.map((item) => {
            return (
              <SwiperItem key={item.id} className='item'>
                <Image className='img' src={item.imgUrl}></Image>
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
      <View className='flight-info'></View>
    </View>
  );
};

export default connect(({ flightIndex }) => {
  flightIndex;
})(FlightIndex);
