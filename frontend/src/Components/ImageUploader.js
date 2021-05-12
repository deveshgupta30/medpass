const ImageUploader = ({ file, setFile, error, setError }) => {
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const reader = (image) => {
    console.log({ image });
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!types.includes(image.type)) {
        reject(
          new Error(
            "Only image files with extenion jpeg, jpg and png are accepted."
          )
        );
      }
      if (!image) {
        reject(new Error("No image file is selected."));
      }
      if (image.size > 10000000) {
        reject(new Error("Image size must be less than 10 MB."));
      }
      fileReader.onloadend = () => {
        resolve(fileReader.result);
      };
      fileReader.readAsDataURL(image);
    });
  };

  const onChangeHandler = async (e) => {
    let selected = e.target.files[0];
    try {
      const dataUrl = await reader(selected);
      setFile(dataUrl);

      //fetch post request to server to upload it
      console.log({ dataUrl });
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  return (
    <div className="relative ring-4 ring-gray-400 dark:ring-gray-200 rounded-full w-full h-full">
      {file ? (
        <img
          className="block w-full h-full rounded-full object-cover"
          src={file}
          alt="profile pic"
        />
      ) : (
        <div className="flex justify-center items-center  w-full h-full  bg-gray-300 dark:bg-blueGray-700 rounded-full">
          <svg
            className="w-full h-full fill-current text-white dark:text-blueGray-800 rounded-full"
            focusable="false"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </div>
      )}
      <label
        htmlFor="imgUploader"
        className=" absolute right-0 bottom-0 z-10  cursor-pointer "
      >
        <input
          className="h-0 w-0 opacity-0"
          onChange={onChangeHandler}
          type="file"
          id="imgUploader"
          accept=".png, .jpg, .jpeg"
        />
        <div className="h-8 w-8 p-1 rounded-full bg-blue-500 flex justify-center items-center">
          <svg
            className="h-6 w-6 fill-current text-gray-200"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
          </svg>
        </div>
      </label>
      {/* {error && <small className="error">{error}</small>} */}
    </div>
  );
};

export default ImageUploader;
