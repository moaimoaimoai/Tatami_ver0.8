import React, {
  useContext,
  //  useState
} from "react";

import { ApiContext } from "../context/ApiContext";
import { useHistory, Link } from "react-router-dom";
import LinearProgress from "@mui/joy/LinearProgress";
import { useCookies } from "react-cookie";
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
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginBottom: "1rem",
    position: "relative",
  },
  cardContent: {
    minHeight: "150px",
  },
  media: {
    height: 140,
  },
  moveToBtn: {
    position: "absolute",
    right: "10px",
    bottom: "80px",
    zIndex: "2"
  }
});

const RecommendEach = (pageData, isfollow) => {
  const classes = useStyles();
  const history = useHistory();
  const { newUserIntPage, getUserInterest, monoposts } = useContext(ApiContext);

  const toMonopage = () => {
    // if (token !== undefined) {
    // const createdIntData = new FormData();
    // createdIntData.append("intPageId", pageData.pageData.id);
    // newUserIntPage(pageData.pageData.id);
    // }
    // getUserInterest();
    // getUserInterest()
    history.push("/mono/" + pageData.pageData.id);
  };

  // const [rate, setRate] = useState([]);
  // const [rates, setRates] = useState([]);

  const postsforpage = monoposts.filter((each) => {
    return each.reviewTo === Number(pageData.pageData.id);
  });

  const rates = postsforpage.map((post) => {
    return post.rating;
  });

  let sum = 0;
  for (let i = 0; i < rates.length; i++) {
    sum += rates[i];
  }

  // rates&& setRate(Math.round(sum/rates.length))
  Math.round(sum / rates.length);

  // console.log("pageData/rating ", pageData.pageData.rating);

  return (
    <div className="col-md-6 col-sm-12">
      <Card className={clsx(classes.card, "card")}>
        <a
          onClick={(ev) => {
            ev.preventDefault();
            toMonopage();
          }}
          className={clsx(classes.moveToBtn, "pointer")}
        >
          <i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right"></i>
        </a>
        <CardActionArea onClick={() => {
          toMonopage();
        }}>
          <CardMedia
            className={classes.media}
            image={pageData.pageData.img}
            title="Hotel"
          />
          <CardContent className={clsx(classes.cardContent, "mycard")}>
            <Typography gutterBottom variant="h5" component="h2" className = "black-typography">
              {pageData.pageData.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className = "black-typography">
              {pageData.pageData.created_on}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="mycard">
          <div className="row">
            <div className="col-12">
              <h2 className="font-xss  lh-1 mt-2 text-grey-900 fw-300 black-typography">
                {Math.round(sum / rates.length)}
              </h2>
            </div>
          </div>
          <LinearProgress
            className={classes.linearProgress}
            color="info"
            determinate
            size="sm"
            value={pageData.pageData.rating}
            variant="plain"
          />
        </CardActions>
      </Card>
    </div>
    // <div className="col-md-5 col-sm-6 pe-2 ps-2">
    //   <div
    //     className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-2 ms-2 mb-3"
    //     onClick={toMonopage}
    //   >
    //     {/* {value.feature ? <span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary-gradiant d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">Featured</span> : ''} */}
    //     <div className="card-image w-100 mb-3">
    //       <Link to="/mono" className="position-relative d-block">
    //         <img src={pageData.pageData.img} alt="hotel" className="w-100" />
    //       </Link>
    //     </div>
    //     <div className="card-body pt-0">
    //       {/* <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i> */}
    //       <h4 className="fw-700 font-xss mt-0 lh-28 mb-0 pe-3">
    //         <Link to="/mono" className="text-dark text-grey-900">
    //           {pageData.pageData.title}
    //         </Link>
    //       </h4>
    //       <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2">
    //         {" "}
    //         {pageData.pageData.created_on}
    //       </h6>

    //       <div className="card-body p-1 mb-3">
    //         <div className="row">
    //           <div className="col-12">
    //             <h2 className="font-xss  lh-1 mt-2 text-grey-900 fw-300">
    //               {Math.round(sum / rates.length)}
    //             </h2>
    //           </div>
    //         </div>
    //         <LinearProgress
    //           color="info"
    //           determinate
    //           size="sm"
    //           value={pageData.pageData.rating}
    //           variant="plain"
    //         />
    //       </div>
    //       <div className="clearfix"></div>
    //       <span className="font-xsss fw-700 mt-0 pe-5 ls-2 lh-32 d-inline-block text-success float-left">
    //         <span className="font-xssss"></span>
    //         {/* {pageData.summary.slice(0,10)}.. */}
    //       </span>
    //       <Link
    //         to="/mono"
    //         className="position-absolute bottom-15 mb-5 ms-2 right-15"
    //       >
    //         <i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right"></i>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default RecommendEach;
