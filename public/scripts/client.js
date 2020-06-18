
//  let tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

 function createTweetElement(tweet) {
  // use variables to refactor code!
  let $tweet = `<article>
  <div class="tweet-header">
      <img src="${tweet.user.avatars}">
      <h4>${tweet.user.handle}</h4>
  </div>
  <div class="tweet-body">
    <h5>${tweet.content.text}</h5>
  </div>
  <div class="tweet-footer">
      <h6>${tweet.created_at}</h6>
    <div class="tweet-icons">
      <button class="flag">🏴</button>
      <button class="retweet">🔁</button>
      <button class="like">🖤</button>
    </div>
  </div>
  </article>`
  
  return $tweet;
  }

const renderTweets = function(tweets) {
  
  for (const tweet of tweets) {
    let $tweetElement = createTweetElement(tweet);
    $('#tweets-container').prepend($tweetElement);
  }
}




$(document).ready(function () {
  $('#new-tweet').on('submit', function(event) {

    event.preventDefault();

    const data = $(this).serialize()
    const $tweetLength = $('#tweet-text').val().length;
    const onlySpaces = $('#tweet-text').val().replace(/ /g,'')
    // or const $tweetLength = data.split('=')[1].length

    if ($tweetLength <= 0 || $tweetLength > 140 || onlySpaces === '') {
      alert('Please post an acceptable tweet length')
    } else {
    $.post('/tweets',data)
    .then(function(data) {
      console.log("received >>", data);
      loadtweets()
    })}
  });

  const loadtweets = () => {
    $.getJSON('/tweets')
      .then(function(data) {
        console.log('data received >>', data);

        $('#tweets-container').empty()

        renderTweets(data);
      })
  }
  
  loadtweets()
});