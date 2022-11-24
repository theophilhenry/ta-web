import React from 'react'
import Dropzone from './Dropzone'
import UploadImageCard from './UploadImageCard'

const InputGambar = (props) => {
  return (
    <div className='my-5 p-4 input-gambar rounded-2'>
      <h2>Input Gambar {props.predictionMethod}</h2>
      <Dropzone storeFiles={props.storeFiles} files={props.files} clearFile={props.clearFiles} />
      <h2 className='my-4'>Gambar {props.predictionMethod} yang telah diambil</h2>
      <aside>
        {props.files.map((file, idx) => 
          <UploadImageCard key={idx}>
            <img src={file.preview} alt='captured_images'/>
            <p className='badge bg-primary'>{file.file_data.type}</p>
          </UploadImageCard>)}
      </aside>
      <div>
        <button className='btn btn-danger w-100 mb-4' onClick={props.clearFiles}>Hapus Gambar</button>
      </div>
    </div>
  )
}

export default InputGambar