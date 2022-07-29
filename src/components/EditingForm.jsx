import React, { useRef, useState } from "react";
import Modal from "./UI/Modal";
import api from "../api/api";

const EditingForm = ({ id, title, content, onClose, onDelete, onEdit }) => {
  const [formIsValid, setFormIsValid] = useState(true);
  const titleRef = useRef("");
  const contentRef = useRef("");

  const editNoteHandler = async () => {
    title = titleRef.current.value;
    content = contentRef.current.value;

    if (title && content) setFormIsValid(true);
    else {
      setFormIsValid(false);
      return;
    }

    await api.put(`notes/${id}.json`, { id, title, content });
    onEdit();
  };

  return (
    <Modal onClose={onClose}>
      <div className="edit__form">
        <input
          className="title"
          type="text"
          placeholder="Title"
          defaultValue={title}
          ref={titleRef}
        />
        <textarea
          className="content"
          rows="8"
          maxLength="500"
          placeholder="Take a note..."
          defaultValue={content}
          ref={contentRef}
        ></textarea>
        {!formIsValid && (
          <p className="text__error">This Note must not be empty.</p>
        )}
        <div>
          <button type="submit" onClick={editNoteHandler}>
            Edit
          </button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditingForm;
