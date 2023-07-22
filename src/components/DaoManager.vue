<template>
  <div class="container">
    <h2>DAO Manager</h2>
    <div class="row">
      <h5>Enter DAO address:</h5>
      <input type="text" class="dao-input" />
      <button class="btn btn-primary" @click="setDao">Enter</button>
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
      <input type="text" class="add-dao-member" />
      <button class="btn btn-primary" @click="addDaoMember">Add</button>
    </div>
    <div class="row dao-manage">
      <h5>Lock money:</h5>
      <input type="text" class="lock-amount" />
      <button class="btn btn-primary" @click="lockAmount">Lock</button>
    </div>
    <div class="row dao-manage">
      <h5>Unlock money:</h5>
      <input type="text" class="unlock-amount" />
      <button class="btn btn-primary" @click="unlockAmount">Unlock</button>
    </div>
  </div>
  <div v-if="selectedIdx == 1" class="member-container container">
    <div class="row">
      <div class="col-6">
        <h2>Publish research:</h2>
        <div class="row dao-manage">
          <h5>Price:</h5>
          <input type="number" min="1" class="research-price" />
        </div>
        <div class="row dao-manage">
          <h5>Resarch title:</h5>
          <input type="text" class="research-title" />
        </div>
        <div class="row dao-manage">
          <h5>Research description:</h5>
          <input type="text" class="research-description" />
        </div>
        <input type="file" />
        <button class="btn btn-primary" @click="storeFiles">
          Upload research file and create
        </button>
      </div>
      <div class="col-6">
        <h2>Create funding proposal:</h2>
        <div class="row dao-manage">
          <h5>Proposal title:</h5>
          <input type="text" class="proposal-title" />
        </div>
        <div class="row dao-manage">
          <h5>Proposal descriptrion:</h5>
          <input type="text" class="proposal-description" />
        </div>
        <div class="row dao-manage">
          <h5>Funding amount:</h5>
          <input type="number" min="1" class="funding-amount" />
        </div>
        <div class="row dao-manage">
          <h5>Funding duration:</h5>
          <input type="number" min="1" class="funding-duration" />
        </div>
        <div class="row dao-manage">
          <h5>Research duration:</h5>
          <input type="number" min="1" class="research-duration" />
        </div>
        <button class="btn btn-primary" @click="createFundingProposal">
          Create proposal
        </button>
      </div>
    </div>
  </div>
  <div v-if="selectedIdx == 2" class="investor-container container">
    <h2>Fund research:</h2>
    <div class="row dao-manage">
      <h5>ID:</h5>
      <input type="text" class="fund-research-input" />
      <input type="number" min="1" class="fund-research-input-amount" />
      <button class="btn btn-primary" @click="fundResearch">Fund</button>
    </div>
  </div>
  <div v-if="selectedIdx == 3" class="general-container container">
    <div class="row">
      <div class="col-6">
        <h2>Start research:</h2>
        <div class="row dao-manage">
          <h5>ID:</h5>
          <input type="text" class="start-research" />
          <button class="btn btn-primary general-btn" @click="startResearch">
            Start
          </button>
        </div>
      </div>
      <div class="col-6">
        <h2>Refund investors:</h2>
        <div class="row dao-manage">
          <h5>ID:</h5>
          <input type="text" class="refund-investors" />
          <button
            class="btn btn-primary general-btn"
            @cliick="refundInvestorsForExpiredResearch"
          >
            Refund
          </button>
        </div>
      </div>
      <div class="col-6">
        <h2>Start voting on research result:</h2>
        <div class="row dao-manage">
          <h5>ID:</h5>
          <input type="text" class="start-voting" />
          <button
            class="btn btn-primary general-btn"
            @click="startVotingOnResearchResult"
          >
            Start
          </button>
        </div>
      </div>
      <div class="col-6">
        <h2>End voting on research result:</h2>
        <div class="row dao-manage">
          <h5>ID:</h5>
          <input type="text" class="end-voting" />
          <button
            class="btn btn-primary general-btn"
            @click="endVotingOnResearch"
          >
            End
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Web3Storage } from "web3.storage";
import Ethers from "../services/ethers";

