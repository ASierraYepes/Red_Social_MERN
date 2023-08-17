import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { URL } from "Url";
import { setUserIdChange } from "state";

const ModalAboutMeConfig = ({ isOpen, onClose }) => {
  const [aboutMe, setAboutMe] = useState('');
  
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const aboutMeUser = useSelector((state) => state.UserIdCurrent.aboutMe);
  const dispatch = useDispatch();

  useEffect(() => {
    setAboutMe(aboutMeUser)
  }, [aboutMeUser]); 

  const handleSave = async () => {
    const response = await fetch(`${URL}/users/${loggedInUserId}/${aboutMe}/aboutMe`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })

    const updateUser = await response.json()
    dispatch(setUserIdChange({ userId: updateUser }));
    setAboutMe([]);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
      <Box
        display="grid"
        gap="20px"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: "1rem",
        }}
      >
        <Typography sx={{ gridColumn: "span 4" }}>
          Actualizar acerca de mí
        </Typography>
        <TextField
          name="aboutMe"
          label="Acerca de mí"
          value={aboutMe}
          size='small'
          multiline
          rows={4}
          sx={{ gridColumn: "span 4" }}
          onChange={(e) => setAboutMe(e.target.value)}
        />
        <Button onClick={handleSave} 
            sx={{
                m: "1rem 0",
                p: "0.5rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
                gridColumn: "span 4"
              }}>
          Guardar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalAboutMeConfig;