<template>
  <div class="container">
    <div class="section pb-0 is-size-4 has-text-weight-semibold">
      <router-link :to="{ name: 'Home' }"> Users </router-link>
      >
      {{ user.name }}
    </div>
    <div class="section cards py-5">
      <div class="infoCard">
        <h4 class="is-size-6 has-text-weight-semibold mb-4">Contact Info</h4>
        <div class="has-text-grey-dark">
          Username: {{ user.username }}<br />
          Email: <a :href="`mailto:${user.email}`">{{ user.email }}</a
          ><br />
          Phone: <a :href="`tel: ${user.phone}`">{{ user.phone }}</a
          ><br />
          Website:
          <a :href="`//${user.website}`" target="_blank">{{ user.website }}</a>
        </div>
      </div>
      <div class="infoCard">
        <h4 class="is-size-6 has-text-weight-semibold mb-4">Address</h4>
        <div class="has-text-grey-dark">
          {{ address.suite }} {{ address.street }}, {{ address.city }},
          {{ address.zipcode }}
        </div>
      </div>
      <div class="infoCard">
        <h4 class="is-size-6 has-text-weight-semibold mb-4">Company</h4>
        <div class="has-text-grey-dark">
          {{ company.name }}<br />
          {{ company.bs }}<br />
          <span class="is-italic">"{{ company.catchPhrase }}"</span>
        </div>
      </div>
    </div>
    <hr class="seperate" />
    <div class="section pb-0 is-size-4 has-text-weight-semibold">
      <div>Posts by {{ user.name }}</div>
    </div>
    <div class="section cards py-5">
      <div class="infoCard post" v-for="post in posts" :key="post.id">
        <h4 class="is-size-6 has-text-weight-semibold mb-4 is-capitalized">
          {{ post.title }}
        </h4>
        <div class="has-text-grey-dark">
          {{ post.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      user: {},
      address: {},
      company: {},
      posts: [],
    };
  },
  activated() {
    console.log("id", this.id);

    axios
      .get(`//jsonplaceholder.typicode.com/users/${this.id}`)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.user = response.data;
        this.address = this.user.address;
        this.company = this.user.company;
      });

    axios
      .get(`//jsonplaceholder.typicode.com/posts/?userId=${this.id}`)
      .then((response) => {
        this.posts = response.data;
      });
  },
};
</script>

<style lang="scss" scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1.5em;
  row-gap: 1.5em;

  .infoCard {
    padding: 1em;
    border: 1px solid var(--borderGrey);
    line-height: 1.25em;
    border-radius: 4px;
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);

    div {
      font-size: 0.9em;
    }
  }
}

hr.seperate {
  display: none;
}

@media (max-width: 640px) {
  .cards {
    display: block;

    .infoCard {
      border: none;
      margin-bottom: 1em;
    }

    .post {
      border-bottom: 1px solid var(--lineGrey);
      padding-bottom: 2em;
      margin-bottom: 1em;
    }
  }

  hr.seperate {
    display: block;
  }
}
</style>
