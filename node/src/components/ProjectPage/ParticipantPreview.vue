<script setup>
import { defineProps, ref, computed } from 'vue'

const props = defineProps({
  img: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: '2'
  },
  name: {
    type: String,
    default: ''
  },
  surname: {
    type: String,
    default: ''
  },
  excluded: {
    type: Boolean,
    default: false
  }
})

const userStatus = computed(() => {
  switch (props.status) {
    case '1':
      return 'куратор'
    case '0':
      return 'создатель'
    default:
      return 'исполнитель'
  }
})

</script>

<template>
  <div class="participant">
    <div class="participant__photo">
      <img :src="img" alt="здесь могла быть ваша реклама" />
    </div>
    <div class="participant__info">
      <div class="name" :class="{ excluded }">
        <strong>{{ name }} {{ surname }}</strong>
      </div>
      <div class="status">
        {{ userStatus }}
      </div>
    </div>
  </div>
</template>

<style lang=scss>
.participant {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 260px;
  justify-content: center;
  color: rgb(122, 35, 80);

  &:hover {
    cursor: pointer;
    border-radius: 40px;
    color: rgb(240, 98, 146);
  }

  &__photo {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(240, 98, 146);
    border-image: initial;
    border-radius: 50%;
    overflow: hidden;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    

  }

  &__info {
    position: relative;

    & div {

      max-width: 200px;
    }

    & .name {
      position: relative;
    }
  }
}

.excluded:before {
  content: "";
  border-bottom: 3px solid #7a2350;
  position: absolute;
  width: 100%;
  height: 50%;
}
</style>