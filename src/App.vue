<template>
  <div id="app">
    <Navbar title="Rootstack Test" :user="userName"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/common/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
  },
  data() {
    return {
      userName: 'Moises Daniel',
    };
  }
}
</script>
