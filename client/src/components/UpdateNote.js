import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState, useRef } from "react";
import { updateNote } from "../features/note/NoteSlice";
import { useDispatch } from "react-redux";

export default function UpdateNote(props) {
  const [note, setNote] = useState({
    title: props.note.title,
    description: props.note.description,
    tag: props.note.tag,
    _id: props.note._id,
  });
  const dispatch = useDispatch();
  const ref = useRef(null);
  const onChange = (e) => {
    // console.log(note);
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    // console.log(note);
    e.preventDefault();
    dispatch(updateNote(note));
    props.setOpen(false);
    ref.current.click();
  };
  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <form
                action="#"
                method="PUT"
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
                      minLength={3}
                      value={note.title}
                      onChange={onChange}
                      autoComplete="title"
                      aria-label="Title"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
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
                      aria-label="Description"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="tag"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tag
                  </label>
                  <div className="mt-2">
                    <input
                      id="tag"
                      name="tag"
                      type="text"
                      required
                      aria-label="Tag"
                      value={note.tag}
                      autoComplete="tag"
                      onChange={onChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="hidden none w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                ref={ref}
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
              >
                Update Note
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => props.setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
