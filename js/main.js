const api = "https://jsonplaceholder.typicode.com/posts";

const load = document.getElementById('loading');
const posts = document.getElementById('posts-container');

async function getAllPosts() {
    const response = await fetch(api)

    console.log(response);
}

getAllPosts();