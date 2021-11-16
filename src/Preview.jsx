import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import "./styles/Preview.css";
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';

import { v4 as uuid } from 'uuid';
import {db, storage} from './firebase';
import firebase from 'firebase';
import { CircularProgress } from '@material-ui/core';
import { selectUser } from './features/appSlice';



const Preview = () => {

    const cameraImage = useSelector(selectCameraImage);
    const history = useHistory();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const user = useSelector(selectUser);

    const closePreview = () => {
        dispatch(resetCameraImage());
        history.replace("/");
    }

    const sendPost = () =>{
        setLoader(true);
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, "data_url");
        uploadTask.on("state_changed", null, (error) =>{
            //Error function
            
            console.log(error)
        }, () =>{
            //Complete function
            storage.ref('posts').child(id).getDownloadURL().then((url) =>{
                db.collection('posts').add({
                    imageUrl: url,
                    username: user.username,
                    read: false,
                    profilePic: user.profilePic,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                history.replace("/chats");
                setLoader(false);
            });
        } );

    }

    useEffect(() => {
        if (!cameraImage) {
            history.replace("/");
        }
    }, [cameraImage, history])
    return (
        <div className="preview">
            <CloseIcon 
                onClick={closePreview}
                className="preview_close"
            />

            <div className="preview_toolbarRight">
                <TextFieldsIcon/> 
                <CreateIcon/>    
                <NoteIcon/>
                <MusicNoteIcon/>
                <AttachFileIcon/>
                <CropIcon/>
                <TimerIcon/>
            </div>

            <img src={cameraImage} alt="" />

            <div
                onClick={sendPost} 
                className="preview_footer"
            >
                <h2>Send Now</h2>
                <SendIcon className="preview_send_icon"/>
            </div>

            {
                loader && <CircularProgress className="preview_upload_progress"/>
            }
            {/* <Alert severity="error">This is an error alert — check it out!</Alert> */}
        </div>
    )
}

export default Preview
