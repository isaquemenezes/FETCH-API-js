const api = "https://jsonplaceholder.typicode.com/posts";

const load = document.getElementById('loading');
const postsContainer = document.getElementById('posts-container');

// get id from url
const url = new URLSearchParams(window.location.search);
const post_id = url.get('id');

async function getAllPosts() {
    const response = await fetch(api)

    console.log("response => "+response);

    const data = await response.json();

    console.log(data);

    load.classList.add("hide");

    data.map((post) => {
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerHTML = post.title;
        body.innerHTML = post.body;
        link.innerHTML = "ler";
        link.setAttribute("href", `/post.html?id=${post.id}`);

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);

        postsContainer.appendChild(div);

    })
}

if(!post_id) {
    getAllPosts();
} else {
    console.log(post_id);
}