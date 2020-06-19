const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

/* fetch posts from api*/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function getPosts() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&limit=${limit}`);

    const data = await res.json();

    return data;
};



/* show posts in DOM */
async function showPosts() {
    const posts = await getPosts();

    // console.log(posts);

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;
        // append each postEl for each post into postContainer
        postsContainer.appendChild(postEl);
    });
}

/* show loader and fetch more posts */
function showLoader() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show')

        setTimeout(() => {
            page++;
            showPosts();   
        }, 300);
    }, 1000);    
};


/* filter posts by input */
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        // if no post matches -- returns -1, if it does it will return a number
        if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
};



/* show initial posts */
showPosts();


window.addEventListener('scroll', () => {
    // destructuring allows to pull out variables from object
    // don't have to repeat document.documentElement multiple times
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // https://stackoverflow.com/questions/22675126/what-is-offsetheight-clientheight-scrollheight
    if(scrollTop + clientHeight >= scrollHeight - 5) {
        showLoader();
    }

    // if (window.innerHeight + Math.ceil(window.scrollY) === document.body.clientHeight) {
    //     console.log("You have hit the bottom!");
    //     showLoader();
    // }

});


filter.addEventListener('input', filterPosts);