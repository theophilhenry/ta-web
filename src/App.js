import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Cameras from './components/Camera';
import InputGambar from './components/InputGambar';
const axios = require("axios").default;

function App() {
  const [predictionMethod, setPredictionMethod] = useState('');

  const [predictionsA, setPredictionsA] = useState([]);
  const [predictionsB, setPredictionsB] = useState([]);

  const [filesA, setFilesA] = useState([]);
  const [filesB, setFilesB] = useState([]);
  const [filesC, setFilesC] = useState([]);
  const [filesD, setFilesD] = useState([]);

  const storeFilesA = (file) => {setFilesA([...filesA, ...file])}
  const clearFilesA = () => {setFilesA([])}

  const storeFilesB = (file) => {setFilesB([...filesB, ...file])}
  const clearFilesB = () => {setFilesB([])}

  const storeFilesC = (file) => {setFilesC([...filesC, ...file])}
  const clearFilesC = () => {setFilesC([])}

  const storeFilesD = (file) => {setFilesD([...filesD, ...file])}
  const clearFilesD = () => {setFilesD([])}

  const A = 'Daun Solo'
  const B = 'Daun Tempel'
  const C = 'Keseluruhan'
  const D = 'Batang'

  const sendFile = async (selectedFile) => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    let res = await axios({method: "post",url: "http://localhost:8000/predict",data: formData,});
    if (res.status === 200) return res.data
    else return {'class': 'none', 'confidence': 'none'}
  }

  const predictFiles = async () => {
    var tmp_predictA = []
    var tmp_predictB = []
    var tmp_predictC = []
    var tmp_predictD = []
    for (const file of filesA) {
      const output = await sendFile(file.file_data)
      tmp_predictA = [...tmp_predictA, {...file, class_name: output.class, confidence: output.confidence}]
    }
    for (const file of filesB) {
      const output = await sendFile(file.file_data)
      tmp_predictB = [...tmp_predictB, {...file, class_name: output.class, confidence: output.confidence}]
    }
    for (const file of filesC) {
      const output = await sendFile(file.file_data)
      tmp_predictC = [...tmp_predictC, {...file, class_name: output.class, confidence: output.confidence}]
    }
    for (const file of filesD) {
      const output = await sendFile(file.file_data)
      tmp_predictD = [...tmp_predictD, {...file, class_name: output.class, confidence: output.confidence}]
    }

    setFilesA([])
    setFilesB([])
    setFilesC([])
    setFilesD([])
    setPredictionsA(tmp_predictA)
    setPredictionsB(tmp_predictB)
  }

  const onPredictionMethodChanged = function (e) {
    setPredictionMethod(e.currentTarget.value)
  }

  return (
    <div className='pt-5'>
      <Navbar />
      <main className="container">
  

          <div className='my-5'>
            <h2>Tipe Gambar</h2>
            <p>Pilih tipe gambar yang akan diambil dalam camera input : </p>
            <div>
              <input role={`button`} type="radio" name='prediction_method' value={A} id={A} onChange={onPredictionMethodChanged} />
              <label role={`button`} htmlFor={A} className='ms-2'>{A}</label>
            </div>
            <div>
              <input role={`button`} type="radio" name='prediction_method' value={B} id={B} onChange={onPredictionMethodChanged} />
              <label role={`button`} htmlFor={B} className='ms-2'>{B}</label>
            </div>
            <div>
              <input role={`button`} type="radio" name='prediction_method' value={C} id={C} onChange={onPredictionMethodChanged} />
              <label role={`button`} htmlFor={C} className='ms-2'>{C}</label>
            </div>
            <div>
              <input role={`button`} type="radio" name='prediction_method' value={D} id={D} onChange={onPredictionMethodChanged} />
              <label role={`button`} htmlFor={D} className='ms-2'>{D}</label>
            </div>
          </div>
          
          <div className='my-5'>
            <h2>Camera Input {predictionMethod}</h2>
            {
              predictionMethod == A ? 
              <Cameras storeFiles={storeFilesA} /> :
              predictionMethod == B ? 
              <Cameras storeFiles={storeFilesB}  /> :
              predictionMethod == C ? 
              <Cameras storeFiles={storeFilesC}  /> :
              predictionMethod == D ? 
              <Cameras storeFiles={storeFilesD}  /> :
              <button className={`btn btn-warning w-100 disabled`}>Harap Pilih Pengaturan</button>
            }
          </div>

          <InputGambar predictionMethod={A} storeFiles={storeFilesA} files={filesA} clearFiles={clearFilesA} />
          <InputGambar predictionMethod={B} storeFiles={storeFilesB} files={filesB} clearFiles={clearFilesB} />
          <InputGambar predictionMethod={C} storeFiles={storeFilesC} files={filesC} clearFiles={clearFilesC} />
          <InputGambar predictionMethod={D} storeFiles={storeFilesD} files={filesD} clearFiles={clearFilesD} />

          <div className='my-4'>
            <button className='btn btn-primary w-100' onClick={predictFiles}>Predict</button>
          </div>
      </main>
    </div>
  );
}

export default App;
