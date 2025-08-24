<script lang="ts">
    let { year = $bindable(), month = $bindable(), ...props } = $props();
</script>

<button
    class="cursor-pointer"
    onclick={() => {
        month -= 1;
        if (month < 1) {
            year -= 1;
            month = 12;
        }
    }}
>
    <svg
        class="w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 7L10 12L15 17"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</button>
<button
    class="cursor-pointer"
    onclick={() => {
        month += 1;
        if (month > 12) {
            year += 1;
            month = 1;
        }
    }}
>
    <svg
        class="w-8 rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 7L10 12L15 17"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</button>
