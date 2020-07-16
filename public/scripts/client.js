let tweetForm = false; // used to control the hide and show of the tweet form when clicking create tweet

function convertMS(milliseconds) { // converts milliseconds to actual time
  const date = new Date(milliseconds);

  return date.toString();
}

function createTweetElement(tweet) { //the tweet container for every tweet whether new or from json
  const source = tweet.user;

  let $tweet = `<article>
  <div class="tweet-header">
    <div id="left-side-tweet">
      <img src="${source.avatars}">
      <h4>${source.name}</h4>
    </div>
      <h4>${source.handle}</h4>
  </div>
  <div class="tweet-body">
    <h5>${escape(tweet.content.text)}</h5>
  </div>
  <div class="tweet-footer">
      <h6>${convertMS(tweet.created_at)}</h6>
    <div class="tweet-icons">
      <button class="flag">🏴</button>
      <button class="retweet">🔁</button>
      <button class="like">🖤</button>
    </div>
  </div>
  </article>`;
  
  return $tweet;
}
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) { // loops through the tweets and calls the create tweet function
  
  for (const tweet of tweets) {
    let $tweetElement = createTweetElement(tweet);
    $('#tweets-container').prepend($tweetElement);
  }
};

$(document).ready(function() {

  $('#new-tweet').on('submit', function(event) { // trims white space, validates the input length and shows errors
    event.preventDefault();

    const data = $(this).serialize();
    const $tweetLength = $('#tweet-text').val().length;
    const onlySpaces = $('#tweet-text').val().replace(/ /g,'');

    if ($tweetLength <= 0 || $tweetLength > 140 || onlySpaces === '') {
      $('#error').slideDown('fast').delay(3000).slideUp('slow');
    } else {
      $.post('/tweets',data)
        .then(function(data) {
          console.log("received >>", data);
          loadtweets();
          $('#tweet-text').val('');
          $('#tweet-text').focus();
          $('.counter').val(140);
        });
    }
  });

  const loadtweets = () => {
    $.getJSON('/tweets')
      .then(function(data) {
        $('#tweets-container').empty();
        renderTweets(data);
      });
  };

  $("#add-tweet").click(function() { //uses tweetForm variable to hide or show the tweet form
    if (!tweetForm) {
      tweetForm = true;
      $("#show-form").slideDown("fast");
      $('#tweet-text').focus();
    } else {
      tweetForm = false;
      $("#show-form").slideUp("fast");
    }
  });
  
  loadtweets();
});