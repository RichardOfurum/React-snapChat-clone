import React, {useRef, useCallback} from 'react';
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from "react-router-dom";
import "./styles/WebcamCapture.css";
import CloseIcon from '@material-ui/icons/Close';


const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
}




const WebcamCapture = () => {

    const webcamRef = useRef(null);
    const dispactch = useDispatch();
    let history = useHistory();

    const capture = useCallback((e) =>{
        e.stopPropagation();
        const imageSrc = webcamRef.current.getScreenshot();
        dispactch(setCameraImage(imageSrc));
        history.push("/preview");
    },[webcamRef]);

    const closeWebCam = () =>{
        history.push('/chats');
    }
    

    return (
        <div className="webcamCapture">
            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />

            <CloseIcon 
                onClick={closeWebCam}
                className="view_webCam"
            />
            
            <RadioButtonUncheckedIcon
                onClick={capture}
                className="webcamCapture_button"
                fontSize="large"
            />
                
        </div>
    )
}

export default WebcamCapture
