<script>
import SideTab from './SideTabComponent';

export default {
    name: 'SideTabContainer',
    props:{
        tabs:{
            required:true
        },
        position: {
            default: 'right',
            type: String
        },
        topPosition:{
            type:Number,
            required: true
        }
    },
    data(){
        return {
            gutter: 5,
            side: 64,
            component: null,
            shown: false
        }
    },
    methods: {
        top(offset){
            let gutter = offset == 0 ? 0 : this.gutter;
            return gutter + offset * this.side + this.topPosition;
        },
        showComponent(component){
            this.component = component;
            this.show();            
        },
        show(value=true){
            this.shown = value;
        }
    },
    components:{
        SideTab
    }
} 
</script>
<template>
    <section>
        <aside class="side-tab-container" :class="[!shown ? 'shown' : '', `_${position}`]" :style='{top:`${top(0)}px`}'>
                <side-tab
                class='tab'
                
                v-for='(tab, i) in tabs' 
                :key='tab.uid'
                :title = "tab.title"            
                :side='side' 
                :position='position' 
                :tab='tab'
                :disabled='tab.component == null' 
                @click='showComponent' />
        </aside>
        <aside class='side-tab-component' :class="[shown ? 'shown' : '', `_${position}`]" :style='{top:`${top(0)}px`}'>
            <v-layout row class="controllers">
                <v-btn flat icon @click='show(false)'>
                    <v-icon>close</v-icon>
                </v-btn>
            </v-layout>
            
            <component :is='component'></component>
        </aside>
    </section>
</template>
<style lang='scss' scoped>
    @import '../../assets/styles/config';
    $width: 600px;

    .controllers{
        position: absolute;
        left: 0;
        top:0;
    }
    .side-tab-container, .side-tab-component{
        
        transition-duration: .5s;
        transition-property: left, right;
        position: fixed;
        
        &._left{
            
            left: -$width;
            &.shown{
                left: 0;
            }
        }
        &._right{
            right: -$width;
            &.shown{
                right:0;
            }
        }
        
    }
    .side-tab-container{
        display: inline-block;

        .tab{
            margin-top: 4px;
        }
    }
    .side-tab-component{
        min-height: 60px;
        display:flex;
        flex-direction: column;
        width: $width - 8px;
        box-sizing: border-box;
        background-color: white;
        border: 4px solid $color__base;

        &._left{
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        &._right{
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }        
    }
    

</style>
