import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";

const GroupForm = () => {
  const { user } = useContext(UserContext);
  const [newGroup, setNewGroup] = useState({
    // department: user.department,
    group: "",
    // year: "2023",
    students: [],
    // semester: "Select Semester",
    teacher: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch teachers
  useEffect(() => {
    const getTeachers = async () => {
      const list = await axios.get("/teacher/list/" + user.department);
      setTeachers(list.data.slice(1));
    };
    getTeachers();
  }, [user]);

  const createGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("group", JSON.stringify(newGroup));
      navigate("./..");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  const handleFormChange = (e) => {
    setNewGroup({
      ...newGroup,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {user.role === "HOD" ? (
        <main className="group">
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Create Group
          </h2>
          <form className="w-full md:w-1/3">
            <label htmlFor="group">Group:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="group"
              id="group"
              value={newGroup.group}
              required
              onChange={(e) => handleFormChange(e)}
            />

            <label htmlFor="teacher">Teacher:</label>
            <select
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              required
              id="teacher"
              name="teacher"
              value={newGroup.teacher}
              onChange={(e) => handleFormChange(e)}
            >
              <option defaultValue hidden>
                Select Teacher
              </option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            <button
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
              type="submit"
              onClick={(e) => createGroup(e)}
            >
              <FaPlus />
              Add
            </button>
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default GroupForm;
