<template>
  <div class="page">
    <!-- Print-only Banner -->
    <div class="print-banner">
      <div class="print-banner__content">
        <h3>🌐 Interaktives Portfolio online verfügbar</h3>
        <p><strong>portfolio.traum.me</strong> – Vollständige Funktionen, Live-Demos und aktuelle Projekte</p>
      </div>
    </div>

    <header class="hero">
      <div class="hero__content">
        <div class="hero__header-row">
          <span class="hero__eyebrow">{{ t('hero.eyebrow') }}</span>
          <div class="language-switcher">
            <button 
              v-for="lang in availableLocales" 
              :key="lang"
              class="language-switcher__btn"
              :class="{ 'language-switcher__btn--active': locale === lang }"
              type="button"
              @click="switchLanguage(lang)"
            >
              {{ lang.toUpperCase() }}
            </button>
          </div>
        </div>
        <h1>{{ t('hero.title') }}</h1>
        <p>
          {{ t('hero.description') }}
        </p>

        <div class="hero__actions">
          <button class="btn btn--primary" type="button" @click="scrollToProjects">
            {{ t('hero.viewProjects') }}
          </button>
          <button class="btn btn--ghost" type="button" @click="printPage">
            {{ t('hero.exportPdf') }}
          </button>
        </div>
      </div>

      <figure class="hero__portrait">
        <img :src="profileImage" :alt="t('hero.portrait')" />
        <figcaption class="sr-only">{{ t('contact.name') }}</figcaption>
      </figure>

      <div class="hero__stats" role="presentation">
        <div class="hero__stat">
          <span class="hero__stat-number">{{ projects.length }}</span>
          <span class="hero__stat-label">{{ t('hero.projectsCount') }}</span>
        </div>
        <div class="hero__stat">
          <span class="hero__stat-number">{{ uniqueTags.length }}</span>
          <span class="hero__stat-label">{{ t('hero.technologiesCount') }}</span>
        </div>
      </div>
    </header>

    <section class="filters" :aria-label="t('filters.label')">
      <button
        class="filter-chip"
        :class="{ 'filter-chip--active': !selectedTag }"
        type="button"
        @click="selectTag()"
      >
        {{ t('filters.all') }}
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
            {{ t('filters.activeFilter', { tag: selectedTag }) }}
          </span>
        </template>
      </ProjectGallery>
    </section>

    <footer class="page__footer contact-card">
      <div class="contact-card__content">
        <h2>{{ t('contact.heading') }}</h2>
        <p>
          {{ t('contact.description') }}
        </p>
      </div>
      <div class="contact-card__details">
        <strong>{{ t('contact.name') }}</strong>
        <a class="contact-card__mail" href="mailto:kontakt@davidtraum.de">david@traum.me</a>
        <span>{{ t('contact.location') }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectGallery from './components/ProjectGallery.vue'
import type { Project } from './types/project'
import rawProjects from './data/projects.json'

const { t, locale, availableLocales, te } = useI18n()

const profileImage = '/img/me.jpg'

// Helper function to check if a translation exists
const hasTranslation = (key: string): boolean => {
  return te(key)
}

const projects = computed(() => {
  return (rawProjects as Project[]).map((project, index) => {
    // Get the translated project data
    const projectKey = `projects.${index}`
    const hasTrans = hasTranslation(`${projectKey}.title`)
    
    return {
      ...project,
      title: hasTrans ? t(`${projectKey}.title`) : project.title,
      description: hasTrans ? t(`${projectKey}.description`) : project.description,
      period: hasTrans ? t(`${projectKey}.period`) : project.period,
      links: project.links?.map((link, linkIndex) => ({
        ...link,
        label: hasTranslation(`${projectKey}.links.${linkIndex}.label`)
          ? t(`${projectKey}.links.${linkIndex}.label`)
          : link.label
      })),
      highlight: project.highlight ?? index === 0
    }
  })
})

const gallerySection = ref<HTMLElement | null>(null)
const selectedTag = ref<string | undefined>()

const uniqueTags = computed(() => {
  const tags = new Set<string>()
  projects.value.forEach((project) => project.tags?.forEach((tag) => tags.add(tag)))
  return Array.from(tags).sort((a, b) => a.localeCompare(b))
})

const filteredProjects = computed(() => {
  if (!selectedTag.value) {
    return projects.value
  }

  return projects.value.filter((project) => project.tags?.includes(selectedTag.value as string))
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

const switchLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
  document.documentElement.lang = lang
  
  // Update page title and description from translations
  document.title = t('meta.title')
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', t('meta.description'))
  }
}

// Update HTML lang attribute and meta tags on mount and locale change
watch(locale, (newLocale) => {
  document.documentElement.lang = newLocale
  document.title = t('meta.title')
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', t('meta.description'))
  }
}, { immediate: true })
</script>
