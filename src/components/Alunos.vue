<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h5 class="display-5 text-success" v-if="this.professor.id != undefined">Gerenciamento de Alunos - Professor : {{this.professor.id}} - {{this.professor.name}}</h5>
        <h5 class="display-5 text-success" v-else>Gerenciamento de Alunos: Todos os Professores</h5>
      
      </div>
      <div class="card-body">
        <div class="row" v-if="this.professor.id != undefined">
          <div class="col-lg-6">
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Your name"
              v-model="name"
              value="name"
            />
          </div>
          <div class="col-lg-2">
            <input
              type="number"
              id="age"
              class="form-control"
              placeholder="Your Age"
              v-model="age"
              value="age"
              v-on:keyup.enter="AdicionarAluno()"
            />
          </div>
          <div class="col-lg-2">
            <button class="btn btn-success" @click="AdicionarAluno()">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="table-responsive">
          <table class="table table-sm table-striped table-hover">
            <tr>
              <th>Id</th>
              <th>Name of Student</th>
              <th>Age</th>
              <th>Professor</th>
              <th>Delete</th>
            </tr>
            <tr v-for="(student, index) in Students" :key="index">
              <!-- <td>{{ index }}</td> -->
              <td>{{student.id}}</td>
              <td><router-link :to='`/alunodetail/${student.id}`'> {{student.name}}</router-link></td>
              <td>{{student.age}}</td>
              <td>{{student.prof.name}}</td>
              <td>
                <button
                  class="btn btn-sm btn-danger"
                  @click="RemoverAluno(student)"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      Students: [
        // { id: 0, name: "Pedro Alvarenga", age: 32 },
        // { id: 1, name: "Juliana Paz Alegria", age: 27 },
        // { id: 2, name: "Gilmar Fagulha", age: 45 },
        // { id: 3, name: "Mariovalda Portaz", age: 62 },
        // { id: 4, name: "Vigulino Ferreira Lampião", age: 97 },
      ],
      name: "",
      age: null,
      professor_id: this.$route.params.prof_id,
      professor: {}
    };
  },
  created(){
      if (this.professor_id){
        this.CarregarDadosProfessor();
        this.$http
        //o campo de pesquisa tem que ser a chave do json ali no prof.id
          .get("http://localhost:3000/alunos?prof.id=" + this.professor_id)
          .then((res) => res.json())
          .then(classGroup => {
            this.Students = classGroup;
          });  
         
      } else {
        this.$http
          .get("http://localhost:3000/alunos")
          .then((res) => res.json())
          .then(classGroup => {
            this.Students = classGroup;
          });  
      } 
  },
  methods: {
    AdicionarAluno() {
      var _student = !this.professor ? { name: this.name, age: this.age, prof: null }: 
                                       { name: this.name, age: this.age, prof: this.professor }

      this.$http
        .post("http://localhost:3000/alunos", _student)
        .then((res) => res.json())
        .then((std) => {
          this.Students.push(std);
          this.name = "";
          this.age = null;
        });
    },

    RemoverAluno(student_item) {
      var searchStu = this.Students.indexOf(student_item);

        this.$http
          .delete(`http://localhost:3000/alunos/${student_item.id}`)
          .then(() => {
            this.Students.splice(searchStu, 1);
          });      
    },
    CarregarDadosProfessor(){
       this.$http
        //o campo de pesquisa tem que ser a chave do json ali no prof.id
          .get("http://localhost:3000/teachers/" + this.professor_id)
          .then((res) => res.json())
          .then(classGroup => {
            this.professor = classGroup
          });         
    }
  },
  components: {
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-body {
  background-color: rgb(231, 231, 240);
}
.card-footer{
  background: rgb(255, 255, 255);
}
</style>
