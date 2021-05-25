<template>
  <div class="home">
    <HomePage msg="Adam's Insider Page Built With Vue"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'

export default {
  name: 'Home',
  components: {
    HomePage,
  }
}
</script>
