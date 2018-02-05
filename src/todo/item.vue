<template> 
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <input type="checkbox" name="" class="toggle" v-model="todo.completed">
        <label>{{todo.content}}</label>
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>
<script type="text/javascript">
    export default{
        props: {
            todo:{
                type: Object,
                required:true,
            }
        },
        methods: {
            deleteTodo() {
              //父组件监听子组件触发的事件
              this.$emit('del',this.todo.id)
            }
        }
    }
</script>
<style lang="stylus" scoped>
.todo-item  
  width 100%
  position relative
  background #ffffff
  font-size 24px
  border-bottom 1px solid rgba(0,0,0,.06)
  &:hover
    .destory:after 
      content: 'x'
  label  
    white-space pre-line
    word-break break-all
    padding 15px 0
    margin-right 50px
    text-indent 2em
    display block 
    line-height 1.2
    transition color 0.4s
&.completed
  label 
    color #d9d9d9
    text-decoration line-through
.toggle
  text-align center 
  width 400px
  height 40px
  position absolute
  top 0
  bottom 0
  margin auto 0
  border none 
  outline none 
  appearance none
.destory
  position absolute
  top 50%
  right 10px
</style>