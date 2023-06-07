<script setup>
    import { computed, inject, onMounted, ref, watch } from 'vue';
    import TodoItem from "../components/TodoItem.vue";
    import {parseLocalStorage, saveToLocalStorage} from '../utils/StorageUtils'
    import {useTodosStore} from "../store/todosStore"
    import { storeToRefs } from 'pinia';
    import { useRoute, useRouter } from 'vue-router';

    const router=useRouter();
    const route=useRoute();
    

    const domInputFile=ref(null);
    const isLoading=ref(false);
    const dombtnupload=ref(false);
    const isPreparing=ref(true);
    const allBooks=ref([]);
    const pageIndex=ref(Number(router.currentRoute.value.query.page||1));
    const pagesMax=ref(0);
    console.log('pageIndex',pageIndex.value);

    const pb=inject('pb');
    const BooksCollection = pb.collection('Books');

    const onChangePage=(shift)=>{
        console.log('onChangePage', shift);
        pageIndex.value=pageIndex.value + shift;
        loadBooksOnPage();
    }
    
    const loadBooksOnPage = function(){
        BooksCollection.getList(pageIndex.value,5).then((result)=>{
        console.log(result);
        pagesMax.value=result.totalPages;
        console.log('totalPages ',result.totalPages);
        allBooks.value=result.items;
        isPreparing.value=false;
    }).then(()=>{
        router.replace({...router.currentRoute, query:{page:pageIndex.value}});
    })
    }


    onMounted(()=>{
        loadBooksOnPage();
    });


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
            <br>
            <br>
            <button :disabled="pageIndex===1" @click="onChangePage(-1)">prev</button>
            <button :disabled="pageIndex===pagesMax" @click="onChangePage(1)">next</button>
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