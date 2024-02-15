import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { AiFillBook } from "react-icons/ai";
import axios from "../../config/api/axios";

const Group = () => {
  const { setGroup, groupList } = useContext(UserContext);

  return (
    <main className="group">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Groups
      </h2>
      {groupList.length  ? (
        <section className="pt-4">
          {groupList.map((group, index) => (
            <Link to={group.group} key={index} onClick={() => setGroup(group)}>
              <article className="mb-4 flex items-center whitespace-break-spaces rounded-md border-2 border-slate-900 bg-violet-200 p-2 hover:bg-violet-950 hover:text-slate-100 dark:border-slate-200 dark:bg-slate-950/5 dark:hover:border-slate-200 dark:hover:bg-slate-950/80 lg:p-4 ">
                <AiFillBook className="text-[3rem] lg:text-[4rem]" />
                <div className="">
                  <h3 className="px-1 text-xl font-semibold lg:px-2 lg:text-2xl">
                    {group.group}
                  </h3>
                  <hr className="border-[1px]" />
                  <p className="px-2 text-sm font-medium lg:text-base ">
                    {group.year}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </section>
      ) : (
        <p className="text-lg">No Groups Found.</p>
      )}

    </main>
  );
};

export default Group;
