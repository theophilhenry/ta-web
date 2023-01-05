import React from 'react'
import { Modal } from 'react-bootstrap'

function ModalPeraturan() {
  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    return invokeModal(!isShow)
  }
  return (
    <>
      <button className="btn btn-primary" onClick={initModal}>
        <span className='fw-bold'>Frequently Asked Questions</span>
      </button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>FAQ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Apa pengertian dari daun solo, daun nempel, keseluruhan, dan batang?</h6>
          <p>Anda dapat melihat info lebih lanjut dengan menekan tombol info pada halaman utama.</p>

          <h6>Bagaimana cara menggunakan WebCam?</h6>
          <p>Checklist "Use Web Cam" untuk menggunakan webcam sebagai input</p>

          <h6>Apakah seluruh input harus diisi?</h6>
          <p>Tidak, anda dapat mengisi atau mengosongkan tipe manapun. Semakin banyak tipe gambar yang anda isi, diharapkan akurasi semakin meningkat.</p>

          <h6>Resolusi gambar yang harus dikirim?</h6>
          <p>Jika mengirim gambar dari galeri, kirim file dengan rasio 1:1.</p>

          <h6>Hasil prediksi salah</h6>
          <p>Mohon untuk memperhatikan informasi cara foto pada guideline.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={initModal}>
            Tutup
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalPeraturan