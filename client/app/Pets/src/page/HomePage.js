import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  View,
  RefreshControl,
  Dimensions,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import PostCard from "../components/PostCard";
import { getPostsFromDatabase } from "../services/requester/UserRequester"; // Import hàm từ module UserRequester
import HomepageHeader from "../components/HomepageHeader";
import { BASE_URL } from "../config";

import { getPostKindFromDataBase } from "../services/requester/UserRequester";
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useTranslation } from 'react-i18next';
const { width, height } = Dimensions.get("screen");

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const Tab = React.forwardRef(({ data, item, onItemPress, isSelected }, ref) => {
  const { t } = useTranslation();
  const title = capitalizeFirstLetter(t(item.title));
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text
          style={{
            color: isSelected ? "#8B0000" : "#ABB2B9",
            fontSize: 50 / data.length,
            fontWeight: "800",
            //textTransform: "uppercase",
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Indicator = ({ measures, scrollX, data }) => {
  const inputRange = data.map((_, index) => index * width);

  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        height: 2,
        width: indicatorWidth,

        left: 1,
        zIndex: 1,
        backgroundColor: "black",
        bottom: -1,
        transform: [{ translateX }],
      }}
    />
  );
};



const Tabs = ({ data, scrollX, onItemPress, currentTabIndex }) => {
  const [measures, setMeasures] = useState([]);
  const containerRef = useRef();
  const [selectedTab, setSelectedTab] = useState(0);

  
  useEffect(() => {
    let m = [];
    data.forEach((item) => {

      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({
            x,
            y,
            width,
            height,
          });
          if (m.length === data.length) {
            setMeasures(m);
            
          }
        }
      );

    });
  }, [data]);

  return (
    <View
      style={{
        marginTop: 5,
        position: "absolute",
        top: 120,
        width,
        zIndex: 1,
      }}>
      <View
        ref={containerRef}
        style={{
          justifyContent: "space-evenly",
          flex: 1,
          flexDirection: "row",
        }}>
        {data.map((item, index) => {
          return (
            <Tab
              data={data}
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => {
                onItemPress(index);
                setSelectedTab(index);
              }}
              isSelected={currentTabIndex === index}
            />
          );
        })}
      </View>

      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} data={data} />
      )}
    </View>
  );
};


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPostsFromDatabase();
        const formattedPosts = data.map((post) => ({
          id: post.id,
          authorName: post.authorName,
          authorAvatar: post.authorAvatar
            ? `${BASE_URL}/${post.authorAvatar.imageUrl}`
            : null,
          caption: post.caption,
          like: post.postLike,
          kind: post.postKind,
          images: post.postImages.map(
            (image) => `${BASE_URL}/${image.imageUrl}`
          ),
        }));
        setPosts(formattedPosts);
        //console.log(JSON.stringify(formattedPosts, null, 2));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [posts]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const onItemPress = (itemIndex) => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
    setCurrentTabIndex(itemIndex);
  };

  useEffect(() => {
    const fetchPostKind = async () => {
      try {
        const data = await getPostKindFromDataBase();
        setTitles(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPostKind();
  }, []);

  const dataWithRefs = titles.map((item) => ({
    key: item.kind,
    title: item.kind,
    content: item.kind,
    ref: React.createRef(),
  }));

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.floor(offsetX / width);
    setCurrentTabIndex(selectedIndex);
    scrollX.setValue(offsetX);
  };

  return (
    <View style={{ flex: 1}}>
      <HomepageHeader />
      <Tabs
        data={dataWithRefs}
        scrollX={scrollX}
        onItemPress={onItemPress}
        currentTabIndex={currentTabIndex}
      />

      <Animated.FlatList
        ref={ref}
        data={dataWithRefs}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        //   { useNativeDriver: false }
        // )}
        onScroll={handleScroll}
        bounces={false}
        renderItem={({ item }) => (
          <View style={{ flex: 1}}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {posts
                .slice()
                .reverse()
                .filter((post) => post.kind === item.content)
                .map((formattedPosts) => (
                  <PostCard
                    key={formattedPosts.id}
                    id={formattedPosts.id}
                    authorName={formattedPosts.authorName}
                    authorAvatar={formattedPosts.authorAvatar}
                    caption={formattedPosts.caption}
                    postImages={formattedPosts.images}
                    kind={formattedPosts.kind}
                    like={formattedPosts.like}
                  />
                ))}
            </ScrollView>
            
          </View>
        )}
      />
      <FlashMessage position="top"/>
    </View>
  );
};

export default HomePage;