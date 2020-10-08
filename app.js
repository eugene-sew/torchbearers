const search = document.getElementById("search");
const matchList = document.getElementById("matchlist");

//search and filter books
const searchBooks = async (searchText) => {
  const result = await fetch("./TBSSGh (copyforCsv).json");
  const books = await result.json();

  //get the match
  let matches = books.filter((book) => {
    regex = new RegExp(`^${searchText}`, "gi");
    return book.TITLE.match(regex) || book.Author.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

//showing results in html
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
      <div class ="card card-body mb-1">
      <h3>${match.TITLE}</h3>(${match.Author})
      </div>
        `
      )
      .join("");
    console.log(html);
    matchList.innerHTML = html;
  }
};

search.addEventListener("input", () => searchBooks(search.value));
