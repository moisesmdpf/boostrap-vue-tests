<template>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">{{ title }}</b-navbar-brand>

        <b-navbar-nav>
            <b-nav-text class="mg-nav">
                <router-link to='/'>Home</router-link>
            </b-nav-text>

            <b-nav-text class="mg-nav">
                <router-link to='/test1'>Test 1</router-link>
            </b-nav-text>

            <b-nav-text class="mg-nav">
                <router-link to='/test2'>Test 2</router-link>
            </b-nav-text>

            <b-nav-text class="mg-nav">
                <router-link to='/test3'>Test 3</router-link>
            </b-nav-text>

            <b-nav-text class="mg-nav">
                <router-link to='/test4'>Test 4</router-link>
            </b-nav-text>
        </b-navbar-nav>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
                <template v-slot:button-content>
                    <em>{{ user }}</em>
                </template>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            required: false,
            type: String,
            default: 'User',
        },
        title: {
            required: false,
            type: String,
            default: 'My App',
        },
    },
}
</script>

<style scoped>
.mg-nav {
    margin-left: 0.75rem;
    margin-right: 0.75rem;
}
</style>
