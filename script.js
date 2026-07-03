/* ---------- GALLERY ----------
   Project cards now live directly in index.html as static markup, so
   album / design / video-editing links can be edited straight in the
   HTML without touching this file. This script only handles
   filtering, navigation and other UI behaviour below. ---------- */
const gallery = document.getElementById("gallery");

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