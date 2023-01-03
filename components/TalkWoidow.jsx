import { useCallback, useState } from "react";

const API_KEY = "DZZR70CLeeWQKt5ORGVtz4XhrlC1fg1v";
const END_POINT = "https://api.a3rt.recruit.co.jp/talk/v1/smalltalk";

export const TalkWindow = () => {
  const [textList, setTextList] = useState(["お話しましょう！！"]);
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputText(value);
  };

  const onSendhandler = () => {
    if (inputText === "") {
      alert("何も入力されていません");
      return;
    }

    setTextList((textList) => [...textList, inputText]);
    sendTalkApi(inputText);
  };

  const sendTalkApi = (query) => {
    const formData = new FormData();
    formData.append("apikey", API_KEY);
    formData.append("query", query);

    fetch(END_POINT, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 0) {
          const reply = data.results[0].reply;
          setTextList((textList) => [...textList, reply]);
          console.log(textList);
        }
      });
  };

  return (
    <div className="talk">
      <div className="talkBox">
        {textList.map((text, idx) => {
          return (
            <div className={idx % 2 == 0 ? "ai" : "you"}>
              <span>
                <p key={idx}>{text}</p>
              </span>
            </div>
          );
        })}
      </div>

      <div className="inputBox">
        <input
          type="text"
          placeholder="AIにメッセージを送信してみよう"
          onChange={handleChange}
        />
        <button className="send" onClick={onSendhandler}>
          送信
        </button>
      </div>
    </div>
  );
};
