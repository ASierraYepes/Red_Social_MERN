import * as React from 'react';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  AddCommentRounded,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase, Button, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { URL } from "Url"

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentPost, setCommentPost] = useState("");
  const [listComment, setListComment] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const user = useSelector((state) => state.user);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`${URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const patchComment = async () => {

    listComment.push({
      userIdComment:`${user._id}`,
      name:`${user.firstName} ${user.lastName}`,
      message: `${commentPost}`
    })

    try {
      const response = await fetch(`${URL}/posts/${postId}`, 
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listComment }),
      });
  
      const data = await response.json();
      dispatch(setPost({ post: data }));
      setCommentPost("");
      setListComment([]);
      showSnackbarSuccess();

    } catch (error) {
      showSnackbarError();
      console.error("Error:", error.message);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const showSnackbarSuccess = () => {
    setOpenSnackbarSuccess(true);
  };

  const handleCloseSnackbarSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      setOpenSnackbarSuccess(false);
  };

  const showSnackbarError = () => {
    setOpenSnackbarError(true);
  };

  const handleCloseSnackbarError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      setOpenSnackbarError(false);
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${URL}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        
        <Box mt="0.5rem">
          <FlexBetween gap="1.5rem">
            <InputBase
              placeholder="Comenta lo que sea..."
              onChange={(e) => setCommentPost(e.target.value)}
              value={commentPost}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "0.2rem 2rem",
              }}
              autoFocus={true}
            />
            <Button
              disabled={!commentPost}
              onClick={patchComment}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              <AddCommentRounded />
            </Button>
            <Snackbar
              open={openSnackbarSuccess}
              autoHideDuration={3000}
              onClose={handleCloseSnackbarSuccess}
            >
              <Alert onClose={handleCloseSnackbarSuccess} severity="success" color="info" sx={{ width: '100%' }}>
                Comentario creado!
              </Alert>
            </Snackbar>
            <Snackbar
              open={openSnackbarError}
              autoHideDuration={3000}
              onClose={handleCloseSnackbarError}
            >
              <Alert onClose={handleCloseSnackbarError} severity="error" sx={{ width: '100%' }}>
                Error al crear el comentario!
              </Alert>
            </Snackbar>
          </FlexBetween>
          <br />
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography
                color={main}
                variant="h7"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
                onClick={() => navigate(`/profile/${comment.userIdComment}`)}
              >
                {comment.name}
              </Typography>
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.message}
              </Typography>
            </Box>
          )).reverse()}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
