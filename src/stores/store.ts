import { defineStore } from 'pinia'

export const useStore = defineStore({
    id: 'main',
    state: () => ({
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
        deleteMode: false,
        selectedTasks: [],
    }),
    actions: {
        addTask(task) {
            this.tasks.push(task)
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        },
        deleteTask(index) {
            this.tasks.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        },
        updateTask(index, task) {
            this.tasks[index] = task
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        },
        toggleDeleteMode() {
            this.deleteMode = !this.deleteMode
            this.selectedTasks = []
        },
        toggleTaskSelection(index) {
            const taskIndex = this.selectedTasks.indexOf(index)
            if (taskIndex === -1) {
                this.selectedTasks.push(index)
            } else {
                this.selectedTasks.splice(taskIndex, 1)
            }
        },
        deleteSelectedTasks() {
            this.selectedTasks.sort().reverse().forEach(index => this.deleteTask(index))
            this.selectedTasks = []
        },
    },
})