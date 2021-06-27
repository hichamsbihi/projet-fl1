axios=require("axios");
_TOKEN = require('./._temp_token.js');
EtudeMock=require("./_etude_mock.json");
ItemsMock=require("./_items_mock.json");
CatsMock=require("./_cats_mock.json");

const ETUDE_NBR = 1;
const LOT_NUMBER = 7;

///// INTERCEPTORS ///////////////////////////////////////////////////////////// 
axios.interceptors.request.use(function (config) {
 
  config.metadata = { startTime: new Date()}
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
 
  response.config.metadata.endTime = new Date()
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime
  return response;
}, function (error) {
  error.config.metadata.endTime = new Date();
  error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
  return Promise.reject(error);
});
/////////////////////////////////////////////////////////////////////////////

    let headers = {headers: {
        authorization: _TOKEN._TOKEN,
        'Cache-Control': 'no-cache',
        'Content-type': 'application/json; charset=UTF-8',
    }};
    const _URL = "http://3.131.137.136/api_client/";
    const etudeMock = EtudeMock;
	const catsMock = CatsMock; 
	const itemsMock = ItemsMock; 
	
	

	
    let _wrapping_control = {};

    _wrapping_control.etude = {duration:0,arrayId:[]};
    _wrapping_control.items = {duration:0,data:{}};
    _wrapping_control.cats = {duration:0,data:[]};
    console.log("### INSERTION of 100 Etude.");
    console.log("Req number : 100");
    console.log("parallel processing : true");

    let promises = [];
    for (i = 0; i < ETUDE_NBR; i++) {
        promises.push(
            axios.post(_URL+"etude/", {...etudeMock,nom:"test perfs " + i} , headers)
        .then(response => {
            _wrapping_control.etude.duration= response.duration > _wrapping_control.etude.duration ? response.duration : _wrapping_control.etude.duration;
            _wrapping_control.etude.arrayId.push({etude_id:response.data.id,zone_id:response.data.buildings[0].zones[0].id});
            })
            .catch((err)=>{
                console.log(err.response.data);
            })
        )
    }
        _wrapping_control.startTime = new Date();
        Promise.all(promises).then(() => 
        {
            let dateNow = new Date();
            let datalighatseft = {items:[],cats:[]};
            _wrapping_control.endTime =  dateNow - _wrapping_control.startTime;
            console.log("### Duration : "+_wrapping_control.endTime + "ms.");
            console.log("### max one request duration  : "+_wrapping_control.etude.duration + "ms.");
            console.log("### END ");

            for( var cpt in _wrapping_control.etude.arrayId)
            {
                let etude_now = _wrapping_control.etude.arrayId[cpt].etude_id;
                let zone_now = _wrapping_control.etude.arrayId[cpt].zone_id;
                for(i=7;i<=LOT_NUMBER;i++){
                    datalighatseft.items.push(itemsMock.map((elem)=>{
                        return {...elem,lot:i,etude_id:etude_now,zone_id:zone_now};
                        }));
                        datalighatseft.cats.push(catsMock.map((elem)=>{
                        return {...elem,lot:i,etude_id:etude_now,zone_id:zone_now};
                        }));
                }
            }
			            console.log(datalighatseft.items);


            let cats_promises = [];
            datalighatseft.cats.forEach(catArray=>{
                cats_promises.push(
                    axios.put(_URL+"category/",catArray, headers)
                    .then(response => {
                        _wrapping_control.cats.duration= response.duration > _wrapping_control.cats.duration ? response.duration : _wrapping_control.cats.duration;
                        })
                        .catch((err)=>{
                            console.log(err.response.data);
                        })
                    )
            })
            console.log("### INSERTION OF CATS. ###");
            console.log("Req number : "+cats_promises.length);
            console.log("parallel processing : true");

            _wrapping_control.startTime = new Date();
            Promise.all(cats_promises).then(() => 
            {
                let dateNow1 = new Date();
                _wrapping_control.endTime =  dateNow1 - _wrapping_control.startTime;
                console.log("### Duration : "+_wrapping_control.endTime + "ms.");
                console.log("### max one request duration  : "+_wrapping_control.cats.duration + "ms.");

                console.log("### END ");

                let items_promises = [];
            datalighatseft.items.forEach(itemArray=>{
                items_promises.push(
                    axios.put(_URL+"first_prediction_items/",itemArray, headers)
                    .then(response => {
                        _wrapping_control.items.duration= response.duration > _wrapping_control.items.duration ? response.duration : _wrapping_control.items.duration;

                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                    )
            })
            console.log("### INSERTION OF ITEMS. ###");
            console.log("Req number : "+items_promises.length);
            console.log("parallel processing : true");

            _wrapping_control.startTime = new Date();
            Promise.all(items_promises).then(() => 
            {
                let dateNow2 = new Date();
                _wrapping_control.endTime =  dateNow2 - _wrapping_control.startTime;
                console.log("### Duration : "+_wrapping_control.endTime + "ms.");
                console.log("### max one request duration  : "+_wrapping_control.items.duration + "ms.");

                console.log("### END ");

            })
            .catch((erro)=>{
                console.log("kwadt f items");
            })


            })
            .catch((erro)=>{
				console.log(erro)
                console.log("kwadt f cats");
            })           

        });