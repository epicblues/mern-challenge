import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export default makeStyles<Theme>((theme) => {
  console.log(theme);
  return {
    [theme.breakpoints.down("sm")]: {
      mainContainer: {
        flexDirection: "column-reverse",
      },
    },
    appBar: {
      borderRadius: 15,
      margin: "30px 0",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    heading: {
      color: "rgba(0,183,255, 1)",
    },
    image: {
      marginLeft: "15px",
    },
  };
});

// 라이브러리를 활용해서 추가적인 사용자 설정 덮어쓰기?
