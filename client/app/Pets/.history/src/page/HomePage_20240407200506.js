import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import PostCard from '../components/PostCard';
import { getPostsFromDatabase } from '../services/requester/UserRequester'; // Import hàm từ module UserRequester
import HomepageHeader from '../components/HomepageHeader';
import SearchBar from '../components/Search';
import { BASE_URL } from '../config';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

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

  
  return (
    <View>
      <HomepageHeader/>
      
    <ScrollView>
      
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

const handleUpdateData = async () => {
  try {
    // Thực hiện các hành động cần thiết để cập nhật dữ liệu mới từ máy chủ
    // Ví dụ: Gọi API để lấy dữ liệu mới từ máy chủ
    const newData = await fetchDataFromServer(); // fetchDataFromServer là hàm gọi API lấy dữ liệu mới

    // Cập nhật dữ liệu trong giao diện bằng cách gọi hàm setData
    setData(newData); // newData là dữ liệu mới từ máy chủ

    // Hiển thị thông báo hoặc thực hiện các hành động khác sau khi cập nhật dữ liệu thành công
    // Ví dụ: Hiển thị thông báo cập nhật thành công
    Alert.alert("Cập nhật dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi khi cập nhật dữ liệu:", error);
    // Xử lý lỗi nếu cần thiết
    // Ví dụ: Hiển thị thông báo lỗi
    Alert.alert("Lỗi khi cập nhật dữ liệu", error.message);
  }
};

export default HomePage;



























