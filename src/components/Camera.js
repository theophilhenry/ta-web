import React, { useEffect, useRef, useState } from 'react'

const Cameras = (props) => {
  const [videoDevices, setVideoDevices] = useState([])
  const cameraOptions = useRef()
  const video = useRef()
  const canvas = useRef()
  const play = useRef();
  const screenshot = useRef();
  const video_constraints = {};
  const first_overlay = useRef();
  const second_overlay = useRef();

  const cameraOptionsOnChange = () => {
    const updatedConstraints = {
      video: {
        ...video_constraints,
        deviceId: {
          exact: cameraOptions.current.value
        }
      }
    };
    startStream(updatedConstraints);
  };

  const onPlay = () => {
    if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
      const updatedConstraints = {
        video: {
          ...video_constraints,
          deviceId: {
            exact: cameraOptions.current.value
          }
        }
      };
      startStream(updatedConstraints);
    }
  };

  const submitPicture = () => {
    canvas.current.width = video.current.videoWidth;
    canvas.current.height = video.current.videoHeight;

    var horizontal_start = 0;
    var vertical_start = 0;

    if(canvas.current.width > canvas.current.height) {
      horizontal_start = (canvas.current.width / 2) - (canvas.current.height / 2)
      canvas.current.width = canvas.current.height
    }
    else { 
      vertical_start = (canvas.current.height / 2) - (canvas.current.width / 2)
      canvas.current.height = canvas.current.width 
    }

    // Turns into square
    canvas.current.getContext('2d').drawImage(
      video.current, horizontal_start, vertical_start, 
      canvas.current.width, canvas.current.height, 0, 0, canvas.current.width, canvas.current.height);
    canvas.current.toBlob(function(blob){
      props.storeFiles([{file_data: blob ,preview: URL.createObjectURL(blob)}])
    },'image/png');
    // const submitImage = canvas.current.toDataURL("image/png").replace("image/png", "image/octet-stream");
  };

  const startStream = async (video_constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(video_constraints);
    handleStream(stream);
  };


  const handleStream = (stream) => {
    video.current.srcObject = stream;
    play.current.classList.add('d-none');
    screenshot.current.classList.remove('d-none');
  };

  const getCameraSelection = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    setVideoDevices(devices.filter(device => device.kind === 'videoinput'));
  };

  useEffect(() => {
    getCameraSelection();

    video.current.addEventListener("resize", (ev) => {
      let w = video.current.videoWidth;
      let h = video.current.videoHeight;
    
      if (w && h) {
        if(w > h){
          var horizontal_start = (video.current.videoWidth - video.current.videoHeight) / 2
          var percentage = (horizontal_start / video.current.videoWidth) * 100
          first_overlay.current.style.height = '100%'
          first_overlay.current.style.width = `${percentage}%`
          second_overlay.current.style.height = '100%'
          second_overlay.current.style.width = `${percentage}%`
        } else {
          var vertical_start = (video.current.videoHeight - video.current.videoWidth) / 2
          var percentage = (vertical_start / video.current.videoHeight) * 100
          first_overlay.current.style.width = '100%'
          first_overlay.current.style.height = `${percentage}%`
          second_overlay.current.style.width = '100%'
          second_overlay.current.style.height = `${percentage}%`
        }
      }
    }, false);
  }, []);

  return (
    <div>
      <div className="video-container">
        <div className='square-overlay-first' ref={first_overlay}></div>
        <div className='square-overlay-second' ref={second_overlay}></div>
        <video ref={video} autoPlay></video>
        <canvas ref={canvas} className="d-none"></canvas>
      </div>

      <div className="video-options">
        <select ref={cameraOptions} onChange={cameraOptionsOnChange} className="form-select">
          {
            videoDevices.map((videoDevice, idx) => <option key={idx} value={videoDevice.deviceId}>{videoDevice.label}</option>)
          }
        </select>
        <div className="mt-2 mb-4">
          <button onClick={onPlay} ref={play} className="btn btn-primary play w-100" title="Play"><i data-feather="play-circle"></i> Mulai Camera</button>
          <button className="btn btn-success screenshot d-none w-100" ref={screenshot} title="ScreenShot" onClick={submitPicture}><i data-feather="image"></i>Ambil Gambar</button>
        </div>
      </div>

    </div>
  )
}

export default Cameras