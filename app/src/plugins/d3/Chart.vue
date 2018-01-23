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
      default: '100%'
    }
  },
  data(){
    return {
      cWidth: null,
      cHeight: null
    }
  },
  methods: {
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
      const width = this.width - this.margin.left - this.margin.right;
      const height = this.height - this.margin.top - this.margin.bottom;

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
    window.removeEventListener('resize', this.onResize);
  }
  
}
</script>
