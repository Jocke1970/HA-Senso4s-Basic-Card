// Build a single HACS-compatible JavaScript resource from translation sources.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const langs=["en","sv","es","fi"];
const translations=Object.fromEntries(langs.map(lang=>[lang,JSON.parse(readFileSync(resolve(root,"translations",lang+".json"),"utf8"))]));
const keys=Object.keys(translations.en).sort();
for(const [lang,dictionary] of Object.entries(translations)){
  if(JSON.stringify(Object.keys(dictionary).sort())!==JSON.stringify(keys))throw Error("Translation keys differ in "+lang);
  for(const [key,value] of Object.entries(dictionary))if(typeof value!=="string"||!value.trim())throw Error("Empty or invalid translation: "+lang+"."+key);
}
const source=readFileSync(resolve(root,"src","senso4s-basic-card.template.js"),"utf8");
const marker="const L=__TRANSLATIONS__;";
if(!source.includes(marker)||source.indexOf(marker)!==source.lastIndexOf(marker))throw Error("Exactly one translation placeholder required");
const output=source.replace(marker,"const L="+JSON.stringify(translations)+";");
const target=resolve(root,"senso4s-basic-card.js");
if(process.argv.includes("--check")){
  if(readFileSync(target,"utf8")!==output)throw Error("Generated card out of date: run node scripts/build.mjs");
  console.info("Translation bundle matches the generated card ("+langs.join(", ")+")");
}else{
  writeFileSync(target,output);
  console.info("Built senso4s-basic-card.js with "+langs.length+" languages");
}
