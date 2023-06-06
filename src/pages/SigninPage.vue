<script setup>
    import { inject, ref } from "vue";
    import RegistrationForm from "../components/RegistrationForm.vue";
    import ROUTES from "../constants/routes";

    const pb=inject('pb');
    const isSucksass=ref(false);

    const onLogin=(dto)=>{
        pb.collection('users').authWithPassword(
            dto.username,
            dto.password,
        ).then(()=>{
            isSucksass.value=true;
        });
    }
</script>

<template>
    <div v-if="!isSucksass">
        <div>
            SIGN IN PAGE
        </div>
        <RegistrationForm @login="onLogin"/>
        <router-link :to="ROUTES.SIGNUP">SIGNUP</router-link>
    </div>
    <div v-else>
        <div>you've been suxassfuly loaded</div>
        <router-link :to="ROUTES.INDEX">INDEX</router-link>
    </div>
</template>


<style>

</style>