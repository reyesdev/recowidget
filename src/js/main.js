
var recoWidget = {
  init: function () {
    recoWidget.widget();
  },

  widget: function () {
    // answer array []
    var answerCodeArray = [];
    var qArray = ["q0","q1","q2","q3"];
    var answerCode;

    // click start button
    $("section.start .js-btn-start").click(function () {

      $(".start").css("display", "none");
      $(".q0").css("display", "block");

      // go to next
      console.log("next page");

    });

    displayNext = function (i) {
      var oldID = i;
      var newID = 0;

      if (i < qArray.length) {

        newID = ++i;
        $(".q" + oldID + "").css("display", "none");
        $(".q" + newID + "").css("display", "block");

        console.log("i=" + i + " and qarray=" + qArray.length);
        console.log("display next: q" + newID + " prev: q" + oldID );
      }

      if (i == 4) {

        $(".outcome").css("display", "block");

      //merge array to form code
      answerCode = answerCodeArray.join("");
      var outcome;
        switch (answerCode) {
          case "0000":
            outcome = "Bronze Package";
            break;
          case "1000":
            outcome = "Bronze or Silver Package";
            break;
          case "0001":
            outcome = "Bronze + Gold Package";
            break;
          case "1001":
            outcome = "Bronze or Silver + Gold Package ";
            break;
          case "0100":
          case "0110":
          case "1100":
            outcome = "Silver Package";
            break;
          case "0101":
          case "0011":
          case "1101":
            outcome = "Silver + Gold Package";
            break;
          case "0010":
          case "1010":
          case "1110":
            outcome = "Platinum Package";
            break;
          case "0111":
          case "1011":
          case "1111":
            outcome = "Platinum + Gold Package";
            break;
          default:
            console.log(+ answerCode + "Does not exist . Just make it Bronze");
        }

        $(".outcome").append("<p>"+ outcome +"</p>");

        //reset array
        answerCodeArray = [];
      }

    }

    clickYes = function (i) {
      $("section.q"+i+" .js-btn-yes").click(function () {
        // go to next question

        answerCodeArray.push(1);
        displayNext(i);
        console.log(answerCodeArray);
      });
    };

    clickNo = function (i) {
      // click yes or no button
      $("section.q"+i+" .js-btn-no").click(function () {
        // go to next question

        answerCodeArray.push(0);
       displayNext(i);
        console.log(answerCodeArray);
      });
    };


    for (var i = 0; i < qArray.length; i++) {
      // click yes or no button
      clickYes(parseInt([i]));

      clickNo(parseInt([i]));

    }
  }


};

window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
        recoWidget.init();
},false);


