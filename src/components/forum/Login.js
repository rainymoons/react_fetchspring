import { useRef, useState } from "react";
import { getLoginUserInfo, login } from "../http/http";

export default function Login() {
  // 새로고침해도 로그인 정보가 날아가지 않게 하기 위해 sesstionStorage에서 토큰 값을 담아놓는다.
  const token = sessionStorage.getItem("token") || "";

  // 문자열형태임. 이걸 객체리터럴로 바꿔야 함.
  const info = JSON.parse(sessionStorage.getItem("info")) || {};

  // 로그인 검증
  const [loginState, setLoginState] = useState({
    // 두 개의 키로 검증. 로그인했으면 토큰정보만 갱신. 내 정보를 가져왔으면 info만 갱신
    token, // token 중복되므로 생략 , token: token,
    info,
  });

  const emailRef = useRef();
  const passwordRef = useRef();

  const onClickLoginHandler = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      alert("email을 입력해주세요!");
      return;
    }
    if (!password) {
      alert("password를 입력해주세요!");
      return;
    }

    const tokenJson = await login(email, password);

    // JSON으로 받아온 데이터의 status를 가져온다.
    const status = tokenJson.status;
    if (status === 200) {
      const token = tokenJson.body;
      console.log(token);

      // Browser의 데이터베이스에 token값을 저장한다.
      // sessionStorage는 브라우저가 종료되면, 데이터가 삭제된다.
      sessionStorage.setItem("token", token);

      // 로그인을 했으면 setLoginState을 호출. token만 갱신하려면? 함수
      // 기존의 객체리터러를 그대로 가져와서 복사하고 토큰값만 갱신
      // jwt가 state에 실린다.
      setLoginState((prevLoginState) => ({ ...prevLoginState, token }));

      // login 사용자의 정보를 얻어온다. - promise를 반환하므로 await
      const myInfoJson = await getLoginUserInfo();
      // 세션스토리지에 바디 정보를 넣어준다.
      sessionStorage.setItem("info", JSON.stringify(myInfoJson.body));

      //마찬가지로 넣어준다. -> 토큰값은 유지되고 info만 갱신됨.
      setLoginState((prevLoginState) => ({
        ...prevLoginState,
        info: myInfoJson.body,
      }));
    } else {
      const errorMessage = tokenJson.errors.join("\n");
      alert(errorMessage);
    }
  };

  return (
    <div>
      <input type="email" ref={emailRef} />
      <input type="password" ref={passwordRef} />
      <button onClick={onClickLoginHandler}>Login</button>
    </div>
  );
}
