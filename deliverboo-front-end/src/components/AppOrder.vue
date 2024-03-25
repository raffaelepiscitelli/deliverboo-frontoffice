<template>
    <div class="container-fluid col-10 p-3" style="background-color: #f8f9fa;">
      <div class="row justify-content-center">
        <div class="col-12 p-5">
          <!-- Pulsante Indietro -->
          <div class="text-start">
            <button @click="goBack" class="button button--icon">
              <i class="fas fa-arrow-left"></i>
            </button>
          </div>
          <h2 class="m-4">Ordine</h2>
          
          <!-- Progress Bar -->
          <div class="progress mb-4">
            <div class="progress-bar bg-success" role="progressbar" :style="{ width: progressWidth }" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
  
          <div class="mb-3">
            <label for="customer_name" class="form-label">Nome <span style="color: red">*</span>:</label>
            <input class="form-control" type="text" name="customer_name" id="customer_name" v-model="customer_name" placeholder="Inserisci il tuo nome">
            <span v-if="nameError" class="error-message">Il campo Nome è obbligatorio e deve contenere solo lettere.</span>
          </div>
          <div class="mb-3">
            <label for="customer_surname" class="form-label">Cognome <span style="color: red">*</span>:</label>
            <input class="form-control" type="text" name="customer_surname" id="customer_surname" v-model="customer_surname" placeholder="Inserisci il tuo cognome">
            <span v-if="surnameError" class="error-message">Il campo Cognome è obbligatorio e deve contenere solo lettere.</span>
          </div>
          <div class="mb-3">
            <label for="customer_address" class="form-label">Indirizzo <span style="color: red">*</span>:</label>
            <input class="form-control" type="text" name="customer_address" id="customer_address" v-model="customer_address" placeholder="Inserisci il tuo indirizzo">
            <span v-if="addressError" class="error-message">Il campo Indirizzo è obbligatorio.</span>
          </div>
          <div class="mb-3">
            <label for="customer_email" class="form-label">Email <span style="color: red">*</span>:</label>
            <input class="form-control" type="email" name="customer_email" id="customer_email" v-model="customer_email" placeholder="Inserisci la tua email">
            <span v-if="emailError" class="error-message">Il campo Email è obbligatorio e deve essere un'email valida.</span>
          </div>
          <div class="mb-3">
            <label for="customer_phone" class="form-label">Numero di telefono <span style="color: red">*</span>:</label>
            <input class="form-control" type="tel" name="customer_phone" id="customer_phone" v-model="customer_phone" placeholder="Inserisci il tuo numero di telefono">
            <span v-if="phoneError" class="error-message">Il campo Numero di telefono è obbligatorio e deve contenere solo numeri.</span>
          </div>
          <div class="mb-3 text-end">
            <button type="button" class="btn btn-primary m-2" @click="validateForm">
              Conferma il tuo ordine
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'AppOrder',
    data() {
      return {
        total_price: null,
        customer_address: null,
        customer_name: null,
        customer_surname: null,
        customer_phone: null,
        customer_email: null,
        date_and_time: null,
        progressWidth: '50%', // Initialize progress bar width to 50%
        nameError: false,
        surnameError: false,
        addressError: false,
        emailError: false,
        phoneError: false,
      }
    },
    methods: {
      validateForm() {
        this.nameError = !this.customer_name || !/^[A-Za-z]+$/.test(this.customer_name);
        this.surnameError = !this.customer_surname || !/^[A-Za-z]+$/.test(this.customer_surname);
        this.addressError = !this.customer_address;
        this.emailError = !this.customer_email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.customer_email);
        this.phoneError = !this.customer_phone || !/^[0-9]+$/.test(this.customer_phone);
  
        if (!this.nameError && !this.surnameError && !this.addressError && !this.emailError && !this.phoneError) {
          this.submitForm();
        }
      },
      submitForm() {
        const newDate = new Date();
        const currentDate = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  
        const order = { 
          "restaurant_id": JSON.parse(localStorage.getItem('restIdTarget')),
          "total_price": JSON.parse(localStorage.getItem('totPrice')),
          "customer_address" :  this.customer_address, 
          "customer_name" :  this.customer_name, 
          "customer_surname" :  this.customer_surname, 
          "date_and_time" :  currentDate, 
          "customer_phone" :  this.customer_phone, 
          "customer_email" :  this.customer_email,
          "order_dishes" : JSON.parse(localStorage.getItem('cart')),
        };
  
        localStorage.setItem('fullOrder', JSON.stringify(order));
  
        axios.post(`http://127.0.0.1:8000/api/order`, order)
        .then((response) => {
            // handle success
            console.log(response.config.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
        this.$router.push('/pagamento');
      },
      goBack() {
        this.$router.go(-1); // Torna alla view precedente
      }
    },
  }
  </script>

<style>
.error-message {
  color: red;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.25rem;
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
