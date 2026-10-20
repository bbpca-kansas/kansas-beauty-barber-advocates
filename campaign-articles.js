(() => {
  const gallery = document.querySelector("#campaign-article-grid");
  if (!(gallery instanceof HTMLElement) || !Array.isArray(window.campaignArticles)) {
    throw new Error("Campaign article data or gallery container is missing.");
  }

  const fragment = document.createDocumentFragment();

  for (const article of window.campaignArticles) {
    const card = document.createElement("article");
    card.className = "article-card";

    if (article.image) {
      const image = document.createElement("img");
      image.src = article.image;
      image.alt = `Campaign image for: ${article.title}`;
      image.loading = "lazy";
      card.append(image);
    } else {
      card.classList.add("article-card--text");
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
      if (article.html) {
        // Trusted, site-authored markup that keeps the article's original formatting.
        body.classList.add("article-rich");
        body.innerHTML = article.html;
      } else {
        for (const paragraph of article.paragraphs) {
          const text = document.createElement("p");
          text.textContent = paragraph;
          body.append(text);
        }
      }
      details.append(body);
      content.append(details);
    }
    card.append(content);
    fragment.append(card);
  }

  gallery.replaceChildren(fragment);
  const PAGE_SIZE = 9;
  const cards = Array.from(gallery.children);

  gallery.replaceChildren(...cards);
  gallery.className = "article-grid";

  if (cards.length > PAGE_SIZE) {
    let shown = PAGE_SIZE;
    const more = document.createElement("div");
    more.className = "article-more";

    const status = document.createElement("p");
    status.setAttribute("role", "status");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button button-dark";

    const update = () => {
      cards.forEach((card, i) => { card.hidden = i >= shown; });
      const remaining = cards.length - shown;
      status.textContent = `Showing ${Math.min(shown, cards.length)} of ${cards.length} articles`;
      button.textContent = `Show ${Math.max(0, Math.min(PAGE_SIZE, remaining))} more`;
      more.hidden = false;
      button.hidden = remaining <= 0;
    };

    button.addEventListener("click", () => {
      shown += PAGE_SIZE;
      update();
    });

    more.append(status, button);
    gallery.after(more);
    update();
  }
})();
