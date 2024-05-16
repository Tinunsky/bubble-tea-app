import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  background: white;
  transition: all 0.4s ease;
  border-bottom: 0.5px solid #2225;
`;

export const arrowStyle = {
  maxWidth: "15px",
  maxHeight: "15px",
  justifyContent: "end",
};
export function contentWrapperStyle(expanded: boolean, contentHeight: string) {
  return {
    overflow: "hidden",
    height: expanded ? contentHeight : "0px",
    transition: "all 0.4s ease",
  };
}
export const headerStyle = {
  cursor: "pointer",
  padding: "3px 0",
};
