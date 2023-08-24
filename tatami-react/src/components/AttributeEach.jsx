import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
// import { useHistory } from "react-router-dom";

const AttributeEach = (attributeData) => {
  const { getUserInterest, newUserIntAttribute } = useContext(ApiContext);
  // const history = useHistory()

  const toAttribute = () => {
    // console.log("ToAttribute");
    // const createdIntData = new FormData()
    // createdIntData.append("intAttributeId",attributeData.attributeData.id)
    newUserIntAttribute(attributeData.attributeData.id);
    // getUserInterest()
    // getUserInterest()
    // getUserInterest()
  };

  return (
    <div className="  d-flex">
      <div className=" pointercard shadow-xss rounded-xxl border-0 text-center ps-2 pe-2 pt-2 pb-0 mb-2 ">
        <div className="card-body p-0 pointer" onClick={() => toAttribute()}>
          <h4 className="fw-700 text-grey-700 font-xssss ">
            {" "}
            {attributeData.attributeData.attributeName}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AttributeEach;
