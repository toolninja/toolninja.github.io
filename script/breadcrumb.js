var breadcrumbMapping = {
  "https://toolninja.github.io/": "Home",
  "https://toolninja.github.io/blog.html": "Blog",
  "https://toolninja.github.io/faq-schema-generator.html": "FAQ Schema Generator",
  "https://toolninja.github.io/html-table-generator.html": "HTML Table Generator",
  "https://toolninja.github.io/about.html": "About",
  "https://toolninja.github.io/faq-schema-generator-user-guide.html": "FAQ Schema Generator User Guide",
  "https://toolninja.github.io/html-table-generator-user-guide.html": "HTML Table Generator User Guide"
};

var currentPageUrl = window.location.href;

var breadcrumbItems = [];

for (var url in breadcrumbMapping) {
  if (currentPageUrl.indexOf(url) === 0) {
    breadcrumbItems.push({ name: breadcrumbMapping[url], url: url });
  }
}

if (breadcrumbItems.length > 0) {
  var breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map(function (item, index) {
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      };
    })
  };

  var script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(breadcrumbSchema);

  // Add the breadcrumb schema markup to the page's <head> section
  document.head.appendChild(script);
} else {
  console.error("No matching breadcrumb items found for the current page URL.");
}
