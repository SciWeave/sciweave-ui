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
        :class="
          selectedIdx == 0 ? 'btn-outline-primary' : 'btn-outline-secondary'
        "
        class="btn"
        @click="selectIdx"
      >
        Admin
      </button>
    </div>
    <div class="col-3">
      <button
        :value="1"
        :class="
          selectedIdx == 1 ? 'btn-outline-primary' : 'btn-outline-secondary'
        "
        class="btn"
        @click="selectIdx"
      >
        Member
      </button>
    </div>
    <div class="col-3">
      <button
        :value="2"
        :class="
          selectedIdx == 2 ? 'btn-outline-primary' : 'btn-outline-secondary'
        "
        class="btn"
        @click="selectIdx"
      >
        Investor
      </button>
    </div>
    <div class="col-3">
      <button
        :value="3"
        :class="
          selectedIdx == 3 ? 'btn-outline-primary' : 'btn-outline-secondary'
        "
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
        <button class="btn btn-primary">Upload research file and create</button>
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
export default {
  name: "DaoMananger",
  data() {
    return {
      selectedIdx: 0,
    };
  },
  methods: {
    selectIdx(e) {
      this.selectedIdx = e.target.value;
    },
  },
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
  width: fit-content;
}
input {
  width: 300px;
  border-radius: 5px;
  border: 1px solid;
}
.container {
  margin-top: 50px;
}
.btn-container {
  margin-top: 30px;
}
.dao-manage {
  margin-top: 30px;
}
.btn-outline-secondary {
  width: 100px;
  border-radius: 0px;
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
}
.btn-outline-primary {
  width: 100px;
  border-radius: 0px;
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
}
.btn-primary {
    width: 300px;
}
.general-btn {
  margin-top: 20px;
  margin-bottom: 50px;
}
.col-3 {
  text-align: center;
}
</style>