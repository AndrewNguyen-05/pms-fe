import { useState, useEffect } from "react";
import CancelModal from "../modals/CancelModal";
import Spinner from "../Spinner";
import axios from "axios";
import { updateUserData } from "@/services/userServices";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const EditProfileCard = ({ userData }) => {
  console.log(">>> check userData", userData);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState("");

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages(res.data.links);
      console.log(">>>> res.data.links", res.data.links);
      setIsUploading(false);
    }
  }
  //get data
  useEffect(() => {
    if (userData) {
      getUserData();
      console.log(">>> check data", userData.username);
    }
  }, [userData]);

  const getUserData = () => {
    setEmail(userData?.User?.email);
    setUsername(userData?.username);
    setPhone(userData?.User?.phone);
    setDateOfBirth(userData?.User?.dateOfBirth.slice(0, 10));
    setImages([userData?.User?.avatarLink]);
  };

  const handleUpdateUser = async () => {
    let data = {
      username,
      email,
      phone,
      dateOfBirth,
      avatarLink: images[0],
    };
    console.log(">>> check data", data);
    const res = await updateUserData(userData?.userId, data);
    let serverData = res.data;
    if (+serverData.EC === 0) {
      toast.success(serverData.EM);
      router.push("/student/profile/view-profile");
    } else {
      toast.error(serverData.EM);
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-md my-5 mr-5 w-full p-2">
        <div className="mt-2 mx-5 pb-2 border-b-2 text-2xl">Edit profile</div>
        <div className="mx-5 mt-5">
          <div className="grid grid-cols-4">
            <div className="col-span-3 flex flex-col gap-1">
              <div>
                <div className="font-semibold">Name</div>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md my-2 p-2 w-11/12 hover:disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={userData?.role === "student" ? true : false}
                  defaultValue={userData?.User?.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <div className="font-semibold">Username</div>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md my-2 p-2 w-11/12"
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="w-11/12 grid grid-cols-2 gap-5 justify-between">
                <div>
                  <div className="font-semibold">Phone number</div>
                  <input
                    type="text"
                    className="bg-gray-100 rounded-md my-2 p-2 w-full"
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <div className="font-semibold">Date of birth</div>
                  <input
                    type="date"
                    className="bg-gray-100 rounded-md my-2 p-2 w-full"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="font-semibold">Email address</div>
                <input
                  type="text"
                  className="bg-gray-100 rounded-md my-2 p-2 w-11/12"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                {userData?.role === "student" ? (
                  <div className="font-semibold">Major</div>
                ) : (
                  <div className="font-semibold">Faculty</div>
                )}
                <input
                  className="bg-gray-100 rounded-md my-2 p-2 w-11/12 hover:disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={true}
                  value={
                    userData?.role === "student"
                      ? userData?.major
                      : userData?.faculty
                  }
                />
              </div>
              <div className="flex gap-2 justify-end w-11/12">
                <button
                  onClick={handleUpdateUser}
                  className="w-[90px] border-2 text-base border-blue-700 px-5 py-2.5 mt-4 shadow-md text-blue-600 bg-white hover:text-white hover:bg-blue-600 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg focus:outline-none flex items-center justify-center gap-3"
                >
                  Save
                </button>
                <CancelModal
                  content="You will lost all your unsaved works!"
                  hrefConfirm={
                    userData?.role === "student"
                      ? `/student/profile/view-profile/`
                      : userData?.role === "teacher"
                      ? `/teacher/profile/view-profile/`
                      : `/aa/profile/view-profile/`
                  }
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="font-semibold mb-2">Profile picture</div>
              <div className="avatar flex flex-col">
                <div className="w-52 rounded-full mb-2">
                  {isUploading && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Spinner />
                    </div>
                  )}
                  <img src={images} />
                </div>
              </div>
              <label
                htmlFor="fileUpload"
                className="px-3 py-1 bg-white text-blue-700 border-2 border-blue-600 hover:bg-blue-600 hover:text-white shadow-md rounded-md cursor-pointer  overflow-hidden"
              >
                Choose Image
              </label>
              <input
                type="file"
                id="fileUpload"
                onChange={uploadImages}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileCard;
