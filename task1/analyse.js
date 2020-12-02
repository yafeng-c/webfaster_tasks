let analyse = document.getElementById("analyse");
let text = document.getElementById("textarea");
let clear = document.getElementById("clear");

function count_elem(doc, result) {
  while (doc && doc.firstChild) {
    let tag = doc.firstChild.tagName;
    if (tag) {
      if (result[tag]) {
        result[tag] = result[tag] + 1;
      } else {
        result[tag] = 1;
      }
    }
    if (doc.firstChild.firstChild) {
      count_elem(doc.firstChild, result);
    }
    doc.removeChild(doc.childNodes[0]);
  }
  return result;
}

function addTable(result) {
  let result_table = document.getElementById("result_table");

  let table = document.createElement("TABLE");
  table.id = "TABLE";
  table.border = "1";

  let tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);

  let length = Object.keys(result).length;
  let row = Math.ceil(length / 4);

  for (let i = 0; i < row; i++) {
    let tr = document.createElement("TR");
    tableBody.appendChild(tr);
    for (let j = 0; j < 4; j++) {
      let key = Object.keys(result)[0];
      let value = result[key];
      let td = document.createElement("TD");
      td.width = "75";
      if (key && value) {
        td.appendChild(document.createTextNode(key + ": " + value));
      } else {
        td.appendChild(document.createTextNode(""));
      }
      tr.appendChild(td);
      delete result[key];
    }
  }
  result_table.appendChild(table);
}

text.addEventListener("change", function (e) {
  text.value = e.target.value;
});

analyse.addEventListener("click", function () {
  if (text.value === "") {
    alert("Please input something");
  } else {
    let doc = new DOMParser().parseFromString(text.value, "text/xml");
    let result = count_elem(doc, {});
    addTable(result);
  }
});

clear.addEventListener("click", function () {
  text.value = "";
  let table = document.getElementById("TABLE");
  table.remove();
});
