import React from 'react';
import './style.css'
import QueueAnim from 'rc-queue-anim';

import FileDragger from './FileDragger';
import ExcelPreview from '../ExcelPreview/ExcelPreview';
import { ERROR_MESSAGES, GRAPHICS_PAGE_FR } from "../../utils/CONSTANTS";
import { Row, Col, Button, message, Modal } from "antd";
import { CaretLeftOutlined,CaretRightOutlined } from '@ant-design/icons';


class DataImport extends React.Component {


    state = {
        uploaded_file: {},
        isSubmitted: false,
    }

    componentDidMount() {
        if (!this.props.dataType || !this.props.dataType.length) {
            Modal.info({ title: 'Invalide type de données', content: ERROR_MESSAGES.DATATYPE_MISSING });
            this.props.history.replace('/home')
        }

    }

    onSubmit = () => {

        if (!this.state.uploaded_file.status) {
            message.warning(ERROR_MESSAGES.FILE_NOT_UPLOADED);
        }

        else if (this.state.uploaded_file.status === "error")
            message.error(ERROR_MESSAGES.FILE_NOT_VALIDE);
        else {
            this.setState({ isSubmitted: true })

        }
    }

    catch_file = ({ file, status }) => {
        if (status === "error") {
            message.error(ERROR_MESSAGES.FILE_NOT_VALIDE);
            this.setState({ uploaded_file: file });
        }
        else if (status === "removed") {
            this.setState({ uploaded_file: {} });
            message.info(GRAPHICS_PAGE_FR.FILE_REMOVED);
        }
        else {
            this.setState({ uploaded_file: file });
            message.success(GRAPHICS_PAGE_FR.FILE_UPLOADED);
        }
    }

    render() {
        const { isSubmitted, uploaded_file } = this.state;
        const { dataType } = this.props;
        
        return (

            <div className="DataImport_container">
               
                {!isSubmitted ? (
                    <QueueAnim
                        animConfig={[
                            { opacity: [1, 0], translateY: [0, 50] },
                            { opacity: [1, 0], translateY: [0, -50] }
                        ]}

                    >
                        <div key='root1'>


                            <Row align="middle" justify="center" className="second_row_wrapper" key='b'>
                                <Col >
                                    <h2>{GRAPHICS_PAGE_FR.IMPORT_DATA_TITLE}</h2>
                                </Col>
                            </Row>
                            <Row align="middle" justify="center" className="third_row_wrapper" key='c'>
                                <Col >
                                    <h4>{GRAPHICS_PAGE_FR.IMPORT_DATA_HINT}</h4>
                                </Col>
                            </Row>
                            <Row align="middle" justify="center" className="third_row_wrapper" key='d'>
                                <Col span={10}>
                                    <FileDragger accepted_ext=".csv,.xlsx,.xls,.xlsm" multiple={true} drop_file_title={GRAPHICS_PAGE_FR.DROP_FILE_TITLE} catch_file={this.catch_file} />
                                </Col>
                            </Row>
                            <Row align="middle" justify="center" className="fourth_row_wrapper" key='e'>
                                <Col>
                                    <Button style={{backgroundColor: "#23AE96", border: "none"}} type="primary" shape="round" size='large' onClick={this.onSubmit}>
                                        Valider
                        </Button>
                                </Col>
                            </Row></div>
                        <div className={"sustain-bottom-button-next"}>
                            <Button style={{backgroundColor: "#23AE96", border: "none"}} type="primary" shape="circle" icon={<CaretRightOutlined />} size="large" onClick={this.onSubmit}/>
                            <br></br>
                            {/*Suivant*/}
                        </div>
                    </QueueAnim>
                ) : [
                        <ExcelPreview dataType={dataType} file={uploaded_file}  key='root2' />
                    ]

                }
                <div className="sustain-bottom-button-previous">
                    <Button style={{backgroundColor: "#23AE96", border: "none"}} type="primary" shape="circle" icon={<CaretLeftOutlined />} size="large" onClick={()=>{
                        this.setState({isSubmitted: false});
                    }} />
                    <br></br>
                {/*Précédent*/}
                </div>

            </div>
        )
    }
}

export default DataImport;