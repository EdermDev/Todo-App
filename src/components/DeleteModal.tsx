import { Modal, Button } from "keep-react";
import { toast } from "sonner";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteAllTodos: () => void;
}
function DeleteModal({ showModal, setShowModal, deleteAllTodos }: Props) {
  const onClickDeleteModal = () => {
    setShowModal(!showModal);
  };
  const handleDelete = () => {
    deleteAllTodos();
    setShowModal(!showModal);
    toast.success("Todas las tareas se han eliminado");
  };

  return (
    <>
      <Modal size="md" show={showModal} onClose={onClickDeleteModal}>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-body-4 leading-relaxed text-metal-800 font-semibold">
              ¿Estas seguro que quieres eliminar todas las tareas?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center justify-center w-full gap-x-2">
            <Button size={"xs"} type="outlineGray" onClick={onClickDeleteModal}>
              Cancelar
            </Button>
            <Button
              size={"xs"}
              type="primary"
              color="error"
              onClick={() => handleDelete()}
            >
              Eliminar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
