let likedCats = window.localStorage.getItem("cats").split(',');

likedCats.map(cardInfo => createCard(cardInfo, likeCard))
    .forEach(card => catsList.append(card));
