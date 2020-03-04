<template>
    <b-container>
        <b-row>
            <b-col sm="12" md=4>
                <b-card
                    style="max-width: 30rem;"
                    class="mb-2 mt-3"
                    title="3) Fetch and Count"
                >
                    <b-card-text>
                        Usando <b-link href="https://randomuser.me/">https://randomuser.me/</b-link> como fuente de data, crear function, que retornará un char/string:
                        <hr>
                        <b-list-group>
                            <b-list-group-item>Deberá obtener 5 personas.</b-list-group-item>
                            <b-list-group-item>En base a los nombres deberá calcular cual es la letra más utilizada.</b-list-group-item>
                        </b-list-group>
                    </b-card-text>

                    <b-card-footer>
                        <b-button variant="primary" @click="executeFetchAndCount">Fetch info</b-button>
                    </b-card-footer>
                </b-card>
            </b-col>

            <b-col sm="12" md="8">
                <b-card class="mb-2 mt-3">
                    <div v-if="names.length === 0">
                        <h4>Nada que mostrar. Click en fetch para consultar data</h4>
                    </div>

                    <b-list-group v-else>
                        <b-list-group-item v-for="(item, index) in names" :key="index">
                            {{ item }}
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
                <b-card class="mb-2 mt-3">
                    <div class="background-textInfo">
                        <code v-if="mostUserLetter === null">
                            Actualice la data para calcular que letra es mas empleada en los nombres
                        </code>
                        <code v-else>
                            {{ mostUserLetter }}
                        </code>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { main } from './fetchAndCount.js';

export default {
    data() {
        return {
            apiEndpoint: 'https://randomuser.me/api/?results=5',
            names: [],
            mostUserLetter: null,
        };
    },
    methods: {
        async executeFetchAndCount() {
            const letterCount = await main(this.apiEndpoint);
            this.mostUserLetter = letterCount.maxLetterOcurrency;
            this.names = letterCount.fullNames;
        },
    }
}
</script>

<style scoped>
.background-textInfo{
    background-color: rgb(219, 219, 219);
    padding: 0.75rem;
}
</style>
