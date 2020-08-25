console.log('It works...');
const cards = [
    {
        id: 1,
        position: 0,
        img: 'src/img/1.png'
    },
    {
        id: 2,
        position: 0,
        img: 'src/img/4.png'
    },
    {
        id: 3,
        position: 0,
        img: 'src/img/7.png'
    },
    {
        id: 4,
        position: 0,
        img: 'src/img/10.png'
    },
    {
        id: 5,
        position: 0,
        img: 'src/img/13.png'
    },
    {
        id: 6,
        position: 0,
        img: 'src/img/16.png'
    },
    {
        id: 7,
        position: 0,
        img: 'src/img/19.png'
    },
    {
        id: 8,
        position: 0,
        img: 'src/img/21.png'
    }
];

let score = 0;
let couple = new Array();
const cardsDistribution = new Array(); 


document.addEventListener('DOMContentLoaded',(event) => {
    let mainContainer = document.querySelector('#board');
    let tmpCards = new Array();
    cards.forEach(card => {
        card.position = Math.random();
        tmpCards.push(card);
        let card2 = Object.assign({}, card);
        card2.position = Math.random();
        tmpCards.push(card2);
    });

    tmpCards.sort((a,b) => {
        return a.position - b.position;
    });

    cardsDistribution.push(...tmpCards);
    console.log(cardsDistribution);

    for (var i = 0; i < 16; i++) {
        let newElement = document.createElement('img');
        newElement.setAttribute('src','src/img/back.png');
        newElement.dataset.pos = i;
        newElement.addEventListener('click', flipCard);
        mainContainer.append(newElement);
    }
});


function flipCard(event) {
    let card = event.target;
    card.setAttribute('src', cardsDistribution[card.dataset.pos].img);
    couple.push(card);
    if(couple.length === 2){
        if(cardsDistribution[couple[0].dataset.pos].id === cardsDistribution[couple[1].dataset.pos].id){
            alert('Good ...');
            couple[0].setAttribute('src', '');
            couple[1].setAttribute('src', '');
            couple[0].removeEventListener('click', flipCard); 
            couple[1].removeEventListener('click', flipCard); 
        } else {
            alert('Sorry...');
            couple[0].setAttribute('src', 'src/img/back.png');
            couple[1].setAttribute('src', 'src/img/back.png');
        }
        couple = couple.splice(2,0); 
        score++;
        document.getElementById('score').innerHTML = score;
    }
}
