<template>
    <b-container>
        <b-row>
            <b-col sm="12" md="4">
                <b-card
                    style="max-width: 30rem;"
                    class="mb-2 mt-3"
                    title="4) Fastest Starship"
                >
                    <b-card-text>
                        Usando <b-link href="https://swapi.co/">https://swapi.co/</b-link> como fuente de data, crear function, que retornará un string.
                        Dicha funcion deberá:
                        <hr>
                        <b-list-group>
                            <b-list-group-item>Aceptar un argumento tipo entero, que indicará la cantidad de pasajeros requerida.</b-list-group-item>
                            <b-list-group-item>Calcular sobre todas los starships</b-list-group-item>
                            <b-list-group-item>
                                Retornar el nombre la nave que coincida con los siguientes parámetros: <br>
                                <ul>
                                    <li>Tiene la capacidad para transportar los pasajeros indicados</li>
                                    <li>Puede viajar por al menos 1 semana.</li>
                                    <li>Fue parte de la trilogía original (4, 5, 6)</li>
                                </ul>
                            </b-list-group-item>
                            <b-list-group-item>Si más de una nave coincide con dichos parámetros, debera retornar la mas rapida</b-list-group-item>
                        </b-list-group>
                    </b-card-text>
                </b-card>
            </b-col>

            <b-col sm="12" md="8">
                <b-card class="mb-2 mt-3">
                    <b-form>
                        <b-form-group
                            id="input-group-1"
                            label="Cantidad de pasajeros"
                            label-for="input-1"
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description="Cantidad de pasajeros requerida para realizar viaje en la starship"
                        >
                            <b-form-input id="input-1" v-model.number="passengersCount" placeholder="Ingrese cantidad" :state="state" trim/>
                        </b-form-group>
                        <b-button class="ml-auto" variant="primary" @click="executeFetchAndFind">Find</b-button>
                    </b-form>
                </b-card>

                <b-card v-if="starshipName" class="mb-2 mt-3">
                    <p>
                        La nave (starship) mas rapida es: <b>{{ starshipName }}</b>
                    </p>

                    <b-card-footer>
                        <code>Para mejor detalle observar la vista en consola (F12)</code>
                    </b-card-footer>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { main } from './fastestShip.js';

export default {
    computed: {
        state() {
            return typeof this.passengersCount === 'number';
        },
        invalidFeedback() {
            return !this.state ? 'Ingrese un valor valido (Numerico)' : '';
        },
        validFeedback() {
            return this.state ? 'Correcto' : ''
        }
    },
    data() {
        return {
            passengersCount: null,
            starshipName: null,
            apiEndpoint: 'https://swapi.co/api/starships/',
        }
    },
    methods: {
        async executeFetchAndFind() {
            if (this.passengersCount !== null && this.passengersCount !== '') {
                this.starshipName = await main(this.apiEndpoint, this.passengersCount);
            } else {
                alert('Introduzca una cantidad de pasajeros');
            }
        },
    },
}
</script>
