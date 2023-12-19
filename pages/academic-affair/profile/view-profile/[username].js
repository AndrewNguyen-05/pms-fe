import ProfileCard from "@/components/cards/ProfileCard";
import { useSession } from "next-auth/react";
import { getUserByID } from "@/services/userServices";
import { useEffect, useState } from "react";
import { getProjectOfStudent } from "@/services/studentServices";
import CancelModal from "@/components/modals/CancelModal";
import Meta from "@/components/header/Meta";
import AcademicAffairProfileCard from "@/components/cards/AcademicAffairProfileCard";

const AcademicAffairProfile = () => {
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
        <AcademicAffairProfileCard />
      </div>
    </>
  );
};

export default AcademicAffairProfile;
