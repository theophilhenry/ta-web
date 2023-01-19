import React from 'react'
import { Modal } from 'react-bootstrap'

function ModalGuidePhoto({title, imageType, caption1, caption2, caption3, caption4, caption5, children}) {
  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    return invokeModal(!isShow)
  }
  return (
    <>
      <box-icon type='solid' name="info-circle" className='pointer' color="white" style={{cursor: 'pointer'}} onClick={initModal}></box-icon>
      <Modal show={isShow} className='p-0'>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Guideline {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-black'>
          <h6>{title}</h6>
          <p>{children}</p>
          <h6>Cara Foto</h6>
          <div className='container'>
            <div class='row d-flex justify-content-center'>
              <img alt='guide-tanaman' className='w-50' src={require(`../guidline-photo/${imageType}-1.png`)}/>
              <p className='d-flex justify-content-center align-items-center mt-2 text-success'><box-icon color='green' name='check'></box-icon> {caption1}</p>
            </div>
            <div className='row row-cols-2'>
              <div>
                <img alt='guide-tanaman' className='w-100' src={require(`../guidline-photo/${imageType}-2.png`)}/>
                <p className='d-flex justify-content-center align-items-center mt-2 text-danger'><box-icon color='red' name='x'></box-icon> {caption2}</p>
              </div>
              <div>
                <img alt='guide-tanaman' className='w-100' src={require(`../guidline-photo/${imageType}-3.png`)}/>
                <p className='d-flex justify-content-center align-items-center mt-2 text-danger'><box-icon color='red' name='x'></box-icon> {caption3}</p>
              </div>
              <div>
                <img alt='guide-tanaman' className='w-100' src={require(`../guidline-photo/${imageType}-4.png`)}/>
                <p className='d-flex justify-content-center align-items-center mt-2 text-danger'><box-icon color='red' name='x'></box-icon> {caption4}</p>
              </div>
              <div>
                <img alt='guide-tanaman' className='w-100' src={require(`../guidline-photo/${imageType}-5.png`)}/>
                <p className='d-flex justify-content-center align-items-center mt-2 text-danger'><box-icon color='red' name='x'></box-icon> {caption5}</p>
              </div>
            </div>
          </div>
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
export default ModalGuidePhoto