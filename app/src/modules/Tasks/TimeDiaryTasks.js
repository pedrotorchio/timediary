export default class TimeDiaryTasks{
    constructor(){
        this.install();
    }
    install(){
        this.APP = window.APP;
        this.router = this.APP.$router;
        this.store  = this.APP.$store;

        this.router.addRoutes([
            {
                path: '/atividades',
                name: 'Tasks-dashboard',
                template: '<div>TASKS DASHBOARD</div>'
            }
        ]);  
        
        let module = {
            uid: 55342546,
            name: 'Atividades',
            sideTabs: [{
                icon: null,
                title: 'Atividades',
                component: null
            }],
            widget: null
        }
        
        this.store.commit('addModule', module);
    }
}