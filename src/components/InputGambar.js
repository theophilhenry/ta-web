import React from 'react'
import Dropzone from './Dropzone'
import UploadImageCard from './UploadImageCard'

const InputGambar = (props) => {
  return (
    <div className='my-5 p-4 rounded-3 shadow'>
      <h2 className='my-4 fw-light d-flex justify-content-center'>Input Gambar {props.cameraType}</h2>
      <Dropzone storeFiles={props.storeFiles} files={props.files} clearFile={props.clearFiles} />
      <hr/>
      <h4 className='my-4 d-flex justify-content-between'><span>Hasil {props.cameraType}</span> <button className='btn btn-danger' onClick={props.clearFiles}>Hapus Gambar</button></h4>
      <aside>
        {props.files.map((file, idx) => 
          <UploadImageCard key={idx}>
            <img src={file.preview} alt='captured_images'/>
            <p className='badge bg-primary'>{file.file_data.type}</p>
          </UploadImageCard>)}
      </aside>
        
    </div>
  )
}

export default InputGambar