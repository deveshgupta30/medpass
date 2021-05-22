import { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";
import { storage } from "../config.js";
import firebase from "firebase";
import FileCard from "../Components/FileCard";

const Records = () => {
  const { authState } = useContext(AuthContext);

  const { userInfo } = authState;

  const [files, setFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);

  const [uploading, setUpLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [noFile, setNoFile] = useState(false);

  const onFileChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      try {
        if (e.target.files[i].size > 10000000) {
          throw new Error("File size cannot be more than 10MB.");
        }
        const newFile = e.target.files[i];
        newFile["id"] = userInfo.id;
        setFiles((prevState) => [...prevState, newFile]);
        setError(false);
      } catch (err) {
        setError(true);
        document.getElementById("acceptFiles").value = "";
      }
    }
  };

  const getFromFirebase = () => {
    if (allFiles.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    let storageRef = storage.ref();
    storageRef
      .child(userInfo.id)
      .listAll()
      .then((res) => {
        res.items.forEach((fileRef) => {
          fileRef.getDownloadURL().then((url) => {
            setAllFiles((allFiles) => [...allFiles, url]);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    if (allFiles.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const onUploadSubmission = (e) => {
    e.preventDefault();
    const promises = [];
    if (files.length > 0) {
      setNoFile(false);
      files.forEach((file) => {
        const uploadTask = firebase
          .storage()
          .ref()
          .child(`${userInfo.id}/${file.name}`)
          .put(file);
        promises.push(uploadTask);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUpLoading(true);
            if (snapshot.state === firebase.storage.TaskState.RUNNING) {
              console.log(`Progress: ${progress}%`);
            }
          },
          (error) => console.log(error.code),
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            console.log({ downloadURL });
          }
        );
      });
      Promise.all(promises)
        .then(() => {
          alert("All files uploaded");
          document.getElementById("acceptFiles").value = "";
          setUpLoading(false);
        })
        .catch((err) => console.log(err.code));
    } else {
      setNoFile(true);
    }
  };

  useEffect(() => {
    getFromFirebase();
  }, []);

  return (
    <>
      <Helmet>
        <title>Records | MedPass</title>
      </Helmet>
      <div>
        <Navbar />
        <div className="container w-screen text-3xl font-medium sm:px-8 md:px-16 sm:py-8">
          Records
        </div>
        <div className="container flex w-screen sm:px-8 md:px-16 sm:py-8">
          <div className="flex-row">
            {/* {loading ? <></> : <span>LOADING...</span>} */}
            {allFiles.map((Files) => {
              return (
                <>
                  <div className="flex" key={Files}>
                    <FileCard flink={Files} />
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="container">
          <div class=" w-screen sm:px-8 md:px-16 sm:py-8">
            <main class="container mx-auto max-w-screen-lg h-full">
              <form>
                <article
                  aria-label="File Upload Modal"
                  class="relative  flex flex-col bg-white shadow-xl rounded-md"
                >
                  <section class="p-8 w-full h-full flex flex-col">
                    <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                      <input
                        type="file"
                        id="acceptFiles"
                        accept="image/x-png, image/jpeg, image/jpg, application/pdf"
                        multiple
                        className="p-2 rounded-md"
                        onChange={(e) => {
                          onFileChange(e);
                        }}
                      />
                      {error ? (
                        <p className="text-red-500 font-medium">
                          File size more than 10 mb.
                        </p>
                      ) : (
                        <></>
                      )}
                    </header>
                  </section>

                  <footer class="flex-col justify-end px-8 pb-8 pt-4">
                    <button
                      id="submit"
                      onClick={(e) => onUploadSubmission(e)}
                      class="rounded-md px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                    >
                      {uploading ? (
                        <span>Uploading...</span>
                      ) : (
                        <span>Upload</span>
                      )}
                    </button>
                    {noFile ? (
                      <div className="text-red-500 font-medium">
                        No file selected
                      </div>
                    ) : (
                      <></>
                    )}
                  </footer>
                </article>
              </form>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Records;
