<script context="module">
  // Here we import the graphql client
  import client from '../../apollo.js';
  import { gql } from 'apollo-boost';

  const GET_BUSINESSES = gql`
    query getBusinesses($filter: _BusinessFilter) {
      Business(filter: $filter, orderBy: name_asc) {
        name
        address
      }
    }
  `;

  export async function preload({ params }) {
    return {
      cache: await client.query({
        query: GET_BUSINESSES
      }),
      category: params.name
    };
  }
</script>

<script>
  import { query } from 'svelte-apollo';

  export let category;

  const getFilter = () => {
    return {
      categories_single: {
        name: category
      }
    };
  };

  const businesses = query(client, {
    query: GET_BUSINESSES,
    variables: {
      filter: getFilter()
    }
  });
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>{category}</title>
</svelte:head>

<h1>{category}</h1>

{#await $businesses}
  <p>Loading...</p>
{:then result}

  <ul>
    {#each result.data.Business as { name, address }}
      <li>{name} {address}</li>
    {/each}
  </ul>

{:catch error}
  <p>Error: {error}</p>
{/await}
