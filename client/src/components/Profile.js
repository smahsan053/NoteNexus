import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../NoteNexus-logo.png";
import { Link } from "react-router-dom";
import { getUser } from "../features/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Profile(props) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    createdAt: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await dispatch(getUser());
      setUserData(response.payload);
    };

    fetchUserData();
  }, [dispatch]);

  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.setOpen(true);
      }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => props.setOpen(true)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                    <div className="flex items-center justify-between ">
                      <div>
                        <Link to="/" className="-m-1.5 p-1.5">
                          <span className="sr-only">NoteNexus</span>
                          <img alt="" src={logo} className="h-24 w-auto" />
                        </Link>
                      </div>
                      <div className="pr-8">
                        <h3 className="text-teal-600 font-bold text-xl flex-nowrap">
                          Welcome {userData.name.split(" ")[0]}!
                        </h3>
                      </div>
                    </div>
                    <hr className="relative -top-6 border-t-2 border-gray-700" />
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <h2 className="text-teal-600 font-bold text-3xl flex-nowrap">
                    Your Details
                  </h2>
                  <div className="flex mt-10 gap-2">
                    <h5 className="inline-block">Full Name:</h5>
                    <span className="inline-block"> {userData.name}</span>
                  </div>
                  <div className="flex mt-10 gap-2">
                    <h5 className="inline-block">Email Address:</h5>
                    <span className="inline-block"> {userData.email}</span>
                  </div>
                  <div className="flex mt-10 gap-2">
                    <h5 className="inline-block">Date of Joining:</h5>
                    <span className="inline-block">
                      {" "}
                      {new Date(userData.createdAt).toDateString()}
                    </span>
                  </div>
                </div>
                <div className="pl-10 pb-10 underline">
                  <Link
                    to="/login"
                    onClick={props.handleLogout}
                    className="-mx-3 block text-xl rounded-lg px-3 py-2.5 leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Logout <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
