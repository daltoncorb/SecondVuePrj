<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h5 class="text-success">Alteração de Dados: {{oneStudent.name}}</h5>
        <button class="btn btn-primary btn-sm" @click="VoltarAnterior()">Voltar</button>
      </div>
      <div class="card-body">
        <div class="form-group col-lg-8">
          <label for="id">Id</label>
          <input
            type="text"
            class="form-control"
            id="id"
            v-model="oneStudent.id"
            readonly
          />
        </div>
        <div class="form-group col-lg-8">
          <label for="name">Name</label>
          <input 
            type="text"
            class="form-control"
            id="name"
            v-model="oneStudent.name"                      
          />
        </div>
        <div class="form-group col-lg-8">
          <label for="Age">Age</label>
          <input
            type="number"
            class="form-control"
            id="age"
            v-model="oneStudent.age"
          />
        </div>
        <div class="form-group col-lg-8">
          <label for="professor">Professor</label>
          <!-- <input
            type="text"
            class="form-control"
            id="professor"
            v-model="oneStudent.prof.name"
          /> -->
          <select class="form-control" v-model="oneStudent.prof">
            <option v-for="(prof, index) in manyProfs" :key="index" v-bind:value="prof">{{prof.name}}</option>
          </select>
        </div>
      </div>
      <div class="card-footer">         
        <button class="btn btn-success btn-sm" @click="SalvarDadosDoAluno(oneStudent)">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oneStudent: {},
      manyProfs: {},
      studentId: this.$route.params.aluno_id
    };
  },
  created() {     
    this.$http
      .get("http://localhost:3000/alunos/" + this.studentId)
      .then((res) => res.json())
      .then((student) => {
        this.oneStudent = student;
        this.CarregarProfessores();
        
      });
  },
  methods: {
    CarregarProfessores() {
      this.$http
        .get("http://localhost:3000/teachers")
        .then((res) => res.json())
        .then((profs) => {
          this.manyProfs = profs;
        });
    },
    SalvarDadosDoAluno(al){
      var _student = {id: al.id, name: al.name, age: al.age, prof:{id: al.prof.id, name: al.prof.name}}
      console.log(_student)
      this.$http
        .put(`http://localhost:3000/alunos/${_student.id}`, _student)
        .then((res) => res.json())
        .then(() => {          
          this.$router.back();   
        });        
    },
    VoltarAnterior(){
        this.$router.back();
    }
  },
};
</script>

<style></style>
