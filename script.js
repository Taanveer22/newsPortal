console.log("connected");

// loadCategory function start------------------------------------------------
const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  // console.log(response);
  const data = await response.json();
  // console.log(data.data.news_category);
  const neededData = data.data.news_category;
  //   console.log(neededData);

  //   dynamic button creation
  const categoryBarContainer = document.getElementById(
    "category-bar-container"
  );
  //   console.log(categoryBarContainer);
  //   loop through every array data
  neededData.forEach((item) => {
    // console.log(item);
    const div = document.createElement("div");
    div.innerHTML = `
          <button onclick = loadNews('${item.category_id}')>${item.category_name}</button>
                     `;
    categoryBarContainer.append(div);
  });
};
// -------------------------------------------------------------------------

// loadnews function start -----------------------------------------------------
const loadNews = async (catId) => {
  //   document.getElementById("loading-spiner").style.display = "block";
  console.log(catId);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${catId}`
  );
  //   console.log(response);
  const data = await response.json();
  //   console.log(data.data);
  const allData = data.data;
  //   console.log(allData);

  const newsContainer = document.getElementById("news-container");
  //   console.log(newsContainer);
  //   clear feed after first loading
  newsContainer.innerHTML = "";

  //   spinner validation checking
  if (allData.length > 0) {
    document.getElementById("loading-spiner").style.display = "none";
  } else {
    document.getElementById("loading-spiner").style.display = "block";
  }

  //   loop through every array data
  allData.forEach((item) => {
    // console.log(item);
    // document.getElementById("loading-spiner").style.display = "none";
    const div = document.createElement("div");
    div.classList.add("single-news");
    div.innerHTML = `
        <div class="news-photo">
            <img src=${item.image_url} />
        </div>

        <div class="news-info">

            <div class="news-header">
                <h4>
                   ${item.title}
                </h4>
                <p class="news-badge">
                   ${item.rating.badge}
                   <sup>
                        <span class="news-rating">${item.rating.number}</span>
                   </sup>
                </p>
            </div>

            <p>
               ${item.details.slice(0, 300)}
            </p>

            <div class="news-footer">
                <div class="author">
                    <img class="author-img" src=${item.author.img} />
                    <div class="author-info">
                        <h2>${item.author.name}</h2>
                        <p>${item.author.published_date}</p>
                    </div>
                </div>

                <div class="views">
                    <img class="view-img"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/view-icon.png"
                    />
                    <p>${item.total_view}</p>
                </div>
                <div class="details-btn-container">
                    <button onclick="logTitle('${
                      item.title
                    }')" class="details-btn">Details</button>
                </div>
            </div>

        </div>
             `;
    newsContainer.append(div);
  });
};
// -------------------------------------------------------------------------

// handleSearch function start------------------------------------
const handleSearch = () => {
  const inputValue = document.getElementById("search-box").value;
  console.log(inputValue);

  if (inputValue) {
    loadNews(inputValue);
  } else {
    alert("please give correct category id");
  }
};
// ----------------------------------------------------------------------

// logTitle function start--------------------------------------------------
const logTitle = (param) => {
  console.log(param);
};

// load function invocation
loadCategory();
loadNews("01");
