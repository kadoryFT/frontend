const buttonBaseStyles = {
  padding: "10px 20px 10px 19px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold",
  "&&": {
    borderRadius: "normal",
  },
};

const components = {
  text: {
    heading: {
      fontFamily: "poppins",
      fontWeight: "bold",
    },
    lg: { fontSize: 6, lineHeight: "33px" },
    md: { fontSize: 3, lineHeight: "24px" },
    sm: { fontSize: 1, lineHeight: "18px" },
  },
  input: {
    sm: {
      background: "white3",
      borderRadius: 10,
      height: "32px",
      width: "200px",
    },
    md: {
      background: "white3",
      borderRadius: 10,
      height: "36px",
      width: "200px",
    },
    lg: {
      background: "white3",
      borderRadius: 14,
      height: "48px",
      width: "200px",
    },
  },
  textarea: {
    padding: "10px 13px 10px 10px",
    borderRadius: "normal",
    border: "none",
    fontWeight: "normal",
    background: "lvl1",
    resize: "none",
    color: "textareaColor",
    "&:focus": {
      outline: "none !important",
    },
  },
  checkbox: {
    background: "lvl1",
    borderRadius: "5px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "lvl2",
    boxShadow: "none",
    outline: "none",
    appearance: "none",
    width: "inherit",
    height: "inherit",
    margin: "0px",
    cursor: "pointer",
    "& + svg": {
      display: "none",
      position: "absolute",
      pointerEvents: "none",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      margin: "auto",
    },
    "&:checked ": {
      background: "yellow",
      borderColor: "yellow",
      "& + svg": {
        display: "block",
      },
    },
    "&:focus:not(:checked)": {
      outline: "none",
      boxShadow: "none",
    },
    "&:focus": {
      outline: "none",
      boxShadow:
        "0px 0px 0px 1px #FFB300, 0px 0px 0px 4px rgb(255, 179, 0, .4)",
    },
    "&:hover:not(:disabled):not(:checked)": {
      borderColor: "yellow",
      boxShadow:
        "0px 0px 0px 1px #FFB300, 0px 0px 0px 4px rgb(255, 179, 0, .4)",
    },
  },
  radio: {
    background: "lvl1",
    borderRadius: "50px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "lvl2",
    boxShadow: "none",
    outline: "none",
    appearance: "none",
    width: "inherit",
    height: "inherit",
    margin: "0px",
    cursor: "pointer",
    "& + span": {
      display: "none",
      position: "absolute",
      pointerEvents: "none",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      margin: "auto",
      backgroundColor: "radioChecked",
      borderRadius: "50px",
    },
    "&:checked ": {
      background: "yellow",
      borderColor: "yellow",
      "& + span": {
        display: "block",
      },
    },
    "&:focus": {
      outline: "none",
      boxShadow:
        "0px 0px 0px 1px #FFB300, 0px 0px 0px 4px rgb(255, 179, 0, .2)",
    },
    "&:hover:not(:disabled):not(:checked)": {
      borderColor: "yellow",
    },
  },
  label: {
    inline: {
      display: "inline-flex",
      alignitems: "center",
      columnGap: 2,
    },
  },
  borders: {
    primaryButton: "3px solid #FFB300",
    primaryBtnDisable: "3px solid transparent",
    secondaryButton: "3px solid #FFB300",
    secondaryButtonDisable: "3px solid #FDFBF5",
    mode: {
      dark: {
        secondaryButtonDisable: "3px solid #F9F4E7",
      },
    },
  },
  buttons: {
    primary: {
      ...buttonBaseStyles,
      background: "yellow",
      border: "primaryButton",
      color: "primaryBright",

      "&:disabled": {
        cursor: "not-allowed",
        background: "white3",
        color: "primaryButtonDisable",
        border: "primaryBtnDisable",
      },

      "&:hover": {
        "&:not([disabled])": {
          borderColor: "hoveredYellow",
          background: "hoveredYellow",
        },
        "&:disabled": {},
      },
    },
    secondary: {
      ...buttonBaseStyles,
      background: "white2",
      border: "secondaryButton",
      color: "yellow",

      "&:disabled": {
        cursor: "not-allowed",
        background: "white3",
        color: "primaryButtonDisable",
        border: "primaryBtnDisable",
      },

      "&&:hover": {
        "&:not([disabled])": {
          borderColor: "hoveredYellow",
        },
        "&:disabled": {},
      },
    },
    tertiary: {
      ...buttonBaseStyles,
      background: "white3",
      border: "none",
      color: "text",

      "&:disabled": {
        cursor: "not-allowed",
        background: "white3",
        color: "primaryButtonDisable",
      },

      "&:hover": {
        "&:not([disabled])": {
          background: "white4",
        },
        "&:disabled": {},
      },
    },
    text: {
      ...buttonBaseStyles,
      background: "transparent",
      color: "text",

      "&:hover": {
        "&:not([disabled])": {
          color: "yellow",
        },
        "&:disabled": {},
      },

      "&:disabled": {
        cursor: "not-allowed",
        background: "white3",
        color: "primaryButtonDisable",
      },
    },
    success: {
      ...buttonBaseStyles,
      background: "success",
      color: "primaryBright",

      "&:disabled": {
        cursor: "not-allowed",
        background: "white3",
        color: "primaryButtonDisable",
      },

      "&:hover": {
        "&:not([disabled])": {
          background: "hoveredSuccess",
        },
        "&:disabled": {},
      },
    },
    danger: {
      ...buttonBaseStyles,
      background: "error",
      color: "primaryBright",

      "&:disabled": {
        cursor: "not-allowed",
        background: "white3",
        color: "primaryButtonDisable",
      },

      "&:hover": {
        "&:not([disabled])": {
          background: "hoveredDanger",
        },
        "&:disabled": {},
      },
    },
    circular: {
      width: "40px",
      height: "40px",
      background: "white3",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignitems: "center",
      overflow: "hidden",
      cursor: "pointer",
      padding: "1px",
      transition: "all .3s linear",

      "&:hover": {
        filter: "brightness(85%)",
      },

      "&:active": {
        transform: "scale(0.9)",
      },
    },
  },
  cards: {
    primary: {
      background: "navbar",
      borderRadius: "normal",
    },
  },
};

export default components;