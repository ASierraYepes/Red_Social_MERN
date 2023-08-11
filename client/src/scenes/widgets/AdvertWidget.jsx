import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { URL } from "Url"

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Patrocinado
        </Typography>
        <Typography color={medium}>Anuncios</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${URL}/assets/Sierra_Group.png`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Sierra Group</Typography>
        <Typography color={medium}>www.sierragroup.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
      "Sierra Group: Transforming Futures through Technological Innovation. As pioneers in technology, 
      we craft solutions that reshape how we live, work, and connect. Merging creativity and technology, 
      we are building the future today."
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
