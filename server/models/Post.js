import mongoose from 'mongoose'; 

const postSchema = mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes:{
        type:Map,  /// it is special kind of data store that multiple map objects
        of:Boolean  //if any user liked then its id will be stored in the map with boolean value true
    },
    comments:{
        type:Array,
        default:[],
    }
},{timestamps:true});

const Post = mongoose.model('Post',postSchema);
export default Post;