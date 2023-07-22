<template>
  <div class="container">
    <h1>SciWeave</h1>
    <DaoDetails />
    <DaoManager />
  </div>
</template>

<script>
import DaoManager from './DaoManager.vue';
import DaoDetails from './DaoDetails.vue';

export default {
  name: "HomePage",
  components: {
    DaoDetails,
    DaoManager
  }
};
</script>


<style scoped>
h1 {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: #6200EE;
  font-size: 50px;
}
h2 {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: #6200EE;
  font-size: 30px;
}
h5 {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: #304FFE;
  font-size: 25px;
  width: fit-content;
}
.container {
  margin-top: 50px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
input {
  width: 300px;
  border-radius: 5px;
  border: 1px solid #304FFE;
  padding: 10px;
  margin-right: 20px;
}
.btn-primary {
    width: 300px;
    background-color: #6200EE;
    color: #fff;
    margin: 20px 0;
}
</style>
