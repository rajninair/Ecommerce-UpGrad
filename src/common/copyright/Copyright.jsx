import { Typography } from "@mui/material";

const Copyright = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Typography variant="h6" gutterBottom style={{ fontSize: "14px" }}>
        Copyright <small>&#169;</small>{" "}
        <a
          href="https://www.upgrad.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          2021 upGrad
        </a>
      </Typography>
    </div>
  );
};
export default Copyright;
