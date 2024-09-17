import {Box} from '@mui/material';

// this component is used to style user profile image
const UserImage=({image, size="60px"})=>{
return(
    <Box width={size} height={size}>
        <img
         width={size}
         style={{objectFit:"cover",borderRadius:"50%"}}
         height={size}
         alt="user"
         src={`https://social-pixel.onrender.com/assets/${image}`}  // 3 BACKEND CONNECTION
         />
    </Box>
)
}
export default UserImage;