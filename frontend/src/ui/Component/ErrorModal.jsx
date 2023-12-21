import { Modal, ModalBody } from 'reactstrap';

function ErrorModal({ error, setError }) {
  return (
    <>
        { error !== null && (
            <Modal isOpen={error !== null} toggle={() => setError(null)}>
                <ModalBody style={{ backgroundColor: 'rgb(243, 216, 218)', color: 'rgb(121, 40, 44)' }}>
                    {error.message}
                </ModalBody>
            </Modal>
            )
        }
    </>
  );
}

export default ErrorModal;