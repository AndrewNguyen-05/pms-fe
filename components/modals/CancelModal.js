import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MySwal = withReactContent(Swal);

const CancelModal = ({ hrefConfirm, text, title, content, disabled }) => {
  const [cancelText, setCancelText] = useState("Cancel");
  const [cancelTitle, setCancelTitle] = useState("Are you sure want to quit?");
  const [cancleContent, setCancelContent] = useState(
    "You will lost all your unsaved work!"
  );
  const [disabledBtn, setDisabledBtn] = useState(false);
  const router = useRouter();
  const handleCancel = () => {
    MySwal.fire({
      title: cancelTitle,
      text: cancleContent,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'm sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(hrefConfirm);
      }
    });
  };
  useEffect(() => {
    if (text) setCancelText(text);
    if (title) setCancelTitle(title);
    if (content) setCancelContent(content);
    if (disabled) setDisabledBtn(disabled);
  }, [text, title, content]);

  return (
    <button
      className="items-center disabled:border-gray-300 disabled:text-gray-300 hover:disabled:bg-gray-200 hover:disabled:text-white px-5 py-2.5 mt-4 text-base font-medium border-2 border-red-600 text-center text-red-600 bg-white rounded-lg focus:ring-2 focus:ring-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
      onClick={handleCancel}
      disabled={disabledBtn}
    >
      {cancelText}
    </button>
  );
};

export default CancelModal;
