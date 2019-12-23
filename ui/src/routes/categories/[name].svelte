<script context="module">
  // Here we import the graphql client
  import client from "../../apollo.js";
  import { gql } from "apollo-boost";

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
    const category = params.name;
    const businesses = await client.query({
      query: GET_BUSINESSES,
      variables: {
        filter: {
          categories_single: {
            name: category
          }
        }
      }
    });
    return {
      category,
      businesses
    };
  }
</script>

<script>
  import StarRating from "../../components/StarRating.svelte";

  export let businesses;
  export let category;
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

<ul>
  {#each businesses.data.Business as { name, address, avgStars }}
    <li>
      <StarRating rating={avgStars} />
      <b>{name}</b>
      {address}
    </li>
  {/each}
</ul>
