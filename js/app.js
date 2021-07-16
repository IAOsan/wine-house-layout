/* eslint-disable no-param-reassign */
const navigation = {
   buttons: document.querySelectorAll('.navigation__btn'),
   pageSections: Array.from(document.querySelectorAll('.section-wrapper')),
   sectionsIndexes: document.querySelectorAll('.section-wrapper').length - 1,
   currntCount: 0,
   paginationContainer: document.querySelector('.navigation__pagination-page'),
   paginationIndicators: Array.from(
      document.querySelectorAll('.navigation__pagination-circle')
   ),
   menuIcon: document.querySelector('.navbar__icon-box'),
   navbar: document.querySelector('.navbar'),
   check: function (deltaY, className) {
      // check type scroll
      this.currntCount =
         deltaY > 0 ? this.currntCount - 1 : this.currntCount + 1;

      // check count section
      if (this.currntCount < 0) {
         this.currntCount = this.sectionsIndexes;
         // add class to all sections except the current section
         this.pageSections.forEach((section, index) => {
            if (index === this.sectionsIndexes) return;
            section.classList.add(`${className}`);
         });
      }
      if (this.currntCount > this.sectionsIndexes) {
         this.pageSections.forEach(section => {
            section.classList.remove(`${className}`);
         });
         this.currntCount = 0;
      }
   },
   pagination: function () {
      this.paginationContainer.textContent = `${this.currntCount + 1} / ${
         this.pageSections.length
      }`;

      this.paginationIndicators.forEach((element, index) => {
         if (index === this.currntCount) {
            element.classList.add('navigation__pagination-circle--change');
         } else {
            element.classList.remove('navigation__pagination-circle--change');
         }
      });
   },
   scroll: function (e) {
      const { deltaY } = e;
      // check function
      this.check(deltaY, 'section-wrapper--change');
      // check if sections exist
      if (this.pageSections[this.currntCount]) {
         this.pageSections[this.currntCount].classList.remove(
            'section-wrapper--change'
         );
      }
      if (this.pageSections[this.currntCount - 1]) {
         this.pageSections[this.currntCount - 1].classList.add(
            'section-wrapper--change'
         );
      }
      this.pagination();
   },
   toggleMenu: function () {
      this.menuIcon.addEventListener('click', () => {
         this.navbar.classList.toggle('navbar--change');
      });
   },
};
const sectionGrapes = {
   container: document.querySelector('.grapes'),
   img: document.querySelector('.grapes__img'),
   animation: function () {
      this.img.addEventListener('mouseover', () => {
         this.container.classList.add('grapes--change');
      });
      this.img.addEventListener('mouseout', () => {
         this.container.classList.remove('grapes--change');
      });
   },
};
/* -------------------------------------------------------------------------- */
/*                                  LISTENERS                                 */
/* -------------------------------------------------------------------------- */
navigation.toggleMenu();
sectionGrapes.animation();
window.addEventListener('wheel', e => {
   navigation.scroll(e);
});
window.addEventListener('click', e => {
   if (e.target.classList.contains('navigation__btn')) {
      const property = { deltaY: 0 };
      if (e.target.classList.contains('navigation__btn--left')) {
         property.deltaY = 26;
      } else if (e.target.classList.contains('navigation__btn--right')) {
         property.deltaY = -26;
      }
      navigation.scroll(property);
   }
});
