window.onload = function afterPageLoaded() {
  document.getElementById("searchButton").onclick = getAnime;
};

const APIURL = "https://api.jikan.moe/v3/search/anime?q=";

let index = 0;
let resp;
let respData;
let moreInfo;
let moreInfoRes;

async function getAnime() {
  let anime = APIURL + document.getElementById("search").value;
  resp = await fetch(anime);
  respData = await resp.json();

  index = 0;

  document.getElementById("content").innerHTML = "";
  //settings roba

  respData.results.forEach((anime) => {
    let card = document.createElement("div");
    let cover = document.createElement("img");
    let info = document.createElement("div");
    let title = document.createElement("p");
    let moreInfo = document.createElement("div");
    let vote = document.createElement("span");

    title.innerHTML = anime.title;
    cover.src = anime.image_url;
    vote.innerHTML = anime.score;
    card.id = "card";
    card.className = "card";
    cover.id = "cover";
    cover.className = "cover";
    info.id = "info";
    info.className = "info";
    title.id = "title";
    title.className = "title-p";
    vote.id = "vote";
    vote.className = "vote-span " + getScoreColor(parseInt(anime.score));

    moreInfo.className = "more-info-div";
    moreInfo.id = "moreinfo";

    moreInfo.innerHTML +=
      "  <span class='infoText'> Episodes Number: </span>" +
      anime.episodes +
      "<br>";
    moreInfo.innerHTML += "<span class='infoText'> Still airing?: </span> ";
    anime.airing
      ? (moreInfo.innerHTML += "Yes" + "<br>")
      : (moreInfo.innerHTML += "No" + "<br>");
    moreInfo.innerHTML += "<p class='infoText'> Overview </p>";
    moreInfo.innerHTML += "<p class='synopsis'>" + anime.synopsis + "</p> <br>";
    //append al body e alla card
    card.appendChild(cover);
    card.appendChild(info);
    info.appendChild(title);
    info.appendChild(vote);
    card.appendChild(moreInfo);

    document.getElementById("content").appendChild(card);
  });
  
  document.getElementById("formone").addEventListener("keyup",(event)=>{
    event.preventDefault();
  })

  document.getElementById("search").addEventListener("keyup", (event)=>{
    if (event.keyCode ===  13){
      document.getElementById("searchButton").click();
    }
  });
  //settaggio degli stili

  /*
  <div class="card" id="card">
    <img class="cover" id="cover"></img>
    <div class="info" id="info">
      <p class="title-p" id="title"></p>
    </div>
    <p class="showMore" id="showmore">
      More Info
    </p>
  </div>;
  */
}

function getScoreColor(scoreValue) {
  if (scoreValue >= 8) return "green";
  if (5 <= scoreValue && scoreValue < 8) return "orange";
  if (scoreValue <= 4) return "red";
}
