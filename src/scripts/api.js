const API_KEY = 'live_GCrk46BXgaWv6Hm2tSLn2hmQNyWRJQFlR6rduv3zv6rNAynjlSvU9imJ6tlNVDXo';
const URL = 'https://api.thecatapi.com/v1/images/search?limit=15'

const getCardsApi = () => {
    return fetch(URL, {
        method: 'GET',
        headers: {
            'x-api-key': API_KEY,
        }
    })
        .then(res => getResponseData(res))
}

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

function logError(error) {
    return console.log(`Ошибка.....: ${error}`);
}

function checkPosition() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                return getCardsApi()
                    .then(cards => {
                        cards.map(cardInfo => createCard(cardInfo.url, likeCard))
                            .forEach(card => catsList.append(card));
                    })
                    .catch(err => logError(err));
            }
        });
    });
    observer.observe(document.querySelector('.cats__item:last-of-type'));
}

getCardsApi()
    .then(cards => {
        cards.map(cardInfo => createCard(cardInfo.url, likeCard))
            .forEach(card => catsList.append(card));
    })
    .catch(err => logError(err));

window.addEventListener('scroll', checkPosition);

