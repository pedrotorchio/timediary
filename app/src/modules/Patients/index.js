import {ModuleElement, Module} from '../../store/Module';

let tab = new ModuleElement({
    icon: {
        template: `<div></div>`
    },
    title: 'Cadastro de Pacientes',
    component: {template:'<div>Pacientes tab</div>'}
});
let widget = new ModuleElement({
    icon: '',
    title: 'Pacientes',
    component: {template:'<div> <h1>Número de pacientes cadastradas</h1> <p>27 desde 01/01/2018</p> </div>'}
});

const title = 'Atividades';
const routes = [];


export default class TasksModule{
    constructor(){
        
        this.install();
    }
    install(){
        this.app = window.DIARY;
        this.store = this.app.$store;
        this.router = this.app.$router;
        
        let module = new Module({title, routes})
            .addTab(tab)
            .addWidget(widget);
        let uid = module.uid;

        this.store.commit('modulesAdd', {module, uid});
    }
}