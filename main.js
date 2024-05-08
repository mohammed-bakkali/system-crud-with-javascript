let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let confirmDeleteBtn = document.getElementById("confirmDelete");
let cancelDeleteBtn = document.getElementById("cancelDelete");
let All = document.getElementById("All");
let OnePro = document.getElementById("OnePro");

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

console.log(title, price, taxes, ads, discount, total, count, category, submit);
// Get Total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#1cd438";
  } else {
    total.innerHTML = "";
    total.style.background = "antiquewhite";
  }
}

let dataProduct = [];

if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function name() {
  // Creat Object
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // Validate inputs
  if (title.value != "" && price.value != "" && category.value != "" && count.value <= 100) {




    if (mood == "create") {

      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataProduct.push(newPro);
          clearData();
        }
      } else {
        dataProduct.push(newPro);
        
      }
    } else {
      dataProduct[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
  }


  // Save Data To LocalSrotage
  localStorage.setItem("product", JSON.stringify(dataProduct));

  
  showData();
};

// Clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read Data
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
    <tr>
          <td>${i + 1}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].taxes}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].discount}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
          <td><button onclick ="updateData(${i})"  "updateData" id="update">Update</button></td>
          <td><button class="delete"  data-index="${i}">Delete</button></td>
        </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDeteAll = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    btnDeteAll.innerHTML = `
    <button>delete All (${dataProduct.length})</button>
    `;
  } else {
    btnDeteAll.innerHTML = "";
  }
}
showData();

document.getElementById("tbody").addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("delete")) {
    let index = parseInt(e.target.getAttribute("data-index"));
    modal.style.display = "block";
    AllPro.style.display = "none";
    OnePro.style.display = "block";
    confirmDeleteBtn.onclick = function () {
      dataProduct.splice(index, 1);
      localStorage.product = JSON.stringify(dataProduct);
      modal.style.display = "none";
      showData();
    };
  }
});
document.getElementById("deleteAll").addEventListener("click", function () {
  modal.style.display = "block";
  OnePro.style.display = "none";
  AllPro.style.display = "block";
  confirmDeleteBtn.onclick = function () {
    localStorage.clear();
    dataProduct.splice(0);
    modal.style.display = "none";
    showData();
  };
});

span.onclick = function () {
  modal.style.display = "none";
};
cancelDeleteBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Update Data

function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  category.value = dataProduct[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMood = "Title...";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "Category...";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
          <td>${i}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].taxes}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].discount}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
          <td><button onclick ="updateData(${i})"  "updateData" id="update">Update</button></td>
          <td><button class="delete"  data-index="${i}">Delete</button></td>
        </tr>
    `;
      }
    } else {
      console.log(i);

      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
    <tr>
          <td>${i}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].taxes}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].discount}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
          <td><button onclick ="updateData(${i})"  "updateData" id="update">Update</button></td>
          <td><button class="delete"  data-index="${i}">Delete</button></td>
        </tr>
    `;
      }
    }
    document.getElementById("tbody").innerHTML = table;
  }
}

// clean Data

