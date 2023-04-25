<script lang="ts">
  export let nameTag:string;
  export let type:string = "text";
  export let name:string;
  export let inputValue:string;

  type TypeAction = {
    type:string
  }
const typeAction = (node: TypeAction) =>{
  node.type = type
}
</script>

<div class="relative mb-4">
  <label for="{name}" class="leading-7 text-sm text-gray-600">
    {nameTag}
    </label>
  <input
    use:typeAction
    id="{name}"
    name="{name}"
    value="{inputValue}"
    required
    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  />
</div>
