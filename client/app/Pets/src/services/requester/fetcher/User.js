import { ApiPaths } from "../../ApiPaths";
import { getHeaders } from "../../config/apiConfig";




const fetchUserById = async ({ queryKey }) => {
    const [, userId, token] = queryKey;

    console.log(userId);
    console.log(token);
    const response = await fetch(`${ApiPaths.getUserById}${userId}`, getHeaders(token));
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
};


export {
    fetchUserById
}