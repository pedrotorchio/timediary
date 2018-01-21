<script>
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.cWidth = this.$el.offsetWidth;
      this.cHeight = this.$el.offsetHeight;
    },
  },
  watch:{
    width: function (){
      this.initialize();
      this.update();
    }
  },
  computed: {
    padded() {
      const width = this.cWidth - this.margin.left - this.margin.right;
      const height = this.cHeight - this.margin.top - this.margin.bottom;

      return {
        width,
        height
      };
    }
  }
  
}
</script>
