const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];


//add posts
for (let i = 0; i < posts.length; i++) {

    // destructuring posts
    const {id, content, media, author: {name}, author: {image}, likes, created} = posts[i];

    addPost(id, content, media, name, image, likes, created);

}

//add like click event
const btnLike = document.querySelectorAll('.js-like-button');

for (let i = 0; i < btnLike.length; i++) {

    btnLike[i].addEventListener('click', function(event){
        event.preventDefault();
        
        // call onLike function
        onLike(this, i);

    });

}




// ***** functions


// create post structure
function addPost(id, content, media, name, image, likes, created) {

    //convert date to dd/mm/yyyy
    const convertedDate = convertDate(created);


    const postContainer = document.getElementById('container');
    
    if (image == null) {

        postContainer.innerHTML += `
        <div class="post">

            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon profile-pic-default">
                        <span>${name.match(/\b(\w)/g).join('')}</span>
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${name}</div>
                        <div class="post-meta__time">${convertedDate}</div>
                    </div>                    
                </div>
            </div>

            <div class="post__text">${content}</div>

            <div class="post__image">
                <img src="${media}" alt="${media}">
            </div>

            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>

        </div>
        `;

    } else {

        postContainer.innerHTML += `
        <div class="post">

            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${image}" alt="${image}">
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${name}</div>
                        <div class="post-meta__time">${convertedDate}</div>
                    </div>                    
                </div>
            </div>

            <div class="post__text">${content}</div>

            <div class="post__image">
                <img src="${media}" alt="${media}">
            </div>

            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>

        </div>
        `;

    }
}


// increase/decrease like number

function onLike (btnLike, index) {

    if (btnLike.classList.contains('like-button--liked')) {

        posts[index].likes -= 1;
        btnLike.classList.remove("like-button--liked");

    } else {

        posts[index].likes += 1;
        btnLike.classList.add("like-button--liked");

    }

    document.getElementById(`like-counter-${posts[index].id}`).innerHTML = posts[index].likes;

}



// function convert date to dd/mm/yyyy
function convertDate(d) {
    
    const createdDate = new Date(d);

    const dd = String(createdDate.getDate()).padStart(2, '0');
    const mm = String(createdDate.getMonth() + 1).padStart(2, '0');
    const yyyy = createdDate.getFullYear();

    return dd + '/' + mm + '/' + yyyy;

}