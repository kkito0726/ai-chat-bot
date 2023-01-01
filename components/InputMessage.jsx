import { useState } from "react";
import { Main } from "./TalkWoidow";

export const InputMessage = () => {
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  return (
    <>
      <input type="text" onChange={handleChange} />
      <button>送信</button>
      <Main />
    </>
  );
};
