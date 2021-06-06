/************
 * last update zak 02/06
 *  This file defines an abstract componenet to be used for all uploading files cases.
 *  @props =>
 *          multiple (required): bool =>  let the user upload multiple files
 *          accepted_ext (required): string => defines the accepted file extensions (".csv,.txt,.exe,...") 
 *          container_class (optional): string => the wrapper css class name
 *          drop_file_title (optional): string => the displayed message in the dragger box
 *          catch_file({@param file: the file object, @param status: error/success/removed}) (required) : func => callback function to be invoked after uploading the file(s).
 *          
 */

import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

class FileDragger extends React.Component {

    state = {
        uploaded_file: []
    }

    onUpload = (file, fileList) => {
        const exts = ["xls","xlsx", "csv","xlsm"];
        if (!exts.includes(fileList[0].name.substr(fileList[0].name.lastIndexOf('.') + 1).toLowerCase()))
            fileList[0].status = "error";
        else fileList[0].status = "success";
        this.setState({ uploaded_file: fileList }, this.props.catch_file({ file: fileList[0], status: fileList[0].status }));
        return false;
    }
    render() {
        const container_class = this.props.container_class ? this.props.container_class : "";
        const { accepted_ext,multiple,drop_file_title } = this.props;
        return (
        <div className={container_class}>
            <Dragger
                name="input_file"
                accept={accepted_ext}
                multiple={multiple}
                fileList={this.state.uploaded_file}
                onRemove={(f) => { this.setState({ uploaded_file: [] },this.props.catch_file({file: {}, status: "removed"})); return true; }}
                beforeUpload={this.onUpload}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">{drop_file_title}</p>
            </Dragger>
        </div>
        )
    }
}

FileDragger.propTypes = {
    catch_file: PropTypes.func.isRequired,
    accepted_ext: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
}

export default FileDragger;