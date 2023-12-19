import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { unregisterProject } from "@/services/projectServices";

const MySwal = withReactContent(Swal);

const CancelModal = ({
  hrefConfirm,
  text = "Cancel",
  title = "Are you sure?",
  content = "You won't be able to revert this!",
  disabled,
  isCancelRegister = false,
  projectId,
  studentId,
}) => {
  const router = useRouter();
  const handleCancel = () => {
    MySwal.fire({
      title: title,
      text: content,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'm sure!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (isCancelRegister) {
          await unregisterProject(projectId, studentId);
          MySwal.fire({
            icon: "success",
            title: "Unregister successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          router.push(hrefConfirm);
        } else {
          router.push(hrefConfirm);
        }
      }
    });
  };

  return (
    <button
      className="items-center disabled:border-gray-300 disabled:text-gray-300 hover:disabled:bg-gray-200 hover:disabled:text-white px-5 py-2.5 mt-4 text-base font-medium border-2 border-red-600 text-center text-red-600 bg-white rounded-lg focus:ring-2 focus:ring-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
      onClick={handleCancel}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CancelModal;
