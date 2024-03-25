<template >
    <footer>
        <section class="upper-footer d-flex justify-content-evenly py-4">
            <div class="d-flex flex-column">
                <span class="fw-bold fs-5 mb-2 text-white">Scopri Deliverboo</span>
                <a class="text-decoration-none" href="*">Investitori</a>
                <a class="text-decoration-none" href="/chisiamo">Chi siamo</a>
                <a class="text-decoration-none" href="/">Ristoranti</a>
                <a class="text-decoration-none" href="*">Altro</a>
                <a class="text-decoration-none" href="*">Pressroom</a>
                <a class="text-decoration-none" href="*">Programmazione</a>
                <a class="text-decoration-none" href="*">Design</a>
                <a class="text-decoration-none" href="*">Lavora con noi</a>
                <a class="text-decoration-none" href="*">Diventa nostro partner</a>
            </div>

                <div class="d-flex flex-column">
                    <span class="fw-bold fs-5 mb-2 text-white">Note legali</span>
                    <a class="text-decoration-none" href="*">Termini & Condizioni</a>
                    <a class="text-decoration-none" href="*">Informativa sulla privacy</a>
                    <a class="text-decoration-none" href="*">Cookies</a>
                    <a class="text-decoration-none" href="*">Classificazione dei partner</a>
                    <a class="text-decoration-none" href="*">Richieste da parte delle Auotorità Pubbliche</a>
                </div>

                <div class="d-flex flex-column">
                    <span class="fw-bold fs-5 mb-2 text-white">Aiuto</span>
                    <a class="text-decoration-none" href="*">Contatti</a>
                    <a class="text-decoration-none" href="*">FAQ</a>
                    <a class="text-decoration-none" href="*">Tipi di cucina</a>
                </div>
        </section>
        <section class="bottom-footer d-flex justify-content-between align-items-center pb-5">

            <div>
                <span class="text-white">&#169 Copyright 2023 - 2024</span>
            </div>

            <div class="ps-2">
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-square-x-twitter"></i>
                <i class="fa-brands fa-youtube"></i>
            </div>

        </section>

    </footer>
</template>

<script>

</script>

<style lang="scss" scoped>
    footer {
        background-color: rgb(46, 51, 51);
    }

    .upper-footer {
        height: 80%;
    }

    .upper-footer a {
        text-decoration: none;
        margin-bottom: 0.2rem;
        color: white;
    }

    .upper-footer a:hover {
        color: rgb(0, 204, 188);
    }

    i {
        color: white;
        font-size: 1.5rem;
        margin-right: 1rem;
    }

    i:hover {
        color: rgb(0, 204, 188);
    }

    .upper-footer div {
        background-color: rgb(67, 72, 72);
        width: 20rem;
        padding: 1rem;
    }

    section.bottom-footer div:first-child span {
        margin-left: 143px;
    }

    section.bottom-footer div:last-child {
        margin-right: 143px;
    }



</style>