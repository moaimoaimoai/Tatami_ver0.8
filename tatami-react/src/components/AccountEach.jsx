import React, { useContext, useCallback, useState } from "react";
import { ApiContext } from "../context/ApiContext";
import { Link } from "react-router-dom";
import getCroppedImg from "./getCroppedImg";
import Area from "react-easy-crop";
import MediaSize from "react-easy-crop";
import "./styles.css";
import CropperModalforprof from "./CropperModalforprof";
import clsx from 'clsx'
import {
  Button,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ProfBack from "./ProfBack";
import { SnackbarContext } from "../context/SnackbarContext";
import { ErrorOutline } from "@material-ui/icons";


export const ASPECT_RATIO = 1 / 1;
export const CROP_WIDTH = 400;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: 30,
      minWidth: "100%",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      flexFlow: "column",
      "& .file-upload-container": {
        width: 500,
        marginTop: 10,
        "& .button": {
          backgroundColor: "#00A0FF",
          color: "white",
        },
      },
      "& .img-container": {
        marginTop: 40,
        width: `${CROP_WIDTH}px`,
        height: `${CROP_WIDTH / ASPECT_RATIO}px`,
        display: "flex",
        alinItems: "center",
        borderRadius: 5,
        border: "1px solid gray",
        overflow: "hidden",
        backgroundColor: "#EAEAEA",
        "& .img": {
          width: "100%",
          objectFit: "contain",
          backgroundColor: "#EAEAEA",
        },
        "& .no-img": {
          backgroundColor: "#EAEAEA",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
        },
      },
    },
    validationWrapper: {
      float: "right"
    }
  }
})

