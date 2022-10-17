import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./RedirectComponent.module.css";
import { Button } from "@mui/material";

const NoFullLinkComponent = () => (
  <div className={styles["no-full-link-container"]}>
    <img src="https://thumbs.gfycat.com/UnhealthyLimpEyelashpitviper-max-1mb.gif" alt="travolta"/>
    <h1>Short link does not exist</h1>
    <h2>Do you want create new one?</h2>
    <Button size="small" variant="contained" href="/">
      Create new short link
    </Button>
  </div>
);

export const RedirectComponent = () => {
  let { shortLink } = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(
      `https://e6ku2uc5qg.execute-api.eu-west-1.amazonaws.com/getShortLink?shortLink=${shortLink}`
    )
      .then((res) => res.json())
      .then((parsed) => {
        if (parsed?.fullLink) {
          window.location.replace(parsed.fullLink);
        } else {
          setError(true);
        }
      });
  }, [shortLink]);
  return error ? <NoFullLinkComponent /> : null;
};
