$(document).ready(function() {
  var secondsLeft = 10;
  var solution = 0;
  var solved = 0;
  getQuestion();

  function getQuestion() {
    var rand = $('.form-control').val();
    var x = Math.round(Math.random()*rand);
    var y = Math.round(Math.random()*rand);
    solution = x+y;
    $('#question').text(x+" + "+y);
  }

  $(document).on('focusout','.form-control',function() {
    getQuestion();
  });

  $(document).on('focusin','#input-answer',function() {
    var answer = $('#input-answer').value;
    var timer = setInterval(function() {
      console.log($('.form-control').val());
      $('#countdown').text(secondsLeft+' seconds left');
      if (secondsLeft > 0) {
        answer = $('#input-answer').val();
        if(answer == solution) {
          getQuestion();
          solved ++;
          secondsLeft ++;
          $('#input-answer').val('');
        }
        secondsLeft --;
      }
      else {
        $('#question').text('Game over! you got '+solved+' correct!')
        clearInterval(timer);
      }
    },1000);;
  });

  $(document).on('click','#reset',function() {
    getQuestion();
    solved =0;
    secondsLeft = 10;
    $('#input-answer').val('');
    $('#countdown').text(secondsLeft+' seconds left');
  });
});