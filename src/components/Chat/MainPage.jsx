import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import { assets } from "../../assets/assets";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { Link as LinkScroll } from "react-scroll";
import { Element } from "react-scroll";
import { SignInModal } from "./SignInModal";

// ✨ Imports for Syntax Highlighting
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

// 1. Explicitly retrieve the API key exposed by React's environment
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// 2. Pass the key explicitly to the GoogleGenAI constructor
const ai = new GoogleGenAI({ apiKey });

const systemConfig = `You are a smart AI. Your name is Xora. You are a assistant for students and you should guide the students in their studies. You can also use the name of the user which is defined in the username variable. First greet the user by their name. You only need to ask students about their standard and subject when they ask you to study specific subject otherwise you can skip the asking part. First you need to ask about the students' subjects and their class in one question. After the students reply about their class and subject, you should remember it don't forget that information. Then you should start guiding the students from remembering the information you earned moments ago. According their subject and class guide them. You should answer all responses in Gujarati language even when user uses English language. You can use English in some scenarios. Your answers should be accurate. If student asks for his any subject you should ask which standard they are studying in and answer accordingly.`;

// 🧠 MODIFIED: Function now accepts the entire conversation history
async function generateContent(contents) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // 🧠 Send the full history here!
      contents: contents,
      config: {
        systemInstruction: systemConfig,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI API Error:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
}

