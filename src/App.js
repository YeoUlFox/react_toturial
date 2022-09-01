import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from "react";

import produce from "immer";

// conponents
import UserList from "./chap1/UserList";
import CreateUser from "./chap1/CreateUser";
import useInputs from "./hooks/userInputs";
import Button from "./chap2/Button";
import CheckBox from "./chap2/CheckBox";
import Circle from "./chap2/Circle";
import Button2, { AppBlock } from "./chap2/Button2";
import { ThemeProvider } from "styled-components";

function countActiveUsers(users) {
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "zxcv",
      email: "zxcv.zxcv@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "zxcv2",
      email: "zxcv2@example.com",
      active: false,
    },
    {
      id: 3,
      username: "zxcv3",
      email: "zxcv3@example.com",
      active: false,
    },
  ],
};

export const UserDispatch = React.createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find(
          (user) => user.id === action.id
        );
        user.active = !user.active;
      });
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id !== action.id
        ),
      };
    default:
      return state;
  }
}

function App() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const nextId = useRef(4);
  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);

  const count = useMemo(
    () => countActiveUsers(users),
    [users]
  );

  const [check, setCheck] = useState(false);
  const onCheckBoxChange = (e) => {
    setCheck(e.target.checked);
  };

  return (
    <>
      <UserDispatch.Provider value={dispatch}>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        <UserList
          users={users}
          onToggle={onToggle}
          onRemove={onRemove}
        />
        <div>활성사용자 수 : {count}</div>
      </UserDispatch.Provider>

      <hr></hr>

      {/* Chap2 */}
      <Button size="large">Btn1</Button>
      <Button>Btn2</Button>
      <Button size="small">Btn3</Button>

      <CheckBox onChange={onCheckBoxChange} checked={check}>
        체크체크
      </CheckBox>

      <hr></hr>

      <ThemeProvider
        theme={{
          palette: {
            blue: "#228be6",
            gray: "#495057",
            pink: "#f06595",
          },
        }}
      >
        <AppBlock>
          <Circle color="blue" huge />
          <Button2>버어튼</Button2>
        </AppBlock>
      </ThemeProvider>
    </>
  );
}

export default App;
