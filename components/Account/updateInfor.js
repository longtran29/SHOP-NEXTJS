import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import logo_upload from "../../public/images/logo_upload.png";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Input } from "antd";
import AuthContext from "@/context/AuthContext";
import SpinTip from "../loading/SpinTip";
import { handleImageUpload } from "@/utils/uploadImage";
import { NEXT_API } from "@/config";
import { toast } from "react-toastify";
import DataContext from "@/context/DataContext";

function UpdateInformation(props) {
  const { children, value, index, ...other } = props;

  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [optionShow, setOptionShow] = useState(false);
  
  useEffect(() => {
    if (user) {
      console.log("User updare info ", JSON.stringify(user));
      setUserData(user);
    }
  }, [user]);

  const [image, setImage] = useState({
    imageData: null,
    imagePrev: null,
  });
  //   const [userData, setUserData] = useState({
  //     name: "",
  //     phoneNumber: "",
  //     email:"",
  //     username: ""
  //   });

  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let user_img = "";

    if (image.imageData != null) {
      const imgUrl = await handleImageUpload(image.imageData)
        .then((res) => res)
        .then((data) => data);

      setUserData((prevState) => ({ ...prevState, imgURL: imgUrl }));

      user_img = imgUrl;
    }

    const payload = {
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      imgURL: user_img ? user_img : "",
    };

   
    //ver
    const resGet = await fetch(`${API_URL}/user/update_profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const dataGet = await resGet.json();


    if (!resGet.ok) {
      toast.error(dataGet.message);
    } else {
      toast.success("Update successfull");
    }
    setIsLoading(false);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {isLoading ? (
        <SpinTip />
      ) : (
        <>
          {value === index && userData ? (
            <form onSubmit={handleSubmit}>
              <Box sx={{ p: 3 }}>
                <div className="flex flex-col justify-around">
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <div className="flex items-center">
                        <div>
                          <Image
                            className="rounded-xl"
                            src={
                              userData.imgURL
                                ? userData.imgURL
                                : image.imagePrev
                                ? image.imagePrev
                                : logo_upload
                            }
                            width={150}
                            height={150}
                            alt="user_icon"
                          />
                        </div>
                        <div className="flex flex-col justify-center items-center ">
                          <label
                            className="border px-4 text-white py-2 bg-primary-500 font-semibold ml-12 rounded-md hover:bg-primary-600"
                            tabIndex="0"
                            role="button"
                            htmlFor="account-settings-upload-image"
                          >
                            Upload New Photo
                            <input
                              hidden
                              type="file"
                              accept="image/png, image/jpeg"
                              id="account-settings-upload-image"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  setImage({
                                    imageData: e.target.files[0],
                                    imagePrev: URL.createObjectURL(
                                      e.target.files[0]
                                    ),
                                  });
                                }
                              }}
                            />
                            <span className="MuiTouchRipple-root css-w0pj6f"></span>
                          </label>

                          <p className="mt-4 font-extralight opacity-70">
                            Allowed PNG or JPEG
                          </p>
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <div className="mt-8">
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="component-outlined">
                            Name
                          </InputLabel>
                          <OutlinedInput
                            id="component-outlined"
                            defaultValue=""
                            label="Name"
                            name="name"
                            value={userData.name}
                            onChange={(e) =>
                              setUserData({ ...userData, name: e.target.value })
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="component-outlined">
                            Phone number
                          </InputLabel>
                          <OutlinedInput
                            id="component-outlined"
                            defaultValue=""
                            name="phone"
                            label="Phone number"
                            value={userData.phoneNumber}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                phoneNumber: e.target.value,
                              })
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="mt-8">
                          <FormControl fullWidth>
                            <InputLabel htmlFor="component-outlined">
                              Email
                            </InputLabel>
                            <OutlinedInput
                              id="component-outlined"
                              defaultValue="abc@gmail.com"
                              label="Name"
                              //   disabled={true}
                              value={userData.email}
                              onChange={(e) =>
                                setUserData({ ...state, email: e.target.value })
                              }
                            />
                          </FormControl>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div className="mt-8">
                          <FormControl fullWidth>
                            <InputLabel htmlFor="component-outlined">
                              Username
                            </InputLabel>
                            <OutlinedInput
                              id="component-outlined"
                              defaultValue="abc"
                              label="Name"
                              //   disabled={true}
                              value={userData.username}
                              onChange={(e) =>
                                setUserData({
                                  ...state,
                                  username: e.target.value,
                                })
                              }
                            />
                          </FormControl>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Box>
              <div className="">
                <button
                  className="bg-primary-600 text-white hover:bg-primary-400 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center ml-10"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <SpinTip />
          )}
        </>
      )}
    </div>
  );
}

export default UpdateInformation;
