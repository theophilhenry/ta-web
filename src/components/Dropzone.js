import React from 'react';
import {useDropzone} from 'react-dropzone';
import StyledDropzone from './StyledDropzone'

const Dropzone = (props) => { 
  const onDrop = (acceptedFiles) => {
    const mappedFiles = acceptedFiles.map((file) => {
        return {file_data: file ,preview: URL.createObjectURL(file),}
    })
    props.storeFiles(mappedFiles)
  }

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: {'image/jpeg': [],'image/png': []}, onDrop});

  return (
    <section>
      <StyledDropzone {...getRootProps({ className: 'dropzone', isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Tekan Disini untuk Menambahkan File</p>
        <em>(Hanya menerima format *.jpeg and *.png)</em>
      </StyledDropzone>
    </section>
  );
}

export default Dropzone;