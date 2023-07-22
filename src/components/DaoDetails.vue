<template>
    <div class="container">
      <h2>Protocol details</h2>
      <div class="row">
        <div class="col-6">
          <h5>Total number of DAOs: {{ totalDao }}</h5>
        </div>
        <div class="col-6">
          <h5>Total amount invested:</h5>
        </div>
        <div class="co-6">
          <h5>DAO info:</h5>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'DaoDetails',
    data() {
      return {
        totalDao: 0,
      };
    },
    async created() {
      const response = await axios.post(
        "https://api.studio.thegraph.com/query/50130/sciweave/v.0.0.3",
        {
          query: `
          {
            CreateDao {
              id
            }
          }
        `,
        }
      );
      console.log("response:",response)
      this.totalDao = response.data.data.CreateDao.length;
    },
  };
  </script>
  

  <style scoped>
  h1 {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    color: #0336FF;
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
  input {
    width: 300px;
    border-radius: 5px;
    border: 1px solid #304FFE;
    padding: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
  }
  .container {
    margin-top: 50px;
    background-color: #f8f9fa;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  .btn-container {
    margin-top: 30px;
    justify-content: space-around;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  .dao-manage {
    margin-top: 30px;
  }
  .btn-outline-secondary {
    width: 100px;
    border-radius: 0px;
    border-color: transparent;
    background-color: #BBDEFB;
    color: #000;
    margin: 10px;
  }
  .btn-outline-primary {
    width: 100px;
    border-radius: 0px;
    border-color: transparent;
    background-color: #304FFE;
    color: #fff;
    margin: 10px;
  }
  .btn-primary {
      width: 300px;
      background-color: #6200EE;
      color: #fff;
      margin: 20px 0;
  }
  .general-btn {
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .col-3 {
    text-align: center;
  }
  </style>
    