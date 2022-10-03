import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/material";
import AudioContainer from "./AudioContainer.js";
import { authUser } from "../API/UserAuth.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoContainer from "./VideoContainer.js";
import { addAudio , addVideo } from "../API/UserUpload.js"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const navigate = useNavigate();

  const [isLogin] = useState(localStorage.getItem("token"));

  const [showMusic, setshowMusic] = useState(false);

  const [loggedUser, setLoggedUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    fileType:"",
    name:"",
    author:"",
    formData:new FormData()
  });
  

  const [showModal, setshowModal] = useState(false)
  const handleOpen = () => setshowModal(true);
  const handleClose = () => setshowModal(false);

  const handleChange = (e) => {

    const value = e.target.name ==='media'? e.target.files[0] : e.target.value
    if(e.target.name==='media'){
     loggedUser.formData.set(e.target.name,value);  
     setLoggedUser({
      ...loggedUser,
      fileType:e.target.files[0].type
    });
    }
    else{
      setLoggedUser({
        ...loggedUser,
        [e.target.name]:value
      })
    }
     
    
  };

  console.log(loggedUser)

  const handleSubmit = (e)=>{
    
    loggedUser.formData.set("name",loggedUser.name); 
    loggedUser.formData.set("author",loggedUser.author); 
    if(loggedUser.fileType=="audio/mpeg"){
      addAudio(loggedUser.formData).then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    else if(loggedUser.fileType==="video/mp4"){
      addVideo(loggedUser.formData).then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
        setLoggedUser({
         ...loggedUser,
          fileType:"",
          name:"",
          author:"",
        })
  }

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    } else {
      authUser(isLogin).then((res) => {
        setLoggedUser({
          ...loggedUser,
          id: res.authUser._id,
          first_name: res.authUser.first_name,
          last_name: res.authUser.last_name,
          email: res.authUser.email,
        });
        loggedUser.formData.set("uploadBy",res.authUser._id)
      });
    }
  }, []);

  return (
    <>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box sx={style}>

            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add a media
            </Typography>

            <TextField 
            variant="outlined" 
            sx={{mb:2}} 
            name="name"
            type="text"
            label="Media Name"
            fullWidth
            onChange={handleChange}
            ></TextField>

            <TextField 
            variant="outlined" 
            sx={{mb:2}} 
            name="author"
            type="text"
            label="Media Author"
            fullWidth
            onChange={handleChange}
            ></TextField>

            <TextField 
            variant="outlined" 
            sx={{mb:2}} 
            name="media"
            type="file"
            onChange={handleChange}
            ></TextField>

            <Button variant="contained" name="music" fullWidth onClick={handleSubmit}>Add</Button>

          </Box>
        </Fade>
      </Modal>

      <Container
        fixed
        sx={{
          display: "flex",
        }}
      >
        <Stack
          width="100%"
          justifyContent="space-evenly"
          flexDirection="column"
          alignItems="center"
          gap={2}
          padding={4}
        >
          <Card sx={{ width: "30%" }}>

            <Typography variant="h4" align="center">
              My Profile
            </Typography>

            <CardContent>
              <Typography sx={{ fontSize: 12 }} color="text.secondary">
                Name
              </Typography>
              <Typography variant="h5" component="div">
                {loggedUser.first_name + " " + loggedUser.last_name}
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.secondary">
                Email
              </Typography>
              <Typography variant="body2">{loggedUser.email}</Typography>
            </CardContent>

            <FormControl sx={{
                padding: "0px 16px",
                width: "100%"
            }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Populate
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={showMusic}
                onChange={(e)=>{
                  if(e.target.value=="music"){
                    setshowMusic(true)
                  }
                  else{
                    setshowMusic(false)
                  }
                }}
              >
                <FormControlLabel
                  value="music"
                  checked={showMusic?true:false}
                  control={<Radio />}
                  label="Music"
                />
                <FormControlLabel
                  value="video"
                  checked={showMusic?false:true}
                  control={<Radio />}
                  label="Video"
                />
              </RadioGroup>
            </FormControl>

            <CardActions>
              <Button size="small" variant="contained" color="secondary" onClick={handleOpen}>
                Add Media
              </Button>
            </CardActions>

          </Card>

          <Box sx={{ width: "42%" }}>
            <Typography variant="h4" align="center">
              {showMusic ? "My Songs" : "My Videos"}
            </Typography>
            {showMusic ? (
              <AudioContainer id={loggedUser.id} />
            ) : (
              <VideoContainer id={loggedUser.id} />
            )}
          </Box>
        </Stack>
      </Container>
    </>
  );

};

export default Profile;
