<template>
  <div class="page">
    <header class="hero">
      <div class="hero__content">
        <span class="hero__eyebrow">Portfolio · David Traum</span>
        <h1>Software-Projekte mit Fokus auf Klarheit, Wirkung und Flow.</h1>
        <p>
          Hi, ich bin David, Full-Stack Entwickler aus Andernach. Ich brenne für die Umsetzung interessanter Full-Stack Softwareprojekte, am liebsten mit Web-Fokus. Hier finden Sie eine Auswahl meiner Projekte, welche ich vollständig von Anfang bis Ende umgesetzt habe.
        </p>

        <div class="hero__actions">
          <button class="btn btn--primary" type="button" @click="scrollToProjects">
            Projekte ansehen
          </button>
          <button class="btn btn--ghost" type="button" @click="printPage">
            PDF exportieren
          </button>
        </div>
      </div>

      <div class="hero__stats" role="presentation">
        <div class="hero__stat">
          <span class="hero__stat-number">{{ projects.length }}</span>
          <span class="hero__stat-label">Projekte</span>
        </div>
        <div class="hero__stat">
          <span class="hero__stat-number">{{ uniqueTags.length }}</span>
          <span class="hero__stat-label">Technologien</span>
        </div>
      </div>
    </header>

    <section class="filters" aria-label="Projekt-Filter">
      <button
        class="filter-chip"
        :class="{ 'filter-chip--active': !selectedTag }"
        type="button"
        @click="selectTag()"
      >
        Alle
      </button>
      <button
        v-for="tag in uniqueTags"
        :key="tag"
        class="filter-chip"
        :class="{ 'filter-chip--active': tag === selectedTag }"
        type="button"
        @click="selectTag(tag)"
      >
        #{{ tag }}
      </button>
    </section>

    <section ref="gallerySection" class="gallery-wrapper">
      <ProjectGallery :projects="filteredProjects">
        <template #actions>
          <span v-if="selectedTag" class="filters__status">
            Filter aktiv: #{{ selectedTag }}
          </span>
        </template>
      </ProjectGallery>
    </section>

    <footer class="page__footer">
      <div>
        <h2>Setup anpassen</h2>
        <p>
          Ergänze deine Projekte in <code>src/data/projects.json</code> und lege die passenden Screenshots im
          Ordner <code>public/screenshots</code> ab. Beim nächsten Build werden alle Informationen gebündelt.
        </p>
      </div>
      <ul class="footer__list">
        <li><strong>npm run dev</strong> — lokale Entwicklungsumgebung</li>
        <li><strong>npm run build</strong> — optimierter, statischer Export</li>
        <li><strong>npm run preview</strong> — finalen Build prüfen</li>
      </ul>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ProjectGallery from './components/ProjectGallery.vue'
import type { Project } from './types/project'
import rawProjects from './data/projects.json'

const projects = (rawProjects as Project[]).map((project, index) => ({
  ...project,
  highlight: project.highlight ?? index === 0
}))

const gallerySection = ref<HTMLElement | null>(null)
const selectedTag = ref<string | undefined>()

const uniqueTags = computed(() => {
  const tags = new Set<string>()
  projects.forEach((project) => project.tags?.forEach((tag) => tags.add(tag)))
  return Array.from(tags).sort((a, b) => a.localeCompare(b))
})

const filteredProjects = computed(() => {
  if (!selectedTag.value) {
    return projects
  }

  return projects.filter((project) => project.tags?.includes(selectedTag.value as string))
})

const selectTag = (tag?: string) => {
  selectedTag.value = selectedTag.value === tag ? undefined : tag
}

const printPage = () => {
  window.print()
}

const scrollToProjects = () => {
  gallerySection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
