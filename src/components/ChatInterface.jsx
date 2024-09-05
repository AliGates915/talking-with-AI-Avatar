import { useRef } from "react";
import { useSpeech } from "../hooks/useSpeech";

export const ChatInterface = ({ hidden, ...props }) => {
  const input = useRef();
  const { tts, loading, message, startRecording, stopRecording, recording } = useSpeech();

  const sendMessage = (text) => {
    if (!loading && !message) {
      tts(text);
      input.current.value = "";
    }
  };

  const predefinedMessages = [
    "Tune into my field and tell me a message I need to hear today",
    "Tune into my field and channel the visual metaphor that is the exact thing I need to hear today to attune myself to the energy I need to deal with my day.",
    "Tune into my field and tell me the full list of how my chakras are doing, rated 0-10 each"
  ];

  if (hidden) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
      <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
        <h1 className="font-black text-xl text-gray-700">Psychic AI Boyfriend</h1>
        <p className="text-gray-600">
          {loading ? "Loading..." : "Type a message and press enter to chat with the AI."}
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 mb-4">
        {predefinedMessages.map((msg, index) => (
          <button
            key={index}
            onClick={() => sendMessage(msg)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 rounded-md pointer-events-auto w-full max-w-2xl text-center"
          >
            {msg}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`bg-gray-500 hover:bg-gray-600 text-white p-4 px-4 font-semibold uppercase rounded-md ${
            recording ? "bg-red-500 hover:bg-red-600" : ""
          } ${loading || message ? "cursor-not-allowed opacity-30" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
            />
          </svg>
        </button>
        <input
          ref={input}
          type="text"
          className="flex-1 p-2 rounded-md"
          placeholder="Let me know what you need."
          onKeyDown={(e) => e.key === "Enter" && sendMessage("Tune into my field and facilitate: " + input.current.value)} //Added this to see if it can continuously tune into the field each message.
        />
        <button
          onClick={() => sendMessage("Tune into my field and facilitate: " + input.current.value)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};
