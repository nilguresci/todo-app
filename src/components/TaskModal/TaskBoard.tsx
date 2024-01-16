import Modal from "react-modal";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import style from "./task-modal.module.scss";
import { taskService } from "../../services/task.service";

type Props = {
  modalIsOpen: boolean;
  closeModal: () => void;
  boardId: string;
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

const TaskBoard = (props: Props) => {
  const [taskTitle, setTaskTitle] = useState("");

  const create = () => {
    if (taskTitle.length <= 0) {
      alert("Task title is empty");
      return;
    }

    taskService.createTask({ id: "", title: taskTitle }, props.boardId);
    props.closeModal();
  };

  useEffect(() => {
    return () => {
      setTaskTitle("");
    };
  }, []);

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
    >
      <div className={style.container}>
        <h2>Task Title</h2>
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
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

export default TaskBoard;
