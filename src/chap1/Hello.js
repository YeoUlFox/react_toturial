import React from "react";

function Hello(props) {
  const name = "react";
  const backgroundColor = "black";
  const style = {
    backgroundColor: backgroundColor,
    color: "aqua",
    fontSize: 24, // 기본 단위 px
    padding: "1rem", // 다른 단위 사용 시 문자열로 설정
  };

  return (
    <div style={style}>
      안녕하세여 {name} {props.name}
    </div>
  );
}

export default Hello;
