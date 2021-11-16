import { Avatar } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import React from 'react'
import ReactTimeago from 'react-timeago';
import "./styles/Chat.css";
import { useDispatch } from 'react-redux';
import { selectImage } from './features/appSlice';
import {db} from './firebase';
import { useHistory } from 'react-router';

const Chat = ({id, username, timestamp, imageUrl, read, profilePic}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const open = () =>{
        if(!read){
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).update({
                read: true,
            },
             {merge: true}
            );

            history.push('/chat/view');
        }
    }

    return (
        <div
            onClick={open} 
            className="chat"
        >
            <Avatar src={profilePic} className="chat_avater"/>
            <div className="chat_info">
                <h4>{username}</h4>
                <p>{!read && 'Tap to view -'}  <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /> </p>

            </div>
            {!read && <StopIcon className="chat_readIcon"/>}
        </div>
    )
}

export default Chat
