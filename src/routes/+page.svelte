<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { Calendar, CircleDashed, Locate } from "lucide-svelte";
  type ticketType = {
    date: string;
    id: string;
    title: string;
    location: string;
    description: string;
    price: string;
  };
  const tickets: ticketType[] = [
    {
      title: "Summer Music Festival",
      date: "2024-06-15",
      location: "Central Park, New York",
      description:
        "A long music festival featuring top artists from around the world",
      id: "109340940add",
      price: "75",
    },
    {
      title: "Tech Conference 2024",
      date: "2024-09-22",
      location: "Convention Center, San-Fransico",
      description:
        "The biggest tech conference of the year, featuring keynotes from industry leaders",
      id: "229340940add",
      price: "299",
    },
    {
      title: "Food and Wine Expo",
      date: "2024-08-20",
      location: "Expo Hall, Chicago",
      description: "Tastes the finest cuisines and wines from top chefs",
      id: "209340940add",
      price: "50",
    },
  ];

  let userInfo: { name: string } | null = null;
  onMount(() => {
    const storeUserInfo = localStorage.getItem("userInfo");
    if (storeUserInfo) {
      userInfo = JSON.parse(storeUserInfo);
    }
  });

  // Run only in the browser
  let bookedTickets: ticketType[] = [];

  // Initialize bookedTickets from localStorage on mount
  onMount(() => {
    let storageBookedTickets: string | null =
      localStorage.getItem("bookedTickets");

    if (storageBookedTickets) {
      bookedTickets = JSON.parse(storageBookedTickets);
    }
  });

  // Function to handle booking tickets
  const handleBookedTickets = (data: ticketType) => {
    // Check if the ticket already exists in bookedTickets
    const isAlreadyBooked = bookedTickets.some(
      (ticket) => ticket.id === data.id
    );

    if (!isAlreadyBooked) {
      // Add new ticket and update localStorage
      bookedTickets = [...bookedTickets, data];
      localStorage.setItem("bookedTickets", JSON.stringify(bookedTickets));
      alert(`${data.title} ticket is booked`);
    } else {
      alert(`${data.title} ticket has already been booked by you`);
    }
  };
</script>

<main class="bg-[#F4F4F9] min-h-[100vh] flex items-start justify-center">
  <!-- Header -->
  <div class="h-[70px] fixed top-0 flex items-center w-full bg-[#fff] shadow">
    <div
      class="w-full max-w-[1300px] px-2 md:px-8 mx-auto flex items-center justify-between"
    >
      <h3 class="family2 text-lg md:text-2xl">AuthVents</h3>

      <ol class="flex items-center justify-end gap-4 md:gap-12">
        <li class="text-base">
          <a href={"/my-tickets"} class="hover:text-gray-400">My Tickets</a>
        </li>
        <li class="flex items-center gap-4">
          {#if userInfo}
            <div
              class="w-12 h-12 rounded-full flex text-base family2 text-white bg-[#000] items-center justify-center"
            >
              {userInfo?.name?.split("")[0]}
            </div>
          {:else}
            <a
              href="/login"
              class="px-4 py-2 hover:opacity-40 text-sm md:text-sm rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
              >Get Started</a
            >
          {/if}
        </li>
      </ol>
    </div>
  </div>
  <div
    class="w-full max-w-[1300px] pt-32 px-4 md:px-8 mx-auto min-h-[600px] flex gap-8 md:gap-12 flex-col"
  >
    <h2 class="text-4xl md:text-5xl family2">Tickets</h2>

    <div class="w-full grid sm:grid-cols-2 gap-6 lg:grid-cols-3">
      {#each tickets as data}
        <div
          class="cursor-pointer w-full bg-white flex p-6 rounded-lg flex-col gap-4"
        >
          <div class="w-full flex flex-col gap-2">
            <h3 class="family2 text-xl md:text-2xl">{data.title}</h3>
            <div class="flex items-center text-sm md:text-base gap-2">
              <Calendar size={16} />
              {data.date}
            </div>
            <div class="flex items-center text-sm md:text-base gap-2">
              <Locate size={16} />
              {data.location}
            </div>
          </div>
          <h4 class="text-sm max-w-[300px] md:text-base">
            {data.description}
          </h4>
          <div class="w-full flex items-center justify-between gap-4">
            <span class="text-2xl family2">
              ${data.price}
            </span>
            <button
              on:click={() => handleBookedTickets(data)}
              class="px-4 py-2 hover:opacity-40 text-sm md:text-sm rounded-lg bg-[#00BFA6] text-white flex items-center justify-center gap-4"
              ><CircleDashed size={20} />Purchase Ticket</button
            >
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>
