var currentPageURL = window.location.href;

function createBreadcrumbMarkup() {
  var breadcrumbList = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": []
  };

  var urlParts = currentPageURL.split('/');

  var currentURL = '';

  for (var i = 1; i < urlParts.length; i++) {
    currentURL += '/' + urlParts[i];
    var breadcrumbItem = {
      "@type": "ListItem",
      "position": i,
      "name": urlParts[i],
      "item": "https://toolninja.github.io" + currentURL
    };
    breadcrumbList.itemListElement.push(breadcrumbItem);
  }

  
  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(breadcrumbList);

  document.head.appendChild(script);
}

createBreadcrumbMarkup();
