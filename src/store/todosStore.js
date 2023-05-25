import { ref } from 'vue';
import {parseLocalStorage} from '../utils/StorageUtils'

const LOCAL_KEY_TODOS = "todos";
const LOCAL_KEY_INP_TEXT = "input_text";

// const inputText = ref(parseLocalStorage(LOCAL_KEY_INP_TEXT, null));
const todos = ref(parseLocalStorage(LOCAL_KEY_TODOS,'[]'));

// const gettodocount=computed(()=> todos.value.length>5 ? 'МНОГА' : todos.value.length);

export {todos};