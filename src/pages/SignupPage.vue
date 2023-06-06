<script setup>
    import { inject, ref } from "vue";
    import { useRouter } from "vue-router";
    import RegistrationForm from "../components/RegistrationForm.vue";
    import ROUTES from "../constants/routes";

    const pb=inject('pb');
    const router=useRouter();
    const errors= ref([]);

    const onRegister=(dto)=>{
        //dto - data transfer object
        errors.value=[];
        console.log('onRegister, dto - ', dto);        
        if(!dto.password|| dto.password.length===0){
            errors.value=['password required'];
        }else{            
            pb.collection('users').create({
                username:dto.username,
                password:dto.password,
                passwordConfirm:dto.password

            }).then((result)=>{
                pb.authStore.save(result.id, result);
                console.dir(result);
                if(window.confirm('user created with id ' + result.id)){
                    router.replace({path:ROUTES.INDEX})
                }
            }).catch((err)=>{
                const errorData=err.data.data;
                console.dir(err);
                if (errorData){
                    for (let item in errorData) {
                        const data=errorData[item]
                        errors.value.push(data.message);                    
                    }
                }else{
                    errors.value.push(err.message);  
                }
                // errors.value=[err.toString()];
            });
        }

    }

</script>

<template>
    <div>
        <div>
            SIGN UP PAGE
        </div>
        <RegistrationForm :registration="true" :errors="errors" @register="onRegister"/>
        <router-link :to="ROUTES.SIGNIN">SIGNIN</router-link>
    </div>
</template>


<style>

</style>