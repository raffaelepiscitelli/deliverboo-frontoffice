<template>
    <section class="container-fluid col-10 p-5" style="background-color: #f8f9fa;">
      <div class="text-center">
        <i class="fas fa-check-circle fa-5x text-success"></i>
        <h2 class="p-3">Grazie per il tuo pagamento!</h2>
        <p class="mb-4">Il tuo ordine è stato completato con successo.</p>
        <!-- Puoi aggiungere ulteriori dettagli o azioni qui -->
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ThankYou'
  }
  </script>
  
  <style scoped>
  /* Stili CSS specifici per la Thank you page */
  .text-success {
    color: #28a745; /* colore verde di successo */
  }
  </style>
  