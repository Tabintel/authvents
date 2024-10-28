<script lang="ts">
  import { onMount } from "svelte";
  import faceIO from "@faceio/fiojs";
  import { PUBLIC_FACEIO_PUBLIC_ID } from "$env/static/public";
  import { EyeIcon, Calendar, Locate } from "lucide-svelte";

  import Header from "../../components/Header.svelte";
  import FacialAuthenticationModal from "../../components/FacialAuthenticationModal.svelte";

  let showAuthModal: boolean = false;
  const OnAuthenticationModal = (): void => {
    showAuthModal = true;
  };
  const offAuthModal = (): void => {
    showAuthModal = false;
  };

  type ticketType = {
    date: string;
    title: string;
    id?: string;
    location: string;
    description: string;
    price: string;
  };
  let faceio: {
    authenticate: (arg0: { locale: string; token: any }) => any;
  };

  // Run only in the browser
  onMount(() => {
    console.log(PUBLIC_FACEIO_PUBLIC_ID);

    // Initialize faceIO inside onMount to avoid SSR issues
    faceio = new faceIO(PUBLIC_FACEIO_PUBLIC_ID);
  });
  const authenticateNewUser = async () => {
    try {
      const userInfo = await faceio.authenticate({
        locale: "auto",
        token: "fioaf212",
      });
      localStorage.setItem("isAuthenticated", JSON.stringify("true"));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      console.log(userInfo);
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  let bookedTickets: ticketType[] = [];
  let isAuthenticated: boolean = false;
  onMount(() => {
    let storageBookedTickets: string | null =
      localStorage.getItem("bookedTickets");
    if (storageBookedTickets) {
      bookedTickets = JSON.parse(storageBookedTickets);
    }
    const authStatus = localStorage.getItem("isAuthenticated");
    isAuthenticated = authStatus === "true";
  });
  const handleViewTicketDetails = (data: ticketType) => {
    if (isAuthenticated) {
      alert(
        `You ticket Info is
  Ticket Name:${data.title}
  Ticket Date:${data.date}
  Ticket Price:${data.price}
  `
      );
    } else {
      showAuthModal = true;
    }
  };
</script>

<!-- Render child routes when session is available -->
<main class="bg-[#F4F4F9] pb-20 min-h-[100vh]">
  {#if showAuthModal}
    <FacialAuthenticationModal
      {authenticateNewUser}
      modal={showAuthModal}
      {offAuthModal}
    />
  {/if}
  <Header />
  <div
    class="w-full max-w-[1200px] px-4 md:px-8 mx-auto mt-6 min-h-[600px] flex gap-8 flex-col"
  >
    <h2 class="text-2xl family2 md:text-3xl">My Tickets</h2>

    <div
      class="w-full flex flex-col gap-4 items-start p-8 rounded-lg bg-[#1A2E5A] text-white"
    >
      <h3 class="text-xl family2 md:text-2xl">Verify your Identity</h3>
      <h5 class="text-sm md:text-base">
        Please authenticate to view your tickets and event details
      </h5>
      <!-- <h2 class="text-2xl family2 md:text-4xl">${amount}</h2> -->
      {#if !isAuthenticated}
        <button
          on:click={OnAuthenticationModal}
          class="px-8 py-3 hover:opacity-40 family2 text-sm md:text-base rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
          ><EyeIcon size={20} />Authenticate</button
        >
      {/if}
    </div>
    <div
      class="w-full flex flex-col gap-8 p-8 rounded-lg bg-[#fff] shadow text-dark"
    >
      <h2 class="text-xl md:text-2xl">
        <span class="family2">Recent Tickets</span>

        <span class="text-base block pt-2 max-w-[450px]">
          Here is a list of your recent booked tickets
        </span>
      </h2>
      <div class="w-full">
        {#if bookedTickets.length === 0}
          <div class="w-full text-center">
            <span class="family2 text-xl">You have no booked tickets</span>
          </div>
        {:else}
          <div class="w-full grid sm:grid-cols-2 gap-6 lg:grid-cols-3">
            {#each bookedTickets as data}
              <div
                class="cursor-pointer w-full bg-white border flex p-6 rounded-lg flex-col gap-4"
              >
                <div class="w-full flex flex-col gap-2">
                  <h3 class="family2 text-lg md:text-xl">{data.title}</h3>
                  <div class="flex items-center text-xs md:text-sm gap-2">
                    <Calendar size={16} />
                    {data.date}
                  </div>
                  <div class="flex items-center text-xs md:text-sm gap-2">
                    <Locate size={16} />
                    {data.location}
                  </div>
                </div>
                <h4 class="text-sm max-w-[300px] md:text-base">
                  <!-- {data.description} -->
                  Ticket Code:
                  {#if isAuthenticated}
                    <span class="family2">{data.id}</span>
                  {:else}
                    <span class="family2">******</span>
                  {/if}
                </h4>
                <div class="w-full flex items-center justify-between gap-4">
                  <span class="text-xl family2">
                    ${data.price}
                  </span>
                  <button
                    on:click={() => handleViewTicketDetails(data)}
                    class="px-4 py-2 hover:opacity-40 text-sm md:text-sm rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
                    >View Ticket</button
                  >
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>
