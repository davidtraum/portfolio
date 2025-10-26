<template>
  <article
    class="project-card"
    :class="{ 'project-card--highlight': project.highlight }"
    :style="{ '--stagger-delay': `${index * 80}ms` }"
  >
    <div class="project-card__media">
      <img
        :src="project.screenshot"
        class="project-card__image"
        :alt="`Screenshot von ${project.title}`"
        loading="lazy"
      />
      <span v-if="project.period" class="project-card__badge">{{ project.period }}</span>
    </div>

    <div class="project-card__content">
      <h3 class="project-card__title">{{ project.title }}</h3>
      <p class="project-card__description">
        {{ project.description }}
      </p>

      <ul v-if="project.tags?.length" class="project-card__tags">
        <li v-for="tag in project.tags" :key="tag" class="project-card__tag">#{{ tag }}</li>
      </ul>

      <div v-if="project.links?.length" class="project-card__links">
        <a
          v-for="link in project.links"
          :key="link.url"
          class="project-card__link"
          :href="link.url"
          target="_blank"
          rel="noopener"
        >
          <span>{{ link.label }}</span>
          <svg
            v-if="link.icon === 'github'"
            class="project-card__icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M12 2C6.47 2 2 6.48 2 12.06c0 4.45 2.87 8.22 6.84 9.55.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.89 1.55 2.34 1.1 2.91.84.09-.65.35-1.1.63-1.35-2.22-.26-4.55-1.13-4.55-5 0-1.1.39-2 .1-2.71 0 0 .84-.27 2.75 1.03A9.5 9.5 0 0 1 12 7.4c.85 0 1.7.11 2.5.32 1.9-1.3 2.74-1.03 2.74-1.03.37.93.14 1.61.07 1.78.62.69 1 1.58 1 2.7 0 3.88-2.34 4.73-4.57 4.98.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48 3.96-1.33 6.83-5.1 6.83-9.55C22 6.48 17.52 2 12 2Z"
            />
          </svg>
          <svg
            v-else
            class="project-card__icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M5 5h6v2H7.41L19 18.59 17.59 20 6 8.41V12H4V5a0 0 0 0 1 0 0z"
            />
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '../types/project'

defineProps<{
  project: Project
  index: number
}>()
</script>

<style scoped>
.project-card {
  display: grid;
  gap: 1.5rem;
  background: rgba(18, 18, 31, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  padding: 1.75rem;
  box-shadow:
    0 25px 60px rgba(15, 23, 42, 0.35),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  animation: fade-up 0.8s ease forwards;
  animation-delay: var(--stagger-delay);
  opacity: 0;
  transform: translateY(24px);
  transition:
    transform 350ms ease,
    box-shadow 350ms ease,
    border-color 350ms ease;
}

.project-card--highlight {
  border-color: rgba(99, 102, 241, 0.6);
  box-shadow:
    0 32px 80px rgba(67, 56, 202, 0.35),
    inset 0 0 0 1px rgba(129, 140, 248, 0.18);
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 35px 80px rgba(15, 23, 42, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.project-card__media {
  position: relative;
  overflow: hidden;
  border-radius: 1.15rem;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, rgba(129, 140, 248, 0.35), rgba(56, 189, 248, 0.25));
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: lighten;
  transition: transform 500ms ease;
}

.project-card:hover .project-card__image {
  transform: scale(1.04);
}

.project-card__badge {
  position: absolute;
  left: 1rem;
  top: 1rem;
  background: rgba(15, 23, 42, 0.75);
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(226, 232, 240, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.35);
}

.project-card__content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.project-card__title {
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  line-height: 1.2;
  font-weight: 600;
}

.project-card__description {
  color: rgba(226, 232, 240, 0.78);
  font-size: 1rem;
  line-height: 1.65;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-card__tag {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(79, 70, 229, 0.2);
  border: 1px solid rgba(165, 180, 252, 0.4);
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

.project-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 0.95rem;
  border-radius: 0.85rem;
  background: rgba(96, 165, 250, 0.16);
  color: #e0f2fe;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid rgba(96, 165, 250, 0.35);
  transition:
    background 250ms ease,
    border-color 250ms ease,
    transform 250ms ease;
}

.project-card__link:hover {
  background: rgba(56, 189, 248, 0.32);
  border-color: rgba(56, 189, 248, 0.6);
  transform: translateY(-2px);
}

.project-card__icon {
  width: 1rem;
  height: 1rem;
}

@keyframes fade-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 720px) {
  .project-card {
    padding: 1.35rem;
  }

  .project-card__links {
    flex-direction: column;
    align-items: flex-start;
  }

  .project-card__link {
    width: 100%;
    justify-content: center;
  }
}

@media print {
  .project-card {
    background: rgba(18, 18, 31, 0.7) !important;
    color: #f8fafc !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    box-shadow: 
      0 25px 60px rgba(15, 23, 42, 0.35),
      inset 0 0 0 1px rgba(255, 255, 255, 0.03) !important;
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  .project-card--highlight {
    border-color: rgba(99, 102, 241, 0.6) !important;
    box-shadow:
      0 32px 80px rgba(67, 56, 202, 0.35),
      inset 0 0 0 1px rgba(129, 140, 248, 0.18) !important;
  }

  .project-card__title {
    color: #f8fafc !important;
  }

  .project-card__description {
    color: rgba(226, 232, 240, 0.78) !important;
  }

  .project-card__badge {
    background: rgba(15, 23, 42, 0.75) !important;
    color: rgba(226, 232, 240, 0.9) !important;
    border: 1px solid rgba(148, 163, 184, 0.35) !important;
  }

  .project-card__tag {
    background: rgba(79, 70, 229, 0.2) !important;
    border: 1px solid rgba(165, 180, 252, 0.4) !important;
    color: #f8fafc !important;
  }

  .project-card__link {
    background: rgba(96, 165, 250, 0.16) !important;
    border: 1px solid rgba(96, 165, 250, 0.35) !important;
    color: #e0f2fe !important;
    text-decoration: none !important;
  }

  .project-card__media {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .project-card__content {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>
