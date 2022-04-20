import {playTest} from './_next-que';

function modal() {  
  const openBtn = document.querySelector('.choose');
  const quizWrapper = document.querySelector('.quiz');
  const closeBtn = document.querySelector('.close-icon');
  
  function openModal() {
    openBtn.addEventListener('click', ()=> {
      quizWrapper.classList.remove('is-hidden');
      console.log('open');
      playTest();
    })
  }

  function closeModal() {
    closeBtn.addEventListener('click', ()=> {
      quizWrapper.classList.add('is-hidden');
      console.log('close');  
    })
  }

  openModal();
  closeModal();  
}

export default modal;