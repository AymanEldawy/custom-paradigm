let imgList = [];

// Handel list of inputs
function inputList(selector, len) {
  let arr = "";
  for (let i = 0; i < len; i++) {
    let item = document.querySelector(`input[name="${selector}[${i}]"]`);
    arr += item.value ? `${i + 1}- ${item.value} | ` : "";
  }
  return arr;
}
// send and Save data to google sheet
function sendDataToSheet() {
  let formData = new FormData(document.getElementById("formId"));
  formData.append("data[الصور]", imgList);
  formData.append("data[أهداف_البرنامج]", inputList("data[أهداف_البرنامج]", 4));
  formData.append("data[مؤشرات_الأداء]", inputList("data[مؤشرات_الأداء]", 2));
  formData.append("data[وصف_البرنامج]", inputList("data[وصف_البرنامج]", 2));
  formData.append("data[أوجه_الصرف]", inputList("data[أوجه_الصرف]", 4));
  formData.append(
    "data[الاطراف_المستفيدون_من_البرنامج]",
    inputList("data[الاطراف_المستفيدون_من_البرنامج]", 4)
  );
  formData.append(
    "data[المشاركون_في_التنفيذ_داخل_المكتب]",
    inputList("data[المشاركون_في_التنفيذ_داخل_المكتب]", 2)
  );
  formData.append(
    "data[المشاركون_في_التنفيذ_خارج_المكتب]",
    inputList("data[المشاركون_في_التنفيذ_خارج_المكتب]", 2)
  );
  formData.append(
    "data[المتحققة_قبل_التنفيذ]",
    inputList("data[المتحققة_قبل_التنفيذ]", 3)
  );
  formData.append(
    "data[المتحققة_بعد_التنفيذ]",
    inputList("data[المتحققة_بعد_التنفيذ]", 3)
  );
  formData.append("data[التوثيق]", inputList("data[التوثيق]", 3));
  formData.append("data[الموضوع]", inputList("data[الموضوع]", 3));
  console.log(formData);
  fetch(`https://sheetdb.io/api/v1/vf1e87t90g2jg`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((html) => {
      console.log(html);
    })
    .catch((error) => {
      console.log(error.message);
    });
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
document.getElementById("save").addEventListener("click", sendDataToSheet);
