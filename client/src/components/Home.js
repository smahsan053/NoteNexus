import NoteItem from "./NoteItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, getAllNotes } from "../features/note/NoteSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const noteState = useSelector((state) => state.note.notes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submission
    dispatch(addNote(note));
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    dispatch(getAllNotes(note));
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-screen-md text-center">
          <h2 className="mt-20 text-4xl leading-tight font-bold text-teal-600 ">
            Create a New Note
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-screen-md bg-gray-50 shadow-md rounded-lg p-6">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  minLength={5}
                  value={note.title}
                  onChange={onChange}
                  autoComplete="title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  type="text"
                  required
                  minLength={5}
                  onChange={onChange}
                  value={note.description}
                  autoComplete="description"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="tag"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tag
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="tag"
                  name="tag"
                  type="text"
                  required
                  value={note.tag}
                  onChange={onChange}
                  autoComplete="tag"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-24 rounded-md bg-teal-600 py-2 text-sm font-bold text-white shadow-lg hover:bg-teal-500 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Add Note
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-screen-md text-center">
        <h2 className="mt-20 text-4xl leading-tight font-bold text-teal-600 ">
          Your Notes
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {noteState && noteState.length > 0 ? (
          noteState.map((note) => (
            <NoteItem key={note._id} note={note} dispatch={dispatch} />
          ))
        ) : (
          <h4>Your notes will appear here. Add a note to get started.</h4>
        )}
      </div>
    </>
  );
}
