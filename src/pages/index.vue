<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
</script>

<template>
  <div class="wrapper">
    <div class="underline text-3xl">Root route</div>
    <DataTable table-style="min-width: 50rem">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>
</template>
