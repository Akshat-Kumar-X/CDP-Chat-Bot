const fs = require("fs");
const path = require("path");

const files = [
    "backend/data/segment_faqs.csv",
    "backend/data/mparticle_faqs.csv",
    "backend/data/lytics_faqs.csv",
    "backend/data/zeotap_faqs.csv"
];

const output = "backend/data/cdp_documentation.csv";

fs.writeFileSync(output, "category,platform,question,answer,source\n");

files.forEach((file) => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, "utf8").split("\n").slice(1).join("\n");
        fs.appendFileSync(output, content + "\n");
    }
});

console.log("✅ Merged all CSV files into cdp_documentation.csv");
