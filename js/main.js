const api = "https://jsonplaceholder.typicode.com/posts";

const load = document.getElementById('loading');
const postsContainer = document.getElementById('posts-container');

const post_page = document.getElementById('post');
const post_container = document.getElementById('post-container');
const comments_container = document.getElementById('comments-container');

const comment_form = document.getElementById('comment-form');
const email_input = document.getElementById('email');
const body_input = document.getElementById('body');

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

    });
}

async function getPost(id) {
    const [responsePost, responseComments] = await Promise.all([
        fetch(`${api}/${id}`),
        fetch(`${api}/${id}/comments`)
    ]);

    const dataPost = await responsePost.json();

    const dataComments = await responseComments.json();

    load.classList.add('hide');
    post_page.classList.remove('hide');

    const title = document.createElement("h1");
    const body = document.createElement("p");

    title.innerText = dataPost.title;
    body.innerHTML = dataPost.body;

    post_container.appendChild(title);
    post_container.appendChild(body);

    dataComments.map((comment) => {
        createComment(comment);

    });
   

}

function createComment(comment) {
    const div = document.createElement("div");
    const email = document.createElement("h3");
    const commentBody = document.createElement("p");

    email.innerHTML = comment.email;
    commentBody.innerHTML = comment.body;

    div.appendChild(email);
    div.appendChild(commentBody);

    comments_container.appendChild(div);

}

if(!post_id) {
    getAllPosts();
} else {
    getPost(post_id);

    comment_form.addEventListener('submit', (event)=>{
        event.preventDefault();

        let comment = {
            email: email_input.value,
            body: body_input.value
        }

        console.log(comment);

        comment = JSON.stringify(comment);
        console.log("json",comment);

        // postComment(comment);
    })
}