import styled from "styled-components";

const Theme = async () => {
  const cssFontResponse = await fetch("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800");
  const cssResponse = await fetch("https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP");

  if (!cssFontResponse.ok || !cssResponse.ok) {
    console.log(cssFontResponse, cssResponse);
    return "Hello";
  }

  const cssFont = await cssFontResponse.text();
  const css = await cssResponse.text();

  const styledDiv = styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
  `;

  return styledDiv;
};

export default Theme;

// // export default Theme;
// import { useState, useEffect } from "react";
// import styled from "styled-components";

// const Theme = () => {
//   const [css, setCss] = useState("");

//   useEffect(() => {
//     const fetchCss = async () => {
//       const cssResponse = await fetch("https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP");
//       const css = await cssResponse.text();
//       setCss(css);
//     };
//     fetchCss();
//   }, []);

//   return (
//     <div>
//       <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800" rel="stylesheet" />
//       <StyledDiv css={css}></StyledDiv>
//     </div>
//   );
// };

// const StyledDiv = styled.div`
//   font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
//   ${({ css }) => css};
// `;

// export default Theme;
