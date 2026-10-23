/* Entries are loaded from posts.json, newest first. Text is rendered without HTML. */
(async function () {
  const container = document.getElementById("entries");
  function element(tag, text) { const node = document.createElement(tag); if (text) node.textContent = text; return node; }
  function localMedia(value) {
    if (typeof value !== "string" || !value.startsWith("/journal/media/")) return null;
    const url = new URL(value, window.location.origin);
    return url.origin === window.location.origin && url.pathname.startsWith("/journal/media/") ? url.href : null;
  }
  try {
    const response = await fetch("/journal/posts.json");
    if (!response.ok) throw new Error("Could not load journal");
    const posts = await response.json();
    if (!Array.isArray(posts)) throw new Error("Invalid journal");
    const entries = posts.filter(p => p && typeof p.title === "string" && /^\d{4}-\d{2}-\d{2}$/.test(p.date) && localMedia(p.video));
    entries.sort((a, b) => b.date.localeCompare(a.date));
    if (!entries.length) return;
    container.replaceChildren();
    entries.forEach(post => {
      const article = element("article"); article.className = "journal-entry";
      const topic = element("p", post.topic || "Everyday life"); topic.className = "eyebrow"; article.append(topic);
      article.append(element("h2", post.title));
      const date = element("time", new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {year:"numeric", month:"long", day:"numeric"}));
      date.dateTime = post.date; article.append(date);
      if (post.description) article.append(element("p", post.description));
      const video = element("video"); video.controls = true; video.preload = "metadata"; video.playsInline = true;
      video.setAttribute("aria-label", post.title);
      if (localMedia(post.poster)) video.poster = localMedia(post.poster);
      video.src = localMedia(post.video);
      if (localMedia(post.captions)) { const track = element("track"); track.kind = "captions"; track.src = localMedia(post.captions); track.srclang = "en"; track.label = "English"; track.default = true; video.append(track); }
      video.append(element("p", "Your browser cannot play this video.")); article.append(video);
      const link = element("a", "Open video"); link.href = localMedia(post.video); article.append(link);
      if (post.transcript) { const details = element("details"); details.append(element("summary", "Read the transcript")); const text = element("p", post.transcript); text.className = "transcript"; details.append(text); article.append(details); }
      container.append(article);
    });
  } catch (_) {
    container.replaceChildren(element("p", "The journal couldn’t load right now. Please try again shortly."));
  }
})();