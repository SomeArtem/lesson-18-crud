<script setup>
    import { computed, inject, onMounted, ref, watch } from 'vue';
    import TodoItem from "../components/TodoItem.vue";
    import {parseLocalStorage, saveToLocalStorage} from '../utils/StorageUtils'
    import {useTodosStore} from "../store/todosStore"
    import { storeToRefs } from 'pinia';
    

    const domInputFile=ref(null);
    const isLoading=ref(false);
    const dombtnupload=ref(false);
    const isPreparing=ref(true);
    const allBooks=ref([]);

    const pb=inject('pb');
    const BooksCollection = pb.collection('Books');
    
    BooksCollection.getList(1,50).then((result)=>{
        console.log(result);
        allBooks.value=result.items;
        isPreparing.value=false;
    })

    const insertBooks = async (jsondata)=>{  
        console.log('jsondata', jsondata.books)
        for await (const book of jsondata.books) {
            await BooksCollection.create(book).then((record=>{
                console.log('record created',record);
                allBooks.value.push(record);
            })).catch((e)=>{
                console.log('catch>  ',e);
            }) ;                
        }        
    }

    const onUploadClick=()=>{
        console.log('BooksPage onUploadClick',domInputFile.value);
        domInputFile.value.oninput=()=>{
            // console.log('files', domInputFile.value.files);
            const input=domInputFile.value;
            const fileList = input.files;
            const selectedFile = fileList[0];
            const reader = new FileReader();

            console.log('selectedFile:', selectedFile);
            input.disabled = true;
            dombtnupload.value.disabled=true;

            reader.onload = async () => {
                const rawBooks = JSON.parse(reader.result.toString());
                console.log('selectedFile:', rawBooks);
                try {
                    await insertBooks({ books: rawBooks.slice(5, 6) });
                    // await insertBooks();
                } catch (e) {
                    console.log(e);
                }
                reader.onload = null;
                input.disabled = false;
                dombtnupload.value.disabled=false;
                input.oninput = null;
            };
            reader.readAsText(selectedFile);

        };
        domInputFile.value.click();
    }

    // const onKeyupEnter =()=>{
    //     console.log('onKeyupEnter',gettodotext.value);
    //     // todos.value.push(gettodotext.value);
    //     todoStore.creteTodo(gettodotext.value);
    //     inputText.value = "";
    // }


</script>



<template>
    <div v-if="isPreparing">
        Page Loading
    </div>
    <div v-else>
        <div v-if='allBooks.length>0'>
            BooksPage
            <div v-for="book in allBooks" :key="book.id">{{book.title}}</div>
        </div>
        <div >
            <!-- <div ></div> -->
            <input hidden ref="domInputFile" type="file" accept=".json"/>
            <button ref="dombtnupload" @click="onUploadClick">Upload</button>
            <div v-if="isLoading">In progess, wait please ...</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"BooksPage",

}
</script>

<style scoped>

</style>