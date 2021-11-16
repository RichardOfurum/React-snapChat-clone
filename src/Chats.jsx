import { Avatar } from '@material-ui/core';
import React , {useState, useEffect} from 'react'
import './styles/Chats.css';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import {db} from './firebase';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { logout, selectUser } from './features/appSlice';
import {auth} from './firebase';
import { useDispatch } from 'react-redux';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router';
import { resetCameraImage } from './features/cameraSlice';

const Chats = () => {

    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const  dispatch = useDispatch();
    const history = useHistory();

    const signOut = () =>{
        auth.signOut();
        dispatch(logout);
    }

    const takeSnap = (e) => {
        dispatch(resetCameraImage());
        e.stopPropagation();
        history.push("/");
    }

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        });
    }, [posts])

    return (
        <div className="chats">
            <div className="chats_header">
                <Avatar 
                    onClick={signOut}
                    src={user.profilePic} 
                    className="chats_avatar"
                />

                <div className="chats_search">
                    <SearchIcon className="chats_chatIcon"/>
                    <input placeholder="Friends" type="text" />
                </div>
                <ChatBubbleIcon className="chats_chatIcon"/>
            </div>

            <div className="chat_posts">
                {
                    posts.map(({id, data:{profilePic, username, timestamp, imageUrl, read},}) => (
                        <Chat
                            key={id}
                            id={id}
                            username={username}
                            timestamp={timestamp}
                            imageUrl={imageUrl}
                            read={read}
                            profilePic={profilePic}
                        />
                    ))
                }
            </div>
            <RadioButtonUncheckedIcon
                onClick={takeSnap}
                fontSize='large'
                className="chats_takePicIcon"
            />
        </div>
    )
}

export default Chats