/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
};

function cover(array) {
  array.forEach(function(card) {
    card.classList.remove("show", "match", "open", "wrong")
  });
};

function emptyStar(star) {
  star.classList.remove("fa-star");
  star.classList.add("fa-star-o");
};

function countMoves() {
  if (count === 2) {
    moves += 1;
    count = 0;
    $('.moves').text(moves);
  };
  if (moves > 16) {
    rate = 0;
    stars.forEach(function(star) {
      emptyStar(star.lastChild);
    });
  } else if (moves > 13) {
    rate = 1;
    emptyStar(stars[1].lastChild);
    emptyStar(stars[2].lastChild);
  } else if (moves > 10) {
    rate = 2;
    emptyStar(stars[2].lastChild);
  };
};

function show(card) {
  if (!(card.hasClass('open show')) && !(card.hasClass('match'))) {
    card.addClass('open show');
    count += 1;
    countMoves();
  };
};

function wrong(array) {
  array.forEach(function(card) {
    card.classList.remove("open");
    card.classList.add("wrong");
  });
  $('.card').unbind('click');
  setTimeout(function() {
    cover(array);
    play($('.card'));
  }, 700);
};

function begin(deck, cards) {
  cover(cards);
  cards = shuffle(cards);
  deck.empty();
  cards.forEach(function(card) {
    deck.prepend(card);
  });
  count = 0;
  moves = 0;
  matched = 0;
  $('.moves').text("0");
  stars.forEach(function(star) {
    star.lastChild.classList.remove("fa-star-o");
    star.lastChild.classList.add("fa-star");
  $('.modal-container').css('display', 'none');
  });
  startTime();
};

function restart(button, deck, cards) {
  button.click(function() {
    clearTimeout(t);
    $('.timer').text("00:00:00");
    seconds = 0; minutes = 0; hours = 0;
    begin(deck, cards);
    play($('.card'));
  });
};

function matchCards(array) {
  array.forEach(function(card) {
    card.classList.add("match")
    matched += 1;
  });
};

function checkTheCards(array) {
  if (array[0].children[0].className === array[1].children[0].className) {
    cover(array);
    matchCards(array);
    win(cards);
  } else {
    wrong(array);
  };
};

function play(elem) {
  elem.click(function() {
    show($(this));
    var openCards = Array.from($('.open'));
    if (openCards.length === 2) {
      checkTheCards(openCards);
    };
  });
};

function win(cards) {
  if (matched === 16) {
    clearTimeout(t);
    $('.time').text(time + ".");
    $('.rating').text(rate);
    $('.modal-container').css('display', 'block');
  };
};

function timer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    };
  };
  time = (hours ? (hours > 9 ? hours : "0" + hours): "00") + ":" +
          (minutes ? (minutes > 9 ? minutes : "0" + minutes): "00") + ":" +
          (seconds > 9 ? seconds : "0" + seconds);
  $('.timer').text(time);
  startTime();
};

function startTime() {
  t = setTimeout(timer, 1000);
};

var deck = $('.deck');
var cards = Array.from(deck.children());
var count = 0;
var moves = 0;
var stars = Array.from($('.stars').children());
var matched = 0;
var seconds = 0, minutes = 0, hours = 0, time = "00.00.00"
var rate = 3;
begin(deck, cards);
restart($('.restart'), deck, cards);
restart($('.button'), deck, cards);
play($('.card'));





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
