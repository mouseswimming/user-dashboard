<template>
  <div class="section has-text-centered">
    <h2 class="is-size-4 mb-5 has-text-grey pt-6">
      Ooops! The user you try to reach doesn't exist.
    </h2>
    <div class="has-text-weight-semibold">
      Get back to <router-link :to="{ name: 'Home' }"> Users page </router-link>
    </div>
    <div>
      <img src="../assets/404.svg" alt="" class="notFound" />
    </div>
  </div>
</template>

<script>
export default {};
</script>
