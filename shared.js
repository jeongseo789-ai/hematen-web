/* shared.js – nav & footer injection + scroll reveal */
(function () {

  /* shared.js v2 – 80px nav + scroll reveal */
  var NAV_ITEMS = [
    { id: 'overview', label: '사업안내', href: 'overview.html' },
    { id: 'location', label: '입지환경', href: 'location.html' },
    { id: 'complex',  label: '단지안내', href: 'complex.html'  },
    { id: 'units',    label: '세대안내', href: 'units.html'    },
    { id: 'contact',  label: '고객센터', href: 'contact.html'  },
  ];

  function injectNav(active) {
    var items = NAV_ITEMS.map(function (it) {
      return '<li><a href="' + it.href + '" class="nav-link' + (active === it.id ? ' on' : '') + '">' + it.label + '</a></li>';
    }).join('');

    document.write(
      '<nav class="nav" id="nav">' +
        '<div class="nav-inner">' +
          '<a href="index.html" class="nav-logo">' +
            '<span class="nav-logo-ko">남성역 헤머튼</span>' +
            '<span class="nav-logo-en">HEMATEN</span>' +
          '</a>' +
          '<ul class="nav-menu" id="navMenu">' + items + '</ul>' +
          '<a href="tel:0255885840" class="nav-tel">02-588-5840</a>' +
          '<button class="nav-toggle" id="navToggle" aria-label="메뉴">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</nav>'
    );

    document.addEventListener('DOMContentLoaded', function () {
      initNav();
      initScrollReveal();
    });
  }

  function initNav() {
    var nav    = document.getElementById('nav');
    var toggle = document.getElementById('navToggle');
    var menu   = document.getElementById('navMenu');

    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    /* close menu on link click (mobile) */
    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
      });
    });
  }

  function initScrollReveal() {
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  function injectFooter() {
    document.write(
      '<footer class="footer">' +
        '<div class="container">' +
          '<div class="footer-top">' +
            '<div>' +
              '<div class="footer-logo-ko">남성역 헤머튼</div>' +
              '<div class="footer-logo-en">HEMATEN</div>' +
            '</div>' +
            '<div class="footer-links">' +
              NAV_ITEMS.map(function (it) {
                return '<a href="' + it.href + '">' + it.label + '</a>';
              }).join('') +
            '</div>' +
            '<div>' +
              '<div class="footer-tel-label">대표전화</div>' +
              '<a href="tel:0255885840" class="footer-tel">02-588-5840</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-legal">' +
            '본 광고는 「주택법」 제11조의5에 의거한 지역주택조합의 조합원 모집을 위한 광고입니다.<br>' +
            '사업주체: 동작남성역 지역주택조합 추진위원회 &nbsp;·&nbsp; 업무대행: ㈜동명디앤씨 &nbsp;·&nbsp; 자금대리: 우리자산신탁<br>' +
            '홍보관: 서울특별시 동작구 사당로16길 27, 2층 &nbsp;·&nbsp; ☎ 02-588-5840<br><br>' +
            '※ 본 내용은 인허가 진행 상황에 따라 변경될 수 있습니다. 정확한 사항은 방문 또는 전화 상담을 통해 확인하시기 바랍니다.<br>' +
            '© 2025 동작남성역 지역주택조합 추진위원회. All rights reserved.' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  window.injectNav    = injectNav;
  window.injectFooter = injectFooter;

}());
