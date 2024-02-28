import React, { useContext, useState } from "react";
import { Store } from "../../Datastore/Context_SignUpAndLogin";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { getStorage, ref, uploadString } from "firebase/storage";


const EditPopUp = () => {
  let { userDataFromDatabase, UpdateDataInDataBase } = useContext(Store);
  const [anchor] = React.useState(null);
  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;
  const [image, setImage] = useState()
  const storage = getStorage();
  const storageRef = ref(storage, "some-child");

  console.log(userDataFromDatabase);
  // const fileReader = new FileReader();

  const getImage = (event) => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target.result;
        console.log("Data URL:", JSON.stringify(dataUrl));
        uploadString(storageRef, 'images/'+dataUrl).then((snapshot) => {
          console.log("Uploaded a data_url string!",snapshot);
        });
        // UpdateDataInDataBase("profileUrl", JSON.stringify(dataUrl));

        // Now you can use 'dataUrl' as a link or store it in a database
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
    // console.log(imageUrl);
    // UpdateDataInDataBase("profileUrl", imageUrl);
  };

  // Change Profile Image PopUp Component 
  const ChangePhotoPopUp = () => (
    <Popup
      trigger={
        <button
          className="bg-blue-600 font-bold text-sm py-2 px-4 rounded-md"
          aria-describedby={id}
          type="button"
        >
          {" "}
          Change Photo
        </button>
      }
      position="center"
    >
      {(close) => (
        <div className="changephoto min-w-[380px] py-5 w-1/3 fixed top-1/2 flex flex-col items-center gap-2 p-4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-inherit text-center ">
          <h1 className="text-2xl ">Change Profile Photo</h1>
         <input type="file" id="img" className= "hidden" onChange={getImage} />
          <label htmlFor="img"
            className="font-bold text-blue-500 cursor-pointer"
            // onClick={handleChange}
          >
            Upload Photo
          </label>
          <h2 className="font-bold text-red-500 cursor-pointer">
            Remove Current Photo
          </h2>
          <h2 onClick={close} className="cursor-pointer">
            Cancle
          </h2>
        </div>
      )}
    </Popup>
  );

  // Code To Convert Image to URL 
  let fileUpload = (event) => {
    // console.log("in");
    let src = event.target.value.getAsDataURL();
    this.setState({
      image: src,
    });
  };
   const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    // setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="w-full ">
      <img src={ image} alt="" />
      <div className="w-1/2 m-auto p-7 flex flex-col gap-8 min-w-[512px]">
        <h1 className="w-full font-bold text-xl">Edit profile</h1>
        <div className="flex mt-4 justify-between items-center bg-zinc-800 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <img
              src={userDataFromDatabase.profileUrl}
              alt=""
              className="rounded-full w-16"
            />
            <div>
              <h3 className="font-bold text-lg">
                {userDataFromDatabase.userName}
              </h3>
              <p>{userDataFromDatabase.name}</p>
            </div>
          </div>
          <div>
            <ChangePhotoPopUp className="fixed"/>
          </div>
        </div>
        <div>
          <h3>Bio</h3>
          <textarea
            name=""
            placeholder="Bio"
            className="p-2 w-full rounded-lg"
            id=""
          ></textarea>
        </div>

        <div>
          <select name="" id="" className="w-full p-2 rounded-lg">
            <option value="">Male</option>
            <option value="">Female</option>
            <option value="">Prefer not to say</option>
          </select>
        </div>

        <button className="py-2 px-28 bg-blue-600 rounded-lg w-1/2 m-auto">
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditPopUp;
