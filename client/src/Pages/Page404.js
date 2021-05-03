import { Helmet } from "react-helmet";
import Logo from "../Components/Logo";

const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>Error | MedPass</title>
      </Helmet>
      <div
        className="w-full h-full font-quickSand font-medium"
        style={{ backgroundColor: "#131311" }}
      >
        <header className="flex items-center justify-center py-3">
          <div>
            <Logo />
          </div>
          <div className="text-4xl ml-4 text-white font-medium">MedPass</div>
        </header>
        <div className="h-screen flex items-center justify-center content-center w-full">
          <img
            className="object-contain w-full h-full transform scale-50"
            alt="Error 404"
            src={"/assets/img/404img.webp"}
          ></img>
        </div>
      </div>
    </>
  );
};

export default Page404;
