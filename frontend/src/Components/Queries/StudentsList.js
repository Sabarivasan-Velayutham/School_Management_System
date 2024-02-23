import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";

const StudentsList = () => {
  const { group } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStudentsList = async (e) => {
      try {
        const response = await axios.get("/group/students/" + group._id);
        // TODO Move to backend
        if (!response.data.length) {
          setError({
            response: {
              data: "No Students found",
            },
          });
        }
        setStudents(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getStudentsList();
  }, [group]);
  return (
    <main className="student">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-white md:text-6xl">
        Students List
      </h2>
      <p className="text-2xl font-bold">{group.group}</p>
      {students.length ? (
        <ol className="student__table mt-2 list-decimal pl-8 text-lg font-medium">
          {students?.map((student, index) => (
            <li key={index}>{student.name}</li>
          ))}
        </ol>
      ) : (
        ""
      )}
      {!students.length && !error && <Loading />}

      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
    </main>
  );
};

export default StudentsList;
