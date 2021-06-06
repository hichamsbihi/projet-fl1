import React from "react";
import PropTypes from 'prop-types';
import {ReactExcel, readFile} from './ExcelReader';
import './ExcelPreview.css';
import { message, Spin,Row,Button } from "antd";
import { _launch } from "./algo_excel_new";
import { GRAPHICS_PAGE_FR ,ERROR_MESSAGES} from "../../utils/CONSTANTS";

class ExcelPreview extends React.Component {

    state = {
        isProcessingData: false,
        processingMessage: "Chargement...",
        initialData: undefined,
        currentSheet: {}
    }

    componentDidMount() {
        readFile(this.props.file).then((readData) => {
            this.setState({initialData: readData})
        }).catch((error) => message.error(ERROR_MESSAGES.FILE_VERIFICATION));
    }

    handleData = (enteteIdx) => {
        // this.setState({ isProcessingData: true });
        const tableau = Object.values(this.state.currentSheet)[0];
        console.log(enteteIdx);
        // let resBody = _launch({
        //     excelTable: tableau.slice(parseInt(data.enteteIdx)+1)
        // });
        // resBody.then((r)=>{
        //     this.setState({ isProcessingData: false });

        //     if(!r.length) message.warning("Le Fichier chargé ne contient aucune ligne valide !")
        //     else
        //     {
        //         console.log(r);
        //     }
        // })
        // .catch((err) => {
        //     this.setState({ isProcessingData: false });

        //   message.error("les noms des colonnes ne sont pas valides !");
        // })
    
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
                        onSheetUpdate={(currentSheet) => this.setState({currentSheet: currentSheet})}
                        catch_validated_data={this.handleData}
                        activeSheetClassName='active-sheet'
                        reactExcelClassName='react-excel'
                    />
                   <Button style={{backgroundColor: "#23AE96", border: "none",margineRight:"20px",float:'right'}} type="primary" shape="round" size='large' onClick={()=>{message.success('data was sent successfuly')}}>
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