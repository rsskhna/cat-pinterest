const cardTemplate = document.querySelector('#card-template').content;

const catsList = document.querySelector('.cats__list');

function createCard(url, likeFunc, deleteFunc) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardLike = card.querySelector('.card__like');

    cardImage.src = url;

    card.addEventListener('mouseover', function (evt) {
        cardLike.classList.add('card__like_visible');
        if (isEventTargetLike(evt)) {
            cardLike.classList.add('card__like_hovered');
        }
    })
    card.addEventListener('mouseout', function (evt) {
        cardLike.classList.remove('card__like_visible');
        cardLike.classList.remove('card__like_hovered');
    })
    card.addEventListener('click', function (evt) {
        if (isEventTargetLike(evt)) {
            likeFunc(cardLike, url);
        }
    })

    return card;
}

function isEventTargetLike(event) {
    return event.target.classList.contains('card__like')
}

function likeCard(likeButton, imageUrl) {
    if (likeButton.classList.contains('card__like_clicked')) {
        likeButton.classList.remove('card__like_clicked');

        let likedCats = window.localStorage.getItem("cats").split(',');
        let indexOfImage = likedCats.indexOf(imageUrl, 0);

        likedCats.splice(indexOfImage, 1);
        window.localStorage.setItem("cats", likedCats.toString());
    } else {
        likeButton.classList.add('card__like_clicked');

        let likedCats = window.localStorage.getItem("cats").split(',');

        likedCats.push(imageUrl);
        window.localStorage.setItem("cats", likedCats.toString());
    }
}








