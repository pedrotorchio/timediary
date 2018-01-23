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
            shown: false,
            docHeight: 800,
            topContainer: this.topPosition,
            footerHeight: 45,
            componentTitle: ''
        }
    },
    methods: {
        showComponent({component, title, routerPush}){
            this.componentTitle = title || '';
            this.component = component;

            const currRoute = this.$router.currentRoute;
            let alreadyHere = false;

            if(routerPush)
                alreadyHere = currRoute.name == routerPush.name || currRoute.path == routerPush.path;
            
            if(routerPush && !alreadyHere){
                this.$router.push(routerPush, this.show);
            }
            else
                this.show();
        },
        show(value=true){
            this.shown = value;
        }
    },
    computed:{
        maxHeight(){
            return this.docHeight - this.topContainer - this.footerHeight - 10;
        },
    },
    components:{
        SideTab
    },
    mounted(){
        this.docHeight = document.body.clientHeight || document.documentElement.clientHeight || document.documentElement.scrollHeight || 800;
        this.topContainer = this.$refs['side-tab-component-container'].getBoundingClientRect().top;
    }
} 
</script>
<template>
    <section class="root" :class="[`_${position}`]" :style='{top: `${topPosition}px`}'>
        <aside class="side-tab-container" :class="[!shown ? 'shown' : '', `_${position}`]" >
                <side-tab
                class='tab'
                
                v-for='(tab, i) in tabs' 
                :key='tab.uid'
                :title = "tab.title"            
                :side='side' 
                :position='position' 
                :tab='tab'
                :disabled='tab.component == null' 
                @click='showComponent'
                />
        </aside>
        <aside  class='side-tab-component elevation-24' :class="[shown ? 'shown' : '', `_${position}`]">
            <div class="header">
                <v-btn flat icon @click='show(false)'>
                    <v-icon>close</v-icon>
                </v-btn>
                <h2 class="side-tab-component-title">{{componentTitle}}</h2>
            </div>
            <div ref='side-tab-component-container' class="component-container"  :style='{maxHeight: `${maxHeight}px`}'>
                <component class="component" :is='component' @close='show(false)'></component>
            </div>
            <div class="footer" :style="{height: footerHeight}">

            </div>
        </aside>
    </section>
</template>
<style lang='scss' scoped>
    @import '../../assets/styles/config';

    .root{
        z-index: 999;
        position: fixed;
        &._left{
            left:0;
        }
        &._right{
            right:0;
        }
    }
    $width: 600px;
    
    .side-tab-container, .side-tab-component{
        
        transition-duration: .5s;
        transition-property: left, right;
        position: absolute;

        
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
            padding: 4px;
        }
    }
    .side-tab-component{
        min-height: 60px;
        
        width: $width - 8px;
        box-sizing: border-box;
        background-color: white;
        border: 4px solid $color__base;

        &._left{
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;

            .side-tab-component-title{
                text-align: right;
            }
            .header, .footer{
                flex-direction: row-reverse;
            }
        }
        &._right{
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;

            .side-tab-component-title{
                text-align: left;
            }
        }       
        .header{
            border-bottom:1px solid 
        }
        .footer{
            border-top: 1px solid;
        }
        .header, .footer{
            border-color: #326786;
            width: 100%;
            z-index: 99;
            box-shadow: 0 0px 2px rgba(0, 0, 0, 0.251);
            text-align: left;
            display: flex;
            align-items: center;
            justify-content: stretch;

            .btn{
                flex: 0 0 auto;
            }
            .side-tab-component-title{
                flex: 1 1 auto;
                padding: 0 8px;
            }
        }
        
        .component-container{
            overflow-y: scroll;
            
            &>.component{
                width: 95%;

                /deep/ .stepper{
                    box-shadow: none;
                }
            }
        }
        /deep/ .stepper__header{
            justify-content: center !important;
        }
    }
    

</style>
