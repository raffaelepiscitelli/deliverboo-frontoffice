<template>
    <section class="container-fluid col-10 p-5" style="background-color: #f8f9fa;">
              <!-- Pulsante Indietro -->
              <div class="text-start mb-2">
            <button @click="goBack" class="button button--icon">
                <i class="fas fa-arrow-left"></i>
            </button>
        </div>
        <!-- Titolo Pagamento -->
        <h2 class="text-center mb-4">Pagamento</h2>
        <!-- Progress Bar -->
        <div class="progress mb-4">
            <div class="progress-bar bg-success" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

  

        <!-- Riepilogo dell'ordine -->
        <div class="mb-2 p-2" style="background-color: white;">
            <h3 class="text-center p-2">Riepilogo Ordine</h3>
            <ul class="list-group">
                <li class="list-group-item" v-for="(dishCart, index) in dishesCartList" :key="index" style="background-color: white;">
                    <div class="row">
                        <div class="col-6">
                            <span>{{ dishCart.name }}</span>
                        </div>
                        <div class="col-3">
                            <span>Quantità: {{ dishCart.quantity }}</span>
                        </div>
                        <div class="col-3">
                            <span>Prezzo: €{{ (parseFloat(dishCart.price) * parseInt(dishCart.quantity)).toFixed(2) }}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <p class="text-end mt-3 p-2"><strong>Totale: €{{ totalPrice }}</strong></p>
        </div>

        <!-- Drop-in UI per il pagamento -->
        <div class="mb-4 p-2" style="background-color: white;">
            <div id="dropin-container"></div>
        </div>

        <!-- Button Completa Pagamento -->
        <div class="text-end">
            <button id="submit-button" class="button button--small button--green">Completa Pagamento</button>
        </div>
    </section>
</template>

<script>
import { router } from '@/router';
import axios from 'axios';

export default {
    name: "appPagamento",
    data() {
        return {
            dishesCartList: [],
            totalPrice: 0
        };
    },
    mounted() {
    // Recupera il riepilogo dell'ordine dal localStorage
    this.dishesCartList = JSON.parse(localStorage.getItem('cart')) || [];
    this.totalPrice = JSON.parse(localStorage.getItem('totPrice')) || 0;

    let button = document.querySelector('#submit-button');

    braintree.dropin.create({
      authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
      selector: '#dropin-container',
    }, (err, instance) => {
      button.addEventListener('click', () => {
        instance.requestPaymentMethod((err, payload) => {
          if (err == null) {
            axios.post(`http://127.0.0.1:8000/api/order`, JSON.parse(localStorage.getItem('fullOrder')))
              .then((response) => {
                // handle success
                console.log(response.config.data);
                // Reindirizza alla Thank you page
                router.push({ name: 'thankyou' });
              })
              .catch((error) => {
                // handle error
                console.log(error);
              })
              .finally(() => {
                // always executed
              });
          }
        });
      });
    });
  },
    methods: {
        goBack() {
            router.go(-1); // Torna alla view precedente
        }
    }
}
</script>

<style lang="scss" scoped>
.button {
    cursor: pointer;
    font-weight: 500;
    left: 3px;
    line-height: inherit;
    position: relative;
    text-decoration: none;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    -webkit-appearance: none;
    -moz-appearance: none;
    display: inline-block;
}

.button--small {
    padding: 10px 20px;
    font-size: 0.875rem;
}

.button--green {
    outline: none;
    background-color: #64d18a;
    border-color: #64d18a;
    color: white;
    transition: all 200ms ease;
}

.button--green:hover {
    background-color: #8bdda8;
    color: white;
}

.button--icon {
    background-color: transparent;
    border: none;
    padding: 0;
    font-size: 1.5rem;
    color: #6c757d;
}

.button--icon:hover {
    color: #8a94a8;
}
</style>
