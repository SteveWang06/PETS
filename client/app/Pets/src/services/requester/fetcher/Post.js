import { ApiPaths } from "../../ApiPaths";
import { getHeaders } from "../../config/apiConfig";




const fetchPostById = async ({ queryKey }) => {
    const [, postId, token] = queryKey;
    const response = await fetch(`${ApiPaths.getPostById}${postId}`, getHeaders(token));
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
};


export {
    fetchPostById
}