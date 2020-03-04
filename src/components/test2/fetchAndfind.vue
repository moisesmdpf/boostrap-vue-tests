<template>
    <b-container>
        <b-row>
            <b-col sm="12" md=4>
                <b-card
                    style="max-width: 30rem;"
                    class="mb-2 mt-3"
                    title="2) Fetch and Find"
                >
                    <b-card-text>
                        Usando <b-link href="https://randomuser.me/">https://randomuser.me/</b-link> como fuente de data, crear function, que acepte como argumento una edad y retorne la data de la persona:
                        <hr>
                        <b-list-group>
                            <b-list-group-item>Retornará 1 sola persona.</b-list-group-item>
                            <b-list-group-item>La persona a retornar será mayor de la edad especificada como argumento</b-list-group-item>
                        </b-list-group>
                    </b-card-text>
                </b-card>
            </b-col>

            <b-col sm="12" md="8">
                <b-card class="mb-2 mt-3">
                    <b-form>
                        <b-form-group
                            id="input-group-1"
                            label="Edad"
                            label-for="input-1"
                            :invalid-feedback="invalidFeedback"
                            :valid-feedback="validFeedback"
                            description="Edad: Valor numerico que denota la longevidad de una persona en la vida"
                        >
                            <b-form-input id="input-1" v-model.number="edad" placeholder="Ingrese Edad" :state="state" trim/>
                        </b-form-group>
                        <b-button class="ml-auto" variant="primary" @click="executeFetchAndFind">Find</b-button>
                    </b-form>
                </b-card>

                <b-card class="mb-2 mt-3">
                    <div v-if="person === undefined">
                        <b-card-body>
                            <p>
                                No se encontraron resultados para la edad ingresada
                            </p>
                        </b-card-body>
                    </div>
                    <div v-else-if="person !== null">
                        <b-card-header>
                            {{ `${person.name.first} ${person.name.last}` }}
                        </b-card-header>

                        <b-row no-gutters>
                            <b-col md="4">
                                <b-card-img :src="person.picture.large" class="rounded-0"></b-card-img>
                            </b-col>

                            <b-card-body md="8">
                                <ul>
                                    <li>Age: {{ person.dob.age }}</li>
                                    <li>Gender: {{ person.gender }}</li>
                                    <li>Country: {{ person.location.country }} </li>
                                    <li>City: {{ person.location.city }}</li>
                                    <li>Phone: {{ person.phone }}</li>
                                </ul>
                            </b-card-body>
                        </b-row>
                    </div>
                    <div v-else>
                        <b-card-body>
                            <p>
                                Esperando por datos de ingreso...
                            </p>
                        </b-card-body>
                    </div>
                </b-card>

            </b-col>
        </b-row>
    </b-container>
</template>

<script>
/* eslint-disable no-console */
import { main } from './fetchAndfind.js';

export default {
    computed: {
        state() {
            return typeof this.edad === 'number';
        },
        invalidFeedback() {
            return !this.state ? 'Por favor ingrese una edad valida' : '';
        },
        validFeedback() {
            return this.state ? 'Correcto' : ''
        }
    },
    data() {
        return {
            edad: null,
            person: null,
            apiEndpoint: 'https://randomuser.me/api/?results=5',
        }
    },
    methods: {
        async executeFetchAndFind() {
            if (this.edad !== null && this.edad !== '') {
                this.person = await main(this.apiEndpoint, this.edad);
            } else {
                alert('Indica una edad');
            }
        },
    }
}
</script>
