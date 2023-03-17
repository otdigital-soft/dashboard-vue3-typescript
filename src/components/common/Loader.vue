<template>
  <div :class="{'loader-active': loading}" class="loader">
    <div class="loader-spin" />
  </div>
</template>

<script setup lang="ts">

defineProps({
  loading: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  visibility: hidden;
  transition: visibility 0s, opacity 0.3s linear;
  /* border-radius: 4px; */
  background: rgba(255, 255, 255, 0.5);
}
.loader-active {
    visibility: visible;
    opacity: 1;
}

.loader-spin,
.loader-spin:after {
  border-radius: 50%;
  width: 80px;
  height: 80px;
}

.loader-spin {
  font-size: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0, 0, 0, 0.2);
  border-right: 1.1em solid rgba(0, 0, 0, 0.2);
  border-bottom: 1.1em solid rgba(0, 0, 0, 0.2);
  border-left: 1.1em solid #4c6efc;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>
