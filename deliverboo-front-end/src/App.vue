<script >
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

import axios from 'axios';

export default{
  components:{AppHeader,AppFooter}, 
  methods: {
    getRestaurants(){
            axios.get('http://127.0.0.1:8000/api/restaurants', {
                params: {
                }
            })
            .then((response) => {
                // console.log(response.data.results);
                // mi serve il this. per poter accedere ai data
                this.restaurants=JSON.stringify(response.data);
                // console.log(response.data);
            })
            .catch(function (error) {
                console.warn(error);
            })
        },
    },
    mounted(){
      this.getRestaurants();
    },
  }

</script>

<template>
  <AppHeader/>
  <router-view></router-view>
  <AppFooter/>
</template>

<style lang="scss">
  @import './styles/general.scss';
  
</style>
