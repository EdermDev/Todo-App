import { Modal, Button, Textarea } from "keep-react";
import { useEffect, useState } from "react";
import { type Todo } from "../types";
import Edit from "./icons/Edit";
import { toast } from "sonner";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  todo: Todo;
  editTodo: ({ text, id }: { text: string; id: number }) => void;
}
function EditModal({ showModal, setShowModal, todo, editTodo }: Props) {
  const [inputValue, setInputValue] = useState(todo.text);

  useEffect(() => {
    setInputValue(todo.text);
  }, [todo]);

  const handleEdit = () => {
    if (inputValue === "") return;
    editTodo({
      text: inputValue,
      id: todo.id,
    });
    setShowModal(!showModal);
    toast.success("La tarea se ha editado");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Modal
        size="md"
        style={{ background: "black !important" }}
        show={showModal}
        position="center"
        onClose={handleCloseModal}
        icon={<Edit width={24} height={24} />}
      >
        <Modal.Header>Editar tarea</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-body-5 md:text-body-4 leading-relaxed text-metal-500">
              Aqui puedes editar la tarea con un texto nuevo.
            </p>
            <Textarea
              className="resize-none"
              id="comment"
              rows={4}
              value={inputValue}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size={"xs"} type="outlineGray" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button size={"xs"} type="primary" onClick={handleEdit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
