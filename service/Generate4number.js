class GeneRate4number {
    

     generate4number() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    };
}

module.exports = GeneRate4number;