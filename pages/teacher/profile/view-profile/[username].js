import ProfileCard from "@/components/cards/ProfileCard";
import { useSession } from "next-auth/react";
import { getUserByID } from "@/services/userServices";
import { useEffect, useState } from "react";
import { getProjectOfStudent } from "@/services/studentServices";
import CancelModal from "@/components/modals/CancelModal";
import Meta from "@/components/header/Meta";
import TeacherProfileCard from "@/components/cards/TeacherProfileCard";

const TeacherProfile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  const [projectData, setProjectData] = useState({});

  useEffect(() => {
    const getUser = async () => {
      if (session?.user?.userId) {
        let data = await getUserByID(session?.user.userId);
        setUserData({ ...data, userId: session?.user?.userId });
      }
    };

    const getProject = async () => {
      if (session?.user?.userId) {
        let data = await getProjectOfStudent(session?.user.userId);
        setProjectData(data);
      }
    };

    getUser();
    getProject();
  }, [session]);
  return (
    <>
      <Meta title="My Profile" />
      <div className="bg-slate-50 w-full p-1 flex gap-5">
        <ProfileCard userData={userData} />
        <TeacherProfileCard userData={userData} />
      </div>
    </>
  );
};

export default TeacherProfile;
