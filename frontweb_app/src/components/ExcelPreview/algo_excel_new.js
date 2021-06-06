
// const DECALAGE = 1;
// const ROOT_LEVEL = 0;
// const ROOT_TAB = 0;
// const REGEX_CODES = /[\s\t,.-]+/g; 


// /**
//  * Calculate the number of shifts in an input string as a label.
//  * @param {String} label 
//  */
// const calculTabShift = (label) => {
//     return (/^[-\t\s]/.test(label)) ?
//         label.indexOf(label.match(/[^\s-]/gi)[0]) + 1 : 0
// }


// export const _launch = async ({
//     excelTable
// }) => {

//     try {
//         // C_level => current level, C_type => current type, ...
//         let algo_configs = {
//             c_level: ROOT_LEVEL,
//             c_type: "category",
//             c_tab: ROOT_TAB,
//             c_id: shiftIds,
//             c_code: "",
//             path: []
//         }

//         // let codeIdx = codeSelected ? entete_line.indexOf(codeEntete.toString()) : -1;

//         if (!codeSelected) {
//             const handleLines_noCode = excelTable.reduce((acc, row) => {
//                 let elem;

//                     if (libelleIdx.length < 0 || libelleIdx.map(i => row[i]).join("").trim() === "") return acc;
//                     else if(isTotalLabel(libelleIdx.map(i => row[i]).join("").trim())) {
//                         elem = getItemElem({
//                             id: algo_configs.c_id,
//                             code: "undefined",
//                             label: libelleIdx.map(i => row[i]).join(" "),
//                             unity: "",
//                             quantity: 0,
//                             types: "item"
//                         });
//                         elem.tab = ROOT_TAB;
//                         elem.level = algo_configs.c_level;
//                         elem.isTotal = true;
//                         elem.path = algo_configs.path.slice(0,-1);
//                         elem.path.push(elem.id);
//                         elem.path = elem.path.toString();
//                         algo_configs.c_id++;
//                         acc.push(elem);
//                         return acc;
//                     }
//                     else if (uniteIdx !== -1 && quantiteIdx !== -1 && (row[uniteIdx].toString().trim() !== "" || row[quantiteIdx].toString().trim() !== "")) {
//                         elem = getItemElem({
//                             id: algo_configs.c_id,
//                             code: "undefined",
//                             label: libelleIdx.map(i => row[i]).join(" "),
//                             unity: row[uniteIdx].toString().trim(),
//                             quantity: !isNaN(row[quantiteIdx].toString().replace(',', '.')) ? parseFloat(row[quantiteIdx].toString().replace(',', '.')) : 0.0,
//                             types: "item"
//                         });
//                         elem.tab = calculTabShift(elem.label);
//                         setupLineByTab(acc, elem, algo_configs)
//                         sync_configs(algo_configs, elem);
//                         acc.push(elem);
//                         return acc;

//                     }
//                     else {
//                         elem = getCatElem({
//                             id: algo_configs.c_id,
//                             code: "undefined",
//                             label: libelleIdx.map(i => row[i]).join(" "),
//                         });
//                         elem.tab = calculTabShift(elem.label);
//                         setupLineByTab(acc, elem, algo_configs)
//                         sync_configs(algo_configs, elem);
//                         acc.push(elem);
//                         return acc;
//                     }

//             }, []);
//             return handleLines_noCode;
//         }
//         else if(codeIdx>=0) {
//             const handleLines_withCode = excelTable.reduce((acc, row) => {
//                 let elem;
                
//                     if (libelleIdx.length < 0 || libelleIdx.map(i => row[i]).join("").trim() === "") return acc;
//                     else if(isTotalLabel(libelleIdx.map(i => row[i]).join("").trim())) {
//                         elem = getItemElem({
//                             id: algo_configs.c_id,
//                             code: "undefined",
//                             label: libelleIdx.map(i => row[i]).join(" "),
//                             unity: "",
//                             quantity: 0,
//                             types: "item"
//                         });
//                         elem.tab = ROOT_TAB;
//                         elem.level = algo_configs.c_level ? algo_configs.c_level < 7 : 7;
//                         elem.path = algo_configs.path.slice(0,-1).concat([elem.id]).toString();
//                         elem.isTotal = true;
//                         algo_configs.c_id++;
//                         acc.push(elem);
//                         return acc;
//                     }
//                     else if (uniteIdx !== -1 && quantiteIdx !== -1 && (row[uniteIdx].toString().trim() !== "" || row[quantiteIdx].toString().trim() !== "")) {
//                         elem = getItemElem({
//                             id: algo_configs.c_id,
//                             code: row[codeIdx].toString().trim(),
//                             label: libelleIdx.map(i => row[i]).join(" "),
//                             unity: row[uniteIdx].toString().trim(),
//                             quantity: !isNaN(row[quantiteIdx].toString().replace(',', '.')) ? parseFloat(row[quantiteIdx].toString().replace(',', '.')) : 0.0,
//                             types: "item"
//                         });
//                         elem.tab = calculTabShift(elem.label);
//                         setupLineByCode(acc, elem, algo_configs)
//                         sync_configs(algo_configs, elem);
//                         acc.push(elem);
//                         return acc;

