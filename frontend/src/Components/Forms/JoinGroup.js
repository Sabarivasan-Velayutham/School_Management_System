import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";

const JoinGroup = () => {
  const { user, setGroupList } = useContext(UserContext);
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getallGroups = async () => {
      try {
        const response = await axios.get("group/manage/" + user._id);
        setGroups(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getallGroups();

    const updateGroups = async () => {
      const response = await axios.get(`group/student/${user._id}`);
      setGroupList(response.data);
    };
    // updating groupList while component unmounts
    return () => updateGroups();
  }, [user, setGroupList]);

  const handleJoin = async (e) => {
    const groupId = e.currentTarget.id;
    const index = e.target.name;
    const students = groups[index].students;
    students.push(user._id);
    updateStudents(groupId, students, index);
  };

  const handleLeave = async (e) => {
    const groupId = e.currentTarget.id;
    const index = e.target.name;
    const students = groups[index].students;
    const updatedStudents = students.filter((student) => student !== user._id);
    updateStudents(groupId, updatedStudents, index);
  };

  const updateStudents = async (groupId, studentsObj, groupIndex) => {
    setError("");
    try {
      const response = await axios.patch("/group/" + groupId, {
        students: studentsObj,
        id: groupId,
      });
      toast.success(response.data.message);
      const updatedGroup = groups.map((group, index) => {
        if (index === parseInt(groupIndex)) {
          group.joined = !group.joined;
          return group;
        } else return group;
      });
      setGroups(updatedGroup);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      {user.role === "student" ? (
        <main>
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Manage Group
          </h2>
          <form>
            {groups.length ? (
              <>
                <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                  <table className="w-full text-left">
                    <TableHeader
                      AdditionalRowClasses={"rounded-t-xl text-left"}
                      Headers={[
                        "Group",
                        "Teacher",
                        "Manage",
                      ]}
                    />
                    <tbody>
                      {groups?.map((group, index) => (
                        <tr key={index}>
                          <td className="border-t-[1px] border-slate-400 px-4 py-2">
                            {group.group}
                          </td>
                          <td className="border-t-[1px] border-slate-400 px-4 py-2">
                            {group.teacher.name}
                          </td>
                          <td className="border-t-[1px] border-slate-400 p-0">
                            {!group.joined ? (
                              <button
                                type="button"
                                id={group._id}
                                name={index}
                                onClick={(e) => handleJoin(e)}
                                className="m-0 flex h-auto w-full justify-center bg-transparent py-3  text-lg  hover:bg-violet-900 hover:text-slate-100 dark:text-slate-100 "
                              >
                                Join
                              </button>
                            ) : (
                              <button
                                className="m-0 flex h-auto w-full justify-center bg-transparent py-3  text-lg  hover:bg-red-600 hover:text-slate-100 dark:text-slate-100 "
                                type="button"
                                id={group._id}
                                name={index}
                                onClick={(e) => handleLeave(e)}
                              >
                                Leave
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default JoinGroup;
