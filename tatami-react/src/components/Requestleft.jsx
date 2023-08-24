import React from "react";
import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { RequestleftEach } from "../components/RequestleftEach";

const Requestleft = () => {
  const {
    // profiles,
    profile,
    // friendrequest,
    followeduser,
  } = useContext(ApiContext);
  const listProfiles =
    profile.id &&
    followeduser
      .map((prof) => <RequestleftEach key={prof.id} prof={prof} />)
      .slice(0, 2);

  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 p-0 mb-3">
      <div className="ard-body d-flex align-items-center ps-4 pe-4 pt-3 pb-3">
        <h4 className="fw-700 mb-0 font-xssss text-grey-900">
          新しいフォロワー
        </h4>
        <a href="/followed" className="fw-600 ms-auto font-xssss text-primary">
          全て表示
        </a>
      </div>
      {listProfiles}
    </div>
  );
};

export default Requestleft;
