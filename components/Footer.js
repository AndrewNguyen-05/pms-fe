import ReactPaginate from "react-paginate";

const Footer = ({ totalPage, handlePageClick }) => {
  return (
    <>
      <ReactPaginate
        pageCount={totalPage}
        marginPagesDisplayed={0}
        pageRangeDisplayed={10}
        onPageChange={handlePageClick}
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        pageLinkClassName="flex items-center justify-center leading-tight px-3 h-8"
        previousClassName="text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-3xl hover:bg-gray-100 hover:text-gray-700"
        previousLinkClassName="flex items-center justify-center px-3 h-8 ms-0 leading-tight "
        nextClassName="text-gray-500 bg-white border border-gray-300 rounded-e-3xl hover:bg-gray-100 hover:text-gray-700"
        nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight"
        breakLabel="..."
        breakClassName="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
        breakLinkClassName="flex items-center justify-center leading-tight px-3 h-8"
        containerClassName="pagination"
        activeClassName="text-blue-600 border border-gray-300 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 "
        activeLinkClassName="bg-blue-600 flex items-center justify-center leading-tight px-3 h-8 text-white font-semibold "
        renderOnZeroPageCount={null}
        disabledClassName="opacity-50"
        className="inline-flex"
      />
    </>
  );
};

export default Footer;
