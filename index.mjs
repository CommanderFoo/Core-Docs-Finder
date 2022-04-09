import glob from "glob";
import { readFileSync, writeFileSync } from "fs";

const PATH = "D:/Git/Core/platform-documentation/src/";

let pattern = /binding(Pressed|Released)Event|IsBindingPressed|binding (pressed|released)|ability_|(action_?)?\s?binding/igms;

let files = glob.sync("**/*.md", { cwd: PATH, nocase: true });
let matched = new Map()
let total_matches = 0

files.forEach(file => {
	let contents = readFileSync(PATH + file);
	let m;

	if(m = pattern.exec(contents)){
		matched.set(file, true)
		total_matches += m.length;
	}
});

console.log("Total Matches: " + total_matches);
console.log("Total Files: " + matched.size);

let output = "";

for(const key of matched.keys()){
	output += key + "\n";
}

writeFileSync("matches.txt", output, { flag: "w+" });