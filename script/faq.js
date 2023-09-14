function generateJsonLd() {
    const detailsElements = document.querySelectorAll('.containerfaq');

    const faqData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': []
    };

    detailsElements.forEach((details) => {
        const question = details.querySelector('.customfaq').textContent;
        const answer = details.querySelector('p').textContent;

        const questionObject = {
            '@type': 'Question',
            'name': question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': answer
            }
        };

        faqData.mainEntity.push(questionObject);
    });

    const jsonLdCode = JSON.stringify(faqData, null, 2);
    document.getElementById('jsonLdCode').textContent = jsonLdCode;
}

generateJsonLd();

document.getElementById('addFaqButton').addEventListener('click', function () {
    const faqContainer = document.getElementById('faqContainer');
    const newFaq = document.createElement('div');
    newFaq.classList.add('containerfaq');
    newFaq.innerHTML = `
        <div class="customfaq" contenteditable="true" onclick="clearPlaceholder(this)">Write Your Question Here..</div>
        <div class="faqans">
            <p contenteditable="true" onclick="clearPlaceholder(this)">Write The Answer Here..</p>
        </div>
    `;
    faqContainer.appendChild(newFaq);
});

function clearPlaceholder(element) {
    if (element.textContent.includes('Write Your Question Here..') || element.textContent.includes('Write The Answer Here..')) {
        element.textContent = element.textContent.replace('Write Your Question Here..', '').replace('Write The Answer Here..', '');
    }
}

document.getElementById('generateJsonLdButton').addEventListener('click', function () {
    generateJsonLd();
});
document.getElementById('generateHtmlCodeButton').addEventListener('click', function () {
const faqContainerClone = document.getElementById('faqContainer').cloneNode(true);

const containerfaqElements = faqContainerClone.querySelectorAll('.containerfaq');
containerfaqElements.forEach((containerfaq) => {
const details = document.createElement('details');
details.classList.add('containerfaq');

const summary = document.createElement('summary');
summary.classList.add('customfaq');
summary.textContent = containerfaq.querySelector('.customfaq').textContent;

const divFaqans = document.createElement('div');
divFaqans.classList.add('faqans');

const p = document.createElement('p');
p.textContent = containerfaq.querySelector('.faqans p').textContent;

divFaqans.appendChild(p);
details.appendChild(summary);
details.appendChild(divFaqans);

containerfaq.replaceWith(details);
});

const textAreas = faqContainerClone.querySelectorAll('[contenteditable="true"]');
textAreas.forEach((area) => {
area.removeAttribute('contenteditable');
});

const htmlCode = faqContainerClone.outerHTML;
document.getElementById('jsonLdCode').textContent = htmlCode;
});

document.getElementById('removeLastFaqButton').addEventListener('click', function () {
const faqContainer = document.getElementById('faqContainer');
const faqItems = faqContainer.querySelectorAll('.containerfaq');

if (faqItems.length > 0) {
    faqContainer.removeChild(faqItems[faqItems.length - 1]);
}
});
