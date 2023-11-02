import styled, { css } from "styled-components";



const DarkBackground = styled.div`
  display: none;
  position: fixed;
  z-index: 999; 
  left: 0;
  top: 0;
  width: 100%;
  height: 100%; 
  overflow: auto;
  background-color: rgb(0, 0, 0); 
  background-color: rgba(0, 0, 0, 0.4);
  ${props =>props.disappear && css`display: block; /* show */`}`;



  
  export default DarkBackground