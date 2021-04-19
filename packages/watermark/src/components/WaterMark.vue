<template>
  <div class='water-mark' :style="watermark(text)"></div>
</template>

<script>
  export default {
    name: 'WaterMark',
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
      watermark(text) {
        if (!text) {
          return ''
        }
        const canvas = document.createElement('canvas')
        canvas.width = 300
        canvas.height = 200
        const ctx = canvas.getContext('2d')
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = '14px sans-serif'
        ctx.fillStyle = 'rgba(184, 184, 184, 0.15)'
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(-22.5 * Math.PI / 180)
        ctx.fillText(text, 0, -40)
        const base64Url = canvas.toDataURL()
        return `background-image: url(${base64Url})`
      }
    }
  }
</script>

<style scoped>
  .water-mark {
    width: 100%;
    height: 100%;
    position: fixed;
    inset: 0px;
    z-index: 9999;
    pointer-events: none;
    background-position: -32px 0;
  }
</style>
