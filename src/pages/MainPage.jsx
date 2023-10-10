import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswer, getLanguages } from "./../app/translateState";
import Select from "react-select";

const MainPage = () => {
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  console.log(sourceLang);
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const [prompt, setPrompt] = useState("");
  const state = useSelector((state) => state);
  console.log("statee", state.translate.languages);
  const dispatch = useDispatch();

  console.log("store", state);
  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(getAnswer({ prompt, sourceLang, targetLang }));
  };

  return (
    <div className="ust">
      <h1 className="text">Translate</h1>
      <div className="containerr">
        <div className="left">
          <Select
            className="select"
            options={state.translate.languages}
            value={sourceLang}
            onChange={(e) => setSourceLang(e)}
          />
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
          />
        </div>
        <div className="right">
          <Select
            className="select"
            options={state.translate.languages}
            value={targetLang}
            onChange={(e) => setTargetLang(e)}
          />
          <textarea
            className={`textareatarget ${
              state.translate.isLoading && "loading"
            }`}
            value={state.translate.answer}
            disabled
            type="text"
          />
        </div>{" "}
      </div>
      <button onClick={handleClick}>Çevir</button>
    </div>
  );
};

export default MainPage;
