<script lang="ts">
    import {
        Date,
        getPaddedDates,
        monthToString,
        parseHolidays,
    } from "$lib/date";
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";
    import MonthArrows from "./MonthArrows.svelte";

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

<div class="flex justify-between flex-col lg:flex-row">
    <div class="flex justify-center gap-3">
        <input
            class="text-2xl w-20 font-bold"
            name="year"
            type="number"
            bind:value={year}
        />
        <select
            class="font-bold cursor-pointer"
            name="month"
            bind:value={month}
        >
            {#each { length: 12 }, month}
                <option value={month + 1}>{monthToString(month)}</option>
            {/each}
        </select>
        <MonthArrows bind:month bind:year />
    </div>

    <div class="flex justify-center gap-0">
        <input
            class="w-24"
            name="date"
            type="text"
            placeholder="2025-08-24"
            bind:value={selectedDateRawValue}
            onchange={() => {
                selectedDate = Date.fromString(selectedDateRawValue);
            }}
        />
        <button
            class="cursor-pointer"
            disabled={!selectedDate}
            onclick={() => {
                year = selectedDate.year;
                month = selectedDate.month;
            }}>pojdi</button
        >
    </div>
</div>
<div
    class="grid grid-cols-7 grow gap-0.5 rounded-xl overflow-clip bg-stone-100"
>
    {#each dates as date}
        <div
            class="flex justify-center bg-stone-50 font-bold p-3"
            style={`${
                selectedDate && date.compareTo(selectedDate)
                    ? "background-color: oklch(88.5% 0.062 18.334)"
                    : holidays.some((holiday) => holiday.compareTo(date))
                      ? "background-color: oklch(87.1% 0.15 154.449)"
                      : date.dayOfWeek === 7
                        ? "background-color: oklch(86.9% 0.005 56.366)"
                        : ""
            }; ${date.month != month ? "filter: opacity(0.4)" : ""};`}
        >
            <div>
                {date.day}
            </div>
        </div>
    {/each}
</div>
