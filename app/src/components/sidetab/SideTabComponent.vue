<script>
export default {
    name: 'SideTab',
    props:{
        tab:{
            required: true
        },
        position: {
            default: 'right',
            type: String
        },
        disabled:{
            type:Boolean,
            default: false
        },
        side:{
            required: true,
            type:Number
        }
    },
    data(){
        return {}
    },
    computed: {        
        sidePx(){
            return this.side + 'px';
        }
    },
    methods:{
        clicked(){

            let component = this.tab.component;
            let title = this.tab.title;
            let routerPush = this.tab.extra.routerPush;

            this.$emit('click', {component, title, routerPush});
        }
    }
}

</script>
<template>
<div class="side-tab elevation-3" v-bind:class="[`_${position}`, disabled ? 'disabled' : 'enabled']" v-bind:style='{width:sidePx, height:sidePx}'
@click='clicked'>
    <component v-if='tab.icon' class="icon_component" :is="tab.icon"></component>
</div>
</template>
<style lang='scss' scoped>
    @import '../../assets/styles/config';
    .icon_component{
        opacity: .4;
        width: 100%;
        height: auto;
    }
    div.side-tab{
        
        cursor:pointer;
        border: 4px solid;
        background-color: $color__base_lowsat;
        

        border-color: $color__base;
        transition: {
            property: background-color, border-color;
            duration: .2s;
        }
        &:hover{
            border-color: $color__highlight;
        }
        &.disabled{
            background-color: $color__disabled;
        }
        &._left{
            left: 0;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        &._right{
            right: 0;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        
        /deep/ i.icon{
            width: 100%;
            height: 100%;
            font-size: 50px;
        }
    }
    

</style>
