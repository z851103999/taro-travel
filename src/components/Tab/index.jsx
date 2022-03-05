import { Swiper, View } from "@tarojs/components";
import { useState, useEffect } from "react";

import "./index.scss";

const Tab = (props) => {
  const [currentId, setCurrentId] = useState(0);
  const { className, tabList, children, initTab } = props;

  useEffect(() => {
    if (initTab == undefined) {
      setCurrentId({
        currentId: tabList?.[0]?.["id"],
      });
    } else {
      setCurrentId({
        currentId: initTab,
      });
    }
  }, [tabList, initTab]);

  const handleClick = (id) => {
    setCurrentId({
      currentId: id,
    });
    props.onTabClick?.(id);
  };

  const handleChange = (e) => {
    const id = e.detail.current;
    setCurrentId(
      {
        currentId: id,
      },
      () => {
        props.onChange?.(e);
      }
    );
  };

  const innerStyle = {
    with: `${100 / tabList?.length}%`,
    transform: `translateX(${currentId * 100}%)`,
  };

  return (
    <View className={`tab-container ${className}`}>
      {/* tab选项卡 */}
      <View className='tab-bar'>
        {tabList?.map((item) => {
          return (
            <View
              className={`tab-item ${currentId === item.id ? 'active' : ''}`}
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              {item.label}
            </View>
          );
        })}
        <View className='scroll-bar' style={innerStyle}></View>
      </View>
      {/* 选项卡内容 */}
      <Swiper
        current={currentId}
        className='tab-content'
        onChange={handleChange}
      >
        {children}
      </Swiper>
    </View>
  );
};

export default Tab;
