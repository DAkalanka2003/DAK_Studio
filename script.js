/* ---------- PROJECT DATA (swap "img" / add "links" freely) ---------- */
const IMG = "https://portfolio-dinujayaakalanka.vercel.app/Images/";
const projects = [
  {
    title: "Iruni &amp; Mayura — Pre-Shoot", client: "DAK Studio", cat: "photography",
    img: IMG + "PreShoot.webp", links: [{ l: "View →", u: "https://web.facebook.com/share/p/18hkZT5eST/" }]
  },
  {
    title: "AI Physical Course — Awards Ceremony", client: "DAK Studio", cat: "photography",
    img: IMG + "Certificate.webp", links: [{ l: "View →", u: "https://web.facebook.com/permalink.php?story_fbid=pfbid02oZLK8zjT6U2LqXde6Y6RDntGNZGiHsBtG68veV8o8CmZzg4YDnvuf1CeMTSm4dvKl&id=61569035450454" }]
  },
  {
    title: "පැදුර 2025 — Official Cover", client: "DAK Studio", cat: "photography",
    img: IMG + "Padura.webp", links: [{ l: "View →", u: "https://web.facebook.com/share/p/18d5hsAHdS/" }]
  },
  {
    title: "Graduation Photography", client: "DAK Studio", cat: "photography",
    img: IMG + "Graduation.webp", links: [{ l: "View →", u: "https://web.facebook.com/share/p/1BBQ8wfXVM/" }]
  },
  {
    title: "කැලණි කන්දේ — මධුර යාමය", client: "DAK Studio", cat: "photography",
    img: IMG + "Madurayamaya.webp", links: [{ l: "View →", u: "https://web.facebook.com/permalink.php?story_fbid=pfbid0FYSEDVWjJFATYYTjW2t1AzERapm17hggEWjLZDvkCxGTddpTeBo71t7CzUAu4G5gl&id=61569035450454" }]
  },
  {
    title: "Transcendencia '25 — Chemistry Competition", client: "DAK Studio", cat: "photography",
    img: IMG + "AC.webp", links: [
      { l: "Album 01 →", u: "https://web.facebook.com/share/p/1Fms1vafB2/" },
      { l: "Album 02 →", u: "https://web.facebook.com/share/p/18ijJrJZrx/" },
      { l: "Album 03 →", u: "https://web.facebook.com/share/p/1LJXnuQGN7/" },
      { l: "Album 04 →", u: "https://web.facebook.com/share/p/1BBDEcGRpP/" }]
  },

  {
    title: "Client Brand Designs", client: "Design · Client Work", cat: "design",
    img: IMG + "Design.jpg", links: [{ l: "View DAK Studio →", u: "https://www.facebook.com/share/1Cx6QHZSmv/" }]
  },

  {
    title: "DAK Studio — Website Design System", client: "UI/UX · Figma", cat: "uiux",
    img: null, links: []
  },

  {
    title: "Sipyathra Project — Documentary", client: "MSS — UoK", cat: "video",
    img: IMG + "Sipyathra2.webp", links: [{ l: "Watch →", u: "https://web.facebook.com/share/v/195sKAxhvK/" }]
  },
  {
    title: "Sipyathra Project — Donation Film", client: "MSS — UoK", cat: "video",
    img: IMG + "Sipyathra.webp", links: [{ l: "Watch →", u: "https://web.facebook.com/share/v/18nppioT8B/" }]
  },
  {
    title: "Padura Official Week Video", client: "Science Students' Union — UoK", cat: "video",
    img: IMG + "Padura3.webp", links: [{ l: "Watch →", u: "https://web.facebook.com/share/v/14icv3TnMX1/" }]
  },
];

const catLabel = { photography: "Photography", university: "University", design: "Design", uiux: "UI / UX", video: "Video" };
const gallery = document.getElementById("gallery");
gallery.innerHTML = projects.map((p, i) => {
  const frame = String(i + 1).padStart(2, "0");
  const media = p.img
    ? `<div class="media"><img src="${p.img}" alt="${p.title.replace(/&amp;/g, '&')}" loading="lazy" onerror="this.parentElement.innerHTML='&lt;div class=\\'ph\\'&gt;&lt;span&gt;DAK&lt;/span&gt;&lt;/div&gt;'"/></div>`
    : `<div class="ph"><span>DAK</span></div>`;
  const links = p.links.map(k => `<a href="${k.u}" target="_blank" rel="noopener">${k.l}</a>`).join("");
  return `<article class="card" data-cat="${p.cat}">${media}
    <span class="frame">${frame}</span><span class="cat-badge">${catLabel[p.cat]}</span>
    <div class="overlay"><div class="client">${p.client}</div><h4>${p.title}</h4>
    <div class="links">${links}</div></div></article>`;
}).join("");

/* ---------- FILTERING ---------- */
function applyFilter(f) {
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b.dataset.filter === f));
  document.querySelectorAll(".card").forEach(c => c.classList.toggle("hide", !(f === "all" || c.dataset.cat === f)));
}
document.getElementById("filters").addEventListener("click", e => {
  const b = e.target.closest(".filter"); if (b) applyFilter(b.dataset.filter);
});
document.querySelectorAll(".nav-dd-menu a").forEach(a => a.addEventListener("click", () => {
  applyFilter(a.dataset.filter);
  document.getElementById("work").scrollIntoView({ behavior: "smooth" });
}));

/* ---------- NAV state + scroll-spy (nav + tabbar) ---------- */
const nav = document.getElementById("nav");
const spyItems = [...document.querySelectorAll("[data-spy]")];
const spyIds = ["hero", "services", "work", "process", "contact"];
const sections = spyIds.map(id => document.getElementById(id));
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40), { passive: true });
const spy = new IntersectionObserver(es => {
  es.forEach(en => {
    if (en.isIntersecting) {
      spyItems.forEach(l => l.classList.toggle("active", l.dataset.spy === en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => s && spy.observe(s));

/* ---------- MOBILE MENU ---------- */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => { burger.classList.toggle("open"); navLinks.classList.toggle("open"); });
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  burger.classList.remove("open"); navLinks.classList.remove("open");
}));

/* ---------- REVEAL ON SCROLL ---------- */
const rev = new IntersectionObserver(es => {
  es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); rev.unobserve(en.target); } });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => rev.observe(el));