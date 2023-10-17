const index = () => {
  return (
    <main className="my-40">
      <section className="w-4/5 flex justify-around m-auto">
        <article className="w-full">
          <div className="max-w-2xl h-80 rounded-2xl border-dashed border-slate-600 border-4 p-4 mx-auto"></div>
        </article>

        <article className="w-full h-full flex space-between gap-3">
          <input
            type="text"
            className="w-2/5 py-3 px-4 border border-slate-600 rounded-md focus:outline-none bg-transparent text-slate-400"
            placeholder="Cole a URL do Youtube aqui"
          />

          <button className="w-1/5 bg-indigo-700 text-white py-3 px-4 rounded-md">
            Gerar resumo
          </button>
        </article>
      </section>
    </main>
  );
};

export default index;
