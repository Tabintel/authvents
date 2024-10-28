<script lang="ts">
  import { onMount } from "svelte";
  import faceIO from "@faceio/fiojs";
  import { PUBLIC_FACEIO_PUBLIC_ID } from "$env/static/public";

  let tab: boolean = true;
  const OnTab = (): void => {
    tab = true;
  };

  const CloseTab = (): void => {
    tab = false;
  };
  let email = "";
  let password = "";
  let confirmpassword = "";
  let faceio: {
    authenticate: (arg0: { locale: string; token: string }) => any;
    enroll: (arg0: {
      locale: string;
      token: string;
      payload: { email: string; pin: string };
    }) => any;
  };

  // Run only in the browser
  onMount(() => {
    // Initialize faceIO inside onMount to avoid SSR issues
    faceio = new faceIO(PUBLIC_FACEIO_PUBLIC_ID);
  });
  // console.log(faceio);

  const authenticateUser = async () => {
    if (email === "" && password === "") {
      return alert("Please enter the required the form fields");
    }
    try {
      const userInfo = await faceio.authenticate({
        locale: "auto",
        token: PUBLIC_FACEIO_PUBLIC_ID,
      });
      alert(
        `User Successfully Enrolled! Details:
           Unique Facial ID: ${userInfo.facialId}
           Enrollment Date: ${userInfo.timestamp}
           Gender: ${userInfo.details.gender}
           Age Approximation: ${userInfo.details.age}`
      );
      localStorage.setItem("userinfo", JSON.stringify(userInfo));
      // Navigate to home or dashboard after successful registration
      if (userInfo) {
        window.location.href = "/";
      }
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("isAuthenticated", JSON.stringify("true"));
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };
  const enrollNewUser = async () => {
    if (email === "" && password === "") {
      return alert("Please enter the required the form fields");
    } else if (password === confirmpassword) {
      return alert("Please enter the correct paswords");
    } else {
      try {
        const userInfo = await faceio.enroll({
          locale: "auto",
          token: PUBLIC_FACEIO_PUBLIC_ID,
          payload: {
            email: email,
            pin: password,
          },
        });
        localStorage.setItem("userinfo", JSON.stringify(userInfo));
        // Navigate to home or dashboard after successful registration
        if (userInfo) {
          window.location.href = "/";
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log(userInfo);
      } catch (error) {
        console.error("Enrollment failed:", error);
      }
    }
  };

  onMount(() => {
    const storeUserInfo = localStorage.getItem("userInfo");
    if (storeUserInfo) {
      window.location.href = "/";
    }
  });
</script>

<main
  class="bg-[#F4F4F9] relative min-h-[100vh] flex-col py-8 gap-8 flex items-center justify-center"
>
  <div class="h-[70px] fixed top-0 flex items-center w-full bg-[#fff] shadow">
    <div
      class="w-full max-w-[1300px] px-4 md:px-8 mx-auto flex items-center justify-between"
    >
      <a href={"/"} class="family2 text-lg md:text-2xl">AuthVents</a>

      <ol class="hidden md:flex items-center justify-end gap-12">
        <li class="text-base">
          <a href={"/my-tickets"} class="hover:text-gray-400">My Tickets</a>
        </li>
        <li class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full flex text-base family2 text-white bg-[#000] items-center justify-center"
          >
            V
          </div>
        </li>
      </ol>
    </div>
  </div>
  <div
    class="w-full max-w-[1200px] mt-12 px-8 mx-auto min-h-[500px] flex gap-12 flex-col md:items-center justify-center"
  >
    <div
      class="w-full p-6 bg-white md:w-[560px] shadow rounded-xl flex flex-col gap-8"
    >
      <h2 class="text-3xl md:text-4xl md:text-center family2">Authvent</h2>
      <div
        class="w-full p-1 rounded-md flex items-center bg-[#F4F4F9] justify-between gap-4"
      >
        <button
          on:click={OnTab}
          class={`flex-1 text-sm family2 ${tab ? "bg-white shadow" : ""} text-center  p-2 rounded-md cursor-pointer`}
        >
          Login
        </button>
        <button
          on:click={CloseTab}
          class={`flex-1 text-sm family2 ${!tab ? "bg-white shadow" : ""} text-center  p-2 rounded-md cursor-pointer`}
        >
          Sign Up
        </button>
      </div>
      {#if tab}
        <div class="w-full flex flex-col gap-4">
          <div class="w-full flex flex-col gap-4">
            <label for="" class="text-sm font-normal flex flex-col gap-2">
              Email
              <input
                type="email"
                bind:value={email}
                placeholder="Enter your email"
                class="w-full h-12 px-4 border text-sm"
              />
            </label>
            <label for="" class="text-sm font-normal flex flex-col gap-2">
              Password
              <input
                type="password"
                bind:value={password}
                placeholder="Enter your Password"
                class="w-full h-12 px-4 border text-sm"
              />
            </label>
          </div>
          <div class="flex w-full md:items-center md:justify-center">
            <button
              on:click={authenticateUser}
              class="px-8 py-3 w-full hover:opacity-40 family2 text-sm rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
            >
              Login
            </button>
          </div>
        </div>
      {:else}
        <div class="w-full flex flex-col gap-4">
          <div class="w-full flex flex-col gap-4">
            <label for="" class="text-sm font-normal flex flex-col gap-2">
              Email
              <input
                type="email"
                bind:value={email}
                placeholder="Enter your email"
                class="w-full h-12 px-4 border text-sm"
              />
            </label>
            <label for="" class="text-sm font-normal flex flex-col gap-2">
              Password
              <input
                type="password"
                bind:value={password}
                placeholder="Enter your Password"
                class="w-full h-12 px-4 border text-sm"
              />
            </label>
            <label for="" class="text-sm font-normal flex flex-col gap-2">
              Confirm Password
              <input
                type="password"
                bind:value={confirmpassword}
                placeholder="Confirm your Password"
                class="w-full h-12 px-4 border text-sm"
              />
            </label>
          </div>
          <div class="flex w-full md:items-center md:justify-center">
            <button
              on:click={enrollNewUser}
              class="px-8 py-3 w-full hover:opacity-40 family2 text-sm rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
            >
              Sign Up
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>
