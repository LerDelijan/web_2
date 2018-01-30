require('./app.scss')

import Vue from 'vue/dist/vue.js'
import alertify from 'alertify.js'

const counter = {
    props: ['count'],
    template: `
    <div>
        <p>Total todos: {{count}}</p>
    </div>
    `
}

const item = {
    props: ['i', 'todo'],
    methods: {
        toggleDone: function () {
            this.todo.donetime = (new Date() - this.todo.time) / 1000;
            this.todo.done = !this.todo.done;
        },
        toggleUnone: function () {
            this.todo.donetime = '';
            this.todo.done = !this.todo.done;
        }
    },
    template: `
    <li>
        <button class='donebtn' @click='toggleDone'>Done</button>
        <button class='undonebtn' @click='toggleUnone'>Undone</button>
        <span v-bind:class="{'done': todo.done}">{{ todo.text }}</span>
        <div v-bind:class="{'time': todo.starttime}">{{ todo.starttime }}</div>
        <div v-bind:class="{'donetime': todo.donetime}">{{ todo.donetime }}</div>
    </li>`
}

const input = {
    props: ['disabled'],
    data: () => {
        return {
            newTodo: ''
        }
    },
    methods: {
        onClick: function () {
            this.$emit('click', this.newTodo);
            this.newTodo = ''
        }
    },
    template: `
    <div>
      <input id="title" v-model='newTodo' @keyup.enter='onClick' :disabled='disabled'/>
    </div>
  `
}

var app = new Vue({
    el: '#app',
    data: {
        todos: []
    },
    methods: {
        addTodo: function (text) {
            const startTime = new Date();
            const st = startTime.getHours() + ":" + startTime.getMinutes() + ":" + startTime.getSeconds();
            if (text === '') {
                alertify.alert('First you need to enter the text of the task!');
                return;
            }
            for (let i = 0; i < this.todos.length; i++) {
                if (text === this.todos[i].text) {
                    alertify.alert("You have already added such a task!");
                    return;
                }
            }
            this.todos.push({
                text: text,
                done: false,
                time: startTime,
                starttime: st,
                donetime: ''
            });
        },
    },
    computed: {
        inputDisabled: function () {
            return this.todos.length >= 10;
        }
    },
    components: {
        'todo-item': item,
        'todo-counter': counter,
        'todo-input': input,
    }
});