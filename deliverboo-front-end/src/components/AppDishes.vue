<template >
    <div class="container position-relative">
        <div v-if="showAddToCartNotification" class="alert alert-success position-fixed z-3 top-0 start-50 translate-middle-x p-3 m-3" role="alert">
      Prodotto aggiunto al carrello!
    </div>
        <article v-for="(rest,index) in restaurant" :key="index" class="card text-center mx-auto p-4 m-4" >
            <h1>
                {{ rest.name_restaurant }}
            </h1>
            <div class="card-image mt-3">
                <img class="img-thumbnail" :src="'http://127.0.0.1:8000/storage/' + rest.image_restaurant" alt="Dish Image">
            </div>
                <p class="mt-3">
                    Tipo: 
                    <span v-for="(type, index) in rest.types" :key="index">
                        <span v-if="index == rest.types.length - 1">
                            {{ type.name_type}}.  
                        </span>
                        <span v-else>
                            {{ type.name_type}},
                        </span>
                    </span>
                </p>
                <p>Indirizzo: {{ rest.address_restaurant}}</p>
        </article>
        

<ul class="list-unstyled row">
    <li v-for="(dish, index) in dishes" :key="index" class="col-sm-6 col-md-3 d-flex justify-content-center px-auto py-3"> 
        <article class="card text-center p-3 w-100">
        <div class="h-50 d-flex justify-content-center align-items-center">
            <h2>{{ dish.name }}</h2>
        </div>
        <div class="card-image">
          <img class="img-fluid mb-3 mt-3" style="height: 15rem; object-fit:contain" :src="'http://127.0.0.1:8000/storage/' + dish.img_dish" alt="Dish Image"> 
        </div>
        <p class="text-start">Prezzo: €{{ dish.price }}</p>
        <p class="text-start">Ingredienti: {{ dish.ingredients }}</p>
        <p class="text-start">Disponibilità: {{ dish.available ? 'Si' : 'No' }}</p>  
        <button type="button" :data-dish-id="dish.id" @click="addClickHandler(dish); showAddToCartNotification = true" class="btn btn-menu btn-info btn-sm">
          <i class="fas fa-shopping-cart fa-sm"></i> <span class="ms-2">Aggiungi al carrello</span>
        </button>
      </article>
    </li>
    </ul>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Carrello</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="list-group" v-if="dishesCartList.length == 0">
                    <li class="list-group-item">
                        <p class="text-muted">Il carrello è vuoto</p>
                    </li>
                </ul>
                <ul class="list-group" v-else>
                    <li v-for="(dishCart, index) in dishesCartList" :key="index" class="list-group-item">
                        <div class="d-flex align-items-center">
                            <p class="me-2 my-0">{{ dishCart.name }}</p>
                            <div class="d-flex justify-content-center input-group my-5 text-center">
                                <button data-count-type="+" :data-dish-Cart-id="dishCart.id" class="input-group-text " @click="(e)=>dishQuantityHandler(e)">+</button>
                                <input data-count-type="input" type="text" :data-dish-Cart-id="dishCart.id" class="w-25" @input="(e)=>dishQuantityHandler(e)" :value=" dishCart.quantity" >
                                <button data-count-type="-" :data-dish-Cart-id="dishCart.id" class="input-group-text" @click="(e)=>dishQuantityHandler(e)">-</button>
                            </div>
                            <p class="me-2 my-0">{{ '€'+dishCart.price }}</p>
                            <button type="button"  :data-dish-id="dishCart.id" @click="(e)=>removeClickHandler(e)" class="btn btn-danger btn-sm my-5">X</button>
                        </div>
                    </li>
                </ul>
                <p class="mt-3">Totale: €{{ pricesSumFunc() }}</p>
                <button :class="dishesCartList.length == 0 ? 'd-none' : 'btn btn-success'" @click="(e)=>confCart(e)">Vai al pagamento</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useState } from '@/state';
import { store } from '../store.js';
import axios from 'axios';
import { ref } from 'vue'; // Importa il modulo 'ref' per la gestione reattiva

