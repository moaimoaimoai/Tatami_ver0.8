const SpecificUserPageAdsEach = (props) => {
    const types = ["impression", "click"];

    const cutText = (text) => {
        if (20 > text.length) {
            return text.slice(0, text.length);
        }
        return text.slice(0, 20) + "...";
    }

    return (
        <div className="row mb-3">
            <div className="col-md-4 d-flex justify-content-center">
                <img
                    alt="post"
                    style={{ maxHeight: "40px", maxWidth: "100%" }}
                    src={props.item.img}
                />
            </div>
            <div className="col-md-8">
                <p className="font-xsssss text-grey-600 fw-600 mb-0">{props.item.created}</p>
                <p className="font-xsssss text-grey-600 fw-600 mb-0">{types[props.item.type] + " " + props.item.target}</p>
                <p className="font-xssss text-black fw-600 mb-0">{cutText(props.item.content)}</p>
                <p className="font-xsssss text-grey-600 fw-600 mb-0">{props.item.cnt + "/" + props.item.target}</p>
            </div>
        </div>
    )
}

export default SpecificUserPageAdsEach;