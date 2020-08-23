<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h5 class="display-5 text-success">Management of Professors</h5>
      </div>
      <div class="card-body">
        <div class="row">
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
              id="classes"
              class="form-control"
              placeholder="Classes"
              v-model="classes"
              value="classes"
              v-on:keyup.enter="AdicionarProfessor()"
            />
          </div>
          <div class="col-lg-2">
            <button class="btn btn-success" @click="AdicionarProfessor()">
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
              <th>Name of Teacher</th>
              <th>Num Students</th>
              <th>Classes</th>
              <th>Delete</th>
            </tr>
            <tr v-for="(prof, index) in Professors" :key="index">
              <!-- <td>{{ index }}</td> -->
              <td>{{prof.id}}</td>
              <td><router-link :to="`/alunos/${prof.id}`">{{ prof.name }}</router-link></td>
              <td>{{prof.qtd}}</td>
              <td>{{ prof.classes }}</td>
              <td>
                <button
                  class="btn btn-sm btn-danger"
                  @click="RemoverProfessor(prof)"
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
      Professors: [
        // { id: 0, name: "Pedro Alvarenga", age: 32 },
        // { id: 1, name: "Juliana Paz Alegria", age: 27 },
        // { id: 2, name: "Gilmar Fagulha", age: 45 },
        // { id: 3, name: "Mariovalda Portaz", age: 62 },
        // { id: 4, name: "Vigulino Ferreira Lampião", age: 97 },
      ],
      Students: [],
      name: "",
      classes: null,
    };
  },
  created(){
        this.$http
        .get("http://localhost:3000/alunos")
        .then((res) => res.json())
        .then(classGroup => {
          this.Students = classGroup;         
          this.CarregarProfessores() 
        });  

      // this.$http
      //   .get("http://localhost:3000/teachers")
      //   .then((res) => res.json())
      //   .then(classGroup => {
      //     this.Professors = classGroup;
      //   });   
  },
  methods: {
    ContaAlunosPorProfessor(){
      this.Professors.forEach((professor, index) => {
        professor = { 
          id: professor.id, 
          name: professor.name,
          classes: professor.classes,
          qtd: this.Students.filter(student => student.prof.id == professor.id).length
          }

        this.Professors[index] = professor;
      });
    },
    CarregarProfessores(){
      this.$http
        .get("http://localhost:3000/teachers")
        .then((res) => res.json())
        .then(classGroup => {
          this.Professors = classGroup;
          this.ContaAlunosPorProfessor();
        });   
    },
    AdicionarProfessor() {
      var _professor = { name: this.name, classes: this.classes };

      this.$http
        .post("http://localhost:3000/teachers", _professor)
        .then((res) => res.json())
        .then((std) => {
          this.Professors.push(std);
          this.name = "";
          this.classes = null;
        });
    },

    RemoverProfessor(teacher_item) {
      var searchtea = this.Professors.indexOf(teacher_item);

        this.$http
          .delete(`http://localhost:3000/teachers/${teacher_item.id}`)
          .then(() => {
            this.Professors.splice(searchtea, 1);
          });
      
    },
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
