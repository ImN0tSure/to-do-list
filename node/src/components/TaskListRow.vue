<script setup>
  import {defineProps, ref, computed} from 'vue'

  const props = defineProps({
    id: {
      type: Number,
      default: 0
    },
    projectUrl: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'task name'
    },
    inProgress: {
      type: Boolean,
      default: true
    },
    priority: {
      type: Number,
      default: 2
    },
    time: {
      type: String,
      default: 'time left'
    },
    type: {
      type: String,
      default: 'row'
    }
  })

  const priorities = ref(['↑', '—', '↓'])

  const isInProgress = () => {
    return props.inProgress ? 'Актуально' : 'Завершено'
  }

  const inProgressClass = () => {
    return props.inProgress ? 'in-progress' : 'complete'
  }

  const taskPriority = () => {
    return priorities.value[props.priority - 1]
  }

  const priorityClass = () => {
    switch (props.priority) {
      case 1:
        return 'high'
      case 3:
        return 'low'
      default:
        return 'middle'
    }
  }

</script>

<template>
<div class="tasks__row row">
  <div class="name">{{ name }}</div>
  <div class="status" :class="inProgressClass()">{{ isInProgress() }}</div>
  <div class="priority" :class="priorityClass()">{{ taskPriority() }}</div>
  <div class="time">{{ time }}</div>
</div>
</template>

<style lang=scss scoped>
.row {
  background: #fce7f0;
  cursor: pointer;
}
.name, .time {
  color: #7a2350;
}

.in-progress {
  color: #d1a12b;
}

.complete {
  color: #00796b;
}

.priority {
  &.high {
    color: red;
  }

  &.middle {
    color: #5ea83a;
  }

  &.low {
    color: #163697;
  }
}
</style>