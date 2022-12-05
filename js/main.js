let imgList = [];
// Handel list of inputs
function inputList(selector, len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    let item = document.querySelector(`input[name="${selector}[${i}]"]`);
    if (item.value) arr.push(item.value);
  }
  return arr;
}

// Handel gallery images
function inputFile(e) {
  console.log(e.target);
  console.log();
  let gallery = Array.from(e.target.files);
  gallery.forEach((img) => {
    let image = URL.createObjectURL(img);
    console.log(image);
    displayGallery(image);
    imgList.push(image);
  });
  console.log(imgList);
}

// Display Gallery
function displayGallery(image) {
  let img = document.createElement("img");
  img.src = image;
  document.querySelector(".gallery").append(img);
}

document.getElementById("inputFile").addEventListener("change", inputFile);
document.getElementById("save").addEventListener("click", html2pdfFun);

async function html2pdfFun() {
  document.getElementById("save").remove();
  document.getElementById("gallery").remove();
  let element = document.querySelector("#formId");
  var opt = {
    margin: 0,
    filename: "report.pdf",
    image: { type: "jpeg", quality: 0.2 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "p" },
  };

  html2pdf().set(opt).from(element).save();
}
