<template>
  <section class="gallery" aria-labelledby="projects-heading">
    <header class="gallery__header">
      <div>
        <h2 id="projects-heading">Projekte</h2>
        <p class="gallery__subtitle">
          Eine kuratierte Auswahl aktueller Softwarearbeiten – modular, skalierbar und mit Fokus auf User Experience.
        </p>
      </div>
      <slot name="actions" />
    </header>

    <TransitionGroup
      name="fade-up"
      tag="div"
      class="gallery__grid"
      v-if="projects.length"
    >
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :index="index"
      />
    </TransitionGroup>

    <p v-else class="gallery__empty">
      Kein Projekt gefunden. Prüfe die ausgewählten Filter oder ergänze deine <code>projects.json</code>.
    </p>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '../types/project'
import ProjectCard from './ProjectCard.vue'

defineProps<{
  projects: Project[]
}>()
</script>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.gallery__header {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: flex-end;
}

.gallery__subtitle {
  max-width: 42ch;
  color: rgba(148, 163, 184, 0.88);
  line-height: 1.7;
}

.gallery__grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.25rem);
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
}

.gallery__empty {
  font-size: 1rem;
  color: rgba(148, 163, 184, 0.9);
  border: 1px dashed rgba(148, 163, 184, 0.35);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  background: rgba(15, 23, 42, 0.45);
}

@media print {
  .gallery__subtitle {
    color: #475569;
  }

  .gallery__empty {
    background: transparent;
    color: #1e293b;
    border-color: #94a3b8;
  }
}
</style>
