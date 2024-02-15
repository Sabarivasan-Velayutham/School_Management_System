import "./App.css";
import { createContext, useEffect, useReducer, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideosList from "./Components/VideosList/VideosList";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import {
  ADD_USER,
  REMOVE_USER,
  UPDATE_SCREEN,
  UPDATE_SHARING,
} from "./actions";
import reducer from "./reducer";

export const StreamingContext = createContext();

const defaultState = {
  users: [],
  isScreenSharing: false,
  isScreenFull: false,
};

// const options = {
//   appId: "840affeadda24695b79812340bef4ad0",
//   channel: "test",
//   token:
//     "007eJxTYMiQCbnBXWtUmNsl/PXPhMDu7zOmbE48K29TWV1nE6R120mBwTLZxNzUItHU0sjYwsQwOS3RMs0sOdEs2SLJwsLS0Mhkvdm51IZARobwfb6MjAwQCOKzMJSkFpcwMAAABI8eiw==",
// };

const options = {
  appId: process.env.REACT_APP_APP_ID,
  channel: process.env.REACT_APP_CHANNEL,
  token: process.env.REACT_APP_TOKEN,
};

function VideoConference() {
  const clientRef = useRef();
  const localVideoRef = useRef();
  const localCameraTrackRef = useRef();
  const localScreenTrackRef = useRef();
  const localAudioTrackRef = useRef();
  const [state, dispatch] = useReducer(reducer, defaultState);

  const addUser = (user) => {
    dispatch({ type: ADD_USER, payload: { user } });
  };

  const removeUser = (uid) => {
    dispatch({ type: REMOVE_USER, payload: { uid } });
  };

  const updateSharing = (isSharing) => {
    dispatch({
      type: UPDATE_SHARING,
      payload: { isSharing },
    });
  };

  const updateScreen = () => {
    dispatch({
      type: UPDATE_SCREEN,
      payload: { isSharing: !state.isScreenFull },
    });
  };

  useEffect(() => {
    const joinChannel = async () => {
      try {
        const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });
        clientRef.current = client;
        await client.join(options.appId, options.channel, options.token);
        const localVideoTrack = await AgoraRTC.createCameraVideoTrack({});
        const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        localCameraTrackRef.current = localVideoTrack;
        localAudioTrackRef.current = localAudioTrack;
        localVideoTrack.play(localVideoRef.current);
        await clientRef.current.publish([localAudioTrack, localVideoTrack]);
      } catch (error) {
        console.error(error);
      }
    };

    const listen = () => {
      clientRef.current.on("user-published", async (user, mediaType) => {
        await clientRef.current.subscribe(user, mediaType);

        if (mediaType === "video") {
          addUser(user);
        }

        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      clientRef.current.on("user-unpublished", (user) => {
        console.log(user.uid + "has unpublished from the channel");
      });

      clientRef.current.on("user-left", (user) => {
        console.log(user.uid + "has left the channel");
        removeUser(user.uid);
      });
    };
    joinChannel();
    listen();
    return () => {
      clientRef.current.leave();
    };
  }, []);

  return (
    <div className="container">
      <video
        className={state.isScreenSharing ? "video local-video" : "video"}
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: state.isScreenFull ? "1000px" : "500px",
          height: state.isScreenFull ? "600px" : "300px",
        }}
        onClick={() => updateScreen()}
      />
      <VideosList users={state.users} />
      <StreamingContext.Provider
        value={{
          clientRef,
          localVideoRef,
          localScreenTrackRef,
          localCameraTrackRef,
          localAudioTrackRef,
          state,
          updateSharing,
        }}
      >
        <ControlPanel />
      </StreamingContext.Provider>
    </div>
  );
}

export default VideoConference;
