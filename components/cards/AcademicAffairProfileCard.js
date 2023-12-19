import { useState, useEffect } from "react";
import { getStudentByTeacher } from "../../services/analysisServices";

const AcademicAffairProfileCard = () => {
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    getTeacherData();
  }, []);

  const getTeacherData = async () => {
    const data = await getStudentByTeacher();
    setTeacherList(data);
  };
  return (
    <div className="bg-white shadow-md rounded-md my-5 mr-5 h-[580px] w-full p-2 overflow-scroll">
      <div className="m-5 text-lg font-semibold">Teacher's Dashboard </div>
      <table className="table m-5 text-base w-[1000px]">
        <thead className="text-base">
          <tr>
            <th className="text-left">Top</th>
            <th>Name</th>
            <th>Personal information</th>
            <th className="text-center">Number of register</th>
          </tr>
        </thead>
        {teacherList &&
          teacherList.map((teacher, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <th>
                    <div>{index + 1}</div>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle avatar rounded-full w-12 h-12">
                          <img
                            src={
                              teacher.avatar ||
                              "https://ecommercenextjs.blob.core.windows.net/ecommerceadmin/1702837258987.png"
                            }
                            alt="Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{teacher.teacherName}</div>
                        <div className="text-sm opacity-50">
                          {teacher.faculty}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {teacher.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {teacher.phone}
                    </span>
                  </td>
                  <td className="text-center text-base font-semibold">
                    {teacher.studentNum > 1
                      ? teacher.studentNum + " students"
                      : teacher.studentNum + " student"}
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default AcademicAffairProfileCard;
