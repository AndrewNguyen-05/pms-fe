import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

const MySwal = withReactContent(Swal);

const CancelModal = ({ hrefConfirm }) => {
  const router = useRouter();
  const handleCancel = () => {
    MySwal.fire({
      title: "Are you sure want to quit?",
      text: "You will lost all your unsaved work!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I quit!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(hrefConfirm);
      }
    });
  };

  return (
    <button
      className="items-center px-5 py-2.5 mt-4 text-base font-medium border-2 border-red-600 text-center text-red-600 bg-white rounded-lg focus:ring-2 focus:ring-red-200 hover:bg-red-600 hover:text-white hover:border-red-600"
      onClick={handleCancel}
    >
      Cancel
    </button>
  );
};

export default CancelModal;
