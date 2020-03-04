<template>
    <b-container>
        <b-row>
            <b-col sm="12" md="4">
                <b-card
                    style="max-width: 30rem;"
                    class="mb-2 mt-3"
                    title="1) Fetch and Order"
                >
                    <b-card-text>
                        Usando <b-link href="https://randomuser.me/">https://randomuser.me/</b-link> como fuente de data, crear una función que retorne un arreglo:
                        <hr>
                        <b-list-group>
                            <b-list-group-item>Debe retornar 10 personas</b-list-group-item>
                            <b-list-group-item>Las personas deberán estar ordenadas por nombre</b-list-group-item>
                        </b-list-group>
                    </b-card-text>
                </b-card>

                <b-button v-if="orderedPersons" variant="primary" @click="executeFetchAndOrder" >Fetch</b-button>
            </b-col>

            <b-col sm="12" md="8">
                <b-row v-if="orderedPersons === null">
                    <b-jumbotron
                        style="width: 100%;"
                        class="mb-2 mt-3"
                        header="Fetch and Order"
                        lead="Haz click en el boton para iniciar el request"
                    >
                        <hr class="my-4">
                        <b-button variant="primary" @click="executeFetchAndOrder">More Info</b-button>
                    </b-jumbotron>
                </b-row>

                <b-row v-else>
                    <b-card
                        style="width: 100%;"
                        class="mb-2 mt-3"
                    >

                        <b-row>
                            <b-col sm="12" md="4">
                                <b-list-group v-b-scrollspy:listgroup-ex>
                                    <b-list-group-item
                                        v-for="(item, index) in orderedPersons"
                                        :key="index"
                                        :href="`#item-${index}`"
                                    >
                                        {{ `${item.name.first} ${item.name.last}`}}
                                    </b-list-group-item>
                                </b-list-group>
                            </b-col>

                            <b-col sm="12" md="8">
                                <div id="listgroup-ex" style="position:relative; height:500px; overflow-y:auto">
                                    <b-card
                                        v-for="(item, index) in orderedPersons"
                                        :key="index"
                                        :id="`item-${index}`"
                                    >
                                        <b-card-header>
                                            {{ `${item.name.first} ${item.name.last}` }}
                                        </b-card-header>

                                        <b-row no-gutters>
                                            <b-col md="4">
                                                <b-card-img :src="item.picture.medium" class="rounded-0"></b-card-img>
                                            </b-col>

                                            <b-card-body md="8">
                                                <ul>
                                                    <li>Gender: {{ item.gender }}</li>
                                                    <li>Country: {{ item.location.country }} </li>
                                                    <li>City: {{ item.location.city }}</li>
                                                    <li>Phone: {{ item.phone }}</li>
                                                </ul>
                                            </b-card-body>
                                        </b-row>

                                    </b-card>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { main } from './fetchAndOrder.js';

export default {
    data() {
        return {
            main,
            orderedPersons: null,
            apiEndpoint: 'https://randomuser.me/api/?results=10',
        };
    },
    methods:{
        async executeFetchAndOrder() {
            this.orderedPersons = await main(this.apiEndpoint);
        },
    },
}
</script>
