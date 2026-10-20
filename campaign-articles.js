(() => {
  const gallery = document.querySelector("#campaign-article-grid");
  if (!(gallery instanceof HTMLElement) || !Array.isArray(window.campaignArticles)) {
    throw new Error("Campaign article data or gallery container is missing.");
  }

  const cards = document.createDocumentFragment();

  for (const article of window.campaignArticles) {
    const card = document.createElement("article");
    card.className = "article-card";

    if (article.image) {
      const image = document.createElement("img");
      image.src = article.image;
      image.alt = `Campaign image for: ${article.title}`;
      image.loading = "lazy";
      card.append(image);
    }

    const content = document.createElement("div");
    content.className = "article-card-content";

    const meta = document.createElement("p");
    meta.className = "article-meta";
    meta.textContent = `Article ${article.post} · ${article.date}`;
    content.append(meta);

    const title = document.createElement("h3");
    title.textContent = article.title;
    content.append(title);

    const details = document.createElement("details");
    if (article.paragraphs.length) {
      const summary = document.createElement("summary");
      summary.textContent = "Read full article";
      details.append(summary);

      const body = document.createElement("div");
      body.className = "article-copy";
      for (const paragraph of article.paragraphs) {
        const text = document.createElement("p");
        text.textContent = paragraph;
        body.append(text);
      }
      details.append(body);
      content.append(details);
    }
    card.append(content);
    cards.append(card);
  }

  gallery.replaceChildren(cards);
  gallery.className = "article-grid";
})();