export default {
name: 'AppDishes',
data() {
  return {
    dishes: null,
    store,
    useState,
    restaurant: null,
    dishesCartList: [],
    showAddToCartNotification: false,
    cartItemCount: 0, // Aggiungi questa variabile per tenere traccia del numero di elementi nel carrello
  };
},
// setup() {
//     const [restaurants, setRestaurants] = useState([]);
//     return {
//         restaurants, setRestaurants
//     };
// },
methods: {
  // Rimuovi il metodo restaurantIdManager se non è utilizzato

  getDishes(id) {
    axios
      .get(`http://127.0.0.1:8000/api/restaurants/${id}/dishes`)
      .then((response) => {
        this.dishes = response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getRestaurant(id) {
    axios
      .get(`http://127.0.0.1:8000/api/restaurants/${id}`)
      .then((response) => {
        this.restaurant = response.data.results;
      })
      .catch((error) => {
        console.log(error);
      });
  },

    confCart(e) {
        localStorage.setItem('cart', JSON.stringify(this.dishesCartList));
        localStorage.setItem('totPrice', JSON.stringify(this.pricesSumFunc()));
        this.updateCartCount();
        const body = e.target.closest('body');
        console.log(body);
        body.removeAttribute('style');
        // div.removeAttribute('aria-modal');
        // div.removeAttribute('role');
        // div.classList.remove('show');
        // console.log(div);
        this.$router.push('/ordine');
    },

  addClickHandler(dish) {
    const checkDish = this.dishesCartList.findIndex((element) => element.id === dish.id);
    if (checkDish > -1) {
      this.dishesCartList[checkDish].quantity += 1;
    } else {
      this.dishesCartList.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1,
      });
    }
    this.updateCartCount();

    // Imposta la notifica "Prodotto aggiunto al carrello!" su true
    this.showAddToCartNotification = true;

    // Reimposta la notifica su false dopo 3 secondi solo se attualmente è visibile
    if (this.showAddToCartNotification) {
      setTimeout(() => {
        this.showAddToCartNotification = false;
      }, 3000);
    }
  },

  removeClickHandler(e) {
    const dishIdToRemove = e.target.dataset.dishId;
    const index = this.dishesCartList.findIndex(
      (dish) => dish.id.toString() === dishIdToRemove
    );
    if (index !== -1) {
      this.dishesCartList.splice(index, 1);
      this.updateCartCount();
    }
  },

  

  dishQuantityHandler(e) {
const dishId = e.target.dataset.dishCartId;
const countType = e.target.dataset.countType;
const index = this.dishesCartList.findIndex((dish) => dish.id.toString() === dishId);

if (index !== -1) {
  if (countType === "+") {
    this.dishesCartList[index].quantity++;
  } else if (countType === "-" && this.dishesCartList[index].quantity > 1) {
    this.dishesCartList[index].quantity--;
  }
  this.updateCartCount();
}
},

  pricesSumFunc() {
    return this.dishesCartList
      .reduce((acc, dish) => acc + dish.price * dish.quantity, 0)
      .toFixed(2);
  },

  updateCartCount() {
    const totalItems = this.dishesCartList.reduce((acc, dish) => acc + dish.quantity, 0);
    this.cartItemCount = totalItems;
    localStorage.setItem('cartItemCount', totalItems);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  },
},

watch: {
  dishesCartList: {
    handler(newValue, oldValue) {
      console.log(newValue);
      this.updateCartCount();
    },
    deep: true,
  },
},
mounted() {
  let restId = JSON.parse(localStorage.getItem('restIdTarget'));
  this.getRestaurant(restId);
  this.getDishes(restId);
  // Inizializza il conteggio del badge del carrello quando il componente viene montato
  this.cartItemCount = localStorage.getItem('cartItemCount') || 0;
  setTimeout(() => {
    this.showAddToCartNotification = false;
  }, 3000);
},
};
</script>


<style lang="scss">
.alert {
left: 50%;
transform: translateX(-50%);
}

</style>