// import modal from "./modules/_modal";
// import nextQuestion from "./modules/_next-que";
// import {playTest} from './modules/_next-que';

document.addEventListener('DOMContentLoaded', () =>{  
  const modalBlock = document.querySelector('.quiz');
  const nextButton = document.querySelector('.next-button');
  const prevButton = document.querySelector('.prev-button');
  const sendButton = document.querySelector('.send-button');
  const questionsTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('.form-answers');
  const quizContent = document.querySelector('.quiz-content');
  const answerImage = document.querySelector('.answer-image');
  const formWrapper = document.querySelector('.form-wrapper');
  const formFooterText = document.querySelector('.form-footer__text');

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
      image: '../../dist/img/images/question-2.jpg'
    },
    {
      question: 'На сколько дней Вы планируете свой отдых?',
      answers: [
        {
          id: 'one',
          title: '1'
        },
        {
          id: 'two',
          title: '2'
        },
        {
          id: 'three',
          title: '3'
        },
        {
          id: 'four',
          title: '4'
        },
        {
          id: 'five',
          title: '5'
        },
        {
          id: 'up-to-five',
          title: 'Больше 5'
        }
      ],
      type: 'radio',
      image: '../../dist/img/images/question-3.jpg'
    },
    {
      question: 'Нужен трансфер из аэропорта?',
      answers: [
        {
          id: 'yes',
          title: 'Да'
        },
        {
          id: 'no',
          title: 'Нет'
        },
        {
          id: 'another-city',
          title: 'Забрать из другого города'
        }
      ],
      type: 'radio',
      image: '../../dist/img/images/question-4.jpg'
    },
    {
      question: 'В каком месяце планируете тур?',
      answers: [
        {
          id: 'february',
          title: 'Февраль'
        },
        {
          id: 'march',
          title: 'Март'
        },
        {
          id: 'april',
          title: 'Апрель'
        }
      ],
      type: 'radio',
      image: '../../dist/img/images/question-5.jpg'
    },
    {
      question: 'куда отправить результаты теста?',
      answers: [
        {
          id: 'whatsApp',
          title: 'WhatsApp (рекомендуем)'
        },
        {
          id: 'telegram',
          title: 'Telegram'
        },
        {
          id: 'call',
          title: 'Позвоните мне'
        }
      ],
      type: 'radio',
      image: '../../dist/img/images/phone-img.jpg'
    },
  ];

  const openBtn = document.querySelector('.choose');
  const quizWrapper = document.querySelector('.modal');
  const closeBtn = document.querySelector('.close-icon');
    
  openBtn.addEventListener('click', ()=> {
    quizWrapper.classList.remove('is-hidden');
    console.log('open');
    playTest();
  })
    
  closeBtn.addEventListener('click', ()=> {
    quizWrapper.classList.add('is-hidden');
    location.reload();
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
        <input type="${questions[index].type}" id="${answer.title}" name="answer" value="${answer.title}">
        <label for="${answer.title}">
          <span>${answer.title}</span>
        </label>
        `;
        formAnswers.appendChild(answerItem);        
      })
    };

    const renderImage = (indexQuestion) => {
      const img = document.createElement('div');
      img.innerHTML = `
        <img src="${questions[indexQuestion].image}" alt="${questions[indexQuestion].image}">
      `;
      answerImage.appendChild(img);
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = '';
      answerImage.innerHTML = '';

      switch (true) {
        case (numberQuestion >= 0 && numberQuestion < questions.length-1):
          questionsTitle.textContent=`${questions[indexQuestion].question}`;

          renderAnswers (indexQuestion); 
          renderImage (indexQuestion);

          nextButton.classList.remove('is-hidden');
          prevButton.classList.remove('is-hidden');
          sendButton.classList.add('is-hidden');
          break;
        case (numberQuestion === 0):
          prevButton.classList.add('is-hidden');
          break;
        case (numberQuestion === questions.length-1):
          nextButton.classList.add('is-hidden');
          prevButton.classList.add('is-hidden');
          sendButton.classList.remove('is-hidden'); 
          questionsTitle.textContent=`${questions[questions.length-1].question}`;
          
          renderAnswers (indexQuestion); 
          modalBlock.classList.add('last-question');
          formFooterText.classList.remove('is-hidden');

          const connectionForm = document.createElement('div');
          connectionForm.classList.add('connection');
          connectionForm.innerHTML = `
            <form name="connectionData" class="connection-data" id="lastQuestion">
              <label for="userName">Имя</label>
              <input type="text" name="userName" id="userName" placeholder="Ваше имя...">

              <label for="numberPhone">Телефон</label>
              <input type="phone" name="numberPhone" id="numberPhone" placeholder="+7 (">

              <label for="instagram">Инстаграм</label>
              <input type="phone" name="instagram" id="instagram" placeholder="Введите ваш инстаграм...">              
            </form>
          `;
          quizContent.appendChild(connectionForm);
          break;
        default:
          formAnswers.textContent = 'Мы с вами свяжемся!';
          questionsTitle.classList.add('is-hidden');
      }
    };
    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};
      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id == 'lastQuestion');
  
      inputs.forEach((input, index) => {
          if (numberQuestion >=0 && numberQuestion <= questions.length-1) {
            obj[`${index}_${questions[numberQuestion].question}`] = input.value;
          }
  
          if (numberQuestion === questions.length-1) {
            let connerctionForm = document.forms.connectionData;
            console.log(connerctionForm);

            const userName = document.querySelector('#userName');
            const numberPhone = document.querySelector('#numberPhone');
            const instagram = document.querySelector('#instagram');

            const formData = {
              name: userName.value,
              phone: numberPhone.value,
              insta: instagram.value
            };

            obj[`Данные для связи`] = formData;
          }
      })
  
      finalAnswers.push(obj);
      console.log(finalAnswers);
    };

    nextButton.onclick = () =>{
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log('next');
    };
    prevButton.onclick = () => {    
      numberQuestion--;
      renderQuestions(numberQuestion);
      console.log('prev');
    }; 
    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log(finalAnswers);
    };    
  };
  
});