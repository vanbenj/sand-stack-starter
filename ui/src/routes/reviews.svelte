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
    const users = await client.query({
      query: GET_USERS
    });
    return { users };
  }
</script>

<script>
  import StarRating from "../components/StarRating.svelte";

  export let users;
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

  <ul>
    {#each users.data.User as { id, name, reviews }}
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

