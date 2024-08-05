import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({userId}) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  
  // this grabs all the friends from the server and stores them in the state
  const getUserFriends = async () => {
    const response = await fetch(
      `http://localhost:3000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  
  // this renders the friends list
  useEffect(()=>{
    getUserFriends();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  // Check if friends is an array before calling map
  const friendList = Array.isArray(friends) ? friends : [];

  return(
    <WidgetWrapper>
      <Typography
      color={palette.neutral.dark}
      variant="h5"
      fontWeight="500"
      sx={{mb:"1.5rem"}}
      >
      Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friendList.map((friend)=>(
          <Friend
          key={friend._id}
          friendId={friend._id}
          name={`${friend.firstName} ${friend.lastName}`}
          subtitle={friend.location}
          userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )  
}
export default FriendListWidget;