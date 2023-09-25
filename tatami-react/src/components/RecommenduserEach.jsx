import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { useHistory } from "react-router-dom";

import clsx from 'clsx';

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginBottom: "1rem",
  },
  cardContent: {
    minHeight: "160px",
  },
  media: {
    height: 140,
  }
});

const RecommenduserEach = ({ profileeach }) => {
  const classes = useStyles();
  const {
    profile,
    newRequestFriend,
    newUserIntUser,
    getUserInterest,
    followinguser,
  } = useContext(ApiContext);
  const history = useHistory();
  const createNewRequest = () => {
    const uploadDataAsk = new FormData();
    uploadDataAsk.append("askTo", profileeach.userProfile);
    uploadDataAsk.append("approved", false);
    newRequestFriend(uploadDataAsk);
  };

  const toSpecificUserPage = () => {
    if (profile.userProfile === profileeach.userProfile) {
      console.log("本人");
      history.push("/userpage");
    } else {
      // const createdIntData = new FormData();
      // createdIntData.append("intUserId", profileeach.userProfile);
      // newUserIntUser(profileeach.userProfile);
      // console.log("ちがう");
      // getUserInterest();
      // getUserInterest();
      // getUserInterest();
      history.push(`/user/${profileeach.userProfile}`);
    }
  };

  const isfollow =
    followinguser.find((item) => {
      return item.userProfile === profileeach.userProfile;
    }) || profileeach.userProfile === profile.userProfile;

  return (
    <div className="col-md-3 col-sm-4 pe-2 ps-2">
      <Card className={clsx(classes.card, "card")}>
        <CardContent className={clsx(classes.cardContent, "text-center", "mycard")}>
          <figure
            className="overflow-hidden avatar ms-auto me-auto mb-3 position-relative w65 z-index-1 pointer"
            onClick={() => toSpecificUserPage()}
          >
            <img
              src={profileeach.img}
              alt="avatar"
              className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
            />
          </figure>
          <h4 className="fw-700 font-xsss mt-3 mb-0">
            {profileeach.nickName}{" "}
          </h4>
        </CardContent>
        <CardActions className="mycard">
          <Grid container justifyContent="center">
            <Grid item>
              {!isfollow ? (
                <button
                  className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                  onClick={() => createNewRequest()}
                >
                  フォロー
                </button>
              ) : (
                <button
                  className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                  disabled
                >
                  フォロー中
                </button>
              )}
            </Grid>
          </Grid>
        </CardActions>

      </Card>
      {/* <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
        <div className="card-body position-relative d-block w-100 ps-3 pe-3 pb-4 text-center min-h-150">
          {profileeach.img ? (
            <figure
              className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1 pointer"
              onClick={() => toSpecificUserPage()}
            >
              <img
                src={profileeach.img}
                alt="avater"
                className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
              />
            </figure>
          ) : (
            <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
              <img
                src=process.env.REACT_APP_API_URL + "/media/avatars/default.jpg"
                alt="avater"
                className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
              />
            </figure>
          )}
          <div className="clearfix w-100"></div>
          <h4 className="fw-700 font-xsss mt-3 mb-0">
            {profileeach.nickName}{" "}
          </h4>
          <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
            {profileeach.created_on}
          </p>
        </div>
      </div>
    </div> */}
    </div>
  );
};

export default RecommenduserEach;
