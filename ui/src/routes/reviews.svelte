<script context="module">
  // Here we import the graphql client
  import client from "../apollo.js";
  import { gql } from "apollo-boost";

  const GET_USERS = gql`
    query getUsers {
      User {
        name
        reviews(orderBy: stars_desc) {
          date {
            formatted
          }
          stars
          business {
            name
          }
          text
        }
      }
    }
  `;

  export async function preload() {
    return {
      cache: await client.query({
        query: GET_USERS
      })
    };
  }
</script>

<script>
  import StarRating from "../components/StarRating.svelte";
  import { setClient, restore, query } from "svelte-apollo";

  export let cache;
  restore(client, GET_USERS, cache.data);
  setClient(client);
  const users = query(client, { query: GET_USERS });
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>reviews</title>
</svelte:head>

<h1>Reviews</h1>

{#await $users}
  <p>Loading...</p>
{:then result}

  <ul>
    {#each result.data.User as { id, name, reviews }}
      <li>
        {name}
        <ul>
          {#each reviews as { date, stars, business, text }}
            <li>
              <StarRating rating={stars} />
              {date.formatted}
              <b>{business.name}</b>
              <br />
              <i>{text}</i>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>

{:catch error}
  <p>Error: {error}</p>
{/await}
