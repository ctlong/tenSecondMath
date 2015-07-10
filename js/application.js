$(document).ready(function() {
  var secondsLeft = 10;
  var solution = 0;
  var solved = 0;
  var operators = [];
  var timer;

  var getOperators = function() {
    var array = [];
    if ($('#inlineCheckbox1:checkbox:checked').length > 0) {
      array.push('+');
    }
    if ($('#inlineCheckbox2:checkbox:checked').length > 0) {
      array.push("-");
    }
    if ($('#inlineCheckbox3:checkbox:checked').length > 0) {
      array.push("x");
    }
    if ($('#inlineCheckbox4:checkbox:checked').length > 0) {
      array.push("/");
    }
    if ($('#inlineCheckbox5:checkbox:checked').length > 0) {
      array.push("sqrd");
    }
    if ($('#inlineCheckbox6:checkbox:checked').length > 0) {
      array.push("sqrt");
    }
    operators = array;
  };

  var getQuestion = function () {
    var rand = $('.form-control').val();
    var x = Math.round(Math.random()*rand);
    var y = Math.round(Math.random()*rand);
    getOperators();
    if(operators.length == 0) {
      solution = x;
      $('#question').text(x);
    }
    var opVal = Math.round(Math.random()*(operators.length-1));
    var opp = operators[opVal];
    if (opp == "+") {
      solution = x+y;
      $('#question').text(x+" + "+y);
    }
    if (opp == "-") {
      solution = x-y;
      $('#question').text(x+" - "+y);
    }
    if (opp == "x") {
      solution = x*y;
      $('#question').text(x+" x "+y);
    }
    if (opp == "/") {
      solution = x/y;
      $('#question').text(x+" / "+y);
    }
    if (opp == "sqrd") {
      solution = Math.pow(x,y);
      $('#question').text(x+" ^ "+y);
    }
    if (opp == "sqrt") {
      solution = Math.sqrt(x);
      $('#question').text("sqrt of "+x);
    }
  };

  $(document).on('focusout','.form-control',function() {
    getQuestion();
  });

  $(document).on('click','.checkbox-inline input',function() {
    getQuestion();
  });

  $(document).on('keyup','#input-answer',function() {
    var answer = $('#input-answer').val();
    if(answer == solution) {
      timer = setInterval(function() {
        $('#countdown').text(secondsLeft+' seconds left');
        if (secondsLeft > 0) {
          answer = $('#input-answer').val();
          if(answer == solution) {
          correct();
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
      },1000);
    }
  });

  var correct = function() {
    $("#bitcoin").show().css({left:'0px',top:'0px'});
      $("#bitcoin").animate({left: '500px',top: '400px'},300,function() {
      $('#bitcoin').css('display', 'none');
    });
  };

  $(document).on('click','#reset',function() {
    clearInterval(timer);
    getQuestion();
    solved = 0;
    secondsLeft = 10;
    $('#input-answer').val('');
    $('#countdown').text(secondsLeft+' seconds left');
  });

  getQuestion();
});