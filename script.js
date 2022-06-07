
/*Answer staff*/
function chooseOption(event) {

  let label = "wrong"; //default
  let hintLabel = "Wrong!"; //default

  const choice = event.currentTarget;
  const questionId = choice.parentNode.dataset.questionId;
  const choiceGrid = choice.parentNode;
  const choiceId = choice.dataset.choiceId;
  const correctChoiceId = RESULTS_MAP[questionId].correct;


  if (correctChoiceId == choiceId) {
    label = "correct";
    hintLabel = "Correct!";
  }

  choice.classList.add(label);

/*Answer staff decided to put Right or Wrong*/

  let correctAnswerText = "";

  for (let i = availableOptions.length - 1; i >= 0; i--) {
    let option = availableOptions[i];

    if (option.parentNode.dataset.questionId == questionId) {
      if (option.dataset.choiceId == correctChoiceId) {
        option.classList.add("correct");
      }

      option.classList.add("finished");
      option.removeEventListener('click', chooseOption);
      const deleteIndex = availableOptions.indexOf(option);
      availableOptions.splice(deleteIndex, 1);
    }
  }

  addHint(choiceGrid, questionId, label, hintLabel, correctAnswerText);
}


const options = document.querySelectorAll('.choice-grid div');
const availableOptions = [];
for (const option of options) {
  option.addEventListener('click', chooseOption);
  availableOptions.push(option);
}


/*Hints staff*/
function addHint(choiceGrid, questionId, label, hintLabel, correctAnswerText)
{
  const hint = document.createElement('section');
  hint.classList.add("hints");

  const hintHeader = document.createElement('div'); //add label
  hintHeader.classList.add(label);
  hintHeader.textContent = hintLabel;
  hint.appendChild(hintHeader);

  const correctAnswer = document.createElement('b'); //add correct answer
  correctAnswer.textContent = correctAnswerText;
  hint.appendChild(correctAnswer);

  const hintText = document.createElement('p'); //add explanation
  hintText.textContent = RESULTS_MAP[questionId].hint;
  hint.appendChild(hintText);

  hint.classList.add(label);
  choiceGrid.parentNode.insertBefore(hint, choiceGrid.nextSibling);
}
