$(document).ready(function() {
  
  const $text = $('#tweet-text');
  const $counter = $('.counter')

  $text.on('input', function() {
    $counter.val(140 - $text.val().length)
    
    $counter.val() <= 0 ? $counter.css('color', 'red') : $counter.css('color',"black");
   
  })
});