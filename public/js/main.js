'use strict'
$(document).ready(function() {
  /* Menu button options */
  const menuButton = document.querySelector('.header__button-menu');
  const menuBar = document.querySelector('.section__menu');
  menuButton.addEventListener('click', function() {
    menuBar.classList.toggle('section__menu-disable');
    setTimeout(function() {
      // if (menuBar.hidden === false) { menuBar.hidden = true; }
      // else { menuBar.hidden = false; }
      if (menuBar.style.display !== 'none') {
        menuBar.style.display = 'none';
      } else {
        menuBar.style.display = 'block';
      }
    }, 200);
  });
  /* ----------------------------------------------------------------- */

  /* Mobile transforming */
  const leftBlock = document.querySelector('.section__leftBlock');
  const centerBlock = document.querySelector('.section__centerBlock');
  const rightBlock = document.querySelector('.section__rightBlock');
  const menuBtn = document.querySelector('.header__button');
  const copyright = document.querySelector('.footer__text');
  const row1 = document.querySelector('.section__row1');
  const row2 = document.createElement('div');
  row2.classList.add('row', 'section__row2'); // <div class="row"/> in which blocks will be wrapped in;

  window.addEventListener('resize', function() { // window size watching for developing
    let winWidth = this.innerWidth;
    menuBarTransform(winWidth);
  });

  function menuBarTransform(width) { // function of mobile transform
    if (width < 1025) {
      row1.append(row2);
      row2.append(leftBlock);
      row2.append(centerBlock);
      row2.append(rightBlock);
      menuBar.classList.add('col-12');
      menuBar.classList.remove('col-3');
      leftBlock.classList.add('col-3');
      rightBlock.classList.add('col-9');
      if (width < 769) {
        leftBlock.style.display = 'none';
        rightBlock.classList.remove('col-9');
        rightBlock.classList.add('col-12');
        if (width < 611) {
          menuBtn.classList.remove('col-3');
          menuBtn.classList.add('col-2');
          if (width < 433) {
            copyright.classList.remove('col');
            copyright.classList.add('col-3');
          } else {
            copyright.classList.remove('col-3');
            copyright.classList.add('col');
          }
        } else {
          menuBtn.classList.remove('col-2');
          menuBtn.classList.add('col-3');
        }
      } else {
        leftBlock.style.display = 'block';
        rightBlock.classList.remove('col-12');
        rightBlock.classList.add('col-9');
      }
    } else {
      if (row2) {
        row1.append(leftBlock);
        row1.append(centerBlock);
        row1.append(rightBlock);
        row2.remove();
        menuBar.classList.remove('col-12');
        menuBar.classList.add('col-3');
        leftBlock.classList.remove('col-3');
        rightBlock.classList.remove('col-9');
      }
    }
  }
  menuBarTransform(window.innerWidth);
  /* ------------------------------------------------------- end of mobile transforming */


  const menuLinks = document.querySelectorAll('.section__nav-link');
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].id = i;
  }

  /* Get the JSON-data */
  const url = '../data/app-data.json';
  fetch(url).then(response => response.json()).then((data) => {
    console.log(data);

    /* Function of load the content */
    function getContent(leftContent, centerContent, rightContent) {
      leftBlock.innerHTML = '';
      centerBlock.innerHTML = '';
      rightBlock.innerHTML = '';

      const centerBlockText = document.createElement('p');
      centerBlockText.append(centerContent);
      
      let leftFragment = new DocumentFragment();
      for (let leftItem = 0; leftItem < leftContent.length; leftItem++) {
        const leftBlockItem = document.createElement('div');
        leftBlockItem.classList.add('section__leftBlock-text');
        leftBlockItem.innerHTML = `<p><span></span>${leftContent[leftItem]}</p>`;
        if (leftItem % 2 === 0) {
          leftBlockItem.classList.add('section__leftBlock-color');
        }
        leftFragment.append(leftBlockItem);
      }
      
      let rightFragment = new DocumentFragment();
      for (let rightItem = 0; rightItem < rightContent.length; rightItem++) {
        const rightBlockItem = document.createElement('div');
        rightBlockItem.classList.add('section__rightBlock-text');
        rightBlockItem.innerHTML = `<p>${rightContent[rightItem]}</p>`;
        if (rightItem % 2 === 0) {
          rightBlockItem.classList.add('section__rightBlock-color');
        }
        rightFragment.append(rightBlockItem);
      }
      
      leftBlock.append(leftFragment);
      centerBlock.append(centerBlockText);
      rightBlock.append(rightFragment);
    } // end of function
    getContent(data[0].titles, data[0].text, data[0].cards);
    /* ------------------------------------------------------------- */

    /* Load the content when click on the menu link */
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        let id = +link.id;
        getContent(data[id].titles, data[id].text, data[id].cards);
      });
    });
    /* ---------------------------------------------------- */

  }); // end of Fetch
  /*------------------- */


});