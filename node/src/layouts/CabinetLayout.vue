<script setup>
import CabinetAside from "../components/CabinetAside.vue";
import RootModal from "../components/structure/modal/RootModal.vue";
import {useModalStore} from "../stores/modalStore.js";
import {watch} from "vue";
import {useProjectStore} from "../stores/projectStore.js";
import {useRoleStore} from "../stores/roleStore.js";

const modalStore = useModalStore()
const projectStore = useProjectStore()
const roleStore = useRoleStore()

watch(() => projectStore.currentProject,
    async (newProject, oldProject) => {
      roleStore.unset()

      if (newProject) {
        await projectStore.getProjectRole()
      }
    },
    {immediate: true}
)
</script>

<template>
  <main class="cabinet">
    <CabinetAside/>
    <section class="content">
      <RouterView />
    </section>
  </main>

  <RootModal
    v-if="modalStore.isOpen"
  />
</template>

<style scoped>
.cabinet {
  flex-grow: 1;
  display: flex;
  padding: 40px 60px;
  gap: 30px;
  background: #fff0f6;
  border-radius: 40px 40px 0 0;
  box-shadow: 0 10px 30px rgba(240, 98, 146, 0.3);
  user-select: none;
}

.content {
  flex-grow: 1;
  background: #ffd0e0;
  border-radius: 40px;
  padding: 40px 50px;
  box-shadow: 0 6px 20px rgba(240, 98, 146, 0.35);
  display: flex;
  flex-direction: column;
  width: 82%;
}
</style>