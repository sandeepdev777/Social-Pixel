import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";

    const PostWidget = ({
        postId,
        postUserId,
        name,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments, 
    })=>{
        const [isComments, setIsComments] = useState(false);
        const dispatch = useDispatch();
        const token = useSelector((state) => state.token);
        const loggedInUserId = useSelector((state) => state.user._id);
        const isLiked = Boolean(likes[loggedInUserId]);  // this stores the  whether the user liked the post or not
        const likeCount = Object.keys(likes).length;  /// stores total no of likes
      
        const { palette } = useTheme();
        const main = palette.neutral.main;
        const primary = palette.primary.main;
        
        // updates the likes of the post
        const patchLike=async()=>{
            const response = await fetch(`https://social-pixel.onrender.com/posts/${postId}/like`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`,
                },
                body:JSON.stringify({userId:loggedInUserId}),
            });
            const updatePost = await response.json();
            dispatch(setPost({post:updatePost}));
        }

     return(
        <WidgetWrapper m="2rem 0">
        <Friend 
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}/>
        <Typography color={main} sx={{mt:"1rem"}}>
          {description}
        </Typography>
        {picturePath && (
          <img
          width="100%"
          height="auto"
          alt="post"
          style={{borderRadius:"0.75rem ", marginTop:"0.75rem"}}
          src={`https://social-pixel.onrender.com/assets/${picturePath}`}/>
        )}
        <FlexBetween mt="0.25rem">
            <FlexBetween gap="0.25rem">
                <FlexBetween gap="0.3rem">

                    {/** switching the icons based on user has liked or not */}
                   <IconButton onClick={patchLike}>
                   {isLiked ? (
                        <FavoriteOutlined sx={{color:primary}}/>
                     ):(
                        <FavoriteBorderOutlined />
                     )}
                   </IconButton>
                   <Typography>{likeCount}</Typography>
                </FlexBetween>
                 {/** gives the no of comments */}
                 <FlexBetween gap="0.3rem">
                    <IconButton onClick={()=> setIsComments(!isComments)}>
                        <ChatBubbleOutlineOutlined/>
                    </IconButton>
                    <Typography>{comments.length}</Typography>
                 </FlexBetween>

            </FlexBetween>
             {/** displaying the whole comments*/}
             <IconButton>
                <ShareOutlined/>
             </IconButton>
        </FlexBetween>
        {isComments && (
            <Box mt="0.5rem">
               {comments.map((comment,i)=>(
                <Box key={`${name}-${i}`}>
                    <Divider/>
                    <Typography sx={{color:main,m:"0.5rem",pl:"1rem"}}>
                        {comment}
                    </Typography>
                </Box>
               ))}
               <Divider/>
            </Box>
        )}
      </WidgetWrapper>
     )
    }

    export default PostWidget;