const AccountEach = () => {
  const classes = useStyles();
  const { newSnack } = useContext(SnackbarContext);
  const {
    profile,
    editedProfile,
    setEditedProfile,
    deleteProfile,
    setCover,
    // coverBack,
    createProfile,
    editProfile,
  } = useContext(ApiContext);

  /** Cropモーダルの開閉 */
  const [isOpen, setIsOpen] = useState(false);

  /** アップロードした画像URL */
  const [imgSrc, setImgSrc] = useState("");

  /** 画像の拡大縮小倍率 */
  const [zoom, setZoom] = useState(1);
  /** 画像拡大縮小の最小値 */
  const [minZoom, setMinZoom] = useState(1);

  /** 切り取る領域の情報 */
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  /** 切り取る領域の情報 */
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  /**
   * ファイルアップロード後
   * 画像ファイルのURLをセットしモーダルを表示する
   */
  const onFileChange = useCallback(async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (reader.result) {
          setImgSrc(reader.result.toString() || "");
          setIsOpen(true);
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  /**
   * Cropper側で画像データ読み込み完了
   * Zoomの最小値をセットしZoomの値も更新
   */
  const onMediaLoaded = useCallback((mediaSize) => {
    const { width, height } = mediaSize;
    const mediaAspectRadio = width / height;
    if (mediaAspectRadio > ASPECT_RATIO) {
      // 縦幅に合わせてZoomを指定
      const result = CROP_WIDTH / ASPECT_RATIO / height;
      setZoom(result);
      setMinZoom(result);
      return;
    }
    // 横幅に合わせてZoomを指定
    const result = CROP_WIDTH / width;
    setZoom(result);
    setMinZoom(result);
  }, []);

  /**
   * 切り取り完了後、切り取り領域の情報をセット
   */
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  /**
   * 切り取り後の画像を生成し画面に表示
   */
  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      const file = new File([croppedImage], `avatar_upload.jpg`, {
        type: croppedImage.type,
      });
      setCover(file);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc, profile.nickName, setCover]);

  const handleInputChange = () => (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const submit = () => {
    if (!editedProfile.nickName || !editedProfile.caption || !editedProfile.birthday) {
      newSnack("warning", "プロフィールを記入してください。");
      return;
    }
    editProfile();
  }

  // console.log("AccountEach", editedProfile.sex);

  return (
    <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
      {!editedProfile ? <></> :
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="middle-wrap">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                  <Link to="/settings" className="d-inline-block mt-2">
                    <i className="ti-arrow-left font-sm text-white"></i>
                  </Link>
                  <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                    アカウント情報
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 text-center">
                      {profile.id ? (
                        <figure className="avatar ms-auto me-auto mb-0 mt-2 w100">
                          <img
                            src={profile.img}
                            alt="avater"
                            className="shadow-sm rounded-3 w-100"
                          />
                        </figure>
                      ) : (
                        <figure className="avatar ms-auto me-auto mb-0 mt-2 w100">
                          <img
                            src="https://ow6r85j5w096clt.site/media/image/サラリーマン.jpeg"
                            alt="avater"
                            className="shadow-sm rounded-3 w-100"
                          />
                        </figure>
                      )}
                      <h2 className="fw-700 font-sm text-grey-900 mt-3">
                        {profile.nickName}
                      </h2>
                      <h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">
                        {profile.created_on}
                      </h4>
                    </div>
                  </div>

                  <form action="#" encType="multipart/form-data">
                    <div className="row">
                      <div className="col-lg-12 ">
                        <div className={classes.root}>
                          <div className="file-upload-container">
                            <Button
                              className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                              variant="contained"
                              component="label"
                            >
                              トップ画像を追加
                              <input type="file" hidden onChange={onFileChange} />
                            </Button>
                          </div>
                          <CropperModalforprof
                            crop={crop}
                            setCrop={setCrop}
                            zoom={zoom}
                            setZoom={setZoom}
                            onCropComplete={onCropComplete}
                            open={isOpen}
                            onClose={() => setIsOpen(false)}
                            imgSrc={imgSrc}
                            showCroppedImage={showCroppedImage}
                            onMediaLoaded={onMediaLoaded}
                            minZoom={minZoom}
                          />
                          {imgSrc ? (
                            <div className="card-body  position-relative">
                              <label className="mont-font fw-600 font-xssss mb-2">
                                Top Image has uploaded!
                              </label>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            アカウント名
                            {editedProfile.nickName ? <></> : <span className="text-danger font-xs">{" "} *</span>}
                          </label>
                          <input
                            type="text"
                            maxLength={20}
                            className={editedProfile.nickName ? "form-control" : "form-control  border-danger"}
                            value={editedProfile.nickName}
                            name="nickName"
                            onChange={handleInputChange()}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            生年月日
                            {editedProfile.birthday ? <></> : <span className="text-danger font-xs">{" "} *</span>}

                          </label>
                          <input
                            type="date"
                            className={editedProfile.birthday ? "form-control" : "form-control  border-danger"}
                            value={editedProfile.birthday}
                            name="birthday"
                            onChange={handleInputChange()}
                          />
                          {/* {profile ? (
                            <></>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            disabled
                          />
                        )} */}
                        </div>
                      </div>

                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            性別
                          </label>
                          <br></br>
                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label="position"
                              name="sex"
                              value={editedProfile.sex}
                              onChange={handleInputChange()}
                              row
                            >
                              <FormControlLabel
                                value="0"
                                control={<Radio color="default" />}
                                label="男"
                                labelPlacement="end"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio color="default" />}
                                label="女"
                                labelPlacement="end"
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </div>

                      <div className="col-lg-12 mb-3">
                        <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                          キャプション
                          {editedProfile.caption ? <></> : <span className="text-danger font-xs">{" "} *</span>}

                        </label>
                        <textarea
                          className={editedProfile.caption ? "form-control mb-0 p-3 h100 bg-greylight lh-16" :
                            "form-control mb-0 p-3 h100 bg-greylight lh-16 border-danger"}
                          name="caption"
                          maxLength={100}
                          rows="5"
                          value={editedProfile.caption}
                          onChange={handleInputChange()}
                        ></textarea>
                      </div>

                      <div className="col-lg-12">
                        {
                          editedProfile.id ? (
                            <Button
                              className="bg-current text-center text-white font-xsss fw-600 p-3 ms-3 w175 rounded-3 mt-3"
                              variant="contained"
                              component="label"
                              onClick={submit}
                            >
                              編集結果を保存
                            </Button>
                          ) : (
                            // <button className="pointer me-2 bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block" onClick={() => editProfile()}>編集結果を保存</button>)
                            <Button
                              className="bg-current text-center text-white font-xsss fw-600 p-3 ms-3 w175 rounded-3 mt-3"
                              variant="contained"
                              component="label"
                              onClick={() => createProfile()}
                            >
                              新規作成
                            </Button>
                          )
                          // <button className="bg-current me-2 text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block" onClick={() => createProfile()}>編集結果を保存</button>)
                        }
                        <Button
                          className="bg-dark text-center text-white font-xsss fw-600 p-3 ms-3 w175 rounded-3 mt-3"
                          variant="contained"
                          component="label"
                          onClick={() => deleteProfile()}
                        >
                          プロフィールを削除
                        </Button>
                        {/* <button onClick={() => deleteProfile()} className='bg-grey text-center text-black mt-3 font-xsss fw-600 p-3 w175 rounded-3 d-inline-block'>プロフィールを削除</button> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>
  );
};

export default AccountEach;
