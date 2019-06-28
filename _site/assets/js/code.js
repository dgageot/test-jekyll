class BaseHTMLElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    render() {
        return '';
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `<style>${this.constructor.styles}</style>${this.render()}`;
    }

    $(selector) {
        return this.shadowRoot.querySelector(selector);
    }

    $$(selector) {
        return this.shadowRoot.querySelectorAll(selector);
    }
}

class CodeSamples extends BaseHTMLElement {
    static get styles() {
        return `
        :host {
            display: block !important;
            outline: 1px solid #ebebeb;
            padding-bottom: 10px;
        }

        ::slotted(figure.highlight) {
            display: none;
        }

        ::slotted(.visible) {
            display: block !important;
        }

        ul.links {
            display: inline-block;
            padding: 0;
            margin: 0;
            outline: 1px solid #ebebeb;
            width: 100%;
            height: 48px;
        }

        ul.links li {
            display: inline-block;
            padding: 0 15px;
            margin: 0;
            height: 47px;
            line-height: 48px;
        }

        ul.links li a {
            text-decoration: none;
            text-transform: uppercase;
            font-family: helvetica;
            color: #757575;
        }

        ul.links li.active {
            border-bottom: 1px solid #1a73e8;
        }

        ul.links li.active a {
            color: #1a73e8;
        }
            `;
    }

    render() {
        return `<slot></slot>`;
    }

    showSnippets(language) {
        for (var snippet of this.$('slot').assignedElements()) {
            if (snippet.querySelector('code').attributes['data-lang'].value == language) {
                snippet.classList.add('visible');
            } else {
                snippet.classList.remove('visible');
            }
        }

        console.log(this.$$('ul'));

        this.$$('ul.links li').forEach((a) => {
            if (a.id == 'switch-'+language) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();

        window.addEventListener('language', (e) => {
            this.showSnippets(e.detail.language);
        });

        this.$('slot').addEventListener('slotchange', (e) => {
            let languages = [];
            let snippets = {};
            for (var snippet of e.target.assignedElements()) {
                let code = snippet.querySelector('code');
                let language = code.attributes['data-lang'].value;
                
                languages.push(language);
                snippets[language] = snippet;
            }

            // Create links
            let links = document.createElement('ul');
            links.classList.add('links');
            for (var language of languages.reverse()) {
                let l = language;

                let link = document.createElement('li');
                link.id = `switch-${l}`;
                link.innerHTML = `<a href="#">${l}</a>`;

                link.querySelector('a').addEventListener('click', () => {
                    window.dispatchEvent(new CustomEvent('language', {
                        detail: {
                            language: l
                        }
                    }));
                })

                links.append(link);
            }

            this.shadowRoot.prepend(links);
            this.showSnippets(languages[0]);
        });
    }
}

customElements.define('code-samples', CodeSamples);
