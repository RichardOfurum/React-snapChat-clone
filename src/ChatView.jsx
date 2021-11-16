import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import './styles/ChatView.css';
import {selectSelectedImage} from './features/appSlice';
import { useHistory } from 'react-router';
import { CountdownCircleTimer  } from 'react-countdown-circle-timer';

const ChatView = () => {

    const history = useHistory();

    const selectedImage = useSelector(selectSelectedImage);
    const exit = () =>{
        history.replace("/chats");
    }

    useEffect(() => {
        if (!selectedImage) {
            exit();
        }
    }, [selectedImage])

    return (
        <div className="chatView">
            {selectedImage &&
                <img src={selectedImage} onClick={exit} alt="" />   
            }
            
            {selectedImage &&
                    <div className="chatView_timer">
                        <CountdownCircleTimer
                            isPlaying
                            duration={10}
                            strokeWidth={5}
                            size={50}
                            colors={[
                            ['#004777', 0.33],
                            ['#F7B801', 0.33],
                            ['#A30000', 0.33],
                            ]}
                        >

                        {({remainingTime}) => {
                            if (remainingTime === 0) {
                                exit();
                            }
                            return remainingTime;
                        }}

                        </CountdownCircleTimer>  
                    </div>
            }
            
            
        </div>
    )
}

export default ChatView
