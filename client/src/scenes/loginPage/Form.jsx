import * as React from 'react';
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { URL } from "Url"

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Requerido"),
  lastName: yup.string().required("Requerido"),
  email: yup.string().email("Correo inválido").required("Requerido"),
  password: yup.string().required("Requerido"),
  location: yup.string().required("Requerido"),
  occupation: yup.string().required("Requerido"),
  picture: yup.string().required("Requerido"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Correo inválido").required("Requerido"),
  password: yup.string().required("Requerido"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [openSnackbarLoginError, setOpenSnackbarLoginError] = useState(false);
  const [openSnackbarRegisterSuccess, setOpenSnackbarRegisterSuccess] = useState(false);
  const [openSnackbarRegisterError, setOpenSnackbarRegisterError] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    try {
      const savedUserResponse = await fetch(`${URL}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();
  
      if (savedUser) {
        // setPageType("login");
        showSnackbarRegisterSuccess();
      }
    } catch (error) {
      showSnackbarRegisterError();
      console.error("Error:", error.message);
    }
  };

  const login = async (values, onSubmitProps) => {
    setLoading(true);
    const loggedInResponse = await fetch(`${URL}/auth/login`, 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(loggedInResponse);
    
    if (loggedInResponse.ok === false) {
      showSnackbarLoginError();
    }

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
    setLoading(false);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const showSnackbarLoginError = () => {
    setOpenSnackbarLoginError(true);
  };

  const handleCloseSnackbarLoginError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      setOpenSnackbarLoginError(false);
  };

  const showSnackbarRegisterSuccess = () => {
    setOpenSnackbarRegisterSuccess(true);
  };

  const handleCloseSnackbarRegisterSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      setOpenSnackbarRegisterSuccess(false);
  };

  const showSnackbarRegisterError = () => {
    setOpenSnackbarRegisterError(true);
  };

  const handleCloseSnackbarRegisterError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      setOpenSnackbarRegisterError(false);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Nombre"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Apellido"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Ubicación"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Ocupación"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Agregue imagen aquí</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Correo"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Contraseña"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "INICIAR" : "REGISTRO"}
            </Button>
            {isLogin ? 
            (
            <>
              <Snackbar
                open={openSnackbarLoginError}
                autoHideDuration={3000}
                onClose={handleCloseSnackbarLoginError}
              >
                <Alert onClose={handleCloseSnackbarLoginError} severity="error" sx={{ width: '100%' }}>
                  Usuario o contraseña incorrecta!
                </Alert>
              </Snackbar>
            </>
            ) : (
            <>
              <Snackbar
                open={openSnackbarRegisterSuccess}
                autoHideDuration={3000}
                onClose={handleCloseSnackbarRegisterSuccess}
              >
                <Alert onClose={handleCloseSnackbarRegisterSuccess} severity="success" color="info" sx={{ width: '100%' }}>
                  Registro exitoso!
                </Alert>
              </Snackbar>
              <Snackbar
                open={openSnackbarRegisterError}
                autoHideDuration={3000}
                onClose={handleCloseSnackbarRegisterError}
              >
                <Alert onClose={handleCloseSnackbarRegisterError} severity="error" sx={{ width: '100%' }}>
                  Error al registrar!
                </Alert>
              </Snackbar>
            </>
            )}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "¿No tienes una cuenta? Regístrate."
                : "¿Ya tienes una cuenta? Inicia Sesión."}
            </Typography>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
