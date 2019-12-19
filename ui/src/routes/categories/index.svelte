<script context="module">
  // Here we import the graphql client
  import client from '../../apollo.js';
  import { gql } from 'apollo-boost';

  const GET_CATEGORIES = gql`
    query getCategories {
      Category(orderBy: name_asc) {
        name
      }
    }
  `;

  export async function preload() {
    return {
      cache: await client.query({
        query: GET_CATEGORIES
      })
    };
  }
</script>

<script>
  import { setClient, restore, query } from 'svelte-apollo';

  export let cache;
  console.log(cache);
  restore(client, GET_CATEGORIES, cache.data);
  setClient(client);
  const categories = query(client, { query: GET_CATEGORIES });
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>categories</title>
</svelte:head>

<h1>Categories</h1>

{#await $categories}
  <p>Loading...</p>
{:then result}

  <ul>
    {#each result.data.Category as { name }}
      <li>
        <a rel="prefetch" href="categories/{name}">{name}</a>
      </li>
    {/each}
  </ul>

{:catch error}
  <p>Error: {error}</p>
{/await}
