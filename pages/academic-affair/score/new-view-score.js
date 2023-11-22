import React from "react";

const NewViewScore = () => {
  return (
    <div className="bg-slate-50 h-screen pt-6">
      <div className="bg-white h-fit mx-20 my-10 border-2 rounded-2xl ">
        <div className="grid grid-cols-12 px-5 py-3">
          <div className="col-span-4 ">
            <div className="font-semibold text-blue-700">
              Tìm hiểu về cách thức hoạt động của chat GPT và ứng dụng thực tiễn
            </div>
            <div>Lê Thanh Trọng</div>
          </div>
          <div className="col-span-1 "> </div>
          <div className="col-span-2 text-gray-500 flex flex-col justify-center ">
            <div>Kĩ thuật phần mềm</div>
            <div>Project Type: 1</div>
          </div>
          <div className="col-span-1 "> </div>
          <div className="col-span-3 flex flex-col justify-center ">
            <div>Nguyen Van A - 21529999</div>
            <div>Nha Giau Chay Pho - 21528888</div>
          </div>
          <div className="col-span-1 flex flex-col justify-center">
            <div className="text-blue-500">score: 10</div>
            <div className="text-blue-500">score: 8</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewViewScore;
