<template>
  <div class="container">
    <h1>SciWeave</h1>
    <div class="container">
      <h2>Protocol details</h2>
      <div class="row">
        <div class="col-6">
          <h5>Total number of DAOs:</h5>
        </div>
        <div class="col-6">
            <h5>Total amount invested:</h5>
        </div>
        <div class="co-6">
            <h5>DAO info:</h5>
        </div>
      </div>
    </div>
    <DaoManager />
  </div>
</template>

<script>
import DaoManager from './DaoManager.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    DaoManager,
  }
};
</script>

<style scoped>
h1 {
  font-family: "K2D", sans-serif;
  font-weight: 500;
  color: blue;
  font-size: 50px;
}
h2 {
  font-family: "K2D", sans-serif;
  font-weight: 500;
  color: rgb(0, 0, 114);
  font-size: 30px;
}
h5 {
  font-family: "K2D", sans-serif;
  font-weight: 500;
  color: black;
  font-size: 25px;
}
.container {
  margin-top: 50px;
}
</style>