// ----------------------------------------------
// Imports
// ----------------------------------------------
import $ from 'jquery';
import salvattore from 'salvattore';

// ----------------------------------------------
// Infinite Scroll
// ----------------------------------------------
const InfiniteScrollVideos = (() => {
  let s;

  return {
    settings() {
      return {
        container: document.querySelector('.videos__container'),
        next: $('.videos__next'),
        class: 'js-videos-loading',
        currentPage: 1,
        pathname: window.location.pathname.replace(/#(.*)$/g, '').replace('//g', '/'),
        isLoading: false
      };
    },

    init() {
      s = this.settings();
      this.bindEvents();
    },

    bindEvents() {
      s.next.on('click', () => {
        s.next.addClass(s.class);
        this.fetchVideos();
      });
    },

    fetchVideos() {
      if (s.isLoading || s.currentPage === maxVideoPages) {
        return;
      }

      s.isLoading = true;
      s.currentPage++;

      const nextPage = `${s.pathname}videos/page/${s.currentPage}/`;

      $.ajax({
        url: nextPage,
        type: 'GET',
        success: response => {
          const parse = document.createRange().createContextualFragment(response);
          const videos = parse.querySelectorAll('.videos__post');

          if (videos.length) {
            setTimeout(() => {
              [].forEach.call(videos, post => {
                post.classList.add('fade-up');
                salvattore.appendElements(s.container, [post]);
              });

              s.next.removeClass(s.class);

              if (s.currentPage === maxVideoPages) {
                $('.videos__pagination').remove();
              }
            }, 750);
          }
        },
        error: error => {
          console.error(error);
        }
      });

      s.isLoading = false;
    }
  };
})();

// ----------------------------------------------
// Exports
// ----------------------------------------------
export default InfiniteScrollVideos;
