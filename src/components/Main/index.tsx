import React, { ChangeEvent } from "react";

import YouTube from "react-youtube";
import { PiCopySimple } from "react-icons/pi";
import CopyToClipboard from "react-copy-to-clipboard";

const Index = () => {
  const [isTextareaVisible, setTextareaVisible] =
    React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [summaryContent, setSummaryContent] = React.useState<string>("");
  const [isValidURL, setValidURL] = React.useState<boolean>(false);
  const [warning, setWarning] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleGenerateSummary = () => {
    // check if the input value is a valid youtube url
    if (inputValue.startsWith("https://youtu.be/")) {
      setValidURL(true);
      setTextareaVisible(true);
      setWarning(false);
      setSummaryContent(
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum dolor sit amet, consectetur adipiscing elit."
      );
    } else {
      setValidURL(false);
      setWarning(true);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const opts = {
    height: "390",
    width: "640",
  };

  return (
    <main className="my-40">
      <section className="w-4/5 flex justify-around m-auto">
        <article className="w-full">
          <div
            className={`${
              isValidURL && !warning
                ? "max-w-2xl h-80 rounded-2xl border-transparent border-4 px-4 mx-auto"
                : "max-w-2xl h-80 rounded-2xl border-dashed border-slate-800 border-4 p-4 mx-auto"
            }`}
          >
            {isValidURL && !warning ? (
              <div className="max-w-2xl h-80 rounded-2xl overflow-hidden">
                <YouTube
                  videoId={inputValue.replace("https://youtu.be/", "")}
                  opts={opts}
                />
              </div>
            ) : null}
          </div>
        </article>

        <article className="w-full h-auto">
          <div
            className={`w-8/12 ${
              isTextareaVisible ? "h-full" : ""
            } flex justify-between flex-col rounded-2xl border-solid border-indigo-950 bg-indigo-950 border-4 p-4`}
          >
            <div className="w-full flex justify-between gap-4">
              <input
                type="text"
                className={`w-9/12 h-fit py-3 px-4 border ${
                  warning ? "border-red-500" : "border-slate-600"
                } rounded-md focus:outline-none bg-transparent text-slate-400`}
                placeholder="Cole a URL do Youtube aqui"
                onChange={handleInputChange}
              />

              <button
                className="w-3/12 h-fit bg-indigo-700 text-white py-3 px-4 rounded-md"
                onClick={handleGenerateSummary}
              >
                Gerar resumo
              </button>
            </div>
            {isTextareaVisible && (
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                readOnly
                className="bg-transparent mt-6 resize-none focus:outline-none text-slate-400 pr-4 text-justify"
              >
                {summaryContent}
              </textarea>
            )}
            {isValidURL && !warning ? (
              <CopyToClipboard
                text={summaryContent}
                onCopy={() => setCopied(true)}
              >
                <button className="text-slate-400 w-10 h-10 mt-4 flex items-center justify-center bg-indigo-700 rounded-md copy-button">
                  <PiCopySimple style={{ width: "1.5rem", height: "1.5rem" }} />
                </button>
              </CopyToClipboard>
            ) : null}
          </div>
        </article>
      </section>
    </main>
  );
};

export default Index;
