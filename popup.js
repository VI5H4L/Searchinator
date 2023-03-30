const apiKey = 'AIzaSyBirLEy-tOSBjdBXzzauVfXjaBcRif-H5w';
const cx = 'b0c08a733e05545c1';
const searchUrl = 'https://www.googleapis.com/customsearch/v1';

function searchClipboard() {
  var input = document.createElement('textarea');
  document.body.appendChild(input);
  input.focus();
  document.execCommand('paste');
  var text = input.value;
  document.body.removeChild(input);
  if (text.trim() === '') {
    var searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = '<p>No recent clipboard content found.</p>';
  } else {
    var query = encodeURIComponent(text.trim());
    var url = `${searchUrl}?key=${apiKey}&cx=${cx}&q=${query}`;
    fetch(url)
      .then(response => response.json())
      .then(data => displaySearchResults(data.items));
  }
}

function displaySearchResults(results) {
  var searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = '';
  if (results.length === 0) {
    searchResults.innerHTML = '<p>No search results found.</p>';
  } else {
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      var title = result.title;
      var link = result.link;
      searchResults.innerHTML += `<a class="link" href="${link}" target="_blank">&#8227; ${title}</a><br>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", searchClipboard);
});

document.addEventListener("DOMContentLoaded", function () {
  searchClipboard();
});