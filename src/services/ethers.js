const ethers = require('ethers');

const daoAbi = require("../abis/daoAbi.json");
class Ethers {
    constructor() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.provider = provider;

        this.signer = this.provider.getSigner();
        this.dao;

        window.ethereum.on("accountsChanged", async () => {
            await this.connect();
            window.location.reload();
        })
    }

    connect = async function () {
        await this.provider.send("eth_requestAccounts", []);
        this.address = await this.signer.getAddress();
        console.log("Address is: ", this.address)
    }

    toEther = (num) => {
        if (num < 1) {
            num = 0
        }
        const res = ethers.BigNumber.from(`${num}`)
        return ethers.utils.formatEther(res);
    };

    setDao = (address) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        this.dao = new ethers.Contract(address, daoAbi, signer);
        console.log("dao set: ", this.dao.address)
    }

    async addDaoMember(member) {
        //const priceWei = ethers.utils.parseEther(price);
        try {
            const tx = await this.dao.addDaoMember(member);
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }

    async lockAmount(amount) {
        const amountWei = ethers.utils.parseEther(amount);
        try {
            const tx = await this.dao.lockAmount(amountWei);
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }
    async unlockAmount(amount) {
        const amountWei = ethers.utils.parseEther(amount);
        try {
            const tx = await this.dao.unlockAmount(amountWei);
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }
    async createResarchDeal(price,title,desc,cid) {
        const priceWei = ethers.utils.parseEther(price);
        try {
            const tx = await this.dao.createResarchDeal(priceWei,title,desc,cid);
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }
    async createFundingProposal(title,description,amount,fundingDuration,researchDuration) {
        const priceWei = ethers.utils.parseEther(amount);
        
        try {
            const tx = await this.dao.createFundingProposal(title,description,priceWei,fundingDuration,researchDuration);
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }
    async fundResearch(id, amount) {
        const amountWei = ethers.utils.parseEther(amount);
        
        try {
            const tx = await this.dao.fundResearch(id, {value: amountWei});
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }
    async startResearch(id) {
        try {
            const tx = await this.dao.startResearch(id);
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }
    async startVotingOnResearchResult(id) {
        try {
            const tx = await this.dao.startVotingOnResearchResult(id);
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }

    async refundInvestorsForExpiredResearch(id) {
        try {
            const tx = await this.dao.refundInvestorsForExpiredResearch(id);
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }

    async endVotingOnResearch(id) {
        try {
            const tx = await this.dao.endVotingOnResearch(id);
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }

    async voteOnResearchResult(id) {
        try {
            const tx = await this.dao.voteOnResearchResult(id);
            await tx.wait();
            alert("Order created");
            return true;
        } catch (e) {
            if (e.error === (undefined)) {
                console.log("error: ", e.message)
                alert(e.message)
                return false
            }
            console.log("an error occurred: ", e.error.message)
            alert(e.error.message)
            return false
        }
    }
}

export default Ethers;