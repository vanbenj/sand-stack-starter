<script context="module">
  // Here we import the graphql client
  import client from "../../apollo.js";
  import { gql } from "apollo-boost";

  const GET_CATEGORIES = gql`
    query getCategories {
      Category(orderBy: name_asc) {
        name
      }
    }
  `;

  export async function preload() {
    return {
      categories: await client.query({
        query: GET_CATEGORIES
      })
    };
  }
</script>

<script>
  export let categories;
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

  <ul>
    {#each categories.data.Category as { name }}
      <li>
        <a rel="prefetch" href="categories/{name}">{name}</a>
      </li>
    {/each}
  </ul>

