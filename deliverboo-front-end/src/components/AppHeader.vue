<template>
    <header class="header-with-border">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container ">
            <router-link class="navbar-brand" to="/" exact>DeliverBoo</router-link>
            <div class="d-flex align-items-center">
            <router-link class="navbar-brand" to="/restaurants" @click="resetCartCount">Ristoranti</router-link>
            <a class="navbar-brand" href="http://127.0.0.1:8000/login">Area ristoratore</a>
            <button v-if="showCart" class="btn my_btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <i class="fas fa-shopping-cart fa-sm w-100"></i>
            </button>
            </div>
</div>
        </nav>
    </header>
    </template>

<script>
    export default {
    name: 'AppHeader',
    data() {
      return {
        cartItemCount: 0,
        showCart: false // Aggiunto il flag per gestire la visibilità del carrello
      };
    },
    mounted() {
      this.updateCartItemCount();
      window.addEventListener('cartUpdated', this.updateCartItemCount);
      // Aggiorna showCart in base alla route attiva durante il montaggio del componente
      this.updateShowCartFlag(this.$route);
    },
    beforeUnmount() {
      window.removeEventListener('cartUpdated', this.updateCartItemCount);
    },
    watch: {
      $route(to, from) {
        this.updateShowCartFlag(to);
      }
    },
    methods: {
      updateCartItemCount() {
        const itemCount = localStorage.getItem('cartItemCount');
        this.cartItemCount = itemCount ? parseInt(itemCount) : 0;
        },
        updateShowCartFlag(route) {
        this.showCart = route.name === 'dishes'; // Mostra il carrello solo nella vista dei piatti
        },
    }
  };
  </script>
  
  <style lang="scss">
  .header-with-border {
    border-bottom: 5px solid #00CCBC; /* Aggiungi il bordo verde acqua nella parte inferiore */
  }
  button.my_btn{
    background-color: #00CCBC;
  }
  button.my_btn:hover{
    color: white;
    background-color: #00CCBC;

  }

  </style>
  