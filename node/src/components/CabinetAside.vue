<script setup>
import ProjectListItem from "./ProjectListItem.vue";
import {useProjectStore} from "../stores/projectStore.js";
import {onMounted} from "vue";
import VueSpinner from "./structure/VueSpinner.vue";
import router from "../router/index.js";


const projectStore = useProjectStore()


onMounted(() => {
  projectStore.getProjects()
})

const chooseProject = (projectUrl) => {
  projectStore.currentProject = projectUrl
  router.push('/cabinet/project/' + projectUrl)
}

const createProject = () => {
  router.push('/cabinet/project/create')
}

</script>

<template>
<aside class="sidebar">
  <h2>Проекты</h2>
  <div v-if="projectStore.status === 'loading'" style="text-align: center">
    <VueSpinner/>
  </div>

  <div class="project-list" v-else-if="projectStore.status === 'success'">
    <ul>
      <ProjectListItem
        v-for="project in projectStore.projects"
        :key="project.id"
        :project-name="project.name"
        :project-url="project.url"
        @click="chooseProject(project.url)"
        :class="{active: $route.params.url === project.url}"
      />
    </ul>
  </div>
  <div class="add-project-btn" @click="createProject">+</div>
</aside>
</template>

<style lang=scss scoped>
.sidebar {
  width: 18%;
  background: #ffd0e0;
  border-radius: 30px;
  padding: 30px 25px;
  box-shadow: 0 6px 15px rgba(240, 98, 146, 0.25);
  display: flex;
  flex-direction: column;

  & h2 {
    margin-top: 0;
    font-size: 1.6em;
    color: #9e1b56;
    margin-bottom: 20px;
    text-shadow: 1px 1px 3px #d83979;
  }
}

.add-project-btn {
  background-color: #fce7f0;
  color: #7a2355;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(216, 57, 121, 0.5);
  display: flex;
  align-items: center;
  text-align: center;
  gap: 10px;
  align-content: space-around;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.15s ease;
}

.add-project-btn:hover {
  background: #f06292;
  color: white;
  box-shadow: 2px 2px 8px #d83979;
  transform: scale(1.05);
}
</style>