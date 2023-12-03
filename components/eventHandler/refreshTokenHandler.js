import { useSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshTokenHandler = (props) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!!session) {
      const timeRemaining = Math.round(
        session.backEndExp - 30 * 60 - Date.now() / 1000
      );
      props.setInterval(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [session]);

  return null;
};

export default RefreshTokenHandler;
