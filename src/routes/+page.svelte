<script lang="ts">
    import {
        Date,
        getPaddedDates,
        monthToString,
        parseHolidays,
    } from "$lib/date";
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";

    const { data }: PageProps = $props();

    let holidays: Date[] = $state([]);
    let dates: Date[] = $state([]);

    let year: number = $state(2025);
    let month: number = $state(8);
    let selectedDateRawValue: string = $state("");
    let selectedDate: Date | null = $state(null);

    $effect(() => {
        dates = getPaddedDates(year, month);
    });

    onMount(() => {
        holidays = parseHolidays(data.holidaysString);
        dates = getPaddedDates(year, month);
    });
</script>

<input type="number" bind:value={year} />
<select name="month" bind:value={month}>
    {#each { length: 12 }, month}
        <option value={month + 1}>{monthToString(month)}</option>
    {/each}
</select>
<input
    type="text"
    placeholder="2025-08-24"
    bind:value={selectedDateRawValue}
    onchange={() => {
        selectedDate = Date.fromString(selectedDateRawValue);
    }}
/>
<button
    disabled={!selectedDate}
    onclick={() => {
        year = selectedDate.year;
        month = selectedDate.month;
    }}>search</button
>

<div
    style="display: grid; grid-template-columns: auto auto auto auto auto auto auto"
>
    {#each dates as date}
        <div
            style={date.dayOfWeek === 7 ||
            holidays.some((holiday) => holiday.compareTo(date))
                ? "background-color: gray"
                : ""}
        >
            {date.dayOfWeekShortName}
            {date.day}
        </div>
    {/each}
</div>
