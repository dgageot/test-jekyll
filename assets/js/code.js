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

        ::slotted(*) {
            display: none;
        }

        ::slotted(.visible) {
            display: block !important;
        }

        #links {
            display: inline-block;
            padding: 0;
            margin: 0;
            outline: 1px solid #ebebeb;
            width: 100%;
            height: 48px;
        }

        #links li {
            display: inline-block;
            padding: 0 15px;
            margin: 0;
            height: 47px;
            line-height: 48px;
        }

        #links li a {
            text-decoration: none;
            text-transform: uppercase;
            font-family: helvetica;
            color: #757575;
        }

        #links li.active {
            border-bottom: 1px solid #1a73e8;
        }

        #links li.active a {
            color: #1a73e8;
        }
            `;
    }

    render() {
        return `<ul id="links"></ul><slot></slot>`;
    }

    showSnippets(language) {
        for (var snippet of this.$('slot').assignedElements()) {
            if (snippet.attributes['language'].value == language) {
                snippet.classList.add('visible');
            } else {
                snippet.classList.remove('visible');
            }
        }

        this.$$('#links li').forEach((a) => {
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
            let languages = e.target.assignedElements().map((child) => child.attributes['language'].value);

            let links = this.$('#links');
            while (links.firstChild) {
                links.removeChild(links.firstChild);
            }
            for (var language of languages) {
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

            if (languages.length > 0) {
                this.showSnippets(languages[0]);
            }
        });
    }
}

customElements.define('code-samples', CodeSamples);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.samples').forEach((el) => {
        var newEl = document.createElement('code-samples');
        newEl.innerHTML = el.innerHTML;
        el.parentNode.replaceChild(newEl, el);
    });
});


