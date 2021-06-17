import React, { Component } from "react"; 
//import axios from "axios"; 
import {Consumer} from "../../Contexts/PostContext";

class Post extends Component {
    state = {
        name: "", 
        image: "", 
        caption: ""
    }; 

    onChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        }); 
    }; 

    onSubmit = (dispatch, e) => {
        console.log(dispatch)
        e.preventDefault(); 
        const {name, image, caption} = this.state; 
        const newPost = {
            name, 
            image, 
            caption
        }; 
        dispatch({type: "UPLOAD", payload: newPost}); 
    }; 

    render() {
        return (
            <Consumer>
                {(value) => {
                    const {dispatch} = value; 
                    const {name, image, caption} = this.state; 

                    return (
                        <>
                        <h1> POST</h1>
                        <form onSubmit = {this.onSubmit.bind(this, dispatch)}>
                            <label>Name: </label>
                            <input
                                type = "text"
                                value = {name}
                                name = "name"
                                placeholder = "Enter your name"
                                onChange = {this.onChange}
                            />

                            <br/>
                            <br/>

                            <label>Image</label>
                            <input 
                                type = "file"
                                value =  {image}
                                name = "image"
                                placeholder = "Choose your file"
                                onChange = {this.onChange}
                            />

                            <br/>
                            <br/>

                            <label>Caption: </label>
                            <input
                                type = "text"
                                value = {caption}
                                name = "caption"
                                placeholder = "Enter your comments"
                                onChange = {this.onChange}
                            />

                            <input
                                type = "submit"
                                value = "submit"
                            />

                            <br/>
                            <br/>
                                
                        </form>
                        </>
                    ); 
                }}
            </Consumer>
        ); 
    }
}

// class Post extends Component {

//     state = {
//         selectedFile : null
//     }

//     fileSelectedHandler = event => {
//         this.setState({
//             selectedFile: event.target.files[0]
//         })
//     }

//     fileUploadHandler = () => {
//         axios.post(''); 
//     }


//     render() {
//         return (
//             <>
//                 <input 
//                     type = "file"
//                     onChange = {this.fileSelectedHandler}
//                 />

//                 <button
//                     onClick= {this.fileUploadHandler}>
//                     Upload
//                 </button>

//             </>
//         ); 
//     }
// }

// function Post() {
//     const [image,  setImage]  = useState(null); 
//     const [progress,  setProgress]  = useState(0); 
//     const [caption,  setCaption]  = useState(''); 

//     const handleChange = (e) => {
//         if (e.tartget.files[0]) {
//             setImage(e.tartget.files[0]);
//         }
//     }; 

//     const handleUpload = () => {
//         const uploadTask = storage.ref(`images/${image.name}`).put(image); 

//         uploadTask.on(
//             "state_Changed", 
//             (snapshot) => {
//                 //progress function
//                 const progress = Math.round (
//                     (snapshot.bytestTransferred / snapshot.totalBytes) *100
//                 ); 
//                 setProgress(progress); 
//             }
//         )

//     }
//     return (
//         <>
//             <form>
//                 <input type = "text" placeholder="Enter a caption" onChange={event => setCaption(event.target.value)}/>
//                 <input type = "file" onChange={handleChange} />
//                 <button onClick={handleUpload}>
//                     Upload
//                 </button>
//             </form>
//         </>
//     )
// }

export default Post; 