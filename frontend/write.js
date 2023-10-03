const form = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
  event.preventDefault();
  const body = new FormData(form);
  //세계시간 기준으로 전달해버림
  body.append("insertAt", new Date().getTime());
  try {
    //이 안에 작성하게 되면 try안에 있는 로직을 시도해보다가 에러가 발생하면 이 밑에 로직이 실행
    const res = await fetch("/items", {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (data === "200") window.location.pathname = "/";
    //200이 떨어지면 루트페이지로 돌아가라라는 뜻
  } catch (e) {
    //e 에러라는뜻
    console.error(e);
  }
};

form.addEventListener("submit", handleSubmitForm);
