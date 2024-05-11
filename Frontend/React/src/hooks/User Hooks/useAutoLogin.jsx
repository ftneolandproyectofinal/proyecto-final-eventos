import { Navigate } from "react-router-dom";
import { autoLoginUser } from "../../services/user.service";

export const useAutoLogin = async (allUser, userLogin) => {
  try {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { password, email } = allUser?.data?.user;
    const customFormData = {
      email,
      password,
    };

    const sendData = await autoLoginUser(customFormData);

    if (sendData?.status == 200) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const {
        name,
        email,
        image,
        check,
        eventsAttend,
        eventsInterested,
        organizationsFav,
      } = sendData.data.user;
      const userCustom = {
        token: sendData.data.token,
        user: name,
        email,
        image,
        check,
        eventsAttend,
        eventsInterested,
        organizationsFav,
        _id: sendData.data.user._id,
      };

      const stringUser = JSON.stringify(userCustom);
      userLogin(stringUser);
      return <Navigate to="/home" />;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.log(error);
  }
};
