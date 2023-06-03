<script setup>
    import RegistrationForm from "../components/RegistrationForm.vue";
    import ROUTES from "../constants/routes";
</script>

<template>
    <div>
        <div>
            SIGN IN PAGE
        </div>
        <RegistrationForm/>
        <router-link :to="ROUTES.SIGNUP">SIGNUP</router-link>
    </div>
</template>


<style>

</style>