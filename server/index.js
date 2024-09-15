import express from 'express';
import bodyParser from 'body-parser'; // it extracts the entire body portion of an incoming request stream and exposes it on req.body
import mongoose from 'mongoose';
import cors from 'cors';// this is used to enable cross-origin resource sharing(it helps to receive data coming from different domain)
import dotenv from 'dotenv';// this is used to store the configuration of the application in the environment separate from the code(helps to hide essential data)
import multer from 'multer';// this is a middleware used to upload files
import helmet from 'helmet';// this is used to secure the application by setting various HTTP headers
import morgan from 'morgan'; // this is used to log the request details
import path from 'path';  // this is used to get the path of the file
import{fileURLToPath} from 'url'; // this is used to get the path of the file
import authRoutes from './routes/auth.js'; // this is used to import the authRoutes from the routes/auth.js file
import userRoutes from './routes/users.js';   // importing userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js';   // importing postRoutes from './routes/posts.js'
import {register} from './controllers/auth.js'; // this is used to import the register function from auth.js file
import {verifyToken} from './middleware/auth.js'; // this is used to import the verifyToken function from auth.js file
import {createPost} from './controllers/posts.js'; // this is used to import the createPost function from posts.js file
import User from "./models/User.js"; // this is used to import the User model from the User.js file
import Post from "./models/Post.js"; // this is used to import the Post model from the Post.js file
import {users,posts} from "./data/index.js"; // this is used to import the users and posts from the index.js file


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();


app.use(cors({
    origin:"*",
    methods: ["GET","POST","PUT","DELETE"],
}))
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
//app.use(cors());
app.use("/assets",express.static(path.join(__dirname, 'public/assets')));

/*this stores the information uploaded by any user into the public/assets */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage }); // any time we want to upload a file, we use this upload variable

// ROUTE FOR REGISTERING A USER
/* ROUTES  used to upload the files . in this upload.single is middleware*/

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);





// ROUTES FOR LOGIN
app.use('/auth', authRoutes);

// ROUTES FOR USER
app.use("/users",userRoutes);
app.use("/posts",postRoutes);


// MONGOOSE SETUP
const PORT=process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
   // useUnifiedTopology: true, this has been removed from the latest version of mongoose so ignore it
}).then(() => {
   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`); // note that while copying the  mongodb URL into .envfile it should be modified by adding your mongodb password in place of <password> in the URL
   });

   // ADDING THE FAKE DATA ONE TIME
/*    User.insertMany(users);
   Post.insertMany(posts); */
}).catch((err) => {
    console.log(`${err} did not connect`);
});

app.use(express.static(path.join(path.resolve(), '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), '../client/build/index.html'));
});
