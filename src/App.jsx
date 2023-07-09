import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { Helmet } from "react-helmet";

const App = () => {
  const [show, setShow] = useState(true);
  const [imageURL, setImageURL] = useState("");


  // API request to get a random image

  useEffect(() => {
    const getRandomImage = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random?orientation=squarish",
          {
            params: {
              client_id: "CLbCN7yLT5eM55sUItIv9sMltGwsc7pcq8M1ntpDLFc",
              // client_id: "fgVfaSDyuOKrbg-Jbcwbw9Ppn208V8y99hcMuS1Vlz0",
            },
          }
        );
        const image = response.data.urls.regular;
        setImageURL(image);
      } catch (error) {
        console.log(error);
      }
    };

    getRandomImage();
    setShow(false)
  }, []);

  return (
    <div>
      {imageURL && (
        <div className="container">
          <Helmet>
            <meta property="og:title" content="Random Image" />
            <meta
              property="og:description"
              content="Check out this random image!"
            />
            <meta property="og:image" content={imageURL} />
            <meta property="og:image:width" content="500" />
            <meta property="og:url" content={imageURL} />
          </Helmet>
          <div className="title">
            <h1>Random Image Display and Share with React</h1>
          </div>
          <div className="image">
            <img src={imageURL} alt="Random"/>
          </div>

          <div className="btn">
            {
              show === false && (
                <button className="button" onClick={() => setShow(!show)} >Share</button>
              )
            }
            {show && (
              <div className="share" onClick={() => setShow(!show)}>
                <h2>Share this image,</h2>
                <div className="icons">
                  <FacebookShareButton data-social="facebook" url={imageURL}>
                    <FacebookIcon size={50} round className="icon" />
                  </FacebookShareButton>
                  <TwitterShareButton
                    data-social="twitter"
                    url="https://picsum.photos/"
                  >
                    <TwitterIcon size={50} round className="icon" />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    data-social="whatsapp"
                    url="https://picsum.photos/"
                  >
                    <WhatsappIcon size={50} round className="icon" />
                  </WhatsappShareButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