// ✨ Custom components map for ReactMarkdown to handle syntax highlighting
const customComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    // Render code blocks with syntax highlighting
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        style={dark} // Applying the dark theme for code blocks
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      // Render inline code as simple <code>
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export const MainPage = () => {
  const setBackground = `relative before:content-[''] before:absolute before:w-[40px] before:h-[40px] before:rounded-4xl before:bg-gray-300 before:-left-[5px] before:-top-[5px] before:opacity-0 hover:before:opacity-100 before:-z-1 before:transition-all before:duration-300 cursor-pointer`;
  const setCardStyle =
    "bg-[#f0f4f9] rounded-xl p-[10px] text-[18px] font-medium roboto text-[#585858] relative hover:bg-[#C4C7C5] transition-all duration-300 cursor-pointer";

  const setIcon = "absolute w-[30px] h-[30px] right-2 bottom-2";

  /* State Management */
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [allPrompts, setAllPrompts] = useState([]);

  // State for full conversation history (all prompt/response pairs)
  const [conversationHistory, setConversationHistory] = useState([]);

  // Keep recentPrompt for the sidebar logic
  const [recentPrompt, setRecentPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 🎯 NEW: Create a ref to target the bottom of the chat container
  const chatEndRef = useRef(null);

  // 🎯 NEW: useEffect to scroll to the bottom whenever conversationHistory changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory]);

  // 🧠 MODIFIED: handleSend function to include history
  const handleSend = async () => {
    if (input.trim() !== "") {
      const userPrompt = input.trim();

      // 1. Setup UI for new chat turn
      if (allPrompts.indexOf(userPrompt) === -1) {
        setAllPrompts((prevPrompts) => [userPrompt, ...prevPrompts]); // For sidebar
      }
      setRecentPrompt(userPrompt);
      setIsLoading(true);
      setShowResult(true); // Ensure chat view is active
      setInput(""); // Clear input immediately

      // Add the new prompt to history with a temporary placeholder for response
      setConversationHistory((prevHistory) => [
        ...prevHistory,
        { prompt: userPrompt, response: "...Thinking..." },
      ]);

      // 🧠 2. Construct the full contents array for the API call
      // Map existing history to the required {role: "...", parts: [{text: "..."}]} format
      const historyForAPI = conversationHistory.flatMap((turn) => [
        { role: "user", parts: [{ text: turn.prompt }] },
        // Only include model responses that are not the placeholder
        ...(turn.response !== "...Thinking..."
          ? [{ role: "model", parts: [{ text: turn.response }] }]
          : []),
      ]);

      // Add the new user prompt to the API content
      const contentsForAPI = [
        ...historyForAPI,
        { role: "user", parts: [{ text: userPrompt }] },
      ];

      // 🧠 3. Call the AI API with the full contents (history + new prompt)
      let responseText = "";
      try {
        // 🧠 Pass the constructed history array
        responseText = await generateContent(contentsForAPI);
      } catch (error) {
        responseText = "An error occurred while fetching the response.";
      } finally {
        // 4. Update the last entry in conversationHistory with the final response
        setConversationHistory((prevHistory) => {
          const updatedHistory = [...prevHistory];
          // Find the last entry and update its response
          updatedHistory[updatedHistory.length - 1].response = responseText;
          return updatedHistory;
        });

        // 5. Finalize UI state
        setIsLoading(false); // Hide loading indicator
      }
    }
  };

  const [username, setUsername] = useState("");

  const handleSignInSuccess = (signedInUsername) => {
    // 1. Store the username
    setUsername(signedInUsername);
    // 2. Grant access
    setNotSignIn(false);
  };

  const [notSignIn, setNotSignIn] = useState(true);

  return (
    // SCROLL FIX 1: Set fixed height (h-screen) and use flex layout
    <div className={`w-full h-screen flex bg-white`}>
      {/* Sidebar (Fixed position and height is handled by its own classes) */}
      <div
        className={`bg-[#f0f4f9] z-20 h-dvh fixed top-0 transition-all duration-300 ${
          isOpen ? "w-40" : "w-20"
        } ${notSignIn ? "bg-gray-300" : ""}`}
      >
        <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] h-full py-5 justify-items-center gap-y-7">
          <div className="flex justify-center items-center gap-3 w-full">
            <img
              src={assets.menu_icon}
              className="w-[30px] h-[30px] cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          </div>
          <div className={isOpen ? "overflow-y-auto" : ""}>
            <h1
              className={`text-2xl font-medium text-center transition-all duration-500 ${
                isOpen ? "opacity-100 " : "opacity-0"
              }`}
            >
              Recent
            </h1>
            {isOpen &&
              allPrompts.map((prompt, index) => {
                // Calculate the index of the corresponding prompt in the chronological conversationHistory array
                const targetIndex = conversationHistory.length - 1 - index;
                const scrollId = `prompt-${targetIndex}`;

                return (
                  <LinkScroll
                    key={index}
                    smooth
                    to={scrollId}
                    // 🚨 FIX: Tell react-scroll which container to scroll
                    containerId="chat-container"
                  >
                    <div
                      className={`mt-3 hover:bg-gray-300 p-3 cursor-pointer transition-all duration-300 rounded-full w-auto active:bg-gray-400`}
                    >
                      <h1
                        className={`text-md font-bold roboto text-center truncate w-28`}
                        title={prompt}
                      >
                        {prompt}
                      </h1>
                    </div>
                  </LinkScroll>
                );
              })}
          </div>
          <div className="flex flex-col items-center gap-5">
            <div
              className={`${setBackground} flex justify-center items-center`}
            >
              <img src={assets.question_icon} className="w-[30px] h-[30px]" />
              {isOpen && <span className="text-lg ml-2 text-nowrap">Help</span>}
            </div>
            <div className="cursor-pointer relative">
              <span
                className="text-2xl "
                onClick={() => {
                  setShowResult(false);
                  setInput("");
                  setConversationHistory([]);
                  setRecentPrompt("");
                  setAllPrompts([]);
                }}
              >
                ➕
                {isOpen && (
                  <span className="text-lg ml-2 text-nowrap">New Chat</span>
                )}
              </span>
            </div>
            <div className={setBackground}>
              <img src={assets.setting_icon} className="w-[30px] h-[30px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper: Takes up remaining space, uses flex-col for layout */}
      <div
        className={`bg-white w-full h-screen flex flex-col transition-all duration-300 ${
          // Adjusted padding to start correctly from the side of the fixed sidebar
          isOpen ? "pl-[170px] pr-10" : "pl-[100px] pr-10"
        } `}
      >
        {/* Header: Must not shrink (flex-shrink-0 is implied here) */}
        <div
          className={`py-5 flex justify-between items-center flex-shrink-0 ${
            // Adjust padding based on sidebar state
            isOpen ? "pr-10" : "pr-0"
          }`}
        >
          <h1 className="text-3xl uppercase roboto tracking-[2px] font-medium text-[#585858]">
            Xora
          </h1>
          <div className="rounded-full overflow-hidden">
            <img
              src={assets.user_icon}
              className="w-[60px] h-[60px] hover:w-[70px] hover:h-[70px] transition-all duration-400"
            />
          </div>
        </div>

        {/* SCROLL FIX 2: Content Container - Takes all available space and is scrollable */}
        {/* 🚨 FIX: Added ID to the scrollable container */}
        <div className="flex-grow overflow-y-auto w-full" id="chat-container">
          {/* Conditional Rendering (The content that will scroll) */}
          {showResult ? (
            <div className={`w-full pr-40 mt-5 mb-5`}>
              {/* NEW: Iterate over conversationHistory to show all turns */}
              {conversationHistory.map((turn, index) => (
                <div key={index} className="mb-10">
                  {/* User Prompt */}
                  {/* Set the unique name to match the LinkScroll 'to' prop */}
                  <Element name={`prompt-${index}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={assets.user_icon}
                        className="w-[40px] h-[40px] rounded-full flex-shrink-0"
                      />
                      <p className="text-xl font-medium text-[#585858]">
                        {turn.prompt}
                      </p>
                    </div>
                  </Element>

                  {/* AI Response */}
                  <div className="flex items-start gap-4">
                    <img
                      src="/public/favicon.ico"
                      className="w-[40px] h-auto flex-shrink-0"
                    />
                    <div className="text-xl font-medium text-gray-900 prose max-w-none poppins">
                      {/* Show loading state only on the latest turn's response while loading */}
                      {index === conversationHistory.length - 1 &&
                      isLoading &&
                      turn.response === "...Thinking..." ? (
                        <p className="text-xl font-medium text-gray-900 animate-pulse">
                          ...Thinking...
                        </p>
                      ) : (
                        <div className="text-xl/[43px] font-bold anek">
                          <ReactMarkdown
                            children={String(turn.response)}
                            // ✨ Pass the custom component map here!
                            components={customComponents}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* 🎯 Target element for auto-scroll */}
              <div ref={chatEndRef} />
            </div>
          ) : (
            <div className={`w-full`}>
              <div className="mt-15 w-full">
                <h1 className="text-[56px] text-start text-transparent bg-clip-text bg-linear-25 from-[#4b90ff] to-[#ff5546] font-bold roboto">
                  Hello, {username}
                </h1>
                <h1 className="text-[56px] text-start font-bold roboto text-[#C4C7C5] ">
                  {" "}
                  How can I help you today?
                </h1>
              </div>
              <div
                className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[200px] pr-40 gap-5 mt-15"
                onClick={(e) => {
                  const targetCard = e.target.closest(
                    `.${setCardStyle.split(" ")[0]}`
                  );
                  if (targetCard) {
                    const text = targetCard.childNodes[0].nodeValue.trim();
                    if (text) {
                      setInput(text);
                      handleSend();
                    }
                  }
                }}
              >
                <div
                  className={setCardStyle}
                  onClick={(e) => {
                    setInput(e.target.textContent);
                  }}
                >
                  Suggest me some brain exercises.
                  <img src={assets.compass_icon} className={setIcon} />
                </div>
                <div
                  className={setCardStyle}
                  onClick={(e) => {
                    setInput(e.target.textContent);
                  }}
                >
                  Help me summarize my course in a week.
                  <img src={assets.bulb_icon} className={setIcon} />
                </div>
                <div
                  className={setCardStyle}
                  onClick={(e) => {
                    setInput(e.target.textContent);
                  }}
                >
                  Give me some good quotes of scientists.
                  <img src={assets.message_icon} className={setIcon} />
                </div>
                <div
                  className={setCardStyle}
                  onClick={(e) => {
                    setInput(e.target.textContent);
                  }}
                >
                  Let's make notes about the Maths chapter 1.
                  <img src={assets.code_icon} className={setIcon} />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* End of Scrollable Content Container */}

        {/* Input Bar: Must not scroll and must remain at the bottom. */}
        <div className="pb-5 pr-40 flex-shrink-0">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Enter a prompt here"
              className="w-full py-4 px-6 text-xl font-medium roboto rounded-full bg-[#f0f4f9] border-none outline-none"
              id="show-icon"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <button
              className="absolute right-3 top-3.5 cursor-pointer transition-all duration-300"
              id="button"
              onClick={handleSend}
              disabled={isLoading}
            >
              <img src={assets.send_icon} className="w-[30px] h-[30px]" />
            </button>
          </div>
          <p className="text-center font-medium text-[14px] text-gray-500 mt-3">
            Xora may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
      {notSignIn && <SignInModal onSignInSuccess={handleSignInSuccess} />}
    </div>
  );
};
