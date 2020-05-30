<template>
    <div id="app">
        <div class="flex-ju-al-center p-20 bg-success">
            <el-button type="primary" class="mr-12" @click="$router.push({name:'style'})">style</el-button>
            <el-button class="mr-12" @click="$router.push({name: 'components'})">components</el-button>
            <el-button class="mr-12" @click="$router.push({name: 'functions'})">Functions</el-button>
            <el-button class="mr-12" @click="$router.push({name: 'directive'})">directive</el-button>
            <el-button @click="$router.push({name: 'filters'})">filters</el-button>
        </div>
        <router-view />
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
