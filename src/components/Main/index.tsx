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
    <main className="px-5 sm:px-0 md:px-0 lg:px-0 2xl:my-40 my-20">
      <section className="sm:w-11/12 sm:flex-col-reverse lg:flex-row lg:gap-8 2xl:w-3/5 flex flex-col-reverse justify-around m-auto">
        <article className="w-full lg:w-6/12">
          <div
            className={`${
              isValidURL && !warning
                ? "sm:w-10/12 sm:mt-0 md:pt-0 lg:w-full lg:items-start max-w-2xl h-80 rounded-2xl border-transparent border-4 pt-4 mx-auto"
                : "sm:w-10/12 sm:mt-0 md:pt-0 md:mt-0 lg:w-full lg:items-start lg:mt-0 max-w-2xl h-80 rounded-2xl border-dashed border-slate-800 border-4 pt-4 mt-6 mx-auto"
            }`}
          >
            {isValidURL && !warning ? (
              <div className="w-full max-w-2xl lg:justify-start lg:-ml-5 h-80 rounded-2xl overflow-hidden">
                <YouTube
                  videoId={inputValue.replace("https://youtu.be/", "")}
                  opts={opts}
                />
              </div>
            ) : null}
          </div>
        </article>

        <article className="w-full lg:w-6/12 h-auto">
          <div
            className={`sm:w-10/12 sm:m-auto sm:mb-8 lg:w-full max-w-screen-sm  ${
              isTextareaVisible ? "h-full" : ""
            } flex justify-between flex-col rounded-2xl border-solid border-indigo-950 bg-indigo-950 border-4 p-4`}
          >
            <div className=" w-full flex justify-between gap-4">
              <input
                type="text"
                className={`sm:w-8/12 w-9/12 h-fit py-3 px-4 border ${
                  warning ? "border-red-500" : "border-slate-600"
                } rounded-md focus:outline-none bg-transparent text-slate-400`}
                placeholder="Cole a URL do Youtube aqui"
                onChange={handleInputChange}
              />

              <button
                className="sm:w-4/12 w-3/12 h-fit bg-indigo-700 text-white py-3 px-4 rounded-md"
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
