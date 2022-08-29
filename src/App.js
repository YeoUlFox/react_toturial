import React from "react";
import Hello from "./Hello";
import InputSample from "./InputSample";
import Wrapper from "./wrapper";

function App() {
  return (
    <>
      <Wrapper>
        <Hello name="react" />
        <Hello name="zzzzz" />
      </Wrapper>

      <InputSample />
    </>
  );
}

export default App;
