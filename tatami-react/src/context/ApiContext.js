import React, { createContext, useState, useEffect, useContext } from "react";
import { withCookies, useCookies } from "react-cookie";
import axios from "axios";

import { SnackbarContext } from './SnackbarContext';
import { useHistory, useLocation } from "react-router-dom";
// import { Toast } from "react-bootstrap";
export const ApiContext = createContext();

const ApiContextProvider = (props) => {

  const history = useHistory();
  const [ads, setAds] = useState([]);
  const [userAds, setUserAds] = useState([]);
  const [token, setUserToken] = useState(props.cookies.get("current-token"));
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [specificProfile, setSpecificProfile] = useState([]);
  const [editedProfile, setEditedProfile] = useState(null);
  const [askList, setAskList] = useState([]);
  const [askData, setAskData] = useState([])
  const [askListFull, setAskListFull] = useState([]);
  const [cover, setCover] = useState([]);
  const [coverBack, setCoverBack] = useState([]);
  const [monopages, setMonopages] = useState([])
  const [monoposts, setMonoposts] = useState([])
  const [mymonoposts, setMyMonoposts] = useState([])
  const [monocomments, setMonocomments] = useState([])
  const [pageattribute, setPageattribute] = useState([])
  const [currentPageId, setCurrentPageId] = useState([])
  const [intpage, setIntpage] = useState([])
  const [postsforintpage, setPostsforintpage] = useState([])
  const [intpost, setIntpost] = useState([])
  const [intuser, setIntuser] = useState([])
  const [intcomment, setIntComment] = useState([])
  const [intattribute, setIntAttribute] = useState([])
  const [postsforintuser, setPostsforintuser] = useState([])
  const [monopageposts, setMonopageposts] = useState([])
  const [postimg, setPostimg] = useState([])
  const [createdmonopost, setCreatedMonopost] = useState({ text: "", rating: "", reviewTo: "" })
  const [friendrequest, setFriendRequest] = useState([])
  const [commentsforintpost, setCommentsforintpost] = useState([])
  const [createdcomment, setCreatedcomment] = useState({ text: "", post: "" })
  const [followinguserpost, setFollowinguserpost] = useState([])
  const [followinguser, setFollowinguser] = useState([])
  const [followeduser, setFolloweduser] = useState([])
  const [mutualfollowinguser, setMutualfollowinguser] = useState([])
  const [followingpage, setFollowingpage] = useState([])
  const [owningpage, setOwningpage] = useState([])
  const [pagesforintattribute, setPagesforintattribute] = useState([])
  const [affiliates, setAffiliates] = useState([])
  const [isfollowingpage, setIsfollowingpage] = useState([])
  const { pathname } = useLocation();
  // const [isowningpage, setIsOwningpage] =useState([])

  const { newSnack } = useContext(SnackbarContext);

  const setToken = (pToken) => {
    setUserToken(pToken);
  }

  // useEffect(() => {
  //   Toastr.success("ok", "ok")
  // }, [])

  useEffect(() => {
    // console.log("UseEffect");
    const getMyProfile = async () => {
      try {
        if (!token) return;
        const resmy = await axios.get(
          process.env.REACT_APP_API_URL + "/api/user/myprofile/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        if (resmy.data[0] && resmy.data[0].birth === null) {
          newSnack("info", "プロフィールを記入してください。");
          history.push('/account');
        }
        const res = await axios.get(
          process.env.REACT_APP_API_URL + "/api/user/approval/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        resmy.data[0] && setProfile(resmy.data[0]);
        resmy.data[0] &&
          setEditedProfile({
            id: resmy.data[0].id,
            nickName: resmy.data[0].nickName,
            caption: resmy.data[0].caption,
            birthday: resmy.data[0].birth,
            sex: resmy.data[0].sex === null ? "0" : resmy.data[0].sex.toString()
          });
        resmy.data[0] &&
          setAskList(
            res.data.filter((ask) => {
              return resmy.data[0].userProfile === ask.askTo;
            })
          );
        setAskListFull(res.data);
        // console.log("GetMyProfile", resmy.data[0].birth);

        // if (resmy.data[0].birth === null && window.location != '/account') window.location = '/acoount';
      } catch {
        console.log("error-getMyProfile");
      }
    };

    {
      // const getFriendRequest = async () => {
      //   try {
      //     const resreqall = await axios.get(process.env.REACT_APP_API_URL + "/api/user/approval/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const requests = resreqall.data.filter((each) => {
      //       return each.approved === false
      //     })
      //     const requestsfromother = requests.filter((each) => {
      //       return each.askFrom !== profile.userProfile
      //     })
      //     setFriendRequest(requestsfromother)


      //   } catch {
      //     console.log("error");
      //   }
      // }





      // const getProfile = async () => {
      //   try {
      //     const res = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     setProfiles(res.data);
      //   } catch {
      //     console.log("error");
      //   }
      // };


      // const getMonoPages = async () => {
      //   try {
      //     console.log("getMonoPages")
      //     const res = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     setMonopages(res.data)
      //   } catch {
      //     console.log("error")
      //   }
      // }
      // const getMonoPosts = async () => {
      //   try {
      //     const res = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     setMonoposts(res.data);
      //   } catch {
      //     console.log("error");
      //   }
      // }

      // const getMonoComments = async () => {
      //   try {
      //     const res = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monocomment/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     setMonocomments(res.data);
      //   } catch {
      //     console.log("error");
      //   }
      // }
    }

    const getAttribute = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_API_URL + "/api/user/pageattribute/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        setPageattribute(res.data);
      } catch {
        console.log("error-getAttribute");
      }
    }

    {
      // const getFollowingUserPosts = async () => {
      //   try {
      //     const respost = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     const resreqall = await axios.get(process.env.REACT_APP_API_URL + "/api/user/approval/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const following = resreqall.data.filter((each) => {
      //       return each
      //     });
      //     const a = following.map((follow) => {
      //       return follow.askTo
      //     })
      //     const b = following.map((follow) => {
      //       return follow.askFrom
      //     })
      //     const concat = [...a, ...b]
      //     const set = new Set(concat)
      //     const followinguser = [...set]
      //     const post = respost.data.filter((post) => {
      //       return (followinguser.includes(post.userPost))
      //     })
      //     post && setFollowinguserpost(post);
      //   } catch {
      //     console.log("error");
      //   }
      // }

      // const getFollowingUser = async () => {
      //   try {
      //     const resreqall = await axios.get(process.env.REACT_APP_API_URL + "/api/user/approval/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const resprof = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const following = resreqall.data.filter((each) => {
      //       return each
      //     });
      //     const a = following.map((follow) => {
      //       return follow.askTo
      //     })
      //     const b = following.map((follow) => {
      //       return follow.askFrom
      //     })
      //     const concat = [...a, ...b]
      //     const set = new Set(concat)
      //     const followinguser = [...set]
      //     const followinguserprof = resprof.data.filter((prof) => {
      //       return (followinguser.includes(prof.userProfile))
      //     })
      //     followinguserprof && setFollowinguser(followinguserprof)
      //   } catch {
      //     console.log("error");
      //   }
      // }

      // const getFollowedUser = async () => {
      //   try {
      //     const resreqall = await axios.get(process.env.REACT_APP_API_URL + "/api/user/approval/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const resprof = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const following = resreqall.data.filter((each) => {
      //       return each
      //     });
      //     const a = following.map((follow) => {
      //       return follow.askTo
      //     })
      //     const concat = [...a]
      //     const set = new Set(concat)
      //     const followedusers = [...set]
      //     const followeduserprof = resprof.data.filter((prof) => {
      //       return (followedusers.includes(prof.userProfile))
      //     })
      //     followeduserprof && setFolloweduser(followeduserprof)
      //   } catch {
      //     console.log("error");
      //   }
      // }

      // const getMutualFollowingUser = async () => {
      //   try {
      //     const resreqall = await axios.get(process.env.REACT_APP_API_URL + "/api/user/approval/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const resprof = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const following = resreqall.data.filter((each) => {
      //       return each.approved === true
      //     });
      //     const a = following.map((follow) => {
      //       return follow.askTo
      //     })
      //     const b = following.map((follow) => {
      //       return follow.askFrom
      //     })
      //     const concat = [...a, ...b]
      //     const set = new Set(concat)
      //     const followinguser = [...set]
      //     const followinguserprof = resprof.data.filter((prof) => {
      //       return (followinguser.includes(prof.userProfile))
      //     })
      //     followinguserprof && setMutualfollowinguser(followinguserprof)
      //   } catch {
      //     console.log("error");
      //   }
      // }


      // const getFollowingPage = async () => {
      //   try {
      //     const respage = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const resfollow = await axios.get(process.env.REACT_APP_API_URL + "/api/user/followingpage/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const followingpageid = resfollow.data.map((follow) => {
      //       return follow.pageId
      //     });
      //     const followingpageinfo = respage.data.filter((page) => {
      //       return (followingpageid.includes(page.id))
      //     });
      //     followingpageinfo && setFollowingpage(followingpageinfo);
      //   } catch {
      //     console.log("error")
      //   }
      // }

      // const getOwningPage = async () => {
      //   try {
      //     const respage = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const resown = await axios.get(process.env.REACT_APP_API_URL + "/api/user/owningpage/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const owningpageid = resown.data.map((own) => {
      //       return own.pageId
      //     });
      //     const owningpageinfo = respage.data.filter((page) => {
      //       return (owningpageid.includes(page.id))
      //     });
      //     owningpageinfo && setOwningpage(owningpageinfo);
      //   } catch {
      //     console.log("error")
      //   }
      // }



      // const getUserInterest = async () => {
      //   try {
      //     const resintpage = await axios.get(
      //       'http://localhost:8000/api/user/userintpage/',
      //         {
      //         headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     const resintpost = await axios.get(
      //       'http://localhost:8000/api/user/userintpost/',
      //         {
      //         headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     const resintcomment = await axios.get(
      //       'http://localhost:8000/api/user/userintcomment/',
      //         {
      //         headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     const resintuser = await axios.get(
      //       'http://localhost:8000/api/user/userintuser/',
      //         {
      //         headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     const resintattribute = await axios.get(process.env.REACT_APP_API_URL + "/api/user/userintattribute/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     const respage = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
      //       headers :{
      //         Authorization: `Token ${token}`,
      //       },
      //     });
      //     const respost = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     // const resuser = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
      //     //   headers: {
      //     //     Authorization: `Token ${token}`,
      //     //   },
      //     // })
      //     const rescomment = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monocomment/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     const resattribute = await axios.get(process.env.REACT_APP_API_URL + "/api/user/pageattribute/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     const resaf = await axios.get(process.env.REACT_APP_API_URL + "/api/user/affiliatelinks/", {
      //       headers: {
      //         Authorization: `Token ${token}`,
      //       },
      //     })
      //     resintpage.data[0] &&
      //     setIntpage(respage.data.find((each) => {
      //       return each.id === Number(resintpage.data[0].intPageId)
      //     }));
      //     resintpost.data[0] &&
      //     setIntpost(respost.data.find((each) => {
      //       return each.id === Number(resintpost.data[0].intPostId)
      //     }));
      //     resintcomment.data[0] &&
      //     setIntComment(rescomment.data.find((each) => {
      //       return each.id === Number(resintcomment.data[0].intCommentId)
      //     }));
      //     resintuser.data[0] &&
      //     // setIntuser(resuser.data.find((each) => {
      //     //   return each.userProfile === Number(resintuser.data[0].intUserId)
      //     // }));
      //     resintattribute.data[0] &&
      //     setIntAttribute(resattribute.data.find((each) => {
      //       return each.id === Number(resintattribute.data[0].intAttributeId)
      //     }));
      //     resintpage.data[0] &&
      //     setPostsforintpage(respost.data.filter((each) => {
      //       return each.reviewTo === Number(resintpage.data[0].intPageId)
      //     }));
      //     resintuser.data[0] &&
      //     setPostsforintuser(respost.data.filter((each) => {
      //       return each.userPost === Number(resintuser.data[0].intUserId)
      //     }));
      //     resintpost.data[0] &&
      //     setCommentsforintpost(rescomment.data.filter((each) => {
      //       return each.post === Number(resintpost.data[0].intPostId)
      //     }));
      //     console.log(resintattribute.data[0]);
      //     resintattribute.data[0] &&
      //     setPagesforintattribute(respage.data.filter((each) => {
      //       return each.attribute.includes(resintattribute.data[0].intAttributeId)
      //     }));
      //     resaf.data[0] &&
      //     setAffiliates(resaf.data[0])
      //     // const tmpIntpage =respage.data.find((each) => {
      //     //   return each.id === Number(resintpage.data[0].intPageId)
      //     // });
      //     // tmpIntpage && 
      //     // setAffiliates(resaf.data.find((each) => {
      //     //   return each.id === Number(tmpIntpage.affiliateId)
      //     // }));
      //     // tmpIntpage && 
      //     // setIsfollowingpage(respage.data.find((each) => {
      //     //   return each.id === tmpIntpage.id
      //     // }));
      //     console.log("API実行");
      //   } catch {
      //     console.log("getUserInteresterror");
      //   }
      // }
    }

    getMyProfile();
    getMonoComments();
    getProfile();
    getMonoPages();
    getMonoPosts();
    getFriendRequest();
    getFollowingUserPosts();
    getFollowingPage();
    getOwningPage();
    getAttribute();
    getFollowingUser();
    getMutualFollowingUser();
    getFollowedUser();
    // getUserInterest();
    getAds();

  }, [token, profile.id, profile.userProfile]); //// Problem -> Add some text ***profile.id, profile.userProfile***


  const getFollowingPage = async () => {
    try {
      // const respage = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // });
      const resfollow = await axios.get(process.env.REACT_APP_API_URL + "/api/user/followingpage/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // console.log(profile.userId);
      const filteredFollowingPage = resfollow.data.filter((item) => {
        return item.userId === profile.userProfile;
      })
      // const followingpageid = resfollow.data.map((follow) => {
      //   return follow.pageId
      // });
      // const followingpageinfo = monopages.filter((page) => {
      //   return (followingpageid.includes(page.id))
      // });
      console.log("getFollowingPage", filteredFollowingPage);
      filteredFollowingPage && setFollowingpage(filteredFollowingPage);
    } catch {
      console.log("error-getFollowingPage")
    }
  }

  const getOwningPage = async () => {
    try {
      const respage = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const resown = await axios.get(process.env.REACT_APP_API_URL + "/api/user/owningpage/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const owningpageid = resown.data.map((own) => {
        return own.pageId
      });
      const owningpageinfo = monopages.filter((page) => {
        return (owningpageid.includes(page.id))
      });
      owningpageinfo && setOwningpage(owningpageinfo);
    } catch {
      console.log("error-getOwningPage")
    }
  }

  const getFollowingUser = async () => {
    try {
      const resmy = await axios.get(
        process.env.REACT_APP_API_URL + "/api/user/myprofile/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const resreqall = await axios.get(process.env.REACT_APP_API_URL + "/api/user/approval/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const resprof = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const following = resreqall.data.filter((each) => {
        return each
      });
      const a = following.filter((follow) => {
        return (follow.askFrom === resmy.data[0].userProfile)
      }).map((follow) => {
        return follow.askTo;
      })
      // const b = following.map((follow) => {
      //   return follow.askFrom
      // })
      // console.log(resreqall.data);
      const concat = [...a]
      const set = new Set(concat)
      const followinguser = [...set]
      const followinguserprof = resprof.data.filter((prof) => {
        // console.log("prof", prof.userProfile);
        return (followinguser.includes(prof.userProfile))
      })
      // console.log("followinguserprof", followinguserprof);
      followinguserprof && setFollowinguser(followinguserprof)
    } catch {
      console.log("error-getFollowingUser");
    }
  }

  const getFollowedUser = async () => {
    try {
      const resmy = await axios.get(
        process.env.REACT_APP_API_URL + "/api/user/myprofile/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const resreqall = await axios.get(process.env.REACT_APP_API_URL + "/api/user/approval/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const resprof = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const following = resreqall.data.filter((each) => {
        return each
      });
      const a = following.filter((follow) => {
        return (follow.askTo === resmy.data[0].userProfile)
      }).map((follow) => {
        return follow.askFrom;
      })
      const concat = [...a]
      const set = new Set(concat)
      const followedusers = [...set]
      const followeduserprof = resprof.data.filter((prof) => {
        return (followedusers.includes(prof.userProfile))
      })
      followeduserprof && setFolloweduser(followeduserprof)
    } catch {
      console.log("error-getFollowedUser");
    }
  }

  const getMutualFollowingUser = async () => {
    try {
      const resreqall = await axios.get(process.env.REACT_APP_API_URL + "/api/user/approval/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const resprof = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const following = resreqall.data.filter((each) => {
        return each.approved === true
      });
      const a = following.map((follow) => {
        return follow.askTo
      })
      const b = following.map((follow) => {
        return follow.askFrom
      })
      const concat = [...a, ...b]
      const set = new Set(concat)
      const followinguser = [...set]
      const followinguserprof = resprof.data.filter((prof) => {
        return (followinguser.includes(prof.userProfile))
      })
      followinguserprof && setMutualfollowinguser(followinguserprof)
    } catch {
      console.log("error-getMutualFollowingUser");
    }
  }

  const getFriendRequest = async () => {
    try {

      const resreqall = await axios.get(process.env.REACT_APP_API_URL + "/api/user/approval/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const requests = resreqall.data.filter((each) => {
        return each.approved === false
      })
      requests.data && setFriendRequest(requests)
      // requests.data && setFriendRequest(requests.filter((each) => {
      //   return each.askTo === Number(resprof.data[0].userProfile)
      // }))

    } catch {
      console.log("error-getFriendRequest");
    }
  }





  const getProfile = async () => {
    try {
      // console.log("getProfile");
      const res = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setProfiles(res.data);
    } catch {
      console.log("error-getProfile");
    }
  };

  const getMonoPages = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setMonopages(res.data)
    } catch {
      console.log("error-getMonoPages")
    }
  }
  const getMonoPosts = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      setMonoposts(res.data);
    } catch {
      console.log("error-getMonoPosts");
    }
  }

  const getFollowingUserPosts = async () => {
    try {
      const respost = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      const resreqall = await axios.get(process.env.REACT_APP_API_URL + "/api/user/approval/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const following = resreqall.data.filter((each) => {
        return each
      });
      const a = following.map((follow) => {
        return follow.askTo
      })
      const b = following.map((follow) => {
        return follow.askFrom
      })
      const concat = [...a, ...b]
      const set = new Set(concat)
      const followinguser = [...set]
      const post = respost.data.filter((post) => {
        return (followinguser.includes(post.userPost))
      })
      post && setFollowinguserpost(post)
    } catch {
      console.log("error-getFollowingUserPosts");
    }
  }

  const getMonoComments = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monocomment/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      setMonocomments(res.data);
    } catch {
      console.log("error-getMonoComments");
    }
  }

  const getUserInterest = async () => {
    try {
      // console.log("GetUserInterest");
      const resintpage = await axios.get(
        process.env.REACT_APP_API_URL + "/api/user/userintpage/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      const resintpost = await axios.get(
        process.env.REACT_APP_API_URL + "/api/user/userintpost/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      const resintcomment = await axios.get(
        process.env.REACT_APP_API_URL + "/api/user/userintcomment/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      const resintuser = await axios.get(
        process.env.REACT_APP_API_URL + "/api/user/userintuser/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      const resintattribute = await axios.get(process.env.REACT_APP_API_URL + "/api/user/userintattribute/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      const respage = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const respost = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      const resuser = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      const rescomment = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monocomment/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      const resattribute = await axios.get(process.env.REACT_APP_API_URL + "/api/user/pageattribute/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      const resaf = await axios.get(process.env.REACT_APP_API_URL + "/api/user/affiliatelinks/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      // console.log("rescomment", rescomment.data);
      resintpage.data[0] &&
        setIntpage(respage.data.find((each) => {
          return each.id === Number(resintpage.data[0].intPageId)
        }));
      resintpost.data[0] &&
        setIntpost(respost.data.find((each) => {
          return each.id === Number(resintpost.data[0].intPostId)
        }));
      resintcomment.data[0] &&
        setIntComment(rescomment.data.find((each) => {
          return each.id === Number(resintcomment.data[0].intCommentId)
        }));
      resintuser.data[0] &&
        setIntuser(resuser.data.find((each) => {
          return each.userProfile === Number(resintuser.data[0].intUserId)
        }));
      resintattribute.data[0] &&
        setIntAttribute(resattribute.data.find((each) => {
          return each.id === Number(resintattribute.data[0].intAttributeId)
        }));
      resintpage.data[0] &&
        setPostsforintpage(respost.data.filter((each) => {
          return each.reviewTo === Number(resintpage.data[0].intPageId)
        }));
      resintuser.data[0] &&
        setPostsforintuser(respost.data.filter((each) => {
          return each.userPost === Number(resintuser.data[0].intUserId)
        }));
      resintpost.data[0] &&
        setCommentsforintpost(rescomment.data.filter((each) => {
          return each.post === Number(resintpost.data[0].intPostId)
        }));
      resintattribute.data[0] &&
        setPagesforintattribute(respage.data.filter((each) => {
          // console.log("each ", each);
          return each.attribute.includes(resintattribute.data[0].intAttributeId)
        }));
      resaf.data[0] &&
        setAffiliates(resaf.data[0])
      const tmpIntpage = respage.data.find((each) => {
        return each.id === Number(resintpage.data[0].intPageId)
      });
      tmpIntpage &&
        setAffiliates(resaf.data.find((each) => {
          return each.id === Number(tmpIntpage.affiliateId)
        }));

    } catch {
      console.log("error-getUserInterest");
    }
  }

  const createProfile = async () => {
    const createData = new FormData();
    editedProfile.nickName && createData.append("nickName", editedProfile.nickName);
    editedProfile.caption && createData.append("caption", editedProfile.caption);
    cover.name && createData.append("img", cover, cover.name);
    coverBack.name && createData.append("imgBackground", coverBack, coverBack.name);
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/api/user/profile/",
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setProfile(res.data);
      setEditedProfile({ id: res.data.id, nickName: res.data.nickName, caption: res.data.caption });
      alert("プロフィールを新規作成しました");
    } catch {
      console.log("error-createProfile");
    }
  };

  const createMonoPost = async () => {
    const createData = new FormData();
    createData.append("text", createdmonopost.text)
    createData.append("rating", createdmonopost.rating)
    createData.append("reviewTo", createdmonopost.reviewTo)
    postimg.name && createData.append("img", postimg, postimg.name);
    // console.log(createData)
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/api/user/monopost/",
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      newSnack("success", "ポストが投稿されました。");
      const resMonoPosts = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      setMonoposts(resMonoPosts.data);
      setPostsforintpage(resMonoPosts.data.filter((each) => {
        return each.reviewTo === Number(currentPageId)
      }));
      getFollowingUserPosts();
      // console.log("CreateMonopost", postsforintpage);
      // getUserInterest()
    } catch {
      newSnack("error", "投稿が失敗しました。");
      console.log("error-createMonoPost")
    }
  }

  const createRepost = async (targetpost) => {
    const createData = new FormData();
    createData.append("title", targetpost.title)
    createData.append("text", targetpost.text)
    createData.append("rating", targetpost.rating)
    createData.append("reviewTo", targetpost.reviewTo)
    createData.append("reposting", true)
    createData.append("repostingFrom", targetpost.id)
    createData.append("repostingFromUser", targetpost.userPost)
    targetpost.img && createData.append("text", targetpost.text + '  【画像付き】')
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/api/user/monopost/",
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      getMonoPosts();
      getFollowingUserPosts();
      getUserInterest();

    } catch {
      console.log("error-createRepost")
    }
  }



  const createMonoComment = async () => {
    const createData = new FormData();
    createData.append("text", createdcomment.text)
    createData.append("post", createdcomment.post)
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/api/user/monocomment/",
        createData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      getMonoComments()
      getUserInterest()
    } catch {
      console.log("error-createMonoComment")
    }
  }


  const deleteMonopost = async (deletepostid) => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_URL + `/api/user/monopost/${deletepostid}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      setMonoposts(monoposts.filter((dev) => dev.id !== deletepostid));
      setMyMonoposts(mymonoposts.filter((dev) => dev.id !== deletepostid));
      setPostsforintpage(postsforintpage.filter((dev) => dev.id !== deletepostid));
      getFollowingUserPosts();
      // getMonoPosts();
      // getUserInterest();
      newSnack("success", "削除しました。");
    } catch {
      newSnack("error", "削除が失敗しました。");
      console.log("error-deleteMonopost");
    };
  };

  const getPagesForIntAttribute = async () => {
    try {
      const respage = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const resintattribute = await axios.get(process.env.REACT_APP_API_URL + "/api/user/userintattribute/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      setPagesforintattribute(respage.data.filter((each) => {
        // console.log("each ", each);
        return each.attribute.includes(resintattribute.data[0].intAttributeId)
      }));
    }
    catch {
      console.log("error-getPagesForIntAttribute");
    }
  }

  const getSpecificProfile = async (userid) => {
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + `/api/user/profile/${userid}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      setSpecificProfile(res.data);
      return specificProfile.img
    } catch {
      console.log("error-getSpecificProfile")
    }
  }

  const deleteProfile = async () => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_URL + `/api/user/profile/${profile.id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setProfiles(profiles.filter((dev) => dev.id !== profile.id));
      setProfile([]);
      setEditedProfile({ id: "", nickName: "", caption: "" });
      setCover([]);
      setCoverBack([]);
      setAskList([]);
      alert("プロフィールを削除しました");
    } catch {
      console.log("error-deleteProfile");
    }
  };

  const editProfile = async () => {
    const editData = new FormData();
    console.log("editProfile", editedProfile.sex);
    editedProfile.nickName && editData.append("nickName", editedProfile.nickName);
    editedProfile.birthday && editData.append("birth", editedProfile.birthday);
    editedProfile.sex && editData.append("sex", editedProfile.sex);
    editedProfile.caption && editData.append("caption", editedProfile.caption);
    cover.name && editData.append("img", cover, cover.name);
    coverBack.name && editData.append("imgBackground", coverBack, coverBack.name);
    // if (!editedProfile.sex) {
    //   setEditedProfile({...editedProfile, sex: 0});
    //   editData.append("sex", 0);
    // }
    //console.log(editProfile.birth);

    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/api/user/profile/${profile.id}/`,
        editData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );
      // console.log(res.data);
      setProfile(res.data);
      getProfile();
      newSnack("success", "変更を保存しました");
    } catch {
      console.log("error-editProfile");
    }
  };

  const likePost = async (postdata) => {
    const editData = new FormData();
    editData.append("text", postdata.text);
    editData.append("reviewTo", postdata.reviewTo);
    editData.append("rating", postdata.rating);
    editData.append("reposting", postdata.reposting);
    postdata.repostingFrom && editData.append("repostingFrom", postdata.repostingFrom);
    postdata.repostingFromUser && editData.append("repostingFromUser", postdata.repostingFromUser);
    const concat = [...postdata.liked, profile.userProfile]
    const set = new Set(concat)
    const likes = [...set].map(Number);
    // const compareFunc = (a,b) => {
    //   return a - b;
    // }
    if (Array.isArray(likes)) {
      likes.forEach((v, i) => {
        editData.append("liked", v)
      })
    } else {
      editData.append("liked", likes)
    }


    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/api/user/monopost/${postdata.id}/`,
        editData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      getMonoPosts();
      getFollowingUserPosts();
      // getMonoPosts();
      // getFollowingUserPosts();
      // getUserInterest();
    } catch {
      console.log("error-likePost")
    }
  }


  const newRequestFriend = async (askData) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + `/api/user/approval/`,
        askData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setAskListFull([...askListFull, res.data]);
      getFollowingUserPosts();
      getFriendRequest();
      getFollowingUser();
      getMutualFollowingUser();
    } catch {
      console.log("error-newRequestFriend");
    }
  };



  const newUserIntPage = async (pageId) => {
    // const createData = new FormData();
    try {
      // const resintpage = interestData;
      setCurrentPageId(pageId);
      // const respost = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // })
      // const respage = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // })
      // const resaf = await axios.get(process.env.REACT_APP_API_URL + "/api/user/affiliatelinks/", {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // })
      if (monopages.length == 0) {
        const respage = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        setIntpage(respage.data.find((each) => {
          return each.id === Number(pageId)
        }));
        // console.log("monopages", monopages);
      } else {
        setIntpage(monopages.find((each) => {
          return each.id === Number(pageId)
        }));

      }
      if (monoposts.length == 0) {
        const respost = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        setPostsforintpage(respost.data.filter((each) => {
          return each.reviewTo === Number(pageId)
        }))
        // console.log("monoposts", monoposts);
      } else {
        setPostsforintpage(monoposts.filter((each) => {
          return each.reviewTo === Number(pageId)
        }))

      }
      // const tmpIntpage = respage.data.find((each) => {
      //   return each.id === Number(resintpage.data[0].intPageId)
      // })
      // setAffiliates(resaf.data[0])
      // tmpIntpage && 
      // setAffiliates(resaf.data.find((each) => {
      //   return each.id === Number(tmpIntpage.affiliateId)
      // }));


    } catch {
      console.log("error-newUserIntPage");
    }
  }

  const newUserIntPageWithScroll = async (pageId, count) => {
    try {
      setCurrentPageId(pageId);
      if (monopages.length == 0) {
        const respage = await axios.get("http://localhost:8000/api/user/monopage/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        setIntpage(respage.data.find((each) => {
          return each.id === Number(pageId)
        }));
      } else {
        setIntpage(monopages.find((each) => {
          return each.id === Number(pageId)
        }));

      }

      // if (monoposts.length == 0) {
        const respost = await axios.get("http://localhost:8000/api/user/monopostcc/?pageId="+pageId+"&count="+count, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        return respost.data;
        // setPostsforintpagebyscroll(respost.data.res)
        // setPostsforintpage(respost.data.filter((each) => {
        //   return each.reviewTo === Number(pageId)
        // }))
        // console.log("monoposts", monoposts);
      // } else {
      //   setPostsforintpage(monoposts.filter((each) => {
      //     return each.reviewTo === Number(pageId)
      //   }))

      // }
    } catch {
      console.log("error-newUserIntPage");
    }
  }

  const profilesWithScroll = async (count) => {
    try {
      const respost = await axios.get("http://localhost:8000/api/user/profilecc/?&count="+count, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      return respost.data;
    } catch {
      console.log("error-newUserIntPage");
    }
  }

  const newUserIntPost = async (interestData) => {
    try {
      const resintpost = await axios.post(
        process.env.REACT_APP_API_URL + "/api/user/userintpost/",
        interestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      const rescomment = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monocomment/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      const respost = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      resintpost.data[0] && setIntpost(respost.data.find((each) => {
        return each.id === Number(resintpost.data[0].intPostId)
      }));
      resintpost.data[0] && setCommentsforintpost(rescomment.data.filter((each) => {
        return each.post === Number(resintpost.data[0].intPostId)
      }))
    } catch {
      console.log("error-newUserIntPost");
    }
  }



  const newUserIntUser = async (intUserId) => {
    try {
      if (profile.length == 0) {
        const res = await axios.get(process.env.REACT_APP_API_URL + "/api/user/profile/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setIntuser(res.data.find((each) => {
          return each.userProfile === Number(intUserId)
        }));
      }
      else {
        setIntuser(profiles.find((each) => {
          return each.userProfile === Number(intUserId)
        }));
      }
      if (monoposts.length == 0) {
        const respost = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopost/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        setPostsforintuser(respost.data.filter((each) => {
          return each.userPost === Number(intUserId)
        }))
      } else {
        setPostsforintuser(monoposts.filter((each) => {
          return each.userPost === Number(intUserId)
        }))
      }
    } catch (err) {
      console.log("error-newUserIntUser");
    }
  }

  const newUserIntAttribute = async (selectedAttributeId) => {
    try {
      // console.log(interestData);
      // const resintattribute = await axios.post(
      //   process.env.REACT_APP_API_URL + "/api/user/userintattribute/",
      //   interestData,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Token ${token}`,
      //     },
      //   }
      // )
      const respage = await axios.get(process.env.REACT_APP_API_URL + "/api/user/monopage/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // const resattribute = await axios.get(process.env.REACT_APP_API_URL + "/api/user/pageattribute/", {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // })
      // resintattribute.data[0] &&
      //   setIntAttribute(resattribute.data.find((each) => {
      //     return each.id === Number(resintattribute.data[0].intAttributeId)
      //   }));
      // resintattribute.data[0] &&
      setPagesforintattribute(respage.data.filter((each) => {
        return each.attribute.includes(selectedAttributeId)
      }));
    } catch {
      console.log("error-newIntAttribute");
    }
  }

  const followPage = async (id) => {
    // const createData = new FormData();
    // createData.append("pageId", id)
    // try {
    //   //   const res = await axios.post(
    //   //   process.env.REACT_APP_API_URL + "/api/user/followingpage/",
    //   //   createData, 
    //   //   {
    //   //     headers: {
    //   //       "Content-Type": "application/json",
    //   //       Authorization: `Token ${token}`,
    //   //     },
    //   //   }
    //   // )
    //   getFollowingPage()
    // } catch {
    //   console.log("error-followPage")
    // }
  }

  const ownPage = async (id) => {
    const createData = new FormData();
    createData.append("encrypted_pageId", id)
    axios.post(
      process.env.REACT_APP_API_URL + "/api/user/owningpage/",
      createData, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    ).then(res => {
      newUserIntPage(res.data.pageId);
      getOwningPage()
    }).catch ( err=>{
      console.log("error-ownPage", err)
    })
  }

  const changeApprovalRequest = async (uploadDataAsk, ask) => {
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + `/api/user/approval/${ask.id}/`,
        uploadDataAsk,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setAskList(askList.map((item) => (item.id === ask.id ? res.data : item)));

      const newDataAsk = new FormData();
      newDataAsk.append("askTo", ask.askFrom);
      newDataAsk.append("approved", true);

      const newDataAskPut = new FormData();
      newDataAskPut.append("askTo", ask.askFrom);
      newDataAskPut.append("askFrom", ask.askTo);
      newDataAskPut.append("approved", true);

      const resp = askListFull.filter((item) => {
        return item.askFrom === profile.userProfile && item.askTo === ask.askFrom;
      });

      !resp[0]
        ? await axios.post(
          process.env.REACT_APP_API_URL + `/api/user/approval/`,
          newDataAsk,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        )
        : await axios.put(
          process.env.REACT_APP_API_URL + `/api/user/approval/${resp[0].id}/`,
          newDataAskPut,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
    } catch {
      console.log("error-changeApprovalRequest");
    }
  };

  const getAds = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `/api/user/advertisement/`,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
      const resdata = res.data.filter((item) => { return item.del_flag == 0 });
      setAds(resdata);
    } catch {
      console.log("error-getAds");
    }
  }

  const addAdsCnt = async (id) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + `/api/user/updateAds/`,
        { updateCnt: 1, adsId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      const selected = ads.filter((item) => item.id === id);
      if (selected[0].cnt == selected[0].target - 1) {
        console.log("delflag");
        await axios.post(
          process.env.REACT_APP_API_URL + `/api/user/updateAds/`,
          { updateDelFlag: 1, adsId: id, updateCnt: 0 },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        const newAds = ads.filter((item) => item.id !== id);
        setAds(newAds);
      }
      // setAds((prev) => {
      //   const newAds = prev;
      //   newAds.map((item) => {
      //     if (item.id == id) item.cnt ++;
      //     return item;
      //   })
      //   return newAds;
      // })
    } catch {
      console.log("error-addAdsCnt");
    }
  }

  const postAds = async (data) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + `/api/user/advertisement/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setAds((prev) => {
        const newState = prev;
        newState.push(res.data);
        return newState;
      })
      // console.log(res.data);
      // setProfile(res.data);
      // getProfile();
      newSnack("success", "広告キャンペーンが登録されました。");
    } catch {
      console.log("error-postAds");
    }
  }

  return (
    <ApiContext.Provider
      value={{
        setToken,
        askData,
        setAskData,
        profile,
        profiles,
        specificProfile,
        setSpecificProfile,
        cover,
        setCover,
        friendrequest,
        setFriendRequest,
        monopages,
        setMonopages,
        monoposts,
        setMonoposts,
        mymonoposts,
        setMyMonoposts,
        monocomments,
        setMonocomments,
        postimg,
        setPostimg,
        createdmonopost,
        setCreatedMonopost,
        coverBack,
        setCoverBack,
        monopageposts,
        intpage,
        setIntpage,
        intpost,
        setIntpost,
        intuser,
        setIntuser,
        postsforintpage,
        setPostsforintpage,
        postsforintuser,
        setPostsforintuser,
        commentsforintpost,
        setCommentsforintpost,
        createMonoComment,
        setCreatedcomment,
        createdcomment,
        intcomment,
        setIntComment,
        followPage,
        affiliates,
        isfollowingpage,
        followeduser,
        getFollowingUserPosts,
        getFollowedUser,
        getFollowingUser,
        setMonopageposts,
        askList,
        askListFull,
        newRequestFriend,
        createProfile,
        editProfile,
        deleteProfile,
        changeApprovalRequest,
        editedProfile,
        setEditedProfile,
        createMonoPost,
        deleteMonopost,
        getSpecificProfile,
        newUserIntPage,
        newUserIntPageWithScroll,
        profilesWithScroll,
        newUserIntPost,
        newUserIntUser,
        getUserInterest,
        newUserIntAttribute,
        getProfile,
        getMonoComments,
        getMonoPages,
        getPagesForIntAttribute,
        getMonoPosts,
        getFriendRequest,
        followinguserpost,
        followinguser,
        mutualfollowinguser,
        likePost,
        createRepost,
        followingpage,
        owningpage,
        pageattribute,
        pagesforintattribute,
        ownPage,
        postAds,
        getAds,
        ads,
        setAds,
        addAdsCnt
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default withCookies(ApiContextProvider);