//                     }
//                     else {
//                         elem = getCatElem({
//                             id: algo_configs.c_id,
//                             code:row[codeIdx].toString().trim(),
//                             label: libelleIdx.map(i => row[i]).join(" "),
//                         });
//                         elem.tab = calculTabShift(elem.label);
//                         setupLineByCode(acc, elem, algo_configs)
//                         sync_configs(algo_configs, elem);
//                         acc.push(elem);
//                         return acc;
//                     }

//             }, []);
//             return handleLines_withCode;
//         }
//     }
//     catch (e) {
//         console.log(e.toString());
//     }


// }
// /**
//  * Used to synchronize the current configs after the end of the line process
//  * @param {Object} algo_configs : object contains the curretn configs (c_type, c_tab, c_level)
//  * @param {Object} elem : the processed element
//  * @return : it changes directly the objects referenced as inputs. recommanded since its called for each line => could not immutate all inputs in each call

//  */
// const sync_configs = (algo_configs, elem) => {
//     while(elem.level>8 && elem.types === "category") elem.level--;
//     if (elem.level === algo_configs.c_level) {
//         algo_configs.path.pop();
//         algo_configs.path.push(elem.id);
//         elem.path = algo_configs.path.toString();
//         algo_configs.c_type = elem.types;
//         algo_configs.c_code = elem.code;
//         algo_configs.c_tab = elem.tab;
//         algo_configs.c_id++;
//     }
//     else if (elem.level > algo_configs.c_level) {
//         algo_configs.path.push(elem.id);
//         elem.path = algo_configs.path.toString();
//         algo_configs.c_type = elem.types;
//         algo_configs.c_code = elem.code;
//         algo_configs.c_tab = elem.tab;
//         algo_configs.c_level = elem.level;
//         algo_configs.c_id++;
//     }
//     else {
//         algo_configs.path = algo_configs.path.slice(0, elem.level - algo_configs.c_level - 1)
//         algo_configs.path.push(elem.id);
//         elem.path = algo_configs.path.toString();
//         algo_configs.c_type = elem.types;
//         algo_configs.c_code = elem.code;
//         algo_configs.c_tab = elem.tab;
//         algo_configs.c_level = elem.level;
//         algo_configs.c_id++;
//     }

// }

// /**
//  * function : launched to apply successive conditional process to the file lines which contain no code.
//  *            based on tabulation/shift to define the levels between the lines.
//  * @param {Array[Object]} acc : the accumulator of the reducer.
//  * @param {Object} elem : the element of the line to be precessed
//  * @param {Object} configs : contains all algo configs (current params)
//  * @return : it changes directly the objects referenced as inputs. recommanded since its called for each line => could not immutate all inputs in each call
//  */
// const setupLineByTab = (acc, elem, configs) => {

//     if (elem.tab === configs.c_tab) {
//         if (elem.types === "category")
//             {elem.level = configs.c_type === "category" ? configs.c_level + 1 : Math.max(configs.c_level - 1, 1);
//               elem.level > 7 && (elem.level = 7);
//             }
//         else
//             elem.level = configs.c_type === "category" ? configs.c_level + 1 : configs.c_level;
//     }
//     else if (elem.tab > configs.c_tab) {
//         if (elem.types === "category")
//         {
//             elem.level = configs.c_type === "category" ? configs.c_level + 1 : configs.c_level;
//             elem.level > 7 && (elem.level = 7);
//         }
//         else
//             elem.level = configs.c_type === "category" ? configs.c_level + 1 : configs.c_level;
//     }
//     else {
//         // u can view the explination of this part in the algo docs. (no code column && element tab < current_tab ) 
//         let chosen_level = acc.reduceRight((passedArray, value) => {
//             if (passedArray.length === 1) return passedArray;
//             // else if (value.tab <= elem.tab) passedArray.push({level: value.types === "category" ? value.level+1 :  value.level, tab: value.types === "category" ? value.tab+1 : value.tab});
//             else if (value.tab <= elem.tab) passedArray.push({ level: value.types === "category" ? value.level : value.level, tab: value.types === "category" ? value.tab : value.tab });
//             return passedArray;
//         }, []);
//         elem.level = chosen_level.length ? chosen_level[0].level : ROOT_LEVEL + 1;
//         elem.tab = chosen_level.length ? chosen_level[0].tab : ROOT_TAB;
//     }
    
// }

