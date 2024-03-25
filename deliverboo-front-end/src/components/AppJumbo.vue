<template>
    <div class="jumbo">
        <img class="img-fluid" src="../../public/food.jpg" alt="jumbo" >
        <div class="centered">
            <h1 class=""> Benvenuto su Deliverboo! </h1>
            <h2 class="d-none d-md-block">Siamo qui per portare i tuoi piatti preferiti direttamente a casa tua. </h2>
            <a class="" href="/restaurants"> <button class="btn mt-3 btn-sm ">Visualizza tutti i ristoranti a Milano!</button></a>
        </div> 
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    div.jumbo{
            position: relative;
            text-align: center;
            color: white;
        img{
            
            background-size: cover;
            filter: brightness(60%);
        }
        div.centered {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            a{
                text-decoration:none;
                color:white;
            }
            button{
                background-color:#00CCBC;
                // font-size:1.5rem;
            }
        }
    }
</style>