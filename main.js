'use strict';


// 스크롤을 내렸을 때 navbar를 투명하게 만듦
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  // console.log(window.scrollY);
  // console.log(`navbar: ${navbarHeight}`);
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// 메뉴를 클릭했을 때 해당 메뉴로 스크롤
// event.target -> 현재 이벤트가 발생한 요소를 반환
const navbarMenu = document.querySelector('.navbar__menu'); // div.navbar__menu
// console.log(navbarMenu);
navbarMenu.addEventListener('click', (event) => {
  const target = event.target; //li 중 이벤트가 발생한 li 요소를 target 변수에 저장
  // console.log(target);
  const link = target.dataset.link; // li 요소의 link 속성을 link 변수에 저장
  // console.log(link);
  if(link == undefined) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// navbar 메뉴 버튼 틀릭시 나타내기
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});


// Contact me 버튼을 눌렀을 때 해당 메뉴로 스크롤
const contactMenu = document.querySelector('.home__container .home__contact'); 
// console.log(contactMenu);
contactMenu.addEventListener('click', () => {
  scrollIntoView('#contact');
});


// 스크롤을 내렸을 때 Home 화면 투명화
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 스크롤하면 화살표 버튼 보이기
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight/2) {
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

// 화살표 버튼 클릭하면 맨 위로 이동
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// 버튼을 클릭했을 때 필터링
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

console.log(workBtnContainer);
console.log(projectContainer);
console.log(projects);

workBtnContainer.addEventListener('click', (e) => {
  // button이 아니라 span이 클릭이 됐을 때 span의 부모노드(버튼)의 데이터셋의 btn 속성을 filter에 저장
  const filter = e.target.dataset.btn || e.target.parentNode.dataset.btn;
  if(filter == null) {
    return;
  }

  // 이전에 선택된 버튼 제거
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  console.log(target);
  e.target.classList.add('selected');

  projectContainer.classList.add('animation-out');
  // 8개의 a태그 즉, 8개의 프로젝트를 반복을 통해서 project라는 리스트 type으로 저장
  projects.forEach((project) => {
    // console.log(project.dataset.type);
    // button 태그의 btn 속성과 a 태그의 type 속성을 비교해서 같으면 class에 visible 삭제
    if(filter === 'all' || filter === project.dataset.type) {
      project.classList.remove('invisible');
    } else {
      project.classList.add('invisible');

    }
  });

  // animation-out이 계속 남아 있으면 css에서 opacity가 0이어서 보이지 않는다.
  // 따라서 일정시간이 지나면 animation-out을 제거해야 한다.
  setTimeout(() => {
    projectContainer.classList.remove('animation-out');
  }, 300);


});




function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
}


