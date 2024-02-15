import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

// context
import { UserProvider } from "./Hooks/UserContext";

// components
import Loading from "./Components/Layouts/Loading";
// layouts
import AppLayout from "./Components/Layouts/AppLayout";
import Layout from "./Components/Layouts/Layout";
import Dash from "./Components/Layouts/Dash";
import ErrorElement from "./Components/Layouts/ErrorElement";
import RegisterLayout from "./Components/Layouts/RegisterLayout";

// queries
import Group from "./Components/Queries/Group";
import Notes from "./Components/Queries/Notes";
import StudentsList from "./Components/Queries/StudentsList";
import Profile from "./Components/Queries/Profile";

// forms
import TeacherForm from "./Components/Forms/TeacherForm";
import StudentForm from "./Components/Forms/StudentForm";
import NotesForm from "./Components/Forms/NotesForm";
import Login from "./Components/Forms/Login";

// lazy loading user specific components
const GroupForm = lazy(() => import("./Components/Forms/GroupForm"));
const JoinGroup = lazy(() => import("./Components/Forms/JoinGroup"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />} errorElement={<ErrorElement />}>
        <Route index element={<Login />} />
        <Route path="/register" element={<RegisterLayout />}>
          <Route path="reg_teacher" element={<TeacherForm />} />
          <Route path="reg_student" element={<StudentForm />} />
        </Route>
        <Route
          path="/dash"
          element={<Layout />}
          errorElement={<ErrorElement />}
        >
          <Route index element={<Dash />} />
          <Route path="group" element={<Group />} />
          <Route path="group/:group" element={<Notes />} />
          <Route path="group/:group/add" element={<NotesForm />} />
          <Route path="group/:group/:note/edit" element={<NotesForm />} />
          <Route path="group/:group/students" element={<StudentsList />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="add_group"
            element={
              <Suspense fallback={<Loading />}>
                <GroupForm />
              </Suspense>
            }
          />
          <Route
            path="join_group"
            element={
              <Suspense fallback={<Loading />}>
                <JoinGroup />
              </Suspense>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer
        className="toast"
        toastClassName="toast-rounded"
        bodyClassName="toast-body"
        // progressClassName="toast-progress"
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        hideProgressBar={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UserProvider>
  );
}

export default App;
