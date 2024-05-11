import { createBrowserRouter } from "react-router-dom";

import { Welcome } from "../pages/Welcome/Welcome";
import {
  CheckCode,
  ForgotPassword,
  Home,
  Login,
  Profile,
  Register,
} from "../pages/User Pages";
import {
  RegisterOrg,
  LoginOrg,
  ForgotPasswordOrg,
  CheckCodeOrg,
  CreateEvent,
  HomeOrg,
  OrganizationProfile,
  EventDetailOrg,
  OrganizationDetail,
} from "../pages/Organization pages";

import {
  Protected,
  ProtectedCheckChildren,
  ProtectedEvents,
  ProtectedOrg,
  ProtectedOrgCheckChildren,
} from "../components";
import App from "../App";
import { WelcomeOrg } from "../pages/WelcomeOrg/WelcomeOrg";
import { EventDetail, EventList } from "../pages/Event Pages";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/org",
        element: <WelcomeOrg />,
      },
      {
        path: "/home",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/check",
        element: (
          <ProtectedCheckChildren>
            <CheckCode />
          </ProtectedCheckChildren>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgotpassword/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "/organizationprofile",
        element: (
          <ProtectedOrg>
            <OrganizationProfile />
          </ProtectedOrg>
        ),
      },
      {
        path: "/eventdetail/:id",
        element: (
          <ProtectedEvents>
            <EventDetail />
          </ProtectedEvents>
        ),
      },
      {
        path: "/createeventorg",
        element: (
          <ProtectedOrg>
            <CreateEvent />
          </ProtectedOrg>
        ),
      },

      {
        path: "/registerorg",
        element: <RegisterOrg />,
      },
      {
        path: "/checkorg",
        element: (
          <ProtectedOrgCheckChildren>
            <CheckCodeOrg />
          </ProtectedOrgCheckChildren>
        ),
      },
      {
        path: "/loginorg",
        element: <LoginOrg />,
      },
      {
        path: "/forgotpassword/forgotpasswordorg",
        element: <ForgotPasswordOrg />,
      },
      {
        path: "/homeorg",
        element: (
          <ProtectedOrg>
            <HomeOrg />
          </ProtectedOrg>
        ),
      },
      {
        path: "/eventdetailorg/:id",
        element: <EventDetailOrg />,
      },
      {
        path: "/eventlist/:name?",
        element: (
          <ProtectedEvents>
            <EventList />
          </ProtectedEvents>
        ),
      },
      {
        path: "/or_ganizationdetail/:id",
        element: (
          <Protected>
            <OrganizationDetail />
          </Protected>
        ),
      },
    ],
  },
]);
