import React from "react";
import PropTypes from 'prop-types';
import {ReactExcel, readFile} from './ExcelReader';
import './ExcelPreview.css';
import { message, Spin,Row,Button, Input} from "antd";
import { _launch } from "./algo_excel_new";
import { GRAPHICS_PAGE_FR ,ERROR_MESSAGES} from "../../utils/CONSTANTS";
import {reqPostPreventifs,reqPostCorrectifs,reqPostEquipements,reqPostStock,reqPostDocs,reqPostQsseData,reqPostSchema,reqPostMesure} from "../../apis/index";
class ExcelPreview extends React.Component {

    state = {
        isProcessingData: false,
        processingMessage: "Chargement...",
        initialData: undefined,
        currentSheet: {},
        selectedEq: ""
    }
    preventifColumnMapping = {
        "Ots": "ots",
        "Commentaires": "commentaire",
        "Equipement": "id_equipement",
        "Date d'échéance": "id_equipement",
    };
    correctifColumnMapping = {
        "DI": "",
        "Equipement": "id_equipement",
        "Description": "description",
        "Date": "date",
    };
    stockColumnMapping = {
        "code article": "code_article",
        "désignation article": "designation",
        "Référence": "ref",
        "quantité magasin": "quantite",
    };
    equipementColumnMapping = {
        "Equipement": "QRcode",
        "Nom de l'équipement": "nom",
        "Niveau stratégique": "niveau_strategique",
        "Emplacement équipement": "emplacement",
        "nom de constructeur": "nom_constructeur",
        "Référence": "ref",
        "Document constructeur format PDF": "constructeur_pdf",
        "QSSE format PDF": "Qsse_pdf",
        "Image équipement": "image_equipement",
        "Date derniere visite" :"date_visite"
    };

    documentationColumnMapping = {
        "Equipement" : "id_equipement",
        "Description" : "description",
        "Type": "type",
        "Lien pdf" : "document_pdf"
    };

    mesuresColumnMapping = {
        "Valeur" : "id_equipement",
        "Seuil" : "seuil",
        "Date": "date"
    };

    componentDidMount() {
        readFile(this.props.file).then((readData) => {
            this.setState({initialData: readData})
        }).catch((error) => message.error(ERROR_MESSAGES.FILE_VERIFICATION));
    }

    handleData = (enteteIdx) => {
       
}

getStaticName = (e,pageName)=>{
    if(pageName === 'Preventifs')
        return this.preventifColumnMapping[e] ? this.preventifColumnMapping[e] : e;
    if(pageName === 'Correctifs')
        return this.correctifColumnMapping[e] ? this.correctifColumnMapping[e] : e;
    if(pageName === 'données fixe Equipements')
        return this.equipementColumnMapping[e] ? this.equipementColumnMapping[e] : e;
    if(pageName === 'etat de stock')
        return this.stockColumnMapping[e] ? this.stockColumnMapping[e] : e;
    if(this.props.dataType==="_doc_data" || this.props.dataType==="_qsse_data" || this.props.dataType==="_schema_data")
        return this.documentationColumnMapping[e] ? this.documentationColumnMapping[e] : e;
    if(this.props.dataType==="_mesures_data")
        return this.mesuresColumnMapping[e] ? this.mesuresColumnMapping[e] : e;
}


    render() {
        
        return (
            <>
                <Row className="">
                    <span className="_excel_title">{GRAPHICS_PAGE_FR.EXCEL_PREVIEW_TITLE}</span>
                    
                </Row>
                <br></br>
                <br></br>
                <Spin spinning={this.state.isProcessingData} tip={this.state.processingMessage} size="large">
                    <ReactExcel
                        initialData={this.state.initialData}
                        onSheetUpdate={(currentSheet) => {
                            this.setState({currentSheet: currentSheet})}
                        }
                        catch_validated_data={this.handleData}
                        activeSheetClassName='active-sheet'
                        reactExcelClassName='react-excel'
                    />
                    <Input style={{width:"250px", float:"center"}} placeholder="Id equipement" value={this.selectedEq} onChange={(e)=> this.setState({selectedEq: e.target.value})}>
                    </Input>
                   <Button style={{backgroundColor: "#ce53a9", border: "none",margineRight:"20px",float:'right'}} type="primary" shape="round" size='large' onClick={()=>{
                       if(Object.keys(this.state.currentSheet).length > 0){
                           this.setState({isProcessingData:true});
                        const pageName = Object.keys(this.state.currentSheet)[0];
                        
                            const columnsNames = this.state.currentSheet[pageName][0];
                            const listToApi = [];
                            const skippedCol = ["DI","QR Code équipement"];
                            const reqPutItems = pageName === 'Preventifs' ? reqPostPreventifs : 
                                    pageName === 'Correctifs' ? reqPostCorrectifs :
                                    pageName === 'données fixe Equipements' ? reqPostEquipements :
                                    pageName === 'etat de stock' ? reqPostStock :
                                    this.props.dataType === "_doc_data" ? reqPostDocs : 
                                    this.props.dataType === "_qsse_data" ? reqPostQsseData : 
                                    this.props.dataType === "_schema_data" ? reqPostSchema : 
                                    this.props.dataType === "_mesures_data" ? reqPostMesure : 
                                    null;
                            
                            
                            if(this.props.dataType !== "_mesures_data" )
                            {
                                this.state.currentSheet[pageName].forEach((elem,ind)=>{
                                if(ind!=0)
                                {
                                    let res ={};
                                columnsNames.map((e,idx)=>{
                                    if(skippedCol.indexOf(e)===-1)
                                        {res[this.getStaticName(e,pageName)] = elem[idx];
                                        listToApi.push(res);
                                    }
                                    });
                                   
                                    }
                                  
                            });
                            reqPutItems && reqPutItems(listToApi).then((res)=>{
                                message.success('data was sent successfuly');
                                this.setState({isProcessingData:false});


                            }).catch(e=>{
                                message.error('please select the page');
                                this.setState({isProcessingData:false});

                            })
                        }
                        else {
                            let res ={
                                param: pageName,
                                id_equipement: this.state.selectedEq,
                                seuil: this.state.currentSheet[pageName][1][columnsNames.indexOf("Seuil")],
                                values: []
                            };
                            this.state.currentSheet[pageName].forEach((elem,ind)=>{
                            if(ind!=0)
                                {
                                    res.values.push(
                                        {
                                            value: elem[columnsNames.indexOf("Valeur")],
                                            date: elem[columnsNames.indexOf("Date")]
                                        });
                                }
                            });
                            reqPutItems && reqPutItems(res).then((res)=>{
                                message.success('data was sent successfuly');
                                this.setState({isProcessingData:false});


                            }).catch(e=>{
                                message.error('please select the page');
                                this.setState({isProcessingData:false});

                            })

                        }

                            
                        }

                       
                       else {
                        message.error('please select the page');
                        }
                    }

                       }>

                                        Envoyer
                        </Button> 
                </Spin>

                
            </>
        );
    }
}


ExcelPreview.propTypes = {
    dataType: PropTypes.string.isRequired,
    file: PropTypes.object.isRequired
}

export default ExcelPreview;