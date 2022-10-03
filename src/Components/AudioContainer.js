import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Audio from "./Audio.js";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './slicker.css'
import Slider from "react-slick";
const AudioContainer = (props) => {

  const [Audios, setAudios] = useState([]);

  useEffect(() => {
    props.id && getMusic();
  }, [props.id]);

  const getMusic = () => {
    
    fetch(`/upload/getaudios/${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
          setAudios(res)
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
        Audios.map((audio,i)=>{
            return <Audio key={i} id={audio._id}/>
        })
       }
      </Slider>
      </Stack>
    </>
  );
};

export default AudioContainer;
