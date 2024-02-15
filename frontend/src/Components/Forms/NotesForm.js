import { useContext, useEffect, useState, useRef } from "react";
import axios from "../../config/api/axios";
import { uploadFile } from "../../config/api/axios";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import ErrorStrip from "../ErrorStrip";

const NotesForm = () => {
  const { group, notes } = useContext(UserContext);

  const [file, setFile] = useState("");
  const [note, setNote] = useState({
    group: group._id,
    title: "",
    attachment: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const noteId = useParams()?.note;

  const fileInputRef = useRef();

  useEffect(() => {
    if (noteId) {
      setNote(notes[noteId]);
    }
  }, [noteId, notes]);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setNote((prevNote) => ({ ...prevNote, attachment: response.path }));
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFormChange = (e) => {
    setNote({
      ...note,
      [e.target.id]: e.target.value,
    });
  };

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("notes/group/" + group._id, note);
      setError("");
      navigate(-1, { replace: true });
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch("notes/" + note._id, note);
      navigate(-1, { replace: true });
      setError("");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="notes">
      <h2 className="mb-2 mt-3 text-6xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400">
        {group?.group}
      </h2>
      <h3 className="text-2xl font-medium">
        {noteId !== undefined ? "Edit Note" : "Add New Note"}
      </h3>
      <form>
        <label htmlFor="title" className="block text-lg font-medium">
          Title:
        </label>
        <input
          className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
          type="text"
          id="title"
          required
          value={note?.title}
          onChange={(e) => handleFormChange(e)}
        />

        <label htmlFor="attachment" className="block text-lg font-medium">
          Attachment:
        </label>
        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          // style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* <a href={result} target="_blank">
          {result}
        </a> */}

        {/* {noteId !== undefined ? (
          <button
            className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-4 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 "
            type="submit"
            onClick={(e) => updateNote(e)}
          >
            <RxUpdate />
            Update Note
          </button>
        ) : (
          <button
            className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-4 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
            type="submit"
            onClick={(e) => addNote(e)}
          >
            <FaPlus />
            Add Note
          </button>
        )} */}
        <button
          className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-4 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
          type="submit"
          onClick={(e) => addNote(e)}
        >
          <FaPlus />
          Add Note
        </button>
      </form>
      {error ? <ErrorStrip error={error} /> : ""}
    </main>
  );
};

export default NotesForm;
