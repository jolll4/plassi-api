import { styled } from "styled-components";

export const RectangleTable = styled.div`
  width: 80%;
  max-width: 1500px;
  margin: auto;
  padding: 20px;
`;

export const RectangleSeat = styled.div`
  display: flex;
  box-sizing: border-box;
  width: calc(50% - 2 * 2px);
  height: auto;
  float: left;
  margin: 2px;
  background-color: #c9c9c9;
  color: #000000;
`;

export const Circle = styled.div`
  margin: auto 0 auto 0.2em;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
`;

export const Square = styled.div`
  margin: auto 0 auto 0.2em;
  height: 25px;
  width: 25px;
  display: inline-block;
`;

export const Triangle = styled.div`
  margin: auto 0 auto 0.2em;
  width: 0;
  height: 0;
  border-left: 12.5px solid transparent;
  border-right: 12.5px solid transparent;
  border-bottom: 25px solid;
  display: inline-block;
`;

export const TriangleDown = styled.div`
  margin: auto 0 auto 0.2em;
  width: 0;
  height: 0;
  border-left: 12.5px solid transparent;
  border-right: 12.5px solid transparent;
  border-top: 25px solid;
  display: inline-block;
`;

export const Minus = styled.div`
  margin: auto 0 auto 0.2em;
  height: 5px;
  width: 25px;
`;
