import React, { useEffect, useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import PostCard from '../components/PostCard';
import { getPostsFromDatabase } from '../services/requester/UserRequester'; // Import hàm từ module UserRequester
import HomepageHeader from '../components/HomepageHeader';
import SearchBar from '../components/Search';
import { BASE_URL } from '../config';
import { ApiPaths } from '../services/ApiPaths';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {

    
    const fetchPosts = async () => {
      try {
        const data = await getPostsFromDatabase(); 
        const formattedPosts = data.map(post => ({
          id: post.id,
          authorName: post.authorName,
          authorAvatar: post.authorAvatar,
          caption: post.caption,
          like: post.postLike,
          //images: post.postImages.map(image => image.imageUrl), 
          images: post.postImages.map(image => `${BASE_URL}/${image.imageUrl}`), 
        }));

        
        setPosts(formattedPosts);
        console.log('Formatted Posts:', formattedPosts);
        formattedPosts.forEach(post => {
          console.log('Author Name:', post.authorName);
          console.log('Caption:', post.caption);
          console.log('Images:');
          // Lặp qua mỗi đường dẫn imageUrl của từng bức ảnh trong mảng images
          post.images.forEach(image => {
            console.log(image);
          });
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then((newData) => {
      setPosts(newData); // Cập nhật dữ liệu mới
      
    });
    fetchPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    
  }, []);

  const fetchData = async () => {
    try {
      // Thực hiện yêu cầu lấy dữ liệu từ API hoặc từ nguồn dữ liệu khác
      const response = await fetch(ApiPaths.getAllPost); // Thay URL_API bằng URL của API bạn muốn gọi
  
      if (!response.ok) {
        throw new Error('Lỗi khi lấy dữ liệu từ máy chủ');
      }
  
      const data = await response.json(); // Chuyển đổi dữ liệu nhận được thành định dạng JSON
  
      return data; // Trả về dữ liệu mới từ API
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      throw error; // Ném lỗi để xử lý ở nơi gọi fetchData
    }
  };
  
  return (
    <View>
      <HomepageHeader/>
      
    <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      
      {posts.map(formattedPosts => (
        <PostCard
          key={formattedPosts.id}
          authorName={formattedPosts.authorName}
          authorAvatar={formattedPosts.authorAvatar}
          caption={formattedPosts.caption}
          postImages={formattedPosts.images}
          postKinds={formattedPosts.postKinds}
          like={formattedPosts.like}
          
        />
      ))}
    </ScrollView>
    </View>
    
  );
};



export default HomePage;



























