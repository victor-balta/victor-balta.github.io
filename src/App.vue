<script setup>
import { ref } from 'vue'
import { profile as profileData, experience as experienceData, projects as projectsData, skills as skillsData } from './data'

// Use refs if you plan to make this data interactive/filterable later, 
// otherwise you can use the imported data directly in the template.
const profile = ref(profileData)
const experience = ref(experienceData)
const projects = ref(projectsData)
const skills = ref(skillsData)

// Helper for status colors
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'live': return 'badge-success';
    case 'sold': return 'badge-secondary';
    case 'offline': return 'badge-neutral';
    case 'development': return 'badge-warning';
    default: return 'badge-ghost';
  }
}
</script>

<template>
  <div class="min-h-screen bg-base-100 flex justify-center py-10 px-4">
    <div class="w-full max-w-md space-y-8 animate-fade-in-up">
      
      <!-- Bio Header (Link-in-Bio Style) -->
      <header class="text-center space-y-4">
        <div class="avatar online" :class="{ 'placeholder': !profile.image }">
          <div class="rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2 shadow-xl" :class="{ 'bg-neutral text-neutral-content': !profile.image }">
            <img v-if="profile.image" :src="profile.image" :alt="profile.name" />
            <span v-else class="text-3xl font-bold">{{ profile.name.charAt(0) }}</span>
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-bold">{{ profile.name }}</h1>
          <p class="text-primary font-medium">{{ profile.title }}</p>
        </div>
        <p class="text-sm opacity-80 leading-relaxed px-4">{{ profile.about }}</p>
        
        <!-- Social Links as Buttons -->
        <div class="flex flex-col gap-3 mt-4">
          <a v-for="social in profile.socials" :key="social.name" :href="social.url" target="_blank" 
             class="btn btn-outline btn-block rounded-full hover:scale-[1.02] transition-transform duration-200 normal-case text-lg font-normal">
             {{ social.name }}
          </a>
        </div>
      </header>

      <div class="divider text-xs opacity-50">PORTFOLIO</div>

      <!-- Experience Accordion -->
      <!-- Experience Section (Uncollapsed) -->
      <section class="space-y-6">
        <h2 class="text-lg font-bold text-center opacity-80 uppercase tracking-widest text-xs">Experience</h2>
        <div class="flex flex-col gap-6">
          <div v-for="(job, index) in experience" :key="index" class="flex gap-4 items-start">
            
            <!-- Logo / Avatar -->
            <div class="avatar placeholder flex-none">
                <div class="w-12 h-12 rounded-xl bg-neutral-focus text-neutral-content ring-1 ring-base-content/10 shadow-sm">
                   <img v-if="job.image" :src="job.image" :alt="job.company" class="object-cover" />
                   <span v-else class="text-lg font-bold">{{ job.company.charAt(0) }}</span>
                </div>
            </div>

            <div class="flex-1 space-y-1">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                <h3 class="font-bold text-sm">{{ job.role }}</h3>
                <span class="badge badge-sm badge-ghost opacity-70 whitespace-nowrap">{{ job.period }}</span>
              </div>
              
              <div class="text-xs font-semibold opacity-70">{{ job.company }}</div>
              
              <p class="text-sm opacity-80 leading-relaxed pt-1">{{ job.description }}</p>
            </div>

          </div>
        </div>
      </section>

      <!-- Projects List (Compact) -->
      <section class="space-y-6">
        <h2 class="text-lg font-bold text-center opacity-80 uppercase tracking-widest text-xs">Projects</h2>
        
        <div class="flex flex-col gap-6">
          <div v-for="(project, index) in projects" :key="index" class="flex gap-4 items-start group">
            
            <!-- Project Logo -->
            <div class="avatar placeholder flex-none">
              <div class="w-12 h-12 rounded-xl bg-base-200 text-base-content ring-1 ring-base-content/10 overflow-hidden">
                <img v-if="project.image" :src="project.image" :alt="project.name" class="object-cover w-full h-full" />
                <span v-else class="text-xs font-bold opacity-30">IMG</span>
              </div>
            </div>

            <div class="flex-1 space-y-1">
              <div class="flex justify-between items-center gap-2">
                <div class="flex items-center gap-2">
                    <h3 class="font-bold text-sm group-hover:text-primary transition-colors">{{ project.name }}</h3>
                    <a v-if="project.link" :href="project.link" target="_blank" class="opacity-50 hover:opacity-100 transition-opacity text-xs">↗</a>
                </div>
                <!-- Status Badge -->
                 <div class="badge badge-xs text-[10px] font-bold uppercase tracking-wider p-2 bg-opacity-20 border-none" :class="getStatusColor(project.status).replace('badge-', 'text-') + ' ' + getStatusColor(project.status).replace('badge-', 'bg-')">
                  {{ project.status }}
                </div>
              </div>
              
              <p class="text-sm opacity-80 leading-relaxed">{{ project.description }}</p>
              
              <!-- Tech Stack -->
              <div v-if="project.tech" class="text-[10px] opacity-50 pt-1 font-mono">
                  {{ Array.isArray(project.tech) ? project.tech.join(' · ') : project.tech }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Tags -->
      <section class="text-center space-y-3">
        <h2 class="text-lg font-bold opacity-80 uppercase tracking-widest text-xs">Skills</h2>
        <div class="flex flex-wrap justify-center gap-2">
          <div v-for="skill in skills" :key="skill" class="badge badge-lg badge-ghost p-3 text-xs bg-base-200 border-none">
            {{ skill }}
          </div>
        </div>
      </section>

      <footer class="text-center py-6 opacity-40 text-xs">
        <p>© {{ new Date().getFullYear() }} {{ profile.name }}</p>
      </footer>
    </div>
  </div>
</template>

<style>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
</style>
