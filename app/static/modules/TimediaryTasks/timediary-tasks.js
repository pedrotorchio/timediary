class TimeDiaryTasks{
    install(){
        let APP = window.APP;
            APP.$router.addRoutes([{
                path: '/atividades',
                name: 'Tasks',
                component: {
                    template: '<div>FooBar</div>'
                }
            }]);
        console.log(APP);
    }
}

(new TimeDiaryTasks()).install();