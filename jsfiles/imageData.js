// Image configuration data
export const imageData = [
  {
    image: "/images/image2.jpg",
    styles: `
      #main {
        background-image: url('./images/image2.jpg');
      }
      :root {
        --accent: #011126;
        --text: #99C8F2;
        --glass: rgb(27, 65, 89, 0.1);
        --x: #4681A6;
      }            
    `,
  },
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
