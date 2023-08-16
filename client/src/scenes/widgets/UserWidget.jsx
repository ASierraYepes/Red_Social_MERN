import {
  // ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Add
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Slider, IconButton  } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import ModalSkillsConfig from "components/ModalSkillsConfig";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "Url";
import { setUserId } from "state";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const getUser = async () => {
    const response = await fetch(`${URL}/users/${userId}`, 
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const UserIdCurrent = await response.json();
    dispatch(setUserId({UserIdCurrent}));
    setUser(UserIdCurrent);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    // viewedProfile,
    // impressions,
    friends,
    skills,
  } = user;

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    window.location.reload();
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexBetween gap="1rem" onClick={() => navigate(`/profile/${userId}`)}>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} Colegas</Typography>
          </Box>
        </FlexBetween>
        {/* <IconButton>
          <ManageAccountsOutlined />
        </IconButton> */}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>


      {/* THIRD ROW */}
      {skills.length !== 0 ? (
        <>
          {_id === `${userId}` ? (
            <>
              <Divider />
              <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="10rem" mb="0.1rem">
                  <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Habilidades
                  </Typography>
                  <IconButton onClick={handleModalOpen}>
                    <EditOutlined />
                  </IconButton>
                </Box>
                {skills.map((skill, i) => (
                  <FlexBetween key={`${i}`} gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                      <Box >
                        <Typography color={main} fontWeight="500">
                          {skill.technology}
                        </Typography>
                      </Box>
                    </FlexBetween>
                    <Slider disabled defaultValue={parseFloat(skill.percentage)} aria-label="Disabled slider" />
                    <Typography color={medium}>{skill.percentage}%</Typography>
                  </FlexBetween>
                ))}
              </Box>
            </>
          ) : (
            <>
              <Divider />
              <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="10rem" mb="0.1rem">
                  <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Habilidades
                  </Typography>
                </Box>
                {skills.map((skill, i) => (
                  <FlexBetween key={`${i}`} gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                      <Box >
                        <Typography color={main} fontWeight="500">
                          {skill.technology}
                        </Typography>
                      </Box>
                    </FlexBetween>
                    <Slider disabled defaultValue={parseFloat(skill.percentage)} aria-label="Disabled slider" />
                    <Typography color={medium}>{skill.percentage}%</Typography>
                  </FlexBetween>
                ))}
              </Box>
            </>
          )}
        </>
      ) : (
        <>
          {_id === `${userId}` ? (
            <>
              <Divider />
              <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="10rem" mb="0.1rem">
                  <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Agregar habilidades
                  </Typography>
                  <IconButton onClick={handleModalOpen}>
                    <Add />
                  </IconButton>
                </Box>
              </Box>
            </>
          ) : (undefined)}
        </>
      )}
      <ModalSkillsConfig isOpen={modalOpen} onClose={handleModalClose} />


      {/* FIVE ROW */}
      {/* <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider /> */}

      {/* FOURTH ROW */}
      {/* <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Redes Sociales
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box> */}
    </WidgetWrapper>
  );
};

export default UserWidget;
