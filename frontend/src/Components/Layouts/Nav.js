import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { GiBookshelf } from "react-icons/gi";
import { BiBookAdd } from "react-icons/bi";
import { PiStudent, PiUser, PiBooks } from "react-icons/pi";
import { GoVideo } from "react-icons/go";

const Nav = () => {
  const { user } = useContext(UserContext);
  return (
    <nav
      id="nav"
      className="z-0 hidden h-full flex-col justify-stretch bg-slate-950 px-4 py-4 text-slate-100 dark:bg-black lg:flex border-r border-gray-300"
    >
      <ul className="m-auto flex flex-grow flex-col items-center justify-start gap-[6px]">
        <NavLink to={"./group"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-gray-700 ">
            <GiBookshelf className="pt-[0.1rem] text-2xl  " />
            Groups
          </li>
        </NavLink>

        {user.role === "HOD" && (
          <>
            <NavLink to={"./add_group"} className="w-full font-medium">
              <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-gray-700  ">
                <BiBookAdd className="pt-[0.1rem] text-2xl  " />
                Create Group
              </li>
            </NavLink>
          </>
        )}

        {user.role === "student" && (
          <NavLink to={"./join_group"} className="w-full font-medium">
            <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-gray-700  ">
              <PiBooks className="pt-[0.1rem] text-2xl  " />
              Manage Group
            </li>
          </NavLink>
        )}

        <NavLink to={"./videocall"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-gray-700  ">
            <GoVideo className="pt-[0.1rem] text-2xl  " />
            Video Conference
          </li>
        </NavLink>
      </ul>

      <ul className="flex flex-grow flex-col items-start justify-end gap-[6px]">
        <NavLink to={"./profile"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-gray-700  ">
            {user.role === "student" ? (
              <PiStudent className="pt-[0.1rem] text-2xl" />
            ) : (
              <PiUser className="pt-[0.1rem] text-2xl" />
            )}
            {user.name}
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
