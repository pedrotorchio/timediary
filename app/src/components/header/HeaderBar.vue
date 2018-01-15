<script>
import {mapState} from 'vuex';
  export default {
    name: 'HeaderBar',
    props: [],
    computed:{ 
        ...mapState({
          displayName: state=>state.account.info.pers_display_name,
          accountImage: state=>state.account.info.pers_picture_url
        })
    },
    methods:{
      logout(){
        this.$store.dispatch('logout');
      }
    }
  }
</script>

<template id="">
  <header>
    <div class="left">

    </div>
    <div class="right">
        <div class="column center">
          <h2>{{displayName}}</h2>
          <span title="Sair do TimeDiary" @click='logout' class="clickable">Sair</span>
        </div>
        <div class="img">
          <img :title="displayName" :src="accountImage" alt="">
        </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
  $height: 128px;
  header{
      padding: 5px 15px;
      display: flex;
      flex-direction: row;
  }
  h2{
    margin: 0;
  }
    .left{
        flex: 1 1 auto;
    }
    .right{
        display: flex;
        flex-direction: row;
        
        .img{
            position: relative;
            width: $height;
            padding-bottom: $height;

            img{
              position: absolute;
              height: 100%;
              width: 100%;
              top: 0; left: 0;
              border-radius: 100%;
            }
        }
    }
</style>
