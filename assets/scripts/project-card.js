class ProjectCard extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <link rel="stylesheet" href="assets/styles/project-card.css">

            <article>
                <div class="media">
                    <picture>
                        <!-- small screens can optionally use a smaller image -->
                        <source
                            class="source-small"
                            media="(max-width: 720px)"
                            type="image/webp">

                        <!-- default / larger screens -->
                        <source
                            class="source-main"
                            type="image/webp">
                            
                        <!-- fallback image -->
                        <img loading="lazy">
                    </picture>
                </div>

                <div class="content">
                    <h2></h2>
                    <p class="description"></p>
                    <a class="project-link"></a>
                </div>
            </article>
        `;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const title = this.getAttribute('data-title') || '';
        const link = this.getAttribute('data-link') || '';
        const img = this.getAttribute('data-img') || '';
        const imgSmall = this.getAttribute('data-img-small') || img;
        const alt =
            this.getAttribute('data-img-alt') ||
            title ||
            'Project image';
        const description = this.getAttribute('data-description') || '';

        const h2 = this.shadowRoot.querySelector('h2');
        const linkEl = this.shadowRoot.querySelector('.project-link');
        const imgEl = this.shadowRoot.querySelector('img');
        const mainSourceEl = this.shadowRoot.querySelector('.source-main');
        const smallSourceEl = this.shadowRoot.querySelector('.source-small');
        const descEl = this.shadowRoot.querySelector('.description');

        if (h2) 
            h2.textContent = title;
        if (descEl) 
            descEl.textContent = description;

        if (mainSourceEl && img) {
            mainSourceEl.srcset = img;
        }
        if (smallSourceEl && imgSmall) {
            smallSourceEl.srcset = imgSmall;
        }

        if (imgEl && img) {
            imgEl.src = img;
            imgEl.alt = alt;
        }

        if (link && link.trim() !== '') {
            linkEl.textContent = 'Learn more';
            linkEl.href = link;
            linkEl.style.display = 'inline-block';
        } else {
            linkEl.textContent = '';
            linkEl.removeAttribute('href');
            linkEl.style.display = 'none';
        }

    }
}

customElements.define('project-card', ProjectCard);