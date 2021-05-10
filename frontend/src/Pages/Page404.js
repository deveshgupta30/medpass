import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Logo from "../Components/Logo";

const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>Page not found | MedPass</title>
      </Helmet>
      <div
        className="w-full h-full font-quickSand font-medium"
        style={{ backgroundColor: "#131311" }}
      >
        <header className="flex items-center justify-center py-3">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <Link to="/">
            <div className="text-4xl ml-4 text-white font-medium">MedPass</div>
          </Link>
        </header>

        <div className="h-screen flex items-center justify-center content-center w-full">
          <img
            className="object-contain w-full h-full transform scale-50"
            alt="Error 404"
            src={"/assets/img/404img.webp"}
            draggable="false"
          ></img>
        </div>
      </div>
    </>
  );
};

export default Page404;
