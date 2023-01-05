import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Cameras from './components/Camera';
import InputGambar from './components/InputGambar';
import Result from './components/Result';
import ModalGuidePhoto from './components/ModalGuidePhoto';
import ModalPeraturan from './components/ModalPeraturan';
const axios = require("axios").default;

function App() {
  const A = 'Daun Solo'
  const B = 'Daun Nempel'
  const C = 'Keseluruhan'
  const D = 'Batang'

  const [cameraType, setCameraType] = useState('');
  const [useWebCam, setUseWebCam] = useState(false);
  const [loadingPrediction, setloadingPrediction] = useState(false);

  // const [predictionsA, setPredictionsA] = useState([]);
  // const [predictionsB, setPredictionsB] = useState([]);
  // const [predictionsC, setPredictionsC] = useState([]);
  // const [predictionsD, setPredictionsD] = useState([]);
  const [plant, setPlant] = useState({});

  const [filesA, setFilesA] = useState([]);
  const [filesB, setFilesB] = useState([]);
  const [filesC, setFilesC] = useState([]);
  const [filesD, setFilesD] = useState([]);

  const storeFilesA = (file) => { setFilesA([...filesA, ...file]) }
  const storeFilesB = (file) => { setFilesB([...filesB, ...file]) }
  const storeFilesC = (file) => { setFilesC([...filesC, ...file]) }
  const storeFilesD = (file) => { setFilesD([...filesD, ...file]) }

  // const URL = '36.81.111.124'
  const URL = 'localhost'

  const sendFileA = async (selectedFile) => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    let res = await axios({ method: "post", url: `http://${URL}:8000/predict-daun-solo`, data: formData, });
    if (res.status === 200) return res.data
    else return { 'class': 'none', 'confidence': 'none' }
  }
  const sendFileB = async (selectedFile) => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    let res = await axios({ method: "post", url: `http://${URL}:8000/predict-daun-nempel`, data: formData, });
    if (res.status === 200) return res.data
    else return { 'class': 'none', 'confidence': 'none' }
  }
  const sendFileC = async (selectedFile) => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    let res = await axios({ method: "post", url: `http://${URL}:8000/predict-keseluruhan`, data: formData, });
    if (res.status === 200) return res.data
    else return { 'class': 'none', 'confidence': 'none' }
  }
  const sendFileD = async (selectedFile) => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    let res = await axios({ method: "post", url: `http://${URL}:8000/predict-batang`, data: formData, });
    if (res.status === 200) return res.data
    else return { 'class': 'none', 'confidence': 'none' }
  }

  const getPlantInformation = async (plant_name) => {
    let res = await axios({ method: "get", url: `http://${URL}:8000/getPlantByName?nama_umum=` + plant_name });
    if (res.status === 200) return res.data
    else return [{}]
  }

  function majority_vote(predictions) {
    var mapObj = {}
    var maximum_plant = ""
    var maximum_count = 0;
    for (const plant of predictions) {
      if(mapObj[plant] == null) mapObj[plant] = 1
      else mapObj[plant]++;
      if(mapObj[plant] > maximum_count){
        maximum_plant = plant
        maximum_count = mapObj[plant]
      }
    }
    return maximum_plant
  }

  const predictFiles = async () => {
    setloadingPrediction(true)
    var tmp_predictA = []
    var tmp_predictB = []
    var tmp_predictC = []
    var tmp_predictD = []
    for (const file of filesA) {
      const output = await sendFileA(file.file_data)
      tmp_predictA = [...tmp_predictA, { ...file, class_name: output.class, confidence: output.confidence }]
      console.log('Prediction A : ')
      console.log(tmp_predictA)
    }
    for (const file of filesB) {
      const output = await sendFileB(file.file_data)
      tmp_predictB = [...tmp_predictB, { ...file, class_name: output.class, confidence: output.confidence }]
      console.log('Prediction B : ')
      console.log(tmp_predictB)
    }
    for (const file of filesC) {
      const output = await sendFileC(file.file_data)
      tmp_predictC = [...tmp_predictC, { ...file, class_name: output.class, confidence: output.confidence }]
      console.log('Prediction C : ')
      console.log(tmp_predictC)
    }
    for (const file of filesD) {
      const output = await sendFileD(file.file_data)
      tmp_predictD = [...tmp_predictD, { ...file, class_name: output.class, confidence: output.confidence }]
      console.log('Prediction D : ')
      console.log(tmp_predictD)
    }

    const all_prediction = [...tmp_predictA, ...tmp_predictB, ...tmp_predictC, ...tmp_predictD].map((predictions) => {
      return predictions.class_name
    })
    
    // Get a single plant by majority votting all the prediction
    const prediction = majority_vote(all_prediction)

    // Query the database to get the information
    const result = await getPlantInformation(prediction)
    setPlant(result.data[0])
    setloadingPrediction(false)

    setFilesA([])
    setFilesB([])
    setFilesC([])
    setFilesD([])
    setCameraType('')
  }

  const onCameraTypeChanged = function (e) {
    setCameraType(e.currentTarget.value)
  }

  const toggleWebCam = () => {
    setUseWebCam(!useWebCam)
  }

  return (
    <div className='pt-5'>
      <Navbar />
      <main className="container">

        
        { Object.keys(plant).length === 0 ?  
          <>
          <h1 className='mt-5'>Selamat Datang di HerbaScan</h1>
          <p>Aplikasi Pengenalan Tanaman Obat Indonesia Menggunakan Gambar Tanaman!</p>
          <br/>
          <p className='fw-bold'>Gambar yang dapat diterima oleh aplikasi  </p>
          <p className='d-flex align-items-center'>
            Daun Solo &nbsp; 
            <ModalGuidePhoto title="Daun Solo" imageType='daun-solo' caption1="Benar" caption2="Latar Ramai" caption3="Gambar Terpotong" caption4="Terlalu Jauh" caption5="Terlalu Dekat">
              Daun solo merupakan gambar daun yang diletakkan pada lantai dengan warna background putih polos.
            </ModalGuidePhoto>
          </p>
          <p className='d-flex align-items-center'>
            Daun Nempel &nbsp; 
            <ModalGuidePhoto  title="Daun Nempel" imageType='daun-nempel' caption1="Benar" caption2="Salah Angle" caption3="Foto Blur" caption4="Terlalu Jauh" caption5="Terlalu Dekat" >
            Gambar daun tanaman herbal yang masih menempel pada batangnya. Gambar ini digunakan untuk menunjukan bentuk orisinil daun yang tumbuh secara natural.
            </ModalGuidePhoto>
          </p>
          <p className='d-flex align-items-center'>
            Keseluruhan Tanaman &nbsp; 
            <ModalGuidePhoto  title="Keseluruhan Tanaman" imageType='keseluruhan' caption1="Benar" caption2="Foto Blur" caption3="Terlalu Dekat" caption4="Terlalu Gelap" caption5="Terlalu Terang" >
              Gambar tanaman herbal secara keseluruhan untuk memperlihatkan ketinggian tanaman, kepadatan daun, kepadatan ranting/batang, serta struktur tanaman herbal secara garis besar
            </ModalGuidePhoto>
          </p>
          <p className='d-flex align-items-center'>
            Batang &nbsp; 
            <ModalGuidePhoto  title="Batang" imageType='batang' caption1="Benar" caption2="Tertutup Objek Lain" caption3="Fokus ke Objek Lain" caption4="Terlalu Jauh" caption5="Foto Blur" >
            Gambar batang dari tanaman herbal yang menunjukan warna dan tekstur batang dari tanaman tersebut.
            </ModalGuidePhoto>
          </p>

          <ModalPeraturan/>
          
          <div className='mt-5 mb-2'><input type='checkbox' id='useWebCamInput' onChange={toggleWebCam} /> <label for='useWebCamInput'>Use Web Cam</label></div>
          <div className={`p-5 rounded-4 shadow ${useWebCam ? '' : 'd-none'}`}>
            <div className='mb-4'>
              <h2>WebCam</h2>
              <p>Pilih opsi di bawah untuk menggunakan kamera pada website : </p>
              <div>
                <input role={`button`} type="radio" name='prediction_method' value={A} id={A} onChange={onCameraTypeChanged} />
                <label role={`button`} htmlFor={A} className='ms-2'>{A}</label>
              </div>
              <div>
                <input role={`button`} type="radio" name='prediction_method' value={B} id={B} onChange={onCameraTypeChanged} />
                <label role={`button`} htmlFor={B} className='ms-2'>{B}</label>
              </div>
              <div>
                <input role={`button`} type="radio" name='prediction_method' value={C} id={C} onChange={onCameraTypeChanged} />
                <label role={`button`} htmlFor={C} className='ms-2'>{C}</label>
              </div>
              <div>
                <input role={`button`} type="radio" name='prediction_method' value={D} id={D} onChange={onCameraTypeChanged} />
                <label role={`button`} htmlFor={D} className='ms-2'>{D}</label>
              </div>
            </div>
            <div>
              {
                cameraType === A ?
                  <Cameras storeFiles={storeFilesA} /> :
                  cameraType === B ?
                    <Cameras storeFiles={storeFilesB} /> :
                    cameraType === C ?
                      <Cameras storeFiles={storeFilesC} /> :
                      cameraType === D ?
                        <Cameras storeFiles={storeFilesD} /> :
                        <button className={`btn btn-warning w-100 disabled`}>Harap Pilih Pengaturan Sebelum Menggunakan Kamera</button>
              }
            </div>
          </div>
          
          <InputGambar cameraType={A} storeFiles={storeFilesA} files={filesA} clearFiles={() => { setFilesA([]) }} />
          <InputGambar cameraType={B} storeFiles={storeFilesB} files={filesB} clearFiles={() => { setFilesB([]) }} />
          <InputGambar cameraType={C} storeFiles={storeFilesC} files={filesC} clearFiles={() => { setFilesC([]) }} />
          <InputGambar cameraType={D} storeFiles={storeFilesD} files={filesD} clearFiles={() => { setFilesD([]) }} />
  
          <div className='my-4'>
            <button className={`btn btn-primary w-100 ${loadingPrediction && 'disabled'}`} onClick={predictFiles}>{loadingPrediction ? 'Loading ...' : 'Prediksi'}</button>
          </div>
          </>
        : 
          <Result plant={plant} setPlant={setPlant}/>
        }
        
      </main>
      

    </div>
  );
}

export default App;
