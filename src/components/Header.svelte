<script>
  import Logo from "./Logo.svelte";
  import { LogOutIcon } from "lucide-svelte";
   async function logout() {
        window.location.href = '/auth/signout';
    }
</script>

<div
  class="flex w-full h-[80px] sticky top-0 bg-[#1A2E5A] text-white items-center space-x-2"
>
  <div class="max-w-[1200px] px-3 w-full mx-auto flex items-center justify-between">
    <Logo />
    <div class="flex justify-end items-center">
      <button on:click={logout} class="hover:bg-[#fafafa] flex items-center justify-center rounded-lg hover:text-[#000] h-[40px] w-[50px]">
        <LogOutIcon class="h-5 w-5" />
        <span class="sr-only">Log out</span>
      </button>
    </div>
  </div>
</div>
