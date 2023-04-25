<script lang="ts">
  import InputTag from "../../components/InputTag.svelte";
  import Button from "../../components/Button.svelte";
  import type { PageData, ActionData, Snapshot } from './$types';
  import Toasts from "../../components/Toasts.svelte";
  import { applyAction, enhance, type SubmitFunction } from '$app/forms';
  import {goto, invalidateAll} from '$app/navigation'
	import { loginStore } from '$lib/store/loginStore';

  // export let data:PageData;
  // export let form: ActionData;
  
  let errorMessage:string[]|undefined = [];

  let formData = {
    username:'',
    email:'',
    password:'',
    confirmation:''
  }
  export const snapshot:Snapshot = {
    capture:() => formData,
    restore:(value) =>(formData = value)
  }
  


  const submitLoginForm:SubmitFunction = ({form,data,action,cancel})=>{
    // const {username,email,password,confirmation} = Object.fromEntries(data)
    return async ({result, update})=>{
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
  
</script>
{#if errorMessage}
<div class="absolute">
  {#each errorMessage as msg}
  <Toasts errorMessage={msg} />
  {/each}
</div>
{/if}



<form action="?/signUp" method="POST" use:enhance={submitLoginForm} >
<section class="text-gray-600 body-font" >
  <div class="container px-5 py-8 mx-auto flex flex-wrap items-center">
    <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 class="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
      <p class="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
    </div>
    <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
      <!-- input -->
      <InputTag
      type="text"
      nameTag="ユーザーネーム"
      name="username"
      bind:inputValue="{formData.username}"
      />
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

      <InputTag
      type="password"
      name="confirmation"
      nameTag="確認パスワード"
      bind:inputValue="{formData.confirmation}"
      />

      <!-- end input -->
      <Button buttonName={'新規登録'}  />
    </div>
  </div>
</section>
</form>
