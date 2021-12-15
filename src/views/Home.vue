<template>
  <div class="home container">
    <!-- search / sort section -->
    <div class="section controls pb-1 mb-3">
      <h2 class="is-size-3">Users</h2>
      <div class="field mb-0">
        <label class="label is-small">Search</label>
        <div class="control">
          <input
            class="input"
            type="search"
            placeholder="Search User"
            v-model="userSearchWord"
          />
        </div>
      </div>
      <div class="field">
        <label class="label is-small">Sort by</label>
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select v-model="sortBy">
              <option value="name">Name</option>
              <option value="username">Username</option>
              <option value="email">Email</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!-- list section -->
    <div class="section pt-3" v-show="displayUsers.length > 0">
      <div class="userItem" v-for="user in displayUsers" :key="user.id">
        <div class="avatar" @click="viewUserDetail(`${user.id}`)">
          <img src="../assets/user.svg" alt="" />
        </div>
        <div @click="viewUserDetail(`${user.id}`)">
          {{ user.name }}<br />
          {{ user.username }}
        </div>
        <div>
          <a :href="`mailto:${user.email}`">{{ user.email }}</a>
        </div>
      </div>
    </div>
    <div
      class="section has-text-centered mt-6"
      v-show="displayUsers.length === 0"
    >
      <div class="noUser">
        <img src="../assets/notFound.svg" alt="" />
        <span>No user found!</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      users: [],
      sortBy: "name",
      userSearchWord: "",
    };
  },
  computed: {
    displayUsers() {
      return this.users
        .filter((user) => {
          return this.checkSearch(user) !== -1;
        })
        .sort((a, b) => {
          return a[this.sortBy] > b[this.sortBy] ? 1 : -1;
        });
    },
  },
  methods: {
    sortUserList() {
      this.displayUsers.sort((a, b) => {
        return a[this.sortBy] > b[this.sortBy] ? 1 : -1;
      });
    },
    checkSearch(user) {
      const { name, username, email } = user;

      const searchword = this.userSearchWord.toLowerCase();

      return (
        name.toLowerCase().indexOf(searchword) ??
        username.toLowerCase().indexOf(searchword) ??
        email.toLowerCase().indexOf(searchword)
      );
    },
    viewUserDetail(id) {
      console.log(id);
      this.$router.push({ name: "UserDetail", params: { id } });
    },
  },
  created() {
    axios.get("//jsonplaceholder.typicode.com/users").then((response) => {
      this.users = response.data;
      const existedIDs = this.users.map((user) => user.id);
      localStorage.setItem("existedIDs", existedIDs.toString());
    });
  },
};
</script>

<style lang="scss" scoped>
.controls {
  display: grid;
  grid-template-columns: 1fr auto auto;
  column-gap: 1em;
  align-items: center;
}

.userItem {
  border: 1px solid var(--borderGrey);
  display: flex;
  // flex-direction: row;
  place-content: space-between;
  padding: 1em 1em 1em 4em;
  align-items: center;

  position: relative;
  top: -1px;
  border-bottom: none;
  pointer-events: none;

  transition: background-color 0.3s ease;

  div {
    pointer-events: auto;
    cursor: pointer;
  }

  &:hover {
    background-color: var(--rowHighlight) !important;

    .avatar {
      background-color: var(--linkBlue);
    }
  }

  .avatar {
    width: 2em;
    height: 2em;
    background-color: #999;
    border-radius: 100%;
    position: absolute;
    left: 1em;

    transition: background-color 0.3s ease;
  }
}

.noUser {
  border: 1px solid var(--borderGrey);
  background-color: var(--rowGrey);
  padding: 1em;
  display: grid;
  justify-content: center;
  border-radius: 8px;

  img {
    height: 8em;
  }
}

.userItem:last-of-type {
  border-bottom: 1px solid var(--borderGrey);
}

.userItem:nth-child(odd) {
  background-color: var(--rowGrey);
}

@media (max-width: 640px) {
  .userItem {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .controls {
    display: flex;
    flex-direction: column;
    align-items: unset;
    margin-bottom: 1em;

    .field {
      margin-top: 1em;
    }
  }
}
</style>
