<template>
  <div class="p-4">
    <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="showModal = true">Добавить задачу</button>
    <div v-for="(task, index) in tasks" :key="index" class="mt-4">
      <h2 class="text-xl font-bold">{{ task.title }}</h2>
      <p class="text-gray-600">{{ task.description }}</p>
      <button class="bg-yellow-500 text-white px-4 py-2 rounded mt-2 mr-2" @click="editTask(index)">Редактировать</button>
      <button class="bg-red-500 text-white px-4 py-2 rounded mt-2" @click="deleteTask(index)">Удалить</button>
    </div>
    <div v-if="showModal" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded">
        <input v-model="task.title" placeholder="Заголовок" class="border p-2 rounded w-full">
        <input v-model="task.description" placeholder="Подзаголовок" class="border p-2 rounded w-full mt-2">
        <button class="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2" @click="saveTask">Сохранить</button>
        <button class="bg-red-500 text-white px-4 py-2 rounded mt-2" @click="showModal = false">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useStore } from './stores/store'

export default {
  setup() {
    const store = useStore()
    const showModal = ref(false)
    const task = ref({ title: '', description: '' })
    const editIndex = ref(-1)

    const saveTask = () => {
      if (editIndex.value === -1) {
        store.addTask(task.value)
      } else {
        store.updateTask(editIndex.value, task.value)
        editIndex.value = -1
      }
      task.value = { title: '', description: '' }
      showModal.value = false
    }

    const editTask = (index) => {
      task.value = { ...store.tasks[index] }
      editIndex.value = index
      showModal.value = true
    }

    const deleteTask = (index) => {
      store.deleteTask(index)
    }

    return { tasks: store.tasks, showModal, task, saveTask, editTask, deleteTask }
  },
}
</script>