console.log("connected");

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
  neededData.forEach((item) => {
    // console.log(item);
    const div = document.createElement("div");
    div.innerHTML = `
          <button>${item.category_name}</button>
                     `;
    categoryBarContainer.append(div);
  });
};

const loadNews = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/category/01"
  );
  //   console.log(response);
  const data = await response.json();
//   console.log(data.data);
  const allData = data.data;
  allData.forEach((item) => {
    console.log(item);
  });
};

// load function invocation
loadCategory();
loadNews();
