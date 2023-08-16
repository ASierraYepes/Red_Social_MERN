import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material'
import { useSelector, useDispatch } from "react-redux";
import { URL } from "Url";
import { setUserIdChange } from "state";

const ModalSkillsConfig = ({ isOpen, onClose }) => {
  const { palette } = useTheme();
  const [technology, setTechnology] = useState('');
  const [percentage, setPercentage] = useState('');
  const [addedValues, setAddedValues] = useState([]);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const sKillsUser = useSelector((state) => state.UserIdCurrent.skills);
  const dispatch = useDispatch();

  useEffect(() => {
    setAddedValues(sKillsUser)
  }, [sKillsUser]); 

  const AddValue = () => {
    if (technology && percentage) {
      setAddedValues((prevValues) => [...prevValues, {technology, percentage }]);   
    }
    setTechnology('');
    setPercentage('');
  };

  const DeleteValue = (index) => {
    const newValues = [...addedValues];   
    newValues.splice(index, 1);
    setAddedValues(newValues);
  }

  const handleSave = async () => {
    const response = await fetch(`${URL}/users/${loggedInUserId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ addedValues }),
    })

    const updateUser = await response.json()
    dispatch(setUserIdChange({ userId: updateUser }));
    setAddedValues([]);
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
          Actualizar Habilidades
        </Typography>
        {/* <TextField
          // id="outlined-required"
          label="Nombre"
          value={""}
          name="firstName"
          size='small'
          sx={{ gridColumn: "span 2" }}
        /> */}
        <TextField
          name="technology"
          label="Tecnología"
          value={technology}
          size='small'
          sx={{ gridColumn: "span 2" }}
          onChange={(e) => setTechnology(e.target.value)}
        />
        <TextField
          name="percent"
          label="%"
          value={percentage}
          size='small'
          type='number'
          sx={{ gridColumn: "span 1.5" }}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <IconButton onClick={AddValue}>
          <Add />
        </IconButton>
        {addedValues.length !== 0 ? (
          <>
            <List sx={{ marginTop: '0.1rem' }}>
              {addedValues.map((value, index) => (
                <ListItem key={index} sx={{ marginTop: '-1.9rem' }}>
                  <ListItemText 
                    primary={`${value.technology} - ${value.percentage}%`}
                  />
                  <IconButton onClick={() => DeleteValue(index)}>
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </>
        ) : undefined}
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

export default ModalSkillsConfig;