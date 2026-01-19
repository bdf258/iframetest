import localStorageHelper from "./scripts/helpers/localStorageHelper";

const installationPreferences = localStorageHelper.getItem(
  "installationPreferences"
);
export const theme =
  installationPreferences.version.toLowerCase() != "au"
    ? {
        colors: {
          white: "#ffffff",
          black: "#000000",
          lightGrey: "#d3d3d3",
          grey: "rgb(79,34,227)",
          darkGrey: "#363636",
          green: "rgb(104,150,101)",
          blue: "rgb(64,32,128)",
          orange: "rgb(76,165,214)",
          brown: "rgb(197,91,79)",
          red: "#db504a",
          yellow: "rgb(201,165,70)",
          reviewDates: {
            red: "red",
            orange: "orange",
            green: "green",
            grey: "grey",
          },
        },
        inputs: {
          borderColor: "#C0C0C0",
          borderWidth: "1px",
          backgroundColor: "#F6F6F6",
          labelColor: "#dcdcdc",
          borderRadius: "4px",
        },
        buttons: {
          standard: {
            default: {
              color: "white",
              backgroundColor: "rgb(219, 97, 83)",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              borderRadius: "4px",
              paddingLeft: "15px",
              paddingRight: "15px",
              opacity: "1",
            },
            active: {
              color: "white",
              backgroundColor: "rgb(219, 97, 83)",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              boxShadow: "unset",
              top: "0px",
              left: "0px",
              opacity: "0.8",
            },
            hover: {
              color: "white",
              backgroundColor: "rgb(219, 97, 83)",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              boxShadow: undefined,
              opacity: "0.8",
            },
            disabled: {
              color: "#D3D3D3",
              backgroundColor: "#FAFAFA",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#FAFAFA",
              boxShadow: undefined,
            },
          },
          text: {
            default: {
              color: "#363636",
              fontSize: "1",
            },
            active: {
              color: "#363636",
            },
            hover: {
              color: "#363636",
            },
            disabled: {
              color: "#D3D3D3",
            },
          },
          buttonBar: {
            default: {
              backgroundColor: "#FFFFFF",
              color: "#363636",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              borderRadius: "5px",
              smallOverride: {},
              largeOverride: {},
            },
            active: {
              backgroundColor: "#F2F2F2",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              boxShadow: "unset",
              color: "#363636",
            },
            hover: {
              backgroundColor: "#F2F2F2",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              boxShadow: undefined,
              color: "#363636",
              opacity: 1,
            },
            disabled: {
              backgroundColor: "#FAFAFA",
              borderRightStyle: "unset",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              boxShadow: undefined,
            },
          },
        },
        font: {
          fontFamily: "Poppins, sans-serif",
          sizes: {
            small: "0.7rem",
            normal: "0.9rem",
            large: "1.5rem",
          },
        },
        spacing: 8,
        boxShadow: {
          standard: "none",
          dark: "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
        },
        borderRadius: {
          squarer: "5px",
          stanrdard: "10px",
          rounder: "8px",
        },
        modal: {
          width: {
            small: 400,
            medium: 600,
            large: 1000,
            xLarge: 1100,
          },
        },
        notificationBox: {
          alert: {
            color: "#721c24",
            backgroundColor: "#f8d7da",
            borderColor: "#f5c6cb",
          },
          warn: {
            color: "#856404",
            backgroundColor: "#fff3cd",
            borderColor: "#ffeeba",
          },
          info: {
            color: "#004085",
            backgroundColor: "#cce5ff",
            borderColor: "#b8daff",
          },
          success: {
            color: "#155724",
            backgroundColor: "#d4edda",
            borderColor: "#c3e6cb",
          },
        },
        zIndex: {
          0: 1,
          1: 10,
          2: 100,
          3: 1000,
          4: 2000,
          5: 10000,
        },
        viewCaseNoteActionsButtonBar: {
          marginTop: 33,
        },
      }
    : {
        colors: {
          white: "#ffffff",
          black: "#000000",
          lightGrey: "#d3d3d3",
          grey: "#7A7A7A",
          darkGrey: "#363636",
          green: "#97cc04",
          blue: "#42aad8",
          orange: "#ee8434",
          brown: "#967a53",
          red: "#db504a",
          yellow: "#efca08",
          reviewDates: {
            red: "red",
            orange: "orange",
            green: "green",
            grey: "grey",
          },
        },
        inputs: {
          borderColor: "#C0C0C0",
          borderWidth: "1px",
          backgroundColor: "#F6F6F6",
          labelColor: "#dcdcdc",
          borderRadius: "4px",
        },
        buttons: {
          standard: {
            default: {
              color: "#FFFFFF",
              backgroundColor: "#293d98",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              borderRadius: "4px",
              paddingLeft: "15px",
              paddingRight: "15px",
              opacity: "1",
              boxShadow: "unset",
            },
            active: {
              color: "#FFFFFF",
              backgroundColor: "#293d98",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              boxShadow: "unset",
              top: "1px",
              left: "1px",
            },
            hover: {
              color: "#FFFFFF",
              backgroundColor: "#293d98",
              borderWidth: "0px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              boxShadow: undefined,
              opacity: "0.8",
            },
            disabled: {
              color: "#D3D3D3",
              backgroundColor: "#FAFAFA",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#FAFAFA",
              boxShadow: undefined,
            },
          },
          text: {
            default: {
              color: "#363636",
            },
            active: {
              color: "#363636",
            },
            hover: {
              color: "#363636",
            },
            disabled: {
              color: "#D3D3D3",
            },
          },
          buttonBar: {
            default: {
              backgroundColor: "#FFFFFF",
              color: "#363636",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              borderRadius: "5px",
              smallOverride: {},
              largeOverride: {},
            },
            active: {
              backgroundColor: "#F2F2F2",
              color: "#363636",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              boxShadow: "unset",
            },
            hover: {
              backgroundColor: "#F2F2F2",
              color: "#363636",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              boxShadow: undefined,
            },
            disabled: {
              backgroundColor: "#FAFAFA",
              borderRightStyle: "unset",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "#C0C0C0",
              boxShadow: undefined,
            },
          },
        },
        font: {
          fontFamily: "Inter, sans-serif",
          sizes: {
            small: "0.7rem",
            normal: "0.9rem",
            large: "1.5rem",
          },
        },
        spacing: 8,
        boxShadow: {
          standard: "none",
          dark: "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
        },
        borderRadius: {
          squarer: "5px",
          stanrdard: "10px",
          rounder: "8px",
        },
        modal: {
          width: {
            small: 400,
            medium: 600,
            large: 1000,
            xLarge: 1100,
          },
        },
        notificationBox: {
          alert: {
            color: "#721c24",
            backgroundColor: "#f8d7da",
            borderColor: "#f5c6cb",
          },
          warn: {
            color: "#856404",
            backgroundColor: "#fff3cd",
            borderColor: "#ffeeba",
          },
          info: {
            color: "#004085",
            backgroundColor: "#cce5ff",
            borderColor: "#b8daff",
          },
          success: {
            color: "#155724",
            backgroundColor: "#d4edda",
            borderColor: "#c3e6cb",
          },
        },
        zIndex: {
          0: 1,
          1: 10,
          2: 100,
          3: 1000,
          4: 2000,
          5: 10000,
        },
        viewCaseNoteActionsButtonBar: {
          marginTop: 27,
        },
      };

export default theme;
