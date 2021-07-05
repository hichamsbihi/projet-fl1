import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import {Table,  Spin} from "antd";


export const ReactExcel = (props) => {
    const {
        initialData,
        onSheetUpdate,
        reactExcelClassName,
        activeSheetClassName,
        catch_validated_data
    } = props;
    const [parsedData, setParsedData] = useState([]);
    const [currentSheet, setCurrentSheet] = useState(undefined);
    const [sheetNames, setSheetNames] = useState([]);
    const [activeSheet, setActiveSheet] = useState(0);
    const [enteteIdx, setEnteteIdx] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {


        const setData = () => {
            const sheetNames = initialData.SheetNames;
            setSheetNames(sheetNames);
            const result = sheetNames.map((name) => {
                const ws = initialData.Sheets[name];
                try {
                    var range = XLSX.utils.decode_range(ws['!ref']);

                   const dataParse = XLSX.utils.sheet_to_json(ws, {
                        header: 1,
                        defval: "",
                        range: {s: {c: 0, r: 0}, e: {c: range.e.c > 30 ? 30 : range.e.c, r: range.e.r}},
                        blankrows: false
                    });
                    return {
                        [name]: dataParse
                    };
                } catch (e) {
                    const dataParse = XLSX.utils.sheet_to_json(ws, {
                        header: 1,
                        defval: ""
                    });

                    
                    return {
                        [name]: dataParse
                    };
                }


            });
            catch_validated_data(result[3]["etat de stock"]);
          
            setParsedData(result);
            setCurrentSheet(result[0]);
            onSheetUpdate && onSheetUpdate(result[0]);

        };

        initialData && setData();

    }, [initialData]);

    const getColumns = (firstRow) => {
        if (!firstRow) return []
        else {
            let columns = [];
            Object.values(firstRow).map((cell, idx) => {
                    columns.push({
                        key: idx.toString(),
                        dataIndex: idx.toString(),
                        title: () => {
                            return (<div className="_header_col" >{cell.toString().length ? cell.toString() : "Vide"}</div>);
                        }
                    });
                
            });

            return columns;
        }
    };

    const getData = (rowArray, enteteId) => {

        let data = [];
        rowArray.map((row, id) => {
            let tmp = {};
            tmp.key = id.toString();
            row.map((cell, idx) => {
                tmp[idx] = cell.toString().substring(0,28);
            });
            if (id > enteteId)
                data.push(tmp);

        });

        return data;
    }

    /* Not used for now because the user can't modify data in the showed up excel table
     */
    const updateSheet = (newValue, row, col) => {
        const sheetRow = Object.values(currentSheet)[0][row];
        sheetRow.splice(col, 1, newValue);
        Object.values(currentSheet)[0].splice(row, 1, sheetRow);
        setCurrentSheet({
            ...currentSheet,
            [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0]
        });
        onSheetUpdate &&
        onSheetUpdate({
            [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0]
        });
    };


    const handleClick = (e, id) => {
        setIsLoading(true);

        const sheet = parsedData.find((o) =>
            Object.keys(o).includes(e.target.value)
        );
        setCurrentSheet(sheet);
        onSheetUpdate && onSheetUpdate(sheet);
        setActiveSheet(id);
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    };

    return (
        <div className={reactExcelClassName}>
            
            <div style={{float: "left", width: "100%"}}>
                <Spin spinning={isLoading} tip="Chargement..." size="large">
                    {currentSheet && (
                        <>
                            <div>
                                <div className="">
                                    <Table
                                        columns={getColumns(Object.values(currentSheet)[0][0])}
                                        dataSource={getData(Object.values(currentSheet)[0], 0)}
                                        bordered
                                        scroll={{y: 400}}
                                        pagination={{
                                            position: ["bottomCenter"],
                                            defaultPageSize: 50,
                                            hideOnSinglePage: false,
                                            showSizeChanger: true,
                                        }}
                                        size='middle'
                                        rowClassName={(a, b) => {
                                            return b === enteteIdx - 1 ? "entete_row" : "";
                                        }}
                                        onRow={(record, rowIndex) => {
                                            return {
                                                onClick: event => {
                                                    setEnteteIdx(rowIndex+1);
                                                },
                                            }
                                        }
                                        }
                                        onHeaderRow={(columns, index) => {
                                            return {
                                                onClick: event => {
                                                        setEnteteIdx(0);
                                                },
                                            };
                                        }}
                                    />
                                    <div style={{marginLeft: "5%"}}>
                                        {sheetNames.map((name, idx) => (
                                            <button
                                                key={idx}
                                                value={name}
                                                onClick={(e) => handleClick(e, idx)}
                                                className={`${activeSheet === idx ? `${activeSheetClassName}` : ''
                                                }`}
                                            >
                                                {name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Spin>
            </div>

        </div>
    );
};

ReactExcel.propTypes = {
    initialData: PropTypes.object,
    onSheetUpdate: PropTypes.func,
    catch_validated_data: PropTypes.func,
    activeSheetClassName: PropTypes.string,
    reactExcelClassName: PropTypes.string,
};

export const readFile = (file) => {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = function (event) {
            var data = new Uint8Array(event.target.result);
            let readedData = XLSX.read(data, {type: 'array'});
            if (readedData) {
                resolve(readedData);
            } else {
                reject({message: 'Error reading file'});
            }
        };
        reader.readAsArrayBuffer(file);
    });
};

readFile.propTypes = {
    file: PropTypes.object.isRequired
};

export const generateObjects = (currentSheet) => {
    const rows = Object.values(currentSheet)[0];
    const keys = rows[0];
    let result = [];
    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        result.push(Object.fromEntries(keys.map((_, i) => [keys[i], row[i]])));
    }
    return result;
};

generateObjects.propTypes = {
    currentSheet: PropTypes.object.isRequired
};