export default {
  name: "DaoMananger",
  data() {
    return {
      ethers: Object,
      selectedIdx: 0,
      cid: "",
    };
  },
  methods: {
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
      // createResarchDeal
      const files = this.getFiles();
      const client = this.makeStorageClient();
      const cid = await client.put(files);
      console.log("stored files with cid:", cid);
      this.cid = cid;
    },
    async setDao() {
      const ethers = new Ethers();
      await ethers.connect();
      const daoInput = document.querySelector(".dao-input");
      const addr = daoInput.value;
      ethers.setDao(addr);
    },
    async addDaoMember() {
      const input = document.querySelector(".add-dao-member");
      const ethers = new Ethers();
      await ethers.connect();
      const isOk = await ethers.addDaoMember(input);
      if (isOk) {
        alert("member added!");
      }
    },
    async lockAmount() {
      const input = document.querySelector(".lock-amount");
      const ethers = new Ethers();
      await ethers.connect();
      const isOk = await ethers.lockAmount(input);
      if (isOk) {
        alert("amount locked!");
      }
    },
    async unlockAmount() {
      const input = document.querySelector(".unlock-amount");
      const ethers = new Ethers();
      await ethers.connect();
      const isOk = await ethers.lockAmount(input);
      if (isOk) {
        alert("amount unlocked!");
      }
    },
    async createResarchDeal() {
      const priceInput = document.querySelector(".research-price");
      const titleInput = document.querySelector(".research-title");
      const descInput = document.querySelector(".research-description");

      const ethers = new Ethers();
      await ethers.connect();
      const isOk = await ethers.createResarchDeal(
        priceInput,
        titleInput,
        descInput,
        this.cid
      );
      if (isOk) {
        alert("amount unlocked!");
      }
    },
    async createFundingProposal() {
      const title = document.querySelector(".proposal-title");
      const description = document.querySelector(".proposal-description");
      const amount = document.querySelector(".funding-amount");
      const fundingDuration = document.querySelector(".funding-duration");
      const researchDuration = document.querySelector(".research-duration");

      const ethers = new Ethers();
      await ethers.connect();

      const isOk = await ethers.createFundingProposal(
        title,
        description,
        amount,
        fundingDuration,
        researchDuration
      );
      if (isOk) {
        alert("amount unlocked!");
      }
    },
    async fundResearch() {
      const id = document.querySelector(".fund-research-input");
      const amount = document.querySelector(".fund-research-input-amount");

      const ethers = new Ethers();
      await ethers.connect();

      const isOk = await ethers.fundResearch(id, amount);
      if (isOk) {
        alert("research funded!");
      }
    },
    async startResearch() {
      const id = document.querySelector(".start-research");

      const ethers = new Ethers();
      await ethers.connect();

      const isOk = await ethers.startResearch(id);
      if (isOk) {
        alert("research funded!");
      }
    },
    async startVotingOnResearchResult() {
      const id = document.querySelector(".start-voting");

      const ethers = new Ethers();
      await ethers.connect();

      const isOk = await ethers.startVotingOnResearchResult(id);
      if (isOk) {
        alert("research funded!");
      }
    },
    async refundInvestorsForExpiredResearch() {
      const id = document.querySelector(".refund-investors");

      const ethers = new Ethers();
      await ethers.connect();

      const isOk = await ethers.startVotingOnResearchResult(id);
      if (isOk) {
        alert("research funded!");
      }
    },
    async endVotingOnResearch() {
      const id = document.querySelector(".end-voting");

      const ethers = new Ethers();
      await ethers.connect();

      const isOk = await ethers.endVotingOnResearch(id);
      if (isOk) {
        alert("research funded!");
      }
    },
    async voteOnResearchResult() {},
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
