import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Video from "./Video.js";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './slicker.css'
import Slider from "react-slick";

const VideoContainer = (props) => {

  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    props.id && getVideo();
  }, [props.id]);

  const getVideo = () => {
    fetch(`/upload/getvideos/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
          setVideos(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Stack>
      <Slider {...settings}>
      {
        Videos.map((video,i)=>{
            return <Video key={i} id={video._id}/>
        })
       }
      </Slider>
      </Stack>
    </>
  );
};

export default VideoContainer;
