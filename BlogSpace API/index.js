let postArr = [];
//form element
const form = document.getElementById("new-post");
// create a function to manupilate the DOM
function renderPosts() {
  //create an empty html to hold all elements and use a for loop to iterate through dat
  let html = "";
  for (let post of postArr) {
    html += `
        <h3>${post.title} </h3>
        <p>${post.body}</P>
        <hr />
        `;
  }
  //innerHTML to display data
  document.getElementById("blog-list").innerHTML = html;
}

//Create fetch to request data and limit to five posts
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postArr = data.slice(0, 5);
    renderPosts();
  });
//create event listener to submit
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;
  // combine both title and body to an onject
  const data = {
    title: postTitle,
    body: postBody,
  };
  //sending data to server
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(" https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      //add new blog entry

      postArr.unshift(post);
      renderPosts();
      //reset data on form
      form.reset();
    });
});
