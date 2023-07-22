<template>
  <div class="container">
    <h2>DAO Manager</h2>
    <div class="row">
      <h5>Enter DAO address:</h5>
      <input type="text" />
    </div>
  </div>

  <div class="row btn-container">
    <div class="col-3">
      <button
        :value="0"
        :class="selectedIdx == 0 ? 'btn-outline-primary' : 'btn-outline-secondary'"
        class="btn"
        @click="selectIdx"
      >
        Admin
      </button>
    </div>
    <div class="col-3">
      <button
        :value="1"
        :class="selectedIdx == 1 ? 'btn-outline-primary' : 'btn-outline-secondary'"
        class="btn"
        @click="selectIdx"
      >
        Member
      </button>
    </div>
    <div class="col-3">
      <button
        :value="2"
        :class="selectedIdx == 2 ? 'btn-outline-primary' : 'btn-outline-secondary'"
        class="btn"
        @click="selectIdx"
      >
        Investor
      </button>
    </div>
    <div class="col-3">
      <button
        :value="3"
        :class="selectedIdx == 3 ? 'btn-outline-primary' : 'btn-outline-secondary'"
        class="btn"
        @click="selectIdx"
      >
        General
      </button>
    </div>
  </div>

  <div v-if="selectedIdx == 0" class="admin-container container">
    <div class="row dao-manage">
      <h5>Add DAO member:</h5>
      <input type="text" />
      <button class="btn btn-primary">Add</button>
    </div>
    <div class="row dao-manage">
      <h5>Lock money:</h5>
      <input type="text" />
      <button class="btn btn-primary">Lock</button>
    </div>
    <div class="row dao-manage">
      <h5>Unlock money:</h5>
      <input type="text" />
      <button class="btn btn-primary">Unlock</button>
    </div>
  </div>
  <div v-if="selectedIdx == 1" class="member-container container">
    <div class="row">
      <div class="col-6">
        <h2>Publish research:</h2>
        <div class="row dao-manage">
          <h5>Price:</h5>
          <input type="number" min="1" />
        </div>
        <div class="row dao-manage">
          <h5>Resarch title:</h5>
          <input type="text" />
        </div>
        <div class="row dao-manage">
          <h5>Research descriptrion:</h5>
          <input type="text" />
        </div>
        <input type="file" />
        <button class="btn btn-primary" @click="storeFiles">Upload research file and create</button>
      </div>
      <div class="col-6">
        <h2>Create funding proposal:</h2>
        <div class="row dao-manage">
          <h5>Proposal title:</h5>
          <input type="text" />
        </div>
        <div class="row dao-manage">
          <h5>Proposal descriptrion:</h5>
          <input type="text" />
        </div>
        <div class="row dao-manage">
          <h5>Funding amount:</h5>
          <input type="number" min="1" />
        </div>
        <div class="row dao-manage">
          <h5>Funding duration:</h5>
          <input type="number" min="1" />
        </div>
        <div class="row dao-manage">
          <h5>Research duration:</h5>
          <input type="number" min="1" />
        </div>
        <button class="btn btn-primary">Create proposal</button>
      </div>
    </div>
  </div>
  <div v-if="selectedIdx == 2" class="investor-container container">
    <h2>Fund research:</h2>
    <div class="row dao-manage">
      <h5>ID:</h5>
      <input type="text" />
      <button class="btn btn-primary">Fund</button>
    </div>
  </div>
  <div v-if="selectedIdx == 3" class="general-container container">
    <div class="row">
      <div class="col-6">
        <h2>Start research:</h2>
        <div class="row dao-manage">
          <h5>ID:</h5>
          <input type="text" />
          <button class="btn btn-primary general-btn">Start</button>
        </div>
      </div>
      <div class="col-6">
        <h2>Refund investors:</h2>
        <div class="row dao-manage">
          <h5>ID:</h5>
          <input type="text" />
          <button class="btn btn-primary general-btn">Refund</button>
        </div>
      </div>
      <div class="col-6">
        <h2>Start voting on research result:</h2>
        <div class="row dao-manage">
          <h5>ID:</h5>
          <input type="text" />
          <button class="btn btn-primary general-btn">Start</button>
        </div>
      </div>
      <div class="col-6">
        <h2>End voting on research result:</h2>
        <div class="row dao-manage">
          <h5>ID:</h5>
          <input type="text" />
          <button class="btn btn-primary general-btn">End</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Web3Storage } from "web3.storage";
import axios from "axios";

export default {
  name: "DaoDashboard",
  data() {
    return {
      loading: true,
      totalDaos: 0,
      selectedIdx: 0,
    };
  },
  async created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.post(
          "https://api.studio.thegraph.com/query/50130/sciweave/v0.0.1",
          {
            query: `
            {
              createDaos {
                id
              }
            }
          `,
          }
        );
        this.totalDaos = response.data.data.createDaos.length;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    selectIdx(e) {
      this.selectedIdx = e.target.value;
    },
    makeStorageClient() {
      return new Web3Storage({
        token: process.env.VUE_APP_WEB3STORAGE_API_TOKEN,
      });
    },
    getFiles() {
      const fileInput = document.querySelector('input[type="file"]');
      return fileInput.files;
    },
    async storeFiles() {
      const files = this.getFiles();
      const client = this.makeStorageClient();
      const cid = await client.put(files);
      console.log("stored files with cid:", cid);
      return cid;
    },
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
