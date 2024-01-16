import Modal from "react-modal";
import style from "./board-modal.module.scss";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { boardService } from "../../services/board.service";

type Props = {
  modalIsOpen: boolean;
  closeModal: () => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const BoardModal = (props: Props) => {
  const [boardName, setBoardName] = useState("");

  const create = () => {
    if (boardName.length <= 0) {
      alert("Board name is empty");
      return;
    }

    boardService.createBoard({
      id: "",
      tasks: [],
      title: boardName,
    });
    props.closeModal();
  };

  useEffect(() => {
    return () => {
      setBoardName("");
    };
  }, []);

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
    >
      <div className={style.container}>
        <h2>Board Name</h2>
        <input
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
        <button className={style.button} onClick={() => create()}>
          Create
        </button>
      </div>
      <button className={style.closeButton} onClick={() => props.closeModal()}>
        <IoMdClose />
      </button>
    </Modal>
  );
};

export default BoardModal;
