// Theme configuration and data
export const THEME_CONFIG = {
  CHANGE_INTERVAL: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  TRANSITION_DURATION: 600
};

export const themes = [
  {
    image: "https://i.postimg.cc/PxF5M9jY/image3.jpg",
    styles: `
      #main {
        background-image: url('https://i.postimg.cc/PxF5M9jY/image3.jpg');
      }
      :root {
        --accent: #000000;
        --text: #000000;
        --glass: rgba(255, 255, 255, 0.1);
        --x: #ff0000;
      }
      @media only screen and (max-width: 768px) {
        #main {
          background-position: calc(100% - -100px) top;
        }
      }
    `,
  }
];
