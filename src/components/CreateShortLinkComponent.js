import { Button, FormGroup, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useCallback, useState } from "react";
import styles from "./CreateShortLinkComponent.module.scss";
import LoadingButton from "@mui/lab/LoadingButton";

export const CreateShortLinkComponent = () => {
  const [fullLink, setFullLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const createShortLink = useCallback(async () => {
    if (!fullLink) {
      return;
    }
    setIsLoading(true);
    const response = await fetch(
      "https://e6ku2uc5qg.execute-api.eu-west-1.amazonaws.com/setShortLink",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: fullLink,
        }),
      }
    );
    const parsed = await response.json();
    setIsLoading(false);
    if (parsed.shortLink) {
      setShortLink(window.location.href + parsed.shortLink);
    }
  }, [fullLink]);

  const saveToBuffer = useCallback(() => {
    navigator.clipboard.writeText(shortLink).then((e) => console.log(e));
  }, [shortLink]);

  return (
    <>
      <div className={styles["create-link-container"]}>
          <img
            src="https://i.imgflip.com/hynx2.jpg?a462504"
            alt="small piece of paper"
          />
        <h1>Get a wonderful short link, my friend!</h1>
        <form>
          <TextField
            size="small"
            id="outlined-basic"
            label="Full url"
            variant="outlined"
            value={fullLink}
            onChange={(e) => {
              setShortLink("");
              setFullLink(e.target.value);
            }}
          />
          <LoadingButton
            size="small"
            variant="contained"
            onClick={createShortLink}
            disabled={!fullLink}
            loading={isLoading}
          >
            Create short link
          </LoadingButton>
        </form>
        {shortLink && (
          <div className={styles["short-link-container"]}>
            <a href={shortLink}>{shortLink}</a>
            <Button size="small" variant="text" onClick={saveToBuffer}>
              <ContentCopyIcon />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
