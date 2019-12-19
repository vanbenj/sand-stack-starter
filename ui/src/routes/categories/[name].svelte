<script context="module">
  // Here we import the graphql client
  import client from '../../apollo.js';
  import { gql } from 'apollo-boost';

  const GET_BUSINESSES = gql`
    query getBusinesses($filter: _BusinessFilter) {
      Business(filter: $filter, orderBy: avgStars_desc) {
        name
        address
        avgStars
      }
    }
  `;

  export async function preload({ params }) {
    let category = params.name;
    return {
      category: category,
      cache: await query(client, {
        query: GET_BUSINESSES
      }).refetch({
        filter: {
          categories_single: {
            name: category
          }
        }
      })
    };
  }
</script>

<script>
  import StarRating from '../../components/StarRating.svelte';
  import { setClient, restore, query } from 'svelte-apollo';

  export let cache;
  export let category;

  restore(client, GET_BUSINESSES, cache.data);
  setClient(client);

  const businesses = query(client, { query: GET_BUSINESSES });
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
  a {
    text-decoration: none !important;
    color: grey;
  }
</style>

<svelte:head>
  <title>{category}</title>
</svelte:head>

<h1>
  <a rel="prefetch" href="../categories">Categories</a>
  > {category}
</h1>

{#await $businesses}
  <p>Loading...</p>
{:then result}

  <ul>
    {#each result.data.Business as { name, address, avgStars }}
      <li>
        <StarRating rating={avgStars} />
        <b>{name}</b>
        {address}
      </li>
    {/each}
  </ul>

{:catch error}
  <p>Error: {error}</p>
{/await}
