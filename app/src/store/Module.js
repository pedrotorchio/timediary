
export class Base{
    constructor(title){
        this.setTitle(title);
    }
    setTitle(title){
        this.title = title;
        this.uid = btoa(title);
    }
}
export class ModuleElement extends Base{
    constructor({icon, title, component, module}){
        super(title);
        this.icon = icon;
        this.component = component;
        this.module = module || null;
    }
}
export class Module extends Base{
    constructor({title, routes}){
        super(title);
        
        this.sidetabs = [];
        this.widgets = [];
        this.routes = routes || [];
    }
    addTab(tab){
        tab.module = this.uid;
        if(tab.title == null)
            tab.setTitle(this.title);

        this.sidetabs.push(tab);

        return this;
    }
    addWidget(widget){
        widget.module = this.uid;
        if(widget.title == null)
            widget.setTitle(this.title);

        this.widgets.push(widget);

        return this;
    }
    getUid(){
        return this.uid;
    }
    getSideTabs(){
        return this.sidetabs;
    }
    getWidgets(){
        return this.widgets;
    }

}
