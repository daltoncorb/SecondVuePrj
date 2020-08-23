import Vue from 'vue';
import router from 'vue-router';

//windows of app

import Al from "./components/Alunos";
import Pr from "./components/Professor"
import Ab from './components/About'
import Ad from './components/AlunoDetail';

Vue.use(router);

export default new router({
    routes:[
        {
            path: '/professor',
            name: 'Professor',
            component: Pr
        }, 
        {
            //troca somente o path. não trocar o name
            path: '/alunos/:prof_id',
            name: 'Alunos',
            component: Al
        }, 
        {
            path: '/alunodetail/:aluno_id',
            name: 'AlunoDetail',
            component: Ad 
        },
        {
            path: '/alunosall',
            name: 'Alunos',
            component: Al
        },        
        {
            path: '/about',
            name: 'About',
            component: Ab
        },
    ]
})