import { LuListVideo } from "react-icons/lu";

const index = () => {
  return (
    <header className="top-0">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-center lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <h1 className="text-slate-50 font-medium text-2xl font-mono text-center flex flex-row gap-4 justify-center">
            Summary Video
            <div className="m-auto">
              <LuListVideo />
            </div>
          </h1>
        </div>
      </nav>
    </header>
  );
};

export default index;
