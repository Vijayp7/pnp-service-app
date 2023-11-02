// import { useState, useRef } from "react";

// const mimeType = "audio/mpeg";

// const CallRecord = () => {
// 	const [permission, setPermission] = useState(false);

// 	const mediaRecorder = useRef(null);

// 	const [recordingStatus, setRecordingStatus] = useState("inactive");

// 	const [stream, setStream] = useState(null);

// 	const [audio, setAudio] = useState(null);

// 	const [audioChunks, setAudioChunks] = useState([]);

// 	const getMicrophonePermission = async () => {
// 		if ("MediaRecorder" in window) {
// 			try {
// 				const mediaStream = await navigator.mediaDevices.getUserMedia({
// 					audio: true,
// 					video: false,
// 				});
// 				setPermission(true);
// 				setStream(mediaStream);
// 			} catch (err) {
// 				alert(err.message);
// 			}
// 		} else {
// 			alert("The MediaRecorder API is not supported in your browser.");
// 		}
// 	};

// 	const startRecording = async () => {
// 		setRecordingStatus("recording");
// 		const media = new MediaRecorder(stream, { type: mimeType });

// 		mediaRecorder.current = media;

// 		mediaRecorder.current.start();

// 		let localAudioChunks = [];

// 		mediaRecorder.current.ondataavailable = (event) => {
// 			if (typeof event.data === "undefined") return;
// 			if (event.data.size === 0) return;
// 			localAudioChunks.push(event.data);
// 		};

// 		setAudioChunks(localAudioChunks);
// 	};

// 	const stopRecording = () => {
// 		setRecordingStatus("inactive");
// 		mediaRecorder.current.stop();

// 		mediaRecorder.current.onstop = () => {
// 			const audioBlob = new Blob(audioChunks, { type: mimeType });
// 			const audioUrl = URL.createObjectURL(audioBlob);

// 			setAudio(audioUrl);
//             console.log(audioUrl);
//             console.log(audio)
// 			setAudioChunks([]);
// 		};
// 	};



//     const convertMP3 = (audiofile) =>{
//         HandlingImage.getInstance().handleImagesMethod(event).then((result)=>{
//             if(event.target.files[0].type == 'image/png'){
//               let base64ImageURL = result.replace('data:image/png;base64,','');
//               console.log(base64ImageURL);
              
//             }
//         })
//     };

// 	return (
// 		<div>
// 			<h2>Audio Recorder</h2>
// 			<main>
// 				<div className="audio-controls">
// 					{!permission ? (
// 						<button onClick={getMicrophonePermission} type="button">
// 							Get Microphone
// 						</button>
// 					) : null}
// 					{permission && recordingStatus === "inactive" ? (
// 						<button onClick={startRecording} type="button">
// 							Start Recording
// 						</button>
// 					) : null}
// 					{recordingStatus === "recording" ? (
// 						<button onClick={stopRecording} type="button">
// 							Stop Recording
// 						</button>
// 					) : null}
// 				</div>
// 				{audio ? (
// 					<div className="audio-player">
// 						<audio src={audio} controls></audio>
// 						<a download href={audio} onClick={()=>this.convertMP3(audio)}>
// 							Download Recording
// 						</a>
// 					</div>
// 				) : null}
// 			</main>
// 		</div>
// 	);
// };

// export default CallRecord;





import React, { useState, useEffect } from 'react';

const CallRecording = () => {
  const [recording, setRecording] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    if (recording) {
      // Create a new instance of MediaRecorder with the recording media stream
      const newMediaRecorder = new MediaRecorder(recording);
      setMediaRecorder(newMediaRecorder);
      const chunks = [];

      // Register an event handler for dataavailable event which will fire when recording stops
      newMediaRecorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });

      // Register an event handler for stop event which will fire when recording stops
      newMediaRecorder.addEventListener('stop', () => {
        // Combine all the chunks into a single Blob object
        const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
        setAudioBlob(audioBlob);
      });

      // Start the recording
      newMediaRecorder.start();
    }
  }, [recording]);

  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => setRecording(stream))
      .catch((error) => console.error(error));
  };
  

  const handleStopRecording = () => {
    mediaRecorder.stop();
  };

  const handleSendToApi = () => {
    // Create a new FormData object and append the audioBlob as a file
    const formData = new FormData();
    console.log(audioBlob);
    // const obj ={
    //     "audio" : audioBlob
    // }
    formData.append('audio', audioBlob, 'audio.mp3');
    console.log(formData);

    // Use fetch to send the form data to the API endpoint
    fetch('https://cmschamps.com/pnp-app/api/home/saveAudio', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {audioBlob ? (
        <div>
          <audio src={URL.createObjectURL(audioBlob)} controls />
          <button onClick={handleSendToApi}>Send to API</button>
        </div>
      ) : (
        <div>
          <button onClick={handleStartRecording}>Start recording</button>
          <button onClick={handleStopRecording}>Stop recording</button>
        </div>
      )}
    </div>
  );
};

export default CallRecording;