import React, { ChangeEvent } from "react";

import axios from "axios";
import { transcribeAudio } from "../../services/transcribe/";

import YouTube from "react-youtube";
import { PiCopySimple } from "react-icons/pi";
import CopyToClipboard from "react-copy-to-clipboard";

const apiKey = import.meta.env.VITE_RAPID_API_CHATGPT_KEY;

const Index = () => {
  const [isTextareaVisible, setTextareaVisible] =
    React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [summaryContent, setSummaryContent] = React.useState<string>("");
  const [isValidURL, setValidURL] = React.useState<boolean>(false);
  const [warning, setWarning] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  function getYouTubeVideoId(url: string) {
    const videoIdMatch = url.match(
      /(?:\?v=|&v=|youtu\.be\/|embed\/|\/videos\/|\/watch\?v=|\/watch\?feature=player_embed&v=)([^#\&\?]*).*/
    );

    if (videoIdMatch && videoIdMatch[1]) {
      return videoIdMatch[1];
    }

    return null;
  }

  const handleTranscribeSpeechToText = async () => {
    // check if the input value is a valid youtube url
    if (inputValue.startsWith("https://youtu.be/")) {
      setValidURL(true);
      setTextareaVisible(true);
      setWarning(false);

      await axios.get(
        "http://localhost:3333/audio?v=" + getYouTubeVideoId(inputValue)
      );

      const data = await transcribeAudio();

      await handleGenerateSummary(data.text);
    } else {
      setValidURL(false);
      setWarning(true);
    }
  };

  const handleGenerateSummary = async (prompt: string) => {
    const options = {
      method: "POST",
      url: "https://simple-chatgpt-api.p.rapidapi.com/ask",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "simple-chatgpt-api.p.rapidapi.com",
      },
      data: {
        question: `Escreva um resumo sobre o conteúdo do vídeo transcrito a seguir: ${prompt}`,
      },
    };

    try {
      const response = await axios.request(options);

      setSummaryContent(response.data.answer);
    } catch (error) {
      console.error(error);
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
                ? "sm:w-10/12 sm:mt-0 md:pt-0 lg:w-full lg:h-80 lg:items-start 2xl:pl-7 max-w-2xl h-96 rounded-2xl border-none border-4 pt-4 mx-auto"
                : "sm:w-10/12 sm:mt-0 md:pt-0 md:mt-0 lg:w-full lg:h-80 lg:items-start lg:mt-0 max-w-2xl h-96 rounded-2xl border-dashed border-slate-800 border-4 pt-4 mt-6 mx-auto"
            }`}
          >
            {isValidURL && !warning ? (
              <div className="w-full max-w-2xl lg:justify-start h-96 rounded-2xl overflow-hidden">
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
            } flex justify-between flex-col rounded-2xl border-solid border-none bg-indigo-950 border-4 p-4`}
          >
            <div className="sm:flex-row w-full flex flex-col justify-between gap-4">
              <input
                type="text"
                className={`sm:w-8/12 w-full h-fit py-3 px-4 border ${
                  warning ? "border-red-500" : "border-slate-600"
                } rounded-md focus:outline-none bg-transparent text-slate-400`}
                placeholder="Cole a URL do Youtube aqui"
                onChange={handleInputChange}
              />

              <button
                className="sm:w-4/12 w-full h-fit bg-indigo-700 text-white py-3 px-4 rounded-md"
                onClick={handleTranscribeSpeechToText}
              >
                Gerar resumo
              </button>
            </div>
            {isTextareaVisible && (
              <textarea
                name="textareaContent"
                id="textareaContent"
                cols={30}
                rows={10}
                readOnly
                className="bg-transparent mt-6 resize-none focus:outline-none text-slate-400 pr-4 text-justify lg:h-44"
                defaultValue={summaryContent}
              ></textarea>
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
