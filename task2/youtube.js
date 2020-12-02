const list = document.querySelectorAll("ytd-video-renderer");

function getVideos() {
  let result = [];
  for (let elem of list) {
    let video = {
      url: elem.querySelector("a").href,
      thumbnail: elem.querySelector("img").src,
      name: elem.getElementsByClassName("title-and-badge")[0].querySelector("a")
        .innerText,
      description: elem.querySelectorAll("yt-formatted-string")[3].outerText,
      views: elem
        .querySelector("ytd-video-meta-block")
        .querySelectorAll("span")[0].innerText,
      time: elem
        .querySelector("ytd-video-meta-block")
        .querySelectorAll("span")[1].innerText,
      channel: elem.querySelectorAll("yt-formatted-string")[1].innerText,
    };
    result.push(video);
  }
  return result;
}
