import { Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { BiBookAdd } from "react-icons/bi";
import { PiBooks, PiUser, PiStudent } from "react-icons/pi";
import { GoVideo } from "react-icons/go";
import { useContext, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";

const Dash = () => {
  const { user, setGroupList } = useContext(UserContext);

  useEffect(() => {
    const getGroups = async () => {
      if (user.role !== "HOD") {
        const response = await axios.get(`group/${user.userType}/${user._id}`);
        setGroupList(response.data);
      } else {
        const response = await axios.get("group/manage/");
        setGroupList(response.data);
      }
    };
    getGroups();
  }, [setGroupList, user]);

  return (
    <main className="self-center">
      <h2 className="m-6 mx-auto text-center text-6xl font-bold dark:text-slate-400">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 place-content-center gap-3 px-1 py-4 lg:grid-cols-2 lg:gap-4 lg:px-8 xl:grid-cols-3">
        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./group"}
        >
          <GiBookshelf className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Groups
            <p className="text-sm font-normal lg:text-base ">
              View Groups and Notes
            </p>
          </div>
        </Link>

        {user.role === "HOD" && (
          <>
            <Link
              className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
              to={"./add_group"}
            >
              <BiBookAdd className="text-[2.5rem] lg:text-[4rem] " />
              <div className="font-semibold">
                Add Group
                <p className="text-sm font-normal lg:text-base ">
                  Create a New Group
                </p>
              </div>
            </Link>
          </>
        )}

        {user.role === "student" && (
          <Link
            className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
            to={"./join_group"}
          >
            <PiBooks className="text-[2.5rem] lg:text-[4rem] " />
            <div className="font-semibold">
              Manage Group
              <p className="text-sm font-normal lg:text-base ">
                Join or Leave Group
              </p>
            </div>
          </Link>
        )}
        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./profile"}
        >
          {user.role === "student" ? (
            <PiStudent className="text-[2.5rem] lg:text-[4rem] " />
          ) : (
            <PiUser className="text-[2.5rem] lg:text-[4rem] " />
          )}

          <div className="font-semibold">
            Profile
            <p className="text-sm font-normal lg:text-base ">
              View or Edit Profile
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-violet-950/40 lg:text-lg"
          to={"./videocall"}
        >
          <GoVideo className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Video Conference
            <p className="text-sm font-normal lg:text-base ">
              Create a group call
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Dash;
