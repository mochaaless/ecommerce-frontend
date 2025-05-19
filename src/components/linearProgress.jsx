const LinearProgressBar = ({
  site,
  title,
  date,
  value1,
  value2,
  percentage,
  color,
}) => {
  if (!percentage || percentage < 0 || percentage > 100) {
    percentage = 100;
  }

  if (value1 !== 0 && !value1) {
    value1 = "Error 1";
  }

  if (!value2) {
    value2 = "Error 2";
  }

  if (!color) {
    color = "#ccc";
  }

  if (!title) {
    title = "Progress Line...";
  }

  if (percentage >= 100) {
    return (
      <div className="linear">
        <div className="linearHeader">
          <div className="linearSite">{site}</div>
          <div className="linearDate">{date}</div>
          <div className="linearTitle">{title}</div>
        </div>
        <div className="linearContent">
          <span>{value1}</span>
          <div
            className="linear-progress-bar"
            style={{
              display: "flex",
              width: "100%",
              color: "transparent",
            }}
          >
            <div
              className="linear-progress-bar-filled"
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: `${percentage}%`,
                backgroundColor: color,
                borderRadius: "10px",
              }}
            >
              fdfsdsf
            </div>
          </div>
          <span>{value2}</span>
        </div>
      </div>
    );
  } else if (percentage <= 0) {
    return (
      <div className="linear">
        <div className="linearHeader">
          <div className="linearSite">{site}</div>
          <div className="linearDate">{date}</div>
          <div className="linearTitle">{title}</div>
        </div>
        <div className="linearContent">
          <span>{value1}</span>
          <div
            className="linear-progress-bar"
            style={{
              display: "flex",
              width: "100%",
              color: "transparent",
            }}
          >
            <div
              className="linear-progress-bar"
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                width: `100%`,
                backgroundColor: "#c6c6c6",
                borderRadius: "10px",
              }}
            >
              fdfsdsf
            </div>
          </div>
          <span>{value2}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="linear">
      <div className="linearHeader">
        <div className="linearSite">{site}</div>
        <div className="linearDate">{date}</div>
        <div className="linearTitle">{title}</div>
      </div>
      <div className="linearContent">
        <span>{value1}</span>
        <div
          className="linear-progress-bar"
          style={{
            display: "flex",
            width: "100%",
            color: "transparent",
          }}
        >
          <div
            className="linear-progress-bar-filled"
            style={{
              marginLeft: "5px",
              width: `${percentage}%`,
              backgroundColor: color,
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          >
            fdfsdsf
          </div>
          <div
            className="linear-progress-bar"
            style={{
              marginRight: "5px",
              width: `${100 - percentage}%`,
              backgroundColor: "#c6c6c6",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            sdfsfsd
          </div>
        </div>
        <span>{value2}</span>
      </div>
    </div>
  );
};

export default LinearProgressBar;
