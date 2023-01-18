import React, { useEffect } from 'react'

const Result = ({plant, setPlant}) => {
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])

  return (
    <>
    <div className='mt-5 mb-2'>
      <img alt="Gambar Tanaman" src={plant.url_gambar} className='w-100'/>
      <h2>{plant.nama_umum}</h2>
      <p dangerouslySetInnerHTML={{__html: plant.nama_daerah}}></p>
    </div>
    <div className='my-2'>
      <h3>Deskripsi Tanaman</h3>
      <p dangerouslySetInnerHTML={{__html: plant.deskripsi}}></p>
    </div>
    <div className='my-2'>
      <h3>Nutrisi</h3>
      <p dangerouslySetInnerHTML={{__html: plant.nutrisi}}></p>
    </div>
    <div className='my-2'>
      <h3>Manfaat (Mencegah)</h3>
      <p dangerouslySetInnerHTML={{__html: plant.manfaat_mencegah}}></p>
    </div>
    <div className='my-2'>
      <h3>Manfaat (Meredakan)</h3>
      <p dangerouslySetInnerHTML={{__html: plant.manfaat_meredakan}}></p>
    </div>
    <div className='my-2'>
      <h3>Cerita Dibalik Penamaan</h3>
      <p dangerouslySetInnerHTML={{__html: plant.cerita_penamaan}}></p>
    </div>
    <div className='my-2'>
      <h3>Fun Fact</h3>
      <p dangerouslySetInnerHTML={{__html: plant.fun_fact}}></p>
    </div>
    <div className='my-2'>
      <h3>Sumber</h3>
      <p dangerouslySetInnerHTML={{__html: 
        plant.sumber
          .split('http')
          .map((sumber) => {
            var regexMatch = `http${sumber}`.match(/http.?:\/\/([\w\.]*)/);
            console.log(regexMatch);
            if (sumber){
              if (regexMatch) {
                return `<p><a href='http${sumber}'>${regexMatch[1]}</a></p>`
              } else {
                return `<p>${sumber}</p>`
              }
          }else return ""
          })
          .join('')}}></p>
    </div>

    <div className='my-4'>
      <button className='btn btn-danger w-100' onClick={() => {setPlant({})}}>Kembali</button>
    </div>
    </>
  )
}

export default Result