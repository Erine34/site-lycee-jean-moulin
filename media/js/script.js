function autoScroll(block_id) {
  var elem = document.getElementById(block_id);
  var rect = elem.getBoundingClientRect();
  var scrollTop = rect.top + window.scrollY;
  var menu = document.getElementById("menu");

  window.scroll({
    top: scrollTop - menu.offsetHeight,
    behavior: "smooth",
  });
}

function mapZoom(event) {
  event.preventDefault();

  scale += event.deltaY * -0.005;
  scale = Math.min(Math.max(1, scale), 4);

  let dw = dialogSize.width;
  let dh = dialogSize.height;

  mapSize = map.getBoundingClientRect();

  map.style.width = scale * dw + "px";
  map.style.height = scale * dh + "px";

  let cx = dialogSize.left + event.layerX + dw / 2;
  let cy = dialogSize.top + event.layerY + dh / 2;

  let mx = cx - (dw / 2) * scale;
  let my = cy - (dh / 2) * scale;

  let max_mx = dw - mapSize.width;
  let max_my = dh - mapSize.height;

  /*console.log({
    "scale ": scale,
    dw: dw,
    dh: dh,
    cx: cx,
    cy: cy,
    mx: mx,
    my: my,
    max_mx: max_mx,
    max_my: max_my,
    mleft: mapSize.left,
    mtop: mapSize.top,
    c: "(" + event.layerX + " , " + event.layerY + ")",
    event: event,
    mapSize: mapSize,
    dialogSize: dialogSize,
  });*/

  if (mx > 0) {
    mx = 0;
  } else if (mx < max_mx) {
    mx = max_mx;
  }
  if (my > 0) {
    my = 0;
  } else if (my < max_my) {
    my = max_my;
  }

  map.style.left = mx + "px";
  map.style.top = my + "px";
}

function mapMove(event) {
  let dw = dialogSize.width;
  let dh = dialogSize.height;

  //let mapSize = map.getBoundingClientRect();

  let cx = event.layerX;
  let cy = event.layerY;

  let mx = cx - (dw / 2) * scale;
  let my = cy - (dh / 2) * scale;

  let max_mx = dw - mapSize.width;
  let max_my = dh - mapSize.height;

  console.log({
    /* "scale ": scale,
    dw: dw,
    dh: dh,
    cx: cx,
    cy: cy,
    mx: mx,
    my: my,
    max_mx: max_mx,
    max_my: max_my,
    mleft: mapSize.left,
    mtop: mapSize.top,*/
    c: "(" + event.layerX + " , " + event.layerY + ")",
    /*event: event,
    mapSize: mapSize,
    dialogSize: dialogSize,*/
  });

  if (mx > 0) {
    mx = 0;
  } else if (mx < max_mx) {
    mx = max_mx;
  }
  if (my > 0) {
    my = 0;
  } else if (my < max_my) {
    my = max_my;
  }

  /*map.style.left = mx + "px";
  map.style.top = my + "px";*/
}

/*let scale = 1;
const dialog = document.querySelector(".el-modal-dialog");
const dialogSize = dialog.getBoundingClientRect();
const map = document.querySelector("#map");
let mapSize = map.getBoundingClientRect();

dialog.addEventListener("wheel", mapZoom, { passive: false });

const moveController = new AbortController();

map.addEventListener("mousedown", function (event) {
  map.addEventListener("mousemove", mapMove);
  map.addEventListener("mouseup", function () {
    map.removeEventListener("mousemove", mapMove);
  });
});
dialog.addEventListener("mouseout", function () {
  map.removeEventListener("mousemove", mapMove);
});

map.addEventListener("mousemove", function (event) {
  let cx = mapSize.width / scale / 2 + event.layerX; //la largeur de l'element "#map" / 2 + abscisse de la souris
  let cy = mapSize.height / scale / 2 + event.layerY;
  console.log({
    c0: "(" + event.layerX + " , " + event.layerY + ")",
    scale: scale,
    c1: "(" + cx + " , " + cy + ")",
  });
});*/

const closeModal = document.querySelector(".el-modal-close");
const modalD = document.querySelector(".el-modal-dialog");
const modalO = document.querySelector(".el-modal-overlay");
const modalMask = document.querySelector("#mask");
const modalMap = document.querySelector("#map");
const modalStaff = document.querySelector("#staff");
const localBtns = document.querySelectorAll(".localisation");
const creatorBtn = document.querySelectorAll(".creator");

closeModal.addEventListener("click", function () {
  modalD.style.display = "none";
  modalO.style.display = "none";
});

modalO.addEventListener("click", function () {
  modalD.style.display = "none";
  modalO.style.display = "none";
});

localBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    modalD.style.display = "block";
    modalO.style.display = "block";
    modalMask.style.display = "block";
    modalMap.style.display = "block";
    modalStaff.style.display = "none";
    modalMask.style.backgroundImage =
      "url('media/img/map-" + el.dataset.mask + ".png')";
  });
});
creatorBtn.forEach(function (el) {
  el.addEventListener("click", function () {
    console.log("creator");
    modalD.style.display = "block";
    modalO.style.display = "block";
    modalMask.style.display = "none";
    modalMap.style.display = "none";
    modalStaff.style.display = "block";
  });
});
