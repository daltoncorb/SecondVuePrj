<template>
  <div id="app">
    <BarraNav />
    <Title title="GerEs - Sistema de Gerenciamento Escolar" />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import Alunos from './components/Alunos.vue'
import BarraNav from  './components/shared/BarraNav'
import Title from './components/shared/Titles'
import Professores from "./components/Professor"
import About from "./components/About"
import AlunoDetail from "./components/AlunoDetail"

export default {
  name: 'App',
  components: {
    /* eslint-disable vue/no-unused-components */
    Alunos,
    BarraNav,
    Title,
    Professores,
    About,
    AlunoDetail
  }
}
</script>

<style>

</style>
