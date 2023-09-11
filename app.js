const access_key = 'BGExYydxtbh9Be7d10nzV5NT1Va6dJ9UIwwNwY6Ix2I';
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const search_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30&query=`;

const gallery = document.querySelector('.gallery');
const searchInput = document.getElementById('search-input');
let currentImage = 0;

let allImages;

const getImages = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allImages = data;
            makeImages(allImages);
        });
}

const makeImages = (data) => {
    gallery.innerHTML = ''; // Limpa a galeria antes de adicionar as novas imagens

    data.forEach((item, index) => {
        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'gallery-img';
        gallery.appendChild(img);

        //popup image
        img.addEventListener('click', () => {
            currentImage = index;
            showPopup(item);
        })
    });
}

const searchImages = () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        const searchUrl = search_photo_url + searchTerm;
        getImages(searchUrl);
        searchInput.value = ''; // Limpa o campo de pesquisa
    } else {
        alert('Digite algo para pesquisar.'); // Exibe mensagem de erro se o campo estiver vazio
    }
}

const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        searchImages();
    }
}

searchInput.addEventListener('keydown', handleKeyPress);

const showPopup = (item) => {
    let popup = document.querySelector('.image-popup');
    const downloadBtn = document.querySelector('.download-btn');
    const closeBtn = document.querySelector('.close-btn');
    const image = document.querySelector('.popup-image');

    popup.classList.remove('hide');
    downloadBtn.href = item.links.html;
    image.src = item.urls.regular;

    closeBtn.addEventListener('click', () => {
        popup.classList.add('hide');
    })
}

getImages(random_photo_url);

const preBtns = document.querySelector('.pre-btn');
const nxtBtns = document.querySelector('.nxt-btn');

preBtns.addEventListener('click', () => {
    if (currentImage > 0) {
        currentImage--;
        showPopup(allImages[currentImage]);
    }
})

nxtBtns.addEventListener('click', () => {
    if (currentImage < allImages.length - 1) {
        currentImage++;
        showPopup(allImages[currentImage]);
    }
})