const Calls = async function (song) {
  try {
    let Song = await fetch(song);
    if (Song.ok) {
      let ArrayOfSongs = await Song.json();
      let Currentsong = ArrayOfSongs.data[0];
      const {
        artist: { name },
      } = Currentsong;
      const {
        album: { cover_big },
      } = Currentsong;
      let row0 = document.getElementById("row0");
      row0.innerHTML =
        row0.innerHTML +
        `
            <div class="col-12 col-md-6 col-lg-3 my-4">
            <div class="crad mb-3 border border-0 rounded shadow p-3 bg-info-subtle" style="width: 100$;">
            <img src="${cover_big}"class="card-img-top rounded" alt="">
            <div class="card-body">
            <h5 class="card-title mt-2" rank="${Currentsong.rank}">${Currentsong.title}</h5>
            <p class="card-text">Artist: ${name}</p>
            <audio class="w-100" controls src="${Currentsong.preview}"></audio>
            </div>
            </div>
            </div>
            `;
    }
  } catch (error) {
    console.log(error);
  }
};

Calls("https://striveschool-api.herokuapp.com/api/deezer/search?q=something%20just%20like%20this");
Calls("https://striveschool-api.herokuapp.com/api/deezer/search?q=natural");
Calls("https://striveschool-api.herokuapp.com/api/deezer/search?q=demons");
Calls("https://striveschool-api.herokuapp.com/api/deezer/search?q=one%20more%20light");

const call = async function (song) {
  try {
    let DataFromUrl = await fetch(song);
    if (DataFromUrl.ok) {
      let SongObj = await DataFromUrl.json();
      const FavoriteSong = SongObj.data[0];
      console.log(FavoriteSong);
      const {
        artist: { name },
      } = FavoriteSong;
      const {
        album: { cover_big },
      } = FavoriteSong;
      let row1 = document.getElementById("row1");
      row1.innerHTML =
        row1.innerHTML +
        `
<div class="col-12 d-flex justify-content-center">
<div class="card mb-3 shadow p-3 bg-info-subtle border border-0" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${cover_big}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title" rank="${FavoriteSong.rank}">${FavoriteSong.title}</h5>
        <p class="card-text">Artist: ${name}</p>
        <audio controls src="${FavoriteSong.preview}"></audio>
        </div>
        </div>
  </div>
</div>
</div>
`;
    }
  } catch (error) {
    console.log(error);
  }
};

call("https://striveschool-api.herokuapp.com/api/deezer/search?q=viva%20la%20vida");

const CallforCarousel = async function (song) {
  try {
    let Song = await fetch(song);
    if (Song.ok) {
      let ArrayOfSongs = await Song.json();
      let Currentsong = ArrayOfSongs.data[0];
      const {
        album: { cover_big },
      } = Currentsong;
      let carousel = document.getElementById("carousel");
      carousel.innerHTML =
        carousel.innerHTML +
        `
        <div class="carousel-item active">
              <img src="${cover_big}" class="d-block w-100 rounded" alt="" />
            </div>
         `;
    }
  } catch (error) {
    console.log(error);
  }
};

CallforCarousel("https://striveschool-api.herokuapp.com/api/deezer/search?q=sweetbutpsycho");
CallforCarousel("https://striveschool-api.herokuapp.com/api/deezer/search?q=ghost");
CallforCarousel("https://striveschool-api.herokuapp.com/api/deezer/search?q=smoke%20+%20mirrors");

const GetAlltitleArray = function () {
  let GetAlltitle = document.querySelectorAll(".card-title");
  let Alltitle = [];
  GetAlltitle.forEach((title) => {
    Alltitle.push({
      title: title.innerText,
      rank: Number(title.getAttribute("rank")),
    });
  });
  console.log(Alltitle);
  return Alltitle;
};

const alertPlaceholder = document.getElementById("AppendHere");

const OrderByRank = function () {
  alertPlaceholder.classList.add("d-flex");
  const wrapper = document.createElement("ul");
  const AlertButton = document.createElement("button");
  const AlertDiv = document.createElement("div");
  AlertDiv.classList.add(
    "p-2",
    "border",
    "border-1",
    "border-success",
    "rounded",
    "mt-2",
    "align-items-center",
    "bg-success",
    "bg-gradient",
    "opacity-50",
    "d-flex",
    "justify-content-between"
  );
  AlertDiv.id = "AlertDiv";
  AlertButton.onclick = DeleteAlert;
  AlertButton.classList.add("btn", "btn-success", "border", "border-1");
  AlertButton.innerText = "X";
  wrapper.classList.add("d-flex", "list-unstyled", "mb-0");
  alertPlaceholder.append(AlertDiv);
  AlertDiv.append(wrapper);
  AlertDiv.append(AlertButton);
  let titles = GetAlltitleArray();
  let sorted = titles.sort((a, b) => {
    return a.rank - b.rank;
  });
  sorted.forEach((song) => {
    wrapper.innerHTML += `<li class="me-3 text-white">${song.title} - ${song.rank}</li>`;
  });
};

let DeleteAlert = function () {
  let AlertDiv = document.getElementById("AlertDiv");
  AlertDiv.remove();
};

let SongsByRankButton = document.getElementById("liveAlertBtn");
SongsByRankButton.addEventListener("click", OrderByRank);
