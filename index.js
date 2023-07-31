const addBlogModal = document.getElementById('add-blog-modal');
const addBlogBtn = document.getElementById('add-blog-btn');
const closeBtn = document.getElementsByClassName('close')[0];
const addBlogForm = document.getElementById('add-blog-form');
const blogList = document.getElementById('blog-list');

// Event listeners
addBlogBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
addBlogForm.addEventListener('submit', addBlogPost);

// Function to open the add blog modal
function openModal() {
    addBlogModal.style.display = 'block';
}

// Function to close the add blog modal
function closeModal() {
    addBlogModal.style.display = 'none';
}

// Function to close the modal if clicked outside
function outsideClick(event) {
    if (event.target === addBlogModal) {
        addBlogModal.style.display = 'none';
    }
}

// Function to add a new blog post
function addBlogPost(event) {
    event.preventDefault();

    const title = document.getElementById('blog-title').value;
    const author = document.getElementById('blog-author').value;
    const summary = document.getElementById('blog-summary').value;
    const content = document.getElementById('blog-content').value;

    if (title.trim() === '' || author.trim() === '' || summary.trim() === '' || content.trim() === '') {
        alert('Please fill in all the fields.');
        return;
    }

    // Create a blog object
    const blog = {
        title,
        author,
        summary,
        content,
    };

    // Save the blog to LocalStorage
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));

    // Clear the form fields and display the updated list of blogs
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-author').value = '';
    document.getElementById('blog-summary').value = '';
    document.getElementById('blog-content').value = '';

    displayExistingBlogs();
    
    closeModal();
}

// Function to display existing blogs from LocalStorage
function displayExistingBlogs() {
    blogList.innerHTML = '';

    // Retrieve blogs from LocalStorage
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    blogs.forEach((blog) => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');
        blogCard.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.summary}</p>
        `;
        blogCard.addEventListener('click', () => {
            // Redirect to the blog page and pass the blog data as a query parameter
            window.location.href = `blog.html?title=${encodeURIComponent(blog.title)}&author=${encodeURIComponent(blog.author)}&content=${encodeURIComponent(blog.content)}`;
        });
        blogList.appendChild(blogCard);
        
    });
}

// Display existing blogs on page load
displayExistingBlogs();







// Function to retrieve blog data from query parameters and display it


function displayBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const author = urlParams.get('author');
    const content = urlParams.get('content');

    const blogPost = document.createElement('div');
    blogPost.innerHTML = `
        <h2>${title}</h2>
        <p><strong>By ${author}</strong></p>
        <p>${content}</p>
    `;
    blogPage.appendChild(blogPost);
}
displayBlogPost();

// Display blog post on the blog page
//displayBlogPost();
// Function to display existing blogs from LocalStorage
// Function to display blog post on the blog page

