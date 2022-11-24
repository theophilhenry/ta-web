import React from 'react'

const PredictionResult = (props) => {
  return (
    <div>
      Hasil Prediksi
      <br/>
      {
        props.predictions.map((file, idx) => 
          <UploadImageCard key={idx}>
            <img src={file.preview} />
            {file.class_name}<br/>
            {file.confidence}
          </UploadImageCard>
      )}
    </div>
  )
}

export default PredictionResult