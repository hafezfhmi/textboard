$(document).ready(function () {
  //SETUP VARIABLES for input
  let count = 0;

  //display the input text with unique id
  function inputCount() {
    let x = "";
    for (let i = 0; i < 25; i++) {
      x += `<input id="input-text${count}" maxlength="1" type="text" name="input" id="input" /> `;
      count++;
    }
    return x;
  }

  //setup unique row for text input
  for (var i = 0; i < 5; i++) {
    $(`#container-input${i}`).html(inputCount());
  }

  //SETUP VARIABLES for random letter
  let letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let time = 0;
  var randomInterval;
  var inputIterations = [];

  $(".button-start").click(function () {
    $(".button-start").attr("disabled", "true");

    for (let i = 0; i <= 124; i++) {
      inputSetupOnce(i);
    }

    randomInterval = setInterval(randomNumber, 100);
  });

  function inputSetupOnce(i) {
    let randomEnd;
    let noValStart = 3;
    let valStart = 6;
    let bothValEnd = 10;
    if ($(`#input-text${i}`).val() === "" || $(`#input-text${i}`).val() == undefined) {
      randomEnd = Math.floor(Math.random() * (bothValEnd - noValStart + 1)) + noValStart;
      randomEnd = parseInt(randomEnd.toString() + "000");
      inputIterations.push({ iterations: i, value: "", end: randomEnd });
    } else {
      let val = $(`#input-text${i}`).val();
      randomEnd = Math.floor(Math.random() * (bothValEnd - valStart + 1)) + valStart;
      randomEnd = parseInt(randomEnd.toString() + "000");
      inputIterations.push({ iterations: i, value: val, end: randomEnd });
    }
  }

  function randomNumber() {
    time += 100;
    console.log(time);

    new Audio("sound.wav").play();

    for (let i = 0; i <= 124; i++) {
      if (time < inputIterations[i].end) {
        let x = Math.floor(Math.random() * letter.length);
        $(`#input-text${i}`).val(letter[x]);
      }

      if (time == inputIterations[i].end) {
        // console.log(inputIterations[i].end);
        $(`#input-text${i}`).val(inputIterations[i].value);
      }
    }

    if (time % 10000 == 0) {
      // console.log(inputIterations);
      time = 0;
      inputIterations = [];
      $(".button-start").removeAttr("disabled");
      clearInterval(randomInterval);
    }
  }
});
