import React, { useEffect, useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import PostCard from '../components/PostCard';
import { getPostsFromDatabase } from '../services/requester/UserRequester'; // Import hàm từ module UserRequester
import HomepageHeader from '../components/HomepageHeader';
import SearchBar from '../components/Search';
import { BASE_URL } from '../config';
import { ApiPaths } from '../services/ApiPaths';
import AddNewPost from '../components/AddNewPost';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataChanged, setDataChanged] = useState(0);

  useEffect(() => {

    
    const fetchPosts = async () => {
      try {
        const data = await getPostsFromDatabase(); 
        const formattedPosts = data.map(post => ({
          id: post.id,
          authorName: post.authorName,
          authorAvatar: post.authorAvatar ? `${BASE_URL}/${post.authorAvatar.imageUrl}` : null,
          caption: post.caption,
          like: post.postLike,
          kind: post.postKind,
          images: post.postImages.map(image => `${BASE_URL}/${image.imageUrl}`), 
        }));

        
        setPosts(formattedPosts);
        
        

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [dataChanged]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setDataChanged(prev => prev + 1)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  
  return (
    <View>
      <HomepageHeader/>
      
    <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      
      {posts.slice().reverse().map(formattedPosts => (
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
    
  );

  
};



export default HomePage;



























