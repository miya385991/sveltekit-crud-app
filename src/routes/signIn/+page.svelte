<script lang="ts">
  import InputTag from "../../components/InputTag.svelte";
  import Button from "../../components/Button.svelte";
  import type { PageData, ActionData,Snapshot } from './$types';
  import Toasts from "../../components/Toasts.svelte";
  import { enhance, type SubmitFunction } from "$app/forms";
  import { loginStore } from "$lib/store/loginStore";
  import { goto } from "$app/navigation";

  export let form: ActionData;

  let errorMessage:string[]|undefined = [];
  let formData = {
  email:'',
  password:'',
  }
  export const snapshot:Snapshot = {
    capture:() => formData,
    restore:(value) =>(formData = value)
  }

  const submitLoginForm:SubmitFunction = ({form,data,action,cancel} )=> {
    return async({result,update})=>{
      console.log(result);
      
      switch(result.type){
        case 'success':
          goto('/home')
          $loginStore.status = true
          break
        case 'failure':
          errorMessage = result.data?.errorMessage
          break
      }
    }
  }

async function digestMessage(message:string) {
            const encoder = new TextEncoder();
            const data = encoder.encode(message);
            const hash = await crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(hash)).map(v=>v.toString(16).padStart(2,'0'));
        }

    
    let hash = digestMessage('text').then(hash=>console.log(hash))
    ;
    

</script>
{#if errorMessage}
<div class="absolute">
  {#each errorMessage as msg}
  <Toasts errorMessage={msg} />
  {/each}
</div>
{/if}

<form action="?/signIn" method="POST" use:enhance={submitLoginForm}>
  <section class="text-gray-600 body-font" >
    <div class="container px-5 py-24 mx-auto flex flex-row-reverse items-center">
    <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 class="title-font font-medium text-3xl text-gray-900">お待ちしておりましたサインインをお願い致します</h1>
      <p class="leading-relaxed mt-4">こちらはサインインページになります。アカウント作成されたユーザーはこちらからサインをお願いいたします。アカウントの作成をされていないお客様に関しましては右上のサインアップからお入りください。</p>
    </div>
    <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mr-auto w-full mt-10 md:mt-0">
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>

    <InputTag
      type="email"
      name="email"
      nameTag="メールアドレス"
      bind:inputValue="{formData.email}"
      />
      <InputTag
      type="password"
      name="password"
      nameTag="パスワード"
      bind:inputValue="{formData.password}"
      />

      <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
    </div>
  </div>
</section>
</form>