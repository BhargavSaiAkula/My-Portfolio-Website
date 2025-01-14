
(function() {
    "use strict";
  
    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }
  
    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);
  
    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  
    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    }
  
    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
  
    });
  
    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  
    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');
  
    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  
    /**
     * Animation on scroll function and init
     */
    function aosInit() {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
    window.addEventListener('load', aosInit);
  
    /**
     * Initiate glightbox
     */
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  
    /**
     * Init swiper sliders
     */
    function initSwiper() {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );
  
        if (swiperElement.classList.contains("swiper-tab")) {
          initSwiperWithCustomPagination(swiperElement, config);
        } else {
          new Swiper(swiperElement, config);
        }
      });
    }
  
    window.addEventListener("load", initSwiper);
  
    /**
     * Initiate Pure Counter
     */
    new PureCounter();
  
    /**
     * Frequently Asked Questions Toggle
     */
    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        faqItem.parentNode.classList.toggle('faq-active');
      });
    });
  
    /**
     * Correct scrolling position upon page load for URLs containing hash links.
     */
    window.addEventListener('load', function(e) {
      if (window.location.hash) {
        if (document.querySelector(window.location.hash)) {
          setTimeout(() => {
            let section = document.querySelector(window.location.hash);
            let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    });
  
    /**
     * Navmenu Scrollspy
     */
    let navmenulinks = document.querySelectorAll('.navmenu a');
  
    function navmenuScrollspy() {
      navmenulinks.forEach(navmenulink => {
        if (!navmenulink.hash) return;
        let section = document.querySelector(navmenulink.hash);
        if (!section) return;
        let position = window.scrollY + 200;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
          navmenulink.classList.add('active');
        } else {
          navmenulink.classList.remove('active');
        }
      })
    }
    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);
  
  })();
  document.addEventListener("DOMContentLoaded", () => {
    const tabsContainer = document.getElementById("project-tabs");
    const tabContent = document.getElementById("tab-content");
  
    // Group projects by website field
    const groupedProjects = projects.reduce((groups, project) => {
        const key = project.wibsite;
        if (!groups[key]) groups[key] = [];
        groups[key].push(project);
        return groups;
    }, {});
  
    // Add "All" tab with all projects
    const allTab = document.createElement("li");
    allTab.className = "nav-item";
    allTab.innerHTML = `
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#All" id="all-tab">
            All
        </button>`;
    tabsContainer.appendChild(allTab);
  
    const allTabPane = document.createElement("div");
    allTabPane.className = "tab-pane fade show active";
    allTabPane.id = "All";
  
    const allRow = document.createElement("div");
    allRow.className = "row g-4";
  
    projects.forEach(project => {
        const col = createProjectCard(project);
        allRow.appendChild(col);
    });
  
    allTabPane.appendChild(allRow);
    tabContent.appendChild(allTabPane);
  
    // Add individual tabs and content
    for (const [category, items] of Object.entries(groupedProjects)) {
        // Create tab
        const tab = document.createElement("li");
        tab.className = "nav-item";
        tab.innerHTML = `
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#${category}">
                ${category}
            </button>`;
        tabsContainer.appendChild(tab);
  
        // Create tab pane
        const tabPane = document.createElement("div");
        tabPane.className = "tab-pane fade";
        tabPane.id = category;
  
        const row = document.createElement("div");
        row.className = "row g-4";
  
        items.forEach(project => {
            const col = createProjectCard(project);
            row.appendChild(col);
        });
  
        tabPane.appendChild(row);
        tabContent.appendChild(tabPane);
    }
  
    // Add click event listeners for tabs
    tabsContainer.querySelectorAll(".nav-link").forEach(tab => {
        tab.addEventListener("click", function () {
            tabsContainer.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
            this.classList.add("active");
        });
    });
  });
  
  // Helper function to create project cards
  function createProjectCard(project) {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
        <div class="card project-card shadow-lg border-0 rounded-lg overflow-hidden">
            <img src="${project.preview}" class="card-img-top img-fluid" alt="${project.name}" style="object-fit: cover; height: 200px;">
            <div class="card-body">
                <h5 class="card-title font-weight-bold">${project.name}</h5>
                
                <!-- Flex container for text and button -->
                <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text text-muted mb-0">${project.wibsite}</p>
                    <a href="${project.view}" target="_blank" class="btn btn-primary px-4 py-2 font-weight-bold">View Website</a>
                </div>
            </div>
        </div>`;
    col.querySelector('.card').addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease-in-out';
    });
    
    col.querySelector('.card').addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
  
    return col;
  }