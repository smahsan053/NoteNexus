import React, { useState } from "react";
import deleteIcon from "../deleteIcon.png";
import editIcon from "../editIcon.png";
// import { useDispatch } from "react-redux";
import { deleteNote, updateNote } from "../features/note/NoteSlice";
import UpdateNote from "./UpdateNote";

const NoteItem = (props) => {
  const [open, setOpen] = useState(false);
  const { note } = props;
  const handleDeleteNote = () => {
    props.dispatch(deleteNote(note._id));
  };
  const handleUpdateNote = () => {
    props.dispatch(updateNote(note));
    setOpen(true);
  };
  return (
    <div className="flex py-6 w-full sm:w-1/2 lg:w-1/4 justify-center">
      <div className="rounded overflow-hidden shadow-lg w-full max-w-xs">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{note.title}</div>
          <div className="flex justify-between">
            <img
              className="h-6 w-6 transition-transform transform hover:scale-110 active:scale-90 cursor-pointer"
              src={deleteIcon}
              alt="Delete"
              onClick={handleDeleteNote}
            />
            <img
              className="h-6 w-6 transition-transform transform hover:scale-110 active:scale-90 cursor-pointer"
              src={editIcon}
              alt="Edit"
              onClick={handleUpdateNote}
            />
            {open && <UpdateNote open={open} setOpen={setOpen} note={note} />}
          </div>
          <p className="text-gray-700 text-base mt-4">{note.description}</p>
        </div>
        <div className="px-6 pb-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            #{note.tag}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
