<script setup>
import { ref, onMounted } from 'vue'
import { databases, APPWRITE_CONFIG, getImageUrl } from './lib/appwrite'
import { Query } from 'appwrite'

// Placeholder data
const profile = ref({
  name: "Victor Balta",
  title: "Product Manager",
  about: "Building user-centric products. Experienced in agile methodologies and data-driven decisions.",
  socials: [
    { name: "LinkedIn", url: "#", icon: "linkedin" },
    { name: "Twitter", url: "#", icon: "twitter" },
    { name: "Email", url: "mailto:hello@example.com", icon: "mail" }
  ]
})

const experience = ref([])
const projects = ref([])
const skills = ref(["Product Strategy", "Agile/Scrum", "User Research", "Data Analysis", "Roadmapping", "JIRA", "Figma", "SQL"])
const isLoading = ref(true)
const error = ref(null)

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

const fetchData = async () => {
  if (!APPWRITE_CONFIG.DATABASE_ID || APPWRITE_CONFIG.DATABASE_ID === 'your_database_id') {
    isLoading.value = false
    // Fallback data
    experience.value = [
      {
        role: "Senior Product Manager",
        company: "Tech Solutions Inc.",
        period: "2023 - Present",
        description: "Leading the B2B SaaS platform roadmap.",
        imageId: null
      },
      {
        role: "Product Owner",
        company: "Digital Innovations",
        period: "2021 - 2023",
        description: "Managed mobile app backlog & V2 launch.",
        imageId: null
      }
    ]
    projects.value = [
      {
        name: "Market Analytics Dashboard",
        description: "Tracking market trends & competitor analysis.",
        tech: ["Data Viz", "Analytics"],
        link: "#",
        status: "Live",
        imageId: null
      },
      {
        name: "Customer Feedback Loop",
        description: "Automated user feedback system.",
        tech: ["Automation", "NLP"],
        link: "#",
        status: "Sold",
        imageId: null
      },
      {
        name: "Legacy CRM",
        description: "Internal tool for sales team management.",
        tech: ["Vue", "Firebase"],
        link: "#",
        status: "Offline",
        imageId: null
      }
    ]
    return
  }

  try {
    const [expResponse, projResponse] = await Promise.all([
      databases.listDocuments(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.EXPERIENCE_COLLECTION_ID,
        [Query.orderDesc('year_start')]
      ),
      databases.listDocuments(
        APPWRITE_CONFIG.DATABASE_ID,
        APPWRITE_CONFIG.PROJECTS_COLLECTION_ID
      )
    ])
    
    experience.value = expResponse.documents.map(doc => {
      // Format period string from start/end years if available
      let period = doc.period;
      if (doc.year_start) {
        period = `${doc.year_start} - ${doc.year_end || 'Present'}`;
      }
      
      return {
        ...doc,
        period, // Use formatted period or fallback to manual string
        image: doc.imageId ? getImageUrl(APPWRITE_CONFIG.BUCKET_ID, doc.imageId) : null
      }
    })
    
    projects.value = projResponse.documents.map(doc => ({
      ...doc,
      image: doc.imageId ? getImageUrl(APPWRITE_CONFIG.BUCKET_ID, doc.imageId) : null,
      status: doc.status || 'Development' // Default if missing
    }))

  } catch (err) {
    console.error("Failed to fetch data:", err)
    error.value = "Failed to load content."
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="min-h-screen bg-base-100 flex justify-center py-10 px-4">
    <div class="w-full max-w-md space-y-8 animate-fade-in-up">
      
      <!-- Bio Header (Link-in-Bio Style) -->
      <header class="text-center space-y-4">
        <div class="avatar placeholder online">
          <div class="bg-neutral text-neutral-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2 shadow-xl">
            <span class="text-3xl font-bold">{{ profile.name.charAt(0) }}</span>
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
      <section class="space-y-4">
        <h2 class="text-lg font-bold text-center opacity-80 uppercase tracking-widest text-xs">Experience</h2>
        <div class="join join-vertical w-full bg-base-200/50 rounded-2xl shadow-sm">
          <div v-for="(job, index) in experience" :key="index" class="collapse collapse-arrow join-item border-base-300 border-b last:border-b-0">
            <input type="radio" name="experience-accordion" :checked="index === 0" /> 
            <div class="collapse-title flex items-center gap-3 p-4">
              <div class="avatar placeholder">
                <div class="bg-neutral-focus text-neutral-content rounded-xl w-10 h-10 ring-1 ring-base-content/10">
                   <img v-if="job.image" :src="job.image" :alt="job.company" />
                   <span v-else class="text-xs">{{ job.company.charAt(0) }}</span>
                </div>
              </div>
              <div class="text-left flex-1">
                <div class="font-bold text-sm">{{ job.role }}</div>
                <div class="text-xs opacity-70">{{ job.company }}</div>
              </div>
            </div>
            <div class="collapse-content text-sm opacity-80"> 
              <p class="pb-2">{{ job.description }}</p>
              <div class="badge badge-sm badge-ghost">{{ job.period }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects List (Horizontal Cards) -->
      <section class="space-y-4">
        <h2 class="text-lg font-bold text-center opacity-80 uppercase tracking-widest text-xs">Projects</h2>
        
        <div class="flex flex-col gap-4">
          <div v-for="(project, index) in projects" :key="index" 
               class="card card-side bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 border border-base-200 rounded-2xl p-2 group items-center">
            
            <!-- Small Project Image/Thumbnail -->
            <div class="w-20 h-20 flex-none bg-base-300 rounded-xl overflow-hidden ml-2">
              <img v-if="project.image" :src="project.image" :alt="project.name" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-xs font-bold opacity-30">IMG</div>
            </div>

            <div class="card-body p-4 w-full">
              <div class="flex justify-between items-start gap-2">
                <h3 class="card-title text-base font-bold">{{ project.name }}</h3>
                <a v-if="project.link" :href="project.link" target="_blank" class="btn btn-xs btn-circle btn-ghost opacity-50 hover:opacity-100">↗</a>
              </div>
              
              <p class="text-xs opacity-70 line-clamp-2 -mt-1">{{ project.description }}</p>
              
              <div class="flex flex-wrap items-center gap-2 mt-2">
                <!-- Status Badge -->
                <div class="badge badge-xs text-[10px] font-bold uppercase tracking-wider p-2" :class="getStatusColor(project.status)">
                  {{ project.status }}
                </div>
                <!-- Tech Stack (optional, maybe hide on mobile if too crowded) -->
                <span v-if="project.tech" class="text-[10px] opacity-50 truncate max-w-[120px]">
                   {{ Array.isArray(project.tech) ? project.tech.join(', ') : project.tech }}
                </span>
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
