const calcTime = (timestamp) => {
  //한국시간 +9시간으로 받아서 시간이 맞지않는 문제가 생김
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  //그래서 한국시간으로 빼주기
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else "방금전";
};
//남은 시간 구해서 몇분전같은 타임스탬프 만들기

const renderData = (data) => {
  //데이터들을 렌더해주기
  const main = document.querySelector("main");

  data.reverse().forEach(async (obj) => {
    //각각 데이터들을 나열해주고 어레이해주는 함수 //reverse는 최신순으로 돌려준다
    const div = document.createElement("div");
    div.className = "item_list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item_list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const InfoDiv = document.createElement("div");
    InfoDiv.className = "item_list__info";

    const InfoTitleDiv = document.createElement("div");
    InfoTitleDiv.className = "item_list__info_title";
    InfoTitleDiv.innerText = obj.title;

    const InfoMetaDiv = document.createElement("div");
    InfoMetaDiv.className = "item_list__info_meta";
    InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

    const InfoPriceDiv = document.createElement("div");
    InfoPriceDiv.className = "item_list__info_price";
    InfoPriceDiv.innerText = obj.price;

    imgDiv.appendChild(img);

    InfoDiv.appendChild(InfoTitleDiv);
    InfoDiv.appendChild(InfoMetaDiv);
    InfoDiv.appendChild(InfoPriceDiv);
    div.appendChild(imgDiv);
    div.appendChild(InfoDiv);
    main.appendChild(div);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
