<template >
        <div class="container">
            <div class="container mt-3 mb-3" id="">
                <h4>Seleziona la tipologia del ristorante:</h4>
                    <div class="form-check form-check-inline" v-for="(type,index) in types" :key="index">
                        <input class="form-check-input" type="checkbox" id="type" @click="setTypes(type.name_type)">
                        <label class="form-check-label" for="type"></label>
                        <span>{{ type.name_type }}</span>
                    </div>
            </div>
            <ul class="list-unstyled row">
                <li class="col-sm-6 col-md-3 d-flex justify-content-center p-3" v-for="(restaurant,index) in typesFilterFunc(store.typeFilter, restaurants)" :key="index"> 
                    <article class="card text-center mx-auto p-3 w-100 border-none" >
                        <div class="h-50 d-flex justify-content-center align-items-center">
                            <h1>{{ restaurant.name_restaurant }}</h1>
                        </div>
                        <div class="card-image">
                            <img class="img-fluid mb-3 mt-3" style="height: 15rem; object-fit:contain" :src="'http://127.0.0.1:8000/storage/' + restaurant.image_restaurant" alt="restaurant Image"> 
                        </div>
                        <p>
                            Tipo: 
                            <span v-for="(type, index) in restaurant.types" :key="index">
                                <span v-if="index == restaurant.types.length - 1">
                                    {{ type.name_type}}.  
                                </span>
                                <span v-else>
                                    {{ type.name_type}},
                                </span>
                            </span>
                        </p>
                        <p>Indirizzo: {{ restaurant.address_restaurant}}</p>
                        <button type="button" :data-restaurant-id="restaurant.id" @click="(e)=>clickHandler(e)" class="btn btn-info btn-menu">Visualizza il Menu</button>
                    </article>            
                </li>
            </ul>
        </div>
</template>

<script>
import { useState } from '@/state';
import { store } from '../store.js';
import axios from 'axios';

export default {
    name: 'AppRestaurant',
    data(){
        return{
            store,
            useState,
            types:null,
        };
        
    },
    setup() {
        const [restaurants, setRestaurants] = useState([]);
        const [targetType,setTargetType] = useState([]);
        return {
            restaurants, setRestaurants,
            targetType, setTargetType
        };
    },

    methods: {
        getTypes(){
            axios.get('http://127.0.0.1:8000/api/types', {
                params: {
                }
            })
            .then((response) => {
                console.log(response.data.results);
                // mi serve il this. per poter accedere ai data
                this.types=response.data.results;
                // console.log(response.data);
            })
            .catch(function (error) {
                console.warn(error);
            })
        },

        setTypes(type){
            const indexType=this.targetType.indexOf(type)
            if (indexType == -1 ){
                this.setTargetType([...this.targetType,type])
                this.store.typeFilter=this.targetType;
            }else{
                const newTypes = [...this.targetType]
                newTypes.splice(indexType, 1);
                this.setTargetType([...newTypes])
                this.store.typeFilter=this.targetType;
            }
            
        },

        getRestaurants() {
            axios.get('http://127.0.0.1:8000/api/restaurants')
                .then((response) => {
                    // handle success
                    console.log(response.data.results);
                    this.setRestaurants(response.data.results);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        },

        typesFilterFunc(filterValue, ary) {
            const newArray = [];
            if (filterValue.length === 0 || filterValue == '') {
                return ary;
            }
            ary.forEach(element => {
                const valAry = []
                for (let i = 0; i < element.types.length; i++) {
                    console.log(filterValue)
                    console.log(filterValue.findIndex((item)=>item == element.types[i].name_type))
                    if (filterValue.findIndex((item)=>item == element.types[i].name_type) < 0) {
                        break;
                    } else if (filterValue.findIndex((item)=>item == element.types[i].name_type) > -1){
                        valAry.push(element.types[i].name_type);
                    }
                }
                // // for (let i = 0; i < valAry.length; i++) {
                // //     if (filterValue.includes(valAry[i])!== true) {
                // //         break;
                // //     } else if (valAry.length -1 == i){
                // //         newArray.push(element);
                // //     }
                // // }
                // console.log(valAry)
                // if(valAry.some(item=> filterValue.includes(item))){
                //     newArray.push(element);
                // }
                const filterValueCopy = [...filterValue];
                if (filterValueCopy.length !== valAry.length) return;
                filterValueCopy.sort();
                valAry.sort();
                console.log(filterValueCopy);
                console.log(valAry);
                    for (let i = 0; i < filterValueCopy.length; i++) {
                        if (filterValueCopy[i] !== valAry[i]) return;
                    }
                    newArray.push(element);
            });
            console.log(newArray);
            return newArray;
        },
            clickHandler(e){
                this.store.restaurantTargetId = e.target.dataset.restaurantId;
                localStorage.setItem('restIdTarget', JSON.stringify(e.target.dataset.restaurantId))
                this.$router.push('/restaurant/dishes')
                //console.log(e.target.dataset.restaurantId);
            },
        },

    watch: {
        'store.typeFilter': {
            handler(newValue, oldValue) {
                console.log(this.store.typeFilter);
                this.getRestaurants();
            },
            deep: true,
        }
    },
    mounted() {
        this.getRestaurants();
        this.getTypes();
    }
}
</script>

<style lang="scss">
article:hover{
    border: 1px solid #00CCBC ;
}
</style>