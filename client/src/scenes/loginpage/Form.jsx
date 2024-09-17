// Mine
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"; // import the edit icon from materiial ui
import {Formik} from "formik"; // formik is a library that helps in buliding/handling forms in react
import * as yup from "yup";  // yup is a library that helps in form validation . it is used to define the schema and validate the form
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setLogin} from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

// buliding schema for register with help of yup so that it can authenticate the register form
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

// login schema using yup
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    location:"",
    occupation:"",
    picture:"",
}

const initialValuesLogin={
    email:"",
    password:"",
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const {palette}=useTheme()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile=useMediaQuery("(min-width:600px)");
    const isLogin=pageType==="login";
    const isRegister=pageType==="register";

    const register=async(values,onSubmitProps)=>{  // this func sends form data along with the image
        const formData=new FormData();
        for(let value in values){
            formData.append(value,values[value]);
        }
        formData.append('picturePath',values.picture.name);
    
    // FIRST COONECTION TO THE BACKEND
    const savedUserResponse=await fetch(
        "https://social-pixel.onrender.com/auth/register",  // sending the formdata to the backend api
        {
            method:"POST",
            body:formData,
        })
        const savedUser=await savedUserResponse.json();
        onSubmitProps.resetForm(); // after registration reset the form
        if(savedUser){
            setPageType("login");
        }
    }


    const handleFormSubmit=async(values,onSubmitProps)=>{  
        if (isLogin) await login(values, onSubmitProps);   // calling the login function 
        if (isRegister) await register(values, onSubmitProps);   // calling the register function
    }

 // 2 BACKEND CONNECTION
    const login=async(values,onSubmitProps)=>{
        const loggedInResponse=await fetch(     // sending the data of login to backend for authentication
            "https://social-pixel.onrender.com/auth/login",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(values),
            }
        );
        const loggedIn=await loggedInResponse.json();
        onSubmitProps.resetForm();
        if(loggedIn){    // if the user is logged in then we store its state in the redux store
            dispatch(
                setLogin({
                    user:loggedIn.user,
                    token:loggedIn.token,
                })
            )
            navigate("/home");
        }
    }

//in formik you have to first pass all the initial function/objects you have created then formik will pass the function to its default function which will handle the form
return (
    <Formik 
    onSubmit={handleFormSubmit}       
    initialValues={isLogin? initialValuesLogin: initialValuesRegister}  
    validationSchema={isLogin? loginSchema: registerSchema}
    >
     {({       // these are the default functions of formik
        values, 
        errors,
        touched,    // it keeps track of that a field has been visited or not 
        handleBlur,   //It's used to mark the field as "touched" when the user leaves the field
        handleChange,   // updates the value of the field
        handleSubmit,
        setFieldValue,
        resetForm,
     })=>(
      <form onSubmit={handleSubmit}>
        <Box 
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4,minmax(0,1fr)"  /**this divides the whole form into four sections */
        sx={{
            "&> div":{gridColumn: isNonMobile? undefined: "span 4"}  // if the screen size is  samll then the form will be divided into 4 sections else it will be divided into 2 section
        }}>
         {isRegister && (
            <>
        <TextField
            label="First Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            name="firstName"
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            sx={{
             gridColumn:"span 2"    
            }}
        />
        <TextField
            label="Last Name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            name="lastName"
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            sx={{
             gridColumn:"span 2"   
            }}
        />
       <TextField
            label="Location"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.location}
            name="location"
            error={touched.location && Boolean(errors.location)}
            helperText={touched.location && errors.location}
            sx={{
             gridColumn:"span 4"    
            }}
         />
       <TextField
            label="Occupation"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.occupation}
            name="occupation"
            error={touched.occupation && Boolean(errors.occupation)}
            helperText={touched.occupation && errors.occupation}
            sx={{
             gridColumn:"span 4"    
            }}
       />
      <Box 
            gridColumn="span 4"
            border={`1px solid ${palette.neutral.medium}`}
            borderRadius="5px"
            p="1rem">
                <Dropzone     // dropzone is a library that helps in drag and drop of files/picture to upload them
                acceptedFiles=".jpg,.jpeg,.png"
                multiple="false"
                onDrop={(acceptedFiles)=>
                setFieldValue("picture",acceptedFiles[0])}>

                    {({getRootProps,getInputProps})=>(
                        <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        sx={{"& :hover":{cursor:"pointer"}}}
                        >
                            <input {...getInputProps()}/>  
                            {!values.picture ? (
                                <p>Add Picture Here</p>
                            ):(
                                <FlexBetween>
                                    <Typography>{values.picture.name}</Typography>  
                                    <EditOutlinedIcon/> 
                                </FlexBetween>
                            )}
                        </Box>
                    )}
                </Dropzone>
            </Box>
            </>
            )}
        <TextField
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{
             gridColumn:"span 4"    
            }}
        />
        <TextField
            label="Password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            error={touched.password && Boolean(errors.password)}
            helperText={touched.location && errors.password}
            sx={{
             gridColumn:"span 4"    
            }}
        />
        </Box>

        {/**BUTTONS */}
        <Box>
            <Button 
            fullWidth
            type="submit"
            sx={{
                m:"2rem 0",
                p:"1rem",
                backgroundColor:palette.primary.main,
                color: palette.background.alt,
                "&:hover":{backgroundColor:palette.primary.main}
           }}>
                {isLogin ? "LOGIN" : "REGISTER"}
           </Button>


         <Typography
            onClick={()=>{
                setPageType(isLogin ? "register" : "login");
                resetForm();
            }}
            sx={{
                textDecoration:"underline",
                color:palette.primary.main,
                "&:hover":{
                    cursor:"pointer",
                    color: palette.primary.light,
                },
         }}>
                {isLogin ? "Don't have an account? Sign Up here" : "Already have an account? Login here"}
         </Typography>
        </Box>
      </form>
     )}
    </Formik>
)
        };
export default Form;


