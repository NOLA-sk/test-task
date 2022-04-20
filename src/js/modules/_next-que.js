function nextQuestion() {
  const modalBlock = document.querySelector('.content-wrapper');
  const nextButton = document.querySelector('.next-button');
  const prevButton = document.querySelector('.prev-button');
  const sendButton = document.querySelector('.send-button');
  const questionsTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('.form-answers');

  const questions = [
    {
      question: 'Какие достопримечательности Вас интересуют больше всего?',
      answers: [
        {
          id: 'waterfall',
          title: 'Водопады'
        },
        {
          id: 'lake',
          title: 'Горные озера'
        },
        {
          id: 'mountain',
          title: 'Панорамные смотровые на Эльбрус'
        },
        {
          id: 'monument',
          title: 'Исторические памятники'
        },
        {
          id: 'temple',
          title: 'Храмы и места Силы'
        },
        {
          id: 'all',
          title: 'Интересно все'
        }
      ],
      type: 'checkbox',
      image: '../img/images/question-1.jpg'
    },
    {
      question: 'Сколько человек будет с Вами?',
      answers: [
        {
          id: 'me',
          title: 'Только Я'
        },
        {
          id: 'me-plus-one',
          title: 'Я + 1'
        },
        {
          id: 'me-plus-2',
          title: 'Я + 2'
        },
        {
          id: 'me-plus-3',
          title: 'Я + 3'
        },
        {
          id: 'group-up-to-10',
          title: 'У нас группа до 10 человек'
        },
        {
          id: 'group-more-10',
          title: 'У нас группа свыше 10 человек'
        }
      ],
      type: 'radio',
      image: '../img/images/question-2.jpg'
    }
  ];

  const openBtn = document.querySelector('.choose');
  const quizWrapper = document.querySelector('.quiz');
  const closeBtn = document.querySelector('.close-icon');
    
  openBtn.addEventListener('click', ()=> {
    quizWrapper.classList.remove('is-hidden');
    console.log('open');
    playTest();
  })
    
  closeBtn.addEventListener('click', ()=> {
    quizWrapper.classList.add('is-hidden');
    console.log('close');  
  })

  const playTest = ()=> {
    const finalAnswers = [];
    let numberQuestion = 0;

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
          const answerItem = document.createElement('div');

          answerItem.classList.add('form__item');

          answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="is-hidden" value="${answer.title}">
          <label for="${answer.title}">
            <span>"${answer.title}"</span>
          </label>
          `;
          formAnswers.appendChild(answerItem);
      })
    }

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = '';

      switch (true) {
        case (numberQuestion >= 0 && numberQuestion <= questions.length-1):
          questionsTitle.textContent=`${questions[indexQuestion].question}`;
          renderAnswers (indexQuestion);

          nextButton.classList.remove('is-hidden');
          prevButton.classList.remove('is-hidden');
          sendButton.classList.add('is-hidden');
          break;
        case (numberQuestion === 0):
          prevButton.classList.add('is-hidden');
          break;
        case (numberQuestion === questions.length):
          nextButton.classList.add('is-hidden');
          prevButton.classList.add('is-hidden');
          sendButton.classList.remove('is-hidden');
          questionsTitle.classList.add('is-hidden');
          formAnswers.innerHTML = `
            <div class="form-group">
                <label for="numberPhone">Введите номер телефона</label>
                <input type="phone" class="form-control" id="numberPhone">
            </div>
          `;
          break;
        default:
          formAnswers.textContent = 'Мы с вами свяжемся!';
          questionsTitle.classList.add('is-hidden');
          setTimeout(() => {
              modalBlock.classList.remove('is-hidden');
          }, 2000);
      }
    }
    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};
      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id == 'numberPhone');
  
      inputs.forEach((input, index) => {
          if (numberQuestion >=0 && numberQuestion <= questions.length-1) {
              obj[`${index}_${questions[numberQuestion].question}`] = input.value;
          }
  
          if (numberQuestion === questions.length) {
              obj[`Номер телефона`] = input.value;
          }
      })
  
      finalAnswers.push(obj);
      console.log(finalAnswers);
    }
  
    nextButton.addEventListener('click', ()=> {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log('next');
    });
    prevButton.addEventListener('click', ()=> {    
      numberQuestion--;
      renderQuestions(numberQuestion);
      console.log('prev');
    });
  
    sendButton.addEventListener('click', () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log(finalAnswers);
    });
  };
}

export default nextQuestion;