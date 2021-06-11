$(document).ready(function () {
  //read this for input improvement
  // https://www.google.com/search?q=html+otp+input&source=lmns&bih=667&biw=1366&hl=en&sa=X&ved=2ahUKEwiT-Nu47ozxAhWj6HMBHef7C18Q_AUoAHoECAEQAA

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
  let letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=,./'\"";
  letter = letter.split("");
  let color = ["white", "red", "orange", "yellow", "green", "lightblue", "purple"];
  letter.push(...color);
  console.log(letter);
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
        let y = letter[x];
        if (color.indexOf(y) != -1) {
          $(`#input-text${i}`).val("");
          $(`#input-text${i}`).css("background-color", y);
        } else {
          $(`#input-text${i}`).css("background-color", "#242424");
          $(`#input-text${i}`).val(y);
        }
      }

      if (time == inputIterations[i].end) {
        // console.log(inputIterations[i].end);
        $(`#input-text${i}`).css("background-color", "#242424");
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
