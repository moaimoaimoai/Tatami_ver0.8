import React, { useCallback, useState, useEffect } from "react";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import getCroppedImg from "./getCroppedImg";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
// import { Link } from "react-router-dom";
// import { profile } from 'console';
// import { post } from 'jquery';
import Area from "react-easy-crop";
import MediaSize from "react-easy-crop";
import "./styles.css";
import CropperModal from "./CropperModal";
// import LinearProgress from '@mui/joy/LinearProgress'
import {
  Button,
  //  makeStyles,
  Slider,
} from "@material-ui/core";
// import { create } from 'domain';
export const ASPECT_RATIO = 2 / 1;
export const CROP_WIDTH = 400;

const Createpost = (props) => {
  const {
    createMonoPost,
    profile,
    // postimg,
    setPostimg,
    createdmonopost,
    setCreatedMonopost,
  } = useContext(ApiContext);

  // const useStyles = makeStyles({
  //     root: {
  //       marginTop: 3,
  //       minWidth: "100%",
  //       display: "flex",
  //       alignItems: "center",
  //       textAlign: "center",
  //       flexFlow: "column",
  //       "& .file-upload-container": {
  //         width: 500,
  //         marginTop: 10,
  //         "& .button": {
  //           backgroundColor: "#00A0FF",
  //           color: "white"
  //         }
  //       },
  //       "& .img-container": {
  //         marginTop: 40,
  //         width: `${CROP_WIDTH}px`,
  //         height: `${CROP_WIDTH / ASPECT_RATIO}px`,
  //         display: "flex",
  //         alinItems: "center",
  //         borderRadius: 5,
  //         border: "1px solid gray",
  //         overflow: "hidden",
  //         backgroundColor: "#EAEAEA",
  //         "& .img": {
  //           width: "100%",
  //           objectFit: "contain",
  //           backgroundColor: "#EAEAEA"
  //         },
  //         "& .no-img": {
  //           backgroundColor: "#EAEAEA",
  //           width: "100%",
  //           height: "100%",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //           color: "#000"
  //         }
  //       }
  //     }
  //   });
  // const classes = useStyles();
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

  /** 切り取ったあとの画像URL */
  const [croppedImgSrc, setCroppedImgSrc] = useState("");

  const [content, setContent] = useState("");

  const doPost = () => {
    onHandleClose();

    const tempPost = createdmonopost;
    tempPost.text = content;
    tempPost.reviewTo = props.postTo;

    setCreatedMonopost(tempPost);

    createMonoPost();
  };

  const onHandleClose = () => {
    setCroppedImgSrc("");
    setPostimg([]);
    props.handleClose();
  }

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
      setCroppedImgSrc(croppedImage);
      const file = new File([croppedImage], `profile_view.jpg`, {
        type: croppedImage.type,
      });
      setPostimg(file);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc, profile.nickName, setPostimg]);

  const handleInputChange = () => (event) => {
    setContent(event.target.value)
  };

  // const handleSliderChange = () => event => {
  //     const value = event.target.value
  //     setCreatedMonopost({...createdmonopost, rating:value, reviewTo: postTo.postTo})
  // }
  // const [rate, setRate] = useState(null)

  const handleChange = (event, newValue) => {
    setCreatedMonopost({
      ...createdmonopost,
      rating: newValue,
      reviewTo: props.postTo,
    });
  };

  useEffect(() => {
    setCreatedMonopost({
      ...createdmonopost,
      rating: 70,
      reviewTo: props.postTo,
    });
  }, []);

  return (
    <Dialog
      className="animated fadeIn"
      open={props.isVisible}
      onClose={() => onHandleClose()}
      aria-labelledby="max-width-dialog-title"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle className="mycard" id="max-width-dialog-title">意見をポスト</DialogTitle>
      <DialogContent className="mycard">
        <form action="#">
          <div className="card w-100 shadow-xss rounded-xxl border-0 ps-3 pt-0 pe-3 pb-3 mt-3 mb-3">
            <div className="card-body  position-relative">
              <div className="ms-3 mt-3 col-12">
                <h2 className="font-xsss  lh-1 text-grey-500 fw-600">
                  スライドしてシンパシーを示す
                </h2>
              </div>
              <div className="card-body  w-100 ps-1 pe-1 pt-0 pb-0">
                {/* <input type="range" step="1" min="1" max="100"className=" form-control rounded-xxl" name='rating' onChange={handleInputChange()}/> */}

                <Slider
                  defaultValue={70}
                  valueLabelDisplay="auto"
                  marks
                  step={5}
                  color="secondary"
                  aria-label="Default"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* <div className="ms-auto">
                <div className="card w-30 shadow-xss rounded-xxl border-0 mt-2 p-3 mb-0">
                    <div className="card-body p-0 d-flex pointer" >
                        <label className="display2-size lh-1 m-0 text-grey-900 fw-700"> { createdmonopost.rating ?
                        createdmonopost.rating:
                        0}%
                        </label>
                        
                    </div>
                    <div className="card-body p-0 mt-2">
                        <LinearProgress
                            color="info"
                            determinate
                            size="sm"
                            value= {createdmonopost.rating}
                            variant="plain"
                            />
                    </div>
                </div>
            </div> */}

            <div className="card-body ps-2 pe-2 pt-0 pb-1 position-relative">
              <figure className="avatar position-absolute ms-2 mt-2 top-5">
                <img
                  src={profile.img}
                  alt="icon"
                  className="shadow-sm rounded-circle w30"
                />
              </figure>
              <textarea
                onChange={handleInputChange()}
                value={content}
                name="text"
                className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss fw-500 theme-dark-text border-light-md theme-dark-bg"
                cols="30"
                rows="10"
                placeholder="意見をポスト..."
              ></textarea>
            </div>
            <div className="card-body d-block p-0">
              {croppedImgSrc ? (
                <div className="card-body  position-relative">
                  <label className="mont-font fw-600 font-xssss mb-1">
                    画像がアップロードされました。
                  </label>
                </div>
              ) : (
                <></>
              )}
            </div>

            {/* ここからトリミング */}
            <div className="card-body p-0 d-flex">
              <div className="file-upload-container">
                <Button
                  className="bg-current text-center text-white font-xsss fw-600 pt-1 pb-1 ps-1 pe-1 ms-2 w125 rounded-3"
                  variant="contained"
                  component="label"
                >
                  アップロード
                  <input type="file" hidden onChange={onFileChange} />
                </Button>
              </div>
              <CropperModal
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
              {/* <div className="card-body p-0">
                {
                  createdmonopost.text ? (
                    <Button
                      className="bg-current text-center text-white font-xsss fw-600 pt-1 pb-1 ps-1 pe-1 ms-3 w125 rounded-3"
                      variant="contained"
                      component="label"
                      onClick={() => createMonoPost()}
                    >
                      Post!
                    </Button>
                  ) : (
                    // <a className="pointer bg-current text-center text-white font-xsss fw-600 ms-3 p-3 mt-3 w175 rounded-3 d-inline-block" onClick={() => createMonoPost()}>Post!</a>)
                    <Button
                      className="bg-dark text-center text-white font-xsss fw-600 pt-1 pb-1 ps-1 pe-1 ms-3 w125 rounded-3"
                      variant="contained"
                      component="label"
                      disabled
                    >
                      Post
                    </Button>
                  )
                  // (<a className="bg-dark text-center text-white ms-3 mt-3 font-xsss fw-600 p-3 w175 rounded-3 d-inline-block" disabled>Post</a>)
                }
              </div> */}
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions className="mycard">
        {content ? (
          <Button
            color="secondary"
            variant="contained"
            onClick={doPost}
          >
            投稿
          </Button>
        ) : (
          <Button
            onClick={() => onHandleClose()}
            color="secondary"
            variant="contained"
            disabled
          >
            投稿
          </Button>
        )}
        <Button onClick={() => onHandleClose()} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Createpost;
