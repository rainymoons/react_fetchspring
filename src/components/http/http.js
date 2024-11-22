// Login.js에서 쓸 수 있다.

/**
 * async 함수는 반드시 promise를 반환한다.
 *
 *
 */
export const login = async (email, password) => {
  // fetch 시작 - onClickLoginHandler 이벤트가 실행될때만 fetch가 시작됨. useEffect를 쓸 수 없음. 왜? 컴포넌트 훅들은 이런 함수 내에서는 쓸 수 없다.
  const loginUrl = "http://localhost:8080/token";

  const response = await fetch(loginUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    // 객체 리터럴이 JSON형태(문자)로 바뀐다. 반환되는 값은 JSON타입
    body: JSON.stringify({ email: email, password: password }),
  });
  console.log(response);

  const tokenJson = await response.json(); //얘도 async 함수. token은 body에 들어있음.
  console.log(tokenJson);

  return tokenJson;
};

export const getLoginUserInfo = async () => {
  // 세션스토리지에 있는 토큰의 정보를 가져온다.
  const jwt = sessionStorage.getItem("token");

  const myInfoUrl = "http://localhost:8080/api/v1/myinfo";

  const response = await fetch(myInfoUrl, {
    method: "GET",
    headers: {
      Authorization: jwt,
    },
  });

  const myInfoJson = await response.json();
  return myInfoJson;
};
