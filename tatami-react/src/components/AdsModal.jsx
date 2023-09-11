import React, { useCallback, useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import getCroppedImg from "./getCroppedImg";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Button, Slider } from "@material-ui/core";
import clsx from 'clsx';
import "./styles.css";

export const ASPECT_RATIO = 2 / 1;
export const CROP_WIDTH = 400;

const inital_state = {
    type: 0,
    target: 0,
    url: "",
    content: ""
}

const AdsModal = (props) => {

    const file = useRef();

    const [imgSrc, setImgSrc] = useState("");

    const [preview, setPreview] = useState(false);

    const [targets, setTargets] = useState([500, 1000, 3000]);

    const [adsData, setAdsData] = useState(inital_state);

    const { postAds, profile } = useContext(ApiContext);

    const imgStyle = {
        borderRadius: '15px',
        padding: '2px',
        border: '1px solid gray',
        maxHeight: '130px'
    }

    const post = async () => {
        const data = new FormData();
        data.append("type", adsData.type);
        data.append("target", targets[adsData.target]);
        data.append("url", adsData.url);
        data.append("content", adsData.content);
        data.append("updateCnt", 0);
        data.append("updateDelFlag", 0);
        data.append("img", file.current.files[0]);
        postAds(data);
        setImgSrc("");
        setAdsData(inital_state);
        props.handleClose();
    };

    const onFileChange = useCallback(async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (reader.result) {
                    setImgSrc(reader.result.toString() || "");
                }
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    }, [adsData]);

    const handleInputChange = () => (event) => {
        const value = event.target.value;
        const name = event.target.name;
        // console.log(adsData);
        setAdsData({ ...adsData, [name]: value });
    };

    return (
        <Dialog
            className="animated fadeIn"
            open={props.isVisible}
            onClose={props.handleClose}
            aria-labelledby="max-width-dialog-title"
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle className="mycard" id="max-width-dialog-title">Advertisement</DialogTitle>
            <DialogContent className="mycard">
                <div className="form-group">
                    <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                        Item1
                        {adsData.content ? <></> : <span className="text-danger font-xs">{" "} *</span>}
                    </label>
                    <textarea
                        value={adsData.content}
                        onChange={handleInputChange()}
                        name="content"
                        className="h100 bor-0 w-100 rounded-xxl p-2 font-xssss fw-500 theme-dark-text border-light-md theme-dark-bg"
                        cols="20"
                        rows="10"
                        placeholder="意見をポスト..."
                    />
                </div>
                <div className="form-group">
                    <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                        Item2
                    </label>
                    <input
                        value={adsData.url}
                        type="text"
                        className="form-control"
                        name="url"
                        onChange={handleInputChange()}
                    />
                </div>
                <div className="row mb-4">
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                                Item3
                            </label>
                            <select
                                className="form-control"
                                name="type"
                                value={adsData.type}
                                onChange={handleInputChange()}
                            >
                                <option value={0}>Impression</option>
                                <option value={1}>Click</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                                Item4
                            </label>
                            <select
                                className="form-control"
                                name="target"
                                value={adsData.target}
                                onChange={handleInputChange()}
                            >
                                {
                                    targets.map((value, index) => {
                                        return <option key={index} value={index}>{value}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-md-6 col-sm-12 mb-2 d-flex justify-content-center">
                        {
                            imgSrc ?
                                <img style={imgStyle} src={imgSrc} maxWidth={"100%"} />
                                :
                                <div style={{ ...imgStyle, height: '100%' }} className="d-flex full-width justify-content-center align-items-center">
                                    No Image
                                </div>
                        }
                    </div>
                    <div className="row col-md-6 col-sm-12">
                        <div className="col-md-12 mb-1">
                            <Button
                                className={"full-width bg-current mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-4 font-xsssss fw-700 ls-lg text-white"}
                                variant="contained"
                                fullWidth={true}
                                component="label"
                            >
                                トップ画像を追加
                                {imgSrc ? <></> : <span className="text-danger font-xs">{" "} *</span>}
                                <input type="file" hidden onChange={onFileChange} ref={file} />
                            </Button>
                        </div>
                        <div className="col-md-12 mb-1">
                            {
                                imgSrc ?
                                    <button
                                        onClick={() => setPreview(true)}
                                        className="full-width bg-current mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-4 font-xsssss fw-700 ls-lg text-white"
                                    >
                                        Preview
                                    </button>
                                    :
                                    <button
                                        disabled
                                        className="full-width mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-4 btn-dark font-xsssss fw-700 ls-lg text-white"
                                    >
                                        Preview
                                    </button>
                            }
                        </div>
                        <div className="col-md-12 mb-1">
                            {
                                imgSrc && adsData.content ?
                                    <button
                                        onClick={post}
                                        className="full-width bg-current mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-4 font-xsssss fw-700 ls-lg text-white"
                                    >
                                        POST
                                    </button>
                                    :
                                    <button
                                        disabled
                                        className="full-width mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-4 btn-dark font-xsssss fw-700 ls-lg text-white"
                                    >
                                        POST
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </DialogContent>
            <Dialog onClose={() => setPreview(false)} aria-labelledby="simple-dialog-title" open={preview}>
                <DialogTitle id="simple-dialog-title">Image Preview</DialogTitle>
                <img src={imgSrc} />
            </Dialog>
        </Dialog >
    );
};

export default AdsModal;
