import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({userId,isProfile=false}) => {
    const dispatch=useDispatch();
    const posts = useSelector((state)=>state.posts);
    const token=useSelector((state)=>state.token);

    // this grabs all the posts from the server and stores them in the state
    const getPosts= async()=>{
        const response =await fetch("https://social-pixel.onrender.com/posts",{
            method:"GET",   
            headers:{ Authorization: `Bearer ${token}` },
        })
        const data = await response.json();
        dispatch(setPosts({posts:data}));
    }

    // it gives the posts of a particular user
    const getUserPosts= async()=>{
        const response =await fetch(`https://social-pixel.onrender.com/posts/${userId}/posts`,{
            method:"GET",   
            headers:{ Authorization: `Bearer ${token}` },
        })
        const data = await response.json();
        dispatch(setPosts({posts:data}));
    }

    // if user profile exist then it gives the posts of the user else it gives all the posts
    useEffect(()=>{
        if(isProfile){
            getUserPosts();
        }else{
            getPosts(); // the below line is used to remove the warning
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps 

    return(
        <>
        {Array.isArray(posts) && posts.map(     //  ******** error solved here
            ({
            _id,
             userId,
             firstName,
             lastName,
             description,
             location,
             picturePath,
             userPicturePath,
             likes,
            comments,
        })=>(
           <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
           /> 
        ))}</>
    )
}

export default PostsWidget;