// /**
//  * function : launched to apply successive conditional process to the file lines which contain codes.
//  * @param {Array[Object]} acc : the accumulator of the reducer.
//  * @param {Object} elem : the element of the line to be precessed
//  * @param {Object} configs : contains all algo configs (current params)
//  * @return : it changes directly the objects referenced as inputs. recommanded since its called for each line => could not immutate all inputs in each call
//  */
// const setupLineByCode = (acc, elem, configs) => {
//     if(!elem.code.length){
//         setupLineByTab(acc,elem,configs);
//     }
//     else if(configs.c_code.length){
//         if(match_codes_v2(configs.c_code,elem.code)==="isPrefix")
//             elem.level = configs.c_type === "category" ? configs.c_level + 1 : configs.c_level;
        
//         else if(match_codes_v2(elem.code,configs.c_code)==="eq")
//             if(configs.c_type === "item") elem.level = configs.c_level;
//             else if(elem.types === "item" || configs.c_code.charAt(configs.c_code-1)==="0"){
//                 elem.level = configs.c_level + 1 ;
//                 configs.c_code = configs.c_code.replace(/0$/,'');
//             }
//             else 
//                 elem.level = configs.c_level;
 
//         else if(match_codes_v2(elem.code,configs.c_code) === "gt")
//             elem.level = configs.c_type === "item" ? configs.c_level :
//             elem.code.charAt(elem.code-1)==="0" ?
//             configs.c_code.charAt(configs.c_code-1)==="9" ? configs.c_level :
//             configs.c_level + 1 :
//             configs.c_level +1 ;
//         else {
//             elem.code = elem.code.replace(/0$/,'');
//             let chosen_level = acc.reduceRight((passedArray, value) => {
//                 if (passedArray.length === 1) return passedArray;
//                 else if (match_codes_v2(value.code,elem.code)==="eq") passedArray.push({ level: value.level,tab:  value.tab });
//                 return passedArray;
//             }, []);
//             elem.level = chosen_level.length ? chosen_level[0].level : ROOT_LEVEL + 1;
//             elem.tab = chosen_level.length ? chosen_level[0].tab : ROOT_TAB;
            
//         }
//     }
//     else {
//         if(elem.types === "item")
//             {
//                 if(configs.c_type === "category")
//                     elem.level =  configs.c_level + 1 
//                 else {
//                     let chosen_level = acc.reduceRight((passedArray, value) => {
//                         if (passedArray.length === 1) return passedArray;
//                         else if (match_codes_v2(value.code,elem.code)==="eq") passedArray.push({ path: value.path, level: value.level });
//                         return passedArray;
//                     }, []);
//                     elem.level = chosen_level.length ? chosen_level[0].level : configs.c_level;
//                     // chosen_level.length && (configs.path = chosen_level[0].path.split(","));
//                 }

//             }
//         else if(configs.c_type === "item")
//             {
//                 let chosen_level = acc.reduceRight((passedArray, value) => {
//                     if (passedArray.length === 1) return passedArray;
//                     else if (match_codes_v2(value.code,elem.code)==="eq") passedArray.push({ path: value.path, level: value.level,tab:  value.tab });
//                     return passedArray;
//                 }, []);
//                 elem.level = chosen_level.length ? chosen_level[0].level : ROOT_LEVEL + 1;
//                 elem.tab = chosen_level.length ? chosen_level[0].tab : ROOT_TAB;
//                 configs.c_level = elem.level;
//                 configs.c_tab = elem.level;
//                 configs.c_type = "category";
//                 configs.path = chosen_level.length ? chosen_level[0].path.split(",") : [];
//             }
//         else{
//             let chosen_level = acc.reduceRight((passedArray, value) => {
//                 if (passedArray.length === 1) return passedArray;
//                 else if (match_codes_v2(value.code,elem.code)==="eq") passedArray.push({ level: value.level,tab:  value.tab });
//                 return passedArray;
//             }, []);
//             elem.level = chosen_level.length ? chosen_level[0].level : configs.c_level + 1;
//             elem.tab = chosen_level.length ? chosen_level[0].tab : elem.tab;
            
//         }
            
//     }

// }



// const match_codes_v1 = (code1,code2) =>{
//     return code1.split(REGEX_CODES).filter(e=> e.length > 0).length - code2.split(REGEX_CODES).filter(e=> e.length > 0).length;
// }

// /**
//  * 
//  * @param {String} code1 : first code
//  * @param {String} code2 : seconde code
//  * @returns  {String} res : 
//  *                  - "gt" => the code1.length > code2.length
//  *                  - "lt" => the code1.length < code2.length
//  *                  - "eq" => the code1.length < code2.length
//  *                  - "isPrefix" => the code1 is prefix of code2
//  */
// const match_codes_v2 = (code1,code2) =>{

//     const _code1 = code1.replace(REGEX_CODES,"");
//     const _code2 = code2.replace(REGEX_CODES,"");
//     return _code1.length === _code2.length ? "eq" : _code1.length > _code2.length ? "gt" : _code2.startsWith(_code1) ? 'isPrefix' : "lt";
// }