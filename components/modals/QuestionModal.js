import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

const QuestionModal = ({ project, register }) => {
  const handleRegister = () => {
    MySwal.fire({
      // title: "Are you sure?",
      html: `Do you want to register <b>${project.name}</b> ?`,
      showCancelButton: true,
      icon: "question",
      cancelButtonTitle: "Cancel",
      cancelButtonColor: "#10b981",
      confirmButtonText: "Yes, register!",
      confirmButtonColor: "#3b82f6",
      didOpen: () => {},
      didClose: () => {},
    }).then(async (result) => {
      if (result.isConfirmed) {
        register();
      }
    });
  };
  return (
    <button
      data-test="edit-button"
      className="font-medium text-blue-600 hover:underline"
      onClick={handleRegister}
    >
      Register
    </button>
  );
};

// export default withSwal(({ swal, project, register }) => (
//   <QuestionModal swal={swal} project={project} register={register} />
// ));

export default QuestionModal;
