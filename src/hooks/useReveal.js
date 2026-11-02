import { useEffect } from "react";

const revealSelector = [
  ".section",
  ".hero__copy",
  ".hero__visual",
  ".specialty",
  ".process-card",
  ".plan-card",
  "blockquote",
  ".faq-item",
  ".contact__mark",
  ".stat-card",
  ".principle-card",
].join(", ");

export function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const elements = document.querySelectorAll(revealSelector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}
