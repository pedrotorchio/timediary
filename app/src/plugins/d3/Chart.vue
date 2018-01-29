<script>
export default {
  props: {
    margin:{
      type:Object,
      default: ()=>({left: 0, right: 0, top: 0, bottom: 0})
    },
    width:{
      default: '100%'
    },
    height:{
      default: 'auto'
    }
  },
  data(){
    return {
      cWidth: null,
      cHeight: null
    }
  },
  methods: {
    range(extent, step = 1){
      let steps = [];
      for(let i = extent[0]; i <= extent[1] ; i+=step)
          steps.push(i);

      return steps;
    },
    onResize() {
      
      this.cWidth = this.$el.offsetWidth;
      this.cHeight = this.$el.offsetHeight;

    },
  },
  // watch:{
  //   innerSizes: function (){
  //     this.initialize();
  //     this.update();
  //   }
  // },
  computed: {
    innerSizes() {
      const width = this.cWidth - this.margin.left - this.margin.right;
      const height = this.cHeight - this.margin.top - this.margin.bottom;

      return {
        width,
        height
      };
    },
    
  },
  mounted() {
    this.$el.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    this.$el.removeEventListener('resize', this.onResize);
  }
  
}
</script>
