<template>
    <div>
    <nav class="navbar navbar-dark bg-success navbar-expand-lg">
      <a class="navbar-brand" href="#">GerEs</a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <a class="nav-link active" href="#">Principal <span class="sr-only">(current)</span></a>
            <router-link to="/professor" class="nav-link">Professores</router-link>
            <router-link to="/alunosall" class="nav-link">Alunos</router-link>
            <router-link to="/about" class="nav-link">Sobre</router-link>
            </div>
        </div>

    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style scope>

</style>